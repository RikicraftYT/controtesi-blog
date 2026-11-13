---
slug: mercati-efficienti
titolo: Mercati efficienti, due affermazioni e una sola regge
tesi: I prezzi contengono già tutta l'informazione.
obiezione: Se fosse vero, nessuno pagherebbe per informarsi. E chi farebbe i prezzi?
gruppo: prezzi
livello: intermedio
tag: efficienza dei mercati
sommario: «Non esistono pasti gratis» e «il prezzo è giusto» sembrano la stessa frase. Non lo sono, e confonderle è l'errore più comune su questa teoria.
aggiornato: 2026-11-11
---

L'ipotesi contiene due affermazioni diverse, e solo una è ben sostenuta. «Non esistono pasti gratis», cioè battere il mercato al netto dei costi è molto difficile, regge bene. «Il prezzo è giusto», cioè i prezzi riflettono sempre il valore fondamentale, è molto più fragile.

## La tesi

Nella formulazione di [Fama (1970)](https://cepr.org/voxeu/columns/fama-hansen-shiller-nobelists-2013) i prezzi incorporano l'informazione disponibile. Le tre forme si distinguono per l'insieme di informazioni considerato.

| Forma | Informazione nei prezzi | Cosa esclude |
| --- | --- | --- |
| Debole | Prezzi e volumi passati | Analisi tecnica profittevole |
| Semi-forte | Tutta l'informazione pubblica | Analisi fondamentale profittevole |
| Forte | Anche l'informazione privata | Qualsiasi extra-rendimento, anche da insider |

Formalmente, il rendimento in eccesso rispetto a quello di equilibrio non è prevedibile con l'informazione disponibile $\Omega_t$:

$$
E\big[\, r_{t+1} - E^{*}[r_{t+1}] \;\big|\; \Omega_t \,\big] = 0
$$

$E^{*}[r_{t+1}]$ è il rendimento richiesto da un modello di equilibrio. È qui che nasce il primo problema.

## Obiezioni e risposte

::: obiezione Problema dell'ipotesi congiunta
Ogni test di efficienza è anche un test del modello di prezzo usato. Un'anomalia può indicare inefficienza oppure un modello sbagliato, e [l'efficienza in sé non può mai essere rigettata](https://knowledge.insead.edu/economics-finance/interrelated-market-efficiency-debate).
:::

::: risposta
È un limite reale: l'ipotesi nella forma pura non è falsificabile. Resta verificabile la versione pratica, cioè se qualcuno ottiene extra-rendimenti persistenti dopo i costi.
:::

::: obiezione Paradosso di Grossman e Stiglitz
Se i prezzi riflettessero tutta l'informazione, nessuno pagherebbe per raccoglierla, e i prezzi smetterebbero di rifletterla. La forma forte è logicamente impossibile.
:::

::: risposta
L'equilibrio è un mercato *quasi* efficiente: resta abbastanza inefficienza da ripagare il costo dell'informazione a chi la produce meglio. Per chi non ha quel vantaggio, la conclusione pratica non cambia.
:::

::: obiezione Volatilità in eccesso
Shiller (1981) mostrò che [i prezzi azionari oscillano molto più di quanto giustifichino le variazioni dei dividendi](https://api.thecrimson.com/column/homo-economicus/article/2013/10/18/nobel-laureates-economics).
:::

::: risposta
La replica di Fama: i prezzi si muovono perché varia il premio al rischio richiesto, non per irrazionalità. Le due letture sono osservativamente quasi equivalenti: entrambe prevedono rendimenti bassi dopo valutazioni alte, come si vede con il [CAPE](cape-shiller.html).
:::

::: obiezione Limiti all'arbitraggio
Anche chi riconosce un prezzo sbagliato può non riuscire a correggerlo. Scommettere contro una bolla richiede capitale, costa, e l'errore può allargarsi prima di chiudersi, costringendo a liquidare in perdita.
:::

::: risposta
Questa obiezione separa le due affermazioni iniziali. I prezzi possono essere sbagliati a lungo *e* non offrire profitti facili. Vedere una bolla non equivale a saperla sfruttare. Il meccanismo è sviluppato in [Finanza comportamentale](finanza-comportamentale.html).
:::

::: obiezione Anomalie
Value, momentum, bassa volatilità: rendimenti non spiegati dal rischio di mercato.
:::

::: risposta
O sono compensi per rischi non catturati dal modello, o si riducono dopo la pubblicazione e i costi. È il tema di [Factor investing](factor-investing.html) e, per i soli prezzi passati, di [Trend following](trend-following.html).
:::

::: obiezione Se tutti indicizzano, chi fa i prezzi?
La crescita della gestione passiva ridurrebbe l'efficienza su cui la gestione passiva si appoggia.
:::

::: risposta
È Grossman-Stiglitz in pratica: man mano che gli attivi diminuiscono, il compenso per chi resta sale e ne richiama altri. I prezzi li fissa chi scambia al margine, non chi detiene. [Mercati adattivi](mercati-adattivi.html) descrive questa dinamica come un ecosistema, e [Il paradosso della gestione passiva](paradosso-passivo.html) ne discute i limiti.
:::

::: difendibile
I mercati sono abbastanza efficienti da rendere improbabile un vantaggio persistente per chi non ha informazione o costi migliori degli altri. Non sono abbastanza efficienti da garantire che il prezzo di oggi sia giusto. Da un prezzo sbagliato non segue un guadagno facile.
:::
