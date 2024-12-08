import { createTrip, updateTrip } from "@/services/TripApiHandler";
import { Convert } from "easy-currencies";

export const tripSubmit = async (values, id, data, navigate, dispatch, currency, toast, setLoading) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("dateTime", values.dateTime);
    formData.append("pickupLocation", JSON.stringify(values.pickupLocation));
    formData.append("dropoffLocation", JSON.stringify(values.dropoffLocation));
    // convert price to USD
    const converter = await Convert().from("USD").fetch();
    const convertedPrice = values.price / converter.rates[currency];
    formData.append("price", convertedPrice);
    formData.append("capacity", values.capacity);

    if (values.cardImage && values.cardImage.length > 0) {
        formData.append("cardImage", values.cardImage[0]);
    }

    for (var pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }

    // try submitting form, and if successful, navigate to profile page
    try {
        let response;
        let desc;
        if (data) {
            response = await updateTrip(data._id, formData);
            desc = "Trip updated successfully";
        } else {
            formData.append("creatorId", id);
            response = await createTrip(formData);
            desc = "Trip created successfully";
        }

        if (response && !response.error && navigate) {
            navigate("/app/profile");
            toast({description: desc});
            setLoading(false);
        } else {
            throw new Error("API did not return a success response");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        toast({description: "Error submitting form"});
        setLoading(false);
    }
};
