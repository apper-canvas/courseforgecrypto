import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Checkbox from '@/components/atoms/Checkbox';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Paragraph from '@/components/atoms/Paragraph';
import Heading from '@/components/atoms/Heading';

const CommentCard = ({
    comment,
    getUserName,
    getStatusBadge,
    onApprove,
    onReject,
    onDelete,
    onViewDetails,
    onToggleSelect,
    isSelected,
    index,
    ...props
}) => {
    return (
        <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index * 0.05) + 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-surface-200 hover:shadow-md transition-all"
            {...props}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <Checkbox
                        checked={isSelected}
                        onChange={() => onToggleSelect(comment.id)}
                    />
                    <div>
                        <Heading level={4} className="font-medium text-surface-900">
                            {getUserName(comment.userId)}
                        </Heading>
                        <Paragraph className="text-sm text-surface-500">
                            {new Date(comment.createdAt).toLocaleString()}
                        </Paragraph>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <Badge className={getStatusBadge(comment.status)}>
                        {comment.status}
                    </Badge>
                    <Button
                        onClick={() => onViewDetails(comment)}
                        className="p-2 text-surface-400 hover:text-primary"
                    >
                        <ApperIcon name="Eye" size={16} />
                    </Button>
                </div>
            </div>

            <Paragraph className="text-surface-700 mb-4 break-words">
                {comment.content}
            </Paragraph>

            <div className="flex items-center justify-between">
                <Paragraph className="text-sm text-surface-500">
                    Lesson ID: {comment.lessonId}
                </Paragraph>

                {comment.status === 'pending' && (
                    <div className="flex space-x-2">
                        <Button
                            onClick={() => onApprove(comment.id, 'approved')}
                            className="bg-success text-white px-4 py-2 rounded-lg text-sm hover:shadow-md"
                        >
                            Approve
                        </Button>
                        <Button
                            onClick={() => onReject(comment.id, 'rejected')}
                            className="bg-error text-white px-4 py-2 rounded-lg text-sm hover:shadow-md"
                        >
                            Reject
                        </Button>
                        <Button
                            onClick={() => onDelete(comment.id, 'deleted')}
                            className="bg-surface-100 text-surface-700 px-4 py-2 rounded-lg text-sm hover:bg-surface-200"
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default CommentCard;