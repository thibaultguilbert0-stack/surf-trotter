import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Star, Compass, Store, Search, Heart } from "lucide-react";
import hero from "@/assets/hero.jpg";
import shop from "@/assets/shop.jpg";
import boards from "@/assets/boards.jpg";
import { products, shops, spots, articles, reviews } from "@/lib/data";
import { ProductCard, field, btnPrimary } from "@/components/ProductCard";
import { WaveDivider } from "@/components/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Surf Trotter — Trouve ta planche, vis tes vagues" },
      { name: "description", content: "Loue facilement ton matériel de surf auprès des surfshops des Landes et du Pays basque." },
      { property: "og:title", content: "Surf Trotter — Trouve ta planche, vis tes vagues" },
      { property: "og:description", content: "Marketplace de location de planches de surf dans les Landes et au Pays basque." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [spot, setSpot] = useState("");
  const [level, setLevel] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <section className="relative">
        <img src={hero} alt="Surfeur sur la plage d'Hossegor" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ocean/45" />
        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-28 text-center">
          <h1 className="text-5xl text-ocean-foreground md:text-7xl">Trouve ta planche, vis tes vagues.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ocean-foreground/90">
            Loue facilement ton matériel de surf auprès des surfshops locaux et trouve l'équipement adapté à ton niveau et à tes envies.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/location", search: { spot: spot || undefined, level: level || undefined } }); }}
            className="mx-auto mt-10 grid max-w-5xl gap-3 rounded-3xl bg-card p-4 text-left shadow-2xl md:grid-cols-5"
          >
            <label className="text-xs font-semibold text-ocean">Destination
              <select className={field} value={spot} onChange={(e) => setSpot(e.target.value)}>
                <option value="">Toutes</option>{spots.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label className="text-xs font-semibold text-ocean">Date de début<input type="date" className={field} value={start} onChange={(e) => setStart(e.target.value)} /></label>
            <label className="text-xs font-semibold text-ocean">Date de fin<input type="date" className={field} value={end} min={start} onChange={(e) => setEnd(e.target.value)} /></label>
            <label className="text-xs font-semibold text-ocean">Niveau
              <select className={field} value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="">Tous</option><option>Débutant</option><option>Intermédiaire</option><option>Confirmé</option>
              </select>
            </label>
            <button className={`${btnPrimary} self-end`}><Search className="mr-2 h-4 w-4" />Trouver du matériel</button>
          </form>
        </div>
        <WaveDivider className="relative text-background" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-4xl md:text-5xl">Le surf, simplement.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            [Compass, "Choisis ta destination et ton matériel."],
            [Store, "Compare les équipements des surfshops partenaires."],
            [Heart, "Réserve ton matériel et profite des vagues."],
          ].map(([Icon, t], i) => {
            const I = Icon as typeof Compass;
            return (
              <div key={i} className="rounded-3xl bg-card p-8 shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground"><I /></div>
                <p className="mt-2 font-display text-3xl text-primary">{i + 1}</p>
                <p className="text-ocean">{t as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-end justify-between"><h2 className="text-4xl">La sélection du moment</h2><Link to="/location" className="font-semibold text-primary">Tout le catalogue →</Link></div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.filter((p) => ["malibu-9", "evo-7", "combi-43", "body-42"].includes(p.id)).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-4xl">Destinations populaires</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {shops.map((s, i) => (
            <Link key={s.id} to="/location" search={{ spot: s.spot }} className="group relative h-44 overflow-hidden rounded-3xl">
              <img src={[hero, boards, shop][i % 3]} alt={s.spot} loading="lazy" width={400} height={300} className="h-full w-full object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ocean/80 to-transparent p-4">
                <p className="font-display text-2xl text-ocean-foreground">{s.spot}</p>
                <p className="text-xs text-ocean-foreground/80">{s.region} · Découvrir les locations</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16 text-secondary-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-4xl text-secondary-foreground">Pourquoi choisir Surf Trotter ?</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {["Du matériel adapté à ton niveau", "Des surfshops locaux et passionnés", "Une recherche simple et centralisée", "Paiement sécurisé, acompte possible"].map((t) => (
              <div key={t} className="rounded-3xl bg-background/10 p-6 text-center font-semibold">{t}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-4xl">Ils ont surfé avec nous</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-3xl bg-card p-6 shadow-sm">
              <div className="flex text-primary">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-3 text-ocean">« {r.text} »</blockquote>
              <figcaption className="mt-3 text-sm text-muted-foreground">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-end justify-between"><h2 className="text-4xl">Conseils surf</h2><Link to="/conseils" className="font-semibold text-primary">Tous les guides →</Link></div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.slug} to="/conseils" hash={a.slug} className="rounded-3xl border border-border bg-card p-6 hover:shadow-lg">
              <h3 className="text-2xl">{a.title}</h3><p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-4xl rounded-[2.5rem] bg-ocean px-6 py-14 text-center text-ocean-foreground">
        <h2 className="text-4xl text-ocean-foreground md:text-5xl">Prêt pour ta prochaine session ?</h2>
        <p className="mt-3 opacity-80">Reçois nos bons plans et les meilleures conditions de la semaine.</p>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Merci ! Tu es inscrit·e à la newsletter."); setEmail(""); }} className="mx-auto mt-6 flex max-w-md gap-2">
          <input type="email" required placeholder="ton@email.fr" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
          <button className={btnPrimary}>OK</button>
        </form>
        <Link to="/location" className={`${btnPrimary} mt-6`}>Trouver ma planche</Link>
      </section>
    </>
  );
}
