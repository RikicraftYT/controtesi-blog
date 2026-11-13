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
import katex from "katex";

const katexPlugin = katexPluginModule.default ?? katexPluginModule;
const QUI = path.dirname(fileURLToPath(import.meta.url));
const USCITA = path.resolve(QUI, "..");
const MODULI = path.join(QUI, "node_modules");

const SITO = {
  nome: "Controtesi",
  motto: "Idee d'investimento messe alla prova",
  // Indirizzo pubblico: serve solo ai link assoluti (anteprime social, canonical, pagina 404).
  url: "https://rikicraftyt.github.io/controtesi-blog/",
  anteprima: { file: "assets/img/anteprima.png", larghezza: 1200, altezza: 630,
    alt: "Controtesi. Idee d'investimento messe alla prova." },
};

// Sito dello stesso autore, segnalato in home, nel piè di pagina e negli articoli sul portafoglio.
const SIMULATORE = {
  nome: "Simulatore di portafogli",
  url: "https://portfolio-site-2zxf.onrender.com",
};

const MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio",
  "agosto", "settembre", "ottobre", "novembre", "dicembre"];

// "2026-11-11" -> "l'11 novembre 2026"
function dataEstesa(iso, file) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? "");
  if (!m) throw new Error(`Data "aggiornato" mancante o non valida (AAAA-MM-GG) in ${file}`);
  const g = Number(m[3]);
  const giorno = g === 1 ? "il 1º" : g === 8 || g === 11 ? `l'${g}` : `il ${g}`;
  return `${giorno} ${MESI[Number(m[2]) - 1]} ${m[1]}`;
}

// Numero in lettere, con la maiuscola, da 1 a 99: "Ventitré", "Quarantaquattro".
const UNITA = ["", "uno", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove", "dieci",
  "undici", "dodici", "tredici", "quattordici", "quindici", "sedici", "diciassette", "diciotto", "diciannove"];
const DECINE = ["", "", "venti", "trenta", "quaranta", "cinquanta", "sessanta", "settanta", "ottanta", "novanta"];
function inLettere(n) {
  if (n < 1 || n > 99) return String(n);
  let t = n < 20 ? UNITA[n] : DECINE[Math.floor(n / 10)];
  if (n >= 20 && n % 10) {
    const u = UNITA[n % 10];
    t = (u === "uno" || u === "otto" ? t.slice(0, -1) : t) + (u === "tre" ? "tré" : u);
  }
  return t.charAt(0).toUpperCase() + t.slice(1);
}

const GRUPPI = [
  { id: "basi", nome: "Per iniziare" },
  { id: "strumento", nome: "Il metro di giudizio" },
  { id: "rendimenti", nome: "Quanto rende il mercato" },
  { id: "prezzi", nome: "I prezzi sono giusti?" },
  { id: "portafoglio", nome: "Come costruire il portafoglio" },
  { id: "derivati", nome: "Opzioni e derivati" },
  { id: "esposizioni", nome: "Che cosa possiedi davvero" },
  { id: "vita", nome: "Dal risparmio alla pensione" },
  { id: "oltre", nome: "Oltre il portafoglio" },
  { id: "sintesi", nome: "Trarre le conclusioni" },
];

// Livelli di difficoltà. Gli articoli base non hanno tesi né obiezioni: spiegano.
const LIVELLI = {
  base: { nome: "Base", punti: 1 },
  intermedio: { nome: "Intermedio", punti: 2 },
  avanzato: { nome: "Avanzato", punti: 3 },
};
const etichettaLivello = (l) =>
  `<span class="livello" data-punti="${LIVELLI[l].punti}"><span class="livello-punti" aria-hidden="true"><i></i><i></i><i></i></span>` +
  `<span class="livello-nome"><span class="visivamente-nascosto">Livello </span>${LIVELLI[l].nome}</span></span>`;

// Vocabolario dei tag: un articolo può usare solo questi (campo "tag", separati da virgola).
const TAG = ["inflazione", "liquidità", "interesse composto", "rischio", "volatilità", "azioni", "obbligazioni",
  "oro", "fondi ed ETF", "costi", "tasse", "diversificazione", "asset allocation", "leva", "valutazioni",
  "dati storici", "efficienza dei mercati", "comportamento", "fattori", "geografia", "Cina", "pensione",
  "pianificazione", "statistica", "opzioni", "metodo"];
const MESI_BREVI = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
const dataBreve = (iso) => { const [a, m, g] = iso.split("-"); return `${Number(g)} ${MESI_BREVI[Number(m) - 1]} ${a}`; };
const linkTag = (t) => `index.html?tag=${encodeURIComponent(t)}#articoli`;

/* ---------- Markdown ---------- */

const slugify = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const md = new MarkdownIt({ html: true, typographer: false, linkify: false });
// \acapo segna un punto in cui una formula lunga può andare a capo sugli schermi
// stretti; nella versione normale non produce nulla.
const MACRO = { "\\acapo": "" };
md.use(katexPlugin, { throwOnError: true, macros: MACRO });

// Formule su schermi stretti. Molte formule affiancano due equazioni separate da
// \qquad, altre segnano con \acapo dove spezzarsi: per queste si genera anche una
// versione su più righe, che main.js mostra solo quando quella affiancata non entra.
function spezza(latex) {
  const parti = [];
  let profondita = 0, inizio = 0, i = 0;
  while (i < latex.length) {
    const resto = latex.slice(i);
    // \begin{nome} e \end{nome}: si salta il nome, che non conta come graffa.
    if (resto.startsWith("\\begin{")) { profondita++; i = latex.indexOf("}", i) + 1; continue; }
    if (resto.startsWith("\\end{")) { profondita--; i = latex.indexOf("}", i) + 1; continue; }
    const c = latex[i];
    if (c === "\\" && /^\\[{}]/.test(resto)) { i += 2; continue; }
    if (c === "{") profondita++;
    if (c === "}") profondita--;
    const m = profondita === 0 &&
      /^(?:\\acapo(?![a-zA-Z])|\\qquad(?![a-zA-Z])(\\quad(?![a-zA-Z])|\\Rightarrow\\qquad(?![a-zA-Z]))?)/.exec(resto);
    if (m) {
      parti.push(latex.slice(inizio, i).trim());
      inizio = i + m[0].length;
      if (m[1]?.includes("Rightarrow")) latex = latex.slice(0, inizio) + "\\Rightarrow\\; " + latex.slice(inizio);
      i = inizio;
      continue;
    }
    i++;
  }
  parti.push(latex.slice(inizio).trim());
  return parti.filter(Boolean).length > 1 ? parti.filter(Boolean) : null;
}

const bloccoMatematico = md.renderer.rules.math_block;
md.renderer.rules.math_block = (tokens, idx, ...resto) => {
  const affiancata = bloccoMatematico(tokens, idx, ...resto);
  const parti = spezza(tokens[idx].content.trim());
  if (!parti) return affiancata;
  const righe = katex.renderToString(`\\begin{gathered}${parti.join(" \\\\ ")}\\end{gathered}`,
    { displayMode: true, throwOnError: true, macros: MACRO });
  return `<div class="formula"><div class="formula-affiancata">${affiancata}</div>` +
    `<div class="formula-righe"><p class="katex-block">${righe}</p></div></div>\n`;
};
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

// La tabella può scorrere in orizzontale su schermi stretti: il contenitore
// riceve il focus, così si può scorrere anche da tastiera.
md.renderer.rules.table_open = () => '<div class="tabella" tabindex="0" role="region" aria-label="Tabella"><table>\n';
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
    file: path.basename(file),
    sorgente: m[2],
    html: md.renderer.render(tokens, md.options, {}),
    sezioni,
    minuti: Math.max(1, Math.round(parole / 180)),
    get durata() { return this.minuti === 1 ? "1 minuto" : `${this.minuti} minuti`; },
  };
}

const cartella = path.join(QUI, "contenuti");
const tutti = fs.readdirSync(cartella).filter((f) => f.endsWith(".md")).sort()
  .map((f) => leggi(path.join(cartella, f)));
// Gli articoli seguono l'ordine dei gruppi (e, dentro ogni gruppo, quello dei file):
// così "articolo precedente/successivo" ripercorre la home.
const posizione = (a) => {
  const i = GRUPPI.findIndex((g) => g.id === a.gruppo);
  if (i < 0) throw new Error(`Gruppo "${a.gruppo}" sconosciuto in ${a.file}: aggiungilo a GRUPPI`);
  return i;
};
const articoli = tutti.filter((p) => p.tipo !== "pagina").sort((a, b) => posizione(a) - posizione(b));

for (const a of articoli) {
  if (!LIVELLI[a.livello]) throw new Error(`Livello "${a.livello ?? ""}" non valido in ${a.file}: usa base, intermedio o avanzato`);
  a.base = a.livello === "base";
  if (!a.base && (!a.tesi || !a.obiezione)) throw new Error(`Tesi o obiezione mancante in ${a.file}`);
  a.tag = (a.tag ?? "").split(",").map((t) => t.trim()).filter(Boolean);
  if (!a.tag.length) throw new Error(`Nessun tag in ${a.file}`);
  for (const t of a.tag) if (!TAG.includes(t)) throw new Error(`Tag "${t}" in ${a.file} non è nel vocabolario TAG di build.mjs`);
  if (a.base) a.html = a.html.replace('<p class="voce-etichetta">Formulazione difendibile</p>', '<p class="voce-etichetta">In sintesi</p>');
}
for (const a of articoli) {
  a.prerequisiti = (a.prima ?? "").split(",").map((s) => s.trim()).filter(Boolean).map((slug) => {
    const b = articoli.find((x) => x.slug === slug);
    if (!b) throw new Error(`"prima: ${slug}" in ${a.file} non corrisponde a nessun articolo`);
    return b;
  });
}
const basi = articoli.filter((a) => a.gruppo === "basi");
const pagine = tutti.filter((p) => p.tipo === "pagina");

/* ---------- Modelli ---------- */

const esc = md.utils.escapeHtml;
const icona =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#ffe45c"/><path d="M9 23 23 9M9 9l14 14" stroke="#1d1633" stroke-width="4" stroke-linecap="round"/></svg>'
  );

function guscio({ titolo, descrizione, corpo, corrente = "", barra = false, percorso = corrente,
  tipo = "website", aggiornato = "", base = "", indicizza = true, titoloSocial = titolo }) {
  const assoluto = SITO.url + (percorso === "index.html" ? "" : percorso);
  const meta = [
    indicizza ? `<link rel="canonical" href="${assoluto}">` : '<meta name="robots" content="noindex">',
    `<meta property="og:site_name" content="${SITO.nome}">`,
    '<meta property="og:locale" content="it_IT">',
    `<meta property="og:type" content="${tipo}">`,
    `<meta property="og:title" content="${esc(titoloSocial)}">`,
    `<meta property="og:description" content="${esc(descrizione)}">`,
    indicizza ? `<meta property="og:url" content="${assoluto}">` : "",
    `<meta property="og:image" content="${SITO.url}${SITO.anteprima.file}">`,
    `<meta property="og:image:width" content="${SITO.anteprima.larghezza}">`,
    `<meta property="og:image:height" content="${SITO.anteprima.altezza}">`,
    `<meta property="og:image:alt" content="${esc(SITO.anteprima.alt)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    aggiornato ? `<meta property="article:modified_time" content="${aggiornato}">` : "",
  ].filter(Boolean).join("\n");
  const voce = (href, testo, classe = "") =>
    `<a href="${href}"${classe ? ` class="${classe}"` : ""}${corrente === href ? ' aria-current="page"' : ""}>${testo}</a>`;
  return `<!DOCTYPE html>
<html lang="it" data-theme="chiaro">
<head>
<meta charset="utf-8">${base ? `\n<base href="${base}">` : ""}
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titolo)}</title>
<meta name="description" content="${esc(descrizione)}">
${meta}
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
    <button class="cerca" type="button" aria-haspopup="dialog" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg><span class="cerca-parola">Cerca</span><span class="visivamente-nascosto"> negli articoli</span></button>
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
    <p class="piede-link"><a href="fonti.html">Fonti e letture</a> <a href="${SIMULATORE.url}" target="_blank" rel="noopener">${SIMULATORE.nome}<span class="esterno" aria-hidden="true"> ↗</span><span class="visivamente-nascosto"> (si apre in una nuova scheda)</span></a></p>
  </div>
</footer>
<dialog class="ricerca" aria-labelledby="ricerca-etichetta">
  <form class="ricerca-testa" role="search">
    <label id="ricerca-etichetta" for="ricerca-campo" class="visivamente-nascosto">Cerca negli articoli</label>
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>
    <input id="ricerca-campo" type="search" placeholder="Cerca negli articoli" autocomplete="off" spellcheck="false" enterkeyhint="go">
    <button type="button" class="ricerca-chiudi">Chiudi</button>
  </form>
  <p class="ricerca-stato" aria-live="polite"></p>
  <ol class="ricerca-risultati"></ol>
  <a class="ricerca-tutti" href="index.html#articoli" hidden>Vedi tutti i risultati, con filtri e tag <span aria-hidden="true">→</span></a>
</dialog>
<script src="assets/js/main.js"></script>
</body>
</html>
`;
}

// Riquadro del simulatore in fondo agli articoli di questi gruppi: [titolo, testo].
const RIMANDI = {
  portafoglio: ["Prova queste idee sui tuoi numeri",
    "Nel simulatore inserisci i tuoi portafogli, per esempio un 60/40, un Permanent Portfolio o una versione risk parity, e ne confronti le statistiche."],
  esposizioni: ["Guarda dentro il tuo portafoglio",
    "Nel simulatore inserisci il portafoglio che hai e ne analizzi le statistiche: il primo passo per sapere quanto rischio porta davvero, prima di aggiungere qualcosa."],
};

function rimandoSimulatore(titolo, testo) {
  return `<aside class="rimando" aria-label="${SIMULATORE.nome}">
  <p class="rimando-etichetta">Dallo stesso autore</p>
  <h2 class="rimando-titolo">${esc(titolo)}</h2>
  <p>${esc(testo)}</p>
  <a class="bottone" href="${SIMULATORE.url}" target="_blank" rel="noopener">Apri il simulatore<span aria-hidden="true"> ↗</span><span class="visivamente-nascosto"> (si apre in una nuova scheda)</span></a>
</aside>`;
}

function paginaArticolo(a, i) {
  const gruppo = GRUPPI.find((g) => g.id === a.gruppo);
  const prima = articoli[i - 1];
  const dopo = articoli[i + 1];
  const voci = a.sezioni.map((s) => `<li><a href="#${s.id}">${esc(s.testo)}</a></li>`).join("");
  const sommarioBreve = a.sezioni.length
    ? `<details class="sommario-breve">
    <summary>In questa pagina</summary>
    <nav aria-label="In questa pagina"><ol>${voci}</ol></nav>
  </details>`
    : "";
  const sommario = a.sezioni.length
    ? `<aside class="sommario-pagina" aria-label="In questa pagina">
    <h2>In questa pagina</h2>
    <ol>${voci}</ol>
  </aside>`
    : "";
  const corpo = `<article>
<header class="articolo-testa">
  <p class="articolo-gruppo"><a href="index.html?tema=${gruppo.id}#articoli">${esc(gruppo.nome)}</a>${a.gruppo === "basi" ? ` <span aria-hidden="true">·</span> passo ${basi.indexOf(a) + 1} di ${basi.length}` : ""} <span aria-hidden="true">·</span> ${etichettaLivello(a.livello)}</p>
  <h1>${esc(a.titolo)}</h1>
  <p class="articolo-sommario">${esc(a.sommario)}</p>
  <p class="articolo-tempo">${a.durata} di lettura <span aria-hidden="true">·</span> Aggiornato <time datetime="${a.aggiornato}">${dataEstesa(a.aggiornato, a.file)}</time></p>
  <ul class="articolo-tag" aria-label="Tag">${a.tag.map((t) => `<li><a href="${linkTag(t)}">${esc(t)}</a></li>`).join("")}</ul>
  ${a.prerequisiti.length ? `<p class="prima-di-leggere"><b>Prima di leggere</b> ${a.prerequisiti.map((b) => `<a href="${b.slug}.html">${esc(b.titolo)}</a>`).join(", ")}</p>` : ""}
  ${a.base ? "" : `<div class="scontro">
    <p class="scontro-tesi"><b>La tesi</b>${esc(a.tesi)}</p>
    <p class="scontro-obiezione"><b>L'obiezione più forte</b>${esc(a.obiezione)}</p>
  </div>`}
</header>
<div class="articolo-corpo">
  ${sommarioBreve}
  <div class="prosa">
${a.html}
${RIMANDI[a.gruppo] ? rimandoSimulatore(...RIMANDI[a.gruppo]) : ""}
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
    titoloSocial: a.titolo,
    descrizione: a.sommario,
    corpo,
    corrente: `${a.slug}.html`,
    barra: true,
    tipo: "article",
    aggiornato: a.aggiornato,
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
  // Schede degli articoli: tutte nell'HTML (si leggono anche senza JavaScript);
  // main.js aggiunge ricerca, filtri, ordinamento e "Mostra altri".
  const scheda = (a, k) => {
    const gruppo = GRUPPI.find((g) => g.id === a.gruppo);
    const passo = a.gruppo === "basi" ? ` <span aria-hidden="true">·</span> passo ${basi.indexOf(a) + 1}` : "";
    return `
    <article class="scheda" data-slug="${a.slug}" data-gruppo="${a.gruppo}" data-livello="${a.livello}" data-tag="${esc(a.tag.join("|"))}" data-ordine="${k}" data-data="${a.aggiornato}" data-minuti="${a.minuti}">
      <p class="scheda-occhiello">${esc(gruppo.nome)}${passo}</p>
      <h3 class="scheda-titolo"><a href="${a.slug}.html">${esc(a.titolo)}</a></h3>
      <p class="scheda-sommario">${esc(a.sommario)}</p>
      <p class="scheda-meta">${etichettaLivello(a.livello)} <span aria-hidden="true">·</span> ${a.durata} <span aria-hidden="true">·</span> <time datetime="${a.aggiornato}">${dataBreve(a.aggiornato)}</time></p>
      <ul class="scheda-tag" aria-label="Tag">${a.tag.map((t) => `<li><a href="${linkTag(t)}" data-tag="${esc(t)}">${esc(t)}</a></li>`).join("")}</ul>
    </article>`;
  };
  const schede = articoli.map(scheda).join("");
  const opzioni = (nome, voci) => voci.map(([valore, etichetta]) =>
    `<label><input type="checkbox" name="${nome}" value="${esc(valore)}"> <span>${esc(etichetta)}</span> <span class="filtro-conta"></span></label>`).join("\n          ");
  const temi = GRUPPI.filter((g) => articoli.some((a) => a.gruppo === g.id)).map((g) => [g.id, g.nome]);
  const livelli = Object.keys(LIVELLI).filter((l) => articoli.some((a) => a.livello === l)).map((l) => [l, LIVELLI[l].nome]);
  const tagUsati = TAG.filter((t) => articoli.some((a) => a.tag.includes(t))).sort((x, y) => x.localeCompare(y, "it")).map((t) => [t, t]);
  const menuFiltro = (nome, etichetta, voci) => `<details class="filtro-menu" data-filtro="${nome}">
        <summary>${etichetta} <span class="filtro-quanti"></span></summary>
        <div class="filtro-pannello">
          ${opzioni(nome, voci)}
        </div>
      </details>`;
  const esplora = `<section class="esplora" id="articoli" aria-labelledby="esplora-titolo">
  <div class="esplora-testa">
    <h2 id="esplora-titolo">Tutti gli articoli</h2>
    <form class="esplora-ricerca" role="search" hidden>
      <label for="esplora-campo" class="visivamente-nascosto">Cerca tra gli articoli</label>
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>
      <input id="esplora-campo" type="search" placeholder="Cerca negli articoli" autocomplete="off" spellcheck="false">
    </form>
    <div class="esplora-filtri" hidden>
      ${menuFiltro("tema", "Tema", temi)}
      ${menuFiltro("livello", "Livello", livelli)}
      ${menuFiltro("tag", "Tag", tagUsati)}
      <label class="esplora-ordine"><span>Ordina</span>
        <select id="esplora-ordine">
          <option value="percorso">Percorso consigliato</option>
          <option value="rilevanza">Rilevanza</option>
          <option value="recenti">Più recenti</option>
          <option value="brevi">Più brevi</option>
        </select>
      </label>
    </div>
    <div class="esplora-attivi" hidden></div>
    <p class="esplora-conteggio" aria-live="polite">${inLettere(articoli.length)} articoli</p>
  </div>
  <div class="esplora-griglia">${schede}
  </div>
  <p class="esplora-vuoto" hidden>Nessun articolo corrisponde. <button type="button" class="esplora-azzera">Cancella i filtri</button></p>
  <div class="esplora-altri"><button type="button" class="bottone-secondario" hidden>Mostra altri</button></div>
</section>`;
  const primaTesi = articoli.find((a) => !a.base);
  const azioni = basi.length
    ? `<a class="bottone" href="${basi[0].slug}.html">Parti dalle basi</a>
    <a href="${primaTesi.slug}.html">Conosci già le basi? Vai alle tesi</a>`
    : `<a class="bottone" href="${articoli[0].slug}.html">Inizia a leggere</a>
    <a href="come-stanno-insieme.html">Guarda dove le teorie si contraddicono</a>`;

  const corpo = `<section class="apertura">
  <h1>Ogni tesi vale quanto la migliore obiezione a cui sa rispondere.</h1>
  <p>${inLettere(articoli.length)} articoli su rendimenti, prezzi, portafogli e pensione. ${basi.length ? "Chi comincia ha un percorso di base, da leggere in ordine. Gli altri partono dalla tesi nella sua forma più forte, poi le danno contro" : "Ognuno parte dalla tesi nella sua forma più forte, poi le dà contro"}, con le formule e le fonti in vista.</p>
  <div class="apertura-azioni">
    ${azioni}
  </div>
</section>
${esplora}
<section class="indice-coda">
${rimandoSimulatore("Dalle idee ai tuoi portafogli", "Il simulatore di portafogli permette di inserire le proprie allocazioni e analizzarne le statistiche: un modo per mettere alla prova sui numeri le idee discusse qui.")}
</section>`;
  return guscio({
    titolo: `${SITO.nome} | ${SITO.motto}`,
    descrizione: "Teorie d'investimento con le loro obiezioni più forti e le risposte possibili.",
    corpo,
    corrente: "index.html",
  });
}

/* ---------- Scrittura ---------- */

const scrivi = (nome, testo) => {
  fs.mkdirSync(path.dirname(path.join(USCITA, nome)), { recursive: true });
  fs.writeFileSync(path.join(USCITA, nome), testo);
};
const copia = (da, a) => {
  fs.mkdirSync(path.dirname(a), { recursive: true });
  fs.copyFileSync(da, a);
};

function pagina404() {
  const corpo = `<section class="apertura apertura-errore">
  <p class="errore-codice">Errore 404</p>
  <h1>Questa pagina non esiste.</h1>
  <p>Il link potrebbe essere sbagliato, oppure l'articolo ha cambiato indirizzo. Gli articoli sono tutti nella pagina iniziale.</p>
  <div class="apertura-azioni">
    <a class="bottone" href="index.html">Vai agli articoli</a>
    <a href="fonti.html">Fonti e letture</a>
  </div>
</section>`;
  return guscio({
    titolo: `Pagina non trovata | ${SITO.nome}`,
    descrizione: "La pagina cercata non esiste.",
    corpo,
    percorso: "404.html",
    // GitHub Pages serve questa pagina a qualunque indirizzo mancante, anche in
    // sottocartelle: il base fa funzionare i link relativi da ogni profondità.
    base: new URL(SITO.url).pathname,
    indicizza: false,
  });
}

// Indice della ricerca: un file JavaScript (non JSON) così funziona anche aprendo
// il sito dal disco, senza server. main.js lo carica solo quando si apre la ricerca.
const formulaLeggibile = (f) => f
  .replace(/\\(?:text|mathrm|operatorname)\{([^}]*)\}/g, "$1")
  .replace(/\\[a-zA-Z]+/g, " ")
  .replace(/\{,\}/g, ",")
  .replace(/[{}^_\\]/g, "")
  .replace(/\s+/g, " ")
  .trim();
const testoPiano = (src) => src
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
const indiceRicerca = articoli.map((a) => ({
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
scrivi("assets/js/indice-ricerca.js", `window.CONTROTESI_INDICE=${JSON.stringify(indiceRicerca)};\n`);

scrivi("index.html", paginaIniziale());
scrivi("404.html", pagina404());
articoli.forEach((a, i) => scrivi(`${a.slug}.html`, paginaArticolo(a, i)));
pagine.forEach((p) => scrivi(`${p.slug}.html`, paginaSemplice(p)));

const risorse = path.join(USCITA, "assets");
copia(path.join(QUI, "assets/css/style.css"), path.join(risorse, "css/style.css"));
copia(path.join(QUI, "assets/js/main.js"), path.join(risorse, "js/main.js"));
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
