# Controtesi

Blog statico in italiano su teorie d'investimento, obiezioni e risposte. Le pagine HTML nella radice sono **generate**: non modificarle a mano.

## Come si lavora
- I testi sono in `sorgenti/contenuti/*.md` (front matter: slug, titolo, tesi, obiezione, gruppo, sommario, tipo).
- Per rigenerare le pagine: `cd sorgenti && npm install && npm run build`. Dopo ogni modifica ai Markdown, rigenera e committa anche gli HTML.
- Stile in `assets/css/style.css`, script in `assets/js/main.js`.
- Le formule sono in LaTeX (`$...$`, `$$...$$`) e vengono renderizzate da KaTeX in fase di build.
- I link interni sono relativi: il sito funziona sotto `/controtesi-blog/` su GitHub Pages.

## Regole
- Lavora direttamente su `main`, senza creare nuovi branch.
- Non reinserire `node_modules` nella repo.
- Ogni affermazione nei testi deve avere una fonte in `sorgenti/contenuti/fonti.md`.
