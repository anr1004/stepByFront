import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import productData from "../data/product"; // 모든 상품 데이터
import StarRating from "../components/common/StarRating"; // 별점 컴포넌트 임포트
import { useShop } from "../contexts/ShopContext"; // 장바구니 기능을 위해
import { useAuth } from "../contexts/AuthContext"; // 로그인 여부 확인을 위해

// 아이콘
import cart from "../assets/icons/Basket_alt_3.svg";
import card from "../assets/icons/Credit card.svg";
import Icon from "../components/common/Icon";

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useShop();
  const { isLoggedIn } = useAuth();

  // 모든 useState 호출
  const [product, setProduct] = useState<IProduct | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [displayQuantity, setDisplayQuantity] = useState<string>("1");
  const [activeTab, setActiveTab] = useState<
    "info" | "review" | "qna" | "delivery"
  >("info");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 상품 데이터 로드 및 초기 옵션 설정 useEffect
  useEffect(() => {
    // async 함수의 이름을 fetchProduct로 변경하여 혼동 방지
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${productId}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            navigate("/404");
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const productDataFromApi: IProduct = await response.json();

        setProduct(productDataFromApi);
        setMainImage(productDataFromApi.mainImageUrl);

        // 초기 색상/사이즈 선택
        if (productDataFromApi.colors && productDataFromApi.colors.length > 0) {
          setSelectedColor(productDataFromApi.colors[0]);
        } else {
          setSelectedColor(null);
        }

        if (
          productDataFromApi.availableSizes &&
          productDataFromApi.availableSizes.length > 0
        ) {
          setSelectedSize(productDataFromApi.availableSizes[0]);
        } else {
          setSelectedSize(null);
        }
      } catch (e: unknown) {
        console.error("Failed to fetch product: ", e);
        let errorMessage = "알 수 없는 오류가 발생했습니다.";
        if (e instanceof Error) {
          // e가 Error 인스턴스인 경우 message 속성 접근
          errorMessage = e.message;
        } else if (typeof e === "string") {
          // 혹시 문자열 에러일 경우를 대비
          errorMessage = e;
        }
        setError(`상품 정보를 불러오는 데 실패했습니다. : ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId, navigate]); // 의존성 배열에 product가 있으면 무한 루프가 돌 수 있으니 제거

  // 재고 상태 변경 시 displayQuantity 상태 동기화
  useEffect(() => {
    setDisplayQuantity(quantity.toString());
  }, [quantity]);

  // 선택된 색상과 사이즈에 따라 재고 및 수량 조절 (이 로직은 product 상태에 따라 실행되어야 함)
  useEffect(() => {
    // product가 로드된 이후에만 실행
    if (!product) return;

    if (selectedColor && selectedSize) {
      const variant = product.variants.find(
        (v) => v.color === selectedColor && v.size === selectedSize
      );
      if (variant) {
        const currentVariantStock = variant.stockQuantity;

        // 현재 수량이 재고보다 많으면 재고 수량으로 자동 조절 (최소 1)
        if (quantity > currentVariantStock) {
          setQuantity(Math.max(1, currentVariantStock));
        }
        // 만약 재고가 0이 되었는데 현재 수량이 1 이상이라면 0으로 조절 (품절)
        if (currentVariantStock === 0 && quantity > 0) {
          setQuantity(0);
        }
      } else {
        // 선택된 색상/사이즈 조합에 해당하는 variant가 없는 경우 (재고 없음, 또는 잘못된 조합)
        // 수량을 0으로 설정하여 구매 불가 상태를 명확히 함.
        setQuantity(0);
      }
    } else {
      // 색상이나 사이즈가 선택되지 않은 경우:
      // 이미 선택된 옵션이 없는 상태에서 수량이 0이면 1로 설정하여 UI를 깨끗하게 함.
      // 그러나 이 로직은 옵션이 선택되었을 때의 재고 조정과 직접적인 관련은 없으니,
      // 옵션이 선택되기 전의 기본 동작은 이 useEffect의 주 목적이 아닐 수 있습니다.
      // 일단 `quantity`를 건드리지 않거나, 선택된 옵션이 없음을 알리는 메시지로 대체할 수도 있습니다.
      // (현재는 사용자 코드에 따라 `setQuantity(1)`)
      // 예: 만약 옵션이 선택되지 않았다면 수량을 기본 1로 유지 (또는 0으로 초기화)
      if (quantity === 0 && product.variants.length > 0) {
        // product.variants가 있을 때만 1로 설정
        setQuantity(1);
      }
    }
  }, [selectedColor, selectedSize, product, quantity]); // 의존성 배열에 quantity 추가

  if (loading) {
    // 로딩 중일 때 표시
    return (
      <div className="container mx-auto my-12 text-center text-xl">
        상품 정보를 불러오는 중...
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mt-4"></div>
      </div>
    );
  }

  if (error) {
    // 에러 발생 시 표시
    return (
      <div className="container mx-auto my-12 text-center text-xl text-red-600">
        오류 발생: {error}
        <button
          onClick={() => navigate("/")}
          className="block mx-auto mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  if (!product) {
    //로딩이 끝났는데 상품이 없는 경우
    return (
      <div className="container mx-auto my-12 text-center text-xl">
        상품 정보를 찾을 수 없습니다.
      </div>
    );
  }

  // 선택된 옵션에 따른 현재 가격 및 재고 계산
  const currentPrice = product.discountPrice || product.price;
  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );
  const availableStock = selectedVariant?.stockQuantity || 0;

  // 총 금액 계산
  const totalAmount = currentPrice * quantity;

  // 선택된 색상에 따라 사용 가능한 사이즈 필터링
  const getAvailableSizesForColor = (color: string): number[] => {
    const sizes = new Set<number>();
    product.variants.forEach((variant) => {
      if (variant.color === color && variant.stockQuantity > 0) {
        sizes.add(variant.size);
      }
    });
    return Array.from(sizes).sort((a, b) => a - b);
  };

  // 장바구니에 추가 핸들러
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("장바구니는 로그인 후 이용 가능합니다.");
      navigate("/auth");
      return;
    }
    // 여기에 !selectedVariant 조건이 추가되어야 합니다.
    if (!selectedColor || !selectedSize || quantity <= 0 || !selectedVariant) {
      alert("색상, 사이즈, 수량을 모두 선택해주세요.");
      return;
    }
    if (quantity > availableStock) {
      alert(`재고가 부족합니다. 현재 재고: ${availableStock}개`);
      return;
    }

    // 장바구니에 추가할 ICartItem 객체를 정확하게 구성
    const itemToAdd: ICartItem = {
      ...product!, // product가 null이 아님이 보장되므로 `!` (non-null assertion) 사용
      selectedColor: selectedColor,
      selectedSize: selectedSize,
      selectedVariantId: selectedVariant.id, // selectedVariant가 있으므로 안전하게 .id 접근
      quantity: quantity, // ICartItem 안에 quantity 포함
    };

    // addToCart에 ICartItem 객체 하나만 전달
    addToCart(itemToAdd); // <<<--- 이렇게 한 개의 인자로 호출합니다.

    alert(
      `${
        product!.name
      } (${selectedColor}, ${selectedSize}) ${quantity}개가 장바구니에 담겼습니다.`
    );
  };

  // 구매하기 핸들러
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert("로그인 후 구매할 수 있습니다.");
      navigate("/auth");
      return;
    }
    if (
      !selectedColor ||
      !selectedSize ||
      quantity === 0 ||
      availableStock === 0
    ) {
      alert("색상, 사이즈, 수량을 모두 선택해주세요.");
      return;
    }
    if (quantity > availableStock) {
      alert(`재고가 부족합니다. 현재 재고: ${availableStock}개`);
      return;
    }
    alert(
      `${product.name} (${selectedColor}, ${selectedSize}) ${quantity}개 구매 요청 완료!`
    );
    // 실제로는 결제 페이지로 이동하거나 결제 로직 호출
  };

  return (
    <div className="container mx-auto my-12 p-4">
      {/* 상단 큰 틀 */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* 왼쪽 영역: 이미지 갤러리 */}
        <div className="w-full lg:w-1/2">
          <div className="mb-4 relative overflow-hidden rounded-lg shadow-lg">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-auto object-cover max-h-125"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {product.imageUrls.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`썸네일 ${index + 1}`}
                className={`w-20 h-20 object-cover border-2 cursor-pointer rounded-md ${
                  mainImage === imgUrl ? "border-blue-600" : "border-gray-200"
                }`}
                onClick={() => setMainImage(imgUrl)}
              />
            ))}
          </div>
        </div>

        {/* 오른쪽 영역: 정보 및 구매 옵션 */}
        <div className="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-sm text-gray-500 font-semibold mb-2">
              {product.brand}
            </h2>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>
            <div className="flex items-center mb-5">
              <StarRating
                rating={product.averageRating}
                reviewCount={product.reviewCount}
              />
              <Link
                to="#reviews"
                className="ml-4 text-blue-600 hover:underline text-sm"
              >
                ({product.reviewCount} 리뷰 보기)
              </Link>
            </div>

            <div className="mb-6 border-t pt-4">
              {product.discountPrice ? (
                <div className="flex items-baseline mb-2">
                  <span className="text-xl text-gray-500 line-through mr-2">
                    {product.price.toLocaleString()}원
                  </span>
                  <span className="text-3xl font-bold text-red-600">
                    {product.discountPrice.toLocaleString()}원
                  </span>
                  <span className="ml-3 text-red-500 text-lg">
                    {Math.round(
                      ((product.price - product.discountPrice) /
                        product.price) *
                        100
                    )}
                    % 할인
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {product.price.toLocaleString()}원
                </span>
              )}
              <p className="text-sm text-gray-600 mt-2">
                배송비: 3,000원 (50,000원 이상 구매 시 무료)
              </p>
            </div>

            {/* 컬러 선택 */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">색상 선택:</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`px-4 py-2 border rounded-md text-sm transition-all duration-200
                      ${
                        selectedColor === color
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    onClick={() => setSelectedColor(color)}
                    disabled={getAvailableSizesForColor(color).length === 0} // 해당 색상에 재고 있는 사이즈가 없으면 비활성화
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* 사이즈 선택 */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">사이즈 선택:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedColor ? (
                  getAvailableSizesForColor(selectedColor).map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md text-sm transition-all duration-200
                        ${
                          selectedSize === size
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      onClick={() => setSelectedSize(size)}
                      disabled={
                        !product.variants.some(
                          (v) =>
                            v.color === selectedColor &&
                            v.size === size &&
                            v.stockQuantity > 0
                        )
                      } // 해당 컬러-사이즈 재고 없으면 비활성화
                    >
                      {size}
                    </button>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">
                    색상을 먼저 선택해주세요.
                  </span>
                )}
              </div>
            </div>

            {/* 수량 선택 */}
            <div className="mb-6 flex items-center">
              <h3 className="font-semibold mr-4">수량:</h3>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() =>
                    setQuantity((prev) => Math.max(1, prev - 1) as number)
                  }
                  className="px-3 py-1 text-lg"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  // input의 value는 항상 number 타입으로 전달
                  value={displayQuantity}
                  onChange={(e) => {
                    const valueStr = e.target.value; // onChange 이벤트의 값은 항상 string
                    setDisplayQuantity(valueStr);

                    const parsedNum = Number(valueStr);
                    if (!isNaN(parsedNum) && parsedNum >= 0) {
                      setQuantity(
                        Math.min(
                          Math.max(0, parsedNum),
                          availableStock
                        ) as number
                      );
                    } else if (valueStr === "") {
                      setQuantity(0 as number); // 빈 문자열인 경우 quantity를 0으로
                    }
                    // 유효하지 않은 입력은 quantity를 변경하지 않음 (이전 상태 유지)
                  }}
                  onBlur={() => {
                    // 포커스가 벗어났을 때 quantity 상태 최종 확정 및 유효성 검사
                    let finalQuantity = quantity;
                    if (isNaN(finalQuantity) || finalQuantity < 1) {
                      // NaN이거나 1 미만이면
                      finalQuantity = 1;
                    }
                    if (finalQuantity > availableStock) {
                      // 재고보다 많으면
                      finalQuantity = availableStock;
                    }
                    setQuantity(finalQuantity); // 최종 확정된 quantity로 업데이트
                    setDisplayQuantity(finalQuantity.toString()); // displayQuantity도 동기화
                  }}
                  className="w-16 text-center border-x border-gray-300 text-lg focus:outline-none"
                  min="1"
                  max={availableStock > 0 ? availableStock : 1}
                  disabled={availableStock === 0}
                />
                <button
                  onClick={() =>
                    setQuantity(
                      (prev) => Math.min(prev + 1, availableStock) as number
                    )
                  }
                  className="px-3 py-1 text-lg"
                  disabled={quantity >= availableStock}
                >
                  +
                </button>
              </div>
              {availableStock <= 5 && availableStock > 0 && (
                <span className="ml-3 text-sm text-red-500">
                  재고: {availableStock}개 남음!
                </span>
              )}
              {availableStock === -1 && (
                <span className="ml-3 text-sm text-red-500">일시품절</span>
              )}
            </div>

            {/* 총 금액 */}
            <div className="mb-6 border-t pt-4 flex justify-between items-center">
              <span className="text-xl font-bold">총 상품 금액:</span>
              <span className="text-3xl font-bold text-blue-600">
                {totalAmount.toLocaleString()}원
              </span>
            </div>

            {/* 장바구니 및 구매 버튼 */}
            <div className="flex space-x-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-md text-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
                disabled={
                  availableStock === 0 ||
                  quantity === 0 ||
                  !selectedColor ||
                  !selectedSize
                }
              >
                <Icon src={cart} className="w-5 h-5 mr-2"></Icon>
                장바구니
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                disabled={
                  availableStock === 0 ||
                  quantity === 0 ||
                  !selectedColor ||
                  !selectedSize
                }
              >
                <Icon src={card} className="w-5 h-5 mr-2"></Icon>
                바로 구매
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 영역: 상품 정보, 리뷰 등 탭 */}
      <div className="border-t pt-12">
        <div className="flex border-b border-gray-300 mb-6">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === "info"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            상품 정보
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === "review"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            상품 리뷰
          </button>
          <button
            onClick={() => setActiveTab("qna")}
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === "qna"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            상품 문의
          </button>
          <button
            onClick={() => setActiveTab("delivery")}
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === "delivery"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            주문/배송
          </button>
        </div>

        <div className="py-6">
          {activeTab === "info" && (
            <div>
              <h3 className="text-2xl font-bold mb-4">상품 상세 정보</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {product.details || product.description}
              </p>
            </div>
          )}
          {activeTab === "review" && (
            <div>
              <h3 className="text-2xl font-bold mb-4">상품 리뷰</h3>
              <p className="text-gray-700">
                리뷰 목록이 여기에 표시됩니다. (현재 {product.reviewCount}개)
              </p>
              {/* 실제로는 리뷰 컴포넌트를 가져와서 렌더링 */}
            </div>
          )}
          {activeTab === "qna" && (
            <div>
              <h3 className="text-2xl font-bold mb-4">상품 문의</h3>
              <p className="text-gray-700">
                궁금한 점이 있으시면 문의해주세요.
              </p>
              {/* 실제로는 Q&A 컴포넌트를 가져와서 렌더링 */}
            </div>
          )}
          {activeTab === "delivery" && (
            <div>
              <h3 className="text-2xl font-bold mb-4">주문/배송 안내</h3>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold">배송 방법:</span> 택배
                <br />
                <span className="font-semibold">배송 지역:</span> 전국 (일부
                도서산간 지역 제외)
                <br />
                <span className="font-semibold">배송 비용:</span> 3,000원
                (50,000원 이상 구매 시 무료)
                <br />
                <span className="font-semibold">배송 기간:</span> 결제 완료 후
                2~3일 이내 (영업일 기준)
                <br />
                <span className="font-semibold">교환/반품 안내:</span> 상품 수령
                후 7일 이내에 고객센터로 문의. 고객 변심 시 왕복 배송비 발생.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
