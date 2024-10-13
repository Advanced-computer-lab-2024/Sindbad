import { useCallback } from "react";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

import { MapPin } from "lucide-react";

export default function GoogleMapWrite({
	onChange, // Receive onChange function from form
	lat = 30.0444,
	lng = 31.2357, // Change 'long' to 'lng' for consistency with Google Maps API
	zoom = 13,
}) {
	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	// Function to handle the new camera position
	const setPosition = useCallback(
		(center) => {
            onChange(center); // Update the position in the parent component
		},
		[onChange]
	);

	return (
		<APIProvider apiKey={apiKey}>
			<div className="relative w-full h-[200px]">
				<Map
					defaultZoom={zoom}
					defaultCenter={{ lat, lng }} // Use 'lng' instead of 'long'
					className="h-full"
					onCameraChanged={(ev) => {
						setPosition(ev.detail.center); // Update position on camera change
					}}
				/>

				{/* Centered MapPin */}
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none">
					<MapPin size={40} color="black" fill="red" />
				</div>
			</div>
		</APIProvider>
	);
}
