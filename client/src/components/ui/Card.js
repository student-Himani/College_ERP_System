import React from "react";
import { motion } from "framer-motion";

const Card = ({ 
  children, 
  title, 
  subtitle, 
  className = "", 
  animate = true,
  variant = "flat", // flat, glass, outline
  ...props 
}) => {
  const variants = {
    flat: "bg-white shadow-premium border border-gray-100",
    glass: "glass shadow-premium",
    outline: "bg-transparent border-2 border-primary/10",
  };

  const Component = animate ? motion.div : "div";
  const animationProps = animate ? {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
    whileHover: { y: -4, boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.08)" }
  } : {};

  return (
    <Component
      className={`rounded-2xl p-6 transition-all duration-300 ${variants[variant]} ${className}`}
      {...animationProps}
      {...props}
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="text-lg font-bold text-primary tracking-tight">{title}</h3>}
          {subtitle && <p className="text-sm text-primary/50 mt-1 font-medium">{subtitle}</p>}
        </div>
      )}
      {children}
    </Component>
  );
};

export default Card;
