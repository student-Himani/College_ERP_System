import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Main Layout Shell for ERP Dashboards
 * @param {ReactNode} children Page content
 * @param {Array} menuItems Sidebar menu items
 * @param {string} role User role (Student, Faculty, Admin, Warden)
 */
const DashboardShell = ({ children, menuItems, role }) => {
  return (
    <div className="flex bg-surface min-h-screen overflow-hidden">
      {/* Sidebar - Fixed/Collapsible */}
      <Sidebar menuItems={menuItems} role={`${role} Portal`} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Navbar */}
        <Navbar userType={role} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth scrollbar-thin scrollbar-thumb-light/40 scrollbar-track-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-7xl mx-auto pb-12"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Floating Action Button or localized status could go here */}
      </div>
    </div>
  );
};

export default DashboardShell;
