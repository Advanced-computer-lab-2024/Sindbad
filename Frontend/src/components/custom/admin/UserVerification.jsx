import { useEffect, useState } from "react";
import TableSkeleton from "../TableSkeleton";
import { DataTable } from "@/components/custom/user-management/data-table";
import { getPendingUsers } from "@/services/UserApiHandler";
import { columns } from "@/components/custom/user-management/columns-verification";

function UserVerification() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

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
        console.log(users);
    }, [users]);

    return (
        <>
            <div className="flex items-center gap-6">
                <h1 className="text-3xl font-extrabold shrink-0">Unaccepted Users</h1>
                <hr className="border-neutral-300 border w-full mt-1.5" />
            </div>
            {loading ? (
                <TableSkeleton rows={5} cols={3} />
            ) : users ? ( // Check if data
                <DataTable columns={columns()} data={users} />
            ) : (
                <div>Unable to get users.</div>
            )}
        </>
    );
}

export default UserVerification;