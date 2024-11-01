import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

export const TextField = ({ name, control, type = 'text', label }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label || name.toUpperCase()}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              className="text-black"
              onChange={(e) => {
                if (type === 'date') {
                  const formattedDate = format(
                    new Date(e.target.value),
                    'yyyy-MM-dd'
                  );
                  field.onChange(formattedDate);
                } else if (type === 'number') {
                  field.onChange(Number(e.target.value));
                } else {
                  field.onChange(e.target.value);
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};