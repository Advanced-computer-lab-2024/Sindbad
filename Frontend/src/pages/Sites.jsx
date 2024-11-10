import { useState, useEffect } from "react";

import GenericFilter from "@/components/custom/GenericFilter";
import CardContainer from "@/components/custom/cards/CardContainer";

import { getAllSites } from "@/services/SiteApiHandler";
import { getAllTags } from "@/services/AdminApiHandler";

function Sites() {
	const [loading, setLoading] = useState(true);
	const [sites, setSites] = useState([]);

	const [tagNames, setTagNames] = useState([]);
	const [activeFilters, setActiveFilters] = useState({
		name: "",
		tag: {
			selected: "",
		},
	});

	const formFields = {
		name: {
			type: "search",
			label: "Search",
		},
		tag: {
			type: "select",
			label: "Tag",
			options: tagNames,
		},
	};

	// Function to fetch products
	const fetchSites = async () => {
		setLoading(true);

		console.log(
			`Sending request with filters: name: ${activeFilters.name}, selectedTag: ${activeFilters.tag.selected}`
		);

		const response = await getAllSites(
			activeFilters.name,
			activeFilters.tag.selected
		);
		if (!response.error) {
			setSites(response);
		} else {
			setSites([]);
			console.error(response.message);
		}
		setLoading(false);
	};

	const fetchTags = async () => {
		const response = await getAllTags();
		if (!response.error) {
			const set = new Set(response.data.map((tag) => tag.name));
			setTagNames(Array.from(set));
			console.log("Tags: ", response.data);
		} else {
			console.error(response.message);
		}
	};

	useEffect(() => {
		fetchTags();
	}, []);

	// Debouncing logic for the API call
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			fetchSites();
		}, 500);

		// Clear the timeout if activeFilters changes before the timeout is complete

		return () => clearTimeout(delayDebounceFn);
	}, [activeFilters]); // Dependency on activeFilters

	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-4 mx-auto">
			<div className="flex items-center gap-6 mb-6">
				<h1 className="text-3xl font-extrabold">Sites</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>
			<div className="flex gap-10">
				<div className="w-[280px] shrink-0">
					<GenericFilter
						formFields={formFields}
						activeFilters={activeFilters}
						setActiveFilters={setActiveFilters}
					/>
				</div>
				{!loading ? (
					<CardContainer
						cardList={sites}
						cardType={"site"}
						fetchCardData={fetchSites}
					/>
				) : (
					<div className="flex col-span-3 mx-auto">
						<div className="flex justify-center w-full">
							<p className="text-neutral-400 text-sm italic">Loading...</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Sites;
