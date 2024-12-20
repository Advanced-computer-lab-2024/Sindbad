import GenericForm from "../genericForm/genericForm";
import DeleteForm from "../deleteForm";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Edit, CircleX, CirclePlus, MapPin, Calendar } from "lucide-react";

import { useUser } from "@/state management/userInfo";

function Experience({ userData, profileId, id }) {
	const { role } = useUser();

	return (
		<div className="flex flex-col gap-3">
			<div>
				<div className="flex items-center gap-6">
					<h1 className="text-3xl font-extrabold">Experience</h1>
					<hr className="border-neutral-300 border w-full mt-1.5" />
					{/* button to add experience if it's your profile */}
					{profileId === id && userData.isAccepted === true && (
						<Dialog>
							<DialogTrigger className="shrink-0 mt-1.5 text-neutral-400 hover:text-neutral-600 transition-all">
								<CirclePlus size={24} />
							</DialogTrigger>
							<DialogContent className="overflow-y-scroll max-h-[50%]">
								<DialogHeader>
									<DialogTitle>Edit Profile</DialogTitle>
									<GenericForm
										type={
											role === "advertiser"
												? "company"
												: role === "tourGuide"
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
				{(userData?.previousWork?.length === 0 || !userData?.previousWork) &&
					<p className="text-neutral-400 text-sm italic">
						{profileId !== id
							? "No experience to show."
							: "You have not added any experience yet. Click the + button to get started!"
						}
					</p>
				}
				{userData?.previousWork?.map((experience, index) => (
					<Accordion
						key={experience._id} // Use the experience's _id as the key
						type="single"
						defaultValue={index + 1}
						collapsible
					>
						<AccordionItem value={experience._id}>
							<div className="relative">
								<div className="flex justify-between items-center gap-2">
									<AccordionTrigger>
										{experience.jobTitle}
									</AccordionTrigger>
									{profileId === id && userData.isAccepted === true &&
										<div className="shrink-0 flex gap-2 text-neutral-400">
											<Dialog>
												<DialogTrigger>
													<Edit
														size={16}
														className="hover:text-neutral-600"
													/>
												</DialogTrigger>
												<DialogContent className="overflow-y-scroll max-h-[50%]">
													<DialogHeader>
														<DialogTitle>
															Edit Profile
														</DialogTitle>
														<GenericForm
															type={
																role === "advertiser"
																	? "company"
																	: role ===
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
														className="hover:text-destructive"
													/>
												</DialogTrigger>
												<DialogContent className="overflow-y-scroll max-h-[50%]">
													<DialogTitle>
														Are you sure you want to delete this work?
													</DialogTitle>
													<DialogHeader>
														<DeleteForm
															type="experience"
															data={{id: id, experience_id: experience._id}}
														/>
													</DialogHeader>
												</DialogContent>
											</Dialog>
										</div>
									}
								</div>
							</div>
							<AccordionContent>
								<div className="flex gap-5">
									<div className="border-l-2 border-neutral-300"></div>
									<div className="flex flex-col gap-2">
										<div className="-ml-1 text-neutral-500">
											<div className="flex items-start gap-1">
												<MapPin size={18} className="pt-1 shrink-0" />
												<h4 className="text-base">
													{experience.companyName}
												</h4>
											</div>
											<div className="flex items-start gap-1">
												<Calendar size={18} className="pt-1 shrink-0" />
												<h4 className="text-base">
													{experience.duration}
												</h4>
											</div>
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
