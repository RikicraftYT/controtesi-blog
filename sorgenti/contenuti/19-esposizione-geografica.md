---
slug: esposizione-geografica
titolo: Dove investe davvero un indice globale
tesi: Un indice azionario globale è per due terzi una scommessa sugli Stati Uniti.
obiezione: Lo è per sede legale. Per ricavi, impianti e fornitori lo è per poco più del 40%.
gruppo: esposizioni
livello: intermedio
sommario: Il peso di un paese in un indice dice dove le società hanno la sede, non dove vendono, producono e comprano. Misurata così, l'esposizione agli Stati Uniti scende e quella alla Cina quintuplica. Ma l'esposizione economica non è diversificazione, e i due concetti vanno tenuti distinti.
aggiornato: 2026-11-13
---

La scheda di un ETF globale riporta una tabella di pesi per paese. Quella tabella risponde a una domanda precisa, cioè dove sono domiciliate le società, e viene letta come se rispondesse a un'altra: da quali economie dipende il mio portafoglio. Sono due domande diverse, e le risposte si allontanano sempre di più.

## Quattro modi di misurare la geografia

Una [nota di ricerca di MSCI](https://www.msci.com/research-and-insights/quick-take/do-you-know-the-real-geographic-exposure-of-your-portfolio) del giugno 2026 scompone l'indice MSCI ACWI, che copre mercati sviluppati ed emergenti, secondo quattro criteri.

| Criterio | Domanda | Quota Stati Uniti |
|---|---|---|
| Domicilio | Dove ha sede la società? | circa 64% |
| Ricavi | Dove sono i clienti? | poco meno del 44% |
| Attività dirette | Dove sono impianti e uffici? | — |
| Filiera | Dove sono i fornitori di primo e secondo livello? | quasi 42% |

La nota non riporta la quota per le attività dirette. Mettendo insieme ricavi, attività e filiera, l'esposizione agli Stati Uniti risulta poco più del 40%. Il resto si sposta verso la Cina, Taiwan e il resto del mondo.

Il caso opposto è la Cina. Nell'indice pesa il 2,5%. Per ricavi, quasi il 12% di ciò che le società dell'indice incassano viene da lì. Nella filiera dei beni, la dipendenza dalla Cina è dell'8% e quella da Taiwan del 6%. Un investitore che legge solo la tabella dei pesi crede di avere un'esposizione marginale alla Cina; ne ha una quasi cinque volte più grande. Quale Cina ci sia dentro un indice globale, e perché vi pesi così poco, è il tema di [Quale Cina compri](quale-cina.html).

## Come si calcola

Per ogni società $i$ con peso $w_i$ nel portafoglio, sia $s_{i,c}$ la quota dei suoi ricavi che viene dal paese $c$. L'esposizione del portafoglio a quel paese è

$$
E_c = \sum_i w_i \, s_{i,c} \qquad \text{con} \quad \sum_c s_{i,c} = 1
$$

Il criterio del domicilio è il caso particolare in cui $s_{i,c}$ vale 1 per il paese della sede e 0 per tutti gli altri. Un esempio con due sole società di pari peso:

| Società | Sede | Ricavi USA | Ricavi Cina | Ricavi altrove |
|---|---|---|---|---|
| A, semiconduttori | Stati Uniti | 30% | 40% | 30% |
| B, servizi pubblici | Stati Uniti | 100% | 0% | 0% |

Per domicilio il portafoglio è 100% Stati Uniti. Per ricavi è

$$
E_{\text{USA}} = 0{,}5 \times 0{,}30 + 0{,}5 \times 1 = 65\% \qquad E_{\text{Cina}} = 0{,}5 \times 0{,}40 = 20\%
$$

L'esempio è inventato, ma la differenza tra settori è reale. Nell'S&P 500, secondo [dati FactSet elaborati da First Trust](https://www.ftportfolios.com/Commentary/MarketCommentary/2026/9/24/sp-500-index-international-revenue-by-sector), a settembre 2026 il settore tecnologico ricavava il 51,6% fuori dal Nord America e i servizi di pubblica utilità l'1,8%. Stessa bandiera, rischi geografici opposti.

## Da dove vengono i numeri

Qui sta il punto che la nota di MSCI liquida in una riga e che merita più spazio: quasi nessuno di questi dati è osservato direttamente.

**Ricavi.** Le società non pubblicano i ricavi paese per paese. Pubblicano segmenti scelti da loro: "Americhe", "EMEA", "Resto del mondo". La [metodologia MSCI Economic Exposure](https://www.msci.com/documents/10199/a41ac042-6034-a1ca-04b9-d6bc0c498b61) parte da quei segmenti e li ripartisce tra i paesi che li compongono in proporzione al PIL nominale. Se una società dichiara il 30% dei ricavi in "Europa", la parte attribuita all'Italia è una stima basata sul peso dell'Italia nel PIL europeo, non un dato di vendita. Quando un bilancio riporta sia i ricavi per destinazione sia quelli per origine, MSCI usa la destinazione, cioè dove sta il cliente. Quando la ripartizione geografica manca del tutto, [il 100% dei ricavi viene assegnato al paese di classificazione](https://www.msci.com/documents/10199/0b9077b1-f82e-0457-c8f6-04a7037079dc): per quelle società, ricavi e domicilio coincidono per costruzione.

**Attività e filiera.** I dati sulla filiera sono modellati: MSCI stima le dipendenze a monte di oltre 11.000 emittenti, mappando i flussi economici su più di 140 regioni e 400 attività, a partire dalla localizzazione degli impianti. Gli stessi autori avvertono che ricavi, attività dirette e filiera sono stime che possono differire da quanto dichiarano le società.

C'è poi una scelta nascosta nel numero di sintesi. Il "poco più del 40%" combina tre criteri che misurano cose diverse, e la nota non dice con quali pesi. Non esiste un modo naturale di sommare clienti, stabilimenti e fornitori.

## Non è un fatto solo americano

Lo stesso scarto si ritrova negli altri indici. Per l'S&P 500, [il 41,8% dei ricavi a fine 2024 veniva da fuori degli Stati Uniti](https://www.ftportfolios.com/Commentary/MarketCommentary/2026/1/15/stocks-in-the-new-millenium). Per lo STOXX Europe 600, [quasi metà dei ricavi è realizzata fuori dall'Europa](https://stoxx.com/stoxx-focus-indices-rethinking-country-exposure-with-a-revenue-based-lens/). Chi compra "azioni europee" per ridurre la dipendenza dagli Stati Uniti compra anche molte società che vendono soprattutto lì.

## Obiezioni e risposte

::: obiezione I ricavi non sono rendimenti
Sapere dove vende una società non dice come si muove il suo titolo. Le multinazionali sono quotate nel mercato di casa, sono comprate dagli investitori di casa e salgono e scendono con quel mercato. [Rowland e Tesar](https://www.nber.org/papers/w6733) lo hanno verificato per i paesi del G7: nella maggior parte dei paesi e dei periodi, aggiungere le multinazionali nazionali a un portafoglio domestico non ne migliora il profilo di rischio e rendimento, mentre aggiungere indici esteri sì. [Morningstar](https://www.morningstar.com.au/etfs/future-focus-your-aussie-shares-etf-isnt-very-aussie) lo riassume così: l'esposizione economica internazionale e la diversificazione azionaria internazionale sono cose diverse.
:::

::: risposta
L'obiezione è corretta e va tenuta insieme al dato di MSCI, non al suo posto. Le due misure rispondono a domande diverse. Il domicilio spiega meglio i movimenti ordinari: valutazioni, flussi, valuta di quotazione, umore del mercato di casa. I ricavi spiegano meglio che cosa succede quando lo shock è geografico. Dal 2 aprile 2025, giorno dell'annuncio dei dazi americani, [l'indice delle società statunitensi con ricavi prevalentemente esteri è salito del 22,2% e quello delle società con ricavi prevalentemente interni dello 0,1%](https://stoxx.com/?p=84077), a fine marzo 2026. Stesso paese, stessa borsa, ventidue punti di differenza.
:::

::: obiezione Allora basta comprare le multinazionali di casa
È l'argomento attribuito a John Bogle: chi possiede le grandi società americane ha già il mondo in portafoglio, perché quelle società vendono ovunque. Uno [studio su fondi di molti paesi](https://nber.org/system/files/working_papers/w27648/w27648.pdf) trova che l'esposizione internazionale di un fondo domestico medio aumenta di 32 punti percentuali se si contano le multinazionali che detiene.
:::

::: risposta
L'esposizione c'è, ma è di un tipo solo. Possedere una società americana che vende in Europa non è come possedere una società europea: restano in comune la giurisdizione, il regime fiscale, la valutazione del mercato di quotazione e la composizione settoriale del listino. Il rischio di un singolo paese discusso in [Il mercato cresce nel tempo](mercato-cresce.html) è un rischio di domicilio: espropri, controlli sui capitali, chiusure di borsa colpiscono chi è quotato lì, ovunque venda. E un mercato caro secondo il [CAPE](cape-shiller.html) resta caro anche se i suoi ricavi sono globali.
:::

::: obiezione Sono stime costruite su altre stime
Ripartire "Resto del mondo" in base al PIL presuppone che una società venda in ogni paese in proporzione alla dimensione della sua economia. Per un produttore di beni di lusso o di macchinari è un'ipotesi fragile. I dati di filiera sono modelli, non contratti.
:::

::: risposta
Va concesso. I numeri hanno un margine d'errore che nessuno pubblica, e la precisione al decimale è apparente. L'ordine di grandezza però è robusto, perché fonti indipendenti con metodi diversi convergono: circa il 40% dei ricavi delle grandi società americane viene dall'estero, secondo MSCI e secondo i dati FactSet sull'S&P 500. La differenza tra il 64% e una cifra vicina al 44% è troppo larga per essere un artefatto del metodo.
:::

::: obiezione I ricavi non sono utili, e gli utili non sono valore
Una società può incassare molto in un paese e guadagnarci poco, o viceversa. E il valore di un titolo dipende dagli utili futuri, non dalle vendite di oggi.
:::

::: risposta
Vero, e per questo la nota di MSCI affianca ai ricavi le attività dirette e la filiera: una società può non vendere nulla a Taiwan e dipenderne completamente per i componenti. Nessuno dei criteri, da solo, misura il rischio. Insieme delimitano dove può arrivare un problema: dal lato dei clienti, degli impianti o dei fornitori.
:::

::: obiezione Per chi ha un indice globale non cambia nulla
Chi possiede tutto il mercato ha già, per definizione, la geografia economica del mercato. Non c'è niente da aggiustare.
:::

::: risposta
In gran parte è così, ed è la conclusione più utile. Cambiano due cose. La prima è la lettura: il 64% di Stati Uniti sopravvaluta la dipendenza dall'economia americana e sottovaluta quella dalla Cina e dalle filiere asiatiche. La seconda riguarda chi costruisce il portafoglio a pezzi. Aggiungere un fondo "Europa" o "emergenti" per bilanciare gli Stati Uniti sposta i pesi per domicilio molto più di quanto sposti l'esposizione economica; e togliere la Cina dal portafoglio toglie il 2,5% di peso, non il 12% di ricavi.
:::

## Che cosa farne

La nota di MSCI chiude sul rischio: due società dello stesso settore e dello stesso paese possono reagire in modo molto diverso a un dazio, a una guerra commerciale o alla chiusura di una rotta marittima, a seconda di dove vendono e di dove si riforniscono. Gli autori citano i produttori di fertilizzanti dopo la chiusura dello Stretto di Hormuz.

Per un investitore individuale la lente dei ricavi serve a tre cose, in ordine di utilità:

1. **Leggere correttamente quello che si ha.** Il peso per paese descrive il rischio giuridico, valutativo e di listino. L'esposizione per ricavi e filiera descrive il rischio economico. Servono entrambe.
2. **Non contare due volte la diversificazione.** Due fondi con bandiere diverse possono dipendere dagli stessi clienti finali.
3. **Non usarla per scegliere i titoli.** Sapere che una società dipende dalla Cina non dice se il prezzo lo sconta già. È un'informazione pubblica, e vale quanto detto in [Mercati efficienti](mercati-efficienti.html).

::: difendibile
Il peso geografico di un indice misura dove le società sono quotate, e spiega come il portafoglio si muove nei periodi normali. L'esposizione per ricavi, attività e filiera misura da quali economie dipendono gli utili, e conta quando lo shock è commerciale o geopolitico. Un indice globale è meno americano e più asiatico di quanto dica la sua tabella dei pesi; non per questo è più diversificato di quanto dicano i suoi rendimenti.
:::
