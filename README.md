# FitLoop — Mobile Web Prototype

Companion beside Swiggy/Zomato for people who diet / lose weight but still order delivery.  
Simulate device Health burn, log delivery + home with shared portions, see consumed vs burned vs goal, earn FitLoop coins for on-track days.

**Not** an EatRight-style discovery clone — this is a ledger + daily loop.

## Run

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`). Best viewed at phone width (~390px); the UI is already max-width centered.

## Demo click path (60–90s)

1. **Onboarding** — Read value pitch → **Get started**.
2. **Connect Health** — Tap **Apple Health** (or **Use demo data**).
3. **Goal** — Choose **Lose weight** → Continue.
4. **Targets** — Keep defaults (1800 kcal / 120g) → Continue.
5. **Share meals** — Tap **Yes — I often share** → **Go to Today**.
6. **Today** — Note Consumed / Burned / Remaining (Remaining = Goal − Consumed only). Burn labeled from Apple Health (demo).
7. **Log** → **Delivery order** → **Chicken Biryani** → **Shared / partial** → **1/2** → **Apply** → **Confirm & add**.
8. **Log** → **Home / local** → **2 Roti + Dal** → Confirm.
9. **What can I still order** → see remaining + chips → **Open Swiggy (demo)** (alert / link).
10. **Rewards** → **Simulate end of day** (may need calorie goal tweak or more/less food to land in ±10% band) → see coins → redeem mock coupon.
11. **Activity / Goals / Settings** — quick peek; Settings has disclaimer + reset.

**Tip for coins in one take:** After logging half biryani + home food, open **Goals** and set calorie goal near your consumed total (within 10%), then **Rewards → Simulate end of day**.

## Screens

| Screen | What it shows |
|--------|----------------|
| Onboarding | Value → Health → Goal → Targets → Share tip → Today |
| Today | Consumed / Burned / Remaining, protein bar, log list, actions |
| Log Delivery | 10 Indian demo dishes with platform-estimate tags |
| Confirm + Portion | Ate all? / 1/2·1/3·1/4·%·spoons → user adjusted tag |
| Log Home | Roti, rice, dal, sabzi, egg, curd, oil/ghee, chai, custom |
| Activity | Fake steps + active kcal + sync refresh |
| Goals | Edit calorie/protein + week stub |
| Still order | Remaining + chips + Swiggy/Zomato demo |
| Rewards | Coins, simulate EOD, mock coupons |
| Settings | Health status, share tip toggle, disclaimer, reset |

## Tech

- Vite + React + TypeScript + custom CSS (mobile-first, max-width 390px)
- `localStorage` key `fitloop-v1` for persistence
- All dummy data — no real Health / Swiggy APIs

## Design rules baked in

- Confidence tags on every food line
- Confirm before commit on delivery logs
- Coins only for on-track days (±10% calorie goal + ≥1 log)
- Remaining does **not** add burn into budget

## Reset

Settings → **Reset demo / replay onboarding**, or clear site data for `fitloop-v1`.
