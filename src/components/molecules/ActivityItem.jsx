import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Paragraph from '@/components/atoms/Paragraph';

const ActivityItem = ({ icon, message, time, index, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (index * 0.1) + 0.4 }}
            className="flex items-center space-x-4 p-3 hover:bg-surface-50 rounded-lg transition-colors"
            {...props}
        >
            <div className="w-10 h-10 bg-surface-100 rounded-full flex items-center justify-center">
                <ApperIcon name={icon} size={16} className="text-surface-600" />
            </div>
            <div className="flex-1 min-w-0">
                <Paragraph className="text-sm text-surface-900 break-words">{message}</Paragraph>
                <Paragraph className="text-xs text-surface-500">{time}</Paragraph>
            </div>
        </motion.div>
    );
};

export default ActivityItem;