# 🎯 LinguaFlow School — Premium UI/UX Implementation Plan

**Goal:** Transform LinguaFlow School from "functional developer UI" menjadi **world-class premium design** — zero emoji-as-icons, WCAG AA accessible, recharts-powered dashboards, desktop sidebar for students, dan micro-interactions khas desainer top 1%.

**Total estimated time: ~2.5 hours · 6 phases · 25+ tasks**

---

## 📦 Dependency (do FIRST)

```bash
npm install recharts
```

---

## ⚡ Phase 1: Foundation (globals.css + shared components)

### 1.1 prefers-reduced-motion
**File:** `src/app/globals.css` — append AFTER line 140

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .animate-float-up, .animate-pulse-ring, .animate-typing-dot {
    animation: none !important;
    opacity: 1 !important;
  }
}
```

### 1.2 Darken ink-soft untuk WCAG AA
**File:** `src/app/globals.css` line 20

**BEFORE:** `--color-ink-soft: #6b7280;`
**AFTER:** `--color-ink-soft: #4b5563;`

### 1.3 Skip-to-content link
**File:** `src/app/layout.tsx` — di dalam `<body>`, SEBELUM `{children}`

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:rounded-btn focus:bg-indigo focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:outline-none focus:shadow-soft-lg"
>
  Langsung ke konten utama
</a>
```

Kemudian tambah `id="main-content"` di:
- `src/app/page.tsx` line 94 — `<div id="main-content" ...>`
- `src/app/g/layout.tsx` line 13 — content div
- `src/app/a/layout.tsx` line 13 — content div
- `src/components/layout/StudentShell.tsx` line 36 — `<main id="main-content" ...>`

### 1.4 Fix Card hover — no layout shift
**File:** `src/components/ui/Card.tsx` line 22

**BEFORE:** `interactive && "transition-all duration-150 hover:shadow-soft-lg hover:-translate-y-0.5 cursor-pointer"`
**AFTER:** `interactive && "transition-shadow duration-150 hover:shadow-soft-lg hover:ring-2 hover:ring-indigo/10 cursor-pointer"`

### 1.5 Fix Button active — no scale transform
**File:** `src/components/ui/Button.tsx` lines 14-23

Ganti SEMUA `active:scale-[0.98]` dengan `active:brightness-[0.92] active:shadow-inset`.

### 1.6 Floating navbar landing page
**File:** `src/components/layout/PublicShell.tsx` line 14

**BEFORE:** `<header className="sticky top-0 z-50 bg-warm-white/90 backdrop-blur-md border-b border-line/60">`
**AFTER:** `<header className="sticky top-4 z-50 mx-auto max-w-7xl px-5 md:px-8"><nav className="rounded-2xl border border-line/40 bg-paper/80 px-5 py-2.5 shadow-soft backdrop-blur-xl md:px-8">`

---

## 🔥 Phase 2: Icon Audit — Replace ALL Emoji Icons

**Rule:** ZERO emoji sebagai UI icons. Semua diganti Lucide React components.

| # | File | Line(s) | Emoji | Lucide Component |
|---|------|---------|-------|-----------------|
| 1 | `src/app/page.tsx` | 134 | 👋 | `Wave size={16}` — dibungkus flex gap-1 |
| 2 | `src/app/page.tsx` | 136 | 🔔 | `Bell size={18}` |
| 3 | `src/app/page.tsx` | 150 | 🔥 | `Flame size={22} className="text-vermillion mx-auto"` |
| 4 | `src/app/page.tsx` | 155 | ⭐ | `Star size={22} className="text-gold mx-auto" fill="currentColor"` |
| 5 | `src/app/m/dashboard/page.tsx` | 58 | 🔥 | `Flame size={28} className="text-vermillion"` — plus bungkus span dgn bg-vermillion/10 |
| 6 | `src/app/m/dashboard/page.tsx` | 76 | ⏰ | HAPUS `<span>⏰</span>` — Clock icon sudah ada |
| 7 | `src/app/m/leaderboard/page.tsx` | 65 | 🔥 | `<Flame size={12} className="inline text-vermillion" />` |
| 8 | `src/app/m/leaderboard/page.tsx` | 88 | 🔥 | Sama seperti #7 |
| 9 | `src/app/m/kamus/page.tsx` | 76 | 🔍 | `Search size={40} className="text-ink-soft/40"` |
| 10 | `src/app/m/kamus/page.tsx` | 133 | 🔊 | `Volume2 size={18}` |
| 11 | `src/app/m/kuis/page.tsx` | 76 | 🎲 | `Gamepad2 size={32} className="text-indigo"` |
| 12 | `src/app/m/kuis/review/page.tsx` | 53 | 💪 | `<Zap size={16} className="inline text-gold" />` |
| 13 | `src/app/m/belajar/page.tsx` | 15-18 | 📦🏃🎨🔗 | `Package`, `Run`, `Palette`, `Link2` — ganti icon data type dari string ke component |
| 14 | `src/app/m/belajar/ringkasan/page.tsx` | 23 | 🎉 | `<PartyPopper size={28} className="inline text-gold" />` |
| 15 | `src/app/m/belajar/ringkasan/page.tsx` | 31 | 🔥 | Hapus dari data string, render Flame component langsung |
| 16 | `src/app/m/speech/hasil/page.tsx` | 27 | 🎉 | `<Sparkles size={28} className="inline text-gold" />` |
| 17 | `src/app/m/profil/page.tsx` | 11 | 🔥 | Hapus "🔥" dari data string |
| 18 | `src/app/g/dashboard/page.tsx` | 35 | 👋 | Hapus emoji |
| 19 | `src/app/g/kelas/page.tsx` | 92 | 🔥 | `<Flame size={15} className="inline text-vermillion" />` |
| 20 | `src/app/g/kelas/murid/page.tsx` | 46 | 🔥 | `<Flame size={16} className="inline text-vermillion" />` |
| 21 | `src/components/layout/StudentShell.tsx` | 13 | 👋 | Hapus emoji, ganti dgn Wave icon jika perlu |

---

## ♿ Phase 3: Accessibility Layer

### 3.1 Tab ARIA roles
Tambah `role="tablist"`, `role="tab"`, `aria-selected` di:

- `src/app/m/leaderboard/page.tsx` lines 37-49 — filter tabs
- `src/app/m/kuis/page.tsx` lines 18-37 — kuis tabs
- `src/app/m/belajar/page.tsx` lines 28-44 — level tabs
- `src/app/g/kelas/murid/page.tsx` lines 64-84 — detail tabs

### 3.2 cursor-pointer audit
Pastikan semua interactive elements punya cursor-pointer:
- Stat cards di dashboard → tambah `interactive` prop ke Card
- Settings buttons di profil → tambah `cursor-pointer`
- Tab buttons di semua halaman → tambah `cursor-pointer`
- Category cards di belajar page → sudah punya via interactive prop ✓

### 3.3 Chart aria-labels
- `src/app/a/dashboard/page.tsx` line 68 — `role="img" aria-label="Grafik aktivitas 30 hari"`
- `src/app/m/profil/page.tsx` line 55 — `role="img" aria-label="Grafik aktivitas 14 hari"`

---

## 📊 Phase 4: Dashboard Upgrade

### 4.1 Admin dashboard — Recharts AreaChart
**File:** `src/app/a/dashboard/page.tsx`

Ganti div bars (lines 66-79) dengan:
```tsx
"use client";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
```
Area chart dengan gradient fill indigo, tooltip premium, grid halus.

### 4.2 Teacher laporan — Recharts BarChart
**File:** `src/app/g/laporan/page.tsx`

Ganti progress bar kategori dengan BarChart, color threshold <70 gold / >=70 indigo.

### 4.3 Bento grid admin dashboard
**File:** `src/app/a/dashboard/page.tsx`

Ganti grid 2-col bawah (lines 80-110) dengan grid 3-col bento:
- Kelas Paling Aktif → `lg:col-span-2`
- Guru Paling Aktif → `lg:col-span-1` (dengan ranking number circle)

### 4.4 Skeleton loading (CREATE new file)
**Create:** `src/components/ui/Skeleton.tsx`

```tsx
export function Skeleton({ className, variant = "text", width, height }: SkeletonProps) {
  return <div className={cn("animate-pulse bg-indigo-tint-soft/60", variant === "circular" && "rounded-full", ...)} style={{ width, height }} aria-hidden="true" />;
}
export function CardSkeleton({ className }) { return ( <div className={cn("rounded-card border border-line bg-paper p-5 shadow-soft", className)}> <Skeleton variant="circular" width={40} height={40} /> <Skeleton variant="text" width="60%" className="mt-3" /> <Skeleton variant="text" width="40%" className="mt-2" /> </div> ); }
```

Tambah `"use client"` + loading state (600ms simulated) di:
- `src/app/a/dashboard/page.tsx`
- `src/app/g/dashboard/page.tsx`
- `src/app/m/dashboard/page.tsx`

---

## 🧑‍🎓 Phase 5: Student Experience

### 5.1 Student Desktop Sidebar (CREATE new file)
**Create:** `src/components/layout/StudentSidebar.tsx`

Sidebar dengan nav items: Belajar, Kuis, Kamus, Sensei, Peringkat, Ucapan, Profil
Sama persis pattern AppSidebar — indigo active state, avatar di bottom.

**Modify:** `src/components/layout/StudentShell.tsx`
- Import `StudentSidebar`
- Tambah `<StudentSidebar />` SEBELUM `<main>`
- Ganti `md:ml-0 md:max-w-none` jadi `md:ml-60 md:max-w-4xl`

### 5.2 Premium bottom nav indicator
**File:** `src/components/layout/StudentBottomNav.tsx`

Tambah vermillion active bar indicator (absolute positioned, rounded-full, w-8 h-1).
Ganti background jadi `bg-paper/90 backdrop-blur-xl` untuk glassmorphism.

### 5.3 Staggered entrance animations
**Add to globals.css:**
```css
@keyframes card-in { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.animate-card-in { animation: card-in 0.35s ease-out both; }
.animate-card-in-1 { animation-delay: 0.05s; }
.animate-card-in-2 { animation-delay: 0.1s; }
.animate-card-in-3 { animation-delay: 0.15s; }
.animate-card-in-4 { animation-delay: 0.2s; }
.animate-card-in-5 { animation-delay: 0.25s; }
```

Apply ke `src/app/m/dashboard/page.tsx` — stat cards + quick action cards.

---

## 💎 Phase 6: Premium Polish

### 6.1 Hero glow gradient
**Add to globals.css:**
```css
.hero-glow::before {
  content: ""; position: absolute; top: -30%; left: -20%; width: 140%; height: 140%;
  background: radial-gradient(ellipse at 30% 50%, rgba(43,58,103,0.06) 0%, transparent 60%);
  pointer-events: none;
}
.hero-glow-vermillion::before { background: radial-gradient(ellipse at 70% 50%, rgba(200,55,58,0.05) 0%, transparent 60%); }
```

Apply ke landing page hero: `src/app/page.tsx` line 98 — tambah class `hero-glow hero-glow-vermillion`.

### 6.2 Pricing glow effect
**File:** `src/app/page.tsx` — popular card (sekolah):
- Tambah `shadow-[0_0_30px_rgba(200,55,58,0.12)] scale-[1.02]`
- Badge "Paling Populer" jadi centered: `left-1/2 -translate-x-1/2`
- Tambah staggered `animate-card-in-1/2/3`

### 6.3 Leaderboard podium gradient bars
**File:** `src/app/m/leaderboard/page.tsx`

Ganti solid color bars dengan `linear-gradient(180deg, color → color88)`.
Tambah shine overlay untuk #1 (`bg-gradient-to-b from-white/15 to-transparent`).
Crown pake glow shadow.

### 6.4 Playfair Display untuk landing headings
**File:** `src/app/layout.tsx` — import Playfair_Display, add variable
**File:** `src/app/globals.css` — add `--font-display`
**File:** `src/app/page.tsx` — apply `display` class ke h1, h2 section headings

### 6.5 Page transition
**Create:** `src/components/layout/PageTransition.tsx` — fade+slide 300ms
**Modify:** `src/app/layout.tsx` — wrap children dengan PageTransition

---

## 📋 File Summary

### CREATE (3 new files)
| File | Purpose |
|------|---------|
| `src/components/ui/Skeleton.tsx` | Skeleton loading components |
| `src/components/layout/StudentSidebar.tsx` | Desktop sidebar for students |
| `src/components/layout/PageTransition.tsx` | Page fade transition wrapper |

### MODIFY (18 files)
| File | Changes |
|------|---------|
| `src/app/globals.css` | prefers-reduced-motion, ink-soft, card-in animations, hero-glow, Playfair font |
| `src/app/layout.tsx` | Skip link, Playfair font, PageTransition |
| `src/app/page.tsx` | 4 emoji → Lucide, hero glow, pricing glow, floating nav, Playfair headings, stagger |
| `src/app/m/dashboard/page.tsx` | 🔥→Flame, loading skeleton, cursor-pointer, stagger |
| `src/app/m/leaderboard/page.tsx` | 🔥→Flame (2x), podium gradient, tab aria-labels |
| `src/app/m/kamus/page.tsx` | 🔍→Search, 🔊→Volume2 |
| `src/app/m/kuis/page.tsx` | 🎲→Gamepad2, tab aria-labels |
| `src/app/m/kuis/review/page.tsx` | 💪→Zap |
| `src/app/m/belajar/page.tsx` | 📦🏃🎨🔗→Lucide, tab aria-labels |
| `src/app/m/belajar/ringkasan/page.tsx` | 🎉→PartyPopper, 🔥→Flame |
| `src/app/m/speech/hasil/page.tsx` | 🎉→Sparkles |
| `src/app/m/profil/page.tsx` | 🔥 hapus dari data |
| `src/app/g/dashboard/page.tsx` | 👋 hapus, loading skeleton |
| `src/app/g/kelas/page.tsx` | 🔥→Flame |
| `src/app/g/kelas/murid/page.tsx` | 🔥→Flame, tab aria-labels |
| `src/app/g/laporan/page.tsx` | BarChart recharts |
| `src/app/a/dashboard/page.tsx` | AreaChart recharts, Bento grid, loading skeleton |
| `src/components/layout/StudentShell.tsx` | StudentSidebar, page-enter |
| `src/components/layout/PublicShell.tsx` | Floating navbar |
| `src/components/layout/StudentBottomNav.tsx` | Premium active indicator |
| `src/components/ui/Button.tsx` | scale→shadow |
| `src/components/ui/Card.tsx` | translate→ring+shadow |

---

## ✅ Verification

Setelah implementasi, verifikasi:

1. **Zero emoji icons** — `rg '["'"'"']\p{Extended_Pictographic}' src/ | grep -v 'node_modules'` → harus empty
2. **cursor-pointer** — Buka halaman, hover cards → cursor berubah jadi pointer
3. **Skip link** — Tekan Tab saat halaman load → link "Langsung ke konten utama" muncul
4. **Keyboard nav** — Tab melalui semua interactive elements → focus ring visible (indigo)
5. **Reduced motion** — Aktifkan di OS Settings → semua animasi stop
6. **Contrast** — Cek `text-ink-soft` vs `bg-warm-white` di contrast checker → ≥ 4.5:1
7. **Charts** — Admin dashboard dan teacher laporan tampil dengan recharts SVG
8. **Student sidebar** — Resize browser > 768px → sidebar muncul di kiri
9. **Bottom nav** — Tab aktif ada vermillion bar indicator
10. **Build** — `npm run build` sukses tanpa error TypeScript
