// /components/StarRating.tsx
"use client";


import { Star as StarOutline } from "lucide-react";

type StarRatingProps = {
  value: number;        // 0.0–5.0
  size?: number;        // icon size in px
  className?: string;
};

export default function StarRating({
  value,
  size = 16,
  className = "",
}: StarRatingProps) {
  // Round to nearest 0.5 (so 4.4 -> 4.5, 4.24 -> 4.0)
  const rounded = Math.round(value * 2) / 2;

  const starTypes = Array.from({ length: 5 }).map((_, i) => {
    const n = i + 1;
    if (rounded >= n) return "full";
    if (rounded >= n - 0.5) return "half";
    return "empty";
  });

  // Simple filled star SVG (keeps visual weight consistent)
  const FilledStar = ({ color }: { color: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable={false}
    >
      <path d="M12 .587l3.668 7.568L24 9.748l-6 5.848L19.335 24 12 19.897 4.665 24 6 15.596 0 9.748l8.332-1.593z" />
    </svg>
  );

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {starTypes.map((type, i) => {
        if (type === "full") {
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <FilledStar color="#f59e0b" />{/* amber-500 */}
              <StarOutline
                size={size}
                className="absolute inset-0 text-yellow-600"
                style={{ position: "absolute", left: 0, top: 0 }}
              />
            </span>
          );
        }

        if (type === "half") {
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              {/* base empty fill */}
              <FilledStar color="#e5e7eb" />{/* gray-300 */}
              {/* left half filled */}
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              >
                <FilledStar color="#f59e0b" />
              </span>

              <StarOutline
                size={size}
                className="absolute inset-0 text-yellow-600"
                style={{ position: "absolute", left: 0, top: 0 }}
              />
            </span>
          );
        }

        // empty
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <FilledStar color="#e5e7eb" />
            <StarOutline
              size={size}
              className="absolute inset-0 text-gray-300"
              style={{ position: "absolute", left: 0, top: 0 }}
            />
          </span>
        );
      })}
    </div>
  );
}
