import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Booking() {
	const location = useLocation();
	const navigate = useNavigate();
	const currentPath = location.pathname.split("/").pop();

	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-6 mx-auto">
			<Tabs value={currentPath}>
				<TabsList className="flex w-full border">
					<TabsTrigger value="hotel" onClick={() => navigate("hotel")}>
						Hotel Booking
					</TabsTrigger>
					<TabsTrigger value="flight" onClick={() => navigate("flight")}>
						Flight Booking
					</TabsTrigger>
				</TabsList>
			</Tabs>
			<Outlet />
		</div>
	);
}

export default Booking;
