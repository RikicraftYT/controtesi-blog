---
slug: inflazione-rendimento-reale
titolo: Inflazione e rendimento reale, quello che resta davvero
livello: base
tag: inflazione, dati storici
sommario: Un rendimento del 3% non vale sempre lo stesso. Dipende da quanto sono saliti i prezzi nel frattempo. La differenza tra rendimento nominale e reale è la prima cosa da guardare in ogni confronto.
aggiornato: 2026-11-13
prima: conto-o-investimento
---

Un conto di deposito ti offre il 3% l'anno. È tanto o poco? Da solo il numero non lo dice. Se i prezzi salgono dell'1%, stai guadagnando. Se salgono dell'8%, stai perdendo, anche se il saldo cresce. Per saperlo serve distinguere due rendimenti.

## Nominale e reale

Il *rendimento* è quanto cresce una somma in un anno, in percentuale.

Il **rendimento nominale** è quello che leggi: gli euro in più. Se 1.000 € diventano 1.030 €, il rendimento nominale è il 3%.

Il **rendimento reale** è quello che conta: le cose in più che puoi comprare. Tiene conto dell'inflazione, cioè dell'aumento dei prezzi spiegato in [Soldi fermi sul conto](conto-o-investimento.html).

## Il calcolo

Per passare dall'uno all'altro, in prima approssimazione, basta una sottrazione:

$$
3\% - 2\% = 1\%
$$

Il primo numero è il rendimento nominale: i tuoi euro crescono del 3%. Il secondo è l'inflazione: i prezzi crescono del 2%. Il risultato è il rendimento reale: il tuo potere d'acquisto cresce di circa l'1%. Il calcolo esatto, che divide invece di sottrarre, dà 0,98%. Per numeri piccoli la differenza è trascurabile. L'esempio è illustrativo.

## Quando il reale è negativo

Il rendimento reale può essere negativo anche se quello nominale è positivo. È successo di recente. In Italia [nel 2022 i prezzi al consumo sono cresciuti in media dell'8,1%](https://www.istat.it/comunicato-stampa/prezzi-al-consumo-dicembre-2022/). Chi quell'anno ha ottenuto l'1% su un deposito ha visto il saldo salire e il potere d'acquisto scendere di circa il 6,6%.

| Rendimento nominale | Inflazione | Rendimento reale |
| --- | --- | --- |
| 3% | 2% | circa +1% |
| 3% | 3% | zero |
| 1% | 8,1% | circa −6,6% |
| 0% | 2% | circa −2% |

La terza riga usa l'inflazione italiana del 2022. Le altre sono esempi illustrativi.

## Perché cambia i confronti

Sul lungo periodo l'inflazione si accumula, e la distanza tra nominale e reale diventa enorme. Il confronto più lungo disponibile riguarda gli Stati Uniti. [Un dollaro investito in azioni nel 1900 è diventato 124.854 dollari a fine 2025; in obbligazioni a lunga scadenza, 284 dollari](https://www.ubs.com/global/en/media/display-page-ndp/en-20260303-global-investment-returns-yearbook-2026.html). Sono cifre nominali. Nello stesso periodo i prezzi sono saliti di 38 volte, quindi in potere d'acquisto [le azioni hanno moltiplicato il capitale per circa 3.300](https://www.ubs.com/global/en/wealthmanagement/insights/marketnews/article.3435923.html) e le obbligazioni per circa 7,5.

I numeri nominali impressionano di più. Quelli reali dicono la verità: quanto è cresciuta la capacità di comprare.

```grafico
{
 "tipo": "punti-collegati",
 "titolo": "Un dollaro investito nel 1900, a fine 2025",
 "nota": "Stati Uniti. Scala logaritmica: ogni linea della griglia vale dieci volte la precedente. Il valore reale è quello nominale diviso per l'aumento dei prezzi, 38 volte nel periodo.",
 "nomi": [
  "Reale",
  "Nominale"
 ],
 "colori": [
  1,
  3
 ],
 "x": {
  "min": 1,
  "max": 300000,
  "log": true,
  "passi": [
   1,
   10,
   100,
   1000,
   10000,
   100000
  ],
  "formato": {
   "dec": "auto",
   "suffisso": " $"
  }
 },
 "righe": [
  {
   "etichetta": "Azioni",
   "da": 3300,
   "a": 124854
  },
  {
   "etichetta": "Obbligazioni a lunga scadenza",
   "da": 7.5,
   "a": 284
  }
 ]
}
```

## Gli equivoci più comuni

**«Ho guadagnato, il saldo è salito».** Hai guadagnato in euro. Per sapere se hai guadagnato davvero devi togliere l'inflazione dello stesso periodo.

**«Un rendimento garantito è un rendimento sicuro».** È garantito il rendimento nominale. Quello reale dipende dall'inflazione futura, che nessuno conosce. Un titolo che rende il 2% fisso per dieci anni è sicuro in euro e incerto in potere d'acquisto.

**«L'inflazione è uguale per tutti».** L'indice ufficiale misura un paniere medio. Se spendi soprattutto in affitto, energia o alimentari, la tua inflazione può essere diversa. Nel 2022, per esempio, [l'impatto è stato più ampio sulle famiglie con minore capacità di spesa](https://www.istat.it/comunicato-stampa/prezzi-al-consumo-dicembre-2022/).

## Che cosa farne

1. **Chiedi sempre «al netto dell'inflazione?».** Davanti a un rendimento, passato o promesso, la prima domanda è questa.
2. **Confronta periodi lunghi in termini reali.** Su dieci o vent'anni un confronto in euro nominali è fuorviante.
3. **Non dare per scontata l'inflazione futura.** L'obiettivo della banca centrale è il 2%, ma il 2022 mostra che può andare diversamente.

## Per approfondire

- [Azioni nel lungo periodo, il campione largo](azioni-campione-largo.html): quanto hanno reso le azioni in termini reali in molti paesi, non solo nei più fortunati.
- [Oro, protezione dall'inflazione?](oro.html): se l'attività più citata contro l'inflazione funziona davvero.

::: difendibile
Il rendimento nominale misura gli euro in più, quello reale le cose in più che puoi comprare. Il secondo è circa il primo meno l'inflazione, e può essere negativo anche quando il saldo sale. Ogni confronto tra investimenti, soprattutto su periodi lunghi, va fatto in termini reali.
:::
