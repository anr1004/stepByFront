// src/components/customer_service/FAQ.tsx
import React from "react";

const FAQ: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">자주하시는 질문</h3>
      <div className="border-b pb-2">
        <p className="font-medium text-lg">
          Q. 주문 변경 및 취소는 어떻게 하나요?
        </p>
        <p className="text-gray-700 mt-1">
          A. '마이페이지 &gt; 주문/배송 조회'에서 주문 상태가 '주문 접수'일
          경우에만 변경/취소가 가능합니다. 그 외의 경우 고객센터로 문의해주세요.
        </p>
      </div>
      <div className="border-b pb-2">
        <p className="font-medium text-lg">Q. 배송은 얼마나 걸리나요?</p>
        <p className="text-gray-700 mt-1">
          A. 영업일 기준 2~3일 이내 배송되며, 도서산간 지역은 추가 시일이 소요될
          수 있습니다.
        </p>
      </div>
      <div className="border-b pb-2">
        <p className="font-medium text-lg">
          Q. 제품 교환/환불 정책은 어떻게 되나요?
        </p>
        <p className="text-gray-700 mt-1">
          A. 제품 수령 후 7일 이내에 '마이페이지'에서 교환/환불 신청이
          가능합니다. 단, 제품 훼손 및 사용 흔적이 없는 경우에 한합니다.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
