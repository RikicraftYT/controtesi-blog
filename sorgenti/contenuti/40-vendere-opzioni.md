---
slug: vendere-opzioni
titolo: Vendere opzioni, un reddito che è un premio assicurativo
tesi: Vendere opzioni dà un reddito regolare.
obiezione: È il premio per assicurare i crolli: si guadagna spesso poco e si perde di rado molto.
livello: avanzato
gruppo: derivati
tag: opzioni, volatilità, rischio, leva
sommario: Chi vende opzioni incassa un premio e, nella maggior parte dei mesi, lo tiene. I dati mostrano che in media è un'attività remunerata. Ma il guadagno è il compenso per assicurare gli altri contro i crolli, e i crolli arrivano tutti insieme.
aggiornato: 2026-11-13
prima: valore-temporale, greche
---

Vendere una put fuori dal denaro su un indice e incassare il premio, mese dopo mese, sembra una rendita. Quasi sempre l'opzione scade senza valore e il premio resta a te. È la strategia preferita da molti investitori che vogliono un'entrata regolare. L'articolo esamina perché funziona in media, che cosa si sta vendendo davvero, e perché chiamarlo reddito è fuorviante.

## Le strategie principali

- **Covered call.** Possiedi le azioni e vendi call sulle stesse azioni. Incassi il premio e rinunci ai guadagni oltre lo strike.
- **Cash-secured put.** Vendi una put e tieni da parte il denaro per comprare le azioni allo strike se vieni assegnato. Incassi il premio; se il prezzo scende sotto lo strike, compri le azioni a un prezzo più alto di quello di mercato.
- **Wheel.** Alterna le due: vendi put finché vieni assegnato, poi vendi call sulle azioni ricevute finché te le chiamano, poi ricominci.
- **Vendita di opzioni molto fuori dal denaro, scoperte.** Incassi poco, molto spesso. È la posizione della compagnia di assicurazioni vista in [Profili di rendimento](profili-di-rendimento.html), senza il capitale di una compagnia.

Una variante usata da chi deve comunque comprare un titolo: invece di mettere un ordine di acquisto a un prezzo più basso di quello attuale, vendere una put con quello strike. Se il prezzo scende, compri allo stesso prezzo dell'ordine ma hai incassato il premio. Se non scende, il premio resta. In cambio, se il prezzo crolla, compri comunque allo strike.

## Perché in media si guadagna

Chi compra opzioni paga, in media, più di quanto riceve. Lo mostrano diversi studi sulle opzioni sull'indice S&P 500. Coval e Shumway, nel 2001, trovano che le posizioni che comprano call e put al prezzo con esposizione al mercato nulla [perdono in media circa il 3% a settimana](https://econpapers.repec.org/RePEc:bla:jfinan:v:56:y:2001:i:3:p:983-1009). Carr e Wu misurano lo stesso fenomeno in un altro modo, come un premio per il rischio di varianza [che non si spiega con i fattori di rischio tradizionali](https://typeset.io/pdf/variance-risk-premiums-2r5d548tv2.pdf).

La spiegazione è la stessa delle assicurazioni. Molti investitori vogliono proteggersi dai crolli e sono disposti a pagare più del costo atteso della protezione. Chi vende quella protezione incassa la differenza.

Gli indici che replicano strategie di vendita sull'S&P 500, calcolati dalla Borsa delle opzioni di Chicago dal 1986, lo confermano. Secondo la Borsa stessa, i quattro indici principali hanno avuto [oscillazioni e perdite massime minori dell'indice azionario, e rendimenti annui inferiori](https://www.cboe.com/insights/posts/benchmark-indices-series-income-generation-and-smoother-returns-with-cboes-bxm-bxmd-put-and-cmbo-indices). L'indice che vende call al prezzo sull'S&P 500 ha incassato [in media un premio lordo dell'1,7% al mese dal 2006](https://www.cboe.com/insights/posts/benchmark-indices-series-income-generation-and-smoother-returns-with-cboes-bxm-bxmd-put-and-cmbo-indices).

## Che cosa si sta vendendo

Due ricercatori che gestiscono questo tipo di strategie hanno scomposto una covered call sull'indice in tre parti. La prima è l'esposizione all'azionario, che [ha generato la maggior parte del rischio e del rendimento](https://rpc.cfainstitute.org/research/financial-analysts-journal/2015/covered-calls-uncovered). La seconda è la vendita di volatilità, che ha avuto un buon rapporto tra rendimento e rischio ma ha contribuito solo per il 10% al rischio totale. La terza è una scommessa implicita che il mercato inverta la direzione, responsabile di circa un quarto del rischio e quasi senza compenso.

La conclusione è utile anche per chi non usa covered call. Vendere opzioni significa prendersi due rischi compensati, quello azionario e quello di volatilità, e uno che non lo è. Il premio non è un reddito che si aggiunge al resto: è il compenso per quei rischi.

Per lo stesso motivo la wheel non è una strategia diversa dalla vendita di put. La covered call e la cash-secured put con lo stesso strike hanno [lo stesso profilo](strategie-combinate.html): alternarle cambia il nome della posizione, non il rischio.

## Il problema dei crolli

Una compagnia di assicurazioni guadagna per anni e paga tutto insieme quando arriva un terremoto. Chi vende put sull'indice è nella stessa posizione, con una differenza: non ha riassicuratori, e spesso ha usato la leva, perché i premi sono piccoli e la tentazione di vendere più contratti è grande.

I crolli dei mercati, inoltre, sono più frequenti di quanto prevedano i modelli che usano la distribuzione normale, come spiega [Code grasse](code-grasse.html). In quei momenti la volatilità implicita esplode, le opzioni vendute valgono molte volte il premio incassato, e l'intermediario chiede garanzie aggiuntive proprio quando i prezzi sono più bassi.

## Obiezioni e risposte

::: obiezione Vinco l'85% delle volte
Le opzioni vendute fuori dal denaro scadono senza valore quasi sempre. Una strategia che vince così spesso è affidabile.
:::

::: risposta
La frequenza delle vincite non dice niente del risultato. Conta il valore atteso: probabilità per importo, sommato su tutti i casi. Una strategia che guadagna 1 l'85% delle volte e perde 10 il 15% delle volte ha valore atteso negativo. È l'errore descritto in [Valore atteso](valore-atteso.html).
:::

::: obiezione È meno rischiosa delle azioni
Una covered call oscilla meno dell'azione sottostante e ha perdite massime più contenute.
:::

::: risposta
È corretto, e i dati della Borsa di Chicago lo confermano. Ma si paga con rendimenti più bassi negli anni di forte rialzo, che sono quelli che fanno la maggior parte del rendimento di lungo periodo. Gli stessi ricercatori citati sopra elencano tra i miti [l'idea che le covered call proteggano dai ribassi](https://econpapers.repec.org/RePEc:taf:ufajxx:v:70:y:2014:i:6:p:23-31): riducono la perdita solo dell'importo del premio.
:::

::: obiezione Il premio è un reddito
Ogni mese entra denaro sul conto, come una cedola.
:::

::: risposta
Una cedola è il pagamento di un debito che qualcuno ha con te. Il premio è il prezzo di un obbligo che tu hai con qualcun altro. Entra denaro, ma nello stesso momento nasce una passività di valore simile. Contare il premio come reddito e ignorare la passività è come contare il premio di una polizza senza i sinistri.
:::

::: obiezione Con un buon metodo i crolli si evitano
Basta chiudere le posizioni quando il mercato comincia a scendere.
:::

::: risposta
Le discese più gravi arrivano spesso in salti, dall'oggi al domani, senza un «comincia a scendere» in cui uscire. E chiudere una put venduta dopo un primo ribasso vuol dire ricomprarla a un prezzo molto più alto, cioè realizzare la perdita. È una forma di market timing, con i limiti descritti in [Market timing](market-timing.html).
:::

::: obiezione Se tutti lo sanno, il premio sparisce
Un premio così documentato dovrebbe essere già stato eliminato da chi vende.
:::

::: risposta
Non necessariamente, se è il compenso di un rischio che pochi vogliono portare. I premi per il rischio non spariscono perché sono noti, come mostra il premio azionario. Possono però ridursi quando molti vendono: la crescita dei fondi che vendono opzioni è un buon motivo per non aspettarsi che il passato si ripeta uguale.
:::

## Che cosa farne

1. **Chiamalo premio, non reddito.** Aiuta a ricordare che sei pagato per un rischio.
2. **Calcola lo scenario peggiore in euro.** Per ogni put venduta: strike per cento per numero di contratti, meno il premio.
3. **Non usare la leva.** Vendere solo put che puoi pagare per intero è l'unica protezione contro la richiesta di garanzie nel momento peggiore.

::: difendibile
Chi vende opzioni, in media e su periodi lunghi, è stato pagato: chi si assicura contro i crolli paga più del loro costo atteso. Ma è il compenso per un rischio che si manifesta di rado e tutto insieme, non un reddito. Senza leva e con il controvalore pronto è una strategia sostenibile; con la leva è il modo più affidabile di perdere molto in poco tempo.
:::
