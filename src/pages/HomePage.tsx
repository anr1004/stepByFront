import BestSeller from "../components/home/BestSeller";
import MainSlide from "../components/home/MainSlide";
import NewArrivals from "../components/home/NewArrivals";
import mainSlideData from "../data/mainSlides";
import productData from "../data/product";

const HomePage: React.FC = () => {
  return (
    <div className="grow">
      <MainSlide slides={mainSlideData} />
      <BestSeller />
      <NewArrivals />
    </div>
  );
};

export default HomePage;
