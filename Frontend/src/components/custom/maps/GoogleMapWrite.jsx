import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { set } from "date-fns";

import { MapPin } from "lucide-react";
import { useCallback } from "react";

export default function GoogleMapWrite({ setPosition, lat, lng, zoom = 13 }) {
	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
	console.log("lat: ", lat, "lng: ", lng);

	return (
		<APIProvider apiKey={apiKey}>
			<div className="relative w-full h-full">
				<Map
					defaultZoom={zoom}
					defaultCenter={{ lat, lng }}
					className="h-full"
					onCameraChanged={(ev) =>
                        setPosition(ev.detail.center)
					}
				>
					>
				</Map>
				{/* Centered MapPin */}
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none">
					<MapPin size={40} color="black" fill="red" />
				</div>
			</div>
		</APIProvider>
	);
}
