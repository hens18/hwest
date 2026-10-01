/* Builds the menu and the favorites chips from MENU in menu-data.js.
   Browsing shows one section at a time (picked from the section list); searching looks across the whole menu.
   The Popular / Spicy / No spice filter works in both. */
(() => {
  const list = document.querySelector("[data-menu-list]");
  if (!list || typeof MENU === "undefined") return;
  const catsNav = document.querySelector("[data-menu-cats]");
  const input = document.querySelector("[data-menu-q]");
  const filterGroup = document.querySelector("[data-menu-filter]");
  const status = document.querySelector("[data-menu-status]");
  const empty = document.querySelector("[data-menu-empty]");
  const emptyTitle = empty && empty.querySelector("[data-menu-empty-title]");
  const resetBtn = document.querySelector("[data-menu-reset]");
  const favsList = document.querySelector("[data-favs]");
  const nav = document.querySelector("[data-nav]");

  // The dishes guests name most in reviews, in the order the favorites row shows them.
  const FAVORITES = ["Orange Chicken", "Crispy Beef Proper", "Crab Rangoon", "Egg Drop Soup", "General Tso Chicken",
    "Sesame Chicken", "Peking Duck", "Panang Curry"];

  const CHILI = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.6 3.2c.6-.9 1.4-1.4 2.3-1.5-.2.7-.6 1.2-1.2 1.6 1.2.8 1.6 2.3 1 3.9-1.2 3.4-4.6 6.4-9.4 7.2-.9.1-1.2-.9-.4-1.3 3-1.5 4.7-3.9 5.3-6.7.3-1.6 1.1-2.8 2.4-3.2z"/></svg>';

  // Spicy when the menu text says so: hot and spicy, hot pepper, chili, peppercorn, a hot sauce, or a
  // spicy dish name (Kung Pao, General Tso, Hot Garlic). "Not hot" and "non-spicy" always win.
  const HOT_TEXT = /spic|hot and|hot,|hot (pepper|light|brown|black|garlic|sauce)|chili|pepper(y|corn)|garlicky hot/i;
  const HOT_NAME = /\bhot\b|spicy|kung pao|general tso/i;
  const COOL = /not hot|non-spicy/i;
  const isSpicy = (name, desc, tags) =>
    /\bspicy\b/.test(tags) ? true : /\bmild\b/.test(tags) ? false : !COOL.test(desc) && (HOT_TEXT.test(desc) || HOT_NAME.test(name));

  const fold = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const slug = s => fold(s).replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const money = n => `$${n.toFixed(2)}`;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const FILTER_WORD = { popular: "popular", spicy: "spicy", mild: "spice-free" };

  /* ---------- Build ---------- */
  const dishes = []; // { el, cat, hay, name, desc, nameEl, descEl, spicy, popular }
  const cats = [];   // { id, name, zh, el, btn, total, countEl, shown }
  const byName = new Map();

  MENU.forEach((cat, ci) => {
    const id = `m-${cat.id}`;
    const section = document.createElement("section");
    section.className = "cat";
    section.id = id;
    section.setAttribute("aria-labelledby", `${id}-h`);
    section.innerHTML = `
      <header class="cat__head">
        <span class="cat__zh" lang="zh-Hant" aria-hidden="true">${esc(cat.zh)}</span>
        <h3 class="cat__title" id="${id}-h">${esc(cat.name)}</h3>
        <span class="cat__count" data-count></span>
      </header>
      <ul class="dishes"></ul>`;
    const ul = section.querySelector("ul");
    const entry = { id, name: cat.name, zh: cat.zh, el: section, total: cat.items.length, countEl: section.querySelector("[data-count]"), shown: 0 };

    cat.items.forEach(([name, zh, desc, price, tags = ""]) => {
      const spicy = isSpicy(name, desc, tags);
      const popular = /\bpopular\b/.test(tags);
      const li = document.createElement("li");
      li.className = "dish";
      li.id = `d-${slug(name)}`;
      li.innerHTML = `
        <div class="dish__top">
          <h4 class="dish__name">${esc(name)}</h4>
          <span class="dish__dots" aria-hidden="true"></span>
          <span class="dish__price">${money(price)}</span>
        </div>
        ${zh ? `<p class="dish__zh" lang="zh-Hant">${esc(zh)}</p>` : ""}
        ${desc ? `<p class="dish__desc">${esc(desc)}</p>` : ""}
        ${popular || spicy ? `<p class="dish__tags">${popular ? '<span class="tag tag--pop">Popular</span>' : ""}${spicy ? `<span class="tag tag--spicy">${CHILI}Spicy</span>` : ""}</p>` : ""}`;
      ul.append(li);
      const d = {
        el: li, cat: entry, name, desc, spicy, popular,
        hay: fold([name, zh, desc, cat.name].join(" ")),
        nameEl: li.querySelector(".dish__name"), descEl: li.querySelector(".dish__desc")
      };
      dishes.push(d);
      byName.set(name, { d, price, zh });
    });

    // "Next section" keeps people moving through the menu without scrolling back up to the list.
    const nextCat = MENU[ci + 1];
    if (nextCat) {
      const next = document.createElement("button");
      next.type = "button";
      next.className = "cat__next";
      next.dataset.cat = `m-${nextCat.id}`;
      next.innerHTML = `<span>Next: ${esc(nextCat.name)} <span class="zh" lang="zh-Hant">${esc(nextCat.zh)}</span></span><span aria-hidden="true">→</span>`;
      section.append(next);
    }

    list.append(section);
    cats.push(entry);
  });

  if (catsNav) {
    cats.forEach(c => {
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.cat = c.id;
      b.setAttribute("aria-controls", c.id);
      b.innerHTML = `<span class="zh" lang="zh-Hant" aria-hidden="true">${esc(c.zh)}</span><span class="t">${esc(c.name)}</span><span class="n">${c.total}</span>`;
      catsNav.append(b);
      c.btn = b;
    });
  }

  /* ---------- State ---------- */
  let activeId = cats[0].id;
  let filter = "all";
  const tokens = q => fold(q).replace(/\bfry\b/g, "fried").split(/\s+/).filter(Boolean);
  const matches = (hay, t) => hay.includes(t) || (t.length > 3 && t.endsWith("s") && hay.includes(t.slice(0, -1)));

  const mark = (text, toks) => {
    if (!toks.length) return esc(text);
    // Match on folded text so "saute" finds "sautéed"; folding keeps positions for precomposed accents.
    const folded = fold(text);
    if (folded.length !== text.length) return esc(text);
    const ranges = [];
    toks.forEach(t => {
      let i = folded.indexOf(t);
      while (i > -1) { ranges.push([i, i + t.length]); i = folded.indexOf(t, i + t.length); }
    });
    ranges.sort((a, b) => a[0] - b[0]);
    let out = "", at = 0;
    ranges.forEach(([s, e]) => {
      s = Math.max(s, at);
      if (e <= s) return;
      out += esc(text.slice(at, s)) + `<mark>${esc(text.slice(s, e))}</mark>`;
      at = e;
    });
    return out + esc(text.slice(at));
  };

  const apply = () => {
    const q = input ? input.value.trim() : "";
    const toks = tokens(q);
    const searching = toks.length > 0;
    cats.forEach(c => { c.shown = 0; });

    dishes.forEach(d => {
      const okFilter = filter === "all" || (filter === "popular" && d.popular) || (filter === "spicy" && d.spicy) || (filter === "mild" && !d.spicy);
      const show = okFilter && toks.every(t => matches(d.hay, t));
      d.el.hidden = !show;
      if (show) d.cat.shown++;
      d.nameEl.innerHTML = mark(d.name, toks);
      if (d.descEl) d.descEl.innerHTML = mark(d.desc, toks);
    });

    const narrowed = searching || filter !== "all";
    cats.forEach(c => {
      const visible = searching ? c.shown > 0 : c.id === activeId;
      c.el.hidden = !visible;
      c.el.classList.toggle("is-result", searching);
      c.countEl.textContent = narrowed ? `${c.shown} of ${c.total}` : `${c.total} ${c.total === 1 ? "dish" : "dishes"}`;
      if (c.btn) {
        const on = !searching && c.id === activeId;
        c.btn.setAttribute("aria-pressed", String(on));
        c.btn.classList.toggle("is-empty", c.shown === 0);
        c.btn.querySelector(".n").textContent = narrowed ? c.shown : c.total;
      }
    });
    list.classList.toggle("is-search", searching);

    const active = cats.find(c => c.id === activeId);
    const total = searching ? cats.reduce((n, c) => n + c.shown, 0) : active.shown;
    if (empty) {
      empty.hidden = total > 0;
      if (emptyTitle) emptyTitle.textContent = searching
        ? `Nothing on the menu matches “${q}”.`
        : `No ${FILTER_WORD[filter] || ""} dishes in ${active.name}.`;
    }
    if (status) {
      status.textContent = searching
        ? `${total} ${total === 1 ? "dish matches" : "dishes match"} “${q}” across the menu`
        : filter !== "all" ? `${total} of ${active.total} in ${active.name}` : "";
    }
  };

  // Bring the top of the menu list into view when it is off screen (after picking a section lower down).
  const navOffset = () => (nav ? nav.offsetHeight : 0) +
    (catsNav && getComputedStyle(catsNav).flexDirection === "row" ? catsNav.offsetHeight : 0) + 12;
  const reveal = () => {
    const top = list.getBoundingClientRect().top;
    if (top < navOffset() - 4 || top > innerHeight * 0.75) {
      scrollTo({ top: scrollY + top - navOffset(), behavior: reduced.matches ? "auto" : "smooth" });
    }
  };
  const keepChipInView = c => {
    if (!catsNav || !c.btn || catsNav.scrollWidth <= catsNav.clientWidth + 4) return;
    const left = catsNav.scrollLeft + c.btn.getBoundingClientRect().left - catsNav.getBoundingClientRect().left - 16;
    catsNav.scrollTo({ left, behavior: reduced.matches ? "auto" : "smooth" });
  };

  const showCat = (id, { scroll = true } = {}) => {
    const c = cats.find(x => x.id === id);
    if (!c) return;
    activeId = id;
    if (input && input.value) input.value = "";
    apply();
    keepChipInView(c);
    if (scroll) reveal();
  };

  /* ---------- Controls ---------- */
  let typing = 0;
  if (input) input.addEventListener("input", () => { clearTimeout(typing); typing = setTimeout(apply, 120); });

  const setFilter = f => {
    filter = f;
    if (filterGroup) filterGroup.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.filter === f)));
    apply();
  };
  if (filterGroup) filterGroup.addEventListener("click", e => {
    const b = e.target.closest("button[data-filter]");
    if (b) setFilter(b.dataset.filter);
  });

  if (catsNav) catsNav.addEventListener("click", e => {
    const b = e.target.closest("button[data-cat]");
    if (b) showCat(b.dataset.cat);
  });
  list.addEventListener("click", e => {
    const b = e.target.closest(".cat__next");
    if (b) showCat(b.dataset.cat);
  });

  const reset = () => {
    if (input) input.value = "";
    setFilter("all");
  };
  if (resetBtn) resetBtn.addEventListener("click", () => { reset(); if (input) input.focus(); });

  /* ---------- Jump to a dish (favorites chips, #d-… links) ---------- */
  const flash = el => {
    el.classList.remove("is-flash");
    void el.offsetWidth;
    el.classList.add("is-flash");
    setTimeout(() => el.classList.remove("is-flash"), 1800);
  };
  const goToDish = d => {
    if (input) input.value = "";
    filter = "all";
    if (filterGroup) filterGroup.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.filter === "all")));
    showCat(d.cat.id, { scroll: false });
    const top = d.el.getBoundingClientRect().top + scrollY - navOffset() - 40;
    scrollTo({ top, behavior: reduced.matches ? "auto" : "smooth" });
    setTimeout(() => flash(d.el), reduced.matches ? 0 : 500);
  };

  if (favsList) {
    FAVORITES.forEach(n => {
      const hit = byName.get(n);
      if (!hit) return;
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${hit.d.el.id}`;
      a.innerHTML = `<span>${esc(n)}</span>${hit.zh ? `<span class="zh" lang="zh-Hant">${esc(hit.zh)}</span>` : ""}<span class="price">${money(hit.price)}</span>`;
      a.addEventListener("click", e => { e.preventDefault(); goToDish(hit.d); });
      li.append(a);
      favsList.append(li);
    });
  }

  // Deep links: #m-seafood opens that section, #d-orange-chicken opens its section and points at the dish.
  const fromHash = () => {
    const h = decodeURIComponent(location.hash.slice(1));
    if (h.startsWith("m-") && cats.some(c => c.id === h)) showCat(h);
    else if (h.startsWith("d-")) {
      const d = dishes.find(x => x.el.id === h);
      if (d) goToDish(d);
    }
  };
  addEventListener("hashchange", fromHash);

  apply();
  if (location.hash) fromHash();
})();
