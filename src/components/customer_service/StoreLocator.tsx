// src/components/customer_service/StoreLocator.tsx
import React from "react";

const StoreLocator: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">전국 매장 안내</h3>
      <p className="text-gray-700">StepBy의 전국 매장을 찾아보세요.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-md">
          <p className="font-medium">서울 강남점</p>
          <p className="text-gray-600 text-sm">
            서울특별시 강남구 테헤란로 123
          </p>
          <p className="text-gray-600 text-sm">영업시간: 10:00 ~ 20:00</p>
          <p className="text-gray-600 text-sm">전화: 02-1234-5678</p>
        </div>
        <div className="border p-4 rounded-md">
          <p className="font-medium">부산 서면점</p>
          <p className="text-gray-600 text-sm">
            부산광역시 부산진구 중앙대로 456
          </p>
          <p className="text-gray-600 text-sm">영업시간: 10:30 ~ 21:00</p>
          <p className="text-gray-600 text-sm">전화: 051-9876-5432</p>
        </div>
        {/* 추가 매장 정보 */}
      </div>
      <div className="bg-gray-100 p-6 rounded-md text-center text-gray-500 text-sm">
        <p>지도 서비스 연동 예정 (클릭 시 지도 보기 등)</p>
      </div>
    </div>
  );
};

export default StoreLocator;
