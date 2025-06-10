import React from 'react';

const Select = ({ value, onChange, children, className, ...props }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${className}`}
            {...props}
        >
            {children}
        </select>
    );
};

export default Select;