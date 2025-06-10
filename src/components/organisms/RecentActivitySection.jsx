import React from 'react';
import { motion } from 'framer-motion';
import ActivityItem from '@/components/molecules/ActivityItem';
import Heading from '@/components/atoms/Heading';

const RecentActivitySection = ({ activityData, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
            {...props}
        >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-surface-200">
                <Heading level={2} className="!text-lg font-heading font-semibold text-surface-900 mb-6">
                    Recent Activity
                </Heading>
                <div className="space-y-4">
                    {activityData.map((activity, index) => (
                        <ActivityItem
                            key={index}
                            icon={activity.icon}
                            message={activity.message}
                            time={activity.time}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default RecentActivitySection;