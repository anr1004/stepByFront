// src/contexts/ShopContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";

interface ShopContextType {
  cartItems: ICartItem[];
  wishlistItems: IWishlistItem[];
  addToCart: (product: IProduct, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isProductInCart: (productId: string) => boolean;
  addToWishlist: (product: IProduct) => void;
  removeFromWishlist: (productId: string) => void;
  isProductInWishlist: (productId: string) => boolean;
  moveItemToCart: (productId: string, quantity?: number) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop는 ShopProvider 내에서 사용되어야 합니다.");
  }
  return context;
};

interface ShopProviderProps {
  children: ReactNode;
}

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem("shop_cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
      return [];
    }
  });

  const [wishlistItems, setWishlistItems] = useState<IWishlistItem[]>(() => {
    try {
      const storedWishlist = localStorage.getItem("shop_wishlist");
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (e) {
      console.error("Failed to parse wishlist from localStorage", e);
      return [];
    }
  });

  // localStorage에 변경사항 저장
  useEffect(() => {
    localStorage.setItem("shop_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("shop_wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // 장바구니 로직
  const addToCart = useCallback((product: IProduct, quantity: number) => {
    setCartItems((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingItemIndex > -1) {
        // 이미 장바구니에 있는 상품이면 수량만 업데이트
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // 새로운 상품이면 장바구니에 추가
        return [...prevCart, { ...product, quantity }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  }, []);

  const updateCartQuantity = useCallback(
    (productId: string, quantity: number) => {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        )
      );
    },
    []
  );

  const isProductInCart = useCallback(
    (productId: string) => {
      return cartItems.some((item) => item.id === productId);
    },
    [cartItems]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // 좋아요 로직
  const addToWishlist = useCallback((product: IProduct) => {
    setWishlistItems((prevItems) => {
      if (prevItems.some((item) => item.id === product.id)) {
        return prevItems; // 이미 있다면 추가 안 함
      }
      return [...prevItems, product]; // IProduct 타입을 그대로 저장
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }, []);

  const isProductInWishlist = useCallback(
    (productId: string) => {
      return wishlistItems.some((item) => item.id === productId);
    },
    [wishlistItems]
  );

  const moveItemToCart = useCallback(
    (productId: string, quantity: number = 1) => {
      // 위시리스트에서 상품 찾기
      const productToMove = wishlistItems.find((item) => item.id === productId);
      if (productToMove) {
        // 장바구니에 추가
        addToCart(productToMove, quantity);
        // 위시리스트에서 제거
        removeFromWishlist(productId);
      }
    },
    [wishlistItems, addToCart, removeFromWishlist]
  );

  const shopContextValue = useMemo(
    () => ({
      cartItems,
      wishlistItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      isProductInCart,
      addToWishlist,
      removeFromWishlist,
      isProductInWishlist,
      moveItemToCart,
    }),
    [
      cartItems,
      wishlistItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      isProductInCart,
      addToWishlist,
      removeFromWishlist,
      isProductInWishlist,
      moveItemToCart,
    ]
  );

  return (
    <ShopContext.Provider value={shopContextValue}>
      {children}
    </ShopContext.Provider>
  );
};
