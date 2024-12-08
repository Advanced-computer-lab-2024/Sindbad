import { useState } from "react";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const columns = (handleDeleteCategory, handleUpdateCategory) => [
	{
		accessorKey: "name",
		header: "Category",
		cell: ({ row }) => {
			const originalName = row.original.name;
			const [name, setName] = useState(row.original.name);
			const isDirty = name !== originalName;
			const id = row.original._id;

			const handleKeyDown = async (e) => {
				if (e.key === "Enter") {
					try {
						// PUT request to update the category name
						await handleUpdateCategory(id, name);
					} catch (error) {
						console.error("Error updating category:", error);
					}
				}
			};

			return (
				<Input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					onKeyDown={handleKeyDown}
					className={isDirty ? "bg-primary-100 text-dark" : ""}
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
						handleDeleteCategory(id);
					}}
				>
					<Trash />
				</Button>
			);
		},
	},
];
