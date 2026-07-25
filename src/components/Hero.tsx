"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ImageModal } from "./ImageModal";

// Slide data
const slides = [
  {
    badge: "Premium Snacks",
    title: "Elevate Your <span class='text-accent-primary inline-block'>Makhana</span> Experience",
    description: "Discover Veltrix's premium makhana, sourced from India's finest farms and crafted with perfection. Healthy, delicious, and truly luxurious.",
    image: "/makhana.jpg",
    imageAlt: "Premium Veltrix Makhana",
    stat1: "100%",
    stat1Label: "Natural & Organic",
    stat2: "0%",
    stat2Label: "Preservatives"
  },
  {
    badge: "Export Quality",
    title: "World-Class <span class='text-terracotta inline-block'>Makhana</span> Delivered",
    description: "Our premium export quality makhana is carefully selected and processed to meet international standards, bringing the best of India to your table.",
    image: "/makhana1.jpg",
    imageAlt: "Export Quality Makhana",
    stat1: "Premium",
    stat1Label: "Grade A Quality",
    stat2: "Global",
    stat2Label: "Shipping Available"
  }
];

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto slide change
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <>
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-20 pb-10 lg:pb-0 overflow-hidden bg-gradient-to-br from-background via-bg-secondary to-terracotta-soft/10">
        {/* Background decorative blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/15 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-terracotta-soft/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-soft/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            x: ["-50%", "-30%", "-50%"],
            y: ["-50%", "-70%", "-50%"],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
          {/* Left side: Text content */}
          <div className="relative order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="text-accent-primary font-semibold mb-4 tracking-[0.3em] uppercase text-xs sm:text-sm"
                >
                  {currentSlideData.badge}
                </motion.div>
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-text-primary mb-6 sm:mb-8 leading-tight"
                  dangerouslySetInnerHTML={{ __html: currentSlideData.title }}
                />
                <p className="text-base sm:text-lg text-text-secondary mb-8 sm:mb-10 max-w-xl leading-relaxed">
                  {currentSlideData.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <Link
                    href="/products"
                    className="group px-6 sm:px-10 py-3 sm:py-5 bg-gradient-to-r from-accent-primary to-terracotta text-background rounded-full font-semibold hover:from-accent-secondary hover:to-terracotta-soft transition-all hover:shadow-glow-terracotta transform hover:-translate-y-2 hover:scale-105 flex items-center justify-center text-sm sm:text-base"
                  >
                    Explore Products
                    <span className="ml-2 transition-transform group-hover:translate-x-2">→</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="group px-6 sm:px-10 py-3 sm:py-5 border-2 border-accent-primary text-accent-primary rounded-full font-semibold hover:bg-gradient-to-r from-accent-primary to-terracotta hover:text-background transition-all hover:scale-105 flex items-center justify-center text-sm sm:text-base"
                  >
                    Get in Touch
                    <span className="ml-2 transition-transform group-hover:translate-x-2">→</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right side: Video content (or fallback image if video fails) */}
          <motion.div className="relative order-1 lg:order-2" style={{ y: y1 }}>
            <div 
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-accent-primary/20 border border-border"
            >
              <video
                src="/makhana-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
                suppressHydrationWarning
                onError={(e) => {
                  const target = e.target as HTMLVideoElement;
                  target.style.display = 'none';
                  const fallbackImg = document.createElement('img');
                  fallbackImg.src = '/makhana.jpg';
                  fallbackImg.alt = 'Premium Makhana';
                  fallbackImg.className = 'w-full h-auto transition-transform duration-500 hover:scale-105';
                  target.parentElement?.appendChild(fallbackImg);
                }}
                poster="/makhana.jpg"
              />
            </div>
            <motion.div
              style={{ y: y2 }}
              animate={{ y: [0, -25, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 sm:-top-10 sm:-left-10 bg-bg-secondary p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl z-20 border border-border"
            >
              <div className="text-2xl sm:text-4xl font-bold text-accent-primary">{currentSlideData.stat1}</div>
              <div className="text-text-secondary text-xs sm:text-sm">{currentSlideData.stat1Label}</div>
            </motion.div>
            <motion.div
              style={{ y: y2 }}
              animate={{ y: [0, 25, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -right-4 sm:-bottom-10 sm:-right-10 bg-bg-secondary p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl z-20 border border-border"
            >
              <div className="text-2xl sm:text-4xl font-bold text-accent-primary">{currentSlideData.stat2}</div>
              <div className="text-text-secondary text-xs sm:text-sm">{currentSlideData.stat2Label}</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-accent-primary scale-125' : 'bg-text-secondary/50 hover:bg-text-secondary'
            }`}
            />
          ))}
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
