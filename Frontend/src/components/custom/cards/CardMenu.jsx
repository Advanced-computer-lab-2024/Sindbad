import { useState } from "react"; // Add this line
import { useToast } from "@/hooks/use-toast";

import { EllipsisVertical } from "lucide-react";

import {
	updateItinerary,
	setItineraryInappropriate,
} from "@/services/ItineraryApiHandler";
import { setActivityInappropriate } from "@/services/ActivityApiHandler";
import { updateProduct } from "@/services/ProductApiHandler";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import GenericForm from "../genericForm/genericForm";
import DeleteForm from "../deleteForm";

/*
The CardMenu component is a dropdown menu that contains various actions that can be performed on a card.
It renders the options based on an input configuration object.
The configuration object contains the actions that can be performed, and the roles which can perform them.
To edit the configuration, modify the cardConfig object in the specific card component.
To add a new action, write its method, add it to the parent's cardConfig object, and finally add it as DropdownMenuItem.
*/
function CardMenu({
	data,
	config = { actions: {} },
	role,
	id,
	cardType,
	fetchCardData,
	openDialog,
	setOpenDialog,
}) 

{
	const { toast } = useToast();

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Function to copy the link to clipboard
	const handleCopyLink = () => {
		const link = `http://localhost:5173/app/${cardType}/${data._id}`;
		navigator.clipboard
			.writeText(link)
			.then(() => {
				toast({
					description: "Link copied to clipboard",
				});
			})
			.catch((err) => console.error("Failed to copy link: ", err));
	};

	// Function to share via email
	const handleShareEmail = () => {
		const subject = encodeURIComponent(`Check out this ${cardType}!`);
		const body = encodeURIComponent(
			`Here's ${
				cardType === "itinerary" || cardType === "activity"
					? "an " + cardType
					: "a " + cardType
			} I found on Sindbad:\nhttp://localhost:5173/app/${cardType}/${data._id}`
		);
		window.location.href = `mailto:?subject=${subject}&body=${body}`;
	};

	const toggleItineraryActive = async () => {
		const response = await updateItinerary(data._id, {
			isActive: !data.isActive,
		});
		if (response.error) {
			console.error(response.message);
		} else {
			fetchCardData();
			toast({
				description: `Itinerary ${
					data.isActive ? "deactivated" : "activated"
				} successfully`,
			});
		}
	};

	const toggleInappropriate = async () => {
		const response =
			cardType === "itinerary"
				? await setItineraryInappropriate(data._id, {
						isInappropriate: !data.isInappropriate,
				  })
				: await setActivityInappropriate(data._id, {
						isInappropriate: !data.isInappropriate,
				  });
		if (response.error) {
			console.error(response.message);
		} else {
			fetchCardData();
			toast({
				description: `This ${cardType} has been ${
					data.isInappropriate ? "unflagged" : "flagged"
				} as inappropriate`,
			});
		}
	};

	const toggleArchive = async () => {
		const response = await updateProduct(data._id, {
			isArchived: !data.isArchived,
		});
		if (response.error) {
			console.error(response.message);
		} else {
			fetchCardData();
			toast({
				description: `Product ${
					data.isArchived ? "unarchived" : "archived"
				} successfully`,
			});
		}
	};

	console.log("Actions: ", config.actions);
	console.log("Role: ", role);
	console.log("ID: ", id);
	console.log("Creator ID: ", data.creatorId);
	console.log("Data: ", data);
	console.log(config.actions.toggleArchive);
	console.log(config.actions.toggleArchive.includes(role));
	console.log(id === data.creatorId);

	return (
		<>
			<DropdownMenu
				onOpenChange={(open) => setIsDropdownOpen(open)}
				modal={false}
			>
				<DropdownMenuTrigger asChild>
					<div className="icon-button">
						<EllipsisVertical fill="currentColor" size={16} />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuItem onClick={handleCopyLink}>
						Copy link
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleShareEmail}>
						Share via email
					</DropdownMenuItem>

					{config.actions.bookmark?.includes(role) && (
						<DropdownMenuItem>Bookmark</DropdownMenuItem>
					)}

					{config.actions.edit && id === data.creatorId && (
						<DropdownMenuItem onClick={() => setOpenDialog("edit")}>
							Edit
						</DropdownMenuItem>
					)}

					{config.actions.delete && id === data.creatorId && (
						<DropdownMenuItem onClick={() => setOpenDialog("delete")}>
							Delete
						</DropdownMenuItem>
					)}

					{config.actions.deactivate && id === data.creatorId && (
						<DropdownMenuItem onClick={toggleItineraryActive}>
							{data.isActive ? "Deactivate" : "Activate"}
						</DropdownMenuItem>
					)}

					{config.actions.flagAsInappropriate?.includes(role) && (
						<DropdownMenuItem onClick={toggleInappropriate}>
							{data.isInappropriate
								? "Unflag as inappropriate"
								: "Flag as inappropriate"}
						</DropdownMenuItem>
					)}

					{config.actions.toggleArchive && (config.actions.toggleArchive.includes(role) || id === data.creatorId) && (
						<DropdownMenuItem onClick={toggleArchive}>
							{data.isArchived ? "Unarchive" : "Archive"}
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
			<Dialog
				open={openDialog === "edit"}
				onOpenChange={() => setOpenDialog("")}
			>
				<DialogContent className="overflow-y-scroll max-h-[50%]">
					<DialogHeader>
						<GenericForm type={cardType} id={id} data={data} />
					</DialogHeader>
				</DialogContent>
			</Dialog>
			<Dialog
				open={openDialog === "delete"}
				onOpenChange={() => setOpenDialog("")}
			>
				<DialogContent className="max-h-[50%]">
					<DialogTitle>
						Are you sure you want to delete this {cardType}?
					</DialogTitle>
					<DialogHeader>
						<DeleteForm type={cardType} data={data} />
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default CardMenu;
