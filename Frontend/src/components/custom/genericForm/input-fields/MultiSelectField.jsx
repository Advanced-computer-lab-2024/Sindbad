import { useController, useFieldArray } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue} from '@/components/ui/select';
import { X } from 'lucide-react';

export const MultiSelectField = ({ name, control, label, options = [] }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const { field } = useController({
    control,
    name,
  });

  // Helper function to add unique items
  const handleSelect = (value) => {
    if (!field.value.includes(value)) {
      append(value);
    }
  };

  return (
    <FormItem>
      <FormLabel>{label || name.toUpperCase()}</FormLabel>
      <FormControl>
        <div className="space-y-2">
          {/* Render Select component */}
          <Select onValueChange={handleSelect}>
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

          {/* Render selected items */}
          <div className="flex flex-wrap gap-2">
            {fields.map((fieldItem, index) => (
              <div key={fieldItem.id} className="flex items-center space-x-2 bg-gray-200 px-2 py-1 rounded">
                <span>{fieldItem.value}</span>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};