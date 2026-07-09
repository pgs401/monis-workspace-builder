"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { configPrice, useWorkspaceStore } from "@/lib/store";
import { encodeSetup } from "@/lib/share";

export default function SavedSetups() {
  const [name, setName] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
  const selectedChair = useWorkspaceStore((state) => state.selectedChair);
  const selectedAccessories = useWorkspaceStore(
    (state) => state.selectedAccessories
  );
  const positions = useWorkspaceStore((state) => state.positions);
  const savedSetups = useWorkspaceStore((state) => state.savedSetups);
  const saveSetup = useWorkspaceStore((state) => state.saveSetup);
  const loadSetup = useWorkspaceStore((state) => state.loadSetup);
  const deleteSetup = useWorkspaceStore((state) => state.deleteSetup);

  const hasSelection = Boolean(
    selectedDesk || selectedChair || Object.keys(selectedAccessories).length
  );

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = (message: string) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed || !hasSelection) return;
    saveSetup(trimmed);
    setName("");
    showToast(`Saved "${trimmed}"`);
  };

  const handleShare = async () => {
    const encoded = encodeSetup({
      deskId: selectedDesk?.id ?? null,
      chairId: selectedChair?.id ?? null,
      accessories: selectedAccessories,
      positions,
    });
    const url = `${window.location.origin}${window.location.pathname}?setup=${encoded}`;
    try {
      await navigator.clipboard.writeText(url);
      showToast("Share link copied to clipboard");
    } catch {
      window.prompt("Copy your share link:", url);
    }
  };

  return (
    <div className="relative rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold tracking-tight text-stone-900">
        Saved setups
      </h2>
      <p className="mt-0.5 text-sm text-stone-500">
        Keep configurations to compare, or share one with a link.
      </p>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && handleSave()}
          placeholder={
            hasSelection ? "Name this setup…" : "Build a setup first"
          }
          disabled={!hasSelection}
          aria-label="Setup name"
          className="min-w-0 flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600 disabled:bg-stone-50 disabled:text-stone-400"
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={!hasSelection || !name.trim()}
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleShare}
          disabled={!hasSelection}
          className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Share
        </button>
      </div>

      {savedSetups.length > 0 && (
        <ul className="mt-4 divide-y divide-stone-100">
          <AnimatePresence initial={false}>
            {savedSetups.map((setup) => (
              <motion.li
                key={setup.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-stone-900">
                      {setup.name}
                    </p>
                    <p className="text-xs text-stone-500">
                      ${configPrice(setup)}/mo
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      loadSetup(setup.id);
                      showToast(`Loaded "${setup.name}"`);
                    }}
                    className="rounded-lg border border-teal-600 px-3 py-1.5 text-xs font-semibold text-teal-700 transition hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                  >
                    Load
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteSetup(setup.id)}
                    aria-label={`Delete ${setup.name}`}
                    className="rounded-lg px-2 py-1.5 text-xs font-semibold text-stone-400 transition hover:bg-stone-100 hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                  >
                    Delete
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            role="status"
            className="pointer-events-none absolute inset-x-6 -bottom-3 z-20 mx-auto w-fit rounded-full bg-stone-900 px-4 py-1.5 text-xs font-medium text-white shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
