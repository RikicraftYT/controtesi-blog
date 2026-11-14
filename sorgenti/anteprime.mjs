// Controtesi — immagini di anteprima per articolo (quelle che compaiono quando un link
// viene condiviso sui social o nelle chat). Uso: npm run anteprime, poi npm run build.
//
// Serve Playwright con Chromium. Le immagini vanno in ../assets/img/anteprime/<slug>.png;
// elenco.json ricorda con quali dati è stata fatta ognuna, così si rigenerano solo quelle
// di articoli nuovi o con titolo, gruppo, livello o obiezione cambiati. Le immagini di
// articoli che non esistono più vengono tolte. La build usa un'immagine per articolo
// quando c'è, altrimenti quella generale del sito.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { GRUPPI, LIVELLI, SITO } from "./config.mjs";
import { leggiContenuti } from "./lib/contenuti.mjs";
import { CARTELLA_ANTEPRIME } from "./lib/modelli.mjs";
import { esc } from "./lib/testo.mjs";

const QUI = path.dirname(fileURLToPath(import.meta.url));
const USCITA = path.resolve(QUI, "..");
const CARTELLA = path.join(USCITA, CARTELLA_ANTEPRIME);
const ELENCO = path.join(CARTELLA, "elenco.json");
const tutte = process.argv.includes("--tutte");

// Dati che compaiono nell'immagine: se cambiano, l'immagine va rifatta.
export const impronta = (a) => crypto.createHash("sha1")
  .update(JSON.stringify([a.titolo, a.gruppo, a.livello, a.obiezione ?? "", a.passo ?? ""]))
  .digest("hex").slice(0, 12);

function modello(a) {
  const font = (f) => pathToFileURL(path.join(USCITA, "assets/fonts", f)).href;
  const gruppo = GRUPPI.find((g) => g.id === a.gruppo).nome;
  const lungo = a.titolo.length;
  const corpo = lungo > 60 ? 64 : lungo > 42 ? 76 : 88;
  const sotto = a.base
    ? `<p class="nota">Il percorso per chi comincia, passo ${a.passo}</p>`
    : `<p class="obiezione"><b>L'obiezione</b> ${esc(a.obiezione)}</p>`;
  return `<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><style>
  @font-face { font-family: "Bricolage Grotesque"; src: url("${font("bricolage-grotesque-latin-wght-normal.woff2")}") format("woff2"); font-weight: 200 800; }
  @font-face { font-family: "Newsreader"; src: url("${font("newsreader-latin-wght-italic.woff2")}") format("woff2"); font-weight: 200 800; font-style: italic; }
  html, body { margin: 0; }
  body { width: 1200px; height: 630px; box-sizing: border-box; overflow: hidden; padding: 60px 80px 56px;
    background: #f1effa; color: #1d1633; font-family: "Bricolage Grotesque", sans-serif;
    display: flex; flex-direction: column; justify-content: space-between; }
  .testa { display: flex; justify-content: space-between; align-items: baseline; }
  .marchio { font-weight: 800; font-size: 40px; letter-spacing: -0.03em; }
  .marchio span { background: #ffe45c; padding: 0 0.22em 0.04em; margin-left: 0.04em; border-radius: 0.2em 0.5em 0.25em 0.45em; }
  .gruppo { font-size: 26px; font-weight: 700; color: #5236e0; letter-spacing: 0.04em; text-transform: uppercase; }
  h1 { margin: 0; font-weight: 800; font-size: ${corpo}px; line-height: 1.02; letter-spacing: -0.04em; max-width: 19ch; text-wrap: balance; }
  .riga { border-top: 4px solid #1d1633; padding-top: 20px; display: flex; justify-content: space-between; align-items: end; gap: 40px; }
  .obiezione, .nota { margin: 0; font-family: "Newsreader", serif; font-style: italic; font-size: 30px; line-height: 1.25; color: #c2185b; max-width: 30em; }
  .obiezione b { font-family: "Bricolage Grotesque", sans-serif; font-style: normal; font-size: 22px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; display: block; margin-bottom: 4px; }
  .livello { flex: none; font-size: 24px; font-weight: 600; color: #5e5778; }
</style></head><body>
  <div class="testa"><div class="marchio">Contro<span>tesi</span></div><div class="gruppo">${esc(gruppo)}</div></div>
  <h1>${esc(a.titolo)}</h1>
  <div class="riga">${sotto}<div class="livello">Livello ${LIVELLI[a.livello].nome.toLowerCase()}</div></div>
</body></html>`;
}

// Le immagini hanno pochi colori piatti: ridotte a una tavolozza di 48 colori pesano un
// quarto, senza differenze visibili. Serve Python con Pillow; senza, restano come sono.
function riduci(file) {
  if (!file.length) return;
  const py = "import sys\nfrom PIL import Image\nfor f in sys.argv[1:]:\n    Image.open(f).convert('P', palette=Image.ADAPTIVE, colors=48).save(f, optimize=True)";
  const r = spawnSync("python3", ["-c", py, ...file], { stdio: "pipe" });
  if (r.status !== 0) console.log("Immagini non ridotte (serve Python con Pillow): restano più pesanti ma valide.");
}

async function main() {
  // Playwright non è tra le dipendenze del sito: lo si cerca dove è installato.
  let chromium;
  try { ({ chromium } = createRequire(import.meta.url)("playwright")); }
  catch { console.error("Serve Playwright: npm install --no-save playwright && npx playwright install chromium"); process.exit(1); }

  const { articoli, basi } = leggiContenuti(path.join(QUI, "contenuti"));
  for (const a of articoli) if (a.base) a.passo = `${basi.indexOf(a) + 1} di ${basi.length}`;
  fs.mkdirSync(CARTELLA, { recursive: true });
  let elenco = {};
  try { elenco = JSON.parse(fs.readFileSync(ELENCO, "utf8")); } catch { /* prima volta */ }

  const daFare = articoli.filter((a) => tutte || elenco[a.slug] !== impronta(a) || !fs.existsSync(path.join(CARTELLA, `${a.slug}.png`)));
  if (daFare.length) {
    const browser = await chromium.launch();
    const pagina = await browser.newPage({ viewport: { width: SITO.anteprima.larghezza, height: SITO.anteprima.altezza } });
    // La pagina va aperta da un file: da about:blank il browser non carica i caratteri locali.
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), "anteprime-"));
    const file = path.join(temp, "anteprima.html");
    for (const a of daFare) {
      fs.writeFileSync(file, modello(a));
      await pagina.goto(pathToFileURL(file).href, { waitUntil: "load" });
      await pagina.evaluate(() => document.fonts.ready);
      if (!(await pagina.evaluate(() => document.fonts.check('800 40px "Bricolage Grotesque"')))) throw new Error("Caratteri non caricati: esegui prima npm run build");
      await pagina.screenshot({ path: path.join(CARTELLA, `${a.slug}.png`) });
      elenco[a.slug] = impronta(a);
    }
    await browser.close();
    fs.rmSync(temp, { recursive: true, force: true });
    riduci(daFare.map((a) => path.join(CARTELLA, `${a.slug}.png`)));
  }
  // Immagini di articoli che non ci sono più.
  const slugs = new Set(articoli.map((a) => a.slug));
  for (const f of fs.readdirSync(CARTELLA)) {
    if (f.endsWith(".png") && !slugs.has(f.slice(0, -4))) { fs.rmSync(path.join(CARTELLA, f)); delete elenco[f.slice(0, -4)]; }
  }
  for (const s of Object.keys(elenco)) if (!slugs.has(s)) delete elenco[s];
  fs.writeFileSync(ELENCO, JSON.stringify(elenco, null, 1) + "\n");
  console.log(`Anteprime: ${daFare.length} generate, ${articoli.length - daFare.length} già aggiornate. Ora: npm run build`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
