import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, StarHalf, Bookmark, Edit3, CircleX } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import GenericForm from "./genericForm";
import DeleteForm from "./deleteForm";

function Card({ data, id, userId, type }) {
    return (
        <article className="w-full flex flex-col border border-primary-700/80 rounded-md overflow-clip bg-gradient-to-br from-dark to-primary-900/50 group">
            <div className="h-[156px] relative shrink-0">
                <ImagePlaceholder />
                {type === "tourist" &&
                    <button className="absolute top-2 right-2 border-2 border-dark opacity-0 group-hover:opacity-100 transition-all hover:border-secondary bg-primary-900 p-1.5 rounded-full">
                        <Bookmark fill="currentColor" size={16} />
                    </button>
                }
                {type !== "tourist" && id === userId &&
                <div>
                    <Dialog>
                        <DialogTrigger>
                        <button className="absolute top-2 right-2 border-2 border-dark opacity-0 group-hover:opacity-100 transition-all hover:border-secondary bg-primary-900 p-1.5 rounded-full">
                            <Edit3 fill="currentColor" size={16} />
                        </button>
                        </DialogTrigger>
                        <DialogContent className="overflow-y-scroll max-h-[50%]">
                            <DialogHeader>
                                <GenericForm type={type === "seller" ? "product" : type === "advertiser" ? "activity" : type === "tourGuide" ? "itinerary" : "site"} id={id} data={data}/>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger>
                        <button className="absolute top-12 right-2 border-2 border-dark opacity-0 group-hover:opacity-100 transition-all hover:border-secondary bg-primary-900 p-1.5 rounded-full">
                            <CircleX size={16} />
                        </button>
                        </DialogTrigger>
                        <DialogContent className="overflow-y-scroll max-h-[50%]">
                            <DialogTitle>
                                Are you sure you want to delete this {type === "advertiser" ? "activity" : type === "tourGuide" ? "itinerary" : "site"}?
                            </DialogTitle>
                            <DialogHeader>
                                <DeleteForm type={type === "advertiser" ? "activity" : type === "tourGuide" ? "itinerary" : "site"} data={data}/>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                }
                
            </div>
            <div className="flex flex-col p-3 gap-5 h-full justify-between">
                <div>
                    <h4 className="text-base font-semibold line-clamp-2">
                        {data.name}
                    </h4>
                    {/* <div className="shrink-0 text-secondary flex gap-0.5 items-center">
                        <Star fill="#fcd34d" size={16} />
                        <Star fill="#fcd34d" size={16} />
                        <Star fill="#fcd34d" size={16} />
                        <Star fill="#fcd34d" size={16} />
                        <StarHalf fill="#fcd34d" size={16} />
                        <p className="text-xs leading-[11px] font-medium text-neutral-500">
                            (1092)
                        </p>
                    </div> */}
                    <p className="text-xs leading-[11px] font-medium text-neutral-500 mt-1">
                        Rating: {data.rating? `${data.rating} / 5` : "N/A"}
                    </p>
                </div>
                <Button
                    onClick={() => console.log(data)}
                >
                    <p className="text-xs">
                        Read more
                    </p>
                    <div className="shrink-0">
                        <ArrowRight size={13} />
                    </div>
                </Button>
            </div>
        </article>
    );
}

export default Card;