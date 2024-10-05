import TagManagement from "@/components/custom/admin/TagManagement";
import UserManagement from "@/components/custom/admin/UserManagement";

function AdminManagementView() {
	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-6 mx-auto">
			<UserManagement />
			<div className="flex gap-4">
				<div className="col-span-1 flex flex-col gap-6">
					<TagManagement />
				</div>
				<div className="bg-blue-500 h-10 col-span-1">Privileges</div>
			</div>
		</div>
	);
}

export default AdminManagementView;
