# Ship Remote-SSH Like Cursor – What You Need To Do

Cursor ships with “Connect via SSH” working. To ship the same in VYBE-Desktop you have two options. **Option A is the one that needs no fork and minimal steps.**

---

## Option A: Bundle Microsoft’s Remote-SSH (no fork) – recommended

**Idea:** Ship the official Microsoft Remote-SSH extension inside the app (built-in). One-time setup, then every build has it. No fork, no rename, no custom marketplace.

**What you do:**

1. **Download the extension once (one-time)**  
   From: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh  
   - Click “Download Extension” (or use the “Version History” tab to get a specific version, e.g. 0.113.1).  
   - You get a `.vsix` file.

2. **Put the vsix in the repo**  
   - **Easiest:** run from repo root:
     ```bash
     ./scripts/download-remote-ssh-vsix.sh
     ```
     This downloads the vsix to `build/remote-ssh/ms-vscode-remote.remote-ssh-0.113.1.vsix` and prints its SHA256.  
   - **Or** download manually from the [marketplace page](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh), save as `build/remote-ssh/ms-vscode-remote.remote-ssh-0.113.1.vsix`, then run:
     ```bash
     shasum -a 256 build/remote-ssh/ms-vscode-remote.remote-ssh-0.113.1.vsix
     ```
     and copy the hex string.

3. **Update `product.json`**  
   In `builtInExtensions`, the entry for `ms-vscode-remote.remote-ssh` should use the local vsix and the correct `sha256`. Set:
   - `"vsix": "build/remote-ssh/ms-vscode-remote.remote-ssh-0.113.1.vsix"`
   - `"sha256": "<paste the SHA256 from the script or shasum output>"`
   - Keep `version` and `metadata` as they are (e.g. version `0.113.1`).

4. **Build**  
   Run your normal build. It will use the local vsix (no download). The app will ship with Remote-SSH; “Connect via SSH” will work like Cursor.

**No fork, no rename, no marketplace to run.** You only add one file to the repo and one `vsix` + `sha256` in `product.json`. If you want, we can add a small script that downloads the vsix and prints the sha256 so you don’t have to do it by hand.

---

## Option B: Fork and ship your own (like Cursor’s anysphere.remote-ssh)

**Idea:** Fork the remote-ssh repo, rename to your own extension (e.g. `vybe.remote-ssh`), then either bundle it in the app or host it on your own marketplace.

**What you do:**

1. **Fork the repo**  
   - https://github.com/microsoft/vscode-remote-release  
   - The Remote-SSH code lives in a subfolder of this monorepo (e.g. `remote-ssh/`). You may need to copy that out into its own repo or build from the monorepo.

2. **Rename / repackage**  
   - In the extension’s `package.json`: set `"name": "remote-ssh"` and use your publisher (e.g. `"publisher": "vybe"`) so the full ID is `vybe.remote-ssh`.  
   - Update any branding/strings you want.

3. **Build the vsix**  
   - Install deps, run the extension’s build script, then run `vsce package` (or your packager) to produce a `.vsix`.

4. **Ship it**  
   - **Either:**  
     - Put that vsix in the repo (e.g. `build/remote-ssh/vybe.remote-ssh-0.113.1.vsix`), add a `builtInExtensions` entry with `"name": "vybe.remote-ssh"`, `"vsix": "build/remote-ssh/vybe.remote-ssh-0.113.1.vsix"`, and the correct `sha256`.  
   - **Or:**  
     - Publish that vsix to your own marketplace (or Open VSX), point `extensionsGallery` in `product.json` to that marketplace, and add:
       - `"extensionReplacementMapForImports": { "ms-vscode-remote.remote-ssh": "vybe.remote-ssh" }`  
       so that when the UI asks for Remote-SSH, your extension is used. Then users “install” it from your gallery (or you pre-bundle it).

5. **Maintain**  
   - You own the fork: you pull upstream when you want and fix bugs/features yourself.

**Summary:** Fork → rename to `vybe.remote-ssh` → build vsix → either bundle via `builtInExtensions` + `vsix` or publish to your marketplace and use `extensionReplacementMapForImports` + `extensionsGallery`.

---

## What we do in code (same for both options)

- **Watermark:** “Connect via SSH” is shown and runs `remote-ssh.connect`. With Option A the command comes from the bundled Microsoft extension; with Option B it comes from your fork (via replacement map or from your marketplace). No “download on click” flow.
- **product.json:**  
  - Option A: one `builtInExtensions` entry with `vsix` + `sha256` (and we remove the marketplace-only entry we had).  
  - Option B: either the same with your vsix, or `extensionReplacementMapForImports` + your marketplace in `extensionsGallery`.

---

## Recommendation

Use **Option A**: download the Microsoft vsix once, put it in `build/remote-ssh/`, set `vsix` and `sha256` in `product.json`. Then we don’t need to fork, rename, or run a marketplace; we ship what Cursor ships (Remote-SSH) in the simplest way.

If you tell me which option you want (A or B), next step is: for A, I’ll add the exact `product.json` entry and a small script to download the vsix and print sha256; for B, I’ll outline the exact `product.json` and build steps for your fork.
