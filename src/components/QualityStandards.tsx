"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Globe,
} from "lucide-react";

const standards = [
  {
    icon: Award,
    title: "ISO Certified",
    description: "Certified for quality management systems",
  },
  {
    icon: CheckCircle2,
    title: "Premium Selection",
    description: "Only the finest makhana make the cut",
  },
  {
    icon: ShieldCheck,
    title: "Lab Tested",
    description: "Rigorous laboratory testing for safety",
  },
  {
    icon: Globe,
    title: "International Export Quality",
    description: "Meets all global export standards",
  },
];

export const QualityStandards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-dark-forest text-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-premium-gold font-semibold mb-4 tracking-[0.2em] uppercase text-sm">
            Quality Assurance
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Quality Standards
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Our commitment to quality is unwavering. Every product meets the highest standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {standards.map((standard, idx) => {
            const Icon = standard.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white/10 backdrop-blur-sm p-10 rounded-3xl border border-white/20 text-center group"
              >
                <div className="w-20 h-20 bg-premium-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 text-premium-gold group-hover:bg-premium-gold group-hover:text-dark-forest transition-all duration-300">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">
                  {standard.title}
                </h3>
                <p className="text-gray-300">{standard.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
