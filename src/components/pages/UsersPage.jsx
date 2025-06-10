import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import userService from '@/services/api/userService';
import courseService from '@/services/api/courseService';
import PageHeader from '@/components/organisms/PageHeader';
import UsersFilters from '@/components/organisms/UsersFilters';
import UserTable from '@/components/organisms/UserTable';
import CreateUserModal from '@/components/organisms/CreateUserModal';
import EnrollmentModal from '@/components/organisms/EnrollmentModal';
import Button from '@/components/atoms/Button';
import LoadingState from '@/components/organisms/LoadingState';
import ErrorState from '@/components/organisms/ErrorState';

const UsersPage = () => {
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

    if (loading) {
        return <LoadingState message="Loading users..." />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={loadData} />;
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Users"
                    description="Manage user accounts, roles, and course enrollments"
                    actionButton={
                        <Button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg inline-flex items-center space-x-2"
                            icon={ApperIcon}
                            name="UserPlus"
                            iconSize={18}
                        >
                            <span>Add User</span>
                        </Button>
                    }
                />

                <UsersFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    roleFilter={roleFilter}
                    setRoleFilter={setRoleFilter}
                />

                <UserTable
                    filteredUsers={filteredUsers}
                    courses={courses}
                    searchQuery={searchQuery}
                    roleFilter={roleFilter}
                    onUpdateUserRole={handleUpdateUserRole}
                    onDeleteUser={handleDeleteUser}
                    onManageEnrollments={(user) => { setSelectedUser(user); setShowEnrollModal(true); }}
                    onCreateFirstUser={() => setShowCreateModal(true)}
                />

                <CreateUserModal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    newUser={newUser}
                    setNewUser={setNewUser}
                    onCreateUser={handleCreateUser}
                />

                <EnrollmentModal
                    isOpen={showEnrollModal}
                    onClose={() => setShowEnrollModal(false)}
                    selectedUser={selectedUser}
                    courses={courses}
                    onEnrollUser={handleEnrollUser}
                    onUnenrollUser={handleUnenrollUser}
                />
            </div>
        </div>
    );
};

export default UsersPage;