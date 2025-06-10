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
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

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
      // Initialize new course with default values
      setCourse({
        title: '',
        description: '',
        category: '',
        tags: [],
        thumbnail: '',
        published: false
      });
    }
  }, [id]);

  const loadModules = async () => {
    if (!id) return;
    
    setModulesLoading(true);
    setModulesError(null);
    try {
      const courseModules = await moduleService.getByCourseId(id);
      setModules(courseModules);
    } catch (err) {
      setModulesError(err.message);
      toast.error('Failed to load modules');
    } finally {
      setModulesLoading(false);
}
  };
  
  const loadCourse = async () => {
    try {
      setLoading(true);
      const courseData = await courseService.getById(id);
      setCourse(courseData);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      setSaving(true);
      let result;
if (isEditMode) {
        result = await courseService.update(id, formData);
      } else {
        result = await courseService.create(formData);
        navigate(`/courses/edit/${result.id}`);
      }
      setCourse(result);
      toast.success(isEditMode ? 'Course updated successfully' : 'Course created successfully');
    } catch (err) {
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
                disabled={saving}
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

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm border border-surface-200">
            {activeTab === 'details' && (
              <CourseDetailsForm
                course={course}
                onChange={setCourse}
                onSave={handleSave}
                saving={saving}
              />
            )}

            {activeTab === 'modules' && (
              <div className="p-6">
                {modulesLoading ? (
                  <LoadingState message="Loading modules..." />
                ) : modulesError ? (
                  <ErrorState 
                    message={modulesError}
                    onRetry={loadModules}
                  />
                ) : (
                  <ModulesManagement
                    modules={modules}
                    onAddModule={handleAddModule}
                    onDeleteModule={handleDeleteModule}
                    onUpdateModule={handleUpdateModule}
                  />
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <CourseSettingsForm
                course={course}
onChange={setCourse}
                onSave={handleSave}
                saving={saving}
              />
            )}
          </div>
        </div>
      </div>

      {/* Create Module Modal */}
      <CreateModuleModal
        isOpen={isCreateModuleModalOpen}
        onClose={() => setIsCreateModuleModalOpen(false)}
        onSubmit={handleCreateModule}
        courseId={course?.id}
        existingModules={modules}
      />
</div>
  );
};

export default CourseEditorPage;