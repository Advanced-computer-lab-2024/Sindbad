import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const CheckboxField = ({ name, control, label }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label || name.toUpperCase()}</FormLabel>
          <FormControl>
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};