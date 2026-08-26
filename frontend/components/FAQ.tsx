"use client";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "What makes Veltrix Makhana premium?",
    answer:
      "Our makhana is sourced from select farms in Bihar, hand-picked, and processed using state-of-the-art techniques to preserve nutrition and taste.",
  },
  {
    question: "Do you offer private labeling?",
    answer:
      "Yes! We offer comprehensive private labeling and custom branding solutions for our partners worldwide.",
  },
  {
    question: "What is the minimum order quantity for export?",
    answer:
      "Our MOQ varies by product and packaging. Please contact our export team for detailed information.",
  },
  {
    question: "Are your products organic certified?",
    answer:
      "Yes, our makhana is certified organic and undergoes rigorous testing to meet international standards.",
  },
  {
    question: "What is the shelf life of your products?",
    answer:
      "Our premium packaging ensures a shelf life of 12 months from the date of manufacture when stored properly.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-premium-gold font-semibold mb-4 tracking-[0.2em] uppercase text-sm">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-forest mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Find answers to common questions about our products and services.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-gray-200 rounded-3xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 flex items-center justify-between text-left bg-cream hover:bg-cream/80 transition-colors"
              >
                <span className="font-semibold text-dark-forest text-lg">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-premium-gold" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-premium-gold" />
                )}
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  openIndex === index
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 text-gray-600">{faq.answer}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
