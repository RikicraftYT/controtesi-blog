---
slug: code-grasse
titolo: Code grasse, perché la gaussiana sottostima i crolli
tesi: La volatilità misura il rischio.
obiezione: Misura il rischio dei giorni normali.
gruppo: prezzi
livello: intermedio
tag: rischio, volatilità, statistica
sommario: I rendimenti finanziari hanno eventi estremi molto più frequenti di quanto preveda una distribuzione normale. Mandelbrot lo documentò nel 1963. Cambia il modo di leggere deviazione standard, VaR e correlazioni.
aggiornato: 2026-11-13
---

Quasi tutti i numeri usati per descrivere il rischio, dalla deviazione standard allo Sharpe ratio, presuppongono che i rendimenti si distribuiscano in modo simile a una gaussiana. È un'approssimazione buona al centro e pessima ai bordi.

## L'idea

Benoît Mandelbrot, [studiando i prezzi del cotone](https://web.williams.edu/Mathematics/sjmiller/public_html/341Fa09/econ/Mandelbroit_VariationCertainSpeculativePrices.pdf), mostra che le variazioni hanno una campana centrale più stretta e code molto più pesanti di quelle gaussiane. Propone distribuzioni stabili di Pareto, in cui la probabilità di un evento estremo decresce come una potenza:

$$
P(|X| > x) \sim x^{-\alpha}, \qquad \alpha < 2 \;\Rightarrow\; \text{varianza infinita}
$$

Con una gaussiana la probabilità di allontanarsi dalla media decresce in modo esponenziale: un evento a cinque deviazioni standard è quasi impossibile. Con una legge di potenza no.

```grafico
{
 "tipo": "linee",
 "titolo": "Quanto sono rari gli eventi estremi, secondo due modelli",
 "nota": "Calcolo illustrativo: probabilità di allontanarsi dalla media di più di x deviazioni standard. Normale contro t di Student con 3 gradi di libertà, che ha una coda con esponente 3. Scala logaritmica.",
 "x": {
  "min": 0,
  "max": 8,
  "etichetta": "deviazioni standard",
  "passi": [
   0,
   2,
   4,
   6,
   8
  ]
 },
 "y": {
  "min": 1e-10,
  "max": 1,
  "log": true,
  "passi": [
   0.01,
   0.0001,
   1e-06,
   1e-08,
   1e-10
  ],
  "formato": {
   "tipo": "probabilita"
  }
 },
 "serie": [
  {
   "nome": "Distribuzione normale",
   "colore": 4,
   "tratteggio": true,
   "generatore": {
    "nome": "coda-normale"
   },
   "da": 0.01
  },
  {
   "nome": "Coda pesante (esponente 3)",
   "colore": 2,
   "generatore": {
    "nome": "coda-t3"
   },
   "da": 0.01
  }
 ],
 "tabella": {
  "x": [
   2,
   3,
   5,
   8
  ]
 },
 "altezza": 340
}
```

L'esempio classico è il 19 ottobre 1987. Secondo [una rassegna sul tema](https://jid.aabri.com/manuscripts/131653.pdf), per i modelli gaussiani in uso quel crollo era un evento a circa diciotto deviazioni standard, cioè un evento che non dovrebbe verificarsi nell'intera vita dell'universo. Eppure è avvenuto, e altri di scala paragonabile lo hanno seguito.

## Che cosa cambia

**La deviazione standard è instabile.** Se le code sono pesanti, la varianza campionaria non converge bene: basta un evento per cambiarla molto. La volatilità misurata in un periodo tranquillo dice poco su quella del periodo successivo.

**I giorni estremi pesano più della loro frequenza.** Con code pesanti, una parte sproporzionata del risultato di un periodo dipende da pochi giorni, nel bene e nel male: è la stessa asimmetria per cui [pochi titoli fanno il rendimento dell'indice](pochi-titoli.html).

**Le correlazioni cambiano nelle code.** Attività poco correlate nei giorni normali scendono insieme nei giorni estremi. È uno dei punti deboli della [risk parity](risk-parity.html).

## Obiezioni e risposte

::: obiezione La varianza infinita è stata smentita
[Gli studi successivi](https://doi.org/10.1038/nature01624) stimano per le azioni un esponente di coda vicino a 3: code pesanti, ma varianza finita.
:::

::: risposta
Giusto, e va concesso: il modello specifico del 1963 non ha retto. È rimasto il fatto empirico. Con un esponente 3 la varianza esiste, ma gli eventi a cinque o dieci deviazioni standard restano più frequenti di molti ordini di grandezza rispetto alla gaussiana.
:::

::: obiezione I modelli a volatilità variabile spiegano le code
Se la volatilità cambia nel tempo, rendimenti condizionatamente gaussiani producono code pesanti. Non servono distribuzioni esotiche.
:::

::: risposta
In parte sì: i modelli GARCH e a volatilità stocastica riproducono gran parte dell'eccesso di curtosi. Ma per chi investe la conseguenza pratica è la stessa: la volatilità di ieri sottostima il rischio di domani proprio quando conta.
:::

::: obiezione Se le code sono così pesanti, conviene assicurarsi
Taleb ne ricava una strategia: quasi tutto in attività sicure e una piccola parte in opzioni che pagano molto nei crolli.
:::

::: risposta
L'assicurazione contro le code ha un prezzo, e chi la vende lo fissa in modo da incassare, in media, più di quanto paga. Comprarla in modo sistematico significa pagare quel margine ogni anno. Il modo meno costoso di sopravvivere a una coda resta non avere leva e non dover vendere.
:::

::: obiezione Sul lungo periodo le code si mediano
Per il teorema del limite centrale, sommando molti rendimenti la distribuzione tende alla normale.
:::

::: risposta
Converge, ma lentamente quando le code sono pesanti, e non converge se i rendimenti non sono indipendenti. I crolli arrivano a grappoli. E anche a trent'anni la coda sinistra resta ampia: nel [campione largo](azioni-campione-largo.html) la probabilità di perdita reale è di una su otto.
:::

::: difendibile
La deviazione standard descrive bene l'oscillazione ordinaria e male il rischio di rovina. Un portafoglio va dimensionato chiedendosi che cosa succede in uno scenario che la storia recente non contiene, non quanto oscilla in media.
:::
