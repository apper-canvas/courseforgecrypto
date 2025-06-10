import React from 'react';
import { motion } from 'framer-motion';

const Heading = ({ level, children, className, ...props }) => {
    const Tag = `h${level}`;
    const defaultClasses = {
        1: "text-3xl lg:text-5xl font-heading font-bold text-surface-900",
        2: "text-2xl font-heading font-bold text-surface-900",
        3: "text-lg font-heading font-semibold text-surface-900",
        4: "font-medium text-surface-900",
        5: "text-sm font-medium text-surface-900",
        6: "text-xs font-medium text-surface-900",
    };

    return (
        <Tag className={`${defaultClasses[level] || defaultClasses[3]} ${className}`} {...props}>
            {children}
        </Tag>
    );
};

export default Heading;