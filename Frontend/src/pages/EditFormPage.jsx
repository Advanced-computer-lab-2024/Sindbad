import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import GenericForm from "@/components/custom/genericForm/genericForm";
import { useCurrency } from "@/state management/userInfo";
import { Convert } from "easy-currencies";

function EditFormPage() {
    const location = useLocation();
    const { data } = location.state || {};
    const { cardType, cardId } = useParams();
    const currency = useCurrency();
    
    const [formattedData, setFormattedData] = useState(null);

    // Effect to format data when the page loads
    useEffect(() => {
        async function loadData() {
            const formatted = await formatData(data);
            setFormattedData(formatted);
        }

        if (data) {
            loadData();
        }
    }, [data]); // Re-run when `data` changes

    // The async data formatting function
    async function formatData(data) {
        let formattedData = { ...data };
        if (cardType === "itinerary") {
            // Remove cardImage
            delete formattedData.cardImage;
            // Convert activities to URLs
            formattedData.activities = formattedData.activities.map((activity) => `http://localhost:5173/app/activity/${activity}`);
            // Convert availableDatesTimes to array of dates
            formattedData.availableDatesTimes = formattedData.availableDatesTimes.map((item) => new Date(item.dateTime));
            // Convert price to local currency
            const converter = await Convert().from("USD").fetch();
            const convertedPrice = formattedData.price * converter.rates[currency];
            formattedData.price = convertedPrice;
        }
        return formattedData;
    }

    if (!formattedData) {
        return <div>Loading...</div>; // Show loading state until formattedData is ready
    }

    return (
        <div className="py-8 px-24 max-w-[1200px] mx-auto">
            <div className="flex items-center gap-6 mb-3">
                <h1 className="text-xl font-bold shrink-0">Edit {String(cardType).charAt(0).toUpperCase() + String(cardType).slice(1)}</h1>
                <hr className="border-neutral-300 border w-full mt-1.5" />
            </div>
            <div className="w-2/3 mx-auto">
                <GenericForm type={cardType} id={cardId} data={formattedData} />
            </div>
        </div>
    );
}

export default EditFormPage;
