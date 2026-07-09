"use client";

import type { WorkspaceItem } from "@/lib/types";
import ShapeIcon from "./ShapeIcon";

interface SingleSelectProps {
  item: WorkspaceItem;
  mode: "single";
  selected: boolean;
  onSelect: () => void;
}

interface MultiSelectProps {
  item: WorkspaceItem;
  mode: "multi";
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

type ItemCardProps = SingleSelectProps | MultiSelectProps;

export default function ItemCard(props: ItemCardProps) {
  const { item } = props;
  const isActive =
    props.mode === "single" ? props.selected : props.quantity > 0;

  const cardClasses = `flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
    isActive
      ? "border-teal-600 bg-teal-50"
      : "border-stone-200 bg-white hover:border-stone-300"
  }`;

  const body = (
    <>
      <ShapeIcon
        shape={item.shape}
        className={`h-12 w-12 shrink-0 ${isActive ? "text-teal-600" : "text-stone-400"}`}
      />
      <div className="min-w-0 flex-1">
        <p className="font-medium text-stone-900">{item.name}</p>
        {item.description && (
          <p className="truncate text-sm text-stone-500">{item.description}</p>
        )}
        <p className="mt-0.5 text-sm font-semibold text-stone-700">
          ${item.monthlyPrice}
          <span className="font-normal text-stone-500">/mo</span>
        </p>
      </div>
    </>
  );

  if (props.mode === "single") {
    return (
      <button
        type="button"
        onClick={props.onSelect}
        aria-pressed={props.selected}
        className={cardClasses}
      >
        {body}
      </button>
    );
  }

  return (
    <div className={cardClasses}>
      {body}
      <div className="shrink-0">
        {props.quantity === 0 ? (
          <button
            type="button"
            onClick={props.onAdd}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Add
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={props.onRemove}
              aria-label={`Remove one ${item.name}`}
              className="h-8 w-8 rounded-full border border-stone-300 bg-white font-semibold text-stone-600 transition hover:bg-stone-100"
            >
              −
            </button>
            <span className="w-6 text-center font-medium tabular-nums text-stone-900">
              {props.quantity}
            </span>
            <button
              type="button"
              onClick={props.onAdd}
              aria-label={`Add one ${item.name}`}
              className="h-8 w-8 rounded-full bg-teal-600 font-semibold text-white transition hover:bg-teal-700"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
