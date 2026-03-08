import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Send, Bot, User, Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const quickPrompts = [
  "Meri skin oily hai, kaunsa facial karwau?",
  "Bridal makeup ke liye kya tips hain?",
  "Hair fall ke liye kya treatment hai?",
  "Party makeup kaise karein ghar pe?",
];

const mockResponses: Record<string, string> = {
  default: "Namaste! 🌸 Main Sakshi Beauty Parlour ki AI Beauty Consultant hoon. Aap mujhse skin care, hair care, makeup tips, ya koi bhi beauty related sawaal pooch sakte hain!\n\nKuch popular topics:\n- **Skin type analysis** aur facial recommendations\n- **Hair care** tips aur treatments\n- **Bridal makeup** guidance\n- **Daily beauty routine** suggestions",
  oily: "Oily skin ke liye **Gold Facial** ya **Charcoal Facial** best rahega! 🧖‍♀️\n\n**Tips:**\n- Haftey mein 2 baar gentle exfoliation karein\n- Oil-free moisturizer use karein\n- Sunscreen lagana mat bhoolein!\n\nHamare parlour mein **Deep Cleansing Facial** bhi available hai jo oily skin ke liye specially designed hai. ₹1,500 se starting hai.\n\nKya aap appointment book karna chahenge?",
  bridal: "Bridal makeup ke liye ye tips follow karein: 💍✨\n\n1. **2 months pehle** se skin care routine start karein\n2. **Trial makeup** zaroor karwayein\n3. **HD/Airbrush foundation** long-lasting hota hai\n4. **Waterproof products** use karein\n5. **Primers** lagana mat bhoolein\n\nSakshi Beauty Parlour mein complete **Bridal Package** available hai:\n- Pre-bridal facial course\n- D-day makeup + hairstyling\n- Touch-up kit\n\n**Starting ₹15,000** se. Book karein! 💐",
  hair: "Hair fall ke liye ye treatments recommend karungi: 💇‍♀️\n\n**In-Salon Treatments:**\n- **Keratin Treatment** - hair ko strong banata hai\n- **Hair Spa** - deep conditioning\n- **Scalp Treatment** - roots ko nourish karta hai\n\n**Home Care Tips:**\n- Onion juice + coconut oil mask weekly\n- Biotin supplements lein\n- Tight hairstyles avoid karein\n- Silk pillowcase use karein\n\nHamare parlour mein **Hair Restoration Package** ₹4,000 se available hai!",
  party: "Party makeup ghar pe kaise karein: 🎉\n\n**Step-by-Step:**\n1. **Primer** - pore-filling primer lagayein\n2. **Foundation** - apne skin tone se match karein\n3. **Concealer** - dark circles cover karein\n4. **Setting powder** - T-zone pe\n5. **Eye makeup** - smokey eye ya glitter look\n6. **Blush** - cheekbones pe\n7. **Lipstick** - bold color choose karein\n8. **Setting spray** - last mein zaroor lagayein!\n\nYa fir hamare parlour aayein! **Party Makeup ₹3,000** se starting hai ✨",
};

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("oily") || lower.includes("facial")) return mockResponses.oily;
  if (lower.includes("bridal") || lower.includes("bride") || lower.includes("shaadi")) return mockResponses.bridal;
  if (lower.includes("hair") || lower.includes("baal")) return mockResponses.hair;
  if (lower.includes("party") || lower.includes("makeup")) return mockResponses.party;
  return mockResponses.default;
};

const AIBeautyConsultantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: mockResponses.default },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply: Message = { role: "assistant", content: getResponse(text) };
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
    }, 1200);
  };

  return (
    <PageTransition>
      <Navbar />
      <main>
        <section className="pt-32 pb-8 bg-gradient-hero section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase">AI Powered</span>
              <h1 className="heading-display mt-3">
                Beauty <span className="text-gradient-rose">Consultant</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Get personalized beauty advice, skincare tips, and treatment recommendations from our AI consultant.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="px-6 pb-16 bg-background">
          <div className="max-w-3xl mx-auto">
            {/* Chat Window */}
            <div className="glass-card rounded-3xl overflow-hidden">
              {/* Messages */}
              <div className="h-[450px] overflow-y-auto p-6 space-y-4">
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-blush/40 flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-blush/20 text-foreground rounded-bl-sm"
                        }`}
                      >
                        {msg.content}
                      </div>
                      {msg.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {typing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blush/40 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-blush/20 rounded-2xl px-4 py-3 rounded-bl-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Prompts */}
              <div className="px-6 pb-3 flex flex-wrap gap-2">
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    className="text-xs px-3 py-1.5 rounded-full bg-blush/30 text-foreground hover:bg-blush/50 transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/30">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(input);
                  }}
                  className="flex gap-3"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Apna beauty sawaal poochein..."
                    className="flex-1 bg-blush/10 rounded-full px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || typing}
                    className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" /> AI-powered • Connect to Lovable Cloud for real AI responses
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default AIBeautyConsultantPage;
