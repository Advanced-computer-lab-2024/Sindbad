import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

export const TextArea = ({ name, control, type = 'textArea', label, description }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label || name.toUpperCase()}
                    </FormLabel>
                    {description && <p className="text-xs text-neutral-500">{description}</p>}
                    <FormControl>
                        <Textarea
                            {...field}

                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}