
import { Link, useLocation } from "react-router-dom";
import { Home, PieChart, BarChart3, PenSquare, BookMarked, Users, Settings, Target, Megaphone } from "lucide-react";
import { 
  Sidebar,
  SidebarContent,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader
} from "@/components/ui/sidebar";

export const AppSidebar = () => {
  const location = useLocation();
  
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarHeader>
          <Link to="/" className="flex items-center p-2 mx-auto">
            <span className="font-bold text-xl">
              <span className="text-gradient">Brand</span>
              <span className="text-primary">Boost</span>
            </span>
          </Link>
        </SidebarHeader>
        
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Home" isActive={location.pathname === "/"}>
                  <Link to="/">
                    <Home size={20} />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Create Ads" isActive={location.pathname === "/create"}>
                  <Link to="/create">
                    <PenSquare size={20} />
                    <span>Create Ads</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Campaigns" isActive={location.pathname === "/campaigns"}>
                  <Link to="/campaigns">
                    <Megaphone size={20} />
                    <span>Campaigns</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Templates" isActive={location.pathname === "/templates"}>
                  <Link to="/templates">
                    <BookMarked size={20} />
                    <span>Templates</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Analytics" isActive={location.pathname === "/analytics"}>
                  <Link to="/analytics">
                    <PieChart size={20} />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard" isActive={location.pathname === "/dashboard"}>
                  <Link to="/dashboard">
                    <BarChart3 size={20} />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Team" isActive={location.pathname === "/team"}>
                  <Link to="/team">
                    <Users size={20} />
                    <span>Team</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings" isActive={location.pathname === "/settings"}>
                  <Link to="/settings">
                    <Settings size={20} />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
