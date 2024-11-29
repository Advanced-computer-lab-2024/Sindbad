import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Bar, BarChart } from "recharts";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";

function groupByDay(data) {
  if (!data) return [];

  // Create an object to store daily revenues
  const groupedData = {};

  // Iterate through the data
  data.forEach((item) => {
    // Extract the year, month, and day from the date
    const date = new Date(item.date);
    const yearDay = date.toISOString().split("T")[0]; // e.g., "2024-11-26"

    // Add revenue to the corresponding day
    if (!groupedData[yearDay]) {
      groupedData[yearDay] = 0; // Initialize if not already present
    }
    groupedData[yearDay] += item.revenue;
  });

  // Convert the grouped data into an array with timestamps as the date and revenue
  return Object.entries(groupedData).map(([date, revenue]) => ({
    // Convert the date to timestamp
    date: new Date(date).getTime(),
    revenue,
  }));
}



function TotalRevenue({data}) {

  console.log(data);

  let chartData = data?.map((item) => ({
    date: new Date(item.createdAt).getTime(), // Convert the date to a timestamp
    revenue: item.revenue,
  }));

  chartData = groupByDay(chartData);

  console.log(chartData);

  const chartConfig = {
    revenue: {
      label: "Revenue",
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              scale="time"
              type="number"
              domain={["dataMin", "dataMax"]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area dataKey="revenue" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default TotalRevenue;