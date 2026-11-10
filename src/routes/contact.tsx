import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Store, TrendingUp, CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/SiteChrome";
import { field, btnPrimary } from "@/components/ProductCard";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Espace Pro surfshops — Surf Trotter" },
      { name: "description", content: "Une question ? Tu es un surfshop et veux proposer ton matériel à la location ? Contacte Surf Trotter." },
      { property: "og:title", content: "Contact & Espace Pro — Surf Trotter" },
      { property: "og:description", content: "Contacte-nous ou deviens surfshop partenaire." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [tab, setTab] = useState<"contact" | "pro">("contact");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(tab === "pro" ? "Merci ! Notre équipe partenaires te recontacte rapidement." : "Message envoyé, merci !");
    e.currentTarget.reset();
  };
  return (
    <>
      <PageHero title="Contact & Espace Pro" subtitle="Une question sur ta réservation ? Tu es un surfshop ? Écris-nous." />
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto flex w-fit gap-2 rounded-full bg-card p-1">
          {([["contact", "Nous contacter"], ["pro", "Espace Pro surfshops"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded-full px-5 py-2 text-sm font-semibold ${tab === k ? "bg-primary text-primary-foreground" : "text-ocean"}`}>{l}</button>
          ))}
        </div>
        {tab === "pro" && (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[[Store, "Visibilité", "Ton shop présenté aux surfeurs de passage."], [CalendarCheck, "Réservations", "Matériel bloqué par acompte, voucher QR au retrait."], [TrendingUp, "Revenus", "Optimise l'utilisation de ton parc de location."]].map(([I, t, d]) => {
              const Icon = I as typeof Store;
              return <div key={t as string} className="rounded-3xl bg-secondary p-6 text-secondary-foreground"><Icon /><p className="mt-2 font-display text-2xl">{t as string}</p><p className="text-sm opacity-90">{d as string}</p></div>;
            })}
          </div>
        )}
        <form onSubmit={submit} className="mx-auto mt-8 grid max-w-2xl gap-4 rounded-3xl bg-card p-8 shadow-sm sm:grid-cols-2">
          {tab === "pro" && <label className="text-xs font-semibold sm:col-span-2">Nom du surfshop<input required className={field} /></label>}
          {tab === "pro" && <label className="text-xs font-semibold">Spot / ville<input required className={field} /></label>}
          {tab === "pro" && <label className="text-xs font-semibold">Nombre de planches en location<input type="number" className={field} /></label>}
          <label className="text-xs font-semibold">Nom<input required className={field} /></label>
          <label className="text-xs font-semibold">E-mail<input type="email" required className={field} /></label>
          <label className="text-xs font-semibold sm:col-span-2">Message<textarea required rows={5} className={field} /></label>
          <button className={`${btnPrimary} sm:col-span-2`}>{tab === "pro" ? "Devenir partenaire" : "Envoyer"}</button>
        </form>
      </div>
    </>
  );
}
