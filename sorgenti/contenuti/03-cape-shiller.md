---
slug: cape-shiller
titolo: CAPE di Shiller, quanto conta il prezzo d'ingresso
tesi: Chi compra caro guadagna meno.
obiezione: Il CAPE è sopra la media da trent'anni e il mercato è salito lo stesso.
gruppo: rendimenti
sommario: Il prezzo che paghi sposta il rendimento a dieci anni più di ogni altra variabile osservabile. Ma non ti dice quando. Serve a tarare le aspettative, non a entrare e uscire.
---

Il prezzo d'ingresso è la variabile che più sposta il rendimento a dieci anni, ma non dice *quando* arriverà la correzione. Il CAPE serve a tarare le aspettative, non a decidere quando entrare e uscire.

## L'idea

Il CAPE (*cyclically adjusted price/earnings*), introdotto da Campbell e Shiller nel 1988, divide il prezzo dell'indice per la media decennale degli utili reali. Mediare su dieci anni toglie il ciclo economico dal denominatore. Il suo inverso è un rendimento da utili reale, cioè una stima grezza del rendimento reale atteso:

$$
\text{CAPE} = \frac{P}{\tfrac{1}{10}\sum_{t=1}^{10} E_t^{\,\text{reale}}} \qquad\quad E[r_{\text{reale}}] \approx \frac{1}{\text{CAPE}}
$$

Con un CAPE di 30 la stima è circa 3,3% reale annuo; con un CAPE di 15, circa 6,7%. È il termine $\Delta(P/E)$ di [Il mercato cresce nel tempo](mercato-cresce.html) reso misurabile.

## L'evidenza

Il legame tra CAPE iniziale e rendimenti successivi è negativo e robusto su orizzonti lunghi. Un'analisi Vanguard citata da [Advisor Perspectives](https://www.advisorperspectives.com/articles/2020/07/20/the-remarkable-accuracy-of-cape-as-a-predictor-of-returns-1) trova un $R^2$ di 0,43 tra CAPE e rendimenti a dieci anni nel periodo 1926–2011. Vuol dire anche che oltre metà della variabilità resta non spiegata.

## Obiezioni e risposte

::: obiezione La statistica è più debole di quanto sembra
I rendimenti decennali si sovrappongono: in un secolo ci sono una decina di osservazioni indipendenti. [Uno studio sul Financial Analysts Journal](https://doi.org/10.1080/0015198X.2018.1547056) conclude che, corrette le statistiche, l'evidenza di prevedibilità a lungo orizzonte è molto inferiore a quanto riportato.
:::

::: risposta
L'argomento non è solo statistico. Che un prezzo più alto a parità di utili implichi un rendimento più basso è aritmetica della formula di Gordon. La statistica debole dice che l'errore di stima è ampio, non che la relazione è assente.
:::

::: obiezione La media storica non è più un riferimento
[Prima del 1990 il CAPE americano valeva in media 14,1; da allora 26,6](https://rpc.cfainstitute.org/blogs/enterprising-investor/2024/cape-is-high-should-you-care). Regole contabili, riacquisti di azioni proprie al posto dei dividendi, tassi reali più bassi e composizione settoriale sono cambiati.
:::

::: risposta
Un CAPE strutturalmente più alto è compatibile con rendimenti attesi strutturalmente più bassi. Cade l'attesa di un ritorno alla media, non il legame tra livello e rendimento.
:::

::: obiezione La misura stessa è costruita male
Uno studio del giugno 2026 ripreso da [Morningstar](https://www.morningstar.com/financial-advisors/better-way-predict-long-term-stock-returns) mostra che il CAPE aggregato non pesa le società come le pesa l'indice. La versione corretta è in media 29,74 contro 21,65 nel periodo 1964–2024.
:::

::: risposta
Questa obiezione rafforza la tesi: con la misura coerente il mercato risulta più caro, non meno.
:::

::: obiezione Non funziona per fare market timing
Il Giappone era caro nel 1986 ed è salito altri tre anni; gli USA sono sopra la media storica da trent'anni.
:::

::: risposta
Vero, e va concesso. L'uso difendibile è un altro: stimare rendimenti attesi realistici per decidere quanto risparmiare e quanto prelevare (vedi [Rischio di sequenza](rischio-di-sequenza.html)), e pesare le aree geografiche.
:::

::: obiezione Prevedibilità non vuol dire inefficienza
Un CAPE alto può riflettere un premio al rischio razionalmente basso, non euforia.
:::

::: risposta
Per l'investitore le due letture portano alla stessa conclusione pratica: rendimento atteso più basso. Differiscono solo su cosa aspettarsi dopo, ed è il tema di [Mercati efficienti](mercati-efficienti.html).
:::

::: difendibile
Valutazioni alte abbassano il rendimento atteso dei dieci anni successivi, con un margine d'errore ampio. Non dicono quando vendere.
:::
