---
slug: factor-investing
titolo: Factor investing, premi al rischio o errori di prezzo
tesi: Value, size e momentum rendono più del mercato.
obiezione: Dopo la pubblicazione i premi si riducono di circa un terzo.
gruppo: prezzi
livello: avanzato
sommario: Alcune caratteristiche delle azioni hanno reso più di quanto spieghi il rischio di mercato. Se è rischio dura, se è errore si consuma. Non è facile dire quale.
aggiornato: 2026-11-13
---

Alcune caratteristiche delle azioni sono state associate a rendimenti più alti di quanto spieghi il solo rischio di mercato. La domanda che decide tutto è se siano compensi per un rischio, e quindi destinati a durare, oppure errori di prezzo, destinati a ridursi una volta noti.

## Dal CAPM ai fattori

Nel CAPM il rendimento atteso di un titolo dipende da una sola cosa, la sua sensibilità $\beta_i$ al mercato:

$$
E[r_i] - r_f = \beta_i \,\big(E[r_m] - r_f\big)
$$

I dati non lo confermano: titoli piccoli e titoli a basso prezzo rispetto al patrimonio hanno reso più di quanto il loro $\beta$ giustifichi. Fama e French (1993) aggiungono due fattori, poi altri due nel 2015:

$$
E[r_i] - r_f = \beta_i\,\text{MKT} + s_i\,\text{SMB} \acapo + h_i\,\text{HML} + p_i\,\text{RMW} + c_i\,\text{CMA}
$$

Ogni fattore è il rendimento di un portafoglio lungo su un gruppo di titoli e corto sul gruppo opposto.

| Fattore | Lungo / corto | Lettura «rischio» | Lettura «errore di prezzo» |
| --- | --- | --- | --- |
| Size (SMB) | Piccole / grandi | Meno liquide, più fragili nelle crisi | Poco seguite dagli analisti |
| Value (HML) | Prezzo basso / alto sul patrimonio | Imprese in difficoltà, sensibili al ciclo | Pessimismo eccessivo estrapolato |
| Profittabilità (RMW) | Redditizie / poco redditizie | Difficile da motivare come rischio | Qualità sottovalutata |
| Investimento (CMA) | Investono poco / molto | Legato al costo del capitale | Eccesso di espansione dei manager |
| Momentum | Vincitori / perdenti a 12 mesi | Debole; crolli improvvisi | Reazione lenta alle notizie |

Il momentum non fa parte del modello Fama-French a cinque fattori, ma è l'anomalia più robusta e la più difficile da conciliare con l'efficienza. Applicato a interi mercati invece che ai singoli titoli diventa il [trend following](trend-following.html).

## Obiezioni e risposte

::: obiezione Zoo dei fattori
La letteratura ha pubblicato centinaia di fattori. Con abbastanza ricercatori che setacciano gli stessi dati, relazioni «significative» ma spurie sono certe.
:::

::: risposta
Servono filtri più severi della significatività statistica: una motivazione economica, persistenza in periodi e paesi diversi da quelli del campione originale, sopravvivenza ai costi. Pochi fattori li superano, e sono quelli della tabella.
:::

::: obiezione I premi si riducono dopo la pubblicazione
McLean e Pontiff hanno riesaminato [97 variabili pubblicate](https://doi.org/10.1111/jofi.12365). Secondo la [sintesi di Swedroe](https://www.etf.com/sections/index-investor-corner/swedroe-published-results-impact-future-results), il rendimento medio cala di circa un terzo dopo la pubblicazione, e gli autori rigettano sia l'ipotesi che sparisca del tutto sia quella che resti invariato.
:::

::: risposta
Il risultato va letto nei due sensi. Parte del premio era errore di prezzo ed è stata arbitrata; parte sopravvive. I fattori con costi di arbitraggio alti si riducono meno, come previsto dai limiti all'arbitraggio. Aspettarsi due terzi del premio storico, o meno per prudenza, è più realistico che aspettarselo intero.
:::

::: obiezione Il premio di carta non è quello incassabile
I fattori accademici sono portafogli lunghi e corti, senza costi, spesso concentrati su titoli piccoli e illiquidi. Un fondo solo lungo ne cattura una frazione. [Dal 1927 le azioni value a grande capitalizzazione hanno battuto l'S&P 500 di circa l'1,5% annuo](https://moneysense.ca/?p=36813), prima di costi e commissioni.
:::

::: risposta
Va concesso. Il confronto corretto è tra il premio netto atteso e il costo aggiuntivo del prodotto rispetto a un indice a capitalizzazione.
:::

::: obiezione Decenni di sottoperformance
Il value ha reso meno del mercato per oltre un decennio dopo il 2007.
:::

::: risposta
Se è un premio al rischio, lunghi periodi negativi sono esattamente ciò che lo giustifica. Ma l'investitore non può distinguere in tempo reale tra un premio in fase debole e un premio scomparso, e molti abbandonano nel momento peggiore. Il rischio pratico dei fattori è comportamentale.
:::

::: obiezione Contraddizione con l'efficienza
Se i fattori sono errori di prezzo, i mercati non sono efficienti. Se sono rischi, non c'è pasto gratis e non si sta «battendo» nulla.
:::

::: risposta
È il problema dell'ipotesi congiunta di [Mercati efficienti](mercati-efficienti.html), e non ha soluzione empirica netta. La posizione coerente è trattare i fattori come fonti di rischio diverse dal mercato, utili per diversificare, non come rendimento gratuito.
:::

::: difendibile
Pochi fattori hanno una motivazione economica e reggono fuori campione. Vanno trattati come rischi aggiuntivi con un premio atteso più basso di quello storico, non come un modo per battere il mercato.
:::
