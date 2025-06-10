import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Modal from '@/components/molecules/Modal';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import Select from '@/components/atoms/Select';

const CreateModuleModal = ({ isOpen, onClose, onSubmit, courseId, existingModules = [] }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: existingModules.length + 1
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Module title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Module title must be at least 3 characters';
    }

    if (formData.description && formData.description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const moduleData = {
        ...formData,
        courseId,
        title: formData.title.trim(),
        description: formData.description.trim()
      };
      
      await onSubmit(moduleData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        order: existingModules.length + 2
      });
      setErrors({});
      onClose();
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to create module' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        title: '',
        description: '',
        order: existingModules.length + 1
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={handleClose} className="max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-surface-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Layers" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-surface-900">Add New Module</h3>
                  <p className="text-sm text-surface-600">Create a new module for this course</p>
                </div>
              </div>
              <Button
                onClick={handleClose}
                className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <FormField
                label="Module Title"
                error={errors.title}
                required
              >
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Introduction to React"
                  className={`w-full ${errors.title ? 'border-error' : ''}`}
                  disabled={isSubmitting}
                />
              </FormField>

              <FormField
                label="Description"
                error={errors.description}
              >
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of what this module covers..."
                  rows={3}
                  className={`w-full ${errors.description ? 'border-error' : ''}`}
                  disabled={isSubmitting}
                />
                <div className="text-xs text-surface-500 mt-1">
                  {formData.description.length}/500 characters
                </div>
              </FormField>

              <FormField
                label="Module Order"
              >
                <Select
                  value={formData.order}
                  onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {[...Array(existingModules.length + 1)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      Position {index + 1}
                    </option>
                  ))}
                </Select>
              </FormField>

              {errors.submit && (
                <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                  <p className="text-sm text-error">{errors.submit}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-surface-200">
                <Button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:shadow-lg inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Plus" size={16} />
                      <span>Create Module</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CreateModuleModal;