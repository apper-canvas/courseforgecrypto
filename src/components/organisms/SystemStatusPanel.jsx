import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import InfoCard from '@/components/molecules/InfoCard';
import Paragraph from '@/components/atoms/Paragraph';

const SystemStatusPanel = ({ className, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={className}
            {...props}
        >
            <InfoCard
                title="System Status"
                icon="CheckCircle"
                iconColor="bg-success"
                className="bg-gradient-to-br from-success/10 to-success/5 border-success/20"
                content={
                    <>
                        <Paragraph className="text-sm text-surface-700 mb-3">All systems operational</Paragraph>
                        <Paragraph className="text-xs text-surface-600">Last updated: {new Date().toLocaleTimeString()}</Paragraph>
                    </>
                }
            />
        </motion.div>
    );
};

export default SystemStatusPanel;