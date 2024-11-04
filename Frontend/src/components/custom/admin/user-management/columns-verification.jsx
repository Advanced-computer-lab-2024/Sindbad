import { Button } from "@/components/ui/button";
import { ArrowUpDown, Filter } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

export const columns = (handleRoleFilterChange, selectedRoles, navigate) => [
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
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-0">
                            Role
                            <Filter className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="ml-12">
                        <DropdownMenuCheckboxItem
                            value="All"
                            checked={selectedRoles.includes("All")}
                            onCheckedChange={() => handleRoleFilterChange("All")}
                        >
                            All
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            value="Advertiser"
                            checked={selectedRoles.includes("Advertiser")}
                            onCheckedChange={() => handleRoleFilterChange("Advertiser")}
                        >
                            Advertiser
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            value="Seller"
                            checked={selectedRoles.includes("Seller")}
                            onCheckedChange={() => handleRoleFilterChange("Seller")}
                        >
                            Seller
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            value="Tour Guide"
                            checked={selectedRoles.includes("Tour Guide")}
                            onCheckedChange={() => handleRoleFilterChange("Tour Guide")}
                        >
                            Tour Guide
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        filterFn: (row, columnId, filterValue) => {
            // If "All" is selected, return true for all rows
            if (filterValue.includes("All")) return true;
            // Otherwise, check if the role is in the selected roles
            return filterValue.includes(row.getValue(columnId));
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="p-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
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
                        navigate(`/app/profile/${row.original._id}`);
                    }}
                >
                    View Profile
                </Button>
            );
        },
    },
];
