"use client"

import { useState, useMemo } from "react"
import { Search, MapPin, Bed, Bath, Square, Heart, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

const properties = [
  {
    id: 1,
    title: "Modern Downtown Condo",
    price: 850000,
    location: "Downtown Seattle, WA",
    beds: 2,
    baths: 2,
    sqft: "1,200",
    image: "/modern-downtown-condo.png",
    type: "Condo",
    featured: true,
  },
  {
    id: 2,
    title: "Suburban Family Home",
    price: 1250000,
    location: "Bellevue, WA",
    beds: 4,
    baths: 3,
    sqft: "2,800",
    image: "/suburban-family-home.png",
    type: "House",
    featured: false,
  },
  {
    id: 3,
    title: "Luxury Waterfront Villa",
    price: 2100000,
    location: "Mercer Island, WA",
    beds: 5,
    baths: 4,
    sqft: "4,200",
    image: "/luxury-waterfront-villa.png",
    type: "Villa",
    featured: true,
  },
  {
    id: 4,
    title: "Cozy Studio Apartment",
    price: 425000,
    location: "Capitol Hill, Seattle",
    beds: 1,
    baths: 1,
    sqft: "650",
    image: "/cozy-studio-apartment.png",
    type: "Apartment",
    featured: false,
  },
  {
    id: 5,
    title: "Historic Craftsman Home",
    price: 975000,
    location: "Fremont, Seattle",
    beds: 3,
    baths: 2,
    sqft: "1,850",
    image: "/historic-craftsman-home.png",
    type: "House",
    featured: false,
  },
  {
    id: 6,
    title: "New Construction Townhouse",
    price: 1450000,
    location: "Kirkland, WA",
    beds: 3,
    baths: 3,
    sqft: "2,200",
    image: "/new-construction-townhouse.png",
    type: "Townhouse",
    featured: true,
  },
]

export default function PropertyListings() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 3000000])
  const [minBeds, setMinBeds] = useState<string>("")
  const [minBaths, setMinBaths] = useState<string>("")
  const [sortBy, setSortBy] = useState("price-asc")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const filteredAndSortedProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase())

      // Property type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(property.type)

      // Price range filter
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]

      // Bedroom filter
      const matchesBeds = minBeds === "" || property.beds >= Number.parseInt(minBeds)

      // Bathroom filter
      const matchesBaths = minBaths === "" || property.baths >= Number.parseInt(minBaths)

      // Featured filter
      const matchesFeatured = !showFeaturedOnly || property.featured

      return matchesSearch && matchesType && matchesPrice && matchesBeds && matchesBaths && matchesFeatured
    })

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "beds-desc":
          return b.beds - a.beds
        case "sqft-desc":
          return Number.parseInt(b.sqft.replace(",", "")) - Number.parseInt(a.sqft.replace(",", ""))
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedTypes, priceRange, minBeds, minBaths, sortBy, showFeaturedOnly])

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTypes([])
    setPriceRange([0, 3000000])
    setMinBeds("")
    setMinBaths("")
    setShowFeaturedOnly(false)
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
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">RealEstate Pro</h1>
            <Button variant="outline">Sign In</Button>
          </div>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4">Find Your Dream Home</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the perfect property from our extensive collection of homes, condos, and commercial spaces.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 bg-background p-2 rounded-lg shadow-sm">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by location, property type, or keywords..."
                  className="pl-10 border-0 focus-visible:ring-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="px-8">Search Properties</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filters Bar */}
      <section className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            {/* Property Type Filters */}
            {["House", "Condo", "Apartment", "Townhouse", "Villa"].map((type) => (
              <Button
                key={type}
                variant={selectedTypes.includes(type) ? "default" : "outline"}
                size="sm"
                onClick={() => handleTypeToggle(type)}
              >
                {type}
              </Button>
            ))}

            {/* Quick Filters */}
            <Select value={minBeds} onValueChange={setMinBeds}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+ beds</SelectItem>
                <SelectItem value="2">2+ beds</SelectItem>
                <SelectItem value="3">3+ beds</SelectItem>
                <SelectItem value="4">4+ beds</SelectItem>
                <SelectItem value="5">5+ beds</SelectItem>
              </SelectContent>
            </Select>

            <Select value={minBaths} onValueChange={setMinBaths}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Baths" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+ baths</SelectItem>
                <SelectItem value="2">2+ baths</SelectItem>
                <SelectItem value="3">3+ baths</SelectItem>
                <SelectItem value="4">4+ baths</SelectItem>
              </SelectContent>
            </Select>

            {/* Advanced Filters Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Advanced Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={3000000}
                      min={0}
                      step={50000}
                      className="w-full"
                    />
                  </div>

                  {/* Featured Only */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="featured" checked={showFeaturedOnly} onCheckedChange={setShowFeaturedOnly} />
                    <label htmlFor="featured" className="text-sm font-medium">
                      Featured properties only
                    </label>
                  </div>

                  {/* Clear Filters */}
                  <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Active Filters Count */}
            {(selectedTypes.length > 0 || minBeds || minBaths || showFeaturedOnly || searchQuery) && (
              <Badge variant="secondary">
                {[
                  selectedTypes.length,
                  minBeds ? 1 : 0,
                  minBaths ? 1 : 0,
                  showFeaturedOnly ? 1 : 0,
                  searchQuery ? 1 : 0,
                ].reduce((a, b) => a + b, 0)}{" "}
                active
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">{filteredAndSortedProperties.length} Properties Available</h3>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="beds-desc">Most Bedrooms</SelectItem>
              <SelectItem value="sqft-desc">Largest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredAndSortedProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No properties match your current filters.</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button size="icon" variant="secondary" className="absolute top-3 right-3 h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  {property.featured && <Badge className="absolute top-3 left-3 bg-accent">Featured</Badge>}
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{property.type}</Badge>
                    <span className="text-2xl font-bold text-primary">{formatPrice(property.price)}</span>
                  </div>

                  <h4 className="font-semibold text-lg mb-2">{property.title}</h4>

                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.beds} beds</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.baths} baths</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4" asChild>
                    <Link href={`/property/${property.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredAndSortedProperties.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Properties
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold mb-4">RealEstate Pro</h5>
              <p className="text-sm text-muted-foreground">Your trusted partner in finding the perfect property.</p>
            </div>
            <div>
              <h6 className="font-medium mb-3">For Buyers</h6>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Search Properties</li>
                <li>Mortgage Calculator</li>
                <li>Buyer's Guide</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium mb-3">For Sellers</h6>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>List Your Property</li>
                <li>Property Valuation</li>
                <li>Seller's Guide</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium mb-3">Support</h6>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Contact Us</li>
                <li>Help Center</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
