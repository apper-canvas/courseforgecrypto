import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';

const EmptyState = ({
    icon,
    title,
    description,
    actionButton,
    animatedIcon = true,
    className = ""
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-center py-12 ${className}`}
        >
            {animatedIcon ? (
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                >
                    <ApperIcon name={icon} className="w-16 h-16 text-surface-300 mx-auto" />
                </motion.div>
            ) : (
                <ApperIcon name={icon} className="w-16 h-16 text-surface-300 mx-auto" />
            )}
            
            <Heading level={3} className="mt-4 text-lg font-medium text-surface-900">
                {title}
            </Heading>
            <Paragraph className="mt-2 text-surface-600">
                {description}
            </Paragraph>
            {actionButton && (
                <div className="mt-4">
                    {actionButton}
                </div>
            )}
        </motion.div>
    );
};

export default EmptyState;