import { useController } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '@/components/ui/select';
import ReactSelect from '@/components/ui/react-select';

export const SelectField = ({ name, control, label, options = [], defaultValue }) => {
  const { field } = useController({
    control,
    name,
  });
  console.log(options.find((option) => option === defaultValue))
  return (
    <FormItem>
      <FormLabel>{label || name.toUpperCase()}</FormLabel>
      <FormControl>
        {/* <div className="space-y-2">

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
        </div> */}
        <ReactSelect
          options={options.map((option) => ({ label: option, value: option }))}
          onChange={(selectedOption) => field.onChange(selectedOption.value)}
          defaultValue={() =>
            options.find((option) => option === defaultValue)
              ? { label: defaultValue, value: defaultValue }
              : null
          }
          placeholder="Select Currency"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
