(function () {
  "use strict";
  var ITEMS = window.ITEMS, SECTIONS = window.SECTIONS, META = window.MENU_META, CUSTOM = window.CUSTOM, FAQ = window.FAQ;

  /* ---------- i18n ---------- */
  var T = {
    ar: {
      title: "دليل المنيو", subtitle: "للرد السريع على أسئلة العملاء",
      searchPh: "ابحث بالاسم أو بالمكوّن (كراميل، مارشميلو، سنيكرز…)",
      footNote: "أي معلومة مش مكتوبة في المنيو (حساسية، سعرات، مكونات إضافية) ارجع فيها للمسؤول قبل ما ترد على العميل.",
      all: "الكل", coffee: "فيه قهوة", nocoffee: "بدون قهوة", hot: "ساخن", iced: "مثلج", blended: "ممزوج", smoothie: "سموزي",
      serveLbl: "النوع:", coffeeLbl: "القهوة:", quickLbl: "مكوّنات شائعة:",
      items: "صنف", none: "مفيش نتايج — جرّب كلمة تانية أو امسح الفلاتر.",
      ingredients: "المكونات", description: "الوصف", prices: "الأسعار (شامل الضريبة)", flavors: "النكهات المتاحة", egp: "ج",
      free: "(مجاني)", copyAr: "نسخ الرد (عربي)", copyEn: "Copy reply (EN)", copyCust: "نسخ الإضافات والأسعار",
      warn: "المنيو مفيهوش بيانات عن الحساسية أو السعرات — لو العميل سأل، ارجع للمسؤول.",
      copied: "تم النسخ ✓", close: "إغلاق", faq: "إجابات سريعة", custom: "شكلها على حسب رغبتك",
      hello: "أهلاً بحضرتك ☕", ingLbl: "المكونات", priceLbl: "الأسعار", flavLbl: "النكهات", vat: "الأسعار بالجنيه المصري وشاملة الضريبة.",
      customHint: "الإضافات والسيرب واللبن البديل بالأسعار الموضحة"
    },
    en: {
      title: "Menu Guide", subtitle: "Quick answers for customer questions",
      searchPh: "Search by name or ingredient (caramel, marshmallow, Snickers…)",
      footNote: "For anything not on the menu (allergens, calories, extra ingredients) check with your supervisor before replying.",
      all: "All", coffee: "Has coffee", nocoffee: "Coffee-free", hot: "Hot", iced: "Iced", blended: "Blended", smoothie: "Smoothie",
      serveLbl: "Type:", coffeeLbl: "Coffee:", quickLbl: "Popular ingredients:",
      items: "items", none: "No results — try another word or clear the filters.",
      ingredients: "Ingredients", description: "Description", prices: "Prices (incl. VAT)", flavors: "Available flavours", egp: "EGP",
      free: "(free)", copyAr: "نسخ الرد (عربي)", copyEn: "Copy reply (EN)", copyCust: "Copy add-ons & prices",
      warn: "The menu has no allergen or calorie data — check with your supervisor if asked.",
      copied: "Copied ✓", close: "Close", faq: "Quick answers", custom: "Make it your own",
      hello: "Hello! ☕", ingLbl: "Ingredients", priceLbl: "Prices", flavLbl: "Flavours", vat: "Prices are in EGP and include VAT.",
      customHint: "Add-ons, syrups and alternative milk at the prices shown"
    }
  };
  var QUICK = [
    { ar: "كراميل", en: "caramel" }, { ar: "شوكولاتة", en: "chocolate" }, { ar: "مارشميلو", en: "marshmallow" },
    { ar: "سنيكرز", en: "snickers" }, { ar: "نعناع", en: "mint" }, { ar: "فانيليا", en: "vanilla" },
    { ar: "زبادي", en: "yogurt" }, { ar: "كب كيك", en: "cupcake" }, { ar: "لبن", en: "milk" }
  ];

  var state = { lang: safeGet("lang") || "ar", q: "", coffee: "all", serve: "all", section: "all" };
  function t(k) { return T[state.lang][k]; }
  function pick(o, base) { return base ? o[base + (state.lang === "ar" ? "Ar" : "En")] : o[state.lang]; }
  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ---------- search normalisation (Arabic-aware) ---------- */
  function norm(s) {
    return String(s || "").toLowerCase()
      .replace(/[ً-ٰٟـ]/g, "")
      .replace(/[إأآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
      .replace(/[®™*]/g, "").replace(/\s+/g, " ").trim();
  }
  ITEMS.forEach(function (it) {
    it._hay = norm([it.en, it.ar, it.descEn, it.descAr, (it.ingEn || []).join(" "), (it.ingAr || []).join(" "),
      (it.flavorsEn || []).join(" "), (it.flavorsAr || []).join(" ")].join(" "));
  });

  function sizeLabels(it) {
    if (it.priceLabels) return it.priceLabels;
    return META.sizeLabels[it.prices.length] || META.sizeLabels[3];
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function el(id) { return document.getElementById(id); }

  /* ---------- filtering ---------- */
  function visible(it) {
    if (state.section !== "all" && it.section !== state.section) return false;
    if (state.coffee === "yes" && it.coffee !== true) return false;
    if (state.coffee === "no" && it.coffee !== false) return false;
    if (state.serve !== "all" && it.serve.indexOf(state.serve) < 0) return false;
    if (state.q) {
      var words = norm(state.q).split(" ");
      for (var i = 0; i < words.length; i++) if (it._hay.indexOf(words[i]) < 0) return false;
    }
    return true;
  }

  /* ---------- render ---------- */
  function renderStatic() {
    var d = document.documentElement;
    d.lang = state.lang; d.dir = state.lang === "ar" ? "rtl" : "ltr";
    document.title = (state.lang === "ar" ? "دليل المنيو — للموديريشن" : "Menu Guide — Moderation");
    document.querySelectorAll("[data-i18n]").forEach(function (n) { n.textContent = t(n.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (n) { n.placeholder = t(n.getAttribute("data-i18n-ph")); });
    el("langBtn").textContent = state.lang === "ar" ? "EN" : "عربي";
    el("footMeta").innerHTML = "<bdi>" + esc(META.version) + "</bdi> — " + esc(state.lang === "ar" ? META.note : t("vat"));
  }

  function chip(label, on, cls, handler) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "chip " + (cls || "") + (on ? " on" : ""); b.textContent = label;
    b.addEventListener("click", handler); return b;
  }

  function renderChips() {
    var qc = el("quickChips"); qc.innerHTML = "";
    var l = document.createElement("span"); l.className = "chip-label"; l.textContent = t("quickLbl"); qc.appendChild(l);
    QUICK.forEach(function (k) {
      var word = state.lang === "ar" ? k.ar : k.en;
      qc.appendChild(chip(word, norm(state.q) === norm(word), "q", function () {
        state.q = norm(state.q) === norm(word) ? "" : word; el("q").value = state.q; update();
      }));
    });
    var fc = el("filterChips"); fc.innerHTML = "";
    var l1 = document.createElement("span"); l1.className = "chip-label"; l1.textContent = t("coffeeLbl"); fc.appendChild(l1);
    [["all", t("all")], ["yes", t("coffee")], ["no", t("nocoffee")]].forEach(function (p) {
      fc.appendChild(chip(p[1], state.coffee === p[0], "", function () { state.coffee = p[0]; update(); }));
    });
    var l2 = document.createElement("span"); l2.className = "chip-label"; l2.textContent = t("serveLbl"); fc.appendChild(l2);
    [["all", t("all")], ["hot", t("hot")], ["iced", t("iced")], ["blended", t("blended")], ["smoothie", t("smoothie")]].forEach(function (p) {
      fc.appendChild(chip(p[1], state.serve === p[0], "", function () { state.serve = p[0]; update(); }));
    });
  }

  function renderTabs(counts) {
    var tabs = el("tabs"); tabs.innerHTML = "";
    function add(id, label, n) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "tab" + (state.section === id ? " on" : "");
      b.innerHTML = esc(label) + '<span class="n">' + n + "</span>";
      b.addEventListener("click", function () { state.section = id; update(); window.scrollTo({ top: 0, behavior: "smooth" }); });
      tabs.appendChild(b);
    }
    var total = 0; SECTIONS.forEach(function (s) { total += counts[s.id] || 0; });
    add("all", t("all"), total);
    SECTIONS.forEach(function (s) { add(s.id, pick(s, ""), counts[s.id] || 0); });
  }

  function cardHTML(it) {
    var labels = sizeLabels(it);
    var tags = "";
    if (it.coffee === true) tags += '<span class="tag coffee">☕ ' + t("coffee") + "</span>";
    if (it.coffee === false) tags += '<span class="tag nocoffee">' + t("nocoffee") + "</span>";
    it.serve.forEach(function (s) { tags += '<span class="tag">' + t(s) + "</span>"; });
    var prices = it.prices.map(function (p) { return '<span class="price">' + p + "</span>"; }).join("");
    return '<button class="card" type="button" data-id="' + it.id + '">' +
      '<div class="pic"><img loading="lazy" src="img/' + it.id + '.webp" alt="' + esc(it.en) + '" width="120" height="136"></div>' +
      "<h3>" + esc(state.lang === "ar" ? it.ar : it.en) + "</h3>" +
      '<div class="en-name">' + esc(state.lang === "ar" ? it.en : it.ar) + "</div>" +
      '<div class="tags">' + tags + "</div>" +
      '<div class="prices" title="' + esc(labels.map(function (l) { return pick(l, ""); }).join(" / ")) + '">' + prices + "</div></button>";
  }

  function renderSections() {
    var counts = {}, html = "", shown = 0;
    SECTIONS.forEach(function (s) {
      var list = ITEMS.filter(function (it) { return it.section === s.id && visible(it); });
      counts[s.id] = list.length; shown += list.length;
      if (!list.length) return;
      html += '<section class="sec" id="sec-' + s.id + '"><div class="sec-head"><h2>' + esc(s.icon + " " + (state.lang === "ar" ? s.ar : s.en)) + "</h2>" +
        '<span class="en">' + esc(state.lang === "ar" ? s.en : s.ar) + "</span>" +
        (pick(s, "sub") ? '<span class="sub">' + esc(pick(s, "sub")) + "</span>" : "") +
        '</div><div class="grid">' + list.map(cardHTML).join("") + "</div></section>";
    });
    el("sections").innerHTML = html || '<p class="empty">' + t("none") + "</p>";
    el("count").textContent = shown + " " + t("items");
    renderTabs(countsAll());
    el("sections").querySelectorAll(".card").forEach(function (c) {
      c.addEventListener("click", function () { openItem(c.getAttribute("data-id")); });
    });
  }
  // tab counts respect search + filters except section
  function countsAll() {
    var saved = state.section, c = {};
    state.section = "all";
    SECTIONS.forEach(function (s) { c[s.id] = ITEMS.filter(function (it) { return it.section === s.id && visible(it); }).length; });
    state.section = saved; return c;
  }

  function renderCustomAndFaq() {
    var showExtras = state.section === "all" && !state.q && state.coffee === "all" && state.serve === "all";
    var c = el("custom"), f = el("faq");
    c.hidden = f.hidden = !showExtras;
    if (!showExtras) return;
    c.innerHTML = "<h2>" + esc(state.lang === "ar" ? CUSTOM.titleAr : CUSTOM.titleEn) + '<span class="en">' + esc(state.lang === "ar" ? CUSTOM.titleEn : CUSTOM.titleAr) + '</span></h2><div class="opts">' +
      CUSTOM.groups.map(function (g) {
        return '<div class="opt"><h3>' + esc(state.lang === "ar" ? g.ar : g.en) + ' <span class="badge">' + g.price + " " + t("egp") + "</span></h3><ul>" +
          g.items.map(function (i) { return "<li>" + esc(state.lang === "ar" ? i.ar : i.en) + "<small>" + esc(state.lang === "ar" ? i.en : i.ar) + "</small></li>"; }).join("") + "</ul></div>";
      }).join("") + "</div>";
    f.innerHTML = "<h2>" + t("faq") + "</h2>" + FAQ.map(function (q) {
      return '<details class="q"><summary>' + esc(pick(q, "q")) + "</summary><p>" + esc(pick(q, "a")) + "</p></details>";
    }).join("");
  }

  function update() {
    el("clearQ").hidden = !state.q;
    renderChips(); renderSections(); renderCustomAndFaq();
  }

  /* ---------- item sheet ---------- */
  function openItem(id, noHash) {
    var it = ITEMS.filter(function (x) { return x.id === id; })[0]; if (!it) return;
    var labels = sizeLabels(it), ar = state.lang === "ar";
    var ing = it.ingEn.map(function (e, i) {
      return "<li>" + esc(ar ? it.ingAr[i] : e) + "<small>" + esc(ar ? e : it.ingAr[i]) + "</small></li>";
    }).join("");
    var sizes = it.prices.map(function (p, i) {
      return '<div class="size"><b>' + p + "</b><span>" + esc(pick(labels[i], "")) + "</span></div>";
    }).join("");
    var flav = it.flavorsEn ? '<div><h4>' + t("flavors") + (it.flavorFree ? '<span class="free">' + t("free") + "</span>" : "") + '</h4><div class="flavors">' +
      it.flavorsEn.map(function (e, i) { return "<span>" + esc(ar ? it.flavorsAr[i] : e) + "</span>"; }).join("") + "</div></div>" : "";
    var note = it.sizeNote ? '<div class="note">' + esc(pick(it.sizeNote, "")) + "</div>" : "";
    var sub = ar ? it.en : it.ar;
    el("sheet").innerHTML =
      '<div class="sheet-head"><img src="img/' + it.id + '.webp" alt="">' +
      '<div><h2 id="dlgTitle">' + esc(ar ? it.ar : it.en) + '</h2><div class="en-name">' + esc(sub) + "</div></div>" +
      '<button class="close" type="button" aria-label="' + t("close") + '">×</button></div>' +
      '<div class="sheet-body">' +
      "<div><h4>" + t("ingredients") + '</h4><ul class="ing">' + ing + "</ul></div>" +
      "<div><h4>" + t("description") + '</h4><p class="desc">' + esc(ar ? it.descAr : it.descEn) + '</p><p class="desc en">' + esc(ar ? it.descEn : it.descAr) + "</p></div>" +
      flav + note +
      "<div><h4>" + t("prices") + '</h4><div class="sizes">' + sizes + "</div></div>" +
      '<div class="actions"><button class="btn" data-copy="ar" type="button">' + T.ar.copyAr + '</button><button class="btn alt" data-copy="en" type="button">' + T.en.copyEn + "</button>" +
      '<button class="btn alt wide" data-copy="cust" type="button">' + t("copyCust") + "</button></div>" +
      '<p class="warn-line">' + t("warn") + "</p></div>";
    var dlg = el("dlg");
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0; el("sheet").scrollTop = 0;
    el("sheet").querySelector(".close").addEventListener("click", closeItem);
    el("sheet").querySelectorAll("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () { copy(buildReply(it, b.getAttribute("data-copy"))); });
    });
    if (!noHash) history.replaceState(null, "", "#" + id);
  }
  function closeItem() { var d = el("dlg"); if (d.open) d.close(); history.replaceState(null, "", location.pathname + location.search); }

  /* ---------- ready-to-paste replies ---------- */
  function buildReply(it, mode) {
    if (mode === "cust") {
      var ar = state.lang === "ar" ? true : false;
      var out = [ar ? "تقدر تخصّص مشروبك:" : "Make it your own:"];
      CUSTOM.groups.forEach(function (g) {
        out.push("• " + (ar ? g.ar : g.en) + " (" + g.price + " " + (ar ? "ج" : "EGP") + "): " +
          g.items.map(function (i) { return ar ? i.ar : i.en; }).join(ar ? "، " : ", "));
      });
      out.push(ar ? "الأسعار شاملة الضريبة." : "Prices include VAT.");
      return out.join("\n");
    }
    var isAr = mode === "ar", labels = sizeLabels(it);
    var name = isAr ? it.ar + " (" + it.en + ")" : it.en;
    var sep = isAr ? "، " : ", ";
    var lines = [isAr ? "أهلاً بحضرتك ☕" : "Hello! ☕",
      name,
      (isAr ? "المكونات: " : "Ingredients: ") + (isAr ? it.ingAr : it.ingEn).join(sep) + "."];
    if (it.flavorsEn) lines.push((isAr ? "النكهات: " : "Flavours: ") + (isAr ? it.flavorsAr : it.flavorsEn).join(sep) + (it.flavorFree ? (isAr ? " (اختيار النكهة مجاني)" : " (flavour choice is free)") : "") + ".");
    if (it.sizeNote) lines.push((isAr ? it.sizeNote.ar : it.sizeNote.en) + ".");
    lines.push((isAr ? "الأسعار: " : "Prices: ") + it.prices.map(function (p, i) { return (isAr ? labels[i].ar : labels[i].en) + " " + p; }).join(" | ") + (isAr ? " جنيه (شامل الضريبة)." : " EGP (incl. VAT)."));
    return lines.join("\n");
  }
  function copy(text) {
    function done() { toast(t("copied")); }
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done, fallback); } else fallback();
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); done(); } catch (e) {} ta.remove();
    }
  }
  var toastT;
  function toast(msg) { var n = el("toast"); n.textContent = msg; n.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(function () { n.classList.remove("on"); }, 1600); }

  /* ---------- events ---------- */
  el("q").addEventListener("input", function (e) { state.q = e.target.value; update(); });
  el("clearQ").addEventListener("click", function () { state.q = ""; el("q").value = ""; update(); el("q").focus(); });
  el("langBtn").addEventListener("click", function () {
    state.lang = state.lang === "ar" ? "en" : "ar"; safeSet("lang", state.lang); renderStatic(); update();
    if (el("dlg").open) { var id = location.hash.slice(1); if (id) openItem(id, true); }
  });
  el("dlg").addEventListener("click", function (e) { if (e.target === el("dlg")) closeItem(); });
  el("dlg").addEventListener("cancel", function () { history.replaceState(null, "", location.pathname + location.search); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT") { e.preventDefault(); el("q").focus(); }
  });
  window.addEventListener("hashchange", function () { var id = location.hash.slice(1); if (id) openItem(id, true); else if (el("dlg").open) el("dlg").close(); });

  renderStatic(); update();
  if (location.hash.length > 1) openItem(location.hash.slice(1), true);

  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
})();
