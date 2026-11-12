import { createFileRoute } from "@tanstack/react-router";
import boards from "@/assets/boards.jpg";
import { PageHero } from "@/components/SiteChrome";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos de Surf Trotter — Notre histoire et nos valeurs" },
      { name: "description", content: "Surf Trotter rend la location de matériel de surf simple et valorise les surfshops locaux du Sud-Ouest." },
      { property: "og:title", content: "À propos — Surf Trotter" },
      { property: "og:description", content: "Notre histoire et nos valeurs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero title="À propos" subtitle="Une bande de potes, des vans pleins de sable et une idée simple : que personne ne rate une session faute de board." />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <img src={boards} alt="Planches vintage devant un surfshop" loading="lazy" width={600} height={600} className="rounded-[2rem] shadow-lg" />
        <div className="space-y-4 text-ocean">
          <h2 className="text-4xl">Notre histoire</h2>
          <p>Tout est parti d'un constat simple : trouver la bonne planche en vacances, c'était courir de shop en shop sans savoir ce qui était disponible ni adapté à son niveau.</p>
          <p>Surf Trotter centralise l'offre des surfshops locaux des Landes et du Pays basque pour que chacun, du débutant au surfeur confirmé, réserve en quelques clics le matériel qui lui convient.</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-4xl">Nos valeurs</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {[["Authenticité", "La culture surf du Sud-Ouest, sans artifice."], ["Local", "Nous valorisons le savoir-faire des shops indépendants."], ["Accessibilité", "Le surf pour tous, quel que soit ton niveau."], ["Respect de l'océan", "Matériel entretenu et partagé plutôt qu'acheté."]].map(([t, d]) => (
            <div key={t} className="rounded-3xl bg-card p-6 shadow-sm"><h3 className="text-2xl text-primary">{t}</h3><p className="mt-2 text-sm text-ocean">{d}</p></div>
          ))}
        </div>
      </section>
    </>
  );
}
