
import {
	APIProvider,
	Map,
	AdvancedMarker,
	MapCameraChangedEvent,
	Pin,
} from "@vis.gl/react-google-maps";

export default function GoogleMap({lat, lng, zoom = 13}) {
    const apiKey = import.meta.env.GOOGLE_MAPS_API_KEY;
    return (
			<APIProvider
				apiKey={apiKey}
				onLoad={() => console.log("Maps API has loaded.")}
			>
				<Map
					defaultZoom={zoom}
					defaultCenter={{ lat, lng }}
					onCameraChanged={(ev) =>
						console.log(
							"camera changed:",
							ev.detail.center,
							"zoom:",
							ev.detail.zoom
						)
					}
				>
					<AdvancedMarker
						key={`marker-${lat}-${lng}`} // Unique key for the marker
						position={{ lat, lng }} // Position of the pin
						// Optional: Customize the appearance of the pin
						icon={
							<Pin
								size={30} // Size of the pin
								color="blue" // Color of the pin
							/>
						}
						// Optional: Add click event on marker
						onClick={() => console.log("Marker clicked!")}
					/>
				</Map>
			</APIProvider>
		);
}

