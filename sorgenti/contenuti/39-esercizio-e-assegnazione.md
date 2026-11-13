---
slug: esercizio-e-assegnazione
titolo: Esercizio e assegnazione, che cosa succede alla scadenza
tesi: Un'opzione si compra per esercitarla.
obiezione: Quasi sempre conviene rivenderla: esercitare prima getta via il valore temporale.
livello: intermedio
gruppo: derivati
tag: opzioni
sommario: Chi compra un'opzione può esercitarla, rivenderla o lasciarla scadere. Esercitarla prima del tempo raramente conviene, e chi l'ha venduta viene scelto a caso. Alla scadenza può darsi che nessun titolo passi di mano.
aggiornato: 2026-11-13
prima: opzioni-come-funzionano, valore-temporale
---

Hai comprato una call con strike 90 e l'azione vale 110. Per incassare il guadagno, l'idea intuitiva è esercitare: comprare a 90 e rivendere a 110. Quasi sempre è la scelta sbagliata. L'articolo spiega perché, che cosa succede dall'altra parte del contratto, e perché alla fine di un mese di contrattazioni può non essere passata di mano nessuna azione.

## Tre modi di chiudere

Chi possiede un'opzione americana, spiega l'autorità statunitense di vigilanza, prima della scadenza [può esercitarla, rivenderla sul mercato o lasciarla scadere senza valore](https://www.finra.org/investors/investing/investment-products/options). La seconda strada è la più usata, e per una buona ragione.

## Perché esercitare prima non conviene

Riprendiamo la call: strike 90, azione a 110, due mesi alla scadenza. Esercitando oggi incassi il valore intrinseco, 20. Rivendendo incassi il premio, che è il valore intrinseco più il [valore temporale](valore-temporale.html), quindi più di 20. Esercitare prima vuol dire rinunciare al valore temporale, che è proprio ciò che il mercato è disposto a pagarti. In più anticipi il pagamento dello strike, perdendo gli interessi su quella somma.

È un risultato classico, dovuto a Robert Merton nel 1973: [salvo che appena prima della scadenza o di un dividendo, una call non andrebbe mai esercitata in anticipo](https://econpapers.repec.org/paper/cprceprdp/11019.htm). Per le put il ragionamento è meno netto: una put molto nel denaro può convenire esercitarla prima, perché si incassa subito lo strike.

## L'eccezione dei dividendi

Il giorno in cui un'azione stacca il dividendo, il suo prezzo scende di circa l'importo del dividendo. Chi possiede la call non riceve il dividendo, chi possiede l'azione sì. Se il dividendo è maggiore del valore temporale rimasto, conviene esercitare la call il giorno prima e incassarlo.

Molti piccoli investitori non lo fanno. Lo studio sul commercio di opzioni negli Stati Uniti tra il 2019 e il 2021 ha trovato [un aumento delle call lasciate non esercitate quando sarebbe convenuto, sfruttato da altri operatori con operazioni quasi prive di rischio](https://zmescience.com/science/retail-investors-lost-billions-of-dollars-day-trading-derivatives-during-the-pandemic).

Anche il risultato di Merton ha eccezioni dovute agli attriti del mercato. Una ricerca del 2016 mostra che [esercitare in anticipo può essere ottimale quando riduce i costi di vendita allo scoperto, di transazione o di finanziamento](https://econpapers.repec.org/paper/cprceprdp/11019.htm).

## Chi viene scelto, dall'altra parte

Quando qualcuno esercita, qualcuno che ha venduto la stessa opzione deve consegnare. Ma non c'è un legame tra i due. Le opzioni quotate, descritte in [Opzioni](opzioni-come-funzionano.html), sono fungibili: tutti i contratti con lo stesso sottostante, strike e scadenza sono identici e intercambiabili. Tra compratori e venditori sta una cassa di compensazione, che negli Stati Uniti è la Options Clearing Corporation.

La procedura è descritta dall'associazione di settore: la cassa [assegna gli esercizi in modo casuale agli intermediari che hanno posizioni corte; l'intermediario li ripartisce tra i clienti con un metodo casuale o in ordine di apertura](https://prd-web.optionseducation.org/referencelibrary/faq/options-assignment). Chi vende un'opzione americana nel denaro sa quindi che può essere chiamato in qualsiasi momento, senza preavviso.

Per chi è short, essere assegnato prima della scadenza non è di per sé una cattiva notizia. Chi esercita in anticipo rinuncia al valore temporale, e quella rinuncia va a beneficio di chi viene assegnato. Chi ha venduto una put nel denaro e viene assegnato si trova con le azioni pagate allo strike: può rivenderle e vendere di nuovo la stessa put, trovandosi in una posizione migliore di prima.

## La somma fa zero

Le azioni in circolazione di un'azienda sono un numero fisso, deciso dall'azienda. Le opzioni no. Ogni volta che un compratore e un venditore aprono una nuova posizione, nasce un contratto; ogni volta che la chiudono, sparisce. Per ogni posizione lunga ce n'è una corta: la somma è sempre zero.

Una conseguenza curiosa. Alla scadenza, se tutti chiudono le posizioni rivendendo o ricomprando le opzioni, nessuno esercita e nessuna azione passa di mano. Le opzioni sono state solo un modo di scambiarsi denaro in base al prezzo dell'azione.

## Obiezioni e risposte

::: obiezione Esercitare è più semplice
Rivendere richiede di trovare un compratore e un prezzo. Esercitare è un ordine solo.
:::

::: risposta
Per le opzioni con molti scambi la differenza tra prezzo di acquisto e di vendita è piccola rispetto al valore temporale. Per quelle poco scambiate può essere grande: lo studio citato misura una differenza media del 12,6% sulle opzioni preferite dai piccoli investitori. In quel caso esercitare può davvero rendere di più. Va calcolato caso per caso, non deciso per comodità.
:::

::: obiezione Venderò l'opzione e non sarò mai assegnato
Chi vende un'opzione fuori dal denaro non rischia l'assegnazione.
:::

::: risposta
Finché resta fuori dal denaro, quasi mai. Ma il prezzo si muove, e un'opzione venduta fuori dal denaro può entrarci. Con le opzioni americane l'assegnazione può arrivare in qualsiasi giorno, ed è più probabile alla vigilia di un dividendo. Chi vende deve poter consegnare o pagare in ogni momento.
:::

::: obiezione Alla scadenza tutto si regola da solo
Le opzioni nel denaro vengono esercitate automaticamente, quindi non serve pensarci.
:::

::: risposta
L'esercizio automatico esiste, ma fa nascere una posizione in azioni che forse non si voleva, e che costa cento volte il prezzo per contratto. Chi possiede una call con strike 200 si ritrova a dover pagare 20.000 per contratto. Meglio decidere prima che cosa fare.
:::

## Che cosa farne

1. **Prima di esercitare, confronta con il prezzo di rivendita.** Se il premio supera il valore intrinseco, rivendere rende di più.
2. **Controlla le date dei dividendi.** Sono il momento in cui l'esercizio anticipato diventa probabile, da entrambe le parti.
3. **Se vendi opzioni, tieni pronto il controvalore.** L'assegnazione può arrivare in qualsiasi momento.

::: difendibile
Un'opzione si chiude quasi sempre rivendendola, perché esercitarla prima della scadenza butta via il valore temporale. Le eccezioni sono i dividendi e alcuni attriti di mercato. Dall'altra parte, l'assegnazione è casuale e può arrivare in ogni momento, e alla scadenza può non passare di mano nessun titolo.
:::
