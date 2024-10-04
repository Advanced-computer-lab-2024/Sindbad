"use client";
import { Button } from "@/components/ui/button";
export const columns = (handleDeleteUser) => [
	{
		accessorKey: "username",
		header: "Username",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "role",
		header: "Role",
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const userId = row.original._id;
			const role = row.original.role;

			return (
				<Button
					variant="ghostDestructive"
					className="p-3"
					onClick={() => {
						console.log(userId, role);
						handleDeleteUser(userId, role);
					}}
				>
					Delete
				</Button>
			);
		},
	},
];
