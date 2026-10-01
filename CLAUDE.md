# Hunan West site

New site for Hunan West (西湖), Chinese restaurant in Kings Park Shopping Center, 8938 Burke Lake Rd, Springfield, VA 22151.
Their current site, https://www.hunanwest.com/, is only an online ordering login page (no menu or story).
Brief from the client: use the store info, hours, menu and title supplied, and add a reviews section built from the
supplied reviews that people can interact with while it scrolls right to left (as on `hens18/hybachi`, `hens18/bakery`
and `hens18/kanji`).

## Standing rule: live link after every change

After EVERY commit (and push), publish the current site as the live preview and give the user the link:

1. `node scripts/build-preview.js --artifact` (bundles `site/` into `.preview/live.html`)
2. Publish `.preview/live.html` with the Artifact tool. Reuse the same URL every time: pass `url` = the live link
   below so it updates in place instead of creating a new one.
3. End the reply with the live link.

Live preview link: https://claude.ai/artifact/88cVxJ7GUFPaZXgLaYgnQH (private until shared from its Share menu)

## Business facts (sources)

- Phone (703) 425-1703. Google: 4.1 stars, 307 reviews, $10 to $20, "Chinese restaurant", service options
  Vegetarian options and High chairs (client's Google screenshot, Oct 1 2026).
- Hours, from hunanwest.com and matching Google ("Closes 9:30 PM" on a Thursday): Mon to Sat 11:30 AM to 9:30 PM,
  Sun 12 PM to 9:30 PM. Online ordering until 9 PM, delivery after 4:30 PM. Older listings (Yelp snippet,
  Yellow Pages) still say 10 PM / 10:30 PM; those are out of date. Source of truth: `HOURS` in `site/assets/main.js`,
  repeated in the JSON-LD in `site/index.html` and in the footer (update all three).
- "Down the row from the Giant" comes from the TripAdvisor review snippet in the client's screenshot.
- Ordering links: order.online/store/hunan-west-31837019 (the Google "Order pickup / delivery" buttons go here),
  DoorDash store 31837019, Uber Eats eRAdv91dRaOs0hlZjy2Mxw. hunanwest.com's own ordering needs a sign-in.
- hunanwest.com shows Facebook, Instagram and TikTok icons with empty links, so the site lists no social accounts.

## Menu

`site/assets/menu-data.js` holds the whole menu (205 dishes, 13 sections) from the client's Yelp menu paste.
`menu.js` builds the section list, search, filters and the favorites chips from it.
- Cleanup: the raw-food caution Yelp repeats on every item is shown once under the menu. Names and descriptions
  lightly cleaned (articles, plurals, "Chn" to Chinese, "Fry Rice" to Fried Rice, "Fry Tofu" to Fried Tofu,
  slashes written out, "wood fungus" / "tree mushroom" to wood ear mushroom, "Spicy." prefixes dropped since the
  chili tag shows it). "Beef" section renamed "Beef & Lamb"; Noodle Soup and Chow Mein folded into Rice & Noodles.
- Chinese typos fixed: 鲛 to 餃 (both dumplings), 糊南魷魚 to 湖南魷魚, 公保雞 to 宮保雞, 芝痲 to 芝麻,
  紅油炒手 to 紅油抄手, 磨菇雞 to 蘑菇雞, 星州 to 星洲. Section names in Chinese (招牌菜, 開胃菜 ...) are ours.
- "Popular" = dishes with 4+ reviews on their Yelp menu page. Spicy is read from the menu text (rules in menu.js),
  71 dishes; `"spicy"` / `"mild"` tags override it.

## NEEDS OWNER CONFIRMATION

- Prices are from Yelp. Are they current, and are they dine-in prices?
- Lunch menu: Donna R. mentions lunch combos at $10 to $12. We have no lunch menu or lunch hours; the site only says
  "ask about lunch combos".
- Peking Duck $28.95: half or whole duck?
- Thai Basil is 香茅 (lemongrass) on their menu; Pork with Black Bean Sauce has no Chinese name.
- "Crispy Beef Proper" / "Crispy Chicken Proper": kept as written.
- Photos: hot plate and crispy chicken came from the client. Dining room, round table, kung pao combo and lo mein
  are from hunanwest.com (2019 files, 760x380). Confirm they are theirs and current; higher-resolution photos would help.
  The crispy chicken photo is captioned generically because it could be General Tso or Cleopatra Chicken.
- Year opened, owner story, catering, private parties, parking: not on the site until confirmed.

## Reviews

- `site/assets/reviews.js`: the two reviews the client supplied, word for word (Manoj V. 5 stars Sep 25 2026;
  Donna R. 5 stars Jul 11 2026, Yelp Elite '26, three photos cropped from her review). Plus a Google score card
  (4.1, 307 reviews). Never invent or edit review text. More reviews make the belt less repetitive.
- Belt behavior: drifts right to left; hover or keyboard focus eases it to a stop; drag or swipe (with fling) and
  sideways trackpad scroll move it; tapping a review stops it, centers it and shows the full text; review photos
  open in a lightbox; prev/next step one card (or to the next review when one is open); Pause button; Esc closes.
  Reduced motion: no drift, everything else works. Copies after the first set are aria-hidden.

## Design direction (current)

- Blue-and-white porcelain: porcelain page (`--porcelain`), cobalt ink (`--cobalt`), seal red (`--seal`) used rarely.
  Taken from the blue plates in the food photos and the red lettering on their sign.
- Signature: the hero dish photo is set inside a porcelain plate rim with the 回紋 key pattern (generated in main.js),
  steam rising off it, and a red 西湖 seal stamped on the edge (their logo reads 西湖 in seal script).
  The key pattern also edges the reviews band and the footer.
- Type: Young Serif (display), Instrument Sans (body), Noto Serif TC (Chinese).
- Copy rules: no em dashes anywhere, none of leverage, seamless, empower, unlock, robust, actionable, data-driven,
  solutions, testament, landscape, delve, elevate.
- Nothing meant to be read rests at opacity 0 waiting for an animation; entrances move, they never fade in.

## Layout

- `site/index.html` + `site/assets/`: plain HTML/CSS/vanilla JS, no build step. `site.css` tokens and sections,
  `reviews.css`/`reviews.js` the belt, `menu-data.js`/`menu.js` the menu, `main.js` nav, plate rim and hours.
- Preview: `node scripts/build-preview.js` writes `.preview/index.html` (one self-contained file, images inlined);
  `--artifact` writes `.preview/live.html` for the live link.
- Deploy: GitHub Pages via `.github/workflows/pages.yml`, which publishes `site/` on every push to `main`.
  Settings > Pages > Source must be "GitHub Actions". The repo has no `main` yet; merge the work branch into `main`
  and make it the default branch first. Patch the `DEPLOY STEP` comment (og:url, og:image) once the domain exists.
