import { z } from "zod";

export const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;
export const GPS_CODE_REGEX = /^\d{8}$/;

export const BANGLADESH_DIVISIONS = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
] as const;

export const schoolFormSchema = z
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

export type SchoolFormValues = z.infer<typeof schoolFormSchema>;

export const schoolUpdateFormSchema = z.object({
  name: z.string().min(1, "বিদ্যালয়ের নাম আবশ্যক"),
  division: z.string().min(1, "বিভাগ নির্বাচন করুন"),
  district: z.string().min(1, "জেলা আবশ্যক"),
  upazila: z.string().min(1, "উপজেলা আবশ্যক"),
  cluster: z.string().min(1, "ক্লাস্টার আবশ্যক"),
  address: z.string().optional(),
  phone: z
    .string()
    .regex(BD_PHONE_REGEX, "১১ ডিজিটের সঠিক ফোন নম্বর দিন (যেমন: 01712345678)")
    .optional()
    .or(z.literal("")),
  is_active: z.enum(["true", "false"]),
});

export type SchoolUpdateFormValues = z.infer<typeof schoolUpdateFormSchema>;

