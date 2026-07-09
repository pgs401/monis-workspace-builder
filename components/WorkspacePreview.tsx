"use client";

import { AnimatePresence, motion } from "framer-motion";
import { catalogue } from "@/lib/catalogue";
import { useWorkspaceStore } from "@/lib/store";
import type { WorkspaceItem } from "@/lib/types";
import ShapeIcon from "./ShapeIcon";

const pop = {
  initial: { opacity: 0, scale: 0.6 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.6 },
  transition: { duration: 0.2, ease: "easeOut" },
} as const;

/** Fixed slots so repeated items land in stable, scattered positions. */
const PLANT_SLOTS = [
  "bottom-1 right-2",
  "bottom-1 left-2",
  "bottom-0 right-16",
  "bottom-0 left-16",
];

const LAMP_SLOTS = ["bottom-[52%] right-[12%]", "bottom-0 left-1"];

function instancesOf(
  selectedAccessories: Record<string, number>,
  category: string,
  cap: number
): { item: WorkspaceItem; key: string }[] {
  const instances: { item: WorkspaceItem; key: string }[] = [];
  for (const [itemId, quantity] of Object.entries(selectedAccessories)) {
    const item = catalogue.find((entry) => entry.id === itemId);
    if (!item || item.category !== category) continue;
    for (let i = 0; i < quantity && instances.length < cap; i++) {
      instances.push({ item, key: `${item.id}-${i}` });
    }
  }
  return instances;
}

export default function WorkspacePreview() {
  const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
  const selectedChair = useWorkspaceStore((state) => state.selectedChair);
  const selectedAccessories = useWorkspaceStore(
    (state) => state.selectedAccessories
  );
  const reset = useWorkspaceStore((state) => state.reset);

  const monitors = instancesOf(selectedAccessories, "monitor", 3);
  const lamps = instancesOf(selectedAccessories, "lamp", 2);
  const plants = instancesOf(selectedAccessories, "plant", 4);

  const listEntries = Object.entries(selectedAccessories)
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

  const hasFurniture = Boolean(selectedDesk || selectedChair);
  const hasAnything = hasFurniture || listEntries.length > 0;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-stone-900">Your setup</h2>
        {hasAnything && (
          <button
            type="button"
            onClick={reset}
            className="rounded-md px-1.5 py-0.5 text-sm font-medium text-stone-500 transition hover:bg-stone-100 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            Start over
          </button>
        )}
      </div>

      {!hasFurniture ? (
        <div className="flex h-72 flex-col items-center justify-center rounded-xl bg-stone-50 text-center">
          <ShapeIcon
            shape="desk-standard"
            className="mb-3 h-16 w-16 text-stone-300"
          />
          <p className="font-medium text-stone-500">Your workspace is empty</p>
          <p className="mt-1 max-w-[220px] text-sm text-stone-400">
            Choose a desk and a chair from the catalogue to start building.
          </p>
        </div>
      ) : (
        <div className="relative h-72 overflow-hidden rounded-xl bg-gradient-to-b from-stone-50 to-stone-100">
          {/* floor line */}
          <div className="absolute inset-x-6 bottom-6 border-b-2 border-stone-200" />

          {/* desk: base layer, centred */}
          <AnimatePresence>
            {selectedDesk && (
              <motion.div
                key={selectedDesk.id}
                {...pop}
                className="absolute bottom-5 left-1/2 -translate-x-1/2"
              >
                <ShapeIcon
                  shape={selectedDesk.shape}
                  className="h-44 w-44 text-stone-700"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* monitors: row sitting on the desk surface */}
          <div className="absolute bottom-[47%] left-1/2 flex -translate-x-1/2 items-end gap-1">
            <AnimatePresence>
              {monitors.map(({ item, key }) => (
                <motion.div key={key} {...pop}>
                  <ShapeIcon
                    shape={item.shape}
                    className="h-14 w-14 text-teal-600"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* lamps: one to the side of the desk */}
          <AnimatePresence>
            {lamps.map(({ item, key }, index) => (
              <motion.div
                key={key}
                {...pop}
                className={`absolute ${LAMP_SLOTS[index]}`}
              >
                <ShapeIcon
                  shape={item.shape}
                  className={
                    item.shape === "lamp-floor"
                      ? "h-24 w-24 text-teal-600"
                      : "h-12 w-12 text-teal-600"
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* chair: in front of the desk, left side */}
          <AnimatePresence>
            {selectedChair && (
              <motion.div
                key={selectedChair.id}
                {...pop}
                className="absolute bottom-3 left-[8%] z-10"
              >
                <ShapeIcon
                  shape={selectedChair.shape}
                  className="h-28 w-28 text-teal-700"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* plants: scattered around the base */}
          <AnimatePresence>
            {plants.map(({ item, key }, index) => (
              <motion.div
                key={key}
                {...pop}
                className={`absolute z-10 ${PLANT_SLOTS[index]}`}
              >
                <ShapeIcon
                  shape={item.shape}
                  className={
                    item.shape === "plant-large"
                      ? "h-20 w-20 text-teal-600"
                      : "h-12 w-12 text-teal-600"
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {hasAnything && (
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
          {listEntries.map(({ item, quantity }) => (
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
