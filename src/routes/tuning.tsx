import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowLeft, ArrowUpRight, Sparkles, MoveHorizontal, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import exterior from "@/assets/cla-exterior.jpg";
import before from "@/assets/cla-interior-before.jpg";
import after from "@/assets/cla-interior-after.jpg";

export const Route = createFileRoute("/tuning")({
  head: () => ({meta: [
    {title: "Tuning & Starlight Configurator | Tinac Customs"},
    {name: "description", content: "Make it yours with Tinac Customs tuning. Explore a Mercedes CLA and compare a custom starlight headliner with its original interior."},
    {property: "og:title", content: "Tuning & Starlights | Tinac Customs"},
    {property: "og:description", content: "Explore the Mercedes CLA starlight headliner configurator from Tinac Customs."},
    {property: "og:type", content: "website"},
    {name: "twitter:card", content: "summary_large_image"},
  ]}),
  component: Tuning,
});

function Tuning() {
  const [interior, setInterior] = useState(false);
  const [reveal, setReveal] = useState(50);
  function updateReveal(event: PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setReveal(Math.round(Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100))));
  }
  function reset() { setInterior(false); setReveal(50); }
  return <main className="tuning-page site-container">
    <section className="tuning-intro"><div className="eyebrow">Tinac Customs / Tuning studio</div><div className="tuning-title-row"><h1>Make it <span>yours.</span></h1><p>Beyond factory.<br />Built around you.</p></div></section>
    <section className="configurator" aria-label="Mercedes CLA configurator">
      <div className="config-topline"><div><span className="config-kicker">Your canvas</span><h2>Mercedes-Benz CLA</h2></div><span className="config-view-label">{interior ? "02 / INTERIOR" : "01 / EXTERIOR"}</span></div>
      <figure className={`config-stage ${interior ? "is-interior" : ""}`} style={{"--reveal": `${reveal}%`} as CSSProperties} onPointerDown={event => { if (!interior) return; event.currentTarget.setPointerCapture(event.pointerId); updateReveal(event); }} onPointerMove={event => { if (interior && event.currentTarget.hasPointerCapture(event.pointerId)) updateReveal(event); }}>
        <img className="exterior-image" src={exterior} alt="Silver Mercedes-Benz CLA in the Tinac Customs studio" width={1536} height={1024} fetchPriority="high" />
        <div className="interior-images" aria-hidden={!interior}>
          <img src={before} alt="Original Mercedes CLA black headliner without starlights" width={1536} height={1024} />
          <img className="starlight-image" src={after} alt="Mercedes CLA headliner fitted with white fiber-optic starlights" width={1536} height={1024} />
          <div className="comparison-divider" aria-hidden="true"><span><MoveHorizontal size={20}/></span></div>
          <div className="comparison-captions" aria-hidden="true"><span>Starlight</span><span>Original</span></div>
        </div>
        <span className="studio-stamp">TINAC / CUSTOMS</span>
      </figure>
      <div className="config-controls"><div className="config-option"><span className="config-kicker">01 / Interior customisation</span><Button variant="outline" className={`starlight-option ${interior ? "option-active" : ""}`} onClick={() => setInterior(true)} aria-pressed={interior}><Sparkles /><span>Starlights</span><ArrowUpRight /></Button></div>
        <div className="config-adjustment">{interior ? <><div className="slider-heading"><span id="roof-slider-label">Headliner comparison</span><span className="text-primary">{reveal}% starlight</span></div><Slider value={[reveal]} onValueChange={value => setReveal(value[0] ?? 0)} min={0} max={100} step={1} aria-labelledby="roof-slider-label" aria-valuetext={`${reveal}% starlight reveal`} className="roof-slider" /><div className="slider-endpoints"><span>Original</span><span>Starlight</span></div></> : <div className="config-idle"><Sparkles size={20}/><span>A little night sky.<br /><strong>A completely different interior.</strong></span></div>}</div>
        <div className="config-actions"><Button variant="ghost" size="icon" onClick={reset} aria-label="Reset configuration" title="Reset configuration"><RotateCcw /></Button>{interior && <Button variant="ghost" className="exterior-back" onClick={() => setInterior(false)}><ArrowLeft />Exterior</Button>}</div>
      </div>
      <p className="config-disclaimer">Visual concept · Mercedes CLA · Starlight headliner</p>
    </section>
  </main>;
}
