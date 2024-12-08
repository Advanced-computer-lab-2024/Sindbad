import { useState, useEffect } from "react";
import CardContainer from "@/components/custom/cards/CardContainer";
import { getAllTrips, getMyTrips } from "@/services/TripApiHandler";
import { Plus } from "lucide-react";
import GenericForm from "@/components/custom/genericForm/genericForm";
import { useUser } from "@/state management/userInfo";
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/components/ui/dialog";

function Trips() {
  // State for trips data, loading, and error
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id, role } = useUser();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        let response;
        if (role === "advertiser") {
          response = await getMyTrips(id);
          console.log(response);
        } else {
          response = await getAllTrips();
        }
        setTrips(response);
      } catch (err) {
        setError("Failed to load trips.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [id, role]);

  // Toggle the form visibility when the button is clicked
  // const toggleForm = () => {
  //   setShowForm((prevState) => !prevState);
  // };

  return (
    <div className="py-8 px-24 max-w-[1200px] flex flex-col gap-4 mx-auto">
      <div className="flex items-center gap-6 mb-6">
        <h1 className="text-3xl font-extrabold">Transportation</h1>
        <hr className="border-neutral-300 border w-full mt-1.5" />
      </div>

      <div className="flex gap-10">
        {!loading && error ? (
          <div className="flex justify-center w-full">
            <p className="text-neutral-400 text-sm italic">{error}</p>
          </div>
        ) : !loading ? (
          <CardContainer
            cardList={trips} // Pass trips data here
            cardType={"transportation"} // Specify card type
            fetchCardData={() => { }} // No need to refetch
            columns={4}
          />
        ) : (
          <div className="flex col-span-3 mx-auto">
            <p className="text-neutral-400 text-sm italic">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Trips;
