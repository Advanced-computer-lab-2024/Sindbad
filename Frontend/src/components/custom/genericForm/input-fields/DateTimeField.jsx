import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export const DateTimeField = ({ name, control, label, description }) => {
    return (
        <div className="space-y-4 w-full">
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label || name}</FormLabel>
                        {description && <p className="text-xs text-neutral-500">{description}</p>}
                        <FormControl>
                            <div className="flex gap-4">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={`w-[220px] justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                        >
                                            <CalendarIcon />
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={(field.value)}
                                            onSelect={(date) => field.onChange(date)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <Input
                                    type="time"
                                    className="w-max"
                                    onChange={(e) => {
                                        const [hours, minutes] = e.target.value.split(":");
                                        const updatedDate = new Date(field.value || new Date()); // Use field.value if present
                                        updatedDate.setHours(hours, minutes, 0, 0); // Update only the time
                                        field.onChange(updatedDate); // Save back the updated Date object
                                    }}
                                    value={field.value ? format(field.value, "HH:mm") : ""} // Format for time input
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};