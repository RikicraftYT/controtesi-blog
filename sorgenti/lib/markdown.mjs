// Configurazione di markdown-it: formule KaTeX, grafici, blocchi obiezione/risposta,
// tabelle scorrevoli e link esterni.

import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import container from "markdown-it-container";
import katexPluginModule from "@vscode/markdown-it-katex";
import katex from "katex";
import { grafico } from "./grafici.mjs";
import { slugify } from "./testo.mjs";

const katexPlugin = katexPluginModule.default ?? katexPluginModule;

export const md = new MarkdownIt({ html: true, typographer: false, linkify: false });

// File in lavorazione, per i messaggi d'errore dei grafici.
let fileCorrente = "";
export const impostaFile = (nome) => { fileCorrente = nome; };

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

// Grafici: un blocco ```grafico con un oggetto JSON diventa una figura SVG (vedi grafici.mjs).
const recintoBase = md.renderer.rules.fence;
md.renderer.rules.fence = (tokens, idx, ...resto) => {
  const t = tokens[idx];
  if (t.info.trim() === "grafico") return grafico(t.content, fileCorrente);
  return recintoBase(tokens, idx, ...resto);
};

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
// Ancore sui titoli ## (sommario) e ### (le sezioni della pagina Fonti, a cui rimandano gli articoli).
md.use(anchor, { slugify, level: [2, 3] });

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

// Tabelle. Il contenitore può scorrere in orizzontale su schermi stretti e riceve il
// focus, così si scorre anche da tastiera; il suo nome, per gli screen reader, viene dal
// titolo che precede la tabella ("Tabella: Le tensioni"), numerato se ce n'è più d'una.
// Se la prima cella dell'intestazione è vuota, la prima colonna contiene le voci delle
// righe: la cella d'angolo diventa una td e le voci diventano th scope="row".
md.core.ruler.push("tabelle_accessibili", (stato) => {
  const tk = stato.tokens;
  let titolo = "", perTitolo = new Map(), numero = 0;
  for (let i = 0; i < tk.length; i++) {
    const t = tk[i];
    if (t.type === "heading_open") titolo = tk[i + 1].content;
    if (t.type.startsWith("container_obiezione_open") && t.info.trim().slice(9).trim()) titolo = t.info.trim().slice(9).trim();
    if (t.type !== "table_open") continue;
    numero++;
    const n = (perTitolo.get(titolo) ?? 0) + 1;
    perTitolo.set(titolo, n);
    t.meta = { etichetta: titolo ? `Tabella: ${titolo}${n > 1 ? ` (${n})` : ""}` : `Tabella ${numero}` };
    // intestazione con l'angolo vuoto?
    const primaTh = tk.findIndex((x, k) => k > i && x.type === "th_open");
    if (primaTh < 0 || tk[primaTh + 1].content.trim() !== "") continue;
    tk[primaTh].tag = "td"; tk[primaTh + 2].tag = "td";
    for (let k = primaTh; k < tk.length && tk[k].type !== "table_close"; k++) {
      if (tk[k].type === "tr_open" && tk[k + 1]?.type === "td_open" && k > primaTh) {
        const apre = tk[k + 1];
        const chiude = tk.slice(k + 2).find((x) => x.type === "td_close");
        apre.tag = "th"; apre.attrSet("scope", "row"); chiude.tag = "th";
      }
    }
  }
});
const nomeTabella = (t) => md.utils.escapeHtml(t.meta?.etichetta ?? "Tabella");
md.renderer.rules.table_open = (tokens, idx) => `<div class="tabella" tabindex="0" role="region" aria-label="${nomeTabella(tokens[idx])}"><table>\n`;
md.renderer.rules.table_close = () => "</table></div>\n";

// Link esterni: si aprono in una nuova scheda, e lo dicono (freccia visibile e testo per
// gli screen reader).
const linkBase = md.renderer.rules.link_open ?? ((t, i, o, e, self) => self.renderToken(t, i, o));
const chiusuraBase = md.renderer.rules.link_close ?? ((t, i, o, e, self) => self.renderToken(t, i, o));
export const AVVISO_ESTERNO = '<span class="esterno" aria-hidden="true">↗</span><span class="visivamente-nascosto"> (si apre in una nuova scheda)</span>';
const aperti = [];
md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
  const href = tokens[idx].attrGet("href") ?? "";
  const esterno = /^https?:/.test(href);
  if (esterno) {
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noopener");
  }
  aperti.push(esterno);
  return linkBase(tokens, idx, opts, env, self);
};
md.renderer.rules.link_close = (tokens, idx, opts, env, self) =>
  (aperti.pop() ? AVVISO_ESTERNO : "") + chiusuraBase(tokens, idx, opts, env, self);
