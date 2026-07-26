import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface-light dark:bg-surface-dark transition-colors duration-500">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="w-24 h-24 rounded-3xl bg-primary dark:bg-primary-light flex items-center justify-center shadow-2xl shadow-primary/20 dark:shadow-accent/20 animate-float">
          <GraduationCap className="text-white w-12 h-12" />
        </div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-primary dark:bg-accent rounded-3xl -z-10 blur-xl"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <h1 className="text-2xl font-extrabold text-primary dark:text-white tracking-widest uppercase">
          College<span className="text-secondary dark:text-accent font-black">ERP</span>
        </h1>
        <div className="mt-4 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-accent"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
