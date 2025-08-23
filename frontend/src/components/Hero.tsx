import { Button } from "@/components/ui/button";
import pirateShipImage from "@/assets/pirate-ship.png";

const Hero = () => {
  return (
    <section className="ocean-gradient min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{ backgroundImage: 'var(--wave-pattern)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Content */}
          <div className="fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Extract Maritime Events from SoFs 
              <span className="text-accent">in Seconds</span>
            </h1>
            
            <p className="text-xl text-primary/80 mb-8 leading-relaxed">
              AI-powered Laytime Intelligence Tool for fast, accurate, and structured 
              event extraction.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button className="btn-ocean text-lg px-8 py-4">
                Start Extracting
              </Button>
              <Button variant="outline" className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View Demo
              </Button>
            </div>

            {/* Process Flow */}
            <div className="flex items-center gap-6 text-primary/70">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center shadow-lg">
                  📄
                </div>
                <span className="text-sm font-medium">Upload SoF</span>
              </div>
              <div className="text-2xl">→</div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center shadow-lg">
                  🤖
                </div>
                <span className="text-sm font-medium">AI Processing</span>
              </div>
              <div className="text-2xl">→</div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center shadow-lg">
                  📊
                </div>
                <span className="text-sm font-medium">Structured Data</span>
              </div>
            </div>
          </div>

          {/* Right Content - Pirate Ship */}
          <div className="flex justify-center items-center relative h-96 w-full lg:h-full">
            {/* Ship Patrol Area */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Moving Pirate Ship */}
              <div className="animate-mascot-patrol">
                <img 
                  src={pirateShipImage} 
                  alt="Maritime pirate ship sailing the waters" 
                  className="w-48 h-48 lg:w-56 lg:h-56 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
              </div>
            </div>

            {/* Static Decorative Elements */}
            <div className="absolute top-10 right-10 wave-animation opacity-40">
              <div className="text-4xl lg:text-5xl">⚓</div>
            </div>
            
            <div className="absolute bottom-10 left-10 wave-animation opacity-50" style={{ animationDelay: '2s' }}>
              <div className="text-3xl lg:text-4xl">🧭</div>
            </div>

            <div className="absolute top-20 left-5 wave-animation opacity-30" style={{ animationDelay: '4s' }}>
              <div className="text-2xl lg:text-3xl">🌊</div>
            </div>

            <div className="absolute bottom-20 right-5 float-animation opacity-40" style={{ animationDelay: '3s' }}>
              <div className="text-2xl lg:text-3xl">🏴‍☠️</div>
            </div>

            {/* Ship Wake Trail Effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="w-3 h-1 bg-accent/40 rounded-full animate-mascot-patrol opacity-60" 
                style={{ animationDelay: '0.3s' }}
              />
              <div 
                className="w-2 h-1 bg-primary/30 rounded-full animate-mascot-patrol opacity-40" 
                style={{ animationDelay: '0.6s' }}
              />
              <div 
                className="w-1 h-1 bg-accent/20 rounded-full animate-mascot-patrol opacity-20" 
                style={{ animationDelay: '0.9s' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;