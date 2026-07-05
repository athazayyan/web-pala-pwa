
import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    const inputId = id || (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
    
    return (
      <div className="relative group">
        <input
          type={type}
          id={inputId}
          className={cn(
            "peer flex h-14 w-full rounded-DEFAULT border-b-2 border-outline-variant bg-transparent px-3 pb-2 pt-6 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none focus-visible:border-tertiary-container disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            className
          )}
          placeholder={label || " "}
          ref={ref}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className="absolute left-3 top-2 text-xs text-on-surface-variant transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-on-surface-variant/70 peer-focus:top-2 peer-focus:text-xs peer-focus:text-tertiary-container cursor-text"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
