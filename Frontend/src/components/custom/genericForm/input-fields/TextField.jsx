import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

export const TextField = ({ name, control, type = 'text', label, description }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label || name.toUpperCase()}</FormLabel>
                    {description && <p className="text-xs text-neutral-500">{description}</p>}
                    <FormControl>
                        <Input
                            {...field}
                            type={type}
                            className={`${type === "time" ? "w-max" : "w-full"} text-dark`}
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
                                } else if (type === 'time') {
                                    field.onChange(e.target.value);
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