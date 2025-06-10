import React from 'react';
import { motion } from 'framer-motion';
import Paragraph from '@/components/atoms/Paragraph';

const ChartBarPair = ({ label, enrollmentValue, completionValue, index, maxScale = 60 }) => {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <Paragraph className="!text-surface-700 !text-sm">{label}</Paragraph>
                <Paragraph className="!text-surface-600 !text-sm">
                    {enrollmentValue} / {completionValue}
                </Paragraph>
            </div>
            <div className="flex space-x-2">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(enrollmentValue / maxScale) * 100}%` }}
                    transition={{ delay: (index * 0.1) + 0.5, duration: 0.6 }}
                    className="h-2 bg-primary rounded-full"
                />
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(completionValue / maxScale) * 100}%` }}
                    transition={{ delay: (index * 0.1) + 0.7, duration: 0.6 }}
                    className="h-2 bg-success rounded-full"
                />
            </div>
        </div>
    );
};

export default ChartBarPair;