# Controtesi

Blog statico in italiano su teorie d'investimento, obiezioni e risposte. Le pagine HTML nella radice sono **generate**: non modificarle a mano.

## Come si lavora
- I testi sono in `sorgenti/contenuti/*.md` (front matter: slug, titolo, tesi, obiezione, gruppo, sommario, tipo).
- Le note tecniche complete sono in `sorgenti/README.md`; il `README.md` nella radice è la presentazione pubblica del progetto e non deve contenere dettagli tecnici.
- Per rigenerare le pagine: `cd sorgenti && npm install && npm run build`. Dopo ogni modifica ai Markdown, rigenera e committa anche gli HTML.
- Stile in `sorgenti/assets/css/style.css`, script in `sorgenti/assets/js/main.js`. La build li copia in `assets/`: non modificare le copie in `assets/`, verrebbero sovrascritte.
- Le formule sono in LaTeX (`$...$`, `$$...$$`) e vengono renderizzate da KaTeX in fase di build.
- I link interni sono relativi: il sito funziona sotto `/controtesi-blog/` su GitHub Pages.

## Regole
- Lavora sul branch indicato per la sessione e fai push lì: il merge in `main` lo fa il proprietario.
- Non reinserire `node_modules` nella repo.
- Ogni affermazione nei testi deve avere una fonte in `sorgenti/contenuti/fonti.md`.
