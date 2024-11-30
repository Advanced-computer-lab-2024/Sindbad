export const columns = (currency) => [
  {
    accessorKey: "type",
    header: "Type",
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
