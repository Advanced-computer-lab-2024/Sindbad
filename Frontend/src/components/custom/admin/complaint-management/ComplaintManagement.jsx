import { useState, useEffect } from "react";

import TableSkeleton from "@/components/custom/TableSkeleton";
import { DataTable } from "./data-table";
import { columns } from "./columns";

import { getAllComplaints } from "@/services/ComplaintApiHandler";

export default function UserManagement() {
	// State management for data, loading, and message
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState(null); // message replaces error

	// useEffect to load data on component mount
	useEffect(() => {
		fetchData();
	}, []);

	// Fetch data function
	const fetchData = async () => {
		setLoading(true);
		try {
			const result = await getAllComplaints();
			if (result && result.data) {
				console.log(result.data);
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

			<div className="flex items-center">
				<div className="basis-1/2">
					{loading ? (
						<TableSkeleton rows={5} cols={4} />
					) : data ? ( // Check if data
						<DataTable columns={columns()} data={data} />
					) : (
						<div>Unable to get users.</div>
					)}
				</div>
				<div className="flex flex-col h-full bg-zinc-300 p-3 justify-center basis-1/2">
                    <h1>Title</h1>
                    <h3>User</h3>
                    <p>Body</p>
                </div>
			</div>
		</>
	);
}
