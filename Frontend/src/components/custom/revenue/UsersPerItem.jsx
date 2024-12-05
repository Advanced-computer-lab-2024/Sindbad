import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Cell
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  filterAndGroupSalesByItem,
  getAllSales,
} from "@/services/SaleApiHandler";
import { DatePicker } from "../DatePicker";
import { useUser } from "@/state management/userInfo";




// Define color mapping for different types
const typeColorMap = {
  Activity: "hsl(var(--chart-1))", 
  Product: "hsl(var(--chart-2))",
  Itinerary: "hsl(var(--chart-3))", 
  Flight: "hsl(var(--chart-4))", 
  Hotel: "hsl(var(--chart-5))",
  Trip: "hsl(var(--chart-6))", 
  DEFAULT: "hsl(var(--muted-foreground))", // Fallback color
};

const chartConfig = {
  revenue: {
    label: "Revenue",
  },
  label: {
    color: "hsl(var(--background))",
  },
};

function UsersPerItem({data}) {
  const [chartData, setChartData] = useState([]);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
    const { role } = useUser();
    let slice = role === "admin" ? 5 : 9999;

  useEffect(() => {
    const formatData = async () => {
      const salesData = data;
      console.log("salesData", salesData);
      const groupedData = filterAndGroupSalesByItem(salesData, slice, dateRange.from, dateRange.to);
      console.log("groupedData", groupedData);
      const dataWithNames = groupedData.map((item) => {
        const matchingSale = salesData.find(
          (sale) => sale.itemId === item.itemId
        );
        return {
          ...item,
          itemName: matchingSale.itemName,
          itemType: matchingSale.type, // Add item type
        };
      });
      setChartData(dataWithNames);
    };
    formatData();
  }, [dateRange, data, slice]);


  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Item Popularity</CardTitle>
          <DatePicker
            startDate={dateRange.from}
            endDate={dateRange.to}
            setDate={(range) => setDateRange(range)} // Update setDate to accept an object
          />
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={chartConfig} className="h-3/4">
          <BarChart accessibilityLayer data={chartData} layout="vertical">
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="itemName"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 12)}
            />
            <XAxis dataKey="count" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" layout="vertical" radius={4}>
              {chartData.map((entry, index) => {
                const fillColor =
                  typeColorMap[entry.itemType] || typeColorMap.DEFAULT;
                return <Cell key={`cell-${entry.itemName}`} fill={fillColor} />;
              })}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default UsersPerItem;
