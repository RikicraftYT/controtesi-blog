/* Controtesi — formule comuni alla build (lib/grafici.mjs) e ai grafici interattivi (main.js).
   Nel browser si carica prima di main.js solo nelle pagine con un grafico interattivo e
   diventa window.ControtesiFormule; nella build lo legge lib/grafici.mjs. */
(function (radice) {
  // Numeri all'italiana: punto per le migliaia (anche a quattro cifre), virgola decimale.
  function numero(v, dec) {
    if (!isFinite(v)) return "—";
    var parti = Math.abs(v).toFixed(dec || 0).split(".");
    return (v < 0 ? "−" : "") + parti[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (parti[1] ? "," + parti[1] : "");
  }

  // Tacche "pulite" per un intervallo lineare.
  function tacche(min, max, quante) {
    var passoGrezzo = (max - min) / (quante || 5);
    var mag = Math.pow(10, Math.floor(Math.log10(passoGrezzo)));
    var passo = [1, 2, 2.5, 5, 10].map(function (k) { return k * mag; })
      .filter(function (p) { return (max - min) / p <= (quante || 5); })[0] || 10 * mag;
    var out = [];
    for (var v = Math.ceil(min / passo - 1e-9) * passo; v <= max + 1e-9; v += passo) out.push(+v.toFixed(10));
    return out;
  }

  // Funzione d'errore (Abramowitz-Stegun 7.1.26, errore < 1,5e-7) e normale cumulata.
  function erf(x) {
    var t = 1 / (1 + 0.3275911 * Math.abs(x));
    var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return x >= 0 ? y : -y;
  }
  function normale(x) { return 0.5 * (1 + erf(x / Math.SQRT2)); }

  // Premio di Black-Scholes. o = { S, K, T (anni), r, sigma, tipo: "call" | "put" }.
  function blackScholes(o) {
    var tipo = o.tipo || "call";
    if (o.T <= 0) return tipo === "call" ? Math.max(o.S - o.K, 0) : Math.max(o.K - o.S, 0);
    var d1 = (Math.log(o.S / o.K) + (o.r + o.sigma * o.sigma / 2) * o.T) / (o.sigma * Math.sqrt(o.T));
    var d2 = d1 - o.sigma * Math.sqrt(o.T);
    var call = o.S * normale(d1) - o.K * Math.exp(-o.r * o.T) * normale(d2);
    return tipo === "call" ? call : call - o.S + o.K * Math.exp(-o.r * o.T);
  }

  // Anni per arrivare al traguardo FIRE: r rendimento reale, w tasso di prelievo,
  // s tasso di risparmio (tutti in frazione, non in %).
  function anniFire(r, w, s) {
    return Math.log(1 + (r * (1 - s)) / (s * w)) / Math.log(1 + r);
  }

  // Capitale dopo t anni: composto e semplice.
  function composto(c0, r, t) { return c0 * Math.pow(1 + r, t); }
  function semplice(c0, r, t) { return c0 * (1 + r * t); }

  var F = { numero: numero, tacche: tacche, erf: erf, normale: normale, blackScholes: blackScholes,
    anniFire: anniFire, composto: composto, semplice: semplice };
  radice.ControtesiFormule = F;
})(typeof window !== "undefined" ? window : globalThis);
