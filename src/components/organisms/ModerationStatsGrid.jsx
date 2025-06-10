import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/molecules/StatCard';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import ApperIcon from '@/components/ApperIcon';

const ModerationStatsGrid = ({ stats, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            {...props}
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index * 0.05) + 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-surface-200"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <Heading level={2} className="!text-2xl font-heading font-bold text-surface-900">
                                {stat.value}
                            </Heading>
                            <Paragraph className="text-sm text-surface-600">{stat.label}</Paragraph>
                        </div>
                        <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                            <ApperIcon name={stat.icon} size={20} className="text-white" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default ModerationStatsGrid;