"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CatalogueTabs from "@/components/CatalogueTabs";
import CheckoutSummary from "@/components/CheckoutSummary";
import SavedSetups from "@/components/SavedSetups";
import WorkspacePreview from "@/components/WorkspacePreview";
import { useWorkspaceStore } from "@/lib/store";
import { decodeSetup } from "@/lib/share";

export default function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const total = useWorkspaceStore((state) => state.totalMonthlyPrice());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("setup");
    const shared = encoded ? decodeSetup(encoded) : null;

    useWorkspaceStore.persist.rehydrate();
    if (shared) {
      useWorkspaceStore.getState().applyShared(shared);
      window.history.replaceState(null, "", window.location.pathname);
    }
    setReady(true);
  }, []);

  return (
    <main className="min-h-screen bg-stone-100 pb-24">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
          <h1 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
            monis<span className="text-teal-600">.rent</span> workspace builder
          </h1>
          <p className="mt-1 text-sm text-stone-500 sm:text-base">
            Design your dream workspace, we deliver it to your villa by the
            month.
          </p>
        </div>
      </header>

      <div
        className={`mx-auto grid max-w-6xl gap-6 px-4 py-6 transition-opacity duration-300 sm:px-6 sm:py-8 lg:grid-cols-2 lg:gap-8 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="min-w-0">
          <CatalogueTabs />
        </div>
        <div className="min-w-0 space-y-6 lg:sticky lg:top-8 lg:self-start">
          <WorkspacePreview />
          <SavedSetups />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500 sm:text-sm sm:normal-case sm:tracking-normal">
              Total per month
            </p>
            <p className="text-xl font-bold tabular-nums text-stone-900 sm:text-2xl">
              ${total}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            disabled={total === 0}
            className="rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-700 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 sm:px-6"
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
