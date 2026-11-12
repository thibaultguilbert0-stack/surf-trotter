import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Clock, Star } from "lucide-react";
import shopImg from "@/assets/shop.jpg";
import { shops, products } from "@/lib/data";
import { PageHero } from "@/components/SiteChrome";

export const Route = createFileRoute("/ou-louer")({
  head: () => ({
    meta: [
      { title: "Où louer une planche de surf ? Landes et Pays basque — Surf Trotter" },
      { name: "description", content: "Spots et surfshops partenaires à Hossegor, Seignosse, Capbreton, Biscarrosse, Biarritz, Anglet, Bidart et Saint-Jean-de-Luz." },
      { property: "og:title", content: "Où louer ? Spots et surfshops partenaires" },
      { property: "og:description", content: "Les meilleurs surfshops des Landes et du Pays basque." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Where,
});

function Where() {
  return (
    <>
      <PageHero title="Où louer ?" subtitle="De Biscarrosse à Saint-Jean-de-Luz, les shops qu'on kiffe, tenus par des locaux qui connaissent chaque banc de sable." />
      {(["Landes", "Pays basque"] as const).map((region) => (
        <section key={region} className="mx-auto max-w-7xl px-4 py-8">
          <h2 className="text-4xl">{region}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {shops.filter((s) => s.region === region).map((s) => (
              <article key={s.id} className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-sm sm:flex-row">
                <img src={shopImg} alt={s.name} loading="lazy" width={300} height={300} className="h-48 w-full object-cover sm:h-auto sm:w-48" />
                <div className="space-y-2 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{s.spot}</p>
                  <h3 className="text-2xl">{s.name}</h3>
                  <p className="text-sm text-ocean">{s.description}</p>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{s.address}</p>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{s.hours}</p>
                  <p className="flex items-center gap-1 text-sm text-primary"><Star className="h-4 w-4 fill-current" />{s.rating} · {products.filter((p) => p.shopId === s.id).length} équipement(s)</p>
                  <Link to="/location" search={{ spot: s.spot }} className="inline-block pt-1 font-semibold text-primary">Voir le matériel →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
