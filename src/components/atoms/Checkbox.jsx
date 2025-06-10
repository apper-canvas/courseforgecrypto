import React from 'react';

const Checkbox = ({ checked, onChange, className, ...props }) => {
    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className={`rounded border-surface-300 text-primary focus:ring-primary/20 ${className}`}
            {...props}
        />
    );
};

export default Checkbox;