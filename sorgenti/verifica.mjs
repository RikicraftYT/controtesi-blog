// Controtesi — verifiche sul sito generato. Uso, dopo npm run build:
//
//   npm run verifica                  controlli sui file (veloci, senza rete)
//   npm run verifica -- --browser     anche nel browser: scorrimento orizzontale, errori
//                                     JavaScript, accessibilità con axe (servono Playwright
//                                     e, per axe, il pacchetto axe-core)
//   npm run verifica -- --esterni     anche i link esterni, uno per uno (serve la rete)
//
// Gli errori fanno fallire il comando; gli avvisi no.

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { LIVELLI, SIMULATORE } from "./config.mjs";
import { leggiContenuti } from "./lib/contenuti.mjs";
import { CONTENUTI, USCITA as CARTELLA_SITO } from "./lib/percorsi.mjs";
import { md } from "./lib/markdown.mjs";
import { CARTELLA_ANTEPRIME } from "./lib/modelli.mjs";
import { impronta } from "./anteprime.mjs";

const QUI = path.dirname(fileURLToPath(import.meta.url));
const USCITA = CARTELLA_SITO;
const opzioni = new Set(process.argv.slice(2));
const errori = [], avvisi = [];
const errore = (m) => errori.push(m);
const avviso = (m) => avvisi.push(m);

/* ---------- Contenuti (la lettura stessa controlla intestazioni, tag, gruppi, slug) ---------- */

const { articoli, pagine, basi } = leggiContenuti(CONTENUTI);
// Link esterni di un testo Markdown, letti con lo stesso parser della build (che gestisce
// anche le parentesi dentro gli indirizzi).
const esterni = (testo) => {
  const link = new Set();
  const visita = (tokens) => tokens.forEach((t) => {
    if (t.type === "link_open" && /^https?:/.test(t.attrGet("href"))) link.add(t.attrGet("href"));
    if (t.children) visita(t.children);
  });
  visita(md.parse(testo, {}));
  return [...link];
};

for (const a of articoli) {
  // Ogni link esterno dell'articolo deve stare nel suo blocco di fonti.md, con lo stesso indirizzo.
  const link = esterni(a.sorgente);
  if (link.length && !a.fonti) errore(`${a.file}: ha ${link.length} link esterni ma nessun blocco "### [${a.titolo}](${a.slug}.html)" in fonti.md`);
  for (const u of link) if (a.fonti && !a.fonti.urls.includes(u)) errore(`${a.file}: il link ${u} non è nelle sue fonti in fonti.md`);
  // Lunghezza secondo il livello.
  const [min, max] = LIVELLI[a.livello].parole;
  if (a.parole < min || a.parole > max) avviso(`${a.file}: ${a.parole} parole, fuori dai limiti del livello ${a.livello} (${min}–${max})`);
}

/* ---------- Pagine generate ---------- */

const html = new Map(fs.readdirSync(USCITA).filter((f) => f.endsWith(".html")).map((f) => [f, fs.readFileSync(path.join(USCITA, f), "utf8")]));
const attese = new Set(["index.html", "404.html", ...[...articoli, ...pagine].flatMap((p) => [`${p.slug}.html`, ...p.vecchi.map((v) => `${v}.html`)])]);
for (const f of attese) if (!html.has(f)) errore(`Manca ${f}: esegui npm run build`);
for (const f of html.keys()) if (!attese.has(f)) errore(`${f} non è generato da nessun file in contenuti/: esegui npm run build, che lo toglie`);
for (const p of [...articoli, ...pagine]) {
  const f = path.join(USCITA, `${p.slug}.html`);
  if (fs.existsSync(f) && fs.statSync(f).mtimeMs < fs.statSync(path.join(CONTENUTI, p.file)).mtimeMs) {
    avviso(`${p.slug}.html è più vecchio di ${p.file}: esegui npm run build`);
  }
}

// Link e ancore interni: ogni href/src relativo deve puntare a un file esistente, e
// ogni #ancora a un id presente nella pagina di destinazione.
const ids = (testo) => new Set([...testo.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const idPerPagina = new Map([...html].map(([f, t]) => [f, ids(t)]));
for (const [f, testo] of html) {
  if (f === "404.html") continue; // usa <base href="/controtesi-blog/">: si controlla dal sito pubblicato
  const visti = new Set();
  for (const m of testo.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = m[1].replace(/&amp;/g, "&");
    if (/^(https?:|mailto:|data:|tel:)/.test(url) || visti.has(url)) continue;
    visti.add(url);
    const [indirizzo, ancora] = url.split("#");
    const file = indirizzo.split("?")[0];
    const destinazione = file || f;
    if (file && !fs.existsSync(path.join(USCITA, file))) { errore(`${f}: link interno rotto verso ${url}`); continue; }
    if (ancora && destinazione.endsWith(".html") && !idPerPagina.get(destinazione)?.has(decodeURIComponent(ancora))) {
      errore(`${f}: l'ancora #${ancora} non esiste in ${destinazione}`);
    }
  }
  // id ripetuti nella stessa pagina rompono le ancore e l'accessibilità
  const tutti = [...testo.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const doppi = [...new Set(tutti.filter((x, i) => tutti.indexOf(x) !== i))];
  if (doppi.length) errore(`${f}: id ripetuti ${doppi.join(", ")}`);
}

// Sitemap e feed: devono contenere tutti gli articoli.
for (const nome of ["sitemap.xml", "feed.xml"]) {
  const file = path.join(USCITA, nome);
  if (!fs.existsSync(file)) { errore(`Manca ${nome}: esegui npm run build`); continue; }
  const testo = fs.readFileSync(file, "utf8");
  const mancanti = articoli.filter((a) => !testo.includes(`/${a.slug}.html<`) && !testo.includes(`/${a.slug}.html"`));
  if (mancanti.length) errore(`${nome}: mancano ${mancanti.map((a) => a.slug).join(", ")}`);
}

// Anteprime social per articolo.
let elenco = {};
try { elenco = JSON.parse(fs.readFileSync(path.join(USCITA, CARTELLA_ANTEPRIME, "elenco.json"), "utf8")); } catch { /* nessuna */ }
for (const a of articoli) if (a.base) a.passo = `${basi.indexOf(a) + 1} di ${basi.length}`;
const daRifare = articoli.filter((a) => elenco[a.slug] !== impronta(a) || !fs.existsSync(path.join(USCITA, CARTELLA_ANTEPRIME, `${a.slug}.png`)));
if (daRifare.length) avviso(`Anteprime social mancanti o vecchie per ${daRifare.length} articoli (${daRifare.slice(0, 4).map((a) => a.slug).join(", ")}${daRifare.length > 4 ? "…" : ""}): npm run anteprime && npm run build`);

/* ---------- Nel browser ---------- */

const richiedi = createRequire(import.meta.url);
const carica = (nome) => { try { return richiedi(nome); } catch { return null; } };

async function nelBrowser() {
  const playwright = carica("playwright");
  if (!playwright) { avviso("--browser: Playwright non è installato, controlli nel browser saltati (npm install --no-save playwright)"); return; }
  const axePercorso = (() => { try { return richiedi.resolve("axe-core/axe.min.js"); } catch { return null; } })();
  if (!axePercorso) avviso("--browser: axe-core non è installato, controllo di accessibilità saltato (npm install --no-save axe-core)");
  const browser = await playwright.chromium.launch();
  const pagine = [...html.keys()].filter((f) => f !== "404.html" && attese.has(f) && !articoli.some((a) => a.vecchi.includes(f.slice(0, -5))));
  for (const [larghezza, tema] of [[320, "chiaro"], [390, "scuro"], [768, "chiaro"], [1280, "scuro"]]) {
    const contesto = await browser.newContext({ viewport: { width: larghezza, height: 900 }, colorScheme: tema === "scuro" ? "dark" : "light" });
    const pagina = await contesto.newPage();
    let ultimoErrore = null;
    pagina.on("pageerror", (e) => { ultimoErrore = e.message; });
    for (const f of pagine) {
      ultimoErrore = null;
      await pagina.goto(pathToFileURL(path.join(USCITA, f)).href);
      if (ultimoErrore) errore(`${f} a ${larghezza}px: errore JavaScript «${ultimoErrore}»`);
      const sporge = await pagina.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (sporge > 1) errore(`${f} a ${larghezza}px: la pagina scorre in orizzontale di ${sporge}px`);
      if (axePercorso && (larghezza === 390 || larghezza === 1280)) {
        await pagina.evaluate(() => document.querySelectorAll("details").forEach((d) => { d.open = true; }));
        await pagina.addScriptTag({ path: axePercorso });
        const violazioni = await pagina.evaluate(async () => (await window.axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] },
        })).violations.map((v) => `${v.id} (${v.nodes.length}): ${v.help}`));
        for (const v of violazioni) errore(`${f} a ${larghezza}px, tema ${tema}: accessibilità, ${v}`);
      }
    }
    await contesto.close();
  }
  await browser.close();
}

/* ---------- Link esterni ---------- */

async function linkEsterni() {
  const indirizzi = new Set([SIMULATORE.url]);
  for (const p of [...articoli, ...pagine]) for (const u of esterni(p.sorgente)) indirizzi.add(u);
  const coda = [...indirizzi];
  const prova = async (u) => {
    for (const metodo of ["HEAD", "GET"]) {
      try {
        const r = await fetch(u, { method: metodo, redirect: "follow", signal: AbortSignal.timeout(20000),
          headers: { "user-agent": "Mozilla/5.0 (verifica dei link)" } });
        if (r.ok) return null;
        if (metodo === "GET" || ![403, 405, 501].includes(r.status)) return `risponde ${r.status}`;
      } catch (e) {
        if (metodo === "GET") return `non raggiungibile (${e.cause?.code ?? e.name})`;
      }
    }
    return null;
  };
  const esiti = [];
  const lavoratori = Array.from({ length: 8 }, async () => {
    while (coda.length) {
      const u = coda.shift();
      esiti.push([u, await prova(u)]);
    }
  });
  await Promise.all(lavoratori);
  // Se non risponde nessuno, il problema è la rete (o un proxy), non i link.
  if (esiti.every(([, e]) => e?.startsWith("non raggiungibile"))) {
    avviso(`--esterni: nessuno dei ${esiti.length} link esterni è raggiungibile, quindi manca la rete: controllo saltato`);
    return;
  }
  for (const [u, esito] of esiti) {
    // 401/403/429 spesso vengono da protezioni contro i programmi, non da link rotti
    if (esito) (/ (401|403|429)$/.test(esito) ? avviso : errore)(`Link esterno ${u}: ${esito}`);
  }
  console.log(`Link esterni controllati: ${indirizzi.size}`);
}

if (opzioni.has("--browser")) await nelBrowser();
if (opzioni.has("--esterni")) await linkEsterni();

for (const a of avvisi) console.log(`avviso: ${a}`);
for (const e of errori) console.log(`ERRORE: ${e}`);
console.log(`\nVerifica: ${articoli.length} articoli, ${html.size} pagine. ${errori.length} errori, ${avvisi.length} avvisi.`);
process.exit(errori.length ? 1 : 0);
