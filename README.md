# Waymate Website

Static marketing website for the [Waymate](https://waymate.pk) carpool app — redesigned to match the Stitch UI spec (Kinetic Community design system).

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to preview locally.

## Build for Production

```bash
npm run build
npm run preview
```

Output is in the `dist/` folder.

## Environment Variables

Copy `.env.example` to `.env` and update values:

| Variable | Description |
|----------|-------------|
| `VITE_APP_STORE_URL` | Apple App Store link |
| `VITE_PLAY_STORE_URL` | Google Play Store link |
| `VITE_CONTACT_EMAIL` | Contact email in footer |
| `VITE_SUPPORT_PHONE` | Support phone number |
| `VITE_SITE_URL` | Canonical site URL |
| `VITE_DEMO_VIDEO_ID` | YouTube video ID for mobile hero demo (default: `mhZM_GSgdFU`) |

The mobile hero phone mockup embeds the demo video from YouTube with autoplay and mute enabled. Change `VITE_DEMO_VIDEO_ID` to swap the video later.

## Tech Stack

- [Vite](https://vitejs.dev/) + [Tailwind CSS v4](https://tailwindcss.com/)
- Manrope typography + Material Symbols icons
- Kinetic Community color tokens (`#f58220` primary container, `#006d37` secondary, `#faf9f8` background)

## Layout

- **Desktop:** Full landing page with hero image, bento feature grid, how-it-works tabs, safety section
- **Mobile:** Stacked layout with YouTube demo in phone mockup, benefits carousel, dark features card, city list

## Assets

Brand assets (logo, app icon, benefit icons) are in `public/assets/` from the Waymate mobile app.
