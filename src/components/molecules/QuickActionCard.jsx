import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const QuickActionCard = ({ title, description, icon, color, onClick, index, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (index * 0.1) + 0.6 }}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={onClick}
            className="bg-white p-6 rounded-xl shadow-sm border border-surface-200 cursor-pointer hover:shadow-lg transition-all"
            {...props}
        >
            <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
                <ApperIcon name={icon} size={20} className="text-white" />
            </div>
            <Heading level={3} className="!text-lg font-heading font-semibold text-surface-900 mb-2">
                {title}
            </Heading>
            <Paragraph className="text-surface-600">
                {description}
            </Paragraph>
        </motion.div>
    );
};

export default QuickActionCard;