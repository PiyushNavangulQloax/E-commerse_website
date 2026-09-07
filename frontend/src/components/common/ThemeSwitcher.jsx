import { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const themes = [
  { id: 'best', name: 'Best (Premium Ivory)' },
  { id: 'spiced', name: 'Spiced (Terracotta)' },
  { id: 'fresh', name: 'Fresh (Sage Green)' },
  { id: 'dusk', name: 'Dusk (Midnight Blue)' }
];

const ThemeSwitcher = () => {
  const { theme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 bg-surface border border-border shadow-2xl p-4 rounded-md w-64"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border text-text">
              <h4 className="font-medium text-sm">Select Theme</h4>
              <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-text">
                <X size={16} />
              </button>
            </div>
            
            <div className="flex flex-col gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => changeTheme(t.id)}
                  className={`text-left px-3 py-2 text-sm rounded-sm transition-colors ${
                    theme === t.id 
                      ? 'bg-primary text-background font-medium' 
                      : 'text-text hover:bg-border/50'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-primary text-background rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Settings size={20} className={isOpen ? "animate-spin-slow" : ""} />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
