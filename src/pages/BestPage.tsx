import { bestPageCategoryData } from "../data/category"; // BestPage 전용 카테고리 데이터 임포트
import productData from "../data/product"; // 모든 상품 데이터 임포트 (IProduct도 이 파일 또는 types/product에서 임포트 가정)
import ProductListingPageTemplate from "../components/product/ProductListingPageTemplate";

const BestPage: React.FC = () => {
  return (
    <ProductListingPageTemplate
      pageTitle="BEST 상품"
      baseProducts={productData}
      baseFilterPredicate={(product) => product.isBestSeller === true} // 베스트셀러 필터
      categoryFilterData={bestPageCategoryData} // BestPage 전용 카테고리 필터 데이터
      productsPerPage={36} // 한 페이지에 36개 상품
    />
  );
};

export default BestPage;
