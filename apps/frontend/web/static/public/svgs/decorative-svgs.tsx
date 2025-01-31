import React from "react";

interface SvgProps {
  className?: string;
}

export function DottedPatternSvg({ className }: SvgProps) {
  return (
    <svg
      width="78"
      height="176"
      viewBox="0 0 78 176"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
    >
      <g opacity="0.2">
        {[0, 24, 48, 72].map((x) =>
          [0, 24, 48, 72, 96, 120, 144, 168].map((y) => (
            <circle
              key={`${x}-${y}`}
              cx={x + 2}
              cy={y + 4}
              r="4"
              fill="#183953"
            />
          ))
        )}
      </g>
    </svg>
  );
}

export function PurpleCircleSvg({ className }: SvgProps) {
  return (
    <svg
      width="1089"
      height="965"
      viewBox="0 0 1089 965"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
    >
      <path
        opacity="0.03"
        d="M1114.81 281.397C1114.81 528.47 917.008 727.793 674.2 727.793C431.391 727.793 233.594 528.47 233.594 281.397C233.594 34.3239 431.391 -165 674.2 -165C917.008 -165 1114.81 34.3239 1114.81 281.397Z"
        stroke="#8123AD"
        strokeWidth="96"
      />
      <path
        opacity="0.03"
        d="M1302.59 281C1302.59 632.236 1021.34 916 675.594 916C329.843 916 48.5938 632.236 48.5938 281C48.5938 -70.2356 329.843 -354 675.594 -354C1021.34 -354 1302.59 -70.2356 1302.59 281Z"
        stroke="#8123AD"
        strokeWidth="96"
      />
    </svg>
  );
}
