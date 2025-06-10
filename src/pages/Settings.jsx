import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';

const Settings = () => {
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
        return (
          <motion.div
            key="general"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
                className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Enter site name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Describe your platform"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Default User Role
                </label>
                <select
                  value={settings.defaultUserRole}
                  onChange={(e) => handleSettingChange('defaultUserRole', e.target.value)}
                  className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Max Upload Size (MB)
                </label>
                <input
                  type="number"
                  value={settings.maxUploadSize}
                  onChange={(e) => handleSettingChange('maxUploadSize', e.target.value)}
                  className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  min="1"
                  max="100"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-surface-900">
                System Settings
              </h3>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                  className="rounded border-surface-300 text-primary focus:ring-primary/20"
                />
                <div>
                  <span className="text-surface-700 font-medium">Maintenance Mode</span>
                  <p className="text-sm text-surface-500">Disable public access for maintenance</p>
                </div>
              </label>
            </div>
          </motion.div>
        );

      case 'users':
        return (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-surface-900">
                Registration Settings
              </h3>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.allowRegistration}
                  onChange={(e) => handleSettingChange('allowRegistration', e.target.checked)}
                  className="rounded border-surface-300 text-primary focus:ring-primary/20"
                />
                <div>
                  <span className="text-surface-700 font-medium">Allow User Registration</span>
                  <p className="text-sm text-surface-500">Let users create their own accounts</p>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.requireEmailVerification}
                  onChange={(e) => handleSettingChange('requireEmailVerification', e.target.checked)}
                  className="rounded border-surface-300 text-primary focus:ring-primary/20"
                />
                <div>
                  <span className="text-surface-700 font-medium">Require Email Verification</span>
                  <p className="text-sm text-surface-500">Users must verify their email before accessing courses</p>
                </div>
              </label>
            </div>

            <div className="pt-6 border-t border-surface-200">
              <h3 className="text-lg font-heading font-semibold text-surface-900 mb-4">
                User Statistics
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Total Users', value: '1,247', icon: 'Users', color: 'bg-primary' },
                  { label: 'Active This Month', value: '892', icon: 'UserCheck', color: 'bg-success' },
                  { label: 'Pending Approval', value: '23', icon: 'UserX', color: 'bg-accent' }
                ].map((stat, index) => (
                  <div key={stat.label} className="bg-surface-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <ApperIcon name={stat.icon} size={16} className="text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-heading font-bold text-surface-900">
                          {stat.value}
                        </div>
                        <div className="text-sm text-surface-600">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'content':
        return (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-surface-900">
                Content Moderation
              </h3>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.autoApproveComments}
                  onChange={(e) => handleSettingChange('autoApproveComments', e.target.checked)}
                  className="rounded border-surface-300 text-primary focus:ring-primary/20"
                />
                <div>
                  <span className="text-surface-700 font-medium">Auto-approve Comments</span>
                  <p className="text-sm text-surface-500">Automatically approve new comments without review</p>
                </div>
              </label>
            </div>

            <div className="pt-6 border-t border-surface-200">
              <h3 className="text-lg font-heading font-semibold text-surface-900 mb-4">
                Content Statistics
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Total Courses', value: '127', icon: 'BookOpen' },
                  { label: 'Published Courses', value: '89', icon: 'CheckCircle' },
                  { label: 'Total Modules', value: '543', icon: 'Layers' },
                  { label: 'Total Lessons', value: '1,892', icon: 'Play' }
                ].map((stat, index) => (
                  <div key={stat.label} className="bg-surface-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-heading font-bold text-surface-900">
                          {stat.value}
                        </div>
                        <div className="text-sm text-surface-600">{stat.label}</div>
                      </div>
                      <ApperIcon name={stat.icon} size={20} className="text-surface-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'notifications':
        return (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-surface-900">
                Notification Settings
              </h3>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={(e) => handleSettingChange('enableNotifications', e.target.checked)}
                  className="rounded border-surface-300 text-primary focus:ring-primary/20"
                />
                <div>
                  <span className="text-surface-700 font-medium">Enable Notifications</span>
                  <p className="text-sm text-surface-500">Send notifications for important events</p>
                </div>
              </label>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-surface-900">Email Notifications</h4>
              
              {[
                { key: 'newEnrollment', label: 'New Course Enrollments' },
                { key: 'courseCompletion', label: 'Course Completions' },
                { key: 'newComment', label: 'New Comments' },
                { key: 'systemUpdates', label: 'System Updates' }
              ].map(notification => (
                <label key={notification.key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-surface-300 text-primary focus:ring-primary/20"
                  />
                  <span className="text-surface-700">{notification.label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        );

      case 'security':
        return (
          <motion.div
            key="security"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-xl p-6 border border-success/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                  <ApperIcon name="Shield" size={16} className="text-white" />
                </div>
                <h3 className="font-heading font-semibold text-surface-900">Security Status</h3>
              </div>
              <p className="text-surface-700 mb-4">Your system is secure and up to date.</p>
              <div className="text-sm text-surface-600">
                Last security check: {new Date().toLocaleDateString()}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-surface-900">
                Security Settings
              </h3>
              
              <div className="space-y-3">
                {[
                  { label: 'Two-Factor Authentication', status: 'Enabled', color: 'text-success' },
                  { label: 'SSL Certificate', status: 'Active', color: 'text-success' },
                  { label: 'Data Backup', status: 'Daily', color: 'text-success' },
                  { label: 'Activity Logging', status: 'Enabled', color: 'text-success' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
                    <span className="text-surface-700">{item.label}</span>
                    <span className={`text-sm font-medium ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-surface-200">
              <h3 className="text-lg font-heading font-semibold text-surface-900 mb-4">
                Recent Security Events
              </h3>
              
              <div className="space-y-3">
                {[
                  { event: 'Admin login from new device', time: '2 hours ago', type: 'info' },
                  { event: 'Failed login attempt blocked', time: '1 day ago', type: 'warning' },
                  { event: 'Security scan completed', time: '3 days ago', type: 'success' }
                ].map((event, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-surface-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      event.type === 'success' ? 'bg-success' :
                      event.type === 'warning' ? 'bg-accent' : 'bg-info'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-sm text-surface-900">{event.event}</div>
                      <div className="text-xs text-surface-500">{event.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-surface-900 mb-2">
              Settings
            </h1>
            <p className="text-surface-600">
              Configure your platform settings and preferences
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveSettings}
            disabled={saving}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all inline-flex items-center space-x-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <ApperIcon name="Save" size={18} />
                <span>Save Settings</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border-b border-surface-200 mb-8"
        >
          <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-surface-500 hover:text-surface-700 hover:border-surface-300'
                }`}
              >
                <ApperIcon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-surface-200">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;