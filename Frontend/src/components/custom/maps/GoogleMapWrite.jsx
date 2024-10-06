import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { MapPin } from "lucide-react";
import { useCallback } from "react";

export default function GoogleMapWrite({
	onChange, // Receive onChange function from form
	lat = 30.0444,
	lng = 31.2357,
	zoom = 13,
}) {
	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	// Function to handle the new camera position
	const setPosition = useCallback(
		(center) => {
			const newLocation = { lat: center.lat, lng: center.lng }; // Get new lat/lng from Google Maps
			onChange(newLocation); // Call onChange to update form value
		},
		[onChange]
	);

	console.log("lat: ", lat, "lng: ", lng);

	return (
		<APIProvider apiKey={apiKey}>
			<div className="relative w-full h-[200px]">
				<Map
					defaultZoom={zoom}
					defaultCenter={{ lat, lng }}
					className="h-full"
					onCameraChanged={(ev) => {
						setPosition(ev.detail.center);
					}} // Update position on camera change
				/>

				{/* Centered MapPin */}

				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none">
					<MapPin size={40} color="black" fill="red" />
				</div>
			</div>
		</APIProvider>
	);
}
