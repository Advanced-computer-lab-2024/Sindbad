import { useState, useEffect } from "react";
import CardContainer from "@/components/custom/cards/CardContainer";
import { getAllTrips } from "@/services/TripApiHandler";

function Trips() {
  const [trips, setTrips] = useState([]); // State for trips data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state if fetching fails

  // Fetch all trips when the component mounts
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await getAllTrips();
        setTrips(response); // Set trips data
      } catch (err) {
        setError("Failed to load trips.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="py-8 px-24 max-w-[1200px] flex flex-col gap-4 mx-auto">
      <div className="flex items-center gap-6 mb-6">
        <h1 className="text-3xl font-extrabold">Trips</h1>
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
            cardType={"trip"} // Specify card type
            fetchCardData={() => {}} // No need to refetch
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
