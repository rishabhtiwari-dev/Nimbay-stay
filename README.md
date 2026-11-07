# Nimba Stay

Frontend & API for Nimba Nature Cure Village front-desk staff to check room availability and book rooms without double-booking. Built for the 1.5-hour assessment.

## How to run it

Prerequisites: Node.js 18+ (tested on Node 20 & 24)

```bash
# install dependencies
npm install

# run test suite (verifies clash rules & input validation)
npm test

# start dev server
npm run dev
```

App runs on `http://localhost:3000`.

The room seed data and bookings are saved to `nimba-data.json` at the root, so there is no database setup or external service to run. It generates on first launch if not already present.

## What works

- **Availability search (`GET /api/availability?checkIn=&checkOut=&category=`)**:
  - Calculates total price for the whole stay (`nights * rate`).
  - Filters by category (Standard, Deluxe, Suite) or shows all.
  - Excludes maintenance rooms and any rooms already booked for those nights.
- **Booking (`POST /api/bookings`)**:
  - Validates required fields, checks checkout is strictly after checkin, and enforces a 10-digit phone number (returns 400 on failure).
  - Checks for overlapping bookings on the same room (returns 409 Conflict on clash).
  - Persists the confirmed booking.
- **Clash rules**:
  - Check-in on day X is allowed if another guest checks out on day X (`check_in < reqOut && check_out > reqIn`).
  - Cancelled bookings do not block rooms.
  - Rooms marked maintenance are never returned in search and cannot be booked.
- **Single-screen front-desk UI**:
  - Pick check-in, check-out, and optional category to search.
  - Select an available room card (shows nightly rate and total stay cost).
  - Fill guest name and phone number.
  - Submits booking, shows inline confirmation or error message, and immediately refreshes the available room list so the booked room disappears without needing to search again.
- **Unit tests**:
  - 15 Jest tests covering clash logic, edge cases (same-day turnaround, maintenance rooms, cancelled bookings), and validator constraints. Run with `npm test`.

## What doesn't

- **Cancellation flow in UI**: The database schema supports `status: "cancelled"` and the clash engine already ignores cancelled bookings, but I didn't have time within the 1.5-hour limit to build a separate booking lookup / cancellation UI for the front desk.
- **Auth**: There's no login screen or staff role management. Assumed this runs on an internal front-desk terminal.
- **Concurrency locking**: File write is synchronous, which works fine for a single front-desk instance. In a distributed setup with multiple desks, we'd want row-level locking or transactions via Postgres/SQLite WAL mode.

## Code structure (design vs logic separation)

Per the requirement, presentational design code and function/logic code are kept in separate files:

- `src/components/design/`: Pure JSX markup, Tailwind styling, and visual structure (`DateCategoryPickerDesign.tsx`, `RoomCardDesign.tsx`, `GuestFormDesign.tsx`, `StatusBannerDesign.tsx`, `NimbaStayPageDesign.tsx`).
- `src/components/functions/`: Pure functions and helpers without JSX (`datePickerFunctions.ts`, `roomCardFunctions.ts`, `guestFormFunctions.ts`, `statusBannerFunctions.ts`).
- `src/components/`: Thin controller components that wire functions into the design views.
- `src/hooks/useBooking.ts`: Handles UI state and API requests.
- `src/lib/`: Database storage, clash logic (`rooms.ts`), and validation (`validators.ts`).

## What I added beyond the brief & why

1. **Auto-refreshing availability after booking**: Once a room is booked, the UI immediately re-queries availability in the background. This ensures the booked room disappears right away so front-desk staff can't accidentally click it twice.
2. **Phone input auto-sanitizer**: The phone input automatically strips non-numeric characters and limits length to 10 digits as you type or paste. Front-desk staff often copy-paste numbers with spaces or "+91", so this prevents frustrating validation rejections.
3. **JSON file storage over SQLite**: Used a structured JSON file storage engine (`nimba-data.json`) instead of `better-sqlite3` to avoid native C++ compilation/node-gyp issues across different developer OS/Node setups, while keeping data persistent across server restarts.

## Tools used & how they helped

- **Next.js 15 (App Router)**: Kept both the API routes (`/api/availability`, `/api/bookings`) and the frontend on a single server, making it fast to wire everything together in 1.5 hours without configuring CORS or a separate backend server.
- **TypeScript**: Caught subtle parameter mismatches between the frontend and API contracts early, especially around date strings and status types.
- **Tailwind CSS**: Allowed quick layout and styling without context-switching to custom CSS files.
- **Jest & ts-jest**: Used to write and run unit tests for the three clash rules and validation edge cases, giving confidence that room overlap math is 100% solid.
