import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import InfoCard from '@/components/molecules/InfoCard';
import Paragraph from '@/components/atoms/Paragraph';

const UserActivityPanel = ({ activeUsersCount, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            {...props}
        >
            <InfoCard
                title="User Activity"
                icon="TrendingUp"
                iconColor="bg-primary"
                className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
                content={
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <Paragraph className="!text-surface-600 !text-sm">Daily Active Users:</Paragraph>
                            <Paragraph className="!text-surface-900 !font-medium !text-sm">
                                {Math.floor(activeUsersCount * 0.6)}
                            </Paragraph>
                        </div>
                        <div className="flex justify-between">
                            <Paragraph className="!text-surface-600 !text-sm">Avg. Session Time:</Paragraph>
                            <Paragraph className="!text-surface-900 !font-medium !text-sm">24 min</Paragraph>
                        </div>
                        <div className="flex justify-between">
                            <Paragraph className="!text-surface-600 !text-sm">Course Views:</Paragraph>
                            <Paragraph className="!text-surface-900 !font-medium !text-sm">1,247</Paragraph>
                        </div>
                    </div>
                }
            />
        </motion.div>
    );
};

export default UserActivityPanel;