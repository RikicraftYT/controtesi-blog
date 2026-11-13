---
slug: conto-o-investimento
titolo: Soldi fermi sul conto, il costo che non si vede
livello: base
tag: inflazione, liquidità
gruppo: basi
sommario: Il saldo del conto non scende, ma ogni anno compra un po' meno. Si chiama inflazione, ed è il motivo per cui tenere tutto fermo non è una scelta senza costi.
aggiornato: 2026-11-13
---

Hai 10.000 € sul conto corrente e non li tocchi per dieci anni. Alla fine il saldo dice ancora 10.000 €. Sembra che non sia successo nulla. Eppure con quei soldi compri meno cose di prima. Questo articolo spiega perché, e quanto.

## I prezzi salgono, il saldo no

L'*inflazione* è l'aumento generale dei prezzi nel tempo. Se in un anno l'inflazione è del 2%, quello che costava 100 € ne costa in media 102.

Il conto corrente è fatto per pagare e incassare, non per far crescere i soldi: di solito rende zero o quasi. Quindi i prezzi salgono e il tuo saldo resta fermo. La differenza si chiama perdita di *potere d'acquisto*, cioè della quantità di cose che il denaro riesce a comprare.

Non è un incidente. La Banca centrale europea, l'istituzione che governa l'euro, [ha come obiettivo un'inflazione del 2% nel medio periodo](https://www.ecb.europa.eu/explainers/tell-me-more/html/stableprices.it.html). Un po' di inflazione è prevista e voluta.

## Quanto pesa in dieci anni

Per sapere quanto valgono domani i soldi di oggi si divide la cifra per l'aumento dei prezzi accumulato. Con un'inflazione del 2% l'anno per dieci anni:

$$
\frac{10.000}{1{,}02^{10}} \approx 8.200
$$

La riga si legge così. Il numero $1{,}02$ è l'aumento dei prezzi in un anno: 2% in più. L'esponente $10$ dice che l'aumento si ripete per dieci anni. Il risultato è che i tuoi 10.000 €, dopo dieci anni, comprano quello che oggi compri con circa 8.200 €. Hai perso quasi un quinto senza che sul conto si muovesse un euro. L'esempio è illustrativo.

| Anni sul conto | Che cosa comprano 10.000 € |
| --- | --- |
| 5 | circa 9.060 € di oggi |
| 10 | circa 8.200 € di oggi |
| 20 | circa 6.730 € di oggi |
| 30 | circa 5.520 € di oggi |

I valori sono calcolati con un'inflazione costante del 2% l'anno.

```grafico
{
 "tipo": "linee",
 "titolo": "Che cosa comprano 10.000 € fermi sul conto",
 "nota": "Calcolo illustrativo con un'inflazione costante del 2% l'anno: il valore è espresso in euro di oggi.",
 "x": {
  "min": 0,
  "max": 30,
  "etichetta": "anni",
  "unita": " anni"
 },
 "y": {
  "min": 0,
  "max": 10000,
  "etichetta": "euro di oggi",
  "formato": {
   "dec": 0
  }
 },
 "serie": [
  {
   "nome": "Potere d'acquisto",
   "colore": 2,
   "area": true,
   "generatore": {
    "nome": "esponenziale",
    "c0": 10000,
    "base": 0.9803921568627451
   }
  }
 ],
 "riferimenti": [
  {
   "y": 10000,
   "etichetta": "saldo sul conto: sempre 10.000 €"
  }
 ],
 "tabella": {
  "x": [
   5,
   10,
   20,
   30
  ]
 }
}
```

## Quando l'inflazione accelera

Il 2% è una media a cui si punta, non una garanzia. In Italia [nel 2022 i prezzi al consumo sono cresciuti dell'8,1%, l'aumento più ampio dal 1985](https://www.istat.it/comunicato-stampa/prezzi-al-consumo-dicembre-2022/). [Nel 2023 sono cresciuti di un altro 5,7%, nel 2024 dell'1,0%](https://www.istat.it/comunicato-stampa/prezzi-al-consumo-dicembre-2024/).

Chi aveva 10.000 € fermi all'inizio del 2022, alla fine del 2023 aveva ancora 10.000 €. Ma i prezzi nel frattempo erano saliti di circa il 14%. Quei soldi compravano quello che due anni prima si comprava con circa 8.750 €. In due anni è successo quello che di solito succede in sette.

## Gli equivoci più comuni

**«Sul conto i soldi sono al sicuro».** Sono al sicuro da una cosa precisa: il fallimento della banca. In Italia un fondo apposito [garantisce i depositi fino a 100.000 € per depositante](https://www.fitd.it/Content/public/FITD_opuscolo_informativo_cosa_facciamo.pdf). Non sono al sicuro dall'inflazione, che agisce comunque.

**«Se non investo non rischio».** Non investire è una scelta con un costo certo e poco visibile. Investire ha un costo incerto e molto visibile. Sono due rischi diversi, non un rischio contro nessun rischio.

**«Allora devo investire tutto».** No. Una parte dei soldi deve restare disponibile, e spiega perché l'articolo su [Orizzonte e fondo di emergenza](orizzonte-e-emergenze.html). Il punto è decidere quanta, invece di lasciare tutto fermo per abitudine.

## Che cosa farne

1. **Guarda quanto hai fermo.** Somma i saldi di conti e libretti. È la cifra su cui l'inflazione lavora ogni anno.
2. **Chiediti a che cosa serve ogni parte.** Spese dei prossimi mesi, imprevisti, progetti tra qualche anno, soldi che non ti serviranno per molto tempo. Sono destinazioni diverse.
3. **Ragiona in potere d'acquisto.** La domanda utile non è «quanti euro ho?», ma «che cosa ci compro, e che cosa ci comprerò?».

## Per approfondire

- [Il mercato cresce nel tempo](mercato-cresce.html): perché ci si aspetta che investire renda più dell'inflazione, e che cosa può andare storto.

::: difendibile
I soldi fermi sul conto mantengono la cifra e perdono valore, perché i prezzi salgono e il saldo no. Con un'inflazione del 2% l'anno, in dieci anni si perde quasi un quinto del potere d'acquisto. Tenere una parte dei risparmi disponibile è necessario; tenerli tutti fermi è una scelta che costa.
:::
