import ComplaintManagement from "@/components/custom/admin/complaint-management/ComplaintManagement";
import CategoryManagement from "@/components/custom/admin/category-management/CategoryManagement";
import PrivelegeManagement from "@/components/custom/admin/privelege-management/PrivelegeManagement";
import TagManagement from "@/components/custom/admin/tag-management/TagManagement";
import UserManagement from "@/components/custom/admin/user-management/UserManagement";

function AdminManagementView() {
	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-6 mx-auto">
			<ComplaintManagement />
			<UserManagement />
			<div className="flex w-full justify-around gap-4">
				<div className="col-span-1">
					<TagManagement />
				</div>
				<div className="col-span-1 flex flex-col gap-6">
					<CategoryManagement />
				</div>
			</div>
			<PrivelegeManagement />
		</div>
	);
}

export default AdminManagementView;
