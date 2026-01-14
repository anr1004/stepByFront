// 상품 데이터 타입 정의
interface IProduct {
  id: string; // 상품 고유 ID
  name: string; // 상품명
  brand: string; // 브랜드
  price: number; // 원가 또는 정상 판매가
  discountPrice?: number; // 할인 판매가
  details: string; // 상품 정보 탭에 들어갈 상세 설명
  category: "sneakers" | "sports" | "boots" | "sandles" | "shoes" | "kids";
  gender: "men" | "women" | "unisex" | string; // 성별
  description: string; // 상세설명
  mainImageUrl: string; // 대표 이미지
  imageUrls: string[]; // 추가 이미지 URL 목록
  materials: string[]; // 소재
  colors: string[]; // 판매되는 색상 목록
  availableSizes?: number[]; // 상품이 가질 수 있는 모든 사이즈 목록
  averageRating: number; // 평균 별점
  reviewCount: number; // 리뷰 개수
  isBestSeller?: boolean; // 베스트셀러 여부
  isNewArrival?: boolean; // 신상품 여부
  isKids?: boolean;
  createdAt: string; // 상품 등록일
  updatedAt: string; // 마지막 수정일

  variants: IProductVariant[]; // 사이즈와 색상별 재고 및 상세 정보를 위한 변형 정보
}

// 사이즈 색상별 재고 및 상세 정보
interface IProductVariant {
  id: string; // 변형 상품 고유 ID
  color: string; // 색상
  size: number; // 사이즈
  stockQuantity: number; // 해당 색상/사이즈 조합의 재고 수량
}

// 장바구니 아이템을 위한 인터페이스
interface ICartItem extends IProduct {
  quantity: number;
}

// 위시리스트 아이템을 위한 인터페이스
interface IWishlistItem extends IProduct {}

interface ICategory {
  name: string;
  filter: string;
}

interface INewCategory {
  name: string;
  filter: string;
}
