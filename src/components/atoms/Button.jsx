import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, className, onClick, disabled, type = 'button', icon: Icon, ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {Icon && <Icon size={props.iconSize || 18} />}
            {children}
        </motion.button>
    );
};

export default Button;