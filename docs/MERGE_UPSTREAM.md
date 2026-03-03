# Merging from VS Code main (upstream)

When pulling from `upstream/main`, re-apply or re-verify VYBE overlay changes so they are not lost.

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
| `src/vs/workbench/contrib/vybeResources/` | **VYBE (new contrib):** Resources modal/editor (e.g. "Resources" title). Keep on merge. |

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
| `src/vs/workbench/browser/parts/editor/editorGroupWatermark.ts` | **Empty state:** three buttons (Open project, Clone repo, Connect via SSH), recent projects list from `IWorkspacesService.getRecentlyOpened()`, "View all" runs `workbench.action.openRecent`. **VYBE PATCH:** "Connect via SSH" runs `workbench.action.remote.showMenu` (opens Remote menu: SSH, WSL, etc.) — same as old VYBE; do not install-on-click. Search for `VYBE PATCH` / `connectSsh` / `workbench.action.remote.showMenu`. **Workspace state (folder open):** Vybe workspace watermark with button-style list: Show/Hide Agent Panel (Option+Cmd+B), Show/Hide Terminal (Cmd+J), Show/Hide Files (Shift+Cmd+E / Cmd+B), Search Files, Open Browser. Dynamic labels and keybindings via `IWorkbenchLayoutService`, `onDidChangePartVisibility`; `commandIdWhenVisible` / `keybindingCommandIdWhenVisible` for terminal and files. New deps: IWorkspacesService, IHostService, ICommandService, ILabelService, IWorkbenchLayoutService, SINGLE_WINDOW_PARTS. |
| `src/vs/workbench/browser/parts/editor/media/editorgroupview.css` | Styles for `.vybe-empty-state*`, `.vybe-empty-state-visible`; and for `.vybe-workspace-state`, `.vybe-workspace-buttons`, `.vybe-workspace-button`, keybinding chips. |

Reference: `docs/editor-watermark-no-repo-cursor-reference.md`. After merge, re-apply or re-verify these edits if upstream changes the watermark or editor group CSS.

## Product and workbench registration

| File | Change |
|------|--------|
| `product.json` | `extensionsGallery` block (serviceUrl, itemUrl, controlUrl, recommendationsUrl) for VS Code marketplace. **Built-in Remote-SSH:** `builtInExtensions` includes `ms-vscode-remote.remote-ssh` with `vsix`: `build/remote-ssh/ms-vscode-remote.remote-ssh-0.113.1.vsix` and matching `sha256` so the packaged app (DMG/EXE) ships with Remote-SSH. Do not remove; ensure vsix path and sha256 stay in sync with the file in repo. |
| `src/vs/workbench/workbench.common.main.ts` | Import and register `./contrib/vybeSettings/browser/vybeSettings.contribution.js` (and other VYBE contribs as listed). |

After merge, re-add the VYBE Settings import if upstream adds new contributions; ensure product.json extensionsGallery and builtInExtensions (including Remote-SSH vsix) are not overwritten.

## Built-in Remote-SSH (prepackaged for DMG/EXE)

| Item | Notes |
|------|--------|
| `product.json` → `builtInExtensions` | Entry for `ms-vscode-remote.remote-ssh` with `vsix` and `sha256`; build uses local vsix (no network). |
| `build/remote-ssh/ms-vscode-remote.remote-ssh-0.113.1.vsix` | Commit this file so CI/fresh clones can build; script decompresses marketplace gzip to valid zip. |
| `scripts/download-remote-ssh-vsix.sh` | One-time: download vsix (decompress if gzip), print SHA256; optional version arg. |
| `docs/SHIP_REMOTE_SSH_LIKE_CURSOR.md` | Options A (bundle Microsoft vsix) vs B (fork); steps and script usage. |

On merge, ensure the `builtInExtensions` entry and `build/remote-ssh/*.vsix` are not removed. If upstream changes `product.json` structure, re-add the Remote-SSH entry.

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
| `docs/THEME_COLORS_VYBE_VS_CURSOR_COMPARISON.md` | Theme color comparison (Cursor vs VYBE). |
| `docs/editor-watermark-no-repo-cursor-reference.md` | Editor watermark (empty + workspace) reference. |
| `docs/vybe-settings-plan-usage-dom-reference.md` | Vybe Settings plan/usage DOM reference. |
| `docs/vybe-settings-sidebar-comparison.md` | Vybe Settings sidebar comparison. |
| `docs/vybe-settings-scroll-issue-identification.md` | Scroll issue identification notes. |
| `docs/BUILTIN_EXTENSIONS_AND_MISSING.md` | Built-ins vs Microsoft; remote extensions; which commands need which extensions. |
| `docs/PRODUCT_JSON_VS_CURSOR.md` | product.json comparison with Cursor (built-ins, gallery, replacement map). |
| `docs/SHIP_REMOTE_SSH_LIKE_CURSOR.md` | How to ship Remote-SSH: Option A (bundle vsix) vs B (fork); script and product.json steps. |

## After merging upstream

1. **Re-apply patches** (if you use `git format-patch`):  
   `git apply --check scripts/vybe-patches/*.patch` then `git apply scripts/vybe-patches/*.patch`  
   Resolve any conflicts in the overlay files above.

2. **Or manually verify** that the VYBE blocks in those files are still present and correct. In particular, check the **title bar split** (editor actions | divider | Vybe Settings/Account): `editor.contribution.ts`, `workbench.contribution.ts`, `titlebarPart.ts`, `titlebarpart.css` — search for `VYBE PATCH` / `titlebar-actions-group`.

3. **Re-export patches** (optional): after resolving conflicts, regenerate patches so the next merge is clean.

4. Run build/tests as usual.

---

## Commit categorization (standard format)

Use this to group uncommitted changes into logical commits. Format: **type(scope): short description**.

**Types:** `feat` (user-facing), `fix`, `docs`, `style` (UI/CSS, no logic), `refactor`, `chore` (config, build, tooling).

**Suggested commits (in order):**

| Commit | Files | Message |
|--------|--------|--------|
| 1 | `product.json` | `chore(product): add extensionsGallery for VS Code marketplace` |
| 2 | `src/vs/workbench/services/indexing/**` | `feat(indexing): add indexing stub service and contribution` |
| 3 | `src/vs/workbench/contrib/vybeSettings/**`, `src/vs/workbench/workbench.common.main.ts` | `feat(vybeSettings): add Vybe Settings contrib (editor, tabs, dropdown, stubs)` |
| 4 | `extensions/theme-vybe/**` | `feat(themes): add theme-vybe extension (Vybe Dark, Vybe Light)` |
| 5 | All overlay files in "VYBE overlay files" table (workbench.contribution, activitybar, statusbar, compositeBar*, paneComposite*, panel, auxiliarybar) | `style(workbench): VYBE overlay — compact activity bar, tab style, statusbar, sidebar padding` |
| 6 | `editor.contribution.ts`, `workbench.contribution.ts`, `titlebarPart.ts`, `titlebarpart.css` | `feat(titlebar): editor actions | divider | Vybe Settings/Account; hide Editor Actions Position from tab bar; default editor actions to title bar` |
| 7 | `editorGroupWatermark.ts`, `editorgroupview.css` | `feat(editor): Vybe empty state and workspace watermark (shortcuts, Show/Hide Agent/Terminal/Files, Open Browser); Connect via SSH opens remote menu (VYBE PATCH)` |
| 8 | `docs/**` | `docs: add MERGE_UPSTREAM, theme comparison, editor watermark, vybe-settings references, Remote-SSH and built-in extension docs` |
| 9 | `product.json` (builtInExtensions + vsix), `build/remote-ssh/*.vsix`, `scripts/download-remote-ssh-vsix.sh` | `chore(product): bundle Remote-SSH as built-in extension (vsix + sha256); add download script` |

**One-liner for commit message body (optional):**  
`See docs/MERGE_UPSTREAM.md for overlay index and re-apply checklist.`
