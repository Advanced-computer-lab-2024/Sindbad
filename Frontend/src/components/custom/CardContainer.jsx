import Card from "./Card";
import ProductCard from "./ProductCard";

const CardContainer = ({ cardList, cardType, fetchCardData }) => {
	const getNoItemsMessage = () => {
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
			default:
				return "No items found.";
		}
	};

	return (
		<div className="grid gap-6 grid-cols-3 w-full auto-rows-max">
			{cardList.length > 0 ? (
				cardList.map((item, index) => (
					<div key={index}>
						{cardType === "product" ? (
							<ProductCard data={item} fetchCardData={fetchCardData} />
						) : (
							<Card data={item} cardType={cardType} fetchCardData={fetchCardData} />
						)}
					</div>
				))
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
