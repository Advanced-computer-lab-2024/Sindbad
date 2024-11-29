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
              className="w-[300px]"
              onChange={(e) => {
                if (type === 'date') {
                  console.log("Date input detected");
                  const rawValue = e.target.value;
                  console.log("Raw Date Value:", rawValue);
                  const formattedDate = format(
                    new Date(rawValue),
                    'yyyy-MM-dd'
                  );
                  console.log("Formatted Date:", formattedDate);
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