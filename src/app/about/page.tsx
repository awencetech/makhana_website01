
"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutVeltrix } from "@/components/AboutVeltrix";
import { QualityJourney } from "@/components/QualityJourney";
import { WhyChooseVeltrix } from "@/components/WhyChooseVeltrix";
import { motion } from "framer-motion";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const itemVariantsRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-purple-soft/20 via-light-pink/30 to-gold-soft/20 relative overflow-hidden">
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 right-10 w-36 h-36 bg-terracotta-soft/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-44 h-44 bg-accent-soft/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-3xl overflow-hidden shadow-2xl p-1 bg-gradient-to-r from-deep-purple via-light-pink to-gold-soft mb-12"
          >
            <div className="rounded-[22px] overflow-hidden">
              <img
                src="/makhana7.jpg"
                alt="About Veltrix"
                className="w-full h-[500px] object-cover"
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
              className="text-5xl md:text-7xl font-serif font-bold mb-4"
            >
              About <motion.span className="bg-gradient-to-r from-terracotta via-purple-soft to-accent-primary bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ backgroundSize: "200% 200%" }}
              >Veltrix</motion.span>
            </motion.h1>
            <p className="text-xl text-text-secondary mb-16 max-w-2xl mx-auto">
              Learn about our journey and commitment to bringing you the finest premium makhana
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-20"
          >
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-br from-terracotta-soft/10 via-purple-soft/20 to-light-pink/10 p-8 rounded-3xl border border-border shadow-glow-purple">
                <AboutVeltrix />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariantsRight}>
              <div className="bg-gradient-to-br from-accent-soft/10 via-gold-soft/20 to-terracotta-soft/10 p-8 rounded-3xl border border-border shadow-glow-green">
                <QualityJourney />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-br from-light-pink/10 via-terracotta-soft/20 to-purple-soft/10 p-8 rounded-3xl border border-border shadow-glow-terracotta">
                <WhyChooseVeltrix />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      

      
      <Footer />
    </main>
  );
}
