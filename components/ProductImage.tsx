/* eslint-disable @next/next/no-img-element */
import type { WorkspaceItem } from "@/lib/types";
import ShapeIcon from "./ShapeIcon";

/**
 * Product visual for catalogue cards. Renders the real photo when the item
 * has one; otherwise a styled tile composed from the item's shape primitive,
 * so the catalogue can adopt photography item by item.
 */
export default function ProductImage({
  item,
  active,
  className,
}: {
  item: WorkspaceItem;
  active?: boolean;
  className?: string;
}) {
  if (item.imageUrl) {
    return (
      <img
        src={item.imageUrl}
        alt={item.name}
        className={`shrink-0 rounded-lg object-cover ${className ?? ""}`}
      />
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br transition-colors ${
        active
          ? "from-teal-100 via-teal-50 to-white"
          : "from-stone-100 via-stone-50 to-white"
      } ${className ?? ""}`}
    >
      <ShapeIcon
        shape={item.shape}
        className={`h-[70%] w-[70%] drop-shadow-sm transition-colors ${
          active ? "text-teal-600" : "text-stone-400"
        }`}
      />
    </div>
  );
}
