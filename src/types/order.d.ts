// 주문 데이터 타입 정의
interface IOrder {
    id: string; // 주문 고유 ID
    userId; string; // 주문한 사용자 ID
    orderDate: string; // 주문일시
    status: 'pending_payment' | 'processing' | 'shipped' | 'delivered' | 'canceled' | 'returned'; // 주문 상태
    totalAmount: number; // 최종 결제 금액
    subtotal: number; //상품 총액
    discountAmount: number;  // 총 할인 금액
    shippingFee: number; // 배송비

    paymentMethod: 'credit_card' | 'bank_transfer' | 'kakao_pay' | 'naver_pay'; // 결제 수단
    paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';

    shippingAddress: IAddress; // 배송지 정보
    orderItems: IOrderItem[]; // 주문 상품 목록

    //기타 정보
    deliveryTrackingNumber?: string; // 운송장 번호
    deliveryCompany?: string; //택배사
    note?: string; // 사용자 요청 사항
    couponUsedId?: string; // 사용된 쿠폰 ID
}

interface IOrderItem {
    id: string; // 주문 상품 항복 고유 ID
    productId: string; // 주문된 상품의 ID
    productName: string; // 상품명
    brand: string; // 브랜드
    color: string; // 구매 색상
    size: number | string; // 구매 사이즈
    quantity: number; // 구매 수량
    price: number; // 주문 당시 상품 단가
    imageUrl: string; // 상품 이미지
    itemDiscountAmount?: number; // 개별 상품에 적용된 할인 금액
}