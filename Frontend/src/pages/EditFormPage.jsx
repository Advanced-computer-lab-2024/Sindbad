import { useLocation, useParams } from "react-router-dom";
import GenericForm from "@/components/custom/genericForm/genericForm";

function EditFormPage() {
    const location = useLocation();
    const { data } = location.state || {};
    const { cardType, cardId } = useParams();
    
    function formatData(data) {
        let formattedData = { ...data };
        if(cardType === "itinerary") {
            //remove cardImage
            delete formattedData.cardImage;
            // convert activities to URLs
            formattedData.activities = formattedData.activities.map((activity) => `http://localhost:5173/app/activity/${activity}`);
            // convert availableDatesTimes to array of dates
            formattedData.availableDatesTimes = formattedData.availableDatesTimes.map((item) => new Date(item.dateTime));
        }
        return formattedData;
    }

    return (
        <div className="py-8 px-24 max-w-[1200px] mx-auto">
            <div className="flex items-center gap-6 mb-3">
                <h1 className="text-xl font-bold shrink-0">Edit {String(cardType).charAt(0).toUpperCase() + String(cardType).slice(1)}</h1>
                <hr className="border-neutral-300 border w-full mt-1.5" />
            </div>
            <div className="w-2/3 mx-auto">
                <GenericForm type={cardType} id={cardId} data={formatData(data)} />
            </div>
        </div>
    );
}

export default EditFormPage;