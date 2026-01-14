// src/components/common/Modal.tsx
import React, { useRef, useEffect, useCallback } from "react";

interface ModalProps {
  isOpen: boolean; // 모달 열림/닫힘 상태
  onClose: () => void; // 모달을 닫는 함수
  children: React.ReactNode; // 모달 내부에 표시할 내용
  title?: string; // 모달 제목 (선택 사항)
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC 키 눌렀을 때 모달 닫기
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 모달 열리면 스크롤 방지
      window.addEventListener("keydown", handleEscapeKey);
    } else {
      document.body.style.overflow = "unset"; // 모달 닫히면 스크롤 허용
      window.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, handleEscapeKey]);

  // 외부 클릭 시 모달 닫기
  // const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
  //     onClose();
  //   }
  // };

  if (!isOpen) return null; // 모달이 닫혀 있으면 아무것도 렌더링하지 않음

  return (
    // 모달 오버레이
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      // onClick={handleOverlayClick}
    >
      {/* 모달 콘텐츠 */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        // onClick={e => e.stopPropagation()} // 이 부분을 추가하면 콘텐츠 클릭 시 모달이 닫히지 않습니다.
      >
        {/* 모달 헤더 (제목 및 닫기 버튼) */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">{title || ""}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* 모달 본문 (AuthPage가 들어갈 부분) */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
