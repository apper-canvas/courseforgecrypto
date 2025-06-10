import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const Home = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useState(() => {
    setIsLoaded(true);
  }, []);

  const quickActions = [
    {
      title: 'Create New Course',
      description: 'Start building your next educational experience',
      icon: 'Plus',
      color: 'bg-primary',
      action: () => navigate('/courses')
    },
    {
      title: 'Manage Users',
      description: 'Control student and instructor access',
      icon: 'Users',
      color: 'bg-secondary',
      action: () => navigate('/users')
    },
    {
      title: 'View Analytics',
      description: 'Track course performance and engagement',
      icon: 'BarChart3',
      color: 'bg-accent',
      action: () => navigate('/analytics')
    }
  ];

  return (
    <div className="min-h-full p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center"
          >
            <ApperIcon name="GraduationCap" size={32} className="text-white" />
          </motion.div>
          
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-surface-900 mb-4">
            Welcome to CourseForge
          </h1>
          <p className="text-xl text-surface-600 max-w-2xl mx-auto mb-8">
            Your comprehensive platform for managing educational content, users, and analytics. 
            Create engaging courses and track learning progress with powerful administrative tools.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all inline-flex items-center space-x-2"
          >
            <span>Go to Dashboard</span>
            <ApperIcon name="ArrowRight" size={18} />
          </motion.button>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={action.action}
              className="bg-white p-6 rounded-xl shadow-sm border border-surface-200 cursor-pointer hover:shadow-lg transition-all"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                <ApperIcon name={action.icon} size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-surface-900 mb-2">
                {action.title}
              </h3>
              <p className="text-surface-600">
                {action.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Platform Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-br from-surface-50 to-white rounded-2xl p-8 border border-surface-200"
        >
          <h2 className="text-2xl font-heading font-bold text-surface-900 mb-8 text-center">
            Platform Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'BookOpen', title: 'Course Management', desc: 'Full CRUD operations for courses and modules' },
              { icon: 'Users', title: 'User Control', desc: 'Manage enrollments and access permissions' },
              { icon: 'BarChart3', title: 'Analytics', desc: 'Track engagement and completion rates' },
              { icon: 'MessageSquare', title: 'Moderation', desc: 'Review and manage user comments' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-surface-200 flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={feature.icon} size={24} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-surface-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-surface-600">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;