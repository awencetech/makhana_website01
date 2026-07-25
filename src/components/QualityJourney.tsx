"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Sprout,
  ShieldCheck,
  Settings,
  Package,
  CheckCircle,
} from "lucide-react";

export const QualityJourney = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const journeySteps = [
    {
      icon: Sprout,
      title: "Careful Harvesting",
      description: "Traditional harvesting methods ensure naturally grown premium seeds.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Inspection",
      description: "Every batch is checked for size, purity, and consistency.",
    },
    {
      icon: Settings,
      title: "Premium Processing",
      description: "Processed under strict hygiene standards to preserve freshness and nutritional value.",
    },
    {
      icon: Package,
      title: "Packaging Excellence",
      description: "Carefully packed to maintain freshness and meet international export standards.",
    },
  ];

  const qualityBenefits = [
    "Carefully Selected Premium Seeds",
    "Naturally Gluten Free",
    "Multi-Level Quality Inspection",
    "Freshness Guaranteed",
    "Hygienically Processed",
    "Premium Packaging",
    "Export-Quality Standards",
    "No Artificial Preservatives",
  ];

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-gold-soft via-light-pink to-terracotta-soft/40 relative overflow-hidden">
      {/* Background floating decorations */}
      <motion.div
        className="absolute top-8 left-5 w-48 h-48 bg-accent-soft/25 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-8 right-5 w-56 h-56 bg-purple-soft/20 rounded-full blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, -30, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-block px-8 py-3 bg-gradient-to-r from-accent-primary/30 to-terracotta/30 rounded-full mb-4 border-2 border-accent-primary/50 shadow-lg">
            <span className="text-accent-secondary font-bold tracking-[0.3em] uppercase text-base">
              Our Quality Journey
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Single Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-border">
              <img
                src="/makhana4.jpg"
                alt="Premium Makhana"
                className="w-full h-auto object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 w-28 h-28 bg-accent-primary/20 rounded-2xl -z-10"
            />
          </motion.div>

          {/* Process & Benefits */}
          <div className="space-y-8">
            {/* Process Steps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-2xl font-serif font-bold text-accent-secondary mb-5 flex items-center gap-2">
                <Sprout className="w-7 h-7 text-accent-primary" />
                Our Process
              </h3>
              <div className="space-y-4">
                {journeySteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="bg-gradient-to-br from-white/80 to-terracotta-soft/20 backdrop-blur-sm rounded-xl p-5 border-2 border-accent-primary/30 shadow-md hover:shadow-glow-terracotta transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent-primary to-terracotta rounded-full flex items-center justify-center text-white shadow-md">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="text-terracotta font-bold text-xs mb-1">
                            STEP {index + 1}
                          </div>
                          <h4 className="text-lg font-serif font-bold text-text-primary mb-1">
                            {step.title}
                          </h4>
                          <p className="text-text-secondary text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="bg-gradient-to-br from-white/80 to-light-pink/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-terracotta/30 shadow-xl"
            >
              <h3 className="text-2xl font-serif font-bold text-accent-secondary mb-4 flex items-center gap-2">
                <CheckCircle className="w-7 h-7 text-accent-primary" />
                Why Choose Veltrix
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {qualityBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                    className="flex items-center gap-2 p-2 bg-gradient-to-r from-accent-soft/30 to-terracotta-soft/30 rounded-lg border border-accent-primary/20"
                  >
                    <CheckCircle className="w-4 h-4 text-accent-primary flex-shrink-0" />
                    <span className="text-text-primary text-xs font-medium">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
