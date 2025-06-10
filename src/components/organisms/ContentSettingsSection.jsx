import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import FormField from '@/components/molecules/FormField';
import ApperIcon from '@/components/ApperIcon';
import Paragraph from '@/components/atoms/Paragraph';

const ContentSettingsSection = ({ settings, onSettingChange, ...props }) => {
    const contentStats = [
        { label: 'Total Courses', value: '127', icon: 'BookOpen' },
        { label: 'Published Courses', value: '89', icon: 'CheckCircle' },
        { label: 'Total Modules', value: '543', icon: 'Layers' },
        { label: 'Total Lessons', value: '1,892', icon: 'Play' }
    ];

    return (
        <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            {...props}
        >
            <div className="space-y-4">
                <Heading level={3} className="!text-lg font-heading font-semibold text-surface-900">
                    Content Moderation
                </Heading>

                <FormField
                    label="Auto-approve Comments"
                    id="auto-approve-comments"
                    type="checkbox"
                    value={settings.autoApproveComments}
                    onChange={(e) => onSettingChange('autoApproveComments', e.target.checked)}
                    description="Automatically approve new comments without review"
                />
            </div>

            <div className="pt-6 border-t border-surface-200">
                <Heading level={3} className="!text-lg font-heading font-semibold text-surface-900 mb-4">
                    Content Statistics
                </Heading>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contentStats.map((stat, index) => (
                        <div key={stat.label} className="bg-surface-50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Heading level={2} className="!text-lg font-heading font-bold text-surface-900">
                                        {stat.value}
                                    </Heading>
                                    <Paragraph className="text-sm text-surface-600">{stat.label}</Paragraph>
                                </div>
                                <ApperIcon name={stat.icon} size={20} className="text-surface-400" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ContentSettingsSection;