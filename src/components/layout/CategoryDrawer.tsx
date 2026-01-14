// src/components/layout/CategoryDrawer.tsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import categoryMenuData from "../../data/categoryMenuData";

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryDrawer: React.FC<CategoryDrawerProps> = ({ isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  const [activeMainCategoryId, setActiveMainCategoryId] = useState<
    string | null
  >(categoryMenuData.length > 0 ? categoryMenuData[0].id : null);

  const activeMainCategory = categoryMenuData.find(
    (cat) => cat.id === activeMainCategoryId
  );

  // 모바일에서 드로어를 닫을 때 스크롤 잠금/해제
  // (드로어가 열렸을 때 배경 페이지 스크롤 방지 기능은 유지하는 것이 좋습니다.)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ESC 키 눌렀을 때 드로어 닫기 (유지)
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    } else {
      window.removeEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // 이제 오버레이가 클릭 이벤트를 통과시키므로, handleOverlayClick 함수는 사용되지 않습니다.
  // 이 함수는 제거하거나 주석 처리해도 무방합니다.
  // const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
  //     onClose();
  //   }
  // };

  // 링크 클릭 시 드로어 닫기 (유지)
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div
          // 배경색 관련 클래스 제거 (bg-black bg-opacity-50)
          // pointer-events-none을 추가하여 아래에 있는 콘텐츠 클릭 가능하게 함
          className="fixed inset-0 z-40 transition-opacity duration-300 pointer-events-none"
          // 오버레이가 클릭 이벤트를 전달하므로, 이 onClick 핸들러는 작동하지 않습니다.
          // 따라서 제거하는 것이 더 좋습니다.
          // onClick={handleOverlayClick}
        ></div>
      )}

      {/* 드로어 본체 */}
      <div
        ref={drawerRef}
        // 드로어 본체는 클릭 가능해야 하므로 pointer-events-none을 추가하지 않습니다.
        className={`fixed top-0 left-0 h-full w-full max-w-lg bg-white shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* 드로어 헤더 */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">카테고리</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* 카테고리 내용: 왼쪽(메인)과 오른쪽(서브) 패널 */}
        <div className="flex h-[calc(100%-65px)]">
          {" "}
          {/* 헤더 높이만큼 빼서 콘텐츠가 스크롤되도록 */}
          {/* 왼쪽 패널: 메인 카테고리 (main-title) */}
          <div className="w-1/3 border-r bg-gray-50 overflow-y-auto">
            <ul>
              {categoryMenuData.map((mainCat) => (
                <li
                  key={mainCat.id}
                  onMouseEnter={() => setActiveMainCategoryId(mainCat.id)}
                  className={`py-3 px-4 cursor-pointer text-base font-semibold
                    ${
                      activeMainCategoryId === mainCat.id
                        ? "bg-white text-blue-600 border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <Link
                    to={mainCat.link}
                    onClick={handleLinkClick}
                    className="block"
                  >
                    {mainCat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* 오른쪽 패널: 서브 카테고리 (sub-title) 및 내용 */}
          <div className="w-2/3 p-4 overflow-y-auto">
            {activeMainCategory ? (
              activeMainCategory.subCategories &&
              activeMainCategory.subCategories.length > 0 ? (
                <div className="space-y-6">
                  {activeMainCategory.subCategories.map((subCat) => (
                    <div key={subCat.id}>
                      <h3 className="text-lg font-bold text-gray-800 mb-2 pb-1 border-b">
                        <Link
                          to={subCat.items[0]?.link || activeMainCategory.link}
                          onClick={handleLinkClick}
                          className="hover:text-blue-600"
                        >
                          {subCat.name}
                        </Link>
                      </h3>
                      <ul className="grid grid-cols-2 gap-2 text-sm">
                        {subCat.items.map((item) => (
                          <li key={item.id}>
                            <Link
                              to={item.link}
                              onClick={handleLinkClick}
                              className="block text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <p className="mb-4">
                    선택된 '{activeMainCategory.name}' 카테고리에 상세 분류가
                    없습니다.
                  </p>
                  <Link
                    to={activeMainCategory.link}
                    onClick={handleLinkClick}
                    className="text-blue-600 hover:underline"
                  >
                    '{activeMainCategory.name}' 전체 보기
                  </Link>
                </div>
              )
            ) : (
              <div className="p-4 text-center text-gray-500">
                카테고리를 선택해주세요.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryDrawer;
