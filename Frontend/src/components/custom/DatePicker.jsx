import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export const DatePicker = ({ startDate, endDate, setDate }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selected, setSelected] = useState({ from: startDate, to: endDate });

  const handleClearSelection = () => {
    setSelected({ from: null, to: null });
    setDate({ from: null, to: null }); // Pass an object
    setIsPopoverOpen(false);
  };

  return (
    <div className="grid gap-2">
      <Popover
        open={isPopoverOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setDate({ from: selected?.from, to: selected?.to || null }); // Pass an object
          }
          setIsPopoverOpen(isOpen);
        }} // Manages the open state
      >
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={`w-full justify-start text-left text-xs font-normal h-8 pl-2 py-1.5 shadow-none
								${!selected?.from && !selected?.to && "text-neutral-400"}
								${isPopoverOpen && "ring-1 ring-secondary"}`}
          >
            <CalendarIcon />
            {selected?.from ? (
              selected?.to ? (
                <>
                  {format(selected.from, "LLL dd, y")} -{" "}
                  {format(selected.to, "LLL dd, y")}
                </>
              ) : (
                format(selected.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date...</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selected?.from || new Date()}
            selected={selected}
            onSelect={(selected) => {
              // Update the selection; allow only start date to be set
              setSelected(selected);
            }}
            numberOfMonths={2}
          />
          <div className="flex justify-end p-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleClearSelection} // Clear selection and reset dates
            >
              Clear
            </Button>
            <Button
              size="sm"
              className="bg-primary-300"
              onClick={() => {
                setDate({ from: selected?.from, to: selected?.to || null }); // Pass an object
                setIsPopoverOpen(false);
              }}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
