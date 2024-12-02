import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const FileUpload = ({ name, control, type = 'file', label, description }) => {
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
                        <Input
                            type={type}
                            accept=".png, .jpg, .jpeg"
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
