import TableSkeleton from "@/components/custom/TableSkeleton";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function RevenueLedger({loading, data}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <h1 className="text-3xl font-extrabold">Ledger</h1>
        <hr className="border-neutral-300 border w-full mt-1.5" />
      </div>

      {/* Conditional rendering based on loading, error, and data state */}
      {loading ? (
        <TableSkeleton rows={3} cols={2} />
      ) : data ? (
        <DataTable
          columns={columns()}
          data={data}
        />
      ) : (
        <div>Unable to get tags.</div> // Message when no data is available
      )}
    </div>
  );
}
