import GenericForm from "../genericForm/genericForm";
import CardContainer from "@/components/custom/cards/CardContainer";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { useUser } from "@/state management/userInfo";
import { getActivityById } from "@/services/ActivityApiHandler";
import { getItineraryById } from "@/services/ItineraryApiHandler";
import { itinerary } from "../genericForm/rendered-fields/itineraryFields";
import { useNavigate } from "react-router-dom";
import { getMyTrips } from "@/services/TripApiHandler";

function Timeline({
  userData,
  profileId,
  id,
  profileRole,
  cardData,
  fetchCardData,
}) {
  const { role } = useUser();
  const navigate = useNavigate();
  const [bookmarkedActivities, setBookmarkedActivities] = useState([]);
  const [upcomingActivities, setUpcomingActivites] = useState([]);
  const [upcomingItineraries, setUpcomingItineraries] = useState([]);
  const [pastActivities, setPastActivities] = useState([]);
  const [pastItineraries, setPastItineraries] = useState([]);
  const [transportation, setTransportation] = useState([]);

  const rejectable = () =>
    profileRole === "tourGuide" ||
    profileRole === "seller" ||
    profileRole === "advertiser";
  const myProfile = () => profileId === id;

  // fetch trips if user is an advertiser
  useEffect(() => {
    if (profileRole === "advertiser") {
      const fetchTrips = async () => {
        try {
          const response = await getMyTrips(profileId);
          setTransportation(response);
        } catch (err) {
          console.error(err);
        }
      };
      fetchTrips();
    }
  }, [profileRole, id]);

  const getActivity = async (productID) => await getActivityById(productID);
  const getItinerary = async (productID) => await getItineraryById(productID);

  useEffect(() => {
    if (profileRole === "tourist" && userData?.bookmarks) {
      const fetchActivities = async () => {
        const activitiesData = await Promise.all(
          userData?.bookmarks?.map((bookmark) =>
            getActivity(bookmark.productID)
          )
        );
        setBookmarkedActivities(activitiesData);
      };
      fetchActivities();
    }
  }, [profileRole, userData?.bookmarks]);

  const fetchActivities = async (filterCondition, setterFunction) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dataPromises = (userData?.bookedEvents?.activities || []).map(
      async (item) => {
        const data = await getActivity(item.activityId);
        return data?.isInappropriate || !filterCondition(data) ? null : data;
      }
    );

    const filteredData = (await Promise.all(dataPromises)).filter(Boolean);
    setterFunction(filteredData);
  };

  const fetchItineraries = async (setterFunction, itineraries) => {
    const dataPromises = (itineraries || []).map(async (item) => {
      const data = await getItinerary(item.itineraryId);
      return data?.isInappropriate ? null : data;
    });

    const resolvedData = await Promise.all(dataPromises);
    setterFunction(resolvedData.filter(Boolean));
  };

  useEffect(() => {
    if (profileRole === "tourist") {
      fetchActivities(
        (activity) => new Date(activity.dateTime) > new Date(),
        setUpcomingActivites
      );
      fetchActivities(
        (activity) => new Date(activity.dateTime) <= new Date(),
        setPastActivities
      );

      const upcomingItineraries =
        userData?.bookedEvents?.itineraries?.filter(
          (item) => new Date(item.dateBooked) > new Date()
        ) || [];
      setUpcomingItineraries(upcomingItineraries);
      fetchItineraries(setUpcomingItineraries, upcomingItineraries);

      const pastItineraries =
        userData?.bookedEvents?.itineraries?.filter(
          (item) => new Date(item.dateBooked) <= new Date()
        ) || [];
      setPastItineraries(pastItineraries);
      fetchItineraries(setPastItineraries, pastItineraries);
    }
  }, [profileRole, userData?.bookedEvents]);

  const filteredCardData =
    role === "admin" && profileRole === "tourGuide"
      ? cardData.filter((card) => card.isActive)
      : role === "admin" && profileRole === "advertiser"
        ? cardData
        : profileRole === "tourGuide" && id !== profileId
          ? cardData.filter((card) => card.isActive && !card.isInappropriate)
          : profileRole === "advertiser" && id !== profileId
            ? cardData.filter((card) => !card.isInappropriate)
            : profileRole === "seller" && id !== profileId
              ? cardData.filter((card) => !card.isArchived)
              : cardData;

  const getCardType = () => {
    if (profileRole === "tourGuide") {
      return "itinerary";
    } else if (profileRole === "seller" || profileRole === "admin") {
      return "product";
    } else if (profileRole === "tourismGovernor") {
      return "site";
    } else {
      return "activity";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <h1 className="text-3xl font-extrabold shrink-0">
          {profileRole === "tourist"
            ? "Bookmarks"
            : profileRole === "seller" || profileRole === "admin"
              ? "Products"
              : profileRole === "advertiser"
                ? "Activities"
                : profileRole === "tourismGovernor"
                  ? "Historical Places & Museums"
                  : "Itineraries"}
        </h1>
        <hr className="border-neutral-300 border w-full mt-1.5" />
        {role !== "tourist" &&
          myProfile() &&
          (rejectable() === false || userData.isAccepted) && (
            <button
              className="shrink-0 mt-1.5 text-neutral-400 hover:text-neutral-600 transition-all"
              onClick={() => navigate(`/app/create/${getCardType()}`)}
            >
              <CirclePlus size={24} />
            </button>
          )}
      </div>

      <CardContainer
        cardList={
          profileRole === "tourist" ? bookmarkedActivities : filteredCardData
        }
        cardType={
          profileRole === "tourist"
            ? "activity"
            : profileRole === "tourGuide"
              ? "itinerary"
              : profileRole === "seller" || profileRole === "admin"
                ? "product"
                : profileRole === "advertiser"
                  ? "activity"
                  : "site"
        }
        fetchCardData={fetchCardData}
      />

      <div>
        {profileRole === "tourist" &&
          (!userData?.bookmarks?.length || !userData?.bookmarks) && (
            <p className="text-neutral-400 text-sm italic">
              You have not bookmarked any events yet.
            </p>
          )}
        {(profileRole === "tourGuide" ||
          profileRole === "advertiser" ||
          profileRole === "seller") &&
          filteredCardData.length === 0 && (
            <p className="text-neutral-400 text-sm italic">
              {profileId !== id
                ? `No ${profileRole}s to show.`
                : "You have not created any entries yet. Click the + button to get started!"}
            </p>
          )}
      </div>

      {profileRole === "tourist" &&
        <>
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-extrabold shrink-0">
              {profileRole === "tourist" ? "Upcoming Events" : ""}
            </h1>
            {profileRole === "tourist" && (
              <hr className="border-neutral-300 border w-full mt-1.5" />
            )}
          </div>

          <h2 className="text-2xl font-bold shrink-0 text-gray-500 mb-1">
            {profileRole === "tourist" ? "Activities" : ""}
          </h2>

          <CardContainer
            cardList={profileRole === "tourist" ? upcomingActivities : []}
            cardType="activity"
            fetchCardData={fetchCardData}
          />

          <h2 className="text-2xl font-bold shrink-0 text-gray-500 mt-2 mb-1">
            {profileRole === "tourist" ? "Itineraries" : ""}
          </h2>

          <CardContainer
            cardList={profileRole === "tourist" ? upcomingItineraries : []}
            cardType="itinerary"
            fetchCardData={fetchCardData}
          />

          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-extrabold shrink-0">
              {profileRole === "tourist" ? "Event History" : ""}
            </h1>
            {profileRole === "tourist" && (
              <hr className="border-neutral-300 border w-full mt-1.5" />
            )}
          </div>

          <h2 className="text-2xl font-bold shrink-0 text-gray-500 mb-1">
            {profileRole === "tourist" ? "Activities" : ""}
          </h2>

          <CardContainer
            cardList={profileRole === "tourist" ? pastActivities : []}
            cardType="activity"
            fetchCardData={fetchCardData}
          />

          <h2 className="text-2xl font-bold shrink-0 text-gray-500 mt-2 mb-1">
            {profileRole === "tourist" ? "Itineraries" : ""}
          </h2>

          <CardContainer
            cardList={profileRole === "tourist" ? pastItineraries : []}
            cardType="itinerary"
            fetchCardData={fetchCardData}
          />
        </>
      }
      {profileRole === "advertiser" && role != "guest" &&
        <>
          <div className="flex items-center gap-6 mt-4">
            <h1 className="text-3xl font-extrabold shrink-0">
              Transportation
            </h1>
            <hr className="border-neutral-300 border w-full mt-1.5" />
            {role !== "tourist" && myProfile() === true && (rejectable() === false || userData.isAccepted === true) &&
              <button
                className="shrink-0 mt-1.5 text-neutral-400 hover:text-neutral-600 transition-all"
                onClick={() => navigate(`/app/create/transportation`)}>
                <CirclePlus size={24} />
              </button>
            }
          </div>
          <CardContainer
            cardList={transportation}
            cardType={"transportation"}
            fetchCardData={() => { getMyTrips(profileId) }}
          />
        </>
      }
    </div>
  );
}

export default Timeline;
