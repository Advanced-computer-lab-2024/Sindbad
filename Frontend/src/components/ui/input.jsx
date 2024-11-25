import * as React from "react"

import { cn } from "@/utilities/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex w-full px-2 py-1.5 rounded-md border border-input bg-light text-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      placeholder="Type here..."
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
