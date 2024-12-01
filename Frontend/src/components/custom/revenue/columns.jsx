import { Badge } from "@/components/ui/badge";

// Function to determine badge color based on value
const getBadgeColor = (value) => {
  switch (value) {
    case "Activity":
      return "bg-chart-1";
    case "Product":
      return "bg-chart-2";
    case "Itinerary":
      return "bg-chart-3";
    case "Flight":
      return "bg-chart-4";
    case "Hotel":
      return "bg-chart-5";
    case "Trip":
      return "bg-chart-6";
    default:
      return "bg-gray-900";
  }
};

export const columns = (currency) => [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ getValue }) => (
      <Badge variant="dark" className={getBadgeColor(getValue())}>
        {getValue()}
      </Badge>
    ),
  },
  {
    accessorKey: "itemName",
    header: "Item",
    filterFn: "includesString",
  },
  {
    accessorKey: "revenue",
    header: `Revenue (${currency})`,
    cell: ({ getValue }) => `${parseFloat(getValue()).toFixed(2)} `,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
    filterFn: (row, columnId, filterValue) => {
      console.log("filterValue", filterValue);
      const date = new Date(row.getValue(columnId));
      const fromDate = filterValue?.from
        ? new Date(filterValue.from).setHours(0, 0, 0, 0)
        : null;
      const toDate = filterValue?.to
        ? new Date(filterValue.to).setHours(23, 59, 59, 999)
        : null;
      const itemDate = date.setHours(0, 0, 0, 0); // Normalize item date for comparison

      // Case 1: No filters (both from and to are null)
      if (!fromDate && !toDate) {
        return true;
      }

      // Case 2: Only fromDate is set (return items from that specific date)
      if (fromDate && !toDate) {
        return itemDate === fromDate; // Return items exactly on fromDate
      }

      // Case 3: Both fromDate and toDate are set (range filtering)
      return (
        (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate)
      );
    },
  },
];
