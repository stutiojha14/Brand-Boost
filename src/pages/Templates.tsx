
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const templateCategories = ["All", "Social Media", "Display", "Video", "Email", "Web"];

const templates = [
  { id: 1, name: "Product Showcase", category: "Social Media", popular: true },
  { id: 2, name: "Special Offer", category: "Social Media", popular: false },
  { id: 3, name: "Brand Story", category: "Video", popular: true },
  { id: 4, name: "Feature Highlight", category: "Display", popular: false },
  { id: 5, name: "Customer Testimonial", category: "Social Media", popular: true },
  { id: 6, name: "Newsletter", category: "Email", popular: false },
  { id: 7, name: "Product Launch", category: "Video", popular: true },
  { id: 8, name: "Holiday Promotion", category: "Display", popular: false },
  { id: 9, name: "Landing Page", category: "Web", popular: true },
];

const Templates = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates = activeCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-6">Ad Templates</h1>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex space-x-2 mb-4 md:mb-0 overflow-x-auto pb-2 w-full md:w-auto">
              {templateCategories.map(category => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search templates..." className="pl-9" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <Card key={template.id} className="overflow-hidden">
                <div className="h-48 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">[Template Preview]</span>
                </div>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.category}</p>
                    </div>
                    {template.popular && (
                      <Badge variant="secondary">Popular</Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">Use Template</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
