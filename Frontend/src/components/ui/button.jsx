import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/utilities/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "flex gap-1 items-center text-dark justify-between self-center bg-primary-700 w-full px-3 py-1.5 rounded-md group transition-all hover:ring-[1.5px] hover:ring-secondary",
        rounded:
          "flex gap-1 items-center self-center bg-neutral-300/50 w-max px-3 py-1.5 rounded-full group transition-all hover:ring-[1.5px] hover:ring-secondary",
        icon:
          "absolute top-2 right-2 border-2 border-dark opacity-0 group-hover:opacity-100 transition-all hover:border-secondary bg-primary-900 p-1.5 rounded-full",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button }
