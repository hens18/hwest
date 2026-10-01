(() => {
  // Pause the steam on hidden tabs.
  document.addEventListener("visibilitychange", () => document.body.classList.toggle("paused", document.hidden));

  /* ---------- Nav: a hairline once the page moves under it ---------- */
  const nav = document.querySelector("[data-nav]");
  if (nav) {
    const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Plate rim: the blue-and-white key pattern, one key per step around the circle ---------- */
  const keys = document.querySelector("[data-rim-keys]");
  if (keys) {
    const N = 54; // matches the key width in the #rim-key path (2 * PI * 281 / 54 = 32.7)
    const ns = "http://www.w3.org/2000/svg";
    for (let i = 0; i < N; i++) {
      const use = document.createElementNS(ns, "use");
      use.setAttribute("href", "#rim-key");
      use.setAttribute("transform", `rotate(${(i * 360 / N).toFixed(3)} 300 300)`);
      keys.append(use);
    }
  }

  /* ---------- Hours, today, and open now (Springfield time) ---------- */
  // From the restaurant's own ordering site (hunanwest.com), matching Google:
  // Mon to Sat 11:30 AM to 9:30 PM, Sun 12 PM to 9:30 PM. Also update the JSON-LD in index.html and the footer.
  const HOURS = [ // index = day of week, 0 = Sunday. [name, open, close] in 24h decimal hours
    ["Sunday", 12, 21.5], ["Monday", 11.5, 21.5], ["Tuesday", 11.5, 21.5], ["Wednesday", 11.5, 21.5],
    ["Thursday", 11.5, 21.5], ["Friday", 11.5, 21.5], ["Saturday", 11.5, 21.5]
  ];
  const fmt = h => {
    const hr = Math.floor(h), min = Math.round((h - hr) * 60);
    return `${hr % 12 || 12}${min ? ":" + String(min).padStart(2, "0") : ""} ${hr >= 12 ? "PM" : "AM"}`;
  };

  const springfieldNow = () => {
    const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23"
    }).formatToParts(new Date()).map(p => [p.type, p.value]));
    return {
      day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday),
      time: +parts.hour + parts.minute / 60
    };
  };

  const table = document.querySelector("[data-hours]");
  const pills = document.querySelectorAll("[data-open-pill]");
  const todayEl = document.querySelector("[data-today-hours]");

  const renderHours = () => {
    const { day, time } = springfieldNow();
    if (day < 0) return;

    if (table) {
      table.textContent = "";
      // Monday first, the way people read a week.
      [1, 2, 3, 4, 5, 6, 0].forEach(d => {
        const [name, o, c] = HOURS[d];
        const tr = document.createElement("tr");
        if (d === day) tr.className = "is-today";
        const th = document.createElement("th");
        th.scope = "row";
        th.textContent = name;
        const td = document.createElement("td");
        td.textContent = `${fmt(o)} to ${fmt(c)}`;
        tr.append(th, td);
        table.append(tr);
      });
    }

    const [, o, c] = HOURS[day];
    const open = time >= o && time < c;
    let text;
    if (open) text = `Open now · until ${fmt(c)}`;
    else if (time < o) text = `Opens today at ${fmt(o)}`;
    else {
      const next = (day + 1) % 7;
      text = `Closed now · opens tomorrow at ${fmt(HOURS[next][1])}`;
    }
    pills.forEach(p => {
      p.textContent = text;
      p.classList.toggle("is-open", open);
      p.classList.toggle("is-closed", !open);
    });
    if (todayEl) todayEl.textContent = `${HOURS[day][0]}, ${fmt(o)} to ${fmt(c)}`;
  };
  renderHours();
  setInterval(renderHours, 60000);

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
