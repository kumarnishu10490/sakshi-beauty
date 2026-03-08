import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import CoursesPage from "./pages/CoursesPage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";
import SocialProofPopup from "./components/SocialProofPopup";
import AISkinAnalysisPage from "./pages/AISkinAnalysisPage";
import AIHairstylePage from "./pages/AIHairstylePage";
import AIBeautyConsultantPage from "./pages/AIBeautyConsultantPage";
import AICourseAdvisorPage from "./pages/AICourseAdvisorPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/ai/skin-analysis" element={<AISkinAnalysisPage />} />
            <Route path="/ai/hairstyle" element={<AIHairstylePage />} />
            <Route path="/ai/consultant" element={<AIBeautyConsultantPage />} />
            <Route path="/ai/course-advisor" element={<AICourseAdvisorPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        <WhatsAppButton />
        <SocialProofPopup />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
