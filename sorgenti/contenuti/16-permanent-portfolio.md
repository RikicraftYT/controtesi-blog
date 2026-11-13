---
slug: permanent-portfolio
titolo: Permanent Portfolio, quattro attivi e nessuna previsione
tesi: Un attivo per ogni regime economico, in parti uguali.
obiezione: Tre quarti del capitale rinunciano al premio azionario.
gruppo: portafoglio
sommario: Azioni, obbligazioni lunghe, oro e liquidità al 25% ciascuno. Harry Browne rinuncia a prevedere e a stimare. Il conto arriva sotto forma di rendimento atteso.
aggiornato: 2026-11-13
---

È la versione senza leva e senza stime dell'idea di [Risk parity](risk-parity.html): quattro attivi in parti uguali, uno per ogni regime economico. Rinuncia a rendimento atteso in cambio di perdite massime contenute, e la rinuncia è più grande di quanto i backtest facciano sembrare.

## La tesi

Browne parte da un'ammissione: il regime economico futuro non è prevedibile. Invece di stimare volatilità e correlazioni, [bilancia il rischio economico](https://portfoliocharts.com/portfolios/permanent-portfolio/) assegnando a ogni regime l'attivo che ne beneficia.

| Regime | Attivo | Quota |
| --- | --- | --- |
| Prosperità | Azioni | 25% |
| Deflazione | Titoli di Stato a lunga scadenza | 25% |
| Inflazione | Oro | 25% |
| Recessione con stretta monetaria | Liquidità | 25% |

Tre attivi su quattro sono molto volatili. La stabilità del portafoglio nasce dal fatto che le loro correlazioni di lungo periodo sono vicine a zero, e dal ribilanciamento che vende ciò che è salito e compra ciò che è sceso.

L'effetto è quello della formula $g \approx \mu - \sigma^2/2$ vista in [Rischio di sequenza](rischio-di-sequenza.html) e in [Volatility drag](volatility-drag.html): meno volatilità a parità di media significa più crescita composta e meno dipendenza dall'ordine dei rendimenti. Per chi preleva è una proprietà di valore.

## Obiezioni e risposte

::: obiezione Un quarto in oro
L'oro non produce flussi di cassa, quindi l'argomento di [Il mercato cresce nel tempo](mercato-cresce.html) non gli si applica: non c'è motivo teorico per un rendimento reale positivo. [Tra il 1980 e il 2001 ha perso circa l'85% del potere d'acquisto](https://www.etf.com/sections/index-investor-corner/swedroe-debunking-gold-mythology), come racconta [Oro](oro.html).
:::

::: risposta
Nel portafoglio l'oro non è lì per rendere ma per essere scorrelato e reagire all'inflazione inattesa. Il suo contributo passa dal ribilanciamento. Resta che un quarto del capitale ha rendimento reale atteso vicino a zero. Quanto debba rendere un'attività poco correlata per meritare il suo posto lo calcola [Quanto deve rendere](hurdle-rate.html).
:::

::: obiezione Un quarto in liquidità
Con tassi reali negativi è una perdita certa di potere d'acquisto.
:::

::: risposta
La liquidità è la riserva che permette di comprare gli altri tre attivi dopo un crollo. Molti seguaci la sostituiscono con obbligazioni a breve, senza cambiare la logica.
:::

::: obiezione Solo il 25% in azioni
Se il premio azionario esiste, tre quarti del portafoglio rinunciano al premio più affidabile. Su trent'anni la differenza composta è enorme.
:::

::: risposta
È il prezzo dell'assicurazione, e va giudicato sull'obiettivo. Per chi accumula con orizzonte lungo e reddito da lavoro stabile è probabilmente troppo alto. Per chi deve proteggere un capitale da cui preleva può non esserlo.
:::

::: obiezione Il backtest parte nel momento più favorevole
Le serie iniziano nei primi anni Settanta. Da allora l'oro è passato da un prezzo fisso a un prezzo libero, e i tassi sono scesi dal picco del 1981 per quarant'anni. Sono due rivalutazioni irripetibili. [MoneySense](https://www.moneysense.ca/?p=18105) riporta oltre l'8% annuo nominale nei trent'anni dal 1981.
:::

::: risposta
Va concesso. I rendimenti storici sovrastimano quelli futuri; la proprietà che può persistere è la bassa volatilità, non il rendimento.
:::

::: obiezione Nemmeno questo regge sempre
Nel 2022 azioni e obbligazioni lunghe sono scese insieme. [PortfoliosLab](https://portfolioslab.com/portfolio/harry-browne-permanent) indica una perdita massima del 19,44% nell'ottobre 2022.
:::

::: risposta
I quattro regimi di Browne non includono un rialzo rapido dei tassi reali, che colpisce azioni, obbligazioni e oro insieme. Nessuna combinazione di attivi è immune da tutti i regimi; il Permanent Portfolio ne copre più del 60/40, non tutti.
:::

::: obiezione I pesi uguali sono arbitrari
Nessuna teoria dice che i regimi siano equiprobabili né che il 25% sia la dose giusta.
:::

::: risposta
L'arbitrarietà è dichiarata ed è il punto: nessuna stima significa nessun errore di stima. È la scelta opposta al risk parity, che ottimizza su parametri instabili.
:::

::: obiezione Per un investitore in euro cambia
Oro e titoli del Tesoro americani aggiungono rischio di cambio.
:::

::: risposta
La versione coerente usa titoli di Stato e liquidità nella propria valuta. L'oro resta quotato in dollari, e il cambio diventa una quinta fonte di rischio non prevista dallo schema.
:::

::: difendibile
Il Permanent Portfolio compra robustezza ai regimi con rendimento atteso. È una scelta ragionevole per proteggere, costosa per accumulare, e i suoi numeri storici non vanno proiettati in avanti.
:::
