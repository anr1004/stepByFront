import { Link } from "react-router-dom";
import HeartIcon from "../../assets/icons/Favorite.svg";
import HeartIconFill from "../../assets/icons/Favorite_fill.svg";
import basket from "../../assets/icons/Basket_alt_3.svg";
import basketFill from "../../assets/icons/Basket_alt_3_fill.svg";
import { useShop } from "../../contexts/ShopContext";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountRate = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  const {
    addToCart,
    addToWishlist,
    removeFromCart,
    removeFromWishlist,
    isProductInWishlist,
    isProductInCart,
  } = useShop();
  const isInWishlist = isProductInWishlist(product.id);
  const isInCart = isProductInCart(product.id);

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleToggleCart = () => {
    // <<<--- 함수 이름을 명확하게 변경 (addToCart -> handleToggleCart)
    if (isInCart) {
      removeFromCart(product.id); // 장바구니에 있다면 제거
      alert(`${product.name}이(가) 장바구니에서 제거되었습니다.`);
    } else {
      addToCart(product, 1); // 장바구니에 없다면 추가
      alert(`${product.name}이(가) 장바구니에 담겼습니다.`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      <Link to={`/products/${product.id}`}>
        {/* 상품 상세 페이지 링크 */}
        <img
          src={product.mainImageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          <Link to={`/products/${product.id}`} className="hover:text-blue-600">
            {product.name}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mt-1">{product.brand}</p>{" "}
        {/* 브랜드 표시 (옵션) */}
        <p className="text-xl font-bold text-blue-700 mt-2">
          {product.price.toLocaleString()}원
        </p>
        {discountRate && (
          <span className="text-sm text-red-500 ml-2">
            {discountRate}% 할인
          </span>
        )}
      </div>
      <div className="absolute top-2 right-2 flex space-x-1">
        {/* 좋아요 버튼 */}
        <button
          onClick={handleToggleWishlist}
          className={`p-2 rounded-full ${
            isInWishlist ? "bg-white text-white" : "bg-white text-gray-700"
          }
                      shadow-md hover:scale-105 transition-transform duration-150`}
          aria-label={isInWishlist ? "좋아요 취소" : "좋아요"}
        >
          {isInWishlist ? (
            <img src={HeartIconFill} alt="좋아요" className="w-5 h-5" />
          ) : (
            <img src={HeartIcon} alt="좋아요" className="w-5 h-5" />
          )}
        </button>
        {/* 장바구니 버튼 */}
        <button
          onClick={handleToggleCart} // <<<--- 수정된 함수 이름 사용
          className={`p-2 rounded-full ${
            isInCart ? "bg-white text-white" : "bg-white text-gray-700"
          } shadow-md hover:scale-105 transition-transform duration-150`}
          aria-label={isInCart ? "장바구니에서 제거" : "장바구니에 추가"} // <<<--- aria-label도 변경
        >
          {isInCart ? (
            <img src={basketFill} alt="장바구니에 있음" className="w-5 h-5" />
          ) : (
            <img src={basket} alt="장바구니에 추가" className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
