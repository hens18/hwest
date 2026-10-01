/* Guest reviews, transcribed word for word from the Yelp screenshots the client supplied.
   Stars and dates are as posted. Donna R.'s location shows as "VA, VA" on Yelp, written here as Virginia.
   Her three photos are cropped from her review. To add a review, copy an entry; `photos` is optional.
   Never invent or edit review text. */
const REVIEWS = [
  {
    name: "Manoj V.",
    place: "Potomac, MD",
    date: "2026-09-25",
    rating: 5,
    pull: "Staff are super friendly and deliver very quickly!",
    body: [
      "Food is delicious. I love the General Tsos, Kung Pao, Cleopatras Chicken, egg rolls and the soups!! Staff are super friendly and deliver very quickly!"
    ]
  },
  {
    name: "Donna R.",
    badge: "Yelp Elite ’26",
    place: "Virginia",
    date: "2026-07-11",
    rating: 5,
    pull: "Excellent food and service!",
    body: [
      "Excellent food and service! Go here frequently and today we ordered from the lunch menu. I really liked the Almond Chicken. For a lunch portion, it had a lot of chicken in it and was delicious.",
      "My husband thought the King Pao Spicy Chicken needed more sauce and was not his fav meal from here. Egg Rolls were really good and very full. They have the best Egg Drop Soup with a lot of egg and not too salty - I love it here. The Hot and Sour Soup is good too. The crunchy noodles were thin and very fresh, unlike some other places.",
      "Lunch prices for combos are $10-$12. Decent for meals out these days.",
      "The servers are so kind and efficient. Ahl is great and she even packed my leftovers for me."
    ],
    photos: [
      { src: "assets/img/review-donna-almond.webp", alt: "Almond chicken with peas and carrots beside white rice on a blue plate", caption: "Almond Chicken from the lunch menu. Photo: Donna R." },
      { src: "assets/img/review-donna-kung-pao.webp", alt: "Kung pao chicken with peanuts and dried chilies beside white rice", caption: "Kung pao chicken. Photo: Donna R." },
      { src: "assets/img/review-donna-egg-rolls.webp", alt: "Two egg rolls, crispy fried noodles, egg drop soup and hot and sour soup", caption: "Egg rolls, crispy noodles, egg drop and hot and sour soup. Photo: Donna R." }
    ]
  }
];

// Google's overall score from the client's screenshot (October 2026). Shown as its own card on the belt.
const GOOGLE_SCORE = {
  rating: 4.1,
  count: 307,
  read: "https://www.google.com/maps/search/?api=1&query=Hunan+West+8938+Burke+Lake+Rd+Springfield+VA",
  yelp: "https://www.yelp.com/biz/hunan-west-springfield"
};

(() => {
  const section = document.querySelector(".reviews");
  if (!section) return;
  const belt = section.querySelector("[data-belt]");
  const track = section.querySelector("[data-belt-track]");
  const prevBtn = section.querySelector("[data-belt-prev]");
  const nextBtn = section.querySelector("[data-belt-next]");
  const pauseBtn = section.querySelector("[data-belt-pause]");
  const status = section.querySelector("[data-belt-status]");
  const lightbox = document.querySelector("[data-lightbox]");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  const SPEED = 34; // px per second, right to left

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  const stars = (n, label) => {
    const wrap = el("span", "stars");
    wrap.setAttribute("role", "img");
    wrap.setAttribute("aria-label", label || `${n} out of 5 stars`);
    for (let i = 0; i < 5; i++) {
      const s = el("span", "star");
      s.style.setProperty("--fill", `${Math.max(0, Math.min(1, n - i)) * 100}%`);
      s.setAttribute("aria-hidden", "true");
      wrap.append(s);
    }
    return wrap;
  };

  /* ---------- Cards ---------- */
  const reviewCard = (r, i) => {
    const card = el("article", "rv");
    card.dataset.i = i;
    const id = `rv-${i}`;
    card.setAttribute("aria-labelledby", `${id}-name`);

    const head = el("header", "rv__head");
    const mono = el("span", "rv__mono", r.name.split(" ").map(w => w[0]).join(""));
    mono.setAttribute("aria-hidden", "true");
    const who = el("div", "rv__who");
    const name = el("h3", "rv__name", r.name);
    name.id = `${id}-name`;
    if (r.badge) name.append(" ", el("span", "rv__badge", r.badge));
    who.append(name, el("p", "rv__place", r.place));
    head.append(mono, who);

    const meta = el("p", "rv__meta");
    const time = el("time", null, fmt.format(new Date(r.date)));
    time.dateTime = r.date;
    meta.append(stars(r.rating), time, el("span", "rv__src", "on Yelp"));

    const quote = el("blockquote", "rv__quote");
    quote.append(el("p", "rv__pull", `“${r.pull}”`));
    const body = el("div", "rv__body");
    body.id = `${id}-body`;
    r.body.forEach(p => body.append(el("p", null, p)));
    quote.append(body);
    card.append(head, meta, quote);

    if (r.photos && r.photos.length) {
      const row = el("div", "rv__photos");
      r.photos.forEach(ph => {
        const b = el("button", "rv__photo");
        b.type = "button";
        b.dataset.src = ph.src;
        b.dataset.caption = ph.caption || "";
        b.setAttribute("aria-label", `View photo: ${ph.alt}`);
        const img = el("img");
        img.src = ph.src;
        img.alt = "";
        img.loading = "lazy";
        img.draggable = false;
        b.append(img);
        row.append(b);
      });
      card.append(row);
    }

    const more = el("button", "rv__more", "Read the full review");
    more.type = "button";
    more.setAttribute("aria-controls", body.id);
    more.setAttribute("aria-expanded", "false");
    card.append(more);
    return card;
  };

  const scoreCard = () => {
    const card = el("article", "rv rv--score");
    card.setAttribute("aria-label", `Rated ${GOOGLE_SCORE.rating} out of 5 on Google`);
    const top = el("div", "rv__score-top");
    top.append(el("p", "rv__score", GOOGLE_SCORE.rating.toFixed(1)),
      stars(GOOGLE_SCORE.rating, `${GOOGLE_SCORE.rating} out of 5 stars`),
      el("p", "rv__score-note", `from ${GOOGLE_SCORE.count} reviews on Google`));
    const links = el("div", "rv__links");
    const a1 = el("a", "rv__link", "Read them on Google");
    a1.href = GOOGLE_SCORE.read;
    const a2 = el("a", "rv__link", "Review us on Yelp");
    a2.href = GOOGLE_SCORE.yelp;
    [a1, a2].forEach(a => { a.target = "_blank"; a.rel = "noopener"; a.draggable = false; a.append(el("span", null, " ↗")); });
    links.append(a1, a2);
    card.append(top, links);
    return card;
  };

  // One set: newest review, the Google score, then the rest by date.
  const sorted = REVIEWS.map((r, i) => [r, i]).sort((a, b) => b[0].date.localeCompare(a[0].date));
  const buildSet = () => {
    const set = sorted.map(([r, i]) => reviewCard(r, i));
    set.splice(1, 0, scoreCard());
    set.forEach(c => c.setAttribute("role", "listitem"));
    return set;
  };

  // The first set is the real one; copies fill the belt so it can loop and are hidden from screen readers.
  const asCopy = card => {
    card.setAttribute("aria-hidden", "true");
    card.removeAttribute("role");
    card.querySelectorAll("[id]").forEach(n => n.removeAttribute("id"));
    card.querySelectorAll("button, a").forEach(n => n.tabIndex = -1);
    card.removeAttribute("aria-labelledby");
    return card;
  };

  let period = 1;
  const build = () => {
    track.textContent = "";
    buildSet().forEach(c => track.append(c));
    buildSet().forEach(c => track.append(asCopy(c)));
    const first = track.children[0];
    const setLen = track.children.length / 2;
    period = track.children[setLen].offsetLeft - first.offsetLeft || 1;
    while (track.scrollWidth < period + belt.clientWidth * 1.5) buildSet().forEach(c => track.append(asCopy(c)));
    syncOpen();
  };

  /* ---------- Motion: drift right to left, ease to a stop, drag, glide ---------- */
  let offset = 0, speed = 0, fling = 0, glide = null, openIdx = null;
  let last = performance.now(), raf = 0, painted = null;
  const hold = { user: false, hover: false, focus: false, offscreen: true, hidden: document.hidden, drag: false };
  const running = () => !reduced.matches && !hold.user && !hold.hover && !hold.focus && !hold.drag && openIdx === null;

  const paint = () => {
    const shown = ((offset % period) + period) % period;
    const v = shown.toFixed(1);
    if (v !== painted) { track.style.transform = `translate3d(${-v}px,0,0)`; painted = v; }
  };

  const tick = now => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    speed += ((running() ? SPEED : 0) - speed) * (1 - Math.exp(-dt * 3));
    if (glide !== null) {
      offset += (glide - offset) * (1 - Math.exp(-dt * 8));
      if (Math.abs(glide - offset) < 0.4) { offset = glide; glide = null; }
    } else if (!hold.drag) {
      offset += (speed + fling) * dt;
      fling *= Math.exp(-dt * 3.5);
      if (Math.abs(fling) < 3) fling = 0;
    }
    paint();
    raf = requestAnimationFrame(tick);
  };
  const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  const sync = () => {
    (hold.offscreen || hold.hidden) ? stop() : start();
    section.classList.toggle("is-running", running());
  };

  const glideTo = to => {
    fling = 0;
    if (reduced.matches) { offset = to; glide = null; paint(); }
    else glide = to;
  };
  const centerOf = card => {
    const r = card.getBoundingClientRect(), b = belt.getBoundingClientRect();
    return offset + (r.left + r.width / 2) - (b.left + b.width / 2);
  };

  /* ---------- Open a review: stop, center it, show all of it ---------- */
  function syncOpen() {
    track.classList.toggle("has-open", openIdx !== null);
    track.querySelectorAll(".rv[data-i]").forEach(c => {
      const on = String(openIdx) === c.dataset.i;
      c.classList.toggle("is-open", on);
      const more = c.querySelector(".rv__more");
      more.setAttribute("aria-expanded", String(on));
      more.textContent = on ? "Show less" : "Read the full review";
    });
    measure();
  }
  const open = card => {
    openIdx = +card.dataset.i;
    syncOpen();
    glideTo(centerOf(card));
    status.textContent = `Stopped on ${REVIEWS[openIdx].name}'s review`;
    sync();
  };
  const close = () => {
    if (openIdx === null) return;
    openIdx = null;
    syncOpen();
    status.textContent = "Reviews moving again";
    sync();
  };

  // Hide "Read the full review" where nothing is cut off.
  function measure() {
    track.querySelectorAll(".rv[data-i]").forEach(c => {
      if (c.classList.contains("is-open")) return;
      const body = c.querySelector(".rv__body");
      c.querySelector(".rv__more").hidden = body.scrollHeight <= body.clientHeight + 2 && !c.querySelector(".rv__photos");
    });
  }

  /* ---------- Lightbox for review photos ---------- */
  const showPhoto = btn => {
    if (!lightbox || typeof lightbox.showModal !== "function") return;
    lightbox.querySelector("[data-lightbox-img]").src = btn.dataset.src;
    lightbox.querySelector("[data-lightbox-img]").alt = btn.getAttribute("aria-label").replace(/^View photo: /, "");
    lightbox.querySelector("[data-lightbox-cap]").textContent = btn.dataset.caption;
    lightbox.showModal();
  };
  if (lightbox) {
    lightbox.querySelector("[data-lightbox-close]").addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("click", e => { if (e.target === lightbox) lightbox.close(); });
  }

  /* ---------- Input ---------- */
  let suppressClick = false;
  track.addEventListener("click", e => {
    if (suppressClick) { e.preventDefault(); e.stopPropagation(); return; }
    if (e.target.closest("a")) return;
    const card = e.target.closest(".rv[data-i]");
    if (!card) return;
    const photo = e.target.closest(".rv__photo");
    if (photo) {
      if (String(openIdx) !== card.dataset.i) open(card);
      showPhoto(photo);
      return;
    }
    if (String(openIdx) === card.dataset.i) close();
    else open(card);
  });

  document.addEventListener("click", e => {
    if (openIdx !== null && !e.target.closest(".belt, .belt__controls, [data-lightbox]")) close();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && openIdx !== null && !(lightbox && lightbox.open)) close();
  });

  const step = () => {
    const c = track.querySelector(".rv");
    return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 20) : 400;
  };
  const move = dir => {
    if (openIdx !== null) {
      // Step to the neighbouring review (the copy nearest the center in that direction) and open it.
      const mid = belt.getBoundingClientRect().left + belt.clientWidth / 2;
      const cards = [...track.querySelectorAll(".rv[data-i]")]
        .map(c => ({ c, x: c.getBoundingClientRect().left + c.offsetWidth / 2 - mid }))
        .filter(o => dir > 0 ? o.x > 40 : o.x < -40)
        .sort((a, b) => Math.abs(a.x) - Math.abs(b.x));
      if (cards[0]) open(cards[0].c);
      return;
    }
    glideTo((glide ?? offset) + dir * step());
  };
  prevBtn.addEventListener("click", () => move(-1));
  nextBtn.addEventListener("click", () => move(1));
  belt.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
  });

  pauseBtn.addEventListener("click", () => {
    hold.user = !hold.user;
    pauseBtn.setAttribute("aria-pressed", String(hold.user));
    pauseBtn.querySelector("span").textContent = hold.user ? "Play" : "Pause";
    status.textContent = hold.user ? "Reviews paused" : "Reviews moving";
    sync();
  });

  belt.addEventListener("pointerenter", e => { if (e.pointerType === "mouse" && finePointer.matches) { hold.hover = true; sync(); } });
  belt.addEventListener("pointerleave", e => { if (e.pointerType === "mouse") { hold.hover = false; sync(); } });
  belt.addEventListener("focusin", () => { hold.focus = true; sync(); });
  belt.addEventListener("focusout", e => { if (!belt.contains(e.relatedTarget)) { hold.focus = false; sync(); } });

  // Drag (mouse) or swipe (touch) to look around; a quick flick keeps it gliding.
  let down = null;
  belt.addEventListener("pointerdown", e => {
    if (e.button !== 0) return;
    down = { id: e.pointerId, x: e.clientX, y: e.clientY, from: offset, lx: e.clientX, lt: e.timeStamp, v: 0 };
  });
  belt.addEventListener("pointermove", e => {
    if (!down || e.pointerId !== down.id) return;
    const dx = e.clientX - down.x, dy = e.clientY - down.y;
    if (!hold.drag) {
      if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { down = null; return; }
      if (Math.abs(dx) < 8) return;
      hold.drag = true;
      glide = null;
      fling = 0;
      try { belt.setPointerCapture(down.id); } catch (_) {}
      belt.classList.add("is-dragging");
      sync();
    }
    offset = down.from - dx;
    const dt = Math.max(1, e.timeStamp - down.lt);
    down.v = 0.8 * (-(e.clientX - down.lx) / dt * 1000) + 0.2 * down.v;
    down.lx = e.clientX;
    down.lt = e.timeStamp;
    paint();
  });
  const release = e => {
    if (!down || (e && e.pointerId !== down.id)) return;
    if (hold.drag) {
      if (!reduced.matches) fling = Math.max(-2400, Math.min(2400, down.v));
      hold.drag = false;
      belt.classList.remove("is-dragging");
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 60);
      sync();
    }
    down = null;
  };
  belt.addEventListener("pointerup", release);
  belt.addEventListener("pointercancel", release);
  belt.addEventListener("dragstart", e => e.preventDefault());

  // Sideways trackpad scrolling moves the belt too.
  belt.addEventListener("wheel", e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    glide = null;
    offset += e.deltaX;
    paint();
  }, { passive: false });

  document.addEventListener("visibilitychange", () => { hold.hidden = document.hidden; sync(); });
  reduced.addEventListener("change", sync);

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => { hold.offscreen = !entry.isIntersecting; sync(); }, { threshold: 0 }).observe(belt);
  } else {
    hold.offscreen = false;
  }

  // Start with the first card lined up with the heading above it.
  let width = 0, placed = false;
  const onResize = () => {
    if (belt.clientWidth === width) { measure(); return; }
    width = belt.clientWidth;
    build();
    if (!placed) {
      const head = section.querySelector(".reviews__head");
      offset = period - (head.getBoundingClientRect().left - belt.getBoundingClientRect().left);
      placed = true;
    }
    paint();
  };
  addEventListener("resize", () => { clearTimeout(onResize.t); onResize.t = setTimeout(onResize, 150); });
  if (document.fonts) document.fonts.ready.then(measure);

  onResize();
  sync();
})();
