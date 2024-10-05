import { DataTable } from "@/components/custom/user-management/data-table";
import { useState, useEffect } from "react";
import { columns } from "@/components/custom/user-management/columns";
import { getAllUsers } from "@/services/AdminApiHandler";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteUser } from "@/services/AdminApiHandler";

// TableSkeleton Component (For Loading State)
function TableSkeleton(rows = 5, cols = 4) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{Array.from({ length: cols }).map((_, j) => (
						<TableHead key={j} className="w-[100px]">
							<Skeleton className="w-full h-4" />
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{Array.from({ length: rows }).map((_, i) => (
					<TableRow key={i}>
						{Array.from({ length: cols }).map((_, j) => (
							<TableCell key={j}>
								<Skeleton className="w-24 h-4" />
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

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
			setData(result.data);
			setLoading(false);
		} catch (error) {
			setMessage({ type: "error", text: "Failed to load user data." });
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

	console.log(data);

	return (
		<>
			{/* Display the message below the table */}

			<div className="flex items-center gap-6">
				<h1 className="text-3xl font-extrabold">User Management</h1>
				<hr className="border-neutral-700 border w-full mt-1.5" />
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

			{/* Conditional rendering based on loading state */}
			{loading ? (
				<TableSkeleton />
			) : (
				<DataTable columns={columns(handleDeleteUser)} data={data} />
			)}
		</>
	);
}
