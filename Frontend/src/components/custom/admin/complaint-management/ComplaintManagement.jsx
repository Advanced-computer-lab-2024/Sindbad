import { useState, useEffect } from "react";

import TableSkeleton from "@/components/custom/TableSkeleton";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "./data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { columns } from "./columns";

import { getAllComplaints } from "@/services/ComplaintApiHandler";

function IsResolvedCheckbox() {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox id="isResolved" />
			<label
				htmlFor="isResolved"
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Resolved
			</label>
		</div>
	);
}

export default function UserManagement() {
	// State management for data, loading, and message
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState(null); // message replaces error
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
		<>
			{/* Display the message below the table */}
			<div className="flex items-center gap-6">
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
							columns={columns(
								handleStatusFilterChange,
								selectedFilters
							)}
							data={data}
							columnFilters={columnFilters}
							setColumnFilters={setColumnFilters}
						/>
					) : (
						<div>Unable to get users.</div>
					)}
				</div>
				<ScrollArea className="max-h-full basis-1/2">
					<div className="flex flex-col bg-background rounded-r-md gap-2 p-3 justify-center">
						<h1 className="text-xl font-bold">Title</h1>
						<h3 className="text-muted-foreground italic">User</h3>
						<Separator />
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
						<Separator />
						<h3 className="font-bold">Response</h3>
						<Textarea />
						<div className="flex gap-32 justify-center">
							<IsResolvedCheckbox />
							<Button>Submit</Button>
						</div>
					</div>
				</ScrollArea>
			</div>
		</>
	);
}
