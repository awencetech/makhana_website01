
"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  imageIndex: number;
  sectionIndex: number;
  scrollYProgress: MotionValue<number>;
}

const ProductImage = ({ src, alt, imageIndex, sectionIndex, scrollYProgress }: ProductImageProps) => {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [imageIndex % 2 === 0 ? 0 : 30, imageIndex % 2 === 0 ? -30 : 0]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: imageIndex % 2 === 0 ? -3 : 3 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        rotate: 0,
        scale: [1, 1.02, 1]
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: sectionIndex * 0.3 + 0.3 + imageIndex * 0.15,
        scale: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      style={{ y }}
      className="flex-1 rounded-3xl overflow-hidden shadow-2xl border-2 border-accent-primary/30 hover:border-accent-primary transition-all hover:shadow-glow-green group"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </motion.div>
  );
};

const gradeSections = [
  {
    grade: "1st Grade",
    title: "Premium Export Quality",
    images: [
      { src: "/makhana1.jpg", alt: "Premium Standard 1" },
      { src: "/makhana8.png", alt: "Premium Standard 8" },
    ],
    color: "from-accent-primary",
  },
  {
    grade: "2nd Grade",
    title: "Premium Standard Quality",
    images: [
      { src: "/makhana2.jpg", alt: "Premium Export 2" },
      { src: "/makhana9.png", alt: "Premium Export 9" },
    ],
    color: "from-terracotta",
  },
  {
    grade: "3rd Grade",
    title: "Economy Quality",
    images: [
      { src: "/makhana3.jpg", alt: "Economy 3" },
      { src: "/makhana10.png", alt: "Economy 10" },
    ],
    color: "from-deep-purple",
  },
];

export default function ProductsPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <section className="pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-background via-gold-soft/30 to-light-pink/30 relative overflow-hidden">
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-accent-soft/20 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-soft/20 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, -10, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-3xl overflow-hidden shadow-2xl p-1 bg-gradient-to-r from-accent-primary via-terracotta to-purple-soft mb-8 sm:mb-12"
          >
            <div className="rounded-[22px] overflow-hidden">
              <img
                src="/makhana6.jpg"
                alt="Premium Makhana"
                className="w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-accent-primary via-terracotta to-deep-purple bg-clip-text text-transparent mb-4"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Our Premium Makhana Products
            </motion.h1>
            <p className="text-base sm:text-xl text-text-secondary mb-8 sm:mb-16 max-w-2xl mx-auto">
              Discover our range of high-quality, natural makhana sourced directly from the finest farms
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grade Sections */}
      <section ref={containerRef} className="py-12 sm:py-20 bg-gradient-to-br from-gold-soft/20 via-bg-secondary to-terracotta-soft/20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {gradeSections.map((section, sectionIndex) => {
            return (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: sectionIndex * 0.3 }}
                className="mb-12 sm:mb-20 last:mb-0"
              >
                <div className="text-center mb-8 sm:mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: sectionIndex * 0.3 + 0.1 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r bg-clip-text text-transparent mb-2"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${section.color === 'from-accent-primary' ? '#064e3b' : section.color === 'from-terracotta' ? '#b45309' : '#581c87'}, ${section.color === 'from-accent-primary' ? '#059669' : section.color === 'from-terracotta' ? '#ea580c' : '#7e22ce'})`,
                    }}
                  >
                    {section.grade}
                  </motion.h2>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: sectionIndex * 0.3 + 0.2 }}
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-text-primary"
                  >
                    {section.title}
                  </motion.h3>
                </div>
                <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-stretch">
                  {section.images.map((image, imageIndex) => (
                    <ProductImage
                      key={imageIndex}
                      src={image.src}
                      alt={image.alt}
                      imageIndex={imageIndex}
                      sectionIndex={sectionIndex}
                      scrollYProgress={scrollYProgress}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
