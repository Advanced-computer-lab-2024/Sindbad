import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const FileUpload = ({ name, control, type = 'file', label }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label || name.toUpperCase()}
                    </FormLabel>
                    <FormControl>
                        <Input
                            type={type}
                            onChange={(e) => {
                                const files = e.target.files;
                                field.onChange(files); // Pass the FileList to the form state
                            }}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    );
};
