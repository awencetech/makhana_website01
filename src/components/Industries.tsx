"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Store,
  Truck,
  Users,
  Building2,
  UtensilsCrossed,
  Briefcase,
} from "lucide-react";

const industries = [
  { icon: Store, title: "Retail" },
  { icon: Truck, title: "Wholesale" },
  { icon: Users, title: "Distributors" },
  { icon: Building2, title: "Importers" },
  { icon: UtensilsCrossed, title: "Hotels & Restaurants" },
  { icon: Briefcase, title: "Corporate" },
];

export const Industries = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-premium-gold font-semibold mb-4 tracking-[0.2em] uppercase text-sm">
            Our Reach
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-forest mb-4">
            Industries We Serve
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Partnering with businesses across various industries worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((industry, idx) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-cream p-8 rounded-3xl text-center shadow-lg hover:shadow-2xl hover:shadow-premium-gold/20 transition-all group cursor-pointer"
              >
                <div className="w-16 h-16 bg-premium-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-premium-gold group-hover:bg-premium-gold group-hover:text-dark-forest transition-all duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-dark-forest">{industry.title}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
