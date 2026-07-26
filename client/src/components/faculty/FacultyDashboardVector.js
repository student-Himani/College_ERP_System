import React from "react";
import { motion } from "framer-motion";

const FacultyDashboardVector = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full h-full flex items-center justify-center"
    >
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-md"
      >
        <defs>
          <linearGradient id="facultyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B7BB5" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#A594C5" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B4B8A" />
            <stop offset="100%" stopColor="#8B7BB5" />
          </linearGradient>
        </defs>
        
        {/* Main teaching board */}
        <motion.rect
          x="40"
          y="40"
          width="320"
          height="180"
          rx="16"
          fill="white"
          stroke="#E5E7EB"
          strokeWidth="2"
          animate={{ y: [40, 38, 40] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Board header */}
        <rect x="60" y="60" width="280" height="35" rx="8" fill="#F3F0FA" />
        <rect x="80" y="70" width="100" height="15" rx="4" fill="#5B4B8A" opacity="0.4" />
        <circle cx="310" cy="77" r="10" fill="#5B4B8A" />
        
        {/* Book/subject icons */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="70" y="115" width="50" height="60" rx="8" fill="#F3F0FA" stroke="#5B4B8A" strokeWidth="2" />
          <rect x="75" y="125" width="40" height="8" rx="2" fill="#5B4B8A" opacity="0.3" />
          <rect x="75" y="138" width="40" height="8" rx="2" fill="#5B4B8A" opacity="0.3" />
          <rect x="75" y="151" width="30" height="8" rx="2" fill="#5B4B8A" opacity="0.3" />
        </motion.g>
        
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <rect x="140" y="115" width="50" height="60" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
          <rect x="145" y="125" width="40" height="8" rx="2" fill="#F59E0B" opacity="0.3" />
          <rect x="145" y="138" width="40" height="8" rx="2" fill="#F59E0B" opacity="0.3" />
          <rect x="145" y="151" width="30" height="8" rx="2" fill="#F59E0B" opacity="0.3" />
        </motion.g>
        
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <rect x="210" y="115" width="50" height="60" rx="8" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
          <rect x="215" y="125" width="40" height="8" rx="2" fill="#10B981" opacity="0.3" />
          <rect x="215" y="138" width="40" height="8" rx="2" fill="#10B981" opacity="0.3" />
          <rect x="215" y="151" width="30" height="8" rx="2" fill="#10B981" opacity="0.3" />
        </motion.g>
        
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <rect x="280" y="115" width="50" height="60" rx="8" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
          <rect x="285" y="125" width="40" height="8" rx="2" fill="#EF4444" opacity="0.3" />
          <rect x="285" y="138" width="40" height="8" rx="2" fill="#EF4444" opacity="0.3" />
          <rect x="285" y="151" width="30" height="8" rx="2" fill="#EF4444" opacity="0.3" />
        </motion.g>
        
        {/* Progress bar */}
        <rect x="70" y="195" width="260" height="12" rx="6" fill="#F8FAFC" />
        <motion.rect
          x="70"
          y="195"
          width="180"
          height="12"
          rx="6"
          fill="url(#bookGradient)"
          animate={{ width: [180, 220, 180] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating elements */}
        <motion.circle
          cx="30"
          cy="60"
          r="18"
          fill="#8B7BB5"
          opacity="0.1"
          animate={{ y: [60, 50, 60], scale: [1, 1.15, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="370"
          cy="260"
          r="22"
          fill="#F59E0B"
          opacity="0.1"
          animate={{ y: [260, 250, 260], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="50"
          cy="280"
          r="14"
          fill="#10B981"
          opacity="0.12"
          animate={{ y: [280, 270, 280], scale: [1, 1.2, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Small decorative dots */}
        <circle cx="100" cy="250" r="4" fill="#5B4B8A" opacity="0.2" />
        <circle cx="300" cy="50" r="3" fill="#F59E0B" opacity="0.2" />
        <circle cx="350" cy="150" r="5" fill="#10B981" opacity="0.15" />
      </svg>
    </motion.div>
  );
};

export default FacultyDashboardVector;
