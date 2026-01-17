import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import { serverFetch } from "@/utils/helper/serverFetch";

const Home = async ({ products, categories }: { products: any, categories: any }) => {
  const banners: any[] = await serverFetch(`/api/v1/banners/active`, { requireAuth: false });

  const groupedBanners = {
    topLeftSlider: banners.filter(
      b => b.position === "HOME_TOP_LEFT_SLIDER"
    ),
    topRightBanner: banners.filter(
      b => b.position === "HOME_TOP_RIGHT_TOP" ||
        b.position === "HOME_TOP_RIGHT_BOTTOM"
    ).slice(0, 2),
    middleTop: banners.find(
      b => b.position === "HOME_MIDDLE_TOP"
    ),
    middleBottomLeft: banners.find(
      b =>
        b.position === "HOME_MIDDLE_BOTTOM_LEFT"
    ),
    middleBottomRight: banners.find(
      b => b.position === "HOME_MIDDLE_BOTTOM_RIGHT"
    ),
  };

  return (
    <main>
      <Hero
        slider={groupedBanners?.topLeftSlider}
        rightBanner={groupedBanners.topRightBanner}
      />
      <Categories data={categories} />
      <NewArrival products={products?.data} />
      <PromoBanner
        middleTop={groupedBanners.middleTop}
        middleBottomLeft={groupedBanners.middleBottomLeft}
        middleBottomRight={groupedBanners.middleBottomRight}
      />

      <BestSeller products={products?.data} />
      <CounDown />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
