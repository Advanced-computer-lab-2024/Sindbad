import { User2 } from "lucide-react";

function ImagePlaceholder({ type }) {
    return (
        <div className="bg-neutral-300 text-xs flex items-center justify-center h-full w-full rounded-[inherit] text-center">
            {type === "profile" ?
                <User2 className="text-neutral-500" />
                :
                <p>No Image</p>
            }
        </div>
    );
}

export default ImagePlaceholder;