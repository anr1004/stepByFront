// src/contexts/SearchContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";

interface SearchContextType {
  isSearchBarOpen: boolean; // 이름 변경
  toggleSearchBar: () => void; // 이름 변경
  closeSearchBar: () => void; // 이름 변경
  recentSearches: string[];
  addRecentSearch: (term: string) => void;
  removeRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
  handleSearchSubmit: (term: string) => void;
  searchResults: IProduct[]; // 검색 결과 상태
  searchError: string | null; // 검색 에러 상태
  currentSearchQuery: string; // 현재 검색어 상태
  performSearch: (query: string) => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch는 SearchProvider 내에서 사용되어야 합니다.");
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

const RECENT_SEARCHES_STORAGE_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 5; // 최근 검색어 최대 개수

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false); // 이름 변경
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const storedSearches = localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY);
      return storedSearches ? JSON.parse(storedSearches) : [];
    } catch (e) {
      console.error("Failed to load recent searches from localStorage", e);
      return [];
    }
  });

  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(
      RECENT_SEARCHES_STORAGE_KEY,
      JSON.stringify(recentSearches)
    );
  }, [recentSearches]);

  const toggleSearchBar = useCallback(() => {
    // useCallback 적용
    setIsSearchBarOpen((prev) => !prev);
  }, []);

  const closeSearchBar = useCallback(() => {
    // useCallback 적용
    setIsSearchBarOpen(false);
  }, []);

  const addRecentSearch = useCallback((term: string) => {
    // useCallback 적용
    if (!term.trim()) return;
    setRecentSearches((prevSearches) => {
      const newSearches = [
        term.trim(),
        ...prevSearches.filter(
          (s) => s.toLowerCase() !== term.trim().toLowerCase()
        ),
      ];
      return newSearches.slice(0, MAX_RECENT_SEARCHES);
    });
  }, []);

  const removeRecentSearch = useCallback((term: string) => {
    // useCallback 적용
    setRecentSearches((prevSearches) =>
      prevSearches.filter((s) => s.toLowerCase() !== term.toLowerCase())
    );
  }, []);

  const clearRecentSearches = useCallback(() => {
    // useCallback 적용
    setRecentSearches([]);
  }, []);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]); // 검색어 없으면 결과 초기화
      return;
    }
    setSearchError(null);
    setCurrentSearchQuery(query); // 현재 검색어 저장

    try {
      const response = await fetch(
        `http://localhost:8080/api/products/search?q=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: IProduct[] = await response.json();
      setSearchResults(data);
    } catch (error: any) {
      console.error("Error fetching search results:", error);
      setSearchResults([]); // 에러 발생 시 결과 초기화
    } finally {
    }
  }, []);

  const handleSearchSubmit = useCallback(
    (searchTerm: string) => {
      if (!searchTerm.trim()) return;

      addRecentSearch(searchTerm); // 최근 검색어에 추가
      setIsSearchBarOpen(false); // 검색창 닫기
      performSearch(searchTerm); // 실제 검색 API 호출
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`); // 검색 결과 페이지로 이동
    },
    [addRecentSearch, setIsSearchBarOpen, performSearch, navigate]
  );

  const searchContextValue = useMemo(
    () => ({
      isSearchBarOpen,
      toggleSearchBar,
      closeSearchBar,
      recentSearches,
      removeRecentSearch,
      clearRecentSearches,
      handleSearchSubmit,
      searchResults,
      searchError,
      currentSearchQuery,
      performSearch,
      addRecentSearch,
    }),
    [
      isSearchBarOpen,
      recentSearches,
      removeRecentSearch,
      clearRecentSearches,
      handleSearchSubmit,
      searchResults,
      searchError,
      currentSearchQuery,
      performSearch,
      addRecentSearch,
    ]
  );

  return (
    <SearchContext.Provider value={searchContextValue}>
      {children}
    </SearchContext.Provider>
  );
};
