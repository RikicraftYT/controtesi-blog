// Indice della ricerca: titolo, tesi, sommario, tag, sezioni e testo semplice di ogni articolo.
// È un file JavaScript (non JSON) così funziona anche aprendo il sito dal disco, senza server;
// main.js lo carica solo quando si apre la ricerca.

import { GRUPPI, LIVELLI } from "../config.mjs";

const formulaLeggibile = (f) => f
  .replace(/\\(?:text|mathrm|operatorname)\{([^}]*)\}/g, "$1")
  .replace(/\\[a-zA-Z]+/g, " ")
  .replace(/\{,\}/g, ",")
  .replace(/[{}^_\\]/g, "")
  .replace(/\s+/g, " ")
  .trim();

export const testoPiano = (src) => src
  .replace(/```grafico[\s\S]*?```/g, " ")
  .replace(/\$\$[\s\S]*?\$\$/g, " … ")
  .replace(/\$([^$\n]*)\$/g, (_, f) => formulaLeggibile(f))
  .replace(/^\|[\s|:-]+\|$/gm, "")
  .replace(/^\|(.*)\|$/gm, (_, celle) => celle.split("|").map((c) => c.trim()).filter(Boolean).join(" · ") + ".")
  .replace(/^#{2,3}\s+(.+)$/gm, "$1 ·")
  .replace(/^:::\s*(obiezione|risposta|difendibile)?/gm, " ")
  .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
  .replace(/<[^>]+>/g, " ")
  .replace(/[#*_`>]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

export function indiceRicerca(articoli) {
  const voci = articoli.map((a) => ({
    s: a.slug,
    t: a.titolo,
    te: [a.tesi, a.obiezione].filter(Boolean).join(" "),
    so: a.sommario,
    g: GRUPPI.find((g) => g.id === a.gruppo).nome,
    l: LIVELLI[a.livello].nome,
    se: a.sezioni.map((x) => x.testo).join(" · "),
    tg: a.tag.join(" · "),
    x: testoPiano(a.sorgente),
  }));
  return `window.CONTROTESI_INDICE=${JSON.stringify(voci)};\n`;
}
