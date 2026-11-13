// Controtesi — impostazioni del sito. È il file da modificare per cambiare nomi,
// gruppi, tag e indirizzi; il resto della build è in build.mjs e in lib/.

export const SITO = {
  nome: "Controtesi",
  motto: "Idee d'investimento messe alla prova",
  descrizione: "Teorie d'investimento con le loro obiezioni più forti e le risposte possibili.",
  // Indirizzo pubblico: serve ai link assoluti (anteprime social, canonical, 404, sitemap, feed).
  url: "https://rikicraftyt.github.io/controtesi-blog/",
  anteprima: { file: "assets/img/anteprima.png", larghezza: 1200, altezza: 630,
    alt: "Controtesi. Idee d'investimento messe alla prova." },
};

// Sito dello stesso autore, segnalato in home, nel piè di pagina e negli articoli sul portafoglio.
export const SIMULATORE = {
  nome: "Simulatore di portafogli",
  url: "https://portfolio-site-2zxf.onrender.com",
};

// Gruppi, nell'ordine in cui compaiono nel sito.
export const GRUPPI = [
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
// "parole" sono i limiti di lunghezza delle linee guida, controllati da npm run verifica.
export const LIVELLI = {
  base: { nome: "Base", punti: 1, parole: [600, 900] },
  intermedio: { nome: "Intermedio", punti: 2, parole: [500, 1200] },
  avanzato: { nome: "Avanzato", punti: 3, parole: [600, 1600] },
};

// Vocabolario dei tag: un articolo può usare solo questi (campo "tag", separati da virgola).
export const TAG = ["inflazione", "liquidità", "interesse composto", "rischio", "volatilità", "azioni", "obbligazioni",
  "oro", "fondi ed ETF", "costi", "tasse", "diversificazione", "asset allocation", "leva", "valutazioni",
  "dati storici", "efficienza dei mercati", "comportamento", "fattori", "geografia", "pensione",
  "pianificazione", "statistica", "opzioni", "metodo"];

// Riquadro del simulatore in fondo agli articoli di questi gruppi: [titolo, testo].
export const RIMANDI = {
  portafoglio: ["Prova queste idee sui tuoi numeri",
    "Nel simulatore inserisci i tuoi portafogli, per esempio un 60/40, un Permanent Portfolio o una versione risk parity, e ne confronti le statistiche."],
  esposizioni: ["Guarda dentro il tuo portafoglio",
    "Nel simulatore inserisci il portafoglio che hai e ne analizzi le statistiche: il primo passo per sapere quanto rischio porta davvero, prima di aggiungere qualcosa."],
};
