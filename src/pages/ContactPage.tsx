import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", interest: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you soon.");
    setForm({ name: "", phone: "", interest: "", message: "" });
  };

  return (
    <PageTransition>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-gradient-hero section-padding">
          <div className="max-w-7xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase">Contact Us</span>
              <h1 className="heading-display mt-3">
                Get in <span className="text-gradient-rose">Touch</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Ready to book an appointment or enroll in a course? We'd love to hear from you.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <AnimatedSection direction="left">
              <div className="glass-card rounded-3xl p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-foreground"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-foreground"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Interest</label>
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-foreground"
                    >
                      <option value="">Select service or course</option>
                      <option>Bridal Makeup</option>
                      <option>Party Makeup</option>
                      <option>Facial & Skin Care</option>
                      <option>Hair Styling</option>
                      <option>Basic Beauty Course</option>
                      <option>Advanced Makeup Course</option>
                      <option>Bridal Makeup Training</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all resize-none text-foreground"
                      placeholder="Tell us more..."
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-luxury w-full flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection direction="right">
              <div className="space-y-6">
                {[
                  { icon: Phone, title: "Phone", info: "+91 9304825053", sub: "Sun -Sat, 6am-9pm" },
                  { icon: Mail, title: "Email", info: "Rubeeyadav10490@gmail.com", sub: "We reply within 24 hours" },
                  { icon: MapPin, title: "Address", info: "Pali road, jhabar, Dipka , Korba ,", sub: "Korba , Chhattisgarh-495452 India" },
                  { icon: Clock, title: "Working Hours", info: "Sun - Sat: 6:00 AM - 9:00 PM",  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ x: 6 }}
                    className="glass-card-hover rounded-2xl p-6 flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blush flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                      <p className="text-foreground text-sm">{item.info}</p>
                      <p className="text-muted-foreground text-xs">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Map placeholder */}
                <div className="rounded-2xl overflow-hidden h-64 bg-muted flex items-center justify-center">
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.8438068966225!2d82.51126717529422!3d22.359525779644112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a27f49cc0524b31%3A0x61ef4b46f062b6ad!2sPali%20Rd%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1776239176227!5m2!1sen!2sin"  className="w-full h-full border-0"
 allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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

export default ContactPage;
