export type Level = "Débutant" | "Intermédiaire" | "Confirmé";
export type Category = "Planches" | "Combinaisons" | "Bodyboards" | "Accessoires";

export interface Shop {
  id: string;
  name: string;
  spot: string;
  region: "Landes" | "Pays basque";
  address: string;
  hours: string;
  description: string;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  boardType?: string;
  size: string;
  levels: Level[];
  weight: string; // gabarit conseillé
  pricePerDay: number;
  deposit: number; // caution
  shopId: string;
  description: string;
}

export const DEPOSIT_RATE = 0.3; // acompte pour bloquer le matériel
export const SERVICE_FEE = 2; // frais de service fixes par réservation

export const shops: Shop[] = [
  { id: "hossegor-wave", name: "Hossegor Wave Shop", spot: "Hossegor", region: "Landes", address: "12 av. de la Plage, 40150 Hossegor", hours: "9h – 19h, 7j/7", description: "Shop historique de la Gravière, spécialiste shortboards et conseils de spot.", rating: 4.9 },
  { id: "seignosse-surf", name: "Les Estagnots Surf", spot: "Seignosse", region: "Landes", address: "Plage des Estagnots, 40510 Seignosse", hours: "8h30 – 19h30", description: "Au pied des dunes, idéal pour débuter avec des mousses et des longboards.", rating: 4.8 },
  { id: "capbreton-board", name: "Capbreton Board Co.", spot: "Capbreton", region: "Landes", address: "3 quai de la Pêcherie, 40130 Capbreton", hours: "9h – 18h30", description: "Atelier de shape familial, planches entretenues avec soin.", rating: 4.7 },
  { id: "biscarrosse-ride", name: "Bisca Ride", spot: "Biscarrosse", region: "Landes", address: "Bd des Sables, 40600 Biscarrosse", hours: "9h – 19h", description: "Location famille, bodyboards et combinaisons toutes tailles.", rating: 4.6 },
  { id: "biarritz-cote", name: "Côte des Basques Surf", spot: "Biarritz", region: "Pays basque", address: "Bd du Prince de Galles, 64200 Biarritz", hours: "9h – 20h", description: "Le berceau du surf européen : longboards et ambiance vintage.", rating: 4.9 },
  { id: "anglet-chambre", name: "Anglet Chambre d'Amour", spot: "Anglet", region: "Pays basque", address: "Esplanade des Gascons, 64600 Anglet", hours: "9h – 19h", description: "Beach breaks puissants, gamme performance et hybrides.", rating: 4.7 },
  { id: "bidart-erretegia", name: "Bidart Surf Etxea", spot: "Bidart", region: "Pays basque", address: "Plage d'Erretegia, 64210 Bidart", hours: "9h30 – 19h", description: "Petit shop basque chaleureux, matériel premium.", rating: 4.8 },
  { id: "sjdl-baie", name: "Baie de Luz Surf", spot: "Saint-Jean-de-Luz", region: "Pays basque", address: "Promenade Jacques Thibaud, 64500 Saint-Jean-de-Luz", hours: "9h – 19h", description: "Spécialiste paddle et longboard dans la baie protégée.", rating: 4.6 },
];

export const spots = shops.map((s) => s.spot);

export const products: Product[] = [
  { id: "mousse-8", name: "Mousse 8'0 Soft-Top", category: "Planches", boardType: "Mousse", size: "8'0", levels: ["Débutant"], weight: "50 – 95 kg", pricePerDay: 15, deposit: 150, shopId: "seignosse-surf", description: "Stable, flottante et sécurisante : la planche idéale pour tes premières vagues." },
  { id: "malibu-9", name: "Malibu 9'0 Classic", category: "Planches", boardType: "Longboard", size: "9'0", levels: ["Débutant", "Intermédiaire"], weight: "55 – 100 kg", pricePerDay: 22, deposit: 300, shopId: "biarritz-cote", description: "Le longboard vintage par excellence pour glisser sur la Côte des Basques." },
  { id: "evo-7", name: "Evolutive 7'2 Fun", category: "Planches", boardType: "Évolutive", size: "7'2", levels: ["Débutant", "Intermédiaire"], weight: "55 – 85 kg", pricePerDay: 20, deposit: 250, shopId: "capbreton-board", description: "Le parfait compromis pour progresser et commencer à tourner." },
  { id: "fish-5", name: "Fish 5'8 Retro", category: "Planches", boardType: "Fish", size: "5'8", levels: ["Intermédiaire", "Confirmé"], weight: "60 – 80 kg", pricePerDay: 25, deposit: 350, shopId: "bidart-erretegia", description: "Rapide et joueuse dans les petites vagues, double dérive." },
  { id: "short-6", name: "Shortboard 6'0 Pro", category: "Planches", boardType: "Shortboard", size: "6'0", levels: ["Confirmé"], weight: "60 – 80 kg", pricePerDay: 28, deposit: 400, shopId: "hossegor-wave", description: "Pour les journées creuses de la Gravière. Réactive et radicale." },
  { id: "hybrid-6", name: "Hybride 6'4 All-Round", category: "Planches", boardType: "Hybride", size: "6'4", levels: ["Intermédiaire"], weight: "65 – 90 kg", pricePerDay: 24, deposit: 350, shopId: "anglet-chambre", description: "Polyvalente, elle passe partout sur les beach breaks d'Anglet." },
  { id: "combi-43", name: "Combinaison 4/3 mm", category: "Combinaisons", size: "XS à XXL", levels: ["Débutant", "Intermédiaire", "Confirmé"], weight: "Toutes tailles", pricePerDay: 10, deposit: 100, shopId: "hossegor-wave", description: "Chaude et souple pour le printemps et l'automne atlantique." },
  { id: "shorty", name: "Shorty 2 mm", category: "Combinaisons", size: "XS à XL", levels: ["Débutant", "Intermédiaire", "Confirmé"], weight: "Toutes tailles", pricePerDay: 7, deposit: 60, shopId: "biscarrosse-ride", description: "Pour les sessions d'été dans une eau à plus de 20 °C." },
  { id: "body-42", name: "Bodyboard 42\"", category: "Bodyboards", size: "42\"", levels: ["Débutant", "Intermédiaire"], weight: "40 – 75 kg", pricePerDay: 9, deposit: 80, shopId: "biscarrosse-ride", description: "Le plaisir des vagues en famille, avec leash inclus." },
  { id: "body-pro", name: "Bodyboard PP Pro 41\"", category: "Bodyboards", size: "41\"", levels: ["Confirmé"], weight: "55 – 80 kg", pricePerDay: 14, deposit: 150, shopId: "anglet-chambre", description: "Noyau polypro, idéal pour les vagues puissantes." },
  { id: "palmes", name: "Palmes de bodyboard", category: "Accessoires", size: "35 à 46", levels: ["Débutant", "Intermédiaire", "Confirmé"], weight: "—", pricePerDay: 5, deposit: 40, shopId: "sjdl-baie", description: "Palmes courtes et confortables pour gagner en vitesse." },
  { id: "pack-acc", name: "Pack leash + wax + rack", category: "Accessoires", size: "Unique", levels: ["Débutant", "Intermédiaire", "Confirmé"], weight: "—", pricePerDay: 4, deposit: 30, shopId: "capbreton-board", description: "Tout le nécessaire pour transporter et surfer ta planche." },
];

export const getShop = (id: string) => shops.find((s) => s.id === id)!;
export const getProduct = (id: string) => products.find((p) => p.id === id);

export function daysBetween(start: string, end: string) {
  if (!start || !end) return 0;
  const d = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000) + 1;
  return d > 0 ? d : 0;
}

export function computeQuote(p: Product, days: number, qty: number, mode: "full" | "deposit") {
  const rental = p.pricePerDay * days * qty;
  const total = rental + SERVICE_FEE;
  const dueNow = mode === "full" ? total : Math.round(total * DEPOSIT_RATE * 100) / 100;
  return { rental, fee: SERVICE_FEE, total, dueNow, dueAtPickup: Math.round((total - dueNow) * 100) / 100, caution: p.deposit * qty };
}

export const articles = [
  { slug: "choisir-sa-planche", title: "Comment choisir sa planche de surf ?", excerpt: "Volume, longueur, gabarit : notre méthode simple pour trouver la planche qui te fera progresser.", body: ["Le volume (en litres) est le critère n°1 : un débutant vise environ son poids en litres, multiplié par 1 à 1,2.", "Commence par une mousse ou un malibu de 8 à 9 pieds : la stabilité accélère l'apprentissage.", "En progressant, passe à une évolutive (7'0 – 7'6) puis à une hybride ou un fish.", "Ton gabarit compte : plus tu es grand ou lourd, plus il te faut de volume."] },
  { slug: "lire-les-conditions", title: "Lire les conditions : houle, vent et marée", excerpt: "Période, direction du vent, coefficient : décrypte les prévisions avant d'aller à l'eau.", body: ["La hauteur seule ne suffit pas : regarde la période. Au-delà de 10 secondes, la houle est plus puissante et organisée.", "Un vent offshore (de terre) lisse les vagues ; un vent onshore les rend désordonnées.", "Dans les Landes, beaucoup de spots marchent mieux à mi-marée montante.", "Débutant ? Privilégie 0,5 à 1 m, peu de vent, et une plage surveillée."] },
  { slug: "securite", title: "Les règles de sécurité et de priorité", excerpt: "Baïnes, priorité, courants : les règles d'or pour surfer serein dans le Sud-Ouest.", body: ["Le surfeur le plus près du pic a la priorité : ne jamais lui couper la vague.", "Attention aux baïnes dans les Landes : ne lutte pas contre le courant, laisse-toi porter puis reviens sur le côté.", "Surfe toujours entre les drapeaux de la zone surf et jamais seul.", "Garde le leash attaché et protège ta tête en tombant."] },
];

export const reviews = [
  { name: "Camille, Lyon", text: "Réservé en 3 minutes, planche prête à Seignosse avec mon QR code. Parfait !", rating: 5 },
  { name: "Thomas, Paris", text: "Le shop m'a conseillé une évolutive adaptée à mon gabarit. J'ai enfin pris mes premières vertes.", rating: 5 },
  { name: "Ane, Bilbao", text: "L'option acompte est géniale pour bloquer le matériel en plein mois d'août.", rating: 5 },
];
