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

Le regole complete per chi scrive (livelli, struttura, fonti, stile, controllo finale) sono in [`LINEE-GUIDA-ARTICOLI.md`](LINEE-GUIDA-ARTICOLI.md). Qui sotto solo il formato tecnico.

Ogni file in `contenuti/` inizia con un'intestazione:

```
---
slug: nome-del-file-html
titolo: Titolo dell'articolo
tesi: La tesi in una frase.
obiezione: L'obiezione più forte in una frase.
gruppo: basi | strumento | rendimenti | prezzi | portafoglio | esposizioni | vita | sintesi
livello: base | intermedio | avanzato
prima: slug-di-un-altro-articolo, slug-di-un-altro   (facoltativo)
sommario: Due righe che compaiono sotto il titolo e nei risultati di ricerca.
aggiornato: 2026-11-11
---
```

`livello` è obbligatorio. Gli articoli `base` non hanno `tesi` né `obiezione` (la build li accetta senza), in home mostrano titolo e sommario, e il blocco `::: difendibile` compare come «In sintesi». Per gli altri livelli `tesi` e `obiezione` sono obbligatorie: se mancano la build si ferma.

`prima` elenca gli articoli da leggere prima: compaiono in un riquadro «Prima di leggere» in cima alla pagina. Uno slug che non esiste ferma la build.

Gli articoli del gruppo `basi` sono un percorso: in home sono numerati e in testa all'articolo compare «passo 2 di 14». Finché il gruppo è vuoto non compare, e il bottone in home resta «Inizia a leggere»; con almeno un articolo diventa «Parti dalle basi».

`aggiornato` (formato AAAA-MM-GG) è obbligatorio per gli articoli: compare sotto il titolo come «Aggiornato l'11 novembre 2026». Va cambiato quando si rivede il contenuto, non per correzioni di battitura.

Gli articoli seguono l'ordine dei gruppi in `GRUPPI`; dentro ogni gruppo decide il prefisso numerico del nome del file. Un gruppo che non è in `GRUPPI` blocca la build con un errore. Le pagine che non sono articoli (come `fonti.md`) hanno `tipo: pagina`. I nomi dei gruppi sono in `GRUPPI` dentro `build.mjs`.

Le formule si scrivono in LaTeX: `$...$` nel testo, `$$...$$` su riga separata. KaTeX le trasforma in HTML durante la build.

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

## Ricerca e filtro per livello

La build scrive `../assets/js/indice-ricerca.js` con titolo, tesi, obiezione, sommario, titoli delle sezioni e testo di ogni articolo, senza formule. È un file JavaScript e non JSON perché così si carica anche aprendo il sito dal disco; `main.js` lo scarica solo quando si apre la ricerca. La ricerca ignora maiuscole e accenti, cerca i termini all'inizio delle parole e pesa di più titolo e tesi. Si apre con il bottone «Cerca», con `/` o con Ctrl+K.

Il filtro per livello in home è un gruppo di bottoni: nasconde gli articoli degli altri livelli e i gruppi rimasti vuoti, e ricorda la scelta nel browser.

## Fonti

Ogni numero o affermazione citata deve avere un link nel testo e la stessa fonte in `contenuti/fonti.md`.

## Impostazioni in `build.mjs`

- `SITO.url`: indirizzo pubblico del sito. Serve per l'anteprima sui social, il link canonico e la pagina 404. Se il sito cambia indirizzo, va aggiornato qui.
- `SIMULATORE`: nome e indirizzo del simulatore di portafogli, segnalato in home e nel piè di pagina.
- `RIMANDI`: gruppi in fondo ai cui articoli compare il riquadro del simulatore, con titolo e testo per ciascun gruppo (oggi `portafoglio` ed `esposizioni`).
- `GRUPPI`: nomi e ordine dei gruppi in home.

## Immagine di anteprima

Per rifarla, apri `anteprima.html` in un browser con la finestra a 1200×630, salva uno screenshot come `assets/img/anteprima.png` e rigenera il sito.

## Pubblicare

Il sito è statico e usa solo link relativi, quindi funziona sotto `/controtesi-blog/` su GitHub Pages e anche aprendo `index.html` dal disco, senza connessione. Fa eccezione `404.html`, che usa l'indirizzo assoluto `/controtesi-blog/` per funzionare a qualunque profondità: va vista dal sito pubblicato, non dal disco.
