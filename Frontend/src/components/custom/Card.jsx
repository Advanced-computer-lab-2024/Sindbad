import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import GenericForm from "./genericForm/genericForm";
import DeleteForm from "./deleteForm";
import StarRating from "./StarRating";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { updateItinerary, getMyItineraries } from "@/services/ItineraryApiHandler";

import { ArrowRight, Wallet, EllipsisVertical } from "lucide-react";

import { useUser } from "@/state management/userInfo";

function Card({ data, setData, cardType }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [openDialog, setOpenDialog] = useState("");
	const { toast } = useToast();

	const navigate = useNavigate();
	const { role, id } = useUser();

	// Function to copy the link to clipboard
	const handleCopyLink = () => {
		const link = `http://localhost:5173/app/${cardType}/${data._id}`;
		navigator.clipboard.writeText(link)
			.then(() => {
				toast({
					description: "Link copied to clipboard",
				});
			})
			.catch((err) => console.error('Failed to copy link: ', err));
	};

	// Function to share via email
	const handleShareEmail = () => {
		const subject = encodeURIComponent(`Check out this ${cardType}!`);
		const body = encodeURIComponent(`Here's ${cardType === "itinerary" || cardType === "activity" ? "an " + cardType : "a " + cardType} I found on Sindbad:\nhttp://localhost:5173/app/${cardType}/${data._id}`);
		window.location.href = `mailto:?subject=${subject}&body=${body}`;
	};

	const toggleItineraryActive = async () => {
		const updatedItineraries = await updateItinerary(data._id, { isActive: !data.isActive });
		if (updatedItineraries) {
			const myItineraries = await getMyItineraries(id);
			if (myItineraries) {
				setData(myItineraries);
				toast({
					description: `Itinerary ${data.isActive ? "deactivated" : "activated"} successfully`,
				});
			}
		}
	}

	return (
		<article className={`w-full flex h-full flex-col border rounded-md overflow-clip group bg-gradient-to-br from-light 
			${cardType === "itinerary" && data.isActive === false ?
				"to-neutral-300/50 border-neutral-300/80" : "to-primary-700/50 border-primary-700/80"}`}
		>
			<div className="h-[156px] relative shrink-0 bg-neutral-300">
				{/* card photo is first image in the array */}
				{data.imageUris && data.imageUris.length !== 0 ? (
					<img
						src={data.imageUris[0]}
						alt={data.name}
						className="object-cover h-full w-full"
					/>
				) : (
					<ImagePlaceholder />
				)}
				<DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)} modal={false}>
					<DropdownMenuTrigger asChild>
						<div className={`icon-button ${isDropdownOpen && 'opacity-100'}`}>
							<EllipsisVertical fill="currentColor" size={16} />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuItem onClick={handleCopyLink}>Copy link</DropdownMenuItem>
						<DropdownMenuItem onClick={handleShareEmail}>Share via email</DropdownMenuItem>
						{role === "tourist" && cardType === "activity" &&
							<DropdownMenuItem>Bookmark</DropdownMenuItem>
						}
						{role !== "tourist" && role !== "guest" && id === data.creatorId &&
							<>
								<DropdownMenuItem onClick={() => setOpenDialog("edit")}>Edit</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setOpenDialog("delete")}>Delete</DropdownMenuItem>
							</>
						}
						{cardType === "itinerary" && id === data.creatorId &&
							<DropdownMenuItem onClick={() => toggleItineraryActive()}>
								{data.isActive === true ? "Deactivate" : "Activate"}
							</DropdownMenuItem>
						}
					</DropdownMenuContent>
				</DropdownMenu>

				<Dialog open={openDialog === "edit"} onOpenChange={() => setOpenDialog("")}>
					<DialogContent className="overflow-y-scroll max-h-[50%]">
						<DialogHeader>
							<GenericForm
								type={cardType}
								id={id}
								data={data}
							/>
						</DialogHeader>
					</DialogContent>
				</Dialog>
				<Dialog open={openDialog === "delete"} onOpenChange={() => setOpenDialog("")}>
					<DialogContent className="max-h-[50%]">
						<DialogTitle>
							Are you sure you want to delete this{" "}
							{cardType}
							?
						</DialogTitle>
						<DialogHeader>
							<DeleteForm
								type={cardType}
								data={data}
							/>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
			{/* card details */}
			<div className="flex flex-col p-3 gap-2 h-full justify-between">
				<h4 className="text-base font-semibold line-clamp-2">
					{data.name}
				</h4>
				<div className="flex flex-col gap-1">
					{cardType !== "site" &&
						<StarRating
							rating={data.averageRating ? data.averageRating : 0}
							size={16}
						/>
					}
					{data.price &&
						<div className="text-neutral-500 flex gap-1 items-center">
							<Wallet size={16} />
							{data.price?.min ? (
								<p className="text-xs leading-[11px] font-medium">
									Starting {data.price.min ? `${data.price.min}EGP` : "N/A"}
								</p>
							) : data.price ? (
								<p className="text-xs leading-[11px] font-medium">
									{data.price ? `${data.price}EGP` : "N/A"}
								</p>
							) : null}
						</div>
					}
					{/* navigate to detailed view of itinerary/activity/site */}
					<Button onClick={() => navigate(`/app/${cardType}/${data._id}`)}
						className={`mt-2 ${cardType === "itinerary" && data.isActive === false ? "bg-neutral-300" : "bg-primary-700"}`}
					>
						<p className="text-xs">Read more</p>
						<div className="shrink-0">
							<ArrowRight size={13} />
						</div>
					</Button>
				</div>
			</div>
		</article >
	);
}

export default Card;
