// src/components/customer_service/Notices.tsx
import React from "react";

const Notices: React.FC = () => {
  const notices = [
    {
      id: 1,
      title: "개인정보처리방침 변경 안내 (2026년 1월 1일 시행)",
      date: "2025.12.20",
    },
    { id: 2, title: "배송 지연 안내 (설 연휴)", date: "2025.12.15" },
    {
      id: 3,
      title: "사이트 시스템 점검 안내 (2025년 12월 24일)",
      date: "2025.12.10",
    },
    { id: 4, title: "신규 회원 가입 혜택 안내", date: "2025.12.01" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">공지사항</h3>
      <div className="border-t border-b border-gray-200">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="flex justify-between items-center py-3 border-b last:border-b-0"
          >
            <p className="text-gray-800 hover:text-blue-600 cursor-pointer">
              {notice.title}
            </p>
            <p className="text-gray-500 text-sm">{notice.date}</p>
          </div>
        ))}
      </div>
      <div className="text-right text-gray-600 text-sm mt-2">
        <a href="#" className="hover:text-blue-600">
          더보기
        </a>
      </div>
    </div>
  );
};

export default Notices;
