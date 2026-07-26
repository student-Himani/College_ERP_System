import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Headphones,
} from "lucide-react";

/**
 * Modern, animated Sidebar component with landing page theme
 * @param {Array} menuItems Array of menu items grouped by sections
 * @param {string} role Portal name (e.g., Student Portal)
 */
const Sidebar = ({ menuItems, role = "Portal" }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const containerVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  return (
    <motion.div
      variants={containerVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col h-screen bg-gradient-to-b from-[#FFFFFF] to-[#F7F8FC] dark:from-[#1E293B] dark:to-[#0F172A] border-r border-[#E2E8F0] dark:border-[#334155] shadow-xl shadow-[#6366F1]/5 z-20 overflow-hidden"
    >
      {/* Animated background gradient blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#6366F1] to-[#818CF8] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
      />

      {/* Header / Logo */}
      <div className="flex items-center gap-4 px-5 py-6 border-b border-[#E2E8F0] dark:border-[#334155] relative z-10">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6366F1] to-[#818CF8] flex items-center justify-center shadow-lg shadow-[#6366F1]/25"
        >
          <GraduationCap className="text-white w-6 h-6" />
        </motion.div>
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              variants={itemVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              transition={{ duration: 0.3 }}
              className="flex flex-col overflow-hidden whitespace-nowrap"
            >
              <motion.h1
                className="text-xl font-black text-[#1E293B] dark:text-white tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Halci <span className="bg-gradient-to-r from-[#6366F1] to-[#818CF8] bg-clip-text text-transparent">ERP</span>
              </motion.h1>
              <motion.p
                className="text-[10px] font-bold text-[#6366F1] dark:text-[#A5B4FC] uppercase tracking-widest flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Sparkles className="w-3 h-3" />
                {role}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 space-y-6 overflow-y-auto scrollbar-hide relative z-10">
        {menuItems.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-2"
          >
            {!isCollapsed && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-4 text-[10px] font-extrabold text-[#6366F1] dark:text-[#A5B4FC] uppercase tracking-[0.2em] mb-3"
              >
                {section.section}
              </motion.p>
            )}
            <div className="space-y-1">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`
                      group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                      ${isActive
                        ? "bg-gradient-to-r from-[#6366F1] to-[#818CF8] text-white shadow-lg shadow-[#6366F1]/25"
                        : "text-[#64748B] dark:text-[#94A3B8] hover:bg-[#EEF2FF] dark:hover:bg-[#6366F1]/10 hover:text-[#6366F1] dark:hover:text-[#A5B4FC]"}
                      ${isCollapsed ? "justify-center" : ""}
                    `}
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon
                        size={20}
                        className={`${isActive ? "text-white" : "text-[#6366F1] dark:text-[#A5B4FC] group-hover:text-[#6366F1]"}`}
                      />
                    </motion.div>
                    <AnimatePresence mode="wait">
                      {!isCollapsed && (
                        <motion.span
                          variants={itemVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          className="text-sm font-bold tracking-tight"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Active indicator line */}
                    {isActive && !isCollapsed && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="absolute left-full ml-4 px-3 py-1.5 bg-[#6366F1] text-white text-xs rounded-lg opacity-0 pointer-events-none whitespace-nowrap z-50 shadow-lg shadow-[#6366F1]/25"
                      >
                        {item.label}
                      </motion.div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Collapse Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 w-7 h-7 flex items-center justify-center bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-full shadow-lg shadow-[#6366F1]/10 text-[#6366F1] hover:text-[#818CF8] transition-all z-30"
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </motion.div>
      </motion.button>

      {/* Footer Support */}
      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            className="p-4 mt-auto relative z-10"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-[#EEF2FF] to-[#F7F8FC] dark:from-[#6366F1]/10 dark:to-[#1E293B] rounded-2xl p-4 border border-[#E2E8F0] dark:border-[#334155] shadow-lg shadow-[#6366F1]/5"
            >
              <div className="flex items-center gap-2 mb-2">
                <Headphones className="w-4 h-4 text-[#6366F1]" />
                <p className="text-[10px] font-bold text-[#6366F1] dark:text-[#A5B4FC] uppercase tracking-widest">Support</p>
              </div>
              <p className="text-sm font-bold text-[#1E293B] dark:text-white mb-3">Need Help?</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2.5 bg-gradient-to-r from-[#6366F1] to-[#818CF8] text-white rounded-xl text-xs font-bold shadow-lg shadow-[#6366F1]/25 hover:shadow-[#6366F1]/40 transition-all"
              >
                Contact Support
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Sidebar;
