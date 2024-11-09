import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";
import { useUser, useCurrency } from "@/state management/userInfo";
import { Convert } from "easy-currencies";
import { redeemPoints } from "@/services/TouristApiHandler";

function Wallet({ userData, setUserData }) {
    const currency = useCurrency();
    const [convertedPrice, setConvertedPrice] = useState(null);
    const { role, id } = useUser();

    const handleRedeemPoints = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/tourist/${userData._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to redeem points");
            }

            //   const data = await response.json();
            //   if (data.loyaltyPoints === 0) {
            //     alert("You don't have any points to redeem");
            //   }

            setUserData((prevData) => ({
                ...prevData,
                wallet: data.wallet,
            }));
        } catch (error) {
            console.error("Error redeeming points:", error);
            alert("Error redeeming points: " + error.message);
        }
    };

    useEffect(() => {
        const fetchConversionRate = async () => {
            try {
                const convert = await Convert().from("USD").fetch();

                if (userData.wallet) {
                    const rate = await convert.amount(userData.wallet).to(currency);
                    setConvertedPrice(rate);
                }
            } catch (error) {
                console.error("Error fetching conversion rate:", error);
                setConvertedPrice(null); // Reset on error
            }
        };

        if (userData) {
            fetchConversionRate();
        }
    }, [currency, userData]);

    return (
        <section className="w-[280px] border border-neutral-300 rounded-md overflow-clip flex flex-col items-center shrink-0 p-6 bg-gradient-to-b from-neutral-200/60 to-light">
            <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col w-full items-center gap-3">
                    <div>
                        <h4 className="text-center font-semibold text-base text-neutral-500 mb-1.5">
                            Wallet
                        </h4>
                        {convertedPrice &&
                            <h3 className="font-inter font-bold text-xl break-all">
                                {convertedPrice} {currency}
                            </h3>
                        }
                    </div>
                </div>
                <Button variant="rounded" onClick={handleRedeemPoints}>
                    <p className="text-xs leading-[11px]">Redeem points</p>
                    <div className="shrink-0 group-hover:text-secondary">
                        <ArrowRight size={16} />
                    </div>
                </Button>
            </div>
        </section>
    );
}

export default Wallet;
