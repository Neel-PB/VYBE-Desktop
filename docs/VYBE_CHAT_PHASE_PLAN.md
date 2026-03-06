# VYBE Chat – Phase Plan (VYBE-Desktop)

> **Status**: Planning (research complete, no code edits yet)
> **Goal**: Bring VYBE Chat into VYBE-Desktop's secondary panel (auxiliary bar) cleanly,
> with reusable tokens, merge-safe architecture, and phased delivery.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Tab Design Reference](#2-tab-design-reference)
3. [What Already Exists in VYBE-Desktop](#3-what-already-exists-in-vybe-desktop)
4. [What Needs to Be Built](#4-what-needs-to-be-built)
5. [Phase 1 – Scaffold & Tabs](#5-phase-1--scaffold--tabs)
6. [Phase 2 – View Pane Shell & Action Buttons](#6-phase-2--view-pane-shell--action-buttons)
7. [Phase 3 – History Dropdown](#7-phase-3--history-dropdown)
8. [Phase 4 – Chat UI (Composer + Message Area)](#8-phase-4--chat-ui-composer--message-area)
9. [Phase 5 – Agent Integration](#9-phase-5--agent-integration)
10. [Upstream Merge Safety](#10-upstream-merge-safety)
11. [Design Token Strategy](#11-design-token-strategy)
12. [Old VYBE Reference Map](#12-old-vybe-reference-map)

---

## 1. Architecture Overview

### How tabs work (one container = one tab)

Each chat session is a **ViewContainer** registered in `ViewContainerLocation.AuxiliaryBar`.
The workbench composite bar renders one tab per container. No custom tab widget needed
for the tab strip itself — it's the built-in composite bar.

```
AuxiliaryBar (secondary panel)
├── ViewContainer: workbench.panel.vybeChat.default-new-chat   ← always exists
│   └── View: workbench.panel.vybeChat.view.chat.default-new-chat
│       └── VybeChatViewPane
├── ViewContainer: workbench.panel.vybeChat.session-1234       ← created on "New Chat"
│   └── View: workbench.panel.vybeChat.view.chat.session-1234
│       └── VybeChatViewPane
└── ...
```

### Folder layout (new, clean)

```
src/vs/workbench/contrib/vybeChat/
├── common/
│   ├── vybeChatConstants.ts          ← IDs, prefixes, helpers
│   ├── vybeChatSessionsService.ts    ← IVybeChatSessionsService interface
│   ├── vybeChatConversationIndex.ts  ← IVybeChatConversationIndexService interface
│   ├── vybeChatIcon.ts               ← VYBE SVG icon URI
│   └── vybeChatWorkspace.ts          ← getEffectiveWorkspaceId()
├── browser/
│   ├── contribution/
│   │   ├── vybeChat.contribution.ts               ← main entry (imports all sub-contributions)
│   │   ├── vybeChatParticipant.contribution.ts     ← static default container + view
│   │   ├── vybeChatSessions.contribution.ts        ← IVybeChatSessionsService impl
│   │   ├── vybeChatConversationIndex.contribution.ts ← IVybeChatConversationIndexService impl
│   │   └── vybeChatInitialization.contribution.ts  ← ensures default tab, restores last session
│   ├── actions/
│   │   └── vybeChatActions.ts         ← commands: newChat, closeChat, showHistory, settings
│   ├── components/
│   │   ├── titlebar/
│   │   │   └── chatTitlebar.ts        ← (Phase 2) in-pane action buttons
│   │   └── historyDropdown/
│   │       └── historyDropdown.ts     ← (Phase 3)
│   ├── vybeChatViewPane.ts            ← the ViewPane (shell in Phase 2, full in Phase 4)
│   ├── vybeChatDesignTokens.ts        ← design tokens (mirrors vybeSettingsDesignTokens pattern)
│   ├── vybeChatHistoryCommandRunner.ts ← thin module-level callback
│   └── media/
│       └── vybeChat.css               ← chat-specific CSS (Phase 4+)
```

### Workbench wiring (1 line)

```ts
// In workbench.common.main.ts, after vybeSettings import:
import './contrib/vybeChat/browser/contribution/vybeChat.contribution.js';
```

### Core touch point (1 block in compositeBarActions.ts)

```ts
// In CompositeBarActionViewItem, after container creation:
if (compositeId.startsWith('workbench.panel.vybeChat.')) {
    // Append .codicon-close.remove-button
    // Wire click → executeCommand('vybeChat.closeChat', viewId)
    // Wire mouseenter/leave for show/hide
}
```

---

## 2. Tab Design Reference

### Tab element structure (from old VYBE / Cursor)

```html
<li class="action-item composite-bar-action-tab is-truncated checked"
    role="tab" draggable="true" aria-label="..."
    aria-expanded="true" aria-selected="true"
    style="--insert-border-color: ...;">
  <div class="status-indicator"></div>
  <div class="composite-bar-action-tab-label">
    <div class="codicon codicon-terminal" style="display: none;"></div>
    <div class="codicon codicon-cloud-two cloud-indicator" style="display: none;"></div>
    <div class="codicon codicon-git-branch worktree-indicator" style="display: none;"></div>
    <a aria-id="chat-horizontal-tab" class="action-label"
       aria-label="Researching .cursor folder structure">
      Researching .cursor folder structure
    </a>
  </div>
  <div class="badge" aria-hidden="true" style="display: none;">
    <div class="badge-content"></div>
  </div>
  <div class="codicon codicon-close remove-button"
       style="position: absolute; right: 0; top: 50%;
              transform: translateY(-50%); cursor: pointer;
              z-index: 2; opacity: 0; pointer-events: none;">
  </div>
  <div class="active-item-indicator"></div>
</li>
```

### Key CSS (already in VYBE-Desktop compositeBarActionTab.css)

| Feature | Status in VYBE-Desktop | Notes |
|---------|----------------------|-------|
| Tab height/font/padding/radius | ✅ Done | `--vybe-tab-*` variables |
| Max-width 108px on label | ✅ Done | `--vybe-tab-label-max-width` |
| Checked bg (`var(--vscode-input-background)`) | ✅ Done | Just changed from hardcoded |
| Label truncation with fade mask | ✅ Done | `.action-label.truncated` + mask-image |
| Close button base (panel only) | ⚠️ Partial | CSS exists for `.part.panel` but NOT `.part.auxiliarybar` |
| Close button hover show/hide (panel) | ⚠️ Partial | Panel only |
| Close button DOM creation | ❌ Missing | `compositeBarActions.ts` has NO vybeChat handling yet |
| Close button hover bg (checked = input-bg) | ❌ Needs update | Old VYBE used hardcoded `#222427`; should use `var(--vscode-input-background)` |

### What to add for close button

1. **CSS**: Extend all `.remove-button` rules to include `.part.auxiliarybar` selectors
2. **CSS**: Change checked hover bg from `#222427`/`#eceff2` → `var(--vscode-input-background)`
3. **TS**: In `compositeBarActions.ts`, add the `workbench.panel.vybeChat.*` guard:
   - Create `.codicon-close.remove-button` element
   - Wire click → `vybeChat.closeChat`
   - Wire mouseenter/leave for opacity + pointer-events
   - Use `var(--vscode-input-background)` for close bg on checked tabs

---

## 3. What Already Exists in VYBE-Desktop

### Contrib folders

| Folder | Purpose |
|--------|---------|
| `vybeDropdown/` | Reusable dropdown panel, tokens, theme resolver |
| `vybeSettings/` | Settings editor with tabs, design tokens, stubs |
| `vybeResources/` | Blog/changelog/docs/messages tabs |
| `vybeTitlebar/` | Custom titlebar with account dropdown |

### Reusable infrastructure (use in vybeChat)

| Module | What it provides |
|--------|-----------------|
| `vybeDropdownTokens.ts` | Sizing tokens for dropdown panels |
| `vybeDropdownTheme.ts` | `getVybeDropdownThemeColors()` – resolves menu/list/button colors from theme |
| `vybeDropdownPanel.ts` | Base class for positioned dropdown panels |
| `vybeDropdownStyles.ts` | Shared style helpers |
| `vybeSettingsDesignTokens.ts` | Pattern to follow for `vybeChatDesignTokens.ts` |
| `compositeBarActionTab.css` | Tab design already done (height, font, max-width, checked bg, truncation) |

---

## 4. What Needs to Be Built

### Phase 1 – Scaffold & Tabs (minimal, gets tabs working)
- [ ] `contrib/vybeChat/common/vybeChatConstants.ts`
- [ ] `contrib/vybeChat/common/vybeChatSessionsService.ts` (interface only)
- [ ] `contrib/vybeChat/common/vybeChatIcon.ts`
- [ ] `contrib/vybeChat/browser/contribution/vybeChatParticipant.contribution.ts` (static default container)
- [ ] `contrib/vybeChat/browser/contribution/vybeChatSessions.contribution.ts` (service impl)
- [ ] `contrib/vybeChat/browser/contribution/vybeChat.contribution.ts` (main entry)
- [ ] `contrib/vybeChat/browser/vybeChatViewPane.ts` (minimal shell – "New Chat" placeholder)
- [ ] Wire in `workbench.common.main.ts` (1 line)
- [ ] `compositeBarActions.ts` – close button for `workbench.panel.vybeChat.*` tabs
- [ ] `compositeBarActionTab.css` – extend close button rules to auxiliarybar
- [ ] `contrib/vybeChat/browser/actions/vybeChatActions.ts` – `vybeChat.newChat`, `vybeChat.closeChat`

### Phase 2 – View Pane Shell & Action Buttons
- [ ] Action buttons in pane title: New Chat (`codicon-add`), History (`codicon-history`), Settings (`codicon-ellipsis` → `vybe.openSettingsEditor`)
- [ ] `contrib/vybeChat/browser/vybeChatDesignTokens.ts`
- [ ] Fullscreen toggle via `workbench.action.toggleMaximizedAuxiliaryBar`

### Phase 3 – History Dropdown
- [ ] `contrib/vybeChat/common/vybeChatConversationIndex.ts` (interface)
- [ ] `contrib/vybeChat/browser/contribution/vybeChatConversationIndex.contribution.ts` (impl)
- [ ] `contrib/vybeChat/browser/contribution/vybeChatInitialization.contribution.ts`
- [ ] `contrib/vybeChat/browser/components/historyDropdown/historyDropdown.ts`
- [ ] `contrib/vybeChat/browser/vybeChatHistoryCommandRunner.ts`
- [ ] `vybeChat.showHistory` action
- [ ] `vybeChat.settings` action

### Phase 4 – Chat UI (Composer + Message Area)
- [ ] Message composer (input area)
- [ ] Message page / chat area
- [ ] Content parts (markdown, code blocks, thinking, etc.)
- [ ] `contrib/vybeChat/browser/media/vybeChat.css`

### Phase 5 – Agent Integration
- [ ] Connect to vybeAgent service
- [ ] Streaming responses
- [ ] Tool execution UI
- [ ] Checkpoint/storage

---

## 5. Phase 1 – Scaffold & Tabs

### 5.1 Constants (`vybeChatConstants.ts`)

```ts
export const VYBE_CHAT_VIEW_CONTAINER_ID_PREFIX = 'workbench.panel.vybeChat';
export const VYBE_CHAT_VIEW_ID_PREFIX = 'workbench.panel.vybeChat.view.chat';
export const VYBE_CHAT_DEFAULT_SESSION_ID = 'default-new-chat';
export const VYBE_CHAT_NEW_CHAT_LABEL = 'New Chat';

export function getVybeChatViewContainerId(sessionId: string): string { ... }
export function getVybeChatViewId(sessionId: string): string { ... }
export function getSessionIdFromViewId(viewId: string): string | undefined { ... }
export function getSessionIdFromViewContainerId(containerId: string): string | undefined { ... }
```

### 5.2 Sessions Service Interface (`vybeChatSessionsService.ts`)

```ts
export interface IVybeChatSessionsService {
    readonly _serviceBrand: undefined;
    readonly onDidResetSession: Event<string>;
    createSession(): Promise<string>;
    createDefaultSession(): Promise<string>;
    closeSession(sessionId: string): Promise<void>;
    renameSession(sessionId: string, newName: string): Promise<void>;
    updateSessionTitle(sessionId: string, title: string): Promise<void>;
    getAllSessionIds(): string[];
    registerSession(sessionId: string, firstMessage: string): Promise<void>;
    isSessionRegistered(sessionId: string): boolean;
}
```

### 5.3 Static Registration (`vybeChatParticipant.contribution.ts`)

Registers the default "New Chat" ViewContainer + View at module load:
- `ViewContainerLocation.AuxiliaryBar`
- `mergeViewWithContainerWhenSingleView: true`
- `isDefault: true`
- Icon: `getVybeChatIconUri()` (VYBE equalizer SVG)

### 5.4 Sessions Service (`vybeChatSessions.contribution.ts`)

Key behaviors:
- **Create**: Register new ViewContainer + View → new tab appears
- **Close**: Deregister container + view → tab disappears. If last tab, reset to "New Chat"
- **Rename**: Update container title (no deregister/register to avoid disposing the pane)
- **Register on first message**: Session persisted to conversation index only after first AI token
- **Restore**: On startup, rebuild ViewContainers from conversation index entries

### 5.5 Close Button in compositeBarActions.ts

Only for tabs whose ID starts with `workbench.panel.vybeChat.`:
- Append `div.codicon.codicon-close.remove-button` to the tab container
- Click → `executeCommand('vybeChat.closeChat', viewId)`
- Hover show/hide with theme-aware background (use `var(--vscode-input-background)` for checked tabs)
- Width: 16.5px, height: matches tab, right-side border-radius only

### 5.6 Close Button CSS Updates

Extend existing `.remove-button` rules in `compositeBarActionTab.css` to include `.part.auxiliarybar`:

```css
/* Close button – base (panel + auxiliarybar) */
.monaco-workbench .part.panel > ... .codicon-close.remove-button,
.monaco-workbench .part.auxiliarybar > ... .codicon-close.remove-button { ... }

/* Show on hover (panel + auxiliarybar) */
.monaco-workbench .part.panel > ... :hover .codicon-close.remove-button,
.monaco-workbench .part.auxiliarybar > ... :hover .codicon-close.remove-button { ... }

/* Checked hover bg → var(--vscode-input-background) */
```

---

## 6. Phase 2 – View Pane Shell & Action Buttons

### Action buttons (right side of pane title bar)

Registered via `MenuId.ViewTitle` with `when: ContextKeyExpr.regex('view', /^workbench\.panel\.vybeChat\.view\.chat\./)`:

| Button | Icon | Command | Order |
|--------|------|---------|-------|
| New Chat | `codicon-add` | `vybeChat.newChat` | 1 |
| History | `codicon-history` | `vybeChat.showHistory` | 2 |
| Settings | `codicon-ellipsis` | `vybeChat.settings` → `vybe.openSettingsEditor` | 3 |

These use VS Code's built-in menu contribution system — no custom DOM needed in the pane.

### VybeChatViewPane (shell)

Extends `ViewPane`. In Phase 2 it renders:
- Empty state: "New Chat" label + prompt
- Title bar managed by VS Code (action buttons from menu contributions)
- `renderBody()` creates the chat area container (filled in Phase 4)

---

## 7. Phase 3 – History Dropdown

### Conversation Index Service

Persists `Record<sessionId, { title, lastUsed, threadId? }>` in `IStorageService`.
Key: `vybe.chat.conversationIndex` (workspace-scoped).

Additional keys:
- `vybe.chat.currentSessionId` – last-focused session per workspace
- `vybe.chat.displayTranscript` – ordered parts for restore

### History Dropdown

Reuses `VybeDropdownPanel` base class and `getVybeDropdownThemeColors()` for styling.

Features:
- Search/filter input
- Time-grouped sections (Today, Yesterday, Last 7 Days, etc.)
- Click to navigate (switch to session tab)
- Inline rename (contentEditable)
- Delete button per item
- Current chat indicator

### Initialization Contribution

- `setHistoryCommandRunner()` so history button works immediately
- Opens default view on startup
- Restores last-focused session from `vybe.chat.currentSessionId`

---

## 8. Phase 4 – Chat UI (Composer + Message Area)

Deferred. Will bring in:
- Message composer (text input + context pills + model selector)
- Message page (scrollable chat area)
- Content parts (markdown, code blocks, thinking, tool, terminal, text edit, todo, mermaid, etc.)
- Design tokens from `vybeChatDesignTokens.ts`
- CSS in `media/vybeChat.css`

---

## 9. Phase 5 – Agent Integration

Deferred. Will connect:
- `IVybeAgentService` for LLM calls
- Streaming event handling
- Tool execution rendering
- Checkpoint/storage (unified storage via `vybeStorage`)

---

## 10. Upstream Merge Safety

### Files touched in core (merge conflict risk)

| File | Change | Risk |
|------|--------|------|
| `workbench.common.main.ts` | 1 import line | Low – upstream adds/removes imports; easy to re-add |
| `compositeBarActions.ts` | 1 guarded block (~50 lines) | Medium – upstream can refactor; block is self-contained and guarded by `startsWith('workbench.panel.vybeChat.')` |
| `compositeBarActionTab.css` | Extend existing rules to auxiliarybar | Low – rules are additive; we own this file |

### Files fully in Vybe land (no merge conflict)

Everything under `contrib/vybeChat/` — upstream never adds files there.

### Strategy

- **Minimize core patches**: Only 2 files outside `contrib/vybeChat/` need changes
- **Guard with prefix**: All checks use `workbench.panel.vybeChat.` prefix
- **Additive CSS**: Extend selectors rather than modify existing ones
- **No hijacking**: VS Code's own `contrib/chat/` continues to work; vybeChat is separate

---

## 11. Design Token Strategy

### Pattern (follow `vybeSettingsDesignTokens.ts`)

Create `vybeChatDesignTokens.ts` with:

```ts
// Typography
export const CHAT_LABEL_FONT_SIZE_PX = 12;
export const CHAT_INPUT_FONT_SIZE_PX = 13;

// Colors (all var() references to VS Code theme tokens)
export const CHAT_COLOR_FOREGROUND = 'var(--vscode-foreground)';
export const CHAT_COLOR_DESCRIPTION = 'var(--vscode-descriptionForeground)';
export const CHAT_COLOR_INPUT_BG = 'var(--vscode-input-background)';
export const CHAT_COLOR_INPUT_FG = 'var(--vscode-input-foreground)';
export const CHAT_COLOR_BORDER = 'var(--vscode-panel-border)';

// Spacing
export const CHAT_MESSAGE_PADDING_PX = 12;
export const CHAT_COMPOSER_HEIGHT_PX = 42;
```

### Rules

1. **No hardcoded hex/rgba** — always use `var(--vscode-*)` tokens
2. **No `--cursor-*` variables** — those are Cursor-specific; use VS Code equivalents
3. **Reuse existing tokens** where applicable (`VybeDropdownTokens`, `--vybe-tab-*`)
4. **Export as named constants** so they can be used in both CSS and TS

---

## 12. Old VYBE Reference Map

### Files to reference (not copy verbatim)

| Old VYBE File | Purpose | Clean Equivalent |
|---------------|---------|-----------------|
| `common/vybeChatConstants.ts` | IDs, prefixes | Copy with minimal changes |
| `common/vybeChatSessionsService.ts` | Interface | Copy exactly |
| `common/vybeChatConversationIndex.ts` | Interface + types | Copy exactly |
| `common/vybeChatIcon.ts` | SVG icon URI | Copy exactly |
| `common/vybeChatWorkspace.ts` | Workspace ID helper | Copy exactly |
| `browser/contribution/vybeChatParticipant.contribution.ts` | Static registration | Copy, simplify |
| `browser/contribution/vybeChatSessions.contribution.ts` | Sessions service impl | Rewrite clean (remove vybeStorage/checkpoint deps) |
| `browser/contribution/vybeChatInitialization.contribution.ts` | Startup init | Copy, simplify |
| `browser/actions/vybeChatActions.ts` | Commands | Bring `newChat`, `closeChat`, `showHistory`, `settings` |
| `browser/vybeChatHistoryCommandRunner.ts` | Callback module | Copy exactly (29 lines) |
| `browser/components/titlebar/historyDropdown.ts` | History UI | Rewrite using `VybeDropdownPanel` + theme tokens |
| `browser/vybeChatViewPane.ts` | Main pane (8000+ lines) | Rewrite clean in phases |
| `browser/vybeChatToolPartDesignTokens.ts` | Tool UI tokens | Reference for Phase 4 token file |

### Core patches to reference

| Old VYBE File | What's patched | Bring to VYBE-Desktop |
|---------------|---------------|----------------------|
| `compositeBarActions.ts` (lines 317–440) | Close button for vybeChat tabs | Yes – same pattern |
| `workbench.common.main.ts` (line 435) | `import './contrib/vybeChat/...'` | Yes – 1 line |

---

## Appendix: Tab Max-Width & AI Names

Tabs use `--vybe-tab-label-max-width: 108px` (already in VYBE-Desktop). When AI generates
longer chat names, the label truncates with a fade mask (gradient from opaque to transparent
over the last 16px). The `.truncated` class is toggled via `ResizeObserver` checking
`scrollWidth > clientWidth`. This is already implemented in the CSS; the JS side needs the
`_updateTruncationClass()` method in `compositeBarActions.ts` (which old VYBE has but
VYBE-Desktop does not yet).
