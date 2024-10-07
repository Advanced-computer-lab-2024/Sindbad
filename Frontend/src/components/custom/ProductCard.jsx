import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import { Button } from "@/components/ui/button";
import { ArrowRight, Edit3 } from 'lucide-react';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import GenericForm from "./genericForm";

function ProductCard({ data, id, userId, type }) {
    const [navigateToProduct, setNavigateToProduct] = useState(false);

    return (
        <article className="w-full flex flex-col border border-primary-700/80 rounded-md overflow-clip bg-gradient-to-br from-dark to-primary-900/50 group">
            <div className="h-[156px] relative shrink-0 bg-neutral-800">
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
                {((type === "seller" && id === userId) || type === "admin") &&
                    <div>
                        <Dialog>
                            <DialogTrigger className="absolute top-2 right-2 border-2 border-dark opacity-0 group-hover:opacity-100 transition-all hover:border-secondary bg-primary-900 p-1.5 rounded-full">
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
                    <p className="text-xs leading-[11px] font-medium text-neutral-500 mt-1">
                        Rating: {data.averageRating ? `${Math.round(data.averageRating * 2) / 2} / 5` : "N/A"}
                    </p>
                    <p className="text-xs leading-[11px] font-medium text-neutral-500 mt-1">
                        Price: {data.price ? `${data.price}EGP` : "N/A"}
                    </p>
                </div>
                <Button
                    onClick={() => setNavigateToProduct(true)}
                >
                    <p className="text-xs">
                        Read more
                    </p>
                    <div className="shrink-0">
                        <ArrowRight size={13} />
                    </div>
                </Button>
                {navigateToProduct ? <Navigate to={`/app/product/${data._id}`} /> : null}
            </div>
        </article>
    );
}

export default ProductCard;
