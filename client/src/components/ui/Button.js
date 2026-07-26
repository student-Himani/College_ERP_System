import React from "react";
import { motion } from "framer-motion";

const variants = {
  primary: "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg",
  secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-sm",
  accent: "bg-accent text-white hover:bg-accent/90 shadow-sm",
  outline: "border-2 border-primary/20 text-primary hover:bg-primary/5",
  ghost: "text-primary/70 hover:text-primary hover:bg-primary/5",
  danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  icon: Icon,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!isLoading && Icon && <Icon size={18} className="opacity-90" />}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;
