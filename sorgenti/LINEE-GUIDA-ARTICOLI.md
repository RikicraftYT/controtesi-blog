# Controtesi: linee guida per scrivere gli articoli

Questo documento serve a chi scrive gli articoli in Markdown prima che vengano integrati nel sito. Seguirlo evita correzioni dopo: ogni regola qui sotto corrisponde a un problema già incontrato negli articoli esistenti.

## 1. Che cos'è Controtesi

Un blog in italiano che prende un'idea diffusa sugli investimenti, la presenta nella sua forma più forte e poi la mette alla prova con le obiezioni migliori. Ogni articolo arriva a una **formulazione difendibile**: che cosa resta vero dopo il confronto.

Non dà consigli personali, non indica prodotti da comprare, non fa previsioni di mercato. Ogni numero ha una fonte.

## 2. Formato del file

Si può mandare un articolo per file oppure più articoli in un file unico. Nel file unico ogni articolo comincia con una riga di separazione, seguita subito dall'intestazione:

```
<!-- ===== ARTICOLO: slug-dell-articolo ===== -->
---
slug: slug-dell-articolo
...
---
```

In fondo al file, dopo l'ultimo articolo:

```
<!-- ===== FONTI ===== -->
## Titolo della sezione delle fonti
- ...

## Da verificare prima di pubblicare
- ...
```

La sezione «Da verificare» non viene pubblicata: serve a segnalare ciò che non è stato controllato.

## 3. Intestazione (front matter)

| Campo | Obbligatorio | Regola |
| --- | --- | --- |
| `slug` | sì | Minuscole, trattini, niente accenti né apostrofi. Diventa l'indirizzo della pagina e non va più cambiato. Esempio: `interesse-composto` |
| `titolo` | sì | Forma «Argomento, sottotitolo che dice la tesi». Esempio: «Valore atteso, la media che nessuno vive». Al massimo 70 caratteri |
| `tesi` | sì | Una frase, l'idea che l'articolo mette alla prova, come la direbbe chi ci crede. Al massimo 60 caratteri, con il punto finale |
| `obiezione` | sì | Una o due frasi brevi, l'obiezione più forte. Al massimo 90 caratteri |
| `livello` | sì | `base`, `intermedio` o `avanzato` (vedi sezione 4) |
| `gruppo` | sì | Uno dei gruppi elencati sotto |
| `sommario` | sì | Due o tre frasi, al massimo 300 caratteri. Compare sotto il titolo e nelle anteprime social |
| `prima` | no | Slug degli articoli da leggere prima, separati da virgola. Esempio: `interesse-composto, inflazione-rendimento-reale` |

La data di aggiornamento la aggiunge chi integra l'articolo nel sito.

**Gruppi disponibili**

| `gruppo` | Nome in home | Per che cosa |
| --- | --- | --- |
| `basi` | Per iniziare | Il percorso per chi parte da zero (nuovo) |
| `strumento` | Il metro di giudizio | Strumenti per valutare le altre tesi |
| `rendimenti` | Quanto rende il mercato | Rendimenti di lungo periodo, premi, valutazioni |
| `prezzi` | I prezzi sono giusti? | Efficienza, comportamento, anomalie |
| `portafoglio` | Come costruire il portafoglio | Strategie e attività |
| `esposizioni` | Che cosa possiedi davvero | Leggere i rischi di ciò che si ha |
| `vita` | Dal risparmio alla pensione | Accumulo, prelievo, ciclo di vita |
| `sintesi` | Trarre le conclusioni | Solo per la Mappa |

Se un articolo non entra in nessun gruppo, va detto nella sezione «Da verificare», con una proposta di nome.

## 4. I tre livelli

Il livello dipende da quanto deve sapere il lettore, non dall'importanza del tema.

| | Base | Intermedio | Avanzato |
| --- | --- | --- | --- |
| Per chi | Chi non ha mai investito o ha appena cominciato | Chi conosce azioni, obbligazioni, ETF, inflazione, interesse composto | Chi ha familiarità con statistica e modelli |
| Lunghezza | 600–900 parole | 700–1.200 parole | 900–1.600 parole |
| Formule | Al massimo una, con numeri, spiegata riga per riga | Algebra semplice, sempre spiegata anche a parole | Libere, purché ogni simbolo sia definito |
| Termini tecnici | Ognuno spiegato alla prima occorrenza | Spiegati quelli non di base | Spiegati quelli specialistici |
| Obiezioni | 2–3 | 3–5 | 3–7 |
| Esempi | Numeri tondi, in euro, su una persona concreta | Dati reali con fonte | Dati reali, studi, confronti tra metodi |

In caso di dubbio tra due livelli si sceglie quello più alto: per il lettore è meglio trovare un articolo più facile del previsto che il contrario.

## 5. Struttura dell'articolo

```
Paragrafo d'apertura (2–4 frasi): la tesi in breve e perché conta.

## Primo titolo di sezione
Testo.

## Secondo titolo di sezione
Testo.

## Obiezioni e risposte

::: obiezione Titolo breve dell'obiezione
Una o due frasi che la formulano nel modo più forte.
:::

::: risposta
La risposta. Se l'obiezione è corretta, va detto.
:::

(altre coppie obiezione/risposta)

## Che cosa farne        ← obbligatoria per il livello base, consigliata per gli altri

1. **Primo punto pratico.** Una o due frasi.
2. ...

::: difendibile
Due o tre frasi: che cosa resta vero dopo le obiezioni.
:::
```

Regole:

- **Niente titolo `#`**: il titolo viene dall'intestazione. Le sezioni usano `##` (diventano il sommario della pagina) e le sottosezioni `###`.
- **Titoli di sezione brevi**, al massimo 40 caratteri: si leggono nel sommario laterale.
- **Ogni `::: obiezione` è seguita da una `::: risposta`**. Il titolo dell'obiezione sta sulla stessa riga di `::: obiezione`.
- **Una sola `::: difendibile`**, alla fine.
- **Le risposte possono dare ragione all'obiezione.** «Va concesso» e «Qui non c'è replica» sono risposte legittime: il blog si regge su questo.
- **Livello base:** in fondo, prima della formulazione difendibile, una sezione «Per approfondire» con 1–3 rimandi ad articoli intermedi o avanzati del sito, ciascuno con una frase che dice che cosa si trova lì.

## 6. Formule

- In linea: `$...$`. Su riga separata: `$$` da solo su una riga, la formula, `$$` da solo su una riga.
- Decimali con la virgola, scritti `0{,}5` (le graffe evitano lo spazio dopo la virgola). Percentuali `5\%`.
- Parole dentro le formule con `\text{...}`, brevi.
- Due equazioni affiancate si separano con `\qquad`: sul telefono vanno a capo da sole lì.
- Una formula lunga senza `\qquad` va spezzata con `\acapo` nei punti in cui può andare a capo sul telefono (non produce nulla sugli schermi larghi):

  ```
  g = \tfrac{1}{2}\ln(1{,}5) + \tfrac{1}{2}\ln(0{,}75) \acapo = \tfrac{1}{2}\ln(1{,}125)
  ```
- Ogni simbolo va spiegato a parole subito prima o subito dopo la formula.
- Lo stesso simbolo non può indicare due cose nello stesso articolo.

## 7. Tabelle

- Al massimo 4 colonne; 5 solo se le celle sono numeri brevi. Sul telefono le tabelle larghe vanno scorse di lato.
- Celle brevi: una frase al massimo.
- **Mai celle segnaposto** («non disponibile», «da verificare», «non leggibile»). Se un dato manca si toglie la riga e lo si dice nel testo, oppure si usa «—» spiegando sotto la tabella perché.
- I dati in tabella hanno una data («a fine 2025») nel testo o nell'intestazione.

## 8. Link e fonti

È la parte più importante, ed è dove gli articoli esistenti hanno avuto più problemi.

- **Ogni numero e ogni fatto verificabile ha un link** nel punto in cui compare. Il testo del link dice che cosa sostiene la fonte: `[nel 2022 la correlazione è salita a circa +0,65](https://...)`, non «qui» o «fonte».
- **Preferire le fonti primarie**: lo studio, il documento dell'istituzione, il comunicato ufficiale. Una sintesi giornalistica va bene in aggiunta, non al posto dell'originale. Evitare blog personali, forum, copie di PDF caricate da terzi, Wikipedia come unica fonte.
- **Fonti senza link**: se un documento è stato letto da un PDF di cui non si ha l'indirizzo, va citato per titolo, autori e data, e segnalato in «Da verificare».
- **Ragionamenti propri**: si possono fare, ma vanno presentati come ragionamenti («ne segue che», «è coerente con»), non come risultati di uno studio.
- **Calcoli illustrativi**: se un esempio è inventato o calcolato a mano, va detto nel testo («l'esempio è illustrativo») e nella sezione fonti.
- **Link interni**: agli altri articoli con `[testo](slug.html)`. Ogni articolo dovrebbe rimandare almeno a due articoli del sito, e il primo rimando a un articolo va messo dove serve al ragionamento, non in fondo.
- **Formato della sezione fonti** in fondo al file:

  ```
  ## Nome della sezione (per esempio «Per iniziare»)

  Pagine consultate il 13 novembre 2026. L'esempio di ... è un calcolo illustrativo.

  - [Titolo originale della pagina](https://...) – Autore o istituzione, testata, anno
  - Titolo di un PDF senza link – Autori, istituzione, mese e anno
  ```

## 9. Lingua e stile

- Italiano, seconda persona singolare («se investi», «il tuo portafoglio»).
- Frasi brevi. Un'idea per frase. Niente enfasi, punti esclamativi, domande retoriche in serie.
- Virgolette caporali «» per citazioni e frasi riportate.
- Numeri all'italiana: 1.000, 3,5%, 2,25. Anni senza punto: 2026.
- Termini inglesi: in corsivo alla prima occorrenza, con la traduzione o la spiegazione (*volatility drag*, la perdita di rendimento composto dovuta alla volatilità). Dopo, si usano liberamente.
- Niente consigli personali («compra», «dovresti investire in...»), niente nomi di fondi, ISIN o intermediari.
- Niente note per chi integra dentro il testo dell'articolo («il grafico non era leggibile», «aggiungere il link»): vanno nella sezione «Da verificare».
- Coerenza con gli altri articoli: se un articolo esistente dice il contrario, va citato e discusso, non ignorato.

## 10. Indicazioni in più per il livello base

- **La tesi è una frase che si sente dire**, vera solo in parte: «Tenere i soldi sul conto è la scelta sicura». L'obiezione la corregge senza ridicolizzarla.
- **Un concetto per articolo.** Se servono due concetti, sono due articoli.
- **Partire da una situazione concreta**: una persona con 10.000 € sul conto, uno stipendio, un orizzonte di dieci anni.
- **Ogni termine tecnico spiegato la prima volta**, anche quelli che sembrano ovvi (rendimento, indice, ETF, volatilità).
- **Numeri tondi e calcoli rifacibili con la calcolatrice del telefono.**
- **Nessun prerequisito oltre agli articoli base precedenti**, indicati nel campo `prima`.
- **«Che cosa farne»** con tre punti pratici e generali (che cosa controllare, che cosa chiedersi), non consigli di acquisto.

## 11. Controllo finale prima di mandare il file

- [ ] Intestazione completa, con `livello` e `gruppo` tra i valori ammessi
- [ ] Slug unico, senza accenti, uguale a quello nella riga `ARTICOLO:`
- [ ] Ogni obiezione ha la sua risposta, e c'è una sola formulazione difendibile
- [ ] Ogni numero ha un link a una fonte, e la fonte compare nella sezione fonti
- [ ] Nessuna cella segnaposto e nessuna nota interna nel testo
- [ ] Formule con la virgola decimale `{,}` e simboli spiegati
- [ ] Almeno due rimandi ad altri articoli del sito
- [ ] Lunghezza nei limiti del livello
- [ ] Ciò che non è stato verificato è nella sezione «Da verificare»

## 12. Esempio di articolo base

```
<!-- ===== ARTICOLO: interesse-composto ===== -->
---
slug: interesse-composto
titolo: Interesse composto, il tempo come ingrediente
tesi: Conta quanto rende un investimento.
obiezione: Conta anche per quanto tempo rende, e lì sta la differenza.
livello: base
gruppo: basi
sommario: Un rendimento che si somma a se stesso anno dopo anno fa crescere il capitale in modo sempre più rapido. Per questo dieci anni in più contano spesso più di un punto di rendimento.
prima: inflazione-rendimento-reale
---

Se investi 1.000 € e ottieni il 5% l'anno, dopo un anno hai 1.050 €. Il secondo anno il 5% si calcola su 1.050 €, non su 1.000 €: guadagni anche sui guadagni. È l'*interesse composto*.

## Come funziona

Dopo $n$ anni, con un rendimento annuo $r$, il capitale iniziale $C_0$ diventa

$$
C_n = C_0 \times (1 + r)^n
$$

Con 1.000 € al 5% per trent'anni: $1.000 \times 1{,}05^{30} \approx 4.322$ €. L'esempio è illustrativo.

...

## Obiezioni e risposte

::: obiezione Il 5% l'anno non è garantito
...
:::

::: risposta
...
:::

## Che cosa farne

1. **Cominciare presto conta.** ...
2. ...
3. ...

## Per approfondire

- [Volatility drag](volatility-drag.html): perché un rendimento che oscilla cresce meno di uno costante con la stessa media.

::: difendibile
...
:::
```

## Appendice: serie base proposta

Ordine di lettura suggerito. Slug, tesi e obiezioni sono proposte: si possono cambiare, purché lo slug resti stabile una volta pubblicato.

| # | Slug | Tesi | Obiezione | Per approfondire |
| --- | --- | --- | --- | --- |
| 1 | `conto-o-investimento` | Tenere i soldi sul conto è la scelta sicura. | È sicura in euro, non in ciò che gli euro comprano. | mercato-cresce |
| 2 | `inflazione-rendimento-reale` | Un rendimento del 3% è un guadagno del 3%. | Non se nel frattempo i prezzi salgono del 2%. | azioni-campione-largo, oro |
| 3 | `interesse-composto` | Conta quanto rende un investimento. | Conta anche per quanto tempo rende. | volatility-drag |
| 4 | `rischio-e-rendimento` | Esistono investimenti che rendono molto senza rischi. | Se esistessero, tutti li comprerebbero e smetterebbero di rendere. | equity-premium-puzzle, mercati-efficienti |
| 5 | `azioni-obbligazioni-liquidita` | Un'azione è una scommessa sul prezzo. | È una quota di un'impresa; il prezzo viene dopo. | mercato-cresce, etichette-e-rischi |
| 6 | `diversificazione` | Diversificare vuol dire comprare tante cose. | Vuol dire comprare cose che non scendono insieme. | risk-parity, esposizione-geografica |
| 7 | `fondi-etf-indici` | Un ETF è un investimento sicuro. | È un contenitore: il rischio dipende da che cosa c'è dentro. | paradosso-passivo, pochi-titoli |
| 8 | `costi` | Un costo dell'1% l'anno è trascurabile. | Su trent'anni si porta via una parte rilevante del capitale finale. | paradosso-passivo |
| 9 | `volatilita-e-perdite` | Se il portafoglio scende, ho perso. | Hai perso se vendi; il rischio vero è doverlo fare. | rischio-di-sequenza, code-grasse |
| 10 | `orizzonte-e-emergenze` | Tutti i risparmi vanno investiti. | Quelli che ti serviranno presto no. | ciclo-di-vita |
| 11 | `profilo-di-rischio` | La propensione al rischio si misura con un questionario. | Si misura con quello che fai quando il portafoglio perde il 30%. | finanza-comportamentale, ciclo-di-vita |
| 12 | `market-timing` | Basta uscire prima dei crolli. | Bisogna anche rientrare prima dei rialzi, e i due momenti sono vicini. | cape-shiller, pac-o-pic |
| 13 | `tasse-di-base` | Le tasse si pagano solo quando si guadagna. | C'è anche un'imposta annuale sul valore, che si paga comunque. | fire |
| 14 | `scheda-di-un-fondo` | Il nome di un fondo dice che cosa contiene. | Lo dicono l'indice, la composizione e i costi. | quale-cina, esposizione-geografica |

Per `tasse-di-base` servono fonti normative ufficiali (Agenzia delle Entrate, testi di legge) per ogni aliquota citata.
