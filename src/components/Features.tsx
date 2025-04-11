
import { Lightbulb, PieChart, Wand2, Palette, Zap, Gauge } from "lucide-react";

const features = [
  {
    icon: <Wand2 className="h-6 w-6 text-brand-purple" />,
    title: "AI Content Generator",
    description: "Create compelling ad copy and content that resonates with your audience."
  },
  {
    icon: <Palette className="h-6 w-6 text-brand-purple" />,
    title: "Brand-Aligned Creative",
    description: "Ensure all generated content follows your brand guidelines and voice."
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-brand-blue" />,
    title: "Smart Suggestions",
    description: "Get intelligent recommendations to improve your ad performance."
  },
  {
    icon: <PieChart className="h-6 w-6 text-brand-blue" />,
    title: "Advanced Analytics",
    description: "Track performance with detailed insights and metrics."
  },
  {
    icon: <Zap className="h-6 w-6 text-brand-purple" />,
    title: "Rapid Generation",
    description: "Create multiple ad variations in seconds, not hours or days."
  },
  {
    icon: <Gauge className="h-6 w-6 text-brand-blue" />,
    title: "Performance Insights",
    description: "Understand what works and why with AI-powered analytics."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful AI Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create high-converting ads that stay true to your brand
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-background p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 p-2 rounded-lg bg-primary/5 w-fit">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
