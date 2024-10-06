import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CirclePlus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import GenericForm from "../genericForm";
import { useUser } from '@/state management/userInfo';
import { Edit, MapPin } from "lucide-react";
function Experience({ userData, userId, id }) {
    const { type } = useUser();
    return (
        <div className="flex flex-col gap-6">
            <div>
                <div className="flex items-center gap-6">
                    <h1 className="text-3xl font-extrabold">
                        Experience
                    </h1>
                    <hr className="border-neutral-700 border w-full mt-1.5" />
                    {userId === id &&
                        <Dialog>
                        <DialogTrigger>
                            <button className="shrink-0 mt-1.5 text-neutral-600 hover:text-light transition-all">
                                <CirclePlus size={24} />
                            </button>
                        </DialogTrigger>
                        <DialogContent className="overflow-y-scroll max-h-[50%]">
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <GenericForm type={type === "advertiser" ? "company" : type === "tourGuide" ? "experience" : ""} id={id} data={userData} />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    }
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {(userData?.previousWork?.length === 0 || !userData?.previousWork) &&
                    <p className="text-neutral-400 text-sm italic">
                        {userId !== id ? "No experience to show." : "You have not added any experience yet. Click the + button to get started!"}
                    </p>
                }
                {userData?.previousWork?.map((experience, index) => (
                    <Accordion key={index + 1} type="single" defaultValue={index + 1} collapsible>
                        <AccordionItem value={index + 1}>
                            <div className="relative">
                                <AccordionTrigger>{experience.jobTitle}</AccordionTrigger>
                                <Dialog>
                                    <DialogTrigger>
                                        <button>
                                            <Edit size={16} className="text-neutral-600" />
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="overflow-y-scroll max-h-[50%]">
                                        <DialogHeader>
                                            <DialogTitle>Edit Profile</DialogTitle>
                                            <GenericForm type={type === "advertiser" ? "company" : type === "tourGuide" ? "experience" : ""} id={id} data={experience} />
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
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