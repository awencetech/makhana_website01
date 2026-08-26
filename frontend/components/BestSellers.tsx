
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Classic Roasted Makhana",
    price: 19.99,
    discountPrice: 14.99,
    image: "/makhana.jpg",
    rating: 4.9,
    reviews: 234,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Peri Peri Makhana",
    price: 24.99,
    discountPrice: null,
    image: "https://images.unsplash.com/photo-1557871638-cadee6d7f719?w=400&auto=format&fit=crop",
    rating: 4.8,
    reviews: 189,
    badge: "New",
  },
  {
    id: 3,
    name: "Himalayan Pink Salt",
    price: 22.99,
    discountPrice: 18.99,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop",
    rating: 4.7,
    reviews: 156,
    badge: null,
  },
  {
    id: 4,
    name: "Chocolate Delight",
    price: 29.99,
    discountPrice: 24.99,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop",
    rating: 5.0,
    reviews: 98,
    badge: "Limited",
  },
];

export const BestSellers = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-clash font-bold text-dark mb-4">
              Best Sellers
            </h2>
            <p className="text-gray-600">Our most loved premium makhana products</p>
          </div>
          <button className="mt-6 md:mt-0 px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {product.badge}
                  </div>
                )}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">({product.reviews})</span>
                </div>
                <h3 className="font-semibold text-lg mb-3">{product.name}</h3>
                <div className="flex items-center gap-3">
                  {product.discountPrice ? (
                    <>
                      <span className="text-primary font-bold text-xl">
                        ${product.discountPrice}
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-primary font-bold text-xl">${product.price}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
