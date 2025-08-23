import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, FileText, Download, Settings, Shield } from "lucide-react";

const features = [
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Template Agnostic",
    description: "Works with any SoF format from ports worldwide. No manual template setup required."
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Extract thousands of events in seconds. Save hours of manual data entry."
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "100% Accurate",
    description: "AI-powered precision ensures no events are missed, even in complex documents."
  },
  {
    icon: <Download className="w-8 h-8" />,
    title: "Multiple Formats",
    description: "Export results in JSON, CSV, or Excel. Integrate seamlessly with your workflow."
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Smart Processing",
    description: "Handles variations in date formats, time zones, and event descriptions automatically."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise Ready",
    description: "Bank-grade security with SOC2 compliance. Your data never leaves our secure environment."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose Our SoF Extractor?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built specifically for maritime professionals who need fast, accurate laytime calculations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 scale-on-hover bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: "10,000+", label: "SoFs Processed" },
            { number: "99.9%", label: "Accuracy Rate" },
            { number: "< 30s", label: "Average Processing Time" },
            { number: "500+", label: "Maritime Companies" }
          ].map((stat, index) => (
            <div key={index} className="text-center fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;