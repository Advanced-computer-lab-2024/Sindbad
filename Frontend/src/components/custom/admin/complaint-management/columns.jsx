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
	{
		accessorKey: "createdAt",
		header: "Date",
		cell: ({ row }) => {
			const date = new Date(row.original.createdAt);
			const formattedDate = date.toLocaleDateString("en-US", {
				year: "numeric",
				month: "numeric",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			});
			return <span>{formattedDate}</span>;
		},
	},
];
