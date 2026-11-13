---
slug: risk-parity
titolo: Risk parity, dividere il rischio e non il capitale
tesi: Va bilanciato il rischio, non il capitale.
obiezione: Funziona finché azioni e obbligazioni non scendono insieme. Nel 2022 è successo.
gruppo: portafoglio
sommario: Un 60/40 è per il 95% una scommessa azionaria. Risk parity lo corregge, ma per trasformare l'equilibrio in rendimento ha bisogno di leva e di correlazioni che stiano ferme.
aggiornato: 2026-11-13
---

Dividere il capitale in parti uguali non divide il rischio in parti uguali. Risk parity parte da questa osservazione corretta, ma per trasformarla in rendimento ha bisogno di due ipotesi fragili: correlazioni stabili e leva a buon mercato.

## Classi di attivo come pacchetti di rischi

Le etichette tradizionali nascondono esposizioni comuni. Azioni, obbligazioni societarie e immobiliare quotato dipendono tutte dalla crescita economica. Un portafoglio con sei classi di attivo può avere un solo rischio dominante.

L'allocazione per fattori di rischio scompone ogni attivo nelle sue sensibilità a pochi motori macro: crescita, inflazione, tassi reali, credito, liquidità. Poi bilancia quelle, non le etichette. Il tema è ripreso, con un caso numerico, in [Etichette e rischi](etichette-e-rischi.html).

## La matematica

La volatilità di portafoglio $\sigma_p$, dati i pesi $w$ e la matrice di covarianza $\Sigma$, si scompone nei contributi $RC_i$ dei singoli attivi:

$$
\sigma_p = \sqrt{w^{\top}\Sigma\, w} \qquad RC_i = \frac{w_i\,(\Sigma w)_i}{\sigma_p} \qquad \sum_i RC_i = \sigma_p
$$

Risk parity sceglie i pesi in modo che tutti gli $RC_i$ siano uguali. Con correlazioni nulle o uguali tra loro la soluzione è semplice, pesi inversamente proporzionali alla volatilità:

$$
w_i = \frac{1/\sigma_i}{\sum_j 1/\sigma_j}
$$

### Un esempio numerico

Ipotesi illustrative: azioni con volatilità 16%, obbligazioni 5%, correlazione zero.

| Portafoglio | Peso azioni | Peso bond | Rischio da azioni | Volatilità |
| --- | --- | --- | --- | --- |
| 60/40 | 60% | 40% | 96% | 9,8% |
| Risk parity senza leva | 24% | 76% | 50% | 5,4% |
| Risk parity con leva 1,8 | 43% | 139% | 50% | 9,8% |

Il 60/40 è quasi interamente una scommessa azionaria. Un backtest dal 1987 riportato da [ETF Central](https://www.etfcentral.com/news/risk-parity-etfs-effective-2022) trova un valore simile: 94,83% del rischio dalle azioni.

La versione senza leva è bilanciata ma rende poco. Per riportarla alla volatilità del 60/40 serve una leva di circa 1,8, cioè prendere a prestito l'82% del capitale.

## Perché la leva dovrebbe pagare

Asness, Frazzini e Pedersen danno la giustificazione teorica: molti investitori non possono o non vogliono usare leva, quindi per avere più rendimento comprano attivi rischiosi e ne alzano il prezzo. Gli attivi sicuri offrono allora un rendimento per unità di rischio più alto, e chi può usare leva lo incassa.

Nei loro dati USA 1926–2010 un portafoglio risk parity con lo stesso rischio del mercato [lo ha battuto di circa il 4% annuo](https://econpapers.repec.org/RePEc:taf:ufajxx:v:68:y:2012:i:1:p:47-59). Gli autori lavorano per AQR, che offre fondi risk parity.

## Obiezioni e risposte

::: obiezione Le correlazioni non sono costanti
La matrice $\Sigma$ è stimata sul passato. Dal 2000 la correlazione mobile a 24 mesi tra azioni e obbligazioni era in media intorno a −0,20; [nel 2022 è salita a circa +0,65](https://angelinvestorsnetwork.com/market-analysis/risk-parity-hedge-fund-strategy-bridgewater-all-weather). Per [CAIA](https://caia.org/node/7312) il 2022 è stato un disastro per l'intera categoria, che dipende da una correlazione bassa più del 60/40 proprio a causa della leva.
:::

::: risposta
Il segno della correlazione dipende dal regime. È negativa quando lo shock riguarda la crescita, positiva quando riguarda l'inflazione, e [vicina a zero sul periodo 1927–2021](https://www.evidenceinvestor.com/post/when-stocks-and-bonds-fall-together). Un risk parity ben costruito bilancia per regimi macro e include materie prime e titoli indicizzati all'inflazione. È la difesa teorica; il 2022 è stato il banco di prova, e per la categoria nel suo insieme è andato male.
:::

::: obiezione La leva ha costi e può essere revocata
[Anderson, Bianchi e Goldberg](https://cdar.berkeley.edu/sites/default/files/2012_Anderson-et-al.-WillRiskStrategyOutperfom.pdf) rifanno il test 1926–2010 con costi di finanziamento e di transazione realistici: il risk parity a leva finisce dietro sia al 60/40 sia al portafoglio a pesi di mercato. Il risultato dipende inoltre molto dal periodo scelto.
:::

::: risposta
Per chi accede a leva tramite futures i costi possono essere inferiori a quelli ipotizzati. Resta il rischio che non si elimina: la riduzione forzata della leva nel momento peggiore, che trasforma una perdita temporanea in permanente. È lo stato assorbente di cui parla [Valore atteso](valore-atteso.html). E oltre una certa leva cala anche il rendimento composto, come mostra [Volatility drag](volatility-drag.html).
:::

::: obiezione Volatilità non è rischio
Pareggiare le volatilità ignora asimmetrie, code e liquidità. Un'obbligazione a tasso zero ha bassa volatilità e rischio molto asimmetrico.
:::

::: risposta
Limite reale del metodo, e [Code grasse](code-grasse.html) spiega perché pesa. Si può sostituire la volatilità con misure di perdita estrema, al prezzo di stime più instabili.
:::

::: obiezione Il backtest coincide con quarant'anni di tassi in discesa
Dal 1981 al 2021 fare leva sulle obbligazioni è stata la scommessa vincente a prescindere dalla teoria.
:::

::: risposta
È l'obiezione più seria, e il campione dal 1926 la attenua solo in parte. Sposta l'onere della prova su chi propone la strategia a partire da tassi bassi.
:::

::: obiezione È prociclica
Quando la volatilità sale, la strategia vende; se molti fondi usano la stessa regola, le vendite si amplificano.
:::

::: risposta
Vero per le versioni a volatilità obiettivo con ribilanciamento rapido. Finestre di stima lunghe riducono l'effetto.
:::

::: obiezione I fattori di rischio non si comprano
Crescita e inflazione non sono titoli. Le sensibilità vanno stimate e cambiano nel tempo.
:::

::: risposta
La scomposizione per fattori vale più come diagnosi che come ricetta. Serve a scoprire che un portafoglio apparentemente diversificato ha un solo rischio, anche se poi lo si corregge con strumenti ordinari.
:::

::: difendibile
Bilanciare i contributi di rischio è un criterio di diversificazione migliore dei pesi di capitale. Che il portafoglio bilanciato, portato a leva, batta il mercato è un'ipotesi distinta e molto meno solida.
:::
