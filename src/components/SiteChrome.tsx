import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Waves } from "lucide-react";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/location", label: "Location de matériel" },
  { to: "/ou-louer", label: "Où louer ?" },
  { to: "/conseils", label: "Conseils surf" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl text-ocean">
          <Waves className="h-7 w-7 text-secondary" /> Surf Trotter
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-medium text-ocean/80 hover:text-primary" activeProps={{ className: "text-primary" }} activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/location" className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 lg:inline-flex">
          Trouver ma planche
        </Link>
        <button className="lg:hidden text-ocean" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-3 border-t border-border px-4 py-4 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-medium text-ocean">{n.label}</Link>
          ))}
          <Link to="/location" onClick={() => setOpen(false)} className="rounded-full bg-primary px-5 py-2 text-center font-semibold text-primary-foreground">Trouver ma planche</Link>
        </nav>
      )}
    </header>
  );
}

export function WaveDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 60" className={`block w-full ${className}`} preserveAspectRatio="none" aria-hidden>
      <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 text-ocean">
      <WaveDivider />
      <div className="bg-ocean text-ocean-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
          <div>
            <p className="font-display text-3xl">Surf Trotter</p>
            <p className="mt-2 text-sm opacity-80">La marketplace de location de matériel de surf des Landes et du Pays basque.</p>
          </div>
          <div className="text-sm space-y-2">
            <p className="font-semibold">Explorer</p>
            {nav.slice(1).map((n) => <Link key={n.to} to={n.to} className="block opacity-80 hover:opacity-100">{n.label}</Link>)}
          </div>
          <div className="text-sm space-y-2">
            <p className="font-semibold">Destinations</p>
            <p className="opacity-80">Hossegor · Seignosse · Capbreton · Biscarrosse</p>
            <p className="opacity-80">Biarritz · Anglet · Bidart · Saint-Jean-de-Luz</p>
          </div>
          <div className="text-sm space-y-2">
            <p className="font-semibold">Surfshops</p>
            <Link to="/contact" className="block opacity-80 hover:opacity-100">Devenir partenaire — Espace Pro</Link>
          </div>
        </div>
        <p className="pb-6 text-center text-xs opacity-60">© 2026 Surf Trotter — Fait avec amour sur la côte atlantique</p>
      </div>
    </footer>
  );
}

export function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-accent/50">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
      </div>
      <WaveDivider className="text-background" />
    </section>
  );
}
