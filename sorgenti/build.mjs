// Controtesi — generatore del sito statico.
// Legge i file in contenuti/ e scrive il sito in ../sito/ (vedi lib/percorsi.mjs).
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
import { CONTENUTI, USCITA as CARTELLA_SITO } from "./lib/percorsi.mjs";
import { paginaArticolo, paginaSemplice, paginaIniziale, pagina404, paginaSpostata, sitemap, feed,
  impostaAnteprime, CARTELLA_ANTEPRIME } from "./lib/modelli.mjs";
import { indiceRicerca } from "./lib/ricerca.mjs";

const QUI = path.dirname(fileURLToPath(import.meta.url));
const USCITA = CARTELLA_SITO;
const MODULI = path.join(QUI, "node_modules");

const sito = leggiContenuti(CONTENUTI);
const { articoli, pagine } = sito;

// Anteprime per articolo già generate (npm run anteprime).
const cartellaAnteprime = path.join(USCITA, CARTELLA_ANTEPRIME);
impostaAnteprime(fs.existsSync(cartellaAnteprime)
  ? fs.readdirSync(cartellaAnteprime).filter((f) => f.endsWith(".png")).map((f) => f.slice(0, -4)) : []);

/* ---------- Scrittura ---------- */

const scrivi = (nome, testo) => {
  fs.mkdirSync(path.dirname(path.join(USCITA, nome)), { recursive: true });
  fs.writeFileSync(path.join(USCITA, nome), testo);
};
const copia = (da, a) => {
  fs.mkdirSync(path.dirname(a), { recursive: true });
  fs.copyFileSync(da, a);
};

const generate = new Set();
const pagina = (nome, testo) => { generate.add(nome); scrivi(nome, testo); };

scrivi("assets/js/indice-ricerca.js", indiceRicerca(articoli));
scrivi("sitemap.xml", sitemap(sito));
scrivi("feed.xml", feed(sito));
pagina("index.html", paginaIniziale(sito));
pagina("404.html", pagina404());
articoli.forEach((a, i) => pagina(`${a.slug}.html`, paginaArticolo(a, i, sito)));
pagine.forEach((p) => pagina(`${p.slug}.html`, paginaSemplice(p)));
// Vecchi indirizzi (campo "vecchi"): una pagina che rimanda a quello nuovo.
for (const p of [...articoli, ...pagine]) for (const v of p.vecchi) pagina(`${v}.html`, paginaSpostata(p));

// Pagine orfane: un HTML nella radice che la build non ha scritto apparteneva a un
// articolo eliminato o rinominato senza "vecchi", e va tolto.
for (const f of fs.readdirSync(USCITA)) {
  if (f.endsWith(".html") && !generate.has(f)) {
    fs.rmSync(path.join(USCITA, f));
    console.log(`Tolta la pagina orfana ${f}: nessun file in contenuti/ la genera più.`);
  }
}

const risorse = path.join(USCITA, "assets");
copia(path.join(QUI, "assets/css/style.css"), path.join(risorse, "css/style.css"));
for (const js of ["main.js", "formule.js"]) copia(path.join(QUI, "assets/js", js), path.join(risorse, "js", js));
for (const img of [SITO.anteprima.file, "assets/img/icona-180.png"]) copia(path.join(QUI, img), path.join(risorse, "img", path.basename(img)));

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

console.log(`Scritte ${generate.size} pagine in ${USCITA}, più indice di ricerca, sitemap e feed.`);
