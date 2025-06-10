import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import PageHeader from '@/components/organisms/PageHeader';
import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';
import TabButton from '@/components/molecules/TabButton';
import GeneralSettingsSection from '@/components/organisms/GeneralSettingsSection';
import UserManagementSettingsSection from '@/components/organisms/UserManagementSettingsSection';
import ContentSettingsSection from '@/components/organisms/ContentSettingsSection';
import NotificationsSettingsSection from '@/components/organisms/NotificationsSettingsSection';
import SecuritySettingsSection from '@/components/organisms/SecuritySettingsSection';

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        siteName: 'CourseForge',
        siteDescription: 'Professional education management platform',
        allowRegistration: true,
        requireEmailVerification: true,
        autoApproveComments: false,
        enableNotifications: true,
        maxUploadSize: '10',
        defaultUserRole: 'student',
        maintenanceMode: false
    });

    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General', icon: 'Settings' },
        { id: 'users', label: 'User Management', icon: 'Users' },
        { id: 'content', label: 'Content', icon: 'FileText' },
        { id: 'notifications', label: 'Notifications', icon: 'Bell' },
        { id: 'security', label: 'Security', icon: 'Shield' }
    ];

    const handleSaveSettings = async () => {
        setSaving(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success('Settings saved successfully');
        } catch (err) {
            toast.error('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return <GeneralSettingsSection settings={settings} onSettingChange={handleSettingChange} />;
            case 'users':
                return <UserManagementSettingsSection settings={settings} onSettingChange={handleSettingChange} />;
            case 'content':
                return <ContentSettingsSection settings={settings} onSettingChange={handleSettingChange} />;
            case 'notifications':
                return <NotificationsSettingsSection settings={settings} onSettingChange={handleSettingChange} />;
            case 'security':
                return <SecuritySettingsSection />; // No settings to change here, only display
            default:
                return null;
        }
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <PageHeader
                    title="Settings"
                    description="Configure your platform settings and preferences"
                    actionButton={
                        <Button
                            onClick={handleSaveSettings}
                            disabled={saving}
                            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg inline-flex items-center space-x-2"
                        >
                            {saving ? (
                                <>
                                    <Spinner size={4} />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <ApperIcon name="Save" size={18} />
                                    <span>Save Settings</span>
                                </>
                            )}
                        </Button>
                    }
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="border-b border-surface-200 mb-8"
                >
                    <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
                        {tabs.map(tab => (
                            <TabButton
                                key={tab.id}
                                label={tab.label}
                                icon={tab.icon}
                                isActive={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id)}
                            />
                        ))}
                    </nav>
                </motion.div>

                <div className="bg-white rounded-xl p-8 shadow-sm border border-surface-200">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;