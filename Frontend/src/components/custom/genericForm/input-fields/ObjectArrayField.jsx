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
            <div className="flex justify-between">
                <div>
                    <FormLabel className="text-base font-semibold mb-2">{label || name}</FormLabel>
                    {description && <p className="text-xs text-neutral-500">{description}</p>}
                </div>
                <Button
                    type="button"
                    onClick={() => append(initialValue)}
                    className="w-max py-1.5 h-max self-start"
                >
                    Add Item
                </Button>
            </div>
            {fields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                    {fieldsSchema.map((schema) => renderNestedField(schema, `${name}.${index}`))}
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500 text-white w-[94px] py-1.5 h-max justify-center"
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
