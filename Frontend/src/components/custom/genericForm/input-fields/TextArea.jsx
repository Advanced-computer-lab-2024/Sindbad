import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

export const TextArea = ({ name, control, type ='textArea', label}) => {
    return(
        <FormField
            control = {control} 
            name = {name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>
                        {label || name.toUpperCase()}
                    </FormLabel>
                    <FormControl>
                    <Textarea
                    {...field}
                    
                    />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}