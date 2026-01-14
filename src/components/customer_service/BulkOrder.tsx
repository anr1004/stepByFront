// src/components/customer_service/BulkOrder.tsx
import React from "react";

const BulkOrder: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">단체 구매</h3>
      <p className="text-gray-700">
        기업, 기관, 단체 등 대량 구매를 원하시는 경우 특별 할인가를 적용해
        드립니다.
      </p>
      <p className="text-gray-700">
        구매하시려는 제품명, 수량, 희망 납기일 등을 기재하여 문의 메일을
        보내주시면 담당자가 신속하게 안내해 드립니다.
      </p>
      <p className="font-medium text-lg text-blue-600">bulkorder@stepby.com</p>
      <p className="text-gray-700 text-sm mt-2">
        최소 구매 수량 및 할인율은 별도 협의 가능합니다.
      </p>
    </div>
  );
};

export default BulkOrder;
