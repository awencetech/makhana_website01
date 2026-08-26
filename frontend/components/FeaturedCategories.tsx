
"use client";
import React from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "Flavored", image: "https://images.unsplash.com/photo-1601001911269-5725a0f25a18?w=400&auto=format&fit=crop" },
  { name: "Roasted", image: "https://images.unsplash.com/photo-1557871638-cadee6d7f719?w=400&auto=format&fit=crop" },
  { name: "Classic", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop" },
  { name: "Masala", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&auto=format&fit=crop" },
  { name: "Sweet", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop" },
  { name: "Gift Box", image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=400&auto=format&fit=crop" },
];

export const FeaturedCategories = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-clash font-bold text-dark mb-4">
            Featured Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of premium makhana varieties
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-dark group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
