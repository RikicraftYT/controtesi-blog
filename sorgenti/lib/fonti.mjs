// Fonti per articolo. La pagina contenuti/fonti.md è divisa in "## Gruppo" e, dentro,
// in "### [Titolo](slug.html)": il blocco sotto ogni titolo sono le fonti di quell'articolo.
// Da qui la build ricava il riquadro "Fonti di questo articolo" e le verifiche controllano
// che ogni link esterno di un articolo sia nel suo blocco.

import { md } from "./markdown.mjs";
import { slugify } from "./testo.mjs";

// slug dell'articolo -> { tokens, id, urls }
export function fontiPerArticolo(sorgente) {
  const tokens = md.parse(sorgente, {});
  const blocchi = new Map();
  let corrente = null;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type === "heading_open") {
      corrente = null;
      if (t.tag !== "h3") continue;
      const inline = tokens[i + 1];
      const link = inline.children.find((c) => c.type === "link_open");
      const slug = /^([a-z0-9-]+)\.html$/.exec(link?.attrGet("href") ?? "")?.[1];
      if (!slug) continue;
      const testo = inline.children.filter((c) => c.type === "text" || c.type === "code_inline").map((c) => c.content).join("");
      corrente = { tokens: [], id: slugify(testo), urls: [] };
      blocchi.set(slug, corrente);
      i += 2; // inline e heading_close
      continue;
    }
    if (!corrente) continue;
    corrente.tokens.push(t);
    for (const c of t.children ?? []) if (c.type === "link_open") corrente.urls.push(c.attrGet("href"));
  }
  return blocchi;
}

export const htmlFonti = (blocco) => md.renderer.render(blocco.tokens, md.options, {});
