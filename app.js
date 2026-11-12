(function () {
  "use strict";
  var ITEMS = window.ITEMS, SECTIONS = window.SECTIONS, META = window.MENU_META, CUSTOM = window.CUSTOM, FAQ = window.FAQ;
  var BRANCHES = window.BRANCHES, OFFERS = window.OFFERS, REPLIES = window.REPLIES, REGION_AR = window.REGION_AR || {};

  /* ---------- i18n ---------- */
  var T = {
    ar: {
      subtitle: "للرد السريع على أسئلة العملاء",
      footNote: "أي معلومة مش مكتوبة في المنيو (حساسية، سعرات، مكونات إضافية) ارجع فيها للمسؤول قبل ما ترد على العميل.",
      v_menu: "المنيو", v_branches: "الفروع", v_offers: "العروض", v_replies: "ردود سريعة",
      ph_menu: "ابحث بالاسم أو بالمكوّن (كراميل، مارشميلو، سنيكرز…)", ph_branches: "ابحث عن فرع أو منطقة…",
      ph_offers: "ابحث في العروض…", ph_replies: "ابحث في الردود (توصيل، واي فاي، توظيف…)",
      all: "الكل", coffee: "فيه قهوة", nocoffee: "بدون قهوة", hot: "ساخن", iced: "مثلج", blended: "ممزوج", smoothie: "سموزي",
      serveLbl: "النوع:", coffeeLbl: "القهوة:", quickLbl: "مكوّنات شائعة:",
      items: "صنف", none: "مفيش نتايج — جرّب كلمة تانية أو امسح الفلاتر.",
      ingredients: "المكونات", description: "الوصف", prices: "الأسعار (شامل الضريبة)", flavors: "النكهات المتاحة", egp: "ج",
      free: "(مجاني)", copyAr: "نسخ الرد (عربي)", copyEn: "Copy reply (EN)", copyCust: "نسخ الإضافات والأسعار",
      warn: "المنيو مفيهوش بيانات عن الحساسية أو السعرات — لو العميل سأل، ارجع للمسؤول.",
      copied: "تم النسخ ✓", close: "إغلاق", faq: "إجابات سريعة", custom: "شكلها على حسب رغبتك",
      vat: "الأسعار بالجنيه المصري وشاملة الضريبة.",
      map: "الخريطة", copy: "نسخ", copyNames: "نسخ كل الفروع (أسماء)", copyLinks: "نسخ كل الفروع (بلينكات)",
      copyRegion: "نسخ", branchesCount: "فرع", copyAllOffers: "نسخ كل العروض اليومية", everyday: "العروض اليومية (كومبو)",
      weekly: "عروض الأسبوع", combo: "كومبو", src_embedded: "بيانات مدمجة", src_sheet: "من Google Sheet", src_cache: "من نسخة محفوظة",
      source: "المصدر", near: "أقرب فرع لموقعي", nearTitle: "الأقرب إليك", km: "كم", geoErr: "مقدرتش أحدد الموقع — فعّل خدمة الموقع وجرّب تاني", geoWait: "بحدد موقعك…"
    },
    en: {
      subtitle: "Quick answers for customer questions",
      footNote: "For anything not on the menu (allergens, calories, extra ingredients) check with your supervisor before replying.",
      v_menu: "Menu", v_branches: "Branches", v_offers: "Offers", v_replies: "Quick replies",
      ph_menu: "Search by name or ingredient (caramel, marshmallow, Snickers…)", ph_branches: "Search a branch or area…",
      ph_offers: "Search offers…", ph_replies: "Search replies (delivery, wifi, hiring…)",
      all: "All", coffee: "Has coffee", nocoffee: "Coffee-free", hot: "Hot", iced: "Iced", blended: "Blended", smoothie: "Smoothie",
      serveLbl: "Type:", coffeeLbl: "Coffee:", quickLbl: "Popular ingredients:",
      items: "items", none: "No results — try another word or clear the filters.",
      ingredients: "Ingredients", description: "Description", prices: "Prices (incl. VAT)", flavors: "Available flavours", egp: "EGP",
      free: "(free)", copyAr: "نسخ الرد (عربي)", copyEn: "Copy reply (EN)", copyCust: "Copy add-ons & prices",
      warn: "The menu has no allergen or calorie data — check with your supervisor if asked.",
      copied: "Copied ✓", close: "Close", faq: "Quick answers", custom: "Make it your own",
      vat: "Prices are in EGP and include VAT.",
      map: "Map", copy: "Copy", copyNames: "Copy all branches (names)", copyLinks: "Copy all branches (with links)",
      copyRegion: "Copy", branchesCount: "branches", copyAllOffers: "Copy all everyday offers", everyday: "Everyday offers (combos)",
      weekly: "Weekly offers", combo: "Combo", src_embedded: "built-in data", src_sheet: "Google Sheet", src_cache: "saved copy",
      source: "Source", near: "Nearest branch to me", nearTitle: "Closest to you", km: "km", geoErr: "Couldn't get your location — enable location and try again", geoWait: "Finding your location…"
    }
  };
  var QUICK = [
    { ar: "كراميل", en: "caramel" }, { ar: "شوكولاتة", en: "chocolate" }, { ar: "مارشميلو", en: "marshmallow" },
    { ar: "سنيكرز", en: "snickers" }, { ar: "نعناع", en: "mint" }, { ar: "فانيليا", en: "vanilla" },
    { ar: "زبادي", en: "yogurt" }, { ar: "كب كيك", en: "cupcake" }, { ar: "لبن", en: "milk" }
  ];
  var VIEWS = ["menu", "branches", "offers", "replies"];

  var state = { lang: safeGet("lang") || "ar", view: "menu", q: "", coffee: "all", serve: "all", section: "all", repCat: "all", near: null };
  var sources = { menu: "embedded", branches: "embedded", offers: "embedded", replies: "embedded" };
  function t(k) { return T[state.lang][k]; }
  function pick(o, base) { return base ? o[base + (state.lang === "ar" ? "Ar" : "En")] : o[state.lang]; }
  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function el(id) { return document.getElementById(id); }

  function norm(s) {
    return String(s || "").toLowerCase()
      .replace(/[ً-ٰٟـ]/g, "")
      .replace(/[إأآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
      .replace(/[®™*]/g, "").replace(/[–—-]/g, " ").replace(/\s+/g, " ").trim();
  }
  function matchAll(hay, q) {
    if (!q) return true;
    var words = norm(q).split(" ");
    for (var i = 0; i < words.length; i++) if (hay.indexOf(words[i]) < 0) return false;
    return true;
  }
  function indexItems() {
    ITEMS.forEach(function (it) {
      it._hay = norm([it.en, it.ar, it.descEn, it.descAr, (it.ingEn || []).join(" "), (it.ingAr || []).join(" "),
        (it.flavorsEn || []).join(" "), (it.flavorsAr || []).join(" ")].join(" "));
    });
  }
  indexItems();

  function sizeLabels(it) {
    if (it.priceLabels) return it.priceLabels;
    return META.sizeLabels[it.prices.length] || META.sizeLabels[3];
  }

  /* ============================================================
     Google Sheets (published CSV) — optional, falls back to data.js
     ============================================================ */
  function parseCSV(text) {
    var rows = [], row = [], f = "", q = false, i = 0, c;
    text = String(text).replace(/^﻿/, "");
    for (; i < text.length; i++) {
      c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c;
      } else if (c === '"') q = true;
      else if (c === ",") { row.push(f); f = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(f); rows.push(row); row = []; f = ""; }
      else f += c;
    }
    if (f !== "" || row.length) { row.push(f); rows.push(row); }
    return rows;
  }
  function toObjs(rows) {
    if (!rows.length) return [];
    var head = rows[0].map(function (h) { return String(h).trim().toLowerCase().replace(/[\s_-]+/g, ""); });
    return rows.slice(1).filter(function (r) { return r.some(function (x) { return String(x).trim() !== ""; }); }).map(function (r) {
      var o = {}; head.forEach(function (h, i) { o[h] = (r[i] || "").trim(); }); return o;
    });
  }
  function L(s) { return s ? String(s).split("|").map(function (x) { return x.trim(); }).filter(Boolean) : []; }
  function yes(s) { return /^(y|yes|true|1|نعم|ايوه|أيوه)$/i.test(String(s || "").trim()); }
  function no(s) { return /^(n|no|false|0|لا)$/i.test(String(s || "").trim()); }

  var APPLY = {
    // يقبل نفس أعمدة شيت موقع الفروع: region, name, area, address, phone, hours, lat, lng, link, region_en, name_ar (+ active اختياري)
    // وكمان الأسماء المختصرة: en, ar, map
    branches: function (o) {
      var list = o.filter(function (r) { return !no(r.active) && (r.en || r.name || r.branch || r.ar || r.namear); }).map(function (r) {
        var key = r.regionen || r.region || "Other";
        if (r.regionen && r.region && r.region !== r.regionen) REGION_AR[r.regionen] = r.region;
        var lat = parseFloat(r.lat), lng = parseFloat(r.lng);
        return { region: key, en: r.en || r.name || r.branch || r.namear || r.ar, ar: r.ar || r.namear || "", area: r.area || "", address: r.address || "",
          map: r.map || r.link || r.maplink || "", hours: r.hours || "", phone: r.phone || "",
          lat: isNaN(lat) ? null : lat, lng: isNaN(lng) ? null : lng };
      });
      if (list.length) BRANCHES = list;
    },
    offers: function (o) {
      var list = o.filter(function (r) { return !no(r.active) && r.name; }).map(function (r) {
        return { name: r.name, includes: r.includes || "", price: Number(r.price) || r.price };
      });
      if (list.length) OFFERS = list;
    },
    replies: function (o) {
      var map = {}, order = [];
      o.forEach(function (r) {
        if (!r.text) return;
        var key = (r.category || "") + "||" + (r.questionar || r.qar || "") + "||" + (r.questionen || r.qen || "");
        if (!map[key]) { map[key] = { id: "r" + order.length, cat: r.category || "Other", qAr: r.questionar || r.qar || "", qEn: r.questionen || r.qen || "", variants: [] }; order.push(key); }
        map[key].variants.push({ label: r.label || "", text: r.text });
      });
      if (order.length) REPLIES = order.map(function (k) { return map[k]; });
    },
    menu: function (o) {
      var secIds = SECTIONS.map(function (s) { return s.id; });
      var list = o.filter(function (r) { return r.id && r.en && r.prices && secIds.indexOf(r.section) >= 0 && !no(r.active); }).map(function (r) {
        var it = {
          id: r.id, section: r.section, en: r.en, ar: r.ar || r.en,
          serve: L(r.serve).length ? L(r.serve) : ["hot"],
          coffee: yes(r.coffee) ? true : (no(r.coffee) ? false : null),
          prices: L(r.prices).map(Number).filter(function (n) { return !isNaN(n); }),
          ingEn: L(r.ingen), ingAr: L(r.ingar), descEn: r.descen || "", descAr: r.descar || ""
        };
        if (!it.prices.length) return null;
        if (L(r.flavorsen).length) { it.flavorsEn = L(r.flavorsen); it.flavorsAr = L(r.flavorsar); it.flavorFree = yes(r.flavorfree); }
        if (r.sizenotear || r.sizenoteen) it.sizeNote = { ar: r.sizenotear || r.sizenoteen, en: r.sizenoteen || r.sizenotear };
        if (L(r.pricelabelsar).length) {
          var a = L(r.pricelabelsar), e = L(r.pricelabelsen);
          it.priceLabels = a.map(function (x, i) { return { ar: x, en: e[i] || x }; });
        }
        return it;
      }).filter(Boolean);
      if (list.length) { ITEMS = list; indexItems(); }
    }
  };

  function loadSheets() {
    var cfg = window.SHEETS || {};
    Object.keys(cfg).forEach(function (k) {
      var url = cfg[k]; if (!url || !APPLY[k]) return;
      var cached = safeGet("sheet_" + k);
      if (cached) { try { APPLY[k](toObjs(parseCSV(cached))); sources[k] = "cache"; } catch (e) {} }
      fetch(url, { cache: "no-store" }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }).then(function (txt) {
        var objs = toObjs(parseCSV(txt)); if (!objs.length) throw new Error("empty");
        APPLY[k](objs); sources[k] = "sheet"; safeSet("sheet_" + k, txt); renderAll();
      }).catch(function () { renderAll(); });
    });
  }

  /* ============================================================
     copy helpers
     ============================================================ */
  var copyStore = [];
  function cbtn(text, label, cls) { copyStore.push(text); return '<button type="button" class="' + (cls || "btn-sm") + '" data-ci="' + (copyStore.length - 1) + '">' + label + "</button>"; }
  function bindCopy(root) {
    root.querySelectorAll("[data-ci]").forEach(function (b) {
      b.addEventListener("click", function (e) { e.stopPropagation(); copy(copyStore[+b.getAttribute("data-ci")]); });
    });
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

  /* ============================================================
     chrome: static texts, views nav, tabs
     ============================================================ */
  function renderStatic() {
    var d = document.documentElement;
    d.lang = state.lang; d.dir = state.lang === "ar" ? "rtl" : "ltr";
    document.title = "Menu Guide";
    document.querySelectorAll("[data-i18n]").forEach(function (n) { n.textContent = t(n.getAttribute("data-i18n")); });
    el("q").placeholder = t("ph_" + state.view);
    el("langBtn").textContent = state.lang === "ar" ? "EN" : "عربي";
    var srcs = Object.keys(sources).filter(function (k) { return sources[k] !== "embedded"; });
    var srcTxt = srcs.length ? srcs.map(function (k) { return k + ": " + t("src_" + sources[k]); }).join(" · ") : t("src_embedded");
    el("footMeta").innerHTML = "<bdi>" + esc(META.version) + "</bdi> — " + esc(state.lang === "ar" ? META.note : t("vat")) + "<br>" + t("source") + ": " + esc(srcTxt);
  }
  function renderViews() {
    var nav = el("views"); nav.innerHTML = "";
    VIEWS.forEach(function (v) {
      var b = document.createElement("button"); b.type = "button";
      b.className = "vtab" + (state.view === v ? " on" : ""); b.textContent = t("v_" + v);
      b.addEventListener("click", function () { setView(v); });
      nav.appendChild(b);
    });
  }
  function setView(v, keepQ) {
    if (state.view === v) return;
    state.view = v; if (!keepQ) { state.q = ""; el("q").value = ""; }
    if (el("dlg").open) el("dlg").close();
    history.replaceState(null, "", v === "menu" ? location.pathname + location.search : "#" + v);
    renderAll(); window.scrollTo({ top: 0 });
  }
  function renderTabs(counts) {
    var tabs = el("tabs"); tabs.innerHTML = "";
    tabs.hidden = state.view !== "menu"; if (state.view !== "menu") return;
    function add(id, label, n) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "tab" + (state.section === id ? " on" : "");
      b.innerHTML = esc(label) + '<span class="n">' + n + "</span>";
      b.addEventListener("click", function () { state.section = id; renderMenu(); window.scrollTo({ top: 0, behavior: "smooth" }); });
      tabs.appendChild(b);
    }
    var total = 0; SECTIONS.forEach(function (s) { total += counts[s.id] || 0; });
    add("all", t("all"), total);
    SECTIONS.forEach(function (s) { add(s.id, pick(s, ""), counts[s.id] || 0); });
  }

  function chip(label, on, cls, handler) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "chip " + (cls || "") + (on ? " on" : ""); b.textContent = label;
    b.addEventListener("click", handler); return b;
  }

  /* ============================================================
     MENU view
     ============================================================ */
  function visible(it) {
    if (state.section !== "all" && it.section !== state.section) return false;
    if (state.coffee === "yes" && it.coffee !== true) return false;
    if (state.coffee === "no" && it.coffee !== false) return false;
    if (state.serve !== "all" && it.serve.indexOf(state.serve) < 0) return false;
    return matchAll(it._hay, state.q);
  }
  function renderChips() {
    var qc = el("quickChips"); qc.innerHTML = "";
    var l = document.createElement("span"); l.className = "chip-label"; l.textContent = t("quickLbl"); qc.appendChild(l);
    QUICK.forEach(function (k) {
      var word = state.lang === "ar" ? k.ar : k.en;
      qc.appendChild(chip(word, norm(state.q) === norm(word), "q", function () {
        state.q = norm(state.q) === norm(word) ? "" : word; el("q").value = state.q; onQuery();
      }));
    });
    var fc = el("filterChips"); fc.innerHTML = "";
    var l1 = document.createElement("span"); l1.className = "chip-label"; l1.textContent = t("coffeeLbl"); fc.appendChild(l1);
    [["all", t("all")], ["yes", t("coffee")], ["no", t("nocoffee")]].forEach(function (p) {
      fc.appendChild(chip(p[1], state.coffee === p[0], "", function () { state.coffee = p[0]; renderMenu(); }));
    });
    var l2 = document.createElement("span"); l2.className = "chip-label"; l2.textContent = t("serveLbl"); fc.appendChild(l2);
    [["all", t("all")], ["hot", t("hot")], ["iced", t("iced")], ["blended", t("blended")], ["smoothie", t("smoothie")]].forEach(function (p) {
      fc.appendChild(chip(p[1], state.serve === p[0], "", function () { state.serve = p[0]; renderMenu(); }));
    });
  }
  function cardHTML(it) {
    var labels = sizeLabels(it), tags = "";
    if (it.coffee === true) tags += '<span class="tag coffee">☕ ' + t("coffee") + "</span>";
    if (it.coffee === false) tags += '<span class="tag nocoffee">' + t("nocoffee") + "</span>";
    it.serve.forEach(function (s) { tags += '<span class="tag">' + esc(t(s) || s) + "</span>"; });
    var prices = it.prices.map(function (p) { return '<span class="price">' + p + "</span>"; }).join("");
    return '<button class="card" type="button" data-id="' + esc(it.id) + '">' +
      '<div class="pic"><img loading="lazy" src="img/' + esc(it.id) + '.webp" onerror="this.onerror=null;this.src=\'img/logo.png\';this.classList.add(\'ph\')" alt="' + esc(it.en) + '" width="120" height="136"></div>' +
      "<h3>" + esc(state.lang === "ar" ? it.ar : it.en) + "</h3>" +
      '<div class="en-name">' + esc(state.lang === "ar" ? it.en : it.ar) + "</div>" +
      '<div class="tags">' + tags + "</div>" +
      '<div class="prices" title="' + esc(labels.map(function (l) { return pick(l, ""); }).join(" / ")) + '">' + prices + "</div></button>";
  }
  function countsAll() {
    var saved = state.section, c = {};
    state.section = "all";
    SECTIONS.forEach(function (s) { c[s.id] = ITEMS.filter(function (it) { return it.section === s.id && visible(it); }).length; });
    state.section = saved; return c;
  }
  function renderMenu() {
    renderChips(); renderTabs(countsAll());
    var html = "", shown = 0;
    SECTIONS.forEach(function (s) {
      var list = ITEMS.filter(function (it) { return it.section === s.id && visible(it); });
      shown += list.length; if (!list.length) return;
      html += '<section class="sec" id="sec-' + s.id + '"><div class="sec-head"><h2>' + esc(s.icon + " " + (state.lang === "ar" ? s.ar : s.en)) + "</h2>" +
        '<span class="en">' + esc(state.lang === "ar" ? s.en : s.ar) + "</span>" +
        (pick(s, "sub") ? '<span class="sub">' + esc(pick(s, "sub")) + "</span>" : "") +
        '</div><div class="grid">' + list.map(cardHTML).join("") + "</div></section>";
    });
    el("sections").innerHTML = html || '<p class="empty">' + t("none") + "</p>";
    el("count").textContent = shown + " " + t("items");
    el("sections").querySelectorAll(".card").forEach(function (c) {
      c.addEventListener("click", function () { openItem(c.getAttribute("data-id")); });
    });
    var showExtras = state.section === "all" && !state.q && state.coffee === "all" && state.serve === "all";
    var cu = el("custom"), f = el("faq"); cu.hidden = f.hidden = !showExtras;
    if (!showExtras) return;
    cu.innerHTML = "<h2>" + esc(state.lang === "ar" ? CUSTOM.titleAr : CUSTOM.titleEn) + '<span class="en">' + esc(state.lang === "ar" ? CUSTOM.titleEn : CUSTOM.titleAr) + '</span></h2><div class="opts">' +
      CUSTOM.groups.map(function (g) {
        return '<div class="opt"><h3>' + esc(state.lang === "ar" ? g.ar : g.en) + ' <span class="badge">' + g.price + " " + t("egp") + "</span></h3><ul>" +
          g.items.map(function (i) { return "<li>" + esc(state.lang === "ar" ? i.ar : i.en) + "<small>" + esc(state.lang === "ar" ? i.en : i.ar) + "</small></li>"; }).join("") + "</ul></div>";
      }).join("") + "</div>";
    f.innerHTML = "<h2>" + t("faq") + "</h2>" + FAQ.map(function (q) {
      return '<details class="q"><summary>' + esc(pick(q, "q")) + "</summary><p>" + esc(pick(q, "a")) + "</p></details>";
    }).join("");
  }

  /* ---------- item sheet ---------- */
  function openItem(id, noHash) {
    var it = ITEMS.filter(function (x) { return x.id === id; })[0]; if (!it) return;
    var labels = sizeLabels(it), ar = state.lang === "ar";
    var ing = (it.ingEn.length ? it.ingEn : it.ingAr).map(function (e, i) {
      var a = it.ingAr[i] || e, en = it.ingEn[i] || a;
      return "<li>" + esc(ar ? a : en) + "<small>" + esc(ar ? en : a) + "</small></li>";
    }).join("");
    var sizes = it.prices.map(function (p, i) {
      return '<div class="size"><b>' + p + "</b><span>" + esc(labels[i] ? pick(labels[i], "") : "") + "</span></div>";
    }).join("");
    var flav = it.flavorsEn ? '<div><h4>' + t("flavors") + (it.flavorFree ? '<span class="free">' + t("free") + "</span>" : "") + '</h4><div class="flavors">' +
      it.flavorsEn.map(function (e, i) { return "<span>" + esc(ar ? (it.flavorsAr[i] || e) : e) + "</span>"; }).join("") + "</div></div>" : "";
    var note = it.sizeNote ? '<div class="note">' + esc(pick(it.sizeNote, "")) + "</div>" : "";
    el("sheet").innerHTML =
      '<div class="sheet-head"><img src="img/' + esc(it.id) + '.webp" onerror="this.onerror=null;this.src=\'img/logo.png\'" alt="">' +
      '<div><h2 id="dlgTitle">' + esc(ar ? it.ar : it.en) + '</h2><div class="en-name">' + esc(ar ? it.en : it.ar) + "</div></div>" +
      '<button class="close" type="button" aria-label="' + t("close") + '">×</button></div>' +
      '<div class="sheet-body">' +
      "<div><h4>" + t("ingredients") + '</h4><ul class="ing">' + ing + "</ul></div>" +
      "<div><h4>" + t("description") + '</h4><p class="desc">' + esc(ar ? (it.descAr || it.descEn) : (it.descEn || it.descAr)) + '</p><p class="desc en">' + esc(ar ? it.descEn : it.descAr) + "</p></div>" +
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

  function buildReply(it, mode) {
    if (mode === "cust") {
      var ar = state.lang === "ar";
      var out = [ar ? "أهلاً بحضرتك🥰" : "Hello Dear🥰", ar ? "تقدر تخصّص مشروبك:" : "Make it your own:"];
      CUSTOM.groups.forEach(function (g) {
        out.push("• " + (ar ? g.ar : g.en) + " (" + g.price + " " + (ar ? "ج" : "EGP") + "): " + g.items.map(function (i) { return ar ? i.ar : i.en; }).join(ar ? "، " : ", "));
      });
      out.push(ar ? "الأسعار شاملة الضريبة." : "Prices include VAT.");
      return out.join("\n");
    }
    var isAr = mode === "ar", labels = sizeLabels(it), sep = isAr ? "، " : ", ";
    var ings = isAr ? (it.ingAr.length ? it.ingAr : it.ingEn) : (it.ingEn.length ? it.ingEn : it.ingAr);
    var lines = [isAr ? "أهلاً بحضرتك🥰" : "Hello Dear🥰",
      isAr ? it.ar + " (" + it.en + ")" : it.en,
      (isAr ? "المكونات: " : "Ingredients: ") + ings.join(sep) + "."];
    if (it.flavorsEn) lines.push((isAr ? "النكهات: " : "Flavours: ") + (isAr ? it.flavorsAr : it.flavorsEn).join(sep) + (it.flavorFree ? (isAr ? " (اختيار النكهة مجاني)" : " (flavour choice is free)") : "") + ".");
    if (it.sizeNote) lines.push((isAr ? it.sizeNote.ar : it.sizeNote.en) + ".");
    lines.push((isAr ? "الأسعار: " : "Prices: ") + it.prices.map(function (p, i) { var lb = labels[i] || {}; return (isAr ? lb.ar : lb.en) + " " + p; }).join(" | ") + (isAr ? " جنيه (شامل الضريبة)." : " EGP (incl. VAT)."));
    return lines.join("\n");
  }

  /* ============================================================
     BRANCHES view
     ============================================================ */
  function branchListText(region, withLinks) {
    var list = BRANCHES.filter(function (b) { return !region || b.region === region; });
    function item(b) { return b.en + (withLinks && b.map ? "\n" + b.map : ""); }
    if (region) return "Hello Dear🥰\n\nhere's our branches list\nCaribou Coffee Egypt " + region + "\n\n" + list.map(item).join("\n\n");
    var regions = [], g = {};
    BRANCHES.forEach(function (b) { if (!g[b.region]) { g[b.region] = []; regions.push(b.region); } g[b.region].push(b); });
    return "Hello Dear🥰\n\nhere's our branches list\nCaribou Coffee Egypt\n" +
      regions.map(function (r) { return "- " + r + "\n\n" + g[r].map(item).join("\n\n"); }).join("\n\n");
  }
  function regionOrder() {
    var r = []; BRANCHES.forEach(function (b) { if (r.indexOf(b.region) < 0) r.push(b.region); }); return r;
  }
  function dist(a, b) {
    var R = 6371, rad = Math.PI / 180, dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function branchRow(b, ar) {
    var one = b.en + (b.map ? "\n" + b.map : "");
    return '<div class="branch"><div class="b-main"><b>' + esc(b.en) + "</b>" +
      (b.ar ? "<small>" + esc(b.ar) + "</small>" : "") +
      (b.area ? '<span class="meta">' + esc(b.area) + (b._d != null ? " · ≈ " + b._d.toFixed(1) + " " + t("km") : "") + "</span>" : (b._d != null ? '<span class="meta">≈ ' + b._d.toFixed(1) + " " + t("km") + "</span>" : "")) +
      (b.address ? '<span class="meta">' + esc(b.address) + "</span>" : "") +
      (b.hours ? '<span class="meta">🕒 ' + esc(b.hours) + "</span>" : "") +
      (b.phone ? '<span class="meta" dir="ltr">☎ ' + esc(b.phone) + "</span>" : "") + "</div>" +
      '<div class="b-actions">' + (b.map ? '<a class="btn-sm" href="' + esc(b.map) + '" target="_blank" rel="noopener">🗺️ ' + t("map") + "</a>" : "") + cbtn(one, t("copy")) + "</div></div>";
  }
  function findNearest() {
    if (!navigator.geolocation) { toast(t("geoErr")); return; }
    toast(t("geoWait"));
    navigator.geolocation.getCurrentPosition(function (pos) {
      state.near = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      renderBranches();
    }, function () { toast(t("geoErr")); }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 });
  }
  function renderBranches() {
    copyStore = [];
    var box = el("v-branches"), ar = state.lang === "ar";
    BRANCHES.forEach(function (b) { b._d = (state.near && b.lat != null && b.lng != null) ? dist(state.near, b) : null; });
    var list = BRANCHES.filter(function (b) { return matchAll(norm([b.en, b.ar, b.area, b.address, b.region, REGION_AR[b.region] || ""].join(" ")), state.q); });
    var html = '<div class="toolbar"><button type="button" class="btn alt" id="nearBtn">📍 ' + t("near") + "</button>" +
      cbtn(branchListText(null, false), t("copyNames"), "btn alt") + cbtn(branchListText(null, true), t("copyLinks"), "btn") + "</div>";
    if (state.near) {
      var top = list.filter(function (b) { return b._d != null; }).sort(function (a, b) { return a._d - b._d; }).slice(0, 3);
      if (top.length) html += '<section class="sec near-sec"><div class="sec-head"><h2>🎯 ' + t("nearTitle") + '</h2></div><div class="blist">' + top.map(function (b) { return branchRow(b, ar); }).join("") + "</div></section>";
    }
    regionOrder().forEach(function (r) {
      var rows = list.filter(function (b) { return b.region === r; }); if (!rows.length) return;
      html += '<section class="sec"><div class="sec-head"><h2>📍 ' + esc(ar ? (REGION_AR[r] || r) : r) + '</h2><span class="en">' + esc(ar ? r : (REGION_AR[r] || "")) + '</span><span class="sub">' + rows.length + " " + t("branchesCount") + "</span>" +
        '<span class="spacer"></span>' + cbtn(branchListText(r, false), t("copyRegion") + " (" + (ar ? "أسماء" : "names") + ")") + cbtn(branchListText(r, true), t("copyRegion") + " (" + (ar ? "بلينكات" : "links") + ")") + "</div>" +
        '<div class="blist">' + rows.map(function (b) { return branchRow(b, ar); }).join("") + "</div></section>";
    });
    box.innerHTML = list.length ? html : '<p class="empty">' + t("none") + "</p>";
    bindCopy(box);
    var nb = el("nearBtn"); if (nb) nb.addEventListener("click", findNearest);
  }

  /* ============================================================
     OFFERS view
     ============================================================ */
  function everydayText() {
    return "Hello Dear🥰\n\n" + OFFERS.map(function (o, i) { return (i + 1) + ". " + o.name + "\n" + o.includes + "\nPrice: EGP " + o.price; }).join("\n\n");
  }
  function replyCardHTML(r) {
    var ar = state.lang === "ar";
    return '<article class="reply"><h3>' + esc(ar ? (r.qAr || r.qEn) : (r.qEn || r.qAr)) + (r.qAr && r.qEn ? "<small>" + esc(ar ? r.qEn : r.qAr) + "</small>" : "") + "</h3>" +
      r.variants.map(function (v) {
        return '<div class="var"><div class="var-h"><span>' + esc(v.label) + "</span>" + cbtn(v.text, t("copy")) + "</div><pre dir=\"auto\">" + esc(v.text) + "</pre></div>";
      }).join("") + "</article>";
  }
  function renderOffers() {
    copyStore = [];
    var box = el("v-offers");
    var combos = OFFERS.filter(function (o) { return matchAll(norm(o.name + " " + o.includes), state.q); });
    var weekly = REPLIES.filter(function (r) { return r.cat === "Offers" && matchAll(norm([r.qAr, r.qEn, r.variants.map(function (v) { return v.text; }).join(" ")].join(" ")), state.q); });
    var html = "";
    if (weekly.length) html += '<section class="sec"><div class="sec-head"><h2>🎉 ' + t("weekly") + '</h2></div><div class="replies">' + weekly.map(replyCardHTML).join("") + "</div></section>";
    if (combos.length) {
      html += '<section class="sec"><div class="sec-head"><h2>🥪 ' + t("everyday") + '</h2><span class="spacer"></span>' + cbtn(everydayText(), t("copyAllOffers"), "btn") + '</div><div class="grid offers">' +
        combos.map(function (o) {
          return '<div class="offer"><div class="o-name">' + esc(o.name) + '</div><div class="o-inc">' + esc(o.includes) + '</div><div class="o-foot"><span class="price big">' + esc(o.price) + " " + t("egp") + "</span>" +
            cbtn("Hello Dear🥰\n" + o.name + "\n" + o.includes + "\nPrice: EGP " + o.price, t("copy")) + "</div></div>";
        }).join("") + "</div></section>";
    }
    box.innerHTML = html || '<p class="empty">' + t("none") + "</p>";
    bindCopy(box);
  }

  /* ============================================================
     REPLIES view
     ============================================================ */
  function allReplies() {
    var ar = state.lang === "ar", out = [];
    // generated from BRANCHES / OFFERS so there is a single source of truth
    var bv = [{ label: ar ? "كل الفروع — أسماء" : "All branches — names", text: branchListText(null, false) },
              { label: ar ? "كل الفروع — بلينكات" : "All branches — with links", text: branchListText(null, true) }];
    regionOrder().forEach(function (r) { bv.push({ label: (ar ? (REGION_AR[r] || r) : r) + (ar ? " — أسماء" : " — names"), text: branchListText(r, false) }); });
    out.push({ id: "g-branches", cat: "Branches", qAr: "الفروع؟", qEn: "Branches?", variants: bv });
    out.push({ id: "g-everyday", cat: "Offers", qAr: "العروض اليومية", qEn: "Everyday offers", variants: [{ label: "Combos", text: everydayText() }] });
    return out.concat(REPLIES);
  }
  function renderReplies() {
    copyStore = [];
    var box = el("v-replies"), all = allReplies();
    var cats = []; all.forEach(function (r) { if (cats.indexOf(r.cat) < 0) cats.push(r.cat); });
    if (state.repCat !== "all" && cats.indexOf(state.repCat) < 0) state.repCat = "all";
    var list = all.filter(function (r) {
      if (state.repCat !== "all" && r.cat !== state.repCat) return false;
      return matchAll(norm([r.cat, r.qAr, r.qEn, r.variants.map(function (v) { return v.label + " " + v.text; }).join(" ")].join(" ")), state.q);
    });
    var html = '<div class="chip-row" id="repChips"></div><div class="replies">' + (list.length ? list.map(replyCardHTML).join("") : '<p class="empty">' + t("none") + "</p>") + "</div>";
    box.innerHTML = html;
    var cr = el("repChips");
    cr.appendChild(chip(t("all"), state.repCat === "all", "", function () { state.repCat = "all"; renderReplies(); }));
    cats.forEach(function (c) { cr.appendChild(chip(c, state.repCat === c, "", function () { state.repCat = c; renderReplies(); })); });
    bindCopy(box);
  }

  /* ============================================================
     orchestration
     ============================================================ */
  function renderAll() {
    renderStatic(); renderViews();
    VIEWS.forEach(function (v) { el("v-" + v).hidden = v !== state.view; });
    el("clearQ").hidden = !state.q;
    if (state.view === "menu") renderMenu(); else renderTabs({});
    if (state.view === "branches") renderBranches();
    if (state.view === "offers") renderOffers();
    if (state.view === "replies") renderReplies();
  }
  function onQuery() { el("clearQ").hidden = !state.q; renderAll(); }

  el("q").addEventListener("input", function (e) { state.q = e.target.value; onQuery(); });
  el("clearQ").addEventListener("click", function () { state.q = ""; el("q").value = ""; onQuery(); el("q").focus(); });
  el("langBtn").addEventListener("click", function () {
    state.lang = state.lang === "ar" ? "en" : "ar"; safeSet("lang", state.lang); renderAll();
    if (el("dlg").open) { var id = location.hash.slice(1); if (id) openItem(id, true); }
  });
  el("dlg").addEventListener("click", function (e) { if (e.target === el("dlg")) closeItem(); });
  el("dlg").addEventListener("cancel", function () { history.replaceState(null, "", location.pathname + location.search); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT") { e.preventDefault(); el("q").focus(); }
  });
  function routeFromHash() {
    var h = location.hash.slice(1);
    if (VIEWS.indexOf(h) >= 0) { if (el("dlg").open) el("dlg").close(); state.view = h; state.q = ""; el("q").value = ""; renderAll(); return; }
    if (h) { state.view = "menu"; renderAll(); openItem(h, true); }
    else if (el("dlg").open) el("dlg").close();
  }
  window.addEventListener("hashchange", routeFromHash);

  loadSheets();
  var h0 = location.hash.slice(1);
  if (VIEWS.indexOf(h0) >= 0) state.view = h0;
  renderAll();
  if (h0 && VIEWS.indexOf(h0) < 0) openItem(h0, true);

  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
})();
