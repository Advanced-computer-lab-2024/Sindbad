import { useState, useEffect } from "react";
import { useCurrency } from "@/state management/userInfo";
import { Convert } from "easy-currencies";
import TotalRevenue from "@/components/custom/revenue/TotalRevenue";
import RevenuePerItem from "@/components/custom/revenue/RevenuePerItem";
import RevenuePerTime from "@/components/custom/revenue/RevenuePerTime";

import { getAllSales, getMySales } from "@/services/SaleApiHandler";
import RevenueLedger from "@/components/custom/revenue/RevenueLedger";

async function convertToCurrency(data, currency) {
  try {
    // Fetch conversion rates with USD as the base currency
    const convert = await Convert().from("USD").fetch();

    // Convert the price to the user's preferred currency
    const convertedData = await Promise.all(
      data.map(async (item) => {
        const rate = await convert.amount(item.revenue).to(currency);
        return { ...item, revenue: rate };
      })
    );
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
  }
}

function RevenueReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const currency = useCurrency();

  useEffect(() => {
    fetchData();
    convertToCurrency(data, currency);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getAllSales();
      if (result) {
        setData(result);
      } else {
        //setMessage({ type: "error", text: "No tags available." });
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      //setMessage({ type: "error", text: "Failed to load tag data." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-24 max-w-[1200px] mx-auto flex flex-col gap-4">
      <div className="flex justify-center w-full gap-4">
        <TotalRevenue data={data} />
        <RevenuePerTime data={data} />
      </div>
      <RevenueLedger loading={loading} data={data} />
    </div>
  );
}

export default RevenueReport;
