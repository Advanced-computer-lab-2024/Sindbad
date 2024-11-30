import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";

export const CheckoutSuccess = () => {
    const navigate = useNavigate();
  return (
    <div className="grid h-screen items-center justify-center">
      <div>
        <CircleCheckBig className="text-green-500 mx-auto" size={250} />
        <h1 className="text-4xl font-bold text-center mt-4">Payment Successful</h1>
        <p className="text-lg text-center">Thank you for your purchase!</p>
        <div className="flex justify-center mt-4">
          <Button
          onClick={() => {
            navigate("/app/store");
          }}
            className=" text-white font-bold rounded-full cursor-pointer w-max"
          >Continue Shopping</Button>
        </div>
      </div>
    </div>
  );
}