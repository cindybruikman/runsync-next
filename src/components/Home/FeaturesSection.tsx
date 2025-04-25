
import { Activity, Calendar, BarChart } from "lucide-react";

const features = [
  {
    icon: <Calendar className="h-10 w-10 text-accent" />,
    title: "Personal Plan",
    description: "Get a weekly running schedule tailored to your goals, experience level, and time constraints."
  },
  {
    icon: <Activity className="h-10 w-10 text-accent" />,
    title: "Smart Feedback",
    description: "Receive intelligent insights about your training load, recovery needs, and performance trends."
  },
  {
    icon: <BarChart className="h-10 w-10 text-accent" />,
    title: "Visual Progress",
    description: "See your improvement over time with beautiful charts and clear performance metrics."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Runners Love RunSync</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Designed by runners, for runners. RunSync helps you achieve your goals with personalized guidance and powerful analytics.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card dark:bg-gray-800 group hover:border-accent border-2 border-transparent transition-all duration-300"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
