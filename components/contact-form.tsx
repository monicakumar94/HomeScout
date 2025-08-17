"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface ContactFormProps {
  propertyId?: number
  propertyTitle?: string
  agentName?: string
  agentEmail?: string
  type?: "general" | "property" | "tour"
}

export default function ContactForm({
  propertyId,
  propertyTitle,
  agentName,
  agentEmail,
  type = "general",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    inquiryType: type === "property" ? "property-inquiry" : "general",
    preferredContact: "email",
    tourDate: "",
    tourTime: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message Sent!",
      description: `Your ${type === "tour" ? "tour request" : "inquiry"} has been sent successfully. ${agentName || "Our team"} will contact you soon.`,
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      inquiryType: type === "property" ? "property-inquiry" : "general",
      preferredContact: "email",
      tourDate: "",
      tourTime: "",
    })

    setIsSubmitting(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {type === "tour" ? "Schedule a Tour" : type === "property" ? `Inquire About ${propertyTitle}` : "Contact Us"}
        </CardTitle>
        {propertyTitle && type === "property" && (
          <p className="text-sm text-muted-foreground">Get more information about this property from {agentName}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>

          {type !== "property" && (
            <div className="space-y-2">
              <Label htmlFor="inquiryType">Inquiry Type</Label>
              <Select value={formData.inquiryType} onValueChange={(value) => handleChange("inquiryType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Information</SelectItem>
                  <SelectItem value="buying">Buying a Property</SelectItem>
                  <SelectItem value="selling">Selling a Property</SelectItem>
                  <SelectItem value="renting">Renting</SelectItem>
                  <SelectItem value="investment">Investment Opportunities</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {type === "tour" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tourDate">Preferred Date</Label>
                <Input
                  id="tourDate"
                  type="date"
                  value={formData.tourDate}
                  onChange={(e) => handleChange("tourDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tourTime">Preferred Time</Label>
                <Select value={formData.tourTime} onValueChange={(value) => handleChange("tourTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="preferredContact">Preferred Contact Method</Label>
            <Select
              value={formData.preferredContact}
              onValueChange={(value) => handleChange("preferredContact", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="How would you like to be contacted?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="text">Text Message</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder={
                type === "tour"
                  ? "Any specific questions or requirements for the tour?"
                  : type === "property"
                    ? "What would you like to know about this property?"
                    : "How can we help you with your real estate needs?"
              }
              rows={4}
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : type === "tour" ? "Request Tour" : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
