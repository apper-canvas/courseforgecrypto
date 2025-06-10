import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Checkbox from '@/components/atoms/Checkbox';
import Button from '@/components/atoms/Button';

const CourseSettingsForm = ({ course, ...props }) => {
    // Note: Course settings are mostly display-only or mockable due to the simplified backend.
    // The original code had fixed checkboxes which are not updated.
    // For a real app, these would be controlled states linked to course.settings
    // and a `setCourse` function would be passed to update them.
    // For now, mirroring the original's static behavior for settings other than those
    // in CourseDetailsForm, which were actually updated.

    return (
        <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            {...props}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <Heading level={3} className="!text-lg font-heading font-semibold text-surface-900">
                        Course Access
                    </Heading>

                    <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                            <Checkbox defaultChecked />
                            <Paragraph className="!text-surface-700 !text-sm">Allow student enrollment</Paragraph>
                        </label>

                        <label className="flex items-center space-x-3">
                            <Checkbox />
                            <Paragraph className="!text-surface-700 !text-sm">Require approval for enrollment</Paragraph>
                        </label>

                        <label className="flex items-center space-x-3">
                            <Checkbox defaultChecked />
                            <Paragraph className="!text-surface-700 !text-sm">Allow comments and discussions</Paragraph>
                        </label>
                    </div>
                </div>

                <div className="space-y-4">
                    <Heading level={3} className="!text-lg font-heading font-semibold text-surface-900">
                        Course Information
                    </Heading>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <Paragraph className="!text-surface-600 !text-sm">Created:</Paragraph>
                            <Paragraph className="!text-surface-900 !text-sm">
                                {new Date(course.createdAt).toLocaleDateString()}
                            </Paragraph>
                        </div>
                        <div className="flex justify-between">
                            <Paragraph className="!text-surface-600 !text-sm">Last Updated:</Paragraph>
                            <Paragraph className="!text-surface-900 !text-sm">
                                {new Date(course.updatedAt).toLocaleDateString()}
                            </Paragraph>
                        </div>
                        <div className="flex justify-between">
                            <Paragraph className="!text-surface-600 !text-sm">Course ID:</Paragraph>
                            <Paragraph className="!text-surface-900 font-mono !text-sm">{course.id}</Paragraph>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-surface-200">
                <Heading level={3} className="!text-lg font-heading font-semibold text-surface-900 mb-4">
                    Danger Zone
                </Heading>
                <div className="bg-error/5 border border-error/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Heading level={4} className="font-medium text-error">Delete Course</Heading>
                            <Paragraph className="text-sm text-surface-600">
                                This action cannot be undone. All course data will be permanently deleted.
                            </Paragraph>
                        </div>
                        <Button className="bg-error text-white px-4 py-2 rounded-lg hover:shadow-lg">
                            Delete Course
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseSettingsForm;