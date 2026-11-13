// Modelli HTML delle pagine: guscio comune, articolo, pagina semplice, home, 404.

import { SITO, SIMULATORE, GRUPPI, LIVELLI, TAG, RIMANDI } from "../config.mjs";
import { dataEstesa, dataBreve, inLettere, esc } from "./testo.mjs";

const etichettaLivello = (l) =>
  `<span class="livello" data-punti="${LIVELLI[l].punti}"><span class="livello-punti" aria-hidden="true"><i></i><i></i><i></i></span>` +
  `<span class="livello-nome"><span class="visivamente-nascosto">Livello </span>${LIVELLI[l].nome}</span></span>`;
const linkTag = (t) => `index.html?tag=${encodeURIComponent(t)}#articoli`;
const gruppoDi = (a) => GRUPPI.find((g) => g.id === a.gruppo);

// Immagini di anteprima per articolo (generate da npm run anteprime): la build le usa
// quando esistono, altrimenti ricorre a quella generale del sito.
export const CARTELLA_ANTEPRIME = "assets/img/anteprime";
let conAnteprima = new Set();
export const impostaAnteprime = (slugs) => { conAnteprima = new Set(slugs); };
const anteprimaDi = (a) => conAnteprima.has(a.slug)
  ? { file: `${CARTELLA_ANTEPRIME}/${a.slug}.png`, larghezza: SITO.anteprima.larghezza, altezza: SITO.anteprima.altezza,
    alt: `${a.titolo}. ${SITO.nome}, ${SITO.motto.toLowerCase()}.` }
  : SITO.anteprima;

const icona =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#ffe45c"/><path d="M9 23 23 9M9 9l14 14" stroke="#1d1633" stroke-width="4" stroke-linecap="round"/></svg>'
  );

// Caratteri da scaricare subito: quelli del testo e dei titoli (il corsivo arriva dopo).
const PRECARICA = ["bricolage-grotesque-latin-wght-normal.woff2", "newsreader-latin-wght-normal.woff2"];

export function guscio({ titolo, descrizione, corpo, corrente = "", barra = false, percorso = corrente,
  tipo = "website", aggiornato = "", base = "", indicizza = true, titoloSocial = titolo,
  immagine = SITO.anteprima, dati = null }) {
  const assoluto = SITO.url + (percorso === "index.html" ? "" : percorso);
  // KaTeX e le formule dei grafici interattivi si caricano solo dove servono.
  const katex = corpo.includes('class="katex');
  const formule = corpo.includes("data-interattivo");
  const meta = [
    indicizza ? `<link rel="canonical" href="${assoluto}">` : '<meta name="robots" content="noindex">',
    `<meta property="og:site_name" content="${SITO.nome}">`,
    '<meta property="og:locale" content="it_IT">',
    `<meta property="og:type" content="${tipo}">`,
    `<meta property="og:title" content="${esc(titoloSocial)}">`,
    `<meta property="og:description" content="${esc(descrizione)}">`,
    indicizza ? `<meta property="og:url" content="${assoluto}">` : "",
    `<meta property="og:image" content="${SITO.url}${immagine.file}">`,
    `<meta property="og:image:width" content="${immagine.larghezza}">`,
    `<meta property="og:image:height" content="${immagine.altezza}">`,
    `<meta property="og:image:alt" content="${esc(immagine.alt)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    aggiornato ? `<meta property="article:modified_time" content="${aggiornato}">` : "",
    '<meta name="theme-color" content="#f1effa" media="(prefers-color-scheme: light)">',
    '<meta name="theme-color" content="#15102a" media="(prefers-color-scheme: dark)">',
    `<link rel="alternate" type="application/atom+xml" title="${SITO.nome}" href="feed.xml">`,
    dati ? `<script type="application/ld+json">${JSON.stringify(dati).replace(/</g, "\\u003c")}</script>` : "",
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
<link rel="apple-touch-icon" href="assets/img/icona-180.png">
${PRECARICA.map((f) => `<link rel="preload" href="assets/fonts/${f}" as="font" type="font/woff2" crossorigin>`).join("\n")}
${katex ? '<link rel="stylesheet" href="assets/katex/katex.min.css">\n' : ""}<link rel="stylesheet" href="assets/css/style.css">
<script>try{var t=localStorage.getItem("controtesi-tema")||(matchMedia("(prefers-color-scheme: dark)").matches?"scuro":"chiaro");document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>
</head>
<body>
<a class="salta" href="#contenuto">Vai al contenuto</a>
<header class="testata">
  <div class="testata-interno">
    <a class="marchio" href="index.html" aria-label="${SITO.nome}, pagina iniziale">Contro<span>tesi</span></a>
    <nav class="menu" aria-label="Principale">
      ${voce("index.html", "Articoli", "menu-inizio")}
      ${voce("come-stanno-insieme.html", "Tensioni")}
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
    <p class="piede-link"><a href="fonti.html">Fonti e letture</a> <a href="feed.xml">Feed degli articoli</a> <a href="${SIMULATORE.url}" target="_blank" rel="noopener">${SIMULATORE.nome}<span class="esterno" aria-hidden="true"> ↗</span><span class="visivamente-nascosto"> (si apre in una nuova scheda)</span></a></p>
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
${formule ? '<script src="assets/js/formule.js"></script>\n' : ""}<script src="assets/js/main.js"></script>
</body>
</html>
`;
}

// Sommario della pagina: a tendina su telefono e tablet, laterale sugli schermi larghi.
function sommari(sezioni) {
  if (!sezioni.length) return { sommarioBreve: "", sommario: "" };
  const voci = sezioni.map((s) => `<li><a href="#${s.id}">${esc(s.testo)}</a></li>`).join("");
  return {
    sommarioBreve: `<details class="sommario-breve">
    <summary>In questa pagina</summary>
    <nav aria-label="In questa pagina"><ol>${voci}</ol></nav>
  </details>`,
    sommario: `<aside class="sommario-pagina" aria-label="In questa pagina">
    <h2>In questa pagina</h2>
    <ol>${voci}</ol>
  </aside>`,
  };
}

function rimandoSimulatore(titolo, testo) {
  return `<aside class="rimando" aria-label="${SIMULATORE.nome}">
  <p class="rimando-etichetta">Dallo stesso autore</p>
  <h2 class="rimando-titolo">${esc(titolo)}</h2>
  <p>${esc(testo)}</p>
  <a class="bottone" href="${SIMULATORE.url}" target="_blank" rel="noopener">Apri il simulatore<span aria-hidden="true"> ↗</span><span class="visivamente-nascosto"> (si apre in una nuova scheda)</span></a>
</aside>`;
}

export function paginaArticolo(a, i, { articoli, basi }) {
  const gruppo = gruppoDi(a);
  const prima = articoli[i - 1];
  const dopo = articoli[i + 1];
  const { sommarioBreve, sommario } = sommari(a.sezioni);
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
    immagine: anteprimaDi(a),
    dati: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.titolo,
      description: a.sommario,
      dateModified: a.aggiornato,
      inLanguage: "it",
      mainEntityOfPage: `${SITO.url}${a.slug}.html`,
      image: `${SITO.url}${anteprimaDi(a).file}`,
      articleSection: gruppo.nome,
      keywords: a.tag.join(", "),
      isPartOf: { "@type": "WebSite", name: SITO.nome, url: SITO.url },
    },
  });
}

export function paginaSemplice(p) {
  const { sommarioBreve, sommario } = sommari(p.sezioni);
  const corpo = `<article class="pagina">
<header class="articolo-testa">
  <h1>${esc(p.titolo)}</h1>
</header>
<div class="articolo-corpo">
  ${sommarioBreve}
  <div class="prosa">
${p.html}
  </div>
  ${sommario}
</div>
</article>`;
  return guscio({ titolo: `${p.titolo} | ${SITO.nome}`, descrizione: p.sommario, corpo, corrente: `${p.slug}.html` });
}

export function paginaIniziale({ articoli, basi }) {
  // Schede degli articoli: tutte nell'HTML (si leggono anche senza JavaScript);
  // main.js aggiunge ricerca, filtri, ordinamento e "Mostra altri".
  const scheda = (a, k) => {
    const gruppo = gruppoDi(a);
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
  // Separatori dei gruppi, numerati: compaiono nell'ordine del percorso senza filtri
  // (main.js li nasconde negli altri casi). Sono solo visivi: ogni scheda dice già il
  // suo gruppo nell'occhiello, quindi gli screen reader non li leggono due volte.
  const gruppiUsati = GRUPPI.filter((g) => articoli.some((a) => a.gruppo === g.id));
  const separatore = (g) => {
    const n = articoli.filter((a) => a.gruppo === g.id).length;
    return `
    <div class="esplora-gruppo" data-gruppo="${g.id}" aria-hidden="true"><span class="esplora-gruppo-numero">${String(gruppiUsati.indexOf(g) + 1).padStart(2, "0")}</span> <span class="esplora-gruppo-nome">${esc(g.nome)}</span> <span class="esplora-gruppo-quanti">${n === 1 ? "1 articolo" : `${n} articoli`}</span></div>`;
  };
  const schede = articoli.map((a, k) => (k === 0 || articoli[k - 1].gruppo !== a.gruppo ? separatore(gruppoDi(a)) : "") + scheda(a, k)).join("");
  const opzioni = (nome, voci) => voci.map(([valore, etichetta]) =>
    `<label><input type="checkbox" name="${nome}" value="${esc(valore)}"> <span>${esc(etichetta)}</span> <span class="filtro-conta"></span></label>`).join("\n          ");
  const temi = gruppiUsati.map((g) => [g.id, g.nome]);
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
    descrizione: SITO.descrizione,
    corpo,
    corrente: "index.html",
    dati: { "@context": "https://schema.org", "@type": "WebSite", name: SITO.nome, url: SITO.url, description: SITO.descrizione, inLanguage: "it" },
  });
}

export function pagina404() {
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

// Pagina al vecchio indirizzo di un articolo che ha cambiato slug: rimanda al nuovo.
export function paginaSpostata(p) {
  const nuovo = `${p.slug}.html`;
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<title>${esc(p.titolo)} | ${SITO.nome}</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${SITO.url}${nuovo}">
<meta http-equiv="refresh" content="0; url=${nuovo}">
<script>location.replace("${nuovo}" + location.search + location.hash)</script>
</head>
<body>
<p>L'articolo si è spostato: <a href="${nuovo}">${esc(p.titolo)}</a>.</p>
</body>
</html>
`;
}

// Sitemap per i motori di ricerca: home, articoli e pagine, con la data di aggiornamento.
export function sitemap({ articoli, pagine }) {
  const ultima = articoli.map((a) => a.aggiornato).sort().at(-1);
  const voci = [
    { loc: SITO.url, mod: ultima },
    ...articoli.map((a) => ({ loc: `${SITO.url}${a.slug}.html`, mod: a.aggiornato })),
    ...pagine.map((p) => ({ loc: `${SITO.url}${p.slug}.html`, mod: p.aggiornato ?? ultima })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${voci.map((v) => `  <url><loc>${esc(v.loc)}</loc><lastmod>${v.mod}</lastmod></url>`).join("\n")}
</urlset>
`;
}

// Feed Atom degli articoli, dal più recente. Un articolo rivisto (data "aggiornato" nuova)
// torna in cima, così chi segue il feed vede anche gli aggiornamenti.
export function feed({ articoli }) {
  const ordinati = [...articoli].sort((a, b) => b.aggiornato.localeCompare(a.aggiornato) || articoli.indexOf(a) - articoli.indexOf(b));
  const quando = (d) => `${d}T00:00:00Z`;
  const voce = (a) => {
    const url = `${SITO.url}${a.slug}.html`;
    const testo = a.base ? a.sommario : `${a.sommario}\n\nLa tesi: ${a.tesi}\nL'obiezione più forte: ${a.obiezione}`;
    return `  <entry>
    <title>${esc(a.titolo)}</title>
    <link href="${url}"/>
    <id>${url}</id>
    <updated>${quando(a.aggiornato)}</updated>
    <category term="${esc(gruppoDi(a).nome)}"/>
    <summary>${esc(testo)}</summary>
  </entry>`;
  };
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="it">
  <title>${esc(SITO.nome)}</title>
  <subtitle>${esc(SITO.motto)}</subtitle>
  <link href="${SITO.url}feed.xml" rel="self"/>
  <link href="${SITO.url}"/>
  <id>${SITO.url}</id>
  <updated>${quando(ordinati[0].aggiornato)}</updated>
  <author><name>${esc(SITO.nome)}</name></author>
${ordinati.map(voce).join("\n")}
</feed>
`;
}
