
import React from "react";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gold-soft via-light-pink to-gold-soft border-t border-border pt-16 sm:pt-24 pb-8 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div>
            <Image
              src="/logo.png"
              alt="Veltrix Global Trading"
              width={200}
              height={60}
              className="h-auto max-h-16 sm:max-h-20 object-contain mb-4 sm:mb-6"
            />
            <p className="text-text-secondary mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Premium organic makhana exporter delivering excellence worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 font-serif text-text-primary">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Products", href: "/products" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-text-secondary hover:text-accent-primary transition-colors text-sm sm:text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 font-serif text-text-primary">
              Products
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                "Premium Export Quality",
                "Premium Standard Quality",
                "Economy Quality",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/products"
                    className="text-text-secondary hover:text-accent-primary transition-colors text-sm sm:text-base"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 font-serif text-text-primary">
              Contact Us
            </h4>
            <div className="space-y-3 sm:space-y-4 text-text-secondary">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div className="text-sm sm:text-base">
                  <p>+91 9751278466</p>
                  <p>+91 967704466</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <p className="text-sm sm:text-base">veltrix1726@gmail.com</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div className="text-sm sm:text-base">
                  <p>Rajiv Gandhi Salai, OMR,</p>
                  <p>Kottivakkam, Greater Chennai,</p>
                  <p>Chennai, Tamil Nadu,</p>
                  <p>600041</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 sm:pt-8 text-center text-text-muted">
          <p className="text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Veltrix Global Trading. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
