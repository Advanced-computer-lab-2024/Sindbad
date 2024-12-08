import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GoogleMapRead from "@/components/custom/maps/GoogleMapRead";
import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import { useToast } from "@/hooks/use-toast";
import { useUser, useCurrency } from "@/state management/userInfo";
import { Convert } from "easy-currencies";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MapPin, CalendarDays, AlarmClock, ArrowRight } from "lucide-react";
import { getTrip, bookTrip } from "@/services/TripApiHandler";
import { getAdvertiser } from "@/services/AdvertiserApiHandler";
import { useNavigate } from "react-router-dom";
import { usePromoCode } from "@/services/PromoCodeApiHandler";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SpinnerSVG from "@/SVGs/Spinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";



function handleTripValues(trip) {
  if (!trip.description) {
    trip.description =
      "With the history going back to 420 B.C., this tour includes sights throughout history. From the local alley drug dealer to the Queen's castle";
  }
}

function Trip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [creator, setCreator] = useState(null);
  const [error, setError] = useState(false);
  const [convertedPrice, setConvertedPrice] = useState(null);
  const currency = useCurrency();
  const { id, role } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("cash");


  const getTripById = async () => {
    let response = await getTrip(tripId);

    if (response.error) {
      console.error(response.message);
      setError(true);
    } else {
      handleTripValues(response);
      setTrip(response);
      setError(false);
    }
  };

  const getCreator = async () => {
    let response = await getAdvertiser(trip.creatorId);
    if (response.error) {
      console.error(response.message);
    } else {
      setCreator(response);
    }
  };

  useEffect(() => {
    getTripById();
  }, []);

  useEffect(() => {
    if (trip && trip.creatorId) {
      getCreator();
    }
  }, [trip]);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const convert = await Convert().from("USD").fetch();

        if (trip.price) {
          const price = await convert.amount(trip.price).to(currency);
          setConvertedPrice(price);
        }
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
        setConvertedPrice(null); // Reset on error
      }
    };

    if (trip) {
      fetchConversionRate();
    }
  }, [currency, trip]);

  const handlePromoCodeApply = () => {
    if (!promoCode || promoCode.trim() === "") {
        toast({ description: "Please enter a promo code." });
        return;
    }

    // Handle the async logic
    const applyPromoCode = async () => {
        try {
            if(role !== "tourist") {
                toast({ description: "You must be a tourist to apply a promo code." });
                return;
            }
            const result = await usePromoCode(id, promoCode); // Use the promo code here
            setLoading(false); // Reset loading state

            if (result.discount) {
                setDiscount(result.discount); // Set discount if the result contains it
                setApplied(true); // Mark promo code as applied
                toast({
                    description: `Promo code applied! You got a ${result.discount}% discount.`,
                });
                setLoading(false); // Reset loading state
            } else {
                toast({ description: result.message || "Incorrect Promo Code." });
                setLoading(false); // Reset loading state
            }
        } catch (error) {
            toast({
                description: error.message || "An unexpected error occurred.",
            });
            setLoading(false); // Reset loading state
        } 
    };

    applyPromoCode(); // Call the async function to apply the promo code
};

const renderPromoCodeSection = () => (
  <div className="flex items-center gap-2 w-full">
    <div className="py-2 w-full">
      <div className="flex w-full">
        <Label className="text-sm pb-1" htmlFor="code">
          Enter Promocode
        </Label>
      </div>
      <Input
        type="text"
        id="code"
        placeholder="Enter code.."
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value.trim())}
        className=""
        disabled={applied}
      />
    </div>
    <Button
      className="flex items-center justify-center mt-6 h-[28px] py-0 w-[65px]"
      onClick={() => handlePromoCodeApply()}
      disabled={loading || applied}
    >
      {loading ? <SpinnerSVG size={20} /> : "Apply"}
    </Button>
  </div>
);

  if (!trip) {
    return (
      <div className="py-8 px-24 max-w-[1200px] flex gap-9 mx-auto">
        <div className="flex justify-center w-full">
          <p className="text-neutral-400 text-sm italic">
            {error === true ? "Transportation offer does not exist." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  const handleBooking = async () => {
    // Check if the user is a tourist
    if (role !== "tourist") {
      toast({ description: "You must be a tourist to book transportation" });
      return; // Exit the function if not a tourist
    }
    const response = await bookTrip(id, tripId, discount, type);
    if (response.error) {
      console.error(response.error);
      toast({ description: "An error occurred, please try again later" });
    } else {
      toast({ description: "Successfully booked transportation" });
    }
  };

  return (
    <div className="py-8 px-12 sm:px-24 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-6">
        <h1 className="text-3xl font-extrabold shrink-0">{trip.name}</h1>
        <hr className="border-neutral-300 border w-full mt-1.5" />
      </div>

      <div className="flex justify-between gap-12 lg:gap-32 py-6">
        <div className="flex flex-col gap-6 w-full">
          <div>
            <p className="text-base font-medium text-gray-700">
              Offered by{" "}
              <a
                className="hover:underline text-primary-950 cursor-pointer"
                onClick={() => navigate(`/app/profile/${creator?._id}`)}
              >
                {creator?.username}
              </a>
            </p>
          </div>

          <p className="text-sm text-gray-600">{trip.description}</p>

          <div>
            <h2 className="text-lg font-semibold mb-2">Date & Time</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <CalendarDays size={16} className="shrink-0" />
                <span className="text-sm text-gray-600">
                  {new Date(trip.dateTime).toDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <AlarmClock size={16} className="shrink-0" />
                <span className="text-sm text-gray-600">
                  {new Date(trip.dateTime).toTimeString().split(" ")[0]}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-6 lg:gap-8">
            <div className="w-full lg:w-1/2">
              <h2 className="text-lg font-semibold mb-2">Pickup Location</h2>
              <div className="flex flex-col gap-2">
                <div className="bg-light h-[250px] rounded-md overflow-clip">
                  <GoogleMapRead
                    lat={trip.pickupLocation.coordinates.lat}
                    lng={trip.pickupLocation.coordinates.lng}
                  />
                </div>
                <div className="flex items-start gap-1">
                  <MapPin size={16} className="shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    {trip.pickupLocation.address}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <h2 className="text-lg font-semibold mb-2">DropOff Location</h2>
              <div className="flex flex-col gap-2">
                <div className="bg-light h-[250px] rounded-md overflow-clip">
                  <GoogleMapRead
                    lat={trip.dropoffLocation.coordinates.lat}
                    lng={trip.dropoffLocation.coordinates.lng}
                  />
                </div>
                <div className="flex items-start gap-1">
                  <MapPin size={16} className="shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    {trip.dropoffLocation.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6">
          <div className="h-[400px] w-[400px]">
            <Carousel>
              <CarouselContent>
                {trip.cardImage && trip.cardImage.url ? (
                  <CarouselItem className="h-[400px] w-[400px]">
                    <img
                      src={trip.cardImage.url}
                      alt={`${trip.name}`}
                      className="h-full w-full object-cover rounded-md border border-neutral-300"
                    />
                  </CarouselItem>
                ) : (
                  <CarouselItem className="h-[400px]">
                    <ImagePlaceholder />
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="text-end">
            <div className="w-full flex justify-between items-center mb-3 mt-2">
              <p className="text-sm font-medium">Payment method</p>
              <Tabs defaultValue="cash" className="">
                <TabsList>
                  <TabsTrigger value="cash" onClick={() => setType("cash")}>Cash</TabsTrigger>
                  <TabsTrigger value="wallet" onClick={() => setType("wallet")}>Wallet</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            {renderPromoCodeSection()}
            <p className="text-3xl font-semibold text-primary-950">
              {convertedPrice && (convertedPrice.toFixed(2) - (convertedPrice.toFixed(2) * discount / 100)).toFixed(2)}
              <span className="text-xl font-medium text-gray-700"> {currency}</span>
            </p>

            {trip.discounts && trip.discounts > 0 && (
              <p className="text-sm text-gray-600">
                <span className="text-primary-950 font-semibold">
                  {trip.discounts}%
                </span>{" "}
                discount available only on Sindbad
              </p>
            )}

            <hr className="border-neutral-300 border w-full my-4" />

            <div>
              {
                <div className="items-center flex flex-col gap-1">
                  <Button onClick={handleBooking} className="w-full">
                    Book trip
                    <ArrowRight className="inline-block ml-1" size={12} />
                  </Button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Trip;
