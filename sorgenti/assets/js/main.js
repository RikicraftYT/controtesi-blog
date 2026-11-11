/* Controtesi — interazioni: tema, barra di avanzamento, sommario, simulazione. */
(function () {
  "use strict";

  var radice = document.documentElement;

  /* ----- Tema chiaro / scuro ----- */
  function leggiTema() {
    try { return localStorage.getItem("controtesi-tema"); } catch (e) { return null; }
  }
  function salvaTema(t) {
    try { localStorage.setItem("controtesi-tema", t); } catch (e) { /* preferenza non salvata */ }
  }
  function applicaTema(t) {
    radice.setAttribute("data-theme", t);
    var b = document.querySelector(".tema");
    if (b) {
      var nome = b.querySelector(".tema-nome");
      if (nome) nome.textContent = t === "scuro" ? "chiaro" : "scuro";
      b.setAttribute("aria-label", t === "scuro" ? "Passa al tema chiaro" : "Passa al tema scuro");
      b.setAttribute("aria-pressed", t === "scuro" ? "true" : "false");
    }
  }
  var preferito = leggiTema() ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "scuro" : "chiaro");
  applicaTema(preferito);

  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest(".tema") : null;
    if (!b) return;
    var nuovo = radice.getAttribute("data-theme") === "scuro" ? "chiaro" : "scuro";
    applicaTema(nuovo);
    salvaTema(nuovo);
  });

  /* ----- Barra di avanzamento della lettura ----- */
  var barra = document.querySelector(".avanzamento");
  var prosa = document.querySelector(".articolo-corpo");
  if (barra && prosa) {
    var aggiorna = function () {
      var r = prosa.getBoundingClientRect();
      var totale = r.height - window.innerHeight * 0.6;
      var fatto = Math.min(1, Math.max(0, -r.top / (totale > 0 ? totale : 1)));
      barra.style.transform = "scaleX(" + fatto + ")";
    };
    window.addEventListener("scroll", aggiorna, { passive: true });
    window.addEventListener("resize", aggiorna);
    aggiorna();
  }

  /* ----- Sommario: evidenzia la sezione in lettura ----- */
  var voci = document.querySelectorAll(".sommario-pagina a");
  if (voci.length && "IntersectionObserver" in window) {
    var mappa = {};
    voci.forEach(function (a) { mappa[decodeURIComponent(a.hash.slice(1))] = a; });
    var oss = new IntersectionObserver(function (entrate) {
      entrate.forEach(function (en) {
        if (!en.isIntersecting) return;
        voci.forEach(function (a) { a.classList.remove("attivo"); });
        var a = mappa[en.target.id];
        if (a) a.classList.add("attivo");
      });
    }, { rootMargin: "-15% 0px -70% 0px" });
    document.querySelectorAll(".prosa h2[id]").forEach(function (h) { oss.observe(h); });
  }

  /* ----- Sommario a tendina (telefono e tablet): si chiude dopo la scelta ----- */
  var tendina = document.querySelector(".sommario-breve");
  if (tendina) {
    tendina.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) tendina.open = false;
    });
  }

  /* ----- Simulazione: scommessa +50% / -40% ----- */
  // Il grafico è disegnato alla larghezza reale del riquadro, così le etichette
  // restano leggibili anche su telefono; i percorsi si conservano se cambia la
  // larghezza (rotazione del dispositivo) e si rigenerano solo col bottone.
  var fig = document.querySelector('[data-sim="scommessa"]');
  if (fig) {
    var NS = "http://www.w3.org/2000/svg";
    var GIOCATE = 50, GIOCATORI = 20, yMin = -3, yMax = 2;
    var ATTESO = GIOCATE * Math.log10(1.05);
    var percorsi = [];
    var larghezzaDisegnata = 0;

    var el = function (nome, attr) {
      var n = document.createElementNS(NS, nome);
      for (var k in attr) n.setAttribute(k, attr[k]);
      return n;
    };

    var svg = el("svg", { role: "img",
      "aria-label": "Grafico di venti percorsi simulati della scommessa, con valore atteso e percorso tipico" });

    var comandi = document.createElement("div");
    comandi.className = "sim-comandi";
    var bottone = document.createElement("button");
    bottone.type = "button";
    bottone.textContent = "Gioca di nuovo";
    var esito = document.createElement("p");
    esito.className = "sim-esito";
    esito.setAttribute("aria-live", "polite");
    comandi.appendChild(bottone);
    comandi.appendChild(esito);

    var disegna = function () {
      var L = Math.round(Math.max(280, Math.min(720, fig.clientWidth - 36)));
      var stretto = L < 480;
      var A = stretto ? Math.round(L * 0.72) : 300;
      var mSx = stretto ? 42 : 46, mDx = 10, mSu = 12, mGiu = 26;
      larghezzaDisegnata = fig.clientWidth;
      svg.setAttribute("viewBox", "0 0 " + L + " " + A);
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      var x = function (n) { return mSx + (L - mSx - mDx) * n / GIOCATE; };
      var y = function (log) {
        var c = Math.max(yMin, Math.min(yMax, log));
        return mSu + (A - mSu - mGiu) * (yMax - c) / (yMax - yMin);
      };
      var linea = function (f) {
        var p = [];
        for (var n = 0; n <= GIOCATE; n++) p.push(x(n).toFixed(1) + "," + y(f(n)).toFixed(1));
        return p.join(" ");
      };

      [[2, "×100"], [1, "×10"], [0, "×1"], [-1, "×0,1"], [-2, "×0,01"], [-3, "×0,001"]].forEach(function (g) {
        svg.appendChild(el("line", { x1: mSx, x2: L - mDx, y1: y(g[0]), y2: y(g[0]), "class": "sim-griglia" }));
        var t = el("text", { x: mSx - 6, y: y(g[0]) + 4, "text-anchor": "end", "class": "sim-asse" });
        t.textContent = g[1];
        svg.appendChild(t);
      });
      (stretto ? [0, 25, 50] : [0, 10, 20, 30, 40, 50]).forEach(function (n) {
        var t = el("text", { x: x(n), y: A - 6, "text-anchor": n === 0 ? "start" : n === GIOCATE ? "end" : "middle", "class": "sim-asse" });
        t.textContent = n === 0 ? "giocata 0" : String(n);
        svg.appendChild(t);
      });
      percorsi.forEach(function (logs) {
        svg.appendChild(el("polyline", { "class": "sim-percorso",
          points: logs.map(function (v, n) { return x(n).toFixed(1) + "," + y(v).toFixed(1); }).join(" ") }));
      });
      svg.appendChild(el("polyline", { "class": "sim-tipico",
        points: linea(function (n) { return n * Math.log10(Math.sqrt(1.5 * 0.6)); }) }));
      svg.appendChild(el("polyline", { "class": "sim-atteso",
        points: linea(function (n) { return n * Math.log10(1.05); }) }));
    };

    var gioca = function () {
      var sopraInizio = 0, sopraAtteso = 0;
      percorsi = [];
      for (var g = 0; g < GIOCATORI; g++) {
        var log = 0, logs = [0];
        for (var n = 1; n <= GIOCATE; n++) {
          log += Math.log10(Math.random() < 0.5 ? 1.5 : 0.6);
          logs.push(log);
        }
        if (log > 0) sopraInizio++;
        if (log > ATTESO) sopraAtteso++;
        percorsi.push(logs);
      }
      disegna();
      esito.textContent = "Sopra il capitale iniziale: " + sopraInizio + " su " + GIOCATORI +
        ". Sopra il valore atteso: " + sopraAtteso + " su " + GIOCATORI + ".";
    };
    bottone.addEventListener("click", gioca);

    var attesa;
    window.addEventListener("resize", function () {
      clearTimeout(attesa);
      attesa = setTimeout(function () {
        if (Math.abs(fig.clientWidth - larghezzaDisegnata) > 8) disegna();
      }, 150);
    });

    fig.insertBefore(comandi, fig.firstChild);
    fig.insertBefore(svg, fig.firstChild);
    gioca();
  }
})();
