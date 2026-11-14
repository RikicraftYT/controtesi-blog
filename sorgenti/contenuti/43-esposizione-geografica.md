---
slug: esposizione-geografica
titolo: Dove investe davvero un indice globale
tesi: Un indice azionario globale è per due terzi una scommessa sugli Stati Uniti.
obiezione: Lo è per sede legale. Per ricavi, impianti e fornitori lo è per poco più del 40%.
gruppo: esposizioni
livello: intermedio
tag: geografia, azioni, diversificazione
sommario: Il peso di un paese in un indice dice dove le società hanno la sede, non dove vendono, producono e comprano. Misurata così, l'esposizione agli Stati Uniti scende e quella alla Cina quintuplica. Ma l'esposizione economica non è diversificazione, e i due concetti vanno tenuti distinti.
aggiornato: 2026-11-13
---

La scheda di un ETF globale riporta i pesi per paese. Quella tabella dice dove sono domiciliate le società, ma viene letta come se dicesse da quali economie dipende il portafoglio. Sono due domande diverse, con risposte sempre più lontane.

## Quattro modi di misurare la geografia

Una [nota di ricerca di MSCI](https://www.msci.com/research-and-insights/quick-take/do-you-know-the-real-geographic-exposure-of-your-portfolio) del giugno 2026 scompone l'indice MSCI ACWI, che copre mercati sviluppati ed emergenti, secondo quattro criteri.

| Criterio | Domanda | Quota Stati Uniti |
|---|---|---|
| Domicilio | Dove ha sede la società? | circa 64% |
| Ricavi | Dove sono i clienti? | poco meno del 44% |
| Attività dirette | Dove sono impianti e uffici? | — |
| Filiera | Dove sono i fornitori di primo e secondo livello? | quasi 42% |

La nota non riporta la quota per le attività dirette; combinando ricavi, attività e filiera, l'esposizione agli Stati Uniti risulta poco più del 40%.

Il caso opposto è la Cina: nell'indice pesa il 2,5%, ma da lì viene quasi il 12% dei ricavi delle società dell'indice. Nella filiera dei beni la dipendenza dalla Cina è dell'8%, quella da Taiwan del 6%. Chi legge solo i pesi crede di avere un'esposizione marginale alla Cina; ne ha una quasi cinque volte più grande. Perché vi pesi così poco è il tema di [Quale Cina compri](quale-cina.html).

```grafico
{
 "tipo": "punti-collegati",
 "titolo": "Quanto pesa un paese, per sede o per ricavi",
 "nota": "Fonte: nota MSCI del giugno 2026 sull'indice MSCI ACWI. Per la filiera la quota degli Stati Uniti è quasi il 42%.",
 "nomi": [
  "Peso per sede",
  "Peso per ricavi"
 ],
 "colori": [
  4,
  1
 ],
 "x": {
  "min": 0,
  "max": 70,
  "formato": {
   "dec": "auto",
   "suffisso": "%"
  }
 },
 "righe": [
  {
   "etichetta": "Stati Uniti",
   "da": 64,
   "a": 44
  },
  {
   "etichetta": "Cina",
   "da": 2.5,
   "a": 12
  }
 ]
}
```

## Come si calcola

Per ogni società $i$ con peso $w_i$ nel portafoglio, sia $s_{i,c}$ la quota dei suoi ricavi che viene dal paese $c$. L'esposizione del portafoglio a quel paese è

$$
E_c = \sum_i w_i \, s_{i,c} \qquad \text{con} \quad \sum_c s_{i,c} = 1
$$

Il domicilio è il caso in cui $s_{i,c}$ vale 1 per il paese della sede e 0 per gli altri. Un esempio con due società di pari peso:

| Società | Sede | Ricavi USA | Ricavi Cina | Ricavi altrove |
|---|---|---|---|---|
| A, semiconduttori | Stati Uniti | 30% | 40% | 30% |
| B, servizi pubblici | Stati Uniti | 100% | 0% | 0% |

Per domicilio il portafoglio è 100% Stati Uniti. Per ricavi è

$$
E_{\text{USA}} = 0{,}5 \times 0{,}30 + 0{,}5 \times 1 = 65\% \qquad E_{\text{Cina}} = 0{,}5 \times 0{,}40 = 20\%
$$

L'esempio è inventato, la differenza tra settori no: nell'S&P 500, secondo [dati FactSet elaborati da First Trust](https://www.ftportfolios.com/Commentary/MarketCommentary/2026/9/24/sp-500-index-international-revenue-by-sector), a settembre 2026 la tecnologia ricavava il 51,6% fuori dal Nord America, i servizi di pubblica utilità l'1,8%. Stessa bandiera, rischi geografici opposti.

## Da dove vengono i numeri

Quasi nessuno di questi dati è osservato direttamente, e la nota di MSCI lo dice in una riga sola.

**Ricavi.** Le società non pubblicano i ricavi paese per paese, ma per segmenti scelti da loro: "Americhe", "EMEA", "Resto del mondo". La [metodologia MSCI Economic Exposure](https://www.msci.com/documents/10199/a41ac042-6034-a1ca-04b9-d6bc0c498b61) ripartisce ogni segmento tra i suoi paesi in proporzione al PIL nominale: la quota attribuita all'Italia è una stima, non un dato di vendita. Se la ripartizione geografica manca del tutto, [il 100% dei ricavi va al paese di classificazione](https://www.msci.com/documents/10199/0b9077b1-f82e-0457-c8f6-04a7037079dc), e ricavi e domicilio coincidono per costruzione.

**Attività e filiera.** Sono modellate: MSCI stima le dipendenze a monte di oltre 11.000 emittenti su più di 140 regioni e 400 attività, partendo dalla localizzazione degli impianti. Contano perché una società può non vendere nulla a Taiwan e dipenderne del tutto per i componenti. Gli stessi autori avvertono che sono stime, che possono differire da quanto dichiarano le società.

E il "poco più del 40%" combina tre criteri diversi senza dire con quali pesi: non esiste un modo naturale di sommare clienti, stabilimenti e fornitori. La precisione al decimale è apparente; l'ordine di grandezza no, perché fonti indipendenti con metodi diversi convergono.

## Non è un fatto solo americano

Secondo i dati FactSet, nell'S&P 500 [il 41,8% dei ricavi a fine 2024 veniva da fuori degli Stati Uniti](https://www.ftportfolios.com/Commentary/MarketCommentary/2026/1/15/stocks-in-the-new-millenium); per lo STOXX Europe 600, [quasi metà dei ricavi è realizzata fuori dall'Europa](https://stoxx.com/stoxx-focus-indices-rethinking-country-exposure-with-a-revenue-based-lens/). Chi compra "azioni europee" per dipendere meno dagli Stati Uniti compra anche società che vendono soprattutto lì.

## Obiezioni e risposte

::: obiezione I ricavi non sono rendimenti
Sapere dove vende una società non dice come si muove il suo titolo: le multinazionali salgono e scendono con il mercato in cui sono quotate. [Rowland e Tesar](https://www.nber.org/papers/w6733) lo hanno verificato per i paesi del G7: quasi sempre aggiungere le multinazionali di casa a un portafoglio domestico non ne migliora rischio e rendimento, aggiungere indici esteri sì. Come riassume [Morningstar](https://www.morningstar.com.au/etfs/future-focus-your-aussie-shares-etf-isnt-very-aussie), esposizione economica internazionale e diversificazione internazionale sono cose diverse.
:::

::: risposta
L'obiezione è corretta e va tenuta accanto al dato di MSCI, non al suo posto. Il domicilio spiega meglio i movimenti ordinari: valutazioni, flussi, valuta, umore del mercato di casa. I ricavi spiegano meglio gli shock geografici. Dal 2 aprile 2025, giorno dei dazi americani, [l'indice delle società statunitensi con ricavi prevalentemente esteri è salito del 22,2% e quello delle società con ricavi prevalentemente interni dello 0,1%](https://stoxx.com/?p=84077), a fine marzo 2026. Stesso paese, stessa borsa, ventidue punti di differenza.
:::

::: obiezione Allora basta comprare le multinazionali di casa
È l'argomento attribuito a John Bogle: le grandi società americane vendono ovunque, quindi chi le possiede ha già il mondo. Uno [studio su fondi di molti paesi](https://nber.org/system/files/working_papers/w27648/w27648.pdf) trova che l'esposizione internazionale di un fondo domestico medio sale di 32 punti se si contano le multinazionali che detiene.
:::

::: risposta
L'esposizione c'è, ma di un tipo solo. Una società americana che vende in Europa non è una società europea: giurisdizione, fisco, valutazione e composizione del listino restano americani. Il rischio di un singolo paese discusso in [Il mercato cresce nel tempo](mercato-cresce.html) è un rischio di domicilio: espropri, controlli sui capitali, chiusure di borsa colpiscono chi è quotato lì, ovunque venda. E un mercato caro secondo il [CAPE](cape-shiller.html) resta caro anche se i suoi ricavi sono globali.
:::

::: obiezione Per chi ha un indice globale non cambia nulla
Chi possiede tutto il mercato ha già, per definizione, la geografia economica del mercato. Non c'è niente da aggiustare.
:::

::: risposta
In gran parte è così, ed è la conclusione più utile. Cambiano due cose. La lettura: il 64% di Stati Uniti sopravvaluta la dipendenza dall'economia americana e sottovaluta quella dalla Cina e dalle filiere asiatiche. E le scelte di chi costruisce il portafoglio a pezzi: un fondo "Europa" o "emergenti" aggiunto per bilanciare gli Stati Uniti sposta i pesi per domicilio molto più dell'esposizione economica, e togliere la Cina toglie il 2,5% di peso, non il 12% di ricavi.
:::

## Che cosa farne

La nota di MSCI chiude sul rischio: due società dello stesso settore e paese possono reagire in modo opposto a un dazio o alla chiusura di una rotta marittima, secondo dove vendono e dove si riforniscono. Gli autori citano i produttori di fertilizzanti dopo la chiusura dello Stretto di Hormuz.

Per un investitore individuale la lente dei ricavi serve a tre cose:

1. **Leggere quello che si ha.** Il peso per paese descrive il rischio giuridico, valutativo e di listino; ricavi e filiera il rischio economico. Servono entrambi.
2. **Non contare due volte la diversificazione.** Due fondi con bandiere diverse possono dipendere dagli stessi clienti.
3. **Non usarla per scegliere i titoli.** Che una società dipenda dalla Cina è un'informazione pubblica, probabilmente già nel prezzo: vale quanto detto in [Mercati efficienti](mercati-efficienti.html).

::: difendibile
Il peso geografico di un indice misura dove le società sono quotate, e spiega come il portafoglio si muove nei periodi normali. L'esposizione per ricavi, attività e filiera misura da quali economie dipendono gli affari, e conta quando lo shock è commerciale o geopolitico. Un indice globale è meno americano e più asiatico di quanto dica la sua tabella dei pesi; non per questo è più diversificato di quanto dicano i suoi rendimenti.
:::
