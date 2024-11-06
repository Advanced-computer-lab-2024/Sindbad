import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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
            <FormField
              key={`${name}.${index}.${schema.name}`}
              control={control}
              name={`${name}.${index}.${schema.name}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type={schema.type === 'number' ? 'number' : schema.type === 'date' ? 'date' : 'text'}
                      className="text-black"
                      placeholder={schema.label || schema.name}
                      onChange={(e) => {
                        const value = schema.type === 'number' 
                          ? Number(e.target.value) 
                          : e.target.value;
                        field.onChange(value);
                      }}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
