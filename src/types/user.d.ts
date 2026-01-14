// 사용자 데이터 타입 정의
interface IUser {
  id: string; // 사용자 고유 ID
  email: string; // 로그인 이메일
  name: string; // 사용자 이름
  nickname?: string; // 닉네임
  phoneNumber: string; // 연락처
  gender?: "male" | "female" | "unspecified"; // 성별
  birthDate?: string; // 생년월일
  profileImageUrl?: string; // 프로필 이미지 URL
  createdAt: string; // 가입일
  updatedAt: string; // 마지막 정보 수정일
  role: "user" | "admin" | string; // 사용자 권한

  // 쇼핑 활동 관련 정보
  loyaltyPoints: number; //적립금
  coupons: ICoupon[]; // 보유 쿠폰 목록
  wishlist: string[]; // 찜한 상품 ID 목록
  addresses: IAddress[]; // 등록된 배송지 목록
}

interface IAuthUser {
  userId: string;
  email: string;
  role: string;
}

interface IRegisterData {
  email: string;
  password: string;
  realName: string;
  birthDate: string; // 프론트에서는 보통 string (YYYY-MM-DD)으로 관리
  gender: string; // 프론트에서는 보통 string으로 관리 ('MALE', 'FEMALE', 'OTHER')
  phoneNumber: string;
  zonecode: string;
  address: string;
  detailAddress: string;
}

interface AuthContextType {
  user: IAuthUser | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>; // 로그인 성공 여부 확인
  register: (data: IRegisterData) => Promise<string>; // 성공 메시지 또는 에러 메시지 반환
  logout: () => void;
}

interface IAddress {
  id: string;
  addressName: string; // 배송지 이름
  recipientName: string; // 받는 사람 이름
  phoneNumber: string; // 받는 사람 연락처
  postcode: string; // 우편번호
  address1: string; // 기본 주소
  address2?: string; // 상세 주소
  isDefault: boolean; // 기본 배송지 여부
}
