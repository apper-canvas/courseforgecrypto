import React from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Paragraph from '@/components/atoms/Paragraph';

const EnrollmentModal = ({ isOpen, onClose, selectedUser, courses, onEnrollUser, onUnenrollUser }) => {
    if (!selectedUser) return null;

    const getCourseTitle = (courseId) => {
        const course = courses.find(c => c.id === courseId);
        return course?.title || 'Unknown Course';
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Manage Enrollments"
            className="max-w-md"
        >
            <div className="mb-4">
                <h3 className="font-medium text-surface-900 mb-2">
                    {selectedUser.name}
                </h3>
                <Paragraph className="text-sm text-surface-600">
                    Currently enrolled in {selectedUser.enrolledCourses?.length || 0} courses
                </Paragraph>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                {courses.map(course => {
                    const isEnrolled = selectedUser.enrolledCourses?.includes(course.id);
                    return (
                        <div key={course.id} className="flex items-center justify-between p-3 border border-surface-200 rounded-lg">
                            <div className="flex-1 min-w-0">
                                <Paragraph className="!text-sm !font-medium !text-surface-900 break-words">
                                    {course.title}
                                </Paragraph>
                                <Paragraph className="!text-xs !text-surface-500">
                                    {course.category || 'Uncategorized'}
                                </Paragraph>
                            </div>
                            {isEnrolled ? (
                                <Button
                                    onClick={() => onUnenrollUser(selectedUser.id, course.id)}
                                    className="ml-3 px-3 py-1 bg-error/10 text-error rounded text-xs hover:bg-error/20"
                                >
                                    Unenroll
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => onEnrollUser(course.id)}
                                    className="ml-3 px-3 py-1 bg-primary/10 text-primary rounded text-xs hover:bg-primary/20"
                                >
                                    Enroll
                                </Button>
                            )}
                        </div>
                    );
                })}
            </div>
        </Modal>
    );
};

export default EnrollmentModal;