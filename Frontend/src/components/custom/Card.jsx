import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, StarHalf, Bookmark } from 'lucide-react';

function Card() {
    return (
        <article className="w-full border border-primary-700/80 rounded-md overflow-clip bg-gradient-to-br from-dark to-primary-900/50 group">
            <div className="h-[196px] relative">
                <ImagePlaceholder />
                <button className="absolute top-3 right-3 border border-primary-900 opacity-0 group-hover:opacity-100 transition-all hover:text-secondary bg-primary-700 p-2 rounded-full">
                    <Bookmark fill="currentColor" size={20} />
                </button>
            </div>
            <div className="flex flex-col p-4 gap-6">
                <div>
                    <h4 className="text-xl font-semibold">
                        Itinerary Name
                    </h4>
                    <div className="shrink-0 text-secondary flex gap-0.5 items-center">
                        <Star fill="#fcd34d" size={20} />
                        <Star fill="#fcd34d" size={20} />
                        <Star fill="#fcd34d" size={20} />
                        <Star fill="#fcd34d" size={20} />
                        <StarHalf fill="#fcd34d" size={20} />
                        <p className="text-sm leading-[14px] font-medium text-neutral-500">
                            (1092)
                        </p>
                    </div>
                </div>
                <Button>
                    <p className="text-sm leading-6">
                        Read more
                    </p>
                    <div className="shrink-0">
                        <ArrowRight size={16} />
                    </div>
                </Button>
            </div>
        </article>
    );
}

export default Card;