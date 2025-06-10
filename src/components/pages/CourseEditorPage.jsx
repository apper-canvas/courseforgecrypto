import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import PageHeader from '@/components/organisms/PageHeader';
import CourseDetailsForm from '@/components/organisms/CourseDetailsForm';
import CourseSettingsForm from '@/components/organisms/CourseSettingsForm';
import ModulesManagement from '@/components/organisms/ModulesManagement';
import CreateModuleModal from '@/components/organisms/CreateModuleModal';
import LoadingState from '@/components/organisms/LoadingState';
import ErrorState from '@/components/organisms/ErrorState';
import TabButton from '@/components/molecules/TabButton';
import Button from '@/components/atoms/Button';
import courseService from '@/services/api/courseService';
import moduleService from '@/services/api/moduleService';

const CourseEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [activeTab, setActiveTab] = useState('details');
  
  // Initialize course with proper default values to prevent null reference errors
  const [course, setCourse] = useState(() => ({
    id: id || null,
    title: '',
    description: '',
    category: '',
    tags: [],
    thumbnail: '',
    published: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [courseReady, setCourseReady] = useState(!isEditMode); // Track when course is ready for rendering

  // Module management state
  const [modules, setModules] = useState([]);
  const [modulesLoading, setModulesLoading] = useState(false);
  const [modulesError, setModulesError] = useState(null);
  const [isCreateModuleModalOpen, setIsCreateModuleModalOpen] = useState(false);

  const tabs = [
    { id: 'details', label: 'Course Details', icon: 'BookOpen' },
    { id: 'modules', label: 'Modules & Lessons', icon: 'Layers' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  useEffect(() => {
    if (isEditMode) {
      loadCourse();
      loadModules();
    } else {
      // For new courses, set course as ready immediately
      setCourseReady(true);
    }
  }, [id, isEditMode]);

  const loadModules = async () => {
    if (!id) return;
    
    setModulesLoading(true);
    setModulesError(null);
    try {
      const courseModules = await moduleService.getByCourseId(id);
      setModules(courseModules || []);
    } catch (err) {
      setModulesError(err.message);
      toast.error('Failed to load modules');
      setModules([]); // Set empty array on error
    } finally {
      setModulesLoading(false);
    }
  };
  
  const loadCourse = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const courseData = await courseService.getById(id);
      
      // Ensure course data has all required fields
      const safeeCourseData = {
        id: courseData.id || id,
        title: courseData.title || '',
        description: courseData.description || '',
        category: courseData.category || '',
        tags: Array.isArray(courseData.tags) ? courseData.tags : [],
        thumbnail: courseData.thumbnail || '',
        published: Boolean(courseData.published),
        createdAt: courseData.createdAt || new Date().toISOString(),
        updatedAt: courseData.updatedAt || new Date().toISOString(),
        ...courseData // Include any additional fields
      };
      
      setCourse(safeeCourseData);
      setCourseReady(true);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load course');
      setCourseReady(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    if (!formData) return;
    
    try {
      setSaving(true);
      let result;
      
      if (isEditMode && course?.id) {
        result = await courseService.update(course.id, formData);
      } else {
        result = await courseService.create(formData);
        // Navigate to edit mode after creation
        if (result?.id) {
          navigate(`/courses/edit/${result.id}`, { replace: true });
        }
      }
      
      if (result) {
        setCourse(prev => ({ ...prev, ...result }));
        toast.success(isEditMode ? 'Course updated successfully' : 'Course created successfully');
      }
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save course');
    } finally {
      setSaving(false);
    }
  };

  // Module management functions
  const handleAddModule = () => {
    if (!course?.id) {
      toast.error('Please save the course first before adding modules');
      return;
    }
    setIsCreateModuleModalOpen(true);
  };

  const handleCreateModule = async (moduleData) => {
    try {
      const newModule = await moduleService.create({
        ...moduleData,
        courseId: course.id
      });
      setModules(prev => [...prev, newModule]);
      toast.success('Module created successfully');
    } catch (err) {
      toast.error('Failed to create module');
      throw err;
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (!window.confirm('Are you sure you want to delete this module? This action cannot be undone.')) {
      return;
    }

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
      const updatedModule = await moduleService.update(moduleId, updates);
      setModules(prev => prev.map(m => m.id === moduleId ? updatedModule : m));
      // Don't show toast for every keystroke - only for significant updates
      if (updates.title || updates.description) {
        toast.success('Module updated');
      }
    } catch (err) {
      toast.error('Failed to update module');
    }
  };

  if (loading) {
    return <LoadingState message="Loading course..." />;
  }

  if (error) {
    return (
      <ErrorState 
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }
// Render loading state while course data is being fetched
  if (loading) {
    return <LoadingState message="Loading course..." />;
  }

  // Render error state if course failed to load
  if (error) {
    return (
      <ErrorState 
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Don't render tabs until course is ready to prevent white screen
  if (!courseReady || !course) {
    return <LoadingState message="Preparing course editor..." />;
  }

  return (
    <div className="min-h-screen bg-surface-50 p-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title={isEditMode ? 'Edit Course' : 'Create New Course'}
          subtitle={course?.title || 'Build an engaging learning experience'}
          breadcrumbs={[
            { label: 'Courses', href: '/courses' },
            { label: isEditMode ? 'Edit' : 'Create' }
          ]}
          actions={
            <div className="flex space-x-3">
              <Button
                onClick={() => navigate('/courses')}
                className="text-surface-600 hover:bg-surface-100 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSave(course)}
                disabled={saving || !course}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg inline-flex items-center space-x-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <ApperIcon name="Save" size={16} />
                    <span>Save Course</span>
                  </>
                )}
              </Button>
            </div>
          }
        />

        <div className="mt-8">
          {/* Tabs */}
          <div className="flex space-x-1 bg-surface-100 p-1 rounded-lg mb-8">
            {tabs.map(tab => (
              <TabButton
                key={tab.id}
                id={tab.id}
                label={tab.label}
                icon={tab.icon}
                isActive={activeTab === tab.id}
                onClick={setActiveTab}
              />
            ))}
          </div>

          {/* Tab Content with Error Boundaries */}
          <div className="bg-white rounded-lg shadow-sm border border-surface-200">
            {activeTab === 'details' && course && (
              <CourseDetailsForm
                course={course}
                onChange={setCourse}
                onSave={handleSave}
                saving={saving}
              />
            )}

            {activeTab === 'modules' && (
              <div className="p-6">
                {!course?.id && isEditMode ? (
                  <div className="text-center py-8">
                    <p className="text-surface-600">Please save the course first to manage modules.</p>
                  </div>
                ) : modulesLoading ? (
                  <LoadingState message="Loading modules..." />
                ) : modulesError ? (
                  <ErrorState 
                    message={modulesError}
                    onRetry={loadModules}
                  />
                ) : (
                  <ModulesManagement
                    modules={modules || []}
                    onAddModule={handleAddModule}
                    onDeleteModule={handleDeleteModule}
                    onUpdateModule={handleUpdateModule}
                  />
                )}
              </div>
            )}

            {activeTab === 'settings' && course && (
              <CourseSettingsForm
                course={course}
                onChange={setCourse}
                onSave={handleSave}
                saving={saving}
              />
            )}
            
            {/* Fallback for missing tab content */}
            {!course && (
              <div className="p-6 text-center">
                <p className="text-surface-600">Loading course data...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Module Modal */}
      {course?.id && (
        <CreateModuleModal
          isOpen={isCreateModuleModalOpen}
          onClose={() => setIsCreateModuleModalOpen(false)}
          onSubmit={handleCreateModule}
          courseId={course.id}
          existingModules={modules || []}
        />
      )}
    </div>
  );
};

export default CourseEditorPage;