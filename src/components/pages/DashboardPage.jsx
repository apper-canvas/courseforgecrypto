import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '@/components/organisms/PageHeader';
import DashboardStatsGrid from '@/components/organisms/DashboardStatsGrid';
import RecentActivitySection from '@/components/organisms/RecentActivitySection';
import QuickActionsSection from '@/components/organisms/QuickActionsSection';
import SystemStatusPanel from '@/components/organisms/SystemStatusPanel';
import LoadingState from '@/components/organisms/LoadingState';
import ErrorState from '@/components/organisms/ErrorState';
import courseService from '@/services/api/courseService';
import userService from '@/services/api/userService';
import commentService from '@/services/api/commentService';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate();
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
        loadDashboardData();
    }, []);

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

    const quickActions = [
        { label: 'Create New Course', icon: 'Plus', color: 'bg-primary', onClick: () => navigate('/courses') },
        { label: 'Add User', icon: 'UserPlus', color: 'bg-secondary', onClick: () => navigate('/users') },
        { label: 'Review Comments', icon: 'MessageSquare', color: 'bg-accent', onClick: () => navigate('/moderation') },
        { label: 'View Analytics', icon: 'BarChart3', color: 'bg-success', onClick: () => navigate('/analytics') }
    ];

    if (loading) {
        return <LoadingState message="Loading dashboard data..." />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={loadDashboardData} />;
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Dashboard"
                    description="Monitor your educational platform's performance and activity"
                />

                <DashboardStatsGrid statCards={statCards} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <RecentActivitySection activityData={recentActivity} />
                    <QuickActionsSection actions={quickActions}>
                        <SystemStatusPanel />
                    </QuickActionsSection>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;