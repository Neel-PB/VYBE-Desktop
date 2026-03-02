# Merging from VS Code main (upstream)

When pulling from `upstream/main`, re-apply or re-verify VYBE overlay changes so they are not lost.

## VYBE overlay files (customizations)

Search for `VYBE:` in the repo to find all overlay comments. Current overlay files:

| File | Change |
|------|--------|
| `src/vs/workbench/browser/workbench.contribution.ts` | `workbench.activityBar.compact` default `true` |
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
| `src/vs/workbench/browser/parts/editor/editorGroupWatermark.ts` | **Empty state:** three buttons (Open project, Clone repo, Connect via SSH), recent projects list from `IWorkspacesService.getRecentlyOpened()`, "View all" runs `workbench.action.openRecent`. **Workspace state (folder open):** Vybe workspace watermark with button-style list: Show/Hide Agent Panel (Option+Cmd+B), Show/Hide Terminal (Cmd+J), Show/Hide Files (Shift+Cmd+E / Cmd+B), Search Files, Open Browser. Dynamic labels and keybindings via `IWorkbenchLayoutService`, `onDidChangePartVisibility`; `commandIdWhenVisible` / `keybindingCommandIdWhenVisible` for terminal and files. New deps: IWorkspacesService, IHostService, ICommandService, ILabelService, IWorkbenchLayoutService, SINGLE_WINDOW_PARTS. |
| `src/vs/workbench/browser/parts/editor/media/editorgroupview.css` | Styles for `.vybe-empty-state*`, `.vybe-empty-state-visible`; and for `.vybe-workspace-state`, `.vybe-workspace-buttons`, `.vybe-workspace-button`, keybinding chips. |

Reference: `docs/editor-watermark-no-repo-cursor-reference.md`. After merge, re-apply or re-verify these edits if upstream changes the watermark or editor group CSS.

## Product and workbench registration

| File | Change |
|------|--------|
| `product.json` | `extensionsGallery` block (serviceUrl, itemUrl, controlUrl, recommendationsUrl) for VS Code marketplace. |
| `src/vs/workbench/workbench.common.main.ts` | Import and register `./contrib/vybeSettings/browser/vybeSettings.contribution.js`. |

After merge, re-add the VYBE Settings import if upstream adds new contributions; ensure product.json extensionsGallery is not overwritten.

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

## After merging upstream

1. **Re-apply patches** (if you use `git format-patch`):  
   `git apply --check scripts/vybe-patches/*.patch` then `git apply scripts/vybe-patches/*.patch`  
   Resolve any conflicts in the overlay files above.

2. **Or manually verify** that the VYBE blocks in those files are still present and correct.

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
| 6 | `editorGroupWatermark.ts`, `editorgroupview.css` | `feat(editor): Vybe empty state and workspace watermark (shortcuts, Show/Hide Agent/Terminal/Files, Open Browser)` |
| 7 | `docs/**` | `docs: add MERGE_UPSTREAM, theme comparison, editor watermark and vybe-settings references` |

**One-liner for commit message body (optional):**  
`See docs/MERGE_UPSTREAM.md for overlay index and re-apply checklist.`
