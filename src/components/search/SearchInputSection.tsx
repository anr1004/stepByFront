// src/components/search/SearchInputSection.tsx
import React, { useState, useEffect, useRef } from "react";
import { useSearch } from "../../contexts/SearchContext";
import search from "../../assets/icons/Search.svg";
import close from "../../assets/icons/Close_square.svg";

// 인기 검색어 더미 데이터
import popularSearchTerms from "../../data/popularSearchTerms";
import Icon from "../common/Icon";

const SearchInputSection: React.FC = () => {
  const {
    isSearchBarOpen,
    recentSearches,
    removeRecentSearch,
    clearRecentSearches,
    handleSearchSubmit,
  } = useSearch();

  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // 검색창이 열릴 때 input에 자동 포커스
  useEffect(() => {
    if (isSearchBarOpen) {
      inputRef.current?.focus();
    } else {
      setSearchTerm(""); // 닫힐 때 검색어 초기화
    }
  }, [isSearchBarOpen]);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchSubmit(searchTerm);
    setSearchTerm(""); // 검색 후 입력 필드 초기화
  };

  const handleTermClick = (term: string) => {
    setSearchTerm(term); // 입력 필드에 검색어 채우기
    handleSearchSubmit(term); // 바로 검색 실행
  };

  return (
    <div
      className={`absolute w-full top-full left-0 bg-white shadow-lg border-b border-gray-200 z-20
                  transform transition-transform duration-300 ${
                    isSearchBarOpen ? "translate-y-0" : "-translate-y-full"
                  } `}
      style={{ visibility: isSearchBarOpen ? "visible" : "hidden" }}
    >
      <div className="container mx-auto py-6 px-4">
        {/* 검색 입력 필드 */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
          <form onSubmit={onFormSubmit} className="grow flex items-center">
            <input
              ref={inputRef}
              type="text"
              placeholder="검색어를 입력해주세요."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="grow bg-transparent focus:outline-none text-lg"
            />
            <button
              type="submit"
              className="ml-2 p-1 rounded-full text-gray-700 hover:bg-gray-200"
              aria-label="검색 제출"
            >
              <Icon src={search} className="w-6 h-6"></Icon>
            </button>
          </form>
          {/* 닫기 버튼은 Header에 있으니 여기서는 생략하거나 필요하면 추가 가능 */}
        </div>

        {/* 최근 검색어 및 인기 검색어 */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* 최근 검색어 */}
          <div className="w-full md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">최근 검색어</h3>
              <button
                onClick={clearRecentSearches}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                전체 삭제
              </button>
            </div>
            {recentSearches.length === 0 ? (
              <p className="text-gray-500">최근 검색 기록이 없습니다.</p>
            ) : (
              <ul className="space-y-2">
                {recentSearches.map((term, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-1"
                  >
                    <button
                      onClick={() => handleTermClick(term)}
                      className="text-lg text-gray-700 hover:text-blue-600 focus:outline-none"
                    >
                      {term}
                    </button>
                    <button
                      onClick={() => removeRecentSearch(term)}
                      className="text-gray-400 hover:text-red-500"
                      aria-label={`${term} 삭제`}
                    >
                      <Icon src={close} className="w-4 h-4"></Icon>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 인기 검색어 */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-bold mb-4">인기 검색어</h3>
            <ul className="space-y-2">
              {popularSearchTerms.length === 0 ? (
                <p className="text-gray-500">인기 검색어가 없습니다.</p>
              ) : (
                popularSearchTerms.map((term, index) => (
                  <li key={term} className="py-1">
                    <span className="inline-block w-6 text-lg font-bold text-blue-600 mr-2">
                      {index + 1}.
                    </span>
                    <button
                      onClick={() => handleTermClick(term)}
                      className="text-lg text-gray-700 hover:text-blue-600 focus:outline-none"
                    >
                      {term}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInputSection;
