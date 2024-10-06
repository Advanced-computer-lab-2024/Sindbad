"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const columns = (handleDeleteTag, handleUpdateTag) => [
	{
		accessorKey: "name",
		header: "Tag",
		cell: ({ row }) => {
			const originalName = row.original.name;
			const [name, setName] = useState(row.original.name);
			const isDirty = name !== originalName;
			const id = row.original._id;

			const handleKeyDown = async (e) => {
				if (e.key === "Enter") {
					try {
						// PUT request to update the tag name
						await handleUpdateTag(id, name);
					} catch (error) {
						console.error("Error updating tag:", error);
					}
				}
			};

			return (
				<Input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					onKeyDown={handleKeyDown}
					className={isDirty ? "bg-secondary-900 text-dark" : ""}
				/>
			);
		},
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const id = row.original._id;

			return (
				<Button
					variant="ghostDestructive"
					className="p-3"
					onClick={() => {
						handleDeleteTag(id);
					}}
				>
					Delete
				</Button>
			);
		},
	},
];
