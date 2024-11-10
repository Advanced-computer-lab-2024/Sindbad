import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

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
		header: "",
		cell: ({ row }) => {
			const userId = row.original._id;
			const role = row.original.role;

			return (
				<Button
					variant="ghostDestructive"
					className="invisible group-hover/row:visible p-3"
					onClick={() => {
						handleDeleteUser(userId, role);
					}}
				>
					<Trash/>
				</Button>
			);
		},
	},
];
