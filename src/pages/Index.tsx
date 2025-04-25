import Layout from "../components/Layout/Layout";
import HeroSection from "../components/Home/HeroSection";
import FeaturesSection from "../components/Home/FeaturesSection";
import TestimonialSection from "../components/Home/TestimonialSection";
import CtaSection from "../components/Home/CtaSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
