"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-gold-soft/95 via-light-pink/95 to-gold-soft/95 backdrop-blur-lg border-b border-border"
          : "bg-gradient-to-r from-gold-soft/80 via-light-pink/80 to-gold-soft/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <Image
            src="/logo.png"
            alt="Veltrix Global Trading"
            width={80}
            height={80}
            className="h-auto max-h-14 sm:max-h-16 md:max-h-20 object-contain flex-shrink-0"
            priority
          />
          <span className="text-sm sm:text-lg md:text-2xl font-serif font-bold text-text-primary truncate">
            VELTRIX GLOBAL TRADING
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {[
            { name: "Home", href: "/" },
            { name: "Products", href: "/products" },
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group text-text-primary hover:text-terracotta transition-all duration-300 font-semibold relative px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-terracotta-soft/20"
              onClick={(e) => {
                if (item.href === "/" && pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              {item.name}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-accent-primary to-terracotta transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text-primary hover:text-accent-primary transition-colors p-3 rounded-lg hover:bg-accent-primary/10"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-background border-t border-border overflow-hidden"
            >
              <div className="px-4 sm:px-6 py-6 flex flex-col gap-3 sm:gap-4">
                {[
                  { name: "Home", href: "/" },
                  { name: "Products", href: "/products" },
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-text-primary hover:text-terracotta transition-all duration-300 text-lg font-semibold px-3 py-3 rounded-xl hover:bg-terracotta-soft/20"
                    onClick={(e) => {
                      setIsOpen(false);
                      if (item.href === "/" && pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </motion.nav>
  );
};
