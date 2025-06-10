import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import courseService from '@/services/api/courseService';
import moduleService from '@/services/api/moduleService';
import PageHeader from '@/components/organisms/PageHeader';
import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';
import TabButton from '@/components/molecules/TabButton';
import CourseDetailsForm from '@/components/organisms/CourseDetailsForm';
import ModulesManagement from '@/components/organisms/ModulesManagement';
import CourseSettingsForm from '@/components/organisms/CourseSettingsForm';
import LoadingState from '@/components/organisms/LoadingState';
import ErrorState from '@/components/organisms/ErrorState';
import EmptyState from '@/components/organisms/EmptyState';

const CourseEditorPage = () => {
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
        return <LoadingState message="Loading course editor..." />;
    }

    if (error) {
        return (
            <ErrorState message={error} onRetry={loadCourseData}>
                <Button
                    onClick={() => navigate('/courses')}
                    className="bg-surface-100 text-surface-700 px-4 py-2 rounded-lg hover:bg-surface-200 ml-3"
                >
                    Back to Courses
                </Button>
            </ErrorState>
        );
    }

    if (!course) {
        return (
            <div className="p-6 lg:p-8">
                <div className="max-w-5xl mx-auto">
                    <EmptyState
                        icon="BookOpen"
                        title="Course not found"
                        description="The course you're looking for doesn't exist."
                        animatedIcon={false}
                        actionButton={
                            <Button
                                onClick={() => navigate('/courses')}
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg"
                            >
                                Back to Courses
                            </Button>
                        }
                    />
                </div>
            </div>
        );
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'details':
                return <CourseDetailsForm course={course} setCourse={setCourse} />;
            case 'modules':
                return (
                    <ModulesManagement
                        modules={modules}
                        onAddModule={handleAddModule}
                        onDeleteModule={handleDeleteModule}
                        onUpdateModule={handleUpdateModule}
                    />
                );
            case 'settings':
                return <CourseSettingsForm course={course} />;
            default:
                return null;
        }
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <PageHeader
                    title={course.title}
                    description="Edit course content and settings"
                    onBack={() => navigate('/courses')}
                    actionButton={
                        <Button
                            onClick={handleSaveCourse}
                            disabled={saving}
                            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg inline-flex items-center space-x-2"
                        >
                            {saving ? (
                                <>
                                    <Spinner size={4} />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <ApperIcon name="Save" size={18} />
                                    <span>Save Changes</span>
                                </>
                            )}
                        </Button>
                    }
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="border-b border-surface-200 mb-8"
                >
                    <nav className="flex space-x-8">
                        {tabs.map(tab => (
                            <TabButton
                                key={tab.id}
                                label={tab.label}
                                icon={tab.icon}
                                isActive={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id)}
                            />
                        ))}
                    </nav>
                </motion.div>

                <div className="bg-white rounded-xl p-8 shadow-sm border border-surface-200">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default CourseEditorPage;