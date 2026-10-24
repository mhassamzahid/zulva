import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-[0.9375rem] font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-300 ease-quint select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-ink text-stone hover:bg-indigo",
        indigo: "bg-indigo text-stone hover:bg-indigo-deep",
        amber: "bg-amber text-stone hover:bg-amber-deep",
        light: "bg-stone text-ink hover:bg-white",
        outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-stone",
        "outline-light": "border border-stone/40 text-stone hover:border-stone hover:bg-stone hover:text-ink",
        ghost: "text-ink hover:bg-ink/5",
        link: "rounded-none px-0 text-ink link-under",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-sm",
        lg: "h-14 px-9 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
