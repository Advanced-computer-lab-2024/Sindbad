import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import GoogleMapWrite from '@/components/custom/maps/GoogleMapWrite';

export const CoordinatesField = ({ name, control, label, latitude, longitude }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label || name.toUpperCase()}</FormLabel>
          <FormControl>
            {/* //HACK: Eh el araf da */}
            <GoogleMapWrite
              lat={control._defaultValues.location.coordinates.lat}
              lng={control._defaultValues.location.coordinates.lng}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
