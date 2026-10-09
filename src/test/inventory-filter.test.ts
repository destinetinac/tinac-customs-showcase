import { describe, expect, it } from "vitest";
import { filterByBrand } from "@/lib/inventory-filter";
const cars = [{brand:"BMW"},{brand:"Audi"},{brand:"Mercedes-Benz"}];
describe("inventory brand search", () => {
  it("matches a brand case-insensitively", () => { expect(filterByBrand(cars,"  mercedes ")).toEqual([{brand:"Mercedes-Benz"}]); });
  it("keeps all cars for an empty search", () => { expect(filterByBrand(cars,"")).toHaveLength(3); });
  it("returns no cars for an unknown brand", () => { expect(filterByBrand(cars,"Toyota")).toEqual([]); });
});
