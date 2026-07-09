import type { SharedConfig } from "./store";

/**
 * Compact wire format for shareable links:
 * d/c are item ids, a maps accessory id -> qty, p maps scene key -> rounded offsets.
 */
interface WireConfig {
  d: string | null;
  c: string | null;
  a: Record<string, number>;
  p: Record<string, [number, number]>;
}

function toBase64Url(value: string): string {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  return atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
}

export function encodeSetup(config: SharedConfig): string {
  const wire: WireConfig = {
    d: config.deskId,
    c: config.chairId,
    a: config.accessories,
    p: Object.fromEntries(
      Object.entries(config.positions).map(([key, position]) => [
        key,
        [Math.round(position.x), Math.round(position.y)] as [number, number],
      ])
    ),
  };
  return toBase64Url(JSON.stringify(wire));
}

export function decodeSetup(encoded: string): SharedConfig | null {
  try {
    const wire = JSON.parse(fromBase64Url(encoded)) as WireConfig;
    if (typeof wire !== "object" || wire === null) return null;
    return {
      deskId: typeof wire.d === "string" ? wire.d : null,
      chairId: typeof wire.c === "string" ? wire.c : null,
      accessories:
        wire.a && typeof wire.a === "object"
          ? Object.fromEntries(
              Object.entries(wire.a).filter(
                ([, quantity]) =>
                  typeof quantity === "number" && quantity > 0 && quantity < 100
              )
            )
          : {},
      positions:
        wire.p && typeof wire.p === "object"
          ? Object.fromEntries(
              Object.entries(wire.p)
                .filter(
                  ([, pair]) =>
                    Array.isArray(pair) &&
                    pair.length === 2 &&
                    pair.every((n) => typeof n === "number")
                )
                .map(([key, [x, y]]) => [key, { x, y }])
            )
          : {},
    };
  } catch {
    return null;
  }
}
