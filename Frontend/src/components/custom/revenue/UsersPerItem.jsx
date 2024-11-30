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
  groupByItemAndSumRevenue,
  getAllSales,
} from "@/services/SaleApiHandler";

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

function UsersPerItem() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const salesData = await getAllSales();
      const groupedData = groupByItemAndSumRevenue(salesData, 5);
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
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Item Popularity</CardTitle>
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
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {/* <Bar dataKey="revenue" layout="vertical" radius={4}>
              {chartData.map((entry, index) => {
                const fillColor =
                  typeColorMap[entry.itemType] || typeColorMap.DEFAULT;
                return <Cell key={`cell-${index}`} fill={fillColor} />;
              })}
            </Bar> */}
            <Bar dataKey="count" layout="vertical" radius={4}>
              {chartData.map((entry, index) => {
                const fillColor =
                  typeColorMap[entry.itemType] || typeColorMap.DEFAULT;
                return <Cell key={`cell-${index}`} fill={fillColor} />;
              })}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default UsersPerItem;
