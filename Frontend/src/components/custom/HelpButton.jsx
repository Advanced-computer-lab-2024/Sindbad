import { BadgeHelp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const HelpButton = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button aria-label="Help">
          <BadgeHelp className="text-gray-500 hover:text-black hover:scale-125 transition-transform w-7 h-7" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tutorial</DialogTitle>
        </DialogHeader>
          <video width="100%" controls>
            <source src="\src\resources\tutorial.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
      </DialogContent>
    </Dialog>
  );
};
