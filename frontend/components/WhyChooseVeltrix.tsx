"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Sprout,
  ShieldCheck,
  Truck,
  Heart,
  LeafyGreen,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Sprout,
    title: "100% Natural",
    description: "Pure, natural ingredients with no artificial additives.",
    bgGradient: "from-accent-soft/30 to-gold-soft/40",
    borderColor: "accent-primary",
    iconColor: "accent-primary",
    titleColor: "accent-secondary",
    glow: "glow-green",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "Stringent quality checks at every stage of production.",
    bgGradient: "from-gold-soft/30 to-light-pink/40",
    borderColor: "warm-gold",
    iconColor: "warm-gold",
    titleColor: "warm-gold",
    glow: "glow-green",
  },
  {
    icon: Truck,
    title: "Farm Fresh",
    description: "Sourced directly from trusted farms for maximum freshness.",
    bgGradient: "from-light-pink/30 to-terracotta-soft/40",
    borderColor: "terracotta",
    iconColor: "terracotta",
    titleColor: "terracotta",
    glow: "glow-terracotta",
  },
  {
    icon: Heart,
    title: "Heart Healthy",
    description: "Packed with nutrients that support cardiovascular health.",
    bgGradient: "from-terracotta-soft/30 to-purple-soft/30",
    borderColor: "purple-soft",
    iconColor: "deep-purple",
    titleColor: "deep-purple",
    glow: "glow-purple",
  },
  {
    icon: LeafyGreen,
    title: "Eco-Friendly",
    description: "Sustainable practices that respect our planet.",
    bgGradient: "from-purple-soft/30 to-accent-soft/30",
    borderColor: "accent-secondary",
    iconColor: "accent-secondary",
    titleColor: "accent-secondary",
    glow: "glow-green",
  },
  {
    icon: Sparkles,
    title: "Delicious Taste",
    description: "Perfectly roasted and seasoned to perfection.",
    bgGradient: "from-accent-soft/30 to-gold-soft/30 to-terracotta-soft/20",
    borderColor: "terracotta",
    iconColor: "terracotta",
    titleColor: "terracotta",
    glow: "glow-terracotta",
  },
];

export const WhyChooseVeltrix = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-gradient-to-br from-bg-secondary to-gold-soft/20 relative overflow-hidden" ref={ref}>
      {/* Background floating decorations */}
      <motion.div
        className="absolute top-12 left-10 w-64 h-64 bg-terracotta-soft/20 rounded-full blur-3xl"
        animate={{
          x: [0, 70, 0],
          y: [0, 35, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-12 right-10 w-52 h-52 bg-purple-soft/20 rounded-full blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-8 py-3 bg-gradient-to-r from-accent-primary/30 to-terracotta/30 rounded-full mb-6 border-2 border-accent-primary/50 shadow-lg"
          >
            <span className="text-accent-secondary font-bold tracking-[0.3em] uppercase text-base">
              Why Choose Us
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4"
          >
            What Makes Us <span className="text-terracotta">Special</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-text-secondary max-w-2xl mx-auto text-lg"
          >
            Discover the Veltrix difference with our commitment to quality, sustainability, and excellence.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -2 : 2 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.12, type: "spring", stiffness: 80 }}
                whileHover={{ y: -15, scale: 1.05, rotate: 0 }}
                className={`bg-gradient-to-br ${feature.bgGradient} p-8 rounded-3xl border-2 border-${feature.borderColor}/40 hover:shadow-${feature.glow} transition-all`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.12, type: "spring" }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`w-16 h-16 bg-${feature.iconColor}/15 rounded-2xl flex items-center justify-center mb-6 text-${feature.iconColor}`}
                >
                  <Icon className="w-8 h-8" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.12 }}
                  className={`text-xl font-serif font-semibold mb-3 text-${feature.titleColor}`}
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.12 }}
                  className="text-text-secondary"
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
