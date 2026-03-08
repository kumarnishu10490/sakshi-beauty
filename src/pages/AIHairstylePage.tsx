import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Upload, Camera, Scissors, Sparkles } from "lucide-react";

const mockHairstyles = [
  { name: "Layered Bob", match: "92%", desc: "A chic layered bob that frames your face shape beautifully" },
  { name: "Soft Waves", match: "88%", desc: "Romantic soft waves for an effortless glamorous look" },
  { name: "Sleek Straight", match: "85%", desc: "Classic sleek straight hair with a polished finish" },
  { name: "Curtain Bangs", match: "82%", desc: "Trendy curtain bangs to highlight your features" },
  { name: "Messy Bun Updo", match: "78%", desc: "Elegant messy bun perfect for parties & events" },
  { name: "Side Swept", match: "75%", desc: "Glamorous side swept style for a dramatic look" },
];

const AIHairstylePage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<typeof mockHairstyles | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setResults(null);
      setSelected(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults(mockHairstyles);
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <PageTransition>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-gradient-hero section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase">AI Powered</span>
              <h1 className="heading-display mt-3">
                Hairstyle <span className="text-gradient-rose">Try-On</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Upload your photo and discover which hairstyles suit you best — powered by AI face analysis.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Upload */}
              <AnimatedSection>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-primary/30 rounded-3xl p-10 text-center cursor-pointer hover:border-primary/60 transition-colors duration-300 bg-blush/10 aspect-square flex items-center justify-center"
                >
                  <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} className="hidden" />
                  {image ? (
                    <img src={image} alt="Your photo" className="w-full h-full rounded-2xl object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-blush/30 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-primary" />
                      </div>
                      <p className="font-heading text-xl font-semibold text-foreground">Upload Your Photo</p>
                      <p className="text-sm text-muted-foreground">Front-facing photo works best</p>
                    </div>
                  )}
                </div>
                {image && !results && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
                    <button onClick={handleAnalyze} disabled={analyzing} className="btn-luxury inline-flex items-center gap-2">
                      {analyzing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Finding styles...
                        </>
                      ) : (
                        <>
                          <Scissors className="w-5 h-5" />
                          Find My Hairstyles
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatedSection>

              {/* Results */}
              <div>
                <AnimatePresence>
                  {results && (
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                        <Sparkles className="w-5 h-5 text-primary inline mr-2" />
                        Top Matches For You
                      </h3>
                      {results.map((style, i) => (
                        <motion.div
                          key={style.name}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => setSelected(i)}
                          className={`glass-card rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                            selected === i ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-heading text-lg font-semibold text-foreground">{style.name}</h4>
                              <p className="text-sm text-muted-foreground mt-0.5">{style.desc}</p>
                            </div>
                            <span className="text-lg font-bold text-gradient-gold">{style.match}</span>
                          </div>
                        </motion.div>
                      ))}
                      <p className="text-xs text-muted-foreground text-center mt-4">
                        Visit Sakshi Beauty Parlour to get your perfect hairstyle! ✨
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!results && (
                  <div className="flex items-center justify-center h-full min-h-[300px]">
                    <p className="text-muted-foreground text-center">Upload a photo to see AI-recommended hairstyles</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default AIHairstylePage;
