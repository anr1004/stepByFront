// src/pages/MyPage.tsx
import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import WishList from "../components/mypage/WishList";
import CartList from "../components/mypage/CartList";
import Info from "../components/mypage/Info";
import { useAuth } from "../contexts/AuthContext";

const MyPage: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("wishlist"); // 현재 활성화된 탭 상태
  const { logout } = useAuth();

  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes("/mypage/wishlist")) {
      setActiveTab("wishlist");
    } else if (path.includes("/mypage/cart")) {
      setActiveTab("cart");
    } else if (path.includes("/mypage/orders")) {
      setActiveTab("orders");
    } else if (path.includes("/mypage/info")) {
      setActiveTab("info");
    } else {
      setActiveTab("wishlist"); // 기본값
    }
  }, [location.pathname]);

  return (
    <div className="container mx-auto my-12 p-4">
      <h1 className="text-3xl font-bold mb-8">마이페이지</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 사이드바 메뉴 */}
        <nav className="w-full md:w-64 shrink-0">
          <ul className="bg-white shadow-md rounded-lg p-4 space-y-2">
            <li>
              <Link
                to="/mypage/wishlist"
                onClick={() => setActiveTab("wishlist")}
                className={`block py-2 px-3 rounded-md transition-colors duration-200 ${
                  activeTab === "wishlist"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                💛 좋아요 물품
              </Link>
            </li>
            <li>
              <Link
                to="/mypage/cart"
                onClick={() => setActiveTab("cart")}
                className={`block py-2 px-3 rounded-md transition-colors duration-200 ${
                  activeTab === "cart"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                🛒 장바구니
              </Link>
            </li>
            <li>
              <Link
                to="/mypage/orders"
                onClick={() => setActiveTab("orders")}
                className={`block py-2 px-3 rounded-md transition-colors duration-200 ${
                  activeTab === "orders"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                📦 주문/배송 조회
              </Link>
            </li>
            <li>
              <Link
                to="/mypage/info"
                onClick={() => setActiveTab("info")}
                className={`block py-2 px-3 rounded-md transition-colors duration-200 ${
                  activeTab === "info"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                👤 개인 정보 수정
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="w-full text-left py-2 px-3 rounded-md transition-colors duration-200  hover:text-white hover:bg-red-600" // Tailwind CSS 스타일
              >
                🚪 로그아웃
              </button>
            </li>
            {/* 추가 메뉴 아이템들 */}
          </ul>
        </nav>

        {/* 콘텐츠 영역 */}
        <div className="grow bg-white shadow-md rounded-lg p-6">
          <Routes>
            <Route path="wishlist" element={<WishList />} />
            <Route path="cart" element={<CartList />} />
            <Route path="info" element={<Info />} />
            <Route path="/" element={<WishList />} /> {/* 기본 라우트 */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
