import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const PageHeader = ({ title, description, actionButton, onBack, className, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 ${className}`}
            {...props}
        >
            <div className="flex items-center space-x-4">
                {onBack && (
                    <Button
                        onClick={onBack}
                        className="p-2 hover:bg-surface-100 rounded-lg"
                        icon={ApperIcon}
                        name="ArrowLeft"
                        iconSize={20}
                    />
                )}
                <div>
                    <Heading level={1} className="!text-3xl font-heading font-bold text-surface-900 mb-2">
                        {title}
                    </Heading>
                    <Paragraph className="text-surface-600">{description}</Paragraph>
                </div>
            </div>
            {actionButton}
        </motion.div>
    );
};

export default PageHeader;