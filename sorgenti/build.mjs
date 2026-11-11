// Controtesi — generatore del sito statico.
// Legge i file in contenuti/*.md e scrive le pagine HTML nella cartella superiore.
// Uso: npm install && npm run build

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import container from "markdown-it-container";
import katexPluginModule from "@vscode/markdown-it-katex";

const katexPlugin = katexPluginModule.default ?? katexPluginModule;
const QUI = path.dirname(fileURLToPath(import.meta.url));
const USCITA = path.resolve(QUI, "..");
const MODULI = path.join(QUI, "node_modules");

const SITO = {
  nome: "Controtesi",
  motto: "Idee d'investimento messe alla prova",
};

const NUMERI = ["Zero", "Un", "Due", "Tre", "Quattro", "Cinque", "Sei", "Sette", "Otto", "Nove", "Dieci",
  "Undici", "Dodici", "Tredici", "Quattordici", "Quindici", "Sedici", "Diciassette", "Diciotto", "Diciannove", "Venti"];

const GRUPPI = [
  { id: "strumento", nome: "Lo strumento" },
  { id: "rendimenti", nome: "Quanto rende il mercato" },
  { id: "prezzi", nome: "I prezzi sono giusti?" },
  { id: "portafoglio", nome: "Come costruire il portafoglio" },
  { id: "sintesi", nome: "Tirare le fila" },
];

/* ---------- Markdown ---------- */

const slugify = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const md = new MarkdownIt({ html: true, typographer: false, linkify: false });
md.use(katexPlugin, { throwOnError: true });
md.use(anchor, { slugify, level: [2] });

const voce = (nome, etichetta) =>
  md.use(container, nome, {
    render(tokens, idx) {
      const t = tokens[idx];
      if (t.nesting !== 1) return "</section>\n";
      const titolo = t.info.trim().slice(nome.length).trim();
      const h = titolo ? `<h3 class="voce-titolo">${md.utils.escapeHtml(titolo)}</h3>` : "";
      return `<section class="voce ${nome}"><p class="voce-etichetta">${etichetta}</p>${h}\n`;
    },
  });
voce("obiezione", "Obiezione");
voce("risposta", "Risposta");
voce("difendibile", "Formulazione difendibile");

md.renderer.rules.table_open = () => '<div class="tabella"><table>\n';
md.renderer.rules.table_close = () => "</table></div>\n";

const linkBase = md.renderer.rules.link_open ?? ((t, i, o, e, self) => self.renderToken(t, i, o));
md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
  const href = tokens[idx].attrGet("href") ?? "";
  if (/^https?:/.test(href)) {
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noopener");
  }
  return linkBase(tokens, idx, opts, env, self);
};

/* ---------- Lettura dei contenuti ---------- */

function leggi(file) {
  const grezzo = fs.readFileSync(file, "utf8");
  const m = grezzo.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`Intestazione mancante in ${file}`);
  const dati = {};
  for (const riga of m[1].split("\n")) {
    const i = riga.indexOf(":");
    if (i > 0) dati[riga.slice(0, i).trim()] = riga.slice(i + 1).trim();
  }
  const tokens = md.parse(m[2], {});
  const sezioni = [];
  tokens.forEach((t, i) => {
    if (t.type === "heading_open" && t.tag === "h2") {
      sezioni.push({ id: t.attrGet("id"), testo: tokens[i + 1].content });
    }
  });
  const parole = m[2].replace(/\$\$[\s\S]*?\$\$/g, " ").split(/\s+/).filter(Boolean).length;
  return {
    ...dati,
    html: md.renderer.render(tokens, md.options, {}),
    sezioni,
    minuti: Math.max(1, Math.round(parole / 180)),
  };
}

const cartella = path.join(QUI, "contenuti");
const tutti = fs.readdirSync(cartella).filter((f) => f.endsWith(".md")).sort()
  .map((f) => leggi(path.join(cartella, f)));
const articoli = tutti.filter((p) => p.tipo !== "pagina");
const pagine = tutti.filter((p) => p.tipo === "pagina");

/* ---------- Modelli ---------- */

const esc = md.utils.escapeHtml;
const icona =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#ffe45c"/><path d="M9 23 23 9M9 9l14 14" stroke="#1d1633" stroke-width="4" stroke-linecap="round"/></svg>'
  );

function guscio({ titolo, descrizione, corpo, corrente = "", barra = false }) {
  const voce = (href, testo, classe = "") =>
    `<a href="${href}"${classe ? ` class="${classe}"` : ""}${corrente === href ? ' aria-current="page"' : ""}>${testo}</a>`;
  return `<!DOCTYPE html>
<html lang="it" data-theme="chiaro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titolo)}</title>
<meta name="description" content="${esc(descrizione)}">
<link rel="icon" href="${icona}">
<link rel="stylesheet" href="assets/katex/katex.min.css">
<link rel="stylesheet" href="assets/css/style.css">
<script>try{var t=localStorage.getItem("controtesi-tema")||(matchMedia("(prefers-color-scheme: dark)").matches?"scuro":"chiaro");document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>
</head>
<body>
<a class="salta" href="#contenuto">Vai al contenuto</a>
<header class="testata">
  <div class="testata-interno">
    <a class="marchio" href="index.html" aria-label="${SITO.nome}, pagina iniziale">Contro<span>tesi</span></a>
    <nav class="menu" aria-label="Principale">
      ${voce("index.html", "Articoli", "menu-inizio")}
      ${voce("come-stanno-insieme.html", "Mappa")}
      ${voce("fonti.html", "Fonti")}
    </nav>
    <button class="tema" type="button" aria-pressed="false" aria-label="Passa al tema scuro"><span class="tema-parola">Tema </span><span class="tema-nome">scuro</span></button>
  </div>
  ${barra ? '<div class="avanzamento" aria-hidden="true"></div>' : ""}
</header>
<main id="contenuto">
${corpo}
</main>
<footer class="piede">
  <div class="piede-interno">
    <p>${SITO.nome} raccoglie analisi di idee, non consulenza finanziaria. Ogni numero citato rimanda alla sua fonte.</p>
    <p><a href="fonti.html">Fonti e letture</a></p>
  </div>
</footer>
<script src="assets/js/main.js"></script>
</body>
</html>
`;
}

function paginaArticolo(a, i) {
  const gruppo = GRUPPI.find((g) => g.id === a.gruppo);
  const prima = articoli[i - 1];
  const dopo = articoli[i + 1];
  const sommario = a.sezioni.length
    ? `<aside class="sommario-pagina" aria-label="In questa pagina">
    <h2>In questa pagina</h2>
    <ol>${a.sezioni.map((s) => `<li><a href="#${s.id}">${esc(s.testo)}</a></li>`).join("")}</ol>
  </aside>`
    : "";
  const corpo = `<article>
<header class="articolo-testa">
  <p class="articolo-gruppo"><a href="index.html#${gruppo.id}">${esc(gruppo.nome)}</a></p>
  <h1>${esc(a.titolo)}</h1>
  <p class="articolo-sommario">${esc(a.sommario)}</p>
  <p class="articolo-tempo">${a.minuti} minuti di lettura</p>
  <div class="scontro">
    <p class="scontro-tesi"><b>La tesi</b>${esc(a.tesi)}</p>
    <p class="scontro-obiezione"><b>L'obiezione più forte</b>${esc(a.obiezione)}</p>
  </div>
</header>
<div class="articolo-corpo">
  <div class="prosa">
${a.html}
  </div>
  ${sommario}
</div>
</article>
<nav class="vicini" aria-label="Altri articoli">
  ${prima ? `<a class="prima" href="${prima.slug}.html"><small>Articolo precedente</small><b>${esc(prima.titolo)}</b></a>` : ""}
  ${dopo ? `<a class="dopo" href="${dopo.slug}.html"><small>Articolo successivo</small><b>${esc(dopo.titolo)}</b></a>` : ""}
</nav>`;
  return guscio({
    titolo: `${a.titolo} | ${SITO.nome}`,
    descrizione: a.sommario,
    corpo,
    corrente: `${a.slug}.html`,
    barra: true,
  });
}

function paginaSemplice(p) {
  const corpo = `<article class="pagina">
<header class="articolo-testa">
  <h1>${esc(p.titolo)}</h1>
</header>
<div class="articolo-corpo">
  <div class="prosa">
${p.html}
  </div>
</div>
</article>`;
  return guscio({ titolo: `${p.titolo} | ${SITO.nome}`, descrizione: p.sommario, corpo, corrente: `${p.slug}.html` });
}

function paginaIniziale() {
  const gruppi = GRUPPI.map((g) => {
    const righe = articoli.filter((a) => a.gruppo === g.id).map((a) => `
    <div class="duello">
      <div>
        <h3 class="duello-tesi"><a href="${a.slug}.html">${esc(a.tesi)}</a></h3>
        <p class="duello-articolo">${esc(a.titolo)}, ${a.minuti} minuti</p>
      </div>
      <p class="duello-obiezione">${esc(a.obiezione)}</p>
    </div>`).join("");
    return `  <section class="gruppo" id="${g.id}">
    <h2>${esc(g.nome)}</h2>${righe}
  </section>`;
  }).join("\n");

  const corpo = `<section class="apertura">
  <h1>Ogni tesi vale quanto la migliore obiezione a cui sa rispondere.</h1>
  <p>${NUMERI[articoli.length] ?? articoli.length} articoli su rendimenti, prezzi e portafogli. Ognuno parte dalla tesi nella sua forma più forte, poi le dà contro, con le formule e le fonti in vista.</p>
  <div class="apertura-azioni">
    <a class="bottone" href="${articoli[0].slug}.html">Comincia dal valore atteso</a>
    <a href="come-stanno-insieme.html">Guarda dove le teorie si contraddicono</a>
  </div>
</section>
<section class="indice" aria-label="Tutti gli articoli">
  <div class="indice-colonne" aria-hidden="true"><span>La tesi</span><span>L'obiezione più forte</span></div>
${gruppi}
</section>`;
  return guscio({
    titolo: `${SITO.nome} | ${SITO.motto}`,
    descrizione: "Teorie d'investimento con le loro obiezioni più forti e le risposte possibili.",
    corpo,
    corrente: "index.html",
  });
}

/* ---------- Scrittura ---------- */

const scrivi = (nome, testo) => fs.writeFileSync(path.join(USCITA, nome), testo);
const copia = (da, a) => {
  fs.mkdirSync(path.dirname(a), { recursive: true });
  fs.copyFileSync(da, a);
};

scrivi("index.html", paginaIniziale());
articoli.forEach((a, i) => scrivi(`${a.slug}.html`, paginaArticolo(a, i)));
pagine.forEach((p) => scrivi(`${p.slug}.html`, paginaSemplice(p)));

const risorse = path.join(USCITA, "assets");
copia(path.join(QUI, "assets/css/style.css"), path.join(risorse, "css/style.css"));
copia(path.join(QUI, "assets/js/main.js"), path.join(risorse, "js/main.js"));

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

console.log(`Scritte ${articoli.length + pagine.length + 1} pagine in ${USCITA}`);
