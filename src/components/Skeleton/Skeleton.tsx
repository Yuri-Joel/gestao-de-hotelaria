import type React from "react"

interface SkeletonProps {
  className?: string
  count?: number
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "", count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`bg-gray-200 rounded-md relative overflow-hidden
                      ${className}`}
        >
          <div
            className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
          ></div>
        </div>
      ))}
    </>
  )
}

