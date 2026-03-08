import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Check, Sparkles, IndianRupee, Gift, Calculator, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { id: "bridal", name: "Bridal Makeup", price: 15000, category: "Makeup", popular: true },
  { id: "party", name: "Party Makeup", price: 3000, category: "Makeup", popular: false },
  { id: "facial", name: "Gold Facial", price: 1500, category: "Skin Care", popular: true },
  { id: "cleanup", name: "Deep Cleanup", price: 800, category: "Skin Care", popular: false },
  { id: "haircut", name: "Hair Cut & Style", price: 500, category: "Hair", popular: false },
  { id: "smoothening", name: "Hair Smoothening", price: 5000, category: "Hair", popular: true },
  { id: "keratin", name: "Keratin Treatment", price: 7000, category: "Hair", popular: false },
  { id: "mehndi", name: "Bridal Mehndi", price: 5000, category: "Special", popular: true },
  { id: "manicure", name: "Manicure & Pedicure", price: 1200, category: "Grooming", popular: false },
  { id: "waxing", name: "Full Body Wax", price: 2000, category: "Grooming", popular: false },
  { id: "threading", name: "Threading & Bleach", price: 400, category: "Grooming", popular: false },
  { id: "saree", name: "Saree Draping", price: 1000, category: "Special", popular: false },
];

const combos = [
  { name: "Bridal Package", requires: ["bridal", "mehndi", "facial"], discount: 15 },
  { name: "Party Ready", requires: ["party", "haircut", "manicure"], discount: 10 },
  { name: "Glow Up", requires: ["facial", "cleanup", "manicure"], discount: 12 },
  { name: "Complete Grooming", requires: ["waxing", "manicure", "threading"], discount: 10 },
];

const categories = ["All", ...Array.from(new Set(services.map(s => s.category)))];

const PriceCalculatorPage = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const subtotal = useMemo(() => {
    return selected.reduce((sum, id) => {
      const s = services.find(s => s.id === id);
      return sum + (s?.price || 0);
    }, 0);
  }, [selected]);

  const activeCombo = useMemo(() => {
    return combos.find(c => c.requires.every(r => selected.includes(r)));
  }, [selected]);

  const discount = activeCombo ? Math.round(subtotal * activeCombo.discount / 100) : 0;
  const total = subtotal - discount;

  const filtered = activeCategory === "All" ? services : services.filter(s => s.category === activeCategory);

  return (
    <PageTransition>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-hero section-padding">
          <div className="max-w-7xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase flex items-center justify-center gap-2">
                <Calculator className="w-4 h-4" /> Price Calculator
              </span>
              <h1 className="heading-display mt-3">
                Build Your <span className="text-gradient-gold">Beauty Package</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
                Services select karo, combo discounts automatically unlock honge! ✨
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Calculator */}
        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Services Grid */}
              <div className="lg:col-span-2">
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCategory === cat
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-secondary text-secondary-foreground hover:bg-blush"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((service) => {
                      const isSelected = selected.includes(service.id);
                      return (
                        <motion.button
                          key={service.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggle(service.id)}
                          className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                            isSelected
                              ? "border-primary bg-blush/30 shadow-md"
                              : "border-border bg-card hover:border-primary/30"
                          }`}
                        >
                          {service.popular && (
                            <span className="absolute -top-2 right-3 bg-gold text-gold-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                              Popular
                            </span>
                          )}
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-heading text-base font-semibold text-foreground">{service.name}</h3>
                              <span className="text-xs text-muted-foreground">{service.category}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-foreground flex items-center">
                                <IndianRupee className="w-3.5 h-3.5" />{service.price.toLocaleString()}
                              </span>
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                              }`}>
                                {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <motion.div
                    layout
                    className="glass-card rounded-3xl p-6"
                  >
                    <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-gold" /> Your Package
                    </h3>

                    {selected.length === 0 ? (
                      <p className="text-muted-foreground text-sm py-8 text-center">
                        Services select karo package build karne ke liye! 👆
                      </p>
                    ) : (
                      <div className="space-y-3">
                        <AnimatePresence>
                          {selected.map(id => {
                            const s = services.find(s => s.id === id)!;
                            return (
                              <motion.div
                                key={id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-foreground">{s.name}</span>
                                <span className="text-muted-foreground flex items-center">
                                  <IndianRupee className="w-3 h-3" />{s.price.toLocaleString()}
                                </span>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>

                        <div className="border-t border-border pt-3 mt-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="text-foreground flex items-center">
                              <IndianRupee className="w-3 h-3" />{subtotal.toLocaleString()}
                            </span>
                          </div>

                          <AnimatePresence>
                            {activeCombo && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="flex items-center gap-2 mt-3 p-3 rounded-xl bg-blush/50 border border-primary/20">
                                  <Gift className="w-4 h-4 text-primary flex-shrink-0" />
                                  <div className="flex-1">
                                    <p className="text-xs font-semibold text-primary">{activeCombo.name} Unlocked! 🎉</p>
                                    <p className="text-xs text-muted-foreground">{activeCombo.discount}% combo discount</p>
                                  </div>
                                  <span className="text-sm font-semibold text-primary flex items-center">
                                    -<IndianRupee className="w-3 h-3" />{discount.toLocaleString()}
                                  </span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="flex justify-between mt-4 text-lg font-bold">
                            <span className="text-foreground">Total</span>
                            <motion.span
                              key={total}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              className="text-gradient-gold flex items-center"
                            >
                              <IndianRupee className="w-4 h-4" />{total.toLocaleString()}
                            </motion.span>
                          </div>
                        </div>

                        <Link to="/contact" className="block mt-4">
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="btn-luxury text-center text-sm w-full flex items-center justify-center gap-2"
                          >
                            Book This Package <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </Link>
                      </div>
                    )}

                    {/* Combo Hints */}
                    {selected.length > 0 && !activeCombo && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">💡 Combo Discounts Available:</p>
                        {combos.map(c => {
                          const remaining = c.requires.filter(r => !selected.includes(r));
                          if (remaining.length === 0 || remaining.length === c.requires.length) return null;
                          return (
                            <p key={c.name} className="text-xs text-muted-foreground mb-1">
                              <span className="text-primary font-medium">{c.name}</span> — Add{" "}
                              {remaining.map(r => services.find(s => s.id === r)?.name).join(", ")} for {c.discount}% off!
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default PriceCalculatorPage;
