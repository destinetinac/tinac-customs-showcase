export function filterByBrand<T extends { brand: string }>(cars: T[], query: string): T[] {
  const search = query.trim().toLowerCase();
  return cars.filter(car => car.brand.toLowerCase().includes(search));
}
