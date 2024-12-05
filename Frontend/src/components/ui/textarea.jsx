import * as React from "react"

import { cn } from "@/utilities/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<textarea
      className={cn(
        "flex w-full px-2 py-1.5 min-h-[60px] rounded-md border border-input bg-white text-xs placeholder:text-neutral-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      placeholder="Type here..."
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
