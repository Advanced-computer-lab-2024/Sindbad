import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { viewOrderDetails } from "@/services/TouristApiHandler";
import { useCurrency, useUser } from "@/state management/userInfo";
import { Convert } from "easy-currencies";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "@/services/ProductApiHandler";

export const OrdersView = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [conversionRate, setConversionRate] = useState(null);
  const [convertedPrices, setConvertedPrices] = useState({});
  const [productDetails, setProductDetails] = useState({}); // To store product details by productId
  const { id } = useUser();
  const currency = useCurrency();
  const navigate = useNavigate();

  const fetchConversionRate = async () => {
    try {
      const convert = await Convert().from("USD").fetch();
      setConversionRate(convert);
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
      setConversionRate(null);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const response = await viewOrderDetails(id, orderId);
      if (response && response.cart) {
        setOrderDetails(response);
        await fetchProductDetails(response.cart);
      } else {
        console.error(
          "Order details response is not in expected format",
          response
        );
        setOrderDetails(null);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setOrderDetails(null);
    }
  };

  const fetchProductDetails = async (cart) => {
    const updatedProductDetails = {};
    for (const item of cart) {
      try {
        const productData = await getProductById(item.productID);
        updatedProductDetails[item.productID] = productData; // Store product data by productID
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
    setProductDetails(updatedProductDetails);
  };

  const calculateConvertedPrices = async (orderItems) => {
    if (!conversionRate || Object.keys(productDetails).length === 0) return;

    const updatedPrices = {};
    for (const item of orderItems) {
      const product = productDetails[item.productID];
      if (product) {
        const totalPrice = product.price * item.quantity;
        updatedPrices[item.productID] = await conversionRate
          .amount(totalPrice)
          .to(currency);
      }
    }
    setConvertedPrices(updatedPrices);
  };

  useEffect(() => {
    fetchConversionRate();
    if (id && orderId) fetchOrderDetails();
  }, [id, orderId]);

  useEffect(() => {
    if (orderDetails && orderDetails.cart && conversionRate) {
      calculateConvertedPrices(orderDetails.cart);
    }
  }, [orderDetails, conversionRate, productDetails]);

  const handleProductClick = (productId) => {
    navigate(`/app/product/${productId}`);
  };

  return (
    <div className="py-8 px-24 max-w-[1200px] mx-auto bg-gradient-to-b from-neutral-200/60 to-light border border-neutral-300 rounded-md">
      {console.log(orderDetails)}
      {console.log("order id" + orderId)}
      {console.log(id)}
      {orderDetails === null ? (
        <div>
          <h2 className="text-center">Your order details are not available</h2>
        </div>
      ) : (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderDetails.cart?.map((item) => {
                const product = productDetails[item.productID];
                return (
                  <TableRow key={item.productID}>
                    <TableCell
                      className="font-medium cursor-pointer"
                      onClick={() => handleProductClick(item.productID)}
                    >
                      {product ? product.name : "Loading..."}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {convertedPrices[item.productID] !== undefined
                        ? convertedPrices[item.productID].toFixed(2)
                        : "Loading..."}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div>
            <h2 className="text-right mt-4">
              Total:{" "}
              {Object.values(convertedPrices).length
                ? Object.values(convertedPrices)
                    .reduce((total, price) => total + price, 0)
                    .toFixed(2)
                : "Loading..."}
              {" " + currency}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
