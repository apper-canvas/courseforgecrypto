import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import Paragraph from '@/components/atoms/Paragraph';

const UserTableRow = ({ user, courses, onUpdateRole, onDelete, onManageEnrollments, index, ...props }) => {
    const getRoleBadge = (role) => {
        const styles = {
            student: 'bg-primary/10 text-primary',
            instructor: 'bg-secondary/10 text-secondary',
            admin: 'bg-accent/10 text-accent'
        };
        return styles[role] || styles.student;
    };

    const getCourseTitle = (courseId) => {
        const course = courses.find(c => c.id === courseId);
        return course?.title || 'Unknown Course';
    };

    return (
        <motion.tr
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index * 0.05) + 0.1 }}
            className="border-t border-surface-200 hover:bg-surface-50/50 transition-colors"
            {...props}
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
                        <Paragraph className="text-sm text-surface-500 break-words">
                            {user.email}
                        </Paragraph>
                    </div>
                </div>
            </td>
            <td className="p-4">
                <Select
                    value={user.role}
                    onChange={(e) => onUpdateRole(user.id, e.target.value)}
                    className={`${getRoleBadge(user.role)} !border-none !outline-none !bg-transparent cursor-pointer`}
                >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                </Select>
            </td>
            <td className="p-4">
                <div className="flex items-center space-x-2">
                    <Paragraph className="text-sm text-surface-900">
                        {user.enrolledCourses?.length || 0} courses
                    </Paragraph>
                    <Button
                        onClick={() => onManageEnrollments(user)}
                        className="text-primary text-sm hover:underline"
                    >
                        Manage
                    </Button>
                </div>
            </td>
            <td className="p-4">
                <Paragraph className="text-sm text-surface-600">
                    {new Date(user.joinedAt).toLocaleDateString()}
                </Paragraph>
            </td>
            <td className="p-4">
                <div className="flex items-center space-x-2">
                    <Button
                        onClick={() => onDelete(user.id)}
                        className="p-2 text-surface-400 hover:text-error"
                    >
                        <ApperIcon name="Trash2" size={16} />
                    </Button>
                </div>
            </td>
        </motion.tr>
    );
};

export default UserTableRow;