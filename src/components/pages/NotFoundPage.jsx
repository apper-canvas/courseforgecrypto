import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundContent from '@/components/organisms/NotFoundContent';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-full flex items-center justify-center p-6">
            <NotFoundContent
                onGoBack={() => navigate(-1)}
                onGoHome={() => navigate('/dashboard')}
            />
        </div>
    );
};

export default NotFoundPage;