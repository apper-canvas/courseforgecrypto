import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/molecules/StatCard';

const DashboardStatsGrid = ({ statCards, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            {...props}
        >
            {statCards.map((stat, index) => (
                <StatCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                    change={stat.change}
                    index={index}
                />
            ))}
        </motion.div>
    );
};

export default DashboardStatsGrid;