import { useEffect, useState } from "react";
import BestSellerCategoryFilter from "../home/BestSellerCategoryFilter";
import ProductCard from "./ProductCard";
import Pagination from "../common/Pagination";

interface ProductListingPageTemplateProps {
  pageTitle: string; // 페이지 제목 (예: "BEST 상품", "NEW 상품")
  baseProducts: IProduct[]; // 모든 상품 데이터 (또는 페이지에 필요한 전체 상품)
  baseFilterPredicate: (product: IProduct) => boolean; // isBestSeller 또는 isNewArrival 등 기본 필터링 함수
  categoryFilterData: ICategory[]; // 이 페이지에서 사용할 카테고리 필터 데이터
  productsPerPage: number; // 한 페이지에 보여줄 상품 개수
}

const ProductListingPageTemplate: React.FC<ProductListingPageTemplateProps> = ({
  pageTitle,
  baseProducts,
  baseFilterPredicate,
  categoryFilterData,
  productsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFilterData.length > 0 ? categoryFilterData[0].filter : "all"
  );

  // 1단계 필터링: baseProducts에서 기본 조건(isBestSeller, isNewArrival 등)에 맞는 상품만 필터링
  const initiallyFilteredProducts = baseProducts.filter(baseFilterPredicate);

  // 2단계 필터링: 선택된 카테고리에 따라 추가 필터링
  const categorizedProducts = initiallyFilteredProducts.filter(
    (productItem) => {
      if (selectedCategory === "all") {
        return true;
      }
      // "베스트" 필터 (newArrivals 페이지에서만 해당될 수 있음)
      // 여기서는 일반적인 카테고리 필터링만 다룹니다. 필요한 경우 selectedCategory 값에 따라 추가 로직을 넣으세요.
      return productItem.category === selectedCategory;
    }
  );

  // 페이지네이션을 위한 총 페이지 수 계산
  const totalPages = Math.ceil(categorizedProducts.length / productsPerPage);

  // 현재 페이지에 해당하는 상품들만 잘라내기
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categorizedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // 카테고리 변경 시 항상 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 페이지 변경 시 스크롤을 맨 위로
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <h1 className="text-3xl font-bold mb-8">{pageTitle}</h1>

      <div className="flex justify-between items-center mb-6">
        <BestSellerCategoryFilter
          categories={categoryFilterData}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        {/* 이 템플릿 컴포넌트 자체는 '더보기' 링크를 가지지 않습니다. */}
      </div>

      {currentProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-lg">
          선택된 카테고리에 해당하는 상품이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductListingPageTemplate;
