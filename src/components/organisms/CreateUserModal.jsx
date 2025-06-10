import React from 'react';
import Modal from '@/components/molecules/Modal';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';

const CreateUserModal = ({ isOpen, onClose, newUser, setNewUser, onCreateUser }) => {
    const roleOptions = [
        { value: 'student', label: 'Student' },
        { value: 'instructor', label: 'Instructor' },
        { value: 'admin', label: 'Admin' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateUser(e);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New User"
            className="max-w-md"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                    label="Full Name *"
                    id="new-user-name"
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                    required
                />
                <FormField
                    label="Email Address *"
                    id="new-user-email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                    required
                />
                <FormField
                    label="Role"
                    id="new-user-role"
                    type="select"
                    value={newUser.role}
                    onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                    options={roleOptions}
                >
                    {roleOptions.map(option => (
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
                        Add User
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateUserModal;