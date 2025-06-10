import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';

const HeroSection = ({ onGoToDashboard, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
            {...props}
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center"
            >
                <ApperIcon name="GraduationCap" size={32} className="text-white" />
            </motion.div>

            <Heading level={1} className="text-4xl lg:text-5xl font-heading font-bold text-surface-900 mb-4">
                Welcome to CourseForge
            </Heading>
            <Paragraph className="text-xl max-w-2xl mx-auto mb-8">
                Your comprehensive platform for managing educational content, users, and analytics.
                Create engaging courses and track learning progress with powerful administrative tools.
            </Paragraph>

            <Button
                onClick={onGoToDashboard}
                className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg inline-flex items-center space-x-2"
                icon={ApperIcon}
                name="ArrowRight"
                iconSize={18}
            >
                <span>Go to Dashboard</span>
            </Button>
        </motion.div>
    );
};

export default HeroSection;