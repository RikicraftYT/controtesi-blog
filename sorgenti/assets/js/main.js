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

  /* ----- Formule: su più righe quando quella affiancata non entra ----- */
  var formule = document.querySelectorAll(".formula");
  if (document.querySelector(".prosa .katex-display")) {
    var adatta = function () {
      formule.forEach(function (f) {
        f.classList.remove("a-righe");
        var d = f.querySelector(".formula-affiancata .katex-display");
        if (d && d.scrollWidth > d.clientWidth + 1) f.classList.add("a-righe");
      });
      // Se manca poco, si rimpicciolisce la formula (al massimo del 20%) invece di farla scorrere.
      document.querySelectorAll(".prosa .katex-display").forEach(function (d) {
        d.style.fontSize = "";
        if (!d.offsetParent) return;
        var rapporto = d.clientWidth / d.scrollWidth;
        if (rapporto < 1 && rapporto >= 0.8) d.style.fontSize = (Math.floor(rapporto * 100) - 3) + "%";
      });
    };
    adatta();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(adatta);
    var attesaFormule;
    window.addEventListener("resize", function () {
      clearTimeout(attesaFormule);
      attesaFormule = setTimeout(adatta, 150);
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
  /* ----- Filtro per livello in home ----- */
  var filtro = document.querySelector(".filtro");
  if (filtro) {
    filtro.hidden = false;
    var bottoniFiltro = filtro.querySelectorAll("button");
    var righe = document.querySelectorAll(".duello[data-livello]");
    var gruppiHome = document.querySelectorAll(".gruppo");
    var conteggio = filtro.querySelector(".filtro-conteggio");
    var applicaFiltro = function (livello) {
      var visibili = 0;
      bottoniFiltro.forEach(function (b) {
        b.setAttribute("aria-pressed", (b.getAttribute("data-livello") || "") === livello ? "true" : "false");
      });
      righe.forEach(function (r) {
        var vis = !livello || r.getAttribute("data-livello") === livello;
        r.hidden = !vis;
        if (vis) visibili++;
      });
      gruppiHome.forEach(function (g) { g.hidden = !g.querySelector(".duello:not([hidden])"); });
      conteggio.textContent = livello ? (visibili === 1 ? "1 articolo" : visibili + " articoli") : "";
      try {
        if (livello) localStorage.setItem("controtesi-livello", livello);
        else localStorage.removeItem("controtesi-livello");
      } catch (e) { /* preferenza non salvata */ }
    };
    filtro.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("button") : null;
      if (b) applicaFiltro(b.getAttribute("data-livello") || "");
    });
    var salvato = null;
    try { salvato = localStorage.getItem("controtesi-livello"); } catch (e) { salvato = null; }
    if (salvato && filtro.querySelector('[data-livello="' + salvato + '"]')) applicaFiltro(salvato);
  }

  /* ----- Ricerca ----- */
  var dialogo = document.querySelector(".ricerca");
  var bottoneCerca = document.querySelector(".cerca");
  if (dialogo && bottoneCerca && typeof dialogo.showModal === "function") {
    bottoneCerca.hidden = false;
    var campo = dialogo.querySelector("#ricerca-campo");
    var lista = dialogo.querySelector(".ricerca-risultati");
    var stato = dialogo.querySelector(".ricerca-stato");
    var indice = null, inCaricamento = false;

    // Minuscole e senza accenti, carattere per carattere: la lunghezza resta uguale,
    // così le posizioni trovate valgono anche nel testo originale.
    var normalizza = function (s) {
      var out = "";
      for (var k = 0; k < s.length; k++) out += s.charAt(k).normalize("NFD").charAt(0).toLowerCase().charAt(0);
      return out;
    };
    var escHtml = function (s) {
      return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    };
    var prepara = function (a) {
      return { a: a, t: normalizza(a.t), te: normalizza(a.te), so: normalizza(a.so), se: normalizza(a.se), x: normalizza(a.x) };
    };
    var carica = function (poi) {
      if (indice) { poi(); return; }
      if (inCaricamento) return;
      inCaricamento = true;
      stato.textContent = "Carico l'indice…";
      var script = document.createElement("script");
      script.src = "assets/js/indice-ricerca.js";
      script.onload = function () {
        indice = (window.CONTROTESI_INDICE || []).map(prepara);
        stato.textContent = "";
        poi();
      };
      script.onerror = function () { inCaricamento = false; stato.textContent = "La ricerca non è disponibile in questo momento."; };
      document.head.appendChild(script);
    };
    // Un termine conta solo all'inizio di una parola: "cina" trova "Cina", non "vicina";
    // "obbligaz" trova "obbligazioni" mentre si scrive.
    var lettera = /[a-z0-9]/;
    var trova = function (testo, t, da) {
      var i = testo.indexOf(t, da);
      while (i > 0 && lettera.test(testo.charAt(i - 1))) i = testo.indexOf(t, i + 1);
      return i;
    };
    var conta = function (testo, t) {
      var n = 0, i = trova(testo, t, 0);
      while (i >= 0 && n < 10) { n++; i = trova(testo, t, i + t.length); }
      return n;
    };
    // Evidenzia i termini in un testo, usando le posizioni trovate nella versione normalizzata.
    var evidenzia = function (originale, normale, termini) {
      var segni = [];
      termini.forEach(function (t) {
        var i = trova(normale, t, 0);
        while (i >= 0) { segni.push([i, i + t.length]); i = trova(normale, t, i + t.length); }
      });
      segni.sort(function (a, b) { return a[0] - b[0]; });
      var out = "", pos = 0;
      segni.forEach(function (m) {
        if (m[0] < pos) return;
        out += escHtml(originale.slice(pos, m[0])) + "<mark>" + escHtml(originale.slice(m[0], m[1])) + "</mark>";
        pos = m[1];
      });
      return out + escHtml(originale.slice(pos));
    };
    var estratto = function (v, termini) {
      var primo = -1;
      termini.forEach(function (t) {
        var i = trova(v.x, t, 0);
        if (i >= 0 && (primo < 0 || i < primo)) primo = i;
      });
      if (primo < 0) return evidenzia(v.a.so, v.so, termini);
      var inizio = Math.max(0, primo - 70);
      if (inizio > 0) inizio = v.a.x.indexOf(" ", inizio) + 1;
      var fine = Math.min(v.a.x.length, inizio + 200);
      var spazio = v.a.x.lastIndexOf(" ", fine);
      if (fine < v.a.x.length && spazio > primo) fine = spazio;
      return (inizio > 0 ? "… " : "") + evidenzia(v.a.x.slice(inizio, fine), v.x.slice(inizio, fine), termini) +
        (fine < v.a.x.length ? " …" : "");
    };
    var cerca = function () {
      var q = campo.value.trim();
      var termini = normalizza(q).split(/[^a-z0-9%]+/).filter(function (t) { return t.length > 1; });
      lista.innerHTML = "";
      if (!termini.length) { stato.textContent = ""; return; }
      var trovati = [];
      indice.forEach(function (v) {
        var punti = 0, tutti = true;
        termini.forEach(function (t) {
          var p = conta(v.t, t) * 12 + conta(v.te, t) * 6 + conta(v.so, t) * 4 + conta(v.se, t) * 3 + conta(v.x, t);
          if (!p) tutti = false;
          punti += p;
        });
        if (tutti) trovati.push({ v: v, punti: punti });
      });
      trovati.sort(function (a, b) { return b.punti - a.punti; });
      stato.textContent = trovati.length
        ? (trovati.length === 1 ? "1 articolo" : trovati.length + " articoli")
        : "Nessun articolo contiene «" + q + "».";
      trovati.slice(0, 20).forEach(function (r) {
        var v = r.v, li = document.createElement("li");
        li.innerHTML = '<a href="' + v.a.s + '.html">' +
          '<span class="ricerca-titolo">' + evidenzia(v.a.t, v.t, termini) + "</span>" +
          '<span class="ricerca-meta">' + escHtml(v.a.g) + " · " + escHtml(v.a.l) + "</span>" +
          '<span class="ricerca-estratto">' + estratto(v, termini) + "</span></a>";
        lista.appendChild(li);
      });
    };
    var attesaRicerca;
    campo.addEventListener("input", function () {
      clearTimeout(attesaRicerca);
      attesaRicerca = setTimeout(function () { if (indice) cerca(); }, 80);
    });
    dialogo.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      var primo = lista.querySelector("a");
      if (primo) primo.click();
    });
    var apri = function () {
      if (!dialogo.open) dialogo.showModal();
      campo.focus();
      campo.select();
      carica(function () { if (campo.value.trim()) cerca(); });
    };
    bottoneCerca.addEventListener("click", apri);
    dialogo.querySelector(".ricerca-chiudi").addEventListener("click", function () { dialogo.close(); });
    // Un clic sullo sfondo, fuori dal riquadro, chiude la ricerca.
    dialogo.addEventListener("click", function (e) { if (e.target === dialogo) dialogo.close(); });
    // Frecce su e giù per muoversi tra campo e risultati.
    dialogo.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      var link = Array.prototype.slice.call(lista.querySelectorAll("a"));
      if (!link.length) return;
      var i = link.indexOf(document.activeElement);
      e.preventDefault();
      if (e.key === "ArrowDown") (i < 0 ? link[0] : link[Math.min(i + 1, link.length - 1)]).focus();
      else if (i <= 0) campo.focus();
      else link[i - 1].focus();
    });
    // "/" oppure Ctrl+K (Cmd+K su Mac) aprono la ricerca da qualunque pagina.
    document.addEventListener("keydown", function (e) {
      var t = e.target, scrive = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if ((e.key === "/" && !scrive) || ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K"))) {
        e.preventDefault();
        apri();
      }
    });
  }
})();
