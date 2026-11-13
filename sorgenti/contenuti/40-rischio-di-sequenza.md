---
slug: rischio-di-sequenza
titolo: Rischio di sequenza, l'ordine conta quanto la media
tesi: Conta il rendimento medio.
obiezione: Se versi o prelevi, conta l'ordine. Stessa media, esiti opposti.
gruppo: vita
livello: intermedio
sommario: Due investitori con gli stessi rendimenti in ordine inverso finiscono in posti diversi. È il motivo per cui «in media cresce» non basta a chi vive del portafoglio.
aggiornato: 2026-11-11
---

Quando versi o prelevi denaro, l'ordine dei rendimenti conta quanto la loro media. È il motivo per cui «il mercato cresce in media» non basta a chi accumula, e ancora meno a chi vive del portafoglio.

## Il meccanismo

Senza flussi in entrata o in uscita l'ordine è irrilevante: il capitale finale è un prodotto, e il prodotto è commutativo.

$$
W_T = W_0 \prod_{t=1}^{T} (1 + r_t)
$$

Con un flusso periodico $c_t$ (negativo se prelevi) la ricorsione diventa:

$$
W_t = (W_{t-1} + c_t)(1 + r_t)
$$

Ora ogni rendimento agisce su un capitale diverso. Un calo iniziale durante i prelievi obbliga a vendere più quote a prezzi bassi, e quelle quote non partecipano al recupero.

## Un esempio

Capitale 100, prelievo di 5 a inizio anno, stessi tre rendimenti in ordine opposto. Senza prelievi entrambe le sequenze finiscono a 100,1.

| Anno | Sequenza A | Capitale A | Sequenza B | Capitale B |
| --- | --- | --- | --- | --- |
| 1 | −30% | 66,5 | +30% | 123,5 |
| 2 | +10% | 67,7 | +10% | 130,4 |
| 3 | +30% | 81,4 | −30% | 87,7 |

Stessa media, stessa volatilità, sei punti di differenza dopo tre anni. Su trent'anni lo scarto decide se il capitale dura o si esaurisce.

Per chi accumula il segno si inverte: rendimenti cattivi all'inizio sono un vantaggio, perché i versamenti comprano a prezzi bassi. Il rischio si concentra dove il capitale è massimo rispetto ai flussi, cioè negli anni attorno al ritiro.

## Il legame con gli altri articoli

La ricerca sui tassi di prelievo sostenibili, [da Bengen in poi](regola-4-percento.html), nasce da qui, e chi vuole smettere presto di lavorare ne dipende ancora di più: vedi [FIRE](fire.html). [Kitces](https://www.kitces.com/blog/understanding-sequence-of-return-risk-safe-withdrawal-rates-bear-market-crashes-and-bad-decades/) mostra che a decidere l'esito non è tanto il crollo nell'anno del ritiro quanto il rendimento *reale* del primo decennio. Il [CAPE](cape-shiller.html) è lo strumento migliore, per quanto rumoroso, per stimare proprio quel decennio.

C'è anche un effetto più sottile che vale per tutti. Il rendimento composto $g$ è inferiore a quello medio aritmetico $\mu$ di circa metà della varianza:

$$
g \approx \mu - \frac{\sigma^2}{2}
$$

Ridurre la volatilità a parità di rendimento medio aumenta quindi la crescita composta. È lo stesso scarto tra media e mediana di [Valore atteso](valore-atteso.html), sviluppato in [Volatility drag](volatility-drag.html), ed è l'argomento più solido a favore dei portafogli bilanciati come [risk parity](risk-parity.html) e [Permanent Portfolio](permanent-portfolio.html).

## Obiezioni e risposte

::: obiezione È un rischio di comportamento, non di mercato
Capital Group sostiene che [il vero rischio sta nella sequenza dei prelievi](https://www.capitalgroup.com/advisor/insights/articles/rethinking-sequence-of-returns-risk.html): chi riduce le spese nei ribassi lo attenua molto.
:::

::: risposta
Corretto per chi ha spese comprimibili. Per chi ha uscite rigide la flessibilità non è disponibile, e il rischio resta di mercato.
:::

::: obiezione Basta tenere più obbligazioni
Meno volatilità, meno rischio di sequenza.
:::

::: risposta
Solo se le obbligazioni reggono quando le azioni cadono. Nel 2022 non è successo, come racconta [Risk parity](risk-parity.html), e l'inflazione alta aumenta i prelievi reali proprio quando i bond perdono.
:::

::: obiezione Nel lungo periodo si compensa
I rendimenti buoni arrivano dopo.
:::

::: risposta
Arrivano su un capitale già ridotto dai prelievi. La media di lungo periodo è irrilevante se il portafoglio si esaurisce prima.
:::

::: difendibile
Il rendimento medio descrive il mercato. Il risultato di chi versa o preleva dipende anche dall'ordine, e l'ordine non si sceglie: si può solo ridurre quanto se ne dipende.
:::
