import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from '@/components/molecules/CourseCard';
import EmptyState from '@/components/organisms/EmptyState';
import Button from '@/components/atoms/Button';

const CoursesGrid = ({
    courses,
    selectedCourses,
    onToggleCourseSelection,
    onEditCourse,
    onDeleteCourse,
    searchQuery,
    statusFilter,
    onCreateFirstCourse,
    ...props
}) => {
    if (courses.length === 0) {
        return (
            <EmptyState
                icon="BookOpen"
                title={searchQuery || statusFilter !== 'all' ? 'No courses match your filters' : 'No courses yet'}
                description={searchQuery || statusFilter !== 'all' ? 'Try adjusting your search criteria' : 'Get started by creating your first course'}
                actionButton={
                    (!searchQuery && statusFilter === 'all') ? (
                        <Button
                            onClick={onCreateFirstCourse}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:shadow-lg"
                        >
                            Create First Course
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            {...props}
        >
            {courses.map((course, index) => (
                <CourseCard
                    key={course.id}
                    course={course}
                    onEdit={onEditCourse}
                    onDelete={onDeleteCourse}
                    onToggleSelect={onToggleCourseSelection}
                    isSelected={selectedCourses.includes(course.id)}
                    index={index}
                />
            ))}
        </motion.div>
    );
};

export default CoursesGrid;