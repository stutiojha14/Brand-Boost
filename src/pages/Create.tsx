
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AdCreator from "@/components/AdCreator";
import AppSidebar from "@/components/AppSidebar";

const Create = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <NavBar />
          <main className="flex-grow">
            <div className="container mx-auto px-4 py-10">
              <h1 className="text-3xl font-bold mb-6">Create New Advertisement</h1>
              <AdCreator />
            </div>
          </main>
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Create;
