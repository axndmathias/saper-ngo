import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Events } from "@/components/events";
import { About } from "@/components/about";
import { Causes } from "@/components/causes";
import { FeaturedCampaign } from "@/components/featured-campaign";
import { Gallery } from "@/components/gallery";
import { Testimonials } from "@/components/testimonials";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Events />
      <About />
      <Causes />
      <FeaturedCampaign />
      <Gallery />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}
