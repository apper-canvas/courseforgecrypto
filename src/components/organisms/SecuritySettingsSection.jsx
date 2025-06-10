import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import InfoCard from '@/components/molecules/InfoCard';

const SecuritySettingsSection = ({ ...props }) => {
    const securityItems = [
        { label: 'Two-Factor Authentication', status: 'Enabled', color: 'text-success' },
        { label: 'SSL Certificate', status: 'Active', color: 'text-success' },
        { label: 'Data Backup', status: 'Daily', color: 'text-success' },
        { label: 'Activity Logging', status: 'Enabled', color: 'text-success' }
    ];

    const securityEvents = [
        { event: 'Admin login from new device', time: '2 hours ago', type: 'info' },
        { event: 'Failed login attempt blocked', time: '1 day ago', type: 'warning' },
        { event: 'Security scan completed', time: '3 days ago', type: 'success' }
    ];

    return (
        <motion.div
            key="security"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            {...props}
        >
            <InfoCard
                title="Security Status"
                icon="Shield"
                iconColor="bg-success"
                className="bg-gradient-to-br from-success/10 to-success/5 border-success/20"
                content={
                    <>
                        <Paragraph className="text-surface-700 mb-4">Your system is secure and up to date.</Paragraph>
                        <Paragraph className="text-sm text-surface-600">
                            Last security check: {new Date().toLocaleDateString()}
                        </Paragraph>
                    </>
                }
            />

            <div className="space-y-4">
                <Heading level={3} className="!text-lg font-heading font-semibold text-surface-900">
                    Security Settings
                </Heading>

                <div className="space-y-3">
                    {securityItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
                            <Paragraph className="!text-surface-700 !text-sm">{item.label}</Paragraph>
                            <Paragraph className={`!text-sm !font-medium ${item.color}`}>{item.status}</Paragraph>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t border-surface-200">
                <Heading level={3} className="!text-lg font-heading font-semibold text-surface-900 mb-4">
                    Recent Security Events
                </Heading>

                <div className="space-y-3">
                    {securityEvents.map((event, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-surface-50 rounded-lg">
                            <div className={`w-2 h-2 rounded-full ${
                                event.type === 'success' ? 'bg-success' :
                                event.type === 'warning' ? 'bg-accent' : 'bg-info'
                            }`}></div>
                            <div className="flex-1">
                                <Paragraph className="!text-sm !text-surface-900">{event.event}</Paragraph>
                                <Paragraph className="!text-xs !text-surface-500">{event.time}</Paragraph>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default SecuritySettingsSection;