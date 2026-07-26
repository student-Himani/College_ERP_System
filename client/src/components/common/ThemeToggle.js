import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check localStorage or default to dark
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 transition-colors duration-300"
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={false}
          animate={{ y: isDark ? 0 : 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute"
        >
          <Moon size={20} className="text-accent-glow" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ y: isDark ? -30 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute"
        >
          <Sun size={20} className="text-yellow-400" />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
