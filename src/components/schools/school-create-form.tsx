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
import { useLanguage } from "@/i18n";

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
  const { dict } = useLanguage();
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

        toast.success(dict.schools.onboardSuccess);
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

        toast.success(dict.schools.onboardSuccess);
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
      let message = dict.common.failedToLoad;
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
                {dict.schoolForm.section1Title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {dict.schoolForm.section1Sub}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-[11px] font-normal w-fit bg-muted/30">
            {dict.common.requiredFieldNotice}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* School Name */}
          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="name" className="text-xs font-semibold flex items-center gap-1">
              {dict.schoolForm.nameLabel} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder={dict.schoolForm.namePlaceholder}
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
                {dict.schoolForm.nameHelp}
              </p>
            )}
          </div>

          {/* GPS Code */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="gps_code" className="text-xs font-semibold flex items-center gap-1">
                <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                {dict.schoolForm.gpsCodeLabel} <span className="text-destructive">*</span>
              </Label>
              <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                8 Digits
              </span>
            </div>
            <Input
              id="gps_code"
              placeholder={dict.schoolForm.gpsCodePlaceholder}
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
                {dict.schoolForm.gpsCodeHelp}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label htmlFor="is_active" className="text-xs font-semibold flex items-center gap-1">
              {dict.schoolForm.statusLabel} <span className="text-destructive">*</span>
            </Label>
            <Select
              value={selectedStatus}
              onValueChange={(val) => setValue("is_active", val as "true" | "false")}
            >
              <SelectTrigger id="is_active" className="h-9.5 text-xs w-full">
                <SelectValue placeholder={dict.common.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true" className="text-xs">
                  🟢 {dict.common.active}
                </SelectItem>
                <SelectItem value="false" className="text-xs">
                  🟡 {dict.common.inactive}
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
              {dict.schoolForm.section2Title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {dict.schoolForm.section2Sub}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Division */}
          <div className="space-y-1.5">
            <Label htmlFor="division" className="text-xs font-semibold flex items-center gap-1">
              {dict.schoolForm.divisionLabel} <span className="text-destructive">*</span>
            </Label>
            <Select
              value={selectedDivision}
              onValueChange={(val) => setValue("division", val)}
            >
              <SelectTrigger id="division" className="h-9.5 text-xs w-full">
                <SelectValue placeholder={dict.schoolForm.divisionLabel} />
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
              {dict.schoolForm.districtLabel} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="district"
              placeholder={dict.schoolForm.districtPlaceholder}
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
              {dict.schoolForm.upazilaLabel} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="upazila"
              placeholder={dict.schoolForm.upazilaPlaceholder}
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
              {dict.schoolForm.clusterLabel} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="cluster"
              placeholder={dict.schoolForm.clusterPlaceholder}
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
              {dict.schoolForm.section3Title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {dict.schoolForm.section3Sub}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Detailed Address */}
          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="address" className="text-xs font-semibold">
              {dict.schoolForm.addressLabel}
            </Label>
            <Input
              id="address"
              placeholder={dict.schoolForm.addressPlaceholder}
              className="h-9.5 text-xs"
              {...register("address")}
            />
          </div>

          {/* School Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold flex items-center gap-1">
              {dict.schoolForm.phoneLabel}
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder={dict.schoolForm.phonePlaceholder}
              className={`h-9.5 text-xs font-mono ${errors.phone ? "border-destructive" : ""}`}
              {...register("phone")}
            />
            {errors.phone ? (
              <p className="text-[11px] text-destructive">{errors.phone.message}</p>
            ) : (
              <p className="text-[11px] text-muted-foreground">
                {dict.schoolForm.phoneHelp}
              </p>
            )}
          </div>

          {/* School Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              {dict.schoolForm.emailLabel}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={dict.schoolForm.emailPlaceholder}
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
                {dict.schoolForm.section4Title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {dict.schoolForm.section4Sub}
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
            <span>{dict.schoolForm.createAdminCheckbox}</span>
          </label>
        </div>

        {createAdmin ? (
          <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4 sm:p-5 space-y-4">
            <div className="flex items-start gap-2.5 text-xs text-foreground/90">
              <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5" />
              <div className="leading-relaxed">
                {dict.schoolForm.adminSecurityPolicy}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
              {/* Admin Full Name */}
              <div className="sm:col-span-2 lg:col-span-1 space-y-1.5">
                <Label htmlFor="admin_full_name" className="text-xs font-semibold flex items-center gap-1">
                  {dict.schoolForm.adminNameLabel} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="admin_full_name"
                  placeholder={dict.schoolForm.adminNamePlaceholder}
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
                  {dict.schoolForm.adminPhoneLabel} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="admin_phone"
                  type="tel"
                  placeholder={dict.schoolForm.adminPhonePlaceholder}
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
                    {dict.schoolForm.adminPhoneHelp}
                  </p>
                )}
              </div>

              {/* Admin Email */}
              <div className="space-y-1.5">
                <Label htmlFor="admin_email" className="text-xs font-semibold">
                  {dict.schoolForm.adminEmailLabel}
                </Label>
                <Input
                  id="admin_email"
                  type="email"
                  placeholder={dict.schoolForm.adminEmailPlaceholder}
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
            {dict.schoolForm.noAdminNotice}
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
              {dict.schoolForm.cancelBtn}
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
            {dict.schoolForm.resetBtn}
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
              <span>{dict.schoolForm.savingBtn}</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span>{dict.schoolForm.submitOnboardBtn}</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
