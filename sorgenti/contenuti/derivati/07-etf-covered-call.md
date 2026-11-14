---
slug: etf-covered-call
titolo: ETF covered call, la distribuzione non è il rendimento
tesi: Un ETF covered call paga un reddito alto e stabile.
obiezione: La distribuzione è in parte capitale restituito, e il rialzo è stato ceduto in cambio.
livello: intermedio
tag: opzioni, fondi ed ETF, costi
sommario: Gli ETF che vendono call sulle azioni che possiedono distribuiscono somme alte e regolari. Ma la distribuzione non misura quanto rende il fondo: conta il rendimento totale, che con questa strategia tende a essere più basso dell'indice nei mercati in crescita.
aggiornato: 2026-11-13
prima: vendere-opzioni, fondi-etf-indici
---

Un ETF che investe nelle principali azioni americane e distribuisce l'1,5% l'anno, accanto a uno che investe nelle stesse azioni e distribuisce il 10%. Il secondo sembra ovviamente migliore. Sono i fondi *covered call*, cresciuti molto negli ultimi anni, che vendono opzioni sulle azioni che possiedono e girano i premi agli investitori. L'articolo spiega da dove viene quella distribuzione e perché non è il numero da guardare.

## Come funzionano

Il fondo possiede un paniere di azioni, spesso un indice. Ogni mese vende call sull'indice o sulle singole azioni, di solito al prezzo o poco fuori dal denaro. Incassa il premio e lo distribuisce. Se a scadenza l'indice è salito oltre lo strike, il fondo perde la differenza: il rialzo oltre lo strike va a chi ha comprato le call.

È la strategia covered call descritta in [Vendere opzioni](vendere-opzioni.html), confezionata in un fondo. La versione di riferimento è un indice della Borsa delle opzioni di Chicago che, sull'S&P 500, [ha incassato in media un premio lordo dell'1,7% al mese dal 2006](https://www.cboe.com/insights/posts/benchmark-indices-series-income-generation-and-smoother-returns-with-cboes-bxm-bxmd-put-and-cmbo-indices). Annualizzato è circa il 20%: è da lì che vengono le distribuzioni a due cifre.

## Distribuzione e rendimento

La distribuzione è ciò che il fondo versa agli investitori. Il rendimento totale è la distribuzione più la variazione del valore delle quote. Le due cose sono diverse:

$$
\text{rendimento totale} = \text{distribuzione} \acapo + \text{variazione del valore}
$$

Un fondo può distribuire il 10% e perdere l'8% di valore: il rendimento totale è il 2%. Distribuire non crea ricchezza: sposta denaro dal fondo al conto dell'investitore.

```grafico
{
 "tipo": "payoff",
 "titolo": "Covered call contro azione, alla scadenza",
 "nota": "Esempio illustrativo: azione comprata a 100, call con strike 102 venduta a 2. Sotto lo strike il premio attutisce di poco la perdita; sopra lo strike il guadagno si ferma. La linea tratteggiata è l'azione da sola.",
 "confrontoNome": "solo azione",
 "colonne": 1,
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
  "min": -30,
  "max": 30
 },
 "pannelli": [
  {
   "titolo": "Azione + call venduta",
   "colore": 1,
   "gambe": [
    {
     "tipo": "azione",
     "lato": 1,
     "prezzo": 100
    },
    {
     "tipo": "call",
     "lato": -1,
     "strike": 102,
     "premio": 2
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
   80,
   100,
   102,
   110,
   130
  ]
 }
}
```

Nel caso delle covered call c'è di più. Il premio incassato non è un guadagno netto, perché nello stesso momento il fondo si prende un obbligo: cedere il rialzo oltre lo strike. Nei mercati in forte crescita quell'obbligo costa più del premio. Il commentatore canadese Ben Felix, gestore di portafogli, lo riassume così: [rendimenti da distribuzione più alti implicano meccanicamente rendimenti totali attesi più bassi](https://rosetta.to/u/benfelixcsi/covered-calls-a-devil-s-bargain).

## Che cosa dicono i dati

L'indice della Borsa di Chicago ha avuto, dal 1986, [oscillazioni minori e perdite massime meno gravi dell'S&P 500, ma rendimenti annui inferiori](https://www.cboe.com/insights/posts/benchmark-indices-series-income-generation-and-smoother-returns-with-cboes-bxm-bxmd-put-and-cmbo-indices). È coerente con la scomposizione di Israelov e Nielsen: la covered call è soprattutto un'esposizione all'azionario, ridotta, più una vendita di volatilità, che rende, più una scommessa sulle inversioni di mercato, che [contribuisce per circa un quarto al rischio ma rende poco](https://rpc.cfainstitute.org/research/financial-analysts-journal/2015/covered-calls-uncovered).

I fondi reali aggiungono costi di gestione e di negoziazione più alti di un ETF indicizzato. E le distribuzioni hanno una conseguenza fiscale in Italia: sono tassate quando vengono incassate, mentre la crescita di un fondo ad accumulazione è tassata solo alla vendita, come spiega [Le tasse di base](tasse-di-base.html). Pagare le imposte prima riduce il capitale che continua a crescere.

## Obiezioni e risposte

::: obiezione A chi vive di rendita serve un flusso regolare
Un pensionato ha bisogno di entrate mensili. Una distribuzione stabile gli evita di vendere quote.
:::

::: risposta
Lo stesso flusso si ottiene vendendo ogni mese una parte di un fondo ad accumulazione, e il risultato economico è identico. La differenza è psicologica: vendere quote sembra intaccare il capitale, ricevere una distribuzione no. Ma anche la distribuzione intacca il capitale, perché il valore delle quote scende dello stesso importo. Come prelevare in modo sostenibile è il tema di [La regola del 4%](regola-4-percento.html).
:::

::: obiezione Oscilla meno, quindi è più sicuro
I dati mostrano che questi fondi perdono meno nelle crisi.
:::

::: risposta
Perdono un po' meno, perché il premio attutisce la caduta. Ma partecipano solo in parte alla risalita, perché il rialzo oltre lo strike è ceduto. Dopo un crollo seguito da un forte recupero, chi ha venduto le call può trovarsi più indietro di chi non le ha vendute, pur avendo perso meno all'inizio. Lo stesso risultato si ottiene con un portafoglio che contiene meno azioni e più obbligazioni, senza i costi e senza cedere il rialzo.
:::

::: obiezione In mercati laterali rende di più
Se l'indice resta fermo, il fondo incassa i premi e l'indice no.
:::

::: risposta
È vero, ed è il caso in cui la strategia dà il meglio. Il problema è che non si sa in anticipo quando il mercato sarà laterale. Scegliere questi fondi per quel motivo è una previsione sul mercato, con i limiti visti in [Market timing](market-timing.html).
:::

::: obiezione Il premio di volatilità esiste
Gli studi dicono che vendere volatilità rende. Un fondo covered call è il modo più semplice per incassarlo.
:::

::: risposta
Va concesso: è il modo più accessibile, e gli stessi Israelov e Nielsen lo riconoscono. Ma in una covered call la vendita di volatilità pesa per circa il 10% del rischio. Chi compra questi fondi per il premio di volatilità ne riceve poco, insieme a molta esposizione azionaria ridotta e a una scommessa non compensata.
:::

## Che cosa farne

1. **Confronta il rendimento totale, non la distribuzione.** Sullo stesso periodo, con l'indice da cui il fondo parte.
2. **Guarda i costi.** Un fondo covered call costa di solito più di un ETF indicizzato sulle stesse azioni.
3. **Chiediti se vuoi un flusso o un rendimento.** Se vuoi un flusso, vendere quote di un fondo ad accumulazione lo produce senza cedere il rialzo.

::: difendibile
Un fondo covered call distribuisce molto perché vende il rialzo delle azioni che possiede. La distribuzione non è un rendimento: conta il rendimento totale, che tende a restare sotto quello dell'indice quando i mercati crescono. Oscilla meno, ma lo stesso risultato si ottiene con meno azioni e senza cedere il rialzo.
:::
