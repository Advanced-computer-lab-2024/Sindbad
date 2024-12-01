import { useState, useEffect } from "react";
import { useCurrency, useUser } from "@/state management/userInfo";
import { Convert } from "easy-currencies";
import TotalRevenue from "@/components/custom/revenue/TotalRevenue";
import UsersPerItem from "@/components/custom/revenue/UsersPerItem";

import { getAllSales, getMySales } from "@/services/SaleApiHandler";
import RevenueLedger from "@/components/custom/revenue/RevenueLedger";

async function convertToCurrency(data, currency) {
  try {
    const convert = await Convert().from("USD").fetch();
    return await Promise.all(
      data.map(async (item) => {
        const rate = await convert.amount(item.revenue).to(currency);
        return { ...item, revenue: rate };
      })
    );
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    return data; // Fallback to original data if conversion fails
  }
}


function RevenueReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const currency = useCurrency();
  const { role, id } = useUser();

  useEffect(() => {
    const fetchAndConvertData = async () => {
      setLoading(true);
      try {
        let result = [];
        switch (role) {
          case "admin":
            result = await getAllSales();
            break;
          case "tourGuide":
            result = await getMySales("itinerary", id);
            break;
          case "seller":
            result = await getMySales("product", id);
            break;
          case "advertiser": {
            let activities = await getMySales("activity", id);
            console.log("activities", activities);
            let trips = await getMySales("trip", id);
            console.log("trips", trips);
            result = activities.concat(trips);
            break;
          }
          default:
            result = [];
        }

        if (result && result.length > 0) {
          const convertedData = await convertToCurrency(result, currency);
          setData(convertedData); // Update state with converted data
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndConvertData();
  }, [role, id, currency]);

  return (
    <div className="py-8 px-24 max-w-[1200px] mx-auto flex flex-col gap-4">
      <div className="flex justify-center w-full gap-4">
        <TotalRevenue data={data} />
        <UsersPerItem data={data} />
      </div>
      <RevenueLedger loading={loading} data={data} />
    </div>
  );
}

export default RevenueReport;
