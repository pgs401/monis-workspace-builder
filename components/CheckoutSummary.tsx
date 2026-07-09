"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { catalogue } from "@/lib/catalogue";
import { useWorkspaceStore } from "@/lib/store";

export default function CheckoutSummary({ onClose }: { onClose: () => void }) {
  const [confirmed, setConfirmed] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus();
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

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
    <div className="fixed inset-0 z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-stone-900/40"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-label="Checkout summary"
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl focus:outline-none"
      >
        {confirmed ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-teal-600"
                fill="none"
              >
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold text-stone-900">
              Rental confirmed!
            </h2>
            <p className="mt-2 text-stone-500">
              Your setup is reserved at{" "}
              <span className="font-semibold text-stone-700">${total}/mo</span>.
              Our team will be in touch to arrange delivery to your villa.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full rounded-xl bg-teal-600 py-3 font-semibold text-white transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              Back to the builder
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
              <h2 className="text-xl font-semibold text-stone-900">
                Your monthly setup
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
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

            <div className="flex-1 overflow-y-auto px-6">
              {lines.length === 0 ? (
                <p className="py-12 text-center text-stone-500">
                  Nothing selected yet. Pick a desk to get started.
                </p>
              ) : (
                <ul className="divide-y divide-stone-100">
                  {lines.map((line) => (
                    <li
                      key={line.name}
                      className="flex justify-between py-3.5 text-sm"
                    >
                      <span className="text-stone-600">
                        {line.name}
                        {line.quantity > 1 && (
                          <span className="text-stone-400">
                            {" "}
                            × {line.quantity}
                          </span>
                        )}
                      </span>
                      <span className="font-medium text-stone-900">
                        ${line.price}/mo
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-stone-200 px-6 py-5">
                <div className="mb-4 flex justify-between">
                  <span className="font-semibold text-stone-900">
                    Total per month
                  </span>
                  <span className="text-xl font-bold text-teal-700">
                    ${total}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmed(true)}
                  className="w-full rounded-xl bg-teal-600 py-3 font-semibold text-white transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                >
                  Confirm Rental
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 w-full rounded-xl py-3 font-semibold text-stone-500 transition hover:bg-stone-50 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  Keep editing
                </button>
                <p className="mt-2 text-center text-xs text-stone-400">
                  Delivered and assembled anywhere in Bali within 48 hours.
                </p>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
