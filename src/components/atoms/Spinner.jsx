import React from 'react';

const Spinner = ({ size = 4, className = 'border-white/30 border-t-white', ...props }) => {
    const spinnerSize = `w-${size} h-${size}`;
    return (
        <div
            className={`${spinnerSize} border-2 rounded-full animate-spin ${className}`}
            role="status"
            aria-label="Loading"
            {...props}
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Spinner;