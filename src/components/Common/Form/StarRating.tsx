"use client";

import { Star } from "lucide-react";
import { useState } from "react";

type StarRatingProps = {
  value?: number;                 // current rating (0–5)
  onChange?: (rating: number) => void;
  size?: number;
  disabled?: boolean;
};

export default function StarRating({
  value = 0,
  onChange,
  size = 20,
  disabled = false,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const currentRating = hovered ?? value;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= currentRating;

        return (
          <Star
            key={index}
            size={size}
            className={`cursor-pointer transition-colors ${
              isActive
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
            onMouseEnter={() => !disabled && setHovered(starValue)}
            onMouseLeave={() => !disabled && setHovered(null)}
            onClick={() => !disabled && onChange?.(starValue)}
          />
        );
      })}
    </div>
  );
}
