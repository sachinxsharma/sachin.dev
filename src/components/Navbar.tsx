"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Learning", href: "#learning" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tighter z-50">
          Sachin<span className="text-neon-blue">.dev</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm text-gray-300 hover:text-neon-blue transition-colors">
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="text-sm border border-neon-blue text-neon-blue px-5 py-2 rounded-full hover:bg-neon-blue/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
          >
            Contact Me
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 text-gray-300 hover:text-neon-blue transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-[#030014]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 z-40 md:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl text-gray-300 hover:text-neon-blue transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl border border-neon-blue text-neon-blue px-8 py-3 rounded-full hover:bg-neon-blue/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all mt-4"
            >
              Contact Me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
