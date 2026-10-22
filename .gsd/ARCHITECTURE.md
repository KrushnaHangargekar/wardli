# ARCHITECTURE.md — Wardli Technical Architecture

## System Structure
```
d:\Wardli\
├── .gsd/                 # GSD tracking, specification, roadmap, architecture
├── app/                  # Wardli Application (Vite + Vanilla CSS & ES modules)
│   ├── src/
│   │   ├── domain/       # Core business entities & type contracts
│   │   │   ├── models.js # Garment, Outfit, OutfitEvent, PlannedOutfit, Profile
│   │   │   └── types.js
│   │   ├── services/     # Pure business logic engines
│   │   │   ├── storage.js          # Multi-user repository with snapshot preservation
│   │   │   ├── suggestionEngine.js # Deterministic rules, color harmony, repetition control
│   │   │   ├── historyService.js   # Exact wear recording, grouping, manual add, edits
│   │   │   ├── plannerService.js   # Scheduling, laundry/reserved warnings, wear transition
│   │   │   ├── analyticsService.js # Wear counts, monthly stats, cost-per-wear
│   │   │   └── seedData.js         # Curated realistic wardrobe with accessories & history
│   │   ├── ui/           # Views and interactive components
│   │   │   ├── components/         # Navigation, modals, drawers, cards, badges
│   │   │   ├── screens/            # Wardrobe, Suggestions, History, Planner, Analytics, Profile
│   │   │   └── styles/             # Modular Vanilla CSS (tokens, base, components, layouts)
│   │   ├── main.js       # App entry point, routing, state orchestration
│   │   └── index.html
│   └── package.json
├── website/              # Public Marketing Website (separate from the app)
│   ├── index.html        # Hero, Features, Value Props, FAQs, Configurable App Download
│   ├── styles.css        # Premium minimal aesthetic (#000000, #FFFFFF, #1F1F1F, #E5E5E5)
│   ├── script.js         # Interactive demo, FAQ accordions, waitlist modal
│   └── assets/           # Brand icons, badges, illustrations
├── security/
│   ├── firestore.rules   # Strict owner-isolated Firestore rules
│   └── storage.rules     # Strict owner-isolated Cloud Storage rules
└── tests/                # Automated verification suite
    ├── suggestionEngine.test.js
    ├── historyService.test.js
    ├── plannerService.test.js
    ├── repetitionControl.test.js
    └── analyticsService.test.js
```

## Security & Multi-User Isolation
All records (`garments`, `outfits`, `outfit_events`, `planned_outfits`, `outfit_feedback`) have a mandatory `userId`. The storage layer partitions data strictly by current authenticated user. Multi-user switching allows live testing of privacy boundaries.

## History Snapshot Integrity
When an outfit is marked as worn or logged manually, a complete snapshot of all involved items is persisted in the `outfit_events` entry alongside item IDs. If an item is subsequently archived, renamed, or modified, past history records remain immutable and accurate.
