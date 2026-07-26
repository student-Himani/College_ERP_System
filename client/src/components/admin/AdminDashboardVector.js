import React from "react";
import { motion } from "framer-motion";

const AdminDashboardVector = () => {
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
        {/* Background gradient blob */}
        <defs>
          <linearGradient id="adminGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="chartGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>
        
        {/* Main dashboard card */}
        <motion.rect
          x="50"
          y="30"
          width="300"
          height="200"
          rx="20"
          fill="white"
          stroke="#E2E8F0"
          strokeWidth="2"
          animate={{ y: [30, 28, 30] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Header bar */}
        <rect x="70" y="50" width="260" height="40" rx="8" fill="#EEF2FF" />
        <circle cx="85" cy="70" r="8" fill="#6366F1" />
        <rect x="105" y="62" width="80" height="16" rx="4" fill="#6366F1" opacity="0.3" />
        
        {/* Stats cards */}
        <motion.rect
          x="70"
          y="105"
          width="75"
          height="50"
          rx="10"
          fill="#EEF2FF"
          animate={{ y: [105, 103, 105] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.rect
          x="155"
          y="105"
          width="75"
          height="50"
          rx="10"
          fill="#FEF3C7"
          animate={{ y: [105, 103, 105] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
        <motion.rect
          x="240"
          y="105"
          width="75"
          height="50"
          rx="10"
          fill="#D1FAE5"
          animate={{ y: [105, 103, 105] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
        
        {/* Chart area */}
        <rect x="70" y="170" width="245" height="45" rx="8" fill="#F7F8FC" />
        
        {/* Animated chart bars */}
        <motion.rect
          x="80"
          y="185"
          width="20"
          height="20"
          rx="4"
          fill="url(#chartGradient)"
          animate={{ height: [20, 30, 20] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.rect
          x="110"
          y="190"
          width="20"
          height="15"
          rx="4"
          fill="#818CF8"
          animate={{ height: [15, 25, 15] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.rect
          x="140"
          y="180"
          width="20"
          height="25"
          rx="4"
          fill="#6366F1"
          animate={{ height: [25, 35, 25] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
        <motion.rect
          x="170"
          y="188"
          width="20"
          height="17"
          rx="4"
          fill="#A5B4FC"
          animate={{ height: [17, 27, 17] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        />
        <motion.rect
          x="200"
          y="182"
          width="20"
          height="23"
          rx="4"
          fill="#818CF8"
          animate={{ height: [23, 33, 23] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
        <motion.rect
          x="230"
          y="186"
          width="20"
          height="19"
          rx="4"
          fill="#6366F1"
          animate={{ height: [19, 29, 19] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.rect
          x="260"
          y="184"
          width="20"
          height="21"
          rx="4"
          fill="#A5B4FC"
          animate={{ height: [21, 31, 21] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
        />
        
        {/* Floating elements */}
        <motion.circle
          cx="380"
          cy="50"
          r="15"
          fill="#6366F1"
          opacity="0.1"
          animate={{ y: [50, 40, 50], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="30"
          cy="250"
          r="20"
          fill="#F59E0B"
          opacity="0.1"
          animate={{ y: [250, 240, 250], scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="350"
          cy="280"
          r="12"
          fill="#10B981"
          opacity="0.15"
          animate={{ y: [280, 270, 280], scale: [1, 1.2, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
};

export default AdminDashboardVector;
