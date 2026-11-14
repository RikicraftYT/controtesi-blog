---
slug: volatility-drag
titolo: Volatility drag, leva e ribilanciamento
tesi: Ribilanciare genera rendimento dal nulla.
obiezione: Genera rendimento solo se i prezzi tornano indietro.
livello: avanzato
tag: volatilità, leva, interesse composto, statistica
sommario: La volatilità sottrae rendimento composto alla media aritmetica, in misura pari a metà della varianza. Questo spiega perché la leva giornaliera delude e perché il ribilanciamento sembra creare valore. Ma non è un premio gratuito.
aggiornato: 2026-11-11
---

È il seguito tecnico di [Valore atteso](valore-atteso.html): la stessa distanza tra media e percorso tipico, tradotta in una formula che si usa per costruire portafogli.

## L'idea

Il capitale cresce al tasso geometrico $g$, non a quello aritmetico $\mu$. Per rendimenti non troppo dispersi vale

$$
g \approx \mu - \frac{\sigma^2}{2}
$$

Il termine $\sigma^2/2$ è il *volatility drag*. Non è un costo che qualcuno incassa: è aritmetica. Un $+10\%$ seguito da un $-9{,}09\%$ riporta a 100, eppure la media dei due rendimenti è positiva.

## Leva: quando aiuta e quando no

Con leva $L$ il rendimento atteso in eccesso cresce in modo lineare e la varianza in modo quadratico:

$$
g(L) \approx r_f + L\,(\mu - r_f) - \frac{L^2\sigma^2}{2} \qquad\Rightarrow\qquad L^{*} = \frac{\mu - r_f}{\sigma^2}
$$

$L^{*}$ è la leva che massimizza la crescita, cioè il criterio di Kelly. Oltre $L^{*}$ ogni unità di leva in più *riduce* il rendimento composto; oltre $2L^{*}$ lo rende inferiore al tasso privo di rischio.

```grafico
{
 "tipo": "linee",
 "titolo": "Rendimento composto in funzione della leva",
 "nota": "Calcolo illustrativo: premio per il rischio del 5%, volatilità del 18%, tasso privo di rischio del 3%. L* = premio / varianza ≈ 1,5.",
 "x": {
  "min": 0,
  "max": 4,
  "etichetta": "leva",
  "formato": {
   "dec": "auto",
   "suffisso": "×"
  }
 },
 "y": {
  "min": -2,
  "max": 8,
  "etichetta": "rendimento composto annuo",
  "formato": {
   "dec": 0,
   "suffisso": "%"
  }
 },
 "serie": [
  {
   "nome": "Rendimento composto",
   "colore": 1,
   "generatore": {
    "nome": "leva",
    "rf": 0.03,
    "premio": 0.05,
    "sigma": 0.18
   }
  }
 ],
 "riferimenti": [
  {
   "y": 3,
   "etichetta": "tasso privo di rischio"
  },
  {
   "x": 1.54,
   "etichetta": "L*"
  },
  {
   "x": 3.09,
   "etichetta": "2L*"
  }
 ],
 "punti": [
  {
   "x": 1.54,
   "y": 6.86,
   "colore": 1,
   "etichetta": "massimo, circa 6,9%",
   "tip": "Leva 1,5: rendimento composto massimo, circa 6,9%"
  }
 ],
 "etichette": "legenda",
 "tabella": {
  "x": [
   0,
   1,
   1.5,
   2,
   3,
   4
  ]
 }
}
```

L'esempio degli ETF a leva giornaliera è immediato. Se l'indice fa $+10\%$ e poi $-9{,}09\%$, torna a 100. Il prodotto a leva 2 fa $+20\%$ e poi $-18{,}18\%$:

$$
100 \times 1{,}20 \times 0{,}8182 = 98{,}18
$$

L'indice è fermo e il prodotto ha perso l'1,8%. In un mercato laterale e volatile la perdita si accumula; in un mercato che sale con poca volatilità succede il contrario. Il calcolo è illustrativo e non conta costi né interessi.

## Il demone di Shannon

Prendi un'attività che ogni periodo raddoppia o dimezza con probabilità uguali. Il rendimento geometrico è zero: tenuta da sola, nel lungo periodo non va da nessuna parte. Tienine metà e metà in liquidità, e riporta le quote al 50% a ogni periodo. Il portafoglio fa $\times 1{,}5$ oppure $\times 0{,}75$:

$$
g = \tfrac{1}{2}\ln(1{,}5) + \tfrac{1}{2}\ln(0{,}75) \acapo = \tfrac{1}{2}\ln(1{,}125) \approx 5{,}9\% \text{ per periodo}
$$

Due attività a crescita nulla, ribilanciate, crescono. Il meccanismo: dimezzando l'esposizione si dimezza $\mu$ ma si divide per quattro $\sigma^2$, quindi il drag scende più della media. La costruzione è descritta da [Portfolio Charts](https://portfoliocharts.com/2022/04/12/unexpected-returns-shannons-demon-the-rebalancing-bonus/) e dal [CFA Institute](https://rpc.cfainstitute.org/blogs/enterprising-investor/2012/volatility-harvesting-from-theory-to-practice).

## Obiezioni e risposte

::: obiezione Non è un premio, è una proprietà della media geometrica
Gorton e Rouwenhorst [sostengono](https://ideas.repec.org/p/ysm/wpaper/amz2595.html) che il "rendimento da diversificazione" è una proprietà matematica delle medie geometriche e non un effetto del ribilanciamento. Un [documento di AQR](https://www.wertpapier-forum.de/applications/core/interface/file/attachment.php?id=143201) è più netto: il ribilanciamento non ha rendimento atteso positivo se i prezzi non hanno ritorno alla media a una frequenza che il ribilanciamento riesce a catturare.
:::

::: risposta
Le due letture misurano cose diverse. Rispetto alla media ponderata dei rendimenti geometrici dei componenti, il portafoglio ribilanciato rende di più: è aritmetica, ed è ciò che [Willenbrock](https://arxiv.org/pdf/1109.1256) attribuisce al ribilanciamento. Rispetto a un portafoglio comprato e tenuto, il vantaggio non è garantito: se un'attività sale senza mai tornare indietro, ribilanciare significa venderla troppo presto.
:::

::: obiezione Nell'esempio di Shannon i prezzi non hanno deriva
Con azioni e obbligazioni reali l'attività più rischiosa ha anche il rendimento atteso più alto. Ribilanciare la riduce sistematicamente.
:::

::: risposta
Vero: su orizzonti lunghi un 60/40 lasciato libero diventa quasi tutto azionario e ha un valore atteso maggiore. Ma ha anche un rischio maggiore. Il ribilanciamento serve a mantenere il rischio che hai scelto; l'eventuale guadagno è un effetto secondario.
:::

::: obiezione Costi e imposte mangiano il vantaggio
Ogni ribilanciamento è una vendita, con commissioni e plusvalenze tassate.
:::

::: risposta
Per questo conviene ribilanciare con i nuovi versamenti o con soglie larghe invece che a calendario fitto. La frequenza conta poco; contano i costi.
:::

::: difendibile
La volatilità costa metà della varianza in rendimento composto. Ridurla con la diversificazione avvicina il percorso tipico alla media; aumentarla con la leva lo allontana, oltre un certo punto in modo distruttivo. Il ribilanciamento è controllo del rischio, non una fonte di rendimento su cui contare.
:::
