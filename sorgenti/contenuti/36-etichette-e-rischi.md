---
slug: etichette-e-rischi
titolo: Etichette e rischi
tesi: Un portafoglio 75/25 ha il rischio di un 75/25.
obiezione: Dipende da che cosa c'è dentro il 75.
gruppo: esposizioni
livello: avanzato
sommario: Due portafogli con la stessa ripartizione tra attività di crescita e difensive possono avere rischi diversi, e uno stesso rischio può corrispondere a ripartizioni diverse. Un caso di studio di MSCI lo mostra con i numeri: che cosa si vede quando si sommano i fattori invece delle etichette.
aggiornato: 2026-11-13
---

"Azioni", "obbligazioni", "immobili", "private equity" sono nomi di contenitori. Il rischio sta nei fattori che ci sono dentro: mercato azionario, tassi, credito, valute, dimensione delle società, area geografica. Lo stesso fattore può stare in più contenitori, ed è lì che i conti per etichetta sbagliano.

Il secondo paper MSCI sul [total portfolio approach](tpa.html), *Total-Portfolio Approach: Framework in Practice*, segue un fondo pensione pubblico americano ipotetico: 75% in attività di crescita e 25% difensive, con un terzo del capitale in mercati privati. Due episodi del caso meritano di essere ricostruiti.

## Primo episodio: il private equity che disfa le scelte

La squadra dell'azionario quotato aveva fatto tre scelte deliberate: una quota di Stati Uniti in linea con il mercato, un leggero sovrappeso di mercati emergenti, e nessuna inclinazione di dimensione. Misurate sul solo azionario quotato, le scelte erano rispettate.

Ma il fondo aveva altre azioni: quelle non quotate, gestite da un'altra squadra. Sommandole:

| Esposizione | Solo quotato | Tutto l'azionario | Obiettivo |
|---|---|---|---|
| Stati Uniti | 61,4% | 66,3% | 61,4% |
| Mercati emergenti | 13,6% | 11,5% | 13,6% |
| Fattore dimensione | +0,118 | −0,019 | +0,118 |

Il private equity era per circa l'85% americano, quasi assente dagli emergenti e fatto di società piccole. Il sovrappeso di emergenti era diventato un sottopeso. Nessuno lo aveva deciso, e nessun rapporto lo mostrava, perché ogni casella era al suo peso approvato.

La correzione segue una logica semplice. Il private equity non si può ribilanciare; l'azionario quotato sì. Quindi è il quotato a spostarsi: meno Stati Uniti, più sviluppati esteri ed emergenti, quasi nessuna small cap. La parte liquida diventa un *portafoglio di completamento* di quella illiquida. Un responsabile azionario citato nel primo paper lo dice così: tratto il mio programma di azioni quotate come completamento di tutte le attività illiquide del fondo.

## Secondo episodio: lo stesso 75/25, un punto di rischio in meno

Il consiglio esprime la propensione al rischio con un portafoglio di riferimento: 75% azioni globali, 25% titoli di Stato americani, volatilità 11,31%. Per etichetta il fondo è identico: 75% crescita, 25% difensivo. Per rischio no: la sua volatilità è 10,35%, quella di un portafoglio passivo 68/32.

La differenza si scompone così, in punti di volatilità:

| Scelta di allocazione | Effetto |
|---|---|
| Immobili non quotati | −1,38 |
| Attività reali quotate | −0,32 |
| Private equity | +0,52 |
| Credito nei comparti difensivi | +0,12 |
| Composizione dell'azionario quotato | +0,10 |
| **Totale** | **−0,96** |

Le prime due voci diversificano: portano fattori solo in parte correlati con l'azionario. Il private equity aggiunge rischio pur avendo una correlazione moderata con il resto, 0,61, perché la sua volatilità stimata è del 27,2%. I comparti difensivi aggiungono rischio perché contengono credito, che scende insieme alle azioni.

Per usare tutto il rischio approvato, la squadra riduce le obbligazioni quotate dal 19% all'11,3% e alza l'azionario quotato dal 44% al 50,8%. Il risultato ha l'82,7% in attività di crescita e la stessa volatilità del 75/25 di riferimento.

$$
\sigma_{82{,}7/17{,}3}^{\text{fondo}} = \sigma_{75/25}^{\text{riferimento}} = 11{,}31\%
$$

Due portafogli con etichette diverse e rischio uguale; prima, due portafogli con etichette uguali e rischio diverso.

## Il nodo delle valutazioni lisciate

Tutto il caso dipende da un numero che non si osserva: la volatilità vera delle attività non quotate. I valori dichiarati vengono da perizie periodiche, che si muovono poco e in ritardo. Il modello MSCI li corregge con una procedura statistica che combina le valutazioni dichiarate con l'informazione dei mercati quotati; dopo la correzione, la correlazione tra private equity e azioni quotate sale.

Cliff Asness ha dato un nome al fenomeno, [riciclaggio della volatilità](https://www.aqr.com/-/media/AQR/Documents/Journal-Articles/Interview-with-Cliff-Asness-Journal-of-Private-Markets-Investing--Spring-2026.pdf?sc_lang=en): le valutazioni lisciate permettono di aumentare l'esposizione azionaria evitando il dolore dei ribassi di breve periodo. Chi lo fa a occhi chiusi, sostiene, non sta gestendo il rischio: lo sta probabilmente aumentando senza ammetterlo. [Morningstar](https://www.morningstar.com/alternative-investments/how-private-equity-funds-understate-risk-their-investments) nota il paradosso: le società in portafoglio ai fondi di private equity sono in genere più piccole, meno diversificate e più indebitate delle quotate, caratteristiche che dovrebbero aumentare il rischio, non ridurlo.

## Obiezioni e risposte

::: obiezione I fattori sono un modello, le etichette sono fatti
Che un fondo abbia il 12% in private equity è un dato contabile. Che quel 12% abbia una volatilità del 27,2% è l'uscita di un modello proprietario.
:::

::: risposta
Vero. La correzione delle valutazioni è una stima, non una misura, e modelli diversi danno numeri diversi. Ma l'alternativa non è neutrale: usare la volatilità dichiarata è anch'esso un modello, e si sa che sbaglia per difetto. Tra un errore di segno noto e una stima incerta, la seconda è preferibile.
:::

::: obiezione Le valutazioni lente sono un vantaggio, non un difetto
Chi non vede il prezzo ogni giorno non vende nel panico. Se l'orizzonte è lungo, la volatilità di breve è rumore.
:::

::: risposta
È l'argomento più serio a favore dei mercati privati, ed è comportamentale. Ma riguarda come l'investitore vive il rischio, non quanto rischio c'è. In una crisi lunga le valutazioni si adeguano, e nel frattempo i richiami di capitale arrivano quando la parte liquida è scesa. Lo stesso Asness osserva che il lisciamento regge nei ribassi brevi e non in un mercato orso prolungato.
:::

::: obiezione "Usare tutto il rischio" è un modo elegante di rischiare di più
Il fondo era sotto il limite e l'ha raggiunto vendendo titoli di Stato.
:::

::: risposta
Il paper non lo nasconde. Il rendimento atteso implicito sale dal 5,17% al 5,65%. Nelle prove di stress il nuovo portafoglio perde 0,5–0,8 punti meno del riferimento in tre scenari su quattro, ma in recessione perde 0,16 punti in più, perché tiene il 5,4% in titoli di Stato americani contro il 25% del riferimento. A parità di volatilità si è scambiata un po' di protezione dalla recessione con più rendimento atteso. La volatilità non distingue tra i due.
:::

::: obiezione Le correlazioni del modello valgono finché valgono
Tutta la scomposizione poggia su una matrice di covarianze stimata sul passato. Nelle crisi le correlazioni salgono insieme.
:::

::: risposta
Per questo il caso affianca alla volatilità quattro scenari macroeconomici. È il limite che vale anche per la [risk parity](risk-parity.html), e che le [code grasse](code-grasse.html) rendono più serio: misurare il rischio per fattori è meglio che per etichette, ma resta una misura costruita su un regime che può cambiare.
:::

## Che cosa resta a un privato

Chi non ha private equity ha comunque le sue attività illiquide: la casa, il fondo pensione, la partecipazione in un'azienda di famiglia, il reddito da lavoro, cioè il capitale umano di [Ciclo di vita](ciclo-di-vita.html). Non si ribilanciano e hanno esposizioni precise. La logica del completamento si applica tale e quale.

- Chi possiede immobili in una sola città ha già un'esposizione concentrata al mercato immobiliare e all'economia locale: il portafoglio finanziario non dovrebbe aggiungerne.
- Chi lavora in un settore ciclico e ha azioni della propria azienda ha lo stesso fattore tre volte: nello stipendio, nei titoli, nel listino di casa.
- Chi tiene obbligazioni societarie ad alto rendimento "per la parte prudente" ha messo rischio azionario nella casella difensiva, come il fondo del caso.

Il test è lo stesso del fondo: con ogni casella al suo peso, il totale ha le esposizioni che volevo?

::: difendibile
La ripartizione per classi dice quanto capitale sta in ogni contenitore, non quanto rischio. Sommare le esposizioni su tutto ciò che si possiede, comprese le attività che non si possono vendere, è l'unico modo per sapere se il portafoglio è quello che si era scelto. La parte liquida va costruita attorno a quella illiquida, non accanto.
:::
