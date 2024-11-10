import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Filter } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
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
    {
        accessorKey: "body",
		header: "Body",
		cell: ({ row }) => {
			return (
				<span style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
					{row.original.body}
				</span>
			);
		},

    }
];