import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/state management/userInfo";

function AdminManagementView() {
	const location = useLocation();
	const navigate = useNavigate();
	const currentPath = location.pathname.split("/").pop();
	const { role } = useUser();

	if (role !== "admin") {
		return (
			<div className="py-8 px-24 max-w-[1200px] flex gap-9 mx-auto">
				<div className="flex justify-center w-full">
					<p className="text-neutral-400 text-sm italic">
						You are not authorised to view this page.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="py-8 px-24 max-w-[1200px] flex gap-6 mx-auto">
			<Tabs value={currentPath} className="w-[220px] shrink-0">
				<TabsList className="flex w-full border flex-col h-[500px] justify-start">
					<TabsTrigger className="w-full" value="users" onClick={() => navigate("users")}>Users</TabsTrigger>
					<TabsTrigger className="w-full" value="verification" onClick={() => navigate("verification")}>Verification</TabsTrigger>
					<TabsTrigger className="w-full" value="priveleges" onClick={() => navigate("priveleges")}>Priveleges</TabsTrigger>
					<TabsTrigger className="w-full" value="complaints" onClick={() => navigate("complaints")}>Complaints</TabsTrigger>
					<TabsTrigger className="w-full" value="tagcategories" onClick={() => navigate("tagcategories")}>Tags & Categories</TabsTrigger>
					<TabsTrigger className="w-full" value="deletion-requests" onClick={() => navigate("deletion-requests")}>Deletion Requests</TabsTrigger>
					<TabsTrigger className="w-full" value="promocodes" onClick={() => navigate("promocodes")}> Promo-Codes</TabsTrigger>
				</TabsList>
			</Tabs>
			<Outlet />
		</div>
	);
}

export default AdminManagementView;
