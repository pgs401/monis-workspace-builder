"use client";

import { catalogue } from "@/lib/catalogue";
import { useWorkspaceStore } from "@/lib/store";
import ShapeIcon from "./ShapeIcon";

export default function WorkspacePreview() {
  const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
  const selectedChair = useWorkspaceStore((state) => state.selectedChair);
  const selectedAccessories = useWorkspaceStore(
    (state) => state.selectedAccessories
  );
  const reset = useWorkspaceStore((state) => state.reset);

  const accessoryEntries = Object.entries(selectedAccessories)
    .map(([itemId, quantity]) => ({
      item: catalogue.find((entry) => entry.id === itemId),
      quantity,
    }))
    .filter(
      (
        entry
      ): entry is { item: (typeof catalogue)[number]; quantity: number } =>
        entry.item !== undefined && entry.quantity > 0
    );

  const isEmpty =
    !selectedDesk && !selectedChair && accessoryEntries.length === 0;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-stone-900">Your setup</h2>
        {!isEmpty && (
          <button
            type="button"
            onClick={reset}
            className="text-sm font-medium text-stone-500 transition hover:text-stone-700"
          >
            Start over
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-stone-50 text-center">
          <ShapeIcon
            shape="desk-standard"
            className="mb-3 h-16 w-16 text-stone-300"
          />
          <p className="font-medium text-stone-500">Your desk awaits</p>
          <p className="text-sm text-stone-400">
            Pick a desk and chair to see your setup here.
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-stone-50 p-6">
          <div className="relative mx-auto flex h-52 max-w-sm items-end justify-center">
            {selectedChair && (
              <ShapeIcon
                shape={selectedChair.shape}
                className="mb-1 h-24 w-24 shrink-0 text-teal-700"
              />
            )}
            <div className="relative flex flex-col items-center">
              <div className="flex items-end gap-1">
                {accessoryEntries
                  .filter(({ item }) =>
                    ["monitor", "lamp", "plant"].includes(item.category)
                  )
                  .flatMap(({ item, quantity }) =>
                    Array.from({ length: Math.min(quantity, 3) }, (_, i) => (
                      <ShapeIcon
                        key={`${item.id}-${i}`}
                        shape={item.shape}
                        className="h-12 w-12 text-teal-600"
                      />
                    ))
                  )}
              </div>
              {selectedDesk && (
                <ShapeIcon
                  shape={selectedDesk.shape}
                  className="-mt-4 h-36 w-36 text-stone-700"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {!isEmpty && (
        <ul className="mt-4 space-y-2">
          {selectedDesk && (
            <li className="flex justify-between text-sm">
              <span className="text-stone-600">{selectedDesk.name}</span>
              <span className="font-medium text-stone-900">
                ${selectedDesk.monthlyPrice}/mo
              </span>
            </li>
          )}
          {selectedChair && (
            <li className="flex justify-between text-sm">
              <span className="text-stone-600">{selectedChair.name}</span>
              <span className="font-medium text-stone-900">
                ${selectedChair.monthlyPrice}/mo
              </span>
            </li>
          )}
          {accessoryEntries.map(({ item, quantity }) => (
            <li key={item.id} className="flex justify-between text-sm">
              <span className="text-stone-600">
                {item.name}
                {quantity > 1 && ` × ${quantity}`}
              </span>
              <span className="font-medium text-stone-900">
                ${item.monthlyPrice * quantity}/mo
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
