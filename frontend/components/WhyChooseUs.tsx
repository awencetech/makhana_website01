
"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Sprout,
  LeafyGreen,
  Dumbbell,
  BarChart2,
  Droplets,
  Wheat,
  Globe,
  Sparkles,
  Hand,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: <Sprout className="w-10 h-10" />,
    title: "100% Natural",
    description: "Pure and natural, no artificial ingredients",
  },
  {
    icon: <LeafyGreen className="w-10 h-10" />,
    title: "Farm Fresh",
    description: "Direct from farm to your table",
  },
  {
    icon: <Dumbbell className="w-10 h-10" />,
    title: "High Protein",
    description: "Rich in protein for muscle health",
  },
  {
    icon: <BarChart2 className="w-10 h-10" />,
    title: "Rich Fiber",
    description: "High in dietary fiber for digestion",
  },
  {
    icon: <Droplets className="w-10 h-10" />,
    title: "Low Fat",
    description: "Low in fat, perfect for healthy snacking",
  },
  {
    icon: <Wheat className="w-10 h-10" />,
    title: "Gluten Free",
    description: "100% gluten-free, safe for everyone",
  },
  {
    icon: <Globe className="w-10 h-10" />,
    title: "Export Quality",
    description: "Meets international quality standards",
  },
  {
    icon: <Sparkles className="w-10 h-10" />,
    title: "Premium Processing",
    description: "State-of-the-art processing techniques",
  },
  {
    icon: <Hand className="w-10 h-10" />,
    title: "Hand Picked",
    description: "Carefully hand-selected for quality",
  },
  {
    icon: <ShieldCheck className="w-10 h-10" />,
    title: "No Preservatives",
    description: "No artificial preservatives added",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-clash font-bold text-dark-forest mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the benefits of our premium makhana
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-cream p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-premium-gold/20 transition-all text-center group"
            >
              <div className="w-20 h-20 bg-premium-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-premium-gold group-hover:text-white group-hover:bg-premium-gold transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-dark-forest">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
