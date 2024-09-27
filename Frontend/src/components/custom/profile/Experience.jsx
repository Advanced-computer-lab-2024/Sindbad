import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CirclePlus } from "lucide-react";

function Experience() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-8">
                <h1 className="text-5xl font-extrabold">
                    Experience
                </h1>
                <hr className="border-neutral-700 border w-full mt-3" />
                <div className="shrink-0 mt-3 text-neutral-600 hover:text-light transition-all">
                    <CirclePlus size={30} />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <Accordion type="single" defaultValue="item-1" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Position Title</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex gap-6">
                                <div className="border-l-[3px] border-neutral-500"></div>
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <h4 className="text-xl text-neutral-400">
                                            Company Name
                                        </h4>
                                        <h4 className="text-xl text-neutral-400">
                                            Jan 2023 - Present
                                        </h4>
                                    </div>
                                    <p className="leading-7 text-[16px]">
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
                            <div className="flex gap-6">
                                <div className="border-l-[3px] border-neutral-500"></div>
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <h4 className="text-xl text-neutral-400">
                                            Company Name
                                        </h4>
                                        <h4 className="text-xl text-neutral-400">
                                            Jan 2022 - Dec 2022
                                        </h4>
                                    </div>
                                    <p className="leading-7 text-[16px]">
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