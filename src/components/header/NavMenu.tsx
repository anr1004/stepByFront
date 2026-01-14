import { Link } from "react-router-dom";
import Icon from "../common/Icon";
import signIn from "../../assets/icons/User_alt.svg";
import favorite from "../../assets/icons/Favorite.svg";
import cart from "../../assets/icons/Basket_alt_3.svg";
import cs from "../../assets/icons/Headphones_fill.svg";
import Modal from "../common/Modal";
import AuthPage from "../../pages/AuthPage";
import { useState } from "react";
import search from "../../assets/icons/Search.svg";
import close from "../../assets/icons/Close_square.svg";
import { useSearch } from "../../contexts/SearchContext";
import { useAuth } from "../../contexts/AuthContext";

const NavMenu: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isSearchBarOpen, toggleSearchBar } = useSearch(); // toggleSearchBar 사용

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const isLoggedIn = useAuth();
  const isToken = localStorage.getItem("accessToken");

  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <button
            onClick={toggleSearchBar}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="검색"
          >
            {isSearchBarOpen ? (
              <Icon src={close} className="w-4 h-4" />
            ) : (
              <Icon src={search} className="w-6 h-6"></Icon> // 검색창 닫혀있을 때 돋보기 아이콘
            )}
          </button>
        </li>
        <li>
          {isLoggedIn && isToken ? (
            <Link to="/mypage">
              <Icon src={signIn} width={40} height={40}></Icon>
            </Link>
          ) : (
            <button onClick={() => setIsAuthModalOpen(true)}>
              <Icon src={signIn} width={40} height={40}></Icon>
            </button>
          )}
        </li>{" "}
        <li>
          <Link to="/cs">
            <Icon src={cs} width={40} height={40}></Icon>
          </Link>
        </li>{" "}
        <li>
          {isLoggedIn && isToken ? (
            <Link to="/mypage/wishlist">
              <Icon src={favorite} width={40} height={40}></Icon>
            </Link>
          ) : (
            <button onClick={() => setIsAuthModalOpen(true)}>
              <Icon src={favorite} width={40} height={40}></Icon>
            </button>
          )}
        </li>{" "}
        <li>
          {isLoggedIn && isToken ? (
            <Link to="/mypage/cart">
              <Icon src={cart} width={40} height={40}></Icon>
            </Link>
          ) : (
            <button onClick={() => setIsAuthModalOpen(true)}>
              <Icon src={cart} width={40} height={40}></Icon>
            </button>
          )}
        </li>
      </ul>

      <Modal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        title="계정 관리"
      >
        <AuthPage onAuthSuccess={handleAuthModalClose} />
      </Modal>
    </nav>
  );
};

export default NavMenu;
