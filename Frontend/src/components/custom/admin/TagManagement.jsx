import { DataTable } from "@/components/custom/tag-management/data-table";
import { useState, useEffect } from "react";
import { columns } from "@/components/custom/tag-management/columns";
import {
	getAllTags,
	createTag,
	updateTag,
	deleteTag,
} from "@/services/AdminApiHandler";
import TableSkeleton from "../TableSkeleton";

// TagManagement Component
export default function TagManagement() {
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
			const result = await getAllTags();
			if (result && result.data) {
				setData(result.data);
			} else {
				setMessage({ type: "error", text: "No tags available." });
			}
		} catch (error) {
			setMessage({ type: "error", text: "Failed to load tag data." });
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteTag = async (tagId) => {
		try {
			await deleteTag(tagId);
			setMessage({ type: "success", text: "Tag deleted successfully." });
			await fetchData(); // Refresh the data after deletion
		} catch (error) {
			console.error("Failed to delete tag:", error);
			setMessage({ type: "error", text: "Failed to delete tag." });
		}
	};

	const handleUpdateTag = async (tagId, name) => {
		try {
			await updateTag({ id: tagId, name });
			setMessage({ type: "success", text: "Tag updated successfully." });
			await fetchData(); // Refresh the data after update
		} catch (error) {
			console.error("Failed to update tag:", error);
			setMessage({ type: "error", text: "Failed to update tag." });
		}
	};

	const handleCreateTag = async (name) => {
		try {
			await createTag({ name });
			setMessage({ type: "success", text: "Tag created successfully." });
			await fetchData(); // Refresh the data after creation
		} catch (error) {
			console.error("Failed to create tag:", error);
			setMessage({ type: "error", text: "Failed to create tag." });
		}
	};

	return (
		<>
			<div className="flex items-center gap-6">
				<h1 className="text-3xl font-extrabold">Tags</h1>
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

			{/* Conditional rendering based on loading, error, and data state */}
			{loading ? (
				<TableSkeleton rows={3} cols={2} />
			) : data ? (
				<DataTable
					columns={columns(handleDeleteTag, handleUpdateTag)}
					data={data}
					handleCreateTag={handleCreateTag}
				/>
			) : (
				<div>Unable to get tags.</div> // Message when no data is available
			)}
		</>
	);
}
