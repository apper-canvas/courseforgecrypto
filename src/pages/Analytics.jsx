import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import courseService from '../services/api/courseService';
import userService from '../services/api/userService';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalEnrollments: 0,
    activeUsers: 0,
    completionRate: 0,
    popularCourses: []
  });
  const [timeFilter, setTimeFilter] = useState('month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, [timeFilter]);

  const loadAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const [courses, users] = await Promise.all([
        courseService.getAll(),
        userService.getAll()
      ]);

      const totalEnrollments = users.reduce((sum, user) => sum + (user.enrolledCourses?.length || 0), 0);
      const activeUsers = users.filter(user => user.enrolledCourses?.length > 0).length;
      
      // Calculate course popularity
      const enrollmentCounts = {};
      users.forEach(user => {
        user.enrolledCourses?.forEach(courseId => {
          enrollmentCounts[courseId] = (enrollmentCounts[courseId] || 0) + 1;
        });
      });

      const popularCourses = courses
        .map(course => ({
          ...course,
          enrollments: enrollmentCounts[course.id] || 0
        }))
        .sort((a, b) => b.enrollments - a.enrollments)
        .slice(0, 5);

      // Simulate completion rate calculation
      const completionRate = Math.floor(Math.random() * 30) + 70; // 70-100%

      setStats({
        totalEnrollments,
        activeUsers,
        completionRate,
        popularCourses
      });

    } catch (err) {
      setError(err.message || 'Failed to load analytics');
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  // Mock chart data based on time filter
  const getChartData = () => {
    const labels = timeFilter === 'week' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : timeFilter === 'month'
      ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    const enrollmentData = labels.map(() => Math.floor(Math.random() * 50) + 10);
    const completionData = labels.map(() => Math.floor(Math.random() * 30) + 20);

    return { labels, enrollmentData, completionData };
  };

  const chartData = getChartData();

  const statCards = [
    {
      title: 'Total Enrollments',
      value: stats.totalEnrollments,
      icon: 'UserPlus',
      color: 'bg-primary',
      change: '+12% from last period'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: 'Users',
      color: 'bg-secondary',
      change: '+8% from last period'
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: 'CheckCircle',
      color: 'bg-success',
      change: '+5% from last period'
    },
    {
      title: 'Course Satisfaction',
      value: '4.6/5',
      icon: 'Star',
      color: 'bg-accent',
      change: 'Based on 247 reviews'
    }
  ];

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-surface-200 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-4 bg-surface-200 rounded w-64 animate-pulse"></div>
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
        <div className="max-w-7xl mx-auto text-center py-12">
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Failed to load analytics</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <button
            onClick={loadAnalytics}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            Try Again
          </button>
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
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-surface-900 mb-2">
              Analytics
            </h1>
            <p className="text-surface-600">
              Track course performance and user engagement metrics
            </p>
          </div>
          
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
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
          {/* Enrollment Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-surface-200">
              <h2 className="text-lg font-heading font-semibold text-surface-900 mb-6">
                Enrollment Trends
              </h2>
              
              {/* Simple Chart Visualization */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-surface-600 mb-4">
                  <span>Enrollments</span>
                  <span>Completions</span>
                </div>
                
                {chartData.labels.map((label, index) => (
                  <div key={label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-700">{label}</span>
                      <span className="text-surface-600">
                        {chartData.enrollmentData[index]} / {chartData.completionData[index]}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(chartData.enrollmentData[index] / 60) * 100}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                        className="h-2 bg-primary rounded-full"
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(chartData.completionData[index] / 60) * 100}%` }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                        className="h-2 bg-success rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Popular Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-surface-200">
              <h2 className="text-lg font-heading font-semibold text-surface-900 mb-6">
                Popular Courses
              </h2>
              <div className="space-y-4">
                {stats.popularCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-surface-900 break-words">
                        {course.title}
                      </div>
                      <div className="text-xs text-surface-500">
                        {course.category || 'Uncategorized'}
                      </div>
                    </div>
                    <div className="ml-3 text-right">
                      <div className="text-sm font-medium text-surface-900">
                        {course.enrollments}
                      </div>
                      <div className="text-xs text-surface-500">enrollments</div>
                    </div>
                  </motion.div>
                ))}
                
                {stats.popularCourses.length === 0 && (
                  <div className="text-center py-8">
                    <ApperIcon name="BookOpen" size={32} className="text-surface-300 mx-auto mb-2" />
                    <p className="text-sm text-surface-600">No course data available</p>
                  </div>
                )}
              </div>
            </div>

            {/* User Activity */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <ApperIcon name="TrendingUp" size={16} className="text-white" />
                </div>
                <h3 className="font-heading font-semibold text-surface-900">User Activity</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-surface-600">Daily Active Users:</span>
                  <span className="text-surface-900 font-medium">
                    {Math.floor(stats.activeUsers * 0.6)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600">Avg. Session Time:</span>
                  <span className="text-surface-900 font-medium">24 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600">Course Views:</span>
                  <span className="text-surface-900 font-medium">1,247</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-surface-200">
            <h2 className="text-lg font-heading font-semibold text-surface-900 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                { type: 'enrollment', message: 'John Doe enrolled in Web Development Fundamentals', time: '2 hours ago', icon: 'UserPlus' },
                { type: 'completion', message: 'Sarah Wilson completed Data Science Basics', time: '4 hours ago', icon: 'CheckCircle' },
                { type: 'course', message: 'New course published: Advanced React Patterns', time: '6 hours ago', icon: 'BookOpen' },
                { type: 'comment', message: 'New comment on JavaScript Fundamentals lesson', time: '8 hours ago', icon: 'MessageSquare' }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
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
      </div>
    </div>
  );
};

export default Analytics;