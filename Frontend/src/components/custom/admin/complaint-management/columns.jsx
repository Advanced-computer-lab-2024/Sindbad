import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";

export const columns = () => [
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "isResolved",
		header: "Status",
		cell: ({ row }) => {
			return (
				<Badge variant={row.original.isResolved ? "dark" : "outline"}>
					{row.original.isResolved ? "Resolved" : "Pending"}
				</Badge>
			);
		},
	},
];
