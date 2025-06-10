import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="w-20 h-20 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="AlertCircle" size={32} className="text-surface-400" />
        </motion.div>
        
        <h1 className="text-6xl font-heading font-bold text-surface-300 mb-4">404</h1>
        <h2 className="text-2xl font-heading font-semibold text-surface-900 mb-2">
          Page Not Found
        </h2>
        <p className="text-surface-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all inline-flex items-center justify-center space-x-2"
          >
            <ApperIcon name="ArrowLeft" size={18} />
            <span>Go Back</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="w-full bg-surface-100 text-surface-700 px-6 py-3 rounded-lg font-medium hover:bg-surface-200 transition-all inline-flex items-center justify-center space-x-2"
          >
            <ApperIcon name="Home" size={18} />
            <span>Home</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;