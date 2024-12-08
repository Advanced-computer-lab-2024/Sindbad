import { useState, useEffect } from "react";

import TableSkeleton from "@/components/custom/TableSkeleton";
import { DataTable } from "./data-table";
import { columns } from "./columns";

import { getAllUsers, deleteUser } from "@/services/AdminApiHandler";
import { DatePicker } from "../../DatePicker";

// UserManagement Component
export default function UserManagement() {
  // State management for data, loading, and message
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null); // message replaces error
  // useEffect to load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data function
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getAllUsers();
      if (result && result.data) {
        setData(result.data);
      } else {
        setMessage({ type: "error", text: "No data available." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load user data." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, role) => {
    try {
      await deleteUser(userId, role);
      setMessage({ type: "success", text: "User deleted successfully." });
      await fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error("Failed to delete user:", error);
      setMessage({ type: "error", text: "Failed to delete user." });
    }
  };

  const getCurrentMonthRange = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { from: startOfMonth, to: endOfMonth };
  };

	const [dateRange, setDateRange] = useState(getCurrentMonthRange());


  const getTotalUsers = () => {
    if (data) {
      return data.length;
    }
    return 0;
  };

  const getNewUsersInDateRange = () => {
    if (data) {
      return data.filter((user) => {
        const createdAt = new Date(user.createdAt).setHours(0, 0, 0, 0); // Normalize the user creation date
        const fromDate = dateRange?.from
          ? new Date(dateRange.from).setHours(0, 0, 0, 0)
          : null;
        const toDate = dateRange?.to
          ? new Date(dateRange.to).setHours(23, 59, 59, 999)
          : null;

        // Case 1: No date range filters
        if (!fromDate && !toDate) return true;

        // Case 2: Only fromDate is set (filter for exact date)
        if (fromDate && !toDate) return createdAt === fromDate;

        // Case 3: Both fromDate and toDate are set (date range filter)
        return (
          (!fromDate || createdAt >= fromDate) &&
          (!toDate || createdAt <= toDate)
        );
      }).length; // Return the count of filtered users
    }

    return 0;
  };

  let totalUsers = getTotalUsers();
  let newUsers = getNewUsersInDateRange();

  return (
    <div className="w-full">
      <div className="flex items-center gap-6 mb-6">
        <h1 className="text-3xl font-extrabold shrink-0">Users</h1>
        <hr className="border-neutral-300 border w-full mt-1.5" />
        <div className="shrink-0 flex items-center border rounded-md p-1 justify-center gap-2">
          <h1 className="text-base">
            <span className="font-bold">{totalUsers}</span> total users
          </h1>
          {/* Vertical Divider */}
          <div className="h-6 w-px bg-neutral-300"></div>
          <h1 className="text-base">
            <span className="font-bold">{newUsers}</span> new users on
          </h1>
          <DatePicker
            startDate={dateRange.from}
            endDate={dateRange.to}
            setDate={(range) => setDateRange(range)}
            clear = {false}
          />
        </div>
      </div>

      {message && (
        <div
          className={`p-2 rounded-lg ${
            message.type === "error"
              ? "bg-destructive text-light"
              : "bg-secondary text-dark"
          }`}
        >
          {message.text}
        </div>
      )}
      {loading ? (
        <TableSkeleton rows={5} cols={4} />
      ) : data ? ( // Check if data
        <DataTable columns={columns(handleDeleteUser)} data={data} />
      ) : (
        <div>Unable to get users.</div>
      )}
    </div>
  );
}
