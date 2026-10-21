---
name: Casas Eco
description: Portfolio of a builder and building-materials store in Garopaba/SC, in the company's green and white.
colors:
  white: "#FFFFFF"
  pale-leaf: "#EEF5EA"
  leaf-tone: "#DDEBD6"
  ink: "#17260F"
  moss-muted: "#3F5536"
  leaf-green: "#2D7A28"
  leaf-green-deep: "#22601F"
  forest-panel: "#1F4A1C"
  panel-muted: "#C9DEC0"
  light-leaf: "#9BD27A"
  error: "#A12A1B"
typography:
  numeral:
    fontFamily: "Archivo, Arial Narrow, Arial, sans-serif"
    fontSize: "min(clamp(6.5rem, 20vw, 19rem), 24vw)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
    fontVariation: "'wdth' 62"
  display:
    fontFamily: "Archivo, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(2.9rem, 4.3vw, 4.2rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.012em"
    fontVariation: "'wdth' 64"
  headline:
    fontFamily: "Archivo, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(2.9rem, 5.4vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.012em"
    fontVariation: "'wdth' 70"
  title:
    fontFamily: "Archivo, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.012em"
    fontVariation: "'wdth' 70"
  lead:
    fontFamily: "Archivo, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 1.8vw, 1.55rem)"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "Archivo, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(1.0625rem, .25vw + 1rem, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, Arial Narrow, Arial, sans-serif"
    fontSize: ".9375rem"
    fontWeight: 600
    lineHeight: 1
rounded:
  none: "0"
spacing:
  gap: "24px"
  chip-gap: "8px"
  row: "clamp(28px, 4.5vw, 64px)"
  band: "clamp(80px, 10vw, 152px)"
  roof-cut: "clamp(28px, 4.6vw, 68px)"
components:
  button-solid:
    backgroundColor: "{colors.leaf-green}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "15px 26px"
    height: "52px"
  button-solid-hover:
    backgroundColor: "{colors.leaf-green-deep}"
  button-solid-on-panel:
    backgroundColor: "{colors.light-leaf}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "15px 26px"
    height: "52px"
  button-solid-on-panel-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.forest-panel}"
  button-line:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "15px 26px"
    height: "52px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  chip:
    backgroundColor: "{colors.pale-leaf}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  chip-selected:
    backgroundColor: "{colors.leaf-green}"
    textColor: "{colors.white}"
  input:
    backgroundColor: "{colors.pale-leaf}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "50px"
  input-focus:
    backgroundColor: "{colors.white}"
  system-tab:
    textColor: "{colors.moss-muted}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "16px 18px"
  system-tab-selected:
    backgroundColor: "{colors.leaf-green}"
    textColor: "{colors.white}"
  nav-link:
    textColor: "{colors.moss-muted}"
    padding: "6px 0"
---

# Design System: Casas Eco

## Overview

**Creative North Star: "The Roofline Portfolio"**

A builder's portfolio that reads like the houses it shows: real photographs and videos carried full-bleed, white ground, and a single roof pitch that slices the page where a roof would meet the sky. The system is green and white only, taken from the logo's leaf and its darker forest tone. Everything that is an action is leaf green; everything that is a panel is forest green with white text. Nothing floats: depth comes from alternating bands and the angled cuts, never from shadows or rules.

One type family, Archivo, does all the work by changing width: condensed (62 to 70%) and heavy for headings, project data and the big numbers; normal width for reading text. Corners are square throughout. Density is calm on the band level (generous vertical padding) and compact inside components (tight chips, square buttons, stacked data).

Motion is gentle: the hero rises, the hero photo settles, section parts rise on scroll where scroll timelines exist. The one authored moment is the wall cross-section assembling from outside to inside. Controls answer with color: the quote preview box flashes leaf tone on each confirmed choice, the copy button turns light leaf when the number is copied, the phone menu opens with a quick top-down clip reveal. Videos and photos stay fixed in the layout; nothing is pinned or scroll-linked.

**Key Characteristics:**
- Green and white only: white ground, pale-leaf alternate bands, forest-green panels.
- Leaf green marks every action; light leaf takes that role on forest panels.
- One family, two widths: condensed Archivo for headings and numbers, normal width for text.
- Square corners on every button, chip, field, tab and frame.
- The roof-angle cut is the signature silhouette.
- Flat: no shadows, no hairline borders.

## Colors

A two-green palette on white: a bright leaf for action, a deep forest for panels, and pale leaf tints for quiet surfaces.

### Primary
- **Leaf Green** (leaf-green): the color of action. Solid buttons, selected chips and system tabs, the nav underline, the scroll progress bar, list markers, focus outlines, the quote mark, the input caret.
- **Deep Leaf** (leaf-green-deep): hover state of every leaf-green fill.

### Secondary
- **Forest Panel** (forest-panel): full panels with white text (hero text block, experience numbers, contact, some project rows), video wells and the photo lightbox ground.
- **Light Leaf** (light-leaf): the action and accent color on forest panels: solid buttons, list markers, the "+" in the big numbers, link underlines, focus outlines, text selection, play-button hover.

### Neutral
- **White** (white): page ground, header bar, footer, and text on green or forest.
- **Pale Leaf** (pale-leaf): alternate bands, the shrunken header, chips, fields, the quote preview box, the mobile menu.
- **Leaf Tone** (leaf-tone): one step above pale leaf for hover fills, inactive carousel dots and image placeholders.
- **Ink** (ink): all primary text; also the line-button hover fill.
- **Moss Muted** (moss-muted): secondary text, captions, data labels, nav links at rest.
- **Panel Muted** (panel-muted): secondary text on forest panels.

### Named Rules
**The Action Is Leaf Rule.** Anything tappable that commits an action is filled leaf green on light ground and light leaf on forest ground. No other hue carries action.

**The Two Greens Rule.** The palette is the logo's green and white. Do not add a third brand hue; new surfaces use the existing tints (pale leaf, leaf tone) or the forest panel.

**The Material Exception Rule.** The wall cross-section draws wood, PET wool and drywall in their own material tones (warm wood browns, off-white wool, pale grey board). These describe physical materials inside the schematic only and never leave it as UI color.

## Typography

**Display Font:** Archivo, condensed (with Arial Narrow, Arial)
**Body Font:** Archivo, normal width (with Arial Narrow, Arial)

**Character:** A single variable grotesque stretched to two voices: a narrow, heavy, tight-leaded heading voice that fits big statements and numbers into a phone column, and a plain, open reading voice for the text. The self-hosted file covers weights 100 to 900 and widths 62 to 125%.

### Hierarchy
- **Numeral** (900, very large clamp, 62% width, line-height 0.82, tabular): the experience figures ("150+", "20+"); the "+" is light leaf.
- **Display** (800, hero clamp, 64% width, 0.95): the hero tagline only.
- **Headline** (800, section clamp, 70% width, 0.95): section titles (h2), balanced wrapping.
- **Title** (800, 70% width): project names (h3), project data values (area, deadline), system tabs, the WhatsApp number, the quick-contact heading.
- **Lead** (500, 1.3): the supporting line under a heading, capped near 30 to 34ch.
- **Body** (400, 1.6, normal width): paragraphs capped at 62ch.
- **Label** (600 or 500, 15px): buttons, chips, captions, data terms, nav links, notes.

### Named Rules
**The One Family Rule.** Archivo is the only typeface. Hierarchy comes from width, weight and size, never from a second family.

**The Width Is Voice Rule.** Condensed width (62 to 70%) belongs to headings, numbers and data values; reading text stays at 100% width.

**The Value Above Name Rule.** In project data, the value is set large in the title voice and its term sits below it in the small muted label.

## Layout

A 12-column grid (24px column gap, fluid row gap) inside a 1248px container with 24px minimum side padding that respects safe-area insets. Sections are full-width bands with fluid vertical padding (band spacing) alternating white, pale leaf and forest panel. Headings usually take the first five columns and copy the next seven; projects pair copy (left) with a portrait video (right) on every single-video row, so the eye reads them as one list; the pousada row with three videos is the only break. Groups of figures (reels, project photo pairs, quotes) step downward with increasing top margins, echoing a roof pitch.

Breakpoints: at 1000px the nav collapses to a menu button with a pale-leaf drop-down and a full-width green WhatsApp action; at 860px the grid stacks to one column, the hero photo moves above the text with a bottom roof cut, and video reels and photo pairs become horizontal scroll-snap rows; at 640px quotes stack; at 480px the header shrinks to 64px. The header is sticky at a constant 68px; after scroll it turns pale leaf and the logo scales to 80% by transform, so nothing below it reflows.

## Elevation & Depth

The system is flat. There are no shadows anywhere. Depth is conveyed by tonal bands (white, pale leaf, forest), by the roof-angle cuts that let one band overlap the one before, and by stepped figure offsets. On forest panels, small surfaces use translucent white fills (10 to 22%) rather than a raised layer. The one material is the sticky bar: white at 78% (pale leaf at 80% once scrolled) with a 20px backdrop blur, so photos pass under it softened; it turns solid where blur is unsupported or the visitor asks for reduced transparency or more contrast.

### Named Rules
**The No Shadow Rule.** Nothing casts a shadow. A surface stands out by tone, never by lift.

**The No Hairline Rule.** Surfaces are separated by tone, not by 1px rules. The only strokes are the 2px outline of the line button, the 2px field border that appears on hover and focus, and the 2px nav underline.

## Shapes

Every corner is square (0 radius): buttons, chips, fields, tabs, play buttons, lightbox controls and photo frames. The recurring silhouette is the roof-angle cut: a clip-path slope of fluid height (roof-cut spacing) on the top edge of panel bands that overlap the band above (experience numbers, contact), a diagonal left edge on the hero photo at desktop, and a sloped bottom edge on the hero photo on phones. List markers are 10px filled squares. Arrows and the play triangle are drawn in CSS, not set as glyphs.

## Components

### Buttons
Square, confident and few: one fill, one outline.
- **Shape:** square corners (0), minimum height 52px, 2px border slot.
- **Solid:** leaf green with white label; deep leaf on hover. On forest panels it becomes light leaf with ink label, and turns white with forest label on hover.
- **Line:** transparent with a 2px current-color border; fills ink with white label on hover (white with forest label on panels).
- **Hover / Focus:** lifts 2px on hover-capable devices, presses to 98% on active; focus is a 3px leaf-green outline at 3px offset (light leaf on panels).
- **Bar button:** a compact solid (46px high, label size) in the header for WhatsApp.

### Chips
- **Style:** square label blocks on pale leaf (white inside the systems band), 600-weight label, 12px by 16px padding, 8px apart. Hero fact chips on the forest panel use a 10% white fill.
- **State:** choice chips are visually hidden radios; selected fills leaf green with white text; hover lifts 2px; keyboard focus draws the 3px green outline on the chip.

### Cards / Containers
- **Corner Style:** square.
- **Background:** pale leaf for the quote preview box; leaf tone or forest as image and video placeholders.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** none.
- **Internal Padding:** 22px to 24px.

### Inputs / Fields
- **Style:** pale-leaf fill with a 2px border of the same color, square, 50px high, body-size text, label in bold label size above.
- **Focus:** border turns leaf green and the fill turns white; hover shows the border in leaf tone. The caret is leaf green.

### Navigation
- **Style:** white sticky bar with the logo at left and five label-size links in moss muted at right, plus the bar button. Hover and current link turn ink and grow a 2px leaf-green underline from the left. A 3px leaf-green progress bar tracks scroll at the very top, driven by a CSS scroll timeline (absent where the browser lacks it); the bar tints and the logo shrinks when an invisible 40px top marker leaves the viewport (IntersectionObserver, no scroll listener).
- **Mobile:** a pale-leaf "menu" button with a two-line icon that crosses to an X; the drop-down is a pale-leaf sheet with full-size links and a full-width solid WhatsApp action. The sheet unrolls from the bar in 220ms and, when closed by pointer, rolls back up the same path in 160ms on the mirrored curve; keyboard closes instantly.

### Photo Lightbox
Forest full-screen dialog. The photo follows the finger or mouse 1:1 after 10px of travel and locks to the first axis. On release, the gesture velocity is projected forward (Apple's decay, rate 0.998): past 35% of the width it changes photo, sliding out while the next slides in on a critically damped spring (response 0.3s, no bounce) that starts from the release velocity; downward past 25% of the height it closes, shrinking and fading as it goes; anywhere else it springs home. Upward drag rubber-bands. The photo can be grabbed again mid-flight and continues from where it is. Arrows and keys stay; reduced motion keeps the 1:1 drag and swaps the springs for an instant change.

### System Tabs
Large condensed title-voice tabs stacked in a sticky column (a wrapping row on phones). At rest moss muted on transparent; hover ink on leaf tone; selected white on leaf green.

### Wall Cross-Section (signature)
A choice-chip row picks a wall type and redraws a labelled SVG schematic of its layers on white, from "outside" to "inside", each layer named below it. Changing the wall type assembles it from outside to inside: a layer that exists in both types (the outer pine) slides to its new place in 260ms, and each new layer slides in from the outside edge in 300ms, 70ms apart, on the shared ease-out curve cubic-bezier(.23, 1, .32, 1). Changes made from the keyboard redraw without motion. It is captioned as a schematic.

### Quote Builder
Choice chips and three fields compose a WhatsApp message shown live in a pale-leaf preview box, with a solid button that opens WhatsApp. It sends nothing itself.

### Video Tile
Portrait 9:16 video on a forest well with a 76px white square play button carrying a CSS triangle over the whole frame; the button scales up and turns light leaf on mouse hover, presses to 94% on tap, and fades out while playing. The play button is the tile's only keyboard stop: native controls appear once the video plays and leave when it ends. The poster is a WebP still, applied about 800px before the tile reaches the screen, so posters never load with the first view.

## Do's and Don'ts

### Do:
- **Do** fill every action leaf green on light ground and light leaf on forest panels.
- **Do** set headings, project values and big numbers in condensed Archivo (62 to 70% width, 800 to 900) and reading text at normal width.
- **Do** keep every corner square (0 radius).
- **Do** separate sections by alternating white, pale leaf and forest bands, and use the roof-angle cut where a panel band overlaps the band above.
- **Do** cap reading text at 62ch and lead lines near 30 to 34ch.
- **Do** keep motion to entrance rises, the hero photo settle, the wall assembly and color feedback on controls; under reduced motion remove travel but keep color and opacity changes that show state.

### Don't:
- **Don't** add shadows to any surface, button or image.
- **Don't** separate content with 1px hairline borders or divider rules.
- **Don't** introduce a second typeface or a third brand hue.
- **Don't** round corners on buttons, chips, fields or frames.
- **Don't** pin, scroll-link or animate project videos and photos beyond the entrance rise.
- **Don't** use the wall schematic's wood and board tones outside the cross-section.
