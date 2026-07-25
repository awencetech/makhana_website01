
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutVeltrix } from "@/components/AboutVeltrix";
import { QualityJourney } from "@/components/QualityJourney";
import { WhyChooseVeltrix } from "@/components/WhyChooseVeltrix";
import { Testimonials } from "@/components/Testimonials";
import { ContactNewsletter } from "@/components/ContactNewsletter";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutVeltrix />
      <QualityJourney />
      <WhyChooseVeltrix />
      <Testimonials />
      <ContactNewsletter />
      <Footer />
    </main>
  );
}
