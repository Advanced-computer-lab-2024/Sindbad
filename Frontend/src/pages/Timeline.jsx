import Card from "@/components/custom/Card";

function Timeline() {
	const array = [1, 2, 2, 2];
	return (
		<div className="bg-primary h-[93.8vh] flex flex-col items-center justify-center text-black">
			<div className="w-[90vw] h-full flex flex-col bg-gray-400">
				<h1 className="flex-grow-[2]">Header Section</h1>

				<div className="bg-green-300 flex-grow-[10] flex">
					<div className="bg-red-400 flex-grow-[1]"></div>
					<div className="bg-blue-400 flex-grow-[4] p-10">
						{/* Set grid to have exactly 2 columns */}
						<div className="grid grid-cols-2 gap-4 ">
							{array.map((data, index) => (
								<div
									key={index}
									className="card-container w-5/6"
								>
									<Card data={data} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Timeline;
