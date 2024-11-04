import Card from "./Card";
import ProductCard from "./ProductCard";

const CardContainer = ({ cardList, cardType, fetchCardData }) => {
	// Provide a default value
	return (
		<div className="grid gap-6 grid-cols-3 w-full auto-rows-max">
			{cardList.length > 0 ? ( // Check if the array has items
				cardList.map((item, index) => (
					<div key={index}>
						{cardType !== "product" && <Card data={item} cardType={cardType} fetchCardData={fetchCardData} />}
						{cardType === "product" && <ProductCard data={item} fetchCardData={fetchCardData} />}
					</div>
				))
			) : (
				<div className="flex col-span-3 mx-auto">
					<div className="flex justify-center w-full">
						<p className="text-neutral-400 text-sm italic">
							No {cardType === "itinerary" ? "itineraries"
								: cardType === "activity" ? "activities"
									: cardType === "site" ? "sites"
										: "products"} found.
						</p>
					</div>
				</div>
			)}
		</div>
	);
};
export default CardContainer;
