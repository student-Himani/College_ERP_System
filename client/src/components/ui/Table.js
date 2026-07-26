import React from "react";
import { motion } from "framer-motion";

const Table = ({ 
  headers, 
  data, 
  renderRow, 
  isLoading = false,
  emptyMessage = "No data available" 
}) => {
  return (
    <div className="w-full overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-premium">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface/50 border-b border-gray-100">
              {headers.map((header, index) => (
                <th 
                  key={index} 
                  className="px-6 py-4 text-[11px] font-bold text-primary/40 uppercase tracking-widest whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {headers.map((_, j) => (
                    <td key={j} className="px-6 py-5">
                      <div className="h-4 bg-gray-100 rounded-lg w-full"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  key={item._id || index}
                  className="hover:bg-surface/30 transition-colors group cursor-default"
                >
                  {renderRow(item)}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="px-6 py-12 text-center text-primary/40 font-medium">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
