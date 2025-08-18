"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Home,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  Star,
  Phone,
  Mail,
  MapPin,
  Bed,
  Bath,
  Square,
} from "lucide-react"

// Mock data for dashboard
const dashboardStats = {
  totalProperties: 24,
  activeListings: 18,
  totalInquiries: 156,
  monthlyRevenue: 485000,
  averagePrice: 1250000,
  viewsThisMonth: 2847,
}

const recentProperties = [
  {
    id: 1,
    title: "Modern Downtown Condo",
    price: 850000,
    location: "Downtown Seattle, WA",
    beds: 2,
    baths: 2,
    sqft: "1,200",
    status: "Active",
    views: 234,
    inquiries: 12,
    image: "/modern-downtown-condo.png",
    dateAdded: "2024-01-15",
  },
  {
    id: 2,
    title: "Suburban Family Home",
    price: 1250000,
    location: "Bellevue, WA",
    beds: 4,
    baths: 3,
    sqft: "2,800",
    status: "Pending",
    views: 189,
    inquiries: 8,
    image: "/suburban-family-home.png",
    dateAdded: "2024-01-10",
  },
  {
    id: 3,
    title: "Luxury Waterfront Villa",
    price: 2100000,
    location: "Mercer Island, WA",
    beds: 5,
    baths: 4,
    sqft: "4,200",
    status: "Active",
    views: 456,
    inquiries: 23,
    image: "/luxury-waterfront-villa.png",
    dateAdded: "2024-01-08",
  },
]

const recentInquiries = [
  {
    id: 1,
    propertyTitle: "Modern Downtown Condo",
    clientName: "John Smith",
    clientEmail: "john.smith@email.com",
    clientPhone: "(206) 555-0123",
    message: "I'm interested in scheduling a viewing for this weekend. Is Saturday morning available?",
    type: "Tour Request",
    date: "2024-01-16",
    status: "New",
  },
  {
    id: 2,
    propertyTitle: "Luxury Waterfront Villa",
    clientName: "Sarah Johnson",
    clientEmail: "sarah.j@email.com",
    clientPhone: "(425) 555-0456",
    message: "What's the HOA fee for this property? Also, are pets allowed?",
    type: "General Inquiry",
    date: "2024-01-15",
    status: "Responded",
  },
  {
    id: 3,
    propertyTitle: "Suburban Family Home",
    clientName: "Mike Chen",
    clientEmail: "mike.chen@email.com",
    clientPhone: "(206) 555-0789",
    message: "I'd like to make an offer. Can we discuss the terms?",
    type: "Offer Interest",
    date: "2024-01-14",
    status: "Priority",
  },
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sold":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInquiryStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-red-100 text-red-800"
      case "responded":
        return "bg-green-100 text-green-800"
      case "priority":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-primary">Homara Real Estate</h1>
              <Badge variant="secondary">Agent Dashboard</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <a href="/">View Public Site</a>
              </Button>
              <Avatar>
                <AvatarImage src="/professional-woman-realtor.png" alt="Agent" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h2>
          <p className="text-muted-foreground">Here's what's happening with your properties today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalProperties}</div>
              <p className="text-xs text-muted-foreground">{dashboardStats.activeListings} active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(dashboardStats.monthlyRevenue)}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalInquiries}</div>
              <p className="text-xs text-muted-foreground">23 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Property Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.viewsThisMonth.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="properties">My Properties</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Property Management</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Property
              </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Properties Table */}
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={property.image || "/placeholder.svg"}
                            alt={property.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{property.title}</div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {property.location}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{formatPrice(property.price)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Bed className="h-3 w-3 mr-1" />
                            {property.beds}
                          </div>
                          <div className="flex items-center">
                            <Bath className="h-3 w-3 mr-1" />
                            {property.baths}
                          </div>
                          <div className="flex items-center">
                            <Square className="h-3 w-3 mr-1" />
                            {property.sqft}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{property.views} views</div>
                          <div className="text-muted-foreground">{property.inquiries} inquiries</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Recent Inquiries</h3>
              <Badge variant="secondary">{recentInquiries.length} pending</Badge>
            </div>

            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <Card key={inquiry.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{inquiry.propertyTitle}</h4>
                        <p className="text-sm text-muted-foreground">
                          {inquiry.type} • {inquiry.date}
                        </p>
                      </div>
                      <Badge className={getInquiryStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{inquiry.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{inquiry.clientEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{inquiry.clientPhone}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{inquiry.message}</p>

                    <div className="flex gap-2">
                      <Button size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h3 className="text-2xl font-semibold">Performance Analytics</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Top Performing Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentProperties
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 3)
                      .map((property, index) => (
                        <div key={property.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{property.title}</div>
                              <div className="text-xs text-muted-foreground">{property.views} views</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{property.inquiries} inquiries</div>
                            <div className="text-xs text-muted-foreground">
                              {((property.inquiries / property.views) * 100).toFixed(1)}% rate
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Monthly Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Average Property Price</span>
                      <span className="font-medium">{formatPrice(dashboardStats.averagePrice)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Property Views</span>
                      <span className="font-medium">{dashboardStats.viewsThisMonth.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Conversion Rate</span>
                      <span className="font-medium">5.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Average Days on Market</span>
                      <span className="font-medium">28 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>New inquiry received for Modern Downtown Condo</span>
                    <span className="text-muted-foreground ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Property viewing scheduled for Suburban Family Home</span>
                    <span className="text-muted-foreground ml-auto">4 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Price updated for Luxury Waterfront Villa</span>
                    <span className="text-muted-foreground ml-auto">1 day ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>New property photos uploaded</span>
                    <span className="text-muted-foreground ml-auto">2 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
