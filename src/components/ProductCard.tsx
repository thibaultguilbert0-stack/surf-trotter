import { Link } from "@tanstack/react-router";
import boards from "@/assets/boards.jpg";
import shop from "@/assets/shop.jpg";
import hero from "@/assets/hero.jpg";
import { getShop, type Product } from "@/lib/data";
import { MapPin } from "lucide-react";

export const productImage = (p: Product) =>
  p.category === "Planches" ? boards : p.category === "Combinaisons" ? shop : hero;

export const field = "w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm text-ocean outline-none focus:ring-2 focus:ring-ring";
export const btnPrimary = "inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow hover:opacity-90 disabled:opacity-50";

export function ProductCard({ p }: { p: Product }) {
  const s = getShop(p.shopId);
  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img src={productImage(p)} alt={p.name} loading="lazy" width={600} height={400} className="h-48 w-full object-cover" />
      <div className="space-y-2 p-5">
        <div className="flex flex-wrap gap-1">
          {p.levels.map((l) => <span key={l} className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-ocean">{l}</span>)}
        </div>
        <h3 className="text-xl">{p.name}</h3>
        <p className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{s.name} · {s.spot}</p>
        <p className="text-sm text-muted-foreground">Taille {p.size} · Gabarit {p.weight}</p>
        <div className="flex items-center justify-between pt-2">
          <p className="text-ocean"><span className="text-2xl font-bold">{p.pricePerDay} €</span> /jour</p>
          <Link to="/location/$id" params={{ id: p.id }} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Réserver</Link>
        </div>
      </div>
    </article>
  );
}
