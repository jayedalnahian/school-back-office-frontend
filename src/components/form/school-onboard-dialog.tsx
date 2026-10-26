"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SchoolOnboardForm } from "./school-onboard-form"

export interface SchoolOnboardDialogProps {
  /**
   * Controlled open state
   */
  open?: boolean

  /**
   * Controlled onOpenChange callback
   */
  onOpenChange?: (open: boolean) => void

  /**
   * Custom trigger element (defaults to "নতুন বিদ্যালয় যুক্ত করুন" button)
   */
  trigger?: React.ReactNode

  /**
   * Callback fired after successful school onboarding
   */
  onSuccess?: () => void
}

export function SchoolOnboardDialog({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  trigger,
  onSuccess,
}: SchoolOnboardDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const setOpen = isControlled ? setControlledOpen! : setInternalOpen

  const handleSuccess = () => {
    setOpen(false)
    onSuccess?.()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button
            size="sm"
            className="h-9 gap-1.5 text-xs font-semibold shadow-xs"
          >
            <Plus className="size-4" />
            নতুন বিদ্যালয় যুক্ত করুন
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:rounded-xl">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-lg font-bold">
            নতুন বিদ্যালয় অনবোর্ডিং (Onboard School)
          </DialogTitle>
          <DialogDescription className="text-xs">
            বিদ্যালয়ের ভৌগোলিক বিবরণ এবং প্রাথমিক স্কুল অ্যাডমিনের তথ্য প্রদান করে একযোগে অনবোর্ড করুন।
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <SchoolOnboardForm
            onSuccess={handleSuccess}
            onCancel={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
