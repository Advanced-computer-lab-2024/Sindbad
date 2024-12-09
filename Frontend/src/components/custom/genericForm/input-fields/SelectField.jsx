import { useController } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ReactSelect from '@/components/ui/react-select';

export const SelectField = ({ name, control, label, options = [], defaultValue, description }) => {
    const { field } = useController({
        control,
        name,
    });
    return (
        <FormItem>
            <FormLabel>{label || name.toUpperCase()}</FormLabel>
            {description && <p className="text-xs text-neutral-500">{description}</p>}
            <FormControl>
                <div className="">
                    <ReactSelect
                        options={options.map((option) => ({ label: option, value: option }))}
                        onChange={(selectedOption) => field.onChange(selectedOption.value)}
                        defaultValue={() =>
                            options.find((option) => option === defaultValue)
                                ? { value: defaultValue, label: defaultValue }
                                : null
                        }
                        placeholder="Select Currency"
                    />
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};
