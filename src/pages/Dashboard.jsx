import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import courseService from '../services/api/courseService';
import userService from '../services/api/userService';
import commentService from '../services/api/commentService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalUsers: 0,
    pendingComments: 0,
    totalEnrollments: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [courses, users, comments] = await Promise.all([
          courseService.getAll(),
          userService.getAll(),
          commentService.getAll()
        ]);

        const totalEnrollments = users.reduce((sum, user) => sum + (user.enrolledCourses?.length || 0), 0);
        const pendingComments = comments.filter(comment => comment.status === 'pending').length;

        setStats({
          totalCourses: courses.length,
          totalUsers: users.length,
          pendingComments,
          totalEnrollments
        });

        // Generate recent activity
        setRecentActivity([
          { type: 'enrollment', message: 'New enrollment in Web Development course', time: '2 hours ago', icon: 'UserPlus' },
          { type: 'completion', message: 'Course completion: Data Science Basics', time: '4 hours ago', icon: 'CheckCircle' },
          { type: 'comment', message: 'New comment pending moderation', time: '6 hours ago', icon: 'MessageSquare' },
          { type: 'course', message: 'New course published: Advanced React', time: '1 day ago', icon: 'BookOpen' }
        ]);

      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: 'BookOpen',
      color: 'bg-primary',
      change: '+2 this week'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: 'Users',
      color: 'bg-secondary',
      change: '+12 this month'
    },
    {
      title: 'Total Enrollments',
      value: stats.totalEnrollments,
      icon: 'GraduationCap',
      color: 'bg-success',
      change: '+8 this week'
    },
    {
      title: 'Pending Reviews',
      value: stats.pendingComments,
      icon: 'MessageSquare',
      color: 'bg-accent',
      change: 'Needs attention'
    }
  ];

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-surface-200 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-surface-200 rounded w-96 animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-surface-200 animate-pulse">
                <div className="h-12 bg-surface-200 rounded mb-4"></div>
                <div className="h-8 bg-surface-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-surface-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
            <h3 className="text-lg font-medium text-surface-900 mb-2">Failed to load dashboard</h3>
            <p className="text-surface-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-surface-900 mb-2">
            Dashboard
          </h1>
          <p className="text-surface-600">
            Monitor your educational platform's performance and activity
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-surface-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} size={20} className="text-white" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  className="text-right"
                >
                  <div className="text-2xl font-heading font-bold text-surface-900">
                    {stat.value}
                  </div>
                </motion.div>
              </div>
              <h3 className="font-medium text-surface-900 mb-1">{stat.title}</h3>
              <p className="text-sm text-surface-600">{stat.change}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-surface-200">
              <h2 className="text-lg font-heading font-semibold text-surface-900 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-4 p-3 hover:bg-surface-50 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 bg-surface-100 rounded-full flex items-center justify-center">
                      <ApperIcon name={activity.icon} size={16} className="text-surface-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-surface-900 break-words">{activity.message}</p>
                      <p className="text-xs text-surface-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-surface-200">
              <h2 className="text-lg font-heading font-semibold text-surface-900 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                {[
                  { label: 'Create New Course', icon: 'Plus', color: 'bg-primary' },
                  { label: 'Add User', icon: 'UserPlus', color: 'bg-secondary' },
                  { label: 'Review Comments', icon: 'MessageSquare', color: 'bg-accent' },
                  { label: 'View Analytics', icon: 'BarChart3', color: 'bg-success' }
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-surface-50 rounded-lg transition-all"
                  >
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                      <ApperIcon name={action.icon} size={14} className="text-white" />
                    </div>
                    <span className="text-sm text-surface-700">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-xl p-6 border border-success/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                  <ApperIcon name="CheckCircle" size={16} className="text-white" />
                </div>
                <h3 className="font-heading font-semibold text-surface-900">System Status</h3>
              </div>
              <p className="text-sm text-surface-700 mb-3">All systems operational</p>
              <div className="text-xs text-surface-600">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;