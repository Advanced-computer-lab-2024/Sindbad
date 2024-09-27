import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
function SignUp() {
    const [registerType, setRegisterType] = useState("Tourist");
    function handleRegisterTypeChange(value) {
        setRegisterType(value);
        console.log(value);
    }
    return (
        <div className="w-screen h-screen grid grid-cols-2">
            <div className="bg-light">

            </div>
            <div className="bg-primary-900 flex flex-col">
                <div className="w-100 text-right p-8">
                    <h3>
                        Log In
                    </h3>
                </div>
                <div className="flex flex-col flex-grow justify-center items-center">
                    <h1 className="font-extrabold text-3xl mb-4">
                        Create Your Account
                    </h1>
                    
                    <div className="w-2/5 flex flex-col gap-4">
                        <div className="flex items-center justify-center gap-4 my-2">
                            <h1 className="font-semibold text-lg text-nowrap">I am a...</h1>
                            <Select onValueChange={(value) => {handleRegisterTypeChange(value)}}>
                                <SelectTrigger className="font-semibold">
                                    <SelectValue className="text-center" defaultChecked="Tourist"/>
                                </SelectTrigger>
                                <SelectContent className="bg-light">
                                    <SelectItem value="Tourist">Tourist</SelectItem>
                                    <SelectItem value="TourGuide">Tour Guide</SelectItem>
                                    <SelectItem value="Advertiser">Advertiser</SelectItem>
                                    <SelectItem value="Seller">Seller</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-light">
                                Email
                            </h1>
                            <Input type="text" placeholder="First Name" className="border-light/70" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-light">
                                Password
                            </h1>
                            <Input type="text" placeholder="Last Name" className="border-light/70"/>
                        </div>
                        <p className="text-center text-light/70 text-sm text-pretty">
                            By creating an account you agree to our <a href="#" className="text-secondary/90 decoration-light/70 underline underline-offset-2 ">Terms of Service</a> & <a href="#" className="text-secondary/90 decoration-light/70 underline underline-offset-2">Privacy Policy</a>.
                        </p>
                        <Button className="flex gap-1 items-center self-center bg-primary-700 w-max py-2 rounded-md group transition-all hover:ring-1 hover:ring-secondary px-10">
                            Continue
                        </Button>
                    </div>   
                </div>
            </div>
        </div>
    );
}
export default SignUp;