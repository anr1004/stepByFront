// src/pages/CustomerServicePage.tsx
import React, { useState } from "react";
import FAQ from "../components/customer_service/FAQ";
import StoreLocator from "../components/customer_service/StoreLocator";
import PartnershipInquiry from "../components/customer_service/PartnershipInquiry";
import BulkOrder from "../components/customer_service/BulkOrder";
import Notices from "../components/customer_service/Notices";

// 탭 카테고리 타입 정의
type CustomerServiceTab = "faq" | "stores" | "partnership" | "bulk" | "notices";

const CustomerServicePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CustomerServiceTab>("faq"); // 기본적으로 '자주하시는 질문' 탭 활성화

  // 현재 활성화된 탭에 따라 콘텐츠를 렌더링하는 함수
  const renderContent = () => {
    switch (activeTab) {
      case "faq":
        return <FAQ />;
      case "stores":
        return <StoreLocator />;
      case "partnership":
        return <PartnershipInquiry />;
      case "bulk":
        return <BulkOrder />;
      case "notices":
        return <Notices />;
      default:
        return <FAQ />; // 예외 처리 또는 기본 탭
    }
  };

  return (
    <div className="grow">
      <div className="container mx-auto my-12 p-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">고객센터</h1>
        <div className="flex justify-between border-b-2 border-gray-300 mb-8">
          {[
            { id: "faq", label: "자주하시는 질문" },
            { id: "stores", label: "전국 매장 안내" },
            { id: "partnership", label: "입점/제휴 문의" },
            { id: "bulk", label: "단체 구매" },
            { id: "notices", label: "공지사항" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CustomerServiceTab)}
              className={`
                  flex-1 py-3 text-lg font-medium text-center
                  border-b-2
                  transition-colors duration-200
                  ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600" // 활성 탭 스타일
                      : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-400" // 비활성 탭 스타일
                  }
                `}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* 탭 내용이 표시될 영역 */}
        <div className="bg-white p-6 rounded-lg shadow-md min-h-100">
          {" "}
          {/* 최소 높이 지정 */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CustomerServicePage;
