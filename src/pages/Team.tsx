
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AppSidebar from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MessageCircle } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Marketing Director",
    avatar: "AJ",
    status: "online",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Content Creator",
    avatar: "SW",
    status: "away",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Brand Strategist",
    avatar: "MC",
    status: "online",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Graphic Designer",
    avatar: "ER",
    status: "offline",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "David Patel",
    role: "Data Analyst",
    avatar: "DP",
    status: "online",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
  }
];

const Team = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <NavBar />
          <main className="flex-grow">
            <div className="container mx-auto px-4 py-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Team Management</h1>
                  <p className="text-muted-foreground mt-2">Manage your team members and their roles</p>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="overflow-hidden">
                    <CardHeader className="pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={member.imageUrl} alt={member.name} />
                            <AvatarFallback>{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{member.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <Badge variant={member.status === "online" ? "default" : member.status === "away" ? "outline" : "secondary"}>
                          {member.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="flex justify-between mt-4">
                        <Button size="sm" variant="outline">View Profile</Button>
                        <Button size="sm" variant="ghost">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Team;
