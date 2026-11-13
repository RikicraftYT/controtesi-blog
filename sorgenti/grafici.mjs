// Controtesi — grafici generati in fase di build.
//
// Negli articoli un grafico si scrive come blocco recintato ```grafico con un oggetto
// JSON (vedi LINEE-GUIDA-ARTICOLI.md). Questo modulo lo trasforma in una <figure> con:
// - due SVG, uno largo e uno stretto, che il CSS mostra secondo lo schermo, così le
//   etichette restano leggibili anche sul telefono;
// - una tabella con i dati, dentro <details>, che funziona senza JavaScript e con gli
//   screen reader;
// - attributi data-tip sui segni principali, che main.js mostra come tooltip.
// I colori non sono scritti qui: le classi g-s1…g-s4 li prendono dal CSS, tema per tema.

const LARGO = 640;
const STRETTO = 360;
const CARATTERE = 7.1; // larghezza media di un carattere a 13px, per stimare le etichette

/* ---------- Utilità ---------- */

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Numeri all'italiana: punto per le migliaia (anche a quattro cifre), virgola decimale.
export function numero(v, dec = 0) {
  if (!Number.isFinite(v)) return "—";
  const segno = v < 0 ? "−" : "";
  const [intera, decimali] = Math.abs(v).toFixed(dec).split(".");
  const gruppi = intera.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return segno + gruppi + (decimali ? "," + decimali : "");
}
// Formati: dec numero di decimali, oppure "auto" (fino a due, senza zeri finali);
// tipo "probabilita" scrive 0,0001 come «1 su 10.000».
const formato = (f = {}) => (v) => {
  if (f.tipo === "probabilita") return v >= 1 ? "certo" : 1 / v >= 1e12 ? "meno di 1 su mille miliardi" : "1 su " + numero(1 / v);
  let t;
  if (f.dec === "auto") t = numero(v, 2).replace(/,?0+$/, "");
  else t = numero(v, f.dec ?? 0);
  return (f.prefisso ?? "") + t + (f.suffisso ?? "");
};
const larghezzaTesto = (t, scala = 1) => String(t).length * CARATTERE * scala;

// Tacche "pulite" per un intervallo lineare.
function tacche(min, max, quante = 5) {
  const passoGrezzo = (max - min) / quante;
  const mag = 10 ** Math.floor(Math.log10(passoGrezzo));
  const passo = [1, 2, 2.5, 5, 10].map((k) => k * mag).find((p) => (max - min) / p <= quante) ?? 10 * mag;
  const out = [];
  for (let v = Math.ceil(min / passo - 1e-9) * passo; v <= max + 1e-9; v += passo) out.push(+v.toFixed(10));
  return out;
}
const tacheLog = (min, max) => {
  const out = [];
  for (let e = Math.floor(Math.log10(min)); e <= Math.ceil(Math.log10(max)); e++) {
    const v = 10 ** e;
    if (v >= min * 0.999 && v <= max * 1.001) out.push(v);
  }
  return out;
};

function scala(asse, da, a) {
  if (asse.log) {
    const l0 = Math.log10(asse.min), l1 = Math.log10(asse.max);
    return (v) => da + ((Math.log10(Math.max(v, asse.min * 1e-6)) - l0) / (l1 - l0)) * (a - da);
  }
  return (v) => da + ((v - asse.min) / (asse.max - asse.min)) * (a - da);
}

/* ---------- Statistica e finanza per i generatori ---------- */

const erf = (x) => {
  // Abramowitz-Stegun 7.1.26, errore < 1,5e-7
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return x >= 0 ? y : -y;
};
const N = (x) => 0.5 * (1 + erf(x / Math.SQRT2));
export function blackScholes({ S, K, T, r, sigma, tipo = "call" }) {
  if (T <= 0) return tipo === "call" ? Math.max(S - K, 0) : Math.max(K - S, 0);
  const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  const c = S * N(d1) - K * Math.exp(-r * T) * N(d2);
  return tipo === "call" ? c : c - S + K * Math.exp(-r * T);
}

// Ogni generatore restituisce una funzione f(x): il grafico la campiona, la tabella la valuta.
const GENERATORI = {
  // c0 · base^x  (crescita composta; con base < 1 perdita di potere d'acquisto)
  esponenziale: ({ c0, base }) => (x) => c0 * base ** x,
  // c0 · (1 + tasso · x)  (interesse semplice)
  semplice: ({ c0, tasso }) => (x) => c0 * (1 + tasso * x),
  costante: ({ valore }) => () => valore,
  // a · x + b
  lineare: ({ a = 1, b = 0 }) => (x) => a * x + b,
  // guadagno necessario per recuperare una perdita x (in %)
  recupero: () => (x) => (1 / (1 - x / 100) - 1) * 100,
  // densità della ricchezza finale (multipli del capitale) in un moto browniano geometrico
  lognormale: ({ mu, sigma, anni }) => {
    const m = (mu - sigma * sigma / 2) * anni, s = sigma * Math.sqrt(anni);
    return (x) => (x <= 0 ? 0 : Math.exp(-((Math.log(x) - m) ** 2) / (2 * s * s)) / (x * s * Math.sqrt(2 * Math.PI)));
  },
  // crescita composta in funzione della leva: rf + L·premio − L²σ²/2 (in %)
  leva: ({ rf, premio, sigma }) => (L) => (rf + L * premio - (L * L * sigma * sigma) / 2) * 100,
  // rendimento atteso ≈ 1/CAPE (in %)
  inverso: ({ k = 100 }) => (x) => k / x,
  // funzione di valore di Kahneman e Tversky
  prospetto: ({ alfa, lambda }) => (x) => (x >= 0 ? x ** alfa : -lambda * (-x) ** alfa),
  // probabilità che una variabile standardizzata superi x in valore assoluto
  "coda-normale": () => (x) => 1 - erf(x / Math.SQRT2),
  // t di Student con 3 gradi di libertà, riscalata a varianza 1 (coda con esponente 3)
  "coda-t3": () => (x) => {
    const t = x * Math.sqrt(3);
    const F = 0.5 + (t / (Math.sqrt(3) * (1 + (t * t) / 3)) + Math.atan(t / Math.sqrt(3))) / Math.PI;
    return 2 * (1 - F);
  },
  // premio di un'opzione in funzione del prezzo del sottostante
  "bs-premio": ({ K, giorni, r, sigma, tipo }) => (S) => blackScholes({ S, K, T: giorni / 365, r, sigma, tipo }),
  intrinseco: ({ K, tipo }) => (S) => (tipo === "put" ? Math.max(K - S, 0) : Math.max(S - K, 0)),
  // anni per arrivare al traguardo FIRE in funzione del tasso di risparmio (in %)
  "fire-anni": ({ r, w }) => (sPerc) => {
    const s = sPerc / 100;
    return Math.log(1 + (r * (1 - s)) / (s * w)) / Math.log(1 + r);
  },
  // soglia di rendimento in funzione della correlazione: ρ · σi/σp · Rp
  soglia: ({ sigmaI, sigmaP, rp }) => (rho) => rho * (sigmaI / sigmaP) * rp,
};

/* ---------- Pezzi comuni dell'SVG ---------- */

const svgApri = (W, H, titolo, desc, id) =>
  `<svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="${id}-t ${id}-d" class="grafico-svg">` +
  `<title id="${id}-t">${esc(titolo)}</title><desc id="${id}-d">${esc(desc)}</desc>`;

function assi(c, x, y, fx, fy, { mostraX = true } = {}) {
  let s = "";
  const tY = y.passi ?? (y.log ? tacheLog(y.min, y.max) : tacche(y.min, y.max, y.tacche ?? 5));
  for (const v of tY) {
    const yy = c.sy(v);
    s += `<line class="g-griglia${v === 0 && !y.log ? " g-zero" : ""}" x1="${c.x0}" x2="${c.x1}" y1="${yy}" y2="${yy}"/>`;
    s += `<text class="g-asse" x="${c.x0 - 6}" y="${yy + 4}" text-anchor="end">${esc(fy(v))}</text>`;
  }
  if (mostraX) {
    const tX = x.passi ?? (x.log ? tacheLog(x.min, x.max) : tacche(x.min, x.max, x.tacche ?? (c.W < 500 ? 4 : 6)));
    for (const v of tX) {
      const xx = c.sx(v);
      s += `<text class="g-asse" x="${xx}" y="${c.y0 + 18}" text-anchor="middle">${esc(fx(v))}</text>`;
    }
    if (x.etichetta) s += `<text class="g-asse g-titolo-asse" x="${c.x1}" y="${c.y0 + 34}" text-anchor="end">${esc(x.etichetta)}</text>`;
  }
  if (y.etichetta) s += `<text class="g-asse g-titolo-asse" x="${c.x0 - 6}" y="${c.y1 - 8}" text-anchor="start">${esc(y.etichetta)}</text>`;
  return s;
}

function legenda(voci, x, y, Wmax) {
  // voci: [{nome, colore, tratteggio}]
  let s = "", cx = x, cy = y;
  for (const v of voci) {
    const w = 26 + larghezzaTesto(v.nome, 0.95) + 16;
    if (cx + w > Wmax && cx > x) { cx = x; cy += 18; }
    s += `<line class="g-linea g-s${v.colore}${v.tratteggio ? " g-tratteggio" : ""}" x1="${cx}" x2="${cx + 20}" y1="${cy - 4}" y2="${cy - 4}"/>`;
    s += `<text class="g-etichetta" x="${cx + 26}" y="${cy}">${esc(v.nome)}</text>`;
    cx += w;
  }
  return { svg: s, altezza: cy - y + 18 };
}

/* ---------- Tipi di grafico ---------- */

// Linee e curve (anche da formula).
function linee(spec, W, id) {
  const x = spec.x, y = spec.y;
  const fx = formato(x.formato), fy = formato(y.formato);
  const serie = spec.serie.map((s) => {
    let punti = s.punti;
    let f = null;
    if (s.generatore) {
      f = GENERATORI[s.generatore.nome](s.generatore);
      const da = s.da ?? x.min, a = s.a ?? x.max, n = s.campioni ?? 160;
      punti = [];
      for (let i = 0; i <= n; i++) {
        const xv = x.log ? da * (a / da) ** (i / n) : da + ((a - da) * i) / n;
        punti.push([xv, f(xv)]);
      }
    }
    return { ...s, punti, f };
  });
  const stretto = W < 500;
  const etichetteFinali = !stretto && spec.etichette !== "legenda";
  const destra = etichetteFinali ? Math.max(...serie.map((s) => larghezzaTesto(s.nome))) + 14 : 14;
  const leg = stretto || !etichetteFinali ? legenda(serie.map((s) => ({ nome: s.nome, colore: s.colore, tratteggio: s.tratteggio })), 0, 14, W) : { svg: "", altezza: 0 };
  const tickY = y.passi ?? tacche(y.min, y.max);
  const sinistra = tickY.length ? Math.max(...tickY.map((v) => larghezzaTesto(fy(v)))) + 14 : 22;
  const H = (spec.altezza ?? 320) * (stretto ? 0.95 : 1) + leg.altezza;
  const c = { W, x0: sinistra, x1: W - destra, y1: 16 + leg.altezza + (y.etichetta ? 14 : 0), y0: H - (x.etichetta ? 42 : 28) };
  c.sx = scala(x, c.x0, c.x1);
  c.sy = scala(y, c.y0, c.y1);
  let s = svgApri(W, H, spec.titolo, spec.descrizione ?? spec.titolo, id) + leg.svg + assi(c, x, y, fx, fy);
  let nVert = 0, etichetteRif = "";
  for (const r of spec.riferimenti ?? []) {
    if (r.x !== undefined) {
      const xx = c.sx(r.x);
      s += `<line class="g-rif" x1="${xx}" x2="${xx}" y1="${c.y1}" y2="${c.y0}"/>`;
      // etichette dei riferimenti verticali sfalsate in altezza, per non sovrapporsi
      if (r.etichetta) etichetteRif += `<text class="g-etichetta g-tenue" x="${xx + 4}" y="${c.y1 + 12 + (nVert++ % 2) * 16}">${esc(r.etichetta)}</text>`;
    } else {
      const yy = c.sy(r.y);
      s += `<line class="g-rif" x1="${c.x0}" x2="${c.x1}" y1="${yy}" y2="${yy}"/>`;
      etichetteRif += `<text class="g-etichetta g-tenue" x="${c.x1}" y="${yy - 5}" text-anchor="end">${esc(r.etichetta ?? "")}</text>`;
    }
  }
  const taglia = (v) => Math.max(y.min, Math.min(y.max, v));
  const dentro = (v) => Number.isFinite(v) && v >= y.min - 1e-12 && v <= y.max + 1e-12;
  const posizioniFinali = [];
  for (const sr of serie) {
    // Fuori dall'asse la linea si interrompe, invece di scorrere schiacciata sul bordo.
    let d = "", aperto = false;
    for (const [xv, yv] of sr.punti) {
      if (!dentro(yv)) { aperto = false; continue; }
      d += `${aperto ? "L" : "M"}${c.sx(xv).toFixed(1)},${c.sy(yv).toFixed(1)}`;
      aperto = true;
    }
    sr.punti = sr.punti.filter(([, yv]) => dentro(yv));
    if (sr.area) s += `<path class="g-area g-s${sr.colore}" d="${d}L${c.sx(sr.punti.at(-1)[0]).toFixed(1)},${c.y0}L${c.sx(sr.punti[0][0]).toFixed(1)},${c.y0}Z"/>`;
    s += `<path class="g-linea g-s${sr.colore}${sr.tratteggio ? " g-tratteggio" : ""}" d="${d}"/>`;
    if (etichetteFinali) {
      const [lx, ly] = sr.punti.at(-1);
      posizioniFinali.push({ y: c.sy(taglia(ly)), x: c.sx(lx), nome: sr.nome });
    }
  }
  // Etichette a fine linea, distanziate se si sovrappongono.
  posizioniFinali.sort((a, b) => a.y - b.y);
  for (let i = 1; i < posizioniFinali.length; i++) {
    if (posizioniFinali[i].y - posizioniFinali[i - 1].y < 15) posizioniFinali[i].y = posizioniFinali[i - 1].y + 15;
  }
  for (const p of posizioniFinali) s += `<text class="g-etichetta" x="${p.x + 8}" y="${p.y + 4}">${esc(p.nome)}</text>`;
  s += etichetteRif;
  // Punti con tooltip: le x della tabella su ogni serie, più i punti evidenziati.
  const xs = spec.tabella?.x ?? [];
  for (const sr of serie) {
    for (const xv of xs) {
      const yv = sr.f ? sr.f(xv) : sr.punti.find((p) => p[0] === xv)?.[1];
      if (!Number.isFinite(yv) || yv < y.min || yv > y.max) continue;
      s += `<circle class="g-punto g-s${sr.colore}" cx="${c.sx(xv).toFixed(1)}" cy="${c.sy(yv).toFixed(1)}" r="3.5" data-tip="${esc(`${sr.nome} · ${fx(xv)}${x.unita ?? ""}: ${fy(yv)}`)}"/>`;
    }
  }
  for (const p of spec.punti ?? []) {
    const px = c.sx(p.x), py = c.sy(p.y);
    s += `<circle class="g-punto g-evidenza g-s${p.colore ?? 1}" cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="5" tabindex="0" data-tip="${esc(p.tip ?? p.etichetta)}"/>`;
    if (p.etichetta && (!stretto || p.stretto !== false)) {
      const anc = p.allinea ?? (px > (c.x0 + c.x1) / 2 ? "end" : "start");
      s += `<text class="g-etichetta" x="${px + (anc === "end" ? -9 : 9)}" y="${py + (p.sotto ? 16 : -9)}" text-anchor="${anc}">${esc(p.etichetta)}</text>`;
    }
  }
  return s + "</svg>";
}
function tabellaLinee(spec) {
  const fx = formato(spec.x.formato), fy = formato(spec.y.formato);
  const xs = spec.tabella?.x;
  const serie = spec.serie.map((s) => ({ ...s, f: s.generatore ? GENERATORI[s.generatore.nome](s.generatore) : null }));
  if (!xs) return null;
  const testa = [spec.x.etichetta ?? "x", ...serie.map((s) => s.nome)];
  const righe = xs.map((xv) => [fx(xv), ...serie.map((s) => fy(s.f ? s.f(xv) : s.punti.find((p) => p[0] === xv)?.[1]))]);
  return { testa, righe };
}

// Barre orizzontali (una serie) o raggruppate (più serie).
function barre(spec, W, id) {
  const fx = formato(spec.x?.formato);
  const gruppi = spec.serie; // facoltativo: [{nome, colore}]
  const n = gruppi ? gruppi.length : 1;
  const stretto = W < 500;
  const etichettaSopra = stretto; // sul telefono l'etichetta della riga va sopra la barra
  const larghEtich = etichettaSopra ? 0 : Math.max(...spec.righe.map((r) => larghezzaTesto(r.etichetta))) + 14;
  const valori = spec.righe.flatMap((r) => (Array.isArray(r.valore) ? r.valore : [r.valore]));
  const min = Math.min(0, spec.x?.min ?? Math.min(...valori)), max = Math.max(spec.x?.max ?? 0, ...valori);
  const spazioValore = Math.max(...valori.map((v) => larghezzaTesto(fx(v)))) + 10;
  const leg = gruppi ? legenda(gruppi.map((g) => ({ nome: g.nome, colore: g.colore })), 0, 14, W) : { svg: "", altezza: 0 };
  const hBarra = 18, gap = 3, hRiga = n * (hBarra + gap) + (etichettaSopra ? 22 : 14);
  const H = leg.altezza + 8 + spec.righe.length * hRiga + 8;
  const x0 = larghEtich + (min < 0 ? spazioValore : 0), x1 = W - spazioValore;
  const sx = (v) => x0 + ((v - min) / (max - min)) * (x1 - x0);
  let s = svgApri(W, H, spec.titolo, spec.descrizione ?? spec.titolo, id) + leg.svg;
  let y = leg.altezza + 8;
  const zero = sx(0);
  for (const r of spec.righe) {
    const vs = Array.isArray(r.valore) ? r.valore : [r.valore];
    if (etichettaSopra) {
      s += `<text class="g-etichetta" x="0" y="${y + 13}">${esc(r.etichetta)}</text>`;
      y += 20;
    } else {
      s += `<text class="g-etichetta" x="${larghEtich - 10}" y="${y + (n * (hBarra + gap)) / 2 + 2}" text-anchor="end">${esc(r.etichetta)}</text>`;
    }
    vs.forEach((v, k) => {
      const col = gruppi ? gruppi[k].colore : r.colore ?? spec.colore ?? 1;
      const a = Math.min(zero, sx(v)), b = Math.max(zero, sx(v));
      const nome = gruppi ? `${r.etichetta} · ${gruppi[k].nome}` : r.etichetta;
      s += `<rect class="g-barra g-s${col}" x="${a.toFixed(1)}" y="${y}" width="${Math.max(1, b - a).toFixed(1)}" height="${hBarra}" rx="3" tabindex="0" data-tip="${esc(`${nome}: ${fx(v)}`)}"/>`;
      const tx = v >= 0 ? b + 6 : a - 6;
      s += `<text class="g-valore" x="${tx.toFixed(1)}" y="${y + 13}" text-anchor="${v >= 0 ? "start" : "end"}">${esc(fx(v))}</text>`;
      y += hBarra + gap;
    });
    y += etichettaSopra ? 2 : 14;
  }
  s += `<line class="g-griglia g-zero" x1="${zero}" x2="${zero}" y1="${leg.altezza + 4}" y2="${H - 4}"/>`;
  return s + "</svg>";
}
function tabellaBarre(spec) {
  const fx = formato(spec.x?.formato);
  if (spec.serie) return { testa: ["", ...spec.serie.map((g) => g.nome)], righe: spec.righe.map((r) => [r.etichetta, ...r.valore.map(fx)]) };
  return { testa: ["", spec.colonna ?? "Valore"], righe: spec.righe.map((r) => [r.etichetta, fx(r.valore)]) };
}

// Barre impilate al 100%.
function barre100(spec, W, id) {
  const stretto = W < 500;
  const leg = legenda(spec.parti.map((p) => ({ nome: p.nome, colore: p.colore })), 0, 14, W);
  const larghEtich = stretto ? 0 : Math.max(...spec.righe.map((r) => larghezzaTesto(r.etichetta))) + 14;
  const hBarra = 26, hRiga = hBarra + (stretto ? 34 : 16);
  const H = leg.altezza + 10 + spec.righe.length * hRiga;
  let s = svgApri(W, H, spec.titolo, spec.descrizione ?? spec.titolo, id) + leg.svg;
  let y = leg.altezza + 10;
  const x0 = larghEtich, x1 = W - 2;
  for (const r of spec.righe) {
    if (stretto) { s += `<text class="g-etichetta" x="0" y="${y + 12}">${esc(r.etichetta)}</text>`; y += 18; }
    else s += `<text class="g-etichetta" x="${larghEtich - 10}" y="${y + hBarra / 2 + 4}" text-anchor="end">${esc(r.etichetta)}</text>`;
    const tot = r.parti.reduce((a, b) => a + b, 0);
    let cx = x0;
    r.parti.forEach((v, k) => {
      const w = ((x1 - x0) * v) / tot;
      const p = spec.parti[k];
      s += `<rect class="g-barra g-s${p.colore}" x="${cx.toFixed(1)}" y="${y}" width="${Math.max(0, w - 2).toFixed(1)}" height="${hBarra}" rx="3" tabindex="0" data-tip="${esc(`${r.etichetta} · ${p.nome}: ${numero(v)}%`)}"/>`;
      if (w > 42) s += `<text class="g-valore g-su-colore" x="${(cx + w / 2 - 1).toFixed(1)}" y="${y + hBarra / 2 + 4}" text-anchor="middle">${numero(v)}%</text>`;
      cx += w;
    });
    y += hRiga - (stretto ? 18 : 0);
  }
  return s + "</svg>";
}
const tabellaBarre100 = (spec) => ({ testa: ["", ...spec.parti.map((p) => p.nome)], righe: spec.righe.map((r) => [r.etichetta, ...r.parti.map((v) => numero(v) + "%")]) });

// Cascata orizzontale: un valore di partenza, contributi positivi e negativi, un totale.
function cascata(spec, W, id) {
  const fx = formato(spec.formato);
  const stretto = W < 500;
  const righe = [];
  let corrente = spec.inizio?.valore ?? 0;
  if (spec.inizio) righe.push({ etichetta: spec.inizio.etichetta, da: 0, a: corrente, tipo: "totale", valore: corrente });
  for (const p of spec.passi) { righe.push({ etichetta: p.etichetta, da: corrente, a: corrente + p.valore, tipo: p.valore >= 0 ? "su" : "giu", valore: p.valore }); corrente += p.valore; }
  righe.push({ etichetta: spec.fine.etichetta, da: spec.inizio ? 0 : 0, a: corrente, tipo: "totale", valore: corrente });
  if (spec.confronto) righe.push({ etichetta: spec.confronto.etichetta, da: 0, a: spec.confronto.valore, tipo: "confronto", valore: spec.confronto.valore });
  const tutti = righe.flatMap((r) => [r.da, r.a]);
  const min = spec.min ?? Math.min(0, ...tutti), max = spec.max ?? Math.max(0, ...tutti);
  const larghEtich = stretto ? 0 : Math.max(...righe.map((r) => larghezzaTesto(r.etichetta))) + 14;
  const spazio = 70;
  const x0 = larghEtich + (min < 0 ? spazio : 0), x1 = W - spazio;
  const sx = (v) => x0 + ((Math.max(min, Math.min(max, v)) - min) / (max - min)) * (x1 - x0);
  const hBarra = 20, hRiga = hBarra + (stretto ? 26 : 10);
  const H = 10 + righe.length * hRiga + 6;
  let s = svgApri(W, H, spec.titolo, spec.descrizione ?? spec.titolo, id);
  let y = 10;
  const colore = { totale: 4, su: spec.coloreSu ?? 1, giu: spec.coloreGiu ?? 2, confronto: 3 };
  righe.forEach((r, i) => {
    if (stretto) { s += `<text class="g-etichetta" x="0" y="${y + 11}">${esc(r.etichetta)}</text>`; y += 16; }
    else s += `<text class="g-etichetta" x="${larghEtich - 10}" y="${y + 14}" text-anchor="end">${esc(r.etichetta)}</text>`;
    const a = Math.min(sx(r.da), sx(r.a)), b = Math.max(sx(r.da), sx(r.a));
    const testo = r.tipo === "su" ? "+" + fx(r.valore) : fx(r.valore);
    const assoluto = r.tipo === "totale" || r.tipo === "confronto";
    if (assoluto && min > 0) {
      // L'asse non parte da zero: un totale disegnato come barra avrebbe una lunghezza
      // fuorviante, quindi diventa un segno sul suo valore.
      const xx = sx(r.a);
      s += `<rect class="g-barra g-s${colore[r.tipo]}${r.tipo === "confronto" ? " g-vuota" : ""}" x="${(xx - 3).toFixed(1)}" y="${y - 2}" width="6" height="${hBarra + 4}" rx="2" tabindex="0" data-tip="${esc(`${r.etichetta}: ${testo}`)}"/>`;
      s += `<text class="g-valore" x="${(xx + 10).toFixed(1)}" y="${y + 14}">${esc(testo)}</text>`;
    } else {
      s += `<rect class="g-barra g-s${colore[r.tipo]}${r.tipo === "confronto" ? " g-vuota" : ""}" x="${a.toFixed(1)}" y="${y}" width="${Math.max(2, b - a).toFixed(1)}" height="${hBarra}" rx="3" tabindex="0" data-tip="${esc(`${r.etichetta}: ${testo}`)}"/>`;
      s += `<text class="g-valore" x="${(b + 6).toFixed(1)}" y="${y + 14}">${esc(testo)}</text>`;
    }
    if (i < righe.length - 1 && r.tipo !== "confronto" && righe[i + 1].tipo !== "confronto") {
      const xx = sx(r.a);
      s += `<line class="g-rif" x1="${xx.toFixed(1)}" x2="${xx.toFixed(1)}" y1="${y + hBarra}" y2="${y + hRiga}"/>`;
    }
    // sul telefono 16px sono già stati aggiunti sopra, per l'etichetta
    y += stretto ? hRiga - 16 : hRiga;
  });
  if (min < 0) s += `<line class="g-griglia g-zero" x1="${sx(0)}" x2="${sx(0)}" y1="4" y2="${H - 4}"/>`;
  return s + "</svg>";
}
function tabellaCascata(spec) {
  const fx = formato(spec.formato);
  const righe = [];
  if (spec.inizio) righe.push([spec.inizio.etichetta, fx(spec.inizio.valore)]);
  let tot = spec.inizio?.valore ?? 0;
  for (const p of spec.passi) { righe.push([p.etichetta, (p.valore >= 0 ? "+" : "") + fx(p.valore)]); tot += p.valore; }
  righe.push([spec.fine.etichetta, fx(tot)]);
  if (spec.confronto) righe.push([spec.confronto.etichetta, fx(spec.confronto.valore)]);
  return { testa: ["", "Valore"], righe };
}

// Profili di rendimento a scadenza, in piccoli multipli.
const valoreGamba = (g, S) => {
  const q = (g.quantita ?? 1) * (g.lato ?? 1);
  if (g.tipo === "azione") return q * (S - g.prezzo);
  const intr = g.tipo === "call" ? Math.max(S - g.strike, 0) : Math.max(g.strike - S, 0);
  return q * (intr - g.premio);
};
function payoff(spec, W, id) {
  const stretto = W < 500;
  const cols = spec.colonne ?? 2;
  const pannelli = spec.pannelli;
  const righe = Math.ceil(pannelli.length / cols);
  const wP = W / cols, hP = stretto ? 150 : 170;
  const H = righe * (hP + 26);
  const { min: smin, max: smax } = spec.x;
  const { min: ymin, max: ymax } = spec.y;
  let s = svgApri(W, H, spec.titolo, spec.descrizione ?? spec.titolo, id);
  pannelli.forEach((p, i) => {
    const ox = (i % cols) * wP, oy = Math.floor(i / cols) * (hP + 26);
    const x0 = ox + (stretto ? 26 : 34), x1 = ox + wP - 10, y1 = oy + 26, y0 = oy + hP;
    const sx = (v) => x0 + ((v - smin) / (smax - smin)) * (x1 - x0);
    const sy = (v) => y0 - ((Math.max(ymin, Math.min(ymax, v)) - ymin) / (ymax - ymin)) * (y0 - y1);
    s += `<text class="g-etichetta g-forte" x="${ox + 2}" y="${oy + 14}">${esc(p.titolo)}</text>`;
    for (const v of tacche(ymin, ymax, 4)) {
      s += `<line class="g-griglia${v === 0 ? " g-zero" : ""}" x1="${x0}" x2="${x1}" y1="${sy(v)}" y2="${sy(v)}"/>`;
      s += `<text class="g-asse" x="${x0 - 4}" y="${sy(v) + 4}" text-anchor="end">${esc(numero(v))}</text>`;
    }
    for (const v of spec.x.passi ?? tacche(smin, smax, 3)) s += `<text class="g-asse" x="${sx(v)}" y="${y0 + 15}" text-anchor="middle">${esc(numero(v))}</text>`;
    const traccia = (gambe, classe) => {
      let d = "";
      for (let k = 0; k <= 120; k++) {
        const S = smin + ((smax - smin) * k) / 120;
        const v = gambe.reduce((a, g) => a + valoreGamba(g, S), 0);
        d += `${k ? "L" : "M"}${sx(S).toFixed(1)},${sy(v).toFixed(1)}`;
      }
      return `<path class="${classe}" d="${d}"/>`;
    };
    if (p.confronto) s += traccia(p.confronto, "g-linea g-s4 g-tratteggio");
    s += traccia(p.gambe, `g-linea g-s${p.colore ?? 1} g-spessa`);
    for (const S of spec.tabella?.x ?? []) {
      const v = p.gambe.reduce((a, g) => a + valoreGamba(g, S), 0);
      if (v < ymin || v > ymax) continue;
      s += `<circle class="g-punto g-s${p.colore ?? 1}" cx="${sx(S).toFixed(1)}" cy="${sy(v).toFixed(1)}" r="3.5" data-tip="${esc(`${p.titolo} · prezzo ${numero(S)}: ${v >= 0 ? "+" : ""}${numero(v, 1)}`)}"/>`;
    }
  });
  return s + "</svg>";
}
function tabellaPayoff(spec) {
  const xs = spec.tabella?.x;
  if (!xs) return null;
  return {
    testa: ["Prezzo a scadenza", ...spec.pannelli.map((p) => p.titolo)],
    righe: xs.map((S) => [numero(S), ...spec.pannelli.map((p) => { const v = p.gambe.reduce((a, g) => a + valoreGamba(g, S), 0); return (v > 0 ? "+" : "") + numero(v, 1); })]),
  };
}

// Waffle 10×10: ogni quadrato vale 1%.
function waffle(spec, W, id) {
  const stretto = W < 500;
  const lato = stretto ? 22 : 24, gap = 3;
  const griglia = 10 * (lato + gap);
  const legX = stretto ? 0 : griglia + 28;
  const H = stretto ? griglia + 20 + spec.parti.length * 22 : Math.max(griglia, spec.parti.length * 40) + 8;
  let s = svgApri(W, H, spec.titolo, spec.descrizione ?? spec.titolo, id);
  const ox = stretto ? (W - griglia) / 2 : 0;
  let k = 0;
  spec.parti.forEach((p) => {
    for (let i = 0; i < p.valore; i++, k++) {
      const r = Math.floor(k / 10), c = k % 10;
      s += `<rect class="g-barra g-s${p.colore}" x="${ox + c * (lato + gap)}" y="${r * (lato + gap)}" width="${lato}" height="${lato}" rx="3" data-tip="${esc(`${p.nome}: ${p.etichettaValore ?? numero(p.valore) + "%"}`)}"/>`;
    }
  });
  spec.parti.forEach((p, i) => {
    const y = stretto ? griglia + 18 + i * 22 : 14 + i * 40;
    s += `<rect class="g-barra g-s${p.colore}" x="${legX}" y="${y - 11}" width="14" height="14" rx="3"/>`;
    const maxC = Math.floor((W - legX - 26) / CARATTERE);
    const parole = `${p.etichettaValore ?? numero(p.valore) + "%"} ${p.nome}`.split(" ");
    const righeT = [""];
    for (const w of parole) { if ((righeT.at(-1) + " " + w).trim().length > maxC) righeT.push(w); else righeT[righeT.length - 1] = (righeT.at(-1) + " " + w).trim(); }
    righeT.forEach((t, k) => { s += `<text class="g-etichetta${k === 0 ? "" : ""}" x="${legX + 22}" y="${y + k * 16}">${esc(t)}</text>`; });
  });
  return s + "</svg>";
}
const tabellaWaffle = (spec) => ({ testa: ["", "Quota"], righe: spec.parti.map((p) => [p.nome, p.etichettaValore ?? numero(p.valore) + "%"]) });

// Punti collegati: due valori per riga sullo stesso asse (prima/dopo, nominale/reale).
function puntiCollegati(spec, W, id) {
  const x = spec.x, fx = formato(x.formato);
  const stretto = W < 500;
  const leg = legenda([{ nome: spec.nomi[0], colore: spec.colori?.[0] ?? 4 }, { nome: spec.nomi[1], colore: spec.colori?.[1] ?? 1 }], 0, 14, W);
  const larghEtich = stretto ? 0 : Math.max(...spec.righe.map((r) => larghezzaTesto(r.etichetta))) + 14;
  const hRiga = stretto ? 64 : 48;
  const H = leg.altezza + 14 + spec.righe.length * hRiga + 22;
  const x0 = larghEtich + 10, x1 = W - 16;
  const sx = scala(x, x0, x1);
  let s = svgApri(W, H, spec.titolo, spec.descrizione ?? spec.titolo, id) + leg.svg;
  const tX = x.passi ?? (x.log ? tacheLog(x.min, x.max) : tacche(x.min, x.max, stretto ? 4 : 6));
  for (const v of tX) {
    s += `<line class="g-griglia" x1="${sx(v)}" x2="${sx(v)}" y1="${leg.altezza + 4}" y2="${H - 22}"/>`;
    s += `<text class="g-asse" x="${sx(v)}" y="${H - 6}" text-anchor="middle">${esc(fx(v))}</text>`;
  }
  let y = leg.altezza + 14;
  const c0 = spec.colori?.[0] ?? 4, c1 = spec.colori?.[1] ?? 1;
  for (const r of spec.righe) {
    let cy = y + 24;
    if (stretto) { s += `<text class="g-etichetta" x="0" y="${y + 10}">${esc(r.etichetta)}</text>`; cy = y + 40; }
    else s += `<text class="g-etichetta" x="${larghEtich - 4}" y="${cy + 4}" text-anchor="end">${esc(r.etichetta)}</text>`;
    const a = sx(r.da), b = sx(r.a);
    s += `<line class="g-collega" x1="${a}" x2="${b}" y1="${cy}" y2="${cy}"/>`;
    s += `<circle class="g-punto g-s${c0}" cx="${a.toFixed(1)}" cy="${cy}" r="6" tabindex="0" data-tip="${esc(`${r.etichetta} · ${spec.nomi[0]}: ${fx(r.da)}`)}"/>`;
    s += `<circle class="g-punto g-s${c1}" cx="${b.toFixed(1)}" cy="${cy}" r="6" tabindex="0" data-tip="${esc(`${r.etichetta} · ${spec.nomi[1]}: ${fx(r.a)}`)}"/>`;
    // valori sopra i punti, centrati (o allineati al bordo se il punto è vicino al margine)
    const ancora = (px) => (px < x0 + 30 ? "start" : px > x1 - 30 ? "end" : "middle");
    s += `<text class="g-valore" x="${a.toFixed(1)}" y="${cy - 11}" text-anchor="${ancora(a)}">${esc(fx(r.da))}</text>`;
    s += `<text class="g-valore" x="${b.toFixed(1)}" y="${cy - 11}" text-anchor="${ancora(b)}">${esc(fx(r.a))}</text>`;
    y += hRiga;
  }
  return s + "</svg>";
}
const tabellaPuntiCollegati = (spec) => {
  const fx = formato(spec.x.formato);
  return { testa: ["", ...spec.nomi], righe: spec.righe.map((r) => [r.etichetta, fx(r.da), fx(r.a)]) };
};

// Intervalli: per ogni riga un valore o un intervallo sullo stesso asse.
function intervalli(spec, W, id) {
  const x = spec.x, fx = formato(x.formato);
  const stretto = W < 500;
  const larghEtich = stretto ? 0 : Math.max(...spec.righe.map((r) => larghezzaTesto(r.etichetta))) + 14;
  const hRiga = stretto ? 46 : 30;
  const H = 12 + spec.righe.length * hRiga + 26;
  const x0 = larghEtich + 8, x1 = W - 40;
  const sx = scala(x, x0, x1);
  let s = svgApri(W, H, spec.titolo, spec.descrizione ?? spec.titolo, id);
  for (const v of x.passi ?? tacche(x.min, x.max, stretto ? 4 : 6)) {
    s += `<line class="g-griglia" x1="${sx(v)}" x2="${sx(v)}" y1="6" y2="${H - 24}"/>`;
    s += `<text class="g-asse" x="${sx(v)}" y="${H - 8}" text-anchor="middle">${esc(fx(v))}</text>`;
  }
  if (spec.riferimento) {
    const xx = sx(spec.riferimento.x);
    s += `<line class="g-rif g-rif-forte" x1="${xx}" x2="${xx}" y1="4" y2="${H - 24}"/>`;
  }
  let y = 12;
  for (const r of spec.righe) {
    let cy = y + 10;
    if (stretto) { s += `<text class="g-etichetta" x="0" y="${y + 8}">${esc(r.etichetta)}</text>`; cy = y + 24; }
    else s += `<text class="g-etichetta" x="${larghEtich - 6}" y="${cy + 4}" text-anchor="end">${esc(r.etichetta)}</text>`;
    const col = r.colore ?? 1;
    const testo = r.a !== undefined ? `${fx(r.da)}–${fx(r.a)}` : fx(r.da);
    if (r.a !== undefined) s += `<rect class="g-barra g-s${col}" x="${sx(r.da).toFixed(1)}" y="${cy - 5}" width="${(sx(r.a) - sx(r.da)).toFixed(1)}" height="10" rx="5" tabindex="0" data-tip="${esc(`${r.etichetta}: ${testo}`)}"/>`;
    else s += `<circle class="g-punto g-s${col}" cx="${sx(r.da).toFixed(1)}" cy="${cy}" r="6" tabindex="0" data-tip="${esc(`${r.etichetta}: ${testo}`)}"/>`;
    s += `<text class="g-valore" x="${(sx(r.a ?? r.da) + 10).toFixed(1)}" y="${cy + 4}">${esc(testo)}</text>`;
    y += hRiga;
  }
  return s + "</svg>";
}
const tabellaIntervalli = (spec) => {
  const fx = formato(spec.x.formato);
  return { testa: ["", spec.colonna ?? "Valore"], righe: spec.righe.map((r) => [r.etichetta, r.a !== undefined ? `${fx(r.da)}–${fx(r.a)}` : fx(r.da)]) };
};

// Matrice 2×2 (infografica). Su schermo largo: griglia con le etichette delle righe in
// una colonna a sinistra. Sul telefono: quattro schede in colonna, ciascuna con il suo contesto.
const aCapo = (testo, maxC) => {
  const righe = [""];
  for (const p of String(testo).split(" ")) {
    if ((righe.at(-1) + " " + p).trim().length > maxC) righe.push(p);
    else righe[righe.length - 1] = (righe.at(-1) + " " + p).trim();
  }
  return righe;
};
function matrice(spec, W, id) {
  const stretto = W < 500;
  if (stretto) {
    const hC = 92, gap = 8;
    const H = spec.celle.length * (hC + gap);
    let s = svgApri(W, H, spec.titolo, spec.descrizione ?? spec.titolo, id);
    spec.celle.forEach((c, i) => {
      const y = i * (hC + gap);
      const contesto = `${spec.colonne[i % 2]} · ${spec.righe[Math.floor(i / 2)]}`.toLowerCase();
      s += `<rect class="g-cella g-s${c.colore ?? i + 1}" x="1" y="${y + 1}" width="${W - 2}" height="${hC - 2}" rx="10" tabindex="0" data-tip="${esc(`${c.titolo}: ${c.testo}`)}"/>`;
      s += `<text class="g-asse" x="14" y="${y + 20}">${esc(contesto.charAt(0).toUpperCase() + contesto.slice(1))}</text>`;
      s += `<text class="g-etichetta g-forte" x="14" y="${y + 42}">${esc(c.titolo)}</text>`;
      aCapo(c.testo, Math.floor((W - 30) / CARATTERE)).forEach((l, k) => { s += `<text class="g-etichetta" x="14" y="${y + 62 + k * 16}">${esc(l)}</text>`; });
    });
    return s + "</svg>";
  }
  const ml = 150, mt = 26;
  const wC = (W - ml) / 2, hC = 100;
  const H = mt + 2 * hC;
  let s = svgApri(W, H, spec.titolo, spec.descrizione ?? spec.titolo, id);
  spec.colonne.forEach((col, k) => { s += `<text class="g-etichetta g-tenue" x="${ml + wC * (k + 0.5)}" y="16" text-anchor="middle">${esc(col)}</text>`; });
  spec.righe.forEach((r, i) => {
    const righeT = aCapo(r, 18);
    const cy = mt + hC * i + hC / 2 - ((righeT.length - 1) * 16) / 2;
    righeT.forEach((l, k) => { s += `<text class="g-etichetta g-tenue" x="${ml - 12}" y="${cy + 4 + k * 16}" text-anchor="end">${esc(l)}</text>`; });
  });
  spec.celle.forEach((c, i) => {
    const x = ml + (i % 2) * wC, y = mt + Math.floor(i / 2) * hC;
    s += `<rect class="g-cella g-s${c.colore ?? i + 1}" x="${x + 3}" y="${y + 3}" width="${wC - 6}" height="${hC - 6}" rx="10" tabindex="0" data-tip="${esc(`${c.titolo}: ${c.testo}`)}"/>`;
    const maxC = Math.floor((wC - 34) / CARATTERE);
    const titoli = aCapo(c.titolo, maxC);
    titoli.forEach((l, k) => { s += `<text class="g-etichetta g-forte" x="${x + 16}" y="${y + 28 + k * 16}">${esc(l)}</text>`; });
    aCapo(c.testo, maxC).forEach((l, k) => { s += `<text class="g-etichetta" x="${x + 16}" y="${y + 32 + titoli.length * 16 + k * 16}">${esc(l)}</text>`; });
  });
  return s + "</svg>";
}
const tabellaMatrice = (spec) => ({ testa: ["", ...spec.colonne], righe: spec.righe.map((r, i) => [r, ...spec.celle.slice(i * 2, i * 2 + 2).map((c) => `${c.titolo}: ${c.testo}`)]) });

const TIPI = {
  linee: [linee, tabellaLinee],
  barre: [barre, tabellaBarre],
  barre100: [barre100, tabellaBarre100],
  cascata: [cascata, tabellaCascata],
  payoff: [payoff, tabellaPayoff],
  waffle: [waffle, tabellaWaffle],
  "punti-collegati": [puntiCollegati, tabellaPuntiCollegati],
  intervalli: [intervalli, tabellaIntervalli],
  matrice: [matrice, tabellaMatrice],
};

let contatore = 0;
// Dal blocco ```grafico all'HTML della figura. Un errore ferma la build con un messaggio chiaro.
export function grafico(json, dove = "") {
  let spec;
  try { spec = JSON.parse(json); } catch (e) { throw new Error(`Grafico in ${dove}: JSON non valido (${e.message})`); }
  const tipo = TIPI[spec.tipo];
  if (!tipo) throw new Error(`Grafico in ${dove}: tipo "${spec.tipo}" sconosciuto (ammessi: ${Object.keys(TIPI).join(", ")})`);
  if (!spec.titolo) throw new Error(`Grafico in ${dove}: manca il titolo`);
  for (const s of spec.serie ?? []) if (s.generatore && !GENERATORI[s.generatore.nome]) throw new Error(`Grafico in ${dove}: generatore "${s.generatore.nome}" sconosciuto`);
  const [disegna, tabella] = tipo;
  const id = `g${++contatore}`;
  const largo = disegna(spec, LARGO, id + "l");
  const stretto = disegna(spec, STRETTO, id + "s");
  const t = tabella(spec);
  const tab = t ? `<details class="grafico-dati"><summary>Dati del grafico</summary><div class="tabella" tabindex="0" role="region" aria-label="Dati del grafico"><table>
<thead><tr>${t.testa.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
<tbody>${t.righe.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details>` : "";
  const interattivo = spec.interattivo ? ` data-interattivo="${esc(spec.interattivo)}"` : "";
  return `<figure class="grafico"${interattivo}>
<p class="grafico-titolo">${esc(spec.titolo)}</p>
<div class="grafico-largo">${largo}</div>
<div class="grafico-stretto">${stretto}</div>
${spec.nota ? `<figcaption>${esc(spec.nota)}</figcaption>` : ""}
${tab}
</figure>\n`;
}
