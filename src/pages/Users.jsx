import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import userService from '../services/api/userService';
import courseService from '../services/api/courseService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersData, coursesData] = await Promise.all([
        userService.getAll(),
        courseService.getAll()
      ]);
      setUsers(usersData);
      setCourses(coursesData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) {
      toast.error('Name and email are required');
      return;
    }

    try {
      const created = await userService.create({
        ...newUser,
        enrolledCourses: [],
        joinedAt: new Date().toISOString()
      });
      setUsers(prev => [created, ...prev]);
      setShowCreateModal(false);
      setNewUser({ name: '', email: '', role: 'student' });
      toast.success('User created successfully');
    } catch (err) {
      toast.error('Failed to create user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await userService.delete(userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
      toast.success('User deleted successfully');
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      const updated = await userService.update(userId, { role: newRole });
      setUsers(prev => prev.map(user => user.id === userId ? updated : user));
      toast.success('User role updated successfully');
    } catch (err) {
      toast.error('Failed to update user role');
    }
  };

  const handleEnrollUser = async (courseId) => {
    if (!selectedUser) return;

    try {
      const enrolledCourses = selectedUser.enrolledCourses || [];
      if (enrolledCourses.includes(courseId)) {
        toast.error('User is already enrolled in this course');
        return;
      }

      const updated = await userService.update(selectedUser.id, {
        enrolledCourses: [...enrolledCourses, courseId]
      });
      setUsers(prev => prev.map(user => user.id === selectedUser.id ? updated : user));
      setShowEnrollModal(false);
      setSelectedUser(null);
      toast.success('User enrolled successfully');
    } catch (err) {
      toast.error('Failed to enroll user');
    }
  };

  const handleUnenrollUser = async (userId, courseId) => {
    try {
      const user = users.find(u => u.id === userId);
      const enrolledCourses = (user.enrolledCourses || []).filter(id => id !== courseId);
      
      const updated = await userService.update(userId, { enrolledCourses });
      setUsers(prev => prev.map(u => u.id === userId ? updated : u));
      toast.success('User unenrolled successfully');
    } catch (err) {
      toast.error('Failed to unenroll user');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role) => {
    const styles = {
      student: 'bg-primary/10 text-primary',
      instructor: 'bg-secondary/10 text-secondary',
      admin: 'bg-accent/10 text-accent'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${styles[role] || styles.student}`;
  };

  const getCourseTitle = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course?.title || 'Unknown Course';
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 bg-surface-200 rounded w-32 animate-pulse"></div>
            <div className="h-10 bg-surface-200 rounded w-32 animate-pulse"></div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-surface-200 overflow-hidden">
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-surface-200 rounded animate-pulse"></div>
              ))}
            </div>
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
          <h3 className="text-lg font-medium text-surface-900 mb-2">Failed to load users</h3>
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
              Users
            </h1>
            <p className="text-surface-600">
              Manage user accounts, roles, and course enrollments
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all inline-flex items-center space-x-2"
          >
            <ApperIcon name="UserPlus" size={18} />
            <span>Add User</span>
          </motion.button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-surface-200 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="relative flex-1 max-w-md">
              <ApperIcon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="instructor">Instructors</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </motion.div>

        {/* Users Table */}
        {filteredUsers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <ApperIcon name="Users" className="w-16 h-16 text-surface-300 mx-auto" />
            </motion.div>
            <h3 className="mt-4 text-lg font-medium text-surface-900">
              {searchQuery || roleFilter !== 'all' ? 'No users match your filters' : 'No users yet'}
            </h3>
            <p className="mt-2 text-surface-600">
              {searchQuery || roleFilter !== 'all' ? 'Try adjusting your search criteria' : 'Get started by adding your first user'}
            </p>
            {!searchQuery && roleFilter === 'all' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:shadow-lg transition-all"
              >
                Add First User
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-surface-200 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-50">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-surface-700">User</th>
                    <th className="text-left p-4 text-sm font-medium text-surface-700">Role</th>
                    <th className="text-left p-4 text-sm font-medium text-surface-700">Enrollments</th>
                    <th className="text-left p-4 text-sm font-medium text-surface-700">Joined</th>
                    <th className="text-left p-4 text-sm font-medium text-surface-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="border-t border-surface-200 hover:bg-surface-50/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-surface-900 break-words">
                              {user.name}
                            </div>
                            <div className="text-sm text-surface-500 break-words">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                          className={`${getRoleBadge(user.role)} border-none outline-none bg-transparent cursor-pointer`}
                        >
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-surface-900">
                            {user.enrolledCourses?.length || 0} courses
                          </span>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowEnrollModal(true);
                            }}
                            className="text-primary text-sm hover:underline"
                          >
                            Manage
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-surface-600">
                          {new Date(user.joinedAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 text-surface-400 hover:text-error transition-colors"
                          >
                            <ApperIcon name="Trash2" size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Create User Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowCreateModal(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-heading font-semibold text-surface-900">
                      Add New User
                    </h2>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                    >
                      <ApperIcon name="X" size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleCreateUser} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={newUser.name}
                        onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Enter full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Enter email address"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Role
                      </label>
                      <select
                        value={newUser.role}
                        onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      >
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="flex-1 px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:shadow-lg transition-all"
                      >
                        Add User
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Enrollment Modal */}
        <AnimatePresence>
          {showEnrollModal && selectedUser && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowEnrollModal(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-heading font-semibold text-surface-900">
                      Manage Enrollments
                    </h2>
                    <button
                      onClick={() => setShowEnrollModal(false)}
                      className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                    >
                      <ApperIcon name="X" size={18} />
                    </button>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-medium text-surface-900 mb-2">
                      {selectedUser.name}
                    </h3>
                    <p className="text-sm text-surface-600">
                      Currently enrolled in {selectedUser.enrolledCourses?.length || 0} courses
                    </p>
                  </div>

                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {courses.map(course => {
                      const isEnrolled = selectedUser.enrolledCourses?.includes(course.id);
                      return (
                        <div key={course.id} className="flex items-center justify-between p-3 border border-surface-200 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-surface-900 break-words">
                              {course.title}
                            </div>
                            <div className="text-xs text-surface-500">
                              {course.category || 'Uncategorized'}
                            </div>
                          </div>
                          {isEnrolled ? (
                            <button
                              onClick={() => handleUnenrollUser(selectedUser.id, course.id)}
                              className="ml-3 px-3 py-1 bg-error/10 text-error rounded text-xs hover:bg-error/20 transition-all"
                            >
                              Unenroll
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEnrollUser(course.id)}
                              className="ml-3 px-3 py-1 bg-primary/10 text-primary rounded text-xs hover:bg-primary/20 transition-all"
                            >
                              Enroll
                            </button>
                          )}
                        </div>
                      );
                    })}
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

export default Users;