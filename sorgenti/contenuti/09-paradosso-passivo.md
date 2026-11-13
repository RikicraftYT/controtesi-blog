---
slug: paradosso-passivo
titolo: Il paradosso della gestione passiva
tesi: La gestione attiva è un gioco a somma zero prima dei costi.
obiezione: Solo in un mercato in cui nessuno emette né ritira azioni.
gruppo: prezzi
livello: intermedio
sommario: L'aritmetica di Sharpe dice che il gestore attivo medio deve perdere contro l'indice. Regge quasi del tutto, ma non del tutto: gli indici cambiano e i flussi muovono i prezzi più di quanto prevede la teoria classica.
aggiornato: 2026-11-11
---

In [Mercati efficienti](mercati-efficienti.html) il paradosso di Grossman e Stiglitz diceva che i prezzi non possono essere perfettamente informativi, altrimenti nessuno pagherebbe per informarsi. Qui la stessa tensione riguarda l'investimento indicizzato.

## L'aritmetica di Sharpe

Nel 1991 William Sharpe formula un argomento che non richiede alcuna ipotesi di efficienza. Il mercato è la somma di investitori passivi e attivi. I passivi, per definizione, ottengono il rendimento di mercato. Quindi anche gli attivi, nell'insieme, lo ottengono:

$$
r_m = w_p\,r_p + w_a\,r_a, \qquad r_p = r_m \;\Rightarrow\; r_a = r_m
$$

Prima dei costi. Dopo i costi, che per gli attivi sono più alti, l'attivo medio perde. I dati sono coerenti: secondo lo [SPIVA Europe Scorecard di metà 2026](https://www.spglobal.com/spdji/en/documents/spiva/spiva-europe-mid-year-2026.pdf), su dieci anni il 98% dei fondi azionari globali denominati in euro ha fatto peggio dell'indice.

## Dove l'aritmetica non chiude

[Lasse Pedersen](https://research-api.cbs.dk/ws/files/60084093/lasse_heje_pedersen_sharpening_the_arithmetic_of_active_management_publishersversion.pdf) osserva che l'argomento assume un mercato fisso, in cui i passivi non scambiano mai. Nel mercato reale si emettono nuove azioni, se ne riacquistano altre, gli indici cambiano composizione. Chi è passivo deve scambiare per restare tale, e scambia in momenti prevedibili, con controparti attive che si fanno pagare. Per dare l'ordine di grandezza, [un investitore che avesse comprato il mercato nel 1927 senza più scambiare, dopo dieci anni ne avrebbe posseduto solo il 60%](https://alphaarchitect.com/2018/05/sharpening-the-arithmetic-of-active-management/). Il ricambio annuo delle azioni americane [è stimato intorno al 7,6%](https://rpc.cfainstitute.org/blogs/enterprising-investor/2025/from-sharpe-to-pedersen-why-active-management-isnt-zero-sum-after-all).

La conclusione di Pedersen è misurata: i gestori attivi *possono* valere commissioni positive nell'insieme, perché svolgono la funzione di allocare capitale; se lo facciano davvero, e in che misura, è una questione empirica.

## Mercati anelastici

Una seconda crepa riguarda i flussi. La teoria classica prevede che comprare l'indice non sposti il prezzo: se sale sopra il valore, qualcuno vende. [Gabaix e Koijen](https://www.nber.org/papers/w28967) sostengono il contrario. Gran parte del capitale è gestita con mandati rigidi, per esempio una quota fissa in azioni, e chi potrebbe fare da contrappeso è troppo piccolo. La domanda aggregata risulta poco sensibile al prezzo. Stimano che un dollaro in ingresso nel mercato azionario ne aumenti il valore complessivo di circa cinque, con [un intervallo tra 3 e 8 a seconda della specificazione](https://www.cxoadvisory.com/?p=34656), e che i flussi spieghino oltre un terzo delle oscillazioni.

## Obiezioni e risposte

::: obiezione Se tutti indicizzano, chi fissa i prezzi?
Con una quota passiva crescente, sempre meno capitale valuta le società.
:::

::: risposta
Non conta la quota del patrimonio, conta quella degli scambi. I prezzi li fa chi compra e vende, e quasi tutti gli scambi restano attivi. E il meccanismo si corregge da solo: se i prezzi diventassero meno accurati, analizzarli tornerebbe redditizio.
:::

::: obiezione Il moltiplicatore di cinque è una stima fragile
Viene da venticinque anni di dati e da un metodo di identificazione recente. Lo stesso riassunto di CXO Advisory avverte che l'evidenza è esplicativa più che predittiva.
:::

::: risposta
Va preso come ordine di grandezza. Anche con un moltiplicatore di due, l'idea che i flussi siano irrilevanti non regge più. Questo indebolisce la versione forte dell'efficienza, senza creare un'opportunità: sapere che i flussi contano non dice quali flussi arriveranno.
:::

::: obiezione Allora la gestione attiva conviene
Se i passivi pagano un costo implicito agli attivi, tanto vale stare dall'altra parte.
:::

::: risposta
Il costo implicito esiste ma è piccolo rispetto alla differenza di commissioni, e il dato SPIVA misura già il risultato netto. Pedersen difende la gestione attiva come funzione economica, non il fondo attivo medio come scelta per il risparmiatore.
:::

::: obiezione L'indicizzazione gonfia i titoli più grandi
I flussi passivi comprano in proporzione alla capitalizzazione e, in un mercato anelastico, spingono i prezzi.
:::

::: risposta
Un flusso proporzionale alla capitalizzazione lascia invariati i pesi relativi: alza il livello di tutto il mercato, non i grandi rispetto ai piccoli. L'effetto sui prezzi relativi esiste soprattutto ai bordi dell'indice, tra chi entra e chi esce. Sul livello generale la questione resta aperta e si lega al [CAPE](cape-shiller.html) strutturalmente più alto.
:::

::: difendibile
L'attivo medio perde contro l'indice dopo i costi, quasi per costruzione. Il "quasi" corrisponde al servizio che gli attivi rendono ai passivi quando il mercato cambia composizione, ed è troppo piccolo per ribaltare la scelta. Indicizzare resta razionale proprio perché qualcun altro non lo fa.
:::
