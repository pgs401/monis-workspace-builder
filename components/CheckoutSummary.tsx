"use client";

import { catalogue } from "@/lib/catalogue";
import { useWorkspaceStore } from "@/lib/store";

export default function CheckoutSummary({ onClose }: { onClose: () => void }) {
  const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
  const selectedChair = useWorkspaceStore((state) => state.selectedChair);
  const selectedAccessories = useWorkspaceStore(
    (state) => state.selectedAccessories
  );
  const total = useWorkspaceStore((state) => state.totalMonthlyPrice());

  const lines = [
    ...(selectedDesk
      ? [
          {
            name: selectedDesk.name,
            quantity: 1,
            price: selectedDesk.monthlyPrice,
          },
        ]
      : []),
    ...(selectedChair
      ? [
          {
            name: selectedChair.name,
            quantity: 1,
            price: selectedChair.monthlyPrice,
          },
        ]
      : []),
    ...Object.entries(selectedAccessories).flatMap(([itemId, quantity]) => {
      const item = catalogue.find((entry) => entry.id === itemId);
      return item && quantity > 0
        ? [{ name: item.name, quantity, price: item.monthlyPrice * quantity }]
        : [];
    }),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-stone-900/40 p-4 sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Checkout summary"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-stone-900">
            Your monthly setup
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <p className="py-8 text-center text-stone-500">
            Nothing selected yet. Pick a desk to get started.
          </p>
        ) : (
          <>
            <ul className="divide-y divide-stone-100">
              {lines.map((line) => (
                <li
                  key={line.name}
                  className="flex justify-between py-3 text-sm"
                >
                  <span className="text-stone-600">
                    {line.name}
                    {line.quantity > 1 && ` × ${line.quantity}`}
                  </span>
                  <span className="font-medium text-stone-900">
                    ${line.price}/mo
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex justify-between border-t border-stone-200 pt-4">
              <span className="font-semibold text-stone-900">
                Total per month
              </span>
              <span className="text-xl font-bold text-teal-700">${total}</span>
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-teal-600 py-3 font-semibold text-white transition hover:bg-teal-700"
            >
              Confirm rental
            </button>
            <p className="mt-3 text-center text-xs text-stone-400">
              Delivered and assembled anywhere in Bali within 48 hours.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
