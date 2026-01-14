import React from "react";
import { useShop } from "../../contexts/ShopContext";
import { Link } from "react-router-dom";
import TrashIcon from "../../assets/icons/Trash.svg";
import basket from "../../assets/icons/Basket_alt_3.svg"; // 아이콘

const WishList: React.FC = () => {
  const { wishlistItems, removeFromWishlist, moveItemToCart } = useShop();

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600 mb-4">좋아요한 물품이 없습니다.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          쇼핑하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">💛 좋아요 물품</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col border rounded-lg p-4 bg-gray-50 relative"
          >
            <Link to={`/products/${item.id}`} className="shrink-0">
              <img
                src={item.mainImageUrl}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md"
              />
            </Link>
            <div className="mt-3 grow">
              <Link to={`/products/${item.id}`}>
                <h3 className="text-lg font-semibold hover:text-blue-600">
                  {item.name}
                </h3>
              </Link>
              <p className="text-gray-600 mt-1">{item.brand}</p>
              <p className="text-xl font-bold text-blue-700 mt-2">
                {item.price.toLocaleString()}원
              </p>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => moveItemToCart(item.id)}
                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                aria-label="장바구니로 이동"
              >
                <img src={basket} alt="장바구니" className="w-5 h-5" />
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                aria-label="좋아요 취소"
              >
                <img src={TrashIcon} alt="쓰레기통" className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
