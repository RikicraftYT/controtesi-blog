# Controtesi

Blog statico: undici articoli su teorie d'investimento, ognuno con tesi, obiezioni e risposte.

## Aprire il sito

Apri `index.html` con un browser. Funziona anche senza connessione: caratteri, formule e script sono inclusi nella cartella `assets/`.

## Cosa c'è nella cartella

| Percorso | Contenuto |
| --- | --- |
| `index.html` | Pagina iniziale con l'elenco tesi / obiezione |
| `*.html` | Un file per articolo, più `fonti.html` |
| `assets/css/style.css` | Grafica (colori, caratteri, impaginazione, tema scuro) |
| `assets/js/main.js` | Tema chiaro/scuro, barra di lettura, sommario, simulazione |
| `assets/fonts/`, `assets/katex/` | Caratteri e stile delle formule |
| `sorgenti/` | Testi in Markdown e script che genera le pagine |

## Modificare i testi

Gli articoli sono in `sorgenti/contenuti/*.md`. Le formule si scrivono in LaTeX: `$...$` nel testo, `$$...$$` su riga separata. Obiezioni, risposte e conclusione usano tre blocchi:

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

Per rigenerare le pagine serve Node.js 18 o successivo:

```
cd sorgenti
npm install
npm run build
```

Per cambiare la grafica modifica `sorgenti/assets/css/style.css` e rigenera, oppure modifica direttamente `assets/css/style.css`.

## Pubblicare

È un sito statico: basta caricare la cartella (senza `sorgenti/`) su qualsiasi hosting, per esempio GitHub Pages o Netlify.

## Nota

Analisi di idee, non consulenza finanziaria. Le fonti dei numeri citati sono in `fonti.html`.
