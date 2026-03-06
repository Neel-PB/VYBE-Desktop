# VS Code Scrollbar Implementation Guide

How to add the standard VS Code scrollbar (rectangular, sharp edges, theme-aware) to any element in the VYBE-Desktop codebase.

## The Scrollbar

VS Code uses `DomScrollableElement` — a custom JS scrollbar that renders its own DOM elements (`.monaco-scrollable-element > .scrollbar > .slider`). It does NOT use native browser scrollbars. The slider has no border-radius (rectangular, sharp edges) and is themed via `--vscode-scrollbarSlider-background`, `--vscode-scrollbarSlider-hoverBackground`, and `--vscode-scrollbarSlider-activeBackground` CSS variables.

## When To Use

Any time content can overflow a container and needs vertical or horizontal scrolling — settings panels, chat message lists, sidebar navigation, dropdowns, text input areas, etc.

## Core Pattern

### 1. Import

```typescript
import { DomScrollableElement } from '../../../../base/browser/ui/scrollbar/scrollableElement.js';
import { ScrollbarVisibility } from '../../../../base/common/scrollable.js';
```

### 2. Create the content element

The element you pass to `DomScrollableElement` is the **content element**. It gets `overflow: hidden` set by the constructor. Its height is what you toggle between `auto` (for measurement) and a fixed viewport height (for constraining).

```typescript
const contentEl = $('div.my-scroll-content');
// Add children to contentEl...
```

### 3. Create DomScrollableElement

```typescript
const scrollable = new DomScrollableElement(contentEl, {
    vertical: ScrollbarVisibility.Auto,
    horizontal: ScrollbarVisibility.Hidden,
    useShadows: false,
});
```

Options:
- `vertical` / `horizontal`: `ScrollbarVisibility.Auto` (show when needed), `.Visible` (always), `.Hidden` (never)
- `useShadows`: `false` for most UI; `true` adds inset shadow at scroll edges
- `verticalScrollbarSize`: width in px (default 10, use 6 for compact areas)
- `horizontalScrollbarSize`: height in px

### 4. Add to DOM

`getDomNode()` returns the outer wrapper. Append it to your container.

```typescript
const scrollDomNode = scrollable.getDomNode();
scrollDomNode.style.position = 'relative';
scrollDomNode.style.overflow = 'hidden';
scrollDomNode.style.height = '100%'; // or a fixed height
scrollDomNode.style.width = '100%';

container.appendChild(scrollDomNode);
```

### 5. Set scroll dimensions (THE CRITICAL PART)

The scrollbar appears when `scrollHeight > height`. You must tell `DomScrollableElement` these values explicitly via `setScrollDimensions()`. It does NOT detect overflow automatically.

#### For static/semi-static content (settings tabs, sidebars, lists):

```typescript
function updateScrollDimensions(): void {
    const scrollDomNode = scrollable.getDomNode();
    const viewportHeight = scrollDomNode.clientHeight;
    const viewportWidth = scrollDomNode.clientWidth;

    // 1. Temporarily auto-size to measure natural content height
    contentEl.style.height = 'auto';
    void contentEl.offsetHeight; // force reflow

    // 2. Read the natural content height
    const contentHeight = contentEl.scrollHeight;

    // 3. Constrain back to viewport height
    contentEl.style.height = `${viewportHeight}px`;

    // 4. Tell the scrollbar
    scrollable.setScrollDimensions({
        width: viewportWidth,
        scrollWidth: viewportWidth,
        height: viewportHeight,
        scrollHeight: contentHeight,
    });
}
```

Call this after content changes, window resize, or tab switches.

#### For auto-growing content with a max height (text inputs, chat composer):

When the container should grow with content up to a cap, then scroll:

```typescript
const MAX_HEIGHT = 234; // e.g. 12 lines

function updateScrollDimensions(): void {
    const scrollDomNode = scrollable.getDomNode();
    const viewportWidth = scrollDomNode.clientWidth;

    // 1. Auto-size to measure
    contentEl.style.height = 'auto';
    void contentEl.offsetHeight;
    const contentHeight = contentEl.scrollHeight;

    // 2. Clamp viewport to max
    const viewportHeight = Math.min(contentHeight, MAX_HEIGHT);

    // 3. Constrain content and wrapper
    contentEl.style.height = `${viewportHeight}px`;
    scrollDomNode.style.height = `${viewportHeight}px`;

    // 4. Tell the scrollbar
    scrollable.setScrollDimensions({
        width: viewportWidth,
        scrollWidth: viewportWidth,
        height: viewportHeight,
        scrollHeight: contentHeight,
    });
}
```

### 6. Dispose

Always register the scrollable for disposal:

```typescript
this._register(scrollable);
```

## Timing

The initial `setScrollDimensions` call must happen AFTER the element is in the DOM and has layout. Use double `requestAnimationFrame` for safety:

```typescript
const window = DOM.getWindow(container);
window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
        updateScrollDimensions();
    });
});
```

For dynamic content (text input), call `updateScrollDimensions()` on every `input` event and after paste/undo/redo.

## What NOT To Do

1. **Do NOT use `::-webkit-scrollbar` CSS** — that styles the native browser scrollbar, which has rounded corners and looks different from the VS Code scrollbar.

2. **Do NOT use `overflow-y: auto`** on the content element — `DomScrollableElement` sets `overflow: hidden` and manages scrolling programmatically via `element.scrollTop`.

3. **Do NOT use `scanDomNode()`** for dynamic content — it reads dimensions from the DOM but can return stale values for contenteditable elements. Use `setScrollDimensions()` with explicitly measured values instead.

4. **Do NOT add `border-radius` to `.slider`** — VS Code scrollbars are rectangular with sharp edges.

5. **Do NOT set `max-height` on the content element** — it prevents accurate `scrollHeight` measurement. Set `max-height` on the `getDomNode()` wrapper instead, and use the measurement pattern above.

## DOM Structure Created

```
getDomNode() — div.monaco-scrollable-element (position:relative, overflow:hidden)
├── contentEl — your element (overflow:hidden, set by constructor)
│   └── ...your content...
├── div.scrollbar.vertical
│   └── div.slider
└── div.scrollbar.horizontal
    └── div.slider
```

## CSS (automatic)

The scrollbar CSS is loaded automatically via `scrollableElement.ts → import './media/scrollbars.css'`. No additional CSS is needed. The scrollbar uses these theme variables:

| Variable | Purpose |
|----------|---------|
| `--vscode-scrollbar-background` | Scrollbar track background |
| `--vscode-scrollbarSlider-background` | Slider/thumb default |
| `--vscode-scrollbarSlider-hoverBackground` | Slider on hover |
| `--vscode-scrollbarSlider-activeBackground` | Slider while dragging |

## Real Examples in Codebase

| Component | File | Pattern |
|-----------|------|---------|
| Settings sidebar | `vybeSettingsEditor.ts:396` | Static content, viewport = container height |
| Settings content | `vybeSettingsEditor.ts:508` | Static content, full width/height |
| Chat composer input | `vybeChatComposer.ts` | Auto-growing with max height cap |
| ViewPane welcome | `viewPane.ts:168` | Static welcome content |
