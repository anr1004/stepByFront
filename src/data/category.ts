export const categoryData: ICategory[] = [
  { name: "전체", filter: "all" },
  { name: "NEW", filter: "new" }, // BestSeller 컴포넌트에서 'new'가 무엇을 의미하는지 정의 필요
  { name: "부츠", filter: "boots" },
  { name: "러닝화", filter: "sports" },
  { name: "스니커즈", filter: "sneakers" },
  { name: "키즈", filter: "kids" },
];

// NewArrivals 컴포넌트에서 사용할 데이터 (best 필터 포함)
export const categoryNewData: ICategory[] = [
  { name: "전체", filter: "all" },
  { name: "베스트", filter: "best" }, // 신상품 중 베스트를 의미
  { name: "부츠", filter: "boots" },
  { name: "러닝화", filter: "sports" },
  { name: "스니커즈", filter: "sneakers" },
  { name: "키즈", filter: "kids" },
];

export const bestPageCategoryData: ICategory[] = [
  { name: "전체", filter: "all" },
  { name: "스니커즈", filter: "sneakers" },
  { name: "스포츠", filter: "sports" },
  { name: "부츠", filter: "boots" },
  { name: "샌들/슬리퍼", filter: "sandals_slippers" },
  { name: "구두", filter: "dress_shoes" },
  { name: "키즈", filter: "kids" },
];

export const kidsPageCategoryData: ICategory[] = [
  { name: "전체", filter: "all" }, // 키즈 제품 중 전체
  { name: "스니커즈", filter: "kids_sneakers" }, // 키즈 스니커즈 필터
  { name: "스포츠", filter: "kids_sports" }, // 키즈 스포츠 필터
  { name: "구두", filter: "kids_dress_shoes" }, // 키즈 구두 필터
  { name: "샌들/슬라이드", filter: "kids_sandals_slides" }, // 키즈 샌들/슬라이드 필터
  { name: "부츠/패딩", filter: "kids_boots_padding" }, // 키즈 부츠/패딩 필터
];
