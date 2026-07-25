"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Dumbbell,
  Droplets,
  Activity,
  Heart,
  Leaf,
  Sparkles,
  ShieldCheck,
  Zap,
  Bone,
} from "lucide-react";

const benefits = [
  {
    icon: Dumbbell,
    title: "Rich in Protein",
    description: "Excellent plant-based protein source for muscle health",
  },
  {
    icon: Sparkles,
    title: "High Fiber",
    description: "Promotes healthy digestion and gut health",
  },
  {
    icon: Activity,
    title: "Weight Management",
    description: "Low in calories, keeps you full longer",
  },
  {
    icon: Heart,
    title: "Heart Healthy",
    description: "Supports cardiovascular health",
  },
  {
    icon: Leaf,
    title: "Gluten Free",
    description: "Naturally gluten-free, suitable for everyone",
  },
  {
    icon: Droplets,
    title: "Supports Digestion",
    description: "Improves digestive health and regularity",
  },
  {
    icon: Zap,
    title: "Low Calories",
    description: "Perfect healthy snack for weight watchers",
  },
  {
    icon: ShieldCheck,
    title: "Supports Kidney Health",
    description: "Promotes healthy kidney function",
  },
  {
    icon: Zap,
    title: "Rich in Magnesium",
    description: "Essential for energy production",
  },
  {
    icon: Bone,
    title: "Rich in Calcium",
    description: "Great for bone and teeth health",
  },
  {
    icon: Zap,
    title: "Rich in Potassium",
    description: "Supports electrolyte balance",
  },
];

export const HealthBenefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-cream" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-premium-gold font-semibold mb-4 tracking-[0.2em] uppercase text-sm">
            Health Benefits
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-forest mb-4">
            Health Benefits
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover the amazing health benefits of premium makhana
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white p-7 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-premium-gold/20 transition-all"
              >
                <div className="w-16 h-16 bg-premium-gold/10 rounded-2xl flex items-center justify-center mb-5 text-premium-gold">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-dark-forest font-serif">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
