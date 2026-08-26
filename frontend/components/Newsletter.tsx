"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail } from "lucide-react";

export const Newsletter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gradient-to-r from-premium-gold to-premium-gold/80" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Mail className="w-16 h-16 text-dark-forest mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-forest mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-dark-forest/80 mb-10 max-w-2xl mx-auto text-lg">
            Subscribe to get exclusive offers, health tips, and new product updates
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-5 rounded-full text-dark-forest placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-dark-forest/20"
            />
            <button
              type="submit"
              className="px-8 py-5 bg-dark-forest text-white rounded-full font-semibold hover:bg-dark-forest/90 transition-all hover:shadow-lg hover:shadow-dark-forest/30"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
