import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Button from '@/components/atoms/Button';
import Textarea from '@/components/atoms/Textarea';
import Input from '@/components/atoms/Input';
import Paragraph from '@/components/atoms/Paragraph';
import EmptyState from '@/components/organisms/EmptyState';

const ModulesManagement = ({ modules, onAddModule, onDeleteModule, onUpdateModule, ...props }) => {
    return (
        <motion.div
            key="modules"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            {...props}
        >
            <div className="flex justify-between items-center">
                <Heading level={3} className="!text-lg font-heading font-semibold text-surface-900">
                    Course Modules
                </Heading>
                <Button
                    onClick={onAddModule}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg inline-flex items-center space-x-2"
                    icon={ApperIcon}
                    name="Plus"
                    iconSize={16}
                >
                    <span>Add Module</span>
                </Button>
            </div>

            {modules.length === 0 ? (
                <EmptyState
                    icon="Layers"
                    title="No modules yet"
                    description="Start building your course by adding modules"
                    actionButton={
                        <Button
                            onClick={onAddModule}
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg"
                        >
                            Add First Module
                        </Button>
                    }
                    className="!bg-surface-50 rounded-lg"
                />
            ) : (
                <div className="space-y-4">
                    {modules.map((module, index) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-surface-50 rounded-lg p-6 border border-surface-200"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </div>
                                    <Input
                                        type="text"
                                        value={module.title}
                                        onChange={(e) => onUpdateModule(module.id, { title: e.target.value })}
                                        className="!text-lg !font-medium !bg-transparent !border-none !outline-none !text-surface-900 focus:!bg-white focus:!border focus:!border-primary/20 focus:!rounded !px-2 !py-1"
                                    />
                                </div>
                                <Button
                                    onClick={() => onDeleteModule(module.id)}
                                    className="p-2 text-surface-400 hover:text-error"
                                >
                                    <ApperIcon name="Trash2" size={16} />
                                </Button>
                            </div>

                            <Textarea
                                value={module.description || ''}
                                onChange={(e) => onUpdateModule(module.id, { description: e.target.value })}
                                className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                placeholder="Module description"
                                rows={2}
                            />

                            <div className="mt-4 pt-4 border-t border-surface-200">
                                <div className="flex items-center justify-between">
                                    <Paragraph className="text-sm text-surface-600">
                                        {module.lessons?.length || 0} lessons
                                    </Paragraph>
                                    <Button className="text-primary text-sm hover:underline">
                                        Manage Lessons
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default ModulesManagement;