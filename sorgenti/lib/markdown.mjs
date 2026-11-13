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
