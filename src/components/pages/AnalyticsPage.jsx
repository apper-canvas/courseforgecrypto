import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import courseService from '@/services/api/courseService';
import userService from '@/services/api/userService';
import PageHeader from '@/components/organisms/PageHeader';
import Select from '@/components/atoms/Select';
import AnalyticsStatsGrid from '@/components/organisms/AnalyticsStatsGrid';
import EnrollmentTrendsChart from '@/components/organisms/EnrollmentTrendsChart';
import PopularCoursesList from '@/components/organisms/PopularCoursesList';
import UserActivityPanel from '@/components/organisms/UserActivityPanel';
import RecentActivitySection from '@/components/organisms/RecentActivitySection';
import LoadingState from '@/components/organisms/LoadingState';
import ErrorState from '@/components/organisms/ErrorState';

const AnalyticsPage = () => {
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

    const recentActivityData = [
        { type: 'enrollment', message: 'John Doe enrolled in Web Development Fundamentals', time: '2 hours ago', icon: 'UserPlus' },
        { type: 'completion', message: 'Sarah Wilson completed Data Science Basics', time: '4 hours ago', icon: 'CheckCircle' },
        { type: 'course', message: 'New course published: Advanced React Patterns', time: '6 hours ago', icon: 'BookOpen' },
        { type: 'comment', message: 'New comment on JavaScript Fundamentals lesson', time: '8 hours ago', icon: 'MessageSquare' }
    ];

    const timeFilterOptions = [
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
        { value: 'quarter', label: 'This Quarter' }
    ];

    if (loading) {
        return <LoadingState message="Loading analytics..." />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={loadAnalytics} />;
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Analytics"
                    description="Track course performance and user engagement metrics"
                    actionButton={
                        <Select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                        >
                            {timeFilterOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </Select>
                    }
                />

                <AnalyticsStatsGrid statCards={statCards} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <EnrollmentTrendsChart chartData={chartData} />
                    <div>
                        <PopularCoursesList popularCourses={stats.popularCourses} />
                        <UserActivityPanel activeUsersCount={stats.activeUsers} className="mt-6" />
                    </div>
                </div>

                <RecentActivitySection activityData={recentActivityData} className="mt-8 lg:col-span-3" />
            </div>
        </div>
    );
};

export default AnalyticsPage;