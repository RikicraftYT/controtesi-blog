# Controtesi

Blog statico in italiano su teorie d'investimento, obiezioni e risposte. Le pagine HTML nella radice sono **generate**: non modificarle a mano.

## Come si lavora
- I testi sono in `sorgenti/contenuti/*.md` (front matter: slug, titolo, tesi, obiezione, gruppo, livello, tag, sommario, aggiornato, prima, vecchi, tipo; gli articoli di livello base non hanno tesi né obiezione).
- Gruppi, livelli, tag e indirizzi sono in `sorgenti/config.mjs`; il codice della build è in `sorgenti/build.mjs` e `sorgenti/lib/`.
- Le regole per chi scrive gli articoli (formato, livelli, fonti, stile) sono in `sorgenti/LINEE-GUIDA-ARTICOLI.md`: usale per controllare gli articoli che arrivano.
- Le note tecniche complete sono in `sorgenti/README.md`; il `README.md` nella radice è la presentazione pubblica del progetto e non deve contenere dettagli tecnici.
- Per rigenerare le pagine: `cd sorgenti && npm install && npm run build`, poi `npm run verifica` (con `-- --browser` per i controlli nel browser). Dopo ogni modifica ai Markdown, rigenera e committa anche gli HTML.
- Se cambiano titolo, gruppo, livello o obiezione di un articolo, o ne arriva uno nuovo: `npm run anteprime` prima della build.
- Stile in `sorgenti/assets/css/style.css`, script in `sorgenti/assets/js/main.js`. La build li copia in `assets/`: non modificare le copie in `assets/`, verrebbero sovrascritte.
- Le formule sono in LaTeX (`$...$`, `$$...$$`) e vengono renderizzate da KaTeX in fase di build.
- I link interni sono relativi: il sito funziona sotto `/controtesi-blog/` su GitHub Pages.

## Regole
- Lavora sul branch indicato per la sessione e fai push lì: il merge in `main` lo fa il proprietario.
- Non reinserire `node_modules` nella repo.
- Ogni affermazione nei testi deve avere una fonte in `sorgenti/contenuti/fonti.md`, nel blocco `### [Titolo](slug.html)` dell'articolo: ogni link esterno dell'articolo deve comparire lì con lo stesso indirizzo.
