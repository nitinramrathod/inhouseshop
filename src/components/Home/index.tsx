import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";

const Home = ({products, categories}:{products:any, categories:any}) => {
  return (
    <main>
      <Hero />
      <Categories data={categories}/>
      <NewArrival products={products?.data}/>
      <PromoBanner />
      <BestSeller products={products?.data} />
      <CounDown />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
