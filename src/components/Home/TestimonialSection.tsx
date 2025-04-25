
const testimonials = [
  {
    quote: "RunSync helped me train for my first marathon with a plan that actually fit my schedule. The visual progress charts kept me motivated every step of the way!",
    author: "Sarah K.",
    role: "Marathon Finisher"
  },
  {
    quote: "As someone who's always been data-driven, I love how RunSync analyzes my Strava runs and gives me actionable feedback to improve my pace.",
    author: "Michael T.",
    role: "5K Enthusiast"
  },
  {
    quote: "The smart recovery suggestions have been a game-changer. I'm running more consistently without injuries for the first time in years.",
    author: "Jessica M.",
    role: "Trail Runner"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Runners Say</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join a community of runners who have transformed their training with RunSync.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <blockquote className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="font-medium">
                <p className="text-primary dark:text-white">{testimonial.author}</p>
                <p className="text-accent text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
