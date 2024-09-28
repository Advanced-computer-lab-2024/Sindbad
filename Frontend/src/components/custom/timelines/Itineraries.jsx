import Card from "@/components/custom/Card";
import { CirclePlus } from "lucide-react";

function Itineraries() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
                <h1 className="text-3xl font-extrabold">
                    Itineraries
                </h1>
                <hr className="border-neutral-700 border w-full mt-1.5" />
                <button className="shrink-0 mt-1.5 text-neutral-600 hover:text-light transition-all">
                    <CirclePlus size={24} />
                </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
}

export default Itineraries;