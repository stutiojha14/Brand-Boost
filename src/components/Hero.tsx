
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 bg-hero-pattern">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-6 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-brand-purple mr-2"></span>
            <span>Introducing BrandBoost AI</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-in">
            Transform references into <br />
            <span className="text-gradient">brand-perfect</span> creative
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
            Create stunning, on-brand advertisements powered by advanced AI. Generate content, 
            build ads, and gain insights—all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" className="group">
              Create your first ad
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              See examples
            </Button>
          </div>
          <div className="w-full max-w-5xl h-[380px] rounded-xl bg-gradient-to-br from-brand-purple/5 to-brand-blue/5 border shadow-sm flex items-center justify-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Sparkles className="h-5 w-5" />
              <span>AI-generated preview will appear here</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
