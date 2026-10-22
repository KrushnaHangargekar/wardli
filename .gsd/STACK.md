# STACK.md — Wardli Technology Stack

## Core Technologies
- **Runtime**: Node.js v24.18.0
- **Frontend Core**: Modern JavaScript (ES2022+), Semantic HTML5
- **Styling**: Vanilla CSS with modern custom properties, flexbox, grid, glassmorphism, fluid responsive layouts.
- **Build / Dev Server**: Vite (lightweight, zero-config, blazing-fast HMR)
- **Persistence**: LocalStorage / IndexedDB repository engine with multi-user isolation, JSON export/import, and Firestore schema parity.
- **Testing**: Node test runner (`node:test`, `node:assert`) for zero-dependency high-speed test verification.
- **Design Tokens**:
  - Primary: `#000000`
  - Background: `#FFFFFF`
  - Text Primary: `#1F1F1F`
  - Border / Muted: `#E5E5E5`
  - Secondary Text: `#71717A`
  - Surface Accent: `#F4F4F5`
  - Status Badges:
    - Clean: `#10B981` (Emerald)
    - Worn: `#F59E0B` (Amber)
    - In Laundry: `#3B82F6` (Blue)
    - Reserved: `#8B5CF6` (Purple)
  - Typography: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
