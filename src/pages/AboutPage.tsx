import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Heart, Target, Eye } from "lucide-react";
import founderImg from "@/assets/founder.jpg";
import heroImg from "@/assets/hero-salon.jpg";

const AboutPage = () => {
  return (
    <PageTransition>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-gradient-hero section-padding">
          <div className="max-w-7xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase">About Us</span>
              <h1 className="heading-display mt-3">
                Our <span className="text-gradient-gold">Story</span>
              </h1>
            </AnimatedSection>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img src={heroImg} alt="Our salon" className="w-full h-96 object-cover" loading="lazy" />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <h2 className="heading-section mb-6">
                A Journey of <span className="text-gradient-rose">Beauty & Passion</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded over a decade ago, Sakshi Beauty Parlour & Training Centre began with a simple vision — 
                to make professional beauty services and education accessible to everyone. What started as a small 
                salon has grown into a trusted name in beauty and training.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we proudly serve hundreds of clients and have trained over 200 students who now work 
                in salons across the country, run their own businesses, and continue to spread the art of beauty.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-gradient-luxury">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Target, title: "Our Mission", text: "To empower individuals with world-class beauty skills and create a community of confident, skilled beauty professionals who transform lives through their artistry." },
              { icon: Eye, title: "Our Vision", text: "To become the leading beauty training institute recognized for excellence, innovation, and producing the most skilled beauty professionals in the industry." },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.2}>
                <motion.div whileHover={{ y: -6 }} className="glass-card-hover rounded-3xl p-8 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-blush flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Founder */}
        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <h2 className="heading-section">
                Meet Our <span className="text-gradient-gold">Founder</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection>
              <div className="glass-card rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 max-w-3xl mx-auto">
                <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-blush">
                  <img src={founderImg} alt="Sakshi - Founder" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-heading text-2xl font-bold text-foreground">Sakshi</h3>
                  <p className="text-primary text-sm font-medium mb-3">Founder & Head Trainer</p>
                  <p className="text-muted-foreground leading-relaxed">
                    With over 10 years of experience in the beauty industry, Sakshi has trained hundreds of students 
                    and served thousands of clients. Her passion for beauty and dedication to teaching have made 
                    Sakshi Beauty a name synonymous with excellence.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default AboutPage;
