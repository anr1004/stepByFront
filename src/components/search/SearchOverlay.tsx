// src/components/search/SearchOverlay.tsx
import React, { useState, useEffect, useRef } from "react";
import { useSearch } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import search from "../../assets/icons/Search.svg";
import close from "../../assets/icons/Close_square.svg";

// 인기 검색어 더미 데이터 (src/data/popularSearchTerms.ts에 정의 예정)
import popularSearchTerms from "../../data/popularSearchTerms";
import Icon from "../common/Icon";

const SearchOverlay: React.FC = () => {
  const {
    isSearchBarOpen,
    closeSearchBar,
    recentSearches,
    removeRecentSearch,
    clearRecentSearches,
    handleSearchSubmit,
  } = useSearch();

  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 오버레이가 열릴 때 input에 자동 포커스
  useEffect(() => {
    if (isSearchBarOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchBarOpen]);

  // ESC 키 눌렀을 때 오버레이 닫기
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSearchBar();
      }
    };
    if (isSearchBarOpen) {
      window.addEventListener("keydown", handleEsc);
    } else {
      window.removeEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isSearchBarOpen, closeSearchBar]);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchSubmit(searchTerm);
    setSearchTerm(""); // 검색 후 입력 필드 초기화
  };

  const handleRecentSearchClick = (term: string) => {
    handleSearchSubmit(term);
    setSearchTerm(term); // 클릭한 검색어로 input 채우기 (선택 사항)
  };

  const handlePopularSearchClick = (term: string) => {
    handleSearchSubmit(term);
    setSearchTerm(term); // 클릭한 검색어로 input 채우기 (선택 사항)
  };

  if (!isSearchBarOpen) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-white z-50 transform transition-transform duration-300
                  ${isSearchBarOpen ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto py-6 px-4">
        {/* 검색 입력 필드 영역 */}
        <div className="flex items-center justify-between border-b pb-4 mb-8">
          <form
            onSubmit={onFormSubmit}
            className="grow flex items-center bg-gray-100 rounded-full px-4 py-2"
          >
            <Icon src={search} className="w-6 h-6 mr-2"></Icon>
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
          <button
            onClick={closeSearchBar}
            className="ml-4 p-2 rounded-full hover:bg-gray-100"
            aria-label="닫기"
          >
            <Icon src={close} className="w-8 h-8"></Icon>
          </button>
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
                      onClick={() => handleRecentSearchClick(term)}
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
                      onClick={() => handlePopularSearchClick(term)}
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

export default SearchOverlay;
