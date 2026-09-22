/**
 * Faint topographic contour-line motif used as a background watermark
 * in the hero. Purely decorative — aria-hidden and non-interactive.
 */
export function TopoPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="#F3F1E8" strokeOpacity="0.08" strokeWidth="1.5">
        <path d="M-50 480 C 150 420, 250 500, 400 440 S 650 380, 850 430" />
        <path d="M-50 420 C 160 370, 260 440, 410 380 S 660 320, 850 370" />
        <path d="M-50 360 C 170 320, 270 380, 420 320 S 670 270, 850 310" />
        <path d="M-50 300 C 180 270, 280 320, 430 270 S 680 220, 850 250" />
        <path d="M-50 240 C 190 220, 290 260, 440 220 S 690 180, 850 200" />
        <path d="M-50 180 C 200 165, 300 200, 450 170 S 700 140, 850 155" />
        <path d="M-50 120 C 210 110, 310 140, 460 120 S 710 100, 850 110" />
      </g>
    </svg>
  );
}
