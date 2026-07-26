import React from "react";
import { motion } from "framer-motion";

const StudentDashboardVector = () => {
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
          <linearGradient id="studentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>

        {/* Main card */}
        <motion.rect
          x="45"
          y="35"
          width="310"
          height="190"
          rx="20"
          fill="white"
          stroke="#E5E7EB"
          strokeWidth="2"
          animate={{ y: [35, 33, 35] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Student avatar area */}
        <circle cx="90" cy="85" r="30" fill="#F3F0FA" stroke="#5B4B8A" strokeWidth="2" />
        <circle cx="90" cy="78" r="12" fill="#5B4B8A" opacity="0.4" />
        <path d="M70 100 Q90 115 110 100" stroke="#5B4B8A" strokeWidth="2" fill="none" opacity="0.4" />

        {/* Info lines */}
        <rect x="135" y="65" width="120" height="12" rx="4" fill="#5B4B8A" opacity="0.3" />
        <rect x="135" y="85" width="80" height="8" rx="3" fill="#5B4B8A" opacity="0.2" />
        <rect x="135" y="100" width="100" height="8" rx="3" fill="#5B4B8A" opacity="0.15" />

        {/* Progress circles */}
        <motion.g
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="80" cy="155" r="25" fill="#F3F0FA" stroke="#5B4B8A" strokeWidth="3" />
          <circle cx="80" cy="155" r="18" fill="white" />
          <text x="80" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#5B4B8A">85%</text>
        </motion.g>

        <motion.g
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <circle cx="150" cy="155" r="25" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3" />
          <circle cx="150" cy="155" r="18" fill="white" />
          <text x="150" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#F59E0B">92%</text>
        </motion.g>

        <motion.g
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <circle cx="220" cy="155" r="25" fill="#D1FAE5" stroke="#10B981" strokeWidth="3" />
          <circle cx="220" cy="155" r="18" fill="white" />
          <text x="220" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#10B981">78%</text>
        </motion.g>

        <motion.g
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <circle cx="290" cy="155" r="25" fill="#FEE2E2" stroke="#EF4444" strokeWidth="3" />
          <circle cx="290" cy="155" r="18" fill="white" />
          <text x="290" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#EF4444">95%</text>
        </motion.g>

        {/* Bottom progress bar */}
        <rect x="70" y="195" width="260" height="10" rx="5" fill="#F8FAFC" />
        <motion.rect
          x="70"
          y="195"
          width="200"
          height="10"
          rx="5"
          fill="url(#progressGradient)"
          animate={{ width: [200, 240, 200] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating elements */}
        <motion.circle
          cx="25"
          cy="55"
          r="16"
          fill="#10B981"
          opacity="0.1"
          animate={{ y: [55, 45, 55], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="375"
          cy="265"
          r="20"
          fill="#5B4B8A"
          opacity="0.1"
          animate={{ y: [265, 255, 265], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="40"
          cy="275"
          r="12"
          fill="#F59E0B"
          opacity="0.12"
          animate={{ y: [275, 265, 275], scale: [1, 1.25, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Decorative stars */}
        <motion.path
          d="M320 40 L322 45 L327 45 L323 48 L324 53 L320 50 L316 53 L317 48 L313 45 L318 45 Z"
          fill="#F59E0B"
          opacity="0.3"
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M60 220 L61 223 L64 223 L62 225 L63 228 L60 226 L57 228 L58 225 L56 223 L59 223 Z"
          fill="#5B4B8A"
          opacity="0.2"
          animate={{ rotate: [0, -360], scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
};

export default StudentDashboardVector;
