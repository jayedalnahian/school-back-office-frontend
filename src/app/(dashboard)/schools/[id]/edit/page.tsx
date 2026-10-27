"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SchoolUpdateForm } from "@/components/schools";

export default function SchoolEditPage() {
  const router = useRouter();
  const params = useParams();
  const schoolId = React.useMemo(() => {
    if (!params?.id) return undefined;
    return Array.isArray(params.id) ? params.id[0] : (params.id as string);
  }, [params]);

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
                বিদ্যালয়ের তথ্য সম্পাদনা (Edit School)
              </h1>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              বিদ্যালয়ের বর্তমান তথ্য হালনাগাদ ও পরিবর্তন সংরক্ষণ করুন
            </p>
          </div>
        </div>
      </div>

      {/* Form Container Card */}
      <Card className="shadow-xs">
        <CardHeader className="border-b bg-muted/20 pb-4">
          <CardTitle className="text-base font-semibold">
            তথ্য সম্পাদনা ফরম (PATCH /schools/:id)
          </CardTitle>
          <CardDescription className="text-xs">
            সঠিক তথ্য প্রদান করে নিচের ফর্মটি আপডেট করুন। &quot;*&quot; চিহ্নিত ফিল্ডসমূহ বাধ্যতামূলক।
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {schoolId ? (
            <SchoolUpdateForm
              schoolId={schoolId}
              onSuccess={() => {
                setTimeout(() => {
                  router.push("/schools");
                }, 1000);
              }}
              onCancel={() => router.push("/schools")}
            />
          ) : (
            <div className="py-8 text-center text-sm text-muted-foreground">
              বিদ্যালয়ের আইডি পাওয়া যায়নি
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
