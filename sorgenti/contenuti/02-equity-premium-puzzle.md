---
slug: equity-premium-puzzle
titolo: Equity premium puzzle, il premio che i modelli non spiegano
tesi: Le azioni pagano un premio per il rischio.
obiezione: Un premio così grande nessun modello lo giustifica. Forse è stata fortuna.
gruppo: rendimenti
sommario: Che il premio azionario sia positivo è logica. Che sia stato del 6% l'anno è un enigma, e la spiegazione che scegli decide quanto aspettarti in futuro.
---

Il premio azionario storico è troppo alto per essere spiegato dai modelli standard con un'avversione al rischio plausibile. [Il mercato cresce nel tempo](mercato-cresce.html) dice che il premio deve essere positivo; qui la domanda è perché sia stato *così grande*, e la risposta che scegli determina quanto premio aspettarti in futuro.

## Il problema

Nel modello basato sui consumi, un'attività è rischiosa nella misura in cui rende poco proprio quando i consumi calano. Il premio azionario è circa:

$$
E[r_m] - r_f \;\approx\; \gamma \cdot \rho_{c,m} \cdot \sigma_c \cdot \sigma_m
$$

dove $\gamma$ è l'avversione relativa al rischio, $\sigma_c$ e $\sigma_m$ le volatilità della crescita dei consumi e del mercato, $\rho_{c,m}$ la loro correlazione. I consumi aggregati sono molto stabili: con $\sigma_c$ di pochi punti percentuali e una correlazione moderata, un premio del 6% richiede un $\gamma$ dell'ordine di 25–30.

Mehra e Prescott (1985) lo mostrarono sui dati USA 1889–1978: [il loro modello generava un premio inferiore all'1% per livelli ragionevoli di avversione al rischio](https://en.wikipedia.org/wiki/Equity_premium_puzzle). Benartzi e Thaler riassumono così: [dal 1926 le azioni hanno reso circa il 7% reale annuo contro meno dell'1% dei Treasury bill, e servirebbe un'avversione al rischio superiore a 30 contro stime vicine a 1](https://www.nber.org/system/files/working_papers/w4369/w4369.pdf).

Un $\gamma$ di 30 significa rifiutare scommesse che chiunque accetterebbe. E crea un secondo problema: investitori così avversi vorrebbero un tasso privo di rischio molto più alto di quello osservato (*risk-free rate puzzle*).

## Cinque spiegazioni, e cosa implica ciascuna

| Spiegazione | In breve | Cosa implica per il futuro |
| --- | --- | --- |
| È stata fortuna | Il premio realizzato ha superato quello atteso: gli USA sono il mercato sopravvissuto meglio e le valutazioni sono salite per un secolo | Premio futuro più basso di quello storico |
| Disastri rari | Si prezzano guerre, depressioni, espropri che nel campione americano si sono visti poco | Il premio persiste, ma stai vendendo un'assicurazione contro catastrofi reali |
| Preferenze diverse | Abitudini di consumo, rischi di lungo periodo sulla crescita: investitori molto sensibili alle recessioni | Il premio varia nel tempo ed è alto quando investire fa più paura |
| Avversione miope alle perdite | Chi soffre le perdite il doppio dei guadagni e controlla il portafoglio ogni anno chiede un premio simile a quello osservato | Un regalo a chi guarda poco e tiene a lungo; può ridursi se molti diventano pazienti |
| Frizioni | Per decenni pochi possedevano azioni, con costi alti e poca diversificazione | Con fondi indicizzati a costo quasi nullo, parte del premio può non ripetersi |

La prima spiegazione è l'obiezione di sopravvivenza vista in [Il mercato cresce nel tempo](mercato-cresce.html). La terza e la quarta sono il ponte verso il [CAPE](cape-shiller.html): se il premio richiesto varia, variano le valutazioni.

## Obiezione e risposta

::: obiezione «Se nessuno sa spiegarlo, perché dovrei contarci?»
Le rassegne successive concludono che [nessuna spiegazione ha raccolto un consenso generale](https://arxiv.org/pdf/1507.07214.pdf).
:::

::: risposta
Il puzzle riguarda la *dimensione* del premio, non il segno. Tutte le spiegazioni, tranne la pura fortuna, prevedono un premio positivo in futuro. E anche con cento anni di dati l'errore di stima sul premio è di alcuni punti, come mostra [Valore atteso](valore-atteso.html).
:::

::: difendibile
Un premio azionario positivo è ben fondato. La sua misura no: è prudente aspettarsi meno della media storica americana e trattare il resto come margine.
:::
