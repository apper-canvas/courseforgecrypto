import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import commentService from '../services/api/commentService';
import userService from '../services/api/userService';

const Moderation = () => {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [selectedComment, setSelectedComment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

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

  const filteredComments = comments.filter(comment => 
    statusFilter === 'all' || comment.status === statusFilter
  );

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-accent/10 text-accent',
      approved: 'bg-success/10 text-success',
      rejected: 'bg-error/10 text-error'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.pending}`;
  };

  const [selectedComments, setSelectedComments] = useState([]);

  const toggleCommentSelection = (commentId) => {
    setSelectedComments(prev =>
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-surface-200 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-4 bg-surface-200 rounded w-64 animate-pulse"></div>
          </div>
          
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-surface-200 animate-pulse">
                <div className="h-4 bg-surface-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-surface-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-surface-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto text-center py-12">
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Failed to load moderation queue</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-surface-900 mb-2">
              Moderation
            </h1>
            <p className="text-surface-600">
              Review and manage user comments and discussions
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            >
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="all">All Comments</option>
            </select>

            {selectedComments.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-surface-600">
                  {selectedComments.length} selected
                </span>
                <button
                  onClick={() => handleBulkAction('approved', selectedComments)}
                  className="bg-success text-white px-3 py-1 rounded text-sm hover:shadow-md transition-all"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleBulkAction('rejected', selectedComments)}
                  className="bg-error text-white px-3 py-1 rounded text-sm hover:shadow-md transition-all"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
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
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-surface-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-heading font-bold text-surface-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-surface-600">{stat.label}</div>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} size={20} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comments List */}
        {filteredComments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <ApperIcon name="MessageSquare" className="w-16 h-16 text-surface-300 mx-auto" />
            </motion.div>
            <h3 className="mt-4 text-lg font-medium text-surface-900">
              No comments to review
            </h3>
            <p className="mt-2 text-surface-600">
              {statusFilter === 'pending' 
                ? 'All comments have been reviewed' 
                : `No ${statusFilter} comments found`}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {filteredComments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-surface-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedComments.includes(comment.id)}
                      onChange={() => toggleCommentSelection(comment.id)}
                      className="rounded border-surface-300 text-primary focus:ring-primary/20"
                    />
                    <div>
                      <div className="font-medium text-surface-900">
                        {getUserName(comment.userId)}
                      </div>
                      <div className="text-sm text-surface-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={getStatusBadge(comment.status)}>
                      {comment.status}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedComment(comment);
                        setShowDetailModal(true);
                      }}
                      className="p-2 text-surface-400 hover:text-primary transition-colors"
                    >
                      <ApperIcon name="Eye" size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-surface-700 mb-4 break-words">
                  {comment.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-surface-500">
                    Lesson ID: {comment.lessonId}
                  </div>
                  
                  {comment.status === 'pending' && (
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleUpdateCommentStatus(comment.id, 'approved')}
                        className="bg-success text-white px-4 py-2 rounded-lg text-sm hover:shadow-md transition-all"
                      >
                        Approve
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleUpdateCommentStatus(comment.id, 'rejected')}
                        className="bg-error text-white px-4 py-2 rounded-lg text-sm hover:shadow-md transition-all"
                      >
                        Reject
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleUpdateCommentStatus(comment.id, 'deleted')}
                        className="bg-surface-100 text-surface-700 px-4 py-2 rounded-lg text-sm hover:bg-surface-200 transition-all"
                      >
                        Delete
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Comment Detail Modal */}
        <AnimatePresence>
          {showDetailModal && selectedComment && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowDetailModal(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-heading font-semibold text-surface-900">
                      Comment Details
                    </h2>
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                    >
                      <ApperIcon name="X" size={18} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-surface-700 mb-2">User Information</h3>
                      <div className="bg-surface-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {getUserName(selectedComment.userId).charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-surface-900">
                              {getUserName(selectedComment.userId)}
                            </div>
                            <div className="text-sm text-surface-500">
                              Posted on {new Date(selectedComment.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-surface-700 mb-2">Comment Content</h3>
                      <div className="bg-surface-50 rounded-lg p-4">
                        <p className="text-surface-900 break-words whitespace-pre-wrap">
                          {selectedComment.content}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-surface-700 mb-2">Metadata</h3>
                      <div className="bg-surface-50 rounded-lg p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-surface-600">Status:</span>
                          <span className={getStatusBadge(selectedComment.status)}>
                            {selectedComment.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-surface-600">Lesson ID:</span>
                          <span className="text-surface-900 font-mono">
                            {selectedComment.lessonId}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-surface-600">Comment ID:</span>
                          <span className="text-surface-900 font-mono">
                            {selectedComment.id}
                          </span>
                        </div>
                      </div>
                    </div>

                    {selectedComment.status === 'pending' && (
                      <div className="flex space-x-3 pt-4 border-t border-surface-200">
                        <button
                          onClick={() => {
                            handleUpdateCommentStatus(selectedComment.id, 'approved');
                            setShowDetailModal(false);
                          }}
                          className="flex-1 bg-success text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                        >
                          Approve Comment
                        </button>
                        <button
                          onClick={() => {
                            handleUpdateCommentStatus(selectedComment.id, 'rejected');
                            setShowDetailModal(false);
                          }}
                          className="flex-1 bg-error text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                        >
                          Reject Comment
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Moderation;