import React from 'react';

const Label = ({ htmlFor, children, className, ...props }) => {
    return (
        <label htmlFor={htmlFor} className={`block text-sm font-medium text-surface-700 mb-2 ${className}`} {...props}>
            {children}
        </label>
    );
};

export default Label;