import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';

const UsersFilters = ({ searchQuery, setSearchQuery, roleFilter, setRoleFilter, ...props }) => {
    const roleOptions = [
        { value: 'all', label: 'All Roles' },
        { value: 'student', label: 'Students' },
        { value: 'instructor', label: 'Instructors' },
        { value: 'admin', label: 'Admins' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-surface-200 mb-6"
            {...props}
        >
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                <div className="relative flex-1 max-w-md">
                    <ApperIcon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
                    <Input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2"
                    />
                </div>

                <Select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    {roleOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </Select>
            </div>
        </motion.div>
    );
};

export default UsersFilters;