import Card from "@/components/custom/Card";
import ProductCard from "@/components/custom/ProductCard";
import GenericForm from "../genericForm/genericForm";

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";

import { CirclePlus } from "lucide-react";

import { useUser } from '@/state management/userInfo';

function Timeline({ userData, profileId, id, profileRole, cardData, fetchCardData }) {
	const { role } = useUser();
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-6">
				<h1 className="text-3xl font-extrabold shrink-0">
					{profileRole === "tourist"
						? "Bookmarks"
						: profileRole === "seller"
							? "Products"
							: profileRole === "advertiser"
								? "Activities"
								: profileRole === "tourismGovernor"
									? "Historical Places & Museums"
									: "Itineraries"}
				</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
				{role !== "tourist" && profileId === id && (userData.isAccepted === true || role === "tourismGovernor") && (
					<Dialog>
						<DialogTrigger className="shrink-0 mt-1.5 text-neutral-400 hover:text-neutral-600 transition-all">
							<CirclePlus size={24} />
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
								/>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				)}
			</div>
			<div>
				<div className={`grid gap-6 ${profileRole === "tourismGovernor" ? "grid-cols-5" : "grid-cols-3"}`}>
					{/* hook up to API in later sprint*/}
					{profileRole === "tourist" &&
						userData?.bookmarks?.map((bookmark, index) => (
							<Card
								key={index}
								data={bookmark}
								id={id}
								profileId={profileId}
								role={role}
								cardType="activity"
								fetchCardData={fetchCardData}
							/>
						))}

					{profileRole === "tourGuide" &&
						cardData.length !== 0 &&
						cardData.map((itinerary, index) => (
							<Card
								key={index}
								data={itinerary}
								id={id}
								profileId={profileId}
								role={role}
								cardType="itinerary"
								fetchCardData={fetchCardData}
							/>
						))}

					{profileRole === "seller" &&
						cardData?.map((product, index) => (
							<ProductCard
								key={index}
								data={product}
								id={id}
								profileId={profileId}
								role={role}
								fetchCardData={fetchCardData}
							/>
						))}

					{profileRole === "advertiser" &&
						cardData?.map((activity, index) => (
							<Card
								key={index}
								data={activity}
								id={id}
								profileId={profileId}
								role={role}
								cardType="activity"
								fetchCardData={fetchCardData}
							/>
						))}

					{profileRole === "tourismGovernor" &&
						cardData?.map((site, index) => (
							<Card
								key={index}
								data={site}
								id={id}
								profileId={profileId}
								role={role}
								cardType="site"
								fetchCardData={fetchCardData}
							/>
						))}
				</div>
				<div>
					{profileRole === "tourist" &&
						(userData?.bookmarks?.length === 0 || !userData?.bookmarks) && (
							<p className="text-neutral-400 text-sm italic">
								{"You have not bookmarked any events yet."}
							</p>
						)}

					{profileRole === "tourGuide" && cardData.length === 0 && (
						<p className="text-neutral-400 text-sm italic">
							{profileId !== id
								? "No itineraries to show."
								: userData.isAccepted === null
									? "Your account must be approved before you can add itineraries. It is currently being reviewed; please check back later."
									: userData.isAccepted === false
										? "Your account has been rejected. Please contact the administrator for more information."
										: "You have not created any itineraries yet. Click the + button to get started!"}
						</p>
					)}

					{profileRole === "seller" && cardData.length === 0 && (
						<p className="text-neutral-400 text-sm italic">
							{profileId !== id
								? "No products to show."
								: userData.isAccepted === null
									? "Your account must be approved before you can add products. It is currently being reviewed; please check back later."
									: userData.isAccepted === false
										? "Your account has been rejected. Please contact the administrator for more information."
										: "You have not added any products yet. Click the + button to get started!"}
						</p>
					)}

					{profileRole === "advertiser" && cardData.length === 0 && (
						<p className="text-neutral-400 text-sm italic">
							{profileId !== id
								? "No activities to show."
								: userData.isAccepted === null
									? "Your account must be approved before you can add activities. It is currently being reviewed; please check back later."
									: userData.isAccepted === false
										? "Your account has been rejected. Please contact the administrator for more information."
										: "You have not added any activities yet. Click the + button to get started!"}
						</p>
					)}

					{profileRole === "tourismGovernor" && cardData.length === 0 && (
						<p className="text-neutral-400 text-sm italic">
							{profileId !== id
								? "No historical places or museums to show."
								: "You have not added any historical places or museums yet. Click the + button to get started!"}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Timeline;