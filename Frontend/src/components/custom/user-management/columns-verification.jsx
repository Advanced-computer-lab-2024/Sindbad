import { Button } from "@/components/ui/button";
import { ArrowUpDown, Filter } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

export const columns = () => [
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
        header: ({ column }) => {
            return (
                // <Button
                //     variant="ghost"
                //     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                // >
                //     Role
                //     <Filter className="ml-2 h-4 w-4" />
                // </Button>
                <DropdownMenu onOpenChange={(open) => console.log(open)} modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            Role
                            <Filter className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="ml-12">
                        <DropdownMenuCheckboxItem value="advertiser">Advertiser</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem value="seller">Seller</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem value="tourguide">Tour Guide</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
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
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt);
            return (
                <p>
                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </p>
            );
        },
    },
    {
        header: "Profile",
        cell: ({ row }) => {
            return (
                <Button
                    variant="ghostDestructive"
                    className="p-3"
                    onClick={() => {
                        console.log(row.original);
                    }}
                >
                    View Profile
                </Button>
            );
        },
    },
];
