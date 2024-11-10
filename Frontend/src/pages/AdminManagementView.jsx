import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AdminManagementView() {
	const location = useLocation();
	const navigate = useNavigate();
	const currentPath = location.pathname.split("/").pop();

	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-6 mx-auto">
			<Tabs value={currentPath}>
				<TabsList className="flex w-full border">
					<TabsTrigger value="users" onClick={() => navigate("users")}>Users</TabsTrigger>
					<TabsTrigger value="verification" onClick={() => navigate("verification")}>Verification</TabsTrigger>
					<TabsTrigger value="complaints" onClick={() => navigate("complaints")}>Complaints</TabsTrigger>
					<TabsTrigger value="tagcategories" onClick={() => navigate("tagcategories")}>Tags & Categories</TabsTrigger>
				</TabsList>
			</Tabs>
			<Outlet />
		</div>
	);
}

export default AdminManagementView;
