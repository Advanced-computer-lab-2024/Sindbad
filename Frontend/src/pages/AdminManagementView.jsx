import CategoryManagement from "@/components/custom/admin/CategoryManagement";
import PrivelegeManagement from "@/components/custom/admin/PrivelegeManagement";
import TagManagement from "@/components/custom/admin/TagManagement";
import UserManagement from "@/components/custom/admin/UserManagement";

function AdminManagementView() {
	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-6 mx-auto">
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
