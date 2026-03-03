# Merging from VS Code main (upstream)

When pulling from `upstream/main`, re-apply or re-verify VYBE overlay changes so they are not lost.

**Patch markers:** Search for `VYBE:` or `VYBE PATCH (merge-safe)` (or `VYBE PATCH:`) in the repo to find all overlay comments. After resolving merge conflicts, re-apply any lost VYBE blocks using these search terms.

## Current uncommitted / modified files (checklist for merge)

Before merging, ensure these are committed or stashed as needed. Use this list to verify each is either (a) in the overlay table below with a patch hint, or (b) a new VYBE-only file (keep on merge).

| Status | File | In this doc |
|--------|------|-------------|
| M | `build/hygiene.ts` | Build: allow extensionsGallery (see Build & product) |
| M | `docs/MERGE_UPSTREAM.md` | This file |
| M | `scripts/download-remote-ssh-vsix.sh` | Remote-SSH prepackaging |
| M | `src/.../editor.contribution.ts` | VYBE overlay (Editor Actions Position) |
| M | `src/.../editorGroupWatermark.ts` | Editor empty state + Connect via SSH patch |
| M | `src/.../titlebar/media/titlebarpart.css` | VYBE overlay (title bar split) |
| M | `src/.../titlebar/titlebarPart.ts` | VYBE overlay (title bar) |
| M | `src/.../workbench.contribution.ts` | VYBE overlay (editor actions default) |
| M | `src/.../vybeSettings/browser/vybeSettingsDropdown.ts` | vybeSettings contrib |
| M | `src/.../workbench.common.main.ts` | Product and workbench registration |
| ?? | `src/.../contrib/vybeDropdown/` | VYBE overlay (shared dropdown) |
| ?? | `src/.../contrib/vybeResources/` | Vybe Resources contrib |
| ?? | `src/.../contrib/vybeTitlebar/` | VYBE title bar contrib |

Also ensure **`product.json`** (builtInExtensions + extensionsGallery) and **`build/remote-ssh/*.vsix`** (if committed) are in the merge scope. **`build/hygiene.ts`** must allow `extensionsGallery` (see Build & product section).

## VYBE overlay files (customizations)

Search for `VYBE:` or `VYBE PATCH (merge-safe)` in the repo to find all overlay comments. Current overlay files:

| File | Change |
|------|--------|
| `src/vs/workbench/browser/workbench.contribution.ts` | `workbench.activityBar.compact` default `true`; **VYBE PATCH:** default `workbench.editor.editorActionsLocation` to Title Bar when `VYBE_USE_TITLEBAR_SETTINGS_BUTTON`. Search for `VYBE PATCH` / `EDITOR_ACTIONS_LOCATION`. |
| `src/vs/workbench/browser/parts/activitybar/activitybarPart.ts` | Compact default; Activity Bar Size submenu removed from right-click |
| `src/vs/workbench/browser/parts/statusbar/media/statusbarpart.css` | Remote server status bar button min-width 36px |
| `src/vs/workbench/browser/parts/media/compositepart.css` | Sidebar only: title-label padding-left 0 |
| `src/vs/workbench/browser/parts/media/paneCompositePart.css` | Sidebar only: composite tab padding-left 0 |
| `src/vs/workbench/browser/parts/media/compositeBarActionTab.css` | VYBE tab style for panel and auxiliary bar only |
| `src/vs/workbench/browser/parts/paneCompositePart.ts` | Import compositeBarActionTab.css |
| `src/vs/workbench/browser/parts/paneCompositeBar.ts` | useVybeTabStyle in options |
| `src/vs/workbench/browser/parts/panel/panelPart.ts` | useVybeTabStyle: true in getCompositeBarOptions |
| `src/vs/workbench/browser/parts/auxiliarybar/auxiliaryBarPart.ts` | useVybeTabStyle: true in getCompositeBarOptions |
| `src/vs/workbench/browser/parts/compositeBar.ts` | useVybeTabStyle in ICompositeBarOptions and when creating view item |
| `src/vs/workbench/browser/parts/compositeBarActions.ts` | VYBE tab DOM (class, label wrapper, truncation), updateStyles skip, _updateTruncationClass |
| `src/vs/workbench/browser/parts/editor/editor.contribution.ts` | **VYBE PATCH:** Hide "Editor Actions Position" from editor tab bar right-click when `VYBE_USE_TITLEBAR_SETTINGS_BUTTON` (we keep editor actions in title bar only). Search for `VYBE PATCH` / `EditorTabsBarContext`. |
| `src/vs/workbench/browser/parts/titlebar/titlebarPart.ts` | **VYBE:** When `VYBE_USE_TITLEBAR_SETTINGS_BUTTON`: (1) One wrapper `.titlebar-actions-group` with [editor toolbar \| divider \| Settings/Account]; (2) two WorkbenchToolBars (editor left, actions right); (3) editor actions in `editorOnly` only when split; (4) Settings (VybeSettingsDropdown) + Account (VybeAccountDropdown) on right; (5) context/actionRunner split. Search for `VYBE PATCH` / `VYBE:` / `titlebar-actions-group`. |
| `src/vs/workbench/browser/parts/titlebar/media/titlebarpart.css` | **VYBE PATCH:** Title bar split layout — `.titlebar-actions-group` (flex, gap 10px, margin-right 8px), `.action-toolbar-editor-container`, `.titlebar-divider` (16px height, button background), rules for when container is inside group. Search for `VYBE PATCH` / `titlebar-actions-group`. |
| `src/vs/workbench/contrib/vybeTitlebar/` | **VYBE (new contrib):** `createVybeTitleBarSettingsAction(host)`, `createVybeTitleBarAccountAction(host)` (account codicon), `getVybeLayoutControlEnabled()`, `VYBE_USE_TITLEBAR_SETTINGS_BUTTON`; `VybeAccountDropdown` (placeholder dropdown, content TBD per specs). |

**Title bar: editor actions | divider | Vybe Settings/Account (merge-safe patches)**  
When `VYBE_USE_TITLEBAR_SETTINGS_BUTTON`, editor actions sit left of a vertical divider, then Vybe Settings and Account on the right. All patches are marked with `VYBE PATCH (merge-safe)` or `VYBE:` in code; search for these and re-apply after upstream merge if the surrounding code changes.

- **editor.contribution.ts:** Editor tab bar right-click no longer shows "Editor Actions Position" submenu (editor actions stay in title bar only).
- **workbench.contribution.ts:** Default for `workbench.editor.editorActionsLocation` is Title Bar (not default/Tab Bar).
- **titlebarPart.ts:** Single wrapper `.titlebar-actions-group` containing editor toolbar container, divider div, and action toolbar container; two `WorkbenchToolBar` instances when VYBE; editor actions go to left toolbar only; right toolbar gets Settings + Account; context/actionRunner set per toolbar.
- **titlebarpart.css:** Styles for `.titlebar-actions-group` (flex, gap 10px, margin-right 8px), editor container, divider (1px × 16px, `var(--vscode-button-background)`), and action-toolbar-container when inside the group.

| `src/vs/workbench/contrib/vybeDropdown/` | **VYBE (shared dropdown):** `vybeDropdownTokens.ts` (layout/sizing), `vybeDropdownTheme.ts` (theme colors from menu/list tokens), `vybeDropdownPanel.ts` (`showVybeDropdownPanel` reusable shell). Used by VybeSettingsDropdown and can be used by vybeChat. |

| `src/vs/workbench/contrib/vybeResources/` | **VYBE (Resources):** Resources modal/menu (title "Resources"), tabs (Blog, Docs, Changelog, Messages), design tokens, editor input. Registered in workbench.common.main.ts. Keep entire folder on merge. |
| `src/vs/workbench/contrib/vybeTitlebar/` | **VYBE (title bar):** `createVybeTitleBarSettingsAction`, `createVybeTitleBarAccountAction`, `getVybeLayoutControlEnabled`, `VYBE_USE_TITLEBAR_SETTINGS_BUTTON`; VybeAccountDropdown. Keep entire folder on merge. |

## Theme extension (Vybe Dark / Vybe Light)

| Item | Notes |
|------|--------|
| `extensions/theme-vybe/` | New extension: Vybe Dark and Vybe Light themes (code + terminal ANSI from Cursor package). Keep entire folder on merge. |
| `extensions/theme-vybe/themes/vybe-dark-color-theme.json` | Includes `activityBar.border` and `sideBar.border` (Cursor originals omit activityBar.border). |
| `extensions/theme-vybe/themes/vybe-light-color-theme.json` | Includes `activityBar.border`. |
| `docs/THEME_COLORS_VYBE_VS_CURSOR_COMPARISON.md` | Comparison doc (Cursor package vs VYBE Desktop); reference only. |

No upstream equivalent; these are additive. After merge, ensure `extensions/theme-vybe/` is still present and not overwritten.

## Editor empty state (no folder open)

When `WorkbenchState.EMPTY` and tips enabled, the editor area shows a Vybe empty state (action buttons + recent projects) instead of the default letterpress + shortcuts.

| File | Change |
|------|--------|
| `src/vs/workbench/browser/parts/editor/editorGroupWatermark.ts` | **Empty state:** three buttons (Open project, Clone repo, Connect via SSH), recent projects list from `IWorkspacesService.getRecentlyOpened()`, "View all" runs `workbench.action.openRecent`. **Connect via SSH:** runs `workbench.action.remote.showMenu` (same as old VYBE; no install-on-click). Search for `VYBE PATCH (merge-safe)` or `workbench.action.remote.showMenu` to re-apply after merge. **Workspace state (folder open):** Vybe workspace watermark with button-style list: Show/Hide Agent Panel (Option+Cmd+B), Show/Hide Terminal (Cmd+J), Show/Hide Files (Shift+Cmd+E / Cmd+B), Search Files, Open Browser. Dynamic labels and keybindings via `IWorkbenchLayoutService`, `onDidChangePartVisibility`; `commandIdWhenVisible` / `keybindingCommandIdWhenVisible` for terminal and files. New deps: IWorkspacesService, IHostService, ICommandService, ILabelService, IWorkbenchLayoutService, SINGLE_WINDOW_PARTS. |
| `src/vs/workbench/browser/parts/editor/media/editorgroupview.css` | Styles for `.vybe-empty-state*`, `.vybe-empty-state-visible`; and for `.vybe-workspace-state`, `.vybe-workspace-buttons`, `.vybe-workspace-button`, keybinding chips. |

Reference: `docs/editor-watermark-no-repo-cursor-reference.md`. After merge, re-apply or re-verify these edits if upstream changes the watermark or editor group CSS.

## Product and workbench registration

| File | Change |
|------|--------|
| `product.json` | `extensionsGallery` block (serviceUrl, itemUrl, controlUrl, recommendationsUrl) for VS Code marketplace. **Built-in Remote-SSH:** `builtInExtensions` includes `ms-vscode-remote.remote-ssh` with `vsix` and `sha256` pointing to `build/remote-ssh/ms-vscode-remote.remote-ssh-0.113.1.vsix`. Do not drop this entry or the `vsix`/`sha256` on merge. |
| `src/vs/workbench/workbench.common.main.ts` | Import and register `./contrib/vybeSettings/browser/vybeSettings.contribution.js` and `./contrib/vybeResources/browser/vybeResources.contribution.js`. |

After merge, re-add the VYBE Settings and Vybe Resources imports if upstream adds new contributions; ensure product.json `extensionsGallery` and `builtInExtensions` (including Remote-SSH vsix) are not overwritten.

## Remote-SSH prepackaging (built-in extension)

Remote-SSH is bundled so DMG/EXE builds ship it without user install.

| Item | Notes |
|------|--------|
| `product.json` | `builtInExtensions` entry for `ms-vscode-remote.remote-ssh` with `"vsix": "build/remote-ssh/ms-vscode-remote.remote-ssh-0.113.1.vsix"` and `"sha256": "fedcb28dfddfaae5268dd117ec6caddcc0a1ce7d6a31b8a3c9e8fc2ec92de92a"`. |
| `build/remote-ssh/ms-vscode-remote.remote-ssh-0.113.1.vsix` | Commit this file (Zip format; marketplace returns gzip, script decompresses). Required for packaged build. |
| `scripts/download-remote-ssh-vsix.sh` | Downloads vsix from marketplace, decompresses if gzip, writes to `build/remote-ssh/`, prints SHA256. Run to refresh vsix/version; then update product.json `sha256` and optionally `version`/vsix path. |

Reference: `docs/SHIP_REMOTE_SSH_LIKE_CURSOR.md`. After merge, re-verify the `builtInExtensions` entry and that the script still matches marketplace URL/headers.

## Build and product (hygiene)

| File | Change |
|------|--------|
| `build/hygiene.ts` | **VYBE PATCH (merge-safe):** Upstream errors if `product.json` contains `extensionsGallery`. Comment out the `if (product.extensionsGallery)` block and add `// VYBE PATCH (merge-safe): Allow extensionsGallery`. Re-apply if upstream restores the check. |

After merge, re-apply the hygiene change so `npm run hygiene` (or gulp hygiene) does not fail on product.json.

## Vybe Settings (contrib)

Custom Settings UI contribution. Not in upstream.

| Item | Notes |
|------|--------|
| `src/vs/workbench/contrib/vybeSettings/` | New contrib: Vybe Settings editor, dropdown, tabs (General, Models, Agents, Beta, Cloud Agents, Indexing Docs, Network, Rules/Commands, Tools/MCP, Plan Usage, Docs, Hooks, Plugins, Marketplace, etc.), design tokens, theme utils, stubs (indexService, indexingConfiguration, modelHoverPopup, vybeLLMModelService). |
| `src/vs/workbench/workbench.common.main.ts` | Registers vybeSettings contribution (see above). |

Keep entire `contrib/vybeSettings/` on merge. Reference: `docs/vybe-settings-plan-usage-dom-reference.md`, `docs/vybe-settings-sidebar-comparison.md`, `docs/vybe-settings-scroll-issue-identification.md`.

## Indexing stubs (services)

| Item | Notes |
|------|--------|
| `src/vs/workbench/services/indexing/` | Stub implementations: `indexService.ts`, `indexingConfiguration.ts`, `stubIndexService.ts`, `indexingStub.contribution.ts`. Used by vybeSettings and others. |

Additive; no upstream equivalent. Keep on merge.

## Docs (reference only)

| File | Purpose |
|------|---------|
| `docs/MERGE_UPSTREAM.md` | This file: merge checklist and overlay index. |
| `docs/SHIP_REMOTE_SSH_LIKE_CURSOR.md` | How to ship Remote-SSH (Option A: vsix in repo; Option B: fork). |
| `docs/THEME_COLORS_VYBE_VS_CURSOR_COMPARISON.md` | Theme color comparison (Cursor vs VYBE). |
| `docs/editor-watermark-no-repo-cursor-reference.md` | Editor watermark (empty + workspace) reference. |
| `docs/vybe-settings-plan-usage-dom-reference.md` | Vybe Settings plan/usage DOM reference. |
| `docs/vybe-settings-sidebar-comparison.md` | Vybe Settings sidebar comparison. |
| `docs/vybe-settings-scroll-issue-identification.md` | Scroll issue identification notes. |

## Patch comment summary (search terms for conflict resolution)

Use these to re-find VYBE blocks after resolving merge conflicts:

| File | Search for |
|------|------------|
| `editor.contribution.ts` | `VYBE PATCH (merge-safe)` or `Editor Actions Position` |
| `workbench.contribution.ts` | `VYBE PATCH (merge-safe)` or `EDITOR_ACTIONS_LOCATION` |
| `titlebarPart.ts` | `VYBE PATCH` or `titlebar-actions-group` or `VybeSettingsDropdown` |
| `titlebarpart.css` | `VYBE PATCH (merge-safe)` or `titlebar-actions-group` |
| `editorGroupWatermark.ts` | `VYBE PATCH (merge-safe)` or `workbench.action.remote.showMenu` |
| `build/hygiene.ts` | `VYBE PATCH (merge-safe)` or `extensionsGallery` |
| Other overlay (activitybar, statusbar, compositeBar*, etc.) | `VYBE:` |

## After merging upstream

1. **Re-apply patches** (if you use `git format-patch`):  
   `git apply --check scripts/vybe-patches/*.patch` then `git apply scripts/vybe-patches/*.patch`  
   Resolve any conflicts in the overlay files above.

2. **Or manually verify** that the VYBE blocks in those files are still present and correct:
   - **Title bar split:** `editor.contribution.ts`, `workbench.contribution.ts`, `titlebarPart.ts`, `titlebarpart.css` — search for `VYBE PATCH` / `titlebar-actions-group`.
   - **Editor empty state / Connect via SSH:** `editorGroupWatermark.ts` — search for `VYBE PATCH (merge-safe)` or `workbench.action.remote.showMenu`; ensure Connect via SSH runs Remote menu, not install-on-click.
   - **Product/build:** `product.json` — keep `extensionsGallery` and `builtInExtensions` (including Remote-SSH vsix entry). `build/hygiene.ts` — keep the `extensionsGallery` check commented out; search for `VYBE PATCH (merge-safe)`.

3. **New contribs:** Ensure `src/vs/workbench/contrib/vybeResources/`, `vybeDropdown/`, `vybeTitlebar/` are still present and that `workbench.common.main.ts` still imports vybeSettings and vybeResources.

4. **Re-export patches** (optional): after resolving conflicts, regenerate patches so the next merge is clean.

5. Run build/tests as usual.

---

## Commit categorization (standard format)

Use this to group uncommitted changes into logical commits. Format: **type(scope): short description**.

**Types:** `feat` (user-facing), `fix`, `docs`, `style` (UI/CSS, no logic), `refactor`, `chore` (config, build, tooling).

**Suggested commits (in order):**

| Commit | Files | Message |
|--------|--------|--------|
| 1 | `product.json` | `chore(product): add extensionsGallery and builtIn Remote-SSH (vsix + sha256)` |
| 2 | `build/remote-ssh/*.vsix` (if committed) | `chore(build): add Remote-SSH vsix for prepackaged extension` |
| 3 | `scripts/download-remote-ssh-vsix.sh` | `chore(scripts): add script to download and decompress Remote-SSH vsix` |
| 4 | `build/hygiene.ts` | `chore(build): allow extensionsGallery in product.json (VYBE PATCH)` |
| 5 | `src/vs/workbench/services/indexing/**` | `feat(indexing): add indexing stub service and contribution` |
| 6 | `src/vs/workbench/contrib/vybeSettings/**`, `workbench.common.main.ts` (vybeSettings import) | `feat(vybeSettings): add Vybe Settings contrib (editor, tabs, dropdown, stubs)` |
| 7 | `src/vs/workbench/contrib/vybeResources/**`, `workbench.common.main.ts` (vybeResources import) | `feat(vybeResources): add Resources contrib (modal, tabs: Blog, Docs, Changelog, Messages)` |
| 8 | `src/vs/workbench/contrib/vybeDropdown/**`, `contrib/vybeTitlebar/**` | `feat(workbench): add vybeDropdown (shared panel) and vybeTitlebar contribs` |
| 9 | `extensions/theme-vybe/**` | `feat(themes): add theme-vybe extension (Vybe Dark, Vybe Light)` |
| 10 | All overlay files in "VYBE overlay files" table (workbench.contribution, activitybar, statusbar, compositeBar*, paneComposite*, panel, auxiliarybar) | `style(workbench): VYBE overlay — compact activity bar, tab style, statusbar, sidebar padding` |
| 11 | `editor.contribution.ts`, `workbench.contribution.ts`, `titlebarPart.ts`, `titlebarpart.css` | `feat(titlebar): editor actions in title bar + divider + Vybe Settings/Account; hide Editor Actions Position; default to title bar` |
| 12 | `editorGroupWatermark.ts`, `editorgroupview.css` | `feat(editor): Vybe empty state and workspace watermark; Connect via SSH opens Remote menu (VYBE PATCH)` |
| 13 | `docs/**` | `docs: MERGE_UPSTREAM, Remote-SSH, theme comparison, editor watermark, vybe-settings references` |

**One-liner for commit message body (optional):**  
`See docs/MERGE_UPSTREAM.md for overlay index and re-apply checklist.`
