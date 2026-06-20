import React from "react"

function Skeleton(
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div
      className={`animate-pulse rounded-md bg-base-muted ${className}`}
      {...props}
    />
  )
}

export { Skeleton }
