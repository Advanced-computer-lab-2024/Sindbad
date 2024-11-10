import ProductCard from "./ProductCard";
import ItineraryCard from "./ItineraryCard";
import ActivityCard from "./ActivityCard";
import SiteCard from "./SiteCard";
import TripCard from "./TripCard";
import { useLocation } from "react-router-dom";
import HotelCard from "./HotelCard";

/*
The CardContainer is used to call the appropriate card components based on the cardType prop, and render them in a grid layout.
It also encapsulates all the styling information to be reused.
To customize the styling, you can modify the styles object.
To customize a card, go to its specific card component file.
To add a new card type, create a new card component file and add it to the getCardComponent function.
*/
const CardContainer = ({ cardList, cardType, fetchCardData, columns = 3 }) => {
  const styles = {
    container:
      "w-full h-full flex flex-col border rounded-md overflow-clip group bg-gradient-to-br from-light",
    inappropriate: "to-red-300/30 border-red-300/50",
    inactive: "to-neutral-300/50 border-neutral-300/80",
    active: "to-primary-700/50 border-primary-700/80",
    imageContainer: "h-[156px] relative shrink-0 bg-neutral-300",
    noImageContainer: "h-[0px] relative shrink-0 ",
    detailsContainer: "flex flex-col p-3 gap-2 h-full justify-between",
    title: "text-base font-semibold line-clamp-2",
    button: "mt-2",
    buttonInappropriate: "bg-red-300/70",
    buttonInactive: "bg-neutral-300",
    buttonActive: "bg-primary-700",
    buttonText: "text-xs",
    buttonIcon: "shrink-0",
  };

  const isProfilePage = useLocation().pathname.includes("/profile");
  const getNoItemsMessage = () => {
    if (isProfilePage) {
      return "";
    }
    switch (cardType) {
      case "itinerary":
        return "No itineraries found.";
      case "activity":
        return "No activities found.";
      case "site":
        return "No sites found.";
      case "product":
        return "No products found.";
      case "hotel":
        return "No hotels found.";
      case "trip":
        return "No trips found";
      default:
        return "No items found.";
    }
  };

  const getCardComponent = (cardType) => {
    switch (cardType) {
      case "itinerary":
        return ItineraryCard;
      case "activity":
        return ActivityCard;
      case "site":
        return SiteCard;
      case "product":
        return ProductCard;
      case "hotel":
        return HotelCard;
      case "trip":
        return TripCard;
      default:
        return SiteCard;
    }
  };

  return (
    // TODO: Make this change columns based on prop
    <div className={`grid gap-6 grid-cols-3 w-full auto-rows-max`}>
      {cardList.length > 0 ? (
        cardList.map((item, index) => {
          const CardComponent = getCardComponent(cardType);
          return (
            <div key={index}>
              <CardComponent
                data={item}
                fetchCardData={fetchCardData}
                styles={styles}
              />
            </div>
          );
        })
      ) : (
        <div className="flex col-span-3 mx-auto">
          <div className="flex justify-center w-full">
            <p className="text-neutral-400 text-sm italic">
              {getNoItemsMessage()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardContainer;
