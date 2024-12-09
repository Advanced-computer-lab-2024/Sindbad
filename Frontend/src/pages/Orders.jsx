import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { BadgeX } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { viewOrders, cancelOrder } from "@/services/TouristApiHandler";
import { useUser, useCurrency } from "@/state management/userInfo";
import { getSaleById } from "@/services/SaleApiHandler";
import { Convert } from "easy-currencies";

const calculateTotalPrice = async (sales, conversionRate, currency) => {
  let total = 0;
  let convertedTotal = 0;

  for (const saleId of sales) {
    try {
      const sale = await getSaleById(saleId);
      if (sale && sale.totalPrice) {
        total += sale.totalPrice;
      }

      convertedTotal = conversionRate ? await conversionRate.amount(total).to(currency) : total;
    } catch (error) {
      console.error("Error fetching sale:", error);
    }
  }
  return convertedTotal.toFixed(2);
};

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [conversionRate, setConversionRate] = useState(null);
  const { id } = useUser();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await viewOrders(id);
      setOrders(response || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderID) => {
    try {
      await cancelOrder(id, orderID);
      fetchOrders();
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  useEffect(() => {
    if (id) fetchOrders();
  }, [id]);

  // use effect to fetch conversion rates
  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const convert = await Convert().from("USD").fetch();
        setConversionRate(convert);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
        setConversionRate(null);
      }
    };

    fetchConversionRate();
  }, []);

  const currency = useCurrency();

  return (
    <div className="py-8 px-24 max-w-[1200px] mx-auto bg-gradient-to-b from-neutral-200/60 to-light border border-neutral-300 rounded-md">
      {loading ? (
        <div>Loading...</div>
      ) : orders.length === 0 ? (
        <div>
          <h2 className="text-center">No orders found</h2>
        </div>
      ) : (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Order ID</TableHead>
                <TableHead className="text-center">Status</TableHead>{" "}
                <TableHead className="text-center">Details</TableHead>
                <TableHead className="text-center">Total Price</TableHead>
                <TableHead className="text-center">Cancel</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell className="status-column text-center">
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Link
                      to={`/app/orderDetails/${order._id}`}
                      className="text-gray-500 hover:underline"
                    >
                      View Details
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    {order.sales && order.sales.length > 0 ? (
                      <>
                        {order.sales.length > 0 && (
                          <TotalPriceCalculator sales={order.sales} conversionRate={conversionRate} currency={currency} />
                        )}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell className="text-center flex justify-center items-center">
                    {!order.isDelivered && (
                      <BadgeX
                        className="hover:fill-red-500 hover:text-white text-red-500 cursor-pointer"
                        onClick={() => handleCancelOrder(order._id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

const TotalPriceCalculator = ({ sales, conversionRate, currency }) => {
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    const fetchTotalPrice = async () => {
      const total = await calculateTotalPrice(sales, conversionRate, currency);
      setTotalPrice(total);
    };

    fetchTotalPrice();
  }, [sales]);

  return <>{totalPrice !== null ? totalPrice : "Loading..."}</>;
};
