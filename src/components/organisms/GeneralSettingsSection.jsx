import React from 'react';
import { motion } from 'framer-motion';
import FormField from '@/components/molecules/FormField';
import Heading from '@/components/atoms/Heading';

const GeneralSettingsSection = ({ settings, onSettingChange, ...props }) => {
    const defaultUserRoleOptions = [
        { value: 'student', label: 'Student' },
        { value: 'instructor', label: 'Instructor' }
    ];

    return (
        <motion.div
            key="general"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            {...props}
        >
            <FormField
                label="Site Name"
                id="site-name"
                type="text"
                value={settings.siteName}
                onChange={(e) => onSettingChange('siteName', e.target.value)}
                placeholder="Enter site name"
            />
            <FormField
                label="Site Description"
                id="site-description"
                type="textarea"
                value={settings.siteDescription}
                onChange={(e) => onSettingChange('siteDescription', e.target.value)}
                placeholder="Describe your platform"
                rows={3}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    label="Default User Role"
                    id="default-user-role"
                    type="select"
                    value={settings.defaultUserRole}
                    onChange={(e) => onSettingChange('defaultUserRole', e.target.value)}
                    options={defaultUserRoleOptions}
                >
                    {defaultUserRoleOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </FormField>
                <FormField
                    label="Max Upload Size (MB)"
                    id="max-upload-size"
                    type="number"
                    value={settings.maxUploadSize}
                    onChange={(e) => onSettingChange('maxUploadSize', e.target.value)}
                    min="1"
                    max="100"
                />
            </div>
            <div className="space-y-4">
                <Heading level={3} className="!text-lg font-heading font-semibold text-surface-900">
                    System Settings
                </Heading>
                <FormField
                    label="Maintenance Mode"
                    id="maintenance-mode"
                    type="checkbox"
                    value={settings.maintenanceMode}
                    onChange={(e) => onSettingChange('maintenanceMode', e.target.checked)}
                    description="Disable public access for maintenance"
                />
            </div>
        </motion.div>
    );
};

export default GeneralSettingsSection;