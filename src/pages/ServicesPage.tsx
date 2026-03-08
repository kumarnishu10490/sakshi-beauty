import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Heart, Sparkles, Flower2, Scissors, Palette, Hand } from "lucide-react";
import bridalImg from "@/assets/bridal-makeup.jpg";
import partyImg from "@/assets/party-makeup.jpg";
import facialImg from "@/assets/facial-care.jpg";
import hairImg from "@/assets/hair-styling.jpg";
import hairSmoothImg from "@/assets/hair-smoothening.jpg";
import mehndiImg from "@/assets/mehndi.jpg";

const allServices = [
  { icon: Heart, title: "Bridal Makeup", desc: "Complete bridal beauty package including makeup, hairstyling, draping assistance, and touch-ups. We create timeless bridal looks that photograph beautifully.", price: "Starting ₹15,000", img: bridalImg },
  { icon: Sparkles, title: "Party Makeup", desc: "Glamorous makeup for engagements, receptions, sangeet, and special occasions. Stand out at every celebration.", price: "Starting ₹3,000", img: partyImg },
  { icon: Flower2, title: "Facial & Skin Care", desc: "Premium facial treatments including gold facials, diamond facials, anti-aging treatments, and customized skincare routines.", price: "Starting ₹1,500", img: facialImg },
  { icon: Scissors, title: "Hair Cut & Styling", desc: "Trendy haircuts, blow-dry styling, updos, and special occasion hairstyles by experienced stylists.", price: "Starting ₹500", img: hairImg },
  { icon: Palette, title: "Hair Smoothening / Rebonding", desc: "Professional keratin treatments, smoothening, and rebonding for silky, manageable hair that lasts months.", price: "Starting ₹4,000", img: hairSmoothImg },
  { icon: Hand, title: "Mehndi Design", desc: "Beautiful bridal and occasion mehndi designs in Arabic, Indian, and contemporary styles by skilled artists.", price: "Starting ₹2,000", img: mehndiImg },
];

const ServicesPage = () => {
  return (
    <PageTransition>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-hero section-padding">
          <div className="max-w-7xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase">Our Services</span>
              <h1 className="heading-display mt-3">
                Premium Beauty <span className="text-gradient-rose">Services</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Experience luxury beauty treatments designed to make you look and feel your absolute best.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto space-y-16">
            {allServices.map((service, i) => (
              <AnimatedSection key={service.title} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
                  <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="rounded-3xl overflow-hidden shadow-lg"
                    >
                      <img src={service.img} alt={service.title} className="w-full h-80 object-cover" loading="lazy" />
                    </motion.div>
                  </div>
                  <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blush flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="font-heading text-3xl font-bold text-foreground">{service.title}</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
                    <p className="text-lg font-heading font-semibold text-gradient-gold mb-6">{service.price}</p>
                    <Link to="/contact" className="btn-luxury inline-block">
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default ServicesPage;
