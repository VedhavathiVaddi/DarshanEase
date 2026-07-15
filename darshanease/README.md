# DarshanEase

A frontend for booking temple darshan tickets and time slots online — built with
React (Vite) and React Router. This repo currently contains the **client** app
only; it runs standalone against a mock, localStorage-backed data layer so you
can develop the UI before a real backend exists.

## Tech stack

- React 18 + Vite
- React Router v6 (client-side routing, protected routes)
- Plain CSS with a design-token system (`src/index.css`) — no UI framework
- Mock service layer (`src/services/*`) backed by `localStorage`, shaped like
  real API clients so they're easy to swap for `fetch` calls later

## Getting started

```bash
cd client
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

```bash
npm run build     # production build to client/dist
npm run preview   # preview the production build locally
```

## Project structure

```
client/
├── public/               # static assets served as-is (favicon, logo)
├── src/
│   ├── assets/           # images, icons, extra stylesheets
│   ├── components/       # reusable UI building blocks
│   ├── pages/             # one component per route
│   ├── services/         # mock API clients (auth, temples, bookings, payment)
│   ├── context/          # AuthContext + BookingContext (React Context)
│   ├── hooks/             # useAuth (and useBooking, exported from context)
│   ├── utils/             # constants, validators, helpers
│   └── routes/            # AppRoutes.jsx — route table + auth guard
└── package.json
```

## How the mock backend works

- **Auth** (`authService.js`): registers/logs in users against a `localStorage`
  "users table" and keeps a session in `localStorage` too. Swap each function
  body for a real `fetch('/api/auth/...')` call when a backend exists — the
  function signatures and return shapes are designed to stay the same.
- **Temples** (`templeService.js`): reads from a static catalogue in
  `utils/constants.js`. Replace with `GET /api/temples`.
- **Bookings** (`bookingService.js`): creates/lists/cancels bookings in
  `localStorage`, keyed by user ID.
- **Payments** (`paymentService.js`): simulates a card charge with a short
  delay. A card number starting with `0000` is a reserved test case that
  always declines, so the failure path is reachable in development.

## Booking flow

`Home`/`TempleList` → `TempleDetails` → `BookTicket` (needs login) →
`Payment` → `BookingSuccess` → `MyBookings`

The in-progress booking is held in `BookingContext` between `BookTicket` and
`Payment`, then persisted via `bookingService` once payment succeeds.

## Design direction

The visual identity (`src/index.css`) is themed around a temple courtyard:
ivory stone background, kumkum maroon and marigold accents, brass-gold
dividers, and a tank-water teal for links. The signature shape is the
"gopuram arch" card — a stepped, rounded silhouette borrowed from South
Indian temple towers — used for temple cards, booking summaries, and stat
tiles.

## Notes

- `favicon.ico` and `public/logo.png` are placeholder marks generated for this
  scaffold — swap them for real brand assets.
- No backend is included yet; everything persists to the browser's
  `localStorage` only, so data won't sync across devices until a real API is
  built.
