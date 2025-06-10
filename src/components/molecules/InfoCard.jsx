import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const InfoCard = ({ title, content, icon, iconColor, headerClassName, bodyClassName, ...props }) => {
    return (
        <div className={`rounded-xl p-6 border ${props.className}`}>
            <div className={`flex items-center space-x-3 mb-4 ${headerClassName}`}>
                {icon && (
                    <div className={`w-8 h-8 ${iconColor} rounded-lg flex items-center justify-center`}>
                        <ApperIcon name={icon} size={16} className="text-white" />
                    </div>
                )}
                <Heading level={3} className="font-heading font-semibold text-surface-900">{title}</Heading>
            </div>
            <div className={bodyClassName}>
                {typeof content === 'string' ? <Paragraph className="text-sm text-surface-700 mb-3">{content}</Paragraph> : content}
            </div>
        </div>
    );
};

export default InfoCard;