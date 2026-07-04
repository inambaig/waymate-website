/**
 * Seeds initial article markdown files.
 * Run once: node scripts/seed-articles.mjs
 * Safe to re-run — skips files that already exist.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.resolve(__dirname, '../content/articles');

const ARTICLES = [
  // ── Carpooling Tips ──
  { category: 'carpooling-tips', slug: 'first-time-carpooler-guide', title: 'First-Time Carpooler? Start Here', description: 'Everything you need to know before your first shared commute on Waymate.', date: '2025-06-15', readTime: 6, body: `## Your first shared ride doesn't have to be awkward

Carpooling in Pakistan is growing fast — and for good reason. Fuel prices keep climbing, traffic in Lahore and Islamabad gets worse every year, and honestly, commuting alone is just boring.

### Before you book

1. **Complete your profile** — Add a clear photo and verify your CNIC. Hosts and passengers both feel safer when profiles are complete.
2. **Check the route** — Make sure the pickup point is walking distance from your home or office.
3. **Message your host** — A quick "See you tomorrow at 8 AM" goes a long way.

### During the ride

- Be on time. Five minutes late affects everyone in the car.
- Keep the conversation friendly but respect if someone prefers quiet.
- Don't eat messy food in someone else's car.

### After the ride

Rate your experience. Honest ratings help the whole Waymate community stay trustworthy.

> **Pro tip:** Try the same route for a full week before deciding if carpooling works for your schedule.` },
  { category: 'carpooling-tips', slug: 'carpool-etiquette-pakistan', title: 'Carpool Etiquette Every Pakistani Commuter Should Know', description: 'The unwritten rules of sharing a ride — from pickup timing to music choices.', date: '2025-06-10', readTime: 5, body: `## Good manners make better carpools

Sharing a car is a small social contract. Follow these etiquette tips and you'll be everyone's favourite carpool mate.

### Timing is everything

In cities like Lahore and Karachi, being 10 minutes late can mean missing the window before traffic peaks. Set a pickup time and stick to it.

### The front seat question

Ask before sitting up front. Some hosts prefer passengers in the back, especially on longer routes.

### Phone calls

Keep calls short or step out at a stop if you need a longer conversation. Speakerphone is almost always a bad idea.

### Cleanliness

Shake off dust before getting in during monsoon season. Leave the car as clean as you found it.

### Payment

Confirm the fare split before the ride starts. Waymate shows costs upfront — no awkward money talks at the end.` },
  { category: 'carpooling-tips', slug: 'morning-commute-routine', title: 'Build a Morning Commute Routine That Actually Works', description: 'Wake up later, stress less, and arrive on time with a shared ride routine.', date: '2025-06-05', readTime: 4, body: `## Stop dreading your morning commute

The secret to a smooth morning isn't waking up at 5 AM — it's building a predictable routine around a shared ride.

### The night before

- Pack your bag and pick your clothes before bed.
- Check your Waymate booking confirmation.
- Set one alarm, not five.

### Morning checklist

1. Leave home 5 minutes before pickup time.
2. Keep your phone charged for live tracking.
3. Have a backup plan (another route or host) for emergencies.

### Why routines matter

When you carpool with the same host and passengers weekly, everyone learns each other's habits. Pickups get faster, conversations flow easier, and your commute becomes something you look forward to.` },
  { category: 'carpooling-tips', slug: 'carpool-with-colleagues', title: 'How to Carpool with Colleagues Without Awkwardness', description: 'Turn your office route into a daily carpool — tips for starting the conversation.', date: '2025-05-28', readTime: 5, body: `## Your coworkers might be your best carpool partners

Office carpools are popular because the route is identical every day and trust is already partially built.

### How to bring it up

Start casual: "Anyone driving from Gulberg to DHA tomorrow? I'm trying Waymate." Most colleagues are paying for solo rides or fuel alone.

### Set ground rules early

- Who drives which days?
- How is fuel split?
- What time is the hard cutoff for lateness?

### Use Waymate for the logistics

Even if you know your colleagues, listing the trip on Waymate gives you verified profiles, in-app payments, and live tracking. It formalises the arrangement without making it stiff.` },
  { category: 'carpooling-tips', slug: 'weekend-vs-weekday-carpooling', title: 'Weekday vs Weekend Carpooling: What\'s Different?', description: 'Weekend trips need different planning — here\'s what experienced carpoolers do differently.', date: '2025-05-20', readTime: 4, body: `## Not all carpools are created equal

Weekday office commutes are predictable. Weekend trips to Murree, the mall, or a wedding are not.

### Weekday carpooling

- Fixed routes, fixed times.
- Same passengers week after week.
- Lower cost per ride because frequency is high.

### Weekend carpooling

- Flexible destinations and departure times.
- Book early — popular routes fill up fast.
- Split fuel based on distance, not just headcount.

### Tips for weekend hosts

List your trip at least 24 hours ahead. Mention luggage space if passengers are travelling with bags.` },
  { category: 'carpooling-tips', slug: 'handling-traffic-delays', title: 'How to Handle Traffic Delays in a Carpool', description: 'Canal Road blocked again? Here\'s how carpool groups stay calm and on schedule.', date: '2025-05-12', readTime: 4, body: `## Traffic happens — plan for it

Pakistan's major cities are no strangers to sudden road closures, VIP movements, and rush-hour gridlock.

### Build buffer time

Smart hosts add 10–15 minutes of buffer during peak hours. Passengers should plan accordingly.

### Communicate in real time

Use Waymate's in-app chat to let your group know about delays. A quick message prevents five phone calls.

### Have a backup route

Experienced Lahore commuters know alternate routes through side streets. Share your plan with passengers.

### When to cancel

If a delay makes the ride pointless (you'll arrive after your meeting), cancel early so passengers can find alternatives.` },
  { category: 'carpooling-tips', slug: 'carpooling-myths-debunked', title: '7 Carpooling Myths Pakistanis Still Believe', description: 'From safety fears to cost myths — we separate fact from fiction about shared rides.', date: '2025-05-01', readTime: 6, body: `## Let's clear the air

Carpooling isn't new in Pakistan — but misconceptions keep people from trying it.

### Myth 1: "It's unsafe"
**Reality:** Waymate verifies every user with CNIC and profile photos. You see who you're riding with before you book.

### Myth 2: "It's only for students"
**Reality:** Most Waymate users are working professionals commuting to offices in Lahore, Islamabad, and Karachi.

### Myth 3: "It's cheaper to take a rickshaw"
**Reality:** For daily commutes over 10 km, carpooling is significantly cheaper than rickshaws or ride-hailing.

### Myth 4: "Hosts don't make real money"
**Reality:** A host with 3 daily passengers can offset 60–80% of monthly fuel costs.

### Myth 5: "You can't choose who you ride with"
**Reality:** You browse profiles, read ratings, and pick your seat before confirming.

### Myth 6: "It only works in big cities"
**Reality:** Waymate is expanding to more cities, and suburban-to-city routes are among the most popular.

### Myth 7: "It's complicated to set up"
**Reality:** Listing a trip takes under two minutes. Booking takes less.` },

  // ── City Guides ──
  { category: 'city-guides', slug: 'carpooling-lahore-guide', title: 'The Complete Carpooling Guide for Lahore', description: 'Top routes, peak hours, and tips for sharing rides across Pakistan\'s cultural capital.', date: '2025-06-20', readTime: 8, body: `## Lahore commutes are tough — carpooling makes them better

With over 14 million people and some of the densest traffic in South Asia, Lahore is a city that desperately needs smarter commuting.

### Popular carpool routes

- **Gulberg → DHA / Cantt** — The most booked morning route on Waymate.
- **Johar Town → Mall Road offices** — Heavy demand 7:30–9:00 AM.
- **Wapda Town → Ferozepur Road** — Great for west-to-south commutes.
- **Model Town → Gulberg** — Short but high-frequency route.

### Peak hours to avoid

| Time | Traffic level |
|------|--------------|
| 7:30–9:30 AM | Very high |
| 1:00–3:00 PM | Moderate (school rush) |
| 5:00–7:30 PM | Very high |

### Best pickup points

Choose well-known landmarks — packages malls, petrol stations, or main chowks — so passengers can find you easily.

### Lahore-specific tip

Canal Road closures happen frequently. Always check traffic updates before leaving and share alternate routes with your carpool group.` },
  { category: 'city-guides', slug: 'islamabad-commute-routes', title: 'Best Carpool Routes in Islamabad & Rawalpindi', description: 'From Blue Area to DHA Islamabad — the routes that save the most time and money.', date: '2025-06-12', readTime: 7, body: `## Twin cities, one commuting challenge

Islamabad and Rawalpindi are connected by daily commuters who travel between residential areas and commercial hubs.

### Top routes

- **Bahria Town → Blue Area** — High demand among government and corporate workers.
- **DHA Phase 2 → F-10 Markaz** — Popular morning and evening route.
- **Rawalpindi Saddar → Islamabad Expressway offices** — Daily commuter favourite.
- **G-13 → Serena / Diplomatic Enclave** — Growing route as new sectors develop.

### The Expressway advantage

Islamabad's signal-free corridors make carpooling faster than in Lahore. A shared ride on the Expressway can cut 30% off your monthly transport budget.

### Parking tip

Blue Area and F-sectors have limited parking. Carpooling means one fewer car competing for a spot.` },
  { category: 'city-guides', slug: 'karachi-carpool-hotspots', title: 'Karachi Carpooling: Routes That Actually Work', description: 'Navigate Karachi\'s sprawl with shared rides on the city\'s busiest corridors.', date: '2025-06-01', readTime: 7, body: `## Karachi is big — carpooling makes it smaller

Pakistan's largest city spans over 60 kilometres. Daily commutes from Clifton to Korangi or North Nazimabad to Shahrah-e-Faisal can take 90+ minutes solo.

### High-demand corridors

- **Clifton → I.I. Chundrigar Road (Saddar)** — Financial district commute.
- **Gulistan-e-Jauhar → Shahrah-e-Faisal offices** — East-to-central route.
- **DHA → Port Qasim industrial area** — Growing industrial commute.
- **Nazimabad → Clifton** — Cross-city morning rush.

### Why carpooling wins in Karachi

Fuel costs for a solo daily commute can exceed Rs. 15,000/month. Sharing with 2–3 passengers brings that below Rs. 5,000.

### Safety note

Stick to main roads for pickups. Waymate's live tracking adds an extra layer of security on longer Karachi routes.` },
  { category: 'city-guides', slug: 'gulberg-to-dha-lahore', title: 'Gulberg to DHA: Lahore\'s Most Popular Carpool Route', description: 'Why thousands of Lahoris carpool between Gulberg and DHA every single day.', date: '2025-05-25', readTime: 5, body: `## The route that started it all

Gulberg to DHA (and reverse) is Waymate's most popular corridor in Lahore. Here's why.

### The numbers

- Average distance: 8–12 km
- Peak time: 8:00–9:00 AM
- Average solo fuel cost: Rs. 300–400/day
- Carpool cost: Rs. 80–120/day

### Best pickup spots

- **Gulberg:** Main Boulevard near Liberty, MM Alam Road junction.
- **DHA:** Y-block market, Phase 5 commercial area.

### Who rides this route?

Young professionals, bank employees, tech workers, and university staff — mostly aged 22–35.

### Pro tip

Book a weekly seat with the same host. Regular carpools on this route often become friend groups.` },
  { category: 'city-guides', slug: 'rawalpindi-to-islamabad', title: 'Rawalpindi to Islamabad: The Daily Commuter\'s Guide', description: 'Master the Pindi–Isloo commute with shared rides on the city\'s key corridors.', date: '2025-05-18', readTime: 6, body: `## Two cities, one daily grind

Thousands of people leave Rawalpindi every morning for offices in Islamabad. The Murree Road → Expressway pipeline is one of Pakistan's busiest commuter corridors.

### Route options

1. **Murree Road → 9th Avenue → Expressway** — Fastest during off-peak.
2. **Saddar → I.J. Principal Road → Faizabad** — More stops, more passengers.
3. **Bahria Town → Islamabad via GT Road** — Growing fast.

### Timing matters

Leave Pindi before 7:45 AM to beat the Faizabad bottleneck. After 8:15, add 20–30 minutes.

### Cost comparison

| Mode | Monthly cost (approx.) |
|------|----------------------|
| Solo car | Rs. 18,000–25,000 |
| Metro bus | Rs. 3,000–5,000 |
| Waymate carpool | Rs. 5,000–8,000 |

Carpooling gives you door-to-door convenience at a fraction of solo driving costs.` },
  { category: 'city-guides', slug: 'university-commute-pakistan', title: 'Carpooling to University: A Student\'s Guide', description: 'LUMS, NUST, FAST, and more — how students save on daily campus commutes.', date: '2025-05-10', readTime: 5, body: `## Students were early carpooling adopters

University commutes are perfect for carpooling: same destination, same schedule, same budget constraints.

### Popular campus routes

- **Lahore:** DHA/ Gulberg → LUMS (DHA campus)
- **Islamabad:** G-11/G-10 → NUST H-12
- **Karachi:** Clifton → IBA / NED University
- **Lahore:** Johar Town → UET / PU

### How students save

A student spending Rs. 200/day on a rickshaw saves over Rs. 3,000/month by carpooling at Rs. 60–80/day.

### Form a group

Find 3–4 classmates on the same route. One person hosts on Waymate, others book seats. Rotate hosts weekly for fairness.` },
  { category: 'city-guides', slug: 'bahria-town-commute', title: 'Commuting from Bahria Town: Routes & Tips', description: 'Living in Bahria Town? Here\'s how to carpool to Islamabad, Rawalpindi, and beyond.', date: '2025-04-28', readTime: 5, body: `## Bahria Town is a carpooling hub

With tens of thousands of residents across Phase 1–8, Bahria Town generates massive daily outbound traffic.

### Key outbound routes

- **Bahria → Blue Area Islamabad** — 25–35 min via Expressway.
- **Bahria → Rawalpindi Saddar** — 15–20 min via GT Road.
- **Bahria → DHA Islamabad** — Growing route through Korang Road.

### Pickup best practices

Use sector gates or commercial areas as pickup points. Avoid narrow internal streets where traffic bottlenecks form.

### Evening return

Book your return seat in the morning. Bahria-bound evening rides fill up by 4 PM.` },
  { category: 'city-guides', slug: 'dha-lahore-carpool-map', title: 'DHA Lahore Carpool Map: Phase-by-Phase Guide', description: 'Every DHA phase has different commute patterns — find yours on this guide.', date: '2025-04-20', readTime: 6, body: `## DHA Lahore is bigger than you think

From Phase 1 to Phase 9, DHA Lahore spans a huge area. Your carpool options depend heavily on which phase you live or work in.

### Phase-by-phase breakdown

- **Phase 5 & 6** — Closest to Gulberg. Most popular for cross-city commutes.
- **Phase 2 & 3** — Strong demand for Cantt and Mall Road routes.
- **Phase 8 & 9** — Newer phases with growing commuter base heading to Johar Town and Wapda Town.

### Common destinations from DHA

| From | To | Avg. time |
|------|-----|-----------|
| DHA Phase 5 | Gulberg | 15 min |
| DHA Phase 6 | Johar Town | 20 min |
| DHA Phase 3 | Mall Road | 25 min |
| DHA Phase 8 | Wapda Town | 30 min |

### Tip for hosts

If you live in DHA and drive to work daily, listing your empty seats is the easiest way to offset your fuel bill.` },
  { category: 'city-guides', slug: 'faisalabad-lahore-commute', title: 'Faisalabad to Lahore: Long-Distance Carpooling', description: 'The M-4 corridor is perfect for intercity carpooling — here\'s how to do it right.', date: '2025-04-12', readTime: 5, body: `## Intercity carpooling is growing

The M-4 motorway connecting Faisalabad and Lahore (about 120 km) is one of Pakistan's best intercity carpool corridors.

### Why it works

- Fixed motorway route with predictable timing.
- Solo fuel cost: Rs. 2,500–3,500 per trip.
- Carpool share: Rs. 500–800 per passenger.

### Best practices

- List trips at least a day ahead.
- Mention if you'll make a stop (e.g., Sheikhupura).
- Confirm luggage space upfront.
- Share your live location during the trip.

### Who uses this route?

Business travellers, university students, and families visiting relatives.` },
  { category: 'city-guides', slug: 'multan-carpool-guide', title: 'Multan Carpooling Guide: Routes & Opportunities', description: 'Southern Punjab\'s largest city is ready for smarter commuting — here\'s where to start.', date: '2025-04-01', readTime: 5, body: `## Multan is joining the carpool movement

As Waymate expands, Multan's growing professional class is discovering shared commuting.

### Key routes within Multan

- **Cantt → Bosan Road commercial area**
- **Gulgasht Colony → Nishtar Hospital / medical district**
- **DHA Multan → City Centre**

### Intercity from Multan

- **Multan → Lahore** via M-3 (230 km, popular weekend route)
- **Multan → Faisalabad** via M-4

### Getting started

If you're in Multan, list your daily commute route on Waymate. Early hosts build loyal passenger groups fast.` },
  { category: 'city-guides', slug: 'sialkot-gujranwala-commute', title: 'Sialkot & Gujranwala Commute Guide', description: 'Industrial hubs in Punjab are embracing carpooling — key routes and tips for daily commuters.', date: '2025-03-25', readTime: 5, body: `## Industrial cities need smarter commutes

Sialkot and Gujranwala have large workforces travelling between residential areas and industrial zones daily.

### Popular routes

- **Model Town Gujranwala → Sialkot export zone**
- **Gujranwala Cantt → GT Road industrial corridor**
- **DHA Gujranwala → city commercial areas**

### Why carpooling fits

Factory and office workers often share similar shift timings, making recurring carpools easy to fill.

### Getting started

List your daily route on Waymate and connect with colleagues heading the same way.` },

  // ── Save Money ──
  { category: 'save-money', slug: 'how-much-carpooling-saves', title: 'How Much Money Does Carpooling Actually Save?', description: 'Real numbers for Pakistani commuters — monthly savings breakdown by city.', date: '2025-06-18', readTime: 6, body: `## The math is simple — and surprising

Most people underestimate how much they spend on solo commuting. Let's break it down.

### Monthly solo commute costs

| City | Avg. daily fuel | Monthly (22 days) |
|------|----------------|-------------------|
| Lahore | Rs. 350 | Rs. 7,700 |
| Islamabad | Rs. 400 | Rs. 8,800 |
| Karachi | Rs. 450 | Rs. 9,900 |

### With carpooling

| Role | Monthly cost | Savings |
|------|-------------|---------|
| Passenger (2 seats filled) | Rs. 2,500–3,500 | 55–65% |
| Host (3 passengers) | Rs. 1,500–2,500 | 70–80% |

### Annual impact

A Lahore commuter switching from solo driving to carpooling saves **Rs. 50,000–70,000 per year**. That's a vacation, a new phone, or months of groceries.

### Beyond fuel

Don't forget parking fees (Rs. 2,000–5,000/month in commercial areas), maintenance, and tyre wear.` },
  { category: 'save-money', slug: 'carpool-vs-ride-hailing', title: 'Carpool vs Ride-Hailing: Which Is Cheaper in Pakistan?', description: 'Careem, inDrive, or Waymate? We compare daily commute costs honestly.', date: '2025-06-08', readTime: 5, body: `## Ride-hailing is convenient — carpooling is economical

For daily commutes, the cost difference is dramatic.

### Daily commute: Gulberg to DHA Lahore (10 km)

| Service | Daily cost | Monthly (22 days) |
|---------|-----------|-------------------|
| Ride-hailing (peak) | Rs. 350–500 | Rs. 7,700–11,000 |
| Rickshaw | Rs. 200–300 | Rs. 4,400–6,600 |
| Waymate carpool | Rs. 80–120 | Rs. 1,760–2,640 |

### When ride-hailing makes sense

- One-off trips to unfamiliar areas.
- Late-night travel.
- When you need door-to-door with no schedule constraints.

### When carpooling wins

- Same route, same time, every weekday.
- You're budget-conscious.
- You want to know your travel companions.

> **Bottom line:** Use ride-hailing for exceptions. Use carpooling for your daily grind.` },
  { category: 'save-money', slug: 'motorbike-carpool-savings', title: 'Motorbike Carpooling: The Cheapest Way to Commute', description: 'Waymate supports bike hosts — here\'s why motorbike carpools are the ultimate budget hack.', date: '2025-05-30', readTime: 4, body: `## Two wheels, even lower costs

Motorbike carpools on Waymate are popular for short-to-medium routes, especially among students and young professionals.

### Cost comparison (15 km daily route)

| Mode | Monthly cost |
|------|-------------|
| Solo car | Rs. 8,000+ |
| Car carpool (passenger) | Rs. 2,500 |
| **Bike carpool (passenger)** | **Rs. 1,200–1,800** |

### Best routes for bike carpools

- Short urban routes under 15 km.
- University commutes.
- Routes where car traffic is heavy but bikes can filter through.

### Safety first

Always wear a helmet. Waymate bike hosts must have a valid licence and verified profile.` },
  { category: 'save-money', slug: 'fuel-cost-splitting-guide', title: 'How to Split Fuel Costs Fairly in a Carpool', description: 'Avoid awkward money conversations with these fair fuel-splitting methods.', date: '2025-05-22', readTime: 5, body: `## Fair splits keep carpools running

Nothing kills a carpool faster than payment disputes. Here's how to split costs fairly.

### Method 1: Fixed per-seat price

The host sets a per-seat price based on fuel + wear. Waymate calculates this automatically.

### Method 2: Fuel receipt split

For informal carpools, divide the weekly fuel receipt by total occupants (including the driver).

### Method 3: Rotation

Each person drives one day per week. No money changes hands.

### What most Waymate users do

Fixed per-seat pricing through the app. It's transparent, automatic, and eliminates end-of-ride awkwardness.

### Don't forget

The host bears vehicle depreciation, insurance, and maintenance. Passengers should factor this in when evaluating "fairness."` },
  { category: 'save-money', slug: 'hidden-commute-costs', title: '5 Hidden Costs of Driving Solo to Work', description: 'Fuel is just the start — parking, maintenance, and depreciation add up fast.', date: '2025-05-15', readTime: 5, body: `## Your car costs more than you think

When people compare carpooling to driving solo, they usually only count fuel. Here's what they're missing.

### 1. Parking fees
Commercial areas in Lahore and Islamabad charge Rs. 100–300/day for parking.

### 2. Tyre wear
Daily city driving wears tyres 30–40% faster than highway driving.

### 3. Oil change frequency
Stop-and-go traffic means more frequent oil changes.

### 4. Depreciation
Every kilometre driven reduces your car's resale value.

### 5. Stress
Not a line item, but burnout from daily traffic has real costs — time, health, productivity.

### The carpool advantage

Hosts offset these costs with passenger fares. Passengers avoid owning a car entirely.` },
  { category: 'save-money', slug: 'student-budget-commute', title: 'Student Budget Guide: Commute for Under Rs. 2,000/Month', description: 'University students — here\'s how to get to campus without breaking the bank.', date: '2025-05-05', readTime: 4, body: `## Your commute shouldn't eat your lunch money

Students on tight budgets have found carpooling to be the sweet spot between rickshaws and owning a car.

### The student formula

1. Find 3–4 classmates on the same route.
2. One person lists a daily trip on Waymate.
3. Everyone books a seat at Rs. 60–80/ride.
4. Monthly total: **Rs. 1,300–1,800**.

### Compare that to

- Rickshaw: Rs. 4,000–6,000/month
- Own bike + fuel: Rs. 3,000–4,000/month
- Own car: Rs. 8,000+/month

### Bonus

Study in the car. Review notes, discuss assignments, or just nap while someone else drives.` },
  { category: 'save-money', slug: 'tax-benefits-carpool-hosts', title: 'Financial Benefits of Being a Ride Host', description: 'Turn your daily drive into a revenue stream — what hosts actually earn on Waymate.', date: '2025-04-25', readTime: 5, body: `## Your empty seats are worth money

If you drive to work alone every day, you're leaving money on the table.

### Real host earnings (Lahore, 20 working days)

| Passengers per trip | Monthly earnings | Fuel offset |
|--------------------|-----------------|-------------|
| 1 passenger | Rs. 3,000–4,000 | 40–50% |
| 2 passengers | Rs. 6,000–8,000 | 70–85% |
| 3 passengers | Rs. 9,000–12,000 | 90–100%+ |

### Beyond earnings

- Company with your commute.
- Priority parking (fewer cars at the office).
- Waypoints rewards for active hosts.

### Getting started as a host

List your regular route, set your schedule, and let Waymate match you with passengers going the same way.` },

  // ── Safety & Trust ──
  { category: 'safety-trust', slug: 'how-waymate-verifies-users', title: 'How Waymate Verifies Every User', description: 'CNIC verification, profile photos, and ratings — our multi-layer trust system explained.', date: '2025-06-22', readTime: 6, body: `## Trust isn't optional — it's built in

Every person on Waymate goes through verification before they can book or host a ride.

### The verification process

1. **Phone number** — OTP-verified on signup.
2. **CNIC verification** — National ID checked against government records.
3. **Profile photo** — A clear, recent selfie matched to CNIC photo.
4. **Vehicle details** (hosts) — Registration and licence verified.

### Ongoing trust signals

- **Ratings** — Both hosts and passengers rate each other after every trip.
- **Trip history** — See how many rides someone has completed.
- **Report system** — Flag concerns directly in the app.

### What we don't do

We never share your CNIC number with other users. They see your name, photo, and rating — nothing more.` },
  { category: 'safety-trust', slug: 'carpool-safety-tips-women', title: 'Carpooling Safety Tips for Women in Pakistan', description: 'Practical safety advice for women considering shared rides — from booking to arrival.', date: '2025-06-14', readTime: 6, body: `## Safety first, always

Waymate is committed to making carpooling safe for everyone, especially women commuters.

### Before you ride

- Choose hosts with high ratings and multiple completed trips.
- Share your trip details with a friend or family member.
- Prefer women hosts or verified profiles with detailed reviews.

### During the ride

- Sit in the back seat if you prefer.
- Keep your phone charged and location sharing on.
- Trust your instincts — if something feels wrong, end the ride.

### Waymate safety features

- Live GPS tracking during every trip.
- In-app emergency support.
- Verified profiles with CNIC checks.
- Report and block features.

### Community standards

Waymate has zero tolerance for harassment. Violations result in immediate account suspension.` },
  { category: 'safety-trust', slug: 'what-to-do-emergency', title: 'What to Do in a Carpool Emergency', description: 'Flat tyre, accident, or feeling unsafe — a step-by-step guide for carpool emergencies.', date: '2025-06-02', readTime: 5, body: `## Hope for the best, plan for the worst

Emergencies are rare, but knowing what to do keeps everyone safe.

### Vehicle breakdown

1. Pull over safely.
2. Notify passengers via Waymate chat.
3. Help passengers find alternative rides through the app.
4. Cancel the trip with a clear reason.

### Accident

1. Check if anyone is injured — call 1122 or 15 immediately.
2. Do not leave the scene.
3. Document with photos.
4. Notify Waymate support.

### Feeling unsafe

1. Ask the driver to stop in a public, well-lit area.
2. Exit the vehicle.
3. Report the incident in the app immediately.
4. Contact Waymate support — we take every report seriously.

### Prevention

Verified profiles, live tracking, and ratings exist specifically to prevent emergencies before they happen.` },
  { category: 'safety-trust', slug: 'rating-system-explained', title: 'How Waymate\'s Rating System Keeps Rides Quality', description: 'Why ratings matter and how they help you choose the best hosts and passengers.', date: '2025-05-20', readTime: 4, body: `## Ratings build accountability

After every trip, both the host and passenger rate each other. This two-way system keeps quality high.

### How ratings work

- 1–5 stars after each completed trip.
- Optional written feedback.
- Ratings are public on profiles.
- Low-rated users receive warnings; repeated issues lead to suspension.

### What to look for

- **4.5+ stars** with 10+ trips = experienced, reliable.
- **New users** with 0 trips aren't necessarily bad — everyone starts somewhere.
- **Read reviews** — "Always on time" and "Clean car" are signs of a great host.

### Be honest

Your ratings help the community. Don't hesitate to give 3 stars if the ride was mediocre, or 5 if it was excellent.` },
  { category: 'safety-trust', slug: 'sharing-location-safely', title: 'Live Tracking: How Waymate Keeps Your Ride Visible', description: 'GPS tracking during trips — what\'s shared, what\'s not, and why it matters.', date: '2025-05-10', readTime: 4, body: `## Visibility creates accountability

Every active Waymate trip includes live GPS tracking.

### What's tracked

- Real-time vehicle location during the trip.
- Route taken from pickup to drop-off.
- Trip start and end times.

### Who can see it

- You and your ride companions.
- Waymate support (only if you report an issue).

### What's NOT tracked

- Your location before or after the trip.
- Your location on days you don't have a booking.

### For parents and families

Share your trip link with family members so they can follow your commute in real time.` },
  { category: 'safety-trust', slug: 'carpool-insurance-basics', title: 'Insurance Basics for Carpool Hosts in Pakistan', description: 'Does your car insurance cover passengers? What hosts need to know before listing trips.', date: '2025-04-30', readTime: 5, body: `## Know your coverage before you host

If you're driving passengers, understanding your insurance is important.

### Standard comprehensive insurance

Most Pakistani comprehensive policies cover the vehicle and driver. Passenger liability coverage varies by insurer.

### What to check

1. Does your policy cover carrying fare-paying passengers?
2. Is there a passenger liability limit?
3. Does ride-sharing affect your premium?

### Waymate's approach

Waymate trips are cost-sharing arrangements, not commercial taxi services. However, we recommend hosts confirm their coverage with their insurer.

### Best practice

Keep your insurance current, your vehicle maintained, and your licence valid. These basics protect you and your passengers.` },
  { category: 'safety-trust', slug: 'reporting-problems-waymate', title: 'How to Report a Problem on Waymate', description: 'From late pickups to serious concerns — how reporting works and what happens next.', date: '2025-04-18', readTime: 4, body: `## We take every report seriously

Waymate's reporting system is designed to resolve issues quickly and fairly.

### How to report

1. Go to the completed trip in your app.
2. Tap "Report an issue."
3. Select the category (late, rude behaviour, safety concern, payment issue).
4. Add details and submit.

### What happens next

- **Minor issues** (late, route deviation): Logged and factored into ratings.
- **Moderate issues** (rude behaviour, cleanliness): Reviewed within 24 hours. Warning issued if warranted.
- **Serious issues** (harassment, safety): Immediate review. Account may be suspended pending investigation.

### Response time

Safety reports are prioritised and reviewed within 2 hours during business hours.` },

  // ── Environment ──
  { category: 'environment', slug: 'carpooling-carbon-footprint', title: 'How Carpooling Reduces Your Carbon Footprint', description: 'Fewer cars, lower emissions — the environmental impact of shared commuting in Pakistan.', date: '2025-06-16', readTime: 5, body: `## One car, four commuters, 75% less emissions

Transportation is one of Pakistan's largest sources of urban air pollution. Carpooling is one of the simplest ways to reduce it.

### The math

A car with 4 occupants produces **75% less CO₂ per person** than 4 separate cars making the same trip.

### Pakistan's air quality crisis

Lahore regularly ranks among the world's most polluted cities. Every car removed from the road during rush hour makes a measurable difference.

### What you can do

- Carpool even 2–3 days a week.
- Choose hosts with fuel-efficient vehicles.
- Share your environmental impact with friends.

### Waymate's goal

If 10,000 commuters carpool daily instead of driving solo, we estimate a reduction of **2,000+ tonnes of CO₂ annually**.` },
  { category: 'environment', slug: 'lahore-air-quality-carpooling', title: 'Lahore\'s Air Quality and How Carpooling Helps', description: 'Smog season is getting worse — shared rides are part of the solution for Lahore.', date: '2025-06-05', readTime: 5, body: `## Lahore's smog problem needs collective action

Every November, Lahore's AQI hits hazardous levels. While policy changes are needed, individual choices matter too.

### The vehicle contribution

Vehicles account for roughly 40% of Lahore's air pollution. Reducing the number of cars on Canal Road, Mall Road, and the Ring Road directly improves air quality.

### Carpooling impact

If 20% of solo commuters in Lahore switched to carpooling, we'd remove approximately **50,000 cars** from the road during peak hours.

### Small steps

- Share your ride to work twice a week.
- Encourage office colleagues to carpool.
- Choose Waymate over driving alone.` },
  { category: 'environment', slug: 'green-commute-challenge', title: 'The 30-Day Green Commute Challenge', description: 'Ditch solo driving for 30 days — track your savings and environmental impact.', date: '2025-05-25', readTime: 4, body: `## Can you commute greener for 30 days?

Join the Waymate Green Commute Challenge and see how much you save — in money and emissions.

### The rules

1. Carpool at least 3 days per week for 30 days.
2. Track your trips on Waymate.
3. Share your results.

### What you'll likely find

- **Money saved:** Rs. 3,000–5,000 over 30 days.
- **Emissions reduced:** 15–25 kg of CO₂.
- **New connections:** 2–3 regular carpool mates.

### Ready to start?

Download Waymate and book your first shared ride today.` },
  { category: 'environment', slug: 'fewer-cars-better-cities', title: 'Fewer Cars, Better Cities: The Urban Planning Case', description: 'Why reducing car dependency makes Pakistani cities more liveable for everyone.', date: '2025-05-15', readTime: 5, body: `## Our cities weren't built for this many cars

Pakistan's urban population has doubled in 20 years, but road infrastructure hasn't kept pace.

### The congestion cost

Traffic congestion in Karachi alone costs an estimated **Rs. 200 billion annually** in lost productivity and fuel waste.

### How carpooling helps urban planning

- Fewer cars = less demand for parking infrastructure.
- Reduced wear on roads and bridges.
- Lower noise pollution in residential areas.
- More space for pedestrians and green areas.

### The vision

Cities like Islamabad are already designing around transit and shared mobility. Carpooling is a bridge to that future.` },
  { category: 'environment', slug: 'electric-vehicles-carpooling', title: 'Electric Vehicles and Carpooling: A Perfect Match', description: 'As EVs grow in Pakistan, carpooling makes them even more economical and eco-friendly.', date: '2025-05-05', readTime: 4, body: `## EV + carpool = maximum impact

Electric vehicles are slowly entering the Pakistani market. Combined with carpooling, they offer the lowest per-person transport cost and emissions.

### Why EVs love carpooling

- Lower per-km cost than petrol cars.
- Zero direct emissions.
- Quiet, smooth rides that passengers appreciate.

### The current reality

EV infrastructure in Pakistan is still developing. But hybrid and fuel-efficient petrol cars on Waymate already reduce per-person emissions significantly.

### Looking ahead

As charging stations expand in Lahore, Islamabad, and Karachi, expect EV hosts to become popular on Waymate.` },
  { category: 'environment', slug: 'office-carpool-program', title: 'How to Start an Office Carpool Program', description: 'HR managers and team leads — here\'s how to encourage carpooling at your workplace.', date: '2025-04-22', readTime: 5, body: `## Corporate carpooling is a win-win-win

Companies, employees, and the environment all benefit when offices promote carpooling.

### Benefits for employers

- Reduced parking demand.
- Happier, less-stressed employees.
- CSR and sustainability credentials.

### How to start

1. Survey employees on their routes and timings.
2. Create a Waymate workplace group.
3. Offer small incentives (priority parking for carpoolers).
4. Track participation and celebrate milestones.

### Real example

A Lahore-based tech company with 200 employees encouraged carpooling and reduced parking demand by 30% in three months.` },

  // ── Ride Hosts ──
  { category: 'ride-hosts', slug: 'become-a-ride-host', title: 'How to Become a Waymate Ride Host', description: 'Step-by-step guide to listing your first trip and earning from empty seats.', date: '2025-06-20', readTime: 5, body: `## Turn your commute into income

If you drive to work daily, you already have everything you need to be a Waymate host.

### Requirements

- Valid driving licence.
- Registered vehicle (car or motorbike).
- Verified CNIC and profile photo.
- A regular commute route.

### How to list your first trip

1. Open Waymate → tap "Host a Ride."
2. Enter your route (pickup area → drop-off area).
3. Set your schedule (one-time or recurring).
4. Set seats available and price per seat.
5. Publish — passengers can now find and book your trip.

### Tips for new hosts

- Start with 1–2 seats until you get comfortable.
- Price fairly — competitive pricing fills seats faster.
- Be punctual — your first ratings set the tone.` },
  { category: 'ride-hosts', slug: 'maximize-host-earnings', title: '5 Ways to Maximise Your Earnings as a Host', description: 'From pricing strategy to recurring trips — tips from top Waymate hosts.', date: '2025-06-10', readTime: 5, body: `## Smart hosts earn more

The highest-earning Waymate hosts follow these patterns.

### 1. List recurring trips
Daily or weekly recurring trips build a loyal passenger base. Less marketing, more income.

### 2. Price competitively
Check what similar routes charge. Slightly underpricing fills seats faster.

### 3. Offer 2–3 seats
One passenger helps, but three passengers can cover your entire fuel bill.

### 4. Be reliable
Hosts with 4.8+ ratings and "always on time" reviews fill seats within hours of listing.

### 5. Use peak hours
Morning (7–9 AM) and evening (5–7 PM) commutes have the highest demand and best pricing.` },
  { category: 'ride-hosts', slug: 'setting-your-route', title: 'Setting the Perfect Route as a Host', description: 'Pickup points, stopovers, and timing — how to design a route passengers love.', date: '2025-05-28', readTime: 4, body: `## A good route = full seats

Your route design directly affects how many passengers book.

### Pickup points

- Choose well-known landmarks, not residential addresses.
- Limit pickups to 2–3 stops maximum.
- Morning routes: pick up passengers before entering main traffic.

### Stopovers

If your route passes through a commercial area, mention it. Some passengers may want to join mid-route.

### Timing

- List your departure time 5 minutes earlier than you actually plan to leave.
- Account for 5–10 minutes of pickup time.
- For evening routes, list 15 minutes before typical office closing time.` },
  { category: 'ride-hosts', slug: 'host-vehicle-tips', title: 'Keeping Your Car Passenger-Ready', description: 'Clean car, cool AC, good music — the little things that earn 5-star ratings.', date: '2025-05-18', readTime: 4, body: `## Passengers notice the details

Top-rated hosts on Waymate share these habits.

### Cleanliness

- Vacuum weekly, wipe surfaces daily.
- Remove personal clutter from the back seat.
- Keep a small bin bag for trash.

### Comfort

- AC working (essential in Pakistani summers).
- Phone charger in the front (passengers love this).
- Reasonable music volume — ask preference.

### Safety

- Seatbelts functional for all seats.
- First-aid kit in the glove box.
- Spare tyre and jack checked monthly.

### The result

Hosts who maintain their cars get better ratings, more repeat passengers, and higher earnings.` },
  { category: 'ride-hosts', slug: 'dealing-with-no-shows', title: 'How to Handle No-Show Passengers as a Host', description: 'Passenger didn\'t show up? Here\'s the fair way to handle it on Waymate.', date: '2025-05-08', readTime: 4, body: `## No-shows happen — here's the protocol

### Prevention

- Send a reminder message 15 minutes before pickup.
- Wait 5 minutes at the pickup point.
- Call or message via Waymate chat.

### If they don't show

1. Mark the passenger as a no-show in the app.
2. Continue your trip — don't delay other passengers.
3. The no-show is recorded on their profile.

### Policy

Waymate's no-show policy protects hosts. Repeated no-shows result in passenger warnings and potential account restrictions.

### For hosts

Don't take no-shows personally. Focus on your regular passengers who show up on time.` },
  { category: 'ride-hosts', slug: 'bike-host-guide', title: 'Motorbike Host Guide: Everything You Need to Know', description: 'Hosting on a motorbike? Safety gear, pricing, and route tips for bike hosts.', date: '2025-04-28', readTime: 5, body: `## Bike hosting is a unique opportunity

Motorbike hosts on Waymate serve passengers who want the fastest, cheapest commute option.

### Requirements

- Valid motorbike licence.
- Registered motorbike with valid fitness certificate.
- Helmet for yourself and a spare for passengers.
- Verified profile.

### Pricing

Bike carpools typically cost 40–60% less than car carpools on the same route. Volume makes up for lower per-ride fares.

### Best routes

- Under 15 km.
- Areas with heavy car traffic where bikes move faster.
- University and office commutes.

### Safety rules

- Never exceed one passenger on a standard bike.
- Provide a clean helmet.
- Ride defensively — your passenger is trusting you.` },
  { category: 'ride-hosts', slug: 'recurring-trips-guide', title: 'Why Recurring Trips Are a Host\'s Best Friend', description: 'Set it once, earn daily — how recurring trip listings save time and build loyalty.', date: '2025-04-15', readTime: 4, body: `## List once, ride all week

Recurring trips are the single best feature for regular commuters who host.

### How it works

1. Create a trip with your regular route and time.
2. Set it to repeat Monday–Friday.
3. Passengers book weekly seats.
4. You drive your normal route — now with company and income.

### Benefits

- **Predictability** — Same passengers, same times, every day.
- **Less admin** — No daily listing needed.
- **Higher earnings** — Loyal passengers rebook automatically.
- **Social** — Your carpool group becomes a daily ritual.

### Getting started

If you commute the same route 3+ days per week, switch to recurring trips today.` },

  // ── Passengers ──
  { category: 'passengers', slug: 'finding-your-first-ride', title: 'How to Find and Book Your First Ride', description: 'Search, compare, and book — a walkthrough of the Waymate passenger experience.', date: '2025-06-18', readTime: 5, body: `## Booking your first ride takes 60 seconds

### Step 1: Search

Enter your pickup area and destination. Waymate shows available trips matching your route.

### Step 2: Compare

Browse host profiles, ratings, vehicle type, departure time, and per-seat price.

### Step 3: Book

Select your seat, confirm the booking, and pay through the app.

### Step 4: Ride

Meet your host at the pickup point. Track the trip live. Rate your experience after arrival.

### Tips for first-timers

- Choose hosts with 4+ stars and multiple completed trips.
- Book at least a few hours ahead for popular routes.
- Message your host to confirm the pickup spot.` },
  { category: 'passengers', slug: 'choosing-the-right-seat', title: 'How to Choose the Right Seat in a Carpool', description: 'Front or back? Window or middle? Making the most of your carpool seat.', date: '2025-06-08', readTime: 4, body: `## Your seat choice matters

Waymate lets you pick your seat when booking — here's how to choose.

### Front seat

- Best for: People who get car sick in the back, those who like conversation.
- Ask the host first — some prefer front seat empty.

### Back window

- Best for: People who want to look out, prefer a bit of personal space.
- Most popular choice on Waymate.

### Back middle

- Usually the last to fill. Fine for short trips.

### For bike passengers

You'll ride pillion. Ensure the host has a spare helmet and ride at a comfortable pace.` },
  { category: 'passengers', slug: 'weekly-commute-booking', title: 'Book Your Weekly Commute in One Tap', description: 'Stop booking daily — weekly seat reservations save time and guarantee your spot.', date: '2025-05-28', readTime: 4, body: `## One booking, five rides

If you commute the same route every weekday, weekly booking is your best friend.

### How it works

1. Find a recurring trip on your route.
2. Book a weekly seat (Monday–Friday).
3. Show up at the same time each day.
4. Your seat is reserved — no daily booking needed.

### Benefits

- **Guaranteed spot** — No last-minute "trip full" disappointments.
- **Lower cost** — Weekly bookings often come with a discount.
- **Routine** — Same host, same passengers, same time.
- **Less stress** — One less thing to think about each morning.` },
  { category: 'passengers', slug: 'passenger-rating-guide', title: 'How to Rate Your Ride Fairly', description: 'Good ratings help great hosts thrive — here\'s how to rate honestly and helpfully.', date: '2025-05-18', readTime: 4, body: `## Your rating shapes the community

### 5 stars means

- On time (within 5 minutes).
- Clean, comfortable vehicle.
- Safe driving.
- Friendly but respectful.

### 3 stars means

- Late by 10+ minutes.
- Car was untidy.
- Driving was uncomfortable but not dangerous.
- No major issues, but wouldn't ride again.

### 1–2 stars means

- Serious safety concern.
- Rude or inappropriate behaviour.
- Very late or no-show (as host).
- Always accompany low ratings with a written explanation.

### Written reviews help most

"Always on time, clean car, great AC" is more useful than just 5 stars.` },
  { category: 'passengers', slug: 'what-if-host-cancels', title: 'What Happens If Your Host Cancels?', description: 'Cancellation policies, refunds, and how to find a backup ride quickly.', date: '2025-05-08', readTime: 4, body: `## Cancellations are rare — but you're protected

### If a host cancels

1. You receive an immediate notification.
2. Your payment is refunded automatically.
3. Waymate suggests alternative trips on the same route.

### Finding a backup

- Search the same route with a slightly wider time window.
- Check if any hosts on nearby routes pass your destination.
- Message potential hosts directly.

### Cancellation policy

- Hosts who cancel frequently receive warnings.
- Last-minute cancellations (under 1 hour) are penalised more heavily.
- Passengers always get a full refund for host cancellations.` },
  { category: 'passengers', slug: 'carpool-for-introverts', title: 'Carpooling for Introverts: A Survival Guide', description: 'Not a morning person? Hate small talk? You can still love carpooling.', date: '2025-04-28', readTime: 4, body: `## You don't have to be chatty to carpool

### Set expectations early

A simple "I usually nap on the morning ride" signals your preference without being rude.

### Headphones are your friend

Most carpool groups respect the headphone signal. It means "happy to be here, not up for conversation."

### Choose your seat wisely

Back window seat = maximum personal space and minimum eye contact.

### The introvert advantage

Introverts often make the most consistent carpool passengers — same route, same seat, same quiet routine every day.` },
  { category: 'passengers', slug: 'passenger-safety-checklist', title: 'Passenger Safety Checklist Before Every Ride', description: 'A quick 5-point check before you get in any carpool vehicle.', date: '2025-04-18', readTime: 4, body: `## 30 seconds that keep you safe

Before every ride, run through this checklist:

### 1. Profile matches
Does the driver match their Waymate profile photo?

### 2. Vehicle matches
Does the car match what's listed (make, model, colour)?

### 3. Seatbelt works
Buckle up before the car moves.

### 4. Share your trip
Send your live trip link to a friend or family member.

### 5. Trust your gut
If something feels off before the ride starts, cancel. No explanation needed.

### After the ride

Rate honestly. Your feedback keeps the community safe for everyone.` },

  // ── Waymate News ──
  { category: 'waymate-news', slug: 'waymate-launches-lahore', title: 'Waymate Is Now Live in Lahore!', description: 'Pakistan\'s friendliest carpool app launches in Lahore — here\'s what\'s available on day one.', date: '2025-06-25', readTime: 4, body: `## Lahore, we're here!

After months of development and testing, Waymate is officially live in Lahore.

### What's available

- Car and motorbike hosting.
- Route search across all major Lahore corridors.
- CNIC-verified profiles.
- In-app payments and live tracking.

### Launch routes

Our highest-demand routes at launch:
- Gulberg ↔ DHA
- Johar Town ↔ Mall Road
- Wapda Town ↔ Ferozepur Road
- Model Town ↔ Gulberg

### Join us

Whether you're a host with empty seats or a passenger looking to save, download Waymate and make your commute social.` },
  { category: 'waymate-news', slug: 'waypoints-rewards-program', title: 'Introducing Waypoints: Earn Rewards for Every Ride', description: 'The Waymate loyalty program — earn points for riding, referring, and reviewing.', date: '2025-06-15', readTime: 4, body: `## Ride more, earn more

Waypoints is Waymate's loyalty program that rewards active community members.

### How to earn

- **Complete a trip** — Earn points as host or passenger.
- **Refer a friend** — Bonus points when they complete their first ride.
- **Leave a review** — Small bonus for rating your trip.

### How to spend

- Discounts on future rides.
- Priority booking on popular routes.
- Exclusive Waymate merchandise (coming soon).

### Getting started

Your Waypoints balance is visible in your profile. Start earning from your very first trip.` },
  { category: 'waymate-news', slug: 'new-feature-recurring-trips', title: 'New Feature: Recurring Trips for Daily Commuters', description: 'Set your weekly commute once — passengers book seats for the whole week.', date: '2025-06-05', readTime: 3, body: `## Set it and forget it

Recurring trips are now available for all Waymate hosts.

### What changed

Previously, hosts had to create a new listing every day. Now, set your route and schedule to repeat automatically.

### How to use it

1. Create a trip as usual.
2. Toggle "Repeat weekly."
3. Select which days (Mon–Fri, or custom).
4. Publish once — your trip appears every selected day.

### Impact

Early testers report 3x more bookings and 50% less time spent managing listings.` },
  { category: 'waymate-news', slug: 'islamabad-coming-soon', title: 'Islamabad & Rawalpindi — Coming Soon to Waymate', description: 'The twin cities are next on our expansion map. Here\'s what to expect.', date: '2025-05-28', readTime: 3, body: `## Pindi-Isloo, your turn is coming

Lahore launched first, but Islamabad and Rawalpindi are actively being onboarded.

### What we're preparing

- Route mapping for Blue Area, F-sectors, Bahria Town, and DHA Islamabad.
- Host onboarding events in major commercial areas.
- Partnerships with corporate offices for employee carpooling.

### Want early access?

Sign up on Waymate with your Islamabad/Rawalpindi address. We'll notify you the moment we go live in your area.

### Expected routes at launch

- Bahria Town → Blue Area
- DHA Phase 2 → F-10
- Rawalpindi Saddar → Islamabad Expressway` },
  { category: 'waymate-news', slug: 'community-story-kamran', title: 'Community Story: How Kamran Saves Rs. 8,000/Month', description: 'Meet Kamran, a Lahore ride host who offsets his entire fuel bill through carpooling.', date: '2025-05-18', readTime: 4, body: `## From solo driver to community host

Kamran, a 32-year-old software engineer in Lahore, drives from Wapda Town to his office in Gulberg every day. He used to spend Rs. 8,500/month on fuel alone.

### The switch

Six months ago, Kamran listed his daily commute on Waymate with 3 available seats. Within a week, he had regular passengers.

### The results

- **Monthly fuel cost:** Rs. 8,500 → Rs. 1,200 (remaining after passenger fares).
- **New friends:** Two of his regular passengers are now close friends.
- **Rating:** 4.9 stars across 120+ trips.

### Kamran's advice

"Just list your route. Don't overthink pricing. Be on time. The passengers will come."` },
  { category: 'waymate-news', slug: 'waymate-safety-update', title: 'Safety Update: Enhanced Verification & Live Support', description: 'New safety features including improved CNIC checks and 24/7 in-app support.', date: '2025-05-08', readTime: 3, body: `## Doubling down on safety

Waymate's latest update strengthens our commitment to safe carpooling.

### What's new

- **Faster CNIC verification** — Reduced from 24 hours to under 4 hours.
- **24/7 in-app support** — Report issues any time, not just business hours.
- **Enhanced live tracking** — More accurate GPS with route deviation alerts.
- **Block feature** — Block users you don't want to ride with again.

### Our promise

Safety isn't a feature — it's the foundation. Every update we ship prioritises your security.` },
  { category: 'waymate-news', slug: 'karachi-expansion-plans', title: 'Karachi Expansion: What We\'re Planning', description: 'Pakistan\'s biggest city deserves better commuting — our Karachi roadmap.', date: '2025-04-28', readTime: 4, body: `## Karachi, we're coming for you

With 16+ million people and some of the longest commutes in the country, Karachi is a priority for Waymate.

### The challenge

Karachi's sprawl makes route matching complex. Clifton to Korangi is 30+ km. Shahrah-e-Faisal to DHA crosses the entire city.

### Our approach

- Start with high-density corridors (Clifton ↔ Saddar, Gulistan-e-Jauhar ↔ Shahrah-e-Faisal).
- Partner with universities and corporate parks.
- Onboard motorbike hosts for shorter cross-city hops.

### Timeline

We're targeting Karachi launch in the coming months. Sign up now to get notified.` },
  { category: 'waymate-news', slug: 'waymate-2025-roadmap', title: 'Waymate 2025 Roadmap: What\'s Ahead', description: 'New cities, new features, and our vision for carpooling in Pakistan this year.', date: '2025-04-10', readTime: 5, body: `## Big plans for 2025

### Q2 2025
- ✅ Lahore launch
- ✅ Recurring trips
- ✅ Waypoints rewards
- 🔄 Islamabad/Rawalpindi launch

### Q3 2025
- Karachi launch (priority corridors)
- Corporate carpool programs
- Weekly commute subscriptions
- Improved route matching AI

### Q4 2025
- Faisalabad and Multan expansion
- Intercity carpooling on motorways
- EV host support
- Waymate for universities program

### Our vision

Make carpooling the default way Pakistanis commute — affordable, social, safe, and green.` },
];

function seed() {
  let created = 0;
  let skipped = 0;

  for (const article of ARTICLES) {
    const dir = path.join(ARTICLES_DIR, article.category);
    const filePath = path.join(dir, `${article.slug}.md`);

    if (fs.existsSync(filePath)) {
      skipped += 1;
      continue;
    }

    fs.mkdirSync(dir, { recursive: true });

    const frontmatter = [
      '---',
      `title: "${article.title.replace(/"/g, '\\"')}"`,
      `description: "${article.description.replace(/"/g, '\\"')}"`,
      `date: ${article.date}`,
      `readTime: ${article.readTime}`,
      `slug: ${article.slug}`,
      '---',
      '',
      article.body,
      '',
    ].join('\n');

    fs.writeFileSync(filePath, frontmatter, 'utf8');
    created += 1;
  }

  console.log(`Seed complete: ${created} created, ${skipped} skipped (${ARTICLES.length} total).`);
}

seed();
