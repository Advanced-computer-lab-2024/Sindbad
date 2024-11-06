import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import { TextField } from './TextField';

export const ObjectArrayField = ({ name, control, initialValue, label, fieldsSchema }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <FormLabel>{label || name}</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-2">
          {fieldsSchema.map((schema) => (
            <TextField
              key={`${name}.${index}.${schema.name}`}
              name={`${name}.${index}.${schema.name}`}
              control={control}
              type={schema.type}
              label={schema.label || schema.name}
            />
          ))}
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
