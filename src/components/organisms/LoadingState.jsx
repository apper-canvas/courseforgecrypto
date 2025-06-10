import React from 'react';
import Spinner from '@/components/atoms/Spinner';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const LoadingState = ({ message = "Loading data, please wait...", className = "" }) => {
    return (
        <div className={`p-6 lg:p-8 flex items-center justify-center min-h-[50vh] ${className}`}>
            <div className="text-center">
                <Spinner size={12} className="mx-auto mb-4 border-primary/30 border-t-primary" />
                <Heading level={3} className="font-medium text-surface-900 mb-2">
                    {message}
                </Heading>
                <Paragraph className="text-surface-600">
                    Fetching the latest information.
                </Paragraph>
            </div>
        </div>
    );
};

export default LoadingState;