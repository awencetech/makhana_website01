
"use client";
import React from "react";
import { motion } from "framer-motion";

const brands = [
  "Organic Life",
  "Health First",
  "Premium Foods",
  "Natural Choice",
  "Eco Living",
  "Wellness Hub",
];

export const TrustedBy = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-gray-500 uppercase tracking-widest font-semibold mb-4">
            Trusted By
          </h3>
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-12"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[...brands, ...brands].map((brand, idx) => (
              <div
                key={idx}
                className="text-2xl font-clash font-bold text-gray-400 whitespace-nowrap"
              >
                {brand}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
