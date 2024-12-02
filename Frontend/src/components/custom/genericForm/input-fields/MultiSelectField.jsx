import { useController } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ReactSelect from '@/components/ui/react-select';

export const MultiSelectField = ({ name, control, label, options = [], defaultValue = [], description }) => {
    const { field } = useController({
        control,
        name,
    });

    return (
        <FormItem>
            <FormLabel>{label || name.toUpperCase()}</FormLabel>
            {description && <p className="text-xs text-neutral-500">{description}</p>}
            <FormControl>
                <div>
                    <ReactSelect
                        multi={true}
                        options={options.map((option) => ({ label: option, value: option }))}
                        onChange={(selectedOptions) => {
                            field.onChange(
                                (Array.isArray(selectedOptions) ? selectedOptions : []).map(
                                    (selectedOption) => selectedOption.value
                                )
                            )
                        }
                        }
                        defaultValue={defaultValue
                            .filter((value) => options.includes(value))
                            .map((value) => ({ label: value, value }))}
                        placeholder="Select Options"
                    />
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};
