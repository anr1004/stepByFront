import React from "react";
import ProductListingPageTemplate from "../components/product/ProductListingPageTemplate"; // 템플릿 임포트
import { kidsPageCategoryData } from "../data/category"; // KidsPage 전용 카테고리 데이터 임포트
import productData from "../data/product"; // 모든 상품 데이터

const KidsPage: React.FC = () => {
  return (
    <ProductListingPageTemplate
      pageTitle="키즈 상품"
      baseProducts={productData}
      baseFilterPredicate={(product) => product.isKids === true}
      categoryFilterData={kidsPageCategoryData}
      productsPerPage={36}
    />
  );
};

export default KidsPage;
