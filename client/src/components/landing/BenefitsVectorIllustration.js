import React from "react";
import { motion } from "framer-motion";

const BenefitsVectorIllustration = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto flex items-center justify-center p-4">
      {/* Ambient background aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#EEF2FF] via-[#F7F8FC] to-[#FFFFFF] dark:from-[#6366F1]/20 dark:to-[#818CF8]/10 rounded-full blur-3xl -z-10" />

      <svg
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl select-none"
      >
        <defs>
          <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#6366F1" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* --- BACKGROUND GEAR COGWHEEL (Rotates slowly) --- */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "420px 280px" }}
          opacity="0.3"
        >
          <circle cx="420" cy="280" r="110" fill="none" stroke="#A5B4FC" strokeWidth="16" strokeDasharray="18 12" />
          <circle cx="420" cy="280" r="85" fill="#EEF2FF" stroke="#6366F1" strokeWidth="2" />
        </motion.g>

        {/* --- CONCENTRIC TARGET RINGS --- */}
        <circle cx="280" cy="250" r="190" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 6" />
        <circle cx="280" cy="250" r="130" fill="none" stroke="#EEF2FF" strokeWidth="1.5" />

        {/* --- FLYING PAPER AIRPLANE --- */}
        <motion.g
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M 500 120 L 550 80 L 515 140 L 490 125 Z" fill="#A5B4FC" filter="url(#vectorGlow)" />
          <path d="M 500 120 L 550 80 L 510 125 Z" fill="#6366F1" />
          <path d="M 430 160 Q 460 140 495 125" stroke="#A5B4FC" strokeWidth="2" strokeDasharray="3 3" />
        </motion.g>

        {/* --- CENTRAL ROCKET LAUNCH --- */}
        <motion.g
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#vectorGlow)"
        >
          {/* Flame Trail */}
          <motion.path
            d="M 268 330 Q 280 390 280 430 Q 280 390 292 330 Z"
            fill="url(#flameGrad)"
            animate={{ scaleY: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            style={{ transformOrigin: "280px 330px" }}
          />

          {/* Rocket Body */}
          <path d="M 280 140 C 310 200 310 290 305 330 L 255 330 C 250 290 250 200 280 140 Z" fill="url(#rocketGrad)" />
          {/* Nosecone Cap */}
          <path d="M 280 140 C 295 170 295 190 295 190 L 265 190 C 265 190 265 170 280 140 Z" fill="#F59E0B" />
          {/* Rocket Fins */}
          <path d="M 255 280 L 225 335 L 255 330 Z" fill="#6366F1" />
          <path d="M 305 280 L 335 335 L 305 330 Z" fill="#6366F1" />
          {/* Rocket Porthole Window */}
          <circle cx="280" cy="225" r="18" fill="#FFFFFF" stroke="#A5B4FC" strokeWidth="4" />
          <circle cx="280" cy="225" r="10" fill="#6366F1" />
          <circle cx="276" cy="221" r="3" fill="#FFFFFF" />
        </motion.g>

        {/* --- FLOATING METRIC CARDS AROUND ROCKET --- */}
        <motion.g
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          filter="url(#vectorGlow)"
        >
          <rect x="80" y="160" width="130" height="60" rx="14" fill="#FFFFFF" />
          <rect x="80" y="160" width="130" height="60" rx="14" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="105" cy="190" r="14" fill="#34D399" opacity="0.2" />
          <path d="M 98 193 L 103 186 L 108 189 L 114 181" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="128" y="176" width="65" height="8" rx="4" fill="#1E293B" />
          <rect x="128" y="190" width="45" height="6" rx="3" fill="#94A3B8" />
        </motion.g>

        <motion.g
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          filter="url(#vectorGlow)"
        >
          <rect x="370" y="320" width="140" height="65" rx="14" fill="#FFFFFF" />
          <rect x="370" y="320" width="140" height="65" rx="14" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="398" cy="352" r="15" fill="#6366F1" opacity="0.12" />
          <path d="M 393 352 L 397 356 L 404 348" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="422" y="338" width="70" height="8" rx="4" fill="#1E293B" />
          <rect x="422" y="352" width="50" height="6" rx="3" fill="#94A3B8" />
        </motion.g>

        {/* --- PEOPLE VECTOR FIGURES --- */}
        <g filter="url(#vectorGlow)">
          <line x1="160" y1="420" x2="185" y2="300" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
          <line x1="180" y1="420" x2="205" y2="300" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
          <line x1="168" y1="390" x2="188" y2="390" stroke="#E2E8F0" strokeWidth="3" />
          <line x1="173" y1="360" x2="193" y2="360" stroke="#E2E8F0" strokeWidth="3" />
          <line x1="178" y1="330" x2="198" y2="330" stroke="#E2E8F0" strokeWidth="3" />

          <circle cx="190" cy="285" r="10" fill="#FCA5A5" />
          <path d="M 180 325 L 190 298 L 202 325 Z" fill="#6366F1" />
          <rect x="182" y="325" width="7" height="30" fill="#1E293B" />
          <rect x="193" y="325" width="7" height="30" fill="#1E293B" />
        </g>

        <g filter="url(#vectorGlow)">
          <circle cx="120" cy="385" r="10" fill="#FCA5A5" />
          <rect x="110" y="396" width="20" height="32" rx="6" fill="#818CF8" />
          <rect x="112" y="428" width="7" height="30" fill="#1E293B" />
          <rect x="121" y="428" width="7" height="30" fill="#1E293B" />
          <rect x="125" y="402" width="14" height="18" rx="2" fill="#FFFFFF" stroke="#94A3B8" />
        </g>
      </svg>
    </div>
  );
};

export default BenefitsVectorIllustration;
