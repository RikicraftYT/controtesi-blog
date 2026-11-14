---
slug: finanza-comportamentale
titolo: Finanza comportamentale e limiti all'arbitraggio
tesi: Gli errori degli irrazionali vengono corretti dai razionali.
obiezione: Correggerli costa, e chi ci prova può fallire prima di avere ragione.
livello: intermedio
tag: comportamento, efficienza dei mercati
sommario: Che gli investitori sbaglino non basta a rendere i prezzi sbagliati. Serve anche che nessuno riesca a correggerli. La finanza comportamentale sta in piedi su due gambe: la psicologia delle scelte e i limiti di chi dovrebbe arbitrare.
aggiornato: 2026-11-11
---

In [Mercati efficienti](mercati-efficienti.html) l'argomento di Friedman era implicito: chi compra caro e vende a poco perde soldi e sparisce. La finanza comportamentale risponde in due tempi.

## Prima gamba: come si sceglie davvero

Kahneman e Tversky, nel 1979, propongono che le persone valutino guadagni e perdite rispetto a un punto di riferimento, non la ricchezza finale. La funzione di valore, nella versione del 1992, è

$$
v(x) = \begin{cases} x^{\alpha} & x \ge 0 \\ -\lambda\,(-x)^{\alpha} & x < 0 \end{cases} \qquad \alpha \approx 0{,}88,\quad \lambda \approx 2{,}25
$$

$\lambda$ misura l'avversione alle perdite: una perdita pesa oltre il doppio di un guadagno uguale. Il valore 2,25 viene da [un campione di 25 studenti](https://epub.ub.uni-muenchen.de/75121/1/275.pdf). Una meta-analisi su 607 stime pubblicate tra il 1992 e il 2017 [trova una media di 1,955](https://healthcare-economist.com/2024/06/26/empirical-estimates-of-loss-aversion), con intervallo tra 1,82 e 2,10. L'effetto c'è, un po' più piccolo del numero che si cita di solito.

```grafico
{
 "tipo": "linee",
 "titolo": "La funzione di valore: una perdita pesa più di un guadagno uguale",
 "nota": "Parametri di Tversky e Kahneman (1992): α = 0,88, λ = 2,25.",
 "x": {
  "min": -100,
  "max": 100,
  "etichetta": "guadagno o perdita",
  "passi": [
   -100,
   -50,
   0,
   50,
   100
  ]
 },
 "y": {
  "min": -140,
  "max": 80,
  "etichetta": "valore percepito",
  "passi": [
   -120,
   -80,
   -40,
   0,
   40,
   80
  ]
 },
 "serie": [
  {
   "nome": "Valore percepito",
   "colore": 2,
   "generatore": {
    "nome": "prospetto",
    "alfa": 0.88,
    "lambda": 2.25
   }
  }
 ],
 "riferimenti": [
  {
   "x": 0,
   "etichetta": ""
  }
 ],
 "punti": [
  {
   "x": 100,
   "y": 57.5,
   "colore": 2,
   "etichetta": "+100 vale +57",
   "tip": "Guadagno di 100: valore percepito +57,5"
  },
  {
   "x": -100,
   "y": -129.4,
   "colore": 2,
   "etichetta": "−100 vale −129",
   "tip": "Perdita di 100: valore percepito −129,4",
   "allinea": "start"
  }
 ],
 "etichette": "legenda",
 "tabella": {
  "x": [
   -100,
   -50,
   -10,
   10,
   50,
   100
  ]
 }
}
```

Da qui derivano comportamenti che si osservano nei portafogli: vendere troppo presto i titoli in guadagno e tenere quelli in perdita, controllare troppo spesso, e chiedere per le azioni un premio più alto di quello che il rischio giustificherebbe. È la spiegazione di Benartzi e Thaler per l'[equity premium puzzle](equity-premium-puzzle.html).

## Seconda gamba: perché nessuno corregge

**Il rischio creato dagli altri.** [De Long, Shleifer, Summers e Waldmann](https://dash.harvard.edu/entities/publication/73120378-8542-6bd4-e053-0100007fdf3b) costruiscono un modello in cui gli investitori irrazionali, i *noise trader*, hanno opinioni imprevedibili. Chi scommette contro di loro rischia che domani sbaglino ancora di più. Questo rischio non dipende dai fondamentali e scoraggia l'arbitraggio. Il risultato controintuitivo è che i noise trader possono ottenere rendimenti attesi *più alti* dei razionali, perché si caricano di un rischio che loro stessi creano.

**L'arbitraggio con i soldi degli altri.** [Shleifer e Vishny](https://ms.mcmaster.ca/~grasselli/ShleiferVishny97.pdf) osservano che l'arbitraggio da manuale non richiede capitale e non comporta rischio, mentre quello reale richiede entrambi ed è svolto da pochi specialisti che gestiscono denaro altrui. Quando un prezzo sbagliato si allontana ancora dal valore, l'arbitraggista registra una perdita, i clienti ritirano i fondi e lui deve chiudere la posizione nel momento in cui è più conveniente. L'arbitraggio diventa inefficace proprio quando servirebbe di più. [Il caso LTCM, un anno e mezzo dopo l'articolo](https://www.euromoney.com/article/b12kjxzwtlw9dd/null), è l'esempio più citato: il fondo non fallì perché avesse torto, ma perché non riuscì a finanziarsi.

## Obiezioni e risposte

::: obiezione Una teoria che spiega tutto non spiega niente
Per ogni anomalia esiste un bias che la giustifica a posteriori. Sotto-reazione e sovra-reazione vengono invocate entrambe, secondo il bisogno.
:::

::: risposta
È la critica di Fama, e coglie nel segno per la prima gamba. La seconda gamba invece fa previsioni verificabili: le anomalie dovrebbero concentrarsi dove arbitrare costa di più, cioè titoli piccoli, poco liquidi, difficili da vendere allo scoperto. È quello che si osserva nel [factor investing](factor-investing.html).
:::

::: obiezione Gli esperimenti usano studenti e poste simboliche
Con poste alte e partecipanti esperti i bias si attenuano.
:::

::: risposta
Si attenuano, non scompaiono. E ai prezzi basta che i capitali razionali siano limitati, non che tutti siano irrazionali.
:::

::: obiezione Se i prezzi sono sbagliati, perché i gestori non battono l'indice?
È l'obiezione che chiude ogni discussione sull'efficienza.
:::

::: risposta
I limiti all'arbitraggio rispondono proprio a questo. Un prezzo può essere sbagliato senza che sia redditizio correggerlo, perché il tempo e il capitale necessari costano più del guadagno atteso. "I prezzi sono giusti" e "non ci sono pasti gratis" sono due affermazioni distinte: la seconda può valere anche se la prima è falsa.
:::

::: difendibile
I prezzi possono allontanarsi dal valore a lungo, perché correggerli richiede capitale paziente, che è scarso. Per l'investitore individuale conta la conseguenza: l'errore sistematico più costoso è il proprio, e si riduce con regole fissate in anticipo, non provando a sfruttare quello degli altri.
:::
