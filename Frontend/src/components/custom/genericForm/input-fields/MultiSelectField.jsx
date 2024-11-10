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
    console.log(value);
    
    if (!field.value.includes(value)) {
      append(value);
    }
    console.log(field.value);
  };

  const getNameById = (id) => {
    const found = options.find(option => option._id === id);
    return found ? found.name : '';
  };

  return (
    <FormItem>
      <FormLabel>{label || name.toUpperCase()}</FormLabel>
      <FormControl>
        <div className="space-y-2">
          {/* Render Select component */}
          <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-full text-black">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option, idx) => (
                <SelectItem key={idx} value={option._id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Render selected items */}
          <div className="flex flex-wrap gap-2">
            {field.value.map((fieldItem, index) => (
              <div key={fieldItem} className="flex items-center space-x-2 bg-indigo-200 text-xs px-2 py-1 rounded">
                <span>{getNameById(fieldItem)}</span>
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