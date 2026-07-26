import React from "react";
import { motion } from "framer-motion";

const HeroVectorIllustration = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center p-2">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#EEF2FF] via-[#F7F8FC] to-[#FFFFFF] dark:from-[#6366F1]/30 dark:to-[#818CF8]/20 rounded-full blur-3xl -z-10" />

      <svg
        viewBox="0 0 700 550"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl select-none"
      >
        <defs>
          {/* Fresh Gradients */}
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
          <linearGradient id="softLavenderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EEF2FF" />
            <stop offset="100%" stopColor="#F7F8FC" />
          </linearGradient>
          <linearGradient id="warmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="codeScreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          
          {/* Shadows */}
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#6366F1" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* --- CONNECTING WIRES & DATA PACKETS --- */}
        <path d="M 170 140 Q 230 160 300 180" stroke="#A5B4FC" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
        <path d="M 170 310 Q 240 300 300 280" stroke="#A5B4FC" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
        <path d="M 530 140 Q 470 170 410 180" stroke="#A5B4FC" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
        <path d="M 540 310 Q 480 300 410 290" stroke="#A5B4FC" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />

        {/* Animated Data Packets */}
        <motion.circle
          r="4"
          fill="#F59E0B"
          animate={{ cx: [170, 300], cy: [140, 180] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          r="4"
          fill="#818CF8"
          animate={{ cx: [540, 410], cy: [310, 290] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />

        {/* --- MAIN DESK & STAND --- */}
        <rect x="180" y="380" width="340" height="12" rx="6" fill="url(#purpleGrad)" />
        <rect x="220" y="392" width="12" height="110" fill="#94A3B8" />
        <rect x="468" y="392" width="12" height="110" fill="#94A3B8" />
        <rect x="195" y="498" width="60" height="8" rx="4" fill="#6366F1" />
        <rect x="445" y="498" width="60" height="8" rx="4" fill="#6366F1" />

        {/* --- MAIN CENTER CODE MONITOR --- */}
        <g filter="url(#softShadow)">
          <rect x="335" y="350" width="30" height="32" fill="#6366F1" />
          <path d="M 315 380 L 385 380 L 375 383 L 325 383 Z" fill="#1E293B" />
          {/* Monitor Frame */}
          <rect x="235" y="145" width="230" height="210" rx="14" fill="#1E293B" />
          {/* Monitor Display */}
          <rect x="242" y="152" width="216" height="196" rx="10" fill="url(#codeScreenGrad)" />

          {/* Window Title Bar */}
          <rect x="242" y="152" width="216" height="24" rx="10" fill="#334155" />
          <circle cx="258" cy="164" r="4" fill="#FB7185" />
          <circle cx="270" cy="164" r="4" fill="#FBBF24" />
          <circle cx="282" cy="164" r="4" fill="#34D399" />
          <rect x="300" y="160" width="100" height="8" rx="4" fill="#818CF8" />

          {/* Code Syntax Lines */}
          <g>
            <rect x="256" y="190" width="35" height="6" rx="3" fill="#818CF8" />
            <rect x="296" y="190" width="55" height="6" rx="3" fill="#F59E0B" />
            <rect x="356" y="190" width="40" height="6" rx="3" fill="#34D399" />

            <rect x="270" y="204" width="45" height="6" rx="3" fill="#FBBF24" />
            <rect x="320" y="204" width="70" height="6" rx="3" fill="#E2E8F0" />

            <rect x="270" y="218" width="60" height="6" rx="3" fill="#A5B4FC" />
            <rect x="335" y="218" width="30" height="6" rx="3" fill="#FB7185" />

            <rect x="284" y="232" width="40" height="6" rx="3" fill="#34D399" />
            <rect x="329" y="232" width="80" height="6" rx="3" fill="#94A3B8" />

            <rect x="284" y="246" width="65" height="6" rx="3" fill="#FBBF24" />
            <rect x="354" y="246" width="35" height="6" rx="3" fill="#818CF8" />

            <rect x="270" y="260" width="50" height="6" rx="3" fill="#6366F1" />
            <rect x="256" y="274" width="30" height="6" rx="3" fill="#F59E0B" />
            <rect x="291" y="274" width="60" height="6" rx="3" fill="#E2E8F0" />

            {/* Blinking Cursor */}
            <motion.rect
              x="356"
              y="274"
              width="8"
              height="8"
              fill="#F59E0B"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </g>
        </g>

        {/* --- SECONDARY DISPLAY MONITOR (Right side) --- */}
        <g filter="url(#softShadow)">
          <rect x="465" y="230" width="130" height="110" rx="10" fill="#1E293B" />
          <rect x="470" y="235" width="120" height="100" rx="8" fill="#F7F8FC" />
          {/* Header UI bar */}
          <rect x="476" y="242" width="108" height="14" rx="4" fill="#EEF2FF" />
          <circle cx="484" cy="249" r="3" fill="#6366F1" />
          <rect x="492" y="247" width="45" height="4" rx="2" fill="#94A3B8" />
          {/* Grid Layout Cards */}
          <rect x="476" y="262" width="50" height="65" rx="6" fill="#6366F1" opacity="0.12" />
          <rect x="482" y="268" width="38" height="24" rx="4" fill="#6366F1" />
          <rect x="482" y="296" width="38" height="6" rx="3" fill="#A5B4FC" />
          <rect x="482" y="306" width="24" height="6" rx="3" fill="#94A3B8" />

          <rect x="532" y="262" width="52" height="65" rx="6" fill="#F59E0B" opacity="0.15" />
          <rect x="538" y="268" width="40" height="8" rx="4" fill="#F59E0B" />
          <rect x="538" y="280" width="40" height="8" rx="4" fill="#FBBF24" />
          <rect x="538" y="292" width="40" height="8" rx="4" fill="#34D399" />
        </g>

        {/* --- FLOATING UI CARD 1: TOP-LEFT AI CARD --- */}
        <motion.g
          filter="url(#softShadow)"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="70" y="70" width="130" height="95" rx="14" fill="#FFFFFF" />
          <rect x="70" y="70" width="130" height="95" rx="14" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* AI Pill Badge */}
          <rect x="84" y="84" width="42" height="22" rx="11" fill="url(#purpleGrad)" />
          <text x="105" y="99" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">AI</text>
          {/* Node Grid Dots */}
          <circle cx="88" cy="120" r="3" fill="#6366F1" />
          <circle cx="120" cy="120" r="3" fill="#818CF8" />
          <circle cx="152" cy="120" r="3" fill="#6366F1" />
          <line x1="88" y1="120" x2="152" y2="120" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="2 2" />
          <rect x="84" y="136" width="102" height="12" rx="6" fill="#F1F5F9" />
          <rect x="84" y="136" width="60" height="12" rx="6" fill="#818CF8" />
        </motion.g>

        {/* --- FLOATING UI CARD 2: MID-LEFT FLOWCHART CARD --- */}
        <motion.g
          filter="url(#softShadow)"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <rect x="65" y="225" width="125" height="110" rx="14" fill="#FFFFFF" />
          <rect x="65" y="225" width="125" height="110" rx="14" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="110" y="240" width="35" height="18" rx="6" fill="#EEF2FF" stroke="#6366F1" strokeWidth="1.5" />
          <circle cx="88" cy="285" r="9" fill="#F59E0B" opacity="0.2" />
          <circle cx="88" cy="285" r="5" fill="#F59E0B" />
          <circle cx="167" cy="285" r="9" fill="#34D399" opacity="0.2" />
          <circle cx="167" cy="285" r="5" fill="#34D399" />
          <path d="M 127 258 L 127 270 L 88 270 L 88 280" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
          <path d="M 127 270 L 167 270 L 167 280" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
          <rect x="78" y="308" width="40" height="14" rx="4" fill="#6366F1" />
          <rect x="124" y="308" width="54" height="14" rx="4" fill="#EEF2FF" />
        </motion.g>

        {/* --- FLOATING UI CARD 3: TOP-RIGHT HEADER CARD --- */}
        <motion.g
          filter="url(#softShadow)"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <rect x="510" y="55" width="145" height="75" rx="14" fill="#FFFFFF" />
          <rect x="510" y="55" width="145" height="75" rx="14" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="522" y="68" width="35" height="10" rx="5" fill="#6366F1" />
          <circle cx="615" cy="73" r="4" fill="#94A3B8" />
          <circle cx="630" cy="73" r="4" fill="#F59E0B" />
          <rect x="522" y="88" width="120" height="30" rx="8" fill="#F1F5F9" />
          <rect x="530" y="96" width="40" height="14" rx="4" fill="#818CF8" />
          <rect x="576" y="96" width="56" height="14" rx="4" fill="#EEF2FF" />
        </motion.g>

        {/* --- FLOATING UI CARD 4: MID-RIGHT ANALYTICS CARD --- */}
        <motion.g
          filter="url(#softShadow)"
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        >
          <rect x="520" y="240" width="135" height="105" rx="14" fill="#FFFFFF" />
          <rect x="520" y="240" width="135" height="105" rx="14" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="535" y="295" width="12" height="35" rx="4" fill="#A5B4FC" />
          <rect x="553" y="275" width="12" height="55" rx="4" fill="#6366F1" />
          <rect x="571" y="285" width="12" height="45" rx="4" fill="#F59E0B" />
          <rect x="589" y="260" width="12" height="70" rx="4" fill="#34D399" />

          {/* Mini Donut Chart */}
          <circle cx="625" cy="275" r="16" fill="none" stroke="#EEF2FF" strokeWidth="6" />
          <circle
            cx="625"
            cy="275"
            r="16"
            fill="none"
            stroke="#6366F1"
            strokeWidth="6"
            strokeDasharray="70 30"
            strokeDashoffset="15"
          />
        </motion.g>

        {/* --- DEVELOPER / USER AT DESK --- */}
        <g filter="url(#softShadow)">
          <rect x="300" y="315" width="85" height="95" rx="18" fill="#A5B4FC" />
          <rect x="312" y="325" width="61" height="75" rx="12" fill="#6366F1" />

          {/* User Shirt */}
          <path d="M 310 440 C 310 395 330 380 342 380 C 354 380 375 395 375 440 Z" fill="#6366F1" />
          <rect x="337" y="365" width="12" height="18" rx="6" fill="#FCA5A5" />
          <circle cx="343" cy="354" r="16" fill="#FCA5A5" />
          <path d="M 330 350 C 330 338 340 335 348 335 C 358 335 360 345 358 355 C 354 345 342 344 330 350 Z" fill="#1E293B" />

          {/* Arms */}
          <path d="M 320 405 Q 310 425 330 432" stroke="#6366F1" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 365 405 Q 375 425 355 432" stroke="#6366F1" strokeWidth="10" strokeLinecap="round" fill="none" />
          <circle cx="330" cy="432" r="5" fill="#FCA5A5" />
          <circle cx="355" cy="432" r="5" fill="#FCA5A5" />

          {/* Laptop */}
          <path d="M 320 428 L 365 428 L 372 434 L 313 434 Z" fill="#94A3B8" />

          {/* Legs & Shoes */}
          <rect x="325" y="440" width="15" height="55" rx="7" fill="#1E293B" />
          <rect x="346" y="440" width="15" height="55" rx="7" fill="#1E293B" />
          <rect x="320" y="490" width="22" height="10" rx="5" fill="#818CF8" />
          <rect x="344" y="490" width="22" height="10" rx="5" fill="#818CF8" />
        </g>

        {/* --- POTTED PLANT --- */}
        <g>
          <path d="M 620 480 L 640 480 L 636 510 L 624 510 Z" fill="#F59E0B" />
          <path d="M 630 480 Q 610 450 600 460 Q 620 475 630 480 Z" fill="#34D399" />
          <path d="M 630 480 Q 650 445 660 455 Q 640 475 630 480 Z" fill="#10B981" />
          <path d="M 630 480 Q 630 435 635 440 Q 632 465 630 480 Z" fill="#6EE7B7" />
        </g>
      </svg>
    </div>
  );
};

export default HeroVectorIllustration;
