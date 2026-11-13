---
slug: valore-atteso
titolo: Valore atteso, la media che nessuno vive
tesi: Se il valore atteso è positivo, conviene.
obiezione: È una media su mondi paralleli. Tu ne vivi uno solo.
gruppo: strumento
livello: avanzato
sommario: Prima di discutere le teorie conviene capire cosa promette una media, e cosa no. Con una scommessa che in media vince e quasi sempre perde.
aggiornato: 2026-11-13
---

Ogni tesi di questo blog è un'affermazione su un valore atteso, e il valore atteso è una media su molti mondi possibili, non ciò che accade a un singolo investitore nel tempo. La distanza tra le due cose spiega buona parte delle obiezioni che troverai negli altri articoli.

## La definizione

Il valore atteso di una grandezza incerta $X$ è la media dei suoi esiti $x_i$ pesata per le probabilità $p_i$:

$$
E[X] = \sum_i p_i \, x_i
$$

Come regola di decisione dice due cose utili. Una scelta va giudicata per la distribuzione degli esiti che aveva davanti, non per l'esito che si è realizzato. E una scommessa con $E[X] > 0$, ripetuta molte volte in modo indipendente e con posta fissa, converge al guadagno medio per la legge dei grandi numeri.

Le condizioni della seconda frase sono tre: molte ripetizioni, indipendenti, a posta fissa. Negli investimenti nessuna è garantita.

## Dove smette di bastare

### Il capitale si compone

Una scommessa che ogni volta fa $+50\%$ o $-40\%$ con uguale probabilità ha valore atteso positivo, $+5\%$ a giocata. Ma chi reinveste tutto vede il capitale moltiplicarsi, non sommarsi, e la crescita tipica è la media geometrica:

$$
E[1+r] = \tfrac{1}{2}(1{,}5) + \tfrac{1}{2}(0{,}6) = 1{,}05 \qquad\quad \sqrt{1{,}5 \times 0{,}6} \approx 0{,}949
$$

Dopo 100 giocate il valore atteso è circa 131 volte il capitale iniziale. Il percorso tipico ne conserva lo 0,5%. La media è tenuta su da pochissimi percorsi fortunati che quasi nessuno vivrà.

<figure class="sim" data-sim="scommessa">
<figcaption>Venti giocatori, cinquanta giocate ciascuno, scala logaritmica. La linea gialla è il valore atteso, quella tratteggiata il percorso tipico.</figcaption>
</figure>

È il punto sollevato da Ole Peters nel [saggio sull'ergodicità](https://www.nature.com/articles/s41567-019-0732-0): la media nel tempo di un singolo percorso non coincide con la media tra percorsi paralleli.

### La media non è la mediana

Con rendimenti composti la ricchezza finale ha una distribuzione molto asimmetrica. Se il capitale cresce a un tasso medio istantaneo $\mu$ con volatilità $\sigma$ (il modello standard, detto moto browniano geometrico):

$$
E[W_T] = W_0\, e^{\mu T} \qquad\quad \text{Mediana}[W_T] = W_0\, e^{(\mu - \sigma^2/2)\,T}
$$

Con $\mu = 7\%$, $\sigma = 18\%$ e $T = 30$ anni, il valore atteso è circa 8,2 volte il capitale e la mediana circa 5. Lo studio sui paesi sviluppati citato in [Il mercato cresce nel tempo](mercato-cresce.html) mostra lo stesso scarto nei dati: [un dollaro diventa in media 7,34 dollari reali in 30 anni](https://www.cxoadvisory.com/?p=34496), eppure nel 12% dei casi vale meno di un dollaro. La stessa asimmetria, applicata ai singoli titoli, spiega perché [pochi titoli fanno tutto il rendimento](pochi-titoli.html).

### L'utilità non è lineare

Nel paradosso di San Pietroburgo una scommessa ha valore atteso infinito e nessuno pagherebbe più di pochi euro per giocarla. La risposta classica è massimizzare l'utilità attesa della ricchezza, $E[u(W)]$, non la ricchezza attesa. Da qui nasce il premio al rischio discusso in [Equity premium puzzle](equity-premium-puzzle.html).

### Le probabilità non sono note

Il rendimento atteso si stima da una media storica, con errore standard:

$$
\text{SE}(\hat{\mu}) = \frac{\sigma}{\sqrt{T}}
$$

Con $\sigma = 18\%$ e cento anni di dati l'errore è 1,8 punti. Un premio stimato al 6% è compatibile con un valore vero tra circa 2,5% e 9,5%. Un secolo di storia non basta a conoscere bene il valore atteso.

### La rovina è uno stato assorbente

Se esiste un esito da cui non si torna (capitale azzerato, leva revocata, vendita forzata), le giocate successive non ci sono. Il valore atteso calcolato su tutte le giocate diventa irrilevante.

## Obiezioni e risposte

::: obiezione «Nel lungo periodo la media vince»
È la lettura ingenua della legge dei grandi numeri.
:::

::: risposta
Vale per somme di scommesse indipendenti a posta fissa, non per un capitale che si compone. La diversificazione tra scommesse *parallele* recupera in parte la media. Per questo diversificare aumenta la crescita composta, oltre a ridurre il rischio.
:::

::: obiezione «Allora il valore atteso è inutile»
Se la media inganna, tanto vale ignorarla.
:::

::: risposta
È necessario, non sufficiente. Con valore atteso negativo nessun dosaggio salva. Con valore atteso positivo conta quanto si punta. Il criterio di Kelly massimizza la crescita composta, cioè $E[\ln W]$:

$$
f^{*} = \frac{\mu - r_f}{\sigma^2}
$$

Con premio 5% e volatilità 18% la quota ottimale è circa 1,5 volte il capitale; con premio 3% scende a 0,9. Poiché il premio vero è incerto, puntare la quota di Kelly piena significa spesso puntare troppo. La stessa formula torna, come leva ottimale, in [Volatility drag](volatility-drag.html).
:::

::: obiezione «L'economia dell'ergodicità non dice nulla di nuovo»
I critici osservano che [la teoria ha prodotto poche previsioni verificabili](https://www.qeios.com/read/ADBSXF/pdf), e che utilità logaritmica e criterio di Kelly esistono da decenni.
:::

::: risposta
La disputa sulla novità non tocca il risultato pratico, su cui le due scuole concordano: massimizzare la media aritmetica con un capitale che si compone porta alla rovina.
:::

## Tre domande da portarsi dietro

Davanti a ogni tesi degli altri articoli conviene porsi tre domande.

1. Atteso rispetto a quale distribuzione, e stimata con quale errore?
2. Quanto dista l'esito tipico dall'esito medio?
3. Posso sopravvivere al percorso che porta alla media?

::: difendibile
Un valore atteso positivo è la condizione per sedersi al tavolo. Quanto puntare, e se si arriva vivi alla fine, lo decidono la varianza, l'orizzonte e la possibilità di rovina.
:::
