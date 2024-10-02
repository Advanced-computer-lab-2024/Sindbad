import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CirclePlus } from "lucide-react";

function Experience({ userData, userId, id }) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <div className="flex items-center gap-6">
                    <h1 className="text-3xl font-extrabold">
                        Experience
                    </h1>
                    <hr className="border-neutral-700 border w-full mt-1.5" />
                    {userId === id &&
                        <button className="shrink-0 mt-1.5 text-neutral-600 hover:text-light transition-all">
                            <CirclePlus size={24} />
                        </button>
                    }
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {userData?.previousWork?.map((experience, index) => (
                    <Accordion key={index} type="single" defaultValue={index} collapsible>
                        <AccordionItem value={index}>
                            <AccordionTrigger>{experience.title}</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex gap-5">
                                    <div className="border-l-[2px] border-neutral-500"></div>
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            <h4 className="text-base text-neutral-400">
                                                {experience.companyName}
                                            </h4>
                                            <h4 className="text-base text-neutral-400">
                                                Jan 2023 - Present
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