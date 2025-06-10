import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const PopularCoursesList = ({ popularCourses, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
            {...props}
        >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-surface-200">
                <Heading level={2} className="!text-lg font-heading font-semibold text-surface-900 mb-6">
                    Popular Courses
                </Heading>
                <div className="space-y-4">
                    {popularCourses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.1) + 0.5 }}
                            className="flex items-center justify-between"
                        >
                            <div className="flex-1 min-w-0">
                                <Paragraph className="!text-sm !font-medium !text-surface-900 break-words">
                                    {course.title}
                                </Paragraph>
                                <Paragraph className="!text-xs !text-surface-500">
                                    {course.category || 'Uncategorized'}
                                </Paragraph>
                            </div>
                            <div className="ml-3 text-right">
                                <Paragraph className="!text-sm !font-medium !text-surface-900">
                                    {course.enrollments}
                                </Paragraph>
                                <Paragraph className="!text-xs !text-surface-500">enrollments</Paragraph>
                            </div>
                        </motion.div>
                    ))}

                    {popularCourses.length === 0 && (
                        <div className="text-center py-8">
                            <ApperIcon name="BookOpen" size={32} className="text-surface-300 mx-auto mb-2" />
                            <Paragraph className="text-sm text-surface-600">No course data available</Paragraph>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default PopularCoursesList;