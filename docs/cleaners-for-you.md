# Cleaners For You — Brand Guide

## 1. Colour Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary | Navy Blue | `#1B3A6B` | Headers, nav bars, primary buttons, section titles |
| Secondary | Royal Blue | `#2D5BE3` | Active states, links, booking CTA chips |
| Accent | Emerald Green | `#2E7D32` | Cleaner app headers, success states, "Book Now" CTAs, earnings |
| Warning/Star | Amber | `#F59E0B` | Star ratings, highlights |
| Danger | Red | `#D32F2F` | Cancelled states, complaint badges |
| Surface | White | `#FFFFFF` | Cards, phone shells, form backgrounds |
| Background | Light Grey | `#F4F6F9` | Page backgrounds, inactive states |
| Text Primary | Near Black | `#1A1A2E` | Headings, body text |
| Text Secondary | Mid Grey | `#6B7280` | Subtext, labels, meta info |
| Border | Light Grey | `#E5E7EB` | Card borders, dividers |

---

## 2. Typography

| Role | Weight | Size | Usage |
|---|---|---|---|
| Page Title | Bold 700 | 20–22px | Screen headers ("Home Dashboard", "Book a Clean") |
| Section Heading | SemiBold 600 | 16–18px | Card titles, section labels |
| Body | Regular 400 | 13–14px | Descriptions, list items, meta text |
| Label / Caption | Medium 500 | 11–12px | Badges, timestamps, small tags |
| Price / KPI | Bold 700 | 24–32px | £90.00, £450, £34,860 — always in Primary Navy or Green |
| Button Text | SemiBold 600 | 14px | All CTAs |

**Font family:** System sans-serif stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)

---

## 3. Portal Colour Themes

### Client App
- **Header bar:** Navy `#1B3A6B` with white text
- **Primary CTA ("Book Now", "Continue", "Pay"):** Navy `#1B3A6B` fill, white text, `rounded-xl`
- **Secondary CTA:** White with navy border and navy text

### Cleaner App
- **Header bar:** Emerald Green `#2E7D32` with white text
- **Primary CTA ("Accept", "Withdraw"):** Green `#2E7D32` fill
- **Earnings figures:** Green text on white cards

### Admin Dashboard
- **Sidebar + top bar:** Navy `#1B3A6B`
- **Active nav item:** Light blue-tinted row `#EBF0FB` with navy left border
- **KPI cards:** White with coloured icon tiles (blue, green, purple, amber, red)

---

## 4. Component Styles

### Cards
- Background: `#FFFFFF`
- Border: `1px solid #E5E7EB`
- Border radius: `16px` (mobile), `12px` (admin)
- Shadow: `0 1px 4px rgba(0,0,0,0.08)`
- Padding: `16px`

### Buttons
| Variant | Background | Text | Border Radius |
|---|---|---|---|
| Primary | `#1B3A6B` | White | `12px` |
| Success | `#2E7D32` | White | `12px` |
| Outline | White | `#1B3A6B` | `12px`, `1px navy border` |
| Ghost/Link | Transparent | `#2D5BE3` | — |
| Destructive | `#D32F2F` | White | `12px` |

### Badges / Status Pills
- `rounded-full`, small padding (`px-2 py-0.5`), `text-xs`
- Completed / Approved → green bg `#DCFCE7`, green text `#166534`
- Pending → amber bg `#FEF3C7`, amber text `#92400E`
- Cancelled / Rejected → red bg `#FEE2E2`, red text `#991B1B`
- In Progress / Info → blue bg `#DBEAFE`, blue text `#1E40AF`

### Bottom Navigation (Mobile)
- White background, `1px` top border `#E5E7EB`
- Active icon + label: Navy `#1B3A6B`
- Inactive: Grey `#9CA3AF`

### Form Inputs
- White background, `1px solid #E5E7EB` border
- `rounded-xl`, `12px` padding
- Focus: `1px solid #1B3A6B`

---

## 5. Mobile Phone Shell
- Dark grey/black bezel (`#1F2937`)
- White interior background
- Status bar: small notch pill (dark), time left-aligned, battery right-aligned
- Corner radius: `36–40px` outer shell

---

## 6. Spacing & Layout

| Token | Value | Usage |
|---|---|---|
| `xs` | `4px` | Icon gaps, tight labels |
| `sm` | `8px` | Within-card padding |
| `md` | `16px` | Card padding, section gaps |
| `lg` | `24px` | Between cards |
| `xl` | `32px` | Section breaks |

---

## 7. Iconography
- Style: **Lucide React** — stroke-based, 1.5px weight
- Size: `16px` inline, `20px` nav, `24px` featured

---

## 8. Brand Mark
- Logo: "CLEANERS FOR YOU" wordmark in navy `#1B3A6B`, broom/sparkle icon
- Tagline: *"Trusted Cleaners In Minutes"* — Regular weight, mid-grey `#6B7280`

---

## 9. Key Token Reference (Tailwind config)

```js
colors: {
  navy:   { DEFAULT: '#1B3A6B', light: '#EBF0FB' },
  brand:  { green: '#2E7D32', amber: '#F59E0B', red: '#D32F2F', blue: '#2D5BE3' },
  surface: '#FFFFFF',
  bg:     '#F4F6F9',
}
```
