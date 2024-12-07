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
import { checkoutWithCod, checkoutWithStripe, checkoutWithWallet, getCart } from "@/services/TouristApiHandler";
import { useCurrency } from "@/state management/userInfo";
import { BadgeX } from "lucide-react";
import { getTouristById } from '@/services/TouristApiHandler';
import GenericForm from '@/components/custom/genericForm/genericForm';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { forms } from '@/components/custom/genericForm/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePromoCode } from "@/services/PromocodeApiHandler";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

export const Checkout = () => {

    const [cart, setCart] = useState([]);
    const currency = useCurrency();
    const { id } = useUser();
    const [conversionRate, setConversionRate] = useState(null);
    const [convertedPrices, setConvertedPrices] = useState({});
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [chosenAddress, setChosenAddress] = useState("null");
    const [addNewAddress, setAddNewAddress] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [applied, setApplied] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [stripeID, setStripeID] = useState(null);
    const toast = useToast();


    const formObject = forms["touristAddress"];
	const onSubmit = formObject.onSubmit;
	const formSchema = z.object(formObject.zodSchema);
    const defaultValues = structuredClone(formObject.defaultValues);
    const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues,
	});

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
    }, [id]);

    useEffect(() => {
        calculateConvertedPrices(cart);
    }, [cart, conversionRate]);

    const handleSubmit = (values) => {
        onSubmit(values, id, null, null);
        setAddNewAddress(false);
        setTimeout(() => {
            fetchAddress();
        },
        150)
    }

    const payWithWallet = async () => {
        try {
            const response = checkoutWithWallet(id, cart, discount);
            navigate("/checkout/success");
        }
        catch (error) {
            console.error("Error paying with wallet:", error);
        }
    }
    const payWithStripe = async () => {
        checkoutWithStripe(id, cart, stripeID);
    }
    const payWithCOD = async () => {
        try {
            const response = checkoutWithCod(id, cart);
            navigate("/checkout/success");
        }
        catch (error) {
            console.error("Error paying with COD:", error);
        }
    }

    const handlePromoCodeApply = () => {
        if (!promoCode || promoCode.trim() === "") {
            toast({ description: "Please enter a promo code." });
            return;
        }
    
        setLoading(true); // Set loading state to true, indicating a request is in progress
    
        // Handle the async logic
        const applyPromoCode = async () => {
            try {
                const result = await usePromoCode(id, promoCode); // Use the promo code here
                console.log(result);
    
                if (result.discount) {
                    setDiscount(result.discount);  // Set discount if the result contains it
                    setApplied(true); // Mark promo code as applied
                    setStripeID(result.stripeID); // Set the Stripe coupon ID
                    toast({ description: `Promo code applied! You got a ${result.discount}% discount.` });
                } else {
                    toast({ description: result.message || "Incorrect Promo Code." });
                }
            } catch (error) {
                toast({ description: error.message || "An unexpected error occurred." });
            } finally {
                setLoading(false); // Reset loading state after the request is finished
            }
        };
    
        applyPromoCode(); // Call the async function to apply the promo code
    };

    return (
        <div className="max-w-[1200px] mx-auto">
            <h1
            className="text-4xl font-bold text-left pt-8 mb-4"
            >
            Sindbad Checkout
            </h1>
            <div className="grid grid-cols-3 grid-flow-col gap-4 items-start">
                <div className='col-span-2'>
                    <div className="bg-white rounded-md p-6">
                        {chosenAddress === "null" ?
                            (
                            <div>
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
                                        {
                                            addNewAddress && 
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                                                    <div 
                                                        className="bg-gray-100 p-4 rounded-md hover:bg-gray-200 transition-colors mt-4 group flex flex-col gap-2"
                                                    >
                                                        <div className='mb-2 font-semibold'>
                                                                <Input
                                                                {...form.register("label")}
                                                                className=' focus:border-0 bg-transparent transition-colors inline w-max border-0 focus:bg-white' placeholder='Label' />
                                                        </div>
                                                        <div>
                                                            <Input
                                                            {...form.register("street")}
                                                            className='focus:border-0 bg-transparent transition-colors inline w-max border-0 focus:bg-white' placeholder='Street' />
                                                        </div>
                                                        <div>
                                                            <Input
                                                            {...form.register("city")}
                                                            className='focus:border-0 bg-transparent transition-colors inline w-max border-0 focus:bg-white' placeholder='City' />
                                                        </div>
                                                        <div>
                                                            <Input 
                                                            {...form.register("state")}
                                                            className='focus:border-0 bg-transparent transition-colors inline w-max border-0 focus:bg-white' placeholder='State' />
                                                            {" , "} 
                                                            <Input 
                                                            {...form.register("country")}
                                                            className='focus:border-0 bg-transparent transition-colors inline w-max border-0 focus:bg-white' placeholder='Country' />
                                                        </div>
                                                        <Input 
                                                        {...form.register("zip")}
                                                        className='focus:border-0 bg-transparent transition-colors inline w-max border-0 focus:bg-white' placeholder='Zip' />
                                                        <Button type="submit" className="bg-dark text-white w-max">
                                                            Submit
                                                        </Button>
                                                    </div>
                                                    
                                                </form>
                                            </Form>
                                        }
                                        <a 
                                        className='block mt-4 text-base hover:text-yellow-400 cursor-pointer w-max'
                                        onClick={() => {
                                            setAddNewAddress(true);
                                        }}
                                        >
                                            Add an address
                                        </a>
                                    </div>)
                                }
                            </div>
                            )
                            :
                            (<div>   
                                <div>
                                    <h2 className='text-lg font-bold mb-4'>
                                        Your Chosen Address is:
                                    </h2>
                                    <div  
                                    className="bg-gray-100 p-4 rounded-md text-sm hover:bg-gray-200 transition-colors"
                                    >
                                        <div className='mb-2 font-semibold'>
                                            {chosenAddress.label}
                                        </div>
                                        <div>
                                            {chosenAddress.street}
                                        </div>
                                        <div>
                                            {chosenAddress.city}
                                        </div>
                                        <div>
                                            {chosenAddress.state}{","} {chosenAddress.country}
                                        </div>
                                        {chosenAddress.zip}
                                    </div>
                                </div>
                                <div className=' mt-4'>

                                </div>
                            </div>
                            )
                        }
                    </div>
                    {chosenAddress !== "null" &&
                    <div className="bg-white rounded-md p-6 mt-4">
                        <h2 className='text-lg font-bold mb-4'>Please Choose a Payment Method</h2>
                    <Tabs defaultValue="account" className="w-full mx-auto">
                        <div className='flex justify-center'>
                            <TabsList className="mx-auto">
                                <TabsTrigger value="credit">
                                    <img className="h-6"src="https://taxidermyplanet.com/wp-content/uploads/2018/10/transparent-logos-credit-card-1.png" />
                                </TabsTrigger>
                                <TabsTrigger value="cod">Cash On Delivery</TabsTrigger>
                                <TabsTrigger value="wallet">Sindbad Wallet</TabsTrigger>
                            </TabsList>
                        </div>
                        <div className='mt-4'>
                            <TabsContent value="credit">
                                <h3 className='text-sm text-center'>
                                    Pay with your Credit Card through our partner vendor, Stripe.
                                </h3>
                                <Button 
                                className="w-max mt-4 ml-auto"
                                onClick={() => payWithStripe()}
                                >
                                    <span className='text-base text-white'>Pay with Stripe</span>
                                </Button>
                            </TabsContent>
                            <TabsContent value="cod">
                                    <h3 className='text-sm text-center'>
                                        Pay the delivery person when they arrive with your order.
                                    </h3>
                                <Button 
                                className="w-max mt-4 ml-auto"
                                onClick={() => payWithCOD()}
                                >
                                    <span className='text-base text-white'>Confirm Order</span>
                                </Button>
                            </TabsContent>
                            <TabsContent value="wallet">
                                <h3 className='text-sm text-center'>
                                    Pay with your Sindbad Wallet.
                                </h3>
                                <Button
                                className="w-max mt-4 ml-auto"
                                onClick={() => payWithWallet()}
                                >
                                    <span className='text-base text-white'>Pay with Wallet</span>
                                </Button>
                            </TabsContent>
                        </div>
                    </Tabs>
                        
                    </div>
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
                    <div className="flex mt-8 text-lg">
                        <span className="font-bold">Your Subtotal is: &nbsp;</span>
                        <span>
                            {(() => {
                                const subtotal = cart.reduce((acc, item) => {
                                    return acc + (convertedPrices[item.productID._id] || 0);
                                }, 0);
                                const totalWithDiscount = subtotal - (discount * subtotal)/100;
                                return totalWithDiscount.toFixed(2);
                            })()}
                        </span>
                    </div>
                    <div className="flex mt-4">
                    {!applied ? (
                                    <div className="grid grid-cols-3 w-full max-w-sm items-center gap-1">
                                        <div className="col-span-2 p-2">
                                            <Label className="text-sm p-1" htmlFor="code">Enter Promocode</Label>
                                            <Input
                                                type="text"
                                                id="code"
                                                placeholder="Enter code.."
                                                value={promoCode} 
                                                onChange={(e) => setPromoCode(e.target.value.trim())} 
                                                className="w-full border border-gray-300 rounded text-sm p-1 px-2"
                                            />
                                        </div>
                                        <Button
                                            className="col-span-1 flex items-center justify-center mt-6"
                                            onClick={() => handlePromoCodeApply()}
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                ) :  (
                                    <div className="grid grid-cols-3 w-full max-w-sm items-center gap-1">
                                        <div className="col-span-2 p-2">
                                            <Input
                                                type="text"
                                                id="code"
                                                placeholder={promoCode} // Display the applied promo code
                                                className="p-2"
                                                disabled
                                            />
                                        </div>
                                        <Button className="col-span-1 flex items-center justify-center" disabled>
                                            Applied
                                        </Button>
                                    </div>
                                )}
                    </div>
                </div>
            </div>
        </div>
    );
}