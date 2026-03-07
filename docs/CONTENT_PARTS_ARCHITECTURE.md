# VYBE Chat Content Parts — Architecture & Design System

> Reference documentation for building content parts in VYBE-Desktop.
> Based on analysis of old VYBE repo patterns, cleaned up for production.

---

## 1. Architecture Overview

Every AI response in VYBE Chat is composed of **content parts** — independent
UI components that each render one piece of the response (text, thinking,
code block, tool output, etc.).  Parts are orchestrated by **MessagePage**
which manages their lifecycle and ordering.

```
MessagePage
├── VybeChatMarkdownPart     (text paragraph)
├── VybeChatThinkingPart     (collapsible reasoning)
├── VybeChatMarkdownPart     (more text)
├── VybeChatToolPart         (Read src/index.ts)
├── VybeChatCodeBlockPart    (code with syntax highlighting)
├── VybeChatToolPart         (Grep "TODO")
├── VybeChatMarkdownPart     (final text)
└── VybeChatMermaidBlock     (diagram)
```

### Base class

All parts extend `VybeChatContentPart` (in `contentParts/vybeChatContentPart.ts`):

```typescript
abstract class VybeChatContentPart extends Disposable {
    readonly kind: VybeChatContentPartKind;
    get domNode(): HTMLElement;          // lazy-created via createDomNode()
    protected abstract createDomNode(): HTMLElement;
    hasSameContent(other): boolean;      // for diff optimization
    updateContent?(data): void;          // streaming updates
    onStreamingUpdate?: () => void;      // callback for parent scroll
}
```

### Content data types

Each part has a corresponding data interface (`IVybeChatMarkdownContent`,
`IVybeChatThinkingContent`, etc.) with a `kind` discriminant.  The union
`IVybeChatContentData` lets MessagePage dispatch to the right part.

---

## 2. Shared Component System

Multiple content parts share the same UI patterns.  Old VYBE extracted these
into two files that should be ported and improved:

### 2.1 Shared Components (`vybeChatToolPartComponents.ts`, 386 lines)

| Component | Function | Used by |
|-----------|----------|---------|
| **Header row** | `createToolHeader(options)` | Tool, Thinking, Phase indicator, Loading diagram, Todo item |
| **Chevron** | `createToolChevron()` | Tool, Thinking |
| **Badge** | `createToolBadge(text, small?)` | Tool (grep match count, lint count) |
| **List item** | `createToolListItem(options)` | Tool (file rows) |
| **Disabled list item** | `createToolListItemDisabled(message)` | Tool (no results) |
| **Scroll shell** | `createToolScrollableShell(content)` | Tool, Thinking |
| **Attempted expansion** | `createToolAttemptedExpansion(msg)` | Tool (errors, empty results) |
| **Web card** | `createToolWebCardWrapper(options)` | Tool (web search, fetch URL) |

#### Header row structure (the most-reused component)

```
.composer-tool-former-header
├── span.edit-header-verb          "Reading" / "Read" / "Thinking" / "Thought"
├── span.edit-header-target        "src/index.ts" (optional)
├── span.edit-header-line-range    ":1-50" (optional)
└── div.chevron-right              codicon chevron (optional)
```

The verb gets `.make-shine` class during streaming (shimmer animation).
When streaming ends, the verb text changes to past tense.

**Verb pairs** (streaming → complete):

| Tool type | Streaming | Complete |
|-----------|-----------|----------|
| read | Reading | Read |
| list, glob_search | Listing | Listed |
| search | Searching | Searched |
| grep | Grepping | Grepped |
| search_web | Searching web | Searched web |
| fetch_url | Retrieving page | Retrieved page |
| edit | Editing | Edited |
| todos | Updating to-do | Updated to-do |
| thinking | Thinking | Thought |

#### Collapsible pattern (shared DOM structure)

```
.collapsible-clean [.is-expanded]
├── [header outer]
│   └── .composer-tool-former-header (via createToolHeader)
└── .collapsible-clean-children
    └── [tool-specific content]
```

- `.is-expanded` on `.collapsible-clean` controls visibility
- Chevron rotates 0° → 90° on expand
- Children hidden via `display: none` when collapsed
- Click handler on header toggles state

### 2.2 Design Tokens (`vybeChatToolPartDesignTokens.ts`, 154 lines)

Named constants — not CSS variables.  Applied via inline styles in JS.

#### Typography

| Token | Value | Usage |
|-------|-------|-------|
| `TOOL_HEADER_FONT_SIZE_PX` | 12 | Header verb/target text |
| `TOOL_HEADER_LINE_HEIGHT_PX` | 14 | Header text line height |
| `TOOL_HEADER_ROW_LINE_HEIGHT_PX` | 18.2 | Full header row height |
| `TOOL_LIST_ITEM_TITLE_FONT_SIZE_PX` | 12 | List item title |
| `TOOL_LIST_ITEM_SUBTITLE_FONT_SIZE_PX` | 10 | List item subtitle |
| `TOOL_BADGE_FONT_SIZE_PX` | 11 | Badge text |
| `TOOL_CHEVRON_FONT_SIZE_PX` | 14 | Chevron icon |

#### Colors (CSS variable references)

| Token | Value | Usage |
|-------|-------|-------|
| `TOOL_COLOR_FOREGROUND` | `var(--vscode-foreground)` | Primary text |
| `TOOL_COLOR_DESCRIPTION` | `var(--vscode-descriptionForeground)` | Secondary text |
| `TOOL_COLOR_LINK` | `var(--vscode-textLink-foreground)` | Clickable targets |
| `TOOL_COLOR_EDITOR_FG` | `var(--vscode-editor-foreground)` | Editor text |
| `TOOL_COLOR_EDITOR_BG` | `var(--vscode-editor-background)` | Editor background |
| `TOOL_COLOR_BADGE_BG` | `var(--vscode-badge-background)` | Badge background |
| `TOOL_COLOR_BADGE_FG` | `var(--vscode-badge-foreground)` | Badge text |
| `TOOL_COLOR_ERROR_FG` | `var(--vscode-errorForeground)` | Error text |
| `TOOL_COLOR_TARGET_HOVER` | `var(--vscode-textLink-activeForeground)` | Target hover |
| `TOOL_COLOR_LIST_ITEM_HOVER_BG` | `var(--vscode-list-hoverBackground)` | List item hover |

#### Opacities

| Token | Value | Usage |
|-------|-------|-------|
| `TOOL_VERB_OPACITY` | 0.7 | Header verb |
| `TOOL_TARGET_OPACITY` | 0.36 | Header target |
| `TOOL_LINE_RANGE_OPACITY` | 0.4 | Line range text |
| `TOOL_CHEVRON_OPACITY_VISIBLE` | 0.36 | Chevron when visible |
| `TOOL_ATTEMPTED_MESSAGE_OPACITY` | 0.7 | Error/no-result message |

#### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `TOOL_HEADER_PADDING_V_PX` | 2 | Header vertical padding |
| `TOOL_HEADER_GAP_PX` | 4 | Gap between header elements |
| `TOOL_COLLAPSIBLE_GAP_PX` | 2 | Gap in collapsible container |
| `TOOL_EXPANDED_MAX_HEIGHT_PX` | 126 | Max height for expanded content |
| `TOOL_THINKING_EXPANDED_MAX_HEIGHT_PX` | 126 | Max height for thinking content |
| `TOOL_CHILDREN_PADDING_LEFT_PX` | 6 | Children left indent |

#### Animation

| Token | Value | Usage |
|-------|-------|-------|
| `TOOL_VERB_SHINE_ANIMATION_DURATION_MS` | 2000 | Shimmer sweep duration |
| `TOOL_VERB_SHINE_CSS_VAR_BRIGHT` | `var(--vybe-shine-bright)` | Shimmer bright color |

---

## 3. Content Parts Reference

### 3.1 Markdown Part (BUILT — Phase 1)

**File:** `contentParts/vybeChatMarkdownPart.ts` (188 lines)
**CSS:** `markdown/media/vybeChatMarkdown.css` (310 lines)

Renders AI text responses using `IVybeChatMarkdownRendererService`.
Supports streaming with debounced incremental section diffing.

**DOM:**
```
div.vybe-chat-markdown-response
└── span.vybe-markdown-container-root
    ├── section.markdown-section (paragraph)
    ├── section.markdown-section (heading)
    ├── section.markdown-section (list)
    ├── section.markdown-section (code — via codeBlockSlot)
    └── section.markdown-section (table)
```

**Inline elements:** bold (`.markdown-bold-text`), italic (`.markdown-italics-text`),
inline code (`.markdown-inline-code`), links (`.markdown-link[data-link]`),
hex color swatches (`.markdown-color-token`), file path links.

**Streaming:** `updateContent()` → debounce → `renderIncremental()` → `diffSections()`.

---

### 3.2 Thinking Part (TO BUILD)

**Old VYBE:** `vybeChatThinkingPart.ts` (1,082 lines)
**Old CSS:** `media/vybeChatThinking.css` (288 lines)

Collapsible block showing AI reasoning.  Uses shared header, expand/collapse,
and shimmer.  Content is markdown rendered inside a scrollable area.

**DOM:**
```
.vybe-chat-thinking-part
└── .collapsible-clean.collapsible-thought [.is-expanded]
    ├── .composer-tool-former-header (createToolHeader)
    │   ├── .edit-header-verb         "Thinking" → "Thought"
    │   ├── .edit-header-target       "for 3s"
    │   └── .chevron-right
    └── .collapsible-clean-children
        └── .think-content-scrollable  (max-height: 126px, overflow scroll)
            └── .vybe-markdown-container-root
                └── [markdown sections]
```

**Key behaviors:**
- Verb shimmer (`.make-shine`) during streaming
- Auto-scroll to bottom during streaming
- Collapse on streaming complete
- Content limited to paragraphs, inline code, code blocks (no headings/lists/tables)
- Duration badge ("for 3s") shown after streaming

**Improvements needed for VYBE-Desktop:**
- Remove code block extraction (1,082 → ~300 lines)
- Use new `IVybeChatMarkdownRendererService` instead of direct code block management
- Use `fillInIncompleteTokens` via the renderer
- Remove `postProcessRenderedHTML` (convert `<p>` to `<span>`) — handle in CSS instead

---

### 3.3 Code Block Part (TO BUILD)

**Old VYBE:** `vybeChatCodeBlockPart.ts` (393 lines)
**Old CSS:** `media/vybeChatCodeBlock.css` (318 lines)

Monaco editor inside a styled container with optional file reference header
and copy button overlay.

**DOM:**
```
.markdown-code-outer-container.markdown-block-code
└── .composer-code-block-container
    ├── .composer-code-block-header          (only for file references)
    │   └── .composer-code-block-file-info
    │       ├── .show-file-icons             (Monaco icon label)
    │       ├── .composer-code-block-filename
    │       └── .composer-code-block-line-range
    └── .composer-code-block-content
        ├── .scrollable-div-container        (Monaco host)
        └── .composer-codeblock-copy-overlay
            └── .vybe-icon-button            (codicon-copy)
```

**Key behaviors:**
- Syntax highlighting via Monaco `CodeEditorWidget`
- Read-only, horizontal scroll, vertical scroll disabled
- Copy button appears on hover
- File reference header: clickable, opens file in editor
- Line-by-line streaming animation (70ms per line)

---

### 3.4 Tool Part (TO BUILD)

**Old VYBE:** `vybeChatToolPart.ts` (2,775 lines)
**Old CSS:** `media/vybeChatToolPart.css` (75 lines)

Unified UI for all tool types.  Every tool follows the same pattern:
header row (verb + target + chevron) → optional expandable children.

**DOM:**
```
.vybe-chat-tool-part
└── .composer-tool-former-message
    └── .collapsible-clean [.is-expanded]
        ├── .composer-tool-former-header (createToolHeader)
        │   ├── .edit-header-verb
        │   ├── .edit-header-target
        │   └── .chevron-right
        └── .collapsible-clean-children
            └── [tool-specific children]
```

**Tool-specific children:**

| Tool | Children |
|------|----------|
| `read` | None (target click opens file) |
| `list`, `glob_search` | File list (`context-list-item` rows) |
| `search` | Search results (`context-list-item` with file + line range) |
| `grep` | Grep results (`context-list-item` + badge with match count) |
| `search_web` | Web card (`createToolWebCardWrapper`) |
| `fetch_url` | Web card or attempted expansion |
| `todos`, `check_todos` | Todo list rows |
| `read_lints` | Lint results with severity icons |
| `edit`, `diagram` | Error expansion only when failed |

**Improvements needed for VYBE-Desktop:**
- The 2,775-line monolith should be split: shared components stay in
  `vybeChatToolPartComponents.ts`, tool-specific renderers become separate
  functions or small classes per tool type.

---

### 3.5 Mermaid Block (TO BUILD)

**Old VYBE:** `vybeChatMermaidBlock.ts` (811 lines)
**Old CSS:** `media/vybeChatMermaidBlock.css` (199 lines)

Renders Mermaid diagrams with pan/zoom, toolbar, and full-screen expand.

**DOM:**
```
.vybe-mermaid-block-root
└── .markdown-block-mermaid-outer
    └── .markdown-block-mermaid.mermaid-diagram-done
        └── .mermaid-diagram-container
            ├── .mermaid-diagram-pannable-viewport
            │   └── .mermaid-diagram-content
            │       └── svg (Mermaid output)
            └── .mermaid-diagram-controls
                ├── Copy button
                ├── Expand button
                ├── Revert (when panned)
                ├── Zoom in (when panned)
                └── Zoom out (when panned)
```

**Key behaviors:**
- Dynamic import of Mermaid library
- Dark/light theme via `getMermaidThemeConfig()`
- Pan: mouse drag; Zoom: Ctrl/Cmd + wheel
- Toolbar appears on hover
- Full-screen modal with fold button
- `expandShapesToFitLabels()` for label clipping fix
- `fitDiagramToWidth()` + `ResizeObserver` for responsive sizing

---

## 4. CSS Architecture

### File organization

```
vybeChat/browser/
├── markdown/media/
│   └── vybeChatMarkdown.css       310 lines   Markdown text rendering
├── contentParts/media/
│   ├── vybeChatCodeBlock.css      318 lines   Code blocks (Monaco)
│   ├── vybeChatThinking.css       288 lines   Thinking block
│   ├── vybeChatToolPart.css        75 lines   Shimmer + chevron (shared)
│   ├── vybeChatMermaidBlock.css   199 lines   Mermaid diagrams
│   ├── vybeChatMermaidDiagram.css 135 lines   Alt mermaid (code/diagram toggle)
│   ├── vybeChatTextEditV2.css     ???         Text edits with diff
│   ├── vybeChatPhaseIndicator.css ???         Phase indicator shimmer
│   ├── vybeChatTodoPart.css       ???         Todo list
│   └── vybeChatLoading.css        ???         Loading diagram placeholder
└── media/
    ├── vybeChatComposer.css                   Composer input
    └── vybeChatConversation.css               Conversation layout
```

### Shared CSS classes across parts

| Class | Defined in | Used by |
|-------|-----------|---------|
| `.collapsible-clean` | vybeChatToolPart.css | Tool, Thinking |
| `.collapsible-clean-children` | vybeChatToolPart.css | Tool, Thinking |
| `.composer-tool-former-header` | vybeChatToolPart.css | Tool, Thinking, Phase |
| `.edit-header-verb` | vybeChatToolPart.css | Tool, Thinking, Phase, Loading |
| `.make-shine` | vybeChatToolPart.css | Tool, Thinking, Phase, Loading |
| `.chevron-right` | vybeChatToolPart.css | Tool, Thinking |
| `.composer-code-block-container` | vybeChatCodeBlock.css | Code block, Text edit, Mermaid diagram |
| `.context-list-item` | inline styles | Tool (all list types) |
| `.cursor-badge` | inline styles | Tool (grep, lint counts) |

### Shared CSS variables

| Variable | Defined in | Purpose |
|----------|-----------|---------|
| `--vybe-shine-bright` | vybeChat.css | Shimmer bright color (theme-aware) |
| `--vscode-foreground` | VS Code theme | Primary text |
| `--vscode-descriptionForeground` | VS Code theme | Secondary text |
| `--vscode-panel-background` | VS Code theme | Code block background |
| `--vscode-panel-border` | VS Code theme | Borders |
| `--vscode-textLink-foreground` | VS Code theme | Links |
| `--vscode-badge-background` | VS Code theme | Badge background |

### Hardcoded VYBE colors (to be replaced with tokens)

| Color | Usage |
|-------|-------|
| `#212427` | Dark mode header/input background |
| `#383838` | Dark mode border |
| `#eceff2` | Light mode header/input background |
| `#d9d9d9` | Light mode border |
| `#3ecf8e` | VYBE green (file links, buttons) |

---

## 5. Shared Animation: Shimmer ("make-shine")

The shimmer animation is used by Tool, Thinking, Phase indicator, and Loading
parts to indicate active streaming.

**CSS (vybeChatToolPart.css):**
```css
@keyframes shine {
    0%   { background-position: 200% center; }
    100% { background-position: -200% center; }
}
.make-shine {
    background: linear-gradient(
        90deg,
        currentColor 0%,
        var(--vybe-shine-bright) 50%,
        currentColor 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 2s linear infinite;
}
```

Applied by adding/removing the `.make-shine` class on `.edit-header-verb`
during streaming.

---

## 6. Build Order for VYBE-Desktop

### Phase 1 — Markdown Renderer (DONE)
- [x] Service interface + helpers (`common/vybeChatMarkdownRenderer.ts`)
- [x] DOM builder + section diffing (`browser/markdown/vybeMarkdownToDom.ts`)
- [x] Service implementation (`browser/markdown/vybeMarkdownRendererService.ts`)
- [x] Markdown CSS (`browser/markdown/media/vybeChatMarkdown.css`)
- [x] Content part base + types (`browser/contentParts/vybeChatContentPart.ts`)
- [x] Markdown content part (`browser/contentParts/vybeChatMarkdownPart.ts`)
- [x] Contribution registration

### Phase 2 — Shared Components + Thinking + Code Block
- [ ] Design tokens (`browser/vybeChatContentPartTokens.ts`)
- [ ] Shared components (`browser/vybeChatContentPartComponents.ts`)
- [ ] Shimmer CSS (`browser/contentParts/media/vybeChatShared.css`)
- [ ] Thinking part (`browser/contentParts/vybeChatThinkingPart.ts`)
- [ ] Thinking CSS (`browser/contentParts/media/vybeChatThinking.css`)
- [ ] Code block part (`browser/contentParts/vybeChatCodeBlockPart.ts`)
- [ ] Code block CSS (`browser/contentParts/media/vybeChatCodeBlock.css`)

### Phase 3 — MessagePage + Mock Streaming Trial
- [ ] MessagePage (hosts and orchestrates content parts)
- [ ] Wire VybeChatViewPane to use MessagePage
- [ ] Mock streaming data to validate rendering pipeline

### Phase 4 — Agent Service Backend
- [ ] IVybeAgentService, LangGraph client, streaming event handler
- [ ] Connect real agent events to MessagePage content parts

### Phase 5 — Tool UI + Remaining Parts
- [ ] Tool part (unified) with shared components
- [ ] Terminal part
- [ ] Text edit part (diff view, HITL)
- [ ] Mermaid block
- [ ] Todo, Phase indicator, Loading diagram
- [ ] Reference part

---

## 7. Naming Convention for VYBE-Desktop

Old VYBE used `vybeChatToolPartDesignTokens.ts` and `vybeChatToolPartComponents.ts`.
For VYBE-Desktop, since the shared components serve ALL content parts (not just
tool parts), rename to:

| Old VYBE | VYBE-Desktop |
|----------|-------------|
| `vybeChatToolPartDesignTokens.ts` | `vybeChatContentPartTokens.ts` |
| `vybeChatToolPartComponents.ts` | `vybeChatContentPartComponents.ts` |
| `vybeChatToolPart.css` (shared styles) | `media/vybeChatShared.css` |

This makes it clear these are shared across all content parts, not tool-specific.
