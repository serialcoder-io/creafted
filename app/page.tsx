// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
// import Link from "next/link";

import Footer from "@/components/layout/Footer";
import HeaderSection from "@/components/common/HeaderSection";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUseSection from "@/components/home/WhyChooseUsSection";
import FeatureProductSection from "@/components/home/FeatureProductSection";
import CategorySection from "@/components/home/CategorySection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderSection />
      <main className="">
        <HeroSection />
        <CategorySection />
        <FeatureProductSection />
        <WhyChooseUseSection />
      </main>
      <Footer />
    </div>
  );
}
