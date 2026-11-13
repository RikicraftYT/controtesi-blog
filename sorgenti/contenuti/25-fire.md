---
slug: fire
titolo: FIRE, l'aritmetica dell'indipendenza finanziaria
tesi: Conta quanto risparmi, non quanto guadagni.
obiezione: La formula funziona solo se il futuro somiglia a un foglio di calcolo.
gruppo: vita
sommario: Il movimento FIRE riduce la libertà finanziaria a due numeri, il tasso di risparmio e il tasso di prelievo. Il primo è aritmetica solida. Il secondo è un'ipotesi presa in prestito da studi pensati per un altro problema.
aggiornato: 2026-11-13
---

FIRE sta per *Financial Independence, Retire Early*. Tolta la retorica, è un'identità contabile con due parametri: quanto del reddito metti da parte e quanto del capitale puoi spendere ogni anno senza esaurirlo. Il primo parametro regge bene alle critiche. Il secondo molto meno.

## L'idea

Se spendi una quota $1-s$ del reddito e ne risparmi una quota $s$, il capitale che ti serve è un multiplo delle spese, non del reddito. Con un tasso di prelievo $w$ il traguardo è

$$
C^{*} = \frac{\text{spese annue}}{w} \qquad\Rightarrow\qquad w = 4\% \;\Rightarrow\; C^{*} = 25 \times \text{spese}
$$

Partendo da zero, con rendimento reale $r$ e reddito normalizzato a 1, gli anni $n$ necessari risolvono

$$
s\,\frac{(1+r)^{n}-1}{r} = \frac{1-s}{w} \qquad\Rightarrow\qquad n = \frac{\ln\!\left(1 + \dfrac{r\,(1-s)}{s\,w}\right)}{\ln(1+r)}
$$

Il reddito non compare. Compare solo $s$, e compare due volte: risparmiare di più alza il flusso che accumuli e abbassa il traguardo. È il punto del testo fondativo del movimento, [The Shockingly Simple Math Behind Early Retirement](https://www.mrmoneymustache.com/2012/01/13/the-shockingly-simple-math-behind-early-retirement/), che usa $r = 5\%$ reale e $w = 4\%$.

| Tasso di risparmio | Anni al traguardo |
|---|---|
| 10% | circa 51 |
| 25% | circa 32 |
| 50% | circa 17 |
| 66% | circa 10 |

I valori escono dalla formula qui sopra e coincidono con quelli della tabella originale.

## Quanto pesa ciascuna leva

Il rendimento conta meno di quanto si crede. [Early Retirement Now](https://earlyretirementnow.com/2017/11/01/shockingly-simple-complicated-random-math-behind-early-retirement/) fa il confronto: con il 60% di risparmio e il 5% di rendimento servono 12,2 anni; con il 55% di risparmio servono 12,3 anni anche se il rendimento sale all'8%. Sono i numeri di Early Retirement Now, calcolati con ipotesi un po' diverse dalla formula qui sopra, che darebbe circa 12,4 e 12,6 anni: il confronto non cambia. Cinque punti di risparmio valgono più di tre punti di rendimento, e il risparmio è l'unica delle due variabili che controlli.

## Obiezioni e risposte

::: obiezione Il rendimento del 5% reale non è garantito
La formula usa un rendimento costante. I rendimenti veri arrivano in sequenza casuale, e [il valore atteso non è il percorso tipico](valore-atteso.html).
:::

::: risposta
Vero, ma in accumulo l'errore è tollerabile. Lo stesso articolo di Early Retirement Now rifà il calcolo sui rendimenti storici: la durata diventa un intervallo, non un numero, e chi risparmia molto ha un intervallo stretto perché il traguardo dipende soprattutto dai versamenti. Il problema serio comincia dopo, quando smetti di versare.
:::

::: obiezione Il 4% è stato calcolato per trent'anni, non per cinquanta
Chi smette di lavorare a quarant'anni ha davanti un orizzonte quasi doppio rispetto a quello degli studi da cui viene il numero.
:::

::: risposta
È l'obiezione più forte e ha un articolo suo: [La regola del 4%](regola-4-percento.html). In breve: per orizzonti lunghi la letteratura converge su valori tra il 3,25% e il 3,5%, cioè un traguardo tra 29 e 31 volte le spese, non 25.
:::

::: obiezione Tutti gli studi sono americani e ignorano le imposte
I calcoli originali [assumevano conti esenti da imposte e non contavano i costi](https://q3adv.com/the-4-percent-rule-and-taxes/). Un investitore europeo preleva da un conto tassato, in un mercato che storicamente ha reso meno di quello statunitense.
:::

::: risposta
Va concesso. Il traguardo va calcolato sulle spese al lordo delle imposte che pagherai sui prelievi, e con un tasso più prudente. Cambia il numero, non la struttura del ragionamento.
:::

::: obiezione Smettere di lavorare distrugge il capitale più grande che hai
A trent'anni il valore attuale dei redditi futuri vale più del portafoglio. Rinunciarci è la decisione finanziaria più costosa dell'intero piano.
:::

::: risposta
Per questo le varianti che reggono meglio non prevedono di smettere del tutto. Un reddito anche modesto nei primi anni riduce i prelievi proprio quando il [rischio di sequenza](rischio-di-sequenza.html) è massimo. Il tema è sviluppato in [Ciclo di vita](ciclo-di-vita.html).
:::

::: difendibile
Il tasso di risparmio determina quanto presto puoi permetterti di scegliere, e lo determina più del rendimento. Quanto capitale serva davvero dipende dal tasso di prelievo, che per un orizzonte di cinquant'anni è più vicino al 3,25% che al 4%.
:::
