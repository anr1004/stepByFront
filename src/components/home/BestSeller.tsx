import { Link } from "react-router-dom";
import ProductCard from "../product/ProductCard";
import { categoryData } from "../../data/category";
import { useEffect, useState } from "react";
import BestSellerCategoryFilter from "./BestSellerCategoryFilter";

const BestSeller: React.FC = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);

  const [selectedCategory, setSelectedCategory] = useState(
    categoryData[0].filter
  );

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/products/bestsellers"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(Response);
        const data: IProduct[] = await response.json();
        setAllProducts(data); // 가져온 베스트셀러 데이터를 상태에 저장
      } catch (err: any) {
        console.log(err);
      } finally {
      }
    };

    fetchBestSellers();
  }, []);

  const filteredProducts = allProducts.filter((productItem) => {
    if (selectedCategory === "all") {
      return true; // "전체" 선택 시 모든 베스트셀러 제품 반환
    } else if (selectedCategory === "new") {
      return productItem.isNewArrival === true;
    } else if (selectedCategory === "kids") {
      return productItem.isKids === true;
    } else {
      return productItem.category === selectedCategory;
    }
  });

  const productsToDisplay = filteredProducts.slice(0, 12);

  return (
    <section className="container mx-auto my-12 p-4">
      <h2 className="text-2xl font-bold mb-10">베스트 셀러</h2>
      <div className="flex justify-between ">
        <BestSellerCategoryFilter
          categories={categoryData}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <Link
          to="/best"
          className="shrink-0 inline-block rounded-lg hover:text-blue-500  transition-colors duration-200"
        >
          더보기
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {productsToDisplay.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
