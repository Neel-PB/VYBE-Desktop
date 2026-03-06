#!/bin/bash
# Bundles Lexical and its subpackages into a single vendored ESM file
# for use in VS Code's browser context (which cannot resolve bare npm specifiers).
#
# Run from the repo root: bash build/scripts/bundle-lexical.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="$REPO_ROOT/src/vs/base/common/lexical/lexical.js"

# Use explicit exports from @lexical/utils to avoid conflicts with
# lexical's own export * (both export mergeRegister, addClassNamesToElement, etc.)
cat <<'ENTRY' | npx esbuild \
      --bundle \
      --format=esm \
      --platform=browser \
      --target=es2022 \
      --outfile="$OUT" \
      --banner:js="/**
 * Vendored Lexical bundle for VS Code browser context.
 * Packages: lexical, @lexical/plain-text, @lexical/history, @lexical/utils
 * Generated via: bash build/scripts/bundle-lexical.sh
 * DO NOT EDIT - regenerate with the script above.
 */"
export * from "lexical";
export { registerPlainText } from "@lexical/plain-text";
export { registerHistory, createEmptyHistoryState } from "@lexical/history";
export { isMimeType, mediaFileReader, $dfs, $reverseDfs, $dfsIterator, $reverseDfsIterator, $getNearestNodeOfType, $getNearestBlockElementAncestorOrThrow, registerNestedElementResolver, $restoreEditorState, $insertNodeToNearestRoot, $wrapNodeInElement, objectKlassEquals, $filter, $handleIndentAndOutdent, $insertFirst, calculateZoomLevel, $isEditorIsNestedEditor, $unwrapAndFilterDescendants, $descendantsMatching, $firstToLastIterator, $lastToFirstIterator, $unwrapNode, makeStateWrapper, $getNextSiblingOrParentSibling, $getDepth, $getNextRightPreorderNode, $insertNodeToNearestRootAtCaret, $getAdjacentCaret, CAN_USE_BEFORE_INPUT, CAN_USE_DOM, IS_ANDROID, IS_ANDROID_CHROME, IS_APPLE, IS_APPLE_WEBKIT, IS_CHROME, IS_FIREFOX, IS_IOS, IS_SAFARI, markSelection, positionNodeOnRange, selectionAlwaysOnDisplay } from "@lexical/utils";
ENTRY

echo "Bundled Lexical -> $OUT ($(wc -l < "$OUT") lines)"
