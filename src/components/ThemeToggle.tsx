import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('2048-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('2048-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 right-4 p-3 rounded-full bg-[#8f7a66] text-white shadow-lg hover:bg-[#9f8a76] transition-colors z-10"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? '☀️' : '🌙'}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;