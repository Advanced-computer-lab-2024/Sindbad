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
import { getTouristById } from '@/services/TouristApiHandler';
import GenericForm from '@/components/custom/genericForm/genericForm';

export const Checkout = () => {

    const [cart, setCart] = useState([]);
    const currency = useCurrency();
    const { id } = useUser();
    const [conversionRate, setConversionRate] = useState(null);
    const [convertedPrices, setConvertedPrices] = useState({});
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [chosenAddress, setChosenAddress] = useState(null);

    const fetchConversionRate = async () => {
        try {
            const convert = await Convert().from("USD").fetch();
            setConversionRate(convert);
        } catch (error) {
            console.error("Error fetching conversion rate:", error);
            setConversionRate(null);
        }
    };

    const fetchAddress = async () => {
        try {
            const response = await getTouristById(id);
            setAddresses(response.addresses || []);
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    }

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
        if (id) {
            fetchCart();
            fetchAddress();
        }
        console.log(addresses);
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
                    {
                        addresses.length < 1 
                        ? 
                        (<div>
                            <h2 className='text-lg font-bold mb-4'>
                                It seems you havent added an address yet. Please add an address to continue.
                            </h2>
                            <GenericForm type={"touristAddress"} id={id} fetcher={fetchAddress}/>
                        </div>) 
                        :
                        (<div>
                            <h2 className='text-lg font-bold mb-4'>
                                Choose an Address to Deliver to
                            </h2>
                            <div className="grid gap-4">
                                {addresses.map((item) => (
                                    <div 
                                    key={item[0]._id} 
                                    className="bg-gray-100 p-4 rounded-md text-sm cursor-pointer hover:bg-gray-200 transition-colors"
                                    onClick={() => setChosenAddress(item[0])}
                                    >
                                        <div className='mb-2 font-semibold'>
                                            {item[0].label}
                                        </div>
                                        <div>
                                            {item[0].street}
                                        </div>
                                        <div>
                                            {item[0].city}
                                        </div>
                                        <div>
                                            {item[0].state}{","} {item[0].country}
                                        </div>
                                        {item[0].zip}
                                    </div>
                                ))}
                            </div>
                        </div>)
                    }
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