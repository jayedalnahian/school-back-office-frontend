"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Hash,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  UserCheck,
  RotateCcw,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BANGLADESH_DIVISIONS,
  schoolFormSchema,
  type SchoolFormValues,
} from "./schools.validators";
import type { CreatedSchoolResult } from "./schools.types";
import { onboardSchool, createSchool } from "./schools.service";

export interface SchoolCreateFormProps {
  onSuccess?: (createdSchool: CreatedSchoolResult) => void;
  onCancel?: () => void;
  className?: string;
}

/**
 * Formal, Government-Standard School Onboarding & Registration Form
 * Supports creation of school details and designated primary administrator.
 */
export function SchoolCreateForm({
  onSuccess,
  onCancel,
  className,
}: SchoolCreateFormProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      name: "",
      gps_code: "",
      division: "Dhaka",
      district: "",
      upazila: "",
      cluster: "",
      address: "",
      email: "",
      phone: "",
      is_active: "true",
      createAdmin: true,
      admin_full_name: "",
      admin_phone: "",
      admin_email: "",
    },
  });

  const createAdmin = watch("createAdmin");
  const selectedDivision = watch("division");
  const selectedStatus = watch("is_active");

  const onSubmit = async (values: SchoolFormValues) => {
    setIsSubmitting(true);
    try {
      let createdSchoolData: CreatedSchoolResult;

      if (values.createAdmin) {
        const payload = {
          school: {
            name: values.name.trim(),
            gps_code: values.gps_code.trim(),
            division: values.division.trim(),
            district: values.district.trim(),
            upazila: values.upazila.trim(),
            cluster: values.cluster.trim(),
            address: values.address?.trim() || null,
            email: values.email?.trim() || null,
            phone: values.phone?.trim() || null,
            is_active: values.is_active === "true",
          },
          admin: {
            full_name: values.admin_full_name?.trim() ?? "",
            phone: values.admin_phone?.trim() ?? "",
            email: values.admin_email?.trim() || null,
          },
        };

        const res = await onboardSchool(payload);
        createdSchoolData = res.school ?? {
          id: `sch-${Date.now()}`,
          ...payload.school,
          is_active: payload.school.is_active,
          created_at: new Date().toISOString(),
        };

        toast.success("বিদ্যালয় ও স্কুল অ্যাডমিন অ্যাকাউন্ট সফলভাবে নিবন্ধিত হয়েছে!");
      } else {
        const payload = {
          name: values.name.trim(),
          gps_code: values.gps_code.trim(),
          division: values.division.trim(),
          district: values.district.trim(),
          upazila: values.upazila.trim(),
          cluster: values.cluster.trim(),
          address: values.address?.trim() || null,
          email: values.email?.trim() || null,
          phone: values.phone?.trim() || null,
          is_active: values.is_active === "true",
        };

        const res = await createSchool(payload);
        createdSchoolData = res ?? {
          id: `sch-${Date.now()}`,
          ...payload,
          is_active: payload.is_active,
          created_at: new Date().toISOString(),
        };

        toast.success("নতুন বিদ্যালয় সফলভাবে সিস্টেমে যুক্ত হয়েছে!");
      }

      // Invalidate queries to refresh lists
      queryClient.invalidateQueries({ queryKey: ["schools"] });

      if (onSuccess) {
        onSuccess(createdSchoolData);
      } else {
        reset();
      }
    } catch (err: unknown) {
      console.error("Failed to onboard school:", err);
      let message = "বিদ্যালয় নিবন্ধন করতে ব্যর্থ হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।";
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as {
          response?: { data?: { message?: string; error?: string } };
        };
        message =
          axiosErr.response?.data?.message ||
          axiosErr.response?.data?.error ||
          message;
      }
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className ?? "space-y-8"}>
      {/* ---------------- 1. BASIC IDENTIFICATION & STATUS ---------------- */}
      <div className="rounded-xl border border-border/80 bg-card p-5 sm:p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/70 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                ১. সাধারণ ও প্রাতিষ্ঠানিক তথ্য (Basic School Details)
              </h3>
              <p className="text-xs text-muted-foreground">
                বিদ্যালয়ের অফিসিয়াল নাম, জিপিএস কোড ও সক্রিয়তা স্থিতি
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-[11px] font-normal w-fit bg-muted/30">
            &quot;*&quot; চিহ্নিত ফিল্ডসমূহ পূরণ বাধ্যতামূলক
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* School Name */}
          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="name" className="text-xs font-semibold flex items-center gap-1">
              বিদ্যালয়ের নাম (School Name) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="যেমন: ধানমন্ডি গভঃ মডেল প্রাইমারি স্কুল"
              className={`h-9.5 text-xs ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
              {...register("name")}
            />
            {errors.name ? (
              <p className="text-[11px] text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3 shrink-0" />
                {errors.name.message}
              </p>
            ) : (
              <p className="text-[11px] text-muted-foreground">
                অফিসিয়াল গেজেট বা স্বীকৃতিপত্রে উল্লেখিত পূর্ণ নাম লিখুন
              </p>
            )}
          </div>

          {/* GPS Code */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="gps_code" className="text-xs font-semibold flex items-center gap-1">
                <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                জিপিএস কোড (GPS Code) <span className="text-destructive">*</span>
              </Label>
              <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                ৮ ডিজিট
              </span>
            </div>
            <Input
              id="gps_code"
              placeholder="যেমন: 10203040"
              maxLength={8}
              className={`h-9.5 text-xs font-mono tracking-wider ${
                errors.gps_code ? "border-destructive focus-visible:ring-destructive" : ""
              }`}
              {...register("gps_code")}
            />
            {errors.gps_code ? (
              <p className="text-[11px] text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3 shrink-0" />
                {errors.gps_code.message}
              </p>
            ) : (
              <p className="text-[11px] text-muted-foreground">
                শিক্ষা অধিদপ্তর প্রদত্ত অনন্য ৮ ডিজিটের কোড
              </p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label htmlFor="is_active" className="text-xs font-semibold flex items-center gap-1">
              প্রাতিষ্ঠানিক অবস্থা (Status) <span className="text-destructive">*</span>
            </Label>
            <Select
              value={selectedStatus}
              onValueChange={(val) => setValue("is_active", val as "true" | "false")}
            >
              <SelectTrigger id="is_active" className="h-9.5 text-xs w-full">
                <SelectValue placeholder="স্ট্যাটাস নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true" className="text-xs">
                  🟢 সক্রিয় (Active)
                </SelectItem>
                <SelectItem value="false" className="text-xs">
                  🟡 সাময়িক নিষ্ক্রিয় (Inactive)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ---------------- 2. GEOGRAPHICAL & ADMINISTRATIVE HIERARCHY ---------------- */}
      <div className="rounded-xl border border-border/80 bg-card p-5 sm:p-6 shadow-2xs space-y-5">
        <div className="flex items-center gap-2.5 border-b border-border/70 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-foreground">
              ২. ভৌগোলিক ও প্রশাসনিক বিন্যাস (Geographical & Administrative Hierarchy)
            </h3>
            <p className="text-xs text-muted-foreground">
              বিভাগ, জেলা, উপজেলা এবং ক্লাস্টার সংশ্লিষ্ট সঠিক তথ্য
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Division */}
          <div className="space-y-1.5">
            <Label htmlFor="division" className="text-xs font-semibold flex items-center gap-1">
              বিভাগ (Division) <span className="text-destructive">*</span>
            </Label>
            <Select
              value={selectedDivision}
              onValueChange={(val) => setValue("division", val)}
            >
              <SelectTrigger id="division" className="h-9.5 text-xs w-full">
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

          {/* District */}
          <div className="space-y-1.5">
            <Label htmlFor="district" className="text-xs font-semibold flex items-center gap-1">
              জেলা (District) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="district"
              placeholder="যেমন: Dhaka, Bogura"
              className={`h-9.5 text-xs ${errors.district ? "border-destructive" : ""}`}
              {...register("district")}
            />
            {errors.district && (
              <p className="text-[11px] text-destructive">{errors.district.message}</p>
            )}
          </div>

          {/* Upazila */}
          <div className="space-y-1.5">
            <Label htmlFor="upazila" className="text-xs font-semibold flex items-center gap-1">
              উপজেলা / থানা (Upazila) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="upazila"
              placeholder="যেমন: Dhanmondi, Sadar"
              className={`h-9.5 text-xs ${errors.upazila ? "border-destructive" : ""}`}
              {...register("upazila")}
            />
            {errors.upazila && (
              <p className="text-[11px] text-destructive">{errors.upazila.message}</p>
            )}
          </div>

          {/* Cluster */}
          <div className="space-y-1.5">
            <Label htmlFor="cluster" className="text-xs font-semibold flex items-center gap-1">
              ক্লাস্টার (Cluster) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="cluster"
              placeholder="যেমন: Cluster-01, Zone-A"
              className={`h-9.5 text-xs ${errors.cluster ? "border-destructive" : ""}`}
              {...register("cluster")}
            />
            {errors.cluster && (
              <p className="text-[11px] text-destructive">{errors.cluster.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- 3. CONTACT & OFFICIAL ADDRESS ---------------- */}
      <div className="rounded-xl border border-border/80 bg-card p-5 sm:p-6 shadow-2xs space-y-5">
        <div className="flex items-center gap-2.5 border-b border-border/70 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Phone className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-foreground">
              ৩. যোগাযোগ ও প্রাতিষ্ঠানিক ঠিকানা (Contact & Address Details)
            </h3>
            <p className="text-xs text-muted-foreground">
              বিদ্যালয়ের অফিসিয়াল যোগাযোগ নম্বর, ইমেইল এবং বিস্তারিত অবস্থান
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Detailed Address */}
          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="address" className="text-xs font-semibold">
              বিস্তারিত প্রাতিষ্ঠানিক ঠিকানা (Detailed Physical Address)
            </Label>
            <Input
              id="address"
              placeholder="যেমন: বাড়ি নং ১২, রোড নং ৫, ধানমন্ডি আ/এ, ঢাকা-১২০৫"
              className="h-9.5 text-xs"
              {...register("address")}
            />
          </div>

          {/* School Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold flex items-center gap-1">
              অফিসিয়াল ফোন নম্বর (Helpline / Phone)
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="যেমন: 01711223344"
              className={`h-9.5 text-xs font-mono ${errors.phone ? "border-destructive" : ""}`}
              {...register("phone")}
            />
            {errors.phone ? (
              <p className="text-[11px] text-destructive">{errors.phone.message}</p>
            ) : (
              <p className="text-[11px] text-muted-foreground">
                ১১ ডিজিটের সঠিক বাংলাদেশি মোবাইল নম্বর
              </p>
            )}
          </div>

          {/* School Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              অফিসিয়াল ইমেইল (Official Email)
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="যেমন: info@school.edu.bd"
              className={`h-9.5 text-xs ${errors.email ? "border-destructive" : ""}`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-[11px] text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- 4. DESIGNATED SCHOOL ADMINISTRATOR ---------------- */}
      <div className="rounded-xl border border-border/80 bg-card p-5 sm:p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/70 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <UserCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                ৪. প্রধান প্রশাসক / স্কুল অ্যাডমিন অ্যাকাউন্ট (School Administrator Account)
              </h3>
              <p className="text-xs text-muted-foreground">
                বিদ্যালয় ব্যবস্থাপনার জন্য প্রথম অ্যাডমিন ব্যবহারকারী তৈরি
              </p>
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer bg-muted/40 hover:bg-muted/70 px-3 py-1.5 rounded-lg border border-border/80 transition-colors">
            <input
              type="checkbox"
              className="rounded border-input text-primary focus:ring-primary h-4 w-4"
              checked={createAdmin}
              onChange={(e) => setValue("createAdmin", e.target.checked)}
            />
            <span>অ্যাডমিন অ্যাকাউন্ট তৈরি করুন</span>
          </label>
        </div>

        {createAdmin ? (
          <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4 sm:p-5 space-y-4">
            <div className="flex items-start gap-2.5 text-xs text-foreground/90">
              <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                  নিরাপত্তা ও অ্যাক্সেস পলিসি:{" "}
                </span>
                অনবোর্ডিং সম্পন্ন হলে উক্ত অ্যাডমিনকে &quot;SCHOOL_ADMIN&quot; পারমিশন প্রদান করা হবে। প্রদত্ত ফোন নম্বরটি সিস্টেমে লগইন ইউজারনেম হিসেবে কার্যকর হবে।
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
              {/* Admin Full Name */}
              <div className="sm:col-span-2 lg:col-span-1 space-y-1.5">
                <Label htmlFor="admin_full_name" className="text-xs font-semibold flex items-center gap-1">
                  অ্যাডমিনের পুরো নাম <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="admin_full_name"
                  placeholder="যেমন: ড. মোহাম্মদ রফিকুল ইসলাম"
                  className={`h-9.5 text-xs bg-background ${
                    errors.admin_full_name ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                  {...register("admin_full_name")}
                />
                {errors.admin_full_name && (
                  <p className="text-[11px] text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.admin_full_name.message}
                  </p>
                )}
              </div>

              {/* Admin Phone (Login Username) */}
              <div className="space-y-1.5">
                <Label htmlFor="admin_phone" className="text-xs font-semibold flex items-center gap-1">
                  মোবাইল নম্বর (লগইন আইডি) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="admin_phone"
                  type="tel"
                  placeholder="যেমন: 01812345678"
                  className={`h-9.5 text-xs font-mono bg-background ${
                    errors.admin_phone ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                  {...register("admin_phone")}
                />
                {errors.admin_phone ? (
                  <p className="text-[11px] text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.admin_phone.message}
                  </p>
                ) : (
                  <p className="text-[11px] text-muted-foreground">
                    সিস্টেমে অনন্য ১১ ডিজিটের সক্রিয় ফোন নম্বর
                  </p>
                )}
              </div>

              {/* Admin Email */}
              <div className="space-y-1.5">
                <Label htmlFor="admin_email" className="text-xs font-semibold">
                  অ্যাডমিনের ইমেইল (ঐচ্ছিক)
                </Label>
                <Input
                  id="admin_email"
                  type="email"
                  placeholder="যেমন: admin@school.edu.bd"
                  className={`h-9.5 text-xs bg-background ${
                    errors.admin_email ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                  {...register("admin_email")}
                />
                {errors.admin_email && (
                  <p className="text-[11px] text-destructive">{errors.admin_email.message}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border/80 p-4 text-center text-xs text-muted-foreground bg-muted/20">
            কোনো প্রাথমিক অ্যাডমিন অ্যাকাউন্ট তৈরি করা হচ্ছে না। পরবর্তীতে ইউজার ম্যানেজমেন্ট মডিউল থেকে এই বিদ্যালয়ের অ্যাডমিন নিয়োগ দেওয়া যাবে।
          </div>
        )}
      </div>

      {/* ---------------- FORM ACTION FOOTER ---------------- */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2 border-t border-border/80">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="h-9 text-xs w-full sm:w-auto"
            >
              বাতিল করুন
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => reset()}
            disabled={isSubmitting}
            className="h-9 text-xs text-muted-foreground hover:text-foreground w-full sm:w-auto"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
            ফর্ম রিসেট
          </Button>
        </div>

        <Button
          type="submit"
          size="sm"
          disabled={isSubmitting}
          className="h-9.5 px-6 gap-2 text-xs font-semibold shadow-xs bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>নিবন্ধন সংরক্ষণ করা হচ্ছে...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span>বিদ্যালয় নিবন্ধন সম্পন্ন করুন</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
