import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GoogleMapRead from "@/components/custom/maps/GoogleMapRead";
import StarRating from "@/components/custom/StarRating";
import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import RatingComment from "@/components/custom/RatingComment";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MapPin, CalendarDays, AlarmClock, ArrowRight } from "lucide-react";
import {
  getActivityById,
  bookActivity,
  addActivityComment,
  addActivityRating,
  cancelBooking,
} from "@/services/ActivityApiHandler";
import { getAdvertiser } from "@/services/AdvertiserApiHandler";
import { useUser, useCurrency } from "@/state management/userInfo";
import { Convert } from "easy-currencies";
import { useNavigate } from "react-router-dom";
import {
  checkoutWithWallet,
  checkoutWithStripe,
} from "@/services/TouristApiHandler";
import { Input } from "@/components/ui/input";
import { usePromoCode } from "@/services/PromocodeApiHandler";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import SpinnerSVG from "@/SVGs/Spinner";

function handleActivityValues(activity) {
  if (!activity.description) {
    activity.description =
      "With the history going back to 420 B.C., this tour includes sights throughout history. From the local alley drug dealer to the Queen's castle";
  }

  if (!activity.tags) {
    activity.tags = [{ name: "N/A" }];
  }

  if (!activity.category) {
    activity.category = { name: "N/A" };
  }

  if (typeof activity.location === "string") {
    activity.location = {
      address: activity.location,
      coordinates: { lat: 0, lng: 0 },
    };
  }
}

function Activity() {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(null);
  const [creator, setCreator] = useState(null);
  const [totalRatings, setTotalRatings] = useState(0);
  const [error, setError] = useState(false);
  const { id, role } = useUser();
  const { toast } = useToast();
  const currency = useCurrency();
  const [convertedPrice, setConvertedPrice] = useState(null);
  const navigate = useNavigate();
  const [currentPaymentType, setCurrentPaymentType] = useState("stripe");
  const [stripeID, setStripeID] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const getActivity = async () => {
    let response = await getActivityById(activityId);

    if (response.error) {
      console.error(response.message);
      setError(true);
    } else {
      handleActivityValues(response);
      setActivity(response);
      setTotalRatings(
        Object.values(response.rating).reduce((acc, cur) => acc + cur, 0)
      );
      setError(false);
    }
  };

  const getCreator = async () => {
    let response = await getAdvertiser(activity.creatorId);

    if (response.error) {
      console.error(response.message);
    } else {
      setCreator(response);
    }
  };

  const handlePromoCodeApply = async () => {
    setLoading(true);

    if (role !== "tourist") {
      toast({ description: "You must be a tourist to apply a promo code." });
      setLoading(false);
      return;
    }

    if (!promoCode || promoCode.trim() === "") {
      toast({ description: "Please enter a promo code." });
      setLoading(false);
      return;
    }

    const applyPromoCode = async () => {
      try {
        const result = await usePromoCode(id, promoCode);

        if (result.discount) {
          setDiscount(result.discount);
          setApplied(true);
          setStripeID(result.stripeID);
          toast({
            description: `Promo code applied! You got a ${result.discount}% discount.`,
          });
        } else {
          toast({ description: result.message || "Incorrect Promo Code." });
        }
      } catch (error) {
        toast({
          description: error.message || "An unexpected error occurred.",
        });
      } finally {
        setLoading(false);
      }
    };

    applyPromoCode();
  };

  useEffect(() => {
    getActivity();
  }, []);

  useEffect(() => {
    if (activity) {
      getCreator();
    }
  }, [activity]);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const convert = await Convert().from("USD").fetch();

        if (activity.price && activity.price.min && activity.price.max) {
          const rateMin = await convert.amount(activity.price.min).to(currency);
          const rateMax = await convert.amount(activity.price.max).to(currency);
          setConvertedPrice({ min: rateMin, max: rateMax });
        } else if (activity.price) {
          const rate = await convert.amount(activity.price).to(currency);
          setConvertedPrice(rate);
        }
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
        setConvertedPrice(null); // Reset on error
      }
    };

    if (activity) {
      fetchConversionRate();
    }
  }, [currency, activity]);

  useEffect(() => {
    const baseCost = convertedPrice ? convertedPrice : activity?.price; // Use converted price if available
    const discountedCost =
      discount > 0 ? baseCost * (1 - discount / 100) : baseCost; // Apply discount if any
    setTotalCost(discountedCost?.toFixed(2)); // Update total cost
  }, [convertedPrice, discount, activity?.price]);

  if (!activity) {
    return (
      <div className="py-8 px-24 max-w-[1200px] flex gap-9 mx-auto">
        <div className="flex justify-center w-full">
          <p className="text-neutral-400 text-sm italic">
            {error === true ? "Activity does not exist." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  const handleBooking = async () => {
    setLoading(true);
    if (role !== "tourist") {
      toast({ description: "You must be a tourist to book an activity." });
      return;
    }
    if (currentPaymentType === "wallet") {
      await payWithWallet();
    } else {
      await payWithStripe();
    }
    setLoading(false);
  };

  const payWithWallet = async () => {
    try {
      const response = await checkoutWithWallet(id, activity, discount, "activity");
      if (!response.error) {
        toast({ description: "Payment successful!" });
        navigate("/checkout/success");
      }
      else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error paying with wallet:", error);
      toast({ description: "An error occurred, please try again later." });
    }
  };

  const payWithStripe = async () => {
    checkoutWithStripe(id, activity, stripeID, "activity");
  };

  const handleCancelBooking = async () => {
    const response = await cancelBooking(activityId, id);
    if (response.error) {
      console.error(response.error);
      toast({ description: "An error occurred, please try again later" });
    } else {
      toast({ description: "Successfully cancelled booking" });
    }
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

  return (
    <div className="py-8 px-24 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-6">
        <h1 className="text-3xl font-extrabold shrink-0">{activity.name}</h1>
        <hr className="border-neutral-300 border w-full mt-1.5" />
      </div>
      <div className="flex justify-between gap-32 py-6">
        <div className="flex flex-col gap-6 w-full">
          <div>
            <p className="text-base font-medium">
              Offered by{" "}
              <a
                className="hover:underline cursor-pointer"
                onClick={() => navigate(`/app/profile/${creator?._id}`)}
              >
                {creator?.username}
              </a>
            </p>

            {/*Star Section */}
            <div className="mt-1">
              <StarRating rating={activity.averageRating} size={20} />
            </div>
          </div>

          {/*description and category*/}
          <div className="text-sm flex flex-col gap-2">
            <p>{activity.description}</p>
            <p><span className="font-semibold">Category: </span>{activity.category.name}</p>
          </div>

          {/*Tags*/}
          <div>
            <h2 className="text-lg font-semibold mb-1">Tagged As</h2>
            <div className="flex flex-wrap gap-2 text-sm text-light">
              {activity.tags.map((tag) => (
                <div
                  key={tag._id}
                  className="flex gap-1 text-xs items-center bg-gradient-to-br from-primary-600 to-primary-800 px-3 py-1.5 rounded-full"
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1">Date & Time</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-1">
                <CalendarDays size={16} className="shrink-0" />
                <span className="text-sm">
                  {new Date(activity.dateTime).toDateString()}
                </span>
              </div>
              <div className="flex items-start gap-1">
                <AlarmClock size={16} className="shrink-0" />
                <span className="text-sm">
                  {new Date(activity.dateTime).toTimeString()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1">Location</h2>
            <div className="flex flex-col gap-2">
              <div className="bg-light h-[250px] rounded-md overflow-clip">
                <GoogleMapRead
                  lat={activity.location.coordinates.lat}
                  lng={activity.location.coordinates.lng}
                />
              </div>
              <div className="flex items-start gap-1">
                <MapPin size={16} className="shrink-0" />
                <span className="text-sm">{activity.location.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/*right section*/}
        <div className="flex flex-col gap-6">
          <div className="h-[400px] w-[400px] shrink-0">
            <Carousel>
              <CarouselContent>
                {activity.cardImage && activity.cardImage.url ? (
                  <CarouselItem className="h-[400px] w-[400px]">
                    <img
                      src={activity.cardImage.url}
                      alt={`${activity.name}`}
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
            {typeof activity.price === "object" ? (
              <p className="text-3xl font-semibold ">
                {convertedPrice?.min
                  ? convertedPrice.min.toFixed(2)
                  : activity.price.min}
                <span className="text-xl font-medium"> {currency}</span>
                <span className=" p-2">-</span>
                {convertedPrice?.max
                  ? (convertedPrice?.max).toFixed(2)
                  : activity.price.max}
                <span className="text-xl font-medium"> {currency}</span>
              </p>
            ) : (
              // If it's a single price (number)
              <p className="text-3xl font-semibold">
                {totalCost}
                <span className="text-xl font-medium"> {currency}</span>
              </p>
            )}

            {activity.discounts > 0 && (
              <p className="text-sm">
                <span className="text-primary-950 font-semibold">
                  {activity.discounts}%
                </span>{" "}
                discount available only on Sindbad
              </p>
            )}

            <hr className="border-neutral-300 border w-full my-4" />
            {renderPromoCodeSection()}

            <div className="w-full flex justify-between items-center mb-3 mt-2">
              <p className="text-sm font-medium">Payment method</p>
              <Tabs defaultValue="stripe" className="">
                <TabsList>
                  <TabsTrigger value="stripe" onClick={() => setCurrentPaymentType("stripe")}>Credit</TabsTrigger>
                  <TabsTrigger value="wallet" onClick={() => setCurrentPaymentType("wallet")}>Wallet</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="">
              {activity.isBookingOpen ? (
                <div className="items-center flex flex-col gap-1">
                  <div className="flex gap-2 w-full">
                    <Button onClick={handleBooking} className="w-full">
                      Book activity
                      <ArrowRight className="inline-block ml-1" size={12} />
                    </Button>
                    {/* Cancel Booking Button */}
                    <Button onClick={handleCancelBooking} className="bg-neutral-300 text-dark w-max">
                      Cancel booking
                    </Button>
                  </div>
                  {activity.headCount > 0 && (
                    <p className="text-xs text-neutral-500 mt-2">
                      {activity.headCount} Sindbad user{activity.headCount > 1 && "s"} ha{activity.headCount > 1 ? "ve" : "s"} already registered
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-neutral-400 text-center text-sm italic">
                  Bookings are closed
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-neutral-300 border w-full mt-1.5" />
      <RatingComment
        data={activity}
        totalRatings={totalRatings}
        fetchData={getActivity}
        addComment={addActivityComment}
        addRating={addActivityRating}
        type="activity"
      />
    </div>
  );
}
export default Activity;
