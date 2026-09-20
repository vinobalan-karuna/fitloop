# FitLoop — Process & Workflow (v1 concept lock)

Working name: **FitLoop** (rename anytime).  
Positioning: Companion beside Swiggy/Zomato — close the day with device burn + food logs + goals. Not another EatRight discovery catalog.

---

## 1. Product one-liner

For people who still order delivery while dieting or building fitness, FitLoop pulls activity they already track on the phone/watch, logs what they actually ate (delivery + home + local, with honest portions), and shows consumed vs burned vs goal — then rewards days they stay on track.

---

## 2. Primary user (persona)

**Primary:** Urban India, 22–40, orders Swiggy/Zomato several times a week, also eats home/PG/local food, already has Apple Health / Google Fit / Samsung Health / Fitbit (or is willing to connect one). Goal: fat loss, protein target, or “eat better without quitting delivery.”

**Jobs to be done**
1. Know if today’s delivery + home food still fits my goal.
2. Log shared food without lying to myself (biryani split).
3. See burn from my watch without opening three apps.
4. Decide what I can still order tonight.

**Non-goals for v1**
- Rebuild Swiggy/Zomato restaurant discovery at scale
- Lab-certified restaurant nutrition
- New wearable or workout social network
- Real Swiggy/Zomato partner coins (use FitLoop coins in demo)

---

## 3. End-to-end build process (your roadmap)

| Stage | Outcome | Done when |
|-------|---------|-----------|
| **A. Concept** (done) | Problem, gap vs EatRight, v1 scope | One-pager agreed |
| **B. Process / workflow** (this doc) | Journeys, rules, metrics | Flows reviewable in a pitch |
| **C. Prototype** | Clickable / dummy-data walkthrough | 60–90s video possible |
| **D. App (Android + iOS)** | Flutter or React Native MVP | Installable build + Health sync stub |
| **E. Share** | Case study + demo for PM interviews | Deck + video + build link |

---

## 4. Core principles (design rules)

1. **Integrate, don’t reinvent** — steps/burn come from the device OS/health apps.
2. **Estimates are honest** — every calorie line has a confidence tag: `platform estimate` | `user adjusted` | `user weighed`.
3. **Confirm before commit** — never auto-log a full delivery order without user confirm (trust risk).
4. **India-first logging** — thali parts, oil/ghee, share fractions, “spoons of biryani.”
5. **Rewards follow outcomes** — coins for days inside the goal band, not for “ordered a healthy tag.”
6. **v1 is a ledger + loop** — thin “what can I still order” layer; deep-link out to Swiggy/Zomato for checkout.

---

## 5. Information architecture (v1 screens)

1. **Home (Today)** — consumed / burned / remaining; goal progress; quick actions
2. **Log food** — Delivery | Home / local | Adjust portion
3. **Activity** — synced from Health (read-only summary)
4. **Goals** — calories, protein, weight optional; weekly view
5. **Rewards** — FitLoop coins, streak of on-track days
6. **Settings** — Health connect, units, disclaimers

---

## 6. Key workflows

### 6.1 Onboarding (first open)

```
Start
  → Value screen: “Close your food day with the activity you already track”
  → Connect Health (Apple Health / Health Connect / Samsung) — allow skip with dummy data for demo
  → Set primary goal (Lose weight | Hit protein | Maintain)
  → Set daily calorie + optional protein target (smart defaults by goal)
  → Optional: “I often share meals” → enable portion tips
  → Land on Today with empty log + synced burn (or demo burn)
```

**Success:** User reaches Today in under 2 minutes with a goal set.

### 6.2 Daily loop (happy path)

```
Morning
  → App opens / notification: “Yesterday: on track / over by X”
  → Burn begins updating from Health through the day

Meal moments (breakfast / lunch / snack / dinner)
  → User logs food (see 6.3 / 6.4)
  → Today recalculates remaining macros

Evening (hungry + may order)
  → User taps “What can I still order?”
  → See remaining calories/protein
  → 3–5 suggestion chips (cuisine-agnostic targets, e.g. “~400 kcal, 30g+ protein”)
  → Deep-link / copy intent → Swiggy or Zomato (external)
  → After order: user returns → confirm log from delivery (6.3)

End of day
  → Summary: consumed vs burned vs goal
  → If inside band → award FitLoop coins (6.6)
```

### 6.3 Log delivery order

```
Tap Log → Delivery
  → Entry modes (v1 pick one primary + fallbacks):
       A. Manual: restaurant + dish + platform estimate (user types or picks from demo catalog)
       B. Paste / photo of order summary (prototype can fake OCR)
       C. “Import demo order” (for pitch video)
  → Show macros with tag: platform estimate
  → Ask: “Did you eat all of it?”
       → Yes → log 100%
       → Shared / partial → Portion adjuster (6.5)
  → User confirms → write to Today ledger
  → Optional: “Mark trust” (looks right / feels high / feels low) → stores for later trust score story
```

**Rule:** Platform macros never become “truth” until user confirms or adjusts.

### 6.4 Log home / local food

```
Tap Log → Home or local
  → Quick picks: roti, rice, dal, sabzi, egg, curd, oil/ghee spoon, chai, custom
  → Multi-select components (thali-friendly)
  → Portion: count / spoons / bowl size
  → Confidence: user entry (default)
  → Confirm → Today ledger
```

### 6.5 Portion / shared meal adjuster

```
Dish logged at full estimate (e.g. chicken biryani 650 kcal, 28g protein)
  → Adjust UI:
       - Fraction: 1/2, 1/3, 1/4, custom %
       - Or “spoons / pieces” with rough conversion
  → Preview new totals live
  → Save as user adjusted
```

**Why this exists:** Research — shared biryani and under-delivered “protein” bowls; honesty is the product.

### 6.6 Health sync (device data)

```
Background / on foreground
  → Read: active energy / steps / (optional) workouts for today
  → Show on Today as Burned
  → Do not invent a new step counter
  → If permission denied → demo mode banner + manual burn entry (portfolio only)
```

### 6.7 Goals & “remaining”

```
Remaining calories = Goal calories − Consumed + (optional policy for burned)
v1 policy (simple, explainable):
  - Show Consumed, Burned, and Goal as three numbers
  - “Remaining to eat” = Goal − Consumed
  - Burn shown for context (“you burned 420 so far”) — do not auto-add burn into eat budget in v1
    (avoids overeating from noisy burn estimates; note as v1.1 decision)
```

### 6.8 FitLoop coins (rewards)

```
End of calendar day (local time)
  → If Consumed within goal band (e.g. ±10% of calorie goal) AND at least 1 food log
       → Award coins (e.g. 10)
  → Optional bonus: protein target also met → +5
  → Streak: consecutive on-track days → multiplier (cap it)
  → Coins redeem in-app for “demo offers” (mock Swiggy-like coupons) — label as prototype
```

**Do not:** award coins only for tapping a “healthy” restaurant tag.

### 6.9 Trust & safety (always on)

- Footer disclaimer: estimates only; not medical advice
- Source on each line: Platform / User / Demo
- No disease treatment claims in pitch or UI

---

## 7. Success metrics (for PM story)

| Metric | Definition | Why it matters |
|--------|------------|----------------|
| Time-to-first-log | Open → first confirmed food log | Friction |
| Logs per active day | Food entries / day among actives | Habit |
| Portion-adjust rate | % of delivery logs with share/partial | Honesty feature used |
| On-track day rate | Days inside calorie band / active days | Core outcome |
| Health connect rate | % users with live sync vs demo | Integration thesis |
| Return D7 | Users back in 7 days | Retention |

Interview line: “EatRight optimizes healthy *orders*; we optimize on-track *days* while people still order out.”

---

## 8. Prototype scope (next stage after this process)

**In prototype (dummy data OK)**
- Onboarding + Today dashboard
- Log delivery (demo orders) + portion slider
- Log home quick picks
- Fake Health burn that updates
- End-of-day coins
- One “remaining macros → suggestion chips” screen

**Out of prototype**
- Real Swiggy API, payments, live partner coins
- Full restaurant search
- Social feed

---

## 9. Swimlane — actors

| Step | User | FitLoop | Device Health | Swiggy/Zomato |
|------|------|---------|---------------|---------------|
| Connect | Approves | Requests scopes | Returns steps/burn | — |
| Order food | Orders in other app | — | — | Fulfills order |
| Log delivery | Confirms / adjusts portion | Stores ledger | — | Macros as estimate input |
| Log home | Enters food | Stores ledger | — | — |
| See day | Views Today | Computes remaining | Updates burn | — |
| Order within budget | Taps suggestions | Shows targets | — | Checkout via deep-link |
| Rewards | Views coins | Awards on-track day | — | Mock offers only in v1 |

---

## 10. Open decisions (resolve before or during prototype)

1. Product name (FitLoop vs your brand)
2. Remaining-calories policy: include burned in eat budget or not? (v1 = not)
3. Primary platform first for Health: Apple vs Android Health Connect
4. Demo catalog: invent 8–10 dishes with intentional “suspect” macros to show adjust UX

---

## 11. Pitch flow (60–90s video outline)

1. Problem (10s): I order out, I track steps, the day never adds up; labels feel wrong.
2. Gap (10s): EatRight finds healthy dishes; it doesn’t close burn + home + portions.
3. Demo (50s): Connect Health → log shared biryani → see remaining → coins for on-track day.
4. Ask (10s): Scoped v1 + roadmap; hiring me for this judgment.

