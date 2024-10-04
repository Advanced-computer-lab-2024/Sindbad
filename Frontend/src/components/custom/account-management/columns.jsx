"use client";
import { Button } from "@/components/ui/button";


export const columns = [
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
			return (
					<Button variant="ghostDestructive" className="p-3">
						Delete
					</Button>
			);
		},
	},
];
