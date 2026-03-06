# VYBE Inline Chat Composer — Research & Specification

## 1. Problem Statement

VYBE-Desktop currently uses VS Code's built-in inline chat (`src/vs/workbench/contrib/inlineChat/`), which renders a `ChatWidget` with a Monaco `CodeEditorWidget` input inside a `ZoneWidget`. Cursor replaces this with a lightweight Lexical-based inline composer that matches their main chat composer design. We need to do the same for VYBE.

Two items:
1. **Empty editor hint** — Change from VS Code's "Generate code (⌘I), or select a language…" to Cursor-style "Press ⌘K to generate code. Start typing to dismiss."
2. **Inline composer** — Replace VS Code's zone widget inline chat with a VYBE-branded Lexical inline composer (similar to `VybeChatComposer` but compact).

---

## 2. OuterHTML Reference

### 2.1 Empty Editor Hint — VS Code (current)

```html
<div class="empty-editor-hint" widgetid="editor.widget.emptyHint"
     style="width: max-content; padding-left: 4px; font-family: Menlo, Monaco, 'Courier New', monospace;
            font-weight: normal; font-size: 12px; font-feature-settings: 'liga' 0, 'calt' 0;
            font-variation-settings: normal; line-height: 18px; letter-spacing: 0px;
            position: absolute; display: block; visibility: inherit; max-width: 930px;
            top: 0px; left: 0px;" monaco-visible-content-widget="true">
  <div style="font-style: italic;">
    <a style="cursor: pointer;">Generate code</a> (⌘I), or
    <a style="cursor: pointer;">select a language</a> (⌘K M).
    Start typing to dismiss or
    <a style="cursor: pointer;">don't show</a> this again.
  </div>
</div>
```

### 2.2 Empty Editor Hint — Cursor (target)

```html
<div class="empty-editor-hint" widgetid="editor.widget.emptyHint"
     style="width: max-content; padding-left: 4px; font-family: Menlo, Monaco, 'Courier New', monospace;
            font-weight: normal; font-size: 12px; font-feature-settings: 'liga' 0, 'calt' 0;
            font-variation-settings: normal; line-height: 18px; letter-spacing: 0px;
            position: absolute; display: block; visibility: inherit; max-width: 659px;
            top: 0px; left: 0px;" monaco-visible-content-widget="true">
  <div style="font-style: italic;">
    <a custom-hover="true" style="cursor: pointer;">Press ⌘K to generate code.</a>
    Start typing to dismiss.
  </div>
</div>
```

**Key differences:**
- Cursor shows ONE link ("Press ⌘K to generate code.") vs VS Code's three links
- Cursor removes the "select a language" and "don't show" options
- Cursor uses `⌘K` not `⌘I` as the trigger keybinding
- Cursor adds `custom-hover="true"` on the link

### 2.3 Inline Composer — Cursor

```html
<div class="inlineDiffViewZone" monaco-view-zone="F1"
     style="min-height: 62px; overflow: hidden; position: absolute; width: 100%;
            display: block; top: 0px; height: 72px;" monaco-visible-view-zone="true">
  <div style="height: 100%; width: 100%;">
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <div tabindex="0" style="padding-top: 6px; box-sizing: border-box; outline: none;
                                flex-direction: row; display: flex; z-index: 100; width: 100%;">
        <div style="width: 0px;"></div>
        <div style="z-index: 1000001; position: relative; max-width: 500px; width: 500px;
                    min-width: 450px; margin-left: 2px; font-size: 12px; line-height: 1.5em;
                    background-color: var(--vscode-editor-background);
                    color: var(--vscode-foreground); border-radius: 6px;
                    box-sizing: border-box; overflow: hidden auto;
                    box-shadow: 0 4px 8px var(--vscode-inlineChat-shadow);
                    padding: 8px 4px 0px; margin-right: 2px;
                    border: 1px solid var(--vscode-commandCenter-inactiveBorder);">

          <!-- Context pills row (compact) -->
          <div tabindex="-1" class="prompt-bar-selections compact"
               style="display: flex; flex-direction: column; margin-top: 0.5rem;
                      margin-bottom: 0.25rem; gap: 0.25rem;"></div>

          <div style="display: flex; flex-direction: column;">
            <!-- Input row -->
            <div style="flex-grow: 1;">
              <div style="display: flex; align-items: center; width: 100%;">
                <div style="flex: 1 1 0%;">
                  <div style="width: 100%; overflow: hidden;">
                    <!-- Lexical editor grid (same pattern as main composer) -->
                    <div class="aislash-editor-grid"
                         style="display: grid; position: relative;
                                grid-template-columns: 1fr 1fr; width: 200%;">
                      <div autocapitalize="off" class="aislash-editor-input"
                           contenteditable="true" spellcheck="false"
                           data-lexical-editor="true" role="textbox"
                           style="resize: none; grid-area: 1 / 1 / 1 / 1;
                                  overflow: hidden; line-height: 1.5;
                                  font-family: inherit; font-size: 13px;
                                  color: var(--vscode-input-foreground);
                                  background-color: transparent; display: block;
                                  outline: none; scrollbar-width: none;
                                  box-sizing: border-box; border: none;
                                  overflow-wrap: break-word; word-break: break-word;
                                  padding: 0px 0.5rem; user-select: text;
                                  white-space: pre-wrap;">
                        <p><br></p>
                      </div>
                      <div style="grid-area: 1 / 2 / 1 / 2;">
                        <div class="aislash-editor-placeholder"
                             style="position: relative; top: 0px; left: -100%;
                                    padding: 0px 0.5rem; pointer-events: none;
                                    user-select: none; line-height: 1.5;
                                    font-size: 13px;
                                    color: var(--vscode-input-placeholderForeground);
                                    opacity: 0.5;">
                          Edit selected code
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Close button -->
                <div style="margin-right: 4px; align-self: start;">
                  <button class="prompt-bar-close-btn" type="button" title="Close">
                    <span class="codicon codicon-x"></span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Bottom toolbar -->
            <div style="flex-shrink: 0; padding-top: 2px;">
              <div class="inline-prompt-button-area"
                   style="display: flex; justify-content: flex-start;
                          align-items: center; margin: 4px 0px 6px;">
                <!-- Model pill -->
                <div class="composer-unified-dropdown-model ...">
                  <span>Auto</span>
                  <div class="codicon codicon-chevron-down"></div>
                </div>
                <div style="flex-grow: 1;"></div>
                <!-- Mode pill ("Edit Selection") -->
                <div id="floating-prompt-barmode-dropdown-button">
                  <span style="font-size: 10px;">Edit Selection</span>
                  <span class="codicon codicon-chevron-down" style="font-size: 10px;"></span>
                </div>
                <!-- Send button -->
                <div class="anysphere-icon-button" data-disabled="true"
                     style="flex-shrink: 0; scale: 0.9; width: 20px; height: 20px;">
                  <span class="codicon codicon-arrow-up-two"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 2.4 Inline Chat — VS Code (current, zone widget)

```html
<div class="zone-widget inline-chat-widget inline-chat-2"
     widgetid="vs.editor.contrib.zoneWidgetc4"
     style="width: 982px; left: 0px; top: 18px; height: 67px; position: absolute;">
  <div class="zone-widget-container"
       style="--vscode-inlineChat-background: var(--vscode-editor-background);
              border-top-color: rgb(0, 122, 204); border-bottom-color: rgb(0, 122, 204);
              padding-left: 66px; height: 65px;">
    <div class="inline-chat in-zone-widget" tabindex="0">
      <div class="chat-widget">
        <div class="interactive-session" style="font-size: 13px;">
          <!-- Welcome view (hidden) -->
          <!-- Interactive list (Monaco list widget for messages) -->
          <!-- Chat input part (compact) -->
          <div class="interactive-input-part compact">
            <div class="interactive-input-and-edit-session">
              <!-- Monaco CodeEditorWidget input -->
              <div class="interactive-input-editor" style="--editor-font-size: 13px;">
                <div class="monaco-editor" role="code">
                  <!-- Full Monaco editor with scrollbars, margins, cursors, etc. -->
                </div>
              </div>
              <!-- Toolbar: send + close buttons -->
              <div class="chat-input-toolbars">
                <div class="chat-execute-toolbar">
                  <a class="codicon codicon-arrow-up" aria-label="Send (Enter)"></a>
                  <a class="codicon codicon-close" aria-label="Close (Escape)"></a>
                </div>
              </div>
            </div>
            <!-- Context attachments, model picker -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 3. Architecture Analysis

### 3.1 Current VS Code Inline Chat Architecture

| Component | File | Description |
|-----------|------|-------------|
| `InlineChatController` | `inlineChatController.ts` | Editor contribution; owns session lifecycle, zone visibility |
| `InlineChatZoneWidget` | `inlineChatZoneWidget.ts` | `ZoneWidget` subclass; hosts the chat UI below cursor |
| `EditorBasedInlineChatWidget` | `inlineChatWidget.ts` | Wraps `ChatWidget` for zone mode |
| `InlineChatWidget` | `inlineChatWidget.ts` | Base chat widget with Monaco input, status bar, response area |
| `EmptyTextEditorHintContribution` | `emptyTextEditorHint.ts` | Content widget for empty editor |

**Input:** Monaco `CodeEditorWidget` — full editor with scrollbars, cursors, decorations.

### 3.2 Cursor's Inline Composer Architecture

| Component | Description |
|-----------|-------------|
| View zone container | `inlineDiffViewZone` — uses a view zone but with custom DOM, not `ZoneWidget` |
| Composer box | Floating box with `border-radius: 6px`, `box-shadow`, `border` — visually distinct from editor |
| Input | **Lexical editor** (`data-lexical-editor="true"`) with grid placeholder pattern |
| Context pills | `prompt-bar-selections compact` — inline pills above the input |
| Bottom toolbar | Model pill (Auto), mode pill (Edit Selection), send button |
| Close button | Top-right `codicon-x` button |
| Dimensions | Fixed `max-width: 500px`, `min-width: 450px` — doesn't stretch to full editor width |

**Key differences from VS Code:**
1. **Lexical vs Monaco** — Cursor uses Lexical for inline input (same as main composer); VS Code uses a full Monaco editor
2. **Compact floating box** — Cursor's composer is a compact floating box (500px max); VS Code stretches full width with top/bottom borders
3. **No ChatWidget** — Cursor doesn't use the ChatWidget infrastructure for inline; it's a standalone prompt bar
4. **View zone vs zone widget** — Cursor uses a simpler view zone with custom DOM; VS Code uses `ZoneWidget` with overlay widgets
5. **Shared Lexical infra** — Cursor reuses the same `aislash-editor-input` and `aislash-editor-grid` classes from the main composer

---

## 4. Empty Editor Hint — Implementation Plan

### Approach: Patch `emptyTextEditorHint.ts` (merge-safe)

**File:** `src/vs/workbench/contrib/codeEditor/browser/emptyTextEditorHint/emptyTextEditorHint.ts`

**Change:** In `EmptyTextEditorHintContentWidget.getHint()` (lines 245–257), modify the `hintMsg` to:

```
"[[Press ⌘K to generate code.]] Start typing to dismiss."
```

This gives us:
- One clickable link ("Press ⌘K to generate code.") that triggers `inlineChat.start`
- "Start typing to dismiss." as plain text
- No "select a language" or "don't show" links

**Merge strategy:**
- Add `// VYBE PATCH (merge-safe): Custom empty editor hint text` marker
- Small, isolated change — easy to re-apply after upstream merges

---

## 5. VYBE Inline Composer — Implementation Plan

### 5.1 Approach: New VYBE Contribution

Create a **new contribution** `vybeInlineComposer` that:
1. Intercepts the `inlineChat.start` command (or registers a parallel command)
2. Creates a view zone in the editor with a VYBE Lexical composer
3. Disables/hides the default `InlineChatController` zone widget

This avoids modifying VS Code's inline chat files directly, minimizing merge conflicts.

### 5.2 File Structure

```
src/vs/workbench/contrib/vybeInlineComposer/
├── browser/
│   ├── vybeInlineComposer.contribution.ts   # Register contribution, override keybinding
│   ├── vybeInlineComposerController.ts      # Editor contribution; manages view zone lifecycle
│   ├── vybeInlineComposerWidget.ts          # The floating Lexical composer widget
│   ├── media/
│   │   └── vybeInlineComposer.css           # Styles for the inline composer
│   └── README.md
```

### 5.3 Component Design

**`VybeInlineComposerController`** (editor contribution)
- Registers on `Cmd+K` (or intercepts `Cmd+I`)
- Creates a view zone at the cursor position
- Renders `VybeInlineComposerWidget` inside the view zone
- Manages lifecycle: show/hide/dispose

**`VybeInlineComposerWidget`** (compact Lexical composer)
- Reuses shared infrastructure from `VybeChatComposer`:
  - Lexical editor with `MentionNode` support
  - File icon classes for pills
  - Mention/typeahead plugin
- Compact layout:
  - Max-width: 500px, min-width: 450px
  - `border-radius: 6px`, `box-shadow`, `border`
  - Single-line input (expandable)
  - Bottom bar: model pill + mode pill + send button
  - Close button (top-right)
- Placeholder: "Edit selected code" or "Generate code" depending on selection
- Events: `onSend`, `onClose`

### 5.4 Keybinding Strategy

| Keybinding | Action | Notes |
|------------|--------|-------|
| `⌘K` | Open VYBE inline composer | Override or supplement `⌘I` |
| `Enter` | Send | When composer is focused |
| `Escape` | Close | Dismiss composer |

### 5.5 View Zone Integration

```typescript
editor.changeViewZones(accessor => {
  const zoneId = accessor.addZone({
    afterLineNumber: cursorLine,
    heightInPx: 72,  // Matches Cursor's 72px
    domNode: composerWidget.domNode,
    suppressMouseDown: true,
  });
});
```

### 5.6 Disabling Default Inline Chat

Options (pick one):
1. **Configuration:** Set `inlineChat.mode` to `'off'` and use VYBE composer instead
2. **Command override:** Register VYBE's command with same ID (`inlineChat.start`) at higher priority
3. **Contribution guard:** In `InlineChatController`, add a VYBE check that skips if VYBE inline composer is active

---

## 6. Shared Code with VybeChatComposer

The inline composer should reuse these from the main chat composer:

| Shared Component | Source |
|-----------------|--------|
| Lexical editor setup | `createEditor`, `MentionNode`, theme config |
| Mention plugin | `vybeMentionPlugin.ts` — typeahead, pill creation |
| File icon classes | `applyFileIconClasses` |
| Model pill | Model selector dropdown |
| Send button | Arrow-up button with disabled state |
| Context pill rendering | Same pill DOM/CSS |

**Not shared** (inline-specific):
- Compact layout and sizing
- Close button (top-right)
- Mode pill ("Edit Selection" / "Generate")
- View zone management
- Editor integration (selection context, diff preview)

---

## 7. Priority / Phasing

| Phase | Work | Complexity |
|-------|------|------------|
| **P0** | Empty editor hint text change | Small patch, 1 file |
| **P1** | VYBE inline composer skeleton (view zone + Lexical input + close) | Medium |
| **P2** | Bottom toolbar (model pill, mode pill, send button) | Medium |
| **P3** | Mention/context pill support in inline composer | Medium |
| **P4** | Wire to AI backend (send prompt, receive diff) | Large |
| **P5** | Inline diff preview and accept/reject UI | Large |
