# product.json: VYBE-Desktop vs Cursor

Straightforward comparison and what to do.

---

## What Cursor does (no extra built-ins, no user download)

- **builtInExtensions:** Same 3 as OSS: `js-debug-companion`, `js-debug`, `vscode-js-profile-table`. **Cursor does NOT add Remote-SSH (or any remote) here.**
- **extensionsGallery:** Points to **Cursor’s marketplace** (`marketplace.cursorapi.com`). So extensions are installed from their gallery.
- **extensionReplacementMapForImports:** When the app or another extension asks for `ms-vscode-remote.remote-ssh`, Cursor substitutes **`anysphere.remote-ssh`** (their fork). That fork is **hosted on their marketplace**, so when the user has “Remote - SSH” it’s actually Cursor’s build from their gallery. No built-in download; it comes from their marketplace.

So in Cursor, “Connect via SSH” works because:
1. The command `remote-ssh.connect` is provided by the extension.
2. That extension is **anysphere.remote-ssh** (via the replacement map), served from **marketplace.cursorapi.com**, not bundled in the app.

---

## Differences that matter for “Connect via SSH”

| Aspect | Cursor | Ours (current) | What to do |
|--------|--------|----------------|------------|
| **builtInExtensions** | 3 only (no remote-ssh) | 4 (we added remote-ssh) | **Remove** the `ms-vscode-remote.remote-ssh` entry so we match Cursor (3 only). |
| **extensionReplacementMapForImports** | Yes: `ms-vscode-remote.remote-ssh` → `anysphere.remote-ssh` | Not present | **Don’t add** unless we have our own fork + marketplace. We use Microsoft’s extension. |
| **extensionsGallery** | `marketplace.cursorapi.com` | `marketplace.visualstudio.com` | **Keep** VS marketplace so users can install Microsoft’s Remote-SSH from there. |
| **Watermark button** | Always shown; command from extension (theirs) | Was: hide or install-on-click | **Show button only when** `remote-ssh.connect` is registered (extension already installed). No install-on-click, no download flow. |

---

## What we should do (straightforward)

1. **product.json**
   - **Remove** the `ms-vscode-remote.remote-ssh` entry from `builtInExtensions` (back to 3, like Cursor).
   - **Do not** add `extensionReplacementMapForImports` (we don’t have a Vybe fork of remote-ssh or a Vybe marketplace for it).
   - **Keep** `extensionsGallery` as VS Code marketplace so users can install Microsoft’s Remote-SSH if they want.

2. **Watermark**
   - **Show “Connect via SSH” only when** the command `remote-ssh.connect` exists (i.e. Remote-SSH extension is already installed).
   - **Do not** trigger install or any download on click. Just run the command when it’s there.

Result: Same as Cursor in spirit—no extra built-ins, no in-app download. Button appears only when the user (or their environment) has already installed the extension from the marketplace.

---

## Other Cursor-only keys (we can ignore for this)

Cursor has many keys we don’t need for this flow, e.g.:

- `quality`, `vscodeVersion`, `serverDownloadUrlTemplate`, `aiConfig`, `statsig*`, `downloadUrl`, `updateUrl`, `releaseNotesUrl`
- `extensionMaxVersions`, `getExtensionOverrides`, `skipPackagingLocalExtensions`, `cannotImportExtensions`
- `trustedExtensionPublishers`, `extensionRecommendations`, `extensionEnabledApiProposals`, `linkProtectionTrustedDomains`, `commonlyUsedSettings`
- `gitHubEntitlement`, `aiGeneratedWorkspaceTrust`, `cursorTrustedExtensionAuthAccess`, `trustedExtensionProtocolHandlers`
- Different branding: `nameShort`, `applicationName`, `dataFolderName`, `darwinBundleIdentifier`, etc.

None of these are required to get “Connect via SSH” to behave like Cursor (show when available, no download).
