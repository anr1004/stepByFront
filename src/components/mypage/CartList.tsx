// src/components/mypage/CartList.tsx
import React from "react";
import { useShop } from "../../contexts/ShopContext";
import { Link } from "react-router-dom";
import TrashIcon from "../../assets/icons/Trash.svg";
import { FaPlus, FaMinus } from "react-icons/fa6";

const CartList: React.FC = () => {
  const { cartItems, removeFromCart, updateCartQuantity, clearCart } =
    useShop();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600 mb-4">장바구니가 비어있습니다.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          쇼핑하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">🛒 장바구니</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center border rounded-lg p-4 bg-gray-50"
          >
            <Link to={`/products/${item.id}`} className="shrink-0">
              <img
                src={item.mainImageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
            </Link>
            <div className="ml-4 grow">
              <Link to={`/products/${item.id}`}>
                <h3 className="text-lg font-semibold hover:text-blue-600">
                  {item.name}
                </h3>
              </Link>
              <p className="text-gray-600">{item.brand}</p>
              <p className="text-lg font-bold text-blue-700 mt-1">
                {item.price.toLocaleString()}원
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                <FaMinus className="w-5 h-5" />
              </button>
              <span className="text-lg font-medium w-6 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <FaPlus className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
              aria-label="장바구니에서 삭제"
            >
              <img src={TrashIcon} alt="쓰레기통" className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center border-t mt-6 pt-4">
        <h3 className="text-xl font-bold">총 주문 금액:</h3>
        <p className="text-2xl font-extrabold text-blue-700">
          {totalAmount.toLocaleString()}원
        </p>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={clearCart}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          장바구니 비우기
        </button>
        <button
          // 실제 주문 페이지로 이동하는 로직 추가 필요
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          전체 상품 주문하기
        </button>
      </div>
    </div>
  );
};

export default CartList;
