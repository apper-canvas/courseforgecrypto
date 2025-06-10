import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';

const Modal = ({ isOpen, onClose, title, children, footer, className, ...props }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                {...props}
            >
                <div className={`bg-white rounded-xl shadow-xl w-full p-6 ${className}`}>
                    <div className="flex items-center justify-between mb-6">
                        <Heading level={2} className="!text-xl font-heading font-semibold text-surface-900">
                            {title}
                        </Heading>
                        <Button
                            onClick={onClose}
                            className="p-2 hover:bg-surface-100 rounded-lg"
                        >
                            <ApperIcon name="X" size={18} />
                        </Button>
                    </div>

                    <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                        {children}
                    </div>

                    {footer && (
                        <div className="flex space-x-3 pt-4 border-t border-surface-200 mt-6">
                            {footer}
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Modal;