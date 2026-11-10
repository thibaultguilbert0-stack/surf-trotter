import { describe, it, expect } from "vitest";
import { computeQuote, daysBetween, getProduct } from "@/lib/data";

describe("booking quote", () => {
  const p = getProduct("malibu-9")!; // 22 €/jour, caution 300 €
  it("deposit mode charges 30% now", () => {
    const q = computeQuote(p, 3, 1, "deposit");
    expect(q.total).toBe(68);
    expect(q.dueNow).toBe(20.4);
    expect(q.dueAtPickup).toBe(47.6);
  });
  it("full mode charges everything now", () => {
    expect(computeQuote(p, 3, 1, "full").dueAtPickup).toBe(0);
  });
  it("caution scales with quantity", () => {
    expect(computeQuote(p, 1, 2, "full").caution).toBe(600);
  });
  it("counts days inclusively", () => {
    expect(daysBetween("2026-07-01", "2026-07-03")).toBe(3);
  });
});
