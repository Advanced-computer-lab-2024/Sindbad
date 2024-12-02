import { useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export const ArrayField = ({ name, control, initialValue, label, description }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return (
        <div className="space-y-4 w-full">
            <div className="flex justify-between">
                <div>
                    <FormLabel>{label || name}</FormLabel>
                    {description && <p className="text-xs text-neutral-500">{description}</p>}
                </div>
                <Button
                    type="button"
                    onClick={() => append(initialValue === "number" ? 1 : initialValue === "date" ? new Date() : "string")}
                    className="w-max py-1.5 h-max self-start"
                >
                    Add Item
                </Button>
            </div>
            {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-center">
                    <FormField
                        control={control}
                        name={`${name}.${index}`}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    {initialValue === "date" ?
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={`w-[280px] justify-start text-left font-normal ${(!field.value || field.value === "string") && "text-muted-foreground"}`}
                                                >
                                                    <CalendarIcon />
                                                    {field.value && field.value !== "string" ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={(date) => field.onChange(date)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        :
                                        <Input
                                            {...field}
                                            type={initialValue === "number" ? "number" : "text"}
                                            placeholder={`Item ${index + 1}`}
                                            onChange={(e) => {
                                                const value = initialValue === "number"
                                                    ? Number(e.target.value)
                                                    : e.target.value;
                                                field.onChange(value);
                                            }}
                                            value={field.value}
                                        />
                                    }
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-red-500 text-white w-[94px] py-1.5 h-max justify-center"
                    >
                        Remove
                    </Button>
                </div>
            ))}
        </div>
    );
};