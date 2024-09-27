import { ArrowRight } from 'lucide-react';

function Wallet() {
    return (
        <section className="w-[350px] border border-neutral-600 rounded overflow-clip flex flex-col items-center shrink-0 p-7 bg-gradient-to-b from-light/[0.03] to-transparent">
            <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col w-full items-center gap-4">
                    <div>
                        <h4 className="text-center font-semibold text-xl text-neutral-500 mb-2">
                            Wallet
                        </h4>
                        <h3 className="font-inter font-bold text-2xl break-all">
                            0.00 EGP
                        </h3>
                    </div>
                </div>
                <button className="flex gap-1 items-center self-center bg-light/5 w-max px-4 py-2 rounded-full group transition-all hover:ring-1 hover:ring-secondary">
                    <p className="text-[14px] leading-[14px]">Redeem points</p>
                    <div className="shrink-0 group-hover:text-secondary">
                        <ArrowRight size={20} />
                    </div>
                </button>
            </div>
        </section>
    );
}

export default Wallet;