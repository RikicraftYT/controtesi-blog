# Controtesi: note tecniche

Istruzioni per chi modifica o rigenera il sito. La descrizione del progetto è nel [README principale](../README.md).

## Struttura

| Percorso | Contenuto |
| --- | --- |
| `../index.html`, `../*.html` | Pagine **generate**: non modificarle a mano |
| `contenuti/*.md` | Testi degli articoli e pagina delle fonti |
| `assets/css/style.css` | Grafica (colori, caratteri, impaginazione, tema scuro) |
| `assets/js/main.js` | Tema chiaro/scuro, barra di lettura, sommario, simulazione |
| `build.mjs` | Script che genera le pagine, compresa la `404.html` |
| `assets/img/anteprima.png` | Immagine mostrata quando un link al sito viene condiviso |
| `anteprima.html` | Modello da cui è ricavata `anteprima.png` |
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
aggiornato: 2026-11-11
---
```

`aggiornato` (formato AAAA-MM-GG) è obbligatorio per gli articoli: compare sotto il titolo come «Aggiornato l'11 novembre 2026». Va cambiato quando si rivede il contenuto, non per correzioni di battitura.

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

## Impostazioni in `build.mjs`

- `SITO.url`: indirizzo pubblico del sito. Serve per l'anteprima sui social, il link canonico e la pagina 404. Se il sito cambia indirizzo, va aggiornato qui.
- `SIMULATORE`: nome e indirizzo del simulatore di portafogli, segnalato in home, nel piè di pagina e in fondo agli articoli del gruppo `portafoglio`.
- `GRUPPI`: nomi e ordine dei gruppi in home.

## Immagine di anteprima

Per rifarla, apri `anteprima.html` in un browser con la finestra a 1200×630, salva uno screenshot come `assets/img/anteprima.png` e rigenera il sito.

## Pubblicare

Il sito è statico e usa solo link relativi, quindi funziona sotto `/controtesi-blog/` su GitHub Pages e anche aprendo `index.html` dal disco, senza connessione. Fa eccezione `404.html`, che usa l'indirizzo assoluto `/controtesi-blog/` per funzionare a qualunque profondità: va vista dal sito pubblicato, non dal disco.
