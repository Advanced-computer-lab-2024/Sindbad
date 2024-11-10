import TagManagement from "@/components/custom/admin/tag-management/TagManagement";
import CategoryManagement from "@/components/custom/admin/category-management/CategoryManagement";

function TagCategoryManagement() {
    return(
        <div className="flex w-full justify-around gap-4">
            <div className="col-span-1">
                <TagManagement />
            </div>
            <div className="col-span-1 flex flex-col gap-6">
                <CategoryManagement />
            </div>
        </div>
    );
};

export default TagCategoryManagement;