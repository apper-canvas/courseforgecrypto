import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import ChartBarPair from '@/components/molecules/ChartBarPair';

const EnrollmentTrendsChart = ({ chartData, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
            {...props}
        >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-surface-200">
                <Heading level={2} className="!text-lg font-heading font-semibold text-surface-900 mb-6">
                    Enrollment Trends
                </Heading>

                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-surface-600 mb-4">
                        <span>Enrollments</span>
                        <span>Completions</span>
                    </div>

                    {chartData.labels.map((label, index) => (
                        <ChartBarPair
                            key={label}
                            label={label}
                            enrollmentValue={chartData.enrollmentData[index]}
                            completionValue={chartData.completionData[index]}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default EnrollmentTrendsChart;