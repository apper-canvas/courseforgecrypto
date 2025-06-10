import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';
import courseService from '../services/api/courseService';

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    status: 'draft'
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await courseService.getAll();
      setCourses(result);
    } catch (err) {
      setError(err.message || 'Failed to load courses');
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) {
      toast.error('Course title is required');
      return;
    }

    try {
      const created = await courseService.create(newCourse);
      setCourses(prev => [created, ...prev]);
      setShowCreateModal(false);
      setNewCourse({ title: '', description: '', category: '', status: 'draft' });
      toast.success('Course created successfully');
    } catch (err) {
      toast.error('Failed to create course');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await courseService.delete(courseId);
      setCourses(prev => prev.filter(course => course.id !== courseId));
      toast.success('Course deleted successfully');
    } catch (err) {
      toast.error('Failed to delete course');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedCourses.length === 0) return;
    if (!window.confirm(`Delete ${selectedCourses.length} selected courses?`)) return;

    try {
      await Promise.all(selectedCourses.map(id => courseService.delete(id)));
      setCourses(prev => prev.filter(course => !selectedCourses.includes(course.id)));
      setSelectedCourses([]);
      toast.success(`${selectedCourses.length} courses deleted successfully`);
    } catch (err) {
      toast.error('Failed to delete courses');
    }
  };

  const toggleCourseSelection = (courseId) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      draft: 'bg-surface-100 text-surface-700',
      published: 'bg-success/10 text-success',
      archived: 'bg-warning/10 text-warning'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.draft}`;
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 bg-surface-200 rounded w-32 animate-pulse"></div>
            <div className="h-10 bg-surface-200 rounded w-32 animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-surface-200 animate-pulse">
                <div className="h-4 bg-surface-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-surface-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-surface-200 rounded w-2/3 mb-4"></div>
                <div className="h-6 bg-surface-200 rounded w-16"></div>
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
          <h3 className="text-lg font-medium text-surface-900 mb-2">Failed to load courses</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <button
            onClick={loadCourses}
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
              Courses
            </h1>
            <p className="text-surface-600">
              Manage your educational content and course structure
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all inline-flex items-center space-x-2"
          >
            <ApperIcon name="Plus" size={18} />
            <span>Create Course</span>
          </motion.button>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-surface-200 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <ApperIcon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {selectedCourses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-3"
              >
                <span className="text-sm text-surface-600">
                  {selectedCourses.length} selected
                </span>
                <button
                  onClick={handleBulkDelete}
                  className="bg-error text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-all"
                >
                  Delete Selected
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <ApperIcon name="BookOpen" className="w-16 h-16 text-surface-300 mx-auto" />
            </motion.div>
            <h3 className="mt-4 text-lg font-medium text-surface-900">
              {searchQuery || statusFilter !== 'all' ? 'No courses match your filters' : 'No courses yet'}
            </h3>
            <p className="mt-2 text-surface-600">
              {searchQuery || statusFilter !== 'all' ? 'Try adjusting your search criteria' : 'Get started by creating your first course'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:shadow-lg transition-all"
              >
                Create First Course
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-surface-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.id)}
                    onChange={() => toggleCourseSelection(course.id)}
                    className="mt-1 rounded border-surface-300 text-primary focus:ring-primary/20"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/courses/${course.id}/edit`)}
                      className="p-2 text-surface-400 hover:text-primary transition-colors"
                    >
                      <ApperIcon name="Edit" size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-2 text-surface-400 hover:text-error transition-colors"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-heading font-semibold text-surface-900 mb-2 break-words">
                  {course.title}
                </h3>
                <p className="text-surface-600 text-sm mb-4 break-words">
                  {course.description || 'No description available'}
                </p>

                <div className="flex items-center justify-between">
                  <span className={getStatusBadge(course.status)}>
                    {course.status}
                  </span>
                  <span className="text-xs text-surface-500">
                    {course.category || 'Uncategorized'}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-surface-100">
                  <div className="flex items-center justify-between text-xs text-surface-500">
                    <span>Created {new Date(course.createdAt).toLocaleDateString()}</span>
                    <span>Updated {new Date(course.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Create Course Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowCreateModal(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-heading font-semibold text-surface-900">
                      Create New Course
                    </h2>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                    >
                      <ApperIcon name="X" size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleCreateCourse} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Enter course title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={newCourse.description}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Course description"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        value={newCourse.category}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="e.g., Programming, Design, Business"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Status
                      </label>
                      <select
                        value={newCourse.status}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="flex-1 px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:shadow-lg transition-all"
                      >
                        Create Course
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Courses;