"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Building2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SchoolOnboardForm } from "@/components/form/school-onboard-form"

export default function SchoolOnboardPage() {
  const router = useRouter()

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {/* Back button and page title */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0"
            asChild
          >
            <Link href="/schools">
              <ArrowLeft className="size-4" />
              <span className="sr-only">Back to schools list</span>
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                <Building2 className="size-5" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                বিদ্যালয় অনবোর্ডিং (School Onboarding)
              </h1>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              বিদ্যালয়ের প্রাথমিক তথ্য ও স্কুল অ্যাডমিন অ্যাকাউন্ট তৈরি করে সিস্টেমে যুক্ত করুন
            </p>
          </div>
        </div>
      </div>

      {/* Form Container Card */}
      <Card className="rounded-2xl border border-border/80 bg-card shadow-xs overflow-hidden">
        <CardHeader className="border-b border-border/80 bg-muted/30 p-5 sm:p-6 pb-4">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground font-sans">
            নতুন বিদ্যালয় ও অ্যাডমিন অনবোর্ডিং ফরম (Registration Form)
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            সঠিক ও প্রাতিষ্ঠানিক তথ্য প্রদান করে নিচের ফর্মটি পূরণ করুন। &quot;*&quot; চিহ্নিত ফিল্ডসমূহ পূরণ করা বাধ্যতামূলক।
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 sm:p-7 pt-6">
          <SchoolOnboardForm
            onSuccess={() => {
              // Redirect back to schools table after a brief delay
              setTimeout(() => {
                router.push("/schools")
              }, 1200)
            }}
            onCancel={() => router.push("/schools")}
          />
        </CardContent>
      </Card>
    </div>
  )
}
