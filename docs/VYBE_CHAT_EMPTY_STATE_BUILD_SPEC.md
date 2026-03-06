# VYBE Chat Empty State – Build Specification

> **Source**: Analysis of Cursor's empty chat state (outerHTML + computed styles)
> **Target**: VYBE-Desktop `VybeChatViewPane.renderBody()` – Phase 4
> **Status**: Specification (pre-implementation)

---

## 1. Structural Overview

The empty chat state is a full-height flex column with three logical zones
stacked vertically. Content is centered horizontally with a max-width constraint.

```
┌─────────────────────────────────────────────┐
│  Find Widget (hidden, absolute, top-right)  │  ← already have vybeChatFindWidget
├─────────────────────────────────────────────┤
│                                             │
│  ┌───────────────────────────────────┐      │
│  │         Input Box (composer)       │      │  ← Zone 1: Composer
│  │  ┌───────────────────────────────┐ │      │
│  │  │ contenteditable text area     │ │      │
│  │  │ placeholder: "Ask anything…"  │ │      │
│  │  ├───────────────────────────────┤ │      │
│  │  │ [Mode ▼]  [Model ▼]  [⊕] [▶] │ │      │  ← Bottom bar
│  │  └───────────────────────────────┘ │      │
│  └───────────────────────────────────┘      │
│  [🖥 Local ▼]                                │  ← Zone 2: Env selector (below input)
│                                             │
│  [Context pills area – empty by default]    │
│                                             │
│                                             │
│                    (flex-grow: 1)            │
│                                             │
│  ───────────────────────────────────────    │
│  Past Chats ▼                    View All   │  ← Zone 3: Recent history
│  ┌─ Researching .cursor folder ──── Now ──┐ │
│  ├─ New Chat ────────────────────── 21h ──┤ │
│  └─ New Chat ────────────────────── 21h ──┘ │
└─────────────────────────────────────────────┘
```

---

## 2. Component Breakdown

### 2.1 Root Container (`.vybe-chat-composer`)

The outermost chat pane body. Replaces the current empty `.vybe-chat-body`.

| Property | Cursor Value | VYBE Token/Variable |
|----------|-------------|---------------------|
| display | `flex` | — |
| flex-direction | `column` | — |
| background | `var(--vscode-editor-background)` | `CHAT_COLOR_BACKGROUND` |
| width/height | `100%` | — |
| overflow | `hidden` | — |
| position | `relative` | — |
| box-sizing | `border-box` | — |
| outline | `none` | — |
| font-family | `-apple-system, "system-ui", sans-serif` | Inherited from workbench |
| font-size | `13px` | `CHAT_INPUT_FONT_SIZE_PX` |

### 2.2 Zone 1: Composer Input Area

Centered container with max-width constraint.

**Outer wrapper:**

| Property | Value | Notes |
|----------|-------|-------|
| display | `flex` | — |
| flex-direction | `column` | — |
| align-items | `stretch` | — |
| justify-content | `center` | — |
| position | `relative` | — |
| margin | `1px auto 0` | Horizontally centered |
| max-width | `840px` | **New token: `CHAT_COMPOSER_MAX_WIDTH_PX`** |
| width | `100%` | — |
| padding | `0 10px` | **New token: `CHAT_COMPOSER_OUTER_PADDING_H_PX`** |
| box-sizing | `border-box` | — |

**Input box (`.vybe-chat-input-box`):**

| Property | Cursor Value | VYBE Equivalent |
|----------|-------------|-----------------|
| background | `color-mix(in srgb, var(--vscode-input-background) 90%, transparent)` | Same — semi-transparent input bg |
| border | `1px solid var(--cursor-stroke-primary)` | `1px solid var(--vscode-input-border, transparent)` |
| border-radius | `6px` | `CHAT_COMPOSER_BORDER_RADIUS_PX` (already 8px, align to 6px) |
| position | `relative` | — |
| z-index | `1` | — |
| transition | `box-shadow 100ms ease-in-out, border-color 100ms ease-in-out` | Focus transitions |
| contain | `unset` | — |

**Text editor area:**

| Property | Value | Notes |
|----------|-------|-------|
| min-height | `100px` | **New token: `CHAT_COMPOSER_TEXT_MIN_HEIGHT_PX`** |
| max-height | `340px` | **New token: `CHAT_COMPOSER_TEXT_MAX_HEIGHT_PX`** |
| contenteditable | `true` | — |
| font-size | `13px` | `CHAT_INPUT_FONT_SIZE_PX` |
| line-height | `1.5` (~19.5px) | **New token: `CHAT_INPUT_LINE_HEIGHT_RATIO`** |
| color | `var(--vscode-input-foreground)` | `CHAT_COLOR_INPUT_FG` |
| background | `transparent` | — |
| spellcheck | `false` | — |
| resize | `none` | — |
| overflow-wrap | `break-word` | — |
| word-break | `break-word` | — |
| white-space | `pre-wrap` | — |
| padding | `0` | — |

**Placeholder overlay:**

| Property | Value | Notes |
|----------|-------|-------|
| text | `"Ask anything or start a conversation"` | VYBE-specific wording |
| color | `var(--vscode-input-placeholderForeground)` | `CHAT_COLOR_INPUT_PLACEHOLDER` |
| opacity | `0.5` | — |
| font-size | `13px` | Same as editor |
| line-height | `1.5` | Same as editor |
| pointer-events | `none` | — |
| user-select | `none` | — |

**Bottom bar (`.vybe-chat-input-bottom`):**

| Property | Value | Notes |
|----------|-------|-------|
| margin-top | `calc(1px + 0.5rem)` ≈ 9px | **New token: `CHAT_BOTTOM_BAR_MARGIN_TOP_PX`** |
| height | `28px` | **New token: `CHAT_BOTTOM_BAR_HEIGHT_PX`** |
| display | `grid` | `grid-template-columns: 4fr 1fr` |
| align-items | `center` | — |

**Bottom bar – Left side (mode + model dropdowns):**

| Element | Icon | Label | Behavior |
|---------|------|-------|----------|
| Mode selector | `codicon-pulse` (alternative for infinity) | "Agent" | Pill with chevron, 12px font, rounded-full, opacity 0.5 on icon |
| Model selector | — | "Auto" | Text with chevron, 12px font, rounded-8px |

> **Note**: Cursor uses `codicon-infinity` (custom) for Agent mode.
> VYBE alternative: `codicon-pulse` or `codicon-zap` or `codicon-rocket`.
> User to confirm preferred codicon.

**Bottom bar – Right side (action buttons):**

| Element | Cursor Icon | VYBE Alternative | Size |
|---------|-------------|------------------|------|
| Image/file upload | `codicon-image-two` (custom) | `codicon-file-media` | 20×20px |
| Mic / Send | `codicon-mic` / `codicon-send` | `codicon-mic` / `codicon-send` | 20×20px, circular bg when mic |

### 2.3 Zone 2: Environment Selector (below input)

| Property | Value | Notes |
|----------|-------|-------|
| display | `flex` | Space-between layout |
| min-height | `32px` | — |
| padding-left | `8px` | — |
| font-size | `12px` | `CHAT_LABEL_FONT_SIZE_PX` |
| line-height | `16px` | `CHAT_LABEL_LINE_HEIGHT_PX` |

**Elements:**
- Laptop icon (`codicon-device-desktop` – VYBE alternative for `codicon-laptop`)
- Label: "Local"
- Chevron-down icon
- Container at opacity 0.5

> **Decision needed**: Does VYBE have remote execution targets?
> If not, this section may be omitted or simplified.

### 2.4 Zone 3: Past Chats (bottom section)

This section pushes to the bottom of the pane using `flex: 1` + `margin-top: auto`.

**Outer container:**

| Property | Value | Notes |
|----------|-------|-------|
| display | `flex` | — |
| flex-direction | `column` | — |
| justify-content | `flex-end` | — |
| flex | `1 1 0%` | Takes remaining space |
| margin | `10px auto 0.4rem` | **New tokens** |
| max-width | `840px` | Matches composer max-width |
| width | `100%` | — |

**Section header ("Past Chats"):**

| Property | Value | Notes |
|----------|-------|-------|
| display | `flex` | Space-between |
| font-size | `12px` (`0.75rem`) | `CHAT_LABEL_FONT_SIZE_PX` |
| line-height | `1.2` (14.4px) | — |
| opacity | `0.8` | — |
| padding | `3.2px 6.4px` | — |
| margin-bottom | `2.4px` | — |
| "Past Chats" color | `var(--vscode-descriptionForeground)` | Maps from `--cursor-text-tertiary` |
| "View All" color | `var(--vscode-descriptionForeground)` | Same |

**History item row (`.vybe-chat-history-item`):**

| Property | Value | Notes |
|----------|-------|-------|
| display | `flex` | — |
| align-items | `center` | — |
| justify-content | `space-between` | — |
| padding | `3.2px 6.4px` | — |
| border-radius | `4px` | `VybeDropdownTokens.rowBorderRadius` |
| cursor | `pointer` | — |
| min-width | `0` | For text truncation |
| line-height | `1.2` (15.6px) | — |
| gap between items | `2.4px` (`0.15rem`) | — |

**Item title:**

| Property | Value | Notes |
|----------|-------|-------|
| flex | `1 1 auto` | Grows and shrinks |
| min-width | `0` | Required for truncation |
| font-size | `12px` | — |
| white-space | `nowrap` | — |
| overflow | `hidden` | — |
| text-overflow | `ellipsis` | — |
| color | `var(--vscode-foreground)` | Maps from `--cursor-text-secondary` (≈55% opacity) |
| opacity | `0.55` | To match Cursor's rgba(20,20,20,0.55) |

**Item timestamp:**

| Property | Value | Notes |
|----------|-------|-------|
| flex-shrink | `0` | Never truncates |
| font-size | `12px` | — |
| color | `var(--vscode-descriptionForeground)` | Maps from `--cursor-text-tertiary` (≈37% opacity) |
| margin-left | `9.6px` (`0.6rem`) | — |

---

## 3. Cursor → VYBE Color Mapping

| Cursor Variable | Computed (Light) | VYBE Equivalent |
|----------------|------------------|-----------------|
| `--cursor-text-primary` | `rgba(20,20,20, 0.92)` | `var(--vscode-foreground)` |
| `--cursor-text-secondary` | `rgba(20,20,20, 0.55)` | `var(--vscode-foreground)` at ~55% opacity |
| `--cursor-text-tertiary` | `rgba(20,20,20, 0.37)` | `var(--vscode-descriptionForeground)` |
| `--cursor-stroke-primary` | `rgba(20,20,20, ~0.15)` | `var(--vscode-input-border, transparent)` |
| `--cursor-stroke-secondary` | lighter | `var(--vscode-panel-border)` |
| `--composer-pane-background` | `var(--vscode-editor-background)` | Same |
| `--vscode-input-background` | `rgb(252,252,252)` | Same (already in tokens) |
| `--vscode-input-foreground` | `rgba(20,20,20, 0.92)` | Same |
| `--vscode-input-placeholderForeground` | inherited | Same (already in tokens) |

---

## 4. Custom Codicon Replacements

| Cursor Custom Codicon | VYBE Standard Alternative | Used In |
|----------------------|--------------------------|---------|
| `codicon-add-two` | `codicon-add` | Title bar New Chat (already done) |
| `codicon-history-two` | `codicon-history` | Title bar History (already done) |
| `codicon-ellipsis-two` | `codicon-ellipsis` | Title bar Settings (already done) |
| `codicon-infinity` | **TBD** – `codicon-pulse` / `codicon-zap` / `codicon-rocket` | Agent mode pill |
| `codicon-image-two` | `codicon-file-media` | Image upload button |
| `codicon-laptop` | `codicon-device-desktop` | Environment selector |

> **Action required**: User to confirm preferred codicon for the Agent mode icon.

---

## 5. New Design Tokens Required

Add to `vybeChatDesignTokens.ts`:

```
// ─── Composer Layout ────────────────────────────────────────────
CHAT_COMPOSER_MAX_WIDTH_PX = 840
CHAT_COMPOSER_OUTER_PADDING_H_PX = 10
CHAT_COMPOSER_TEXT_MIN_HEIGHT_PX = 100
CHAT_COMPOSER_TEXT_MAX_HEIGHT_PX = 340
CHAT_COMPOSER_INPUT_LINE_HEIGHT = 1.5
CHAT_COMPOSER_INPUT_BG_OPACITY = 0.9     (for color-mix transparency)

// ─── Bottom Bar ─────────────────────────────────────────────────
CHAT_BOTTOM_BAR_HEIGHT_PX = 28
CHAT_BOTTOM_BAR_MARGIN_TOP_PX = 9
CHAT_MODE_PILL_FONT_SIZE_PX = 12
CHAT_MODE_PILL_BORDER_RADIUS_PX = 24     (rounded-full)
CHAT_MODEL_PILL_BORDER_RADIUS_PX = 8
CHAT_ACTION_BUTTON_SIZE_PX = 20

// ─── Past Chats (inline history) ────────────────────────────────
CHAT_HISTORY_SECTION_PADDING_PX = 12.8   (0.8rem)
CHAT_HISTORY_HEADER_FONT_SIZE_PX = 12
CHAT_HISTORY_HEADER_OPACITY = 0.8
CHAT_HISTORY_ITEM_PADDING_V_PX = 3.2
CHAT_HISTORY_ITEM_PADDING_H_PX = 6.4
CHAT_HISTORY_ITEM_BORDER_RADIUS_PX = 4
CHAT_HISTORY_ITEM_GAP_PX = 2.4
CHAT_HISTORY_ITEM_FONT_SIZE_PX = 12
CHAT_HISTORY_TIMESTAMP_MARGIN_LEFT_PX = 9.6

// ─── Colors (new entries) ───────────────────────────────────────
CHAT_COLOR_TEXT_SECONDARY = 'var(--vscode-foreground)'         (+ opacity ~0.55)
CHAT_COLOR_TEXT_TERTIARY = 'var(--vscode-descriptionForeground)'
CHAT_COLOR_STROKE_PRIMARY = 'var(--vscode-input-border, transparent)'
```

---

## 6. Implementation Phases

### Phase 4A – Composer Shell (static layout)

**Goal**: Render the empty state with the input box, placeholder, and bottom bar.
No functional input yet — purely visual scaffolding.

**Files to create/modify:**
- `vybeChatViewPane.ts` – expand `renderBody()` to build the DOM
- `vybeChatDesignTokens.ts` – add new tokens from Section 5
- `media/vybeChat.css` – structural CSS for composer, input box, bottom bar

**DOM structure to create:**
```
.vybe-chat-body
├── .vybe-chat-composer-wrapper (centered, max-width 840px)
│   └── .vybe-chat-input-box (border, bg, border-radius)
│       ├── .vybe-chat-text-area-wrapper (min/max height)
│       │   ├── .vybe-chat-text-area (contenteditable)
│       │   └── .vybe-chat-placeholder ("Ask anything…")
│       └── .vybe-chat-input-bottom (grid: mode/model + actions)
│           ├── .vybe-chat-input-left
│           │   ├── .vybe-chat-mode-pill (Agent + chevron)
│           │   └── .vybe-chat-model-pill (Auto + chevron)
│           └── .vybe-chat-input-right
│               ├── .vybe-chat-upload-btn (file-media icon)
│               └── .vybe-chat-send-btn (send/mic icon)
├── .vybe-chat-env-selector (Local + chevron, below input)
└── .vybe-chat-past-section (flex-grow, push to bottom)
    ├── .vybe-chat-past-header ("Past Chats" + "View All")
    └── .vybe-chat-past-list
        └── .vybe-chat-past-item × N (title + timestamp)
```

**Acceptance criteria:**
- [ ] Visually matches the reference layout at various widths (400px–800px)
- [ ] Uses only `var(--vscode-*)` color tokens (no hardcoded colors)
- [ ] All spacing/sizing from design tokens
- [ ] Placeholder visible when text area is empty
- [ ] Past Chats section pulls data from `IVybeChatConversationIndexService`
- [ ] Past Chat items are clickable → navigate to session
- [ ] "View All" triggers history dropdown (`vybeChat.showHistory`)
- [ ] Responsive: input box and past chats honor max-width 840px, stretch on narrow panels

### Phase 4B – Functional Text Input

**Goal**: Make the contenteditable text area functional.

- Lexical or Monaco-based text editing (decision needed)
- Keyboard shortcuts: Enter to send, Shift+Enter for newline
- Auto-resize text area between min (100px) and max (340px)
- Character/line tracking
- Focus management (focus on pane activation)

### Phase 4C – Mode & Model Dropdowns

**Goal**: Wire the mode pill and model pill to functional dropdowns.

- Mode dropdown: Agent / Ask / Plan (reuse `showVybeDropdownPanel`)
- Model dropdown: Model selection from agent config
- Persist last selection

### Phase 4D – Action Buttons

**Goal**: Wire the bottom-bar action buttons.

- Image/file upload → file picker dialog
- Send button → submit message to agent
- Mic button (if applicable) → voice input
- Submit button state: disabled when empty, enabled when text present
- Send button transforms: mic → send when text is entered

### Phase 4E – Context Pills & @ Mentions

**Goal**: Add context attachment system.

- @ mention autocomplete for files, folders, symbols
- Context pills display below the input box
- / commands for modes/actions

---

## 7. Focus & Hover Interactions

### Input Box Focus
- On focus: `box-shadow` transition (100ms ease-in-out)
- Cursor uses stroke color change on focus — VYBE can use `var(--vscode-focusBorder)`

### Past Chat Item Hover
- Background: `var(--vscode-list-hoverBackground)` (from theme)
- Transition: subtle, ~100ms

### Action Button Hover
- Opacity change: 0.5 → 1.0
- Cursor: pointer

### Send/Mic Button
- Mic state: circular bg at ~50% foreground opacity, white icon
- Send state: same circular bg, send icon
- Transition between states when text is entered/cleared

---

## 8. Responsiveness

| Panel Width | Behavior |
|-------------|----------|
| < 400px | Composer fills width, mode/model labels may truncate |
| 400–840px | Composer fills width with 10px padding |
| > 840px | Composer centered at 840px max-width |

The past chats section follows the same max-width constraint.

---

## 9. Accessibility

- Text area: `role="textbox"`, proper `aria-label`
- Mode/model selectors: `role="button"`, `aria-haspopup="listbox"`
- Past chat items: `tabindex="0"`, keyboard-navigable
- Send button: `aria-label="Send message"` / `aria-label="Voice input"`
- Placeholder: positioned as overlay, not `aria-label` (screen readers read the textbox label)

---

## 10. What We Already Have vs What's Missing

| Component | Status | Notes |
|-----------|--------|-------|
| Find widget | ✅ Exists | `vybeChatFindWidget.ts` |
| Chat body container | ✅ Exists | Empty `.vybe-chat-body` div |
| Design tokens file | ✅ Exists | `vybeChatDesignTokens.ts` (needs expansion) |
| Title bar actions (New, History, Settings) | ✅ Done | Phase 2 complete |
| History dropdown | ✅ Done | Phase 3 complete |
| Conversation index service | ✅ Done | Can query for past chats |
| Composer input box | ❌ Missing | Phase 4A |
| Text area (contenteditable) | ❌ Missing | Phase 4A/4B |
| Placeholder overlay | ❌ Missing | Phase 4A |
| Mode selector dropdown | ❌ Missing | Phase 4C |
| Model selector dropdown | ❌ Missing | Phase 4C |
| Image upload button | ❌ Missing | Phase 4D |
| Send/mic button | ❌ Missing | Phase 4D |
| Environment selector | ❌ Missing | Phase 4A (or defer) |
| Past chats inline list | ❌ Missing | Phase 4A |
| Context pills (@mentions) | ❌ Missing | Phase 4E |
| Chat CSS file | ⚠️ Exists | Empty / minimal, needs population |

---

## 11. Open Questions for User

1. **Agent mode icon**: What codicon to use instead of Cursor's custom `codicon-infinity`?
   Suggestions: `codicon-pulse`, `codicon-zap`, `codicon-rocket`, `codicon-sparkle`

2. **Environment selector**: Does VYBE support remote execution targets? If not, should this
   section be omitted or show "Local" as static text?

3. **Placeholder text**: Cursor uses "Plan, @ for context, / for commands".
   VYBE suggestion: "Ask anything or start a conversation" — confirm wording.

4. **Text input engine**: Use raw contenteditable, or integrate with Monaco/Lexical?
   Raw contenteditable is simpler for Phase 4A; richer editor can come later.

5. **Voice input (mic)**: Is this planned for VYBE? If not, the mic button can be omitted
   and replaced with a static send button.

6. **Past chats count**: How many items to show? Cursor shows 3. Confirm count.
