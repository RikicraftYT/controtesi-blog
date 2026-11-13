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
  /* ----- Motore di ricerca, comune alla finestra "Cerca" e alla home ----- */
  var Motore = (function () {
    var indice = null, inAttesa = [], inCaricamento = false;
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
    var termini = function (q) {
      return normalizza(q.trim()).split(/[^a-z0-9%]+/).filter(function (t) { return t.length > 1; });
    };
    var carica = function (poi, errore) {
      if (indice) { poi(); return; }
      inAttesa.push(poi);
      if (inCaricamento) return;
      inCaricamento = true;
      var script = document.createElement("script");
      script.src = "assets/js/indice-ricerca.js";
      script.onload = function () {
        indice = (window.CONTROTESI_INDICE || []).map(function (a) {
          return { a: a, t: normalizza(a.t), te: normalizza(a.te), so: normalizza(a.so),
            se: normalizza(a.se), tg: normalizza(a.tg || ""), x: normalizza(a.x) };
        });
        var lista = inAttesa; inAttesa = [];
        lista.forEach(function (f) { f(); });
      };
      script.onerror = function () { inCaricamento = false; inAttesa = []; if (errore) errore(); };
      document.head.appendChild(script);
    };
    // Articoli che contengono tutti i termini, con un punteggio: titolo e tag pesano di più.
    var cerca = function (ts) {
      var trovati = [];
      indice.forEach(function (v) {
        var punti = 0, tutti = true;
        ts.forEach(function (t) {
          var p = conta(v.t, t) * 12 + conta(v.tg, t) * 8 + conta(v.te, t) * 6 + conta(v.so, t) * 4 + conta(v.se, t) * 3 + conta(v.x, t);
          if (!p) tutti = false;
          punti += p;
        });
        if (tutti) trovati.push({ v: v, punti: punti });
      });
      return trovati.sort(function (a, b) { return b.punti - a.punti; });
    };
    var evidenzia = function (originale, normale, ts) {
      var segni = [];
      ts.forEach(function (t) {
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
    var estratto = function (v, ts) {
      var primo = -1;
      ts.forEach(function (t) {
        var i = trova(v.x, t, 0);
        if (i >= 0 && (primo < 0 || i < primo)) primo = i;
      });
      if (primo < 0) return evidenzia(v.a.so, v.so, ts);
      var inizio = Math.max(0, primo - 70);
      if (inizio > 0) inizio = v.a.x.indexOf(" ", inizio) + 1;
      var fine = Math.min(v.a.x.length, inizio + 200);
      var spazio = v.a.x.lastIndexOf(" ", fine);
      if (fine < v.a.x.length && spazio > primo) fine = spazio;
      return (inizio > 0 ? "… " : "") + evidenzia(v.a.x.slice(inizio, fine), v.x.slice(inizio, fine), ts) +
        (fine < v.a.x.length ? " …" : "");
    };
    return { normalizza: normalizza, escHtml: escHtml, termini: termini, carica: carica, cerca: cerca,
      evidenzia: evidenzia, estratto: estratto, pronto: function () { return !!indice; } };
  })();

  /* ----- Finestra "Cerca" ----- */
  var dialogo = document.querySelector(".ricerca");
  var bottoneCerca = document.querySelector(".cerca");
  if (dialogo && bottoneCerca && typeof dialogo.showModal === "function") {
    bottoneCerca.hidden = false;
    var campo = dialogo.querySelector("#ricerca-campo");
    var lista = dialogo.querySelector(".ricerca-risultati");
    var stato = dialogo.querySelector(".ricerca-stato");
    var tutti = dialogo.querySelector(".ricerca-tutti");

    var cercaDialogo = function () {
      var q = campo.value.trim(), ts = Motore.termini(q);
      lista.innerHTML = "";
      tutti.hidden = !ts.length;
      tutti.href = "index.html?q=" + encodeURIComponent(q) + "#articoli";
      if (!ts.length) { stato.textContent = ""; return; }
      var trovati = Motore.cerca(ts);
      stato.textContent = trovati.length
        ? (trovati.length === 1 ? "1 articolo" : trovati.length + " articoli")
        : "Nessun articolo contiene «" + q + "».";
      trovati.slice(0, 8).forEach(function (r) {
        var v = r.v, li = document.createElement("li");
        li.innerHTML = '<a href="' + v.a.s + '.html">' +
          '<span class="ricerca-titolo">' + Motore.evidenzia(v.a.t, v.t, ts) + "</span>" +
          '<span class="ricerca-meta">' + Motore.escHtml(v.a.g) + " · " + Motore.escHtml(v.a.l) + "</span>" +
          '<span class="ricerca-estratto">' + Motore.estratto(v, ts) + "</span></a>";
        lista.appendChild(li);
      });
    };
    var attesaRicerca;
    campo.addEventListener("input", function () {
      clearTimeout(attesaRicerca);
      attesaRicerca = setTimeout(function () { if (Motore.pronto()) cercaDialogo(); }, 80);
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
      if (!Motore.pronto()) stato.textContent = "Carico l'indice…";
      Motore.carica(function () { stato.textContent = ""; if (campo.value.trim()) cercaDialogo(); },
        function () { stato.textContent = "La ricerca non è disponibile in questo momento."; });
    };
    bottoneCerca.addEventListener("click", apri);
    dialogo.querySelector(".ricerca-chiudi").addEventListener("click", function () { dialogo.close(); });
    // Un clic sullo sfondo, fuori dal riquadro, chiude la ricerca.
    dialogo.addEventListener("click", function (e) { if (e.target === dialogo) dialogo.close(); });
    // Frecce su e giù per muoversi tra campo e risultati.
    dialogo.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      var link = Array.prototype.slice.call(dialogo.querySelectorAll(".ricerca-risultati a, .ricerca-tutti:not([hidden])"));
      if (!link.length) return;
      var i = link.indexOf(document.activeElement);
      e.preventDefault();
      if (e.key === "ArrowDown") (i < 0 ? link[0] : link[Math.min(i + 1, link.length - 1)]).focus();
      else if (i <= 0) campo.focus();
      else link[i - 1].focus();
    });
    // "/" oppure Ctrl+K (Cmd+K su Mac) aprono la ricerca da qualunque pagina.
    document.addEventListener("keydown", function (e) {
      var t = e.target, scrive = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable);
      if ((e.key === "/" && !scrive) || ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K"))) {
        e.preventDefault();
        apri();
      }
    });
  }

  /* ----- Home: esplora gli articoli (ricerca, filtri, ordinamento) ----- */
  var esplora = document.querySelector(".esplora");
  if (esplora) {
    var PER_PAGINA = 12;
    var schede = Array.prototype.slice.call(esplora.querySelectorAll(".scheda"));
    var griglia = esplora.querySelector(".esplora-griglia");
    var campoE = esplora.querySelector("#esplora-campo");
    var ordineE = esplora.querySelector("#esplora-ordine");
    var attivi = esplora.querySelector(".esplora-attivi");
    var conteggioE = esplora.querySelector(".esplora-conteggio");
    var vuoto = esplora.querySelector(".esplora-vuoto");
    var altri = esplora.querySelector(".esplora-altri button");
    var menu = Array.prototype.slice.call(esplora.querySelectorAll(".filtro-menu"));
    var NOMI = { tema: "Tema", livello: "Livello", tag: "Tag" };
    var mostrati = PER_PAGINA, ordineScelto = false;
    esplora.querySelector(".esplora-ricerca").hidden = false;
    esplora.querySelector(".esplora-filtri").hidden = false;

    var dati = schede.map(function (el) {
      return {
        el: el, slug: el.getAttribute("data-slug"), tema: el.getAttribute("data-gruppo"),
        livello: el.getAttribute("data-livello"), tag: el.getAttribute("data-tag").split("|"),
        ordine: Number(el.getAttribute("data-ordine")), data: el.getAttribute("data-data"),
        minuti: Number(el.getAttribute("data-minuti")),
        testo: Motore.normalizza(el.querySelector(".scheda-titolo").textContent + " " +
          el.querySelector(".scheda-sommario").textContent + " " + el.getAttribute("data-tag").replace(/\|/g, " "))
      };
    });
    var scelti = function (nome) {
      return Array.prototype.slice.call(esplora.querySelectorAll('input[name="' + nome + '"]:checked'))
        .map(function (i) { return i.value; });
    };
    var etichetta = function (nome, valore) {
      var i = esplora.querySelector('input[name="' + nome + '"][value="' + CSS.escape(valore) + '"]');
      return i ? i.parentNode.querySelector("span").textContent : valore;
    };
    var passa = function (d, filtri, salta) {
      return Object.keys(filtri).every(function (nome) {
        if (nome === salta || !filtri[nome].length) return true;
        if (nome === "tag") return filtri.tag.some(function (t) { return d.tag.indexOf(t) >= 0; });
        return filtri[nome].indexOf(d[nome]) >= 0;
      });
    };

    var aggiorna = function (daUtente) {
      var q = campoE.value.trim(), ts = Motore.termini(q);
      var filtri = { tema: scelti("tema"), livello: scelti("livello"), tag: scelti("tag") };
      // Con una ricerca in corso l'ordine passa a "Rilevanza", se non l'ha scelto chi legge.
      if (!ordineScelto) ordineE.value = ts.length ? "rilevanza" : "percorso";
      var punti = {};
      if (ts.length) {
        if (Motore.pronto()) Motore.cerca(ts).forEach(function (r) { punti[r.v.a.s] = r.punti; });
        else {
          dati.forEach(function (d) {
            if (ts.every(function (t) { return d.testo.indexOf(t) >= 0; })) punti[d.slug] = 1;
          });
          Motore.carica(function () { aggiorna(false); });
        }
      }
      var trovaQ = function (d) { return !ts.length || punti[d.slug] > 0; };
      var visibili = dati.filter(function (d) { return trovaQ(d) && passa(d, filtri); });
      var o = ordineE.value;
      visibili.sort(function (a, b) {
        if (o === "rilevanza" && ts.length) return (punti[b.slug] - punti[a.slug]) || (a.ordine - b.ordine);
        if (o === "recenti") return (b.data < a.data ? -1 : b.data > a.data ? 1 : 0) || (a.ordine - b.ordine);
        if (o === "brevi") return (a.minuti - b.minuti) || (a.ordine - b.ordine);
        return a.ordine - b.ordine;
      });
      // Conteggi accanto a ogni voce: quanti articoli avresti scegliendola, con gli altri filtri attivi.
      menu.forEach(function (m) {
        var nome = m.getAttribute("data-filtro");
        m.querySelectorAll("label").forEach(function (l) {
          var v = l.querySelector("input").value;
          var n = dati.filter(function (d) {
            if (!trovaQ(d) || !passa(d, filtri, nome)) return false;
            return nome === "tag" ? d.tag.indexOf(v) >= 0 : d[nome] === v;
          }).length;
          l.querySelector(".filtro-conta").textContent = n;
          l.classList.toggle("filtro-zero", n === 0 && !l.querySelector("input").checked);
        });
        var k = filtri[nome].length;
        m.querySelector(".filtro-quanti").textContent = k ? "(" + k + ")" : "";
        m.classList.toggle("filtro-attivo", k > 0);
      });
      // Etichette dei filtri attivi, rimovibili una per una.
      attivi.innerHTML = "";
      var nAttivi = 0;
      if (q) {
        nAttivi++;
        attivi.insertAdjacentHTML("beforeend", '<button type="button" data-togli="q">«' + Motore.escHtml(q) +
          '» <span aria-hidden="true">×</span><span class="visivamente-nascosto">, togli la ricerca</span></button>');
      }
      Object.keys(filtri).forEach(function (nome) {
        filtri[nome].forEach(function (v) {
          nAttivi++;
          attivi.insertAdjacentHTML("beforeend", '<button type="button" data-togli="' + nome + '" data-valore="' +
            Motore.escHtml(v) + '"><span class="attivo-tipo">' + NOMI[nome] + ":</span> " + Motore.escHtml(etichetta(nome, v)) +
            ' <span aria-hidden="true">×</span><span class="visivamente-nascosto">, togli il filtro</span></button>');
        });
      });
      if (nAttivi) attivi.insertAdjacentHTML("beforeend", '<button type="button" class="attivi-azzera" data-togli="tutto">Cancella filtri</button>');
      attivi.hidden = !nAttivi;
      // Griglia: ordine nuovo, e solo le prime schede fino a "Mostra altri".
      if (daUtente) mostrati = PER_PAGINA;
      dati.forEach(function (d) { d.el.hidden = true; });
      visibili.forEach(function (d, k) { griglia.appendChild(d.el); d.el.hidden = k >= mostrati; });
      var resto = visibili.length - mostrati;
      altri.hidden = resto <= 0;
      altri.textContent = resto <= PER_PAGINA ? (resto === 1 ? "Mostra l'ultimo articolo" : "Mostra gli ultimi " + resto) : "Mostra altri " + PER_PAGINA + " (ne restano " + resto + ")";
      conteggioE.textContent = visibili.length === 1 ? "1 articolo" : visibili.length + " articoli";
      vuoto.hidden = visibili.length > 0;
      // Lo stato finisce nell'indirizzo, così una ricerca o un filtro si possono condividere.
      var par = new URLSearchParams();
      if (q) par.set("q", q);
      Object.keys(filtri).forEach(function (nome) { if (filtri[nome].length) par.set(nome, filtri[nome].join(",")); });
      if (ordineScelto && o !== "percorso") par.set("ordine", o);
      var cerca = par.toString();
      try { history.replaceState(null, "", location.pathname + (cerca ? "?" + cerca : "") + location.hash); } catch (e) { /* file:// */ }
    };

    // Stato iniziale dall'indirizzo (?q=, ?tema=, ?livello=, ?tag=, ?ordine=).
    var par = new URLSearchParams(location.search);
    campoE.value = par.get("q") || "";
    ["tema", "livello", "tag"].forEach(function (nome) {
      (par.get(nome) || "").split(",").filter(Boolean).forEach(function (v) {
        var i = esplora.querySelector('input[name="' + nome + '"][value="' + CSS.escape(v) + '"]');
        if (i) i.checked = true;
      });
    });
    if (par.get("ordine") && ordineE.querySelector('option[value="' + par.get("ordine") + '"]')) {
      ordineE.value = par.get("ordine"); ordineScelto = true;
    }
    aggiorna(true);

    var attesaE;
    campoE.addEventListener("input", function () {
      clearTimeout(attesaE);
      attesaE = setTimeout(function () { aggiorna(true); }, 120);
    });
    esplora.querySelector(".esplora-ricerca").addEventListener("submit", function (e) { e.preventDefault(); campoE.blur(); });
    esplora.addEventListener("change", function (e) {
      if (e.target === ordineE) ordineScelto = true;
      if (e.target.name || e.target === ordineE) aggiorna(true);
    });
    altri.addEventListener("click", function () {
      var primoNuovo = mostrati;
      mostrati += PER_PAGINA;
      aggiorna(false);
      var visibiliOra = griglia.querySelectorAll(".scheda:not([hidden])");
      if (visibiliOra[primoNuovo]) visibiliOra[primoNuovo].querySelector("a").focus();
    });
    var azzera = function () {
      campoE.value = "";
      esplora.querySelectorAll(".filtro-menu input:checked").forEach(function (i) { i.checked = false; });
      ordineScelto = false;
      aggiorna(true);
    };
    vuoto.querySelector("button").addEventListener("click", azzera);
    attivi.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      var cosa = b.getAttribute("data-togli");
      if (cosa === "tutto") { azzera(); return; }
      if (cosa === "q") campoE.value = "";
      else {
        var i = esplora.querySelector('input[name="' + cosa + '"][value="' + CSS.escape(b.getAttribute("data-valore")) + '"]');
        if (i) i.checked = false;
      }
      aggiorna(true);
    });
    // Un clic su un tag di una scheda filtra per quel tag, senza ricaricare la pagina.
    griglia.addEventListener("click", function (e) {
      var a = e.target.closest(".scheda-tag a");
      if (!a) return;
      e.preventDefault();
      var i = esplora.querySelector('input[name="tag"][value="' + CSS.escape(a.getAttribute("data-tag")) + '"]');
      if (i) { i.checked = true; aggiorna(true); esplora.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
    // Un solo menu aperto alla volta; si chiudono con un clic fuori o con Esc.
    menu.forEach(function (m) {
      m.addEventListener("toggle", function () {
        if (m.open) menu.forEach(function (altro) { if (altro !== m) altro.open = false; });
      });
    });
    document.addEventListener("click", function (e) {
      menu.forEach(function (m) { if (m.open && !m.contains(e.target)) m.open = false; });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      menu.forEach(function (m) { if (m.open) { m.open = false; m.querySelector("summary").focus(); } });
    });
  }
  /* ----- Grafici: tooltip su barre e punti (mouse, tocco e tastiera) ----- */
  if (document.querySelector(".grafico")) {
    var tip = document.createElement("div");
    tip.className = "grafico-tip";
    tip.hidden = true;
    tip.setAttribute("role", "status");
    document.body.appendChild(tip);
    var posiziona = function (x, y) {
      var w = tip.offsetWidth, h = tip.offsetHeight;
      var left = Math.min(window.innerWidth - w - 8, Math.max(8, x - w / 2));
      var top = y - h - 12 < 8 ? y + 18 : y - h - 12;
      tip.style.left = left + "px";
      tip.style.top = top + "px";
    };
    var mostra = function (el, x, y) {
      tip.textContent = el.getAttribute("data-tip");
      tip.hidden = false;
      if (x === undefined) { var r = el.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top; }
      posiziona(x, y);
    };
    var nascondi = function () { tip.hidden = true; };
    var bersaglio = function (e) { return e.target.closest ? e.target.closest(".grafico [data-tip]") : null; };
    document.addEventListener("pointerover", function (e) { var el = bersaglio(e); if (el) mostra(el, e.clientX, e.clientY); });
    document.addEventListener("pointermove", function (e) { if (!tip.hidden && bersaglio(e)) posiziona(e.clientX, e.clientY); });
    document.addEventListener("pointerout", function (e) { if (bersaglio(e)) nascondi(); });
    document.addEventListener("focusin", function (e) { var el = bersaglio(e); if (el) mostra(el); else nascondi(); });
    document.addEventListener("focusout", function (e) { if (bersaglio(e)) nascondi(); });
    window.addEventListener("scroll", nascondi, { passive: true });
  }

  /* ----- Grafici interattivi: interesse composto, valore temporale, FIRE ----- */
  var interattivi = document.querySelectorAll(".grafico[data-interattivo]");
  if (interattivi.length && window.ControtesiFormule) {
    var NS2 = "http://www.w3.org/2000/svg";
    var nodo = function (nome, attr, testo) {
      var n = document.createElementNS(NS2, nome);
      for (var k in attr) n.setAttribute(k, attr[k]);
      if (testo !== undefined) n.textContent = testo;
      return n;
    };
    // Numeri, tacche, Black-Scholes e FIRE vengono da formule.js, lo stesso file usato dalla build.
    var F = window.ControtesiFormule;
    var num = F.numero, tacche = F.tacche;
    var bsCall = function (S, K, T, r, s) { return F.blackScholes({ S: S, K: K, T: T, r: r, sigma: s }); };
    // Disegna un grafico a linee alla larghezza reale del contenitore.
    var disegnaLinee = function (cont, o) {
      var W = Math.max(280, Math.round(cont.clientWidth)), stretto = W < 480;
      var H = stretto ? Math.round(W * 0.78) : 320;
      var fy = o.y.fmt, fx = o.x.fmt;
      var sinistra = Math.max.apply(null, tacche(o.y.min, o.y.max, 5).map(function (v) { return fy(v).length * 7.1; })) + 14;
      // legenda su più righe se non entra
      var righeLeg = 1, cx = 0;
      o.serie.forEach(function (s) { var w = 26 + s.nome.length * 6.9 + 18; if (cx + w > W && cx > 0) { righeLeg++; cx = 0; } cx += w; });
      var legH = righeLeg * 18 + 4;
      H += legH - 22;
      var x0 = sinistra, x1 = W - 12, y1 = legH + 16, y0 = H - 40;
      var sx = function (v) { return x0 + (v - o.x.min) / (o.x.max - o.x.min) * (x1 - x0); };
      var sy = function (v) { return y0 - (Math.max(o.y.min, Math.min(o.y.max, v)) - o.y.min) / (o.y.max - o.y.min) * (y0 - y1); };
      var svg = nodo("svg", { viewBox: "0 0 " + W + " " + H, "class": "grafico-svg", role: "img", "aria-label": o.titolo });
      var lx = 0, ly = 10;
      o.serie.forEach(function (s) {
        var w = 26 + s.nome.length * 6.9 + 18;
        if (lx + w > W && lx > 0) { lx = 0; ly += 18; }
        svg.appendChild(nodo("line", { x1: lx, x2: lx + 20, y1: ly, y2: ly, "class": "g-linea g-s" + s.colore + (s.tratteggio ? " g-tratteggio" : "") }));
        svg.appendChild(nodo("text", { x: lx + 26, y: ly + 4, "class": "g-etichetta" }, s.nome));
        lx += w;
      });
      tacche(o.y.min, o.y.max, 5).forEach(function (v) {
        svg.appendChild(nodo("line", { x1: x0, x2: x1, y1: sy(v), y2: sy(v), "class": "g-griglia" + (v === 0 ? " g-zero" : "") }));
        svg.appendChild(nodo("text", { x: x0 - 6, y: sy(v) + 4, "text-anchor": "end", "class": "g-asse" }, fy(v)));
      });
      tacche(o.x.min, o.x.max, stretto ? 4 : 6).forEach(function (v) {
        svg.appendChild(nodo("text", { x: sx(v), y: y0 + 18, "text-anchor": "middle", "class": "g-asse" }, fx(v)));
      });
      svg.appendChild(nodo("text", { x: x1, y: y0 + 34, "text-anchor": "end", "class": "g-asse g-titolo-asse" }, o.x.etichetta));
      svg.appendChild(nodo("text", { x: x0 - 6, y: y1 - 8, "class": "g-asse g-titolo-asse" }, o.y.etichetta));
      o.serie.forEach(function (s) {
        var d = "";
        for (var k = 0; k <= 160; k++) {
          var xv = o.x.min + (o.x.max - o.x.min) * k / 160;
          d += (k ? "L" : "M") + sx(xv).toFixed(1) + "," + sy(s.f(xv)).toFixed(1);
        }
        svg.appendChild(nodo("path", { d: d, "class": "g-linea g-s" + s.colore + (s.tratteggio ? " g-tratteggio" : "") }));
      });
      (o.punti || []).forEach(function (p) {
        svg.appendChild(nodo("circle", { cx: sx(p.x), cy: sy(p.y), r: 5, "class": "g-punto g-evidenza g-s" + p.colore, tabindex: 0, "data-tip": p.tip }));
      });
      cont.innerHTML = "";
      cont.appendChild(svg);
    };

    var MODELLI = {
      interesse: {
        cursori: [
          { id: "r", nome: "Rendimento annuo", min: 0, max: 10, passo: 0.5, val: 5, fmt: function (v) { return num(v, 1) + "%"; } },
          { id: "anni", nome: "Anni", min: 5, max: 50, passo: 1, val: 40, fmt: function (v) { return num(v); } }
        ],
        disegna: function (p, cont, esito) {
          var r = p.r / 100, c0 = 10000, comp = function (t) { return F.composto(c0, r, t); };
          var fin = comp(p.anni), semp = F.semplice(c0, r, p.anni);
          disegnaLinee(cont, {
            titolo: "10.000 € investiti per " + p.anni + " anni al " + num(p.r, 1) + "%",
            x: { min: 0, max: p.anni, etichetta: "anni", fmt: function (v) { return num(v); } },
            y: { min: 0, max: Math.max(12000, fin * 1.05), etichetta: "euro", fmt: function (v) { return num(v); } },
            serie: [
              { nome: "Interesse composto", colore: 1, f: comp },
              { nome: "Interesse semplice", colore: 3, tratteggio: true, f: function (t) { return F.semplice(c0, r, t); } },
              { nome: "Capitale versato", colore: 4, tratteggio: true, f: function () { return c0; } }
            ],
            punti: [{ x: p.anni, y: fin, colore: 1, tip: "Dopo " + p.anni + " anni: " + num(fin) + " €" }]
          });
          esito.textContent = "Dopo " + p.anni + " anni: " + num(fin) + " € con l'interesse composto, " + num(semp) +
            " € con quello semplice. La differenza, " + num(fin - semp) + " €, è fatta di guadagni sui guadagni.";
        }
      },
      opzione: {
        cursori: [
          { id: "giorni", nome: "Giorni alla scadenza", min: 1, max: 180, passo: 1, val: 60, fmt: function (v) { return num(v); } },
          { id: "vol", nome: "Volatilità", min: 10, max: 60, passo: 1, val: 30, fmt: function (v) { return num(v) + "%"; } }
        ],
        disegna: function (p, cont, esito) {
          var T = p.giorni / 365, s = p.vol / 100, K = 100, r = 0.03;
          var premio = function (S) { return bsCall(S, K, T, r, s); };
          var a100 = premio(100), a110 = premio(110);
          disegnaLinee(cont, {
            titolo: "Premio di una call con strike 100",
            x: { min: 70, max: 130, etichetta: "prezzo dell'azione", fmt: function (v) { return num(v); } },
            y: { min: 0, max: 35, etichetta: "premio", fmt: function (v) { return num(v); } },
            serie: [
              { nome: "Premio", colore: 1, f: premio },
              { nome: "Valore intrinseco", colore: 2, tratteggio: true, f: function (S) { return Math.max(S - K, 0); } }
            ],
            punti: [
              { x: 100, y: a100, colore: 1, tip: "Azione a 100: premio " + num(a100, 2) + ", tutto valore temporale" },
              { x: 110, y: a110, colore: 1, tip: "Azione a 110: premio " + num(a110, 2) + ", di cui 10 intrinseco" }
            ]
          });
          esito.textContent = "Con l'azione a 100 la call vale " + num(a100, 2) + ", tutto valore temporale. A 110 vale " +
            num(a110, 2) + ": 10 di valore intrinseco e " + num(a110 - 10, 2) + " di valore temporale.";
        }
      },
      fire: {
        cursori: [
          { id: "r", nome: "Rendimento reale", min: 1, max: 8, passo: 0.5, val: 5, fmt: function (v) { return num(v, 1) + "%"; } },
          { id: "w", nome: "Tasso di prelievo", min: 3, max: 5, passo: 0.25, val: 4, fmt: function (v) { return num(v, 2) + "%"; } }
        ],
        disegna: function (p, cont, esito) {
          var r = p.r / 100, w = p.w / 100;
          var anni = function (sp) { return F.anniFire(r, w, sp / 100); };
          disegnaLinee(cont, {
            titolo: "Anni al traguardo secondo il tasso di risparmio",
            x: { min: 5, max: 80, etichetta: "tasso di risparmio, %", fmt: function (v) { return num(v) + "%"; } },
            y: { min: 0, max: 80, etichetta: "anni", fmt: function (v) { return num(v); } },
            serie: [{ nome: "Anni al traguardo", colore: 1, f: anni }],
            punti: [10, 25, 50, 66].map(function (sp) { return { x: sp, y: anni(sp), colore: 1, tip: "Risparmio " + sp + "%: circa " + num(anni(sp)) + " anni" }; })
          });
          esito.textContent = "Risparmiando il 25% servono circa " + num(anni(25)) + " anni; il 50%, circa " + num(anni(50)) +
            ". Il traguardo è " + num(1 / w, 1) + " volte le spese annue.";
        }
      }
    };

    interattivi.forEach(function (fig) {
      var modello = MODELLI[fig.getAttribute("data-interattivo")];
      if (!modello) return;
      var comandi = document.createElement("div");
      comandi.className = "grafico-comandi";
      var stato = {}, uscite = {};
      modello.cursori.forEach(function (c) {
        stato[c.id] = c.val;
        var id = "c-" + Math.random().toString(36).slice(2, 8);
        var l = document.createElement("label");
        l.setAttribute("for", id);
        l.innerHTML = "<span>" + c.nome + ": <output></output></span>";
        var input = document.createElement("input");
        input.type = "range"; input.id = id; input.min = c.min; input.max = c.max; input.step = c.passo; input.value = c.val;
        l.appendChild(input);
        uscite[c.id] = l.querySelector("output");
        uscite[c.id].textContent = c.fmt(c.val);
        input.addEventListener("input", function () {
          stato[c.id] = Number(input.value);
          uscite[c.id].textContent = c.fmt(stato[c.id]);
          ridisegna();
        });
        comandi.appendChild(l);
      });
      var cont = document.createElement("div");
      var esito = document.createElement("p");
      esito.className = "grafico-esito";
      esito.setAttribute("aria-live", "polite");
      // La versione statica (per chi non ha JavaScript) lascia il posto a quella interattiva.
      fig.querySelectorAll(".grafico-largo, .grafico-stretto").forEach(function (d) { d.hidden = true; });
      var titolo = fig.querySelector(".grafico-titolo");
      titolo.parentNode.insertBefore(comandi, titolo.nextSibling);
      comandi.parentNode.insertBefore(cont, comandi.nextSibling);
      cont.parentNode.insertBefore(esito, cont.nextSibling);
      var ridisegna = function () { modello.disegna(stato, cont, esito); };
      ridisegna();
      var larghezza = cont.clientWidth, attesaG;
      window.addEventListener("resize", function () {
        clearTimeout(attesaG);
        attesaG = setTimeout(function () { if (Math.abs(cont.clientWidth - larghezza) > 8) { larghezza = cont.clientWidth; ridisegna(); } }, 150);
      });
    });
  }
})();
