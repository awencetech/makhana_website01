"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  Scissors,
  Sun,
  Flame,
  CheckCircle2,
  Package,
  Globe,
} from "lucide-react";

const journeySteps = [
  {
    icon: Search,
    title: "Farm Selection",
    description: "Carefully selecting the finest farms with optimal growing conditions",
    image: "https://images.unsplash.com/photo-1444858291040-58f74be8d2e2?w=400&auto=format&fit=crop",
  },
  {
    icon: Scissors,
    title: "Harvesting",
    description: "Hand-harvesting at peak maturity for maximum nutritional value",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&auto=format&fit=crop",
  },
  {
    icon: Sun,
    title: "Drying",
    description: "Natural sun-drying process to preserve quality and taste",
    image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=400&auto=format&fit=crop",
  },
  {
    icon: Flame,
    title: "Roasting",
    description: "Precision roasting for perfect crunch and flavor",
    image: "https://images.unsplash.com/photo-1598899625753-3e3e8452d0fa?w=400&auto=format&fit=crop",
  },
  {
    icon: CheckCircle2,
    title: "Quality Inspection",
    description: "Rigorous quality checks at every stage of production",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop",
  },
  {
    icon: Package,
    title: "Packaging",
    description: "Premium packaging ensuring freshness and shelf life",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop",
  },
  {
    icon: Globe,
    title: "Export",
    description: "Global shipping to deliver premium makhana worldwide",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&auto=format&fit=crop",
  },
];

export const ProductJourney = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="text-premium-gold font-semibold mb-4 tracking-[0.2em] uppercase text-sm">
            Our Process
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-forest mb-4">
            Journey of Premium Makhana
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From farm selection to global export, every step is carefully monitored.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-premium-gold/20 hidden md:block" />

          <div className="space-y-12">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: isEven ? -50 : 50,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          x: 0,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                  }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div
                      className={`p-8 rounded-3xl bg-cream shadow-lg ${
                        isEven ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center text-white font-bold font-serif text-xl">
                          {index + 1}
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-dark-forest">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  <div className="relative z-10 w-32 h-32 bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-premium-gold hidden md:flex items-center justify-center">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="w-full md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
