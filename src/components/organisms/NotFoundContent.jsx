import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';

const NotFoundContent = ({ onGoBack, onGoHome, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-md"
            {...props}
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-20 h-20 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
                <ApperIcon name="AlertCircle" size={32} className="text-surface-400" />
            </motion.div>

            <Heading level={1} className="!text-6xl font-heading font-bold text-surface-300 mb-4">404</Heading>
            <Heading level={2} className="!text-2xl font-heading font-semibold text-surface-900 mb-2">
                Page Not Found
            </Heading>
            <Paragraph className="mb-8">
                The page you're looking for doesn't exist or has been moved.
            </Paragraph>

            <div className="space-y-3">
                <Button
                    onClick={onGoBack}
                    className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg inline-flex items-center justify-center space-x-2"
                    icon={ApperIcon}
                    name="ArrowLeft"
                    iconSize={18}
                >
                    <span>Go Back</span>
                </Button>

                <Button
                    onClick={onGoHome}
                    className="w-full bg-surface-100 text-surface-700 px-6 py-3 rounded-lg font-medium hover:bg-surface-200 inline-flex items-center justify-center space-x-2"
                    icon={ApperIcon}
                    name="Home"
                    iconSize={18}
                >
                    <span>Home</span>
                </Button>
            </div>
        </motion.div>
    );
};

export default NotFoundContent;