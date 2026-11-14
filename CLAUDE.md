# Controtesi

Blog statico in italiano su teorie d'investimento, obiezioni e risposte. Il sito si genera da `sorgenti/` nella cartella `sito/`, che non è in git: lo pubblica su GitHub Pages la GitHub Action `.github/workflows/sito.yml`, a ogni push su `main`.

## Come si lavora
- Gli articoli sono in `sorgenti/contenuti/<gruppo>/NN-slug.md`, una cartella per gruppo (il gruppo è la cartella, l'ordine il prefisso numerico); le pagine come `fonti.md` stanno direttamente in `sorgenti/contenuti/`. Front matter: slug, titolo, tesi, obiezione, livello, tag, sommario, aggiornato, prima, vecchi, tipo; gli articoli di livello base non hanno tesi né obiezione.
- Gruppi, livelli, tag e indirizzi sono in `sorgenti/config.mjs`; il codice della build è in `sorgenti/build.mjs` e `sorgenti/lib/`.
- Le regole per chi scrive gli articoli (formato, livelli, fonti, stile) sono in `sorgenti/LINEE-GUIDA-ARTICOLI.md`: usale per controllare gli articoli che arrivano.
- Le note tecniche complete sono in `sorgenti/README.md`; il `README.md` nella radice è la presentazione pubblica del progetto e non deve contenere dettagli tecnici.
- Per generare e controllare il sito in locale: `cd sorgenti && npm install && npm run sito` (anteprime, build e verifica; `npm run verifica -- --browser` per i controlli nel browser). Il risultato è in `sito/`: non va committato, e nemmeno modificato a mano.
- La GitHub Action ripete anteprime, build e verifiche nel browser a ogni push, su ogni branch: prima di dire che un lavoro è finito, controlla che sia passata.
- Stile in `sorgenti/assets/css/style.css`, script in `sorgenti/assets/js/main.js`; la build li copia in `sito/assets/`.
- Le formule sono in LaTeX (`$...$`, `$$...$$`) e vengono renderizzate da KaTeX in fase di build.
- I link interni sono relativi: il sito funziona sotto `/controtesi-blog/` su GitHub Pages.

## Regole
- Lavora sul branch indicato per la sessione e fai push lì: il merge in `main` lo fa il proprietario.
- Non reinserire `node_modules` nella repo.
- Ogni affermazione nei testi deve avere una fonte in `sorgenti/contenuti/fonti.md`, nel blocco `### [Titolo](slug.html)` dell'articolo: ogni link esterno dell'articolo deve comparire lì con lo stesso indirizzo.
