'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggleCorner() {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed bottom-6 left-6 z-40 flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main floating action button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Basculer vers le mode clair' : 'Basculer vers le mode sombre'}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border-2 transition-all duration-300 backdrop-blur-xl cursor-pointer ${
          theme === 'dark'
            ? 'bg-slate-900/95 text-amber-400 border-slate-700 hover:border-brand-orange hover:bg-slate-850 shadow-black/60'
            : 'bg-white text-slate-950 border-slate-400 hover:border-brand-orange hover:bg-slate-50 shadow-slate-900/20'
        }`}
        title={theme === 'dark' ? 'Basculer en Mode Clair' : 'Basculer en Mode Sombre'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-5 h-5 text-slate-950 fill-slate-950/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip badge on hover (desktop, placed to the right of the button) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="hidden sm:flex items-center px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold shadow-xl border bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-100 border-slate-300 dark:border-slate-700 backdrop-blur-md whitespace-nowrap pointer-events-none"
          >
            <span>{theme === 'dark' ? 'Basculer en Mode Clair ☀️' : 'Basculer en Mode Sombre 🌙'}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
