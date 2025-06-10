import React from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Paragraph from '@/components/atoms/Paragraph';
import Heading from '@/components/atoms/Heading';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const CommentDetailModal = ({ isOpen, onClose, comment, getUserName, getStatusBadge, onUpdateCommentStatus }) => {
    if (!comment) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Comment Details"
            className="max-w-2xl"
        >
            <div className="space-y-6">
                <div>
                    <Heading level={5} className="!text-sm font-medium text-surface-700 mb-2">User Information</Heading>
                    <div className="bg-surface-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                    {getUserName(comment.userId).charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <Heading level={4} className="font-medium text-surface-900">
                                    {getUserName(comment.userId)}
                                </Heading>
                                <Paragraph className="text-sm text-surface-500">
                                    Posted on {new Date(comment.createdAt).toLocaleDateString()}
                                </Paragraph>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Heading level={5} className="!text-sm font-medium text-surface-700 mb-2">Comment Content</Heading>
                    <div className="bg-surface-50 rounded-lg p-4">
                        <Paragraph className="text-surface-900 break-words whitespace-pre-wrap">
                            {comment.content}
                        </Paragraph>
                    </div>
                </div>

                <div>
                    <Heading level={5} className="!text-sm font-medium text-surface-700 mb-2">Metadata</Heading>
                    <div className="bg-surface-50 rounded-lg p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <Paragraph className="!text-surface-600 !text-sm">Status:</Paragraph>
                            <Badge className={getStatusBadge(comment.status)}>
                                {comment.status}
                            </Badge>
                        </div>
                        <div className="flex justify-between">
                            <Paragraph className="!text-surface-600 !text-sm">Lesson ID:</Paragraph>
                            <Paragraph className="!text-surface-900 !font-mono !text-sm">
                                {comment.lessonId}
                            </Paragraph>
                        </div>
                        <div className="flex justify-between">
                            <Paragraph className="!text-surface-600 !text-sm">Comment ID:</Paragraph>
                            <Paragraph className="!text-surface-900 !font-mono !text-sm">
                                {comment.id}
                            </Paragraph>
                        </div>
                    </div>
                </div>

                {comment.status === 'pending' && (
                    <div className="flex space-x-3 pt-4 border-t border-surface-200">
                        <Button
                            onClick={() => {
                                onUpdateCommentStatus(comment.id, 'approved');
                                onClose();
                            }}
                            className="flex-1 bg-success text-white px-4 py-2 rounded-lg hover:shadow-lg"
                        >
                            Approve Comment
                        </Button>
                        <Button
                            onClick={() => {
                                onUpdateCommentStatus(comment.id, 'rejected');
                                onClose();
                            }}
                            className="flex-1 bg-error text-white px-4 py-2 rounded-lg hover:shadow-lg"
                        >
                            Reject Comment
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default CommentDetailModal;