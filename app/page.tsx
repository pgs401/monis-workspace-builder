"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CatalogueTabs from "@/components/CatalogueTabs";
import CheckoutSummary from "@/components/CheckoutSummary";
import WorkspacePreview from "@/components/WorkspacePreview";
import { useWorkspaceStore } from "@/lib/store";

export default function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const total = useWorkspaceStore((state) => state.totalMonthlyPrice());

  return (
    <main className="min-h-screen bg-stone-100 pb-24">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            monis<span className="text-teal-600">.rent</span> workspace builder
          </h1>
          <p className="mt-1 text-stone-500">
            Design your dream workspace, we deliver it to your villa by the
            month.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2">
        <div className="min-w-0">
          <CatalogueTabs />
        </div>
        <div className="min-w-0 lg:sticky lg:top-8 lg:self-start">
          <WorkspacePreview />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-sm text-stone-500">Total per month</p>
            <p className="text-2xl font-bold tabular-nums text-stone-900">
              ${total}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            disabled={total === 0}
            className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Rent Your Setup
          </button>
        </div>
      </div>

      <AnimatePresence>
        {checkoutOpen && (
          <CheckoutSummary onClose={() => setCheckoutOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
