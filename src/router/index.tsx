import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CustomerServicePage from "../pages/CustomerServicePage";
import {
  CategoryDrawerProvider,
  useCategoryDrawer,
} from "../contexts/CategoryDrawerContext";
import CategoryToggleButton from "../components/layout/CategoryToggleButton";
import CategoryDrawer from "../components/layout/CategoryDrawer";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { ShopProvider } from "../contexts/ShopContext";
import MyPage from "../pages/MyPage";
import BestPage from "../pages/BestPage";
import NewPage from "../pages/NewPage";
import KidsPage from "../pages/KidsPage";
import { SearchProvider } from "../contexts/SearchContext";
import { AuthProvider } from "../contexts/AuthContext";
import ProductDetailPage from "../pages/ProductDetailPage";
import SearchResultsPage from "../pages/SearchResultsPage";

const AppContent: React.FC = () => {
  const { isCategoryDrawerOpen, closeCategoryDrawer } = useCategoryDrawer();

  return (
    <div className="relative min-h-screen">
      {/* CategoryToggleButton은 이제 Context를 통해 상태를 제어합니다. */}
      <CategoryToggleButton />

      {/* CategoryDrawer도 Context를 통해 상태를 받습니다. */}
      <CategoryDrawer
        isOpen={isCategoryDrawerOpen}
        onClose={closeCategoryDrawer}
      />

      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/cs" element={<CustomerServicePage />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/best" element={<BestPage />} />
          <Route path="/newItem" element={<NewPage />} />
          <Route path="/kids" element={<KidsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          {/* 다른 라우트들 */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      {/* 앱 전체를 CategoryDrawerProvider로 감싸줍니다. */}
      <CategoryDrawerProvider>
        <AuthProvider>
          <ShopProvider>
            <SearchProvider>
              <AppContent />
            </SearchProvider>
          </ShopProvider>
        </AuthProvider>
      </CategoryDrawerProvider>
    </Router>
  );
};

export default App;
