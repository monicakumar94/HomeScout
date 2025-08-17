"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ContactForm from "./contact-form"

interface PropertyInquiryModalProps {
  propertyId: number
  propertyTitle: string
  agentName: string
  agentEmail: string
  triggerText: string
  triggerIcon?: React.ReactNode
  type?: "property" | "tour"
}

export default function PropertyInquiryModal({
  propertyId,
  propertyTitle,
  agentName,
  agentEmail,
  triggerText,
  triggerIcon,
  type = "property",
}: PropertyInquiryModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant={type === "tour" ? "default" : "outline"}>
          {triggerIcon}
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{type === "tour" ? "Schedule a Tour" : "Property Inquiry"}</DialogTitle>
        </DialogHeader>
        <ContactForm
          propertyId={propertyId}
          propertyTitle={propertyTitle}
          agentName={agentName}
          agentEmail={agentEmail}
          type={type}
        />
      </DialogContent>
    </Dialog>
  )
}
