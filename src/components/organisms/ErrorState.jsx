import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';

const ErrorState = ({ message, onRetry, className = "" }) => {
    return (
        <div className={`p-6 lg:p-8 ${className}`}>
            <div className="max-w-7xl mx-auto text-center py-12">
                <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
                <Heading level={3} className="text-lg font-medium text-surface-900 mb-2">
                    Failed to load data
                </Heading>
                <Paragraph className="text-surface-600 mb-4">{message}</Paragraph>
                <Button
                    onClick={onRetry}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                >
                    Try Again
                </Button>
            </div>
        </div>
    );
};

export default ErrorState;