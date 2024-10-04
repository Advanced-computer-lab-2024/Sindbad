import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/custom/account-management/columns";
import { getAllUsers } from "@/services/AdminApiHandler";

const data = //getAllUsers();
[
    {
        "username": "moskitoAdvertiser",
        "email": "moskito@email.com",
        "role": "advertiser"
    },
    {
        "username": "moskitoAdmin",
        "email": "admin@email.com",
        "role": "admin"
    }
];

function AccountManagementView() {
      return (
				<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-6 mx-auto">
					<div className="flex items-center gap-6">
						<h1 className="text-3xl font-extrabold">Account Management</h1>
						<hr className="border-neutral-700 border w-full mt-1.5" />
					</div>
					<DataTable columns={columns} data={data} />
				</div>
			);
}

export default AccountManagementView;