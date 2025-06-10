import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const StatCard = ({ title, value, icon, color, change, index, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index * 0.05) + 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-surface-200 hover:shadow-lg transition-all"
            {...props}
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
                    <ApperIcon name={icon} size={20} className="text-white" />
                </div>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: (index * 0.1) + 0.3, type: "spring" }}
                    className="text-right"
                >
                    <Heading level={2} className="!text-2xl font-heading font-bold text-surface-900">
                        {value}
                    </Heading>
                </motion.div>
            </div>
            <Heading level={3} className="font-medium text-surface-900 mb-1">{title}</Heading>
            <Paragraph className="text-sm text-surface-600">{change}</Paragraph>
        </motion.div>
    );
};

export default StatCard;