/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import GenericFilter from "@/components/custom/GenericFilter";
import CardContainer from "@/components/CardContainer";
import { getAllSites } from "@/services/SiteApiHandler";
import { getAllTags } from "@/services/AdminApiHandler";

function Sites() {
	const [loading, setLoading] = useState(false);
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
		fetchSites();
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
				<hr className="border-neutral-700 border w-full mt-1.5" />
			</div>
			<div className="flex gap-10">
				<GenericFilter
					formFields={formFields}
					activeFilters={activeFilters}
					setActiveFilters={setActiveFilters}
				/>
				{!loading && (
					<CardContainer cardList={sites} type={"tourGuide"} />
				)}
			</div>
		</div>
	);
}

export default Sites;
