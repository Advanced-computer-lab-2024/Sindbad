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
import { useNavigate } from "react-router-dom"; // Add navigate import

export const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { id } = useUser();
  const navigate = useNavigate(); // Initialize navigate function

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
            <TableHead className="text-right">Move to Cart</TableHead>{" "}
            {/* Swapped */}
            <TableHead className="text-right">Remove</TableHead> {/* Swapped */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {wishlist.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                Your wishlist is empty.
              </TableCell>
            </TableRow>
          ) : (
            wishlist.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  <span
                    className="text-black-300 cursor-pointer"
                    onClick={() => navigate(`/app/product/${item._id}`)} // Navigate to product page
                  >
                    {item.name}
                  </span>
                </TableCell>
                <TableCell>{item.price}</TableCell>
                {/* Move to Cart button */}
                <TableCell className="text-right pr-5">
                  <ArrowRight
                    className="ml-auto cursor-pointer"
                    onClick={async () => {
                      try {
                        await addItemToCart(id, item._id, 1);
                        await removeFromWishlist(id, item._id);
                        fetchWishlist();
                      } catch (error) {
                        console.error("Error moving item to cart:", error);
                      }
                    }}
                  />
                </TableCell>
                {/* Remove button */}
                <TableCell className="text-right pr-5">
                  <BadgeX
                    className="ml-auto hover:fill-red-500 hover:text-white text-red-500 cursor-pointer"
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
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
