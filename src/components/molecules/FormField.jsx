import React from 'react';
import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import Select from '@/components/atoms/Select';
import Checkbox from '@/components/atoms/Checkbox';

const FormField = ({
    label,
    id,
    type = 'text',
    value,
    onChange,
    placeholder,
    options, // for select type
    description, // optional hint text
    labelClassName,
    inputClassName,
    fieldClassName,
    ...props
}) => {
    const renderControl = () => {
        switch (type) {
            case 'textarea':
                return (
                    <Textarea
                        id={id}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={inputClassName}
                        {...props}
                    />
                );
            case 'select':
                return (
                    <Select
                        id={id}
                        value={value}
                        onChange={onChange}
                        className={inputClassName}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                );
            case 'checkbox':
                // Checkbox typically has label wrapping the input or separate.
                // For this component, we assume label is for the field group,
                // and the checkbox itself might be inside the 'children' or handled differently.
                // Re-think if this should be a separate CheckboxField molecule.
                return (
                    <Checkbox
                        id={id}
                        checked={value}
                        onChange={onChange}
                        className={inputClassName}
                        {...props}
                    />
                );
            default:
                return (
                    <Input
                        type={type}
                        id={id}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={inputClassName}
                        {...props}
                    />
                );
        }
    };

    if (type === 'checkbox') {
        return (
            <div className={`flex items-center space-x-3 ${fieldClassName}`}>
                <Checkbox
                    id={id}
                    checked={value}
                    onChange={onChange}
                    className={inputClassName}
                    {...props}
                />
                <Label htmlFor={id} className={`mb-0 !text-surface-700 ${labelClassName}`}>
                    {label}
                    {description && <p className="text-sm text-surface-500">{description}</p>}
                </Label>
            </div>
        );
    }

    return (
        <div className={fieldClassName}>
            {label && <Label htmlFor={id} className={labelClassName}>{label}</Label>}
            {renderControl()}
            {description && <p className="text-xs text-surface-500 mt-1">{description}</p>}
        </div>
    );
};

export default FormField;