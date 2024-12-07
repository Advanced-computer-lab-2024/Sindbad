import { useLocation } from "react-router-dom";
import GenericForm from "@/components/custom/genericForm/genericForm";
import { useUser } from "@/state management/userInfo";

function FlightView() {
    const location = useLocation();
    const { data } = location.state || {};
    const { id } = useUser();

    return (
        <div className="py-8 px-24 max-w-[1200px] mx-auto">
            <div className="flex items-center gap-6">
                {console.log(data)}
                <h1 className="text-3xl font-extrabold shrink-0">
                    {"Aircraft " +
                        data.itineraries[0].segments[0].aircraft.code +
                        " Flight " +
                        data.itineraries[0].segments[0].number}
                </h1>
                <hr className="border-neutral-300 border w-full mt-1.5" />
            </div>
            <div className="w-2/3 mx-auto">
                <div className="flex flex-col mt-6">
                    <h1 className="text-xl font-bold shrink-0">Book the flight: </h1>
                    <h2 className="text mb-8">
                        {"Departure from " + data.itineraries[0].segments[0].departure.iataCode +
                            " terminal " + data.itineraries[0].segments[0].departure.terminal +
                            " at " + data.itineraries[0].segments[0].departure.at +
                            ", arrival at " + data.itineraries[0].segments[0].arrival.iataCode +
                            " terminal " + data.itineraries[0].segments[0].arrival.terminal +
                            " at " + data.itineraries[0].segments[0].arrival.at}
                    </h2>
                    <GenericForm
                        type="flightBooking"
                        data={data}
                        id={id}
                    />
                </div>
            </div>
        </div>
    );
}

export default FlightView;