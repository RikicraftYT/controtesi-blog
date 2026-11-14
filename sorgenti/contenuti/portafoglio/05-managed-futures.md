---
slug: managed-futures
titolo: Managed futures, che cosa compri quando compri il trend
tesi: Un fondo managed futures protegge il portafoglio nei crolli.
obiezione: Spesso sì, non sempre; e costi e anni magri possono mangiarsi il beneficio.
livello: avanzato
tag: fondi ed ETF, diversificazione, costi, dati storici
sommario: I fondi managed futures comprano e vendono futures su azioni, obbligazioni, valute e materie prime seguendo i trend. Nel 2008 e nel 2022 hanno guadagnato mentre il resto perdeva; tra il 2009 e il 2018 hanno reso quasi zero. Contano i costi, gli interessi sulla cassa e la pazienza.
prima: trend-following, diversificazione
aggiornato: 2026-11-14
---

L'articolo sul [trend following](trend-following.html) spiega la strategia: comprare i mercati che salgono, vendere allo scoperto quelli che scendono, e perché ha funzionato per più di un secolo nelle simulazioni. Questo articolo guarda lo strumento con cui la si compra davvero: i fondi *managed futures*. Fra la strategia studiata e il fondo nel conto ci sono costi, interessi e anni difficili.

## Che cosa sono

I fondi managed futures sono gestiti da società chiamate CTA, *commodity trading advisor*. Oggi [investono al rialzo o al ribasso in futures su metalli, cereali e altre merci, ma anche su indici azionari, titoli di Stato e valute](https://www.aqr.com/library/journal-articles/demystifying-managed-futures).

Le strategie sono molte, ma il nucleo è uno solo. Hurst, Ooi e Pedersen hanno confrontato i rendimenti dei fondi con quelli di un trend following semplice e mostrano che [quella strategia spiega bene i rendimenti dei fondi e degli indici, compresi quelli dei gestori più grandi e di maggior successo](https://papers.ssrn.com/abstract=2333776). Il risultato più netto: [i rendimenti in eccesso che i grandi gestori hanno ottenuto rispetto ad azioni e obbligazioni scendono a zero quando si tiene conto del trend following](https://joim.com/?p=1179). Chi compra un fondo managed futures compra, in larga parte, il trend.

## Come funziona un fondo

Un future non richiede di pagare l'intero valore del contratto: basta depositare un margine. Per questo [spesso i fondi usano solo il 15% del patrimonio come margine, e il resto resta in titoli a breve termine](https://www.nxtbook.com/nxtbooks/morningstar/advisor_20130607/index.php?startid=45), di solito titoli di Stato statunitensi.

Il rendimento di un fondo ha quindi due parti:

$$
R_{\text{fondo}} = r_{\text{cassa}} \acapo + R_{\text{trend}} - \text{costi}
$$

dove $r_{\text{cassa}}$ è l'interesse sui titoli a breve e $R_{\text{trend}}$ il guadagno o la perdita sulle posizioni in futures. La prima parte non ha niente a che fare con l'abilità del gestore: è il tasso che si otterrebbe tenendo liquidità. Eppure, [per alcuni indici di settore, gli interessi sulla cassa rappresentano circa metà del rendimento totale](https://nilssonhedge.com/databaseinfo/database-info/excess-returns/). Per giudicare un fondo, il confronto giusto non è con lo zero ma con il rendimento di un conto deposito o di un fondo monetario.

Il margine ridotto permette anche di prendere posizioni grandi rispetto al patrimonio. I gestori di solito fissano la leva in modo da ottenere una volatilità costante: nelle simulazioni di Hurst, Ooi e Pedersen [l'obiettivo è il 10% l'anno](https://fairmodel.econ.yale.edu/ec439/hurst.pdf).

## Che cosa dicono i fondi veri

| Periodo | Che cosa è successo |
| --- | --- |
| 2008 | [Indice SG CTA +13,1%](https://thehedgefundjournal.com/the-convexity-of-trend-following/), mentre le azioni crollavano |
| 2009–2018 | [Indice SG Trend +0,4% l'anno, con una perdita massima del 21,8%](https://www.priceactionlab.com/Blog/?p=68040) |
| 2022 | [Indice SG Trend +27,35%, il miglior anno dal 2000](https://www.hedgeweek.com/flat-december-sees-ctas-complete-record-year-2022/) |
| 2025 | [Indice SG CTA oltre −8% a fine maggio](https://www.alternativeswatch.com/2025/06/02/trend-following-hedge-funds-endure-more-pain-societe-generale-indices/); [SG Trend +2,39% a fine anno](https://www.toptradersunplugged.com/?p=20381) |

Gli indici di Société Générale misurano i rendimenti netti dei maggiori gestori: il CTA i venti più grandi, il Trend i dieci più grandi che seguono il trend.

Un confronto riassume il carattere dello strumento. Dalla nascita dell'indice nel 2000, [i rendimenti trimestrali dei fondi di trend hanno superato quelli della liquidità solo nel 53% dei trimestri, contro il 67% delle azioni e il 69% delle obbligazioni statunitensi](https://cambridgeassociates.com/insight/with-trend-following-funds-down-sharply-this-fall-should-investors-fish-or-cut-bait). Quasi un trimestre su due il fondo fa peggio di un conto deposito.

```grafico
{
 "tipo": "barre",
 "titolo": "Trimestri in cui si è fatto meglio della liquidità, dal 2000",
 "nota": "Fonte: Cambridge Associates, sull'indice SG Trend e su azioni e obbligazioni statunitensi.",
 "x": {"min": 0, "max": 100, "formato": {"suffisso": "%"}},
 "colonna": "Trimestri sopra la liquidità",
 "righe": [
  {"etichetta": "Fondi di trend", "valore": 53, "colore": 1},
  {"etichetta": "Azioni USA", "valore": 67, "colore": 4},
  {"etichetta": "Obbligazioni USA", "valore": 69, "colore": 4}
 ]
}
```

## Il peso dei costi

Per decenni la commissione tipica è stata il «2 e 20»: il 2% del patrimonio ogni anno più il 20% dei guadagni. Hurst, Ooi e Pedersen la applicano alle loro simulazioni: sul periodo 1880–2013 [il rendimento passa dal 14,9% lordo all'11,2% netto](https://oxfordstrat.com/coasdfASD32/uploads/2016/03/A-Century-of-Evidence-on-Trend-Following-Investing.pdf).

Sui fondi veri il conto è più pesante. Bhardwaj, Gorton e Rouwenhorst hanno studiato i CTA tra il 1994 e il 2012 correggendo le distorsioni delle banche dati, in cui i fondi scelgono se e quando comunicare i risultati. Il risultato: [prima delle commissioni i fondi rendevano il 6,1% oltre i titoli di Stato a breve, dopo le commissioni un valore non distinguibile da zero](https://academicnewsletter.sufe.edu.cn/info/354190). Gli autori notano anche che, [già prima delle commissioni, i fondi non facevano meglio di semplici strategie sui futures di dominio pubblico](https://www.nber.org/papers/w14424).

È lo stesso problema descritto in [I costi](costi.html), ma più grave: se la strategia si può replicare, pagarla come un'abilità rara non ha senso. Oggi [alcuni gestori applicano commissioni più basse](https://fairmodel.econ.yale.edu/ec439/hurst.pdf), e sono nati fondi che cercano di replicare il rendimento medio del settore a costi ridotti.

## Come ci si arriva dall'Italia

Un privato italiano ha due strade. La prima sono i fondi comuni armonizzati: [diversi grandi gestori offrono in Europa fondi UCITS di trend following](https://www.hedgeweek.com/europes-first-managed-futures-hedge-fund-etf-launches/). La seconda, più recente, sono gli ETF: [il primo ETF europeo progettato per replicare i fondi managed futures è stato quotato nel 2025](https://www.hedgeweek.com/europes-first-managed-futures-hedge-fund-etf-launches/), e altri sono seguiti.

Prima di scegliere conviene leggere tre voci della [scheda di un fondo](scheda-di-un-fondo.html): le spese correnti e l'eventuale commissione di performance; la valuta, perché molti fondi sono in dollari e la cassa investita in titoli statunitensi porta con sé il cambio, salvo classi coperte in euro; il trattamento fiscale, che per fondi ed ETF armonizzati segue le regole di [Le tasse di base](tasse-di-base.html).

## Quanto metterne

Un fondo di questo tipo serve solo se pesa abbastanza da cambiare il risultato del portafoglio. Un esempio illustrativo: un anno in cui le azioni perdono il 40%, le obbligazioni guadagnano il 5% e i fondi di trend il 15%.

| Portafoglio | Risultato |
| --- | --- |
| 60% azioni, 40% obbligazioni | −22% |
| 54% azioni, 36% obbligazioni, 10% trend | circa −18% |
| 48% azioni, 32% obbligazioni, 20% trend | circa −15% |

```grafico
{
 "tipo": "barre",
 "titolo": "Un anno di crollo, con e senza una quota di trend",
 "nota": "Calcolo illustrativo: azioni −40%, obbligazioni +5%, fondi di trend +15% nello stesso anno; le quote tolte al 60/40 sono prese in proporzione da azioni e obbligazioni.",
 "x": {"min": -25, "max": 0, "formato": {"dec": 1, "suffisso": "%"}},
 "colonna": "Risultato dell'anno",
 "righe": [
  {"etichetta": "60/40", "valore": -22, "colore": 2},
  {"etichetta": "60/40 con il 10% di trend", "valore": -18.3, "colore": 2},
  {"etichetta": "60/40 con il 20% di trend", "valore": -14.6, "colore": 2}
 ]
}
```

Con il 10% l'effetto c'è ma è piccolo. Hurst, Ooi e Pedersen simulano una quota del 20% su un secolo e trovano che [ha ridotto la perdita massima del portafoglio, abbassato la volatilità e aumentato i rendimenti](https://fairmodel.econ.yale.edu/ec439/hurst.pdf). La simulazione però usa la strategia teorica, non un fondo vero.

## Obiezioni e risposte

::: obiezione È un'assicurazione contro i crolli
Nel 2008 e nel 2022 ha guadagnato mentre tutto il resto perdeva. Funziona come una polizza.
:::

::: risposta
Una polizza paga in base a un contratto; un fondo di trend paga solo se il crollo dura abbastanza da formare un trend. Nelle simulazioni le grandi crisi di un portafoglio 60/40 [durano in media circa 15 mesi](https://alphaarchitect.com/time-series-momentum-aka-trend-following-the-historical-evidence/), un tempo sufficiente. I crolli rapidi e le inversioni improvvise sono un'altra cosa. Ad aprile 2025, durante il calo delle Borse per i dazi, i gestori [si aspettavano che il trend cominciasse a guadagnare](https://www.alternativeswatch.com/2025/06/02/trend-following-hedge-funds-endure-more-pain-societe-generale-indices/), e invece l'indice dei CTA ha continuato a perdere. Chi vuole una protezione garantita deve pagarla, con le opzioni descritte in [Opzioni](opzioni-come-funzionano.html).
:::

::: obiezione Con i tassi a zero non rendono
Una parte del rendimento è interesse sulla cassa. Quando i tassi sono bassi, il fondo rende poco per forza.
:::

::: risposta
È vero per il rendimento totale, non per quello che conta. L'interesse sulla cassa si ottiene anche senza il fondo, tenendo liquidità; il valore aggiunto è solo $R_{\text{trend}}$ meno i costi. Con tassi alti il fondo sembra migliore di quanto sia, con tassi bassi sembra peggiore. Il confronto onesto, in ogni periodo, è con la liquidità.
:::

::: obiezione Bastano oro e obbligazioni
Per difendersi dai crolli azionari esistono strumenti più semplici e più economici.
:::

::: risposta
In molte crisi le obbligazioni hanno salvato il portafoglio. Nel 2022 no: [le azioni statunitensi hanno perso circa il 18% e le obbligazioni circa il 13%, mentre l'indice di trend guadagnava circa il 27%](https://ryanoconnellfinance.com/?p=12114). Il trend non ha una direzione fissa: può essere corto sulle obbligazioni quando i tassi salgono. Per questo diversifica in modo diverso dall'[oro](oro.html) e dai titoli di Stato, e non li sostituisce.
:::

::: obiezione Un indice nasconde i gestori peggiori
Gli indici includono i grandi fondi sopravvissuti. Un singolo fondo può andare molto peggio.
:::

::: risposta
È fondato. Nel 2022, l'anno migliore, [i risultati dei singoli gestori sono stati molto diversi tra loro](https://hedgenordic.com/?p=40435). E la composizione degli indici cambia: dei dieci programmi nell'indice SG Trend all'inizio del 2018, [quattro non esistevano prima del 2009](https://transtrend.com/en/insights/robust-versus-slow/). Scegliere un fondo vuol dire scegliere un gestore, con il rischio di prendere quello sbagliato.
:::

::: obiezione Nessuno lo tiene abbastanza a lungo
Una strategia che delude per dieci anni viene venduta prima che serva.
:::

::: risposta
È probabilmente il rischio più grande. Il divario tra il rendimento dei fondi e quello ottenuto da chi li compra è più ampio proprio negli strumenti volatili e alternativi, dove si compra dopo l'anno buono e si vende dopo quelli cattivi. Dopo il 2022 i nuovi prodotti si sono moltiplicati: [il settore si è affrettato a sfruttare la ripresa con nuovi ETF e fondi](https://www.priceactionlab.com/Blog/?p=68040). Chi è entrato allora ha trovato il 2025. Una quota di trend ha senso solo se si decide in anticipo di tenerla anche negli anni in cui non rende.
:::

## Che cosa farne

1. **Confronta con la liquidità, non con lo zero.** Il valore di un fondo managed futures è ciò che rende oltre il tasso a breve, dopo le commissioni.
2. **Guarda i costi prima del passato.** La strategia si può replicare: commissioni da gestione speciale si mangiano gran parte del beneficio.
3. **Decidi la quota e tienila.** Il 10–20% del portafoglio, ribilanciato con una regola, oppure niente: una quota piccola o abbandonata al primo anno cattivo non serve.

::: difendibile
I fondi managed futures vendono soprattutto trend following, e il loro rendimento è in parte interesse sulla cassa. Hanno guadagnato in crisi lunghe come il 2008 e il 2022, ma non in tutte, e hanno attraversato dieci anni quasi piatti. Dopo commissioni alte gli investitori hanno ottenuto poco più della liquidità: hanno senso solo a costi bassi, in una quota rilevante e tenuta con disciplina.
:::
