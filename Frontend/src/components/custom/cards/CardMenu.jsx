import { useState } from "react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const CardMenu = ({ data, role, id, cardType, setOpenDialog, toggleItineraryActive, toggleInappropriate, toggleArchive }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { toast } = useToast();

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

	const handleShareEmail = () => {
		const subject = encodeURIComponent(`Check out this ${cardType}!`);
		const body = encodeURIComponent(`Here's ${cardType === "itinerary" || cardType === "activity" ? "an " + cardType : "a " + cardType} I found on Sindbad:\nhttp://localhost:5173/app/${cardType}/${data._id}`);
		window.location.href = `mailto:?subject=${subject}&body=${body}`;
	};

	return (
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
					<DropdownMenuItem onClick={toggleItineraryActive}>
						{data.isActive === true ? "Deactivate" : "Activate"}
					</DropdownMenuItem>
				}
				{(cardType === "itinerary" || cardType === "activity") && role === "admin" &&
					<DropdownMenuItem onClick={toggleInappropriate}>
						{data.isInappropriate === true ? "Unflag as inappropriate" : "Flag as inappropriate"}
					</DropdownMenuItem>
				}
				{cardType === "product" && ((role === "seller" && id === data.seller) || role === "admin") &&
					<DropdownMenuItem onClick={toggleArchive}>
						{data.isArchived === true ? "Unarchive" : "Archive"}
					</DropdownMenuItem>
				}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default CardMenu;
