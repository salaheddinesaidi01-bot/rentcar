'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggleCorner() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center">
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Basculer en Mode Clair' : 'Basculer en Mode Sombre'}
        className={`flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl border-2 transition-all duration-300 backdrop-blur-xl cursor-pointer ${
          theme === 'dark'
            ? 'bg-slate-900/95 text-amber-400 border-slate-700 hover:border-amber-400 hover:bg-slate-850 shadow-black/80'
            : 'bg-white text-slate-950 border-slate-900 hover:border-brand-orange hover:bg-slate-50 shadow-slate-900/30'
        }`}
        title={theme === 'dark' ? 'Passer en Mode Clair ☀️' : 'Passer en Mode Sombre 🌙'}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-amber-400 fill-amber-400/20" />
        ) : (
          <Moon className="w-5 h-5 text-slate-950 fill-slate-950/20" />
        )}
        <span className="text-xs font-mono font-black uppercase tracking-wider select-none">
          {theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}
        </span>
      </motion.button>
    </div>
  );
}
