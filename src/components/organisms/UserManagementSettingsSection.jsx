import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import FormField from '@/components/molecules/FormField';
import InfoCard from '@/components/molecules/InfoCard';
import ApperIcon from '@/components/ApperIcon';

const UserManagementSettingsSection = ({ settings, onSettingChange, ...props }) => {
    const userStats = [
        { label: 'Total Users', value: '1,247', icon: 'Users', color: 'bg-primary' },
        { label: 'Active This Month', value: '892', icon: 'UserCheck', color: 'bg-success' },
        { label: 'Pending Approval', value: '23', icon: 'UserX', color: 'bg-accent' }
    ];

    return (
        <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            {...props}
        >
            <div className="space-y-4">
                <Heading level={3} className="!text-lg font-heading font-semibold text-surface-900">
                    Registration Settings
                </Heading>

                <FormField
                    label="Allow User Registration"
                    id="allow-registration"
                    type="checkbox"
                    value={settings.allowRegistration}
                    onChange={(e) => onSettingChange('allowRegistration', e.target.checked)}
                    description="Let users create their own accounts"
                />
                <FormField
                    label="Require Email Verification"
                    id="require-email-verification"
                    type="checkbox"
                    value={settings.requireEmailVerification}
                    onChange={(e) => onSettingChange('requireEmailVerification', e.target.checked)}
                    description="Users must verify their email before accessing courses"
                />
            </div>

            <div className="pt-6 border-t border-surface-200">
                <Heading level={3} className="!text-lg font-heading font-semibold text-surface-900 mb-4">
                    User Statistics
                </Heading>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {userStats.map((stat, index) => (
                        <div key={stat.label} className="bg-surface-50 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                                    <ApperIcon name={stat.icon} size={16} className="text-white" />
                                </div>
                                <div>
                                    <Heading level={2} className="!text-lg font-heading font-bold text-surface-900">
                                        {stat.value}
                                    </Heading>
                                    <p className="text-sm text-surface-600">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default UserManagementSettingsSection;