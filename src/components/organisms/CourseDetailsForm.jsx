import React from 'react';
import { motion } from 'framer-motion';
import FormField from '@/components/molecules/FormField';

const CourseDetailsForm = ({ course, setCourse, onSave, onCancel, ...domProps }) => {
    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'archived', label: 'Archived' }
    ];

    return (
        <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            {...domProps}
        >
            <FormField
                label="Course Title *"
                id="course-title"
                type="text"
                value={course.title}
                onChange={(e) => setCourse(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter course title"
            />
            <FormField
                label="Description"
                id="course-description"
                type="textarea"
                value={course.description || ''}
                onChange={(e) => setCourse(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Course description"
                rows={6}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    label="Category"
                    id="course-category"
                    type="text"
                    value={course.category || ''}
                    onChange={(e) => setCourse(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Programming, Design, Business"
                />
                <FormField
                    label="Status"
                    id="course-status"
                    type="select"
                    value={course.status}
                    onChange={(e) => setCourse(prev => ({ ...prev, status: e.target.value }))}
                    options={statusOptions}
                >
                    {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </FormField>
            </div>
            <FormField
                label="Tags"
                id="course-tags"
                type="text"
                value={course.tags?.join(', ') || ''}
                onChange={(e) => setCourse(prev => ({
                    ...prev,
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                }))}
                placeholder="Enter tags separated by commas"
                description="Use commas to separate multiple tags"
            />
        </motion.div>
    );
};

export default CourseDetailsForm;