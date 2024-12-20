import { useState, useEffect } from "react";

import TableSkeleton from "@/components/custom/TableSkeleton";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ComplaintDetails from "./ComplaintDetails";

import { getAllComplaints } from "@/services/ComplaintApiHandler";

export default function ComplaintManagement() {
	// State management for data, loading, and message
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState(null); // message replaces error
	const [selectedComplaint, setSelectedComplaint] = useState(null);
	const [columnFilters, setColumnFilters] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState([]);

	// useEffect to load data on component mount
	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setColumnFilters(
			selectedFilters.length
				? [{ id: "isResolved", value: selectedFilters.map((filter) => filter === "true")[0] }] //This is very hacky, I don't know why it doesn't work without the [0]
				: []
		);
	}, [selectedFilters]);

	const handleStatusFilterChange = (selection) => {
		setSelectedFilters((prev) => {
				// If a specific role is selected, deselect "All"
				const updatedSelection = prev.includes(selection)
					? prev.filter((r) => r !== selection) // Remove the role if it's already selected
					: [...prev.filter((r) => r !== "All"), selection]; // Add role and ensure "All" is deselected

				// If no specific roles remain selected, fall back to "All"
				return updatedSelection.length < 2 ? updatedSelection : [];
		});
	};

	// Fetch data function
	const fetchData = async () => {
		setLoading(true);
		try {
			const result = await getAllComplaints();
			if (result && result.data) {
				setData(result.data);
			} else {
				setMessage({ type: "error", text: "No data available." });
			}
		} catch (error) {
			setMessage({ type: "error", text: "Failed to load user data." });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full">
			{/* Display the message below the table */}
			<div className="flex items-center gap-6 mb-6">
				<h1 className="text-3xl font-extrabold shrink-0">
					Complaint Management
				</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>

			<div className="flex h-3/4 items-stretch">
				<div className="basis-1/2 h-full">
					{loading ? (
						<TableSkeleton rows={5} cols={4} />
					) : data ? ( // Check if data
						<DataTable
							columns={columns(handleStatusFilterChange, selectedFilters)}
							data={data}
							columnFilters={columnFilters}
							setColumnFilters={setColumnFilters}
							setSelectedComplaint={setSelectedComplaint}
						/>
					) : (
						<div>Unable to get users.</div>
					)}
				</div>
				<div className="max-h-full basis-1/2">
					<ComplaintDetails data={selectedComplaint} refreshData={fetchData} />
				</div>
			</div>
		</div>
	);
}
