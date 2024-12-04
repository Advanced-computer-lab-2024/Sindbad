import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import { TextField } from './TextField';

export const ObjectArrayField = ({ name, control, initialValue, label, fieldsSchema, description }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    const { register } = useFormContext();

    function renderNestedField(schema, path) {
        const fullPath = `${path}.${schema.name}`;
        switch (schema.type) {
            case 'text':
            case 'number':
            case 'date':
                return (
                    <TextField
                        key={fullPath}
                        name={fullPath}
                        control={control}
                        type={schema.type}
                        label={schema.label || schema.name}
                    />
                );
            // Add other field types as needed
            default:
                return null;
        }
    }

    return (
        <div className="space-y-4">
            <div>
                <FormLabel>{label || name}</FormLabel>
                {description && <p className="text-xs text-neutral-500">{description}</p>}
            </div>
            {fields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                    {fieldsSchema.map((schema) => renderNestedField(schema, `${name}.${index}`))}
                    <Button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-red-500 text-white"
                    >
                        Remove
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                onClick={() => append(initialValue)}
                className="bg-blue-500 text-white"
            >
                Add Item
            </Button>
        </div>
    );
};
