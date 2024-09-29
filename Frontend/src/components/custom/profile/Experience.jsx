import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CirclePlus } from "lucide-react";

function Experience() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
                <h1 className="text-3xl font-extrabold">
                    Experience
                </h1>
                <hr className="border-neutral-700 border w-full mt-1.5" />
                <button className="shrink-0 mt-1.5 text-neutral-600 hover:text-light transition-all">
                    <CirclePlus size={24} />
                </button>
            </div>
            <div className="flex flex-col gap-3">
                <Accordion type="single" defaultValue="item-1" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Position Title</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex gap-5">
                                <div className="border-l-[2px] border-neutral-500"></div>
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <h4 className="text-base text-neutral-400">
                                            Company Name
                                        </h4>
                                        <h4 className="text-base text-neutral-400">
                                            Jan 2023 - Present
                                        </h4>
                                    </div>
                                    <p className="leading-5 text-xs">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu massa cursus, pretium felis vitae, vestibulum magna. Sed hendrerit ac lectus nec pellentesque. Aenean quis mauris facilisis leo varius sagittis tristique vitae erat. Duis a libero at lorem lobortis molestie. Duis eu lectus sit amet ipsum dictum dapibus vitae vel.
                                    </p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" defaultValue="item-2" collapsible>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Position Title</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex gap-5">
                                <div className="border-l-[2px] border-neutral-500"></div>
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <h4 className="text-base text-neutral-400">
                                            Company Name
                                        </h4>
                                        <h4 className="text-base text-neutral-400">
                                            Oct 2021 - Dec 2022
                                        </h4>
                                    </div>
                                    <p className="leading-5 text-xs">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu massa cursus, pretium felis vitae, vestibulum magna. Sed hendrerit ac lectus nec pellentesque. Aenean quis mauris facilisis leo varius sagittis tristique vitae erat. Duis a libero at lorem lobortis molestie. Duis eu lectus sit amet ipsum dictum dapibus vitae vel.
                                    </p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}

export default Experience;