import { useNavigate } from "react-router-dom";
import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import { Button } from "@/components/ui/button";
import { ArrowRight, Edit3, Wallet } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import GenericForm from "./genericForm";
import StarRating from "./StarRating";
import { useUser } from "@/state management/userInfo";

function ProductCard({ data, id, profileId }) {
    const navigate = useNavigate();
    const { role } = useUser();

    return (
        <article className="w-full flex flex-col border border-primary-700/80 rounded-md overflow-clip bg-gradient-to-br from-light to-primary-700/50 group">
            <div className="h-[156px] relative shrink-0 bg-neutral-300">
                {/* If picture is available, show it, otherwise show placeholder */}
                {data.picture ? (
                    <img
                        src={data.picture}
                        alt={data.name}
                        className="object-cover h-full w-full"
                    />
                ) : (
                    <ImagePlaceholder />
                )}
                {/* can only edit product if it's yours or you're an admin */}
                {((role === "seller" && id === profileId) || role === "admin") &&
                    <div>
                        <Dialog>
                            <DialogTrigger className="icon-button">
                                <Edit3 fill="currentColor" size={16} />
                            </DialogTrigger>
                            <DialogContent className="overflow-y-scroll max-h-[50%]">
                                <DialogHeader>
                                    <GenericForm type="product" id={id} data={data} />
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                }
            </div>
            <div className="flex flex-col p-3 gap-5 h-full justify-between">
                <div>
                    {/* Product name */}
                    <h4 className="text-base font-semibold line-clamp-2">
                        {data.name}
                    </h4>
                    <StarRating rating={data.averageRating ? data.averageRating : 0} />
                    <div className="text-neutral-500 flex gap-1 items-center mt-1">
                        <Wallet size={16} />
                        <p className="text-xs leading-[11px] font-medium text-neutral-500">
                            {data.price ? `${data.price}EGP` : "N/A"}
                        </p>
                    </div>
                </div>
                <Button onClick={() => navigate(`/app/product/${data._id}`)}>
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

export default ProductCard;
