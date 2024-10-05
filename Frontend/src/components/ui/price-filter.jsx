import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export function PriceFilter({ minPrice, maxPrice, setMinPrice, setMaxPrice }) {
    const handleMinPriceChange = (value) => {
        setMinPrice(value);
    };

    const handleMaxPriceChange = (value) => {
        setMaxPrice(value);
    };

    return (
        <div className="">
            <h4 className="text-md font-medium mb-2">Price Filter</h4>
            <div className="flex items-center gap-4 justify-between mb-4">
                <div className="grid gap-2">
                    <label htmlFor="min-price" className="text-sm text-neutral-400 font-medium">
                        Min
                    </label>
                    <Input
                        id="min-price"
                        type="number"
                        min="0"
                        max={maxPrice}
                        value={minPrice}
                        onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                        className="w-16 h-8 p-2"
                    />
                </div>
                <hr className="border-neutral-700 border w-full mt-7" />
                <div className="grid gap-2">
                    <label htmlFor="max-price" className="text-sm text-neutral-400 font-medium">
                        Max
                    </label>
                    <Input
                        id="max-price"
                        type="number"
                        min={minPrice}
                        max="1000"
                        value={maxPrice}
                        onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                        className="w-16 h-8 p-2"
                    />
                </div>
            </div>
            <Slider
                min={0}
                max={1000}
                step={10}
                value={[minPrice, maxPrice]}
                onValueChange={(values) => {
                    setMinPrice(values[0]);
                    setMaxPrice(values[1]);
                }}
                className="mb-4"
            />
            {/* <p className="text-sm text-muted-foreground">
                Showing products between ${minPrice} and ${maxPrice}
            </p> */}
        </div>
    );
}
