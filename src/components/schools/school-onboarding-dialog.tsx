"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Building2,
  UserCheck,
  MapPin,
  Phone,
  Mail,
  Hash,
  Loader2,
  Plus,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { httpClient } from "@/lib/httpClient";

// -------------------------------------------------------------
// Validation Constants (Aligned with backend school.validators.ts)
// -------------------------------------------------------------
const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;
const GPS_CODE_REGEX = /^\d{8}$/;

const BANGLADESH_DIVISIONS = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
] as const;

// -------------------------------------------------------------
// Zod Form Schema matching backend Onboard/Create validation
// -------------------------------------------------------------
const formSchema = z
  .object({
    // School Details
    name: z.string().min(1, "বিদ্যালয়ের নাম আবশ্যক"),
    gps_code: z
      .string()
      .regex(GPS_CODE_REGEX, "জিপিএস কোড অবশ্যই ৮ ডিজিটের সংখ্যা হতে হবে (যেমন: 10203040)"),
    division: z.string().min(1, "বিভাগ নির্বাচন করুন"),
    district: z.string().min(1, "জেলা আবশ্যক"),
    upazila: z.string().min(1, "উপজেলা আবশ্যক"),
    cluster: z.string().min(1, "ক্লাস্টার আবশ্যক"),
    address: z.string().optional(),
    email: z
      .string()
      .email("সঠিক ইমেইল ঠিকানা দিন")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .regex(BD_PHONE_REGEX, "১১ ডিজিটের সঠিক ফোন নম্বর দিন (যেমন: 01712345678)")
      .optional()
      .or(z.literal("")),
    is_active: z.enum(["true", "false"]),

    // Admin Details Flag
    createAdmin: z.boolean(),

    // Admin Details
    admin_full_name: z.string().optional(),
    admin_phone: z.string().optional(),
    admin_email: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.createAdmin) {
      if (!data.admin_full_name || data.admin_full_name.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["admin_full_name"],
          message: "অ্যাডমিনের পুরো নাম আবশ্যক",
        });
      }

      if (!data.admin_phone || !BD_PHONE_REGEX.test(data.admin_phone.trim())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["admin_phone"],
          message: "অ্যাডমিনের সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)",
        });
      }

      if (data.admin_email && data.admin_email.trim().length > 0) {
        const emailValidation = z.string().email().safeParse(data.admin_email.trim());
        if (!emailValidation.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["admin_email"],
            message: "সঠিক অ্যাডমিন ইমেইল দিন",
          });
        }
      }
    }
  });

export type SchoolFormValues = z.infer<typeof formSchema>;

export interface CreatedSchoolResult {
  id: string;
  name: string;
  gps_code: string;
  division: string;
  district: string;
  upazila: string;
  cluster: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  is_active: boolean;
  created_at?: string;
}

interface SchoolOnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (school: CreatedSchoolResult) => void;
}

export function SchoolOnboardingDialog({
  open,
  onOpenChange,
  onSuccess,
}: SchoolOnboardingDialogProps) {
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
    resolver: zodResolver(formSchema),
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
        // Calls backend POST /api/v1/schools/onboard (onboardSchool)
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

        const res = await httpClient.post<{
          school: CreatedSchoolResult;
          admin: unknown;
        }>("/schools/onboard", payload);

        // https://skilled-profusely-foil.ngrok-free.dev/api/v1/schools/onboard


        createdSchoolData = res.data?.school ?? {
          id: `sch-${Date.now()}`,
          ...payload.school,
          is_active: payload.school.is_active,
          created_at: new Date().toISOString(),
        };

        toast.success("বিদ্যালয় ও অ্যাডমিন অ্যাকাউন্ট সফলভাবে নিবন্ধিত হয়েছে!");
      } else {
        // Calls backend POST /api/v1/schools (createSchool)
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

        const res = await httpClient.post<CreatedSchoolResult>("/schools", payload);
        createdSchoolData = res.data ?? {
          id: `sch-${Date.now()}`,
          ...payload,
          is_active: payload.is_active,
          created_at: new Date().toISOString(),
        };

        toast.success("বিদ্যালয় সফলভাবে যুক্ত করা হয়েছে!");
      }

      // Notify parent callback and invalidate queries
      onSuccess?.(createdSchoolData);
      queryClient.invalidateQueries({ queryKey: ["schools"] });

      // Reset & close
      reset();
      onOpenChange(false);
    } catch (err: unknown) {
      console.error("Failed to onboard school:", err);
      // Extract backend error message if available
      let message = "বিদ্যালয় নিবন্ধন করতে ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।";
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[92vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4 border-b bg-muted/20">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-lg sm:text-xl font-bold text-foreground">
                  নতুন বিদ্যালয় অনবোর্ডিং ও নিবন্ধন
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  জাতীয় শিক্ষা ব্যাক-অফিস সিস্টেমে নতুন বিদ্যালয় এবং অ্যাডমিন ইউজারের তথ্য যুক্ত করুন
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Form Body - Scrollable */}
        <form
          id="school-onboard-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* Section 1: School Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  বিদ্যালয়ের তথ্যাবলি (School Details)
                </h3>
              </div>
              <Badge variant="outline" className="text-[11px] font-normal">
                প্রয়োজনীয় ফিল্ডগুলোতে * চিহ্ন রয়েছে
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* School Name */}
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="name" className="text-xs font-semibold">
                  বিদ্যালয়ের নাম <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="যেমন: ঢাকা গভঃ হাই স্কুল / ভিকারুননিসা নূন স্কুল"
                  className={errors.name ? "border-destructive" : ""}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* GPS Code */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="gps_code" className="text-xs font-semibold">
                    জিপিএস কোড (GPS Code) <span className="text-destructive">*</span>
                  </Label>
                  <span className="text-[10px] text-muted-foreground font-mono">৮ ডিজিট</span>
                </div>
                <Input
                  id="gps_code"
                  placeholder="যেমন: 10203040"
                  maxLength={8}
                  className={errors.gps_code ? "border-destructive font-mono" : "font-mono"}
                  {...register("gps_code")}
                />
                {errors.gps_code ? (
                  <p className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.gps_code.message}
                  </p>
                ) : (
                  <p className="text-[10px] text-muted-foreground">
                    শিক্ষা অধিদপ্তর কর্তৃক নির্ধারিত অনন্য কোড
                  </p>
                )}
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <Label htmlFor="is_active" className="text-xs font-semibold">
                  স্ট্যাটাস (Status)
                </Label>
                <Select
                  value={selectedStatus}
                  onValueChange={(val) => setValue("is_active", val as "true" | "false")}
                >
                  <SelectTrigger id="is_active" className="w-full h-9">
                    <SelectValue placeholder="স্ট্যাটাস নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">সক্রিয় (Active)</SelectItem>
                    <SelectItem value="false">নিষ্ক্রিয় (Inactive)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Division */}
              <div className="space-y-1.5">
                <Label htmlFor="division" className="text-xs font-semibold">
                  বিভাগ (Division) <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={selectedDivision}
                  onValueChange={(val) => setValue("division", val)}
                >
                  <SelectTrigger id="division" className="w-full h-9">
                    <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {BANGLADESH_DIVISIONS.map((div) => (
                      <SelectItem key={div} value={div}>
                        {div}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.division && (
                  <p className="text-[11px] text-destructive mt-1">
                    {errors.division.message}
                  </p>
                )}
              </div>

              {/* District */}
              <div className="space-y-1.5">
                <Label htmlFor="district" className="text-xs font-semibold">
                  জেলা (District) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="district"
                  placeholder="যেমন: Dhaka, Panchagarh, Cumilla"
                  className={errors.district ? "border-destructive" : ""}
                  {...register("district")}
                />
                {errors.district && (
                  <p className="text-[11px] text-destructive mt-1">
                    {errors.district.message}
                  </p>
                )}
              </div>

              {/* Upazila */}
              <div className="space-y-1.5">
                <Label htmlFor="upazila" className="text-xs font-semibold">
                  উপজেলা / থানা (Upazila) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="upazila"
                  placeholder="যেমন: Mirpur, Sadar, Dhanmondi"
                  className={errors.upazila ? "border-destructive" : ""}
                  {...register("upazila")}
                />
                {errors.upazila && (
                  <p className="text-[11px] text-destructive mt-1">
                    {errors.upazila.message}
                  </p>
                )}
              </div>

              {/* Cluster */}
              <div className="space-y-1.5">
                <Label htmlFor="cluster" className="text-xs font-semibold">
                  ক্লাস্টার (Cluster) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cluster"
                  placeholder="যেমন: Cluster-01, Harivasa, Sadar"
                  className={errors.cluster ? "border-destructive" : ""}
                  {...register("cluster")}
                />
                {errors.cluster && (
                  <p className="text-[11px] text-destructive mt-1">
                    {errors.cluster.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="address" className="text-xs font-semibold">
                  বিস্তারিত ঠিকানা (Address)
                </Label>
                <Input
                  id="address"
                  placeholder="যেমন: রোড নং ৪, মিরপুর-১০, ঢাকা-১২১৬"
                  {...register("address")}
                />
              </div>

              {/* School Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-semibold">
                  বিদ্যালয়ের ফোন নম্বর
                </Label>
                <Input
                  id="phone"
                  placeholder="যেমন: 01711223344"
                  className={errors.phone ? "border-destructive" : ""}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-[11px] text-destructive mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* School Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold">
                  বিদ্যালয়ের ইমেইল ঠিকানা
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="যেমন: info@school.edu.bd"
                  className={errors.email ? "border-destructive" : ""}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-[11px] text-destructive mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Section 2: School Administrator Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  প্রাতিষ্ঠানিক অ্যাডমিন একাউন্ট (Primary School Admin)
                </h3>
              </div>
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                  checked={createAdmin}
                  onChange={(e) => setValue("createAdmin", e.target.checked)}
                />
                অ্যাডমিন অ্যাকাউন্ট তৈরি করুন
              </label>
            </div>

            {createAdmin ? (
              <div className="rounded-lg border bg-card/50 p-4 space-y-4">
                <div className="flex items-start gap-2.5 rounded-md bg-primary/5 border border-primary/15 p-3 text-xs text-primary">
                  <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">অনবোর্ডিং সিকিউরিটি রুল: </span>
                    বিদ্যালয় অনবোর্ড করার সময় একজন দায়িত্বপ্রাপ্ত অ্যাডমিন তৈরি করা বাধ্যতামূলক। এই মোবাইল নম্বর দিয়ে তিনি পরবর্তীতে সিস্টেমে লগইন করতে পারবেন।
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Admin Name */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label htmlFor="admin_full_name" className="text-xs font-semibold">
                      অ্যাডমিনের পুরো নাম <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="admin_full_name"
                      placeholder="যেমন: ড. মোহাম্মদ রফিকুল ইসলাম"
                      className={errors.admin_full_name ? "border-destructive" : ""}
                      {...register("admin_full_name")}
                    />
                    {errors.admin_full_name && (
                      <p className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.admin_full_name.message}
                      </p>
                    )}
                  </div>

                  {/* Admin Phone */}
                  <div className="space-y-1.5">
                    <Label htmlFor="admin_phone" className="text-xs font-semibold">
                      মোবাইল নম্বর (লগইন আইডি) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="admin_phone"
                      placeholder="যেমন: 01812345678"
                      className={errors.admin_phone ? "border-destructive" : ""}
                      {...register("admin_phone")}
                    />
                    {errors.admin_phone ? (
                      <p className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.admin_phone.message}
                      </p>
                    ) : (
                      <p className="text-[10px] text-muted-foreground">
                        সিস্টেমে অনন্য ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর
                      </p>
                    )}
                  </div>

                  {/* Admin Email */}
                  <div className="space-y-1.5">
                    <Label htmlFor="admin_email" className="text-xs font-semibold">
                      অ্যাডমিনের ইমেইল
                    </Label>
                    <Input
                      id="admin_email"
                      type="email"
                      placeholder="যেমন: admin@school.gov.bd"
                      className={errors.admin_email ? "border-destructive" : ""}
                      {...register("admin_email")}
                    />
                    {errors.admin_email && (
                      <p className="text-[11px] text-destructive mt-1">
                        {errors.admin_email.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">
                অ্যাডমিন তৈরি নিষ্ক্রিয় রাখা হয়েছে। শুধুমাত্র স্ট্যান্ডঅ্যালোন বিদ্যালয় এন্ট্রি করা হবে।
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 border-t bg-muted/20 flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isSubmitting}
            onClick={() => onOpenChange(false)}
            className="text-xs"
          >
            বাতিল করুন
          </Button>
          <Button
            type="submit"
            form="school-onboard-form"
            size="sm"
            disabled={isSubmitting}
            className="text-xs font-semibold gap-1.5"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                নিবন্ধন সম্পন্ন হচ্ছে...
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                {createAdmin ? "বিদ্যালয় ও অ্যাডমিন অনবোর্ড করুন" : "বিদ্যালয় সংরক্ষণ করুন"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
