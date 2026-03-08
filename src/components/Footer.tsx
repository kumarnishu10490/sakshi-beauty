import { Link } from "react-router-dom";
import { Sparkles, Phone, MapPin, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-gold" />
              <span className="font-heading text-xl font-bold">
                Sakshi Beauty
              </span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Premium beauty parlour & training centre. Where beauty meets excellence.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-gold">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Services", "Courses", "Gallery", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-gold">Services</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <span>Bridal Makeup</span>
              <span>Party Makeup</span>
              <span>Facial & Skin Care</span>
              <span>Hair Styling</span>
              <span>Mehndi Design</span>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-gold">Contact</h4>
            <div className="flex flex-col gap-3 text-sm opacity-70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span>info@sakshibeauty.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                <span>123 Beauty Lane, Mumbai, India</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <Instagram className="w-5 h-5 hover:text-gold transition-colors cursor-pointer" />
                <Facebook className="w-5 h-5 hover:text-gold transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm opacity-50">
          © 2026 Sakshi Beauty Parlour & Training Centre. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
