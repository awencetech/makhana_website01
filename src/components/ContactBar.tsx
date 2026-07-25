import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export const ContactBar = () => {
  return (
    <div id="contact" className="bg-gradient-to-r from-accent-primary via-terracotta to-accent-secondary text-background py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Company Name */}
          <div className="text-xl font-bold">
            VELTRIX GLOBAL TRADING
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>+91 9751274826</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>+91 9677044660</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>veltrix1726@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <div className="text-center md:text-left">
                Rajiv Gandhi Salai, OMR,<br />
                Kottivakkam, Greater Chennai,<br />
                Chennai, Tamil Nadu,<br />
                600041
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
