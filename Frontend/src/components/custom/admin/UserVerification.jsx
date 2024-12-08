import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableSkeleton from "../TableSkeleton";
import { DataTable } from "./user-management/data-table";
import { getPendingUsers } from "@/services/UserApiHandler";
import { columns } from "./user-management/columns-verification";

function UserVerification() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [columnFilters, setColumnFilters] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState(["All"]);

    const navigate = useNavigate();

    const getUsers = async () => {
        setLoading(true);
        const response = await getPendingUsers();
        setLoading(false);
        if (response.error) {
            setError(true);
            console.error(response.message);
        } else {
            setUsers(response);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        setColumnFilters(
            selectedRoles.length
                ? [{ id: "role", value: selectedRoles }]
                : []
        );
        console.log(columnFilters);
    }, [selectedRoles]);

    const handleRoleFilterChange = (role) => {
        setSelectedRoles((prev) => {
            if (role === "All") {
                // Select only "All" and clear any other selected roles
                return prev.includes("All") ? [] : ["All"];
            } else {
                // If a specific role is selected, deselect "All"
                const updatedRoles = prev.includes(role)
                    ? prev.filter((r) => r !== role) // Remove the role if it's already selected
                    : [...prev.filter((r) => r !== "All"), role]; // Add role and ensure "All" is deselected

                // If no specific roles remain selected, fall back to "All"
                return updatedRoles.length ? updatedRoles : ["All"];
            }
        });
    };

    return (
        <div className="w-full">
            <div className="flex items-center gap-6 mb-6">
                <h1 className="text-3xl font-extrabold shrink-0">Unaccepted Users</h1>
                <hr className="border-neutral-300 border w-full mt-1.5" />
            </div>
            {loading ? (
                <TableSkeleton rows={5} cols={3} />
            ) : users && users.length ? (
                <DataTable
                    columns={columns(handleRoleFilterChange, selectedRoles, navigate)}
                    data={users}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                />
            ) : (
                <div>No users found.</div>
            )}
        </div>
    );
}

export default UserVerification;
