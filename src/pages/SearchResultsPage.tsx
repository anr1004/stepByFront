import { useLocation } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import { useEffect } from "react";
import ProductCard from "../components/product/ProductCard";

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const { searchResults, currentSearchQuery, performSearch, closeSearchBar } =
    useSearch();

  useEffect(() => {
    closeSearchBar();

    const queryParams = new URLSearchParams(location.search);
    const queryFromUrl = queryParams.get("q") || "";

    if (queryFromUrl && queryFromUrl !== currentSearchQuery) {
      console.log(`URL 검색어 변경 감지: ${queryFromUrl}, 다시 검색 수행`);
      performSearch(queryFromUrl);
    }
  }, [location.search, currentSearchQuery, performSearch, closeSearchBar]);

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold mb-6">
        '{currentSearchQuery}'에 대한 검색 결과
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {searchResults.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
