import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const TabButton = ({ label, icon, isActive, onClick, ...props }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-surface-500 hover:text-surface-700 hover:border-surface-300'
            }`}
            {...props}
        >
            {icon && <ApperIcon name={icon} size={16} />}
            <span>{label}</span>
        </button>
    );
};

export default TabButton;