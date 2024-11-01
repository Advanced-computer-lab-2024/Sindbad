import { useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const ArrayField = ({ name, control, initialValue, label }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-4">
      <FormLabel>{label || name}</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-4">
          <FormField
            control={control}
            name={`${name}.${index}`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type={initialValue === 'number' ? 'number' : 'text'}
                    className="text-black"
                    placeholder={`Item ${index + 1}`}
                    onChange={(e) => {
                      const value = initialValue === 'number' 
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
        onClick={() => append(initialValue === 'number' ? 1 : 'string')}
        className="bg-blue-500 text-white"
      >
        Add Item
      </Button>
    </div>
  );
};