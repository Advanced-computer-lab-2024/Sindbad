import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useCurrency } from "@/state management/userInfo";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { Bar, BarChart, Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { TrendingUp, TrendingDown } from "lucide-react";

import {
  groupByDay,
  calculateTotalSum,
  calculateRevenueTrend,
} from "@/services/SaleApiHandler";

function TotalRevenue({ data }) {
  console.log(data);
  const currency = useCurrency();

  let chartData = data?.map((item) => ({
    date: new Date(item.createdAt).getTime(),
    revenue: item.revenue,
  }));

  let totalSum = calculateTotalSum(chartData);
  let trend = calculateRevenueTrend(chartData);
  chartData = groupByDay(chartData);

  console.log(chartData);

  const chartConfig = {
    revenue: {
      label: "Revenue",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
      </CardHeader>
      <CardDescription className="px-9 text-black">
        <p className="text-3xl font-semibold">
          {totalSum}
          <span className="text-xl font-medium"> {currency}</span>
        </p>
        <p className={`inline-flex items-center`}>
          {trend >= 0 ? (
            <TrendingUp size={16} className="mr-1" />
          ) : (
            <TrendingDown size={16} className="mr-1" />
          )}
          {trend > 0 ? "+" : ""}
          {trend}
          {currency}
          &nbsp;from last year
        </p>
      </CardDescription>
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