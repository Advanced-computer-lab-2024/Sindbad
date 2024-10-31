import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import GoogleMapWrite from '@/components/custom/maps/GoogleMapWrite';

export const CoordinatesField = ({ name, control, label }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label || name.toUpperCase()}</FormLabel>
          <FormControl>
            <GoogleMapWrite
              lat={field.value.lat}
              lng={field.value.lng}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
