# North Durham Community Atlas — Update Guide

This guide explains how to keep the atlas current, add new listings, and
manage the regional map layers. No coding experience is needed for most tasks.

---

## 1. Adding or editing a community listing

All listings live in one file: `data/listings.json`

Open it in any text editor. Each listing looks like this:

```json
{
  "id": "41",
  "name": "Port Perry Repair Café",
  "category": "Repair Skills",
  "address": "16 Water St, Port Perry, ON",
  "lat": 44.1062,
  "lng": -78.9471,
  "hours": "First Saturday monthly, 10am–1pm",
  "description": "Volunteers repair small appliances, clothing, bikes, and electronics for free.",
  "contact": "repaircafe@example.ca",
  "tags": ["repair", "free", "skill-share"]
}
```

**Rules:**
- `id` must be unique — use the next number in sequence
- `category` must be exactly one of the eight options (see below)
- `lat` / `lng` — find coordinates using [maps.google.com](https://maps.google.com):
  right-click a location → "What's here?" → copy the numbers shown
- `contact` and `tags` are optional but helpful
- Separate each listing with a comma; the last listing in the file has no comma

**The eight categories:**
| Category | What belongs here |
|---|---|
| Free Food | Food banks, community fridges, free meal programs |
| Tenant Defense | Housing support, legal aid, tenant organizing |
| Public Space | Parks, trails, community gathering areas |
| Repair Skills | Repair cafés, tool libraries, skill-share workshops |
| Local Makers | Artisans, independent producers, farmers markets |
| Gathering Places | Halls, churches, libraries open for community use |
| Mutual Aid | Neighbour networks, care networks, emergency support |
| Co-op Leads | Co-operatives, buying clubs, collective enterprises |

---

## 2. Adding or editing an event

Events live in `data/events.json`. Each event:

```json
{
  "id": "7",
  "title": "Uxbridge Repair Café",
  "date": "2026-07-05",
  "time": "10:00am – 1:00pm",
  "location": "Uxbridge Music Hall, 7 Main St S, Uxbridge",
  "description": "Bring broken items — volunteers fix them for free.",
  "category": "Repair Skills",
  "url": "https://example.ca/event"
}
```

`url` is optional. `date` format is `YYYY-MM-DD`. Past events automatically
move to the "Past Events" section on the Events page.

---

## 3. Adding a story of solidarity

Stories live in `data/stories.json`. Each story:

```json
{
  "id": "4",
  "title": "The title of the story",
  "source": "Source name (e.g. Durham This Week)",
  "date": "June 2026",
  "excerpt": "A short paragraph — 2–4 sentences summarizing the story.",
  "url": "https://link-to-original-article.ca"
}
```

`url` is optional for community-submitted stories — leave it out and the
card will show "Community-submitted" instead of a link.

---

## 4. Adding a Durham Region Open Data layer to the map

The map fetches real-time data from **Durham Region's public ArcGIS API**.
All available layer numbers are documented at:

```
https://maps.durham.ca/arcgis/rest/services/Open_Data/Durham_OpenData/MapServer
https://maps.durham.ca/arcgis/rest/services/yourDurham/yourDurhamLayers/MapServer
```

To add a new layer, open `components/Map.tsx` and find the `DURHAM_LAYERS`
array near the top of the file. Add a new entry:

```typescript
{
  id: "seniors",           // unique identifier (no spaces)
  label: "Senior Services", // shown in the map legend
  color: "#E3A24C",        // brand colour for this layer
  url: arcgisUrl(ARCGIS_BASE, 18),  // layer number from the MapServer above
  type: "point",           // "point", "line", or "polygon"
},
```

**Finding the right layer number:**
1. Open `https://maps.durham.ca/arcgis/rest/services/Open_Data/Durham_OpenData/MapServer`
   in your browser
2. The page lists all layers with their numbers (e.g. `4 (COMMUNITY_Community_Services)`)
3. Use that number in `arcgisUrl(ARCGIS_BASE, 4)`

**Choosing a type:**
- `point` — individual locations (e.g. buildings, stops, services)
- `line` — linear features (e.g. trails, roads)
- `polygon` — areas (e.g. parks, neighbourhoods)

---

## 5. Adding a resource link

The Resources page lists external links for organizers and local services.
Open `app/resources/page.tsx` and find either `ACTIVIST_RESOURCES` or
`LOCAL_RESOURCES` (for North Durham-specific links). Add:

```typescript
{
  name: "Organization Name",
  description: "One or two sentences about what this resource offers.",
  url: "https://example.ca",
  tag: "Category Label",
},
```

---

## 6. Changing the brand colours

All brand colours are defined in two places:

1. `types/index.ts` — category colours for the map and filter chips
2. Inline `style` props throughout the components

The eight brand colours:

| Name | Hex | Used for |
|---|---|---|
| Forest Green | `#2F5D50` | Hero, footer, nav, dark CTAs |
| Teal | `#2F6F73` | Stats, philosophy sections, links |
| Soft Green | `#7A9E7E` | Accent labels, secondary buttons |
| Blue-Grey | `#C2D1DB` | Card backgrounds, borders |
| Cream | `#F6F1E8` | Page backgrounds |
| Brown | `#3F352C` | Body text |
| Burnt Orange | `#C65A1E` | Primary CTA buttons, urgent sections |
| Amber | `#E3A24C` | Events section, highlights |

---

## 7. How to publish changes

This site runs as a static Next.js export. After editing any file:

### If you have git set up locally:

```bash
git remote set-url origin https://github.com/jodijanwin/Community-Atlas-Drop.git
git add .
git commit -m "Brief description of what you changed"
git push -u origin claude/gracious-ramanujan-fZ1kb
```

### If you are hosting on Vercel (recommended):

Once the repository is connected to Vercel, every push to the main branch
automatically rebuilds and redeploys the site. No further action needed.

Connect at: [vercel.com/new](https://vercel.com/new) → Import Git Repository →
select `jodijanwin/Community-Atlas-Drop`.

### If you are hosting as static files:

Run `npm run build` — this creates an `out/` folder with all HTML, CSS, and
JS files ready to upload to any web host (Netlify, GitHub Pages, your own server).

---

## 8. Verifying your changes before publishing

Run the site locally to preview changes before pushing:

```bash
npm install          # first time only
npm run dev          # starts local server at http://localhost:3000
```

Open `http://localhost:3000` in your browser. Changes to JSON data files
appear immediately. Changes to `.tsx` component files reload automatically.

---

## 9. Getting help

- Durham Region Open Data: [opendata.durham.ca](https://opendata.durham.ca)
- Durham GIS contact: GISServices@durham.ca
- Atlas issues: open a GitHub issue at `jodijanwin/Community-Atlas-Drop`
