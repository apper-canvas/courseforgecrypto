import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Checkbox from '@/components/atoms/Checkbox';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

const CourseCard = ({ course, onEdit, onDelete, onToggleSelect, isSelected, index, ...props }) => {
    const getStatusBadge = (status) => {
        const styles = {
            draft: 'bg-surface-100 text-surface-700',
            published: 'bg-success/10 text-success',
            archived: 'bg-warning/10 text-warning'
        };
        return styles[status] || styles.draft;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index * 0.05) + 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-surface-200 hover:shadow-lg transition-all"
            {...props}
        >
            <div className="flex items-start justify-between mb-4">
                <Checkbox
                    checked={isSelected}
                    onChange={() => onToggleSelect(course.id)}
                    className="mt-1"
                />
                <div className="flex space-x-2">
                    <Button
                        onClick={() => onEdit(course.id)}
                        className="p-2 text-surface-400 hover:text-primary"
                    >
                        <ApperIcon name="Edit" size={16} />
                    </Button>
                    <Button
                        onClick={() => onDelete(course.id)}
                        className="p-2 text-surface-400 hover:text-error"
                    >
                        <ApperIcon name="Trash2" size={16} />
                    </Button>
                </div>
            </div>

            <Heading level={3} className="!text-lg font-heading font-semibold text-surface-900 mb-2 break-words">
                {course.title}
            </Heading>
            <Paragraph className="text-sm mb-4 break-words">
                {course.description || 'No description available'}
            </Paragraph>

            <div className="flex items-center justify-between">
                <Badge className={getStatusBadge(course.status)}>
                    {course.status}
                </Badge>
                <Paragraph className="text-xs text-surface-500">
                    {course.category || 'Uncategorized'}
                </Paragraph>
            </div>

            <div className="mt-4 pt-4 border-t border-surface-100">
                <Paragraph className="flex items-center justify-between text-xs text-surface-500">
                    <span>Created {new Date(course.createdAt).toLocaleDateString()}</span>
                    <span>Updated {new Date(course.updatedAt).toLocaleDateString()}</span>
                </Paragraph>
            </div>
        </motion.div>
    );
};

export default CourseCard;