import Card from "@/components/custom/Card";
import { CirclePlus } from "lucide-react";

function Itineraries() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-8">
                <h1 className="text-4xl font-extrabold">
                    Itineraries
                </h1>
                <hr className="border-neutral-700 border w-full mt-2" />
                <button className="shrink-0 mt-2 text-neutral-600 hover:text-light transition-all">
                    <CirclePlus size={30} />
                </button>
            </div>
            <div className="grid grid-cols-3 gap-8">
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