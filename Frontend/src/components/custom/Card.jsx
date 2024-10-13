import { useNavigate } from "react-router-dom";

import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import GenericForm from "./genericForm";
import DeleteForm from "./deleteForm";
import StarRating from "./StarRating";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { ArrowRight, Bookmark, Edit3, X, Wallet } from 'lucide-react';

import { useUser } from "@/state management/userInfo";

function Card({ data, id, profileId, cardType }) {
	const navigate = useNavigate();
	const { role } = useUser();

	return (
		<article className="w-full flex flex-col border border-primary-700/80 rounded-md overflow-clip bg-gradient-to-br from-light to-primary-700/50 group">
			<div className="h-[156px] relative shrink-0 bg-neutral-300">
				{/* card photo is first image in the array */}
				{data.imageUris && data.imageUris.length !== 0 ?
					<img
						src={data.imageUris[0]}
						alt={data.name}
						className="object-cover h-full w-full"
					/>
					:
					<ImagePlaceholder />
				}
				{/* tourists can bookmark activities ("events") */}
				{role === "tourist" && cardType === "activity" &&
					<button className="icon-button">
						<Bookmark fill="currentColor" size={16} />
					</button>
				}
				{/* if the card is yours, show edit and delete buttons */}
				{role !== "tourist" && role !== "guest" && id === profileId && (
					<div>
						<Dialog>
							<DialogTrigger className="icon-button">
								<Edit3 fill="currentColor" size={16} />
							</DialogTrigger>
							<DialogContent className="overflow-y-scroll max-h-[50%]">
								<DialogHeader>
									<GenericForm
										type={
											role === "seller"
												? "product"
												: role === "advertiser"
													? "activity"
													: role === "tourGuide"
														? "itinerary"
														: "site"
										}
										id={id}
										data={data}
									/>
								</DialogHeader>
							</DialogContent>
						</Dialog>
						<Dialog>
							<DialogTrigger className="icon-button top-12">
								<X size={16} />
							</DialogTrigger>
							<DialogContent className="overflow-y-scroll max-h-[50%]">
								<DialogTitle>
									Are you sure you want to delete this{" "}
									{role === "advertiser"
										? "activity"
										: role === "tourGuide"
											? "itinerary"
											: "site"}
									?
								</DialogTitle>
								<DialogHeader>
									<DeleteForm
										type={
											role === "advertiser"
												? "activity"
												: role === "tourGuide"
													? "itinerary"
													: "site"
										}
										data={data}
									/>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					</div>
				)}
			</div>
			{/* card details */}
			<div className="flex flex-col p-3 gap-5 h-full justify-between">
				<div>
					<h4 className="text-base font-semibold line-clamp-2">
						{data.name}
					</h4>
					<StarRating rating={data.rating ? data.rating : 0} />
					<div className="text-neutral-500 flex gap-1 items-center mt-1">
						<Wallet size={16} />
						{data.price?.min ?
							<p className="text-xs leading-[11px] font-medium">
								Starting {data.price.min ? `${data.price.min}EGP` : "N/A"}
							</p>
							: data.price ?
								<p className="text-xs leading-[11px] font-medium">
									{data.price ? `${data.price}EGP` : "N/A"}
								</p>
								: null
						}
					</div>
				</div>
				{/* navigate to detailed view of itinerary/activity/site */}
				<Button onClick={() => navigate(`/app/${cardType}/${data._id}`)}>
					<p className="text-xs">Read more</p>
					<div className="shrink-0">
						<ArrowRight size={13} />
					</div>
				</Button>
			</div>
		</article>
	);
}

export default Card;