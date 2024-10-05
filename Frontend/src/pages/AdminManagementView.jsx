import UserManagement from "@/components/custom/admin/UserManagement";

function AdminManagementView() {

	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-6 mx-auto">
			<UserManagement />			
		</div>
	);
}

export default AdminManagementView;
