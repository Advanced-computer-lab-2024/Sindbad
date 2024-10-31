/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export function SliderFilter({ min, max, range, step, label, setMin, setMax }) {

	return (
		<div className="">
			<h4 className="text-md font-medium mb-2">
				{label || "Range"}
			</h4>
			<div className="flex items-center gap-4 justify-between mb-4">
				<div className="grid gap-2">
					<label
						htmlFor="min"
						className="text-sm text-neutral-400 font-medium"
					>
						Min
					</label>
					<Input
						id="min"
						type="number"
						value={min}
						onChange={(e) =>
							setMin(Number(e.target.value))
						}
						className="w-16 h-8 p-2"
					/>
				</div>
				<hr className="border-neutral-700 border w-full mt-7" />
				<div className="grid gap-2">
					<label
						htmlFor="max"
						className="text-sm text-neutral-400 font-medium"
					>
						Max
					</label>
					<Input
						id="max"
						type="number"
						value={max}
						onChange={(e) =>
							setMax(Number(e.target.value))
						}
						className="w-16 h-8 p-2"
					/>
				</div>
			</div>
			<Slider
				min={range.min}
				max={range.max}
				step={step}
				value={[min, max]}
				onValueChange={(values) => {
					setMin(values[0]);
					setMax(values[1]);
				}}
				className="mb-4"
			/>
			{/* <p className="text-sm text-muted-foreground">
                Showing products between ${minPrice} and ${maxPrice}
            </p> */}
		</div>
	);
}
