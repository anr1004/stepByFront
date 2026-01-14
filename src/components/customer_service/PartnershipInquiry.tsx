// src/components/customer_service/PartnershipInquiry.tsx
import React from "react";

const PartnershipInquiry: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">입점/제휴 문의</h3>
      <p className="text-gray-700">StepBy와 함께 성장할 파트너를 찾습니다.</p>
      <p className="text-gray-700">
        귀사의 비즈니스에 대한 소개와 함께 제안서를 다음 이메일로 보내주세요.
      </p>
      <p className="font-medium text-lg text-blue-600">
        partnership@stepby.com
      </p>
      <p className="text-gray-700 text-sm mt-2">
        담당 부서에서 검토 후 빠른 시일 내에 회신드리겠습니다.
      </p>
    </div>
  );
};

export default PartnershipInquiry;
