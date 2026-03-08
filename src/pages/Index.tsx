import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import CoursesPreview from "@/components/home/CoursesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <ServicesPreview />
        <CoursesPreview />
        <WhyChooseUs />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
