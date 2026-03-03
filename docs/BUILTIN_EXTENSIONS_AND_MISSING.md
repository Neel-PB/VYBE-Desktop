# Built-in Extensions: What We Have vs What Cursor/Others Do

## Cursor’s approach (from Cursor.app/Contents/Resources/app)

- **Same 3 builtInExtensions** in `product.json`: js-debug-companion, js-debug, vscode-js-profile-table. Cursor does **not** add Remote-SSH (or any remote) to `builtInExtensions`.
- **Remote features** come from:
  - `extensionReplacementMapForImports`: `ms-vscode-remote.remote-ssh` → `anysphere.remote-ssh` (and same for remote-containers, remote-wsl). So Cursor ships **their own fork** of the remote extensions under the `anysphere.*` namespace and redirects marketplace/imports to those.
  - Their **marketplace** (`marketplace.cursorapi.com`) serves `anysphere.remote-ssh` etc., so the “Connect via SSH” flow works without hiding the button.
- So Cursor doesn’t “bundle” Microsoft’s Remote-SSH; they replace it with their fork and their marketplace. The watermark “Connect via SSH” button is **always shown** and works because the command is provided by their fork (installed or pre-installed from their gallery).

## What we do in VYBE-Desktop

1. **Watermark**  
   The “Connect via SSH” button is **always shown** (like Cursor). On click:
   - If `remote-ssh.connect` exists → run it.
   - Otherwise → run `workbench.extensions.installExtension('ms-vscode-remote.remote-ssh')` then `remote-ssh.connect`, so one click can install + connect when the extension isn’t present.

2. **Optional built-in bundle**  
   `product.json` → `builtInExtensions` includes **ms-vscode-remote.remote-ssh** (version 0.113.1, `sha256` left empty so the build skips checksum verification). The build downloads it from the VS Code marketplace when `extensionsGallery.serviceUrl` is set. If your build doesn’t have marketplace access or the version is unavailable, remove that entry; the install-on-click flow above still works.

---

## Original OSS baseline

VYBE-Desktop (and upstream Code - OSS) previously shipped with **only 3 built-in extensions** in `product.json` → `builtInExtensions`:

| Extension | Purpose |
|-----------|--------|
| `ms-vscode.js-debug-companion` | JS debug companion |
| `ms-vscode.js-debug` | JavaScript debugger |
| `ms-vscode.vscode-js-profile-table` | JS profile table |
| `ms-vscode-remote.remote-ssh` | Remote - SSH (Connect via SSH); optional – install-on-click works if build doesn’t bundle it |

Microsoft’s Visual Studio Code distribution is built from the same OSS repo but uses a **different, private `product.json`** that adds more built-in extensions and config. The public repo does not contain that full list.

---

## Extensions Microsoft typically bundles (not in OSS)

These are the main ones that are **not** in the OSS `builtInExtensions` list but are part of the official VS Code experience. Users can still install them from the Marketplace if your app has the gallery enabled.

### Remote development (proprietary-licensed by Microsoft)

| Extension ID | Name | Notes |
|--------------|------|--------|
| `ms-vscode-remote.remote-ssh` | Remote - SSH | Connect to hosts via SSH. Command: `remote-ssh.connect`. **We guard the watermark button** so it only shows when this command exists. |
| `ms-vscode-remote.remote-containers` | Dev Containers | Develop inside Docker containers. |
| `ms-vscode-remote.remote-wsl` | WSL | Use Windows Subsystem for Linux. |
| `ms-vscode.remote-server` | Remote - Tunnels | Connect via VS Code Tunnels. |

Pack: **Remote Development** = `ms-vscode-remote.vscode-remote-extensionpack` (installs the above).

### Others Microsoft may add in their build

- **Extension recommendations** in `product.json` (curated “important”/“general” extensions installed from Marketplace).
- **Proposed-API extensions**: a list of extension IDs allowed to use proposed APIs.
- **C# / .NET debugger** and similar: some debug adapters are restricted to the VS family.

The exact list is in Microsoft’s private build config, not in the OSS repo.

---

## Commands in our codebase that depend on “extra” extensions

| Command | Extension / source | Guarded? |
|---------|--------------------|----------|
| `remote-ssh.connect` | Remote - SSH (built-in in Microsoft build only) | ✅ Yes – watermark “Connect via SSH” only added if command exists |
| `git.clone` | In-repo `extensions/git` | ✅ Always present |
| `github.checkOpenPullRequest` | In-repo `extensions/github` | ❌ No – `.catch(() => {})` used so failure is silent |
| `github.copilot.debug.showChatLogView` | GitHub Copilot (user/default agent) | ❌ No – only runs when Copilot is default chat agent |

So the only one that was surfacing as a **user-visible error** was `remote-ssh.connect`; that’s fixed by conditionally showing the button.

---

## Do we need to add more built-in extensions?

- **For parity with Microsoft’s download:** You’d need their full `builtInExtensions` (and other product.json customizations). That list isn’t public; the main known additions are the **Remote** pack above and possibly a few others.
- **For a good OSS-based product:** The current 3 are enough for core editing/debugging. Remote and Copilot are usually **user-installed** or **recommended** from the Marketplace.
- **If you want “Connect via SSH” to work without user install:** Add **Remote - SSH** to `builtInExtensions` in `product.json` (with the same shape as the existing entries: `name`, `version`, `sha256`, `repo` or marketplace metadata). You’ll need to pick a version and possibly host/cache the extension for your build.

---

## References

- [VS Code wiki: Differences between the repository and Visual Studio Code](https://github.com/microsoft/vscode/wiki/Differences-between-the-repository-and-Visual-Studio-Code)
- [Remote Development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
- [Microsoft extension licenses (OSS vs proprietary)](https://code.visualstudio.com/docs/supporting/oss-extensions)
