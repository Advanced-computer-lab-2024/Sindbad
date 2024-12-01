import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getCart } from "@/services/TouristApiHandler";
import { useUser } from "@/state management/userInfo";
import { BadgeX } from "lucide-react";
import { removeItemFromCart } from "@/services/TouristApiHandler";

export const Cart = () => {
  const [cart, setCart] = useState([]);
  const { id } = useUser();

  const fetchCart = async () => {
    try {
      const response = await getCart(id);
      setCart(response);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [id]);

  return (
    <div className="py-8 px-24 max-w-[1200px] mx-auto bg-gradient-to-b from-neutral-200/60 to-light border border-neutral-300 rounded-md">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart?.map((item, key) => {
            return (
              <TableRow key={key}>
                <TableCell className="font-medium">
                  {item.productID.name}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.productID.price * item.quantity}</TableCell>
                <TableCell className="text-right pr-5">
                  <BadgeX
                    className="ml-auto"
                    onClick={async () => {
                      try {
                        const response = await removeItemFromCart(
                          id,
                          item.productID._id
                        );
                        fetchCart();
                      } catch (error) {
                        console.error("Error removing item from cart:", error);
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
