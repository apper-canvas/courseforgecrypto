import React from 'react';
import { motion } from 'framer-motion';
import CommentCard from '@/components/molecules/CommentCard';
import EmptyState from '@/components/organisms/EmptyState';

const CommentsList = ({
    comments,
    statusFilter,
    getUserName,
    getStatusBadge,
    selectedComments,
    onToggleCommentSelection,
    onUpdateCommentStatus,
    onViewCommentDetails,
    ...props
}) => {
    if (comments.length === 0) {
        return (
            <EmptyState
                icon="MessageSquare"
                title="No comments to review"
                description={statusFilter === 'pending' ? 'All comments have been reviewed' : `No ${statusFilter} comments found`}
            />
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
            {...props}
        >
            {comments.map((comment, index) => (
                <CommentCard
                    key={comment.id}
                    comment={comment}
                    getUserName={getUserName}
                    getStatusBadge={getStatusBadge}
                    onToggleSelect={onToggleCommentSelection}
                    isSelected={selectedComments.includes(comment.id)}
                    onApprove={onUpdateCommentStatus}
                    onReject={onUpdateCommentStatus}
                    onDelete={onUpdateCommentStatus}
                    onViewDetails={onViewCommentDetails}
                    index={index}
                />
            ))}
        </motion.div>
    );
};

export default CommentsList;