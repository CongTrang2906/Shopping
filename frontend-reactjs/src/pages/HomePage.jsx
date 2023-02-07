import React from "react";
import Categories from "../components/Categories/Categories";
import Slider from "../components/Slider/Slider";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
export default function HomePage() {
  return (
    <div>
      <Slider />
      <FeaturedProducts />
      <Categories />
      <FeaturedProducts />
      <Contact />
      <Footer />
    </div>
  );
}
