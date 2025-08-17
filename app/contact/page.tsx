import ContactForm from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">RealEstate Pro</h1>
            <div className="flex items-center gap-4">
              <a href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </a>
              <a href="/contact" className="text-foreground font-medium">
                Contact
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to find your dream home or sell your property? Our experienced team is here to help you every step of
            the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-sm text-muted-foreground">Call us directly</p>
                  </div>
                </div>
                <p className="font-medium">(206) 555-0100</p>
                <p className="text-sm text-muted-foreground">Mon-Fri 8AM-8PM, Sat-Sun 9AM-6PM</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground">Send us a message</p>
                  </div>
                </div>
                <p className="font-medium">info@realestatepro.com</p>
                <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Office</h3>
                    <p className="text-sm text-muted-foreground">Visit us in person</p>
                  </div>
                </div>
                <p className="font-medium">123 Real Estate Way</p>
                <p className="text-sm text-muted-foreground">Seattle, WA 98101</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="text-sm text-muted-foreground">When we're available</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>10:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm type="general" />
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">How quickly can I schedule a property viewing?</h3>
                <p className="text-sm text-muted-foreground">
                  Most viewings can be scheduled within 24-48 hours. For urgent requests, we offer same-day viewings
                  when possible.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Do you charge buyers for your services?</h3>
                <p className="text-sm text-muted-foreground">
                  No, our buyer services are completely free. We're compensated by the seller when a transaction closes.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can you help with mortgage pre-approval?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes! We work with trusted lenders and can connect you with mortgage professionals to get pre-approved.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What areas do you serve?</h3>
                <p className="text-sm text-muted-foreground">
                  We serve the greater Seattle metropolitan area, including Bellevue, Kirkland, Redmond, and surrounding
                  communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
