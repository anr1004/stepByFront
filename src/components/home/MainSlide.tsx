// src/components/MainSlide.tsx

import { useEffect, useState } from "react";

interface MainSlideProps {
  slides: IMainSlide[];
}

const MainSlide: React.FC<MainSlideProps> = ({ slides }) => {
  const slidesPerPage = 3; // 한 화면에 보여줄 슬라이드 개수
  // 현재 보고 있는 첫 번째 슬라이드의 인덱스 (0, 3, 6...)
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalGroups = Math.ceil(slides.length / slidesPerPage); // 총 슬라이드 그룹 수
  const maxIndex = (totalGroups - 1) * slidesPerPage; // 마지막 그룹의 시작 인덱스 (goToPrev, goToNext에서 사용)

  // 자동 슬라이드 기능 (수정됨)
  useEffect(() => {
    // slides 배열이 비어있으면 자동 슬라이드를 실행하지 않습니다.
    if (!slides || slides.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        // <<<--- 여기서 prev를 받아서
        const nextIndexCandidate = prev + slidesPerPage;
        // 다음 그룹으로 이동했을 때 전체 슬라이드 길이를 넘어서면 처음(0)으로 돌아갑니다.
        if (nextIndexCandidate >= slides.length) {
          return 0;
        } else {
          // 그렇지 않으면 다음 그룹의 시작 인덱스로 이동합니다.
          return nextIndexCandidate;
        }
      });
    }, 5000); // 5초마다 자동 이동 (시간 조정 가능)

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, [slides.length, slidesPerPage]); // slides.length와 slidesPerPage가 변경될 때마다 재실행

  const goToPrev = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - slidesPerPage;
      // 처음보다 작으면 마지막 그룹으로 이동
      return newIndex < 0 ? maxIndex : newIndex;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + slidesPerPage;
      // 끝에 도달하면 처음으로, 아니면 다음 그룹으로
      return newIndex >= slides.length ? 0 : newIndex;
    });
  };

  return (
    <div className="w-full relative overflow-hidden mx-auto min-h-50 h-125 max-h-125">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out "
        style={{
          transform: `translateX(-${currentIndex * (100 / slidesPerPage)}%)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-[33.3333%] h-full shrink-0 relative"
          >
            <a href={slide.link} className="block w-full h-full">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </a>
          </div>
        ))}
      </div>
      {/* 탐색 버튼 */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2
                   bg-black bg-opacity-50 text-white p-2 rounded-full z-10
                   hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="이전 슬라이드"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2
                   bg-black bg-opacity-50 text-white p-2 rounded-full z-10
                   hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="다음 슬라이드"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
      {/* 인디케이터 (현재 그룹 표시) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {Array.from({ length: totalGroups }).map((_, groupIndex) => (
          <button
            key={groupIndex}
            onClick={() => setCurrentIndex(groupIndex * slidesPerPage)}
            className={`w-3 h-3 rounded-full ${
              Math.floor(currentIndex / slidesPerPage) === groupIndex
                ? "bg-white"
                : "bg-gray-400"
            }`}
            aria-label={`${groupIndex + 1}번째 슬라이드 그룹 보기`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainSlide;
