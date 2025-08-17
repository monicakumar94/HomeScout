"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Wifi,
  Dumbbell,
  ShowerHeadIcon as SwimmingPool,
  Trees,
  Shield,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PropertyInquiryModal from "@/components/property-inquiry-modal"

// Extended property data with more details
const propertyDetails = {
  1: {
    id: 1,
    title: "Modern Downtown Condo",
    price: 850000,
    location: "Downtown Seattle, WA",
    address: "1234 Pine Street, Seattle, WA 98101",
    beds: 2,
    baths: 2,
    sqft: "1,200",
    yearBuilt: 2019,
    type: "Condo",
    featured: true,
    description:
      "Experience urban living at its finest in this stunning modern condo located in the heart of downtown Seattle. Floor-to-ceiling windows offer breathtaking city views, while the open-concept design maximizes space and natural light. Premium finishes throughout include hardwood floors, quartz countertops, and stainless steel appliances.",
    images: [
      "/modern-downtown-condo.png",
      "/modern-condo-living-room.png",
      "/modern-condo-kitchen.png",
      "/modern-condo-bedroom.png",
      "/modern-condo-bathroom.png",
    ],
    amenities: [
      { icon: Car, label: "Parking Garage" },
      { icon: Wifi, label: "High-Speed Internet" },
      { icon: Dumbbell, label: "Fitness Center" },
      { icon: SwimmingPool, label: "Rooftop Pool" },
      { icon: Shield, label: "24/7 Security" },
      { icon: Trees, label: "Rooftop Garden" },
    ],
    agent: {
      name: "Sarah Johnson",
      title: "Senior Real Estate Agent",
      phone: "(206) 555-0123",
      email: "sarah.johnson@realestatepro.com",
      image: "/professional-woman-realtor.png",
    },
    features: [
      "Floor-to-ceiling windows",
      "Hardwood floors throughout",
      "Quartz countertops",
      "Stainless steel appliances",
      "In-unit washer/dryer",
      "Central air conditioning",
      "Private balcony",
      "Storage unit included",
    ],
  },
  2: {
    id: 2,
    title: "Suburban Family Home",
    price: 1250000,
    location: "Bellevue, WA",
    address: "5678 Maple Avenue, Bellevue, WA 98004",
    beds: 4,
    baths: 3,
    sqft: "2,800",
    yearBuilt: 2015,
    type: "House",
    featured: false,
    description:
      "Perfect family home in prestigious Bellevue neighborhood. This spacious two-story home features an open floor plan, gourmet kitchen, and large backyard perfect for entertaining. Located in top-rated school district with easy access to parks and shopping.",
    images: [
      "/suburban-family-home.png",
      "/suburban-living-room.png",
      "/suburban-home-kitchen.png",
      "/suburban-master-bedroom.png",
      "/suburban-backyard.png",
    ],
    amenities: [
      { icon: Car, label: "2-Car Garage" },
      { icon: Trees, label: "Large Backyard" },
      { icon: Wifi, label: "Smart Home Features" },
      { icon: Shield, label: "Security System" },
    ],
    agent: {
      name: "Michael Chen",
      title: "Family Home Specialist",
      phone: "(425) 555-0456",
      email: "michael.chen@realestatepro.com",
      image: "/professional-realtor.png",
    },
    features: [
      "Open floor plan",
      "Gourmet kitchen with island",
      "Master suite with walk-in closet",
      "Hardwood and tile flooring",
      "Two-car attached garage",
      "Landscaped backyard",
      "Top-rated school district",
      "Near parks and shopping",
    ],
  },
  // Add more properties as needed
}

export default function PropertyDetail() {
  const params = useParams()
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const propertyId = Number.parseInt(params.id as string)
  const property = propertyDetails[propertyId as keyof typeof propertyDetails]

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <Button onClick={() => router.push("/")}>Back to Listings</Button>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-bold text-primary">RealEstate Pro</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline">Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <section className="relative">
        <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
          <img
            src={property.images[currentImageIndex] || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          {property.featured && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Featured</Badge>
          )}
        </div>

        {/* Image Thumbnails */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                  currentImageIndex === index ? "border-primary" : "border-transparent"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Property Details */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="text-sm">
                  {property.type}
                </Badge>
                <span className="text-3xl font-bold text-primary">{formatPrice(property.price)}</span>
              </div>

              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>

              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{property.address}</span>
              </div>

              <div className="flex items-center gap-6 text-lg">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{property.beds}</span>
                  <span className="text-muted-foreground ml-1">beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{property.baths}</span>
                  <span className="text-muted-foreground ml-1">baths</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{property.sqft}</span>
                  <span className="text-muted-foreground ml-1">sqft</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{property.yearBuilt}</span>
                  <span className="text-muted-foreground ml-1">built</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">About This Property</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            <Separator />

            {/* Features */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center p-3 bg-muted rounded-lg">
                    <amenity.icon className="h-5 w-5 mr-3 text-primary" />
                    <span className="text-sm font-medium">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Agent */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={property.agent.image || "/placeholder.svg"} alt={property.agent.name} />
                    <AvatarFallback>
                      {property.agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{property.agent.name}</h3>
                    <p className="text-sm text-muted-foreground">{property.agent.title}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="lg" asChild>
                    <a href={`tel:${property.agent.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call {property.agent.phone}
                    </a>
                  </Button>
                  <PropertyInquiryModal
                    propertyId={property.id}
                    propertyTitle={property.title}
                    agentName={property.agent.name}
                    agentEmail={property.agent.email}
                    triggerText="Email Agent"
                    triggerIcon={<Mail className="h-4 w-4 mr-2" />}
                    type="property"
                  />
                  <PropertyInquiryModal
                    propertyId={property.id}
                    propertyTitle={property.title}
                    agentName={property.agent.name}
                    agentEmail={property.agent.email}
                    triggerText="Send Message"
                    triggerIcon={<MessageSquare className="h-4 w-4 mr-2" />}
                    type="property"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Schedule Tour */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule a Tour</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  See this property in person. Schedule a private showing today.
                </p>
                <PropertyInquiryModal
                  propertyId={property.id}
                  propertyTitle={property.title}
                  agentName={property.agent.name}
                  agentEmail={property.agent.email}
                  triggerText="Schedule Tour"
                  triggerIcon={<Calendar className="h-4 w-4 mr-2" />}
                  type="tour"
                />
              </CardContent>
            </Card>

            {/* Mortgage Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Mortgage Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Price:</span>
                    <span className="font-medium">{formatPrice(property.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Down Payment (20%):</span>
                    <span className="font-medium">{formatPrice(property.price * 0.2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Monthly Payment:</span>
                    <span className="font-medium text-primary">{formatPrice(property.price * 0.8 * 0.005)}/mo</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Get Pre-Approved
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
