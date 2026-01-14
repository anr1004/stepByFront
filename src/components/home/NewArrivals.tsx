import { Link } from "react-router-dom";
import ProductCard from "../product/ProductCard"; // 상품 카드 컴포넌트 재활용
import { categoryNewData } from "../../data/category";
import { useEffect, useState } from "react";
import BestSellerCategoryFilter from "./BestSellerCategoryFilter"; // 카테고리 필터 컴포넌트 재활용

const NewArrivals: React.FC = () => {
  const [allNewArrivalsProducts, setAllNewArrivalsProducts] = useState<
    IProduct[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryNewData.length > 0 ? categoryNewData[0].filter : "all"
  );

  useEffect(() => {
    // 컴포넌트가 마운트될 때 백엔드에서 신상품 데이터를 가져옴
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/products/new-arrivals" // 신상품 API 엔드포인트
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: IProduct[] = await response.json();
        setAllNewArrivalsProducts(data); // 가져온 신상품 데이터를 상태에 저장
      } catch (err: any) {
        console.error("Failed to fetch new arrivals:", err); // 에러 로그 강화
      } finally {
      }
    };
    fetchNewArrivals();
  }, []);

  // 2단계 필터링: '신상품' 중에서 현재 선택된 카테고리에 따라 추가 필터링합니다.
  const filteredProducts = allNewArrivalsProducts.filter((productItem) => {
    // "전체" (all) 또는 "best"가 선택된 경우
    if (selectedCategory === "all") {
      return true; // 모든 신상품 표시
    } else if (selectedCategory === "best") {
      return productItem.isBestSeller === true; // 신상품 중 베스트셀러만 표시
    } else if (selectedCategory === "kids") {
      return productItem.isKids === true;
    } else {
      return productItem.category === selectedCategory;
    }
    // 일반적인 카테고리 (부츠, 러닝화 등)가 선택된 경우
  });

  // 최종적으로 화면에 표시할 신상품 목록 (예: 최대 12개)
  const productsToDisplay = filteredProducts.slice(0, 12);

  return (
    <section className="container mx-auto my-12 p-4">
      <h2 className="text-2xl font-bold mb-10">신상품</h2>
      <div className="flex justify-between items-center mb-6">
        <BestSellerCategoryFilter
          categories={categoryNewData} // NewArrivals 전용 카테고리 데이터 전달
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <Link
          to="/new-arrivals" // 신상품 전체를 볼 수 있는 페이지로 연결할 링크 경로
          className="shrink-0 inline-block text-gray-600 hover:text-blue-500 transition-colors duration-200"
        >
          더보기 &gt;
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

export default NewArrivals;
