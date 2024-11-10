import { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';
import { useCurrency } from '@/state management/userInfo';
import { Convert } from "easy-currencies";

const CardPrice = ({ price }) => {
    const currency = useCurrency(); // User's preferred currency
    const [convertedPrice, setConvertedPrice] = useState(null); // Store converted price

    useEffect(() => {
        // Fetch conversion rates when component mounts or currency changes
        const fetchConversionRate = async () => {
            try {
                // Fetch conversion rates with USD as the base currency
                const convert = await Convert().from("USD").fetch();

                // Convert the price to the user's preferred currency
                if (price) {
                    const rate = await convert.amount(price.min || price).to(currency);
                    setConvertedPrice(rate);
                }
            } catch (error) {
                console.error("Error fetching conversion rate:", error);
                setConvertedPrice(null); // Reset on error
            }
        };

        fetchConversionRate();
    }, [currency, price]);

    return (
        price && (
            <div className="text-neutral-500 flex gap-1 items-start">
                <Wallet size={16} className="shrink-0" />
                {convertedPrice ? (
                    <p className="text-xs leading-[11px] font-medium break-all pt-0.5">
                        Starting {`${convertedPrice.toFixed(2)} ${currency}`}
                    </p>
                ) : (
                    <p className="text-xs leading-[11px] font-medium break-all pt-0.5">
                        {price ? `${price} ${currency}` : "N/A"}
                    </p>
                )}
            </div>
        )
    );
};

export default CardPrice;
