
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import AppSidebar from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, BrainCircuit, TrendingUp } from "lucide-react";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <NavBar />
          <main className="flex-grow">
            <div className="container mx-auto px-4 py-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Advanced Analytics Dashboard</h1>
                <Card className="bg-brand-purple/10 border-none px-4 py-2 flex items-center gap-2">
                  <BrainCircuit size={16} className="text-brand-purple" />
                  <span className="text-sm font-medium">AI-Powered Insights Active</span>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center justify-between">
                      <span>Performance Summary</span>
                      <TrendingUp size={18} className="text-green-500" />
                    </CardTitle>
                    <CardDescription>AI-generated analysis of your ad performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        <strong className="text-foreground">AI Insight:</strong> Your campaigns are showing a 
                        <span className="text-green-600 font-medium"> 12.8% increase</span> in click-through rates 
                        compared to last month. The most effective ads are using emotional appeals and 
                        bright color palettes. We recommend increasing budget allocation to "Campaign B" 
                        which is outperforming others by 35% in conversion metrics.
                      </p>
                      <div className="mt-4 flex items-center text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <ArrowUpRight size={12} className="text-green-500 mr-1" />
                          Recommendation confidence: 92%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Campaign Optimizer</CardTitle>
                    <CardDescription>AI recommendations for campaign improvements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 p-2 rounded-md bg-blue-50 border border-blue-100">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">1</div>
                        <div>
                          <p className="text-sm font-medium">Optimize ad copy length</p>
                          <p className="text-xs text-muted-foreground">Shorter, concise messages are performing 24% better.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2 p-2 rounded-md bg-purple-50 border border-purple-100">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xs">2</div>
                        <div>
                          <p className="text-sm font-medium">Update creative images</p>
                          <p className="text-xs text-muted-foreground">Photos with people outperform abstract imagery by 18%.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2 p-2 rounded-md bg-green-50 border border-green-100">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs">3</div>
                        <div>
                          <p className="text-sm font-medium">Adjust targeting parameters</p>
                          <p className="text-xs text-muted-foreground">Expand age range to 25-45 for 9% better engagement.</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <AnalyticsDashboard />
            </div>
          </main>
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
