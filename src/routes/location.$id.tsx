import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Lock, ShieldCheck, MapPin, Printer } from "lucide-react";
import { getProduct, getShop, daysBetween, computeQuote, DEPOSIT_RATE } from "@/lib/data";
import { productImage, field, btnPrimary } from "@/components/ProductCard";

export const Route = createFileRoute("/location/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Louer ${loaderData.p.name} — Surf Trotter` : "Matériel introuvable" },
      { name: "description", content: loaderData?.p.description ?? "" },
      { property: "og:title", content: loaderData ? `Louer ${loaderData.p.name}` : "Surf Trotter" },
      { property: "og:description", content: loaderData?.p.description ?? "" },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Booking,
});

const steps = ["Dates", "Coordonnées", "Paiement", "Voucher"];
const today = new Date().toISOString().slice(0, 10);

function Booking() {
  const { p } = Route.useLoaderData();
  const shop = getShop(p.shopId);
  const [step, setStep] = useState(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [qty, setQty] = useState(1);
  const [info, setInfo] = useState({ name: "", email: "", phone: "", weight: "" });
  const [mode, setMode] = useState<"full" | "deposit">("deposit");
  const [card, setCard] = useState({ num: "", exp: "", cvc: "" });
  const [accept, setAccept] = useState(false);
  const [ref, setRef] = useState("");

  const days = daysBetween(start, end);
  const q = computeQuote(p, days, qty, mode);

  const canNext = [days > 0, !!(info.name && /\S+@\S+/.test(info.email) && info.phone), card.num.replace(/\s/g, "").length >= 16 && card.exp && card.cvc.length >= 3 && accept][step];

  const pay = () => setRef("ST-" + Math.random().toString(36).slice(2, 8).toUpperCase());

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/location" className="text-sm font-semibold text-primary">← Retour au catalogue</Link>
      <ol className="mt-6 flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <li key={s} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-secondary text-secondary-foreground" : "bg-card text-muted-foreground"}`}>
            {i < step ? <Check className="h-4 w-4" /> : <span>{i + 1}</span>} {s}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl bg-card p-6 shadow-sm">
          {step === 0 && (
            <div className="space-y-5">
              <div className="flex gap-4">
                <img src={productImage(p)} alt={p.name} width={160} height={120} className="h-28 w-36 rounded-2xl object-cover" />
                <div>
                  <h1 className="text-3xl">{p.name}</h1>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{shop.name}, {shop.spot}</p>
                  <p className="mt-1 text-sm text-ocean">{p.description}</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="text-xs font-semibold">Retrait le<input type="date" min={today} className={field} value={start} onChange={(e) => setStart(e.target.value)} /></label>
                <label className="text-xs font-semibold">Retour le<input type="date" min={start || today} className={field} value={end} onChange={(e) => setEnd(e.target.value)} /></label>
                <label className="text-xs font-semibold">Quantité<input type="number" min={1} max={5} className={field} value={qty} onChange={(e) => setQty(Math.max(1, Math.min(5, +e.target.value || 1)))} /></label>
              </div>
              <p className="text-sm text-muted-foreground">Taille {p.size} · Gabarit conseillé {p.weight} · Niveau {p.levels.join(", ")}</p>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <h2 className="text-3xl sm:col-span-2">Tes coordonnées</h2>
              <label className="text-xs font-semibold">Nom complet<input className={field} value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} /></label>
              <label className="text-xs font-semibold">E-mail<input type="email" className={field} value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} /></label>
              <label className="text-xs font-semibold">Téléphone<input className={field} value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} /></label>
              <label className="text-xs font-semibold">Ton poids (optionnel, pour le shop)<input className={field} value={info.weight} onChange={(e) => setInfo({ ...info, weight: e.target.value })} /></label>
            </div>
          )}

          {step === 2 && !ref && (
            <div className="space-y-5">
              <h2 className="text-3xl">Paiement sécurisé</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {([["deposit", `Acompte ${DEPOSIT_RATE * 100} %`, "Bloque ton matériel, solde au retrait"], ["full", "Paiement intégral", "Tout est réglé, retrait express"]] as const).map(([m, t, d]) => (
                  <button key={m} type="button" onClick={() => setMode(m)} className={`rounded-2xl border-2 p-4 text-left ${mode === m ? "border-primary bg-primary/10" : "border-border"}`}>
                    <p className="font-semibold text-ocean">{t}</p><p className="text-sm text-muted-foreground">{d}</p>
                    <p className="mt-2 text-xl font-bold text-primary">{computeQuote(p, days, qty, m).dueNow.toFixed(2)} €</p>
                  </button>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="text-xs font-semibold sm:col-span-3">Numéro de carte<input inputMode="numeric" placeholder="4242 4242 4242 4242" className={field} value={card.num} onChange={(e) => setCard({ ...card, num: e.target.value.replace(/[^\d ]/g, "").slice(0, 19) })} /></label>
                <label className="text-xs font-semibold">Expiration<input placeholder="MM/AA" className={field} value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value.slice(0, 5) })} /></label>
                <label className="text-xs font-semibold">CVC<input placeholder="123" className={field} value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })} /></label>
              </div>
              <div className="rounded-2xl bg-accent/60 p-4 text-sm text-ocean">
                <p className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4" />Caution : {q.caution} €</p>
                <p className="mt-1">La caution n'est pas débitée : une empreinte bancaire est réalisée par le shop au retrait et libérée au retour du matériel en bon état.</p>
              </div>
              <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} className="mt-1 accent-primary" />J'accepte les conditions de location et d'annulation.</label>
              <p className="text-xs text-muted-foreground">Mode démonstration : aucun paiement réel n'est effectué.</p>
            </div>
          )}

          {step === 3 && ref && (
            <div className="text-center">
              <h2 className="text-4xl">C'est réservé ! 🤙</h2>
              <p className="mt-2 text-muted-foreground">Présente ce voucher au shop pour retirer ton matériel.</p>
              <div className="mx-auto mt-6 max-w-sm rounded-3xl border-2 border-dashed border-primary bg-background p-6">
                <p className="font-display text-2xl text-ocean">Surf Trotter</p>
                <div className="mx-auto mt-4 w-fit rounded-xl bg-card p-3"><QRCodeSVG value={`SURFTROTTER|${ref}|${p.id}|${start}|${end}|${qty}`} size={170} /></div>
                <p className="mt-3 font-mono text-lg font-bold text-ocean">{ref}</p>
                <div className="mt-4 space-y-1 text-left text-sm text-ocean">
                  <p><b>{qty} × {p.name}</b></p>
                  <p>Du {new Date(start).toLocaleDateString("fr-FR")} au {new Date(end).toLocaleDateString("fr-FR")}</p>
                  <p>{shop.name} — {shop.address}</p>
                  <p>Horaires : {shop.hours}</p>
                  <p>Payé : {q.dueNow.toFixed(2)} € · Reste au retrait : {q.dueAtPickup.toFixed(2)} €</p>
                  <p>Caution (empreinte) : {q.caution} €</p>
                </div>
              </div>
              <button onClick={() => window.print()} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary"><Printer className="h-4 w-4" />Imprimer le voucher</button>
            </div>
          )}

          {step < 3 && (
            <div className="mt-8 flex justify-between">
              <button disabled={step === 0} onClick={() => setStep(step - 1)} className="font-semibold text-ocean disabled:opacity-30">← Retour</button>
              <button disabled={!canNext} onClick={() => { if (step === 2) pay(); setStep(step + 1); }} className={btnPrimary}>
                {step === 2 ? <><Lock className="mr-2 h-4 w-4" />Payer {q.dueNow.toFixed(2)} €</> : "Continuer"}
              </button>
            </div>
          )}
        </div>

        <aside className="h-fit space-y-3 rounded-3xl bg-ocean p-6 text-ocean-foreground lg:sticky lg:top-24">
          <h2 className="text-2xl text-ocean-foreground">Récapitulatif</h2>
          <Row l={`${p.pricePerDay} € × ${days || 0} jour(s) × ${qty}`} v={q.rental} />
          <Row l="Frais de service" v={q.fee} />
          <div className="border-t border-ocean-foreground/20 pt-3"><Row l="Total location" v={q.total} bold /></div>
          <Row l={mode === "full" ? "À payer maintenant" : `Acompte (${DEPOSIT_RATE * 100} %)`} v={q.dueNow} />
          <Row l="Reste à payer au retrait" v={q.dueAtPickup} />
          <div className="rounded-2xl bg-ocean-foreground/10 p-3 text-sm"><Row l="Caution (non débitée)" v={q.caution} /></div>
          <p className="flex items-center gap-2 text-xs opacity-80"><Lock className="h-3 w-3" />Paiement chiffré · Annulation gratuite jusqu'à 48 h avant</p>
        </aside>
      </div>
    </div>
  );
}

function Row({ l, v, bold }: { l: string; v: number; bold?: boolean }) {
  return <div className={`flex justify-between text-sm ${bold ? "text-lg font-bold" : ""}`}><span>{l}</span><span>{v.toFixed(2)} €</span></div>;
}
