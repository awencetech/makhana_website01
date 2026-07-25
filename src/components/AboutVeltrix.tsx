"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { CountUp } from "./CountUp";
import { ImageModal } from "./ImageModal";

export const AboutVeltrix = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  const stats = [
    { value: 100, label: "Natural", suffix: "%" },
  ];

  return (
    <>
      <section id="about" className="py-24 bg-bg-secondary relative overflow-hidden" ref={ref}>
        {/* Background animations */}
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 bg-terracotta-soft/15 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, 20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-52 h-52 bg-purple-soft/15 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80, rotate: -1 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
              transition={{ duration: 1, type: "spring", stiffness: 60 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-accent-primary font-semibold mb-4 tracking-[0.2em] uppercase text-sm"
              >
                About Veltrix
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-8"
              >
                Crafted with <span className="text-accent-primary">Passion</span> & <span className="text-accent-primary">Precision</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-text-secondary text-lg mb-6 leading-relaxed"
              >
                At Veltrix, we believe in the power of natural, wholesome snacks. Our premium makhana is
                sourced directly from the fertile lands of Bihar, handpicked at peak freshness, and
                carefully processed to lock in all the nutrients and flavor.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-text-secondary text-lg mb-10 leading-relaxed"
              >
                With over a decade of expertise in the industry, we&apos;ve perfected the art of bringing
                you the finest quality makhana that&apos;s not just delicious, but also packed with health benefits.
              </motion.p>
              <div className="grid grid-cols-1 gap-8">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.6 + idx * 0.15, type: "spring" }}
                    whileHover={{ scale: 1.1, y: -10 }}
                    className="text-center"
                  >
                    <div className="text-5xl md:text-6xl font-serif font-bold text-accent-primary mb-2">
                      <CountUp
                        target={stat.value}
                        suffix={stat.suffix}
                        start={isInView}
                      />
                    </div>
                    <div className="text-text-secondary">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80, rotate: 1 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
              transition={{ duration: 1, type: "spring", stiffness: 60, delay: 0.2 }}
              className="relative"
            >
              <div 
                className="rounded-3xl overflow-hidden shadow-2xl border border-border cursor-pointer"
                onClick={() => setSelectedImage({ 
                  url: "/makhana5.jpg", 
                  alt: "Veltrix Premium Makhana" 
                })}
              >
                <img
                        src="/makhana5.jpg"
                        alt="Veltrix Premium Makhana"
                        className="w-full h-auto transition-transform duration-700 hover:scale-105"
                      />
              </div>
              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-primary/20 rounded-2xl -z-10"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-accent-soft/30 rounded-full -z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
        />
      )}
    </>
  );
};
