import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import courseService from '../services/api/courseService';
import moduleService from '../services/api/moduleService';

const CourseEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'details', label: 'Course Details', icon: 'FileText' },
    { id: 'modules', label: 'Modules & Lessons', icon: 'Layers' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  useEffect(() => {
    loadCourseData();
  }, [id]);

  const loadCourseData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [courseData, moduleData] = await Promise.all([
        courseService.getById(id),
        moduleService.getByCourseId(id)
      ]);
      setCourse(courseData);
      setModules(moduleData);
    } catch (err) {
      setError(err.message || 'Failed to load course data');
      toast.error('Failed to load course data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCourse = async () => {
    if (!course.title.trim()) {
      toast.error('Course title is required');
      return;
    }

    setSaving(true);
    try {
      const updated = await courseService.update(id, course);
      setCourse(updated);
      toast.success('Course updated successfully');
    } catch (err) {
      toast.error('Failed to update course');
    } finally {
      setSaving(false);
    }
  };

  const handleAddModule = async () => {
    const newModule = {
      courseId: id,
      title: 'New Module',
      description: '',
      order: modules.length + 1,
      lessons: []
    };

    try {
      const created = await moduleService.create(newModule);
      setModules(prev => [...prev, created]);
      toast.success('Module added successfully');
    } catch (err) {
      toast.error('Failed to add module');
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (!window.confirm('Are you sure you want to delete this module?')) return;

    try {
      await moduleService.delete(moduleId);
      setModules(prev => prev.filter(m => m.id !== moduleId));
      toast.success('Module deleted successfully');
    } catch (err) {
      toast.error('Failed to delete module');
    }
  };

  const handleUpdateModule = async (moduleId, updates) => {
    try {
      const updated = await moduleService.update(moduleId, updates);
      setModules(prev => prev.map(m => m.id === moduleId ? updated : m));
    } catch (err) {
      toast.error('Failed to update module');
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-surface-200 rounded w-64 mb-4 animate-pulse"></div>
            <div className="flex space-x-4 border-b border-surface-200">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-10 bg-surface-200 rounded w-32 animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-surface-200">
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-surface-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-5xl mx-auto text-center py-12">
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Failed to load course</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <div className="space-x-3">
            <button
              onClick={loadCourseData}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="bg-surface-100 text-surface-700 px-4 py-2 rounded-lg hover:bg-surface-200 transition-all"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-5xl mx-auto text-center py-12">
          <ApperIcon name="BookOpen" size={48} className="text-surface-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Course not found</h3>
          <p className="text-surface-600 mb-4">The course you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/courses')}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                value={course.title}
                onChange={(e) => setCourse(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Enter course title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Description
              </label>
              <textarea
                value={course.description || ''}
                onChange={(e) => setCourse(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Course description"
                rows={6}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={course.category || ''}
                  onChange={(e) => setCourse(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="e.g., Programming, Design, Business"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Status
                </label>
                <select
                  value={course.status}
                  onChange={(e) => setCourse(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={course.tags?.join(', ') || ''}
                onChange={(e) => setCourse(prev => ({ 
                  ...prev, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                }))}
                className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Enter tags separated by commas"
              />
              <p className="text-xs text-surface-500 mt-1">
                Use commas to separate multiple tags
              </p>
            </div>
          </motion.div>
        );

      case 'modules':
        return (
          <motion.div
            key="modules"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-heading font-semibold text-surface-900">
                Course Modules
              </h3>
              <button
                onClick={handleAddModule}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all inline-flex items-center space-x-2"
              >
                <ApperIcon name="Plus" size={16} />
                <span>Add Module</span>
              </button>
            </div>

            {modules.length === 0 ? (
              <div className="text-center py-12 bg-surface-50 rounded-lg">
                <ApperIcon name="Layers" size={48} className="text-surface-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-surface-900 mb-2">No modules yet</h4>
                <p className="text-surface-600 mb-4">Start building your course by adding modules</p>
                <button
                  onClick={handleAddModule}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  Add First Module
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-surface-50 rounded-lg p-6 border border-surface-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => handleUpdateModule(module.id, { title: e.target.value })}
                          className="text-lg font-medium bg-transparent border-none outline-none text-surface-900 focus:bg-white focus:border focus:border-primary/20 focus:rounded px-2 py-1"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteModule(module.id)}
                        className="p-2 text-surface-400 hover:text-error transition-colors"
                      >
                        <ApperIcon name="Trash2" size={16} />
                      </button>
                    </div>

                    <textarea
                      value={module.description || ''}
                      onChange={(e) => handleUpdateModule(module.id, { description: e.target.value })}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Module description"
                      rows={2}
                    />

                    <div className="mt-4 pt-4 border-t border-surface-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-surface-600">
                          {module.lessons?.length || 0} lessons
                        </span>
                        <button className="text-primary text-sm hover:underline">
                          Manage Lessons
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-semibold text-surface-900">
                  Course Access
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-surface-300 text-primary focus:ring-primary/20"
                      defaultChecked
                    />
                    <span className="text-surface-700">Allow student enrollment</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-surface-300 text-primary focus:ring-primary/20"
                    />
                    <span className="text-surface-700">Require approval for enrollment</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-surface-300 text-primary focus:ring-primary/20"
                      defaultChecked
                    />
                    <span className="text-surface-700">Allow comments and discussions</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-heading font-semibold text-surface-900">
                  Course Information
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-surface-600">Created:</span>
                    <span className="text-surface-900">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-600">Last Updated:</span>
                    <span className="text-surface-900">
                      {new Date(course.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-600">Course ID:</span>
                    <span className="text-surface-900 font-mono">{course.id}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-surface-200">
              <h3 className="text-lg font-heading font-semibold text-surface-900 mb-4">
                Danger Zone
              </h3>
              <div className="bg-error/5 border border-error/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-error">Delete Course</h4>
                    <p className="text-sm text-surface-600">
                      This action cannot be undone. All course data will be permanently deleted.
                    </p>
                  </div>
                  <button className="bg-error text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                    Delete Course
                  </button>
                </div>
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
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/courses')}
              className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
            >
              <ApperIcon name="ArrowLeft" size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-heading font-bold text-surface-900">
                {course.title}
              </h1>
              <p className="text-surface-600">Edit course content and settings</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveCourse}
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
                <span>Save Changes</span>
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
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
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

export default CourseEditor;