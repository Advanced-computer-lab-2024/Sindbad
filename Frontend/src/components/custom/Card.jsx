import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import GenericForm from "./genericForm/genericForm";
import DeleteForm from "./deleteForm";
import StarRating from "./StarRating";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { updateItinerary, setItineraryInappropriate } from "@/services/ItineraryApiHandler";
import { setActivityInappropriate } from "@/services/ActivityApiHandler";

import { ArrowRight, Wallet, EllipsisVertical } from "lucide-react";

import { useUser } from "@/state management/userInfo";

import CardImage from "./cards/CardImage";
import CardPrice from "./cards/CardPrice";
import CardMenu from "./cards/CardMenu";

const cardConfig = {
	itinerary: {
		showRating: true,
		showPrice: false,
		actions: ["activate", "deactivate", "flagAsInappropriate"],
	},
	activity: {
		showRating: true,
		showPrice: true,
		actions: ["bookmark", "flagAsInappropriate"],
	},
};


function Card({ data, cardType, fetchCardData }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [openDialog, setOpenDialog] = useState("");
	const { toast } = useToast();

	const navigate = useNavigate();
	const { role, id } = useUser();

	console.log(data);

	return (
		<article
			className={`w-full flex h-full flex-col border rounded-md overflow-clip group bg-gradient-to-br from-light
			${
				(cardType === "itinerary" || cardType === "activity") &&
				data.isInappropriate === true
					? "to-red-300/30 border-red-300/50"
					: cardType === "itinerary" && data.isActive === false
					? "to-neutral-300/50 border-neutral-300/80"
					: "to-primary-700/50 border-primary-700/80"
			}`}
		>
			<div className="h-[156px] relative shrink-0 bg-neutral-300">
				<CardImage imageUris={data.imageUris} altText={data.name} />
				<CardMenu
					data={data}
					config={cardConfig[cardType]}
					role={role}
					id={id}
					cardType={cardType}
					fetchCardData={fetchCardData}
					openDialog={openDialog}
					setOpenDialog={setOpenDialog}
				/>
			</div>
			{/* card details */}
			<div className="flex flex-col p-3 gap-2 h-full justify-between">
				<h4 className="text-base font-semibold line-clamp-2">{data.name}</h4>
				<div className="flex flex-col gap-1">
					{cardType !== "site" && (
						<StarRating
							rating={data.averageRating ? data.averageRating : 0}
							size={16}
						/>
					)}
					<CardPrice price = {data.price} />
					{/* navigate to detailed view of itinerary/activity/site */}
					<Button
						onClick={() => navigate(`/app/${cardType}/${data._id}`)}
						className={`mt-2
							${
								(cardType === "itinerary" || cardType === "activity") &&
								data.isInappropriate === true
									? "bg-red-300/70"
									: cardType === "itinerary" && data.isActive === false
									? "bg-neutral-300"
									: "bg-primary-700"
							}`}
					>
						<p className="text-xs">Read more</p>
						<div className="shrink-0">
							<ArrowRight size={13} />
						</div>
					</Button>
				</div>
			</div>
		</article>
	);
}

export default Card;
