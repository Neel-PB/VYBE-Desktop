# Theme colors: VYBE Desktop vs Cursor (from Cursor package)

**Data sources (no legacy VYBE docs):**
- **Cursor:** `/Applications/Cursor.app/Contents/Resources/app/extensions/theme-cursor/`  
  Files: `themes/cursor-dark-color-theme.json`, `themes/cursor-light-color-theme.json`
- **VYBE Desktop:** This repo — `extensions/theme-2026/themes/2026-dark.json`, `2026-light.json` (and base code colors from `theme-defaults`: dark_modern / light_modern via `include`)

---

## What sets code and terminal colors

- **Code (syntax):** Theme JSON `tokenColors` and `semanticTokenColors`.  
  VYBE Desktop (2026) uses `include` of dark_modern/light_modern and only overrides `colors` → code highlighting = Dark Modern / Light Modern.  
  Cursor themes define their own full `tokenColors` and `semanticTokenColors`.

- **Terminal:** Theme `colors`: `terminal.foreground`, `terminal.background`, and the 16 `terminal.ansi*` keys.  
  VYBE Desktop 2026 sets only `terminal.background`, `terminal.selectionBackground`, and cursor → ANSI colors come from workbench defaults.  
  Cursor themes set a full `terminal.ansi*` palette.

---

## Dark theme: VYBE Desktop (2026 Dark) vs Cursor Dark

### Workbench / editor (key)

| Color key | VYBE Desktop (2026 Dark) | Cursor Dark (from Cursor.app) |
|-----------|---------------------------|--------------------------------|
| `editor.background` | `#121314` | `#181818` |
| `editor.foreground` | `#BBBEBF` | `#E4E4E4EB` |
| `editor.selectionBackground` | `#27678280` | `#40404099` |
| `editor.findMatchBackground` | `#27678290` | `#88C0D066` |
| `editorCursor.foreground` | `#BBBEBF` | `#E4E4E4EB` |
| `editorError.foreground` | (from dark_modern) | `#E34671` |
| `editorWarning.foreground` | (from dark_modern) | `#F1B467` |
| `activityBar.background` | `#191A1B` | `#141414` |
| `sideBar.background` | `#191A1B` | `#141414` |
| `statusBar.background` | `#191A1B` | `#141414` |
| `tab.activeBorderTop` | `#3994BC` | `#E4E4E400` |
| `button.background` | `#3994BCF2` | `#81A1C1` |
| `progressBar.background` | `#878889` | `#3FA266` |

### Terminal

| Color key | VYBE Desktop (2026 Dark) | Cursor Dark (from Cursor.app) |
|-----------|---------------------------|--------------------------------|
| `terminal.background` | `#191A1B` | `#141414` |
| `terminal.foreground` | *(not set → default)* | `#E4E4E4EB` |
| `terminal.selectionBackground` | `#3994BC33` | `#E4E4E41E` |
| `terminal.ansiBlack` | *(default)* | `#242424` |
| `terminal.ansiRed` | *(default)* | `#FC6B83` |
| `terminal.ansiGreen` | *(default)* | `#3FA266` |
| `terminal.ansiYellow` | *(default)* | `#D2943E` |
| `terminal.ansiBlue` | *(default)* | `#81A1C1` |
| `terminal.ansiMagenta` | *(default)* | `#B48EAD` |
| `terminal.ansiCyan` | *(default)* | `#88C0D0` |
| `terminal.ansiWhite` | *(default)* | `#E4E4E4` |
| `terminal.ansiBrightRed` | *(default)* | `#FC6B83` |
| `terminal.ansiBrightGreen` | *(default)* | `#70B489` |
| `terminal.ansiBrightYellow` | *(default)* | `#F1B467` |
| `terminal.ansiBrightBlue` | *(default)* | `#87A6C4` |
| `terminal.ansiBrightMagenta` | *(default)* | `#B48EAD` |
| `terminal.ansiBrightCyan` | *(default)* | `#88C0D0` |
| `terminal.ansiBrightWhite` | *(default)* | `#E4E4E4` |

### Code (syntax) – representative

| Concept | VYBE Desktop (2026 Dark) | Cursor Dark (from Cursor.app) |
|--------|---------------------------|--------------------------------|
| Source | dark_modern (no overrides) | Own `tokenColors` + `semanticTokenColors` |
| Functions | (dark_modern) | `#efb080` (bold), `#EBC88D` |
| Types / classes | (dark_modern) | `#87c3ff`, `#82d2ce`, `#efb080` |
| Keywords | (dark_modern) | `#82D2CE` |
| Variables | (dark_modern) | `#d6d6dd` |
| Strings | (dark_modern) | `#e394dc` |
| Comments | (dark_modern) | `#E4E4E45E` italic |

---

## Light theme: VYBE Desktop (2026 Light) vs Cursor Light

### Workbench / editor (key)

| Color key | VYBE Desktop (2026 Light) | Cursor Light (from Cursor.app) |
|-----------|---------------------------|--------------------------------|
| `editor.background` | `#FFFFFF` | `#FCFCFC` |
| `editor.foreground` | `#202020` | `#141414EB` |
| `editor.selectionBackground` | (light_modern) | `#1414141E` |
| `editorCursor.foreground` | (light_modern) | `#141414EB` |
| `activityBar.background` | (light_modern) | `#F3F3F3` |
| `sideBar.background` | (light_modern) | `#F3F3F3` |
| `statusBar.background` | (light_modern) | `#F3F3F3` |
| `button.background` | (light_modern) | `#3C7CAB` |
| `progressBar.background` | (light_modern) | `#1F8A65` |

### Terminal

| Color key | VYBE Desktop (2026 Light) | Cursor Light (from Cursor.app) |
|-----------|---------------------------|--------------------------------|
| `terminal.background` | (light_modern) | `#F3F3F3` |
| `terminal.foreground` | *(default)* | `#141414EB` |
| `terminal.selectionBackground` | `#0069CC26` | `#1414141E` |
| `terminal.ansiBlack` | *(default)* | `#141414EB` |
| `terminal.ansiRed` | *(default)* | `#CF2D56` |
| `terminal.ansiGreen` | *(default)* | `#1F8A65` |
| `terminal.ansiYellow` | *(default)* | `#A16900` |
| `terminal.ansiBlue` | *(default)* | `#3C7CAB` |
| `terminal.ansiMagenta` | *(default)* | `#B8448B` |
| `terminal.ansiCyan` | *(default)* | `#4C7F8C` |
| `terminal.ansiWhite` | *(default)* | `#FCFCFC` |
| `terminal.ansiBrightRed` | *(default)* | `#E75E78` |
| `terminal.ansiBrightGreen` | *(default)* | `#55A583` |
| `terminal.ansiBrightYellow` | *(default)* | `#C08532` |
| `terminal.ansiBrightBlue` | *(default)* | `#6299C3` |
| `terminal.ansiBrightCyan` | *(default)* | `#6F9BA6` |

### Code (syntax) – representative

| Concept | VYBE Desktop (2026 Light) | Cursor Light (from Cursor.app) |
|--------|---------------------------|--------------------------------|
| Source | light_modern (no overrides) | Own `tokenColors` + `semanticTokenColors` |
| Functions | (light_modern) | `#DB704B` |
| Types / classes | (light_modern) | `#206595` |
| Keywords | (light_modern) | `#B3003F` |
| Variables | (light_modern) | `#206595`, `#141414EB` |
| Strings | (light_modern) | `#9E94D5` |
| Comments | (light_modern) | `#141414AD` italic |

---

## Summary

- **Cursor data** in this doc is taken only from the Cursor app package at `/Applications/Cursor.app/Contents/Resources/app/extensions/theme-cursor/`.
- **VYBE Desktop** is represented by this repo’s 2026 Dark / 2026 Light themes; code colors inherit from dark_modern/light_modern; terminal ANSI is not set in theme (defaults used).
- Cursor defines full **code** (`tokenColors`, `semanticTokenColors`) and **terminal** (`terminal.ansi*`) palettes; VYBE Desktop 2026 only overrides workbench `colors` and a few terminal keys.

After you confirm this comparison, the next step is to copy Cursor Dark and Cursor Light (full theme JSON including code and terminal colors) from the Cursor package into this repo and register them.
