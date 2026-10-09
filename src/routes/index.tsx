import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDownUp, ArrowUpRight, ChevronUp, Fuel, Gauge, Settings2, CalendarDays, Zap, CircleHelp, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { filterByBrand } from "@/lib/inventory-filter";
import bmw from "@/assets/bmw-m4.jpg";
import audi from "@/assets/audi-rs5.jpg";
import mercedes from "@/assets/mercedes-c63.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Tinac Customs | Cars for Sale" },
    { name: "description", content: "Explore the Tinac Customs car collection. Discover vehicles, prices, mileage, fuel economy and specifications." },
    { property: "og:title", content: "Tinac Customs | Cars for Sale" },
    { property: "og:description", content: "Discover the Tinac Customs car collection and explore vehicle prices and specifications." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const cars = [
  { id: "bmw", brand: "BMW", name: "BMW M4", year: 2020, trim: "3.0L Bi-Turbo · Competition", price: 48900, mileage: "28,450 mi", mpg: "23 MPG", transmission: "Automatic", engine: "3.0L I6", power: "444 hp", fuel: "Petrol", category: "Performance coupe", image: bmw, color: "Silver", drivetrain: "Rear-wheel drive", features: "Leather interior · Heated seats · Navigation · Parking sensors" },
  { id: "audi", brand: "Audi", name: "Audi RS5", year: 2021, trim: "2.9L TFSI · Quattro", price: 54500, mileage: "21,800 mi", mpg: "24 MPG", transmission: "Automatic", engine: "2.9L V6", power: "444 hp", fuel: "Petrol", category: "Performance coupe", image: audi, color: "Red", drivetrain: "All-wheel drive", features: "Virtual cockpit · Leather interior · Navigation · Heated seats" },
  { id: "mercedes", brand: "Mercedes-Benz", name: "Mercedes-AMG C63", year: 2019, trim: "4.0L V8 Bi-Turbo · AMG", price: 42900, mileage: "35,200 mi", mpg: "21 MPG", transmission: "Automatic", engine: "4.0L V8", power: "469 hp", fuel: "Petrol", category: "Performance sedan", image: mercedes, color: "White", drivetrain: "Rear-wheel drive", features: "Leather interior · Premium audio · Navigation · Reversing camera" },
];

function CarListing({ car, index }: { car: typeof cars[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const specs = [
    { label: "Mileage", value: car.mileage, icon: Gauge },
    { label: "Fuel economy", value: car.mpg, icon: Fuel },
    { label: "Transmission", value: car.transmission, icon: Settings2 },
    { label: "Engine", value: car.engine, icon: CalendarDays },
    { label: "Power", value: car.power, icon: Zap },
    { label: "Fuel type", value: car.fuel, icon: Fuel },
  ];
  return <article className="car-row">
    <div className="car-photo">
      <img src={car.image} alt={`${car.color} ${car.name}, front three-quarter view`} width={1536} height={1024} loading={index === 0 ? "eager" : "lazy"} />
      <span className="photo-label">Sample vehicle</span>
    </div>
    <div className="car-info">
      <span className="car-year">{car.year}</span>
      <div className="car-heading"><h3>{car.name}</h3><span className="car-price">${car.price.toLocaleString("en-US")}</span></div>
      <p className="car-trim">{car.trim}</p>
      <dl className="car-specs">{specs.map(({ label, value, icon: Icon }) => <div key={label}><dt><Icon aria-hidden="true" />{label}</dt><dd>{value}</dd></div>)}</dl>
      <div className="car-bottom"><span className="car-category">{car.category}</span><Button variant="ghost" className="car-details" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls={`details-${car.id}`}>{expanded ? "Less details" : "View details"}{expanded ? <ChevronUp /> : <ArrowUpRight />}</Button></div>
      {expanded && <div className="car-extra" id={`details-${car.id}`}><p><span className="text-foreground">Exterior:</span> {car.color} &nbsp;·&nbsp; {car.drivetrain}</p><p>{car.features}</p></div>}
    </div>
  </article>;
}

function Index() {
  const [sort, setSort] = useState("featured");
  const [brandSearch, setBrandSearch] = useState("");
  const sorted = filterByBrand(cars, brandSearch).sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : sort === "newest" ? b.year - a.year : 0);
  return <div className="site-container">
    <main>
      <section className="intro"><div className="eyebrow">Driven by distinction</div><h1>Tinac Customs<span className="text-foreground">.</span></h1><div className="intro-bottom"><p>Exceptional cars. Individual character.<br />Find the one that moves you.</p><span className="intro-index">THE COLLECTION / 01</span></div></section>
      <section id="inventory" aria-labelledby="inventory-title"><div className="inventory-toolbar"><div className="inventory-heading"><h2 id="inventory-title">The collection</h2><span className="inventory-count">{sorted.length} {sorted.length === 1 ? "car" : "cars"}</span></div><label className="sort-control"><ArrowDownUp size={14} /><span>Sort by</span><select value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort cars"><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="newest">Newest year</option></select></label></div><div className="brand-search"><Search size={17} aria-hidden="true"/><Input type="search" aria-label="Search by brand" placeholder="Search by brand — BMW, Audi, Mercedes…" value={brandSearch} onChange={event => setBrandSearch(event.target.value)} />{brandSearch && <Button variant="ghost" size="icon" aria-label="Clear brand search" onClick={() => setBrandSearch("")}><X /></Button>}</div><div className="car-list">{sorted.map((car, index) => <CarListing key={car.id} car={car} index={index} />)}</div>{sorted.length === 0 && <div className="inventory-empty"><Search size={24}/><h3>No matching cars</h3><p>No vehicles found for “{brandSearch}”.</p><Button variant="outline" onClick={() => setBrandSearch("")}>Clear search</Button></div>}</section>
      <p className="sample-note"><CircleHelp size={13} />Sample collection · Illustrative photos, prices in USD and vehicle specifications.</p>
    </main>

  </div>;
}
