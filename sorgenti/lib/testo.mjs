// Piccole utilità di testo: date in italiano, numeri in lettere, slug, escape HTML.

const MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio",
  "agosto", "settembre", "ottobre", "novembre", "dicembre"];
const MESI_BREVI = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];

// "2026-11-11" -> "l'11 novembre 2026"
export function dataEstesa(iso, file) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? "");
  if (!m) throw new Error(`Data "aggiornato" mancante o non valida (AAAA-MM-GG) in ${file}`);
  const g = Number(m[3]);
  const giorno = g === 1 ? "il 1º" : g === 8 || g === 11 ? `l'${g}` : `il ${g}`;
  return `${giorno} ${MESI[Number(m[2]) - 1]} ${m[1]}`;
}

// "2026-11-11" -> "11 nov 2026"
export const dataBreve = (iso) => { const [a, m, g] = iso.split("-"); return `${Number(g)} ${MESI_BREVI[Number(m) - 1]} ${a}`; };

// Numero in lettere, con la maiuscola, da 1 a 99: "Ventitré", "Quarantaquattro".
const UNITA = ["", "uno", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove", "dieci",
  "undici", "dodici", "tredici", "quattordici", "quindici", "sedici", "diciassette", "diciotto", "diciannove"];
const DECINE = ["", "", "venti", "trenta", "quaranta", "cinquanta", "sessanta", "settanta", "ottanta", "novanta"];
export function inLettere(n) {
  if (n < 1 || n > 99) return String(n);
  let t = n < 20 ? UNITA[n] : DECINE[Math.floor(n / 10)];
  if (n >= 20 && n % 10) {
    const u = UNITA[n % 10];
    t = (u === "uno" || u === "otto" ? t.slice(0, -1) : t) + (u === "tre" ? "tré" : u);
  }
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export const slugify = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");
