import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className, ...props }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${className}`}
            {...props}
        />
    );
};

export default Input;