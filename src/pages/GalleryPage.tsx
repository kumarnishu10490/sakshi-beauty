import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import bridalImg from "@/assets/bridal-makeup.jpg";
import hairImg from "@/assets/hair-styling.jpg";
import mehndiImg from "@/assets/mehndi.jpg";
import facialImg from "@/assets/facial-care.jpg";
import hairSmoothImg from "@/assets/hair-smoothening.jpg";
import partyImg from "@/assets/party-makeup.jpg";
import heroImg from "@/assets/hero-salon.jpg";

const galleryImages = [
  { src: bridalImg, title: "Bridal Elegance", category: "Bridal" },
  { src: hairImg, title: "Hair Artistry", category: "Hair" },
  { src: mehndiImg, title: "Mehndi Magic", category: "Mehndi" },
  { src: facialImg, title: "Skincare Luxury", category: "Skincare" },
  { src: hairSmoothImg, title: "Smooth & Silky", category: "Hair" },
  { src: partyImg, title: "Party Glamour", category: "Makeup" },
  { src: heroImg, title: "Our Studio", category: "Studio" },
  { src: bridalImg, title: "Bridal Perfection", category: "Bridal" },
];

const categories = ["All", "Bridal", "Hair", "Makeup", "Mehndi", "Skincare", "Studio"];

const GalleryPage = () => {
  const [filter, setFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const filtered = filter === "All" ? galleryImages : galleryImages.filter((g) => g.category === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-gradient-hero section-padding">
          <div className="max-w-7xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase">Gallery</span>
              <h1 className="heading-display mt-3">
                Student <span className="text-gradient-rose">Gallery</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Explore our students' beautiful work and transformations.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-blush text-blush-foreground hover:bg-primary/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry Grid */}
            <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              <AnimatePresence>
                {filtered.map((img, i) => (
                  <motion.div
                    key={img.title + i}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="break-inside-avoid group cursor-pointer"
                    onClick={() => setSelectedImg(img.src)}
                  >
                    <div className="rounded-2xl overflow-hidden relative">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-300 flex items-end">
                        <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-primary-foreground font-heading font-semibold">{img.title}</p>
                          <p className="text-primary-foreground/70 text-sm">{img.category}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-6"
            onClick={() => setSelectedImg(null)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImg}
              alt="Gallery preview"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </motion.div>
  );
};

export default GalleryPage;
