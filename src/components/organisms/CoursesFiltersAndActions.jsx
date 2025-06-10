import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import Paragraph from '@/components/atoms/Paragraph';

const CoursesFiltersAndActions = ({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedCoursesCount,
    onBulkDelete,
    ...props
}) => {
    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'archived', label: 'Archived' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-surface-200 mb-6"
            {...props}
        >
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <ApperIcon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
                        <Input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2"
                        />
                    </div>

                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        options={statusOptions} // This prop is handled by molecule FormField
                    >
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </Select>
                </div>

                {selectedCoursesCount > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center space-x-3"
                    >
                        <Paragraph className="text-sm text-surface-600">
                            {selectedCoursesCount} selected
                        </Paragraph>
                        <Button
                            onClick={onBulkDelete}
                            className="bg-error text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg"
                        >
                            Delete Selected
                        </Button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default CoursesFiltersAndActions;