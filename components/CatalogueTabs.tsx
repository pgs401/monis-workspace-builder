"use client";

import { useState } from "react";
import { catalogue } from "@/lib/catalogue";
import { useWorkspaceStore } from "@/lib/store";
import ItemCard from "./ItemCard";

const TABS = [
  { id: "desks", label: "Desks" },
  { id: "chairs", label: "Chairs" },
  { id: "accessories", label: "Accessories" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const ACCESSORY_CATEGORIES = ["monitor", "lamp", "plant", "accessory"];

export default function CatalogueTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("desks");

  const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
  const selectedChair = useWorkspaceStore((state) => state.selectedChair);
  const selectedAccessories = useWorkspaceStore(
    (state) => state.selectedAccessories
  );
  const selectDesk = useWorkspaceStore((state) => state.selectDesk);
  const selectChair = useWorkspaceStore((state) => state.selectChair);
  const addAccessory = useWorkspaceStore((state) => state.addAccessory);
  const removeAccessory = useWorkspaceStore((state) => state.removeAccessory);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Catalogue categories"
        className="mb-4 flex gap-1 rounded-xl bg-stone-200/70 p-1"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
              activeTab === tab.id
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="space-y-3">
        {activeTab === "desks" &&
          catalogue
            .filter((item) => item.category === "desk")
            .map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                mode="single"
                selected={selectedDesk?.id === item.id}
                onSelect={() => selectDesk(item)}
              />
            ))}

        {activeTab === "chairs" &&
          catalogue
            .filter((item) => item.category === "chair")
            .map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                mode="single"
                selected={selectedChair?.id === item.id}
                onSelect={() => selectChair(item)}
              />
            ))}

        {activeTab === "accessories" &&
          catalogue
            .filter((item) => ACCESSORY_CATEGORIES.includes(item.category))
            .map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                mode="multi"
                quantity={selectedAccessories[item.id] ?? 0}
                onAdd={() => addAccessory(item.id)}
                onRemove={() => removeAccessory(item.id)}
              />
            ))}
      </div>
    </div>
  );
}
