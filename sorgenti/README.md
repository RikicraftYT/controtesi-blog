# Controtesi: note tecniche

Istruzioni per chi modifica o rigenera il sito. La descrizione del progetto è nel [README principale](../README.md).

## Struttura

| Percorso | Contenuto |
| --- | --- |
| `../index.html`, `../*.html` | Pagine **generate**: non modificarle a mano |
| `contenuti/*.md` | Testi degli articoli e pagina delle fonti |
| `assets/css/style.css` | Grafica (colori, caratteri, impaginazione, tema scuro) |
| `assets/js/main.js` | Tema chiaro/scuro, barra di lettura, sommario, simulazione |
| `build.mjs` | Script che genera le pagine |
| `../assets/` | Copie generate di stile, script, caratteri e KaTeX: non modificarle |

La build copia `assets/css/style.css` e `assets/js/main.js` in `../assets/` e sovrascrive eventuali modifiche fatte lì.

## Rigenerare il sito

Serve Node.js 18 o successivo:

```bash
cd sorgenti
npm install
npm run build
```

Dopo ogni modifica a testi, stile o script, rigenera e committa anche gli HTML. Non committare `node_modules/`.

## Scrivere un articolo

Ogni file in `contenuti/` inizia con un'intestazione:

```
---
slug: nome-del-file-html
titolo: Titolo dell'articolo
tesi: La tesi in una frase.
obiezione: L'obiezione più forte in una frase.
gruppo: strumento | rendimenti | prezzi | portafoglio | sintesi
sommario: Due righe che compaiono sotto il titolo e nei risultati di ricerca.
---
```

I file sono ordinati per nome, quindi il prefisso numerico decide l'ordine degli articoli. Le pagine che non sono articoli (come `fonti.md`) hanno `tipo: pagina`. I nomi dei gruppi sono in `GRUPPI` dentro `build.mjs`.

Le formule si scrivono in LaTeX: `$...$` nel testo, `$$...$$` su riga separata. KaTeX le trasforma in HTML durante la build.

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

## Fonti

Ogni numero o affermazione citata deve avere un link nel testo e la stessa fonte in `contenuti/fonti.md`.

## Pubblicare

Il sito è statico e usa solo link relativi, quindi funziona sotto `/controtesi-blog/` su GitHub Pages e anche aprendo `index.html` dal disco, senza connessione.
