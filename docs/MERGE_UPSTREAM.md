# Merging from VS Code main (upstream)

When pulling from `upstream/main`, re-apply or re-verify VYBE overlay changes so they are not lost.

**Patch markers:** Search for `VYBE:` or `VYBE PATCH (merge-safe)` (or `VYBE PATCH:`) in the repo to find all overlay comments. After resolving merge conflicts, re-apply any lost VYBE blocks using these search terms.

## Overlay checklist for merge

Before merging upstream, verify each of the following is either (a) in the overlay table below with a patch hint, or (b) a new VYBE-only file (keep on merge). Also ensure **`product.json`** (builtInExtensions + extensionsGallery) and **`build/remote-ssh/*.vsix`** (if committed) are in the merge scope. **`build/hygiene.ts`** must allow `extensionsGallery` (see Build & product section).

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
| `src/vs/workbench/browser/parts/compositeBarActions.ts` | VYBE tab DOM (class, label wrapper, truncation), updateStyles skip, _updateTruncationClass; **VYBE chat tab close button** (`data-vybe-chat` attr, close codicon, hover show/hide, `vybeChat.closeChat` command). Search for `VYBE:` / `data-vybe-chat`. |
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

| `src/vs/workbench/contrib/vybeDropdown/` | **VYBE (shared dropdown):** `vybeDropdownTokens.ts` (layout/sizing + shadow tokens), `vybeDropdownTheme.ts` (theme colors from menu/list tokens + theme-aware shadow), `vybeDropdownPanel.ts` (`showVybeDropdownPanel` reusable shell). Used by VybeSettingsDropdown and vybeChat. |

| `src/vs/workbench/contrib/vybeResources/` | **VYBE (Resources):** Resources modal/menu (title "Resources"), tabs (Blog, Docs, Changelog, Messages), design tokens, editor input. Registered in workbench.common.main.ts. Keep entire folder on merge. |
| `src/vs/workbench/contrib/vybeTitlebar/` | **VYBE (title bar):** `createVybeTitleBarSettingsAction`, `createVybeTitleBarAccountAction`, `getVybeLayoutControlEnabled`, `VYBE_USE_TITLEBAR_SETTINGS_BUTTON`; VybeAccountDropdown. Keep entire folder on merge. |
| `src/vs/workbench/contrib/chat/browser/chatParticipant.contribution.ts` | **VYBE:** Native VS Code chat view/container registration disabled (block-commented). Vybe Chat replaces it. Search for `VYBE:` to re-apply after merge. Keep the `chatParticipantExtensionPoint` and contribution class active; only the view container + view descriptor registration is commented out. |
| `src/vs/workbench/contrib/codeEditor/browser/emptyTextEditorHint/emptyTextEditorHint.ts` | **VYBE PATCH (merge-safe):** Simplified empty editor hint text ("Press ⌘K to generate code. Start typing to dismiss.") matching Cursor style. Search for `VYBE PATCH` / `emptyTextEditorHintWithInlineChat`. |
| `src/vs/workbench/contrib/inlineChat/browser/inlineChat.contribution.ts` | **VYBE PATCH (merge-safe):** `StartSessionAction` (⌘I) disabled — replaced by `vybeInlineComposer.start`. Search for `VYBE PATCH` / `StartSessionAction`. |
| `src/vs/workbench/contrib/terminal/terminal.all.ts` | **VYBE:** Three terminal contrib imports disabled: `chatAgentTools`, `chat`, and `inlineHint` — replaced by `vybeTerminal` prompt bar. Search for `VYBE:` comments. |
| `src/vs/workbench/contrib/vybeInlineComposer/` | **VYBE (inline composer):** Lexical-based inline editor composer (replaces VS Code's Monaco-based inline chat input). Registered in `workbench.common.main.ts`. Keep entire folder on merge. |
| `src/vs/workbench/contrib/vybeEditor/` | **VYBE (editor contrib):** Editor-scoped VYBE contributions (inline composer controller). Registered in `workbench.common.main.ts`. Keep entire folder on merge. |
| `src/vs/workbench/contrib/vybeTerminal/` | **VYBE (terminal contrib):** Terminal prompt bar composer (hint bar + expanded composer with Lexical, Generate Command / Quick Question modes). Replaces VS Code terminal chat and initial hint. Registered in `workbench.common.main.ts`. Keep entire folder on merge. |

## Vendored Lexical editor

Lexical (rich-text editor framework) is bundled as a vendored ESM file for use in VS Code's browser context (which cannot resolve bare npm specifiers).

| Item | Notes |
|------|--------|
| `package.json` | `lexical`, `@lexical/clipboard`, `@lexical/history`, `@lexical/plain-text`, `@lexical/selection`, `@lexical/utils` (^0.41.0) added to dependencies. |
| `build/scripts/bundle-lexical.sh` | Bundles all Lexical packages into a single vendored ESM file via esbuild. Run from repo root: `bash build/scripts/bundle-lexical.sh`. |
| `src/vs/base/common/lexical/lexical.js` | Generated vendored bundle (~587KB). **DO NOT EDIT** — regenerate with the build script. |
| `src/vs/base/common/lexical/lexical.d.ts` | TypeScript declarations re-exporting types from npm packages (resolved at compile time). Update when adding new Lexical exports. |

Additive; no upstream equivalent. After merge, ensure Lexical deps in `package.json` and the `src/vs/base/common/lexical/` directory are preserved. If Lexical version changes, re-run `bundle-lexical.sh`.

## VYBE Chat (contrib)

Custom chat UI replacing VS Code's native chat panel. Includes Lexical-based composer with mention pills, model dropdown, image attachments, session management, history, and past chats.

| Item | Notes |
|------|--------|
| `src/vs/workbench/contrib/vybeChat/` | **VYBE (new contrib):** Full chat implementation — composer (Lexical editor, mention pills, context pills, model dropdown, image attachments), chat view pane, actions, contribution registrations (chat, sessions, initialization, conversation index, participant), design tokens, dropdown theme/tokens, history command runner, past chats panel, sessions service, constants, icon. Keep entire folder on merge. |
| `src/vs/workbench/contrib/chat/browser/chatParticipant.contribution.ts` | **VYBE overlay:** Native chat view/container registration block-commented. Search for `VYBE:` comments. The `chatParticipantExtensionPoint` and `ChatExtensionPointHandler` contribution class remain active. |
| `src/vs/workbench/workbench.common.main.ts` | Registers `./contrib/vybeChat/browser/contribution/vybeChat.contribution.js`. |

After merge, ensure `contrib/vybeChat/` is preserved. Re-verify `chatParticipant.contribution.ts` overlay (search for `VYBE:`) and `workbench.common.main.ts` vybeChat import.

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
| `src/vs/workbench/workbench.common.main.ts` | Import and register `./contrib/vybeChat/browser/contribution/vybeChat.contribution.js`, `./contrib/vybeEditor/browser/vybeEditor.contribution.js`, `./contrib/vybeTerminal/browser/vybeTerminal.contribution.js`, `./contrib/vybeSettings/browser/vybeSettings.contribution.js`, and `./contrib/vybeResources/browser/vybeResources.contribution.js`. |

After merge, re-add the VYBE Chat, VYBE Editor, VYBE Terminal, VYBE Settings, and Vybe Resources imports if upstream adds new contributions; ensure product.json `extensionsGallery` and `builtInExtensions` (including Remote-SSH vsix) are not overwritten.

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
| `src/vs/workbench/contrib/vybeSettings/` | New contrib: Vybe Settings editor, dropdown, tabs (General, Models, Agents, Beta, Cloud Agents, Indexing Docs, Network, Rules/Commands, Tools/MCP, Plan Usage, Docs, Hooks, Plugins, Marketplace, etc.), design tokens, theme utils, stubs (indexService, indexingConfiguration, modelHoverPopup, vybeLLMModelService). **Tab-specific commands:** `vybe.openSettingsEditor.models` and `vybe.openSettingsEditor.indexing-docs` open the editor to a specific tab via `VybeSettingsEditorInput(initialTabId)`. |
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
| `chatParticipant.contribution.ts` | `VYBE:` (block comment disabling native chat view) |
| `inlineChat.contribution.ts` | `VYBE PATCH (merge-safe)` or `StartSessionAction` |
| `terminal.all.ts` | `VYBE:` (disabled chatAgentTools, chat, inlineHint imports) |
| `emptyTextEditorHint.ts` | `VYBE PATCH (merge-safe)` or `emptyTextEditorHintWithInlineChat` |
| Other overlay (activitybar, statusbar, compositeBar*, etc.) | `VYBE:` |

## After merging upstream

1. **Re-apply patches** (if you use `git format-patch`):  
   `git apply --check scripts/vybe-patches/*.patch` then `git apply scripts/vybe-patches/*.patch`  
   Resolve any conflicts in the overlay files above.

2. **Or manually verify** that the VYBE blocks in those files are still present and correct:
   - **Title bar split:** `editor.contribution.ts`, `workbench.contribution.ts`, `titlebarPart.ts`, `titlebarpart.css` — search for `VYBE PATCH` / `titlebar-actions-group`.
   - **Editor empty state / Connect via SSH:** `editorGroupWatermark.ts` — search for `VYBE PATCH (merge-safe)` or `workbench.action.remote.showMenu`; ensure Connect via SSH runs Remote menu, not install-on-click.
   - **Product/build:** `product.json` — keep `extensionsGallery` and `builtInExtensions` (including Remote-SSH vsix entry). `build/hygiene.ts` — keep the `extensionsGallery` check commented out; search for `VYBE PATCH (merge-safe)`.
   - **Native chat disabled:** `chatParticipant.contribution.ts` — search for `VYBE:` and ensure the view container + view descriptor block remains commented out.
   - **Inline chat disabled:** `inlineChat.contribution.ts` — search for `VYBE PATCH` and ensure `StartSessionAction` remains commented out.
   - **Terminal chat/hint disabled:** `terminal.all.ts` — search for `VYBE:` and ensure `chatAgentTools`, `chat`, and `inlineHint` imports remain commented out.
   - **Empty editor hint:** `emptyTextEditorHint.ts` — search for `VYBE PATCH` and ensure simplified hint text is preserved.
   - **Lexical vendor:** `src/vs/base/common/lexical/` and `build/scripts/bundle-lexical.sh` — ensure preserved. If Lexical version bumped in `package.json`, re-run `bundle-lexical.sh`.

3. **New contribs:** Ensure `src/vs/workbench/contrib/vybeChat/`, `vybeEditor/`, `vybeTerminal/`, `vybeResources/`, `vybeDropdown/`, `vybeTitlebar/` are still present and that `workbench.common.main.ts` still imports vybeChat, vybeEditor, vybeTerminal, vybeSettings, and vybeResources.

4. **Re-export patches** (optional): after resolving conflicts, regenerate patches so the next merge is clean.

5. Run build/tests as usual.

---

## Commit categorization (standard format)

Use this to group uncommitted changes into logical commits. Format: **type(scope): short description**.

**Types:** `feat` (user-facing), `fix`, `docs`, `style` (UI/CSS, no logic), `refactor`, `chore` (config, build, tooling).

**One-liner for commit message body (optional):**  
`See docs/MERGE_UPSTREAM.md for overlay index and re-apply checklist.`
