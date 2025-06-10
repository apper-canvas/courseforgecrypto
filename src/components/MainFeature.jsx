import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'courses', label: 'Courses', icon: 'BookOpen' },
    { id: 'users', label: 'Users', icon: 'Users' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'moderation', label: 'Moderation', icon: 'Shield' }
  ];

  const handleTabClick = (tabId) => {
    setIsLoading(true);
    setActiveTab(tabId);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Switched to ${tabs.find(t => t.id === tabId)?.label}`);
    }, 800);
  };

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm animate-pulse"
            >
              <div className="h-4 bg-surface-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-surface-200 rounded w-1/2"></div>
            </motion.div>
          ))}
        </div>
      );
    }

    switch (activeTab) {
      case 'courses':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-heading font-semibold">Course Management</h3>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-all">
                Create Course
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Web Development Fundamentals', 'Data Science Basics', 'UI/UX Design Principles'].map((course, i) => (
                <div key={i} className="bg-white border border-surface-200 rounded-lg p-4 hover:shadow-md transition-all">
                  <h4 className="font-medium text-surface-900 mb-2">{course}</h4>
                  <p className="text-sm text-surface-600 mb-3">Active course with 25 students enrolled</p>
                  <div className="flex space-x-2">
                    <button className="text-primary text-sm hover:underline">Edit</button>
                    <button className="text-surface-500 text-sm hover:underline">View</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case 'users':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-heading font-semibold">User Management</h3>
              <button className="bg-secondary text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-all">
                Add User
              </button>
            </div>
            <div className="bg-white rounded-lg border border-surface-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-surface-50">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-surface-700">Name</th>
                    <th className="text-left p-4 text-sm font-medium text-surface-700">Role</th>
                    <th className="text-left p-4 text-sm font-medium text-surface-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Alice Johnson', role: 'Student', status: 'Active' },
                    { name: 'Bob Smith', role: 'Instructor', status: 'Active' },
                    { name: 'Carol Davis', role: 'Student', status: 'Inactive' }
                  ].map((user, i) => (
                    <tr key={i} className="border-t border-surface-200">
                      <td className="p-4 text-sm text-surface-900">{user.name}</td>
                      <td className="p-4 text-sm text-surface-600">{user.role}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'Active' ? 'bg-success/10 text-success' : 'bg-surface-100 text-surface-600'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        );
      
      case 'analytics':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-heading font-semibold">Analytics Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Total Enrollments', value: '247', icon: 'Users', color: 'text-primary' },
                { label: 'Course Completions', value: '89%', icon: 'CheckCircle', color: 'text-success' },
                { label: 'Active Courses', value: '12', icon: 'BookOpen', color: 'text-accent' }
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-surface-200 rounded-lg p-6 text-center">
                  <ApperIcon name={stat.icon} size={32} className={`${stat.color} mx-auto mb-3`} />
                  <div className="text-2xl font-heading font-bold text-surface-900">{stat.value}</div>
                  <div className="text-sm text-surface-600">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-white border border-surface-200 rounded-lg p-6">
              <h4 className="font-medium text-surface-900 mb-4">Recent Activity</h4>
              <div className="space-y-3">
                {[
                  'New enrollment in Web Development course',
                  'Course completion: Data Science Basics',
                  'Comment posted on UI/UX lesson'
                ].map((activity, i) => (
                  <div key={i} className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-surface-600">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      
      case 'moderation':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-heading font-semibold">Comment Moderation</h3>
            <div className="space-y-3">
              {[
                { user: 'John Doe', comment: 'Great lesson! Very helpful for understanding React hooks.', status: 'pending' },
                { user: 'Jane Smith', comment: 'Could you add more examples about state management?', status: 'pending' },
                { user: 'Mike Johnson', comment: 'The video quality could be improved.', status: 'pending' }
              ].map((item, i) => (
                <div key={i} className="bg-white border border-surface-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-medium text-surface-900">{item.user}</div>
                      <div className="text-sm text-surface-600">Posted 2 hours ago</div>
                    </div>
                    <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-surface-700 mb-4">{item.comment}</p>
                  <div className="flex space-x-2">
                    <button className="bg-success text-white px-3 py-1 rounded text-sm hover:shadow-md transition-all">
                      Approve
                    </button>
                    <button className="bg-error text-white px-3 py-1 rounded text-sm hover:shadow-md transition-all">
                      Reject
                    </button>
                    <button className="bg-surface-100 text-surface-700 px-3 py-1 rounded text-sm hover:bg-surface-200 transition-all">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-full overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-surface-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
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
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MainFeature;