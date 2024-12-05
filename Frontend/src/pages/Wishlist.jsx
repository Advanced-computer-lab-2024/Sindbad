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
import {
  addItemToCart,
  getWishlistProducts,
  removeFromWishlist,
} from "@/services/TouristApiHandler";
import { useUser } from "@/state management/userInfo";
import { BadgeX, ArrowRight } from "lucide-react";
import { Cart } from "./Cart";
import { Button } from "@/components/ui/button";

export const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { id } = useUser();

  const fetchWishlist = async () => {
    try {
      const response = await getWishlistProducts(id);
      console.log("Fetched wishlist:", response);
      setWishlist(response);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [id]);

  return (
    <div className="py-8 px-24 max-w-[1200px] mx-auto bg-gradient-to-b from-neutral-200/60 to-light border border-neutral-300 rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Remove</TableHead>
            <TableHead className="text-right">Move to Cart</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {wishlist.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                {" "}
                Your wishlist is empty.
              </TableCell>
            </TableRow>
          ) : (
            wishlist.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell className="text-right pr-5">
                  <BadgeX
                    className="ml-auto"
                    onClick={async () => {
                      try {
                        await removeFromWishlist(id, item._id);
                        fetchWishlist();
                      } catch (error) {
                        console.error(
                          "Error removing item from wishlist:",
                          error
                        );
                      }
                    }}
                  />
                </TableCell>
                {/* Move to Cart button */}
                <TableCell className="text-right pr-5">
                  <ArrowRight
                    className="ml-auto"
                    onClick={async () => {
                      try {
                        await addItemToCart(id, item._id, 1);
                        await removeFromWishlist(id, item._id);
                        fetchWishlist();
                      } catch (error) {
                        console.error(
                          "Error removing item from wishlist:",
                          error
                        );
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
