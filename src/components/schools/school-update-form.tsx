"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  MapPin,
  Phone,
  Hash,
  Loader2,
  Lock,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BANGLADESH_DIVISIONS,
  schoolUpdateFormSchema,
  type SchoolUpdateFormValues,
} from "./schools.validators";
import type { SchoolUpdateFormData, UpdateSchoolPayload } from "./schools.types";
import { getSchoolById, updateSchool } from "./schools.service";

export interface SchoolUpdateFormProps {
  schoolId: string;
  initialData?: SchoolUpdateFormData | null;
  onSuccess?: (updated: SchoolUpdateFormData) => void;
  onCancel?: () => void;
  className?: string;
}

/**
 * Reusable School Update Form Component
 * Supports both modal and full-page layout embedding.
 */
export function SchoolUpdateForm({
  schoolId,
  initialData,
  onSuccess,
  onCancel,
  className,
}: SchoolUpdateFormProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // 1. Fetch current school data using GET /api/v1/schools/:id
  const {
    data: schoolData,
    isLoading: isFetchingSchool,
    isError: isFetchError,
    refetch,
  } = useQuery({
    queryKey: ["school", "detail", schoolId],
    queryFn: () => getSchoolById(schoolId),
    enabled: Boolean(schoolId),
    initialData: initialData ?? undefined,
    staleTime: 10 * 1000,
  });

  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SchoolUpdateFormValues>({
    resolver: zodResolver(schoolUpdateFormSchema),
    defaultValues: {
      name: schoolData?.name || "",
      division: schoolData?.division || "Dhaka",
      district: schoolData?.district || "",
      upazila: schoolData?.upazila || "",
      cluster: schoolData?.cluster || "",
      address: schoolData?.address || "",
      phone: schoolData?.phone || "",
      is_active: schoolData?.is_active ? "true" : "false",
    },
  });

  // 3. Sync form with fetched data
  React.useEffect(() => {
    if (schoolData) {
      reset({
        name: schoolData.name || "",
        division: schoolData.division || "Dhaka",
        district: schoolData.district || "",
        upazila: schoolData.upazila || "",
        cluster: schoolData.cluster || "",
        address: schoolData.address || "",
        phone: schoolData.phone || "",
        is_active: schoolData.is_active ? "true" : "false",
      });
    }
  }, [schoolData, reset]);

  const selectedDivision = watch("division");
  const selectedStatus = watch("is_active");

  // 4. Handle Form Submission (PATCH /api/v1/schools/:id)
  const onSubmit = async (values: SchoolUpdateFormValues) => {
    setIsSubmitting(true);
    try {
      const payload: UpdateSchoolPayload = {
        name: values.name.trim(),
        division: values.division.trim(),
        district: values.district.trim(),
        upazila: values.upazila.trim(),
        cluster: values.cluster.trim(),
        address: values.address?.trim() || null,
        phone: values.phone?.trim() || null,
        is_active: values.is_active === "true",
      };

      const updated = await updateSchool(schoolId, payload);

      toast.success(`"${updated.name}" এর তথ্য সফলভাবে আপডেট করা হয়েছে!`);

      // Invalidate relevant queries so the UI updates live
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      queryClient.invalidateQueries({ queryKey: ["school", "detail", schoolId] });

      onSuccess?.(updated);
    } catch (err: unknown) {
      console.error("Update school failed:", err);
      const errMsg =
        err instanceof Error
          ? err.message
          : "বিদ্যালয়ের তথ্য আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetchingSchool && !schoolData) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm">বিদ্যালয়ের বর্তমান তথ্য লোড করা হচ্ছে...</p>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="mt-2 text-xs"
          >
            বাতিল করুন
          </Button>
        )}
      </div>
    );
  }

  if (isFetchError && !schoolData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <p className="text-sm text-foreground font-medium">
          বিদ্যালয়ের তথ্য লোড করতে ব্যর্থ হয়েছে
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="gap-1.5 text-xs"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          আবার চেষ্টা করুন
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className ?? "space-y-6"}>
      {/* ---------------- SECTION 1: IDENTITY & STATUS ---------------- */}
      <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            সনাক্তকরণ ও অবস্থা
          </span>
          <Badge
            variant="outline"
            className={
              selectedStatus === "true"
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-600 border-amber-500/20"
            }
          >
            {selectedStatus === "true" ? "🟢 সক্রিয়" : "🟡 নিষ্ক্রিয়"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* GPS Code (Read-Only / Disabled) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium flex items-center gap-1.5">
                <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                জিপিএস কোড (GPS Code)
              </Label>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded">
                <Lock className="h-3 w-3" />
                লক করা (অপরিবর্তনীয়)
              </span>
            </div>
            <Input
              value={schoolData?.gps_code || ""}
              disabled
              className="h-9 font-mono text-xs bg-muted/60 text-muted-foreground cursor-not-allowed"
              title="জিপিএস কোড পরিবর্তনযোগ্য নয়"
            />
          </div>

          {/* Status Selector */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
              অবস্থা (Status) <span className="text-destructive">*</span>
            </Label>
            <Select
              value={selectedStatus}
              onValueChange={(val) => setValue("is_active", val as "true" | "false")}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="অবস্থা নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true" className="text-xs">
                  🟢 সক্রিয় (Active)
                </SelectItem>
                <SelectItem value="false" className="text-xs">
                  🟡 নিষ্ক্রিয় (Inactive)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ---------------- SECTION 2: BASIC DETAILS ---------------- */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          বিদ্যালয়ের মৌলিক তথ্য
        </h4>

        {/* School Name */}
        <div className="space-y-1.5">
          <Label htmlFor="school-name" className="text-xs font-medium flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
            বিদ্যালয়ের নাম <span className="text-destructive">*</span>
          </Label>
          <Input
            id="school-name"
            placeholder="যেমন: মতিঝিল সরকারি প্রাথমিক বিদ্যালয়"
            {...register("name")}
            className="h-9 text-xs"
          />
          {errors.name && (
            <p className="text-[11px] text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Division & District */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">
              বিভাগ (Division) <span className="text-destructive">*</span>
            </Label>
            <Select
              value={selectedDivision}
              onValueChange={(val) => setValue("division", val)}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {BANGLADESH_DIVISIONS.map((div) => (
                  <SelectItem key={div} value={div} className="text-xs">
                    {div}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.division && (
              <p className="text-[11px] text-destructive">{errors.division.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="school-district" className="text-xs font-medium">
              জেলা (District) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="school-district"
              placeholder="যেমন: ঢাকা"
              {...register("district")}
              className="h-9 text-xs"
            />
            {errors.district && (
              <p className="text-[11px] text-destructive">{errors.district.message}</p>
            )}
          </div>
        </div>

        {/* Upazila & Cluster */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="school-upazila" className="text-xs font-medium">
              উপজেলা / থানা <span className="text-destructive">*</span>
            </Label>
            <Input
              id="school-upazila"
              placeholder="যেমন: মতিঝিল"
              {...register("upazila")}
              className="h-9 text-xs"
            />
            {errors.upazila && (
              <p className="text-[11px] text-destructive">{errors.upazila.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="school-cluster" className="text-xs font-medium">
              ক্লাস্টার <span className="text-destructive">*</span>
            </Label>
            <Input
              id="school-cluster"
              placeholder="যেমন: মতিঝিল-১"
              {...register("cluster")}
              className="h-9 text-xs"
            />
            {errors.cluster && (
              <p className="text-[11px] text-destructive">{errors.cluster.message}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <Label htmlFor="school-address" className="text-xs font-medium flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            ঠিকানা
          </Label>
          <Input
            id="school-address"
            placeholder="যেমন: বাড়ি ১২, রোড ৪, মতিঝিল বা/এ"
            {...register("address")}
            className="h-9 text-xs"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label htmlFor="school-phone" className="text-xs font-medium flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
            যোগাযোগের ফোন নম্বর
          </Label>
          <Input
            id="school-phone"
            placeholder="যেমন: 01712345678"
            {...register("phone")}
            className="h-9 text-xs"
          />
          {errors.phone && (
            <p className="text-[11px] text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <Separator />

      {/* ---------------- SECTION 3: ACTIONS ---------------- */}
      <div className="flex items-center justify-end gap-2 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isSubmitting}
            className="h-9 text-xs"
          >
            বাতিল করুন
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          disabled={isSubmitting}
          className="h-9 text-xs font-semibold gap-1.5 shadow-xs"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              সংরক্ষণ করা হচ্ছে...
            </>
          ) : (
            <>
              <Save className="h-3.5 w-3.5" />
              পরিবর্তন সংরক্ষণ করুন
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
