import ProductListingPageTemplate from "../components/product/ProductListingPageTemplate";
import { bestPageCategoryData } from "../data/category";
import productData from "../data/product";

const NewPage: React.FC = () => {
  return (
    <ProductListingPageTemplate
      pageTitle="NEW 상품"
      baseProducts={productData}
      baseFilterPredicate={(product) => product.isNewArrival === true}
      categoryFilterData={bestPageCategoryData}
      productsPerPage={36}
    />
  );
};

export default NewPage;
