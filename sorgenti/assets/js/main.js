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

  /* ----- Simulazione: scommessa +50% / -40% ----- */
  var fig = document.querySelector('[data-sim="scommessa"]');
  if (fig) {
    var NS = "http://www.w3.org/2000/svg";
    var L = 640, A = 300, mSx = 46, mDx = 12, mSu = 12, mGiu = 26;
    var GIOCATE = 50, GIOCATORI = 20, yMin = -3, yMax = 2;

    var x = function (n) { return mSx + (L - mSx - mDx) * n / GIOCATE; };
    var y = function (log) {
      var c = Math.max(yMin, Math.min(yMax, log));
      return mSu + (A - mSu - mGiu) * (yMax - c) / (yMax - yMin);
    };
    var el = function (nome, attr) {
      var n = document.createElementNS(NS, nome);
      for (var k in attr) n.setAttribute(k, attr[k]);
      return n;
    };
    var linea = function (f) {
      var p = [];
      for (var n = 0; n <= GIOCATE; n++) p.push(x(n).toFixed(1) + "," + y(f(n)).toFixed(1));
      return p.join(" ");
    };

    var svg = el("svg", { viewBox: "0 0 " + L + " " + A, role: "img",
      "aria-label": "Grafico di venti percorsi simulati della scommessa, con valore atteso e percorso tipico" });
    [[2, "×100"], [1, "×10"], [0, "×1"], [-1, "×0,1"], [-2, "×0,01"], [-3, "×0,001"]].forEach(function (g) {
      svg.appendChild(el("line", { x1: mSx, x2: L - mDx, y1: y(g[0]), y2: y(g[0]), "class": "sim-griglia" }));
      var t = el("text", { x: mSx - 6, y: y(g[0]) + 4, "text-anchor": "end", "class": "sim-asse" });
      t.textContent = g[1];
      svg.appendChild(t);
    });
    [0, 10, 20, 30, 40, 50].forEach(function (n) {
      var t = el("text", { x: x(n), y: A - 6, "text-anchor": "middle", "class": "sim-asse" });
      t.textContent = n === 0 ? "giocata 0" : String(n);
      svg.appendChild(t);
    });
    var gruppo = el("g", {});
    svg.appendChild(gruppo);
    svg.appendChild(el("polyline", { "class": "sim-tipico",
      points: linea(function (n) { return n * Math.log10(Math.sqrt(1.5 * 0.6)); }) }));
    svg.appendChild(el("polyline", { "class": "sim-atteso",
      points: linea(function (n) { return n * Math.log10(1.05); }) }));

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

    var gioca = function () {
      while (gruppo.firstChild) gruppo.removeChild(gruppo.firstChild);
      var sopraInizio = 0, sopraAtteso = 0, atteso = GIOCATE * Math.log10(1.05);
      for (var g = 0; g < GIOCATORI; g++) {
        var log = 0, p = [x(0).toFixed(1) + "," + y(0).toFixed(1)];
        for (var n = 1; n <= GIOCATE; n++) {
          log += Math.log10(Math.random() < 0.5 ? 1.5 : 0.6);
          p.push(x(n).toFixed(1) + "," + y(log).toFixed(1));
        }
        if (log > 0) sopraInizio++;
        if (log > atteso) sopraAtteso++;
        gruppo.appendChild(el("polyline", { "class": "sim-percorso", points: p.join(" ") }));
      }
      esito.textContent = "Sopra il capitale iniziale: " + sopraInizio + " su " + GIOCATORI +
        ". Sopra il valore atteso: " + sopraAtteso + " su " + GIOCATORI + ".";
    };
    bottone.addEventListener("click", gioca);

    fig.insertBefore(comandi, fig.firstChild);
    fig.insertBefore(svg, fig.firstChild);
    gioca();
  }
})();
