import { DataTable } from "@/components/ui/data-table";
import { useState, useEffect } from "react";
import { columns } from "@/components/custom/account-management/columns";
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
	// State management for data, loading and error
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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
			setError("Failed to load user data.");
			setLoading(false);
		}
	};

	const handleDeleteUser = async (userId, role) => {
		try {
			await deleteUser(userId, role);
			await fetchData(); // Refresh the data after deletion
		} catch (error) {
			console.error("Failed to delete user:", error);
			setError("Failed to delete user.");
		}
	};

	console.log(data);

	return (
		<>
			<div className="flex items-center gap-6">
				<h1 className="text-3xl font-extrabold">User Management</h1>
				<hr className="border-neutral-700 border w-full mt-1.5" />
			</div>

			{/* Conditional rendering based on loading and error states */}
			{loading ? (
				<TableSkeleton />
			) : error ? (
				<div>Error: {error}</div>
			) : (
				<DataTable columns={columns(handleDeleteUser)} data={data} />
			)}
		</>
	);
}
