import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

function Wallet() {
    return (
        <section className="w-[280px] border border-neutral-600 rounded-md overflow-clip flex flex-col items-center shrink-0 p-6 bg-gradient-to-b from-light/[0.03] to-transparent">
            <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col w-full items-center gap-3">
                    <div>
                        <h4 className="text-center font-semibold text-base text-neutral-500 mb-1.5">
                            Wallet
                        </h4>
                        <h3 className="font-inter font-bold text-xl break-all">
                            0.00 EGP
                        </h3>
                    </div>
                </div>
                <Button variant="rounded">
                    <p className="text-xs leading-[11px]">Redeem points</p>
                    <div className="shrink-0 group-hover:text-secondary">
                        <ArrowRight size={16} />
                    </div>
                </Button>
            </div>
        </section>
    );
}

export default Wallet;