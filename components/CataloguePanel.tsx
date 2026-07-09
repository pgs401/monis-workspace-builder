"use client";

import { catalogue } from "@/lib/catalogue";
import { useWorkspaceStore } from "@/lib/store";
import type { WorkspaceItem } from "@/lib/types";
import ShapeIcon from "./ShapeIcon";

const ACCESSORY_CATEGORIES = ["monitor", "lamp", "plant", "accessory"];

function SelectableCard({
  item,
  selected,
  onSelect,
}: {
  item: WorkspaceItem;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-center gap-4 rounded-xl border-2 bg-white p-4 text-left transition ${
        selected
          ? "border-teal-600 ring-1 ring-teal-600"
          : "border-stone-200 hover:border-stone-300"
      }`}
    >
      <ShapeIcon
        shape={item.shape}
        className={`h-12 w-12 shrink-0 ${selected ? "text-teal-600" : "text-stone-400"}`}
      />
      <div className="min-w-0 flex-1">
        <p className="font-medium text-stone-900">{item.name}</p>
        {item.description && (
          <p className="truncate text-sm text-stone-500">{item.description}</p>
        )}
      </div>
      <p className="shrink-0 font-semibold text-stone-900">
        ${item.monthlyPrice}
        <span className="text-sm font-normal text-stone-500">/mo</span>
      </p>
    </button>
  );
}

function AccessoryRow({ item }: { item: WorkspaceItem }) {
  const quantity = useWorkspaceStore(
    (state) => state.selectedAccessories[item.id] ?? 0
  );
  const addAccessory = useWorkspaceStore((state) => state.addAccessory);
  const removeAccessory = useWorkspaceStore((state) => state.removeAccessory);

  return (
    <div className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-4">
      <ShapeIcon
        shape={item.shape}
        className={`h-10 w-10 shrink-0 ${quantity > 0 ? "text-teal-600" : "text-stone-400"}`}
      />
      <div className="min-w-0 flex-1">
        <p className="font-medium text-stone-900">{item.name}</p>
        <p className="text-sm text-stone-500">${item.monthlyPrice}/mo</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => removeAccessory(item.id)}
          disabled={quantity === 0}
          aria-label={`Remove one ${item.name}`}
          className="h-8 w-8 rounded-full border border-stone-300 font-semibold text-stone-600 transition hover:bg-stone-100 disabled:opacity-30"
        >
          −
        </button>
        <span className="w-6 text-center font-medium tabular-nums text-stone-900">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => addAccessory(item.id)}
          aria-label={`Add one ${item.name}`}
          className="h-8 w-8 rounded-full bg-teal-600 font-semibold text-white transition hover:bg-teal-700"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function CataloguePanel() {
  const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
  const selectedChair = useWorkspaceStore((state) => state.selectedChair);
  const selectDesk = useWorkspaceStore((state) => state.selectDesk);
  const selectChair = useWorkspaceStore((state) => state.selectChair);

  const desks = catalogue.filter((item) => item.category === "desk");
  const chairs = catalogue.filter((item) => item.category === "chair");
  const accessories = catalogue.filter((item) =>
    ACCESSORY_CATEGORIES.includes(item.category)
  );

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 text-lg font-semibold text-stone-900">
          1. Pick your desk
        </h2>
        <div className="space-y-3">
          {desks.map((item) => (
            <SelectableCard
              key={item.id}
              item={item}
              selected={selectedDesk?.id === item.id}
              onSelect={() => selectDesk(item)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-stone-900">
          2. Pick your chair
        </h2>
        <div className="space-y-3">
          {chairs.map((item) => (
            <SelectableCard
              key={item.id}
              item={item}
              selected={selectedChair?.id === item.id}
              onSelect={() => selectChair(item)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-stone-900">
          3. Add accessories
        </h2>
        <div className="space-y-3">
          {accessories.map((item) => (
            <AccessoryRow key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
