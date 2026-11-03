"use client";

import * as React from "react";
import { Building2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SchoolUpdateFormData } from "./schools.types";
import { SchoolUpdateForm } from "./school-update-form";

export interface SchoolEditDialogProps {
  schoolId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (updatedSchool: SchoolUpdateFormData) => void;
}

export function SchoolEditDialog({
  schoolId,
  open,
  onOpenChange,
  onSuccess,
}: SchoolEditDialogProps) {
  const handleSuccess = (updatedSchool: SchoolUpdateFormData) => {
    onSuccess?.(updatedSchool);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:rounded-xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">বিদ্যালয়ের তথ্য সম্পাদনা</DialogTitle>
              <DialogDescription className="text-xs">
                বিদ্যমান বিদ্যালয়ের তথ্য হালনাগাদ করুন। জিপিএস কোড অপরিবর্তনীয়।
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {schoolId ? (
          <div className="py-2">
            <SchoolUpdateForm
              schoolId={schoolId}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
