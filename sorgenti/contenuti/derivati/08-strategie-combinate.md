---
slug: strategie-combinate
titolo: Strategie con più opzioni, mattoncini e parità put-call
tesi: Combinando opzioni si costruisce qualsiasi profilo.
obiezione: Sì, ma ogni gamba si paga, e la parità put-call mostra che molte strategie sono la stessa.
livello: avanzato
tag: opzioni, costi
sommario: Unendo due o più opzioni si ottengono profili diversi: spread, straddle, strangle, butterfly. La parità put-call mostra che molti di questi sono equivalenti tra loro. Ogni gamba ha un costo, e la complessità moltiplica i costi più dei vantaggi.
aggiornato: 2026-11-13
prima: profili-di-rendimento, greche
---

Con quattro posizioni di base, call e put comprate o vendute, si può costruire quasi ogni profilo di rendimento. I prodotti strutturati e i certificati venduti in banca sono fatti così: un'obbligazione più qualche opzione. L'articolo presenta le combinazioni più comuni, la relazione che le lega tutte e il limite pratico che vale per ciascuna.

## La parità put-call

C'è una relazione che lega call e put con lo stesso sottostante, strike e scadenza. La descrisse Hans Stoll nel 1969, [quattro anni prima della formula di Black e Scholes](https://caia.org/node/5599):

$$
C - P = S - K e^{-rT}
$$

dove $C$ è il prezzo della call, $P$ quello della put, $S$ il prezzo del sottostante, $K$ lo strike, $r$ il tasso privo di rischio e $T$ il tempo alla scadenza. Il termine $K e^{-rT}$ è il valore oggi di $K$ euro disponibili alla scadenza.

Si legge così: comprare una call e vendere una put equivale a possedere il sottostante finanziato con un prestito pari allo strike. Se la relazione non vale, qualcuno guadagna senza rischio comprando la parte che costa meno e vendendo l'altra, finché i prezzi tornano in linea. Vale esattamente per le opzioni europee su titoli senza dividendi, in modo approssimato per le altre.

Le conseguenze pratiche sono tre.

- **Posizioni sintetiche.** Call comprata più put venduta, stesso strike, è un'azione sintetica. Il contrario è una vendita allo scoperto sintetica.
- **Equivalenze.** Una covered call, cioè azione più call venduta, ha lo stesso profilo di una put venduta con lo stesso strike e il denaro in deposito. Per questo alternare le due, come nella strategia detta wheel, non cambia il rischio.
- **Protezione.** Azione più put comprata, detta *married put* o *protective put*, equivale a una call più il denaro in deposito.

## Gli spread verticali

Uno *spread* combina due opzioni dello stesso tipo e sulla stessa scadenza, una comprata e una venduta, con strike diversi.

- **Bull call spread.** Compri una call con strike basso e ne vendi una con strike alto. Guadagni se il prezzo sale, ma solo fino allo strike alto. Costa meno di una call sola, perché incassi il premio della seconda.
- **Bear put spread.** Compri una put con strike alto e ne vendi una con strike basso. È lo specchio ribassista.

Uno spread limita sia la perdita sia il guadagno. Serve a esprimere una previsione precisa: «salirà, ma non oltre questo livello».

## Calendar e butterfly

Un **calendar spread** combina due opzioni con lo stesso strike e scadenze diverse: si vende la più vicina e si compra la più lontana. Guadagna se il prezzo resta vicino allo strike, perché l'opzione vicina perde valore temporale più in fretta.

Una **butterfly** combina tre strike: si compra una call con strike basso, se ne vendono due con strike centrale, se ne compra una con strike alto. Il profilo ha la forma di una tenda: guadagno massimo se il prezzo finisce sullo strike centrale, perdita limitata altrove.

## Straddle e strangle

Qui la direzione non conta.

- **Straddle comprato.** Una call e una put con lo stesso strike, di solito al prezzo. Guadagni se il prezzo si muove molto, in qualsiasi direzione. Perdi i due premi se resta fermo.
- **Strangle comprato.** Come lo straddle, ma con strike diversi, entrambi fuori dal denaro. Costa meno e richiede un movimento più grande.

Sono le strategie sulla volatilità descritte in [Le greche](greche.html): delta vicino a zero, vega e gamma alte. Venduti, sono il contrario: guadagnano se il prezzo resta fermo e perdono senza limite se si muove molto. Lo studio di Coval e Shumway citato in [Vendere opzioni](vendere-opzioni.html) misura proprio questo: [gli straddle comprati al prezzo sull'indice perdono in media circa il 3% a settimana](https://econpapers.repec.org/RePEc:bla:jfinan:v:56:y:2001:i:3:p:983-1009).

| Strategia | Gambe | Si guadagna se |
| --- | --- | --- |
| Bull call spread | 2 | il prezzo sale, fino a un limite |
| Bear put spread | 2 | il prezzo scende, fino a un limite |
| Straddle comprato | 2 | il prezzo si muove molto |
| Butterfly | 3 strike, 4 opzioni | il prezzo resta su un livello |

```grafico
{
 "tipo": "payoff",
 "titolo": "Profili alla scadenza di quattro strategie",
 "nota": "Esempio illustrativo: azione a 100, opzioni a tre mesi, premi calcolati con Black e Scholes (volatilità 20%, tasso 3%). Bull call spread: call 100 comprata, call 110 venduta. Straddle: call e put 100. Strangle: put 90 e call 110. Butterfly: call 90 e 110 comprate, due call 100 vendute.",
 "x": {
  "min": 70,
  "max": 130,
  "passi": [
   80,
   100,
   120
  ]
 },
 "y": {
  "min": -15,
  "max": 25
 },
 "pannelli": [
  {
   "titolo": "Bull call spread",
   "colore": 1,
   "gambe": [
    {
     "tipo": "call",
     "lato": 1,
     "strike": 100,
     "premio": 4.36
    },
    {
     "tipo": "call",
     "lato": -1,
     "strike": 110,
     "premio": 1.09
    }
   ]
  },
  {
   "titolo": "Straddle comprato",
   "colore": 1,
   "gambe": [
    {
     "tipo": "call",
     "lato": 1,
     "strike": 100,
     "premio": 4.36
    },
    {
     "tipo": "put",
     "lato": 1,
     "strike": 100,
     "premio": 3.61
    }
   ]
  },
  {
   "titolo": "Strangle comprato",
   "colore": 1,
   "gambe": [
    {
     "tipo": "call",
     "lato": 1,
     "strike": 110,
     "premio": 1.09
    },
    {
     "tipo": "put",
     "lato": 1,
     "strike": 90,
     "premio": 0.61
    }
   ]
  },
  {
   "titolo": "Butterfly",
   "colore": 1,
   "gambe": [
    {
     "tipo": "call",
     "lato": 1,
     "strike": 90,
     "premio": 11.28
    },
    {
     "tipo": "call",
     "lato": -1,
     "strike": 100,
     "premio": 4.36,
     "quantita": 2
    },
    {
     "tipo": "call",
     "lato": 1,
     "strike": 110,
     "premio": 1.09
    }
   ]
  }
 ],
 "tabella": {
  "x": [
   80,
   90,
   100,
   110,
   120
  ]
 }
}
```

## I certificati

Un certificato di investimento è, in molti casi, un'obbligazione dell'emittente più una o più opzioni. Un certificato «a capitale protetto con partecipazione al rialzo» è un'obbligazione più una call comprata. Un certificato che paga cedole alte finché l'indice non scende sotto una barriera è un'obbligazione più una put venduta, spesso di un tipo che si attiva solo toccando la barriera. Saperlo permette di chiedersi quanto varrebbero separatamente i pezzi, e quanto costa metterli insieme.

## Obiezioni e risposte

::: obiezione Più gambe, più controllo
Una strategia a quattro gambe permette di adattare il profilo esattamente a ciò che ci si aspetta.
:::

::: risposta
Il profilo si adatta, il costo pure. Ogni gamba paga la differenza tra prezzo di acquisto e di vendita, e sulle opzioni preferite dai piccoli investitori [quella differenza è in media del 12,6%](https://lbsresearch.london.edu/id/eprint/2827). Una strategia con quattro gambe la paga quattro volte all'apertura e quattro alla chiusura. Il controllo in più deve valere più di tutto questo.
:::

::: obiezione Le strategie neutrali non dipendono dal mercato
Uno straddle o una butterfly guadagnano senza bisogno di indovinare la direzione.
:::

::: risposta
Non dipendono dalla direzione, ma dipendono da un'altra previsione: se il prezzo si muoverà più o meno di quanto il mercato si aspetta. Il mercato quella previsione l'ha già incorporata nel premio. Indovinarla è difficile quanto indovinare la direzione.
:::

::: obiezione Con la parità si trovano arbitraggi
Se i prezzi di call e put non rispettano la relazione, si guadagna senza rischio.
:::

::: risposta
In teoria sì. In pratica gli scostamenti sono piccoli e brevi, e chiuderli richiede di comprare e vendere quattro strumenti con i loro costi. Gli operatori professionali, con costi molto più bassi, arrivano prima. Per un investitore privato la parità serve a capire le equivalenze, non a guadagnare.
:::

::: obiezione Le strategie complesse sono per esperti, quindi sono migliori
Se richiedono più conoscenze, devono rendere di più.
:::

::: risposta
La complessità non è un rischio compensato. Nessun meccanismo di mercato paga di più chi usa quattro opzioni invece di una. Paga chi porta un rischio che altri vogliono cedere. Una strategia complessa può contenerne di più o di meno, ma va giudicata per i rischi che contiene, non per il numero di pezzi.
:::

## Che cosa farne

1. **Riduci ogni strategia ai pezzi.** Chiediti quali rischi contiene: direzione, volatilità, tempo.
2. **Usa la parità per riconoscere le equivalenze.** Due strategie con nomi diversi possono essere la stessa posizione.
3. **Conta i costi per gamba.** Moltiplica la differenza tra prezzo di acquisto e di vendita per il numero di opzioni, all'apertura e alla chiusura.

::: difendibile
Combinando opzioni si può costruire quasi ogni profilo di rendimento, e la parità put-call mostra che molte strategie dai nomi diversi sono la stessa posizione. Ogni gamba ha un costo, e la complessità non è compensata dal mercato. Una strategia va giudicata per i rischi che contiene, non per quanti pezzi ha.
:::
