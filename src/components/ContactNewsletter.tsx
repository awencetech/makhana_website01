"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const WA_PHONE = "919751278466";

const validateEmail = (value: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value.trim());
};

const sendToWhatsApp = (name: string, email: string, messageText: string) => {
  const message = `Hello,\n\nI would like to contact you.\n\n*Name:*\n${name}\n\n*Email:*\n${email}\n\n*Message:*\n${messageText}\n\nThank you.`;
  const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
  return window.open(url, "_blank", "noopener,noreferrer");
};

export const ContactNewsletter = () => {
  const ref = useRef(null);
  const contactFormRef = useRef<HTMLFormElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [contactErrors, setContactErrors] = useState({ name: "", email: "", message: "" });
  const [contactLoading, setContactLoading] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleContactInput = (field: "name" | "email" | "message", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setContactErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();
    const errors = {
      name: trimmedName ? "" : "Please enter your name.",
      email: trimmedEmail ? "" : "Please enter your email.",
      message: trimmedMessage ? "" : "Please enter your message.",
    };

    if (trimmedEmail && !validateEmail(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    setContactErrors(errors);

    const form = contactFormRef.current;
    if (form && !form.checkValidity()) {
      form.reportValidity();
    }

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) {
      return;
    }

    setContactLoading(true);

    const newWindow = sendToWhatsApp(trimmedName, trimmedEmail, trimmedMessage);
    if (newWindow) {
      newWindow.focus();
    }

    setContactLoading(false);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      alert("Successfully subscribed to our newsletter!");
      setNewsletterEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-gradient-to-br from-light-pink/30 to-gold-soft/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-accent-primary/30 to-terracotta/30 rounded-full mb-4 sm:mb-6 border-2 border-accent-primary/50 shadow-lg">
            <span className="text-accent-secondary font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-sm sm:text-base">
              Get in Touch
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
            Let&apos;s <span className="text-terracotta">Connect</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
            Have questions or want to place a bulk order? We&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-primary mb-6 sm:mb-8">
              Contact Information
            </h3>
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              <div className="flex items-start gap-4 p-4 sm:p-6 bg-gradient-to-r from-gold-soft/30 to-accent-soft/30 rounded-2xl border border-accent-primary/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl sm:rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-accent-secondary mb-1 text-sm sm:text-base">Address</h4>
                  <p className="text-text-secondary text-sm sm:text-base">
                    Rajiv Gandhi Salai, OMR<br />
                    Kottivakkam, Greater Chennai<br />
                    Chennai, Tamil Nadu<br />
                    600041, India
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 sm:p-6 bg-gradient-to-r from-light-pink/30 to-gold-soft/30 rounded-2xl border border-warm-gold/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-warm-gold to-terracotta-soft rounded-xl sm:rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-warm-gold mb-1 text-sm sm:text-base">Email</h4>
                  <p className="text-text-secondary text-sm sm:text-base">veltrix1726@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 sm:p-6 bg-gradient-to-r from-terracotta-soft/30 to-light-pink/30 rounded-2xl border border-terracotta/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-terracotta to-deep-purple rounded-xl sm:rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-terracotta mb-1 text-sm sm:text-base">Phone</h4>
                  <p className="text-text-secondary text-sm sm:text-base">
                    +91 9751278466<br />
                    +91 967704466
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/85 to-purple-soft/20 p-6 sm:p-8 rounded-3xl border-2 border-purple-soft/30 shadow-xl">
              <h4 className="text-lg sm:text-xl font-serif font-bold text-deep-purple mb-4">
                Subscribe to Newsletter
              </h4>
              <p className="text-text-secondary mb-6 text-sm sm:text-base">
                Get the latest updates, offers, and health tips delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 sm:px-5 py-3 bg-bg-secondary border-2 border-purple-soft/30 rounded-full text-text-primary placeholder-text-muted focus:outline-none focus:border-deep-purple transition-all text-sm sm:text-base"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-deep-purple to-terracotta text-background rounded-full font-semibold hover:from-terracotta hover:to-accent-primary transition-all flex items-center justify-center gap-2 shadow-glow-purple text-sm sm:text-base"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-white/85 to-terracotta-soft/20 p-6 sm:p-8 rounded-3xl border-2 border-terracotta/30 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-terracotta mb-6 sm:mb-8">
                Send us a Message
              </h3>
              <form ref={contactFormRef} onSubmit={handleContactSubmit} className="space-y-5 sm:space-y-6" noValidate>
                <div>
                  <label className="block text-text-secondary mb-2 text-sm font-medium" htmlFor="contact-name">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleContactInput("name", e.target.value)}
                    className={`w-full px-4 sm:px-5 py-3 bg-bg-secondary border-2 rounded-full text-text-primary placeholder-text-muted focus:outline-none transition-all text-sm sm:text-base ${contactErrors.name ? "border-red-500/60 focus:border-red-500" : "border-accent-primary/30 focus:border-accent-primary"}`}
                    placeholder="John Doe"
                  />
                  {contactErrors.name ? (
                    <p className="mt-2 text-sm text-red-600">{contactErrors.name}</p>
                  ) : null}
                </div>
                <div>
                  <label className="block text-text-secondary mb-2 text-sm font-medium" htmlFor="contact-email">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleContactInput("email", e.target.value)}
                    className={`w-full px-4 sm:px-5 py-3 bg-bg-secondary border-2 rounded-full text-text-primary placeholder-text-muted focus:outline-none transition-all text-sm sm:text-base ${contactErrors.email ? "border-red-500/60 focus:border-red-500" : "border-warm-gold/30 focus:border-warm-gold"}`}
                    placeholder="john@example.com"
                  />
                  {contactErrors.email ? (
                    <p className="mt-2 text-sm text-red-600">{contactErrors.email}</p>
                  ) : null}
                </div>
                <div>
                  <label className="block text-text-secondary mb-2 text-sm font-medium" htmlFor="contact-message">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleContactInput("message", e.target.value)}
                    className={`w-full px-4 sm:px-5 py-3 bg-bg-secondary border-2 rounded-3xl text-text-primary placeholder-text-muted focus:outline-none resize-none transition-all text-sm sm:text-base ${contactErrors.message ? "border-red-500/60 focus:border-red-500" : "border-terracotta/30 focus:border-terracotta"}`}
                    placeholder="Write your message here..."
                  />
                  {contactErrors.message ? (
                    <p className="mt-2 text-sm text-red-600">{contactErrors.message}</p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  disabled={
                    contactLoading ||
                    !formData.name.trim() ||
                    !formData.email.trim() ||
                    !formData.message.trim() ||
                    !!contactErrors.email
                  }
                  className={`w-full py-3 sm:py-4 rounded-full font-semibold transition-all text-base sm:text-lg shadow-glow-terracotta ${contactLoading || !formData.name.trim() || !formData.email.trim() || !formData.message.trim() || !!contactErrors.email ? "bg-slate-300 text-slate-600 cursor-not-allowed" : "bg-gradient-to-r from-accent-primary to-terracotta text-background hover:from-terracotta hover:to-deep-purple"}`}
                >
                  {contactLoading ? "Preparing WhatsApp..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Our Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 sm:mt-20"
        >
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-accent-primary/30 to-terracotta/30 rounded-full mb-4 sm:mb-6 border-2 border-accent-primary/50 shadow-lg">
              <span className="text-accent-secondary font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-sm sm:text-base">
                Our Location
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
              Find <span className="text-terracotta">Us</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Visit our store or get directions to explore our premium makhana products in person.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-accent-primary/30">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15546.837683473355!2d80.23968055!3d12.93904875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525c9e7c3e8e3d%3A0x6c9f3c7d3b6a2e1f!2sKottivakkam%2C%20Rajiv%20Gandhi%20Salai%2C%20OMR%2C%20Chennai%2C%20Tamil%20Nadu%20600041!5e0!3m2!1sen!2sin!4v1721900000000!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
              </div>
            </motion.div>

            {/* Address & Get Directions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-white/85 to-gold-soft/20 p-6 sm:p-8 rounded-3xl border-2 border-accent-primary/30 shadow-xl">
                <div className="flex items-start gap-4 mb-6 sm:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl sm:rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-accent-secondary mb-1 text-base sm:text-lg">Complete Address</h4>
                    <p className="text-text-secondary text-sm sm:text-base">
                      Rajiv Gandhi Salai, OMR<br />
                      Kottivakkam, Greater Chennai<br />
                      Chennai, Tamil Nadu<br />
                      600041, India
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=12.9391,80.2433"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-accent-primary to-terracotta text-white rounded-full font-semibold hover:from-terracotta hover:to-deep-purple transition-all shadow-glow-terracotta text-base sm:text-lg w-full sm:w-auto"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  Get Directions
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
