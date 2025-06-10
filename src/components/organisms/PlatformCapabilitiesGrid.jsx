import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const PlatformCapabilitiesGrid = ({ features, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-br from-surface-50 to-white rounded-2xl p-8 border border-surface-200"
            {...props}
        >
            <Heading level={2} className="!text-2xl font-heading font-bold text-surface-900 mb-8 text-center">
                Platform Capabilities
            </Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: (index * 0.1) + 1 }}
                        className="text-center"
                    >
                        <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-surface-200 flex items-center justify-center mx-auto mb-4">
                            <ApperIcon name={feature.icon} size={24} className="text-primary" />
                        </div>
                        <Heading level={3} className="font-heading font-semibold text-surface-900 mb-2">
                            {feature.title}
                        </Heading>
                        <Paragraph className="text-sm text-surface-600">
                            {feature.desc}
                        </Paragraph>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default PlatformCapabilitiesGrid;