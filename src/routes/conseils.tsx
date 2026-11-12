import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "@/lib/data";
import { PageHero } from "@/components/SiteChrome";

export const Route = createFileRoute("/conseils")({
  head: () => ({
    meta: [
      { title: "Conseils surf : choisir sa planche et lire les conditions — Surf Trotter" },
      { name: "description", content: "Guides pratiques pour choisir ta planche, comprendre houle, vent et marée, et surfer en sécurité." },
      { property: "og:title", content: "Conseils surf — Surf Trotter" },
      { property: "og:description", content: "Choisir sa planche, lire les conditions, règles de sécurité." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Tips,
});

function Tips() {
  return (
    <>
      <PageHero title="Le coin des tips" subtitle="Ce que j'aurais aimé qu'on me dise à mes débuts : quelle board prendre, comment lire un swell, et les règles du line-up pour pas te faire griller." />
      <div className="mx-auto max-w-3xl space-y-10 px-4">
        <nav className="flex flex-wrap gap-2">
          {articles.map((a) => <a key={a.slug} href={`#${a.slug}`} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-ocean">{a.title}</a>)}
        </nav>
        {articles.map((a) => (
          <article key={a.slug} id={a.slug} className="scroll-mt-24 rounded-3xl bg-card p-8 shadow-sm">
            <h2 className="text-3xl">{a.title}</h2>
            <p className="mt-2 text-muted-foreground">{a.excerpt}</p>
            <ul className="mt-5 space-y-3">
              {a.body.map((b) => <li key={b} className="flex gap-3 text-ocean"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />{b}</li>)}
            </ul>
          </article>
        ))}
        <div className="text-center"><Link to="/location" className="inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Trouver ma planche</Link></div>
      </div>
    </>
  );
}
