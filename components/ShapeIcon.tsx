import type { ItemShape } from "@/lib/types";

interface ShapeIconProps {
  shape: ItemShape;
  className?: string;
}

const paths: Record<ItemShape, React.ReactNode> = {
  "desk-standard": (
    <>
      <rect x="8" y="24" width="48" height="6" rx="2" />
      <rect x="12" y="30" width="4" height="18" />
      <rect x="48" y="30" width="4" height="18" />
    </>
  ),
  "desk-standing": (
    <>
      <rect x="8" y="14" width="48" height="6" rx="2" />
      <rect x="18" y="20" width="4" height="28" />
      <rect x="42" y="20" width="4" height="28" />
      <rect x="14" y="48" width="12" height="4" rx="2" />
      <rect x="38" y="48" width="12" height="4" rx="2" />
    </>
  ),
  "desk-corner": (
    <>
      <path d="M8 24h48v6H34v18h-6V30H8z" />
      <rect x="10" y="30" width="4" height="14" />
      <rect x="50" y="30" width="4" height="14" />
    </>
  ),
  "chair-task": (
    <>
      <rect x="20" y="10" width="24" height="18" rx="4" />
      <rect x="20" y="30" width="24" height="6" rx="2" />
      <rect x="30" y="36" width="4" height="10" />
      <path d="M20 50h24v3H20z" />
    </>
  ),
  "chair-ergonomic": (
    <>
      <path d="M22 8c0-2 20-2 20 0l-2 22H24z" />
      <rect x="18" y="32" width="28" height="7" rx="3" />
      <rect x="30" y="39" width="4" height="9" />
      <path d="M18 50h28v3H18z" />
      <rect x="14" y="26" width="4" height="10" rx="2" />
      <rect x="46" y="26" width="4" height="10" rx="2" />
    </>
  ),
  "chair-stool": (
    <>
      <ellipse cx="32" cy="18" rx="14" ry="5" />
      <path d="M22 22l-4 28h4l4-24M42 22l4 28h-4l-4-24" />
    </>
  ),
  "monitor-single": (
    <>
      <rect x="12" y="10" width="40" height="28" rx="3" />
      <rect x="28" y="38" width="8" height="8" />
      <rect x="20" y="46" width="24" height="4" rx="2" />
    </>
  ),
  "monitor-ultrawide": (
    <>
      <path d="M6 14q26-8 52 0v22q-26 8-52 0z" />
      <rect x="28" y="38" width="8" height="8" />
      <rect x="18" y="46" width="28" height="4" rx="2" />
    </>
  ),
  "lamp-desk": (
    <>
      <path d="M18 12l14 6-3 7-14-6z" />
      <path
        d="M28 22L38 44"
        strokeWidth="3"
        stroke="currentColor"
        fill="none"
      />
      <ellipse cx="38" cy="48" rx="10" ry="4" />
    </>
  ),
  "lamp-floor": (
    <>
      <path d="M24 8h16l4 10H20z" />
      <rect x="30" y="18" width="4" height="30" />
      <rect x="22" y="48" width="20" height="4" rx="2" />
    </>
  ),
  "plant-small": (
    <>
      <path d="M32 30c-2-8-8-12-14-12 2 8 8 12 14 12zM32 30c2-8 8-12 14-12-2 8-8 12-14 12z" />
      <rect x="30" y="26" width="4" height="10" />
      <path d="M22 36h20l-3 14H25z" />
    </>
  ),
  "plant-large": (
    <>
      <path d="M32 26c-4-12-12-16-20-16 3 12 12 16 20 16zM32 26c4-12 12-16 20-16-3 12-12 16-20 16zM32 30c0-10-4-18-4-18s8 6 4 18z" />
      <rect x="30" y="24" width="4" height="12" />
      <path d="M20 36h24l-4 18H24z" />
    </>
  ),
  "accessory-generic": (
    <>
      <rect x="12" y="20" width="40" height="14" rx="4" />
      <rect x="18" y="38" width="28" height="8" rx="4" />
    </>
  ),
};

export default function ShapeIcon({ shape, className }: ShapeIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {paths[shape]}
    </svg>
  );
}
