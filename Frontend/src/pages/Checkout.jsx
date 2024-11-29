import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/state management/userInfo';
import { Convert } from "easy-currencies";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getCart } from "@/services/TouristApiHandler";
import { useCurrency } from "@/state management/userInfo";
import { BadgeX } from "lucide-react";

export const Checkout = () => {

    const [cart, setCart] = useState([]);
    const currency = useCurrency();
    const { id } = useUser();
    const [conversionRate, setConversionRate] = useState(null);
    const [convertedPrices, setConvertedPrices] = useState({});
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

    const fetchCart = async () => {
        try {
            const response = await getCart(id);
            setCart(response || []);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const calculateConvertedPrices = async (cartItems) => {
        if (!conversionRate) return;
        const updatedPrices = {};
        for (const item of cartItems) {
            const totalPrice = item.productID.price * item.quantity;
            updatedPrices[item.productID._id] = await conversionRate.amount(totalPrice).to(currency);
        }
        setConvertedPrices(updatedPrices);
    };

    useEffect(() => {
        fetchConversionRate();
        if (id) fetchCart();
    }, [id]);

    useEffect(() => {
        calculateConvertedPrices(cart);
    }, [cart, conversionRate]);


    return (
        <div className="max-w-[1200px] mx-auto">
            <h1
            className="text-4xl font-bold text-left pt-8 mb-4"
            >
            Sindbad Checkout
            </h1>
            <div className="grid grid-cols-3 grid-flow-col gap-4 items-start">
                <div className="col-span-2 bg-white rounded-md p-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia cum eum est omnis ab! Consequuntur in maiores a distinctio tempora corrupti iure temporibus, reiciendis rem culpa provident placeat eveniet ducimus illo sed modi excepturi voluptas voluptatem nemo. Non dignissimos nobis mollitia autem, aliquam reiciendis deserunt et? Ipsum corporis quae ad distinctio exercitationem quis at magni maxime accusantium iste facere commodi cupiditate eos, quos autem atque sunt quaerat expedita, consequatur labore natus aliquid? Asperiores ipsa modi voluptatem? Possimus error quisquam reprehenderit excepturi aliquid! Corporis error ex, ad voluptates, ipsa sapiente sequi laboriosam, eveniet modi eum repudiandae nobis officiis a ea. At ab enim, corporis, amet, delectus similique repellendus suscipit voluptas sunt placeat deserunt laborum vel quibusdam eius impedit. Optio quod iste praesentium vitae quaerat eos maxime et autem veritatis reiciendis sequi, mollitia assumenda necessitatibus doloremque repellat distinctio cum nisi. Ducimus temporibus aliquid nobis nulla natus, odio est veniam delectus quibusdam illum?
                </div>
                <div className="col-span-1 bg-white rounded-md p-6">
                    <h2 className='text-lg font-bold mb-4'>
                        Your Cart
                    </h2>
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
                                {cart?.map((item) => (
                                    <TableRow key={item.productID._id}>
                                        <TableCell className="font-medium">{item.productID.name}</TableCell>
                                        <TableCell className="flex items-center space-x-2">
                                            <span>{item.quantity}</span>                                       
                                        </TableCell>
                                        <TableCell>
                                            {convertedPrices[item.productID._id] !== undefined
                                                ? convertedPrices[item.productID._id].toFixed(2)
                                                : "Loading..."}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <hr className="my-2 border-gray-200" />
                    <div className="flex mt-8  text-lg">
                        <span className="font-bold">Your Subtotal is: &nbsp;</span>
                        <span>
                            {cart.reduce((acc, item) => {
                                return acc + (convertedPrices[item.productID._id] || 0);
                            }, 0).toFixed(2)}
                        </span>
                    </div>


                </div>
            </div>
        </div>
    );
}