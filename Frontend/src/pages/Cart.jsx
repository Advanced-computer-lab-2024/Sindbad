import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react";
import { getCart } from "@/services/TouristApiHandler";
import { useUser } from "@/state management/userInfo";

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
        <div>
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
                    {   cart?.map((item, key) => {
                            return (
                                <TableRow key={key}>
                                    <TableCell className="font-medium">{item.productID.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.productID.price * item.quantity}</TableCell>
                                    <TableCell className="text-right">Remove</TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </div>
    );
}