"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { toast } from "sonner"
import { User, Mail, Phone, Lock, Loader2, CheckCircle2 } from "lucide-react"

import { FormInput, PasswordInput } from "@/components/form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// ১. Zod Validation Schema
export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  email: z
    .string()
    .email("Please provide a valid email address (e.g. user@example.com)"),
  phone: z
    .string()
    .regex(
      /^\+?[1-9]\d{7,14}$/,
      "Please enter a valid international phone number (e.g. +8801712345678)"
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character (!@#$%^&*)"
    ),
})

export type RegistrationFormValues = z.infer<typeof registrationSchema>

export function RegisterForm() {
  const [isSuccess, setIsSuccess] = React.useState(false)

  // ২. TanStack Form Hook Integration
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
    validators: {
      onChange: registrationSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        // সিমুলেটেড API রিকোয়েস্ট (১.৫ সেকেন্ড বিলম্ব)
        await new Promise((resolve) => setTimeout(resolve, 1500))

        console.log("Registration payload:", value)
        toast.success("Account registered successfully!")
        setIsSuccess(true)
      } catch (error) {
        toast.error("Failed to register account. Please try again.")
        console.error("Submission error:", error)
      }
    },
  })

  if (isSuccess) {
    return (
      <Card className="mx-auto w-full max-w-lg border-emerald-500/30 bg-emerald-50/10 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="size-6" />
          </div>
          <CardTitle className="text-xl">Registration Successful!</CardTitle>
          <CardDescription>
            Your account has been created. You can now login or reset this demo form.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button
            variant="outline"
            onClick={() => {
              form.reset()
              setIsSuccess(false)
            }}
          >
            Register Another Account
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="mx-auto w-full max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>
          Fill out the form below to register. All fields marked with * are required.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="registration-form"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-4"
        >
          {/* Full Name Field */}
          <form.Field name="fullName">
            {(field) => (
              <FormInput
                field={field}
                label="Full Name"
                placeholder="John Doe"
                startIcon={<User />}
                clearable={true}
                required
              />
            )}
          </form.Field>

          {/* Email Field */}
          <form.Field name="email">
            {(field) => (
              <FormInput
                field={field}
                type="email"
                label="Email Address"
                placeholder="john.doe@example.com"
                startIcon={<Mail />}
                helperText="We will never share your email with third parties."
                clearable={true}
                required
              />
            )}
          </form.Field>

          {/* Phone Field */}
          <form.Field name="phone">
            {(field) => (
              <FormInput
                field={field}
                type="tel"
                label="Phone Number"
                placeholder="+8801712345678"
                startIcon={<Phone />}
                description="Include international country code prefix (e.g. +880)"
                clearable={true}
                required
              />
            )}
          </form.Field>

          {/* Password Field */}
          <form.Field name="password">
            {(field) => (
              <PasswordInput
                field={field}
                label="Password"
                placeholder="••••••••"
                startIcon={<Lock />}
                description="Must be at least 8 chars with 1 uppercase, 1 number & 1 special character"
                clearable={true}
                required
              />
            )}
          </form.Field>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        {/* TanStack Form Subscribe Hook: সাবমিট বাটন হ্যান্ডলিং ও লোডিং স্টেট */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              form="registration-form"
              disabled={!canSubmit || isSubmitting}
              className="w-full font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          )}
        </form.Subscribe>

        <p className="text-center text-xs text-muted-foreground">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  )
}
