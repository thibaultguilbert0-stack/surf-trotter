import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, shops, spots, type Category } from "@/lib/data";
import { ProductCard, field } from "@/components/ProductCard";
import { PageHero } from "@/components/SiteChrome";

type S = { spot?: string | undefined; level?: string | undefined };

export const Route = createFileRoute("/location/")({
  validateSearch: (s: Record<string, unknown>): S => ({
    spot: typeof s["spot"] === "string" ? s["spot"] : undefined,
    level: typeof s["level"] === "string" ? s["level"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Location de planches de surf et matériel de surf : comparez les offres" },
      { name: "description", content: "Découvrez notre sélection de planches de surf et de matériel à louer. Comparez les modèles, les équipements et les tarifs pour trouver la planche adaptée à votre niveau." },
      { property: "og:title", content: "Location de matériel de surf — Surf Trotter" },
      { property: "og:description", content: "Planches, combinaisons, bodyboards et accessoires à louer dans les Landes et au Pays basque." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalog,
});

const cats: Category[] = ["Planches", "Combinaisons", "Bodyboards", "Accessoires"];

function Catalog() {
  const search = Route.useSearch();
  const [spot, setSpot] = useState(search.spot ?? "");
  const [level, setLevel] = useState(search.level ?? "");
  const [cat, setCat] = useState("");
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");
  const [max, setMax] = useState(30);

  const list = useMemo(() => products.filter((p) => {
    const shop = shops.find((s) => s.id === p.shopId)!;
    if (spot && shop.spot !== spot) return false;
    if (level && !p.levels.includes(level as never)) return false;
    if (cat && p.category !== cat) return false;
    if (type && p.boardType !== type) return false;
    if (p.pricePerDay > max) return false;
    if (weight) {
      const m = p.weight.match(/(\d+)\s*–\s*(\d+)/);
      if (m && (+weight < +m[1]! || +weight > +m[2]!)) return false;
    }
    return true;
  }), [spot, level, cat, type, max, weight]);

  return (
    <>
      <PageHero title="Location de matériel de surf : planches, combinaisons et accessoires" subtitle="Débutant ou confirmé, trouve l'équipement adapté à ton niveau et à ta pratique, chez les surfshops locaux." />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit space-y-4 rounded-3xl bg-card p-5 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-2xl">Filtres</h2>
          <label className="block text-xs font-semibold">Spot<select className={field} value={spot} onChange={(e) => setSpot(e.target.value)}><option value="">Tous</option>{spots.map((s) => <option key={s}>{s}</option>)}</select></label>
          <label className="block text-xs font-semibold">Niveau<select className={field} value={level} onChange={(e) => setLevel(e.target.value)}><option value="">Tous</option><option>Débutant</option><option>Intermédiaire</option><option>Confirmé</option></select></label>
          <label className="block text-xs font-semibold">Type de planche<select className={field} value={type} onChange={(e) => setType(e.target.value)}><option value="">Tous</option>{["Mousse", "Longboard", "Évolutive", "Fish", "Hybride", "Shortboard"].map((t) => <option key={t}>{t}</option>)}</select></label>
          <label className="block text-xs font-semibold">Ton gabarit (kg)<input type="number" placeholder="ex. 70" className={field} value={weight} onChange={(e) => setWeight(e.target.value)} /></label>
          <label className="block text-xs font-semibold">Budget max : {max} €/jour<input type="range" min={4} max={30} value={max} onChange={(e) => setMax(+e.target.value)} className="w-full accent-primary" /></label>
          <button onClick={() => { setSpot(""); setLevel(""); setCat(""); setType(""); setWeight(""); setMax(30); }} className="text-sm font-semibold text-primary">Réinitialiser</button>
        </aside>
        <div>
          <div className="flex flex-wrap gap-2">
            {["", ...cats].map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-semibold ${cat === c ? "bg-secondary text-secondary-foreground" : "bg-card text-ocean border border-border"}`}>{c || "Tout"}</button>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{list.length} équipement(s) disponible(s)</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
          {list.length === 0 && <p className="mt-10 text-center text-muted-foreground">Aucun résultat — élargis tes filtres.</p>}
        </div>
      </div>
    </>
  );
}
