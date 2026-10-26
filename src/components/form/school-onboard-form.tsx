"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { toast } from "sonner"
import {
  Building2,
  Hash,
  MapPin,
  MapPinned,
  Mail,
  Phone,
  User,
  ShieldCheck,
  Loader2,
  CheckCircle2,
} from "lucide-react"

import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { httpClient } from "@/lib/httpClient"

const BD_PHONE_REGEX = /^01[3-9]\d{8}$/
const GPS_CODE_REGEX = /^\d{8}$/

// ১. Zod Validation Schema matching backend onboardSchoolZodSchema
export const schoolOnboardSchema = z.object({
  school: z.object({
    name: z
      .string()
      .trim()
      .min(1, "School name is required")
      .max(150, "School name cannot exceed 150 characters"),
    gps_code: z
      .string()
      .trim()
      .regex(GPS_CODE_REGEX, "GPS code must be exactly 8 digits (e.g. 10203040)"),
    division: z
      .string()
      .trim()
      .min(1, "Division is required"),
    district: z
      .string()
      .trim()
      .min(1, "District is required"),
    upazila: z
      .string()
      .trim()
      .min(1, "Upazila is required"),
    cluster: z
      .string()
      .trim()
      .min(1, "Cluster is required"),
    address: z.string().trim(),
    email: z
      .string()
      .trim()
      .refine(
        (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        "Invalid school email address"
      ),
    phone: z
      .string()
      .trim()
      .refine(
        (val) => !val || BD_PHONE_REGEX.test(val),
        "Invalid Bangladeshi phone number (e.g. 01712345678)"
      ),
  }),
  admin: z.object({
    full_name: z
      .string()
      .trim()
      .min(1, "Admin full name is required")
      .max(100, "Admin name cannot exceed 100 characters"),
    phone: z
      .string()
      .trim()
      .min(1, "Admin phone number is required")
      .regex(BD_PHONE_REGEX, "Invalid Bangladeshi phone number (e.g. 01712345678)"),
    email: z
      .string()
      .trim()
      .refine(
        (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        "Invalid admin email address"
      ),
  }),
})

export type SchoolOnboardFormValues = z.infer<typeof schoolOnboardSchema>

export interface SchoolOnboardFormProps {
  /**
   * Callback fired upon successful onboarding
   */
  onSuccess?: (result?: unknown) => void

  /**
   * Optional cancel callback (e.g. when rendered in modal)
   */
  onCancel?: () => void

  /**
   * Custom container class
   */
  className?: string
}

export function SchoolOnboardForm({
  onSuccess,
  onCancel,
  className,
}: SchoolOnboardFormProps) {
  const [isSuccess, setIsSuccess] = React.useState(false)

  const form = useForm({
    defaultValues: {
      school: {
        name: "",
        gps_code: "",
        division: "",
        district: "",
        upazila: "",
        cluster: "",
        address: "",
        email: "",
        phone: "",
      },
      admin: {
        full_name: "",
        phone: "",
        email: "",
      },
    },
    validators: {
      onChange: schoolOnboardSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        // Prepare clean payload for POST /schools/onboard
        const payload = {
          school: {
            name: value.school.name.trim(),
            gps_code: value.school.gps_code.trim(),
            division: value.school.division.trim(),
            district: value.school.district.trim(),
            upazila: value.school.upazila.trim(),
            cluster: value.school.cluster.trim(),
            address: value.school.address?.trim() || null,
            email: value.school.email?.trim() || null,
            phone: value.school.phone?.trim() || null,
            is_active: true,
          },
          admin: {
            full_name: value.admin.full_name.trim(),
            phone: value.admin.phone.trim(),
            email: value.admin.email?.trim() || null,
          },
        }

        const response = await httpClient.post("/schools/onboard", payload)

        toast.success("বিদ্যালয় ও স্কুল অ্যাডমিন সফলভাবে অনবোর্ড হয়েছে!")
        setIsSuccess(true)
        onSuccess?.(response)
      } catch (err: unknown) {
        console.error("Onboarding failed:", err)
        const errorMsg =
          (err as { response?: { data?: { message?: string } } })?.response?.data
            ?.message || "বিদ্যালয় অনবোর্ড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
        toast.error(errorMsg)
      }
    },
  })

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="text-lg font-bold text-foreground">অনবোর্ডিং সম্পন্ন হয়েছে!</h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-sm">
          বিদ্যালয়টি সিস্টেমে যুক্ত হয়েছে এবং প্রদানকৃত তথ্য অনুযায়ী স্কুল অ্যাডমিন অ্যাকাউন্ট তৈরি করা হয়েছে।
        </p>
        <div className="mt-5 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              form.reset()
              setIsSuccess(false)
            }}
          >
            আরেকটি বিদ্যালয় যুক্ত করুন
          </Button>
          {onCancel && (
            <Button size="sm" onClick={onCancel}>
              বন্ধ করুন
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <form
      id="school-onboard-form"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className={className ?? "space-y-6"}
    >
      {/* ---------------- SECTION 1: SCHOOL DETAILS ---------------- */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <div className="rounded-md bg-primary/10 p-1.5 text-primary">
            <Building2 className="size-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              বিদ্যালয়ের প্রাথমিক তথ্য (School Details)
            </h4>
            <p className="text-[11px] text-muted-foreground">
              বিদ্যালয়ের নাম, জিপিএস কোড ও প্রশাসনিক তথ্যাদি
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <form.Field name="school.name">
              {(field) => (
                <FormInput
                  field={field}
                  label="বিদ্যালয়ের নাম"
                  placeholder="যেমন: ধানমন্ডি সরকারি উচ্চ বিদ্যালয়"
                  startIcon={<Building2 />}
                  clearable
                  required
                />
              )}
            </form.Field>
          </div>

          <form.Field name="school.gps_code">
            {(field) => (
              <FormInput
                field={field}
                label="জিপিএস কোড (GPS Code)"
                placeholder="যেমন: 10203040"
                startIcon={<Hash />}
                maxLength={8}
                helperText="ঠিক ৮ ডিজিটের ইউনিক কোড হতে হবে"
                clearable
                required
              />
            )}
          </form.Field>

          <form.Field name="school.division">
            {(field) => (
              <FormInput
                field={field}
                label="বিভাগ (Division)"
                placeholder="যেমন: ঢাকা"
                startIcon={<MapPin />}
                clearable
                required
              />
            )}
          </form.Field>

          <form.Field name="school.district">
            {(field) => (
              <FormInput
                field={field}
                label="জেলা (District)"
                placeholder="যেমন: ঢাকা"
                startIcon={<MapPin />}
                clearable
                required
              />
            )}
          </form.Field>

          <form.Field name="school.upazila">
            {(field) => (
              <FormInput
                field={field}
                label="উপজেলা / থানা (Upazila)"
                placeholder="যেমন: ধানমন্ডি"
                startIcon={<MapPin />}
                clearable
                required
              />
            )}
          </form.Field>

          <div className="sm:col-span-2">
            <form.Field name="school.cluster">
              {(field) => (
                <FormInput
                  field={field}
                  label="ক্লাস্টার (Cluster)"
                  placeholder="যেমন: ক্লাস্টার ১"
                  startIcon={<MapPin />}
                  clearable
                  required
                />
              )}
            </form.Field>
          </div>

          <div className="sm:col-span-2">
            <form.Field name="school.address">
              {(field) => (
                <FormInput
                  field={field}
                  label="পূর্ণাঙ্গ ঠিকানা (Address)"
                  placeholder="রোড, পোস্ট অফিস, এরিয়া ইত্যাদি"
                  startIcon={<MapPinned />}
                  clearable
                />
              )}
            </form.Field>
          </div>

          <form.Field name="school.phone">
            {(field) => (
              <FormInput
                field={field}
                type="tel"
                label="বিদ্যালয়ের ফোন নম্বর"
                placeholder="01712345678"
                startIcon={<Phone />}
                helperText="১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর"
                clearable
              />
            )}
          </form.Field>

          <form.Field name="school.email">
            {(field) => (
              <FormInput
                field={field}
                type="email"
                label="বিদ্যালয়ের অফিসিয়াল ইমেইল"
                placeholder="school@example.com"
                startIcon={<Mail />}
                clearable
              />
            )}
          </form.Field>
        </div>
      </div>

      {/* ---------------- SECTION 2: ADMIN DETAILS ---------------- */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <div className="rounded-md bg-primary/10 p-1.5 text-primary">
            <ShieldCheck className="size-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              প্রধান প্রশাসক / স্কুল অ্যাডমিন (Primary Administrator)
            </h4>
            <p className="text-[11px] text-muted-foreground">
              এই ব্যক্তির জন্য &quot;SCHOOL_ADMIN&quot; রোলে অ্যাকাউন্ট তৈরি করা হবে
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <form.Field name="admin.full_name">
              {(field) => (
                <FormInput
                  field={field}
                  label="অ্যাডমিনের পূর্ণ নাম"
                  placeholder="যেমন: মোঃ রফিকুল ইসলাম"
                  startIcon={<User />}
                  clearable
                  required
                />
              )}
            </form.Field>
          </div>

          <form.Field name="admin.phone">
            {(field) => (
              <FormInput
                field={field}
                type="tel"
                label="অ্যাডমিনের ফোন নম্বর (লগইন ইউজারনেম)"
                placeholder="01712345678"
                startIcon={<Phone />}
                helperText="১১ ডিজিটের ইউনিক ফোন নম্বর"
                clearable
                required
              />
            )}
          </form.Field>

          <form.Field name="admin.email">
            {(field) => (
              <FormInput
                field={field}
                type="email"
                label="অ্যাডমিনের ইমেইল ঠিকানা"
                placeholder="admin@example.com"
                startIcon={<Mail />}
                clearable
              />
            )}
          </form.Field>
        </div>
      </div>

      {/* ---------------- ACTIONS FOOTER ---------------- */}
      <div className="flex items-center justify-end gap-2 border-t pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
          >
            বাতিল
          </Button>
        )}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              size="sm"
              disabled={!canSubmit || isSubmitting}
              className="gap-1.5 font-semibold shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  অনবোর্ড করা হচ্ছে...
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4" />
                  অনবোর্ড সম্পন্ন করুন
                </>
              )}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  )
}
