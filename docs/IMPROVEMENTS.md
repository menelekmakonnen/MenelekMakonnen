# Improvements & Next-Step Ideas

## Current Improvements
- Camera-inspired shell with power-on boot screen, daily session persistence, and manual power-off overlay to mirror DSLR flow.
- Centered header title with cycling subtitle tags, animated home-page navigation icons, and focus-reticle cursor states that respond to hover/click.
- Bottom HUD includes lens toggle (24mm/50mm/85mm/Macro), histogram/waveform toggles, grid/cursor/zebra/flicker controls, and visibility presets.
- Single View honors keyboard-only media navigation, supports macro zoom overlays, and hides HUD by default when expanded.
- Gallery grids respect media aspect intent (horizontal for films, vertical for video edits) with lens-aware density on Links/Contacts.
- Favicon, rotating globe navicon, and social iconography swapped to premium SVG assets to reinforce the camera aesthetic.

## Brainstormed Ideas for Next Session
- **Camera controls with real impact:** Tie ISO/aperture/shutter/WB sliders to global shaders and animation timings so exposure, blur, tint, and motion feel responsive. Add a Reset stack that can undo last change or clear the session.
- **Interactive overlays:** Make histogram and waveform draggable within bounds and feed them live data from the current media. Add toggle persistence per session.
- **Google Drive ingestion:** Load Photography and AI Albums from the provided shared Drive folders, with lazy loading, caching, and fallback "missing media" states.
- **Links & Contacts previews:** Open link cards in Single View with embedded previews and only offer external navigation from there.
- **Robust Single View controls:** Ensure left/right arrows and swipes cycle media within an album, add album-switching via A/D, and preserve the ESC cascade (Single View → album → gallery → home → power overlay).
- **LoreMaker depth:** Pull 21 characters (20 live + 1 blurred Loremaker.cta) from the sheet, display names/descriptions under cards, and add Single View sidebars plus cross-character suggestions.
- **View All tiles:** Render "View All" as proper album cards with cover art alongside other albums across Films, Video Edits, Photography, and AI Albums.
- **Accessibility & theming:** Implement skip links, focus indicators, reduced-motion handling, high-contrast & font-size toggles, and time-of-day palettes (golden/blue hour/night).
- **Gestures & onboarding:** Add touch gestures (pinch, two-finger swipes, double-tap), a first-visit tutorial overlay, and a keyboard shortcut cheat sheet (?/H).
- **Easter eggs:** Hook the rotating globe to toggle Konami/Developer modes, add Film Camera mode (B&W/grain), and implement the shake-to-home easter egg.
- **Performance polish:** Preload adjacent media, implement low-bandwidth mode, and optimize thumbnail generation for Instagram/YouTube/Drive sources.
