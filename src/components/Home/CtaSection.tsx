
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-primary to-primary/90 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl">
            Ready to Transform Your Running Journey?
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl">
            Join thousands of runners who are achieving their goals with personalized plans and data-driven insights.
          </p>
          <div className="space-x-4">
            <Button size="lg" className="btn-accent bg-accent hover:bg-accent/90">
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
