# Specification

## Summary
**Goal:** Build a mobile-first gaming & entertainment website (GameZone Arena) with a dark neon theme, featuring game browsing, mock authentication, wallet management, promotions, a real-time sidebar, and an admin dashboard.

**Planned changes:**

### Layout & Navigation
- Sticky header with logo, Register/Login button (gold accent), and a scrolling marquee showing sample winner messages below it
- Collapsible left sidebar with icons and labels for: Slots, Live Casino, Sports, Table Games, Promotions, VIP — expands on desktop, slides in as drawer on mobile
- Mobile-only bottom navigation bar (Home, Wallet, Promo, Profile) fixed to bottom of screen
- Top bar (shown when logged in) with balance display, notifications bell with badge, and profile dropdown (My Profile, Wallet, Transaction History, Logout)
- Site footer with three columns: Quick Links, Legal Links, and Payment Methods (Bkash, Nagad, Rocket, Visa, Mastercard); includes copyright and Responsible Gaming disclaimer; trust badges (18+, Secure) visible in header or footer

### Hero Slider
- Auto-advancing hero slider (3–5 slides, 4-second interval) with full-width background images, headline, sub-heading, CTA button, prev/next arrows, and dot indicators

### Game Grid
- Categorized game grid with four tabs: Slots, Live Casino, Sports, Table Games
- Reusable GameCard component with thumbnail, title, and "Play Now" button; hover scale/glow effect
- Responsive grid: 2 columns mobile, 3 tablet, 4+ desktop; mock data and placeholder thumbnails

### Real-Time Sidebar
- Right-side sidebar (desktop always visible, mobile toggle) with a live recent-wins feed (updates every few seconds with mock data) and a top-10 leaderboard table

### Authentication (Mock)
- Register modal/page (username, phone, password) with simulated 6-digit OTP verification step
- Login modal/page (phone, password)
- Auth state stored in frontend context; logged-in state reveals top bar with balance

### Wallet Page (`/wallet`)
- Displays current balance, Deposit section, Withdrawal section (prevents negative balance), and Transaction History table (date, type, amount, status) — all frontend state with mock data

### Promotions Page (`/promo`)
- Responsive grid of at least 4 promo cards (Welcome Bonus, Reload Bonus, Cashback, Referral) with banner image, title, description, expiry date, and Claim Now button (shows toast on click)

### Admin Dashboard (`/admin`)
- User Management table (5+ mock users: username, phone, balance, status)
- Bet Tracking table (10+ mock bet entries: player, game, amount, outcome)
- Withdrawal Approvals list with Approve/Reject buttons updating status in frontend state

### Backend (Motoko)
- Motoko actor persisting user accounts (username, phone, hashed password placeholder, balance) and transaction records
- Exposes: `createUser`, `getUser`, `updateBalance` (rejects negative balance), `addTransaction`, `getTransactions` (reverse chronological)

### Visual Theme
- Dark charcoal background (#121212), gold (#FFD700) primary accent, electric blue (#00BFFF) secondary accent
- Modern sans-serif typography; all interactive elements with 150–200ms hover/active transitions

**User-visible outcome:** Users can browse categorized games, register/login with mock OTP, manage a mock wallet, view live win feeds and leaderboards, claim promotions, and navigate a fully themed dark neon gaming site on both desktop and mobile. Admins can view users, bets, and manage withdrawal approvals at `/admin`.
