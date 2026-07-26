import React from "react";
import { motion } from "framer-motion";

const WorkspaceVectorIllustration = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto flex items-center justify-center p-4">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#EEF2FF] via-[#F7F8FC] to-[#FFFFFF] dark:from-[#6366F1]/20 dark:to-[#818CF8]/10 rounded-full blur-3xl -z-10" />

      <svg
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl select-none"
      >
        <defs>
          <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F7F8FC" />
          </linearGradient>
          <filter id="softShadow2" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#6366F1" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* --- FLOATING BACKGROUND GRAPHICS --- */}
        {/* Checklist Card */}
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#softShadow2)"
        >
          <rect x="65" y="60" width="85" height="110" rx="14" fill="url(#cardGrad)" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="85" cy="85" r="7" fill="#6366F1" />
          <path d="M 82 85 L 84 87 L 88 83" stroke="#FFFFFF" strokeWidth="1.5" />
          <rect x="98" y="82" width="40" height="6" rx="3" fill="#94A3B8" />

          <circle cx="85" cy="115" r="7" fill="#818CF8" />
          <path d="M 82 115 L 84 117 L 88 113" stroke="#FFFFFF" strokeWidth="1.5" />
          <rect x="98" y="112" width="35" height="6" rx="3" fill="#94A3B8" />

          <circle cx="85" cy="145" r="7" fill="#34D399" />
          <path d="M 82 145 L 84 147 L 88 143" stroke="#FFFFFF" strokeWidth="1.5" />
          <rect x="98" y="142" width="44" height="6" rx="3" fill="#94A3B8" />
        </motion.g>

        {/* Donut Chart */}
        <motion.g
          animate={{ y: [0, 8, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          filter="url(#softShadow2)"
        >
          <circle cx="215" cy="95" r="32" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="215" cy="95" r="22" fill="none" stroke="#F59E0B" strokeWidth="10" strokeDasharray="35 100" />
          <circle cx="215" cy="95" r="22" fill="none" stroke="#6366F1" strokeWidth="10" strokeDasharray="65 100" strokeDashoffset="-35" />
          <circle cx="215" cy="95" r="22" fill="none" stroke="#34D399" strokeWidth="10" strokeDasharray="38 100" strokeDashoffset="-100" />
        </motion.g>

        {/* Bar Graph Widget */}
        <motion.g
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          filter="url(#softShadow2)"
        >
          <rect x="330" y="65" width="80" height="70" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="342" y="100" width="8" height="22" rx="3" fill="#34D399" />
          <rect x="354" y="85" width="8" height="37" rx="3" fill="#818CF8" />
          <rect x="366" y="92" width="8" height="30" rx="3" fill="#F59E0B" />
          <rect x="378" y="78" width="8" height="44" rx="3" fill="#6366F1" />
        </motion.g>

        {/* --- MAIN CONFERENCE WORKSTATION TABLE --- */}
        <g filter="url(#softShadow2)">
          <rect x="90" y="325" width="370" height="14" rx="7" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
          <rect x="110" y="339" width="8" height="110" fill="#94A3B8" />
          <rect x="442" y="339" width="8" height="110" fill="#94A3B8" />
          <line x1="114" y1="410" x2="446" y2="410" stroke="#E2E8F0" strokeWidth="3" />
        </g>

        {/* --- TEAM MEMBER 1 --- */}
        <g filter="url(#softShadow2)">
          <path d="M 80 300 Q 80 270 105 270 L 125 270 L 125 360 L 95 360 C 80 360 80 330 80 300 Z" fill="#F59E0B" />
          <rect x="100" y="360" width="6" height="50" fill="#1E293B" />

          <circle cx="138" cy="235" r="14" fill="#7C2D12" />
          <circle cx="140" cy="237" r="12" fill="#FCA5A5" />
          <path d="M 125 260 L 155 260 L 160 325 L 120 325 Z" fill="#1E293B" />
          <rect x="130" y="325" width="10" height="65" rx="5" fill="#6366F1" />
          <rect x="144" y="325" width="10" height="65" rx="5" fill="#6366F1" />
          <path d="M 170 315 L 205 315 L 210 325 L 165 325 Z" fill="#94A3B8" />
          <rect x="175" y="295" width="28" height="20" rx="3" fill="#1E293B" />
        </g>

        {/* --- TEAM MEMBER 2 --- */}
        <g filter="url(#softShadow2)">
          <path d="M 252 188 C 252 178 265 175 272 175 C 282 175 285 185 283 194 C 275 186 265 185 252 188 Z" fill="#1E293B" />
          <circle cx="268" cy="195" r="11" fill="#FCA5A5" />
          <path d="M 250 215 L 286 215 L 292 285 L 244 285 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <path d="M 266 215 L 270 245 L 268 250 L 264 215 Z" fill="#6366F1" />
          <rect x="250" y="285" width="16" height="110" fill="#1E293B" />
          <rect x="270" y="285" width="16" height="110" fill="#1E293B" />
          <rect x="210" y="235" width="26" height="35" rx="3" fill="#EEF2FF" stroke="#94A3B8" />
          <rect x="214" y="242" width="18" height="4" fill="#6366F1" />
          <rect x="214" y="250" width="18" height="4" fill="#94A3B8" />
          <rect x="214" y="258" width="14" height="4" fill="#94A3B8" />
        </g>

        {/* --- TEAM MEMBER 3 --- */}
        <g filter="url(#softShadow2)">
          <path d="M 370 270 L 390 270 C 405 270 405 300 405 330 C 405 360 390 360 370 360 Z" fill="#A5B4FC" />
          <circle cx="375" cy="235" r="14" fill="#B45309" />
          <circle cx="372" cy="237" r="12" fill="#FCA5A5" />
          <path d="M 358 260 L 388 260 L 392 325 L 354 325 Z" fill="#6366F1" />
          <rect x="360" y="325" width="10" height="65" rx="5" fill="#F59E0B" />
          <rect x="374" y="325" width="10" height="65" rx="5" fill="#F59E0B" />
          <path d="M 320 315 L 355 315 L 360 325 L 315 325 Z" fill="#94A3B8" />
          <rect x="325" y="295" width="28" height="20" rx="3" fill="#1E293B" />
        </g>
      </svg>
    </div>
  );
};

export default WorkspaceVectorIllustration;
