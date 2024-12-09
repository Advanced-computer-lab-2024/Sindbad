import { useState, useEffect } from "react";

import TableSkeleton from "@/components/custom/TableSkeleton";
import { DataTable } from "./data-table";
import { columns } from "./columns";

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/AdminApiHandler";
import { useToast } from "@/hooks/use-toast";

// CategoryManagement Component
export default function CategoryManagement() {
  // State management for data, loading, and message
  const { toast } = useToast();
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
      const result = await getAllCategories();
      if (result && result.data) {
        setData(result.data);
      } else {
        setMessage({ type: "error", text: "No categories available." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load category data." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setMessage({ type: "success", text: "Category deleted successfully." });
      toast({
        description: "Category deleted successfully.",
      });
      await fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error("Failed to delete category:", error);
      setMessage({ type: "error", text: "Failed to delete category." });
      toast({
        description: "Failed to delete category.",
      });
    }
  };

  const handleUpdateCategory = async (categoryId, name) => {
    try {
      await updateCategory({ id: categoryId, name });
      setMessage({ type: "success", text: "Category updated successfully." });
      toast({
        description: "Category updated successfully.",
      });
      await fetchData(); // Refresh the data after update
    } catch (error) {
      console.error("Failed to update category:", error);
      setMessage({ type: "error", text: "Failed to update category." });
      toast({
        description: "Failed to update category.",
      });
    }
  };

  const handleCreateCategory = async (name) => {
    try {
      await createCategory({ name });
      setMessage({ type: "success", text: "Category created successfully." });
      toast({
        description: "Category created successfully.",
      });
      await fetchData(); // Refresh the data after creation
    } catch (error) {
      console.error("Failed to create category:", error);
      setMessage({ type: "error", text: "Failed to create category." });
      toast({
        description: "Failed to create category.",
      });
    }
  };

  return (
    <>
      <div className="flex items-center gap-6">
        <h1 className="text-3xl font-extrabold">Categories</h1>
        <hr className="border-neutral-300 border w-full mt-1.5" />
      </div>

      {/* Conditional rendering based on loading, error, and data state */}
      {loading ? (
        <TableSkeleton rows={3} cols={2} />
      ) : data ? ( // Check if data is not null
        <DataTable
          columns={columns(handleDeleteCategory, handleUpdateCategory)}
          data={data}
          handleCreateCategory={handleCreateCategory}
        />
      ) : (
        <div>Unable to get categories.</div> // Message when no data is available
      )}
    </>
  );
}
