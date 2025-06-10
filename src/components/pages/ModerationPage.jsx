import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import commentService from '@/services/api/commentService';
import userService from '@/services/api/userService';
import ModerationHeader from '@/components/organisms/ModerationHeader';
import ModerationStatsGrid from '@/components/organisms/ModerationStatsGrid';
import CommentsList from '@/components/organisms/CommentsList';
import CommentDetailModal from '@/components/organisms/CommentDetailModal';
import LoadingState from '@/components/organisms/LoadingState';
import ErrorState from '@/components/organisms/ErrorState';
import Badge from '@/components/atoms/Badge'; // For getStatusBadge utility

const ModerationPage = () => {
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('pending');
    const [selectedComment, setSelectedComment] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedComments, setSelectedComments] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [commentsData, usersData] = await Promise.all([
                commentService.getAll(),
                userService.getAll()
            ]);
            setComments(commentsData);
            setUsers(usersData);
        } catch (err) {
            setError(err.message || 'Failed to load moderation data');
            toast.error('Failed to load moderation data');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateCommentStatus = async (commentId, newStatus) => {
        try {
            const updated = await commentService.update(commentId, { status: newStatus });
            setComments(prev => prev.map(comment =>
                comment.id === commentId ? updated : comment
            ));

            const statusText = newStatus === 'approved' ? 'approved' :
                               newStatus === 'rejected' ? 'rejected' : 'deleted';
            toast.success(`Comment ${statusText} successfully`);
        } catch (err) {
            toast.error(`Failed to ${newStatus} comment`);
        }
    };

    const handleBulkAction = async (action, commentIds) => {
        if (commentIds.length === 0) return;
        if (!window.confirm(`Are you sure you want to ${action} ${commentIds.length} comments?`)) return;

        try {
            await Promise.all(
                commentIds.map(id =>
                    action === 'delete'
                        ? commentService.delete(id)
                        : commentService.update(id, { status: action })
                )
            );

            if (action === 'delete') {
                setComments(prev => prev.filter(comment => !commentIds.includes(comment.id)));
            } else {
                setComments(prev => prev.map(comment =>
                    commentIds.includes(comment.id)
                        ? { ...comment, status: action }
                        : comment
                ));
            }
            setSelectedComments([]); // Clear selection after bulk action

            const actionText = action === 'approved' ? 'approved' :
                               action === 'rejected' ? 'rejected' : 'deleted';
            toast.success(`${commentIds.length} comments ${actionText}`);
        } catch (err) {
            toast.error(`Failed to ${action} comments`);
        }
    };

    const getUserName = (userId) => {
        const user = users.find(u => u.id === userId);
        return user?.name || 'Unknown User';
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-accent/10 text-accent',
            approved: 'bg-success/10 text-success',
            rejected: 'bg-error/10 text-error'
        };
        return `px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.pending}`;
    };

    const toggleCommentSelection = (commentId) => {
        setSelectedComments(prev =>
            prev.includes(commentId)
                ? prev.filter(id => id !== commentId)
                : [...prev, commentId]
        );
    };

    const handleViewCommentDetails = (comment) => {
        setSelectedComment(comment);
        setShowDetailModal(true);
    };

    const filteredComments = comments.filter(comment =>
        statusFilter === 'all' || comment.status === statusFilter
    );

    const moderationStats = [
        {
            label: 'Pending Review',
            value: comments.filter(c => c.status === 'pending').length,
            icon: 'Clock',
            color: 'bg-accent'
        },
        {
            label: 'Approved',
            value: comments.filter(c => c.status === 'approved').length,
            icon: 'CheckCircle',
            color: 'bg-success'
        },
        {
            label: 'Rejected',
            value: comments.filter(c => c.status === 'rejected').length,
            icon: 'XCircle',
            color: 'bg-error'
        },
        {
            label: 'Total Comments',
            value: comments.length,
            icon: 'MessageSquare',
            color: 'bg-primary'
        }
    ];

    if (loading) {
        return <LoadingState message="Loading moderation data..." />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={loadData} />;
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <ModerationHeader
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    selectedCommentsCount={selectedComments.length}
                    onBulkApprove={() => handleBulkAction('approved', selectedComments)}
                    onBulkReject={() => handleBulkAction('rejected', selectedComments)}
                />

                <ModerationStatsGrid stats={moderationStats} />

                <CommentsList
                    comments={filteredComments}
                    statusFilter={statusFilter}
                    getUserName={getUserName}
                    getStatusBadge={getStatusBadge}
                    selectedComments={selectedComments}
                    onToggleCommentSelection={toggleCommentSelection}
                    onUpdateCommentStatus={handleUpdateCommentStatus}
                    onViewCommentDetails={handleViewCommentDetails}
                />

                <CommentDetailModal
                    isOpen={showDetailModal}
                    onClose={() => setShowDetailModal(false)}
                    comment={selectedComment}
                    getUserName={getUserName}
                    getStatusBadge={getStatusBadge}
                    onUpdateCommentStatus={handleUpdateCommentStatus}
                />
            </div>
        </div>
    );
};

export default ModerationPage;