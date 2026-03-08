import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ScrollTransformationStory from "@/components/home/ScrollTransformationStory";
import ServicesPreview from "@/components/home/ServicesPreview";
import CoursesPreview from "@/components/home/CoursesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <PageTransition>
      <Navbar />
      <main>
        <HeroSection />
        <ScrollTransformationStory />
        <ServicesPreview />
        <CoursesPreview />
        <WhyChooseUs />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Index;
