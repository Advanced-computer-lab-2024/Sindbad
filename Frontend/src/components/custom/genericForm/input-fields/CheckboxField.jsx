import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const CheckboxField = ({ name, control, label }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-end my-5">
            <FormControl>
              <input
                type="checkbox"
                className="w-max h-max shadow-none inline mr-2 accent-primary-700 cursor-pointer"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            </FormControl>
            <FormLabel>{label || name.toUpperCase()}</FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};