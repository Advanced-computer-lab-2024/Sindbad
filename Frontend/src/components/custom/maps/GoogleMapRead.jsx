import { APIProvider, Map } from "@vis.gl/react-google-maps";

import { MapPin } from "lucide-react";

export default function GoogleMapRead({ lat, long, zoom = 13 }) {
	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
	console.log("lat: ", lat, "long: ", long);

	return (
		<APIProvider apiKey={apiKey}>
			<div className="relative w-full h-full">
				<Map
					defaultZoom={zoom}
					defaultCenter={{ lat, long }}
					options={{
						draggable: false, // Prevents dragging
						keyboardShortcuts: false, // Disables keyboard movement
					}}
					className="h-full"
				/>
				{/* Centered MapPin */}
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none">
					<MapPin size={40} color="black" fill="red" />
				</div>
			</div>
		</APIProvider>
	);
}
