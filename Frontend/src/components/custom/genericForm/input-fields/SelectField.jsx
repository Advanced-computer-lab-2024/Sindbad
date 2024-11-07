import { useController } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '@/components/ui/select';

export const SelectField = ({ name, control, label, options = [] }) => {
  const { field } = useController({
    control,
    name,
  });

  return (
    <FormItem>
      <FormLabel>{label || name.toUpperCase()}</FormLabel>
      <FormControl>
        <div className="space-y-2">
          {/* Render Select component for single selection */}
          <Select onValueChange={(value) => field.onChange(value)}>
            <SelectTrigger className="w-full text-black">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option, idx) => (
                <SelectItem key={idx} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
