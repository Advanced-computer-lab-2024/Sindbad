
import { useState, useEffect } from "react";
import { useCurrency } from "@/state management/userInfo";
import TotalRevenue from "@/components/custom/revenue/TotalRevenue";
import RevenuePerItem from "@/components/custom/revenue/RevenuePerItem";
import RevenuePerTime from "@/components/custom/revenue/RevenuePerTime";

import { getAllSales, getMySales } from "@/services/SaleApiHandler";
import RevenueLedger from "@/components/custom/revenue/RevenueLedger";

function RevenueReport() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const currency = useCurrency();
    const [convertedPrice, setConvertedPrice] = useState(null);

    	useEffect(() => {
        fetchData();
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
