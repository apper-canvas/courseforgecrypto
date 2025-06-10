import React from 'react';
import { motion } from 'framer-motion';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import Paragraph from '@/components/atoms/Paragraph';
import Heading from '@/components/atoms/Heading';

const ModerationHeader = ({
    statusFilter,
    setStatusFilter,
    selectedCommentsCount,
    onBulkApprove,
    onBulkReject,
    className,
    ...props
}) => {
    const statusOptions = [
        { value: 'pending', label: 'Pending Review' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'all', label: 'All Comments' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 ${className}`}
            {...props}
        >
            <div>
                <Heading level={1} className="!text-3xl font-heading font-bold text-surface-900 mb-2">
                    Moderation
                </Heading>
                <Paragraph className="text-surface-600">
                    Review and manage user comments and discussions
                </Paragraph>
            </div>

            <div className="flex items-center space-x-3">
                <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </Select>

                {selectedCommentsCount > 0 && (
                    <div className="flex items-center space-x-2">
                        <Paragraph className="text-sm text-surface-600">
                            {selectedCommentsCount} selected
                        </Paragraph>
                        <Button
                            onClick={onBulkApprove}
                            className="bg-success text-white px-3 py-1 rounded text-sm hover:shadow-md"
                        >
                            Approve
                        </Button>
                        <Button
                            onClick={onBulkReject}
                            className="bg-error text-white px-3 py-1 rounded text-sm hover:shadow-md"
                        >
                            Reject
                        </Button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ModerationHeader;