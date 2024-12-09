import { useEffect, useState } from "react";
import {
    getHotelsByCity,
} from "@/services/HotelApiHandler";
import CardContainer from "@/components/custom/cards/CardContainer";
import GenericFilter from "@/components/custom/GenericFilter";
import { iataCodes } from "@/utilities/iataCodes";

function HotelBooking() {
    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState(false);

    const [activeFilters, setActiveFilters] = useState({
        cityCode: { selected: "CAI" },
    });

    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const formFields = {
        cityCode: {
            type: "select",
            label: "City Code",
            options: (iataCodes).map((city) => city.value),
        },
    };

    const fetchHotels = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await getHotelsByCity(
                activeFilters.cityCode.selected,
                activeFilters.radius
            );

            if (response && Array.isArray(response.data) && response.data.length > 0) {
                response.data.forEach((hotel) => {
                    hotel.name = toTitleCase(hotel.name);
                });
                setHotels(response.data);
            } else {
                setHotels([]); // No data found
                setError(true); // Trigger "No hotels found"
            }
        } catch (error) {
            console.error("Error fetching hotels:", error);
            setHotels([]);
            setError(true); // Trigger "No hotels found" on API failure
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };


    useEffect(() => {
        console.log("Hotels: ", hotels);
    }, [hotels]);

    // Debouncing logic for the API call
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            // Only fetch itineraries after a 1-second delay
            fetchHotels();
        }, 1000); // Adjust debounce time as needed (e.g., 500ms, 1000ms)

        // Clear the timeout if activeFilters changes before the timeout is complete
        // console.log("activeFilters changed", activeFilters);
        return () => clearTimeout(delayDebounceFn);
    }, [activeFilters]); // Dependency on activeFilters

    return (
        <div className="w-full">
            <div className="flex flex-col gap-10">
                <GenericFilter
                    formFields={formFields}
                    activeFilters={activeFilters}
                    setActiveFilters={setActiveFilters}
                />
                {!loading && error ? (
                    <div className="flex justify-center w-full">
                        <p className="text-neutral-400 text-sm italic">No hotels found</p>
                    </div>
                ) : loading ? (
                    <div className="flex justify-center w-full">
                        <p className="text-neutral-400 text-sm italic">Loading...</p>
                    </div>
                ) : (
                    <div className="w-[1000px] -ml-[240px]">
                        <CardContainer
                            cardList={hotels}
                            cardType={"hotel"}
                            fetchCardData={fetchHotels}
                            columns={4}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default HotelBooking;
