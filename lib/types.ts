export type ItemCategory =
  "desk" | "chair" | "monitor" | "lamp" | "plant" | "accessory";

/**
 * Identifier for the built-in shape used to render an item.
 * Items are drawn from these primitives instead of external images.
 */
export type ItemShape =
  | "desk-standard"
  | "desk-standing"
  | "desk-corner"
  | "chair-task"
  | "chair-ergonomic"
  | "chair-stool"
  | "monitor-single"
  | "monitor-ultrawide"
  | "lamp-desk"
  | "lamp-floor"
  | "plant-small"
  | "plant-large"
  | "accessory-generic";

export interface WorkspaceItem {
  id: string;
  name: string;
  category: ItemCategory;
  /** Monthly rental price in USD. */
  monthlyPrice: number;
  shape: ItemShape;
  description?: string;
  /**
   * Optional product photo path (e.g. /products/desk-teak.jpg).
   * When absent the UI renders a styled tile built from the shape primitive.
   */
  imageUrl?: string;
}
