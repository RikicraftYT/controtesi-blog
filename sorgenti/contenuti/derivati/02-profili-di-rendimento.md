---
slug: profili-di-rendimento
titolo: Profili di rendimento, la forma del rischio
tesi: Con le opzioni si sceglie la forma del rischio.
obiezione: Ogni forma ha un prezzo, e nessuna batte un'altra in tutti gli scenari.
livello: intermedio
tag: opzioni, rischio
sommario: Il profilo di rendimento mostra quanto vale una posizione per ogni prezzo del sottostante. Un'azione è una retta; le opzioni la piegano. Si può scegliere la forma, non ottenerne una migliore in ogni caso.
aggiornato: 2026-11-13
prima: opzioni-come-funzionano
---

Chi compra un'azione guadagna un euro per ogni euro di rialzo e perde un euro per ogni euro di ribasso. Con le opzioni questa relazione si può piegare: limitare le perdite, rinunciare a una parte dei guadagni, moltiplicare l'effetto di un movimento. Lo strumento per vederlo è il *profilo di rendimento*, detto anche *payoff*. L'articolo mostra le quattro forme di base e il limite che vale per tutte.

## Che cos'è un profilo di rendimento

È un grafico. Sull'asse orizzontale c'è il prezzo del sottostante alla scadenza, su quello verticale il guadagno o la perdita della posizione.

Per un'azione comprata a 100 il profilo è una retta inclinata a 45 gradi: a 120 guadagni 20, a 80 perdi 20. È il profilo più semplice possibile, e serve da confronto per tutti gli altri.

## Le quattro posizioni di base

Indichiamo con $S$ il prezzo del sottostante alla scadenza, con $K$ lo strike e con $p$ il premio. Alla scadenza una call vale la differenza tra prezzo e strike, se positiva, altrimenti zero:

$$
\text{call} = \max(S - K,\ 0) \qquad \text{put} = \max(K - S,\ 0)
$$

Il simbolo $\max$ prende il più grande dei due numeri. Chi compra paga il premio e riceve questo valore; chi vende incassa il premio e lo paga.

Un esempio, illustrativo: azione a 100, strike 100, premio 5 per ciascuna opzione.

| Prezzo a scadenza | Call comprata | Put comprata | Call venduta |
| --- | --- | --- | --- |
| 70 | −5 | +25 | +5 |
| 100 | −5 | −5 | +5 |
| 105 | 0 | −5 | 0 |
| 130 | +25 | −5 | −25 |

La put venduta è il rovescio della put comprata: +5 se il prezzo resta sopra 100, −25 a 70.

```grafico
{
 "tipo": "payoff",
 "titolo": "I quattro profili di base alla scadenza",
 "nota": "Esempio illustrativo dell'articolo: azione a 100, strike 100, premio 5. In ascissa il prezzo a scadenza, in ordinata il guadagno o la perdita. La linea tratteggiata è l'azione comprata a 100, per confronto.",
 "confrontoNome": "azione comprata a 100",
 "x": {
  "min": 60,
  "max": 140,
  "passi": [
   70,
   100,
   130
  ]
 },
 "y": {
  "min": -40,
  "max": 40
 },
 "pannelli": [
  {
   "titolo": "Call comprata",
   "colore": 1,
   "gambe": [
    {
     "tipo": "call",
     "lato": 1,
     "strike": 100,
     "premio": 5
    }
   ],
   "confronto": [
    {
     "tipo": "azione",
     "lato": 1,
     "prezzo": 100
    }
   ]
  },
  {
   "titolo": "Put comprata",
   "colore": 1,
   "gambe": [
    {
     "tipo": "put",
     "lato": 1,
     "strike": 100,
     "premio": 5
    }
   ],
   "confronto": [
    {
     "tipo": "azione",
     "lato": 1,
     "prezzo": 100
    }
   ]
  },
  {
   "titolo": "Call venduta",
   "colore": 2,
   "gambe": [
    {
     "tipo": "call",
     "lato": -1,
     "strike": 100,
     "premio": 5
    }
   ],
   "confronto": [
    {
     "tipo": "azione",
     "lato": 1,
     "prezzo": 100
    }
   ]
  },
  {
   "titolo": "Put venduta",
   "colore": 2,
   "gambe": [
    {
     "tipo": "put",
     "lato": -1,
     "strike": 100,
     "premio": 5
    }
   ],
   "confronto": [
    {
     "tipo": "azione",
     "lato": 1,
     "prezzo": 100
    }
   ]
  }
 ],
 "tabella": {
  "x": [
   70,
   100,
   105,
   130
  ]
 }
}
```

Si leggono quattro forme.

- **Call comprata.** Perdita massima pari al premio, guadagno senza limite. È una posizione rialzista.
- **Put comprata.** Perdita massima pari al premio, guadagno fino a quando il prezzo arriva a zero. È una posizione ribassista.
- **Call venduta.** Guadagno massimo pari al premio, perdita senza limite se non si possiede il sottostante.
- **Put venduta.** Guadagno massimo pari al premio, perdita fino a $K - p$. È una posizione rialzista, perché si guadagna se il prezzo non scende.

## Lotteria e assicurazioni

Spostando lo strike cambia il carattere della posizione.

- **Call molto fuori dal denaro, comprata.** Costa poco e scade quasi sempre senza valore, ma ogni tanto rende molte volte il premio. È un biglietto della lotteria: probabilità di vincita bassa, vincita alta.
- **Call molto nel denaro, comprata.** Si muove quasi come l'azione ma costa una frazione del suo prezzo. È un modo di investire con la leva. Una call con strike 70 su un'azione a 100, a un anno, vale circa 32 in un modello standard: con 32 si ottiene un'esposizione a 100.
- **Call o put molto fuori dal denaro, vendute.** Si incassa poco e quasi sempre lo si tiene, ma ogni tanto si paga molto. È il mestiere della compagnia di assicurazioni.

I numeri della call nel denaro sono un calcolo illustrativo. La relazione è generale: [le call hanno un rendimento atteso superiore a quello del sottostante, le put inferiore al tasso privo di rischio](https://scholarsarchive.byu.edu/facpub/9281), perché incorporano leva in un senso o nell'altro.

## Nessun profilo vince sempre

Si potrebbe pensare di cercare il profilo perfetto: perdite limitate e guadagni pieni. Non esiste, e il motivo è semplice. Se un profilo desse un risultato migliore di un altro in ogni scenario possibile, chiunque comprerebbe il primo e venderebbe il secondo, guadagnando senza rischio. Gli acquisti farebbero salire il prezzo del primo finché il vantaggio non sparisce. È lo stesso ragionamento per cui non esistono rendimenti alti senza rischio, visto in [Rischio e rendimento](rischio-e-rendimento.html).

Le opzioni quindi non migliorano un profilo: lo scambiano con un altro. Una put comprata limita la perdita, e la paghi con il premio in ogni scenario in cui la perdita non arriva.

## Anche un'azione è un'opzione

C'è un modo elegante di vedere la stessa idea. Un'azienda ha attività e debiti. Se alla scadenza dei debiti le attività valgono più dei debiti, gli azionisti pagano e tengono il resto. Se valgono meno, grazie alla responsabilità limitata se ne vanno e lasciano l'azienda ai creditori. È il profilo di una call: Robert Merton lo formalizzò nel 1974, mostrando che [il capitale degli azionisti si può valutare come un'opzione call sulle attività dell'azienda](https://robertcmerton.com/wp-content/uploads/2025/07/Model-Mind.pdf), con strike pari ai debiti.

## Obiezioni e risposte

::: obiezione Il grafico vale solo alla scadenza
Il profilo mostra il risultato all'ultimo giorno. Prima di allora il valore dell'opzione si muove in modo diverso, e chi chiude prima vive un altro rischio.
:::

::: risposta
È corretto, ed è il limite principale di questi grafici. Due ricercatori lo mettono al primo posto tra i miti sulle opzioni: [l'idea che il rischio si possa esprimere con un diagramma di payoff](https://www.aqr.com/-/media/AQR/Documents/Insights/Journal-Article/FAJ-Covered-Call-Strategies-One-Fact-and-Eight-Myths.pdf). Prima della scadenza contano anche il tempo rimasto e la volatilità, come spiega [Le greche](greche.html).
:::

::: obiezione La call comprata ha rischio limitato
Si può perdere al massimo il premio. Quindi comprare opzioni è prudente.
:::

::: risposta
Il rischio è limitato in euro, non in percentuale: si può perdere il 100% di ciò che si è messo, e succede spesso. Una call molto fuori dal denaro scade senza valore nella grande maggioranza dei casi. Limitato non vuol dire piccolo.
:::

::: obiezione Esistono strategie che vincono sempre
Combinando opzioni si trovano profili con guadagni in quasi tutti gli scenari.
:::

::: risposta
«Quasi tutti» è la parola chiave. I profili che guadagnano spesso perdono molto in pochi casi, come quelli delle compagnie di assicurazione. Il guadagno medio dipende da quanto valgono quei pochi casi, non da quanti sono gli altri. È il tema di [Valore atteso](valore-atteso.html).
:::

## Che cosa farne

1. **Disegna il profilo prima di entrare.** Su carta, con tre o quattro prezzi possibili, come nella tabella.
2. **Guarda sia la probabilità sia l'importo.** Una posizione che vince spesso può avere un valore atteso negativo.
3. **Chiediti che cosa stai cedendo.** Ogni miglioramento in uno scenario si paga in un altro.

## Per approfondire

- [Valore temporale](valore-temporale.html): che cosa determina il premio prima della scadenza.

::: difendibile
Le opzioni permettono di scegliere la forma del rischio: limitare le perdite, rinunciare ai guadagni, aggiungere leva. Non permettono di ottenere un profilo migliore in ogni scenario, perché il mercato lo eliminerebbe subito. Ogni forma si paga, e il diagramma alla scadenza non mostra il rischio che si corre prima.
:::
