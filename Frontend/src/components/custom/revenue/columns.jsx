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
      <Badge
        variant="dark"
        className={getBadgeColor(getValue())}
      >
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
  },
];
