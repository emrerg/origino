"use client";
import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/HeroSection/HeroSection";
import OliveStats from "@/components/olive-stats/OliveStats";
import ProcessedSection from "@/components/processed-section";
import BuyInStock from "@/components/Stock/Stock";
import StorageMainLayout from "@/components/StorageMainLayout/StorageMainLayout";
import TestingQuality from "@/components/testing-and-quality";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { events } from "@/lib/gtag";
import { useEffect } from "react";

export default function HomePage() {
  useGoogleAnalytics();

  useEffect(() => {
    // Track page land
    events.landed();

    // Check if we should scroll to storage section
    const shouldScrollToStorage = sessionStorage.getItem("returnToStorage");
    if (shouldScrollToStorage) {
      // Clear the flag
      sessionStorage.removeItem("returnToStorage");

      // Scroll to storage section
      const storageSection = document.getElementById("storage-section");
      if (storageSection) {
        storageSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <>
      <HeroSection />
      <ProcessedSection />
      <TestingQuality />

      <div className="px-5 mt-5">
        <OliveStats />
      </div>
      <div className=" mt-5 flex justify-center items-center">
        <StorageMainLayout />
      </div>
      <div className="mt-10">
        <BuyInStock />
      </div>

      <Footer />
    </>
  );
}
