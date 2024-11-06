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
        header:({ column }) => {
            return(
                <DropdownMenu onOpenChange={(open) => console.log(open)} modal={false}>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">
							Status
							<Filter className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" className="ml-12">
						<DropdownMenuCheckboxItem value="true">
							Resolved
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem value="false">
							Pending
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
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
		header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
    }
];