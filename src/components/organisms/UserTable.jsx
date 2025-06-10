import React from 'react';
import { motion } from 'framer-motion';
import UserTableRow from '@/components/molecules/UserTableRow';
import EmptyState from '@/components/organisms/EmptyState';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const UserTable = ({
    filteredUsers,
    courses,
    searchQuery,
    roleFilter,
    onUpdateUserRole,
    onDeleteUser,
    onManageEnrollments,
    onCreateFirstUser,
    ...props
}) => {
    if (filteredUsers.length === 0) {
        return (
            <EmptyState
                icon="Users"
                title={searchQuery || roleFilter !== 'all' ? 'No users match your filters' : 'No users yet'}
                description={searchQuery || roleFilter !== 'all' ? 'Try adjusting your search criteria' : 'Get started by adding your first user'}
                actionButton={
                    (!searchQuery && roleFilter === 'all') ? (
                        <Button
                            onClick={onCreateFirstUser}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:shadow-lg"
                        >
                            Add First User
                        </Button>
                    ) : null
                }
            />
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-surface-200 overflow-hidden"
            {...props}
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
                            <UserTableRow
                                key={user.id}
                                user={user}
                                courses={courses}
                                onUpdateRole={onUpdateUserRole}
                                onDelete={onDeleteUser}
                                onManageEnrollments={onManageEnrollments}
                                index={index}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default UserTable;