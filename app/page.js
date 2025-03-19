"use client"

import BestSellingWatches from "@/components/HomepageComponents/BestSelling";
import FeaturedProduct from "@/components/HomepageComponents/FeaturedProduct";
import GallerySlider from "@/components/HomepageComponents/GallerySlider";
import WatchHero from "@/components/HomepageComponents/HeroVideo";
import NewsletterComponent from "@/components/HomepageComponents/NewsletterComponent";
import WatchOfTheMonth from "@/components/HomepageComponents/WatchOfTheMonth";
import WatchReviewSlider from "@/components/HomepageComponents/WatchReviewSlider";


export default function Home() {
  return (
    <div>
      <WatchHero />
      <BestSellingWatches />
      <FeaturedProduct />
      <GallerySlider />
      <WatchOfTheMonth />
      <WatchReviewSlider />
      <NewsletterComponent />

    </div>
  );
}
