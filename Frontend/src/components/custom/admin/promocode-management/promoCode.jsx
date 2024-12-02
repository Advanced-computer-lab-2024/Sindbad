import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenericForm from "../../genericForm/genericForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createPromoCode } from "@/services/PromocodeApiHandler";


export default function PromoCodes(){
    const { toast } = useToast();
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(false);

    const handlePromoCodeCreate = () => {
        if (!promoCode || promoCode.trim() === "") {
            toast({ description: "Please enter a promo code." });
            return;
        }
        if (!discount) {
            toast({ description: "Please enter discount value." });
            return;
        }
        
        // Prepare promo code data
        const promoCodeData = {
            promocode: promoCode.trim(),
            discount: Number(discount),
            usersWhoRedeemedIt: [], // Default value
        };

        setLoading(true); // Set loading state to true, indicating a request is in progress
    
        const createPromoCodeAsync = async () => {
            try {
                const promoCodeData = {
                    promocode: promoCode.trim(),
                    discount: Number(discount),
                    usersWhoRedeemedIt: [], // Default value
                };
    
                const response = await createPromoCode(promoCodeData);
    
                if (response && response.message) {
                    toast({
                        description: "Promo code created successfully!"
                    });
                    setPromoCode("");
                    setDiscount("");
                } else {
                    toast({ description: "Failed to create promo code."});
                }
            } catch (error) {
                toast({
                    description: error?.message || "An unexpected error occurred."
                });
            } finally {
                setLoading(false); // Reset loading state
            }
        };
                // Call the async function
                createPromoCodeAsync();
    };

    return(
        <div>
            <div className="flex items-center gap-6">
				<h1 className="text-3xl font-extrabold shrink-0">Promo Codes</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>
            <h2 className=" text-2xl m-5 font-bold">
                Create new promo code
            </h2>
            <div className="flex flex-rows gap-5 px-8">
                <div className="w-full m-5 text-lg">
                    <Label className="text-lg " htmlFor="code">Enter Promocode</Label>
                    <Input
                        type="text"
                        id="code"
                        placeholder=""
                        onChange={(e) => setPromoCode(e.target.value.trim())} 
                        className="border border-gray-300 rounded text-lg"
                    />
                </div>
                <div className="w-full m-5 text-lg">
                    <Label className="text-lg" htmlFor="discount">Enter Discount Value</Label>
                    <Input
                        type="text"
                        id="code"
                        placeholder=""
                        onChange={(e) => setDiscount(e.target.value)} 
                        className="border border-gray-300 rounded text-lg"
                    />
                </div>
                
            </div>
            <div className=" place-items-end gap-6 m-5 mr-14">
                    <Button
                    className="w-1/3 flex items-center justify-center text-md p-2 py-5"
                    onClick={handlePromoCodeCreate}
                    disabled={loading}
                    >
                        {loading ? "Creating..." : "Create"}
                    </Button>
			</div>
        </div>
    );
}