
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import AppSidebar from "@/components/AppSidebar";

const Analytics = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <NavBar />
          <main className="flex-grow">
            <div className="container mx-auto px-4 py-10">
              <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
              <AnalyticsDashboard />
            </div>
          </main>
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
