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
import { getCart, removeItemFromCart, updateCart } from "@/services/TouristApiHandler";
import { useUser } from "@/state management/userInfo";
import { BadgeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Cart = () => {
    const [cart, setCart] = useState([]);
    const { id } = useUser();
    const [debounceTimeouts, setDebounceTimeouts] = useState({});

    const fetchCart = async () => {
        try {
            const response = await getCart(id);
            setCart(response || []);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        if (id) fetchCart();
    }, [id]);

    // Handle quantity change with debounce
    const handleQuantityChange = (productId, newQuantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.productID._id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );

        if (debounceTimeouts[productId]) {
            clearTimeout(debounceTimeouts[productId]);
        }

        const newTimeout = setTimeout(async () => {
            try {
                await updateCart(id, productId, newQuantity);
                fetchCart();
            } catch (error) {
                console.error("Error updating quantity:", error);
            }
        }, 500);

        setDebounceTimeouts((prevTimeouts) => ({
            ...prevTimeouts,
            [productId]: newTimeout,
        }));
    };

    return (
        <div className="py-8 px-24 max-w-[1200px] mx-auto bg-gradient-to-b from-neutral-200/60 to-light border border-neutral-300 rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cart?.map((item) => (
                        <TableRow key={item.productID._id}>
                            <TableCell className="font-medium">{item.productID.name}</TableCell>
                            <TableCell className="flex items-center space-x-2">
                                <button
                                    className="px-2 py-1 border rounded-md hover:bg-neutral-300"
                                    onClick={() =>
                                        handleQuantityChange(
                                            item.productID._id,
                                            Math.max(1, item.quantity - 1)
                                        )
                                    }
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    className="px-2 py-1 border rounded-md hover:bg-neutral-300"
                                    onClick={() =>
                                        handleQuantityChange(
                                            item.productID._id,
                                            item.quantity + 1
                                        )
                                    }
                                >
                                    +
                                </button>
                            </TableCell>
                            <TableCell>
                                {(item.productID.price * item.quantity).toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right pr-5">
                                <BadgeX
                                    className="ml-auto hover:fill-red-500 hover:text-white text-red-500 cursor-pointer"
                                    onClick={async () => {
                                        try {
                                            await removeItemFromCart(
                                                id,
                                                item.productID._id
                                            );
                                            fetchCart();
                                        } catch (error) {
                                            console.error(
                                                "Error removing item from cart:",
                                                error
                                            );
                                        }
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div>
                <h2 className="text-right mt-4">
                    Total: $
                    {cart
                        .reduce(
                            (total, item) =>
                                total + item.productID.price * item.quantity,
                            0
                        )
                        .toFixed(2)}
                </h2>
                <Button
                    className="mt-4 ml-auto max-w-[200px] w-full text-center justify-center"
                    onClick={() => alert("Checkout")}
                >
                    Checkout
                </Button>
            </div>
        </div>
    );
};
