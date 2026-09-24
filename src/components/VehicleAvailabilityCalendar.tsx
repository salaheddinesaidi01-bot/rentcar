'use client';

import React, { useState, useMemo } from 'react';
import { Vehicle } from '@/types';
import { formatDateFR, isVehicleAvailableForDates } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface VehicleAvailabilityCalendarProps {
  vehicle: Vehicle;
  selectedStartDate?: string;
  selectedEndDate?: string;
  onSelectDates?: (startDate: string, endDate: string) => void;
  adminMode?: boolean;
  onToggleDateBlock?: (dateStr: string) => void;
  className?: string;
}

const MONTH_NAMES = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export default function VehicleAvailabilityCalendar({
  vehicle,
  selectedStartDate = '',
  selectedEndDate = '',
  onSelectDates,
  adminMode = false,
  onToggleDateBlock,
  className = '',
}: VehicleAvailabilityCalendarProps) {
  // Current view date (defaulting to September 2026 or selected start date)
  const initialDate = useMemo(() => {
    if (selectedStartDate) {
      const d = new Date(selectedStartDate);
      if (!isNaN(d.getTime())) return d;
    }
    return new Date('2026-09-24T00:00:00');
  }, [selectedStartDate]);

  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth()); // 0-indexed

  // Internal selection state if controlled or local
  const [tempStart, setTempStart] = useState<string>(selectedStartDate);
  const [tempEnd, setTempEnd] = useState<string>(selectedEndDate);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync with prop updates
  React.useEffect(() => {
    setTempStart(selectedStartDate);
    setTempEnd(selectedEndDate);
  }, [selectedStartDate, selectedEndDate]);

  // Navigate months
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setErrorMessage(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setErrorMessage(null);
  };

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // In JS getDay(): 0 is Sunday, 1 is Monday ... 6 is Saturday
    // Convert to Monday=0 ... Sunday=6
    const firstDayIndex = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

    const days = [];
    // Padding before month starts
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ dayNumber: null, dateStr: '', isAvailable: false, isPast: false });
    }

    const todayStr = '2026-09-24'; // System active date

    for (let day = 1; day <= daysInMonth; day++) {
      const mm = String(currentMonth + 1).padStart(2, '0');
      const dd = String(day).padStart(2, '0');
      const dateStr = `${currentYear}-${mm}-${dd}`;

      const isPast = dateStr < todayStr;
      const isAvailable = isPast
        ? false
        : isVehicleAvailableForDates(vehicle, dateStr, dateStr);

      days.push({
        dayNumber: day,
        dateStr,
        isAvailable,
        isPast,
      });
    }

    return days;
  }, [currentYear, currentMonth, vehicle]);

  // Check if a range has any blocked/unavailable dates
  const hasBlockedDatesInRange = (start: string, end: string) => {
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    if (isNaN(s) || isNaN(e)) return false;

    // Check each single day in range
    let cur = new Date(s);
    while (cur.getTime() <= e) {
      const curStr = cur.toISOString().split('T')[0];
      if (!isVehicleAvailableForDates(vehicle, curStr, curStr)) {
        return true;
      }
      cur.setDate(cur.getDate() + 1);
    }
    return false;
  };

  // User click on a day
  const handleDayClick = (dayItem: {
    dayNumber: number | null;
    dateStr: string;
    isAvailable: boolean;
    isPast: boolean;
  }) => {
    if (!dayItem.dayNumber || dayItem.isPast) return;

    // Admin mode allows toggling any future date block/unblock
    if (adminMode && onToggleDateBlock) {
      onToggleDateBlock(dayItem.dateStr);
      return;
    }

    // Normal client mode: only available (green) dates can be clicked
    if (!dayItem.isAvailable) {
      setErrorMessage(
        `Ce jour (${formatDateFR(dayItem.dateStr)}) est déjà réservé. Veuillez choisir un jour en vert.`
      );
      return;
    }

    setErrorMessage(null);

    // If no start date or both already selected: start fresh selection
    if (!tempStart || (tempStart && tempEnd)) {
      setTempStart(dayItem.dateStr);
      setTempEnd('');
    } else if (tempStart && !tempEnd) {
      // Selecting end date
      if (dayItem.dateStr < tempStart) {
        // Clicked before start: restart with clicked date as new start
        setTempStart(dayItem.dateStr);
        setTempEnd('');
      } else {
        // Check if there are any red/blocked dates in between
        if (hasBlockedDatesInRange(tempStart, dayItem.dateStr)) {
          setErrorMessage(
            'Impossible de sélectionner cette période : certains jours intermédiaires sont déjà réservés (en rouge). Veuillez choisir une période continue en vert.'
          );
          return;
        }

        setTempEnd(dayItem.dateStr);
        if (onSelectDates) {
          onSelectDates(tempStart, dayItem.dateStr);
        }
      }
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-md p-5 sm:p-6 ${className}`}>
      
      {/* Calendar Header with Month Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-orange/10 text-brand-orange">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-900">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Calendrier de disponibilité • {vehicle.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            title="Mois précédent"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            title="Mois suivant"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Color Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 py-3 px-3 my-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-emerald-500 border border-emerald-600 flex items-center justify-center text-[9px] text-white font-bold">✓</span>
          <span className="font-bold text-emerald-800">Vert = Disponible</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-rose-500 border border-rose-600 flex items-center justify-center text-[9px] text-white font-bold">✕</span>
          <span className="font-bold text-rose-800">Rouge = Réservé</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-brand-orange border border-orange-600" />
          <span className="font-bold text-slate-800">Orange = Vos dates</span>
        </div>
      </div>

      {/* Error Message if user clicks unavailable dates */}
      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2 animate-fadeIn">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1.5 mb-2 text-center text-xs font-mono font-bold text-slate-500 uppercase">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="py-1">
            {wd}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {calendarDays.map((item, index) => {
          if (!item.dayNumber) {
            return (
              <div
                key={`empty-${index}`}
                className="h-10 sm:h-12 rounded-xl bg-transparent"
              />
            );
          }

          const isSelectedStart = tempStart === item.dateStr;
          const isSelectedEnd = tempEnd === item.dateStr;
          const isInSelectedRange =
            tempStart &&
            tempEnd &&
            item.dateStr >= tempStart &&
            item.dateStr <= tempEnd;

          // Determine styling based on availability
          let dayClasses = '';
          let badgeText = '';

          if (item.isPast) {
            dayClasses = 'bg-slate-100/70 text-slate-400 border-slate-200/60 cursor-not-allowed opacity-50';
            badgeText = '';
          } else if (isSelectedStart || isSelectedEnd) {
            dayClasses =
              'bg-brand-orange text-white border-brand-orange shadow-lg scale-105 z-10 font-black ring-2 ring-brand-orange/40';
            badgeText = isSelectedStart && isSelectedEnd ? 'Début & Fin' : isSelectedStart ? 'Départ' : 'Retour';
          } else if (isInSelectedRange) {
            dayClasses = 'bg-orange-100 text-orange-950 border-orange-300 font-bold';
            badgeText = 'Sélection';
          } else if (item.isAvailable) {
            // GREEN: Available day
            dayClasses =
              'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-md cursor-pointer font-bold transition-all';
            badgeText = 'Libre';
          } else {
            // RED: Reserved / Blocked day
            dayClasses =
              'bg-rose-50 text-rose-700 border-rose-200 opacity-90 cursor-not-allowed font-medium line-through decoration-rose-400';
            badgeText = 'Réservé';
          }

          return (
            <button
              key={item.dateStr}
              type="button"
              disabled={item.isPast || (!adminMode && !item.isAvailable && !isSelectedStart && !isSelectedEnd)}
              onClick={() => handleDayClick(item)}
              title={
                item.isPast
                  ? 'Date passée'
                  : item.isAvailable
                  ? `${formatDateFR(item.dateStr)} : Disponible`
                  : `${formatDateFR(item.dateStr)} : Réservé`
              }
              className={`relative h-11 sm:h-14 rounded-xl border flex flex-col items-center justify-center p-1 transition-all duration-200 ${dayClasses}`}
            >
              <span className="text-xs sm:text-sm">{item.dayNumber}</span>
              {badgeText && (
                <span
                  className={`text-[8px] sm:text-[9px] font-mono leading-none tracking-tight mt-0.5 ${
                    isSelectedStart || isSelectedEnd
                      ? 'text-white font-bold'
                      : isInSelectedRange
                      ? 'text-orange-900 font-semibold'
                      : item.isAvailable
                      ? 'text-emerald-700 font-bold group-hover:text-white'
                      : 'text-rose-600'
                  }`}
                >
                  {badgeText}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selection Summary at bottom */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <Info className="w-4 h-4 text-brand-orange flex-shrink-0" />
          <span>
            {tempStart && tempEnd ? (
              <span>
                Période sélectionnée :{' '}
                <strong className="text-slate-900">{formatDateFR(tempStart)}</strong> au{' '}
                <strong className="text-slate-900">{formatDateFR(tempEnd)}</strong>
              </span>
            ) : tempStart ? (
              <span>
                Date de début : <strong className="text-slate-900">{formatDateFR(tempStart)}</strong>. Cliquez sur votre date de fin (en vert).
              </span>
            ) : (
              <span>Cliquez sur un jour vert pour choisir votre date de prise en charge.</span>
            )}
          </span>
        </div>

        {tempStart && tempEnd && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Dates 100% disponibles
          </span>
        )}
      </div>

    </div>
  );
}
