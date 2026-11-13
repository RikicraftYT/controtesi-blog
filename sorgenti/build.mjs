// Controtesi — generatore del sito statico.
// Legge i file in contenuti/*.md e scrive le pagine HTML nella cartella superiore.
// Uso: npm install && npm run build
//
// Impostazioni (gruppi, tag, livelli, indirizzi): config.mjs.
// Moduli: lib/contenuti.mjs (lettura e controlli), lib/markdown.mjs (Markdown, formule),
// lib/grafici.mjs (grafici), lib/modelli.mjs (HTML), lib/ricerca.mjs (indice della ricerca).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITO } from "./config.mjs";
import { leggiContenuti } from "./lib/contenuti.mjs";
import { paginaArticolo, paginaSemplice, paginaIniziale, pagina404 } from "./lib/modelli.mjs";
import { indiceRicerca } from "./lib/ricerca.mjs";

const QUI = path.dirname(fileURLToPath(import.meta.url));
const USCITA = path.resolve(QUI, "..");
const MODULI = path.join(QUI, "node_modules");

const sito = leggiContenuti(path.join(QUI, "contenuti"));
const { articoli, pagine } = sito;

/* ---------- Scrittura ---------- */

const scrivi = (nome, testo) => {
  fs.mkdirSync(path.dirname(path.join(USCITA, nome)), { recursive: true });
  fs.writeFileSync(path.join(USCITA, nome), testo);
};
const copia = (da, a) => {
  fs.mkdirSync(path.dirname(a), { recursive: true });
  fs.copyFileSync(da, a);
};

scrivi("assets/js/indice-ricerca.js", indiceRicerca(articoli));
scrivi("index.html", paginaIniziale(sito));
scrivi("404.html", pagina404());
articoli.forEach((a, i) => scrivi(`${a.slug}.html`, paginaArticolo(a, i, sito)));
pagine.forEach((p) => scrivi(`${p.slug}.html`, paginaSemplice(p)));

const risorse = path.join(USCITA, "assets");
copia(path.join(QUI, "assets/css/style.css"), path.join(risorse, "css/style.css"));
for (const js of ["main.js", "formule.js"]) copia(path.join(QUI, "assets/js", js), path.join(risorse, "js", js));
copia(path.join(QUI, SITO.anteprima.file), path.join(risorse, "img", path.basename(SITO.anteprima.file)));

if (fs.existsSync(MODULI)) {
  copia(path.join(MODULI, "katex/dist/katex.min.css"), path.join(risorse, "katex/katex.min.css"));
  for (const f of fs.readdirSync(path.join(MODULI, "katex/dist/fonts"))) {
    if (f.endsWith(".woff2")) copia(path.join(MODULI, "katex/dist/fonts", f), path.join(risorse, "katex/fonts", f));
  }
  const caratteri = [
    "@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2",
    "@fontsource-variable/newsreader/files/newsreader-latin-wght-normal.woff2",
    "@fontsource-variable/newsreader/files/newsreader-latin-wght-italic.woff2",
  ];
  for (const f of caratteri) copia(path.join(MODULI, f), path.join(risorse, "fonts", path.basename(f)));
}

console.log(`Scritte ${articoli.length + pagine.length + 2} pagine in ${USCITA}`);
