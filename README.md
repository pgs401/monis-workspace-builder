# monis-workspace-builder

Interactive workspace designer for monis.rent, pick a desk, chair, and accessories, then rent your setup

## Approach

I built the preview as a flat, layered composition of simple SVG shapes rather than trying for photorealistic rendering. A few reasons. First, the catalogue is small and will keep changing as we add and retire rental items, so I didn't want the cost of commissioning or maintaining product photography for every desk, chair, and accessory before the product even proves itself. Second, flat shapes composite cleanly and predictably, layering a chair in front of a desk, a monitor on top, plants scattered around the base, is trivial with absolutely positioned icons but gets fiddly fast with photos that all need matching lighting and perspective. Third, it keeps the whole thing snappy: no image loading, no layout shift, and animations stay cheap since we're just fading and scaling vector shapes. The result reads more like a floor-plan sketch than a product shot, which fits a "quickly compose a setup" tool better than it would fit a polished storefront.

## Tech Choices

- **Next.js** — App Router gives me file-based routing and a sensible default project structure without wiring one up by hand.
- **Tailwind** — lets me tune spacing, color, and responsive breakpoints directly in the markup, which kept the whole UI consistent without a separate stylesheet to maintain.
- **Zustand** — small, hook-based state that holds the selected desk, chair, and accessory quantities without the boilerplate a context provider or a heavier state library would add.
- **Framer Motion** — handles the enter and exit animations for items appearing in the preview and the checkout panel sliding in, with a much simpler API than hand-rolling CSS transitions for mount and unmount.

## What I Would Improve With More Time

- **Drag and drop repositioning** — right now item placement in the preview is fixed by category. Letting people drag the chair, monitors, and plants into their own layout would make the preview feel like their space instead of a template.
- **Saved configurations** — there's no way to save a setup and come back to it, or share a link to it. I'd add persistence, most likely a shareable URL or an account-backed save, so people don't lose their work.
- **Real product photography integration** — once the catalogue stabilizes, I'd swap in actual photos for the highest-traffic items, keeping the flat icon style as a fallback for anything new or less popular, so the visual quality can grow with the catalogue instead of blocking on it.
