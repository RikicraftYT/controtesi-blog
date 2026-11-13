---
slug: valore-temporale
titolo: Valore temporale, perché un'opzione vale più del suo incasso
tesi: Un'opzione vale ciò che renderebbe esercitata oggi.
obiezione: Conta anche ciò che può succedere prima della scadenza, e quanto oscilla il prezzo.
livello: avanzato
gruppo: derivati
tag: opzioni, volatilità, statistica
sommario: Il premio di un'opzione ha due parti: il valore intrinseco, cioè ciò che renderebbe oggi, e il valore temporale, cioè la possibilità che renda di più. La seconda cresce con il tempo e con la volatilità, e la formula di Black e Scholes la misura.
aggiornato: 2026-11-13
prima: profili-di-rendimento
---

Un'azione vale 105. Una put con strike 100 non renderebbe nulla se esercitata oggi: venderesti a 100 ciò che sul mercato vale 105. Eppure costa qualcosa, poco meno di 3 in un modello standard con due mesi di vita. Che cosa si paga? L'articolo divide il premio nelle sue due parti e mostra da che cosa dipende quella invisibile.

## Valore intrinseco e valore temporale

Il **valore intrinseco** è ciò che l'opzione renderebbe esercitata adesso. Per una call è $\max(S - K, 0)$, per una put $\max(K - S, 0)$, dove $S$ è il prezzo attuale e $K$ lo strike. È zero per ogni opzione fuori dal denaro.

Il **valore temporale**, o *estrinseco*, è il resto:

$$
\text{premio} = \text{valore intrinseco} \acapo + \text{valore temporale}
$$

Riprendiamo la put. Con l'azione a 105, strike 100, due mesi di scadenza e una volatilità del 30% l'anno, un modello standard dà un premio di 2,69: tutto valore temporale. Se l'azione scende a 90 quando mancano 45 giorni, la put vale 10,52. Il valore intrinseco è 10, il temporale si è ridotto a 0,52. Se nello stesso momento la volatilità attesa sale al 45%, la put vale 11,98. Sono calcoli illustrativi con un tasso del 3%.

Tre forze hanno agito insieme. La put è entrata nel denaro, ed è salita. È passato del tempo, ed è scesa. È cambiata la volatilità attesa, e si è mossa di conseguenza.

## Perché il tempo ha valore

Il valore temporale nasce da un'asimmetria. Chi possiede un'opzione beneficia dei movimenti favorevoli e non paga quelli sfavorevoli oltre il premio.

Si vede con due dadi. Il primo ha dieci facce: vinci il risultato meno 5, se positivo, altrimenti niente. Il secondo ha venti facce: vinci il risultato meno 10, se positivo. In media, il risultato meno la soglia vale 0,5 per entrambi. Ma il valore atteso della vincita no:

$$
\text{d10:}\ \frac{1+2+3+4+5}{10} = 1{,}5 \qquad \text{d20:}\ \frac{1+2+\dots+10}{20} = 2{,}75
$$

Al numeratore ci sono le vincite possibili, al denominatore il numero di facce. Il dado più largo vale quasi il doppio, pur avendo la stessa media. Conta l'ampiezza dei risultati possibili, perché la metà sfavorevole è tagliata a zero.

Il tempo fa lo stesso: più giorni restano, più si allarga il ventaglio dei prezzi possibili alla scadenza, più vale l'opzione. Il ventaglio cresce circa con la radice quadrata del tempo, e il premio con lui. Una call al prezzo, con volatilità del 20%, vale in un modello standard:

| Giorni alla scadenza | Premio |
| --- | --- |
| 90 | 4,33 |
| 30 | 2,41 |
| 10 | 1,36 |
| 1 | 0,42 |

Sono calcoli illustrativi su un'azione a 100. Triplicare il tempo non triplica il premio. E la discesa accelera vicino alla scadenza: è il *decadimento temporale*.

```grafico
{
 "tipo": "linee",
 "titolo": "Premio di una call con strike 100, a varie distanze dalla scadenza",
 "interattivo": "opzione",
 "nota": "Calcolo illustrativo con la formula di Black e Scholes, volatilità del 20% e tasso del 3%. La distanza tra ogni curva e il valore intrinseco è il valore temporale. Con JavaScript attivo puoi cambiare giorni e volatilità.",
 "x": {
  "min": 70,
  "max": 130,
  "etichetta": "prezzo dell'azione"
 },
 "y": {
  "min": 0,
  "max": 35,
  "etichetta": "premio",
  "formato": {
   "dec": "auto"
  }
 },
 "serie": [
  {
   "nome": "90 giorni",
   "colore": 1,
   "generatore": {
    "nome": "bs-premio",
    "K": 100,
    "giorni": 90,
    "r": 0.03,
    "sigma": 0.2,
    "tipo": "call"
   }
  },
  {
   "nome": "30 giorni",
   "colore": 3,
   "generatore": {
    "nome": "bs-premio",
    "K": 100,
    "giorni": 30,
    "r": 0.03,
    "sigma": 0.2,
    "tipo": "call"
   }
  },
  {
   "nome": "Valore intrinseco",
   "colore": 2,
   "tratteggio": true,
   "generatore": {
    "nome": "intrinseco",
    "K": 100,
    "tipo": "call"
   }
  }
 ],
 "tabella": {
  "x": [
   90,
   100,
   110
  ]
 }
}
```

L'analogia con le assicurazioni è esatta. Il comunicato con cui l'Accademia svedese premiò Merton e Scholes nel 1997 lo dice esplicitamente: [chi possiede un contratto di assicurazione possiede una specie di opzione](https://www.nobelprize.org/nobel_prizes/economic-sciences/laureates/1997/press.html). Una polizza di un anno costa più di una di un mese perché copre più eventi possibili.

## La volatilità implicita

La terza forza è la **volatilità**: quanto ci si aspetta che il prezzo oscilli da qui alla scadenza. Più è alta, più largo è il ventaglio, più vale l'opzione.

Non è osservabile direttamente. Si ricava al contrario: dato il premio che il mercato paga, si cerca la volatilità che lo giustifica. Questa si chiama **volatilità implicita** (*implied volatility*, IV), ed è il modo in cui gli operatori quotano le opzioni.

Un esempio mostra quanto pesa. Una call con strike 100 su un'azione a 90, a 30 giorni, con volatilità implicita del 20% vale 0,08. Nei due giorni successivi il mercato è agitato: l'azione crolla e poi recupera fino a 89. Se la volatilità implicita sale al 60%, la stessa call, ora a 28 giorni, vale 2,28. Il prezzo è più basso di prima, il tempo è meno, eppure l'opzione vale quasi trenta volte tanto. I numeri sono illustrativi.

## La formula di Black e Scholes

Nel 1973 Fischer Black e Myron Scholes pubblicarono una formula per il prezzo di una call europea; Robert Merton ne diede un'altra derivazione e la generalizzò. Il risultato decisivo, spiega l'Accademia svedese, è che [per valutare un'opzione non serve conoscere alcun premio per il rischio, perché è già incluso nel prezzo dell'azione](https://www.nobelprize.org/prizes/economics/1997/press-release/). La formula è:

$$
C = S\,N(d_1) - K e^{-rT} N(d_2)
$$

$$
d_1 = \frac{\ln(S/K) + (r + \sigma^2/2)\,T}{\sigma\sqrt{T}} \qquad d_2 = d_1 - \sigma\sqrt{T}
$$

dove $C$ è il prezzo della call, $S$ il prezzo attuale del sottostante, $K$ lo strike, $T$ il tempo alla scadenza in anni, $r$ il tasso privo di rischio, $\sigma$ la volatilità annua e $N(\cdot)$ la probabilità che una variabile normale standard sia minore del valore tra parentesi. Il primo termine è, in sostanza, il valore atteso di ciò che si riceve; il secondo il valore attuale di ciò che si paga, pesato per la probabilità di esercitare.

Dei cinque ingredienti, quattro si osservano: prezzo, strike, tempo e tasso. Solo la volatilità va stimata. Per questo il mercato delle opzioni è, in fondo, un mercato della volatilità.

## Obiezioni e risposte

::: obiezione La formula è sbagliata
Black e Scholes assumono rendimenti distribuiti normalmente e volatilità costante. Nella realtà i crolli sono più frequenti e la volatilità cambia continuamente.
:::

::: risposta
Va concesso: le ipotesi sono false, e il mercato lo sa. Lo si vede perché opzioni con strike diversi sullo stesso titolo implicano volatilità diverse, mentre il modello ne prevede una sola. Le put molto fuori dal denaro, che proteggono dai crolli, costano più di quanto la formula giustificherebbe. La formula resta il linguaggio comune: si usa per tradurre prezzi in volatilità implicite, non per credere che siano costanti. Perché i crolli siano più frequenti di quanto dica la distribuzione normale è il tema di [Code grasse](code-grasse.html).
:::

::: obiezione La volatilità implicita è una previsione
Se il mercato paga una volatilità del 30%, si aspetta oscillazioni del 30%.
:::

::: risposta
Non esattamente. La volatilità implicita è un prezzo, e contiene un premio per il rischio. In media è stata più alta di quella poi realizzata: lo documentano tra gli altri [Carr e Wu, che misurano un premio per il rischio di varianza fortemente negativo](https://econpapers.repec.org/RePEc:oup:rfinst:v:22:y:2009:i:3:p:1311-1341) per chi lo compra. Chi vende volatilità viene pagato per farlo, come spiega [Vendere opzioni](vendere-opzioni.html).
:::

::: obiezione Un'opzione fuori dal denaro è soldi buttati
Se esercitata oggi non vale niente, quindi il premio è puro spreco.
:::

::: risposta
Il premio paga una possibilità, e la possibilità ha un valore misurabile, come mostra l'esempio dei dadi. Può essere caro o economico, ma non è zero per definizione. Lo spreco, semmai, è comprare quella possibilità ripetutamente pensando che il valore temporale non si consumi.
:::

::: obiezione Più tempo è sempre meglio
Se il tempo ha valore, conviene comprare le scadenze più lunghe.
:::

::: risposta
Il tempo ha valore e ha un prezzo, che paghi tutto subito. Una scadenza lunga costa di più in assoluto e si consuma più lentamente; una corta costa meno e si consuma in fretta. Nessuna delle due è un affare in sé: dipende da quale movimento ti aspetti, e in quanto tempo.
:::

## Che cosa farne

1. **Separa il premio in due parti.** Sottrai il valore intrinseco e guarda quanto stai pagando per il tempo.
2. **Guarda la volatilità implicita, non solo il prezzo.** Un'opzione economica in euro può essere cara in volatilità.
3. **Conta i giorni.** Il valore temporale si consuma ogni giorno, e più in fretta verso la fine.

## Per approfondire

- [Le greche](greche.html): come misurare separatamente l'effetto del prezzo, del tempo e della volatilità.

::: difendibile
Il premio di un'opzione è fatto di valore intrinseco, ciò che renderebbe oggi, e di valore temporale, il prezzo della possibilità che renda di più. Il secondo cresce con il tempo, in proporzione alla sua radice quadrata, e con la volatilità attesa. La formula di Black e Scholes poggia su ipotesi false ma è il linguaggio comune per misurarlo.
:::
