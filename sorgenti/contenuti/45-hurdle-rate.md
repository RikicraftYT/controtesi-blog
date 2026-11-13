---
slug: hurdle-rate
titolo: Quanto deve rendere per meritare un posto
tesi: Un investimento va aggiunto se ha un buon rendimento atteso.
obiezione: Va aggiunto se rende più di quanto costa in rischio al portafoglio che hai già.
gruppo: esposizioni
livello: avanzato
tag: asset allocation, oro, rischio
sommario: Ogni nuovo investimento ha una soglia di rendimento che dipende dal portafoglio in cui entra. Si calcola con una moltiplicazione. Nel caso di studio di MSCI, oro e intelligenza artificiale hanno la stessa volatilità e soglie che distano più di sette punti.
aggiornato: 2026-11-13
---

Davanti a un nuovo investimento la domanda abituale è: renderà bene? La domanda corretta è un'altra: renderà abbastanza da compensare il rischio che aggiunge a ciò che possiedo? La risposta non dipende solo dall'investimento.

## L'idea

Sia $R_p$ il rendimento atteso del portafoglio in eccesso rispetto al tasso privo di rischio, $\sigma_p$ la sua volatilità. Un'attività candidata ha volatilità $\sigma_i$ e correlazione $\rho$ con il portafoglio. Il suo beta rispetto al portafoglio è

$$
\beta_i = \rho \,\frac{\sigma_i}{\sigma_p}
$$

Aggiungerne una piccola quantità migliora il rapporto tra rendimento e rischio del portafoglio se e solo se il suo rendimento atteso in eccesso supera

$$
\text{soglia}_i = \beta_i \times R_p
$$

È la *hurdle rate*. Traduce il beneficio di diversificazione in unità di rendimento. Un'attività poco correlata ha una soglia bassa: può rendere poco ed essere comunque utile, perché abbassa la volatilità complessiva e con essa il [volatility drag](volatility-drag.html). Un'attività molto correlata e volatile ha una soglia alta: deve rendere molto per giustificare il posto.

Il ragionamento è lo stesso del CAPM, con una differenza decisiva: il beta non si misura rispetto al mercato, ma rispetto al *tuo* portafoglio. La stessa attività ha soglie diverse in portafogli diversi.

## Il caso: oro contro intelligenza artificiale

Nel paper MSCI *Total-Portfolio Approach: Framework in Practice* il fondo, che applica il [total portfolio approach](tpa.html) ed è arrivato allo stadio in cui ogni investimento compete con tutti gli altri, valuta due idee opposte: una posizione concentrata sulla filiera dell'intelligenza artificiale e un'allocazione in oro fisico. Con le caselle, le due idee non si sarebbero mai incontrate: una sarebbe stata confrontata con un indice azionario, l'altra con le alternative liquide.

Il portafoglio ha volatilità 11,31% e rendimento atteso in eccesso 5,65%.

| Candidato | Volatilità | Correlazione con il fondo | Beta | Soglia |
|---|---|---|---|---|
| Oro | 23,0% | 0,24 | 0,48 | 2,72% |
| Indice filiera IA | 23,3% | 0,88 | 1,80 | 10,17% |

Il conto si verifica a mano:

$$
\beta_{\text{oro}} = 0{,}24 \times \frac{23{,}0}{11{,}31} \approx 0{,}48 \qquad \beta_{\text{IA}} = 0{,}88 \times \frac{23{,}3}{11{,}31} \approx 1{,}80
$$

Stessa volatilità, soglie a 7,45 punti di distanza. La differenza è tutta nella correlazione. I dieci titoli maggiori dell'indice sull'intelligenza artificiale, il 45% dell'indice, erano già tra le tredici maggiori posizioni azionarie del fondo. Comprarli di nuovo aggiunge rischio che il fondo ha già.

Il paper non dice quale dei due scegliere, e fa bene. Dice quale premio serve: l'intelligenza artificiale è il candidato migliore solo se ci si aspetta che renda oltre 7,45 punti l'anno più dell'oro. Se nessuno dei due supera la propria soglia, il fondo può rinunciare a entrambi.

## Da dove si prende il denaro

La soglia ha un secondo significato. Per fare posto al candidato bisogna vendere qualcosa, e a parità di rischio totale ciò che si vende ha, al margine, un rendimento atteso pari alla soglia. La soglia è ciò a cui si rinuncia.

Nel caso MSCI, per ogni dollaro di oro il fondo vende 58 centesimi di obbligazioni, 26 di azioni e 17 di attività reali quotate: l'oro è poco correlato, quindi si paga soprattutto con attività a basso rendimento. Per ogni dollaro della posizione sull'intelligenza artificiale il fondo deve vendere 1,66 dollari di azioni e *comprare* 49 centesimi di attività reali e 17 di obbligazioni, perché la posizione è più rischiosa delle azioni che sostituisce. Chi la comprasse vendendo un dollaro di azioni si ritroverebbe con più rischio di prima.

## Obiezioni e risposte

::: obiezione Il ragionamento è circolare
I rendimenti attesi usati nel caso sono ricavati per ottimizzazione inversa: si assume che il portafoglio attuale sia ottimale e si calcolano i rendimenti che lo renderebbero tale. Poi si usa quel risultato per giudicare le aggiunte.
:::

::: risposta
È un'ipotesi di coerenza, non una previsione, e va letta così. La soglia dice: dato ciò che possiedi e il rendimento che ne attendi, un'aggiunta è coerente solo sopra questo livello. Se il portafoglio di partenza è sbagliato, lo è anche la soglia. Ma chi rifiuta l'ipotesi deve fornire le proprie stime di rendimento per tutto, il che è più difficile e non meno arbitrario.
:::

::: obiezione Il rendimento del portafoglio è un numero scelto
Il 5,65% deriva da un indice di Sharpe fissato a 0,5. Con 0,3 la soglia dell'intelligenza artificiale scenderebbe intorno al 6%.
:::

::: risposta
Vero, e il paper lo dichiara: l'indice di Sharpe scala tutte le soglie nella stessa proporzione. Non cambia la classifica tra i candidati né il rapporto tra le soglie, che è di 3,7 a 1. Il risultato robusto è il confronto, non il livello.
:::

::: obiezione Vale solo per piccole aggiunte
La soglia è un calcolo al margine. Una posizione grande cambia la struttura del portafoglio, e con essa il beta.
:::

::: risposta
Sì. Aggiungendo oro, la correlazione dell'oro con il portafoglio sale, e la soglia con lei. Per questo una soglia bassa non autorizza una quota alta. Il caso MSCI ragiona su un'aggiunta dello 0,25% e indica che per quote maggiori va rifatta l'ottimizzazione.
:::

::: obiezione La correlazione dell'oro non è una costante
Lo 0,24 è una stima a una data, e le correlazioni cambiano nel tempo.
:::

::: risposta
È il punto debole di tutto l'impianto: soglie precise al centesimo costruite su correlazioni instabili. Il [Permanent Portfolio](permanent-portfolio.html) ha lo stesso problema, e l'[articolo sull'oro](oro.html) mostra quanto il suo ruolo dipenda da quella correlazione. La soglia va usata come ordine di grandezza. Che un'attività poco correlata abbia bisogno di rendere molto meno di una molto correlata resta vero per un intervallo ampio di stime.
:::

::: obiezione Così si scartano sempre i vincitori
Ciò che è salito pesa già molto in portafoglio, quindi ha un beta alto e una soglia alta. Il metodo penalizza ciò che funziona.
:::

::: risposta
Non lo scarta: gli chiede di più. È la traduzione in numeri di un principio semplice: raddoppiare su ciò che già domina il portafoglio richiede una convinzione proporzionale.
:::

## Che cosa resta a un privato

Il calcolo richiede tre numeri, e si fa su un foglio. Un esempio illustrativo, con valori inventati: un portafoglio con volatilità del 12% e rendimento atteso in eccesso del 4%.

| Candidato | Volatilità | Correlazione | Beta | Soglia |
|---|---|---|---|---|
| ETF tematico tecnologico | 24% | 0,90 | 1,80 | 7,2% |
| Obbligazioni indicizzate all'inflazione | 6% | 0,20 | 0,10 | 0,4% |
| Azioni di un mercato emergente | 20% | 0,60 | 1,00 | 4,0% |

L'ETF tematico deve rendere oltre sette punti sopra il tasso privo di rischio per migliorare questo portafoglio; alle obbligazioni indicizzate basta meno di mezzo punto. Sono soglie, non previsioni: dicono a quale domanda bisogna saper rispondere prima di comprare.

Tre usi pratici:

1. **Prima di aggiungere un fondo**, chiedersi quanto è correlato con ciò che si ha. Un tematico sugli stessi titoli che dominano l'indice globale ha una correlazione vicina a 0,9.
2. **Finanziare in modo coerente.** Se il nuovo acquisto ha beta sopra 1, per non alzare il rischio bisogna vendere più azioni del valore comprato, o accettare consapevolmente più rischio.
3. **Rifare il conto quando il portafoglio cambia.** La soglia di ieri non vale per il portafoglio di oggi.

::: difendibile
Il rendimento atteso di un investimento va confrontato con una soglia che dipende dal portafoglio in cui entra: il rendimento atteso del portafoglio moltiplicato per il beta del candidato rispetto ad esso. Un'attività poco correlata merita un posto anche con un rendimento modesto; una che replica ciò che già possiedi deve rendere molto di più. I numeri sono stime fragili, la gerarchia che ne esce no.
:::
