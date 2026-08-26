"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Health Coach",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop",
    text: "Veltrix's makhana is the best I've ever tasted. Premium quality, always fresh, and my clients absolutely love it!",
  },
  {
    name: "Michael Chen",
    role: "Food Importer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
    text: "Veltrix has been our trusted supplier for years. Consistent quality and reliable delivery every single time.",
  },
  {
    name: "Emily Rodriguez",
    role: "Retail Owner",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop",
    text: "Elegant packaging and exceptional taste. Our customers can't get enough of Veltrix products!",
  },
];

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-bg-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-accent-primary font-semibold mb-4 tracking-[0.2em] uppercase text-sm"
          >
            Testimonials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4"
          >
            Loved by <span className="text-accent-primary">Thousands</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-text-secondary max-w-2xl mx-auto text-lg"
          >
            Hear what our valued customers have to say about Veltrix.
          </motion.p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.85 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.15, type: "spring" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-background p-8 rounded-3xl border border-border hover:shadow-glow-green transition-all"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + idx * 0.15 }}
                  className="flex text-accent-primary mb-6"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + idx * 0.15 + i * 0.05 }}
                      className="inline-block"
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </motion.div>
                  ))}
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + idx * 0.15 }}
                  className="text-text-secondary mb-8 leading-relaxed text-lg"
                >
                  &ldquo;{testimonial.text}&rdquo;
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + idx * 0.15 }}
                  className="flex items-center gap-4"
                >
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-accent-primary"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                  <div>
                    <h4 className="font-semibold text-xl font-serif text-text-primary">
                      {testimonial.name}
                    </h4>
                    <p className="text-text-muted">{testimonial.role}</p>
                  </div>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
