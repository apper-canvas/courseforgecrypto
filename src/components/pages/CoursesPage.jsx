import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import courseService from '@/services/api/courseService';
import PageHeader from '@/components/organisms/PageHeader';
import CoursesFiltersAndActions from '@/components/organisms/CoursesFiltersAndActions';
import CoursesGrid from '@/components/organisms/CoursesGrid';
import CreateCourseModal from '@/components/organisms/CreateCourseModal';
import Button from '@/components/atoms/Button';
import LoadingState from '@/components/organisms/LoadingState';
import ErrorState from '@/components/organisms/ErrorState';

const CoursesPage = () => {
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

    if (loading) {
        return <LoadingState message="Loading courses..." />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={loadCourses} />;
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Courses"
                    description="Manage your educational content and course structure"
                    actionButton={
                        <Button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg inline-flex items-center space-x-2"
                            icon={ApperIcon}
                            name="Plus"
                            iconSize={18}
                        >
                            <span>Create Course</span>
                        </Button>
                    }
                />

                <CoursesFiltersAndActions
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    selectedCoursesCount={selectedCourses.length}
                    onBulkDelete={handleBulkDelete}
                />

                <CoursesGrid
                    courses={filteredCourses}
                    selectedCourses={selectedCourses}
                    onToggleCourseSelection={toggleCourseSelection}
                    onEditCourse={(id) => navigate(`/courses/${id}/edit`)}
                    onDeleteCourse={handleDeleteCourse}
                    searchQuery={searchQuery}
                    statusFilter={statusFilter}
                    onCreateFirstCourse={() => setShowCreateModal(true)}
                />

                <CreateCourseModal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    newCourse={newCourse}
                    setNewCourse={setNewCourse}
                    onCreateCourse={handleCreateCourse}
                />
            </div>
        </div>
    );
};

export default CoursesPage;