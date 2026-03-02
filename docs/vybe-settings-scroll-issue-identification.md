# Settings editor: can't scroll to bottom when panel is open (identification only)

## Symptom

- When the editor is the only panel (panel bottom closed), scrolling works.
- When the panel bottom is opened, the settings content cannot be scrolled fully to the bottom (especially noticeable on General, which has a lot of content).
- Same underlying issue affects all tabs; it’s most visible on General.

## Root cause (identification)

The bug comes from how **`updateScrollDimensions()`** in `vybeSettingsEditor.ts` interacts with **`DomScrollableElement.scanDomNode()`**.

### What the code does today

1. **Measure content height**  
   - Set `contentWrapperEl.style.height = 'auto'`.  
   - Read `contentHeight = contentWrapperEl.scrollHeight` (correct full content height).

2. **Constrain wrapper to viewport**  
   - Set `contentWrapperEl.style.height = viewportHeight + 'px'` (“for proper scrolling”).

3. **Tell the scrollable the right dimensions**  
   - Call `contentScrollable.setScrollDimensions({ height: viewportHeight, scrollHeight: contentHeight, ... })`.

4. **Re-sync from DOM**  
   - Call `contentScrollable.scanDomNode()`.

### Why that breaks scrolling

- **`DomScrollableElement`** is built around the **scrollable content element** we pass in: **`contentCenterWrap`**.  
  `contentCenterWrap`’s only child is **`contentWrapper`** (the tab content wrapper).

- After step 2, **`contentWrapper`** has **`height: viewportHeight`**, so in the DOM it is only `viewportHeight` tall.  
  So **`contentCenterWrap`** (the element that is the scrollable content) also has an effective height of **`viewportHeight`** (one child, height `viewportHeight`).

- **`scanDomNode()`** (in `scrollableElement.ts`) does:
  - `scrollHeight: this._element.scrollHeight`
  where `_element` is that scrollable content node (`contentCenterWrap`).
  So it reads **`scrollHeight` from the DOM** after we’ve already forced the content to `viewportHeight`.

- That DOM **`scrollHeight`** is therefore **`viewportHeight`** (or very close), not the real content height.

- So **`scanDomNode()` overwrites** the correct `scrollHeight` we set in step 3 with the DOM-derived value **`viewportHeight`**. The scrollable then believes the content is only viewport tall, so it doesn’t allow scrolling to the bottom.

### Why it’s worse with the panel open

- When the panel is **closed**, the editor pane is taller, so `viewportHeight` is larger and the “missing” scroll region is smaller or the bug is less obvious.
- When the panel is **opened**, the pane height shrinks, `layout()` runs, `updateScrollDimensions()` runs, and **`scanDomNode()`** runs again with the new, smaller viewport. The overwritten `scrollHeight` becomes that smaller viewport height, so the bottom of the content is clearly unreachable.

## Summary

- **Cause:** Setting `contentWrapperEl.style.height = viewportHeight` makes the scrollable content node (`contentCenterWrap`) only `viewportHeight` tall in the DOM. Calling **`scanDomNode()`** afterward makes `DomScrollableElement` re-read `scrollHeight` from the DOM and overwrite the correct `contentHeight` with that smaller value.
- **Effect:** The scrollable thinks the content height is the viewport height, so full scroll to the bottom is not possible.
- **Fix direction (for later):** Either stop constraining the wrapper to `viewportHeight` in a way that shrinks the scrollable content node, or stop calling **`scanDomNode()`** after **`setScrollDimensions()`** (or ensure the DOM reflects the true content height before calling it). No code change is made in this step; this doc is identification only.
