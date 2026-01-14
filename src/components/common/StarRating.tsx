// src/components/common/StarRating.tsx
import React from "react";
import SolidStarIcon from "../../assets/icons/Star_fill.svg"; // 채워진 별
import OutlineStarIcon from "../../assets/icons/Star.svg"; // 빈 별
import Icon from "./Icon";

interface StarRatingProps {
  rating: number; // 0.0 ~ 5.0 사이의 평점
  reviewCount?: number; // 리뷰 개수 (선택 사항)
  size?: "sm" | "md" | "lg"; // 별 아이콘 크기
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewCount,
  size = "md",
}) => {
  const starSizeClass =
    size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Icon
          src={SolidStarIcon}
          key={`full-${i}`}
          className={`${starSizeClass} text-yellow-400`}
        />
      ))}
      {hasHalfStar && (
        <img
          src={SolidStarIcon}
          className={`${starSizeClass} text-yellow-400 rotate-180`}
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      )}
      {/* 반쪽 별을 위한 간단한 트릭 */}
      {[...Array(emptyStars)].map((_, i) => (
        <Icon
          src={OutlineStarIcon}
          key={`empty-${i}`}
          className={`${starSizeClass} text-gray-300`}
        />
      ))}
      {reviewCount !== undefined && (
        <span className="ml-2 text-sm text-gray-600">({reviewCount})</span>
      )}
    </div>
  );
};

export default StarRating;
