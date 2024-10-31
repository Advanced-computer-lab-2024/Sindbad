/* eslint-disable react/prop-types */
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import { CirclePlus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import GenericForm from "../genericForm";
import { useUser } from "@/state management/userInfo";
import { Edit, CircleX } from "lucide-react";

import { removeTourGuideWork } from "@/services/TourGuideApiHandler";
import { useNavigate } from "react-router-dom";

function Experience({ userData, userId, id }) {
	const { type } = useUser();
	const navigate = useNavigate();

	return (
		<div className="flex flex-col gap-6">
			<div>
				<div className="flex items-center gap-6">
					<h1 className="text-3xl font-extrabold">Experience</h1>
					<hr className="border-neutral-700 border w-full mt-1.5" />
					{userId === id && (
						<Dialog>
							<DialogTrigger>
								<span className="shrink-0 mt-1.5 text-neutral-600 hover:text-light transition-all">
									<CirclePlus size={24} />
								</span>
							</DialogTrigger>
							<DialogContent className="overflow-y-scroll max-h-[50%]">
								<DialogHeader>
									<DialogTitle>Edit Profile</DialogTitle>
									<GenericForm
										type={
											type === "advertiser"
												? "company"
												: type === "tourGuide"
												? "experience"
												: ""
										}
										id={id}
									/>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					)}
				</div>
			</div>
			<div className="flex flex-col gap-3">
				{(userData?.previousWork?.length === 0 ||
					!userData?.previousWork) && (
					<p className="text-neutral-400 text-sm italic">
						{userId !== id
							? "No experience to show."
							: "You have not added any experience yet. Click the + button to get started!"}
					</p>
				)}
				{userData?.previousWork?.map((experience, index) => (
					<Accordion
						key={experience._id} // Use the experience's _id as the key
						type="single"
						defaultValue={index + 1}
						collapsible
					>
						<AccordionItem value={experience._id}>
							<div className="relative">
								<AccordionTrigger>
									{experience.jobTitle}
								</AccordionTrigger>
								<div className="flex gap-2">
									<Dialog>
										<DialogTrigger>
											<Edit
												size={16}
												className="text-neutral-600"
											/>
										</DialogTrigger>
										<DialogContent className="overflow-y-scroll max-h-[50%]">
											<DialogHeader>
												<DialogTitle>
													Edit Profile
												</DialogTitle>
												<GenericForm
													type={
														type === "advertiser"
															? "company"
															: type ===
															  "tourGuide"
															? "experience"
															: ""
													}
													id={id}
													data={experience}
												/>
											</DialogHeader>
										</DialogContent>
									</Dialog>
									<Dialog>
										<DialogTrigger>
											<CircleX
												size={16}
												className="text-red-500"
											/>
										</DialogTrigger>
										<DialogContent className="overflow-y-scroll max-h-[50%]">
											<DialogTitle>
												Are you sure you want to delete
												this work?
											</DialogTitle>
											<div className="flex justify-end space-x-4 mt-4">
												<DialogClose asChild>
													{/* Delete Button */}
													<button
														className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
														onClick={() => {
															removeTourGuideWork(
																id,
																experience._id
															);
															// navigate(0);
														}}
													>
														Delete
													</button>
												</DialogClose>

												<DialogClose asChild>
													<span
														type="button"
														className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded"
													>
														Close
													</span>
												</DialogClose>
											</div>
										</DialogContent>
									</Dialog>
								</div>
							</div>
							<AccordionContent>
								<div className="flex gap-5">
									<div className="border-l-[2px] border-neutral-500"></div>
									<div className="flex flex-col gap-2">
										<div>
											<h4 className="text-base text-neutral-400">
												{experience.companyName}
											</h4>
											<h4 className="text-base text-neutral-400">
												{experience.duration}
											</h4>
										</div>
										<p className="leading-5 text-xs">
											{experience.description}
										</p>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				))}
			</div>
		</div>
	);
}

export default Experience;
