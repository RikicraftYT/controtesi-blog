---
slug: etf-a-leva
titolo: ETF a leva, come si costruisce un 3x
tesi: Un ETF 3x rende tre volte l'indice.
obiezione: Solo in un giorno: la leva si ricostruisce ogni sera, e il debito si paga.
livello: avanzato
tag: leva, fondi ed ETF, costi, volatilità
sommario: Un prodotto 3x giornaliero sull'MSCI World non prende in prestito denaro: usa swap o futures per un'esposizione pari a tre volte il patrimonio, la ricalibra ogni sera e paga il finanziamento di due volte il capitale. In Europa, sopra il 2x non è nemmeno un ETF.
prima: volatility-drag, fondi-etf-indici
aggiornato: 2026-11-20
---

«3x sull'MSCI World» fa pensare a qualcuno che compra le azioni dell'indice con un euro proprio e due presi a prestito. Non funziona così. Il prodotto non possiede quasi mai le azioni, non ha un debito fisso e promette il triplo del rendimento di ogni singolo giorno, non di un anno. Qui vediamo come si ottiene e quanto costa. Perché la leva giornaliera deluda nel lungo periodo è spiegato in [Volatility drag](volatility-drag.html), e qui non lo ripetiamo.

## Che cosa promette

L'obiettivo è scritto nell'indice che il prodotto replica. Per gli indici a leva giornaliera di MSCI [il rendimento di ogni giorno è](https://www.msci.com/eqb/methodology/meth_docs/MSCI_Short_and_Leveraged_Daily_Indexes_Methodology_Aug2021.pdf):

$$
R_L = L\,R - (L-1)\,r\,\frac{T}{360}
$$

dove $R_L$ è il rendimento dell'indice a leva, $L$ la leva (3), $R$ il rendimento giornaliero dell'indice di partenza con i dividendi, $r$ il tasso a brevissimo termine della valuta e $T$ i giorni di calendario trascorsi. Il secondo termine è il costo del denaro: con leva 3 si investono tre euro per ogni euro di capitale, e i due euro in più vanno finanziati. Per l'euro il tasso è l'€STR, che segue da vicino il tasso sui depositi della BCE. Il prodotto lo replica al netto delle sue commissioni.

## Come si costruisce

Cheng e Madhavan, nell'analisi più citata su questi prodotti, scrivono che [i fondi a leva si basano in genere su *total return swap*](https://joim.com/wp-content/uploads/emember/downloads/p0283.pdf), cioè contratti con una banca che scambiano il rendimento di un indice contro un tasso di interesse, e che [i futures possono essere usati in aggiunta o al posto degli swap](https://joim.com/wp-content/uploads/emember/downloads/p0283.pdf).

**Con uno swap.** Il prodotto raccoglie 100 € e li tiene in attività sicure, come titoli di Stato a breve, che rendono $r$. Poi firma con una o più banche uno swap su 300 € di valore nozionale: la banca paga al prodotto il rendimento dell'indice su 300 €, il prodotto paga alla banca il tasso a breve su 300 €. In un giorno:

$$
300\,R - 300\,r + 100\,r = 300\,R - 200\,r
$$

È la formula dell'indice: tre volte il rendimento, meno il finanziamento su due volte il capitale. Il debito è implicito nello swap.

**Con i futures.** Il prodotto compra futures sull'indice per 300 € di valore e deposita come margine solo una piccola parte dei 100 €. Il prezzo del future incorpora già il costo del finanziamento: il risultato è lo stesso.

## Il ribilanciamento serale

Partiamo da 100 € di patrimonio e 300 € di esposizione. L'indice sale del 2%: l'esposizione diventa 306 €, il patrimonio 106 €. Per tornare a leva 3 servono 318 € di esposizione: il prodotto deve comprarne altri 12. Se invece l'indice scende del 2%, l'esposizione cala a 294 €, il patrimonio a 94 € e l'obiettivo è 282 €: deve venderne 12. In generale, con $N$ il patrimonio, la quantità da scambiare ogni sera è

$$
\Delta E = L\,(L-1)\,R\,N
$$

È la formula di Cheng e Madhavan, che sottolineano [il ruolo decisivo del termine $L^2 - L$](https://joim.com/wp-content/uploads/emember/downloads/p0283.pdf). Due conseguenze. Il prodotto compra sempre dopo i rialzi e vende sempre dopo i ribassi, sia nella versione a leva sia in quella inversa. E deve farlo a fine giornata: gli autori notano che [il ribilanciamento va eseguito il più vicino possibile alla chiusura](https://joim.com/wp-content/uploads/emember/downloads/p0283.pdf), con un probabile effetto sulla liquidità e sulla volatilità dell'indice in quei minuti.

Per gli stessi autori [il prodotto contiene un'opzione sull'indice](https://joim.com/wp-content/uploads/emember/downloads/p0283.pdf) il cui valore dipende dall'intero percorso dei prezzi, non solo dal punto di arrivo.

## Il giorno peggiore

C'è un limite che nessun ribilanciamento serale risolve: con leva 3, un calo dell'indice del 33,3% in una sola seduta azzera il patrimonio. Non è un'ipotesi astratta. Il 19 ottobre 1987 [l'S&P 500 perse il 20,5% in un giorno](https://insight.factset.com/marking-30-years-since-the-stock-market-crash-of-1987): un 3x avrebbe perso il 61,5%.

```grafico
{
 "tipo": "linee",
 "titolo": "Un giorno di leva 3: a −33,3% il patrimonio è azzerato",
 "nota": "Calcolo illustrativo: rendimento del prodotto pari a tre volte quello dell'indice nella stessa seduta, senza finanziamento né costi, che in un giorno pesano pochi centesimi. Sotto −33,3% la perdita non può superare il 100%.",
 "x": {"min": -40, "max": 15, "etichetta": "rendimento dell'indice in un giorno", "formato": {"dec": "auto", "suffisso": "%"}},
 "y": {"min": -100, "max": 45, "etichetta": "rendimento del prodotto", "formato": {"suffisso": "%"}},
 "serie": [
  {"nome": "3x", "colore": 2, "generatore": {"nome": "lineare", "a": 3, "b": 0}, "da": -33.34},
  {"nome": "Indice", "colore": 4, "tratteggio": true, "generatore": {"nome": "lineare", "a": 1, "b": 0}}
 ],
 "riferimenti": [{"x": -33.33, "etichetta": "azzeramento"}, {"y": 0}],
 "punti": [{"x": -20.5, "y": -61.5, "colore": 2, "etichetta": "19 ottobre 1987", "tip": "19 ottobre 1987: indice −20,5%, un 3x −61,5%"}],
 "tabella": {"x": [-33.3, -20.5, -10, 0, 10]}
}
```

Per questo molti prodotti europei hanno un ribilanciamento d'emergenza durante la giornata. Su un ETP 3x di un grande emittente [la soglia di intervento è il 17%](https://www.wisdomtree.com/pl/products/equities/wisdomtree-euro-stoxx-50-3x-daily-leveraged): se l'indice si muove di tanto rispetto alla chiusura precedente, l'esposizione si riporta subito a tre volte il nuovo patrimonio. Protegge dall'azzeramento, ma fissa la perdita: se poi l'indice recupera, il prodotto recupera meno.

Le note quotate possono anche chiudere in anticipo. Nel 2018 un ETN legato alla volatilità [fu chiuso dopo un calo superiore alla soglia dell'80% prevista dal prospetto](https://www.bis.org/publ/qtrpdf/r_qt1803t.htm): chi lo possedeva non poté aspettare un recupero.

## In Europa non è un ETF

Gli ETF venduti in Italia sono quasi tutti fondi UCITS. Per questi fondi [l'esposizione ottenuta con i derivati non può superare il 100% del patrimonio](https://www.ecb.europa.eu/pub/financial-stability/macroprudential-bulletin/html/ecb.mpbu201910_4~a9c04beceb.en.html): si arriva al massimo a due volte l'indice. Per questo in Europa [l'esposizione 3x è offerta di solito con ETP strutturati come titoli di debito](https://leverageshares.com/it/insights/daily-rebalancing-in-leveraged-etps-explained/), non come fondi. La scheda di uno di questi prodotti lo dice esplicitamente: [è un titolo di debito, non un'azione di un fondo, e non è un prodotto UCITS](https://www.wisdomtree.eu/etps/fixed-income/wisdomtree-bund-30y-3x-daily-short). Su Borsa Italiana sono classificati come [ETN](https://www.borsaitaliana.it/etc-etn/notizie/3etnboost.pdf).

Sull'MSCI World esistono [ETF UCITS a leva 2x](https://www.justetf.com/it/how-to/invest-in-leveraged-etfs.html). Un 3x su un indice azionario globale esiste solo come ETP, e ce ne sono pochissimi: uno [replica tre volte il rendimento giornaliero di un ETF azionario mondiale](https://script.finanzen.ch/etp/daten-gebuehr/leverage-shares-3x-long-total-world-etp-securities-xs2399364822).

La differenza non è solo un'etichetta.

| | ETF UCITS 2x | ETN 3x |
| --- | --- | --- |
| Che cosa possiedi | Quote di un fondo separato dal gestore | Un titolo di debito di una società veicolo |
| Garanzia | Regole UCITS su collaterale e controparti | Collaterale depositato presso un fiduciario |
| Tasse in Italia | Guadagni come redditi di capitale | Guadagni come redditi diversi |

Situazione a novembre 2026.

Il trattamento fiscale è l'unico punto a favore dell'ETN: [le plusvalenze si possono compensare con le minusvalenze](https://www.justetf.com/it/news/etf/la-tassazione-degli-etc-in-italia.html), cosa che con gli ETF non si può fare, come spiega [Le tasse di base](tasse-di-base.html).

Negli Stati Uniti i 3x esistono anche come fondi, ma per eredità: dal 2020 [i nuovi fondi a leva non possono superare il 200%, mentre i 3x già esistenti sono stati esentati](https://www.sidley.com/zh-hans/insights/newsupdates/2020/10/sec-adopts-fund-derivatives-rule-expands-leverage-limits-forgoes-sales-practice-rules).

## Quanto costa la leva

Il costo più grande non compare nella commissione annua: è il finanziamento, già sottratto nell'indice. Con un tasso a breve vicino al [2,50% fissato dalla BCE a settembre 2026](https://ecb.europa.eu/press/pr/date/2026/html/ecb.mp260910~314e508016.en.html), un 3x paga circa il 5% l'anno solo per finanziare i due terzi dell'esposizione. A questo si aggiungono la commissione del prodotto, tra lo [0,75% e l'1% l'anno per i 3x più diffusi](https://www.justetf.com/it/how-to/invest-in-leveraged-etfs.html), e il costo dello swap, che su un ETP 3x su un indice europeo [è lo 0,00086% al giorno](https://www.wisdomtree.com/pl/products/equities/wisdomtree-euro-stoxx-50-3x-daily-leveraged), circa lo 0,3% l'anno.

```grafico
{
 "tipo": "barre",
 "titolo": "Costo annuo di un 3x giornaliero con tassi al 2,5%",
 "nota": "Calcolo illustrativo: finanziamento pari a 2 volte il tasso a breve del 2,5%; commissione al minimo dell'intervallo citato (0,75–1%); costo dello swap di un ETP 3x su un indice europeo, 0,00086% al giorno su 365 giorni.",
 "colonna": "Costo annuo",
 "x": {"formato": {"dec": 2, "suffisso": "%"}},
 "righe": [
  {"etichetta": "Finanziamento", "valore": 5.0, "colore": 1},
  {"etichetta": "Commissione", "valore": 0.75, "colore": 1},
  {"etichetta": "Swap", "valore": 0.31, "colore": 1}
 ]
}
```

Il finanziamento è il prezzo dell'esposizione in più, e chi si indebita da solo lo paga comunque. Ma fissa l'asticella: il 3x batte l'indice solo se il rendimento in eccesso sulla liquidità, moltiplicato per tre, supera il finanziamento, le commissioni e la perdita da volatilità.

## Obiezioni e risposte

::: obiezione È come comprare a debito
Un euro proprio e due presi in prestito: è la stessa cosa, solo più comoda.
:::

::: risposta
No, e la differenza va nella direzione opposta. Chi compra a debito ha un prestito fisso: se le azioni salgono la leva scende, se scendono la leva sale, fino alla richiesta di reintegrare il margine. Il prodotto giornaliero fa il contrario: riporta la leva a 3 ogni sera, quindi compra dopo i rialzi e vende dopo i ribassi. Non riceve mai una richiesta di margine, ma realizza le perdite un giorno alla volta. Il ragionamento segue dalla formula del ribilanciamento.
:::

::: obiezione Il decadimento lo azzera comunque
Con il ribilanciamento giornaliero, nel lungo periodo un prodotto a leva perde sempre.
:::

::: risposta
Non sempre. Come mostra [Volatility drag](volatility-drag.html), in un mercato che sale con poca volatilità la leva giornaliera fa meglio di tre volte l'indice; in un mercato laterale e agitato fa peggio. Il problema è un altro: con la volatilità tipica delle azioni, una leva 3 sta oltre quella che massimizza la crescita composta. Il prodotto scommette che i trend saranno più forti delle oscillazioni.
:::

::: obiezione La commissione è bassa
Meno dell'1% l'anno, quanto un fondo attivo.
:::

::: risposta
La commissione è la parte piccola. Il finanziamento è già dentro l'indice e non compare tra le spese: con tassi al 2,5% vale circa il 5% l'anno. Sui prodotti a leva su singole azioni il costo dello swap può essere enorme: in un caso [è il 7,75% l'anno](https://graniteshares.com/media/40dm2k0v/xs3069877556_f_pc_n.pdf).
:::

::: obiezione Se l'emittente fallisce, perdo tutto
Un ETN è un debito: se la società che lo emette fallisce, i soldi sono persi.
:::

::: risposta
In parte va concesso. Gli ETP 3x europei sono di solito garantiti da collaterale depositato presso un fiduciario, e questo riduce il rischio. Ma lo stesso emittente avverte che [se nessuna controparte è disposta a firmare gli swap, il prodotto non può raggiungere il suo obiettivo](https://www.wisdomtree.eu/etps/fixed-income/wisdomtree-bund-30y-3x-daily-short). Il rischio di controparte resta, più alto che in un fondo UCITS, e si aggiunge alle clausole di chiusura anticipata.
:::

## Che cosa farne

1. **Leggi l'indice, non il nome.** «3x» vale per un giorno: conta la formula, compreso il finanziamento su $L-1$ volte il capitale.
2. **Guarda il tasso a breve.** Con leva 3 il costo del denaro si paga due volte: quando i tassi salgono, l'asticella sale.
3. **Controlla che cosa possiedi.** Fondo UCITS o titolo di debito, collaterale, soglie di ribilanciamento d'emergenza e clausole di chiusura sono scritti nel prospetto.

::: difendibile
Un prodotto 3x giornaliero ottiene la leva con swap o futures, non con un prestito, e la riporta a tre volte il patrimonio ogni sera. Rende il triplo dell'indice in un giorno, meno il finanziamento su due volte il capitale; su periodi più lunghi dipende dal percorso. In Europa sopra il 2x non è un fondo ma un titolo di debito garantito, con i rischi che ne seguono.
:::
