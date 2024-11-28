import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import { useCurrency } from "@/state management/userInfo";



function RevenueReport() {

    const chartData = [
      { month: "January", desktop: 186 },
      { month: "February", desktop: 305 },
      { month: "March", desktop: 237 },
      { month: "April", desktop: 73 },
      { month: "May", desktop: 209 },
      { month: "June", desktop: 214 },
    ];

    const currency = useCurrency();
    const [convertedPrice, setConvertedPrice] = useState(null);

    return (
      <div className="py-8 px-24 max-w-[1200px] mx-auto">
        <div className="flex justify-center gap-4">
          <Card >
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card >
            <CardHeader>
              <CardTitle>Activity Revenue</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card >
            <CardHeader>
              <CardTitle>Month Revenue</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>

      </div>
    );
}

export default RevenueReport;
