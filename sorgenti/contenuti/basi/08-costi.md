---
slug: costi
titolo: I costi, l'1% che vale un quarto del risultato
livello: base
tag: costi, fondi ed ETF, interesse composto
sommario: Un costo dell'1% l'anno sembra piccolo. Su trent'anni porta via circa un quarto del capitale finale, perché si accumula come un interesse composto al contrario. È l'unica variabile di un investimento che conosci in anticipo.
aggiornato: 2026-11-13
prima: interesse-composto, fondi-etf-indici
---

Due fondi investono negli stessi titoli e ottengono lo stesso rendimento prima dei costi. Uno trattiene lo 0,2% l'anno, l'altro il 2%. La differenza sembra un dettaglio. Dopo trent'anni chi ha scelto il secondo ha poco più della metà di chi ha scelto il primo.

## Perché un costo piccolo diventa grande

I costi di un fondo sono una percentuale del capitale, trattenuta ogni anno. Non li paghi con un bonifico: vengono tolti dal valore delle quote, quindi non li vedi.

Si comportano come l'[interesse composto](interesse-composto.html), ma al contrario. Ogni anno il costo toglie un pezzo. E quel pezzo, negli anni successivi, non produce più guadagni. Perdi il costo e tutto ciò che quel denaro avrebbe reso.

## Il conto su trent'anni

Prendi 10.000 € investiti per trent'anni con un rendimento del 5% l'anno prima dei costi. Con un costo dell'1%, il rendimento che ti resta è il 4%:

$$
10.000 \times 1{,}04^{30} \approx 32.400
$$

Il numero $1{,}04$ è la crescita di un anno dopo aver tolto il costo: 5% meno 1%. L'esponente $30$ sono gli anni. Senza costi, con il 5% pieno, saresti arrivato a circa 43.200 €. L'1% l'anno ti è costato circa 10.800 €, cioè un quarto del risultato finale e più di tutto il capitale che avevi messo all'inizio. L'esempio è illustrativo.

| Costo annuo | Capitale dopo 30 anni | Perso rispetto a costo zero |
| --- | --- | --- |
| 0% | circa 43.200 € | — |
| 0,2% | circa 40.800 € | circa 6% |
| 1% | circa 32.400 € | circa 25% |
| 2% | circa 24.300 € | circa 44% |

Calcoli illustrativi su 10.000 € con un rendimento lordo costante del 5% l'anno. Nella prima riga la perdita non è indicata perché è il termine di confronto.

```grafico
{
 "tipo": "linee",
 "titolo": "10.000 € in 30 anni, con costi annui diversi",
 "nota": "Calcolo illustrativo con un rendimento lordo costante del 5% l'anno.",
 "x": {
  "min": 0,
  "max": 30,
  "etichetta": "anni",
  "unita": " anni"
 },
 "y": {
  "min": 0,
  "max": 45000,
  "etichetta": "euro",
  "formato": {
   "dec": 0
  }
 },
 "serie": [
  {
   "nome": "Costo 0%",
   "colore": 1,
   "generatore": {
    "nome": "esponenziale",
    "c0": 10000,
    "base": 1.05
   }
  },
  {
   "nome": "Costo 0,2%",
   "colore": 3,
   "generatore": {
    "nome": "esponenziale",
    "c0": 10000,
    "base": 1.048
   }
  },
  {
   "nome": "Costo 1%",
   "colore": 2,
   "generatore": {
    "nome": "esponenziale",
    "c0": 10000,
    "base": 1.04
   }
  },
  {
   "nome": "Costo 2%",
   "colore": 4,
   "tratteggio": true,
   "generatore": {
    "nome": "esponenziale",
    "c0": 10000,
    "base": 1.03
   }
  }
 ],
 "tabella": {
  "x": [
   10,
   20,
   30
  ]
 }
}
```

## Quali costi esistono

Non tutti i costi hanno lo stesso nome o si vedono allo stesso modo.

- **Costi correnti.** La percentuale trattenuta ogni anno dal fondo. È la voce più importante, perché si ripete.
- **Costi di ingresso e di uscita.** Una percentuale pagata una volta, quando compri o vendi.
- **Commissioni legate al rendimento.** Alcuni fondi trattengono una parte dei guadagni quando superano una soglia.
- **Costi di negoziazione.** Ciò che paghi alla banca per comprare e vendere, e la differenza tra prezzo di acquisto e di vendita.
- **Costi del servizio.** La consulenza e la custodia dei titoli.

Le differenze sono grandi. Secondo l'autorità europea dei mercati, per un piccolo risparmiatore i costi totali di un fondo vanno [da circa lo 0,5% l'anno per un obbligazionario passivo al 2% per un azionario attivo](https://www.esma.europa.eu/sites/default/files/2025-11/Report_on_costs_charged_by_UCITS_management_companies_and_AIFMs_to_investors_-_Webinar.pdf). I termini attivo e passivo sono spiegati in [Fondi, ETF e indici](fondi-etf-indici.html).

## L'unica cosa che sai prima

Il rendimento futuro di un investimento è incerto. Il costo è certo, e lo conosci prima di comprare. Tra due prodotti che investono nelle stesse cose, quello che costa meno parte con un vantaggio sicuro. L'altro deve recuperarlo con risultati migliori, ogni anno, per trent'anni.

## Gli equivoci più comuni

**«Costa di più, quindi è migliore».** Negli investimenti il prezzo non segnala la qualità. La stessa autorità osserva che [i costi più alti dei fondi attivi si traducono, in media, in risultati netti peggiori](https://www.esma.europa.eu/press-news/esma-news/retail-clients-continue-lose-out-due-high-investment-products-costs).

**«Non pago nulla, non mi arrivano addebiti».** I costi correnti sono già tolti dal valore delle quote. Non vederli non vuol dire non pagarli.

**«Il rendimento che vedo è al lordo».** I rendimenti passati pubblicati da un fondo sono già al netto dei costi correnti. Non lo sono, di solito, dei costi di ingresso e delle imposte.

## Che cosa farne

1. **Cerca i costi correnti.** Sono nel documento informativo di ogni fondo, in percentuale annua.
2. **Traduci la percentuale in euro e in anni.** L'1% su 20.000 € sono 200 € l'anno, ogni anno, più ciò che avrebbero reso.
3. **Somma tutti gli strati.** Costo del fondo, costo della consulenza, costo della banca. Conta il totale.

## Per approfondire

- [Il paradosso della gestione passiva](paradosso-passivo.html): perché, dopo i costi, la maggior parte dei fondi attivi rende meno dell'indice.

::: difendibile
I costi sono una percentuale tolta ogni anno, e si accumulano come un interesse composto al contrario. L'1% l'anno su trent'anni porta via circa un quarto del capitale finale. È l'unica caratteristica di un investimento che si conosce con certezza prima di comprare.
:::
