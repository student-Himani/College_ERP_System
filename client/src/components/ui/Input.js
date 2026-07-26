import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Input = ({
  label,
  error,
  icon: Icon,
  className = "",
  containerClassName = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-xs font-bold text-primary/60 uppercase tracking-widest pl-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${isFocused ? 'text-accent' : 'text-primary/30'}`}>
            <Icon size={18} />
          </div>
        )}
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full transition-all duration-300 outline-none
            bg-white border-2 rounded-xl text-sm font-medium text-primary
            placeholder:text-primary/20
            ${Icon ? "pl-11 pr-4" : "px-4"}
            ${isFocused ? "border-accent ring-4 ring-accent/5 shadow-md py-3" : "border-primary/5 py-3 shadow-sm hover:border-primary/20"}
            ${error ? "border-red-400 ring-red-100" : ""}
            ${className}
          `}
          {...props}
        />
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-[11px] font-bold text-red-500 mt-1 pl-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Input;
