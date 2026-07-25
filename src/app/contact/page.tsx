"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactNewsletter } from "@/components/ContactNewsletter";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-light-pink/30 via-gold-soft/40 to-accent-soft/20 relative overflow-hidden">
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 left-16 w-40 h-40 bg-terracotta-soft/20 rounded-full blur-3xl"
          animate={{
            x: [0, 25, 0],
            y: [0, 15, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-16 w-32 h-32 bg-purple-soft/20 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-3xl overflow-hidden shadow-2xl p-1 bg-gradient-to-r from-light-pink via-gold-soft to-accent-soft mb-12"
          >
            <div className="rounded-[22px] overflow-hidden">
              <img
                src="/contact.png"
                alt="Contact Us"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </motion.div>

          <div className="mt-16">
            <ContactNewsletter />
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
