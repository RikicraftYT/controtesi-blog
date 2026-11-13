---
slug: greche
titolo: Le greche, che cosa compri insieme a una call
tesi: Comprare una call è scommettere sul rialzo.
obiezione: Si scommette anche sulla volatilità e contro il tempo: si può avere ragione e perdere.
livello: avanzato
gruppo: derivati
tag: opzioni, volatilità
sommario: Il prezzo di un'opzione reagisce al sottostante, al tempo, alla volatilità e ai tassi. Le greche misurano ciascuna di queste sensibilità. Servono a capire che una call non è una scommessa sola, ma tre.
aggiornato: 2026-11-13
prima: valore-temporale
---

Compri una call perché pensi che l'azione salirà. L'azione sale, e la call perde valore. Non è un errore del mercato: è successo qualcos'altro nello stesso tempo. Le *greche*, chiamate così perché indicate con lettere greche, separano i diversi motivi per cui il prezzo di un'opzione si muove. L'articolo le presenta una per una e mostra che cosa cambia nel modo di pensare una posizione.

## Le cinque sensibilità

L'autorità statunitense di vigilanza sugli intermediari ne dà definizioni sintetiche, riprese qui sotto.

- **Delta** ($\Delta$). Di quanto cambia il premio [per un dollaro di variazione del sottostante](https://www.finra.org/investors/insights/options-z-basics-greeks). Va da 0 a 1 per le call, da 0 a −1 per le put. Una call con delta 0,5 guadagna circa 50 centesimi se l'azione sale di un euro.
- **Gamma** ($\Gamma$). Di quanto cambia il delta quando il sottostante si muove di un euro. È [massima per le opzioni al prezzo vicine alla scadenza](https://www.finra.org/investors/insights/options-z-basics-greeks).
- **Theta** ($\Theta$). Di quanto cambia il premio per ogni giorno che passa. Per chi compra è negativa: è il decadimento temporale visto in [Valore temporale](valore-temporale.html).
- **Vega**. Di quanto cambia il premio per un punto di variazione della volatilità implicita. (Non è una lettera greca, ma il nome è rimasto.)
- **Rho** ($\rho$). Di quanto cambia il premio per un punto di variazione dei tassi d'interesse. Conta soprattutto per le scadenze lunghe.

## Un esempio con i numeri

Una call al prezzo, strike 100, azione a 100, 30 giorni, volatilità implicita 20%. In un modello standard:

| Greca | Valore | Che cosa vuol dire |
| --- | --- | --- |
| Prezzo | 2,41 | il premio di oggi |
| Delta | 0,53 | +0,53 se l'azione sale di 1 |
| Theta | −0,04 | −0,04 ogni giorno |
| Vega | 0,11 | +0,11 per un punto di volatilità |

Valori illustrativi con un tasso del 3%.

Ora una situazione. In una settimana l'azione sale di 1, a 101: la call guadagna circa 0,53. Nello stesso tempo passano sette giorni: perde circa 0,30. E la volatilità implicita scende dal 20% al 16%: perde circa 0,45. Sommate, le tre voci danno circa −0,22. Ricalcolando il prezzo con la formula la call vale 2,27, cioè 0,14 in meno: la somma è approssimata perché le greche cambiano mentre il prezzo si muove, ma il segno è lo stesso. Avevi ragione sulla direzione e hai perso. L'esempio è illustrativo.

```grafico
{
 "tipo": "cascata",
 "titolo": "Una settimana di una call: da dove viene la perdita",
 "nota": "Esempio illustrativo dell'articolo: call al prezzo, 30 giorni, volatilità implicita dal 20% al 16%, tasso del 3%.",
 "formato": {
  "dec": 2
 },
 "min": 1.6,
 "max": 3.1,
 "inizio": {
  "etichetta": "Premio iniziale",
  "valore": 2.41
 },
 "passi": [
  {
   "etichetta": "Azione da 100 a 101 (delta)",
   "valore": 0.53
  },
  {
   "etichetta": "Sette giorni in meno (theta)",
   "valore": -0.3
  },
  {
   "etichetta": "Volatilità in calo (vega)",
   "valore": -0.45
  }
 ],
 "fine": {
  "etichetta": "Stima con le greche"
 },
 "confronto": {
  "etichetta": "Prezzo ricalcolato",
  "valore": 2.27
 }
}
```

## Tre scommesse in una

L'esempio rende evidente una cosa che il profilo alla scadenza nasconde. Chi compra una call o una put non prende solo una posizione sulla direzione. È anche **lungo volatilità**, perché guadagna se le oscillazioni attese aumentano, e **corto tempo**, perché perde ogni giorno che passa senza movimenti.

Da qui una distinzione utile tra due famiglie di strategie.

- **Strategie direzionali.** Puntano sul movimento del prezzo: delta grande, il resto il più possibile piccolo.
- **Strategie sulla volatilità.** Puntano su quanto il prezzo si muoverà, non sul verso: delta vicino a zero, vega e gamma grandi. Ne è un esempio lo *straddle*, descritto in [Strategie con più opzioni](strategie-combinate.html).

## Il caso tipico: le trimestrali

Prima della pubblicazione dei conti trimestrali di un'azienda l'incertezza è massima, e la volatilità implicita sale. Subito dopo l'annuncio l'incertezza si risolve e la volatilità implicita crolla: gli operatori lo chiamano *volatility crush*. Chi ha comprato opzioni il giorno prima può vedere l'azione muoversi nella direzione giusta e l'opzione perdere valore, perché il calo della vega pesa più del guadagno del delta.

Lo stesso vale per i dividendi, ma in modo prevedibile. Un dividendo noto fa scendere il prezzo dell'azione il giorno in cui si stacca: il mercato lo sa e lo incorpora nel premio in anticipo. Le call valgono un po' meno, le put un po' di più.

## Delta come probabilità, con prudenza

Il delta viene spesso letto come la probabilità che l'opzione scada nel denaro. È un'approssimazione: le due grandezze sono vicine ma non uguali, e la probabilità che ne risulta è quella implicita nei prezzi, che contiene un premio per il rischio. Una call con delta 0,2 non scade nel denaro una volta su cinque, se non per caso.

## Obiezioni e risposte

::: obiezione Le greche servono solo ai professionisti
Chi compra qualche opzione ogni tanto non ha bisogno di questo apparato.
:::

::: risposta
Ha bisogno almeno del theta e della vega, perché sono le due forze che lavorano contro chi compra senza che lo si veda. Il resto può restare sullo sfondo. L'apparato completo serve a chi costruisce posizioni con molte gambe o deve coprirle.
:::

::: obiezione Basta il delta per capire il rischio
Il delta dice quanto la posizione si comporta come l'azione. Il resto sono dettagli.
:::

::: risposta
Il delta cambia, ed è proprio la gamma a dirlo. Una posizione con delta piccolo può diventare grande in poche ore, soprattutto vicino alla scadenza. Chi vende opzioni con delta basso lo scopre quando il mercato si muove molto: la posizione, che sembrava quasi neutra, si comporta all'improvviso come molte azioni.
:::

::: obiezione Le greche dipendono dal modello
Sono derivate da Black e Scholes, che ha ipotesi false. Quindi sono numeri inaffidabili.
:::

::: risposta
In parte è vero: modelli diversi danno greche leggermente diverse, soprattutto per le opzioni molto fuori dal denaro. Ma il segno e l'ordine di grandezza sono robusti. Che una call comprata perda valore con il tempo e lo guadagni con la volatilità non dipende dal modello.
:::

## Che cosa farne

1. **Prima di comprare, guarda theta e vega.** Dicono quanto perdi se il prezzo resta fermo e se la volatilità scende.
2. **Evita di comprare volatilità già alta.** Prima di un evento atteso il premio include già il movimento che temi o speri.
3. **Distingui direzione e volatilità.** Chiediti su quale delle due stai davvero scommettendo.

::: difendibile
Chi compra una call scommette sul rialzo, ma anche sull'aumento della volatilità e contro il passare del tempo. Le greche misurano separatamente queste tre esposizioni. Ignorarle è il modo più comune di avere ragione sulla direzione e perdere lo stesso.
:::
