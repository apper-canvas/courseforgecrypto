import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/organisms/HeroSection';
import QuickActionsSection from '@/components/organisms/QuickActionsSection';
import PlatformCapabilitiesGrid from '@/components/organisms/PlatformCapabilitiesGrid';

const HomePage = () => {
    const navigate = useNavigate();

    const quickActions = [
        {
            title: 'Create New Course',
            description: 'Start building your next educational experience',
            icon: 'Plus',
            color: 'bg-primary',
            onClick: () => navigate('/courses')
        },
        {
            title: 'Manage Users',
            description: 'Control student and instructor access',
            icon: 'Users',
            color: 'bg-secondary',
            onClick: () => navigate('/users')
        },
        {
            title: 'View Analytics',
            description: 'Track course performance and engagement',
            icon: 'BarChart3',
            color: 'bg-accent',
            onClick: () => navigate('/analytics')
        }
    ];

    const platformFeatures = [
        { icon: 'BookOpen', title: 'Course Management', desc: 'Full CRUD operations for courses and modules' },
        { icon: 'Users', title: 'User Control', desc: 'Manage enrollments and access permissions' },
        { icon: 'BarChart3', title: 'Analytics', desc: 'Track engagement and completion rates' },
        { icon: 'MessageSquare', title: 'Moderation', desc: 'Review and manage user comments' }
    ];

    return (
        <div className="min-h-full p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <HeroSection onGoToDashboard={() => navigate('/dashboard')} />

                <QuickActionsSection actions={quickActions} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" />

                <PlatformCapabilitiesGrid features={platformFeatures} />
            </div>
        </div>
    );
};

export default HomePage;