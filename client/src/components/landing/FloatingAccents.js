import React from "react";
import { motion } from "framer-motion";

const FloatingAccents = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Triangle Left */}
      <motion.svg
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 left-10 w-8 h-8 text-[#818CF8]/25 dark:text-[#A5B4FC]/20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L2 22h20L12 2z" />
      </motion.svg>

      {/* Floating Triangle Right Top */}
      <motion.svg
        animate={{ y: [0, 18, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-36 right-16 w-6 h-6 text-[#F472B6]/35"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L2 22h20L12 2z" />
      </motion.svg>

      {/* Floating Circle Ring Left */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[45%] left-6 w-12 h-12 rounded-full border-2 border-dashed border-[#A5B4FC]/30"
      />

      {/* Floating Soft Lavender Blob Center Top */}
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 left-1/3 w-80 h-80 rounded-full bg-gradient-to-tr from-[#EEF2FF] to-[#F7F8FC] dark:from-[#6366F1]/20 dark:to-[#818CF8]/10 blur-3xl"
      />

      {/* Floating Ring Right Bottom */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-32 right-12 w-16 h-16 rounded-full border-4 border-[#34D399]/30 border-t-transparent"
      />

      {/* Floating Dots Matrix pattern */}
      <svg className="absolute top-1/4 right-8 w-24 h-24 text-[#818CF8]/15 dark:text-[#A5B4FC]/10" fill="currentColor">
        <pattern id="dotPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
      </svg>
    </div>
  );
};

export default FloatingAccents;
