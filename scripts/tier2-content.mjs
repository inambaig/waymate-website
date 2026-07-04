/**
 * Tier-2 SEO upgrades for non-pillar articles.
 * Each gets image, FAQ, extra body content, and internal links.
 */
export const CATEGORY_IMAGES = {
  'carpooling-tips': {
    image: '/article-images/carpool-tips.jpg',
    imageAlt: 'Commuters sharing a friendly carpool ride in Pakistan',
  },
  'city-guides': {
    image: '/article-images/lahore-carpool.jpg',
    imageAlt: 'City commute corridor in Pakistan',
  },
  'save-money': {
    image: '/article-images/carpool-savings.jpg',
    imageAlt: 'Saving money on daily commute costs in Pakistan',
  },
  'safety-trust': {
    image: '/article-images/safety-verification.jpg',
    imageAlt: 'Verified and trusted carpool safety',
  },
  environment: {
    image: '/article-images/green-commute.jpg',
    imageAlt: 'Green commuting with fewer cars on the road',
  },
  'ride-hosts': {
    image: '/article-images/ride-host.jpg',
    imageAlt: 'Ride host driving passengers on a daily commute',
  },
  passengers: {
    image: '/article-images/passenger-app.jpg',
    imageAlt: 'Passenger booking a carpool seat on mobile',
  },
  'waymate-news': {
    image: '/article-images/waymate-launch.jpg',
    imageAlt: 'Waymate community and product updates',
  },
};

export const CATEGORY_LINKS = {
  'carpooling-tips': [
    { label: 'first-time carpooler guide', href: '/articles/carpooling-tips/first-time-carpooler-guide.html' },
    { label: 'Lahore carpooling guide', href: '/articles/city-guides/carpooling-lahore-guide.html' },
    { label: 'how much carpooling saves', href: '/articles/save-money/how-much-carpooling-saves.html' },
  ],
  'city-guides': [
    { label: 'Gulberg to DHA route guide', href: '/articles/city-guides/gulberg-to-dha-lahore.html' },
    { label: 'Islamabad commute routes', href: '/articles/city-guides/islamabad-commute-routes.html' },
    { label: 'Karachi carpool hotspots', href: '/articles/city-guides/karachi-carpool-hotspots.html' },
  ],
  'save-money': [
    { label: 'carpool vs ride-hailing costs', href: '/articles/save-money/carpool-vs-ride-hailing.html' },
    { label: 'monthly savings breakdown', href: '/articles/save-money/how-much-carpooling-saves.html' },
    { label: 'fuel cost splitting guide', href: '/articles/save-money/fuel-cost-splitting-guide.html' },
  ],
  'safety-trust': [
    { label: 'how Waymate verifies users', href: '/articles/safety-trust/how-waymate-verifies-users.html' },
    { label: 'safety tips for women', href: '/articles/safety-trust/carpool-safety-tips-women.html' },
    { label: 'rating system explained', href: '/articles/safety-trust/rating-system-explained.html' },
  ],
  environment: [
    { label: 'carbon footprint of carpooling', href: '/articles/environment/carpooling-carbon-footprint.html' },
    { label: 'Lahore air quality and carpooling', href: '/articles/environment/lahore-air-quality-carpooling.html' },
    { label: 'green commute challenge', href: '/articles/environment/green-commute-challenge.html' },
  ],
  'ride-hosts': [
    { label: 'become a ride host', href: '/articles/ride-hosts/become-a-ride-host.html' },
    { label: 'maximise host earnings', href: '/articles/ride-hosts/maximize-host-earnings.html' },
    { label: 'recurring trips guide', href: '/articles/ride-hosts/recurring-trips-guide.html' },
  ],
  passengers: [
    { label: 'find your first ride', href: '/articles/passengers/finding-your-first-ride.html' },
    { label: 'weekly commute booking', href: '/articles/passengers/weekly-commute-booking.html' },
    { label: 'passenger safety checklist', href: '/articles/passengers/passenger-safety-checklist.html' },
  ],
  'waymate-news': [
    { label: 'Waymate launches in Lahore', href: '/articles/waymate-news/waymate-launches-lahore.html' },
    { label: 'Waypoints rewards program', href: '/articles/waymate-news/waypoints-rewards-program.html' },
    { label: '2025 product roadmap', href: '/articles/waymate-news/waymate-2025-roadmap.html' },
  ],
};

const FAQ_TEMPLATES = {
  'carpooling-tips': [
    { q: 'How early should I book a carpool seat?', a: 'For popular Lahore and Islamabad routes, booking 12-24 hours ahead improves seat availability and pickup reliability.' },
    { q: 'What if my schedule changes suddenly?', a: 'Message your host or passenger group immediately in-app. Early communication protects ratings and helps everyone adjust.' },
    { q: 'Is carpooling only for long routes?', a: 'No. Some of the best carpools are 6-15 km daily office routes with repeated timing.' },
  ],
  'city-guides': [
    { q: 'Which city has the strongest carpool demand right now?', a: 'Lahore currently has the highest route density on Waymate, with Islamabad-Rawalpindi growing quickly.' },
    { q: 'Should I choose main-road or side-street pickups?', a: 'Prefer main-road landmark pickups for visibility, safety, and faster boarding during rush hour.' },
    { q: 'Can intercity routes work for carpooling?', a: 'Yes. Motorway corridors like Lahore-Faisalabad and Lahore-Multan are popular when planned a day in advance.' },
  ],
  'save-money': [
    { q: 'How quickly can I see savings?', a: 'Most commuters notice savings within the first week once they replace solo or ride-hailing trips with fixed carpool seats.' },
    { q: 'Do hosts also save money?', a: 'Yes. Hosts offset fuel and running costs by filling empty seats on routes they already drive daily.' },
    { q: 'Are there hidden commute costs beyond fuel?', a: 'Parking, maintenance, tyre wear, and peak surge pricing can significantly increase true monthly commute spend.' },
  ],
  'safety-trust': [
    { q: 'What should I check before entering a vehicle?', a: 'Confirm profile photo, vehicle details, ratings, and live trip visibility before the ride starts.' },
    { q: 'Can I report a safety concern after the trip?', a: 'Yes. Use in-app reporting on completed trips so Waymate can review and take action quickly.' },
    { q: 'Does verification guarantee perfect rides?', a: 'Verification reduces risk significantly, but personal judgment and clear communication remain essential.' },
  ],
  environment: [
    { q: 'How much emissions reduction can one carpool create?', a: 'A full car with shared passengers can cut per-person transport emissions by up to 75% versus solo driving.' },
    { q: 'Is carpooling meaningful in highly polluted cities?', a: 'Yes. Removing even one car from peak corridors helps congestion, air quality, and urban noise levels.' },
    { q: 'Do short daily carpools still matter?', a: 'Absolutely. Daily repetition multiplies impact over months and years.' },
  ],
  'ride-hosts': [
    { q: 'How many seats should new hosts open initially?', a: 'Start with one or two seats until your timing and pickup routine become predictable.' },
    { q: 'What makes passengers rebook the same host?', a: 'Punctuality, clean vehicle, fair pricing, and respectful communication drive repeat bookings.' },
    { q: 'Can hosts decline passengers?', a: 'Hosts should maintain clear route rules and communicate expectations to avoid mismatched bookings.' },
  ],
  passengers: [
    { q: 'How do I pick a reliable host?', a: 'Prioritise profiles with strong ratings, completed trip history, and route consistency on your corridor.' },
    { q: 'What is the best way to avoid no-shows?', a: 'Confirm pickup point and timing in chat 15-30 minutes before departure.' },
    { q: 'Can I book the same seat every week?', a: 'Yes. Weekly bookings are ideal for office commuters with fixed schedules.' },
  ],
  'waymate-news': [
    { q: 'Which cities are live on Waymate now?', a: 'Lahore is live now, with Islamabad-Rawalpindi rollout in progress and more cities planned.' },
    { q: 'How do I get notified about new features?', a: 'Keep app notifications enabled and follow Waymate updates in the articles section.' },
    { q: 'Will Waymate support both cars and bikes?', a: 'Yes. Waymate supports car and motorbike hosting depending on route and city availability.' },
  ],
};

const EXTRA_BY_SLUG = {
  'first-time-carpooler-guide': `## Building a reliable first-week routine

Your first week defines whether carpooling feels stressful or effortless. Pick one route, one time window, and one group before expanding. In Lahore and Islamabad, commuters who keep the same pickup landmark for five consecutive days report fewer delays and better seat matching.

### Quick first-week checklist

| Day | Action |
|-----|--------|
| Day 1 | Confirm pickup landmark and host profile |
| Day 2 | Arrive 5 minutes early |
| Day 3 | Share live trip with family contact |
| Day 4 | Leave honest rating and short feedback |
| Day 5 | Decide weekly repeat booking |

If you are comparing costs, read our [monthly savings breakdown](/articles/save-money/how-much-carpooling-saves.html).`,

  'carpool-etiquette-pakistan': `## Pakistani commute culture: small habits, big impact

In local commute culture, respect is shown through timing and consideration more than formal rules. If you follow a few social norms, your carpool group becomes significantly more stable.

![Commuters waiting at a safe landmark pickup point](/article-images/carpool-tips.jpg)

Avoid strong food smells, keep voice call volume low, and ask before changing seat positions. These details seem minor, but they are often mentioned in five-star reviews.`,

  'karachi-carpool-hotspots': `## Karachi corridor strategy

Karachi rewards corridor-based planning. Instead of trying to serve every neighborhood, focus on high-repeat office routes such as Clifton to I.I. Chundrigar and Gulistan-e-Jauhar to Shahrah-e-Faisal.

![Karachi city traffic during rush hour](/article-images/karachi-traffic.jpg)

For longer cross-city rides, agree on one main pickup landmark and one emergency alternate route before departure.`,

  'fuel-cost-splitting-guide': `## Transparent splits prevent group drop-off

The most sustainable carpools use simple, visible pricing rules from day one. Whether you split by seat price or weekly fuel receipt, publish the method in your group chat before the first ride.

| Method | Best for | Risk |
|--------|----------|------|
| Fixed seat price | Daily office carpools | Low |
| Weekly receipt split | Informal friend groups | Medium |
| Host rotation | Equal driving duty | Low |`,
};

function buildExtraBody(category, slug, title) {
  if (EXTRA_BY_SLUG[slug]) return EXTRA_BY_SLUG[slug];

  const links = (CATEGORY_LINKS[category] ?? [])
    .filter((l) => !l.href.includes(`/${slug}.html`))
    .slice(0, 3)
    .map((l) => `- [${l.label}](${l.href})`)
    .join('\n');

  const img = CATEGORY_IMAGES[category] ?? { image: '/article-images/default-og.jpg', imageAlt: title };

  return `## Practical next steps for ${title.toLowerCase()}

If you are building a regular commute routine in Pakistan, consistency matters more than perfection. Choose one route, keep timing stable for at least two weeks, and communicate early when plans change.

![${img.imageAlt}](${img.image}) 

### Related guides

${links}

### Waymate tip

Use recurring trips and weekly seat booking to reduce daily friction. This is especially useful on dense routes in Lahore, Islamabad, and Karachi where peak-hour demand fills quickly.

Download Waymate and start with a single corridor before expanding your commute network.`;
}

export const TIER2_UPGRADES = [];

const PILLAR_KEYS = new Set([
  'city-guides/carpooling-lahore-guide',
  'city-guides/islamabad-commute-routes',
  'save-money/how-much-carpooling-saves',
  'save-money/carpool-vs-ride-hailing',
  'safety-trust/how-waymate-verifies-users',
  'safety-trust/carpool-safety-tips-women',
  'ride-hosts/become-a-ride-host',
  'passengers/finding-your-first-ride',
  'city-guides/gulberg-to-dha-lahore',
  'waymate-news/waymate-launches-lahore',
]);

// Populated by scanning content/articles at runtime in upgrade script
export function buildTier2Upgrade(category, slug, title) {
  if (PILLAR_KEYS.has(`${category}/${slug}`)) return null;
  const catImg = CATEGORY_IMAGES[category] ?? {
    image: '/article-images/default-og.jpg',
    imageAlt: title,
  };
  return {
    category,
    slug,
    updated: '2026-03-01',
    readTime: 6,
    image: catImg.image,
    imageAlt: catImg.imageAlt,
    faq: FAQ_TEMPLATES[category] ?? FAQ_TEMPLATES['carpooling-tips'],
    extraBody: buildExtraBody(category, slug, title),
  };
}
