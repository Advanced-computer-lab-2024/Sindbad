import { useState, useEffect } from "react";

import TableSkeleton from "@/components/custom/TableSkeleton";
import { DataTable } from "./data-table";
import { columns } from "./columns";

import { getAllUsers, deleteUser } from "@/services/AdminApiHandler";

// UserManagement Component
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
			const result = await getAllUsers();
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

	const handleDeleteUser = async (userId, role) => {
		try {
			await deleteUser(userId, role);
			setMessage({ type: "success", text: "User deleted successfully." });
			await fetchData(); // Refresh the data after deletion
		} catch (error) {
			console.error("Failed to delete user:", error);
			setMessage({ type: "error", text: "Failed to delete user." });
		}
	};

	return (
		<>
			{/* Display the message below the table */}
			<div className="flex items-center gap-6">
				<h1 className="text-3xl font-extrabold shrink-0">User Management</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>

			{message && (
				<div
					className={`p-2 rounded-lg ${
						message.type === "error"
							? "bg-destructive text-light"
							: "bg-secondary text-dark"
					}`}
				>
					{message.text}
				</div>
			)}

			{loading ? (
				<TableSkeleton rows={5} cols={4} />
			) : data ? ( // Check if data
				<DataTable columns={columns(handleDeleteUser)} data={data} />
			) : (
				<div>Unable to get users.</div>
			)}
		</>
	);
}
