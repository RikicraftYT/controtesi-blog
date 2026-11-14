// Lettura e controllo dei file in contenuti/: intestazione, testo, sezioni, durata.
// Usato dalla build, dalle verifiche e dal generatore delle anteprime.

import fs from "node:fs";
import path from "node:path";
import { md, impostaFile } from "./markdown.mjs";
import { fontiPerArticolo, htmlFonti } from "./fonti.mjs";
import { GRUPPI, LIVELLI, TAG } from "../config.mjs";

// Intestazione e corpo di un file Markdown. Le righe dell'intestazione sono "chiave: valore".
export function intestazione(grezzo, file) {
  const m = grezzo.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`Intestazione mancante in ${file}`);
  const dati = {};
  for (const riga of m[1].split("\n")) {
    const i = riga.indexOf(":");
    if (i > 0) dati[riga.slice(0, i).trim()] = riga.slice(i + 1).trim();
  }
  return { dati, corpo: m[2] };
}

// Parole del testo, senza grafici e formule su riga separata.
// Si contano solo le parole con almeno una lettera o una cifra: i "|" delle tabelle e i
// segni del Markdown non sono parole.
export const contaParole = (corpo) =>
  corpo.replace(/```grafico[\s\S]*?```/g, " ").replace(/\$\$[\s\S]*?\$\$/g, " ")
    .split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

const elenco = (s) => (s ?? "").split(",").map((t) => t.trim()).filter(Boolean);

function leggi(file) {
  impostaFile(path.basename(file));
  const { dati, corpo } = intestazione(fs.readFileSync(file, "utf8"), file);
  const tokens = md.parse(corpo, {});
  const sezioni = [];
  tokens.forEach((t, i) => {
    if (t.type === "heading_open" && t.tag === "h2") {
      sezioni.push({ id: t.attrGet("id"), testo: tokens[i + 1].content });
    }
  });
  const parole = contaParole(corpo);
  return {
    ...dati,
    file: path.basename(file),
    sorgente: corpo,
    html: md.renderer.render(tokens, md.options, {}),
    sezioni,
    parole,
    minuti: Math.max(1, Math.round(parole / 180)),
    get durata() { return this.minuti === 1 ? "1 minuto" : `${this.minuti} minuti`; },
  };
}

export function leggiContenuti(cartella) {
  const tutti = fs.readdirSync(cartella).filter((f) => f.endsWith(".md")).sort()
    .map((f) => leggi(path.join(cartella, f)));
  // Gli articoli seguono l'ordine dei gruppi (e, dentro ogni gruppo, quello dei file):
  // così "articolo precedente/successivo" ripercorre la home.
  const posizione = (a) => {
    const i = GRUPPI.findIndex((g) => g.id === a.gruppo);
    if (i < 0) throw new Error(`Gruppo "${a.gruppo}" sconosciuto in ${a.file}: aggiungilo a GRUPPI in config.mjs`);
    return i;
  };
  const articoli = tutti.filter((p) => p.tipo !== "pagina").sort((a, b) => posizione(a) - posizione(b));
  const pagine = tutti.filter((p) => p.tipo === "pagina");

  for (const a of articoli) {
    if (!LIVELLI[a.livello]) throw new Error(`Livello "${a.livello ?? ""}" non valido in ${a.file}: usa base, intermedio o avanzato`);
    a.base = a.livello === "base";
    if (!a.base && (!a.tesi || !a.obiezione)) throw new Error(`Tesi o obiezione mancante in ${a.file}`);
    a.tag = elenco(a.tag);
    if (!a.tag.length) throw new Error(`Nessun tag in ${a.file}`);
    for (const t of a.tag) if (!TAG.includes(t)) throw new Error(`Tag "${t}" in ${a.file} non è nel vocabolario TAG di config.mjs`);
    if (a.base) a.html = a.html.replace('<p class="voce-etichetta">Formulazione difendibile</p>', '<p class="voce-etichetta">In sintesi</p>');
  }
  // Slug unici, anche rispetto ai vecchi indirizzi (campo "vecchi") da reindirizzare.
  const usati = new Map();
  for (const p of [...articoli, ...pagine]) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug ?? "")) throw new Error(`Slug "${p.slug ?? ""}" non valido in ${p.file}: solo minuscole, cifre e trattini`);
    p.vecchi = elenco(p.vecchi);
    for (const s of [p.slug, ...p.vecchi]) {
      if (["index", "404"].includes(s)) throw new Error(`Lo slug "${s}" in ${p.file} è riservato`);
      if (usati.has(s)) throw new Error(`Lo slug "${s}" compare sia in ${usati.get(s)} sia in ${p.file}`);
      usati.set(s, p.file);
    }
  }
  for (const a of articoli) {
    a.prerequisiti = elenco(a.prima).map((slug) => {
      const b = articoli.find((x) => x.slug === slug);
      if (!b) throw new Error(`"prima: ${slug}" in ${a.file} non corrisponde a nessun articolo`);
      return b;
    });
  }
  // Fonti di ogni articolo, dalla pagina fonti.md (vedi lib/fonti.mjs).
  const paginaFonti = pagine.find((p) => p.slug === "fonti");
  const fonti = paginaFonti ? fontiPerArticolo(paginaFonti.sorgente) : new Map();
  for (const slug of fonti.keys()) {
    if (!articoli.some((a) => a.slug === slug)) throw new Error(`fonti.md ha una sezione per "${slug}.html", che non è un articolo`);
  }
  for (const a of articoli) {
    const blocco = fonti.get(a.slug);
    a.fonti = blocco ? { html: htmlFonti(blocco), id: blocco.id, urls: blocco.urls } : null;
  }
  const basi = articoli.filter((a) => a.gruppo === "basi");
  return { articoli, pagine, basi, fonti };
}
