import React from 'react';
import Modal from '@/components/molecules/Modal';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';

const CreateCourseModal = ({ isOpen, onClose, newCourse, setNewCourse, onCreateCourse }) => {
    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'archived', label: 'Archived' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateCourse(e);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Course"
            className="max-w-md"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                    label="Course Title *"
                    id="new-course-title"
                    type="text"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter course title"
                    required
                />
                <FormField
                    label="Description"
                    id="new-course-description"
                    type="textarea"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Course description"
                    rows={3}
                />
                <FormField
                    label="Category"
                    id="new-course-category"
                    type="text"
                    value={newCourse.category}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Programming, Design, Business"
                />
                <FormField
                    label="Status"
                    id="new-course-status"
                    type="select"
                    value={newCourse.status}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, status: e.target.value }))}
                    options={statusOptions}
                >
                    {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </FormField>

                <div className="flex space-x-3 pt-4">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:shadow-lg"
                    >
                        Create Course
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateCourseModal;