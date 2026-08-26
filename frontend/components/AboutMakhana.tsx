
"use client";
import React from "react";
import { motion } from "framer-motion";

const timelineItems = [
  {
    title: "History",
    description: "Makhana, also known as Fox Nuts, has been a cherished superfood in India for centuries, especially in the state of Bihar.",
  },
  {
    title: "What is Makhana",
    description: "Makhana are the seeds of the Euryale ferox plant, a type of water lily native to Asia. They are harvested from ponds and lakes.",
  },
  {
    title: "Why Bihar",
    description: "Bihar's unique climate and fertile soil make it the perfect region for cultivating the highest quality makhana in the world.",
  },
  {
    title: "Journey of Premium Makhana",
    description: "From seed selection to your table, every step of our process is carefully monitored to ensure premium quality.",
  },
];

export const AboutMakhana = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-clash font-bold text-dark-forest mb-4">
            About Makhana
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the rich history and journey of premium makhana
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-premium-gold/30 h-full hidden md:block" />

          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex mb-16 items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="w-1/2 px-8 hidden md:block" />
              <div className="w-10 h-10 bg-premium-gold rounded-full flex items-center justify-center z-10 border-4 border-cream">
                <div className="w-4 h-4 bg-dark-forest rounded-full" />
              </div>
              <div className="w-full md:w-1/2 px-8">
                <div className="bg-off-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-clash font-bold text-dark-forest mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
