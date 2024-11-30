import TableSkeleton from "@/components/custom/TableSkeleton";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useCurrency } from "@/state management/userInfo";

export default function RevenueLedger({loading, data}) {

  const [search, setSearch] = useState("");
  const currency = useCurrency();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <h1 className="text-3xl font-extrabold">Ledger</h1>
        <hr className="border-neutral-300 border w-full mt-1.5" />
        <Input placeholder="Search..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      {/* Conditional rendering based on loading, error, and data state */}
      {loading ? (
        <TableSkeleton rows={3} cols={2} />
      ) : data ? (
        <DataTable
          columns={columns(currency)}
          data={data}
          search={search}
        />
      ) : (
        <div>Unable to get tags.</div> // Message when no data is available
      )}
    </div>
  );
}
