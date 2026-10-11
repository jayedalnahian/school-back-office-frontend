"use client"

import * as React from "react"
import type { AnyFieldApi } from "@tanstack/react-form"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface FormInputProps
  extends Omit<
    React.ComponentProps<"input">,
    "name" | "defaultValue" | "value" | "onChange" | "onBlur"
  > {
  /**
   * TanStack Form FieldApi instance for type-safe state and validation handling.
   */
  field: AnyFieldApi

  /**
   * Label text for the input field.
   */
  label?: string

  /**
   * Optional helper description displayed beneath the input.
   */
  description?: string

  /**
   * Alias for description.
   */
  helperText?: string

  /**
   * If true, displays a red asterisk (*) beside the label and sets aria-required.
   */
  required?: boolean

  /**
   * If true, renders a clear button (X) when the input has a non-empty value.
   */
  clearable?: boolean

  /**
   * Icon or custom element displayed at the start (left) of the input.
   */
  startIcon?: React.ReactNode

  /**
   * Icon or custom element displayed at the end (right) of the input.
   */
  endIcon?: React.ReactNode

  /**
   * Optional custom classes for the outer container.
   */
  containerClassName?: string

  /**
   * Optional custom classes for the label element.
   */
  labelClassName?: string

  /**
   * Optional custom classes for the description element.
   */
  descriptionClassName?: string

  /**
   * Optional custom classes for the error message element.
   */
  errorClassName?: string

  /**
   * Optional change callback if additional handling is required.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>

  /**
   * Optional blur callback if additional handling is required.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(
    {
      field,
      label,
      description,
      helperText,
      required = false,
      clearable = false,
      startIcon,
      endIcon,
      containerClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
      id,
      type = "text",
      disabled,
      className,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) {
    // Generate accessible unique IDs
    const reactId = React.useId()
    const inputId = id || `${field.name}-${reactId}`
    const descriptionId = `${inputId}-description`
    const errorId = `${inputId}-error`

    // Internal ref combined with forwarded ref
    const innerRef = React.useRef<HTMLInputElement | null>(null)
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)

    // Field state and metadata from TanStack Form
    const { value, meta } = field.state
    const { errors, isTouched, isDirty } = meta

    // Error condition: show only if field is touched or dirty
    const isTouchedOrDirty = Boolean(isTouched || isDirty)

    // Safely extract string error messages
    const errorMessages = React.useMemo(() => {
      if (!errors || errors.length === 0) return []

      return errors
        .map((err) => {
          if (!err) return null
          if (typeof err === "string") return err
          if (
            typeof err === "object" &&
            "message" in err &&
            typeof (err as { message?: unknown }).message === "string"
          ) {
            return (err as { message: string }).message
          }
          return String(err)
        })
        .filter(Boolean) as string[]
    }, [errors])

    const hasError = isTouchedOrDirty && errorMessages.length > 0
    const errorMessage = hasError ? errorMessages[0] : null
    const descText = description || helperText

    // Construct aria-describedby for assistive technologies
    const ariaDescribedBy = React.useMemo(() => {
      const ids: string[] = []
      if (hasError) ids.push(errorId)
      if (descText) ids.push(descriptionId)
      return ids.length > 0 ? ids.join(" ") : undefined
    }, [hasError, descText, errorId, descriptionId])

    // Clearable button visibility
    const hasValue = value !== undefined && value !== null && value !== ""
    const showClearButton =
      clearable && hasValue && !disabled && !props.readOnly

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      field.handleChange("" as never)
      requestAnimationFrame(() => {
        innerRef.current?.focus()
      })
    }

    // Dynamic right padding calculation based on icons
    const rightPaddingClass = React.useMemo(() => {
      if (showClearButton && endIcon) return "pr-16"
      if (showClearButton || endIcon) return "pr-10"
      return ""
    }, [showClearButton, endIcon])

    return (
      <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
        {label && (
          <Label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium",
              hasError && "text-destructive",
              labelClassName
            )}
          >
            {label}
            {required && (
              <span
                className="text-destructive ml-1 font-semibold select-none"
                aria-hidden="true"
              >
                *
              </span>
            )}
          </Label>
        )}

        <div className="relative flex w-full items-center">
          {startIcon && (
            <div
              className="text-muted-foreground pointer-events-none absolute left-3 flex items-center justify-center [&_svg]:size-4 [&_svg]:shrink-0"
              aria-hidden="true"
            >
              {startIcon}
            </div>
          )}

          <Input
            ref={innerRef}
            id={inputId}
            name={field.name}
            type={type}
            value={value ?? ""}
            disabled={disabled}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={ariaDescribedBy}
            aria-required={required ? "true" : undefined}
            onBlur={(e) => {
              field.handleBlur()
              onBlur?.(e)
            }}
            onChange={(e) => {
              const nextValue =
                type === "number"
                  ? e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                  : e.target.value

              field.handleChange(nextValue as never)
              onChange?.(e)
            }}
            className={cn(
              startIcon && "pl-10",
              rightPaddingClass,
              hasError &&
                "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
              className
            )}
            {...props}
          />

          {(showClearButton || endIcon) && (
            <div className="text-muted-foreground absolute right-3 flex items-center gap-1.5">
              {showClearButton && (
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleClear}
                  aria-label="Clear input value"
                  className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-full p-0.5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              )}

              {endIcon && (
                <div className="flex items-center justify-center [&_svg]:size-4 [&_svg]:shrink-0">
                  {endIcon}
                </div>
              )}
            </div>
          )}
        </div>

        {descText && (
          <p
            id={descriptionId}
            className={cn("text-muted-foreground text-xs", descriptionClassName)}
          >
            {descText}
          </p>
        )}

        {hasError && errorMessage && (
          <p
            id={errorId}
            role="alert"
            aria-live="polite"
            className={cn(
              "text-destructive text-xs font-medium transition-all",
              errorClassName
            )}
          >
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

FormInput.displayName = "FormInput"
