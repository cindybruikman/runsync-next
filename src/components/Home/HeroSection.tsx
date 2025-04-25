import { Button } from "@/components/ui/button";
import Link from "next/link";


const HeroSection = () => {
  return (
    <div className="relative bg-primary text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2600&q=80')",
          backgroundPosition: "50% 40%",
        }}
      >
        <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Run Smarter, <br />
            <span className="text-accent">Achieve More</span>
          </h1>

          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl">
            Track your progress, follow personalized plans, and visualize your
            running journey with data-driven insights from your Strava
            activities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="btn-primary">
              Sync with Strava
            </Button>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="btn-outline text-white border-white hover:text-primary hover:bg-white"
              >
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
