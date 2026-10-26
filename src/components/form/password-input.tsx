"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { FormInput, type FormInputProps } from "./form-input"

export interface PasswordInputProps extends Omit<FormInputProps, "type"> {
  /**
   * Accessible aria-label when the password is hidden.
   * Defaults to "Show password".
   */
  showPasswordLabel?: string

  /**
   * Accessible aria-label when the password is shown.
   * Defaults to "Hide password".
   */
  hidePasswordLabel?: string
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(function PasswordInput(
  {
    field,
    endIcon,
    showPasswordLabel = "Show password",
    hidePasswordLabel = "Hide password",
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  // Forward ref to parent while keeping local access to inputRef
  React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the button click from triggering blur on the input
    e.preventDefault()
    setShowPassword((prev) => !prev)

    // Ensure focus is kept on the input element
    requestAnimationFrame(() => {
      inputRef.current?.focus()
    })
  }

  const visibilityToggleButton = (
    <button
      type="button"
      tabIndex={-1}
      onMouseDown={(e) => e.preventDefault()}
      onClick={togglePasswordVisibility}
      aria-label={showPassword ? hidePasswordLabel : showPasswordLabel}
      aria-pressed={showPassword}
      className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-xs p-1 transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      {showPassword ? (
        <EyeOff className="size-4 select-none" aria-hidden="true" />
      ) : (
        <Eye className="size-4 select-none" aria-hidden="true" />
      )}
    </button>
  )

  return (
    <FormInput
      ref={inputRef}
      field={field}
      type={showPassword ? "text" : "password"}
      endIcon={
        endIcon ? (
          <div className="flex items-center gap-1.5">
            {endIcon}
            {visibilityToggleButton}
          </div>
        ) : (
          visibilityToggleButton
        )
      }
      {...props}
    />
  )
})

PasswordInput.displayName = "PasswordInput"
