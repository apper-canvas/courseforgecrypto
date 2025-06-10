import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import FormField from '@/components/molecules/FormField';
import Paragraph from '@/components/atoms/Paragraph';
import Checkbox from '@/components/atoms/Checkbox';

const NotificationsSettingsSection = ({ settings, onSettingChange, ...props }) => {
    const emailNotifications = [
        { key: 'newEnrollment', label: 'New Course Enrollments' },
        { key: 'courseCompletion', label: 'Course Completions' },
        { key: 'newComment', label: 'New Comments' },
        { key: 'systemUpdates', label: 'System Updates' }
    ];

    return (
        <motion.div
            key="notifications"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            {...props}
        >
            <div className="space-y-4">
                <Heading level={3} className="!text-lg font-heading font-semibold text-surface-900">
                    Notification Settings
                </Heading>

                <FormField
                    label="Enable Notifications"
                    id="enable-notifications"
                    type="checkbox"
                    value={settings.enableNotifications}
                    onChange={(e) => onSettingChange('enableNotifications', e.target.checked)}
                    description="Send notifications for important events"
                />
            </div>

            <div className="space-y-4">
                <Heading level={4} className="font-medium text-surface-900">Email Notifications</Heading>

                {emailNotifications.map(notification => (
                    <label key={notification.key} className="flex items-center space-x-3">
                        <Checkbox defaultChecked /> {/* These were static in original code, not linked to state */}
                        <Paragraph className="!text-surface-700 !text-sm">{notification.label}</Paragraph>
                    </label>
                ))}
            </div>
        </motion.div>
    );
};

export default NotificationsSettingsSection;