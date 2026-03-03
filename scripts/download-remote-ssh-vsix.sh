#!/usr/bin/env bash
# Downloads Microsoft Remote-SSH vsix and prints its SHA256.
# Use this for Option A in docs/SHIP_REMOTE_SSH_LIKE_CURSOR.md:
#   1. Run: ./scripts/download-remote-ssh-vsix.sh
#   2. Copy the SHA256 into product.json (builtInExtensions entry for ms-vscode-remote.remote-ssh)
#   3. Ensure product.json has "vsix": "build/remote-ssh/ms-vscode-remote.remote-ssh-0.113.1.vsix"
set -e
VERSION="${1:-0.113.1}"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$REPO_ROOT/build/remote-ssh"
OUT_FILE="$OUT_DIR/ms-vscode-remote.remote-ssh-${VERSION}.vsix"
URL="https://marketplace.visualstudio.com/_apis/public/gallery/publishers/ms-vscode-remote/vsextensions/remote-ssh/${VERSION}/vspackage"

mkdir -p "$OUT_DIR"
echo "Downloading Remote-SSH ${VERSION} to ${OUT_FILE} ..."
# Marketplace often returns gzip; build expects a .vsix (zip). Download and decompress if needed.
TMP="$OUT_DIR/remote-ssh-${VERSION}.tmp"
curl -sSL -o "$TMP" -H "X-Market-Client-Id: VSCode Build" -H "User-Agent: VSCode Build" "$URL"
if command -v file >/dev/null 2>&1 && file "$TMP" | grep -q gzip; then
	gzip -dc "$TMP" > "$OUT_FILE"
	rm -f "$TMP"
else
	mv "$TMP" "$OUT_FILE"
fi
echo "Downloaded. SHA256:"
shasum -a 256 "$OUT_FILE" | awk '{ print $1 }'
echo ""
echo "Add to product.json builtInExtensions entry for ms-vscode-remote.remote-ssh:"
echo "  \"vsix\": \"build/remote-ssh/ms-vscode-remote.remote-ssh-${VERSION}.vsix\","
echo "  \"sha256\": \"<paste the hex above>\""
