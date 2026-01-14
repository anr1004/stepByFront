import { useState } from "react";
import ChevronLeftIcon from "../../assets/icons/Expand_left.svg";
import ChevronRightIcon from "../../assets/icons/Expand_right.svg";
import { Link } from "react-router-dom";
import ProductCard from "../product/ProductCard";

interface BrandCardProps {
  brand: IBrand;
  bestProductsOverview: IBrandProductOverview[];
}

const BrandCard: React.FC<BrandCardProps> = ({
  brand,
  bestProductsOverview,
}) => {
  const productsPreView = 3;
  const numProductGroups = Math.ceil(
    bestProductsOverview.length / productsPreView
  );

  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  const displayedProducts = bestProductsOverview.slice(
    currentGroupIndex * productsPreView,
    (currentGroupIndex + 1) * productsPreView
  );

  const goToNextGroup = () => {
    setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % numProductGroups);
  };

  const goToPrevGroup = () => {
    setCurrentGroupIndex(
      (prevIndex) => (prevIndex - 1 + numProductGroups) % numProductGroups
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      {/* 브랜드 로고 섹션 */}
      <div className="p-4 border-b border-gray-200 flex justify-center items-center h-20">
        <Link to={`/brand/${brand.id}`} className="block">
          <img
            src={brand.logoUrl}
            alt={`${brand.name} Logo`}
            className="max-h-full max-w-full object-contain"
          />
        </Link>
      </div>

      {/* 베스트 상품 슬라이더 섹션 */}
      <div className="relative grow p-4">
        {/* 화살표 버튼 (이전) */}
        {numProductGroups > 1 && ( // 상품 그룹이 1개 초과일 때만 화살표 표시
          <button
            onClick={goToPrevGroup}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-40 text-white rounded-r-lg hover:bg-opacity-60 transition z-10"
            aria-label="Previous products"
          >
            <img
              src={ChevronLeftIcon}
              alt="ChevronLeftIcon"
              className="h-5 w-5"
            />
          </button>
        )}

        {/* 3개의 상품 카드 */}
        <div className="grid grid-cols-3 gap-2">
          {" "}
          {/* 한 줄에 3개 상품 카드 */}
          {displayedProducts.map((product) => (
            // IBrandProductOverview를 IProduct 타입으로 변환하여 ProductCard에 전달 (필수값만)
            <ProductCard
              key={product.id}
              product={product as any} // TODO: 실제 ProductCard가 IProduct를 받으므로, IProduct 형태에 맞게 매핑 필요
            />
          ))}
        </div>

        {/* 화살표 버튼 (다음) */}
        {numProductGroups > 1 && ( // 상품 그룹이 1개 초과일 때만 화살표 표시
          <button
            onClick={goToNextGroup}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-40 text-white rounded-l-lg hover:bg-opacity-60 transition z-10"
            aria-label="Next products"
          >
            <img
              src={ChevronRightIcon}
              alt="ChevronRightIcon"
              className="h-5 w-5"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default BrandCard;
