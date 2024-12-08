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
import { useUser } from "@/state management/userInfo";
import { getSaleById } from "@/services/SaleApiHandler";

const calculateTotalPrice = async (sales) => {
  let total = 0;
  for (const saleId of sales) {
    try {
      const sale = await getSaleById(saleId);
      if (sale && sale.totalPrice) {
        total += sale.totalPrice;
      }
    } catch (error) {
      console.error("Error fetching sale:", error);
    }
  }
  return total.toFixed(2);
};

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
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
                          <TotalPriceCalculator sales={order.sales} />
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

const TotalPriceCalculator = ({ sales }) => {
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    const fetchTotalPrice = async () => {
      const total = await calculateTotalPrice(sales);
      setTotalPrice(total);
    };

    fetchTotalPrice();
  }, [sales]);

  return <>{totalPrice !== null ? totalPrice : "Loading..."}</>;
};
