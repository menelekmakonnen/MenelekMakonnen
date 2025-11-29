# Remaining Work Summary

## Data & Gallery Integration
- **Photography** and **AI Albums** pages still use placeholder content and "coming soon" panels rather than loading real Google Drive folders or showing album media. The Photography view is limited to two mock categories with no items, and the AI Albums view renders a placeholder notice plus mock album cards but no images.
- **View All tiles** on gallery pages are implemented as standalone buttons instead of album-style cards with their own cover imagery (e.g., Video Edits uses a button above the grid). These should appear alongside other albums as proper tiles.

## Single View Experience
- Arrow keys inside Single View currently advance items with Up/Down and switch albums with Left/Right, which conflicts with the requirement that arrow keys in Single View should only move through media items and not change pages or albums.

## Links & Contacts Behavior
- Link cards navigate directly off-site; there is no Single View preview/embedded view for links before opening the external page.

## Loremaker Implementation
- Loremaker still relies on mock data without character image reliability checks, a 21st blurred entry linking to loremaker.cloud, or Single View sidebars that surface other character thumbnails for navigation.

## HUD Tools & Overlays
- Histogram/Waveform panels are toggled but not yet draggable, constrained to viewport, or updating from live media state.

## Lens Toggle Coverage
- Lens-mode responsive layout rules are applied to Links, but Home and other gallery pages are not yet harmonized, so densities remain static across lenses.
