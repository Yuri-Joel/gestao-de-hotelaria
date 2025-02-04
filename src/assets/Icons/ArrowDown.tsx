import { Ticon } from '@/types/icon/iconType'
import React from 'react'

export const ArrowDown: React.FC<Ticon> = ({ width, height, fill }) => {
  return (
    <>
      <svg
        width={width || '12'}
        height={height || '8'}
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke='black'
      >
        <path
          d="M1 1.5L5.29289 5.79289C5.62623 6.12623 5.79289 6.29289 6 6.29289C6.20711 6.29289 6.37377 6.12623 6.70711 5.79289L11 1.5"
          stroke={fill || '#5954FB'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  )
}
