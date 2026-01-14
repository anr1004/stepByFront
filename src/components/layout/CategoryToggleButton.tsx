// src/components/layout/CategoryToggleButton.tsx
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useCategoryDrawer } from "../../contexts/CategoryDrawerContext"; // Context 훅 임포트

const CategoryToggleButton: React.FC = () => {
  const { toggleCategoryDrawer } = useCategoryDrawer();

  return (
    <button
      onClick={toggleCategoryDrawer}
      className="fixed left-0 top-1/2 transform -translate-y-1/2
                 bg-blue-600 text-white p-3 rounded-r-lg shadow-lg z-30
                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      aria-label="카테고리 메뉴 열기/닫기"
    >
      <GiHamburgerMenu className="h-6 w-6" /> {/* 햄버거 아이콘 */}
    </button>
  );
};

export default CategoryToggleButton;
