// src/contexts/CategoryDrawerContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";

// Context의 타입 정의
interface CategoryDrawerContextType {
  isCategoryDrawerOpen: boolean;
  toggleCategoryDrawer: () => void;
  closeCategoryDrawer: () => void;
}

// 기본값 설정 (Context 사용 전에는 이 값들이 사용되므로 실제 값으로 설정하기 어렵습니다.)
const CategoryDrawerContext = createContext<
  CategoryDrawerContextType | undefined
>(undefined);

// Context를 사용하기 위한 훅
export const useCategoryDrawer = () => {
  const context = useContext(CategoryDrawerContext);
  if (context === undefined) {
    throw new Error(
      "useCategoryDrawer는 CategoryDrawerProvider 내에서 사용되어야 합니다."
    );
  }
  return context;
};

// Context Provider 컴포넌트
interface CategoryDrawerProviderProps {
  children: ReactNode;
}

export const CategoryDrawerProvider: React.FC<CategoryDrawerProviderProps> = ({
  children,
}) => {
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

  const toggleCategoryDrawer = () => {
    setIsCategoryDrawerOpen((prev) => !prev);
  };

  const closeCategoryDrawer = () => {
    setIsCategoryDrawerOpen(false);
  };

  const value = {
    isCategoryDrawerOpen,
    toggleCategoryDrawer,
    closeCategoryDrawer,
  };

  return (
    <CategoryDrawerContext.Provider value={value}>
      {children}
    </CategoryDrawerContext.Provider>
  );
};
