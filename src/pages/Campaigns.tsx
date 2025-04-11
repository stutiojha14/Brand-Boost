
import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AppSidebar from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, CreditCard, Filter, MoreHorizontal, Plus, Sparkles, Target, Zap } from "lucide-react";
import { toast } from "sonner";

const campaigns = [
  {
    id: 1,
    name: "Summer Collection Launch",
    status: "active",
    platform: "Instagram",
    budget: 2500,
    spent: 1200,
    impressions: 45000,
    engagement: 3200,
    startDate: "2025-06-01",
    endDate: "2025-06-30"
  },
  {
    id: 2,
    name: "Holiday Season Promotion",
    status: "scheduled",
    platform: "Facebook",
    budget: 3500,
    spent: 0,
    impressions: 0,
    engagement: 0,
    startDate: "2025-11-15",
    endDate: "2025-12-25"
  },
  {
    id: 3,
    name: "Product Launch - Alpha Series",
    status: "draft",
    platform: "Multiple",
    budget: 5000,
    spent: 0,
    impressions: 0,
    engagement: 0,
    startDate: "",
    endDate: ""
  },
  {
    id: 4,
    name: "Brand Awareness Campaign",
    status: "completed",
    platform: "LinkedIn",
    budget: 1800,
    spent: 1798,
    impressions: 32000,
    engagement: 2100,
    startDate: "2025-02-10",
    endDate: "2025-03-10"
  }
];

const Campaigns = () => {
  const [aiAssistOpen, setAiAssistOpen] = useState(false);

  const generateAiRecommendation = () => {
    setAiAssistOpen(true);
    setTimeout(() => {
      setAiAssistOpen(false);
      toast.success("AI recommendations generated", {
        description: "We've analyzed your campaign data and created personalized recommendations."
      });
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "draft":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      case "completed":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <NavBar />
          <main className="flex-grow">
            <div className="container mx-auto px-4 py-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h1 className="text-3xl font-bold">Campaign Management</h1>
                  <p className="text-muted-foreground mt-1">Create, manage and optimize your marketing campaigns</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Button variant="outline" className="flex-1" onClick={generateAiRecommendation}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {aiAssistOpen ? "Generating..." : "AI Recommendations"}
                  </Button>
                  <Button className="flex-1">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Campaign
                  </Button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full md:w-80">
                  <Input placeholder="Search campaigns..." className="pl-9" />
                  <div className="absolute left-3 top-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">Sort By</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Name</DropdownMenuItem>
                      <DropdownMenuItem>Date Created</DropdownMenuItem>
                      <DropdownMenuItem>Status</DropdownMenuItem>
                      <DropdownMenuItem>Budget</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <Tabs defaultValue="all" className="mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Campaigns</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="draft">Drafts</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {campaigns.map(campaign => (
                      <Card key={campaign.id} className="overflow-hidden transition-all hover:shadow-md">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <CardTitle className="text-xl">{campaign.name}</CardTitle>
                              <CardDescription>{campaign.platform}</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(campaign.status)}>
                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                  <DropdownMenuItem>Archive</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Budget</p>
                              <p className="font-medium">${campaign.budget.toLocaleString()}</p>
                              {campaign.status !== "draft" && (
                                <div className="mt-1">
                                  <Progress value={(campaign.spent / campaign.budget) * 100} className="h-1" />
                                  <p className="text-xs text-muted-foreground mt-1">
                                    ${campaign.spent.toLocaleString()} spent
                                  </p>
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Performance</p>
                              {campaign.status === "completed" || campaign.status === "active" ? (
                                <div>
                                  <p className="font-medium">{campaign.impressions.toLocaleString()} impressions</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {campaign.engagement.toLocaleString()} engagements
                                  </p>
                                </div>
                              ) : (
                                <p className="font-medium">Not started</p>
                              )}
                            </div>
                          </div>
                          {(campaign.startDate || campaign.status === "draft") && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              {campaign.status === "draft" ? (
                                <Target className="h-4 w-4 mr-1" />
                              ) : (
                                <Calendar className="h-4 w-4 mr-1" />
                              )}
                              <span>
                                {campaign.status === "draft" 
                                  ? "No date set" 
                                  : `${new Date(campaign.startDate).toLocaleDateString()} - ${new Date(campaign.endDate).toLocaleDateString()}`}
                              </span>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="pt-2 flex justify-between">
                          <Button variant="ghost" size="sm">View Details</Button>
                          {campaign.status !== "completed" && (
                            <Button variant="outline" size="sm" className="gap-1">
                              {campaign.status === "active" ? (
                                <>
                                  <Zap className="h-4 w-4" />
                                  Optimize
                                </>
                              ) : campaign.status === "draft" ? (
                                "Continue Setup"
                              ) : (
                                <>
                                  <Clock className="h-4 w-4" />
                                  Reschedule
                                </>
                              )}
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="active">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {campaigns.filter(c => c.status === "active").map(campaign => (
                      // Same card structure as above
                      <Card key={campaign.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <CardTitle className="text-xl">{campaign.name}</CardTitle>
                              <CardDescription>{campaign.platform}</CardDescription>
                            </div>
                            <Badge className={getStatusColor(campaign.status)}>
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Budget</p>
                                <p className="font-medium">${campaign.budget.toLocaleString()}</p>
                                <div className="mt-1">
                                  <Progress value={(campaign.spent / campaign.budget) * 100} className="h-1" />
                                  <p className="text-xs text-muted-foreground mt-1">
                                    ${campaign.spent.toLocaleString()} spent
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Performance</p>
                                <p className="font-medium">{campaign.impressions.toLocaleString()} impressions</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {campaign.engagement.toLocaleString()} engagements
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>
                                {`${new Date(campaign.startDate).toLocaleDateString()} - ${new Date(campaign.endDate).toLocaleDateString()}`}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="ghost" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">
                            <Zap className="h-4 w-4 mr-1" />
                            Optimize
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Similar structure for other tabs */}
                <TabsContent value="scheduled">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {campaigns.filter(c => c.status === "scheduled").map(campaign => (
                      <Card key={campaign.id}>
                        {/* Similar card structure */}
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl">{campaign.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Scheduled content</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="draft">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {campaigns.filter(c => c.status === "draft").map(campaign => (
                      <Card key={campaign.id}>
                        {/* Similar card structure */}
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl">{campaign.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Draft content</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="completed">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {campaigns.filter(c => c.status === "completed").map(campaign => (
                      <Card key={campaign.id}>
                        {/* Similar card structure */}
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl">{campaign.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Completed content</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <section className="mt-12 mb-8">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-100 dark:border-purple-900/50 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="max-w-2xl">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        AI Campaign Assistant
                      </h2>
                      <p className="text-muted-foreground mt-2">
                        Let our AI analyze your campaign data and provide tailored recommendations 
                        for optimization. Get insights on targeting, creative direction, and budget allocation 
                        based on industry benchmarks and your historical performance.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 w-full md:w-auto">
                      <Button 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full"
                        onClick={generateAiRecommendation}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {aiAssistOpen ? "Generating..." : "Generate AI Recommendations"}
                      </Button>
                      <Button variant="outline" className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Upgrade For More Credits
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Campaigns;
