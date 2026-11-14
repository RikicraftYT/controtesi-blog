# Controtesi: note tecniche

Istruzioni per chi modifica o rigenera il sito. La descrizione del progetto è nel [README principale](../README.md).

## Struttura

| Percorso | Contenuto |
| --- | --- |
| `../index.html`, `../*.html` | Pagine **generate**: non modificarle a mano |
| `../feed.xml`, `../sitemap.xml` | Feed degli articoli e sitemap, generati |
| `../assets/` | Copie generate di stile, script, caratteri, KaTeX, immagini e indice della ricerca: non modificarle |
| `contenuti/*.md` | Testi degli articoli e pagina delle fonti |
| `config.mjs` | **Impostazioni**: indirizzo del sito, simulatore, gruppi, livelli, tag, riquadri del simulatore |
| `build.mjs` | Genera il sito |
| `verifica.mjs` | Controlli sul sito generato (`npm run verifica`) |
| `anteprime.mjs` | Immagini di anteprima per articolo (`npm run anteprime`) |
| `lib/contenuti.mjs` | Lettura dei Markdown e controlli sulle intestazioni |
| `lib/markdown.mjs` | Markdown, formule, blocchi obiezione/risposta, tabelle, link esterni |
| `lib/grafici.mjs` | Grafici in SVG |
| `lib/fonti.mjs` | Fonti per articolo, ricavate da `fonti.md` |
| `lib/modelli.mjs` | HTML delle pagine, sitemap, feed, pagine di reindirizzamento |
| `lib/ricerca.mjs` | Indice della ricerca |
| `lib/testo.mjs` | Date, numeri in lettere, slug |
| `assets/css/style.css` | Grafica (colori, caratteri, impaginazione, tema scuro) |
| `assets/js/main.js` | Tema, barra di lettura, sommario, ricerca, filtri, tooltip, grafici interattivi |
| `assets/js/formule.js` | Formule comuni alla build e ai grafici interattivi (numeri, Black-Scholes, FIRE) |
| `assets/img/` | Anteprima generale del sito e icona per la schermata Home |
| `anteprima.html` | Modello da cui è ricavata `assets/img/anteprima.png` |

La build copia stile, script e immagini da `assets/` a `../assets/` e sovrascrive eventuali modifiche fatte lì.

## Comandi

Serve Node.js 18 o successivo.

```bash
cd sorgenti
npm install
npm run build
npm run verifica
```

- `npm run build` rigenera tutte le pagine. Dopo ogni modifica a testi, stile o script, rigenera e committa anche gli HTML. Non committare `node_modules/`.
- `npm run verifica` controlla il sito generato: vedi [Verifiche](#verifiche).
- `npm run anteprime` rifà le immagini di anteprima degli articoli nuovi o cambiati; dopo va rifatta la build. Vedi [Immagini di anteprima](#immagini-di-anteprima).

## Scrivere un articolo

Le regole complete per chi scrive (livelli, struttura, fonti, stile, controllo finale) sono in [`LINEE-GUIDA-ARTICOLI.md`](LINEE-GUIDA-ARTICOLI.md). Qui sotto solo il formato tecnico.

Ogni file in `contenuti/` inizia con un'intestazione:

```
---
slug: nome-del-file-html
titolo: Titolo dell'articolo
tesi: La tesi in una frase.
obiezione: L'obiezione più forte in una frase.
gruppo: basi | strumento | rendimenti | prezzi | portafoglio | derivati | esposizioni | vita | oltre | sintesi
livello: base | intermedio | avanzato
tag: azioni, dati storici   (uno o più, dal vocabolario TAG di config.mjs)
prima: slug-di-un-altro-articolo, slug-di-un-altro   (facoltativo)
vecchi: vecchio-slug   (facoltativo)
sommario: Due righe che compaiono sotto il titolo e nei risultati di ricerca.
aggiornato: 2026-11-11
---
```

`livello` è obbligatorio. Gli articoli `base` non hanno `tesi` né `obiezione` (la build li accetta senza), in home mostrano titolo e sommario, e il blocco `::: difendibile` compare come «In sintesi». Per gli altri livelli `tesi` e `obiezione` sono obbligatorie: se mancano la build si ferma.

Lo `slug` è l'indirizzo della pagina: solo minuscole, cifre e trattini, unico. Se un articolo deve cambiare slug, il vecchio va in `vecchi`: la build scrive al vecchio indirizzo una pagina che rimanda a quello nuovo, così i link già condivisi continuano a funzionare. Slug ripetuti, anche tra vecchi e nuovi, fermano la build.

`prima` elenca gli articoli da leggere prima: compaiono in un riquadro «Prima di leggere» in cima alla pagina. Uno slug che non esiste ferma la build.

Gli articoli del gruppo `basi` sono un percorso: in home sono numerati e in testa all'articolo compare «passo 2 di 14». Finché il gruppo è vuoto non compare, e il bottone in home resta «Inizia a leggere»; con almeno un articolo diventa «Parti dalle basi», e il link accanto, «Vai alle tesi», porta al primo articolo intermedio.

`aggiornato` (formato AAAA-MM-GG) è obbligatorio per gli articoli: compare sotto il titolo come «Aggiornato l'11 novembre 2026», ordina il feed e la sitemap. Va cambiato quando si rivede il contenuto, non per correzioni di battitura.

Gli articoli seguono l'ordine dei gruppi in `GRUPPI` (`config.mjs`); dentro ogni gruppo decide il prefisso numerico del nome del file. Un gruppo che non è in `GRUPPI` blocca la build con un errore. Le pagine che non sono articoli (come `fonti.md`) hanno `tipo: pagina`.

Le formule si scrivono in LaTeX: `$...$` nel testo, `$$...$$` su riga separata. KaTeX le trasforma in HTML durante la build; il suo foglio di stile si carica solo nelle pagine che hanno formule.

Sui telefoni le formule su riga separata troppo larghe vanno a capo da sole nei punti in cui c'è `\qquad` (di solito tra due equazioni affiancate). Se una formula lunga non ha `\qquad`, si può indicare dove spezzarla con `\acapo`, che sugli schermi larghi non produce nulla:

```
g = \tfrac{1}{2}\ln(1{,}5) + \tfrac{1}{2}\ln(0{,}75) \acapo = \tfrac{1}{2}\ln(1{,}125)
```

Obiezioni, risposte e conclusione usano tre blocchi:

```
::: obiezione Titolo dell'obiezione
Testo.
:::

::: risposta
Testo.
:::

::: difendibile
Testo.
:::
```

Ogni titolo `##` diventa una voce del sommario della pagina.

Le tabelle diventano riquadri che scorrono di lato sui telefoni. Il loro nome per gli screen reader viene dal titolo che le precede («Tabella: Le tensioni», numerato se sotto lo stesso titolo ce n'è più d'una). Se la prima cella dell'intestazione è vuota, la prima colonna è trattata come colonna delle voci di riga.

I link esterni si scrivono come link normali: la build li fa aprire in una nuova scheda e aggiunge una piccola freccia, con l'avviso per gli screen reader.

## Fonti

`contenuti/fonti.md` è divisa come il sito: un `## Gruppo` per ogni gruppo e, dentro, un blocco per articolo che comincia con il titolo dell'articolo come link alla sua pagina:

```
## Quanto rende il mercato

### [CAPE di Shiller, quanto conta il prezzo d'ingresso](cape-shiller.html)

Calcolo illustrativo: ... (facoltativo)

- [Titolo della fonte](https://...) – Autore, testata, anno
- Titolo di un documento senza link – Autori, anno
```

La build ricava da ogni blocco il riquadro «Fonti di questo articolo» in fondo all'articolo (con una voce «Fonti» nel sommario e il rimando alla pagina completa). Un blocco che rimanda a un articolo che non esiste ferma la build. Ogni link esterno di un articolo deve comparire nel suo blocco con lo stesso indirizzo: lo controlla `npm run verifica`. Una fonte usata da più articoli si ripete sotto ciascuno. In fondo, «Libri per andare oltre» raccoglie le letture non legate a un articolo.

## Grafici

I blocchi recintati `grafico` nei Markdown contengono un oggetto JSON. `lib/markdown.mjs` li passa a `lib/grafici.mjs`, che restituisce una `<figure>` con:

- due SVG, largo (viewBox 640) e stretto (360): il CSS mostra il secondo sotto i 34rem, così il testo resta leggibile sul telefono;
- una tabella dei dati in `<details>`, generata dagli stessi numeri (le x in `tabella.x` per le linee), con le voci delle righe come intestazioni di riga;
- `role="img"`, `<title>`, `<desc>` e la nota come `<figcaption>`;
- attributi `data-tip` sui segni, che `main.js` mostra come tooltip con mouse, tocco e tastiera.

I tipi e i generatori di curve (lognormale, Black-Scholes, funzione di valore, code, FIRE, soglia di rendimento…) sono in testa a `lib/grafici.mjs`. Un JSON sbagliato, un tipo o un generatore sconosciuto fermano la build indicando il file.

I colori delle serie sono le variabili `--g1`…`--g4` in `style.css`, con valori propri per il tema scuro. Sono stati verificati con il validatore della skill dataviz (contrasto, luminosità, distinguibilità per daltonici) su sfondo chiaro e scuro; le serie 2 e 4 sono vicine per chi confonde rosso e verde, quindi quando compaiono insieme una delle due è tratteggiata o etichettata.

Tre grafici sono interattivi (`"interattivo": "interesse" | "opzione" | "fire"`): la build scrive la versione statica, `main.js` la sostituisce con un grafico ridisegnato alla larghezza reale e con i cursori. I cursori dicono il valore con la sua unità agli screen reader, e l'esito viene annunciato quando il cursore si ferma. Le formule usate qui e nella build sono le stesse, in `assets/js/formule.js`, che si carica solo nelle pagine con un grafico interattivo. Senza JavaScript resta la versione statica.

## Ricerca, filtri e tag

La home ha una sezione «Tutti gli articoli» con un campo di ricerca, tre menu di filtri a scelta multipla (tema, livello, tag, ciascuno con il numero di articoli accanto alle voci), l'ordinamento (percorso consigliato, rilevanza, più recenti, più brevi), le etichette dei filtri attivi e una griglia di schede che si apre dodici alla volta. Nell'ordine del percorso, senza filtri né ricerca, la griglia è divisa dai separatori numerati dei gruppi. Senza JavaScript le schede si vedono comunque tutte, nell'ordine del percorso.

Lo stato della ricerca finisce nell'indirizzo (`index.html?q=inflazione&livello=base&tag=costi#articoli`), quindi si può condividere. I tag nelle schede e sotto il titolo degli articoli usano lo stesso meccanismo, come il nome del gruppo sopra il titolo (`?tema=rendimenti`).

I tag ammessi sono nell'elenco `TAG` di `config.mjs`: un tag che non c'è ferma la build. Per aggiungerne uno basta inserirlo nell'elenco.

La build scrive anche `../assets/js/indice-ricerca.js` con titolo, tesi, obiezione, sommario, tag, titoli delle sezioni e testo di ogni articolo, senza formule. È un file JavaScript e non JSON perché così si carica anche aprendo il sito dal disco; `main.js` lo scarica solo alla prima ricerca. La ricerca ignora maiuscole e accenti, cerca i termini all'inizio delle parole e pesa di più titolo e tag. La stessa ricerca è nella finestra «Cerca» della testata (bottone, `/` o Ctrl+K), che rimanda alla home per i risultati completi.

## Verifiche

`npm run verifica`, dopo la build, controlla:

- intestazioni, tag, gruppi e slug (gli stessi controlli della build);
- che ogni link esterno di un articolo sia nel suo blocco di `fonti.md`;
- link interni e ancore di tutte le pagine, e id ripetuti;
- che ogni articolo abbia la sua pagina, che non ci siano pagine orfane e che le pagine non siano più vecchie dei Markdown;
- sitemap e feed;
- lunghezza degli articoli rispetto ai limiti del livello (in `LIVELLI`, `config.mjs`), come avviso;
- anteprime social mancanti o da rifare, come avviso.

Con `-- --browser` apre ogni pagina con Playwright a 320, 390, 768 e 1280 px, in tema chiaro e scuro, e segnala lo scorrimento orizzontale, gli errori JavaScript e, se è installato `axe-core`, i problemi di accessibilità. Con `-- --esterni` prova ogni link esterno; se non ne risponde nessuno conclude che manca la rete e salta il controllo. Playwright e axe-core non sono dipendenze del sito: per usarli, `npm install --no-save playwright axe-core` e `npx playwright install chromium`.

Gli errori fanno fallire il comando, gli avvisi no.

## Immagini di anteprima

Quando un link viene condiviso, i social mostrano l'immagine indicata in `og:image`. La home e le pagine generali usano `assets/img/anteprima.png`: per rifarla, apri `anteprima.html` in un browser con la finestra a 1200×630, salva uno screenshot come `assets/img/anteprima.png` e rigenera il sito.

Gli articoli hanno un'immagine propria, con titolo, gruppo, livello e obiezione (o il passo del percorso, negli articoli base), generata da `npm run anteprime` in `../assets/img/anteprime/`. Lo script, che usa Playwright, rifà solo le immagini di articoli nuovi o con quei dati cambiati (`elenco.json` ne tiene l'impronta), toglie quelle di articoli eliminati e, se c'è Python con Pillow, le riduce a 48 colori. La build usa l'immagine di un articolo quando esiste, altrimenti quella generale; `npm run verifica` avvisa quando un'immagine manca o è da rifare.

## Impostazioni in `config.mjs`

- `SITO`: nome, motto, descrizione, indirizzo pubblico (`url`, usato per anteprime, link canonici, sitemap, feed e pagina 404) e anteprima generale. Se il sito cambia indirizzo, va aggiornato qui.
- `SIMULATORE`: nome e indirizzo del simulatore di portafogli, segnalato in home e nel piè di pagina.
- `GRUPPI`: nomi e ordine dei gruppi.
- `LIVELLI`: nomi, pallini e limiti di lunghezza dei livelli.
- `TAG`: vocabolario dei tag.
- `RIMANDI`: gruppi in fondo ai cui articoli compare il riquadro del simulatore, con titolo e testo (oggi `portafoglio` ed `esposizioni`).

## Motori di ricerca e feed

La build scrive `../sitemap.xml` (home, articoli e pagine con la data di aggiornamento) e `../feed.xml`, un feed Atom degli articoli dal più recente, segnalato nel piè di pagina e nell'intestazione delle pagine. Gli articoli hanno anche i dati strutturati `Article` di schema.org, la home quelli `WebSite`.

Un `robots.txt` non serve: su GitHub Pages un sito di progetto vive in `/controtesi-blog/`, e i motori leggono `robots.txt` solo alla radice del dominio. La sitemap si può segnalare direttamente in Google Search Console.

## Pubblicare

Il sito è statico e usa solo link relativi, quindi funziona sotto `/controtesi-blog/` su GitHub Pages e anche aprendo `index.html` dal disco, senza connessione. Fa eccezione `404.html`, che usa l'indirizzo assoluto `/controtesi-blog/` per funzionare a qualunque profondità: va vista dal sito pubblicato, non dal disco.

La build toglie dalla radice gli HTML che nessun file in `contenuti/` genera più (articoli eliminati o rinominati senza `vecchi`), e lo scrive nel terminale.
