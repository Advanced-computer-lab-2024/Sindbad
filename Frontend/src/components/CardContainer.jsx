/* eslint-disable react/prop-types */
const CardContainer = ({ cardList, CardComponent }) => {
	// Provide a default value
	return (
		<div className="grid gap-6 grid-cols-3 w-full">
			{cardList.length > 0 ? ( // Check if the array has items
				cardList.map((item, index) => (
					<div
						key={index}
						className="card-container h-fit"
					>
						<CardComponent data={item} />
					</div>
				))
			) : (
				<div>No products available.</div> // Fallback UI
			)}
		</div>
	);
};
export default CardContainer;
