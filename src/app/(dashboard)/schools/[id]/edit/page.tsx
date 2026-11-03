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
import { useLanguage } from "@/i18n";

export default function SchoolEditPage() {
  const { dict } = useLanguage();
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
            <Link href="/schools" title={dict.common.back}>
              <ArrowLeft className="size-4" />
              <span className="sr-only">{dict.common.back}</span>
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                <Building2 className="size-5" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {dict.schools.editSchoolTitle}
              </h1>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              {dict.schools.editSchoolSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Form Container Card */}
      <Card className="shadow-xs">
        <CardHeader className="border-b bg-muted/20 pb-4">
          <CardTitle className="text-base font-semibold">
            {dict.schools.editSchoolTitle}
          </CardTitle>
          <CardDescription className="text-xs">
            {dict.common.requiredFieldNotice}
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
              {dict.common.noRecordsFound}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
