import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Button from '@/components/atoms/Button';

const QuickActionsSection = ({ actions, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
            {...props}
        >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-surface-200">
                <Heading level={2} className="!text-lg font-heading font-semibold text-surface-900 mb-6">
                    Quick Actions
                </Heading>
                <div className="space-y-3">
                    {actions.map((action, index) => (
                        <Button
                            key={action.label}
                            onClick={action.onClick}
                            className="w-full flex items-center space-x-3 p-3 text-left hover:bg-surface-50 rounded-lg"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.1) + 0.5 }}
                            icon={ApperIcon}
                            name={action.icon}
                            iconSize={14}
                        >
                            <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                                <ApperIcon name={action.icon} size={14} className="text-white" />
                            </div>
                            <span className="text-sm text-surface-700">{action.label}</span>
                        </Button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default QuickActionsSection;