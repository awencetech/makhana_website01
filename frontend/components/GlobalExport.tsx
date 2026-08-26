"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Truck, FileText, Palette } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "50+ Countries",
    description: "Exporting to over 50 countries worldwide",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Reliable and timely global shipping",
  },
  {
    icon: FileText,
    title: "Complete Documentation",
    description: "All necessary export documentation",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description: "Private labeling and custom packaging options",
  },
];

export const GlobalExport = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-off-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="text-premium-gold font-semibold mb-4 tracking-[0.2em] uppercase text-sm">
              Global Presence
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-forest mb-8">
              Global Export Excellence
            </h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              With our extensive global network, we ensure seamless export of premium makhana to countries across the globe. Our export services include custom packaging, private labeling, and reliable logistics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-premium-gold/10 rounded-xl flex items-center justify-center text-premium-gold flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-forest mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&auto=format&fit=crop"
                alt="Global Map"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-premium-gold text-dark-forest p-8 rounded-3xl shadow-2xl">
              <div className="text-4xl font-serif font-bold mb-2">50+</div>
              <div className="font-semibold">Countries Served</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
