import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { updateUserAcceptance } from "@/services/UserApiHandler";

import { Check, X } from 'lucide-react';
import SpinnerSVG from "@/SVGs/Spinner";

function Verify({ profileId, profileRole, getUserInfo }) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    function camelCaseToEnglish(str) {
        let result = str.replace(/([A-Z])/g, ' $1').replace(/^./, function (match) {
            return match.toUpperCase();
        });
        return result.trim().toLowerCase();
    }

    const handleVerify = async (isAccepted) => {
        setLoading(true);
        const response = await updateUserAcceptance(profileId, profileRole, isAccepted);
        setLoading(false);
        if (response.error) {
            console.error(response.message);
            toast({ description: "Unkown error occured, please try again later" });
        } else {
            getUserInfo(profileId);
            if(isAccepted) {
                toast({ description: "User verified successfully" });
            } else {
                toast({ description: "User rejected successfully" });
            }
            console.log(response.message);
        }
    }

    return (
        <section className="w-[280px] border border-neutral-300 rounded-md overflow-clip flex flex-col items-center shrink-0 p-6 bg-gradient-to-b from-neutral-200/60 to-light">
            <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col w-full items-center gap-3">
                    <div>
                        <h4 className="text-center font-medium text-sm text-dark mb-1.5">
                            Verify this user as {profileRole === "advertiser" ? "an advertiser" : "a " + camelCaseToEnglish(profileRole)}?
                        </h4>
                    </div>
                </div>
                <div className="flex gap-4 justify-between">
                    <Button
                        className="bg-red-300 text-red-950 w-1/2 flex justify-center items-center"
                        onClick={() => handleVerify(false)}
                        disabled={loading}
                    >
                        {loading ?
                            <SpinnerSVG />
                            :
                            <>
                                <p className="text-xs leading-[11px]">Reject</p>
                                <div className="shrink-0">
                                    <X size={16} />
                                </div>
                            </>
                        }
                    </Button>
                    <Button
                        className="bg-[#b2e59b] text-green-950 w-1/2 flex justify-center items-center"
                        onClick={() => handleVerify(true)}
                        disabled={loading}
                    >
                        {loading ?
                            <SpinnerSVG />
                            :
                            <>
                                <p className="text-xs leading-[11px]">Verify</p>
                                <div className="shrink-0">
                                    <Check size={16} />
                                </div>
                            </>
                        }
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default Verify;