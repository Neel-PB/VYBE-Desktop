/**
 * Vendored Lexical bundle for VS Code browser context.
 * Packages: lexical, @lexical/plain-text, @lexical/history, @lexical/clipboard, @lexical/utils
 * Generated via: bash build/scripts/bundle-lexical.sh
 * DO NOT EDIT - regenerate with the script above.
 */
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/lexical/Lexical.dev.mjs
var Lexical_dev_exports = {};
__export(Lexical_dev_exports, {
  $addUpdateTag: () => $addUpdateTag,
  $applyNodeReplacement: () => $applyNodeReplacement,
  $caretFromPoint: () => $caretFromPoint,
  $caretRangeFromSelection: () => $caretRangeFromSelection,
  $cloneWithProperties: () => $cloneWithProperties,
  $cloneWithPropertiesEphemeral: () => $cloneWithPropertiesEphemeral,
  $comparePointCaretNext: () => $comparePointCaretNext,
  $copyNode: () => $copyNode,
  $create: () => $create,
  $createLineBreakNode: () => $createLineBreakNode,
  $createNodeSelection: () => $createNodeSelection,
  $createParagraphNode: () => $createParagraphNode,
  $createPoint: () => $createPoint,
  $createRangeSelection: () => $createRangeSelection,
  $createRangeSelectionFromDom: () => $createRangeSelectionFromDom,
  $createTabNode: () => $createTabNode,
  $createTextNode: () => $createTextNode,
  $extendCaretToRange: () => $extendCaretToRange,
  $findMatchingParent: () => $findMatchingParent,
  $getAdjacentChildCaret: () => $getAdjacentChildCaret,
  $getAdjacentNode: () => $getAdjacentNode,
  $getAdjacentSiblingOrParentSiblingCaret: () => $getAdjacentSiblingOrParentSiblingCaret,
  $getCaretInDirection: () => $getCaretInDirection,
  $getCaretRange: () => $getCaretRange,
  $getCaretRangeInDirection: () => $getCaretRangeInDirection,
  $getCharacterOffsets: () => $getCharacterOffsets,
  $getChildCaret: () => $getChildCaret,
  $getChildCaretAtIndex: () => $getChildCaretAtIndex,
  $getChildCaretOrSelf: () => $getChildCaretOrSelf,
  $getCollapsedCaretRange: () => $getCollapsedCaretRange,
  $getCommonAncestor: () => $getCommonAncestor,
  $getCommonAncestorResultBranchOrder: () => $getCommonAncestorResultBranchOrder,
  $getEditor: () => $getEditor,
  $getNearestNodeFromDOMNode: () => $getNearestNodeFromDOMNode,
  $getNearestRootOrShadowRoot: () => $getNearestRootOrShadowRoot,
  $getNodeByKey: () => $getNodeByKey,
  $getNodeByKeyOrThrow: () => $getNodeByKeyOrThrow,
  $getNodeFromDOMNode: () => $getNodeFromDOMNode,
  $getPreviousSelection: () => $getPreviousSelection,
  $getRoot: () => $getRoot,
  $getSelection: () => $getSelection,
  $getSiblingCaret: () => $getSiblingCaret,
  $getState: () => $getState,
  $getStateChange: () => $getStateChange,
  $getTextContent: () => $getTextContent,
  $getTextNodeOffset: () => $getTextNodeOffset,
  $getTextPointCaret: () => $getTextPointCaret,
  $getTextPointCaretSlice: () => $getTextPointCaretSlice,
  $getWritableNodeState: () => $getWritableNodeState,
  $hasAncestor: () => $hasAncestor,
  $hasUpdateTag: () => $hasUpdateTag,
  $insertNodes: () => $insertNodes,
  $isBlockElementNode: () => $isBlockElementNode,
  $isChildCaret: () => $isChildCaret,
  $isDecoratorNode: () => $isDecoratorNode,
  $isEditorState: () => $isEditorState,
  $isElementNode: () => $isElementNode,
  $isExtendableTextPointCaret: () => $isExtendableTextPointCaret,
  $isInlineElementOrDecoratorNode: () => $isInlineElementOrDecoratorNode,
  $isLeafNode: () => $isLeafNode,
  $isLineBreakNode: () => $isLineBreakNode,
  $isNodeCaret: () => $isNodeCaret,
  $isNodeSelection: () => $isNodeSelection,
  $isParagraphNode: () => $isParagraphNode,
  $isRangeSelection: () => $isRangeSelection,
  $isRootNode: () => $isRootNode,
  $isRootOrShadowRoot: () => $isRootOrShadowRoot,
  $isSiblingCaret: () => $isSiblingCaret,
  $isTabNode: () => $isTabNode,
  $isTextNode: () => $isTextNode,
  $isTextPointCaret: () => $isTextPointCaret,
  $isTextPointCaretSlice: () => $isTextPointCaretSlice,
  $isTokenOrSegmented: () => $isTokenOrSegmented,
  $isTokenOrTab: () => $isTokenOrTab,
  $nodesOfType: () => $nodesOfType,
  $normalizeCaret: () => $normalizeCaret,
  $normalizeSelection__EXPERIMENTAL: () => $normalizeSelection,
  $onUpdate: () => $onUpdate,
  $parseSerializedNode: () => $parseSerializedNode,
  $removeTextFromCaretRange: () => $removeTextFromCaretRange,
  $rewindSiblingCaret: () => $rewindSiblingCaret,
  $selectAll: () => $selectAll,
  $setCompositionKey: () => $setCompositionKey,
  $setPointFromCaret: () => $setPointFromCaret,
  $setSelection: () => $setSelection,
  $setSelectionFromCaretRange: () => $setSelectionFromCaretRange,
  $setState: () => $setState,
  $splitAtPointCaretNext: () => $splitAtPointCaretNext,
  $splitNode: () => $splitNode,
  $updateRangeSelectionFromCaretRange: () => $updateRangeSelectionFromCaretRange,
  ArtificialNode__DO_NOT_USE: () => ArtificialNode__DO_NOT_USE,
  BEFORE_INPUT_COMMAND: () => BEFORE_INPUT_COMMAND,
  BLUR_COMMAND: () => BLUR_COMMAND,
  CAN_REDO_COMMAND: () => CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND: () => CAN_UNDO_COMMAND,
  CLEAR_EDITOR_COMMAND: () => CLEAR_EDITOR_COMMAND,
  CLEAR_HISTORY_COMMAND: () => CLEAR_HISTORY_COMMAND,
  CLICK_COMMAND: () => CLICK_COMMAND,
  COLLABORATION_TAG: () => COLLABORATION_TAG,
  COMMAND_PRIORITY_CRITICAL: () => COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_EDITOR: () => COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH: () => COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW: () => COMMAND_PRIORITY_LOW,
  COMMAND_PRIORITY_NORMAL: () => COMMAND_PRIORITY_NORMAL,
  COMPOSITION_END_COMMAND: () => COMPOSITION_END_COMMAND,
  COMPOSITION_END_TAG: () => COMPOSITION_END_TAG,
  COMPOSITION_START_COMMAND: () => COMPOSITION_START_COMMAND,
  COMPOSITION_START_TAG: () => COMPOSITION_START_TAG,
  CONTROLLED_TEXT_INSERTION_COMMAND: () => CONTROLLED_TEXT_INSERTION_COMMAND,
  COPY_COMMAND: () => COPY_COMMAND,
  CUT_COMMAND: () => CUT_COMMAND,
  DELETE_CHARACTER_COMMAND: () => DELETE_CHARACTER_COMMAND,
  DELETE_LINE_COMMAND: () => DELETE_LINE_COMMAND,
  DELETE_WORD_COMMAND: () => DELETE_WORD_COMMAND,
  DRAGEND_COMMAND: () => DRAGEND_COMMAND,
  DRAGOVER_COMMAND: () => DRAGOVER_COMMAND,
  DRAGSTART_COMMAND: () => DRAGSTART_COMMAND,
  DROP_COMMAND: () => DROP_COMMAND,
  DecoratorNode: () => DecoratorNode,
  ElementNode: () => ElementNode,
  FOCUS_COMMAND: () => FOCUS_COMMAND,
  FORMAT_ELEMENT_COMMAND: () => FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND: () => FORMAT_TEXT_COMMAND,
  HISTORIC_TAG: () => HISTORIC_TAG,
  HISTORY_MERGE_TAG: () => HISTORY_MERGE_TAG,
  HISTORY_PUSH_TAG: () => HISTORY_PUSH_TAG,
  INDENT_CONTENT_COMMAND: () => INDENT_CONTENT_COMMAND,
  INPUT_COMMAND: () => INPUT_COMMAND,
  INSERT_LINE_BREAK_COMMAND: () => INSERT_LINE_BREAK_COMMAND,
  INSERT_PARAGRAPH_COMMAND: () => INSERT_PARAGRAPH_COMMAND,
  INSERT_TAB_COMMAND: () => INSERT_TAB_COMMAND,
  INTERNAL_$isBlock: () => INTERNAL_$isBlock,
  IS_ALL_FORMATTING: () => IS_ALL_FORMATTING,
  IS_BOLD: () => IS_BOLD,
  IS_CODE: () => IS_CODE,
  IS_HIGHLIGHT: () => IS_HIGHLIGHT,
  IS_ITALIC: () => IS_ITALIC,
  IS_STRIKETHROUGH: () => IS_STRIKETHROUGH,
  IS_SUBSCRIPT: () => IS_SUBSCRIPT,
  IS_SUPERSCRIPT: () => IS_SUPERSCRIPT,
  IS_UNDERLINE: () => IS_UNDERLINE,
  KEY_ARROW_DOWN_COMMAND: () => KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND: () => KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND: () => KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND: () => KEY_ARROW_UP_COMMAND,
  KEY_BACKSPACE_COMMAND: () => KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND: () => KEY_DELETE_COMMAND,
  KEY_DOWN_COMMAND: () => KEY_DOWN_COMMAND,
  KEY_ENTER_COMMAND: () => KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND: () => KEY_ESCAPE_COMMAND,
  KEY_MODIFIER_COMMAND: () => KEY_MODIFIER_COMMAND,
  KEY_SPACE_COMMAND: () => KEY_SPACE_COMMAND,
  KEY_TAB_COMMAND: () => KEY_TAB_COMMAND,
  LineBreakNode: () => LineBreakNode,
  MOVE_TO_END: () => MOVE_TO_END,
  MOVE_TO_START: () => MOVE_TO_START,
  NODE_STATE_KEY: () => NODE_STATE_KEY,
  OUTDENT_CONTENT_COMMAND: () => OUTDENT_CONTENT_COMMAND,
  PASTE_COMMAND: () => PASTE_COMMAND,
  PASTE_TAG: () => PASTE_TAG,
  ParagraphNode: () => ParagraphNode,
  REDO_COMMAND: () => REDO_COMMAND,
  REMOVE_TEXT_COMMAND: () => REMOVE_TEXT_COMMAND,
  RootNode: () => RootNode,
  SELECTION_CHANGE_COMMAND: () => SELECTION_CHANGE_COMMAND,
  SELECTION_INSERT_CLIPBOARD_NODES_COMMAND: () => SELECTION_INSERT_CLIPBOARD_NODES_COMMAND,
  SELECT_ALL_COMMAND: () => SELECT_ALL_COMMAND,
  SKIP_COLLAB_TAG: () => SKIP_COLLAB_TAG,
  SKIP_DOM_SELECTION_TAG: () => SKIP_DOM_SELECTION_TAG,
  SKIP_SCROLL_INTO_VIEW_TAG: () => SKIP_SCROLL_INTO_VIEW_TAG,
  SKIP_SELECTION_FOCUS_TAG: () => SKIP_SELECTION_FOCUS_TAG,
  TEXT_TYPE_TO_FORMAT: () => TEXT_TYPE_TO_FORMAT,
  TabNode: () => TabNode,
  TextNode: () => TextNode,
  UNDO_COMMAND: () => UNDO_COMMAND,
  addClassNamesToElement: () => addClassNamesToElement,
  buildImportMap: () => buildImportMap,
  configExtension: () => configExtension,
  createCommand: () => createCommand,
  createEditor: () => createEditor,
  createSharedNodeState: () => createSharedNodeState,
  createState: () => createState,
  declarePeerDependency: () => declarePeerDependency,
  defineExtension: () => defineExtension,
  flipDirection: () => flipDirection,
  getDOMOwnerDocument: () => getDOMOwnerDocument,
  getDOMSelection: () => getDOMSelection,
  getDOMSelectionFromTarget: () => getDOMSelectionFromTarget,
  getDOMTextNode: () => getDOMTextNode,
  getEditorPropertyFromDOMNode: () => getEditorPropertyFromDOMNode,
  getNearestEditorFromDOMNode: () => getNearestEditorFromDOMNode,
  getRegisteredNode: () => getRegisteredNode,
  getRegisteredNodeOrThrow: () => getRegisteredNodeOrThrow,
  getStaticNodeConfig: () => getStaticNodeConfig,
  getTextDirection: () => getTextDirection,
  getTransformSetFromKlass: () => getTransformSetFromKlass,
  isBlockDomNode: () => isBlockDomNode,
  isCurrentlyReadOnlyMode: () => isCurrentlyReadOnlyMode,
  isDOMDocumentNode: () => isDOMDocumentNode,
  isDOMNode: () => isDOMNode,
  isDOMTextNode: () => isDOMTextNode,
  isDOMUnmanaged: () => isDOMUnmanaged,
  isDocumentFragment: () => isDocumentFragment,
  isExactShortcutMatch: () => isExactShortcutMatch,
  isHTMLAnchorElement: () => isHTMLAnchorElement,
  isHTMLElement: () => isHTMLElement,
  isInlineDomNode: () => isInlineDomNode,
  isLexicalEditor: () => isLexicalEditor,
  isModifierMatch: () => isModifierMatch,
  isSelectionCapturedInDecoratorInput: () => isSelectionCapturedInDecoratorInput,
  isSelectionWithinEditor: () => isSelectionWithinEditor,
  makeStepwiseIterator: () => makeStepwiseIterator,
  mergeRegister: () => mergeRegister,
  normalizeClassNames: () => normalizeClassNames,
  removeClassNamesFromElement: () => removeClassNamesFromElement,
  removeFromParent: () => removeFromParent,
  resetRandomKey: () => resetRandomKey,
  safeCast: () => safeCast,
  setDOMUnmanaged: () => setDOMUnmanaged,
  setNodeIndentFromDOM: () => setNodeIndentFromDOM,
  shallowMergeConfig: () => shallowMergeConfig,
  toggleTextFormatType: () => toggleTextFormatType
});
function formatDevErrorMessage(message) {
  throw new Error(message);
}
var CAN_USE_DOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var documentMode = CAN_USE_DOM && "documentMode" in document ? document.documentMode : null;
var IS_APPLE = CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
var IS_FIREFOX = CAN_USE_DOM && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);
var CAN_USE_BEFORE_INPUT = CAN_USE_DOM && "InputEvent" in window && !documentMode ? "getTargetRanges" in new window.InputEvent("input") : false;
var IS_SAFARI = CAN_USE_DOM && /Version\/[\d.]+.*Safari/.test(navigator.userAgent);
var IS_IOS = CAN_USE_DOM && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var IS_ANDROID = CAN_USE_DOM && /Android/.test(navigator.userAgent);
var IS_CHROME = CAN_USE_DOM && /^(?=.*Chrome).*/i.test(navigator.userAgent);
var IS_ANDROID_CHROME = CAN_USE_DOM && IS_ANDROID && IS_CHROME;
var IS_APPLE_WEBKIT = CAN_USE_DOM && /AppleWebKit\/[\d.]+/.test(navigator.userAgent) && IS_APPLE && !IS_CHROME;
var DOM_ELEMENT_TYPE = 1;
var DOM_TEXT_TYPE = 3;
var DOM_DOCUMENT_TYPE = 9;
var DOM_DOCUMENT_FRAGMENT_TYPE = 11;
var NO_DIRTY_NODES = 0;
var HAS_DIRTY_NODES = 1;
var FULL_RECONCILE = 2;
var IS_NORMAL = 0;
var IS_TOKEN = 1;
var IS_SEGMENTED = 2;
var IS_BOLD = 1;
var IS_ITALIC = 1 << 1;
var IS_STRIKETHROUGH = 1 << 2;
var IS_UNDERLINE = 1 << 3;
var IS_CODE = 1 << 4;
var IS_SUBSCRIPT = 1 << 5;
var IS_SUPERSCRIPT = 1 << 6;
var IS_HIGHLIGHT = 1 << 7;
var IS_LOWERCASE = 1 << 8;
var IS_UPPERCASE = 1 << 9;
var IS_CAPITALIZE = 1 << 10;
var IS_ALL_FORMATTING = IS_BOLD | IS_ITALIC | IS_STRIKETHROUGH | IS_UNDERLINE | IS_CODE | IS_SUBSCRIPT | IS_SUPERSCRIPT | IS_HIGHLIGHT | IS_LOWERCASE | IS_UPPERCASE | IS_CAPITALIZE;
var IS_DIRECTIONLESS = 1;
var IS_UNMERGEABLE = 1 << 1;
var IS_ALIGN_LEFT = 1;
var IS_ALIGN_CENTER = 2;
var IS_ALIGN_RIGHT = 3;
var IS_ALIGN_JUSTIFY = 4;
var IS_ALIGN_START = 5;
var IS_ALIGN_END = 6;
var NON_BREAKING_SPACE = "\xA0";
var ZERO_WIDTH_SPACE = "\u200B";
var COMPOSITION_SUFFIX = IS_SAFARI || IS_IOS || IS_APPLE_WEBKIT ? NON_BREAKING_SPACE : ZERO_WIDTH_SPACE;
var DOUBLE_LINE_BREAK = "\n\n";
var COMPOSITION_START_CHAR = IS_FIREFOX ? NON_BREAKING_SPACE : COMPOSITION_SUFFIX;
var RTL = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
var LTR = "A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C\uFE00-\uFE6F\uFEFD-\uFFFF";
var RTL_REGEX = new RegExp("^[^" + LTR + "]*[" + RTL + "]");
var LTR_REGEX = new RegExp("^[^" + RTL + "]*[" + LTR + "]");
var TEXT_TYPE_TO_FORMAT = {
  bold: IS_BOLD,
  capitalize: IS_CAPITALIZE,
  code: IS_CODE,
  highlight: IS_HIGHLIGHT,
  italic: IS_ITALIC,
  lowercase: IS_LOWERCASE,
  strikethrough: IS_STRIKETHROUGH,
  subscript: IS_SUBSCRIPT,
  superscript: IS_SUPERSCRIPT,
  underline: IS_UNDERLINE,
  uppercase: IS_UPPERCASE
};
var DETAIL_TYPE_TO_DETAIL = {
  directionless: IS_DIRECTIONLESS,
  unmergeable: IS_UNMERGEABLE
};
var ELEMENT_TYPE_TO_FORMAT = {
  center: IS_ALIGN_CENTER,
  end: IS_ALIGN_END,
  justify: IS_ALIGN_JUSTIFY,
  left: IS_ALIGN_LEFT,
  right: IS_ALIGN_RIGHT,
  start: IS_ALIGN_START
};
var ELEMENT_FORMAT_TO_TYPE = {
  [IS_ALIGN_CENTER]: "center",
  [IS_ALIGN_END]: "end",
  [IS_ALIGN_JUSTIFY]: "justify",
  [IS_ALIGN_LEFT]: "left",
  [IS_ALIGN_RIGHT]: "right",
  [IS_ALIGN_START]: "start"
};
var TEXT_MODE_TO_TYPE = {
  normal: IS_NORMAL,
  segmented: IS_SEGMENTED,
  token: IS_TOKEN
};
var TEXT_TYPE_TO_MODE = {
  [IS_NORMAL]: "normal",
  [IS_SEGMENTED]: "segmented",
  [IS_TOKEN]: "token"
};
var NODE_STATE_KEY = "$";
var PROTOTYPE_CONFIG_METHOD = "$config";
function $garbageCollectDetachedDecorators(editor, pendingEditorState) {
  const currentDecorators = editor._decorators;
  const pendingDecorators = editor._pendingDecorators;
  let decorators = pendingDecorators || currentDecorators;
  const nodeMap = pendingEditorState._nodeMap;
  let key;
  for (key in decorators) {
    if (!nodeMap.has(key)) {
      if (decorators === currentDecorators) {
        decorators = cloneDecorators(editor);
      }
      delete decorators[key];
    }
  }
}
function $garbageCollectDetachedDeepChildNodes(node, parentKey, prevNodeMap, nodeMap, nodeMapDelete, dirtyNodes) {
  let child = node.getFirstChild();
  while (child !== null) {
    const childKey = child.__key;
    if (child.__parent === parentKey) {
      if ($isElementNode(child)) {
        $garbageCollectDetachedDeepChildNodes(child, childKey, prevNodeMap, nodeMap, nodeMapDelete, dirtyNodes);
      }
      if (!prevNodeMap.has(childKey)) {
        dirtyNodes.delete(childKey);
      }
      nodeMapDelete.push(childKey);
    }
    child = child.getNextSibling();
  }
}
function $garbageCollectDetachedNodes(prevEditorState, editorState, dirtyLeaves, dirtyElements) {
  const prevNodeMap = prevEditorState._nodeMap;
  const nodeMap = editorState._nodeMap;
  const nodeMapDelete = [];
  for (const [nodeKey] of dirtyElements) {
    const node = nodeMap.get(nodeKey);
    if (node !== void 0) {
      if (!node.isAttached()) {
        if ($isElementNode(node)) {
          $garbageCollectDetachedDeepChildNodes(node, nodeKey, prevNodeMap, nodeMap, nodeMapDelete, dirtyElements);
        }
        if (!prevNodeMap.has(nodeKey)) {
          dirtyElements.delete(nodeKey);
        }
        nodeMapDelete.push(nodeKey);
      }
    }
  }
  for (const nodeKey of nodeMapDelete) {
    nodeMap.delete(nodeKey);
  }
  for (const nodeKey of dirtyLeaves) {
    const node = nodeMap.get(nodeKey);
    if (node !== void 0 && !node.isAttached()) {
      if (!prevNodeMap.has(nodeKey)) {
        dirtyLeaves.delete(nodeKey);
      }
      nodeMap.delete(nodeKey);
    }
  }
}
var TEXT_MUTATION_VARIANCE = 100;
var isProcessingMutations = false;
var lastTextEntryTimeStamp = 0;
function getIsProcessingMutations() {
  return isProcessingMutations;
}
function updateTimeStamp(event) {
  lastTextEntryTimeStamp = event.timeStamp;
}
function initTextEntryListener(editor) {
  if (lastTextEntryTimeStamp === 0) {
    getWindow(editor).addEventListener("textInput", updateTimeStamp, true);
  }
}
function isManagedLineBreak(dom, target, editor) {
  const isBR = dom.nodeName === "BR";
  const lexicalLineBreak = target.__lexicalLineBreak;
  return lexicalLineBreak && (dom === lexicalLineBreak || isBR && dom.previousSibling === lexicalLineBreak) || isBR && getNodeKeyFromDOMNode(dom, editor) !== void 0;
}
function getLastSelection(editor) {
  return editor.getEditorState().read(() => {
    const selection = $getSelection();
    return selection !== null ? selection.clone() : null;
  });
}
function $handleTextMutation(target, node, editor) {
  const domSelection = getDOMSelection(getWindow(editor));
  let anchorOffset = null;
  let focusOffset = null;
  if (domSelection !== null && domSelection.anchorNode === target) {
    anchorOffset = domSelection.anchorOffset;
    focusOffset = domSelection.focusOffset;
  }
  const text = target.nodeValue;
  if (text !== null) {
    $updateTextNodeFromDOMContent(node, text, anchorOffset, focusOffset, false);
  }
}
function shouldUpdateTextNodeFromMutation(selection, targetDOM, targetNode) {
  if ($isRangeSelection(selection)) {
    const anchorNode = selection.anchor.getNode();
    if (anchorNode.is(targetNode) && selection.format !== anchorNode.getFormat()) {
      return false;
    }
  }
  return isDOMTextNode(targetDOM) && targetNode.isAttached();
}
function $getNearestManagedNodePairFromDOMNode(startingDOM, editor, editorState, rootElement) {
  for (let dom = startingDOM; dom && !isDOMUnmanaged(dom); dom = getParentElement(dom)) {
    const key = getNodeKeyFromDOMNode(dom, editor);
    if (key !== void 0) {
      const node = $getNodeByKey(key, editorState);
      if (node) {
        return $isDecoratorNode(node) || !isHTMLElement(dom) ? void 0 : [dom, node];
      }
    } else if (dom === rootElement) {
      return [rootElement, internalGetRoot(editorState)];
    }
  }
}
function flushMutations(editor, mutations, observer) {
  isProcessingMutations = true;
  const shouldFlushTextMutations = performance.now() - lastTextEntryTimeStamp > TEXT_MUTATION_VARIANCE;
  try {
    updateEditorSync(editor, () => {
      const selection = $getSelection() || getLastSelection(editor);
      const badDOMTargets = /* @__PURE__ */ new Map();
      const rootElement = editor.getRootElement();
      const currentEditorState = editor._editorState;
      const blockCursorElement = editor._blockCursorElement;
      let shouldRevertSelection = false;
      let possibleTextForFirefoxPaste = "";
      for (let i2 = 0; i2 < mutations.length; i2++) {
        const mutation = mutations[i2];
        const type = mutation.type;
        const targetDOM = mutation.target;
        const pair = $getNearestManagedNodePairFromDOMNode(targetDOM, editor, currentEditorState, rootElement);
        if (!pair) {
          continue;
        }
        const [nodeDOM, targetNode] = pair;
        if (type === "characterData") {
          if (
            // TODO there is an edge case here if a mutation happens too quickly
            //      after text input, it may never be handled since we do not
            //      track the ignored mutations in any way
            shouldFlushTextMutations && $isTextNode(targetNode) && isDOMTextNode(targetDOM) && shouldUpdateTextNodeFromMutation(selection, targetDOM, targetNode)
          ) {
            $handleTextMutation(targetDOM, targetNode, editor);
          }
        } else if (type === "childList") {
          shouldRevertSelection = true;
          const addedDOMs = mutation.addedNodes;
          for (let s2 = 0; s2 < addedDOMs.length; s2++) {
            const addedDOM = addedDOMs[s2];
            const node = $getNodeFromDOMNode(addedDOM);
            const parentDOM = addedDOM.parentNode;
            if (parentDOM != null && addedDOM !== blockCursorElement && node === null && !isManagedLineBreak(addedDOM, parentDOM, editor)) {
              if (IS_FIREFOX) {
                const possibleText = (isHTMLElement(addedDOM) ? addedDOM.innerText : null) || addedDOM.nodeValue;
                if (possibleText) {
                  possibleTextForFirefoxPaste += possibleText;
                }
              }
              parentDOM.removeChild(addedDOM);
            }
          }
          const removedDOMs = mutation.removedNodes;
          const removedDOMsLength = removedDOMs.length;
          if (removedDOMsLength > 0) {
            let unremovedBRs = 0;
            for (let s2 = 0; s2 < removedDOMsLength; s2++) {
              const removedDOM = removedDOMs[s2];
              if (isManagedLineBreak(removedDOM, targetDOM, editor) || blockCursorElement === removedDOM) {
                targetDOM.appendChild(removedDOM);
                unremovedBRs++;
              }
            }
            if (removedDOMsLength !== unremovedBRs) {
              badDOMTargets.set(nodeDOM, targetNode);
            }
          }
        }
      }
      if (badDOMTargets.size > 0) {
        for (const [nodeDOM, targetNode] of badDOMTargets) {
          targetNode.reconcileObservedMutation(nodeDOM, editor);
        }
      }
      const records = observer.takeRecords();
      if (records.length > 0) {
        for (let i2 = 0; i2 < records.length; i2++) {
          const record = records[i2];
          const addedNodes = record.addedNodes;
          const target = record.target;
          for (let s2 = 0; s2 < addedNodes.length; s2++) {
            const addedDOM = addedNodes[s2];
            const parentDOM = addedDOM.parentNode;
            if (parentDOM != null && addedDOM.nodeName === "BR" && !isManagedLineBreak(addedDOM, target, editor)) {
              parentDOM.removeChild(addedDOM);
            }
          }
        }
        observer.takeRecords();
      }
      if (selection !== null) {
        if (shouldRevertSelection) {
          $setSelection(selection);
        }
        if (IS_FIREFOX && isFirefoxClipboardEvents(editor)) {
          selection.insertRawText(possibleTextForFirefoxPaste);
        }
      }
    });
  } finally {
    isProcessingMutations = false;
  }
}
function flushRootMutations(editor) {
  const observer = editor._observer;
  if (observer !== null) {
    const mutations = observer.takeRecords();
    flushMutations(editor, mutations, observer);
  }
}
function initMutationObserver(editor) {
  initTextEntryListener(editor);
  editor._observer = new MutationObserver((mutations, observer) => {
    flushMutations(editor, mutations, observer);
  });
}
var StateConfig = class {
  /** The string key used when serializing this state to JSON */
  key;
  /** The parse function from the StateValueConfig passed to createState */
  parse;
  /**
   * The unparse function from the StateValueConfig passed to createState,
   * with a default that is simply a pass-through that assumes the value is
   * JSON serializable.
   */
  unparse;
  /**
   * An equality function from the StateValueConfig, with a default of
   * Object.is.
   */
  isEqual;
  /**
   * The result of `stateValueConfig.parse(undefined)`, which is computed only
   * once and used as the default value. When the current value `isEqual` to
   * the `defaultValue`, it will not be serialized to JSON.
   */
  defaultValue;
  constructor(key, stateValueConfig) {
    this.key = key;
    this.parse = stateValueConfig.parse.bind(stateValueConfig);
    this.unparse = (stateValueConfig.unparse || coerceToJSON).bind(stateValueConfig);
    this.isEqual = (stateValueConfig.isEqual || Object.is).bind(stateValueConfig);
    this.defaultValue = this.parse(void 0);
  }
};
// @__NO_SIDE_EFFECTS__
function createState(key, valueConfig) {
  return new StateConfig(key, valueConfig);
}
function $getState(node, stateConfig, version = "latest") {
  const latestOrDirectNode = version === "latest" ? node.getLatest() : node;
  const state = latestOrDirectNode.__state;
  if (state) {
    $checkCollision(node, stateConfig, state);
    return state.getValue(stateConfig);
  }
  return stateConfig.defaultValue;
}
function $getStateChange(node, prevNode, stateConfig) {
  const value = $getState(node, stateConfig, "direct");
  const prevValue = $getState(prevNode, stateConfig, "direct");
  return stateConfig.isEqual(value, prevValue) ? null : [value, prevValue];
}
function $setState(node, stateConfig, valueOrUpdater) {
  errorOnReadOnly();
  let value;
  if (typeof valueOrUpdater === "function") {
    const latest = node.getLatest();
    const prevValue = $getState(latest, stateConfig);
    value = valueOrUpdater(prevValue);
    if (stateConfig.isEqual(prevValue, value)) {
      return latest;
    }
  } else {
    value = valueOrUpdater;
  }
  const writable = node.getWritable();
  const state = $getWritableNodeState(writable);
  $checkCollision(node, stateConfig, state);
  state.updateFromKnown(stateConfig, value);
  return writable;
}
function $checkCollision(node, stateConfig, state) {
  {
    const collision = state.sharedNodeState.sharedConfigMap.get(stateConfig.key);
    if (collision !== void 0 && collision !== stateConfig) {
      {
        formatDevErrorMessage(`$setState: State key collision ${JSON.stringify(stateConfig.key)} detected in ${node.constructor.name} node with type ${node.getType()} and key ${node.getKey()}. Only one StateConfig with a given key should be used on a node.`);
      }
    }
  }
}
function createSharedNodeState(nodeConfig) {
  const sharedConfigMap = /* @__PURE__ */ new Map();
  const flatKeys = /* @__PURE__ */ new Set();
  for (let klass = typeof nodeConfig === "function" ? nodeConfig : nodeConfig.replace; klass.prototype && klass.prototype.getType !== void 0; klass = Object.getPrototypeOf(klass)) {
    const {
      ownNodeConfig
    } = getStaticNodeConfig(klass);
    if (ownNodeConfig && ownNodeConfig.stateConfigs) {
      for (const requiredStateConfig of ownNodeConfig.stateConfigs) {
        let stateConfig;
        if ("stateConfig" in requiredStateConfig) {
          stateConfig = requiredStateConfig.stateConfig;
          if (requiredStateConfig.flat) {
            flatKeys.add(stateConfig.key);
          }
        } else {
          stateConfig = requiredStateConfig;
        }
        sharedConfigMap.set(stateConfig.key, stateConfig);
      }
    }
  }
  return {
    flatKeys,
    sharedConfigMap
  };
}
var NodeState = class _NodeState {
  /**
   * @internal
   *
   * Track the (versioned) node that this NodeState was created for, to
   * facilitate copy-on-write for NodeState. When a LexicalNode is cloned,
   * it will *reference* the NodeState from its prevNode. From the nextNode
   * you can continue to read state without copying, but the first $setState
   * will trigger a copy of the prevNode's NodeState with the node property
   * updated.
   */
  node;
  /**
   * @internal
   *
   * State that has already been parsed in a get state, so it is safe. (can be returned with
   * just a cast since the proof was given before).
   *
   * Note that it uses StateConfig, so in addition to (1) the CURRENT VALUE, it has access to
   * (2) the State key (3) the DEFAULT VALUE and (4) the PARSE FUNCTION
   */
  knownState;
  /**
   * @internal
   *
   * A copy of serializedNode[NODE_STATE_KEY] that is made when JSON is
   * imported but has not been parsed yet.
   *
   * It stays here until a get state requires us to parse it, and since we
   * then know the value is safe we move it to knownState.
   *
   * Note that since only string keys are used here, we can only allow this
   * state to pass-through on export or on the next version since there is
   * no known value configuration. This pass-through is to support scenarios
   * where multiple versions of the editor code are working in parallel so
   * an old version of your code doesnt erase metadata that was
   * set by a newer version of your code.
   */
  unknownState;
  /**
   * @internal
   *
   * This sharedNodeState is preserved across all instances of a given
   * node type in an editor and remains writable. It is how keys are resolved
   * to configuration.
   */
  sharedNodeState;
  /**
   * @internal
   *
   * The count of known or unknown keys in this state, ignoring the
   * intersection between the two sets.
   */
  size;
  /**
   * @internal
   */
  constructor(node, sharedNodeState, unknownState = void 0, knownState = /* @__PURE__ */ new Map(), size = void 0) {
    this.node = node;
    this.sharedNodeState = sharedNodeState;
    this.unknownState = unknownState;
    this.knownState = knownState;
    const {
      sharedConfigMap
    } = this.sharedNodeState;
    const computedSize = size !== void 0 ? size : computeSize(sharedConfigMap, unknownState, knownState);
    {
      if (!(size === void 0 || computedSize === size)) {
        formatDevErrorMessage(`NodeState: size != computedSize (${String(size)} != ${String(computedSize)})`);
      }
      for (const stateConfig of knownState.keys()) {
        if (!sharedConfigMap.has(stateConfig.key)) {
          formatDevErrorMessage(`NodeState: sharedConfigMap missing knownState key ${stateConfig.key}`);
        }
      }
    }
    this.size = computedSize;
  }
  /**
   * @internal
   *
   * Get the value from knownState, or parse it from unknownState
   * if it contains the given key.
   *
   * Updates the sharedConfigMap when no known state is found.
   * Updates unknownState and knownState when an unknownState is parsed.
   */
  getValue(stateConfig) {
    const known = this.knownState.get(stateConfig);
    if (known !== void 0) {
      return known;
    }
    this.sharedNodeState.sharedConfigMap.set(stateConfig.key, stateConfig);
    let parsed = stateConfig.defaultValue;
    if (this.unknownState && stateConfig.key in this.unknownState) {
      const jsonValue = this.unknownState[stateConfig.key];
      if (jsonValue !== void 0) {
        parsed = stateConfig.parse(jsonValue);
      }
      this.updateFromKnown(stateConfig, parsed);
    }
    return parsed;
  }
  /**
   * @internal
   *
   * Used only for advanced use cases, such as collab. The intent here is to
   * allow you to diff states with a more stable interface than the properties
   * of this class.
   */
  getInternalState() {
    return [this.unknownState, this.knownState];
  }
  /**
   * Encode this NodeState to JSON in the format that its node expects.
   * This returns `{[NODE_STATE_KEY]?: UnknownStateRecord}` rather than
   * `UnknownStateRecord | undefined` so that we can support flattening
   * specific entries in the future when nodes can declare what
   * their required StateConfigs are.
   */
  toJSON() {
    const state = {
      ...this.unknownState
    };
    const flatState = {};
    for (const [stateConfig, v2] of this.knownState) {
      if (stateConfig.isEqual(v2, stateConfig.defaultValue)) {
        delete state[stateConfig.key];
      } else {
        state[stateConfig.key] = stateConfig.unparse(v2);
      }
    }
    for (const key of this.sharedNodeState.flatKeys) {
      if (key in state) {
        flatState[key] = state[key];
        delete state[key];
      }
    }
    if (undefinedIfEmpty(state)) {
      flatState[NODE_STATE_KEY] = state;
    }
    return flatState;
  }
  /**
   * @internal
   *
   * A NodeState is writable when the node to update matches
   * the node associated with the NodeState. This basically
   * mirrors how the EditorState NodeMap works, but in a
   * bottom-up organization rather than a top-down organization.
   *
   * This allows us to implement the same "copy on write"
   * pattern for state, without having the state version
   * update every time the node version changes (e.g. when
   * its parent or siblings change).
   *
   * @param node The node to associate with the state
   * @returns The next writable state
   */
  getWritable(node) {
    if (this.node === node) {
      return this;
    }
    const {
      sharedNodeState,
      unknownState
    } = this;
    const nextKnownState = new Map(this.knownState);
    return new _NodeState(node, sharedNodeState, parseAndPruneNextUnknownState(sharedNodeState.sharedConfigMap, nextKnownState, unknownState), nextKnownState, this.size);
  }
  /** @internal */
  updateFromKnown(stateConfig, value) {
    const key = stateConfig.key;
    this.sharedNodeState.sharedConfigMap.set(key, stateConfig);
    const {
      knownState,
      unknownState
    } = this;
    if (!(knownState.has(stateConfig) || unknownState && key in unknownState)) {
      if (unknownState) {
        delete unknownState[key];
        this.unknownState = undefinedIfEmpty(unknownState);
      }
      this.size++;
    }
    knownState.set(stateConfig, value);
  }
  /**
   * @internal
   *
   * This is intended for advanced use cases only, such
   * as collab or dev tools.
   *
   * Update a single key value pair from unknown state,
   * parsing it if the key is known to this node. This is
   * basically like updateFromJSON, but the effect is
   * isolated to a single entry.
   *
   * @param k The string key from an UnknownStateRecord
   * @param v The unknown value from an UnknownStateRecord
   */
  updateFromUnknown(k, v2) {
    const stateConfig = this.sharedNodeState.sharedConfigMap.get(k);
    if (stateConfig) {
      this.updateFromKnown(stateConfig, stateConfig.parse(v2));
    } else {
      this.unknownState = this.unknownState || {};
      if (!(k in this.unknownState)) {
        this.size++;
      }
      this.unknownState[k] = v2;
    }
  }
  /**
   * @internal
   *
   * Reset all existing state to default or empty values,
   * and perform any updates from the given unknownState.
   *
   * This is used when initializing a node's state from JSON,
   * or when resetting a node's state from JSON.
   *
   * @param unknownState The new state in serialized form
   */
  updateFromJSON(unknownState) {
    const {
      knownState
    } = this;
    for (const stateConfig of knownState.keys()) {
      knownState.set(stateConfig, stateConfig.defaultValue);
    }
    this.size = knownState.size;
    this.unknownState = void 0;
    if (unknownState) {
      for (const [k, v2] of Object.entries(unknownState)) {
        this.updateFromUnknown(k, v2);
      }
    }
  }
};
function $getWritableNodeState(node) {
  const writable = node.getWritable();
  const state = writable.__state ? writable.__state.getWritable(writable) : new NodeState(writable, $getSharedNodeState(writable));
  writable.__state = state;
  return state;
}
function $getSharedNodeState(node) {
  return node.__state ? node.__state.sharedNodeState : getRegisteredNodeOrThrow($getEditor(), node.getType()).sharedNodeState;
}
function $updateStateFromJSON(node, serialized) {
  const writable = node.getWritable();
  const unknownState = serialized[NODE_STATE_KEY];
  let parseState = unknownState;
  for (const k of $getSharedNodeState(writable).flatKeys) {
    if (k in serialized) {
      if (parseState === void 0 || parseState === unknownState) {
        parseState = {
          ...unknownState
        };
      }
      parseState[k] = serialized[k];
    }
  }
  if (writable.__state || parseState) {
    $getWritableNodeState(node).updateFromJSON(parseState);
  }
  return writable;
}
function nodeStatesAreEquivalent(a2, b2) {
  if (a2 === b2) {
    return true;
  }
  if (a2 && b2 && a2.size !== b2.size) {
    return false;
  }
  const keys = /* @__PURE__ */ new Set();
  return !(a2 && hasUnequalMapEntry(keys, a2, b2) || b2 && hasUnequalMapEntry(keys, b2, a2) || a2 && hasUnequalRecordEntry(keys, a2, b2) || b2 && hasUnequalRecordEntry(keys, b2, a2));
}
function computeSize(sharedConfigMap, unknownState, knownState) {
  let size = knownState.size;
  if (unknownState) {
    for (const k in unknownState) {
      const sharedConfig = sharedConfigMap.get(k);
      if (!sharedConfig || !knownState.has(sharedConfig)) {
        size++;
      }
    }
  }
  return size;
}
function undefinedIfEmpty(obj) {
  if (obj) {
    for (const key in obj) {
      return obj;
    }
  }
  return void 0;
}
function coerceToJSON(v2) {
  return v2;
}
function parseAndPruneNextUnknownState(sharedConfigMap, nextKnownState, unknownState) {
  let nextUnknownState = void 0;
  if (unknownState) {
    for (const [k, v2] of Object.entries(unknownState)) {
      const stateConfig = sharedConfigMap.get(k);
      if (stateConfig) {
        if (!nextKnownState.has(stateConfig)) {
          nextKnownState.set(stateConfig, stateConfig.parse(v2));
        }
      } else {
        nextUnknownState = nextUnknownState || {};
        nextUnknownState[k] = v2;
      }
    }
  }
  return nextUnknownState;
}
function hasUnequalMapEntry(keys, sourceState, otherState) {
  for (const [stateConfig, value] of sourceState.knownState) {
    if (keys.has(stateConfig.key)) {
      continue;
    }
    keys.add(stateConfig.key);
    const otherValue = otherState ? otherState.getValue(stateConfig) : stateConfig.defaultValue;
    if (otherValue !== value && !stateConfig.isEqual(otherValue, value)) {
      return true;
    }
  }
  return false;
}
function hasUnequalRecordEntry(keys, sourceState, otherState) {
  const {
    unknownState
  } = sourceState;
  const otherUnknownState = otherState ? otherState.unknownState : void 0;
  if (unknownState) {
    for (const [key, value] of Object.entries(unknownState)) {
      if (keys.has(key)) {
        continue;
      }
      keys.add(key);
      const otherValue = otherUnknownState ? otherUnknownState[key] : void 0;
      if (value !== otherValue) {
        return true;
      }
    }
  }
  return false;
}
function $cloneNodeState(from, to) {
  const state = from.__state;
  return state && state.node === from ? state.getWritable(to) : state;
}
function $canSimpleTextNodesBeMerged(node1, node2) {
  const node1Mode = node1.__mode;
  const node1Format = node1.__format;
  const node1Style = node1.__style;
  const node2Mode = node2.__mode;
  const node2Format = node2.__format;
  const node2Style = node2.__style;
  const node1State = node1.__state;
  const node2State = node2.__state;
  return (node1Mode === null || node1Mode === node2Mode) && (node1Format === null || node1Format === node2Format) && (node1Style === null || node1Style === node2Style) && (node1.__state === null || node1State === node2State || nodeStatesAreEquivalent(node1State, node2State));
}
function $mergeTextNodes(node1, node2) {
  const writableNode1 = node1.mergeWithSibling(node2);
  const normalizedNodes = getActiveEditor()._normalizedNodes;
  normalizedNodes.add(node1.__key);
  normalizedNodes.add(node2.__key);
  return writableNode1;
}
function $normalizeTextNode(textNode) {
  let node = textNode;
  if (node.__text === "" && node.isSimpleText() && !node.isUnmergeable()) {
    node.remove();
    return;
  }
  let previousNode;
  while ((previousNode = node.getPreviousSibling()) !== null && $isTextNode(previousNode) && previousNode.isSimpleText() && !previousNode.isUnmergeable()) {
    if (previousNode.__text === "") {
      previousNode.remove();
    } else if ($canSimpleTextNodesBeMerged(previousNode, node)) {
      node = $mergeTextNodes(previousNode, node);
      break;
    } else {
      break;
    }
  }
  let nextNode;
  while ((nextNode = node.getNextSibling()) !== null && $isTextNode(nextNode) && nextNode.isSimpleText() && !nextNode.isUnmergeable()) {
    if (nextNode.__text === "") {
      nextNode.remove();
    } else if ($canSimpleTextNodesBeMerged(node, nextNode)) {
      node = $mergeTextNodes(node, nextNode);
      break;
    } else {
      break;
    }
  }
}
function $normalizeSelection(selection) {
  $normalizePoint(selection.anchor);
  $normalizePoint(selection.focus);
  return selection;
}
function $normalizePoint(point) {
  while (point.type === "element") {
    const node = point.getNode();
    const offset = point.offset;
    let nextNode;
    let nextOffsetAtEnd;
    if (offset === node.getChildrenSize()) {
      nextNode = node.getChildAtIndex(offset - 1);
      nextOffsetAtEnd = true;
    } else {
      nextNode = node.getChildAtIndex(offset);
      nextOffsetAtEnd = false;
    }
    if ($isTextNode(nextNode)) {
      point.set(nextNode.__key, nextOffsetAtEnd ? nextNode.getTextContentSize() : 0, "text", true);
      break;
    } else if (!$isElementNode(nextNode)) {
      break;
    }
    point.set(nextNode.__key, nextOffsetAtEnd ? nextNode.getChildrenSize() : 0, "element", true);
  }
}
var subTreeTextContent = "";
var subTreeTextFormat = null;
var subTreeTextStyle = null;
var activeEditorConfig;
var activeEditor$1;
var activeEditorNodes;
var treatAllNodesAsDirty = false;
var activeEditorStateReadOnly = false;
var activeMutationListeners;
var activeDirtyElements;
var activeDirtyLeaves;
var activePrevNodeMap;
var activeNextNodeMap;
var activePrevKeyToDOMMap;
var mutatedNodes;
function destroyNode(key, parentDOM) {
  const node = activePrevNodeMap.get(key);
  if (parentDOM !== null) {
    const dom = getPrevElementByKeyOrThrow(key);
    if (dom.parentNode === parentDOM) {
      parentDOM.removeChild(dom);
    }
  }
  if (!activeNextNodeMap.has(key)) {
    activeEditor$1._keyToDOMMap.delete(key);
  }
  if ($isElementNode(node)) {
    const children = createChildrenArray(node, activePrevNodeMap);
    destroyChildren(children, 0, children.length - 1, null);
  }
  if (node !== void 0) {
    setMutatedNode(mutatedNodes, activeEditorNodes, activeMutationListeners, node, "destroyed");
  }
}
function destroyChildren(children, _startIndex, endIndex, dom) {
  for (let startIndex = _startIndex; startIndex <= endIndex; ++startIndex) {
    const child = children[startIndex];
    if (child !== void 0) {
      destroyNode(child, dom);
    }
  }
}
function setTextAlign(domStyle, value) {
  domStyle.setProperty("text-align", value);
}
var DEFAULT_INDENT_VALUE = "40px";
function setElementIndent(dom, indent) {
  const indentClassName = activeEditorConfig.theme.indent;
  if (typeof indentClassName === "string") {
    const elementHasClassName = dom.classList.contains(indentClassName);
    if (indent > 0 && !elementHasClassName) {
      dom.classList.add(indentClassName);
    } else if (indent < 1 && elementHasClassName) {
      dom.classList.remove(indentClassName);
    }
  }
  if (indent === 0) {
    dom.style.setProperty("padding-inline-start", "");
    return;
  }
  const indentationBaseValue = getComputedStyle(activeEditor$1._rootElement || dom).getPropertyValue("--lexical-indent-base-value") || DEFAULT_INDENT_VALUE;
  dom.style.setProperty("padding-inline-start", `calc(${indent} * ${indentationBaseValue})`);
}
function setElementFormat(dom, format) {
  const domStyle = dom.style;
  if (format === 0) {
    setTextAlign(domStyle, "");
  } else if (format === IS_ALIGN_LEFT) {
    setTextAlign(domStyle, "left");
  } else if (format === IS_ALIGN_CENTER) {
    setTextAlign(domStyle, "center");
  } else if (format === IS_ALIGN_RIGHT) {
    setTextAlign(domStyle, "right");
  } else if (format === IS_ALIGN_JUSTIFY) {
    setTextAlign(domStyle, "justify");
  } else if (format === IS_ALIGN_START) {
    setTextAlign(domStyle, "start");
  } else if (format === IS_ALIGN_END) {
    setTextAlign(domStyle, "end");
  }
}
function $getReconciledDirection(node) {
  const direction = node.__dir;
  if (direction !== null) {
    return direction;
  }
  if ($isRootNode(node)) {
    return null;
  }
  const parent = node.getParentOrThrow();
  if (!$isRootNode(parent) || parent.__dir !== null) {
    return null;
  }
  return "auto";
}
function $setElementDirection(dom, node) {
  const direction = $getReconciledDirection(node);
  if (direction !== null) {
    dom.dir = direction;
  } else {
    dom.removeAttribute("dir");
  }
}
function $createNode(key, slot) {
  const node = activeNextNodeMap.get(key);
  if (node === void 0) {
    {
      formatDevErrorMessage(`createNode: node does not exist in nodeMap`);
    }
  }
  const dom = node.createDOM(activeEditorConfig, activeEditor$1);
  storeDOMWithKey(key, dom, activeEditor$1);
  if ($isTextNode(node)) {
    dom.setAttribute("data-lexical-text", "true");
  } else if ($isDecoratorNode(node)) {
    dom.setAttribute("data-lexical-decorator", "true");
  }
  if ($isElementNode(node)) {
    const indent = node.__indent;
    const childrenSize = node.__size;
    $setElementDirection(dom, node);
    if (indent !== 0) {
      setElementIndent(dom, indent);
    }
    if (childrenSize !== 0) {
      const endIndex = childrenSize - 1;
      const children = createChildrenArray(node, activeNextNodeMap);
      $createChildren(children, node, 0, endIndex, node.getDOMSlot(dom));
    }
    const format = node.__format;
    if (format !== 0) {
      setElementFormat(dom, format);
    }
    if (!node.isInline()) {
      reconcileElementTerminatingLineBreak(null, node, dom);
    }
  } else {
    const text = node.getTextContent();
    if ($isDecoratorNode(node)) {
      const decorator = node.decorate(activeEditor$1, activeEditorConfig);
      if (decorator !== null) {
        reconcileDecorator(key, decorator);
      }
      dom.contentEditable = "false";
    }
    subTreeTextContent += text;
  }
  if (slot !== null) {
    slot.insertChild(dom);
  }
  {
    Object.freeze(node);
  }
  setMutatedNode(mutatedNodes, activeEditorNodes, activeMutationListeners, node, "created");
  return dom;
}
function $createChildren(children, element, _startIndex, endIndex, slot) {
  const previousSubTreeTextContent = subTreeTextContent;
  subTreeTextContent = "";
  let startIndex = _startIndex;
  for (; startIndex <= endIndex; ++startIndex) {
    $createNode(children[startIndex], slot);
    const node = activeNextNodeMap.get(children[startIndex]);
    if (node !== null && $isTextNode(node)) {
      if (subTreeTextFormat === null) {
        subTreeTextFormat = node.getFormat();
        subTreeTextStyle = node.getStyle();
      }
    } else if (
      // inline $textContentRequiresDoubleLinebreakAtEnd
      $isElementNode(node) && startIndex < endIndex && !node.isInline()
    ) {
      subTreeTextContent += DOUBLE_LINE_BREAK;
    }
  }
  const dom = slot.element;
  dom.__lexicalTextContent = subTreeTextContent;
  subTreeTextContent = previousSubTreeTextContent + subTreeTextContent;
}
function isLastChildLineBreakOrDecorator(element, nodeMap) {
  if (element) {
    const lastKey = element.__last;
    if (lastKey) {
      const node = nodeMap.get(lastKey);
      if (node) {
        return $isLineBreakNode(node) ? "line-break" : $isDecoratorNode(node) && node.isInline() ? "decorator" : null;
      }
    }
    return "empty";
  }
  return null;
}
function reconcileElementTerminatingLineBreak(prevElement, nextElement, dom) {
  const prevLineBreak = isLastChildLineBreakOrDecorator(prevElement, activePrevNodeMap);
  const nextLineBreak = isLastChildLineBreakOrDecorator(nextElement, activeNextNodeMap);
  if (prevLineBreak !== nextLineBreak) {
    nextElement.getDOMSlot(dom).setManagedLineBreak(nextLineBreak);
  }
}
function reconcileTextFormat(element) {
  if (subTreeTextFormat != null && subTreeTextFormat !== element.__textFormat && !activeEditorStateReadOnly) {
    element.setTextFormat(subTreeTextFormat);
  }
}
function reconcileTextStyle(element) {
  if (subTreeTextStyle != null && subTreeTextStyle !== element.__textStyle && !activeEditorStateReadOnly) {
    element.setTextStyle(subTreeTextStyle);
  }
}
function $reconcileChildrenWithDirection(prevElement, nextElement, dom) {
  subTreeTextFormat = null;
  subTreeTextStyle = null;
  $reconcileChildren(prevElement, nextElement, nextElement.getDOMSlot(dom));
  reconcileTextFormat(nextElement);
  reconcileTextStyle(nextElement);
}
function createChildrenArray(element, nodeMap) {
  const children = [];
  let nodeKey = element.__first;
  while (nodeKey !== null) {
    const node = nodeMap.get(nodeKey);
    if (node === void 0) {
      {
        formatDevErrorMessage(`createChildrenArray: node does not exist in nodeMap`);
      }
    }
    children.push(nodeKey);
    nodeKey = node.__next;
  }
  return children;
}
function $reconcileChildren(prevElement, nextElement, slot) {
  const previousSubTreeTextContent = subTreeTextContent;
  const prevChildrenSize = prevElement.__size;
  const nextChildrenSize = nextElement.__size;
  subTreeTextContent = "";
  const dom = slot.element;
  if (prevChildrenSize === 1 && nextChildrenSize === 1) {
    const prevFirstChildKey = prevElement.__first;
    const nextFirstChildKey = nextElement.__first;
    if (prevFirstChildKey === nextFirstChildKey) {
      $reconcileNode(prevFirstChildKey, dom);
    } else {
      const lastDOM = getPrevElementByKeyOrThrow(prevFirstChildKey);
      const replacementDOM = $createNode(nextFirstChildKey, null);
      try {
        dom.replaceChild(replacementDOM, lastDOM);
      } catch (error) {
        if (typeof error === "object" && error != null) {
          const msg = `${error.toString()} Parent: ${dom.tagName}, new child: {tag: ${replacementDOM.tagName} key: ${nextFirstChildKey}}, old child: {tag: ${lastDOM.tagName}, key: ${prevFirstChildKey}}.`;
          throw new Error(msg);
        } else {
          throw error;
        }
      }
      destroyNode(prevFirstChildKey, null);
    }
    const nextChildNode = activeNextNodeMap.get(nextFirstChildKey);
    if ($isTextNode(nextChildNode)) {
      if (subTreeTextFormat === null) {
        subTreeTextFormat = nextChildNode.getFormat();
        subTreeTextStyle = nextChildNode.getStyle();
      }
    }
  } else {
    const prevChildren = createChildrenArray(prevElement, activePrevNodeMap);
    const nextChildren = createChildrenArray(nextElement, activeNextNodeMap);
    if (!(prevChildren.length === prevChildrenSize)) {
      formatDevErrorMessage(`$reconcileChildren: prevChildren.length !== prevChildrenSize`);
    }
    if (!(nextChildren.length === nextChildrenSize)) {
      formatDevErrorMessage(`$reconcileChildren: nextChildren.length !== nextChildrenSize`);
    }
    if (prevChildrenSize === 0) {
      if (nextChildrenSize !== 0) {
        $createChildren(nextChildren, nextElement, 0, nextChildrenSize - 1, slot);
      }
    } else if (nextChildrenSize === 0) {
      if (prevChildrenSize !== 0) {
        const canUseFastPath = slot.after == null && slot.before == null && slot.element.__lexicalLineBreak == null;
        destroyChildren(prevChildren, 0, prevChildrenSize - 1, canUseFastPath ? null : dom);
        if (canUseFastPath) {
          dom.textContent = "";
        }
      }
    } else {
      $reconcileNodeChildren(nextElement, prevChildren, nextChildren, prevChildrenSize, nextChildrenSize, slot);
    }
  }
  dom.__lexicalTextContent = subTreeTextContent;
  subTreeTextContent = previousSubTreeTextContent + subTreeTextContent;
}
function $reconcileNode(key, parentDOM) {
  const prevNode = activePrevNodeMap.get(key);
  let nextNode = activeNextNodeMap.get(key);
  if (prevNode === void 0 || nextNode === void 0) {
    {
      formatDevErrorMessage(`reconcileNode: prevNode or nextNode does not exist in nodeMap`);
    }
  }
  const isDirty = treatAllNodesAsDirty || activeDirtyLeaves.has(key) || activeDirtyElements.has(key);
  const dom = getElementByKeyOrThrow(activeEditor$1, key);
  if (prevNode === nextNode && !isDirty) {
    let text;
    if ($isElementNode(prevNode)) {
      const previousSubTreeTextContent = dom.__lexicalTextContent;
      if (typeof previousSubTreeTextContent === "string") {
        text = previousSubTreeTextContent;
      } else {
        text = prevNode.getTextContent();
        dom.__lexicalTextContent = text;
      }
    } else {
      text = prevNode.getTextContent();
    }
    subTreeTextContent += text;
    return dom;
  }
  if (prevNode !== nextNode && isDirty) {
    setMutatedNode(mutatedNodes, activeEditorNodes, activeMutationListeners, nextNode, "updated");
  }
  if (nextNode.updateDOM(prevNode, dom, activeEditorConfig)) {
    const replacementDOM = $createNode(key, null);
    if (parentDOM === null) {
      {
        formatDevErrorMessage(`reconcileNode: parentDOM is null`);
      }
    }
    parentDOM.replaceChild(replacementDOM, dom);
    destroyNode(key, null);
    return replacementDOM;
  }
  if ($isElementNode(prevNode)) {
    if (!$isElementNode(nextNode)) {
      formatDevErrorMessage(`Node with key ${key} changed from ElementNode to !ElementNode`);
    }
    const nextIndent = nextNode.__indent;
    if (treatAllNodesAsDirty || nextIndent !== prevNode.__indent) {
      setElementIndent(dom, nextIndent);
    }
    const nextFormat = nextNode.__format;
    if (treatAllNodesAsDirty || nextFormat !== prevNode.__format) {
      setElementFormat(dom, nextFormat);
    }
    if (isDirty) {
      $reconcileChildrenWithDirection(prevNode, nextNode, dom);
      if (!$isRootNode(nextNode) && !nextNode.isInline()) {
        reconcileElementTerminatingLineBreak(prevNode, nextNode, dom);
      }
    } else {
      const previousSubTreeTextContent = dom.__lexicalTextContent;
      let text;
      if (typeof previousSubTreeTextContent === "string") {
        text = previousSubTreeTextContent;
      } else {
        text = prevNode.getTextContent();
        dom.__lexicalTextContent = text;
      }
      subTreeTextContent += text;
    }
    if (treatAllNodesAsDirty || nextNode.__dir !== prevNode.__dir) {
      $setElementDirection(dom, nextNode);
      if (
        // Root node direction changing from set to unset (or vice versa)
        // changes how children's direction is calculated.
        $isRootNode(nextNode) && // Can skip if all children already reconciled.
        !treatAllNodesAsDirty
      ) {
        for (const child of nextNode.getChildren()) {
          if ($isElementNode(child)) {
            const childDom = getElementByKeyOrThrow(activeEditor$1, child.getKey());
            $setElementDirection(childDom, child);
          }
        }
      }
    }
  } else {
    const text = nextNode.getTextContent();
    if ($isDecoratorNode(nextNode)) {
      const decorator = nextNode.decorate(activeEditor$1, activeEditorConfig);
      if (decorator !== null) {
        reconcileDecorator(key, decorator);
      }
    }
    subTreeTextContent += text;
  }
  if (!activeEditorStateReadOnly && $isRootNode(nextNode) && nextNode.__cachedText !== subTreeTextContent) {
    const nextRootNode = nextNode.getWritable();
    nextRootNode.__cachedText = subTreeTextContent;
    nextNode = nextRootNode;
  }
  {
    Object.freeze(nextNode);
  }
  return dom;
}
function reconcileDecorator(key, decorator) {
  let pendingDecorators = activeEditor$1._pendingDecorators;
  const currentDecorators = activeEditor$1._decorators;
  if (pendingDecorators === null) {
    if (currentDecorators[key] === decorator) {
      return;
    }
    pendingDecorators = cloneDecorators(activeEditor$1);
  }
  pendingDecorators[key] = decorator;
}
function getNextSibling(element) {
  let nextSibling = element.nextSibling;
  if (nextSibling !== null && nextSibling === activeEditor$1._blockCursorElement) {
    nextSibling = nextSibling.nextSibling;
  }
  return nextSibling;
}
function childrenSet(children, start) {
  const s2 = /* @__PURE__ */ new Set();
  for (let i2 = start; i2 < children.length; i2++) {
    s2.add(children[i2]);
  }
  return s2;
}
function $reconcileNodeChildren(nextElement, prevChildren, nextChildren, prevChildrenLength, nextChildrenLength, slot) {
  const prevEndIndex = prevChildrenLength - 1;
  const nextEndIndex = nextChildrenLength - 1;
  let prevChildrenSet;
  let nextChildrenSet;
  let siblingDOM = slot.getFirstChild();
  let prevIndex = 0;
  let nextIndex = 0;
  while (prevIndex <= prevEndIndex && nextIndex <= nextEndIndex) {
    const prevKey = prevChildren[prevIndex];
    const nextKey = nextChildren[nextIndex];
    if (prevKey === nextKey) {
      siblingDOM = getNextSibling($reconcileNode(nextKey, slot.element));
      prevIndex++;
      nextIndex++;
    } else {
      if (nextChildrenSet === void 0) {
        nextChildrenSet = childrenSet(nextChildren, nextIndex);
      }
      if (prevChildrenSet === void 0) {
        prevChildrenSet = childrenSet(prevChildren, prevIndex);
      } else if (!prevChildrenSet.has(prevKey)) {
        prevIndex++;
        continue;
      }
      if (!nextChildrenSet.has(prevKey)) {
        siblingDOM = getNextSibling(getPrevElementByKeyOrThrow(prevKey));
        destroyNode(prevKey, slot.element);
        prevIndex++;
        prevChildrenSet.delete(prevKey);
        continue;
      }
      if (!prevChildrenSet.has(nextKey)) {
        $createNode(nextKey, slot.withBefore(siblingDOM));
        nextIndex++;
      } else {
        const childDOM = getElementByKeyOrThrow(activeEditor$1, nextKey);
        if (childDOM !== siblingDOM) {
          slot.withBefore(siblingDOM).insertChild(childDOM);
        }
        siblingDOM = getNextSibling($reconcileNode(nextKey, slot.element));
        prevIndex++;
        nextIndex++;
      }
    }
    const node = activeNextNodeMap.get(nextKey);
    if (node !== null && $isTextNode(node)) {
      if (subTreeTextFormat === null) {
        subTreeTextFormat = node.getFormat();
        subTreeTextStyle = node.getStyle();
      }
    } else if (
      // inline $textContentRequiresDoubleLinebreakAtEnd
      $isElementNode(node) && nextIndex <= nextEndIndex && !node.isInline()
    ) {
      subTreeTextContent += DOUBLE_LINE_BREAK;
    }
  }
  const appendNewChildren = prevIndex > prevEndIndex;
  const removeOldChildren = nextIndex > nextEndIndex;
  if (appendNewChildren && !removeOldChildren) {
    const previousNode = nextChildren[nextEndIndex + 1];
    const insertDOM = previousNode === void 0 ? null : activeEditor$1.getElementByKey(previousNode);
    $createChildren(nextChildren, nextElement, nextIndex, nextEndIndex, slot.withBefore(insertDOM));
  } else if (removeOldChildren && !appendNewChildren) {
    destroyChildren(prevChildren, prevIndex, prevEndIndex, slot.element);
  }
}
function $reconcileRoot(prevEditorState, nextEditorState, editor, dirtyType, dirtyElements, dirtyLeaves) {
  subTreeTextContent = "";
  treatAllNodesAsDirty = dirtyType === FULL_RECONCILE;
  activeEditor$1 = editor;
  activeEditorConfig = editor._config;
  activeEditorNodes = editor._nodes;
  activeMutationListeners = activeEditor$1._listeners.mutation;
  activeDirtyElements = dirtyElements;
  activeDirtyLeaves = dirtyLeaves;
  activePrevNodeMap = prevEditorState._nodeMap;
  activeNextNodeMap = nextEditorState._nodeMap;
  activeEditorStateReadOnly = nextEditorState._readOnly;
  activePrevKeyToDOMMap = new Map(editor._keyToDOMMap);
  const currentMutatedNodes = /* @__PURE__ */ new Map();
  mutatedNodes = currentMutatedNodes;
  $reconcileNode("root", null);
  activeEditor$1 = void 0;
  activeEditorNodes = void 0;
  activeDirtyElements = void 0;
  activeDirtyLeaves = void 0;
  activePrevNodeMap = void 0;
  activeNextNodeMap = void 0;
  activeEditorConfig = void 0;
  activePrevKeyToDOMMap = void 0;
  mutatedNodes = void 0;
  return currentMutatedNodes;
}
function storeDOMWithKey(key, dom, editor) {
  const keyToDOMMap = editor._keyToDOMMap;
  setNodeKeyOnDOMNode(dom, editor, key);
  keyToDOMMap.set(key, dom);
}
function getPrevElementByKeyOrThrow(key) {
  const element = activePrevKeyToDOMMap.get(key);
  if (element === void 0) {
    {
      formatDevErrorMessage(`Reconciliation: could not find DOM element for node key ${key}`);
    }
  }
  return element;
}
function warnOnlyOnce(message) {
  {
    let run = false;
    return () => {
      if (!run) {
        console.warn(message);
      }
      run = true;
    };
  }
}
// @__NO_SIDE_EFFECTS__
function createCommand(type) {
  return {
    type
  };
}
var SELECTION_CHANGE_COMMAND = /* @__PURE__ */ createCommand("SELECTION_CHANGE_COMMAND");
var SELECTION_INSERT_CLIPBOARD_NODES_COMMAND = /* @__PURE__ */ createCommand("SELECTION_INSERT_CLIPBOARD_NODES_COMMAND");
var CLICK_COMMAND = /* @__PURE__ */ createCommand("CLICK_COMMAND");
var BEFORE_INPUT_COMMAND = /* @__PURE__ */ createCommand("BEFORE_INPUT_COMMAND");
var INPUT_COMMAND = /* @__PURE__ */ createCommand("INPUT_COMMAND");
var COMPOSITION_START_COMMAND = /* @__PURE__ */ createCommand("COMPOSITION_START_COMMAND");
var COMPOSITION_END_COMMAND = /* @__PURE__ */ createCommand("COMPOSITION_END_COMMAND");
var DELETE_CHARACTER_COMMAND = /* @__PURE__ */ createCommand("DELETE_CHARACTER_COMMAND");
var INSERT_LINE_BREAK_COMMAND = /* @__PURE__ */ createCommand("INSERT_LINE_BREAK_COMMAND");
var INSERT_PARAGRAPH_COMMAND = /* @__PURE__ */ createCommand("INSERT_PARAGRAPH_COMMAND");
var CONTROLLED_TEXT_INSERTION_COMMAND = /* @__PURE__ */ createCommand("CONTROLLED_TEXT_INSERTION_COMMAND");
var PASTE_COMMAND = /* @__PURE__ */ createCommand("PASTE_COMMAND");
var REMOVE_TEXT_COMMAND = /* @__PURE__ */ createCommand("REMOVE_TEXT_COMMAND");
var DELETE_WORD_COMMAND = /* @__PURE__ */ createCommand("DELETE_WORD_COMMAND");
var DELETE_LINE_COMMAND = /* @__PURE__ */ createCommand("DELETE_LINE_COMMAND");
var FORMAT_TEXT_COMMAND = /* @__PURE__ */ createCommand("FORMAT_TEXT_COMMAND");
var UNDO_COMMAND = /* @__PURE__ */ createCommand("UNDO_COMMAND");
var REDO_COMMAND = /* @__PURE__ */ createCommand("REDO_COMMAND");
var KEY_DOWN_COMMAND = /* @__PURE__ */ createCommand("KEYDOWN_COMMAND");
var KEY_ARROW_RIGHT_COMMAND = /* @__PURE__ */ createCommand("KEY_ARROW_RIGHT_COMMAND");
var MOVE_TO_END = /* @__PURE__ */ createCommand("MOVE_TO_END");
var KEY_ARROW_LEFT_COMMAND = /* @__PURE__ */ createCommand("KEY_ARROW_LEFT_COMMAND");
var MOVE_TO_START = /* @__PURE__ */ createCommand("MOVE_TO_START");
var KEY_ARROW_UP_COMMAND = /* @__PURE__ */ createCommand("KEY_ARROW_UP_COMMAND");
var KEY_ARROW_DOWN_COMMAND = /* @__PURE__ */ createCommand("KEY_ARROW_DOWN_COMMAND");
var KEY_ENTER_COMMAND = /* @__PURE__ */ createCommand("KEY_ENTER_COMMAND");
var KEY_SPACE_COMMAND = /* @__PURE__ */ createCommand("KEY_SPACE_COMMAND");
var KEY_BACKSPACE_COMMAND = /* @__PURE__ */ createCommand("KEY_BACKSPACE_COMMAND");
var KEY_ESCAPE_COMMAND = /* @__PURE__ */ createCommand("KEY_ESCAPE_COMMAND");
var KEY_DELETE_COMMAND = /* @__PURE__ */ createCommand("KEY_DELETE_COMMAND");
var KEY_TAB_COMMAND = /* @__PURE__ */ createCommand("KEY_TAB_COMMAND");
var INSERT_TAB_COMMAND = /* @__PURE__ */ createCommand("INSERT_TAB_COMMAND");
var INDENT_CONTENT_COMMAND = /* @__PURE__ */ createCommand("INDENT_CONTENT_COMMAND");
var OUTDENT_CONTENT_COMMAND = /* @__PURE__ */ createCommand("OUTDENT_CONTENT_COMMAND");
var DROP_COMMAND = /* @__PURE__ */ createCommand("DROP_COMMAND");
var FORMAT_ELEMENT_COMMAND = /* @__PURE__ */ createCommand("FORMAT_ELEMENT_COMMAND");
var DRAGSTART_COMMAND = /* @__PURE__ */ createCommand("DRAGSTART_COMMAND");
var DRAGOVER_COMMAND = /* @__PURE__ */ createCommand("DRAGOVER_COMMAND");
var DRAGEND_COMMAND = /* @__PURE__ */ createCommand("DRAGEND_COMMAND");
var COPY_COMMAND = /* @__PURE__ */ createCommand("COPY_COMMAND");
var CUT_COMMAND = /* @__PURE__ */ createCommand("CUT_COMMAND");
var SELECT_ALL_COMMAND = /* @__PURE__ */ createCommand("SELECT_ALL_COMMAND");
var CLEAR_EDITOR_COMMAND = /* @__PURE__ */ createCommand("CLEAR_EDITOR_COMMAND");
var CLEAR_HISTORY_COMMAND = /* @__PURE__ */ createCommand("CLEAR_HISTORY_COMMAND");
var CAN_REDO_COMMAND = /* @__PURE__ */ createCommand("CAN_REDO_COMMAND");
var CAN_UNDO_COMMAND = /* @__PURE__ */ createCommand("CAN_UNDO_COMMAND");
var FOCUS_COMMAND = /* @__PURE__ */ createCommand("FOCUS_COMMAND");
var BLUR_COMMAND = /* @__PURE__ */ createCommand("BLUR_COMMAND");
var KEY_MODIFIER_COMMAND = /* @__PURE__ */ createCommand("KEY_MODIFIER_COMMAND");
var PASS_THROUGH_COMMAND = Object.freeze({});
var ANDROID_COMPOSITION_LATENCY = 30;
var rootElementEvents = [["keydown", onKeyDown], ["pointerdown", onPointerDown], ["compositionstart", onCompositionStart], ["compositionend", onCompositionEnd], ["input", onInput], ["click", onClick], ["cut", PASS_THROUGH_COMMAND], ["copy", PASS_THROUGH_COMMAND], ["dragstart", PASS_THROUGH_COMMAND], ["dragover", PASS_THROUGH_COMMAND], ["dragend", PASS_THROUGH_COMMAND], ["paste", PASS_THROUGH_COMMAND], ["focus", PASS_THROUGH_COMMAND], ["blur", PASS_THROUGH_COMMAND], ["drop", PASS_THROUGH_COMMAND]];
if (CAN_USE_BEFORE_INPUT) {
  rootElementEvents.push(["beforeinput", (event, editor) => onBeforeInput(event, editor)]);
}
var lastKeyDownTimeStamp = 0;
var lastKeyCode = null;
var lastBeforeInputInsertTextTimeStamp = 0;
var unprocessedBeforeInputData = null;
var rootElementToDocument = /* @__PURE__ */ new WeakMap();
var rootElementsRegistered = /* @__PURE__ */ new WeakMap();
var isSelectionChangeFromDOMUpdate = false;
var isSelectionChangeFromMouseDown = false;
var isInsertLineBreak = false;
var isFirefoxEndingComposition = false;
var isSafariEndingComposition = false;
var safariEndCompositionEventData = "";
var postDeleteSelectionToRestore = null;
var collapsedSelectionFormat = [0, "", 0, "root", 0];
function $shouldPreventDefaultAndInsertText(selection, domTargetRange, text, timeStamp, isBeforeInput) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = anchor.getNode();
  const editor = getActiveEditor();
  const domSelection = getDOMSelection(getWindow(editor));
  const domAnchorNode = domSelection !== null ? domSelection.anchorNode : null;
  const anchorKey = anchor.key;
  const backingAnchorElement = editor.getElementByKey(anchorKey);
  const textLength = text.length;
  return anchorKey !== focus.key || // If we're working with a non-text node.
  !$isTextNode(anchorNode) || // If we are replacing a range with a single character or grapheme, and not composing.
  (!isBeforeInput && (!CAN_USE_BEFORE_INPUT || // We check to see if there has been
  // a recent beforeinput event for "textInput". If there has been one in the last
  // 50ms then we proceed as normal. However, if there is not, then this is likely
  // a dangling `input` event caused by execCommand('insertText').
  lastBeforeInputInsertTextTimeStamp < timeStamp + 50) || anchorNode.isDirty() && textLength < 2 || // TODO consider if there are other scenarios when multiple code units
  //      should be addressed here
  doesContainSurrogatePair(text)) && anchor.offset !== focus.offset && !anchorNode.isComposing() || // Any non standard text node.
  $isTokenOrSegmented(anchorNode) || // If the text length is more than a single character and we're either
  // dealing with this in "beforeinput" or where the node has already recently
  // been changed (thus is dirty).
  anchorNode.isDirty() && textLength > 1 || // If the DOM selection element is not the same as the backing node during beforeinput.
  (isBeforeInput || !CAN_USE_BEFORE_INPUT) && backingAnchorElement !== null && !anchorNode.isComposing() && domAnchorNode !== getDOMTextNode(backingAnchorElement) || // If TargetRange is not the same as the DOM selection; browser trying to edit random parts
  // of the editor.
  domSelection !== null && domTargetRange !== null && (!domTargetRange.collapsed || domTargetRange.startContainer !== domSelection.anchorNode || domTargetRange.startOffset !== domSelection.anchorOffset) || // Check if we're changing from bold to italics, or some other format.
  !anchorNode.isComposing() && (anchorNode.getFormat() !== selection.format || anchorNode.getStyle() !== selection.style) || // One last set of heuristics to check against.
  $shouldInsertTextAfterOrBeforeTextNode(selection, anchorNode);
}
function shouldSkipSelectionChange(domNode, offset) {
  return isDOMTextNode(domNode) && domNode.nodeValue !== null && offset !== 0 && offset !== domNode.nodeValue.length;
}
function onSelectionChange(domSelection, editor, isActive) {
  const {
    anchorNode: anchorDOM,
    anchorOffset,
    focusNode: focusDOM,
    focusOffset
  } = domSelection;
  if (isSelectionChangeFromDOMUpdate) {
    isSelectionChangeFromDOMUpdate = false;
    if (shouldSkipSelectionChange(anchorDOM, anchorOffset) && shouldSkipSelectionChange(focusDOM, focusOffset) && !postDeleteSelectionToRestore) {
      return;
    }
  }
  updateEditorSync(editor, () => {
    if (!isActive) {
      $setSelection(null);
      return;
    }
    if (!isSelectionWithinEditor(editor, anchorDOM, focusDOM)) {
      return;
    }
    let selection = $getSelection();
    if (postDeleteSelectionToRestore && $isRangeSelection(selection) && selection.isCollapsed()) {
      const curAnchor = selection.anchor;
      const prevAnchor = postDeleteSelectionToRestore.anchor;
      if (
        // Rightward shift in same node
        curAnchor.key === prevAnchor.key && curAnchor.offset === prevAnchor.offset + 1 || // Or rightward shift into sibling node
        curAnchor.offset === 1 && prevAnchor.getNode().is(curAnchor.getNode().getPreviousSibling())
      ) {
        selection = postDeleteSelectionToRestore.clone();
        $setSelection(selection);
      }
    }
    postDeleteSelectionToRestore = null;
    if ($isRangeSelection(selection)) {
      const anchor = selection.anchor;
      const anchorNode = anchor.getNode();
      if (selection.isCollapsed()) {
        if (domSelection.type === "Range" && domSelection.anchorNode === domSelection.focusNode) {
          selection.dirty = true;
        }
        const windowEvent = getWindow(editor).event;
        const currentTimeStamp = windowEvent ? windowEvent.timeStamp : performance.now();
        const [lastFormat, lastStyle, lastOffset, lastKey, timeStamp] = collapsedSelectionFormat;
        const root = $getRoot();
        const isRootTextContentEmpty = editor.isComposing() === false && root.getTextContent() === "";
        if (currentTimeStamp < timeStamp + 200 && anchor.offset === lastOffset && anchor.key === lastKey) {
          $updateSelectionFormatStyle(selection, lastFormat, lastStyle);
        } else {
          if (anchor.type === "text") {
            if (!$isTextNode(anchorNode)) {
              formatDevErrorMessage(`Point.getNode() must return TextNode when type is text`);
            }
            $updateSelectionFormatStyleFromTextNode(selection, anchorNode);
          } else if (anchor.type === "element" && !isRootTextContentEmpty) {
            if (!$isElementNode(anchorNode)) {
              formatDevErrorMessage(`Point.getNode() must return ElementNode when type is element`);
            }
            const lastNode = anchor.getNode();
            if (
              // This previously applied to all ParagraphNode
              lastNode.isEmpty()
            ) {
              $updateSelectionFormatStyleFromElementNode(selection, lastNode);
            } else {
              $updateSelectionFormatStyle(selection, 0, "");
            }
          }
        }
      } else {
        const anchorKey = anchor.key;
        const focus = selection.focus;
        const focusKey = focus.key;
        const nodes = selection.getNodes();
        const nodesLength = nodes.length;
        const isBackward = selection.isBackward();
        const startOffset = isBackward ? focusOffset : anchorOffset;
        const endOffset = isBackward ? anchorOffset : focusOffset;
        const startKey = isBackward ? focusKey : anchorKey;
        const endKey = isBackward ? anchorKey : focusKey;
        let combinedFormat = IS_ALL_FORMATTING;
        let hasTextNodes = false;
        for (let i2 = 0; i2 < nodesLength; i2++) {
          const node = nodes[i2];
          const textContentSize = node.getTextContentSize();
          if ($isTextNode(node) && textContentSize !== 0 && // Exclude empty text nodes at boundaries resulting from user's selection
          !(i2 === 0 && node.__key === startKey && startOffset === textContentSize || i2 === nodesLength - 1 && node.__key === endKey && endOffset === 0)) {
            hasTextNodes = true;
            combinedFormat &= node.getFormat();
            if (combinedFormat === 0) {
              break;
            }
          }
        }
        selection.format = hasTextNodes ? combinedFormat : 0;
      }
    }
    dispatchCommand(editor, SELECTION_CHANGE_COMMAND, void 0);
  });
}
function $updateSelectionFormatStyle(selection, format, style) {
  if (selection.format !== format || selection.style !== style) {
    selection.format = format;
    selection.style = style;
    selection.dirty = true;
  }
}
function $updateSelectionFormatStyleFromTextNode(selection, node) {
  const format = node.getFormat();
  const style = node.getStyle();
  $updateSelectionFormatStyle(selection, format, style);
}
function $updateSelectionFormatStyleFromElementNode(selection, node) {
  const format = node.getTextFormat();
  const style = node.getTextStyle();
  $updateSelectionFormatStyle(selection, format, style);
}
function onClick(event, editor) {
  updateEditorSync(editor, () => {
    const selection = $getSelection();
    const domSelection = getDOMSelection(getWindow(editor));
    const lastSelection = $getPreviousSelection();
    if (domSelection) {
      if ($isRangeSelection(selection)) {
        const anchor = selection.anchor;
        const anchorNode = anchor.getNode();
        if (anchor.type === "element" && anchor.offset === 0 && selection.isCollapsed() && !$isRootNode(anchorNode) && $getRoot().getChildrenSize() === 1 && anchorNode.getTopLevelElementOrThrow().isEmpty() && lastSelection !== null && selection.is(lastSelection)) {
          domSelection.removeAllRanges();
          selection.dirty = true;
        } else if (event.detail === 3 && !selection.isCollapsed()) {
          const focus = selection.focus;
          const focusNode = focus.getNode();
          if (anchorNode !== focusNode) {
            const parentNode = $findMatchingParent(anchorNode, (node) => $isElementNode(node) && !node.isInline());
            if ($isElementNode(parentNode)) {
              parentNode.select(0);
            }
          }
        }
      } else if (event.pointerType === "touch" || event.pointerType === "pen") {
        const domAnchorNode = domSelection.anchorNode;
        if (isHTMLElement(domAnchorNode) || isDOMTextNode(domAnchorNode)) {
          const newSelection = $internalCreateRangeSelection(lastSelection, domSelection, editor, event);
          $setSelection(newSelection);
        }
      }
    }
    dispatchCommand(editor, CLICK_COMMAND, event);
  });
}
function onPointerDown(event, editor) {
  const target = event.target;
  const pointerType = event.pointerType;
  if (isDOMNode(target) && pointerType !== "touch" && pointerType !== "pen" && event.button === 0) {
    updateEditorSync(editor, () => {
      if (!$isSelectionCapturedInDecorator(target)) {
        isSelectionChangeFromMouseDown = true;
      }
    });
  }
}
function getTargetRange(event) {
  if (!event.getTargetRanges) {
    return null;
  }
  const targetRanges = event.getTargetRanges();
  if (targetRanges.length === 0) {
    return null;
  }
  return targetRanges[0];
}
function $canRemoveText(anchorNode, focusNode) {
  return anchorNode !== focusNode || $isElementNode(anchorNode) || $isElementNode(focusNode) || !$isTokenOrTab(anchorNode) || !$isTokenOrTab(focusNode);
}
function isPossiblyAndroidKeyPress(timeStamp) {
  return lastKeyCode === "MediaLast" && timeStamp < lastKeyDownTimeStamp + ANDROID_COMPOSITION_LATENCY;
}
function registerDefaultCommandHandlers(editor) {
  editor.registerCommand(BEFORE_INPUT_COMMAND, $handleBeforeInput, COMMAND_PRIORITY_EDITOR);
  editor.registerCommand(INPUT_COMMAND, $handleInput, COMMAND_PRIORITY_EDITOR);
  editor.registerCommand(COMPOSITION_START_COMMAND, $handleCompositionStart, COMMAND_PRIORITY_EDITOR);
  editor.registerCommand(COMPOSITION_END_COMMAND, $handleCompositionEnd, COMMAND_PRIORITY_EDITOR);
  editor.registerCommand(KEY_DOWN_COMMAND, $handleKeyDown, COMMAND_PRIORITY_EDITOR);
}
function onBeforeInput(event, editor) {
  const inputType = event.inputType;
  if (inputType === "deleteCompositionText" || // If we're pasting in FF, we shouldn't get this event
  // as the `paste` event should have triggered, unless the
  // user has dom.event.clipboardevents.enabled disabled in
  // about:config. In that case, we need to process the
  // pasted content in the DOM mutation phase.
  IS_FIREFOX && isFirefoxClipboardEvents(editor)) {
    return;
  } else if (inputType === "insertCompositionText") {
    return;
  }
  dispatchCommand(editor, BEFORE_INPUT_COMMAND, event);
}
function $handleBeforeInput(event) {
  const inputType = event.inputType;
  const targetRange = getTargetRange(event);
  const editor = getActiveEditor();
  const selection = $getSelection();
  if (inputType === "deleteContentBackward") {
    if (selection === null) {
      const prevSelection = $getPreviousSelection();
      if (!$isRangeSelection(prevSelection)) {
        return true;
      }
      $setSelection(prevSelection.clone());
    }
    if ($isRangeSelection(selection)) {
      const isSelectionAnchorSameAsFocus = selection.anchor.key === selection.focus.key;
      if (isPossiblyAndroidKeyPress(event.timeStamp) && editor.isComposing() && isSelectionAnchorSameAsFocus) {
        $setCompositionKey(null);
        lastKeyDownTimeStamp = 0;
        setTimeout(() => {
          updateEditorSync(editor, () => {
            $setCompositionKey(null);
          });
        }, ANDROID_COMPOSITION_LATENCY);
        if ($isRangeSelection(selection)) {
          const anchorNode2 = selection.anchor.getNode();
          anchorNode2.markDirty();
          if (!$isTextNode(anchorNode2)) {
            formatDevErrorMessage(`Anchor node must be a TextNode`);
          }
          $updateSelectionFormatStyleFromTextNode(selection, anchorNode2);
        }
      } else {
        $setCompositionKey(null);
        event.preventDefault();
        const selectedNode = selection.anchor.getNode();
        const selectedNodeText = selectedNode.getTextContent();
        const selectedNodeCanInsertTextAfter = selectedNode.canInsertTextAfter();
        const hasSelectedAllTextInNode = selection.anchor.offset === 0 && selection.focus.offset === selectedNodeText.length;
        let shouldLetBrowserHandleDelete = IS_ANDROID_CHROME && isSelectionAnchorSameAsFocus && !hasSelectedAllTextInNode && selectedNodeCanInsertTextAfter;
        if (shouldLetBrowserHandleDelete && selection.isCollapsed()) {
          shouldLetBrowserHandleDelete = !$isDecoratorNode($getAdjacentNode(selection.anchor, true));
        }
        if (!shouldLetBrowserHandleDelete) {
          dispatchCommand(editor, DELETE_CHARACTER_COMMAND, true);
          const selectionAfterDelete = $getSelection();
          if (IS_ANDROID_CHROME && $isRangeSelection(selectionAfterDelete) && selectionAfterDelete.isCollapsed()) {
            postDeleteSelectionToRestore = selectionAfterDelete;
            setTimeout(() => postDeleteSelectionToRestore = null);
          }
        }
      }
      return true;
    }
  }
  if (!$isRangeSelection(selection)) {
    return true;
  }
  const data = event.data;
  if (unprocessedBeforeInputData !== null) {
    $updateSelectedTextFromDOM(false, editor, unprocessedBeforeInputData);
  }
  if ((!selection.dirty || unprocessedBeforeInputData !== null) && selection.isCollapsed() && !$isRootNode(selection.anchor.getNode()) && targetRange !== null) {
    selection.applyDOMRange(targetRange);
  }
  unprocessedBeforeInputData = null;
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = anchor.getNode();
  const focusNode = focus.getNode();
  if (inputType === "insertText" || inputType === "insertTranspose") {
    if (data === "\n") {
      event.preventDefault();
      dispatchCommand(editor, INSERT_LINE_BREAK_COMMAND, false);
    } else if (data === DOUBLE_LINE_BREAK) {
      event.preventDefault();
      dispatchCommand(editor, INSERT_PARAGRAPH_COMMAND, void 0);
    } else if (data == null && event.dataTransfer) {
      const text = event.dataTransfer.getData("text/plain");
      event.preventDefault();
      selection.insertRawText(text);
    } else if (data != null && $shouldPreventDefaultAndInsertText(selection, targetRange, data, event.timeStamp, true)) {
      event.preventDefault();
      dispatchCommand(editor, CONTROLLED_TEXT_INSERTION_COMMAND, data);
    } else {
      unprocessedBeforeInputData = data;
    }
    lastBeforeInputInsertTextTimeStamp = event.timeStamp;
    return true;
  }
  event.preventDefault();
  switch (inputType) {
    case "insertFromYank":
    case "insertFromDrop":
    case "insertReplacementText": {
      dispatchCommand(editor, CONTROLLED_TEXT_INSERTION_COMMAND, event);
      break;
    }
    case "insertFromComposition": {
      $setCompositionKey(null);
      dispatchCommand(editor, CONTROLLED_TEXT_INSERTION_COMMAND, event);
      break;
    }
    case "insertLineBreak": {
      $setCompositionKey(null);
      dispatchCommand(editor, INSERT_LINE_BREAK_COMMAND, false);
      break;
    }
    case "insertParagraph": {
      $setCompositionKey(null);
      if (isInsertLineBreak && !IS_IOS) {
        isInsertLineBreak = false;
        dispatchCommand(editor, INSERT_LINE_BREAK_COMMAND, false);
      } else {
        dispatchCommand(editor, INSERT_PARAGRAPH_COMMAND, void 0);
      }
      break;
    }
    case "insertFromPaste":
    case "insertFromPasteAsQuotation": {
      dispatchCommand(editor, PASTE_COMMAND, event);
      break;
    }
    case "deleteByComposition": {
      if ($canRemoveText(anchorNode, focusNode)) {
        dispatchCommand(editor, REMOVE_TEXT_COMMAND, event);
      }
      break;
    }
    case "deleteByDrag":
    case "deleteByCut": {
      dispatchCommand(editor, REMOVE_TEXT_COMMAND, event);
      break;
    }
    case "deleteContent": {
      dispatchCommand(editor, DELETE_CHARACTER_COMMAND, false);
      break;
    }
    case "deleteWordBackward": {
      dispatchCommand(editor, DELETE_WORD_COMMAND, true);
      break;
    }
    case "deleteWordForward": {
      dispatchCommand(editor, DELETE_WORD_COMMAND, false);
      break;
    }
    case "deleteHardLineBackward":
    case "deleteSoftLineBackward": {
      dispatchCommand(editor, DELETE_LINE_COMMAND, true);
      break;
    }
    case "deleteContentForward":
    case "deleteHardLineForward":
    case "deleteSoftLineForward": {
      dispatchCommand(editor, DELETE_LINE_COMMAND, false);
      break;
    }
    case "formatStrikeThrough": {
      dispatchCommand(editor, FORMAT_TEXT_COMMAND, "strikethrough");
      break;
    }
    case "formatBold": {
      dispatchCommand(editor, FORMAT_TEXT_COMMAND, "bold");
      break;
    }
    case "formatItalic": {
      dispatchCommand(editor, FORMAT_TEXT_COMMAND, "italic");
      break;
    }
    case "formatUnderline": {
      dispatchCommand(editor, FORMAT_TEXT_COMMAND, "underline");
      break;
    }
    case "historyUndo": {
      dispatchCommand(editor, UNDO_COMMAND, void 0);
      break;
    }
    case "historyRedo": {
      dispatchCommand(editor, REDO_COMMAND, void 0);
      break;
    }
  }
  return true;
}
function onInput(event, editor) {
  event.stopPropagation();
  updateEditorSync(editor, () => {
    editor.dispatchCommand(INPUT_COMMAND, event);
  }, {
    event
  });
  unprocessedBeforeInputData = null;
}
function $handleInput(event) {
  if (isHTMLElement(event.target) && $isSelectionCapturedInDecorator(event.target)) {
    return true;
  }
  const editor = getActiveEditor();
  const selection = $getSelection();
  const data = event.data;
  const targetRange = getTargetRange(event);
  if (data != null && $isRangeSelection(selection) && $shouldPreventDefaultAndInsertText(selection, targetRange, data, event.timeStamp, false)) {
    if (isFirefoxEndingComposition) {
      $onCompositionEndImpl(editor, data);
      isFirefoxEndingComposition = false;
    }
    const anchor = selection.anchor;
    const anchorNode = anchor.getNode();
    const domSelection = getDOMSelection(getWindow(editor));
    if (domSelection === null) {
      return true;
    }
    const isBackward = selection.isBackward();
    const startOffset = isBackward ? selection.anchor.offset : selection.focus.offset;
    const endOffset = isBackward ? selection.focus.offset : selection.anchor.offset;
    if (!CAN_USE_BEFORE_INPUT || selection.isCollapsed() || !$isTextNode(anchorNode) || domSelection.anchorNode === null || anchorNode.getTextContent().slice(0, startOffset) + data + anchorNode.getTextContent().slice(startOffset + endOffset) !== getAnchorTextFromDOM(domSelection.anchorNode)) {
      dispatchCommand(editor, CONTROLLED_TEXT_INSERTION_COMMAND, data);
    }
    const textLength = data.length;
    if (IS_FIREFOX && textLength > 1 && event.inputType === "insertCompositionText" && !editor.isComposing()) {
      selection.anchor.offset -= textLength;
    }
    if (IS_ANDROID_CHROME && editor.isComposing()) {
      lastKeyDownTimeStamp = 0;
      $setCompositionKey(null);
    }
  } else {
    const characterData = data !== null ? data : void 0;
    $updateSelectedTextFromDOM(false, editor, characterData);
    if (isFirefoxEndingComposition) {
      $onCompositionEndImpl(editor, data || void 0);
      isFirefoxEndingComposition = false;
    }
  }
  $flushMutations();
  return true;
}
function onCompositionStart(event, editor) {
  dispatchCommand(editor, COMPOSITION_START_COMMAND, event);
}
function $handleCompositionStart(event) {
  const editor = getActiveEditor();
  const selection = $getSelection();
  if ($isRangeSelection(selection) && !editor.isComposing()) {
    const anchor = selection.anchor;
    const node = selection.anchor.getNode();
    $setCompositionKey(anchor.key);
    $addUpdateTag(COMPOSITION_START_TAG);
    if (
      // If it has been 30ms since the last keydown, then we should
      // apply the empty space heuristic. We can't do this for Safari,
      // as the keydown fires after composition start.
      event.timeStamp < lastKeyDownTimeStamp + ANDROID_COMPOSITION_LATENCY || // FF has issues around composing multibyte characters, so we also
      // need to invoke the empty space heuristic below.
      anchor.type === "element" || !selection.isCollapsed() || node.getFormat() !== selection.format || $isTextNode(node) && node.getStyle() !== selection.style
    ) {
      dispatchCommand(editor, CONTROLLED_TEXT_INSERTION_COMMAND, COMPOSITION_START_CHAR);
    }
  }
  return true;
}
function $handleCompositionEnd(event) {
  const editor = getActiveEditor();
  $onCompositionEndImpl(editor, event.data);
  $addUpdateTag(COMPOSITION_END_TAG);
  return true;
}
function $onCompositionEndImpl(editor, data) {
  const compositionKey = editor._compositionKey;
  $setCompositionKey(null);
  if (compositionKey !== null && data != null) {
    if (data === "") {
      const node = $getNodeByKey(compositionKey);
      const domElement = editor.getElementByKey(compositionKey);
      const textNode = getDOMTextNode(domElement);
      if (textNode !== null && textNode.nodeValue !== null && $isTextNode(node)) {
        const domSelection = getDOMSelection(getWindow(editor));
        let anchorOffset = null;
        let focusOffset = null;
        if (domSelection !== null && domSelection.anchorNode === textNode) {
          anchorOffset = domSelection.anchorOffset;
          focusOffset = domSelection.focusOffset;
        }
        $updateTextNodeFromDOMContent(node, textNode.nodeValue, anchorOffset, focusOffset, true);
      }
      return;
    } else if (data[data.length - 1] === "\n") {
      const selection = $getSelection();
      if ($isRangeSelection(selection) || $isNodeSelection(selection)) {
        if ($isRangeSelection(selection)) {
          const focus = selection.focus;
          selection.anchor.set(focus.key, focus.offset, focus.type);
        }
        dispatchCommand(editor, KEY_ENTER_COMMAND, null);
        return;
      }
    }
  }
  $updateSelectedTextFromDOM(true, editor, data);
}
function onCompositionEnd(event, editor) {
  if (IS_FIREFOX) {
    isFirefoxEndingComposition = true;
  } else if (!IS_IOS && (IS_SAFARI || IS_APPLE_WEBKIT)) {
    isSafariEndingComposition = true;
    safariEndCompositionEventData = event.data;
  } else {
    dispatchCommand(editor, COMPOSITION_END_COMMAND, event);
  }
}
function onKeyDown(event, editor) {
  lastKeyDownTimeStamp = event.timeStamp;
  lastKeyCode = event.key;
  if (editor.isComposing()) {
    return;
  }
  dispatchCommand(editor, KEY_DOWN_COMMAND, event);
}
function $handleKeyDown(event) {
  const editor = getActiveEditor();
  if (event.key == null) {
    return true;
  }
  if (isSafariEndingComposition) {
    if (isBackspace(event)) {
      updateEditorSync(editor, () => {
        $onCompositionEndImpl(editor, safariEndCompositionEventData);
      });
      isSafariEndingComposition = false;
      safariEndCompositionEventData = "";
      return true;
    }
    isSafariEndingComposition = false;
    safariEndCompositionEventData = "";
  }
  if (isMoveForward(event)) {
    dispatchCommand(editor, KEY_ARROW_RIGHT_COMMAND, event);
  } else if (isMoveToEnd(event)) {
    dispatchCommand(editor, MOVE_TO_END, event);
  } else if (isMoveBackward(event)) {
    dispatchCommand(editor, KEY_ARROW_LEFT_COMMAND, event);
  } else if (isMoveToStart(event)) {
    dispatchCommand(editor, MOVE_TO_START, event);
  } else if (isMoveUp(event)) {
    dispatchCommand(editor, KEY_ARROW_UP_COMMAND, event);
  } else if (isMoveDown(event)) {
    dispatchCommand(editor, KEY_ARROW_DOWN_COMMAND, event);
  } else if (isLineBreak(event)) {
    isInsertLineBreak = true;
    dispatchCommand(editor, KEY_ENTER_COMMAND, event);
  } else if (isSpace(event)) {
    dispatchCommand(editor, KEY_SPACE_COMMAND, event);
  } else if (isOpenLineBreak(event)) {
    event.preventDefault();
    isInsertLineBreak = true;
    dispatchCommand(editor, INSERT_LINE_BREAK_COMMAND, true);
  } else if (isParagraph(event)) {
    isInsertLineBreak = false;
    dispatchCommand(editor, KEY_ENTER_COMMAND, event);
  } else if (isDeleteBackward(event)) {
    if (isBackspace(event)) {
      dispatchCommand(editor, KEY_BACKSPACE_COMMAND, event);
    } else {
      event.preventDefault();
      dispatchCommand(editor, DELETE_CHARACTER_COMMAND, true);
    }
  } else if (isEscape(event)) {
    dispatchCommand(editor, KEY_ESCAPE_COMMAND, event);
  } else if (isDeleteForward(event)) {
    if (isDelete(event)) {
      dispatchCommand(editor, KEY_DELETE_COMMAND, event);
    } else {
      event.preventDefault();
      dispatchCommand(editor, DELETE_CHARACTER_COMMAND, false);
    }
  } else if (isDeleteWordBackward(event)) {
    event.preventDefault();
    dispatchCommand(editor, DELETE_WORD_COMMAND, true);
  } else if (isDeleteWordForward(event)) {
    event.preventDefault();
    dispatchCommand(editor, DELETE_WORD_COMMAND, false);
  } else if (isDeleteLineBackward(event)) {
    event.preventDefault();
    dispatchCommand(editor, DELETE_LINE_COMMAND, true);
  } else if (isDeleteLineForward(event)) {
    event.preventDefault();
    dispatchCommand(editor, DELETE_LINE_COMMAND, false);
  } else if (isBold(event)) {
    event.preventDefault();
    dispatchCommand(editor, FORMAT_TEXT_COMMAND, "bold");
  } else if (isUnderline(event)) {
    event.preventDefault();
    dispatchCommand(editor, FORMAT_TEXT_COMMAND, "underline");
  } else if (isItalic(event)) {
    event.preventDefault();
    dispatchCommand(editor, FORMAT_TEXT_COMMAND, "italic");
  } else if (isTab(event)) {
    dispatchCommand(editor, KEY_TAB_COMMAND, event);
  } else if (isUndo(event)) {
    event.preventDefault();
    dispatchCommand(editor, UNDO_COMMAND, void 0);
  } else if (isRedo(event)) {
    event.preventDefault();
    dispatchCommand(editor, REDO_COMMAND, void 0);
  } else {
    const prevSelection = editor._editorState._selection;
    if (prevSelection !== null && !$isRangeSelection(prevSelection)) {
      if (isCopy(event)) {
        event.preventDefault();
        dispatchCommand(editor, COPY_COMMAND, event);
      } else if (isCut(event)) {
        event.preventDefault();
        dispatchCommand(editor, CUT_COMMAND, event);
      } else if (isSelectAll(event)) {
        event.preventDefault();
        dispatchCommand(editor, SELECT_ALL_COMMAND, event);
      }
    } else if (isSelectAll(event)) {
      event.preventDefault();
      dispatchCommand(editor, SELECT_ALL_COMMAND, event);
    }
  }
  if (isModifier(event)) {
    editor.dispatchCommand(KEY_MODIFIER_COMMAND, event);
  }
  return true;
}
function getRootElementRemoveHandles(rootElement) {
  let eventHandles = rootElement.__lexicalEventHandles;
  if (eventHandles === void 0) {
    eventHandles = [];
    rootElement.__lexicalEventHandles = eventHandles;
  }
  return eventHandles;
}
var activeNestedEditorsMap = /* @__PURE__ */ new Map();
function onDocumentSelectionChange(event) {
  const domSelection = getDOMSelectionFromTarget(event.target);
  if (domSelection === null) {
    return;
  }
  const nextActiveEditor = getNearestEditorFromDOMNode(domSelection.anchorNode);
  if (nextActiveEditor === null) {
    return;
  }
  if (isSelectionChangeFromMouseDown) {
    isSelectionChangeFromMouseDown = false;
    updateEditorSync(nextActiveEditor, () => {
      const lastSelection = $getPreviousSelection();
      const domAnchorNode = domSelection.anchorNode;
      if (isHTMLElement(domAnchorNode) || isDOMTextNode(domAnchorNode)) {
        const newSelection = $internalCreateRangeSelection(lastSelection, domSelection, nextActiveEditor, event);
        $setSelection(newSelection);
      }
    });
  }
  const editors = getEditorsToPropagate(nextActiveEditor);
  const rootEditor = editors[editors.length - 1];
  const rootEditorKey = rootEditor._key;
  const activeNestedEditor = activeNestedEditorsMap.get(rootEditorKey);
  const prevActiveEditor = activeNestedEditor || rootEditor;
  if (prevActiveEditor !== nextActiveEditor) {
    onSelectionChange(domSelection, prevActiveEditor, false);
  }
  onSelectionChange(domSelection, nextActiveEditor, true);
  if (nextActiveEditor !== rootEditor) {
    activeNestedEditorsMap.set(rootEditorKey, nextActiveEditor);
  } else if (activeNestedEditor) {
    activeNestedEditorsMap.delete(rootEditorKey);
  }
}
function stopLexicalPropagation(event) {
  event._lexicalHandled = true;
}
function hasStoppedLexicalPropagation(event) {
  const stopped = event._lexicalHandled === true;
  return stopped;
}
function addRootElementEvents(rootElement, editor) {
  const doc = rootElement.ownerDocument;
  rootElementToDocument.set(rootElement, doc);
  const documentRootElementsCount = rootElementsRegistered.get(doc) ?? 0;
  if (documentRootElementsCount < 1) {
    doc.addEventListener("selectionchange", onDocumentSelectionChange);
  }
  rootElementsRegistered.set(doc, documentRootElementsCount + 1);
  rootElement.__lexicalEditor = editor;
  const removeHandles = getRootElementRemoveHandles(rootElement);
  for (let i2 = 0; i2 < rootElementEvents.length; i2++) {
    const [eventName, onEvent] = rootElementEvents[i2];
    const eventHandler = typeof onEvent === "function" ? (event) => {
      if (hasStoppedLexicalPropagation(event)) {
        return;
      }
      stopLexicalPropagation(event);
      if (editor.isEditable() || eventName === "click") {
        onEvent(event, editor);
      }
    } : (event) => {
      if (hasStoppedLexicalPropagation(event)) {
        return;
      }
      stopLexicalPropagation(event);
      const isEditable = editor.isEditable();
      switch (eventName) {
        case "cut":
          return isEditable && dispatchCommand(editor, CUT_COMMAND, event);
        case "copy":
          return dispatchCommand(editor, COPY_COMMAND, event);
        case "paste":
          return isEditable && dispatchCommand(editor, PASTE_COMMAND, event);
        case "dragstart":
          return isEditable && dispatchCommand(editor, DRAGSTART_COMMAND, event);
        case "dragover":
          return isEditable && dispatchCommand(editor, DRAGOVER_COMMAND, event);
        case "dragend":
          return isEditable && dispatchCommand(editor, DRAGEND_COMMAND, event);
        case "focus":
          return isEditable && dispatchCommand(editor, FOCUS_COMMAND, event);
        case "blur": {
          return isEditable && dispatchCommand(editor, BLUR_COMMAND, event);
        }
        case "drop":
          return isEditable && dispatchCommand(editor, DROP_COMMAND, event);
      }
    };
    rootElement.addEventListener(eventName, eventHandler);
    removeHandles.push(() => {
      rootElement.removeEventListener(eventName, eventHandler);
    });
  }
}
var rootElementNotRegisteredWarning = warnOnlyOnce("Root element not registered");
function removeRootElementEvents(rootElement) {
  const doc = rootElementToDocument.get(rootElement);
  if (doc === void 0) {
    rootElementNotRegisteredWarning();
    return;
  }
  const documentRootElementsCount = rootElementsRegistered.get(doc);
  if (documentRootElementsCount === void 0) {
    rootElementNotRegisteredWarning();
    return;
  }
  const newCount = documentRootElementsCount - 1;
  if (!(newCount >= 0)) {
    formatDevErrorMessage(`Root element count less than 0`);
  }
  rootElementToDocument.delete(rootElement);
  rootElementsRegistered.set(doc, newCount);
  if (newCount === 0) {
    doc.removeEventListener("selectionchange", onDocumentSelectionChange);
  }
  const editor = getEditorPropertyFromDOMNode(rootElement);
  if (isLexicalEditor(editor)) {
    cleanActiveNestedEditorsMap(editor);
    rootElement.__lexicalEditor = null;
  } else if (editor) {
    {
      formatDevErrorMessage(`Attempted to remove event handlers from a node that does not belong to this build of Lexical`);
    }
  }
  const removeHandles = getRootElementRemoveHandles(rootElement);
  for (let i2 = 0; i2 < removeHandles.length; i2++) {
    removeHandles[i2]();
  }
  rootElement.__lexicalEventHandles = [];
}
function cleanActiveNestedEditorsMap(editor) {
  if (editor._parentEditor !== null) {
    const editors = getEditorsToPropagate(editor);
    const rootEditor = editors[editors.length - 1];
    const rootEditorKey = rootEditor._key;
    if (activeNestedEditorsMap.get(rootEditorKey) === editor) {
      activeNestedEditorsMap.delete(rootEditorKey);
    }
  } else {
    activeNestedEditorsMap.delete(editor._key);
  }
}
function markSelectionChangeFromDOMUpdate() {
  isSelectionChangeFromDOMUpdate = true;
}
function markCollapsedSelectionFormat(format, style, offset, key, timeStamp) {
  collapsedSelectionFormat = [format, style, offset, key, timeStamp];
}
function $removeNode(nodeToRemove, restoreSelection, preserveEmptyParent) {
  errorOnReadOnly();
  const key = nodeToRemove.__key;
  const parent = nodeToRemove.getParent();
  if (parent === null) {
    return;
  }
  const selection = $maybeMoveChildrenSelectionToParent(nodeToRemove);
  let selectionMoved = false;
  if ($isRangeSelection(selection) && restoreSelection) {
    const anchor = selection.anchor;
    const focus = selection.focus;
    if (anchor.key === key) {
      moveSelectionPointToSibling(anchor, nodeToRemove, parent, nodeToRemove.getPreviousSibling(), nodeToRemove.getNextSibling());
      selectionMoved = true;
    }
    if (focus.key === key) {
      moveSelectionPointToSibling(focus, nodeToRemove, parent, nodeToRemove.getPreviousSibling(), nodeToRemove.getNextSibling());
      selectionMoved = true;
    }
  } else if ($isNodeSelection(selection) && restoreSelection && nodeToRemove.isSelected()) {
    nodeToRemove.selectPrevious();
  }
  if ($isRangeSelection(selection) && restoreSelection && !selectionMoved) {
    const index = nodeToRemove.getIndexWithinParent();
    removeFromParent(nodeToRemove);
    $updateElementSelectionOnCreateDeleteNode(selection, parent, index, -1);
  } else {
    removeFromParent(nodeToRemove);
  }
  if (!preserveEmptyParent && !$isRootOrShadowRoot(parent) && !parent.canBeEmpty() && parent.isEmpty()) {
    $removeNode(parent, restoreSelection);
  }
  if (restoreSelection && selection && $isRootNode(parent) && parent.isEmpty()) {
    parent.selectEnd();
  }
}
function buildImportMap(importMap) {
  return importMap;
}
var EPHEMERAL = /* @__PURE__ */ Symbol.for("ephemeral");
function $isEphemeral(node) {
  return node[EPHEMERAL] || false;
}
function $markEphemeral(node) {
  node[EPHEMERAL] = true;
  return node;
}
var LexicalNode = class {
  /** @internal Allow us to look up the type including static props */
  /** @internal */
  __type;
  /** @internal */
  //@ts-ignore We set the key in the constructor.
  __key;
  /** @internal */
  __parent;
  /** @internal */
  __prev;
  /** @internal */
  __next;
  /** @internal */
  __state;
  // Flow doesn't support abstract classes unfortunately, so we can't _force_
  // subclasses of Node to implement statics. All subclasses of Node should have
  // a static getType and clone method though. We define getType and clone here so we can call it
  // on any  Node, and we throw this error by default since the subclass should provide
  // their own implementation.
  /**
   * Returns the string type of this node. Every node must
   * implement this and it MUST BE UNIQUE amongst nodes registered
   * on the editor.
   *
   */
  static getType() {
    const {
      ownNodeType
    } = getStaticNodeConfig(this);
    if (!(ownNodeType !== void 0)) {
      formatDevErrorMessage(`LexicalNode: Node ${this.name} does not implement .getType().`);
    }
    return ownNodeType;
  }
  /**
   * Clones this node, creating a new node with a different key
   * and adding it to the EditorState (but not attaching it anywhere!). All nodes must
   * implement this method.
   *
   */
  static clone(_data) {
    {
      formatDevErrorMessage(`LexicalNode: Node ${this.name} does not implement .clone().`);
    }
  }
  /**
   * Override this to implement the new static node configuration protocol,
   * this method is called directly on the prototype and must not depend
   * on anything initialized in the constructor. Generally it should be
   * a trivial implementation.
   *
   * @example
   * ```ts
   * class MyNode extends TextNode {
   *   $config() {
   *     return this.config('my-node', {extends: TextNode});
   *   }
   * }
   * ```
   */
  $config() {
    return {};
  }
  /**
   * This is a convenience method for $config that
   * aids in type inference. See {@link LexicalNode.$config}
   * for example usage.
   */
  config(type, config) {
    const parentKlass = config.extends || Object.getPrototypeOf(this.constructor);
    Object.assign(config, {
      extends: parentKlass,
      type
    });
    return {
      [type]: config
    };
  }
  /**
   * Perform any state updates on the clone of prevNode that are not already
   * handled by the constructor call in the static clone method. If you have
   * state to update in your clone that is not handled directly by the
   * constructor, it is advisable to override this method but it is required
   * to include a call to `super.afterCloneFrom(prevNode)` in your
   * implementation. This is only intended to be called by
   * {@link $cloneWithProperties} function or via a super call.
   *
   * @example
   * ```ts
   * class ClassesTextNode extends TextNode {
   *   // Not shown: static getType, static importJSON, exportJSON, createDOM, updateDOM
   *   __classes = new Set<string>();
   *   static clone(node: ClassesTextNode): ClassesTextNode {
   *     // The inherited TextNode constructor is used here, so
   *     // classes is not set by this method.
   *     return new ClassesTextNode(node.__text, node.__key);
   *   }
   *   afterCloneFrom(node: this): void {
   *     // This calls TextNode.afterCloneFrom and LexicalNode.afterCloneFrom
   *     // for necessary state updates
   *     super.afterCloneFrom(node);
   *     this.__addClasses(node.__classes);
   *   }
   *   // This method is a private implementation detail, it is not
   *   // suitable for the public API because it does not call getWritable
   *   __addClasses(classNames: Iterable<string>): this {
   *     for (const className of classNames) {
   *       this.__classes.add(className);
   *     }
   *     return this;
   *   }
   *   addClass(...classNames: string[]): this {
   *     return this.getWritable().__addClasses(classNames);
   *   }
   *   removeClass(...classNames: string[]): this {
   *     const node = this.getWritable();
   *     for (const className of classNames) {
   *       this.__classes.delete(className);
   *     }
   *     return this;
   *   }
   *   getClasses(): Set<string> {
   *     return this.getLatest().__classes;
   *   }
   * }
   * ```
   *
   */
  afterCloneFrom(prevNode) {
    if (this.__key === prevNode.__key) {
      this.__parent = prevNode.__parent;
      this.__next = prevNode.__next;
      this.__prev = prevNode.__prev;
      this.__state = prevNode.__state;
    } else if (prevNode.__state) {
      this.__state = prevNode.__state.getWritable(this);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static importDOM;
  constructor(key) {
    this.__type = this.constructor.getType();
    this.__parent = null;
    this.__prev = null;
    this.__next = null;
    Object.defineProperty(this, "__state", {
      configurable: true,
      enumerable: false,
      value: void 0,
      writable: true
    });
    $setNodeKey(this, key);
    {
      if (this.__type !== "root") {
        errorOnTypeKlassMismatch(this.__type, this.constructor);
      }
    }
  }
  // Getters and Traversers
  /**
   * Returns the string type of this node.
   */
  getType() {
    return this.__type;
  }
  isInline() {
    {
      formatDevErrorMessage(`LexicalNode: Node ${this.constructor.name} does not implement .isInline().`);
    }
  }
  /**
   * Returns true if there is a path between this node and the RootNode, false otherwise.
   * This is a way of determining if the node is "attached" EditorState. Unattached nodes
   * won't be reconciled and will ultimately be cleaned up by the Lexical GC.
   */
  isAttached() {
    let nodeKey = this.__key;
    while (nodeKey !== null) {
      if (nodeKey === "root") {
        return true;
      }
      const node = $getNodeByKey(nodeKey);
      if (node === null) {
        break;
      }
      nodeKey = node.__parent;
    }
    return false;
  }
  /**
   * Returns true if this node is contained within the provided Selection., false otherwise.
   * Relies on the algorithms implemented in {@link BaseSelection.getNodes} to determine
   * what's included.
   *
   * @param selection - The selection that we want to determine if the node is in.
   */
  isSelected(selection) {
    const targetSelection = selection || $getSelection();
    if (targetSelection == null) {
      return false;
    }
    const isSelected = targetSelection.getNodes().some((n2) => n2.__key === this.__key);
    if ($isTextNode(this)) {
      return isSelected;
    }
    const isElementRangeSelection = $isRangeSelection(targetSelection) && targetSelection.anchor.type === "element" && targetSelection.focus.type === "element";
    if (isElementRangeSelection) {
      if (targetSelection.isCollapsed()) {
        return false;
      }
      const parentNode = this.getParent();
      if ($isDecoratorNode(this) && this.isInline() && parentNode) {
        const firstPoint = targetSelection.isBackward() ? targetSelection.focus : targetSelection.anchor;
        if (parentNode.is(firstPoint.getNode()) && firstPoint.offset === parentNode.getChildrenSize() && this.is(parentNode.getLastChild())) {
          return false;
        }
      }
    }
    return isSelected;
  }
  /**
   * Returns this nodes key.
   */
  getKey() {
    return this.__key;
  }
  /**
   * Returns the zero-based index of this node within the parent.
   */
  getIndexWithinParent() {
    const parent = this.getParent();
    if (parent === null) {
      return -1;
    }
    let node = parent.getFirstChild();
    let index = 0;
    while (node !== null) {
      if (this.is(node)) {
        return index;
      }
      index++;
      node = node.getNextSibling();
    }
    return -1;
  }
  /**
   * Returns the parent of this node, or null if none is found.
   */
  getParent() {
    const parent = this.getLatest().__parent;
    if (parent === null) {
      return null;
    }
    return $getNodeByKey(parent);
  }
  /**
   * Returns the parent of this node, or throws if none is found.
   */
  getParentOrThrow() {
    const parent = this.getParent();
    if (parent === null) {
      {
        formatDevErrorMessage(`Expected node ${this.__key} to have a parent.`);
      }
    }
    return parent;
  }
  /**
   * Returns the highest (in the EditorState tree)
   * non-root ancestor of this node, or null if none is found. See {@link lexical!$isRootOrShadowRoot}
   * for more information on which Elements comprise "roots".
   */
  getTopLevelElement() {
    let node = this;
    while (node !== null) {
      const parent = node.getParent();
      if ($isRootOrShadowRoot(parent)) {
        if (!($isElementNode(node) || node === this && $isDecoratorNode(node))) {
          formatDevErrorMessage(`Children of root nodes must be elements or decorators`);
        }
        return node;
      }
      node = parent;
    }
    return null;
  }
  /**
   * Returns the highest (in the EditorState tree)
   * non-root ancestor of this node, or throws if none is found. See {@link lexical!$isRootOrShadowRoot}
   * for more information on which Elements comprise "roots".
   */
  getTopLevelElementOrThrow() {
    const parent = this.getTopLevelElement();
    if (parent === null) {
      {
        formatDevErrorMessage(`Expected node ${this.__key} to have a top parent element.`);
      }
    }
    return parent;
  }
  /**
   * Returns a list of the every ancestor of this node,
   * all the way up to the RootNode.
   *
   */
  getParents() {
    const parents = [];
    let node = this.getParent();
    while (node !== null) {
      parents.push(node);
      node = node.getParent();
    }
    return parents;
  }
  /**
   * Returns a list of the keys of every ancestor of this node,
   * all the way up to the RootNode.
   *
   */
  getParentKeys() {
    const parents = [];
    let node = this.getParent();
    while (node !== null) {
      parents.push(node.__key);
      node = node.getParent();
    }
    return parents;
  }
  /**
   * Returns the "previous" siblings - that is, the node that comes
   * before this one in the same parent.
   *
   */
  getPreviousSibling() {
    const self = this.getLatest();
    const prevKey = self.__prev;
    return prevKey === null ? null : $getNodeByKey(prevKey);
  }
  /**
   * Returns the "previous" siblings - that is, the nodes that come between
   * this one and the first child of it's parent, inclusive.
   *
   */
  getPreviousSiblings() {
    const siblings = [];
    const parent = this.getParent();
    if (parent === null) {
      return siblings;
    }
    let node = parent.getFirstChild();
    while (node !== null) {
      if (node.is(this)) {
        break;
      }
      siblings.push(node);
      node = node.getNextSibling();
    }
    return siblings;
  }
  /**
   * Returns the "next" siblings - that is, the node that comes
   * after this one in the same parent
   *
   */
  getNextSibling() {
    const self = this.getLatest();
    const nextKey = self.__next;
    return nextKey === null ? null : $getNodeByKey(nextKey);
  }
  /**
   * Returns all "next" siblings - that is, the nodes that come between this
   * one and the last child of it's parent, inclusive.
   *
   */
  getNextSiblings() {
    const siblings = [];
    let node = this.getNextSibling();
    while (node !== null) {
      siblings.push(node);
      node = node.getNextSibling();
    }
    return siblings;
  }
  /**
   * @deprecated use {@link $getCommonAncestor}
   *
   * Returns the closest common ancestor of this node and the provided one or null
   * if one cannot be found.
   *
   * @param node - the other node to find the common ancestor of.
   */
  getCommonAncestor(node) {
    const a2 = $isElementNode(this) ? this : this.getParent();
    const b2 = $isElementNode(node) ? node : node.getParent();
    const result = a2 && b2 ? $getCommonAncestor(a2, b2) : null;
    return result ? result.commonAncestor : null;
  }
  /**
   * Returns true if the provided node is the exact same one as this node, from Lexical's perspective.
   * Always use this instead of referential equality.
   *
   * @param object - the node to perform the equality comparison on.
   */
  is(object) {
    if (object == null) {
      return false;
    }
    return this.__key === object.__key;
  }
  /**
   * Returns true if this node logically precedes the target node in the
   * editor state, false otherwise (including if there is no common ancestor).
   *
   * Note that this notion of isBefore is based on post-order; a descendant
   * node is always before its ancestors. See also
   * {@link $getCommonAncestor} and {@link $comparePointCaretNext} for
   * more flexible ways to determine the relative positions of nodes.
   *
   * @param targetNode - the node we're testing to see if it's after this one.
   */
  isBefore(targetNode) {
    const compare = $getCommonAncestor(this, targetNode);
    if (compare === null) {
      return false;
    }
    if (compare.type === "descendant") {
      return true;
    }
    if (compare.type === "branch") {
      return $getCommonAncestorResultBranchOrder(compare) === -1;
    }
    if (!(compare.type === "same" || compare.type === "ancestor")) {
      formatDevErrorMessage(`LexicalNode.isBefore: exhaustiveness check`);
    }
    return false;
  }
  /**
   * Returns true if this node is an ancestor of and distinct from the target node, false otherwise.
   *
   * @param targetNode - the would-be child node.
   */
  isParentOf(targetNode) {
    const result = $getCommonAncestor(this, targetNode);
    return result !== null && result.type === "ancestor";
  }
  // TO-DO: this function can be simplified a lot
  /**
   * Returns a list of nodes that are between this node and
   * the target node in the EditorState.
   *
   * @param targetNode - the node that marks the other end of the range of nodes to be returned.
   */
  getNodesBetween(targetNode) {
    const isBefore = this.isBefore(targetNode);
    const nodes = [];
    const visited = /* @__PURE__ */ new Set();
    let node = this;
    while (true) {
      if (node === null) {
        break;
      }
      const key = node.__key;
      if (!visited.has(key)) {
        visited.add(key);
        nodes.push(node);
      }
      if (node === targetNode) {
        break;
      }
      const child = $isElementNode(node) ? isBefore ? node.getFirstChild() : node.getLastChild() : null;
      if (child !== null) {
        node = child;
        continue;
      }
      const nextSibling = isBefore ? node.getNextSibling() : node.getPreviousSibling();
      if (nextSibling !== null) {
        node = nextSibling;
        continue;
      }
      const parent = node.getParentOrThrow();
      if (!visited.has(parent.__key)) {
        nodes.push(parent);
      }
      if (parent === targetNode) {
        break;
      }
      let parentSibling = null;
      let ancestor = parent;
      do {
        if (ancestor === null) {
          {
            formatDevErrorMessage(`getNodesBetween: ancestor is null`);
          }
        }
        parentSibling = isBefore ? ancestor.getNextSibling() : ancestor.getPreviousSibling();
        ancestor = ancestor.getParent();
        if (ancestor !== null) {
          if (parentSibling === null && !visited.has(ancestor.__key)) {
            nodes.push(ancestor);
          }
        } else {
          break;
        }
      } while (parentSibling === null);
      node = parentSibling;
    }
    if (!isBefore) {
      nodes.reverse();
    }
    return nodes;
  }
  /**
   * Returns true if this node has been marked dirty during this update cycle.
   *
   */
  isDirty() {
    const editor = getActiveEditor();
    const dirtyLeaves = editor._dirtyLeaves;
    return dirtyLeaves !== null && dirtyLeaves.has(this.__key);
  }
  /**
   * Returns the latest version of the node from the active EditorState.
   * This is used to avoid getting values from stale node references.
   *
   */
  getLatest() {
    if ($isEphemeral(this)) {
      return this;
    }
    const latest = $getNodeByKey(this.__key);
    if (latest === null) {
      {
        formatDevErrorMessage(`Lexical node does not exist in active editor state. Avoid using the same node references between nested closures from editorState.read/editor.update.`);
      }
    }
    return latest;
  }
  /**
   * Returns a mutable version of the node using {@link $cloneWithProperties}
   * if necessary. Will throw an error if called outside of a Lexical Editor
   * {@link LexicalEditor.update} callback.
   *
   */
  getWritable() {
    if ($isEphemeral(this)) {
      return this;
    }
    errorOnReadOnly();
    const editorState = getActiveEditorState();
    const editor = getActiveEditor();
    const nodeMap = editorState._nodeMap;
    const key = this.__key;
    const latestNode = this.getLatest();
    const cloneNotNeeded = editor._cloneNotNeeded;
    const selection = $getSelection();
    if (selection !== null) {
      selection.setCachedNodes(null);
    }
    if (cloneNotNeeded.has(key)) {
      internalMarkNodeAsDirty(latestNode);
      return latestNode;
    }
    const mutableNode = $cloneWithProperties(latestNode);
    cloneNotNeeded.add(key);
    internalMarkNodeAsDirty(mutableNode);
    nodeMap.set(key, mutableNode);
    return mutableNode;
  }
  /**
   * Returns the text content of the node. Override this for
   * custom nodes that should have a representation in plain text
   * format (for copy + paste, for example)
   *
   */
  getTextContent() {
    return "";
  }
  /**
   * Returns the length of the string produced by calling getTextContent on this node.
   *
   */
  getTextContentSize() {
    return this.getTextContent().length;
  }
  // View
  /**
   * Called during the reconciliation process to determine which nodes
   * to insert into the DOM for this Lexical Node.
   *
   * This method must return exactly one HTMLElement. Nested elements are not supported.
   *
   * Do not attempt to update the Lexical EditorState during this phase of the update lifecycle.
   *
   * @param _config - allows access to things like the EditorTheme (to apply classes) during reconciliation.
   * @param _editor - allows access to the editor for context during reconciliation.
   *
   * */
  createDOM(_config, _editor) {
    {
      formatDevErrorMessage(`createDOM: base method not extended`);
    }
  }
  /**
   * Called when a node changes and should update the DOM
   * in whatever way is necessary to make it align with any changes that might
   * have happened during the update.
   *
   * Returning "true" here will cause lexical to unmount and recreate the DOM node
   * (by calling createDOM). You would need to do this if the element tag changes,
   * for instance.
   *
   * */
  updateDOM(_prevNode, _dom, _config) {
    {
      formatDevErrorMessage(`updateDOM: base method not extended`);
    }
  }
  /**
   * Controls how the this node is serialized to HTML. This is important for
   * copy and paste between Lexical and non-Lexical editors, or Lexical editors with different namespaces,
   * in which case the primary transfer format is HTML. It's also important if you're serializing
   * to HTML for any other reason via {@link @lexical/html!$generateHtmlFromNodes}. You could
   * also use this method to build your own HTML renderer.
   *
   * */
  exportDOM(editor) {
    const element = this.createDOM(editor._config, editor);
    return {
      element
    };
  }
  /**
   * Controls how the this node is serialized to JSON. This is important for
   * copy and paste between Lexical editors sharing the same namespace. It's also important
   * if you're serializing to JSON for persistent storage somewhere.
   * See [Serialization & Deserialization](https://lexical.dev/docs/concepts/serialization#lexical---html).
   *
   * */
  exportJSON() {
    const state = this.__state ? this.__state.toJSON() : void 0;
    return {
      type: this.__type,
      version: 1,
      ...state
    };
  }
  /**
   * Controls how the this node is deserialized from JSON. This is usually boilerplate,
   * but provides an abstraction between the node implementation and serialized interface that can
   * be important if you ever make breaking changes to a node schema (by adding or removing properties).
   * See [Serialization & Deserialization](https://lexical.dev/docs/concepts/serialization#lexical---html).
   *
   * */
  static importJSON(_serializedNode) {
    {
      formatDevErrorMessage(`LexicalNode: Node ${this.name} does not implement .importJSON().`);
    }
  }
  /**
   * Update this LexicalNode instance from serialized JSON. It's recommended
   * to implement as much logic as possible in this method instead of the
   * static importJSON method, so that the functionality can be inherited in subclasses.
   *
   * The LexicalUpdateJSON utility type should be used to ignore any type, version,
   * or children properties in the JSON so that the extended JSON from subclasses
   * are acceptable parameters for the super call.
   *
   * If overridden, this method must call super.
   *
   * @example
   * ```ts
   * class MyTextNode extends TextNode {
   *   // ...
   *   static importJSON(serializedNode: SerializedMyTextNode): MyTextNode {
   *     return $createMyTextNode()
   *       .updateFromJSON(serializedNode);
   *   }
   *   updateFromJSON(
   *     serializedNode: LexicalUpdateJSON<SerializedMyTextNode>,
   *   ): this {
   *     return super.updateFromJSON(serializedNode)
   *       .setMyProperty(serializedNode.myProperty);
   *   }
   * }
   * ```
   **/
  updateFromJSON(serializedNode) {
    return $updateStateFromJSON(this, serializedNode);
  }
  /**
   * @experimental
   *
   * Registers the returned function as a transform on the node during
   * Editor initialization. Most such use cases should be addressed via
   * the {@link LexicalEditor.registerNodeTransform} API.
   *
   * Experimental - use at your own risk.
   */
  static transform() {
    return null;
  }
  // Setters and mutators
  /**
   * Removes this LexicalNode from the EditorState. If the node isn't re-inserted
   * somewhere, the Lexical garbage collector will eventually clean it up.
   *
   * @param preserveEmptyParent - If falsy, the node's parent will be removed if
   * it's empty after the removal operation. This is the default behavior, subject to
   * other node heuristics such as {@link ElementNode#canBeEmpty}
   * */
  remove(preserveEmptyParent) {
    $removeNode(this, true, preserveEmptyParent);
  }
  /**
   * Replaces this LexicalNode with the provided node, optionally transferring the children
   * of the replaced node to the replacing node.
   *
   * @param replaceWith - The node to replace this one with.
   * @param includeChildren - Whether or not to transfer the children of this node to the replacing node.
   * */
  replace(replaceWith, includeChildren) {
    errorOnReadOnly();
    let selection = $getSelection();
    if (selection !== null) {
      selection = selection.clone();
    }
    errorOnInsertTextNodeOnRoot(this, replaceWith);
    const self = this.getLatest();
    const toReplaceKey = this.__key;
    const key = replaceWith.__key;
    const writableReplaceWith = replaceWith.getWritable();
    const writableParent = this.getParentOrThrow().getWritable();
    const size = writableParent.__size;
    removeFromParent(writableReplaceWith);
    const prevSibling = self.getPreviousSibling();
    const nextSibling = self.getNextSibling();
    const prevKey = self.__prev;
    const nextKey = self.__next;
    const parentKey = self.__parent;
    $removeNode(self, false, true);
    if (prevSibling === null) {
      writableParent.__first = key;
    } else {
      const writablePrevSibling = prevSibling.getWritable();
      writablePrevSibling.__next = key;
    }
    writableReplaceWith.__prev = prevKey;
    if (nextSibling === null) {
      writableParent.__last = key;
    } else {
      const writableNextSibling = nextSibling.getWritable();
      writableNextSibling.__prev = key;
    }
    writableReplaceWith.__next = nextKey;
    writableReplaceWith.__parent = parentKey;
    writableParent.__size = size;
    if (includeChildren) {
      if (!($isElementNode(this) && $isElementNode(writableReplaceWith))) {
        formatDevErrorMessage(`includeChildren should only be true for ElementNodes`);
      }
      this.getChildren().forEach((child) => {
        writableReplaceWith.append(child);
      });
    }
    if ($isRangeSelection(selection)) {
      $setSelection(selection);
      const anchor = selection.anchor;
      const focus = selection.focus;
      if (anchor.key === toReplaceKey) {
        $moveSelectionPointToEnd(anchor, writableReplaceWith);
      }
      if (focus.key === toReplaceKey) {
        $moveSelectionPointToEnd(focus, writableReplaceWith);
      }
    }
    if ($getCompositionKey() === toReplaceKey) {
      $setCompositionKey(key);
    }
    return writableReplaceWith;
  }
  /**
   * Inserts a node after this LexicalNode (as the next sibling).
   *
   * @param nodeToInsert - The node to insert after this one.
   * @param restoreSelection - Whether or not to attempt to resolve the
   * selection to the appropriate place after the operation is complete.
   * */
  insertAfter(nodeToInsert, restoreSelection = true) {
    errorOnReadOnly();
    errorOnInsertTextNodeOnRoot(this, nodeToInsert);
    const writableSelf = this.getWritable();
    const writableNodeToInsert = nodeToInsert.getWritable();
    const oldParent = writableNodeToInsert.getParent();
    const selection = $getSelection();
    let elementAnchorSelectionOnNode = false;
    let elementFocusSelectionOnNode = false;
    if (oldParent !== null) {
      const oldIndex = nodeToInsert.getIndexWithinParent();
      removeFromParent(writableNodeToInsert);
      if ($isRangeSelection(selection)) {
        const oldParentKey = oldParent.__key;
        const anchor = selection.anchor;
        const focus = selection.focus;
        elementAnchorSelectionOnNode = anchor.type === "element" && anchor.key === oldParentKey && anchor.offset === oldIndex + 1;
        elementFocusSelectionOnNode = focus.type === "element" && focus.key === oldParentKey && focus.offset === oldIndex + 1;
      }
    }
    const nextSibling = this.getNextSibling();
    const writableParent = this.getParentOrThrow().getWritable();
    const insertKey = writableNodeToInsert.__key;
    const nextKey = writableSelf.__next;
    if (nextSibling === null) {
      writableParent.__last = insertKey;
    } else {
      const writableNextSibling = nextSibling.getWritable();
      writableNextSibling.__prev = insertKey;
    }
    writableParent.__size++;
    writableSelf.__next = insertKey;
    writableNodeToInsert.__next = nextKey;
    writableNodeToInsert.__prev = writableSelf.__key;
    writableNodeToInsert.__parent = writableSelf.__parent;
    if (restoreSelection && $isRangeSelection(selection)) {
      const index = this.getIndexWithinParent();
      $updateElementSelectionOnCreateDeleteNode(selection, writableParent, index + 1);
      const writableParentKey = writableParent.__key;
      if (elementAnchorSelectionOnNode) {
        selection.anchor.set(writableParentKey, index + 2, "element");
      }
      if (elementFocusSelectionOnNode) {
        selection.focus.set(writableParentKey, index + 2, "element");
      }
    }
    return nodeToInsert;
  }
  /**
   * Inserts a node before this LexicalNode (as the previous sibling).
   *
   * @param nodeToInsert - The node to insert before this one.
   * @param restoreSelection - Whether or not to attempt to resolve the
   * selection to the appropriate place after the operation is complete.
   * */
  insertBefore(nodeToInsert, restoreSelection = true) {
    errorOnReadOnly();
    errorOnInsertTextNodeOnRoot(this, nodeToInsert);
    const writableSelf = this.getWritable();
    const writableNodeToInsert = nodeToInsert.getWritable();
    const insertKey = writableNodeToInsert.__key;
    removeFromParent(writableNodeToInsert);
    const prevSibling = this.getPreviousSibling();
    const writableParent = this.getParentOrThrow().getWritable();
    const prevKey = writableSelf.__prev;
    const index = this.getIndexWithinParent();
    if (prevSibling === null) {
      writableParent.__first = insertKey;
    } else {
      const writablePrevSibling = prevSibling.getWritable();
      writablePrevSibling.__next = insertKey;
    }
    writableParent.__size++;
    writableSelf.__prev = insertKey;
    writableNodeToInsert.__prev = prevKey;
    writableNodeToInsert.__next = writableSelf.__key;
    writableNodeToInsert.__parent = writableSelf.__parent;
    const selection = $getSelection();
    if (restoreSelection && $isRangeSelection(selection)) {
      const parent = this.getParentOrThrow();
      $updateElementSelectionOnCreateDeleteNode(selection, parent, index);
    }
    return nodeToInsert;
  }
  /**
   * Whether or not this node has a required parent. Used during copy + paste operations
   * to normalize nodes that would otherwise be orphaned. For example, ListItemNodes without
   * a ListNode parent or TextNodes with a ParagraphNode parent.
   *
   * */
  isParentRequired() {
    return false;
  }
  /**
   * The creation logic for any required parent. Should be implemented if {@link isParentRequired} returns true.
   *
   * */
  createParentElementNode() {
    return $createParagraphNode();
  }
  selectStart() {
    return this.selectPrevious();
  }
  selectEnd() {
    return this.selectNext(0, 0);
  }
  /**
   * Moves selection to the previous sibling of this node, at the specified offsets.
   *
   * @param anchorOffset - The anchor offset for selection.
   * @param focusOffset -  The focus offset for selection
   * */
  selectPrevious(anchorOffset, focusOffset) {
    errorOnReadOnly();
    const prevSibling = this.getPreviousSibling();
    const parent = this.getParentOrThrow();
    if (prevSibling === null) {
      return parent.select(0, 0);
    }
    if ($isElementNode(prevSibling)) {
      return prevSibling.select();
    } else if (!$isTextNode(prevSibling)) {
      const index = prevSibling.getIndexWithinParent() + 1;
      return parent.select(index, index);
    }
    return prevSibling.select(anchorOffset, focusOffset);
  }
  /**
   * Moves selection to the next sibling of this node, at the specified offsets.
   *
   * @param anchorOffset - The anchor offset for selection.
   * @param focusOffset -  The focus offset for selection
   * */
  selectNext(anchorOffset, focusOffset) {
    errorOnReadOnly();
    const nextSibling = this.getNextSibling();
    const parent = this.getParentOrThrow();
    if (nextSibling === null) {
      return parent.select();
    }
    if ($isElementNode(nextSibling)) {
      return nextSibling.select(0, 0);
    } else if (!$isTextNode(nextSibling)) {
      const index = nextSibling.getIndexWithinParent();
      return parent.select(index, index);
    }
    return nextSibling.select(anchorOffset, focusOffset);
  }
  /**
   * Marks a node dirty, triggering transforms and
   * forcing it to be reconciled during the update cycle.
   *
   * */
  markDirty() {
    this.getWritable();
  }
  /**
   * @internal
   *
   * When the reconciler detects that a node was mutated, this method
   * may be called to restore the node to a known good state.
   */
  reconcileObservedMutation(dom, editor) {
    this.markDirty();
  }
};
function errorOnTypeKlassMismatch(type, klass) {
  const registeredNode = getRegisteredNode(getActiveEditor(), type);
  if (registeredNode === void 0) {
    {
      formatDevErrorMessage(`Create node: Attempted to create node ${klass.name} that was not configured to be used on the editor.`);
    }
  }
  const editorKlass = registeredNode.klass;
  if (editorKlass !== klass) {
    {
      formatDevErrorMessage(`Create node: Type ${type} in node ${klass.name} does not match registered node ${editorKlass.name} with the same type`);
    }
  }
}
function insertRangeAfter(node, firstToInsert, lastToInsert) {
  const lastToInsert2 = firstToInsert.getParentOrThrow().getLastChild();
  let current = firstToInsert;
  const nodesToInsert = [firstToInsert];
  while (current !== lastToInsert2) {
    if (!current.getNextSibling()) {
      {
        formatDevErrorMessage(`insertRangeAfter: lastToInsert must be a later sibling of firstToInsert`);
      }
    }
    current = current.getNextSibling();
    nodesToInsert.push(current);
  }
  let currentNode = node;
  for (const nodeToInsert of nodesToInsert) {
    currentNode = currentNode.insertAfter(nodeToInsert);
  }
}
var HISTORIC_TAG = "historic";
var HISTORY_PUSH_TAG = "history-push";
var HISTORY_MERGE_TAG = "history-merge";
var PASTE_TAG = "paste";
var COLLABORATION_TAG = "collaboration";
var SKIP_COLLAB_TAG = "skip-collab";
var SKIP_SCROLL_INTO_VIEW_TAG = "skip-scroll-into-view";
var SKIP_DOM_SELECTION_TAG = "skip-dom-selection";
var SKIP_SELECTION_FOCUS_TAG = "skip-selection-focus";
var FOCUS_TAG = "focus";
var COMPOSITION_START_TAG = "composition-start";
var COMPOSITION_END_TAG = "composition-end";
var LineBreakNode = class _LineBreakNode extends LexicalNode {
  /** @internal */
  static getType() {
    return "linebreak";
  }
  static clone(node) {
    return new _LineBreakNode(node.__key);
  }
  constructor(key) {
    super(key);
  }
  getTextContent() {
    return "\n";
  }
  createDOM() {
    return document.createElement("br");
  }
  updateDOM() {
    return false;
  }
  isInline() {
    return true;
  }
  static importDOM() {
    return {
      br: (node) => {
        if (isOnlyChildInBlockNode(node) || isLastChildInBlockNode(node)) {
          return null;
        }
        return {
          conversion: $convertLineBreakElement,
          priority: 0
        };
      }
    };
  }
  static importJSON(serializedLineBreakNode) {
    return $createLineBreakNode().updateFromJSON(serializedLineBreakNode);
  }
};
function $convertLineBreakElement(node) {
  return {
    node: $createLineBreakNode()
  };
}
function $createLineBreakNode() {
  return $applyNodeReplacement(new LineBreakNode());
}
function $isLineBreakNode(node) {
  return node instanceof LineBreakNode;
}
function isOnlyChildInBlockNode(node) {
  const parentElement = node.parentElement;
  if (parentElement !== null && isBlockDomNode(parentElement)) {
    const firstChild = parentElement.firstChild;
    if (firstChild === node || firstChild.nextSibling === node && isWhitespaceDomTextNode(firstChild)) {
      const lastChild = parentElement.lastChild;
      if (lastChild === node || lastChild.previousSibling === node && isWhitespaceDomTextNode(lastChild)) {
        return true;
      }
    }
  }
  return false;
}
function isLastChildInBlockNode(node) {
  const parentElement = node.parentElement;
  if (parentElement !== null && isBlockDomNode(parentElement)) {
    const firstChild = parentElement.firstChild;
    if (firstChild === node || firstChild.nextSibling === node && isWhitespaceDomTextNode(firstChild)) {
      return false;
    }
    const lastChild = parentElement.lastChild;
    if (lastChild === node || lastChild.previousSibling === node && isWhitespaceDomTextNode(lastChild)) {
      return true;
    }
  }
  return false;
}
function isWhitespaceDomTextNode(node) {
  return isDOMTextNode(node) && /^( |\t|\r?\n)+$/.test(node.textContent || "");
}
function getElementOuterTag(node, format) {
  if (format & IS_CODE) {
    return "code";
  }
  if (format & IS_HIGHLIGHT) {
    return "mark";
  }
  if (format & IS_SUBSCRIPT) {
    return "sub";
  }
  if (format & IS_SUPERSCRIPT) {
    return "sup";
  }
  return null;
}
function getElementInnerTag(node, format) {
  if (format & IS_BOLD) {
    return "strong";
  }
  if (format & IS_ITALIC) {
    return "em";
  }
  return "span";
}
function setTextThemeClassNames(tag, prevFormat, nextFormat, dom, textClassNames) {
  const domClassList = dom.classList;
  let classNames = getCachedClassNameArray(textClassNames, "base");
  if (classNames !== void 0) {
    domClassList.add(...classNames);
  }
  classNames = getCachedClassNameArray(textClassNames, "underlineStrikethrough");
  let hasUnderlineStrikethrough = false;
  const prevUnderlineStrikethrough = prevFormat & IS_UNDERLINE && prevFormat & IS_STRIKETHROUGH;
  const nextUnderlineStrikethrough = nextFormat & IS_UNDERLINE && nextFormat & IS_STRIKETHROUGH;
  if (classNames !== void 0) {
    if (nextUnderlineStrikethrough) {
      hasUnderlineStrikethrough = true;
      if (!prevUnderlineStrikethrough) {
        domClassList.add(...classNames);
      }
    } else if (prevUnderlineStrikethrough) {
      domClassList.remove(...classNames);
    }
  }
  for (const key in TEXT_TYPE_TO_FORMAT) {
    const format = key;
    const flag = TEXT_TYPE_TO_FORMAT[format];
    classNames = getCachedClassNameArray(textClassNames, key);
    if (classNames !== void 0) {
      if (nextFormat & flag) {
        if (hasUnderlineStrikethrough && (key === "underline" || key === "strikethrough")) {
          if (prevFormat & flag) {
            domClassList.remove(...classNames);
          }
          continue;
        }
        if ((prevFormat & flag) === 0 || prevUnderlineStrikethrough && key === "underline" || key === "strikethrough") {
          domClassList.add(...classNames);
        }
      } else if (prevFormat & flag) {
        domClassList.remove(...classNames);
      }
    }
  }
}
function diffComposedText(a2, b2) {
  const aLength = a2.length;
  const bLength = b2.length;
  let left = 0;
  let right = 0;
  while (left < aLength && left < bLength && a2[left] === b2[left]) {
    left++;
  }
  while (right + left < aLength && right + left < bLength && a2[aLength - right - 1] === b2[bLength - right - 1]) {
    right++;
  }
  return [left, aLength - left - right, b2.slice(left, bLength - right)];
}
function setTextContent(nextText, dom, node) {
  const firstChild = dom.firstChild;
  const isComposing = node.isComposing();
  const suffix = isComposing ? COMPOSITION_SUFFIX : "";
  const text = nextText + suffix;
  if (firstChild == null) {
    dom.textContent = text;
  } else {
    const nodeValue = firstChild.nodeValue;
    if (nodeValue !== text) {
      if (isComposing || IS_FIREFOX) {
        const [index, remove, insert] = diffComposedText(nodeValue, text);
        if (remove !== 0) {
          firstChild.deleteData(index, remove);
        }
        firstChild.insertData(index, insert);
      } else {
        firstChild.nodeValue = text;
      }
    }
  }
}
function createTextInnerDOM(innerDOM, node, innerTag, format, text, config) {
  setTextContent(text, innerDOM, node);
  const theme = config.theme;
  const textClassNames = theme.text;
  if (textClassNames !== void 0) {
    setTextThemeClassNames(innerTag, 0, format, innerDOM, textClassNames);
  }
}
function wrapElementWith(element, tag) {
  const el = document.createElement(tag);
  el.appendChild(element);
  return el;
}
var TextNode = class _TextNode extends LexicalNode {
  /** @internal */
  __text;
  /** @internal */
  __format;
  /** @internal */
  __style;
  /** @internal */
  __mode;
  /** @internal */
  __detail;
  static getType() {
    return "text";
  }
  static clone(node) {
    return new _TextNode(node.__text, node.__key);
  }
  afterCloneFrom(prevNode) {
    super.afterCloneFrom(prevNode);
    this.__text = prevNode.__text;
    this.__format = prevNode.__format;
    this.__style = prevNode.__style;
    this.__mode = prevNode.__mode;
    this.__detail = prevNode.__detail;
  }
  constructor(text = "", key) {
    super(key);
    this.__text = text;
    this.__format = 0;
    this.__style = "";
    this.__mode = 0;
    this.__detail = 0;
  }
  /**
   * Returns a 32-bit integer that represents the TextFormatTypes currently applied to the
   * TextNode. You probably don't want to use this method directly - consider using TextNode.hasFormat instead.
   *
   * @returns a number representing the format of the text node.
   */
  getFormat() {
    const self = this.getLatest();
    return self.__format;
  }
  /**
   * Returns a 32-bit integer that represents the TextDetailTypes currently applied to the
   * TextNode. You probably don't want to use this method directly - consider using TextNode.isDirectionless
   * or TextNode.isUnmergeable instead.
   *
   * @returns a number representing the detail of the text node.
   */
  getDetail() {
    const self = this.getLatest();
    return self.__detail;
  }
  /**
   * Returns the mode (TextModeType) of the TextNode, which may be "normal", "token", or "segmented"
   *
   * @returns TextModeType.
   */
  getMode() {
    const self = this.getLatest();
    return TEXT_TYPE_TO_MODE[self.__mode];
  }
  /**
   * Returns the styles currently applied to the node. This is analogous to CSSText in the DOM.
   *
   * @returns CSSText-like string of styles applied to the underlying DOM node.
   */
  getStyle() {
    const self = this.getLatest();
    return self.__style;
  }
  /**
   * Returns whether or not the node is in "token" mode. TextNodes in token mode can be navigated through character-by-character
   * with a RangeSelection, but are deleted as a single entity (not individually by character).
   *
   * @returns true if the node is in token mode, false otherwise.
   */
  isToken() {
    const self = this.getLatest();
    return self.__mode === IS_TOKEN;
  }
  /**
   *
   * @returns true if Lexical detects that an IME or other 3rd-party script is attempting to
   * mutate the TextNode, false otherwise.
   */
  isComposing() {
    return this.__key === $getCompositionKey();
  }
  /**
   * Returns whether or not the node is in "segmented" mode. TextNodes in segmented mode can be navigated through character-by-character
   * with a RangeSelection, but are deleted in space-delimited "segments".
   *
   * @returns true if the node is in segmented mode, false otherwise.
   */
  isSegmented() {
    const self = this.getLatest();
    return self.__mode === IS_SEGMENTED;
  }
  /**
   * Returns whether or not the node is "directionless". Directionless nodes don't respect changes between RTL and LTR modes.
   *
   * @returns true if the node is directionless, false otherwise.
   */
  isDirectionless() {
    const self = this.getLatest();
    return (self.__detail & IS_DIRECTIONLESS) !== 0;
  }
  /**
   * Returns whether or not the node is unmergeable. In some scenarios, Lexical tries to merge
   * adjacent TextNodes into a single TextNode. If a TextNode is unmergeable, this won't happen.
   *
   * @returns true if the node is unmergeable, false otherwise.
   */
  isUnmergeable() {
    const self = this.getLatest();
    return (self.__detail & IS_UNMERGEABLE) !== 0;
  }
  /**
   * Returns whether or not the node has the provided format applied. Use this with the human-readable TextFormatType
   * string values to get the format of a TextNode.
   *
   * @param type - the TextFormatType to check for.
   *
   * @returns true if the node has the provided format, false otherwise.
   */
  hasFormat(type) {
    const formatFlag = TEXT_TYPE_TO_FORMAT[type];
    return (this.getFormat() & formatFlag) !== 0;
  }
  /**
   * Returns whether or not the node is simple text. Simple text is defined as a TextNode that has the string type "text"
   * (i.e., not a subclass) and has no mode applied to it (i.e., not segmented or token).
   *
   * @returns true if the node is simple text, false otherwise.
   */
  isSimpleText() {
    return this.__type === "text" && this.__mode === 0;
  }
  /**
   * Returns the text content of the node as a string.
   *
   * @returns a string representing the text content of the node.
   */
  getTextContent() {
    const self = this.getLatest();
    return self.__text;
  }
  /**
   * Returns the format flags applied to the node as a 32-bit integer.
   *
   * @returns a number representing the TextFormatTypes applied to the node.
   */
  getFormatFlags(type, alignWithFormat) {
    const self = this.getLatest();
    const format = self.__format;
    return toggleTextFormatType(format, type, alignWithFormat);
  }
  /**
   *
   * @returns true if the text node supports font styling, false otherwise.
   */
  canHaveFormat() {
    return true;
  }
  /**
   * @returns true if the text node is inline, false otherwise.
   */
  isInline() {
    return true;
  }
  // View
  createDOM(config, editor) {
    const format = this.__format;
    const outerTag = getElementOuterTag(this, format);
    const innerTag = getElementInnerTag(this, format);
    const tag = outerTag === null ? innerTag : outerTag;
    const dom = document.createElement(tag);
    let innerDOM = dom;
    if (this.hasFormat("code")) {
      dom.setAttribute("spellcheck", "false");
    }
    if (outerTag !== null) {
      innerDOM = document.createElement(innerTag);
      dom.appendChild(innerDOM);
    }
    const text = this.__text;
    createTextInnerDOM(innerDOM, this, innerTag, format, text, config);
    const style = this.__style;
    if (style !== "") {
      dom.style.cssText = style;
    }
    return dom;
  }
  updateDOM(prevNode, dom, config) {
    const nextText = this.__text;
    const prevFormat = prevNode.__format;
    const nextFormat = this.__format;
    const prevOuterTag = getElementOuterTag(this, prevFormat);
    const nextOuterTag = getElementOuterTag(this, nextFormat);
    const prevInnerTag = getElementInnerTag(this, prevFormat);
    const nextInnerTag = getElementInnerTag(this, nextFormat);
    const prevTag = prevOuterTag === null ? prevInnerTag : prevOuterTag;
    const nextTag = nextOuterTag === null ? nextInnerTag : nextOuterTag;
    if (prevTag !== nextTag) {
      return true;
    }
    if (prevOuterTag === nextOuterTag && prevInnerTag !== nextInnerTag) {
      const prevInnerDOM = dom.firstChild;
      if (prevInnerDOM == null) {
        {
          formatDevErrorMessage(`updateDOM: prevInnerDOM is null or undefined`);
        }
      }
      const nextInnerDOM = document.createElement(nextInnerTag);
      createTextInnerDOM(nextInnerDOM, this, nextInnerTag, nextFormat, nextText, config);
      dom.replaceChild(nextInnerDOM, prevInnerDOM);
      return false;
    }
    let innerDOM = dom;
    if (nextOuterTag !== null) {
      if (prevOuterTag !== null) {
        innerDOM = dom.firstChild;
        if (innerDOM == null) {
          {
            formatDevErrorMessage(`updateDOM: innerDOM is null or undefined`);
          }
        }
      }
    }
    setTextContent(nextText, innerDOM, this);
    const theme = config.theme;
    const textClassNames = theme.text;
    if (textClassNames !== void 0 && prevFormat !== nextFormat) {
      setTextThemeClassNames(nextInnerTag, prevFormat, nextFormat, innerDOM, textClassNames);
    }
    const prevStyle = prevNode.__style;
    const nextStyle = this.__style;
    if (prevStyle !== nextStyle) {
      dom.style.cssText = nextStyle;
    }
    return false;
  }
  static importDOM() {
    return {
      "#text": () => ({
        conversion: $convertTextDOMNode,
        priority: 0
      }),
      b: () => ({
        conversion: convertBringAttentionToElement,
        priority: 0
      }),
      code: () => ({
        conversion: convertTextFormatElement,
        priority: 0
      }),
      em: () => ({
        conversion: convertTextFormatElement,
        priority: 0
      }),
      i: () => ({
        conversion: convertTextFormatElement,
        priority: 0
      }),
      mark: () => ({
        conversion: convertTextFormatElement,
        priority: 0
      }),
      s: () => ({
        conversion: convertTextFormatElement,
        priority: 0
      }),
      span: () => ({
        conversion: convertSpanElement,
        priority: 0
      }),
      strong: () => ({
        conversion: convertTextFormatElement,
        priority: 0
      }),
      sub: () => ({
        conversion: convertTextFormatElement,
        priority: 0
      }),
      sup: () => ({
        conversion: convertTextFormatElement,
        priority: 0
      }),
      u: () => ({
        conversion: convertTextFormatElement,
        priority: 0
      })
    };
  }
  static importJSON(serializedNode) {
    return $createTextNode().updateFromJSON(serializedNode);
  }
  updateFromJSON(serializedNode) {
    return super.updateFromJSON(serializedNode).setTextContent(serializedNode.text).setFormat(serializedNode.format).setDetail(serializedNode.detail).setMode(serializedNode.mode).setStyle(serializedNode.style);
  }
  // This improves Lexical's basic text output in copy+paste plus
  // for headless mode where people might use Lexical to generate
  // HTML content and not have the ability to use CSS classes.
  exportDOM(editor) {
    let {
      element
    } = super.exportDOM(editor);
    if (!isHTMLElement(element)) {
      formatDevErrorMessage(`Expected TextNode createDOM to always return a HTMLElement`);
    }
    element.style.whiteSpace = "pre-wrap";
    if (this.hasFormat("lowercase")) {
      element.style.textTransform = "lowercase";
    } else if (this.hasFormat("uppercase")) {
      element.style.textTransform = "uppercase";
    } else if (this.hasFormat("capitalize")) {
      element.style.textTransform = "capitalize";
    }
    if (this.hasFormat("bold")) {
      element = wrapElementWith(element, "b");
    }
    if (this.hasFormat("italic")) {
      element = wrapElementWith(element, "i");
    }
    if (this.hasFormat("strikethrough")) {
      element = wrapElementWith(element, "s");
    }
    if (this.hasFormat("underline")) {
      element = wrapElementWith(element, "u");
    }
    return {
      element
    };
  }
  exportJSON() {
    return {
      detail: this.getDetail(),
      format: this.getFormat(),
      mode: this.getMode(),
      style: this.getStyle(),
      text: this.getTextContent(),
      // As an exception here we invoke super at the end for historical reasons.
      // Namely, to preserve the order of the properties and not to break the tests
      // that use the serialized string representation.
      ...super.exportJSON()
    };
  }
  // Mutators
  selectionTransform(prevSelection, nextSelection) {
    return;
  }
  /**
   * Sets the node format to the provided TextFormatType or 32-bit integer. Note that the TextFormatType
   * version of the argument can only specify one format and doing so will remove all other formats that
   * may be applied to the node. For toggling behavior, consider using {@link TextNode.toggleFormat}
   *
   * @param format - TextFormatType or 32-bit integer representing the node format.
   *
   * @returns this TextNode.
   * // TODO 0.12 This should just be a `string`.
   */
  setFormat(format) {
    const self = this.getWritable();
    self.__format = typeof format === "string" ? TEXT_TYPE_TO_FORMAT[format] : format;
    return self;
  }
  /**
   * Sets the node detail to the provided TextDetailType or 32-bit integer. Note that the TextDetailType
   * version of the argument can only specify one detail value and doing so will remove all other detail values that
   * may be applied to the node. For toggling behavior, consider using {@link TextNode.toggleDirectionless}
   * or {@link TextNode.toggleUnmergeable}
   *
   * @param detail - TextDetailType or 32-bit integer representing the node detail.
   *
   * @returns this TextNode.
   * // TODO 0.12 This should just be a `string`.
   */
  setDetail(detail) {
    const self = this.getWritable();
    self.__detail = typeof detail === "string" ? DETAIL_TYPE_TO_DETAIL[detail] : detail;
    return self;
  }
  /**
   * Sets the node style to the provided CSSText-like string. Set this property as you
   * would an HTMLElement style attribute to apply inline styles to the underlying DOM Element.
   *
   * @param style - CSSText to be applied to the underlying HTMLElement.
   *
   * @returns this TextNode.
   */
  setStyle(style) {
    const self = this.getWritable();
    self.__style = style;
    return self;
  }
  /**
   * Applies the provided format to this TextNode if it's not present. Removes it if it's present.
   * The subscript and superscript formats are mutually exclusive.
   * Prefer using this method to turn specific formats on and off.
   *
   * @param type - TextFormatType to toggle.
   *
   * @returns this TextNode.
   */
  toggleFormat(type) {
    const format = this.getFormat();
    const newFormat = toggleTextFormatType(format, type, null);
    return this.setFormat(newFormat);
  }
  /**
   * Toggles the directionless detail value of the node. Prefer using this method over setDetail.
   *
   * @returns this TextNode.
   */
  toggleDirectionless() {
    const self = this.getWritable();
    self.__detail ^= IS_DIRECTIONLESS;
    return self;
  }
  /**
   * Toggles the unmergeable detail value of the node. Prefer using this method over setDetail.
   *
   * @returns this TextNode.
   */
  toggleUnmergeable() {
    const self = this.getWritable();
    self.__detail ^= IS_UNMERGEABLE;
    return self;
  }
  /**
   * Sets the mode of the node.
   *
   * @returns this TextNode.
   */
  setMode(type) {
    const mode = TEXT_MODE_TO_TYPE[type];
    if (this.__mode === mode) {
      return this;
    }
    const self = this.getWritable();
    self.__mode = mode;
    return self;
  }
  /**
   * Sets the text content of the node.
   *
   * @param text - the string to set as the text value of the node.
   *
   * @returns this TextNode.
   */
  setTextContent(text) {
    if (this.__text === text) {
      return this;
    }
    const self = this.getWritable();
    self.__text = text;
    return self;
  }
  /**
   * Sets the current Lexical selection to be a RangeSelection with anchor and focus on this TextNode at the provided offsets.
   *
   * @param _anchorOffset - the offset at which the Selection anchor will be placed.
   * @param _focusOffset - the offset at which the Selection focus will be placed.
   *
   * @returns the new RangeSelection.
   */
  select(_anchorOffset, _focusOffset) {
    errorOnReadOnly();
    let anchorOffset = _anchorOffset;
    let focusOffset = _focusOffset;
    const selection = $getSelection();
    const text = this.getTextContent();
    const key = this.__key;
    if (typeof text === "string") {
      const lastOffset = text.length;
      if (anchorOffset === void 0) {
        anchorOffset = lastOffset;
      }
      if (focusOffset === void 0) {
        focusOffset = lastOffset;
      }
    } else {
      anchorOffset = 0;
      focusOffset = 0;
    }
    if (!$isRangeSelection(selection)) {
      return $internalMakeRangeSelection(key, anchorOffset, key, focusOffset, "text", "text");
    } else {
      const compositionKey = $getCompositionKey();
      if (compositionKey === selection.anchor.key || compositionKey === selection.focus.key) {
        $setCompositionKey(key);
      }
      selection.setTextNodeRange(this, anchorOffset, this, focusOffset);
    }
    return selection;
  }
  selectStart() {
    return this.select(0, 0);
  }
  selectEnd() {
    const size = this.getTextContentSize();
    return this.select(size, size);
  }
  /**
   * Inserts the provided text into this TextNode at the provided offset, deleting the number of characters
   * specified. Can optionally calculate a new selection after the operation is complete.
   *
   * @param offset - the offset at which the splice operation should begin.
   * @param delCount - the number of characters to delete, starting from the offset.
   * @param newText - the text to insert into the TextNode at the offset.
   * @param moveSelection - optional, whether or not to move selection to the end of the inserted substring.
   *
   * @returns this TextNode.
   */
  spliceText(offset, delCount, newText, moveSelection) {
    const writableSelf = this.getWritable();
    const text = writableSelf.__text;
    const handledTextLength = newText.length;
    let index = offset;
    if (index < 0) {
      index = handledTextLength + index;
      if (index < 0) {
        index = 0;
      }
    }
    const selection = $getSelection();
    if (moveSelection && $isRangeSelection(selection)) {
      const newOffset = offset + handledTextLength;
      selection.setTextNodeRange(writableSelf, newOffset, writableSelf, newOffset);
    }
    const updatedText = text.slice(0, index) + newText + text.slice(index + delCount);
    writableSelf.__text = updatedText;
    return writableSelf;
  }
  /**
   * This method is meant to be overridden by TextNode subclasses to control the behavior of those nodes
   * when a user event would cause text to be inserted before them in the editor. If true, Lexical will attempt
   * to insert text into this node. If false, it will insert the text in a new sibling node.
   *
   * @returns true if text can be inserted before the node, false otherwise.
   */
  canInsertTextBefore() {
    return true;
  }
  /**
   * This method is meant to be overridden by TextNode subclasses to control the behavior of those nodes
   * when a user event would cause text to be inserted after them in the editor. If true, Lexical will attempt
   * to insert text into this node. If false, it will insert the text in a new sibling node.
   *
   * @returns true if text can be inserted after the node, false otherwise.
   */
  canInsertTextAfter() {
    return true;
  }
  /**
   * Splits this TextNode at the provided character offsets, forming new TextNodes from the substrings
   * formed by the split, and inserting those new TextNodes into the editor, replacing the one that was split.
   *
   * @param splitOffsets - rest param of the text content character offsets at which this node should be split.
   *
   * @returns an Array containing the newly-created TextNodes.
   */
  splitText(...splitOffsets) {
    errorOnReadOnly();
    const self = this.getLatest();
    const textContent = self.getTextContent();
    if (textContent === "") {
      return [];
    }
    const key = self.__key;
    const compositionKey = $getCompositionKey();
    const textLength = textContent.length;
    splitOffsets.sort((a2, b2) => a2 - b2);
    splitOffsets.push(textLength);
    const parts = [];
    const splitOffsetsLength = splitOffsets.length;
    for (let start = 0, offsetIndex = 0; start < textLength && offsetIndex <= splitOffsetsLength; offsetIndex++) {
      const end = splitOffsets[offsetIndex];
      if (end > start) {
        parts.push(textContent.slice(start, end));
        start = end;
      }
    }
    const partsLength = parts.length;
    if (partsLength === 1) {
      return [self];
    }
    const firstPart = parts[0];
    const parent = self.getParent();
    let writableNode;
    const format = self.getFormat();
    const style = self.getStyle();
    const detail = self.__detail;
    let hasReplacedSelf = false;
    let startTextPoint = null;
    let endTextPoint = null;
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const [startPoint, endPoint] = selection.isBackward() ? [selection.focus, selection.anchor] : [selection.anchor, selection.focus];
      if (startPoint.type === "text" && startPoint.key === key) {
        startTextPoint = startPoint;
      }
      if (endPoint.type === "text" && endPoint.key === key) {
        endTextPoint = endPoint;
      }
    }
    if (self.isSegmented()) {
      writableNode = $createTextNode(firstPart);
      writableNode.__format = format;
      writableNode.__style = style;
      writableNode.__detail = detail;
      writableNode.__state = $cloneNodeState(self, writableNode);
      hasReplacedSelf = true;
    } else {
      writableNode = self.setTextContent(firstPart);
    }
    const splitNodes = [writableNode];
    for (let i2 = 1; i2 < partsLength; i2++) {
      const part = parts[i2];
      const sibling = $createTextNode(part);
      sibling.__format = format;
      sibling.__style = style;
      sibling.__detail = detail;
      sibling.__state = $cloneNodeState(self, sibling);
      const siblingKey = sibling.__key;
      if (compositionKey === key) {
        $setCompositionKey(siblingKey);
      }
      splitNodes.push(sibling);
    }
    const originalStartOffset = startTextPoint ? startTextPoint.offset : null;
    const originalEndOffset = endTextPoint ? endTextPoint.offset : null;
    let startOffset = 0;
    for (const node of splitNodes) {
      if (!(startTextPoint || endTextPoint)) {
        break;
      }
      const endOffset = startOffset + node.getTextContentSize();
      if (startTextPoint !== null && originalStartOffset !== null && originalStartOffset <= endOffset && originalStartOffset >= startOffset) {
        startTextPoint.set(node.getKey(), originalStartOffset - startOffset, "text");
        if (originalStartOffset < endOffset) {
          startTextPoint = null;
        }
      }
      if (endTextPoint !== null && originalEndOffset !== null && originalEndOffset <= endOffset && originalEndOffset >= startOffset) {
        endTextPoint.set(node.getKey(), originalEndOffset - startOffset, "text");
        break;
      }
      startOffset = endOffset;
    }
    if (parent !== null) {
      internalMarkSiblingsAsDirty(this);
      const writableParent = parent.getWritable();
      const insertionIndex = this.getIndexWithinParent();
      if (hasReplacedSelf) {
        writableParent.splice(insertionIndex, 0, splitNodes);
        this.remove();
      } else {
        writableParent.splice(insertionIndex, 1, splitNodes);
      }
      if ($isRangeSelection(selection)) {
        $updateElementSelectionOnCreateDeleteNode(selection, parent, insertionIndex, partsLength - 1);
      }
    }
    return splitNodes;
  }
  /**
   * Merges the target TextNode into this TextNode, removing the target node.
   *
   * @param target - the TextNode to merge into this one.
   *
   * @returns this TextNode.
   */
  mergeWithSibling(target) {
    const isBefore = target === this.getPreviousSibling();
    if (!isBefore && target !== this.getNextSibling()) {
      {
        formatDevErrorMessage(`mergeWithSibling: sibling must be a previous or next sibling`);
      }
    }
    const key = this.__key;
    const targetKey = target.__key;
    const text = this.__text;
    const textLength = text.length;
    const compositionKey = $getCompositionKey();
    if (compositionKey === targetKey) {
      $setCompositionKey(key);
    }
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchor = selection.anchor;
      const focus = selection.focus;
      if (anchor !== null && anchor.key === targetKey) {
        adjustPointOffsetForMergedSibling(anchor, isBefore, key, target, textLength);
      }
      if (focus !== null && focus.key === targetKey) {
        adjustPointOffsetForMergedSibling(focus, isBefore, key, target, textLength);
      }
    }
    const targetText = target.__text;
    const newText = isBefore ? targetText + text : text + targetText;
    this.setTextContent(newText);
    const writableSelf = this.getWritable();
    target.remove();
    return writableSelf;
  }
  /**
   * This method is meant to be overridden by TextNode subclasses to control the behavior of those nodes
   * when used with the registerLexicalTextEntity function. If you're using registerLexicalTextEntity, the
   * node class that you create and replace matched text with should return true from this method.
   *
   * @returns true if the node is to be treated as a "text entity", false otherwise.
   */
  isTextEntity() {
    return false;
  }
};
function convertSpanElement(domNode) {
  const span = domNode;
  const style = span.style;
  return {
    forChild: applyTextFormatFromStyle(style),
    node: null
  };
}
function convertBringAttentionToElement(domNode) {
  const b2 = domNode;
  const hasNormalFontWeight = b2.style.fontWeight === "normal";
  return {
    forChild: applyTextFormatFromStyle(b2.style, hasNormalFontWeight ? void 0 : "bold"),
    node: null
  };
}
var preParentCache = /* @__PURE__ */ new WeakMap();
function isNodePre(node) {
  if (!isHTMLElement(node)) {
    return false;
  } else if (node.nodeName === "PRE") {
    return true;
  }
  const whiteSpace = node.style.whiteSpace;
  return typeof whiteSpace === "string" && whiteSpace.startsWith("pre");
}
function findParentPreDOMNode(node) {
  let cached;
  let parent = node.parentNode;
  const visited = [node];
  while (parent !== null && (cached = preParentCache.get(parent)) === void 0 && !isNodePre(parent)) {
    visited.push(parent);
    parent = parent.parentNode;
  }
  const resultNode = cached === void 0 ? parent : cached;
  for (let i2 = 0; i2 < visited.length; i2++) {
    preParentCache.set(visited[i2], resultNode);
  }
  return resultNode;
}
function $convertTextDOMNode(domNode) {
  const domNode_ = domNode;
  const parentDom = domNode.parentElement;
  if (!(parentDom !== null)) {
    formatDevErrorMessage(`Expected parentElement of Text not to be null`);
  }
  let textContent = domNode_.textContent || "";
  if (findParentPreDOMNode(domNode_) !== null) {
    const parts = textContent.split(/(\r?\n|\t)/);
    const nodes = [];
    const length = parts.length;
    for (let i2 = 0; i2 < length; i2++) {
      const part = parts[i2];
      if (part === "\n" || part === "\r\n") {
        nodes.push($createLineBreakNode());
      } else if (part === "	") {
        nodes.push($createTabNode());
      } else if (part !== "") {
        nodes.push($createTextNode(part));
      }
    }
    return {
      node: nodes
    };
  }
  textContent = textContent.replace(/\r/g, "").replace(/[ \t\n]+/g, " ");
  if (textContent === "") {
    return {
      node: null
    };
  }
  if (textContent[0] === " ") {
    let previousText = domNode_;
    let isStartOfLine = true;
    while (previousText !== null && (previousText = findTextInLine(previousText, false)) !== null) {
      const previousTextContent = previousText.textContent || "";
      if (previousTextContent.length > 0) {
        if (/[ \t\n]$/.test(previousTextContent)) {
          textContent = textContent.slice(1);
        }
        isStartOfLine = false;
        break;
      }
    }
    if (isStartOfLine) {
      textContent = textContent.slice(1);
    }
  }
  if (textContent[textContent.length - 1] === " ") {
    let nextText = domNode_;
    let isEndOfLine = true;
    while (nextText !== null && (nextText = findTextInLine(nextText, true)) !== null) {
      const nextTextContent = (nextText.textContent || "").replace(/^( |\t|\r?\n)+/, "");
      if (nextTextContent.length > 0) {
        isEndOfLine = false;
        break;
      }
    }
    if (isEndOfLine) {
      textContent = textContent.slice(0, textContent.length - 1);
    }
  }
  if (textContent === "") {
    return {
      node: null
    };
  }
  return {
    node: $createTextNode(textContent)
  };
}
function findTextInLine(text, forward) {
  let node = text;
  while (true) {
    let sibling;
    while ((sibling = forward ? node.nextSibling : node.previousSibling) === null) {
      const parentElement = node.parentElement;
      if (parentElement === null) {
        return null;
      }
      node = parentElement;
    }
    node = sibling;
    if (isHTMLElement(node)) {
      const display = node.style.display;
      if (display === "" && !isInlineDomNode(node) || display !== "" && !display.startsWith("inline")) {
        return null;
      }
    }
    let descendant = node;
    while ((descendant = forward ? node.firstChild : node.lastChild) !== null) {
      node = descendant;
    }
    if (isDOMTextNode(node)) {
      return node;
    } else if (node.nodeName === "BR") {
      return null;
    }
  }
}
var nodeNameToTextFormat = {
  code: "code",
  em: "italic",
  i: "italic",
  mark: "highlight",
  s: "strikethrough",
  strong: "bold",
  sub: "subscript",
  sup: "superscript",
  u: "underline"
};
function convertTextFormatElement(domNode) {
  const format = nodeNameToTextFormat[domNode.nodeName.toLowerCase()];
  if (format === void 0) {
    return {
      node: null
    };
  }
  return {
    forChild: applyTextFormatFromStyle(domNode.style, format),
    node: null
  };
}
function $createTextNode(text = "") {
  return $applyNodeReplacement(new TextNode(text));
}
function $isTextNode(node) {
  return node instanceof TextNode;
}
function applyTextFormatFromStyle(style, shouldApply) {
  const fontWeight = style.fontWeight;
  const textDecoration = style.textDecoration.split(" ");
  const hasBoldFontWeight = fontWeight === "700" || fontWeight === "bold";
  const hasLinethroughTextDecoration = textDecoration.includes("line-through");
  const hasItalicFontStyle = style.fontStyle === "italic";
  const hasUnderlineTextDecoration = textDecoration.includes("underline");
  const verticalAlign = style.verticalAlign;
  return (lexicalNode) => {
    if (!$isTextNode(lexicalNode)) {
      return lexicalNode;
    }
    if (hasBoldFontWeight && !lexicalNode.hasFormat("bold")) {
      lexicalNode.toggleFormat("bold");
    }
    if (hasLinethroughTextDecoration && !lexicalNode.hasFormat("strikethrough")) {
      lexicalNode.toggleFormat("strikethrough");
    }
    if (hasItalicFontStyle && !lexicalNode.hasFormat("italic")) {
      lexicalNode.toggleFormat("italic");
    }
    if (hasUnderlineTextDecoration && !lexicalNode.hasFormat("underline")) {
      lexicalNode.toggleFormat("underline");
    }
    if (verticalAlign === "sub" && !lexicalNode.hasFormat("subscript")) {
      lexicalNode.toggleFormat("subscript");
    }
    if (verticalAlign === "super" && !lexicalNode.hasFormat("superscript")) {
      lexicalNode.toggleFormat("superscript");
    }
    if (shouldApply && !lexicalNode.hasFormat(shouldApply)) {
      lexicalNode.toggleFormat(shouldApply);
    }
    return lexicalNode;
  };
}
var TabNode = class _TabNode extends TextNode {
  static getType() {
    return "tab";
  }
  static clone(node) {
    return new _TabNode(node.__key);
  }
  constructor(key) {
    super("	", key);
    this.__detail = IS_UNMERGEABLE;
  }
  static importDOM() {
    return null;
  }
  createDOM(config) {
    const dom = super.createDOM(config);
    const classNames = getCachedClassNameArray(config.theme, "tab");
    if (classNames !== void 0) {
      const domClassList = dom.classList;
      domClassList.add(...classNames);
    }
    return dom;
  }
  static importJSON(serializedTabNode) {
    return $createTabNode().updateFromJSON(serializedTabNode);
  }
  setTextContent(text) {
    if (!(text === "	" || text === "")) {
      formatDevErrorMessage(`TabNode does not support setTextContent`);
    }
    return super.setTextContent("	");
  }
  spliceText(offset, delCount, newText, moveSelection) {
    if (!(newText === "" && delCount === 0 || newText === "	" && delCount === 1)) {
      formatDevErrorMessage(`TabNode does not support spliceText`);
    }
    return this;
  }
  setDetail(detail) {
    if (!(detail === IS_UNMERGEABLE)) {
      formatDevErrorMessage(`TabNode does not support setDetail`);
    }
    return this;
  }
  setMode(type) {
    if (!(type === "normal")) {
      formatDevErrorMessage(`TabNode does not support setMode`);
    }
    return this;
  }
  canInsertTextBefore() {
    return false;
  }
  canInsertTextAfter() {
    return false;
  }
};
function $createTabNode() {
  return $applyNodeReplacement(new TabNode());
}
function $isTabNode(node) {
  return node instanceof TabNode;
}
var Point = class {
  key;
  offset;
  type;
  _selection;
  constructor(key, offset, type) {
    {
      Object.defineProperty(this, "_selection", {
        enumerable: false,
        writable: true
      });
    }
    this._selection = null;
    this.key = key;
    this.offset = offset;
    this.type = type;
  }
  is(point) {
    return this.key === point.key && this.offset === point.offset && this.type === point.type;
  }
  isBefore(b2) {
    if (this.key === b2.key) {
      return this.offset < b2.offset;
    }
    const aCaret = $normalizeCaret($caretFromPoint(this, "next"));
    const bCaret = $normalizeCaret($caretFromPoint(b2, "next"));
    return $comparePointCaretNext(aCaret, bCaret) < 0;
  }
  getNode() {
    const key = this.key;
    const node = $getNodeByKey(key);
    if (node === null) {
      {
        formatDevErrorMessage(`Point.getNode: node not found`);
      }
    }
    return node;
  }
  set(key, offset, type, onlyIfChanged) {
    const selection = this._selection;
    const oldKey = this.key;
    if (onlyIfChanged && this.key === key && this.offset === offset && this.type === type) {
      return;
    }
    this.key = key;
    this.offset = offset;
    this.type = type;
    {
      const node = $getNodeByKey(key);
      if (!(type === "text" ? $isTextNode(node) : $isElementNode(node))) {
        formatDevErrorMessage(`PointType.set: node with key ${key} is ${node ? node.__type : "[not found]"} and can not be used for a ${type} point`);
      }
    }
    if (!isCurrentlyReadOnlyMode()) {
      if ($getCompositionKey() === oldKey) {
        $setCompositionKey(key);
      }
      if (selection !== null) {
        selection.setCachedNodes(null);
        selection.dirty = true;
      }
    }
  }
};
function $createPoint(key, offset, type) {
  return new Point(key, offset, type);
}
function selectPointOnNode(point, node) {
  let key = node.__key;
  let offset = point.offset;
  let type = "element";
  if ($isTextNode(node)) {
    type = "text";
    const textContentLength = node.getTextContentSize();
    if (offset > textContentLength) {
      offset = textContentLength;
    }
  } else if (!$isElementNode(node)) {
    const nextSibling = node.getNextSibling();
    if ($isTextNode(nextSibling)) {
      key = nextSibling.__key;
      offset = 0;
      type = "text";
    } else {
      const parentNode = node.getParent();
      if (parentNode) {
        key = parentNode.__key;
        offset = node.getIndexWithinParent() + 1;
      }
    }
  }
  point.set(key, offset, type);
}
function $moveSelectionPointToEnd(point, node) {
  if ($isElementNode(node)) {
    const lastNode = node.getLastDescendant();
    if ($isElementNode(lastNode) || $isTextNode(lastNode)) {
      selectPointOnNode(point, lastNode);
    } else {
      selectPointOnNode(point, node);
    }
  } else {
    selectPointOnNode(point, node);
  }
}
function $transferStartingElementPointToTextPoint(start, end, format, style) {
  const element = start.getNode();
  const placementNode = element.getChildAtIndex(start.offset);
  const textNode = $createTextNode();
  textNode.setFormat(format);
  textNode.setStyle(style);
  if ($isParagraphNode(placementNode)) {
    placementNode.splice(0, 0, [textNode]);
  } else {
    const target = $isRootNode(element) ? $createParagraphNode().append(textNode) : textNode;
    if (placementNode === null) {
      element.append(target);
    } else {
      placementNode.insertBefore(target);
    }
  }
  if (start.is(end)) {
    end.set(textNode.__key, 0, "text");
  }
  start.set(textNode.__key, 0, "text");
}
var NodeSelection = class _NodeSelection {
  _nodes;
  _cachedNodes;
  dirty;
  constructor(objects) {
    this._cachedNodes = null;
    this._nodes = objects;
    this.dirty = false;
  }
  getCachedNodes() {
    return this._cachedNodes;
  }
  setCachedNodes(nodes) {
    this._cachedNodes = nodes;
  }
  is(selection) {
    if (!$isNodeSelection(selection)) {
      return false;
    }
    const a2 = this._nodes;
    const b2 = selection._nodes;
    return a2.size === b2.size && Array.from(a2).every((key) => b2.has(key));
  }
  isCollapsed() {
    return false;
  }
  isBackward() {
    return false;
  }
  getStartEndPoints() {
    return null;
  }
  add(key) {
    this.dirty = true;
    this._nodes.add(key);
    this._cachedNodes = null;
  }
  delete(key) {
    this.dirty = true;
    this._nodes.delete(key);
    this._cachedNodes = null;
  }
  clear() {
    this.dirty = true;
    this._nodes.clear();
    this._cachedNodes = null;
  }
  has(key) {
    return this._nodes.has(key);
  }
  clone() {
    return new _NodeSelection(new Set(this._nodes));
  }
  extract() {
    return this.getNodes();
  }
  insertRawText(text) {
  }
  insertText() {
  }
  insertNodes(nodes) {
    const selectedNodes = this.getNodes();
    const selectedNodesLength = selectedNodes.length;
    const lastSelectedNode = selectedNodes[selectedNodesLength - 1];
    let selectionAtEnd;
    if ($isTextNode(lastSelectedNode)) {
      selectionAtEnd = lastSelectedNode.select();
    } else {
      const index = lastSelectedNode.getIndexWithinParent() + 1;
      selectionAtEnd = lastSelectedNode.getParentOrThrow().select(index, index);
    }
    selectionAtEnd.insertNodes(nodes);
    for (let i2 = 0; i2 < selectedNodesLength; i2++) {
      selectedNodes[i2].remove();
    }
  }
  getNodes() {
    const cachedNodes = this._cachedNodes;
    if (cachedNodes !== null) {
      return cachedNodes;
    }
    const objects = this._nodes;
    const nodes = [];
    for (const object of objects) {
      const node = $getNodeByKey(object);
      if (node !== null) {
        nodes.push(node);
      }
    }
    if (!isCurrentlyReadOnlyMode()) {
      this._cachedNodes = nodes;
    }
    return nodes;
  }
  getTextContent() {
    const nodes = this.getNodes();
    let textContent = "";
    for (let i2 = 0; i2 < nodes.length; i2++) {
      textContent += nodes[i2].getTextContent();
    }
    return textContent;
  }
  /**
   * Remove all nodes in the NodeSelection. If there were any nodes,
   * replace the selection with a new RangeSelection at the previous
   * location of the first node.
   */
  deleteNodes() {
    const nodes = this.getNodes();
    if (($getSelection() || $getPreviousSelection()) === this && nodes[0]) {
      const firstCaret = $getSiblingCaret(nodes[0], "next");
      $setSelectionFromCaretRange($getCaretRange(firstCaret, firstCaret));
    }
    for (const node of nodes) {
      node.remove();
    }
  }
};
function $isRangeSelection(x) {
  return x instanceof RangeSelection;
}
var RangeSelection = class _RangeSelection {
  format;
  style;
  anchor;
  focus;
  _cachedNodes;
  dirty;
  constructor(anchor, focus, format, style) {
    this.anchor = anchor;
    this.focus = focus;
    anchor._selection = this;
    focus._selection = this;
    this._cachedNodes = null;
    this.format = format;
    this.style = style;
    this.dirty = false;
  }
  getCachedNodes() {
    return this._cachedNodes;
  }
  setCachedNodes(nodes) {
    this._cachedNodes = nodes;
  }
  /**
   * Used to check if the provided selections is equal to this one by value,
   * including anchor, focus, format, and style properties.
   * @param selection - the Selection to compare this one to.
   * @returns true if the Selections are equal, false otherwise.
   */
  is(selection) {
    if (!$isRangeSelection(selection)) {
      return false;
    }
    return this.anchor.is(selection.anchor) && this.focus.is(selection.focus) && this.format === selection.format && this.style === selection.style;
  }
  /**
   * Returns whether the Selection is "collapsed", meaning the anchor and focus are
   * the same node and have the same offset.
   *
   * @returns true if the Selection is collapsed, false otherwise.
   */
  isCollapsed() {
    return this.anchor.is(this.focus);
  }
  /**
   * Gets all the nodes in the Selection. Uses caching to make it generally suitable
   * for use in hot paths.
   *
   * See also the {@link CaretRange} APIs (starting with
   * {@link $caretRangeFromSelection}), which are likely to provide a better
   * foundation for any operation where partial selection is relevant
   * (e.g. the anchor or focus are inside an ElementNode and TextNode)
   *
   * @returns an Array containing all the nodes in the Selection
   */
  getNodes() {
    const cachedNodes = this._cachedNodes;
    if (cachedNodes !== null) {
      return cachedNodes;
    }
    const range = $getCaretRangeInDirection($caretRangeFromSelection(this), "next");
    const nodes = $getNodesFromCaretRangeCompat(range);
    {
      if (this.isCollapsed() && nodes.length > 1) {
        {
          formatDevErrorMessage(`RangeSelection.getNodes() returned ${String(nodes.length)} > 1 nodes in a collapsed selection`);
        }
      }
    }
    if (!isCurrentlyReadOnlyMode()) {
      this._cachedNodes = nodes;
    }
    return nodes;
  }
  /**
   * Sets this Selection to be of type "text" at the provided anchor and focus values.
   *
   * @param anchorNode - the anchor node to set on the Selection
   * @param anchorOffset - the offset to set on the Selection
   * @param focusNode - the focus node to set on the Selection
   * @param focusOffset - the focus offset to set on the Selection
   */
  setTextNodeRange(anchorNode, anchorOffset, focusNode, focusOffset) {
    this.anchor.set(anchorNode.__key, anchorOffset, "text");
    this.focus.set(focusNode.__key, focusOffset, "text");
  }
  /**
   * Gets the (plain) text content of all the nodes in the selection.
   *
   * @returns a string representing the text content of all the nodes in the Selection
   */
  getTextContent() {
    const nodes = this.getNodes();
    if (nodes.length === 0) {
      return "";
    }
    const firstNode = nodes[0];
    const lastNode = nodes[nodes.length - 1];
    const anchor = this.anchor;
    const focus = this.focus;
    const isBefore = anchor.isBefore(focus);
    const [anchorOffset, focusOffset] = $getCharacterOffsets(this);
    let textContent = "";
    let prevWasElement = true;
    for (let i2 = 0; i2 < nodes.length; i2++) {
      const node = nodes[i2];
      if ($isElementNode(node) && !node.isInline()) {
        if (!prevWasElement) {
          textContent += "\n";
        }
        if (node.isEmpty()) {
          prevWasElement = false;
        } else {
          prevWasElement = true;
        }
      } else {
        prevWasElement = false;
        if ($isTextNode(node)) {
          let text = node.getTextContent();
          if (node === firstNode) {
            if (node === lastNode) {
              if (anchor.type !== "element" || focus.type !== "element" || focus.offset === anchor.offset) {
                text = anchorOffset < focusOffset ? text.slice(anchorOffset, focusOffset) : text.slice(focusOffset, anchorOffset);
              }
            } else {
              text = isBefore ? text.slice(anchorOffset) : text.slice(focusOffset);
            }
          } else if (node === lastNode) {
            text = isBefore ? text.slice(0, focusOffset) : text.slice(0, anchorOffset);
          }
          textContent += text;
        } else if (($isDecoratorNode(node) || $isLineBreakNode(node)) && (node !== lastNode || !this.isCollapsed())) {
          textContent += node.getTextContent();
        }
      }
    }
    return textContent;
  }
  /**
   * Attempts to map a DOM selection range onto this Lexical Selection,
   * setting the anchor, focus, and type accordingly
   *
   * @param range a DOM Selection range conforming to the StaticRange interface.
   */
  applyDOMRange(range) {
    const editor = getActiveEditor();
    const currentEditorState = editor.getEditorState();
    const lastSelection = currentEditorState._selection;
    const resolvedSelectionPoints = $internalResolveSelectionPoints(range.startContainer, range.startOffset, range.endContainer, range.endOffset, editor, lastSelection);
    if (resolvedSelectionPoints === null) {
      return;
    }
    const [anchorPoint, focusPoint] = resolvedSelectionPoints;
    this.anchor.set(anchorPoint.key, anchorPoint.offset, anchorPoint.type, true);
    this.focus.set(focusPoint.key, focusPoint.offset, focusPoint.type, true);
    $normalizeSelection(this);
  }
  /**
   * Creates a new RangeSelection, copying over all the property values from this one.
   *
   * @returns a new RangeSelection with the same property values as this one.
   */
  clone() {
    const anchor = this.anchor;
    const focus = this.focus;
    const selection = new _RangeSelection($createPoint(anchor.key, anchor.offset, anchor.type), $createPoint(focus.key, focus.offset, focus.type), this.format, this.style);
    return selection;
  }
  /**
   * Toggles the provided format on all the TextNodes in the Selection.
   *
   * @param format a string TextFormatType to toggle on the TextNodes in the selection
   */
  toggleFormat(format) {
    this.format = toggleTextFormatType(this.format, format, null);
    this.dirty = true;
  }
  /**
   * Sets the value of the format property on the Selection
   *
   * @param format - the format to set at the value of the format property.
   */
  setFormat(format) {
    this.format = format;
    this.dirty = true;
  }
  /**
   * Sets the value of the style property on the Selection
   *
   * @param style - the style to set at the value of the style property.
   */
  setStyle(style) {
    this.style = style;
    this.dirty = true;
  }
  /**
   * Returns whether the provided TextFormatType is present on the Selection. This will be true if any node in the Selection
   * has the specified format.
   *
   * @param type the TextFormatType to check for.
   * @returns true if the provided format is currently toggled on on the Selection, false otherwise.
   */
  hasFormat(type) {
    const formatFlag = TEXT_TYPE_TO_FORMAT[type];
    return (this.format & formatFlag) !== 0;
  }
  /**
   * Attempts to insert the provided text into the EditorState at the current Selection.
   * converts tabs, newlines, and carriage returns into LexicalNodes.
   *
   * @param text the text to insert into the Selection
   */
  insertRawText(text) {
    const parts = text.split(/(\r?\n|\t)/);
    const nodes = [];
    const length = parts.length;
    for (let i2 = 0; i2 < length; i2++) {
      const part = parts[i2];
      if (part === "\n" || part === "\r\n") {
        nodes.push($createLineBreakNode());
      } else if (part === "	") {
        nodes.push($createTabNode());
      } else {
        nodes.push($createTextNode(part));
      }
    }
    this.insertNodes(nodes);
  }
  /**
   * Insert the provided text into the EditorState at the current Selection.
   *
   * @param text the text to insert into the Selection
   */
  insertText(text) {
    const anchor = this.anchor;
    const focus = this.focus;
    const format = this.format;
    const style = this.style;
    let firstPoint = anchor;
    let endPoint = focus;
    if (!this.isCollapsed() && focus.isBefore(anchor)) {
      firstPoint = focus;
      endPoint = anchor;
    }
    if (firstPoint.type === "element") {
      $transferStartingElementPointToTextPoint(firstPoint, endPoint, format, style);
    }
    if (endPoint.type === "element") {
      $setPointFromCaret(endPoint, $normalizeCaret($caretFromPoint(endPoint, "next")));
    }
    const startOffset = firstPoint.offset;
    let endOffset = endPoint.offset;
    const selectedNodes = this.getNodes();
    const selectedNodesLength = selectedNodes.length;
    let firstNode = selectedNodes[0];
    if (!$isTextNode(firstNode)) {
      {
        formatDevErrorMessage(`insertText: first node is not a text node`);
      }
    }
    const firstNodeText = firstNode.getTextContent();
    const firstNodeTextLength = firstNodeText.length;
    const firstNodeParent = firstNode.getParentOrThrow();
    const lastIndex = selectedNodesLength - 1;
    let lastNode = selectedNodes[lastIndex];
    if (selectedNodesLength === 1 && endPoint.type === "element") {
      endOffset = firstNodeTextLength;
      endPoint.set(firstPoint.key, endOffset, "text");
    }
    if (this.isCollapsed() && startOffset === firstNodeTextLength && ($isTokenOrSegmented(firstNode) || !firstNode.canInsertTextAfter() || !firstNodeParent.canInsertTextAfter() && firstNode.getNextSibling() === null)) {
      let nextSibling = firstNode.getNextSibling();
      if (!$isTextNode(nextSibling) || !nextSibling.canInsertTextBefore() || $isTokenOrSegmented(nextSibling)) {
        nextSibling = $createTextNode();
        nextSibling.setFormat(format);
        nextSibling.setStyle(style);
        if (!firstNodeParent.canInsertTextAfter()) {
          firstNodeParent.insertAfter(nextSibling);
        } else {
          firstNode.insertAfter(nextSibling);
        }
      }
      nextSibling.select(0, 0);
      firstNode = nextSibling;
      if (text !== "") {
        this.insertText(text);
        return;
      }
    } else if (this.isCollapsed() && startOffset === 0 && ($isTokenOrSegmented(firstNode) || !firstNode.canInsertTextBefore() || !firstNodeParent.canInsertTextBefore() && firstNode.getPreviousSibling() === null)) {
      let prevSibling = firstNode.getPreviousSibling();
      if (!$isTextNode(prevSibling) || $isTokenOrSegmented(prevSibling)) {
        prevSibling = $createTextNode();
        prevSibling.setFormat(format);
        if (!firstNodeParent.canInsertTextBefore()) {
          firstNodeParent.insertBefore(prevSibling);
        } else {
          firstNode.insertBefore(prevSibling);
        }
      }
      prevSibling.select();
      firstNode = prevSibling;
      if (text !== "") {
        this.insertText(text);
        return;
      }
    } else if (firstNode.isSegmented() && startOffset !== firstNodeTextLength) {
      const textNode = $createTextNode(firstNode.getTextContent());
      textNode.setFormat(format);
      firstNode.replace(textNode);
      firstNode = textNode;
    } else if (!this.isCollapsed() && text !== "") {
      const lastNodeParent = lastNode.getParent();
      if (!firstNodeParent.canInsertTextBefore() || !firstNodeParent.canInsertTextAfter() || $isElementNode(lastNodeParent) && (!lastNodeParent.canInsertTextBefore() || !lastNodeParent.canInsertTextAfter())) {
        this.insertText("");
        $normalizeSelectionPointsForBoundaries(this.anchor, this.focus);
        this.insertText(text);
        return;
      }
    }
    if (selectedNodesLength === 1) {
      if ($isTokenOrTab(firstNode)) {
        const textNode = $createTextNode(text);
        textNode.select();
        firstNode.replace(textNode);
        return;
      }
      const firstNodeFormat = firstNode.getFormat();
      const firstNodeStyle = firstNode.getStyle();
      if (startOffset === endOffset && (firstNodeFormat !== format || firstNodeStyle !== style)) {
        if (firstNode.getTextContent() === "") {
          firstNode.setFormat(format);
          firstNode.setStyle(style);
        } else {
          const textNode = $createTextNode(text);
          textNode.setFormat(format);
          textNode.setStyle(style);
          textNode.select();
          if (startOffset === 0) {
            firstNode.insertBefore(textNode, false);
          } else {
            const [targetNode] = firstNode.splitText(startOffset);
            targetNode.insertAfter(textNode, false);
          }
          if (textNode.isComposing() && this.anchor.type === "text") {
            this.anchor.offset -= text.length;
          }
          return;
        }
      } else if ($isTabNode(firstNode)) {
        const textNode = $createTextNode(text);
        textNode.setFormat(format);
        textNode.setStyle(style);
        textNode.select();
        firstNode.replace(textNode);
        return;
      }
      const delCount = endOffset - startOffset;
      firstNode = firstNode.spliceText(startOffset, delCount, text, true);
      if (firstNode.getTextContent() === "") {
        firstNode.remove();
      } else if (this.anchor.type === "text") {
        this.format = firstNodeFormat;
        this.style = firstNodeStyle;
        if (firstNode.isComposing()) {
          this.anchor.offset -= text.length;
        }
      }
    } else {
      const markedNodeKeysForKeep = /* @__PURE__ */ new Set([...firstNode.getParentKeys(), ...lastNode.getParentKeys()]);
      const firstElement = $isElementNode(firstNode) ? firstNode : firstNode.getParentOrThrow();
      let lastElement = $isElementNode(lastNode) ? lastNode : lastNode.getParentOrThrow();
      let lastElementChild = lastNode;
      if (!firstElement.is(lastElement) && lastElement.isInline()) {
        do {
          lastElementChild = lastElement;
          lastElement = lastElement.getParentOrThrow();
        } while (lastElement.isInline());
      }
      if (endPoint.type === "text" && (endOffset !== 0 || lastNode.getTextContent() === "") || endPoint.type === "element" && lastNode.getIndexWithinParent() < endOffset) {
        if ($isTextNode(lastNode) && !$isTokenOrTab(lastNode) && endOffset !== lastNode.getTextContentSize()) {
          if (lastNode.isSegmented()) {
            const textNode = $createTextNode(lastNode.getTextContent());
            lastNode.replace(textNode);
            lastNode = textNode;
          }
          if (!$isRootNode(endPoint.getNode()) && endPoint.type === "text") {
            lastNode = lastNode.spliceText(0, endOffset, "");
          }
          markedNodeKeysForKeep.add(lastNode.__key);
        } else {
          const lastNodeParent = lastNode.getParentOrThrow();
          if (!lastNodeParent.canBeEmpty() && lastNodeParent.getChildrenSize() === 1) {
            lastNodeParent.remove();
          } else {
            lastNode.remove();
          }
        }
      } else {
        markedNodeKeysForKeep.add(lastNode.__key);
      }
      const lastNodeChildren = lastElement.getChildren();
      const selectedNodesSet = new Set(selectedNodes);
      const firstAndLastElementsAreEqual = firstElement.is(lastElement);
      const insertionTarget = firstElement.isInline() && firstNode.getNextSibling() === null ? firstElement : firstNode;
      for (let i2 = lastNodeChildren.length - 1; i2 >= 0; i2--) {
        const lastNodeChild = lastNodeChildren[i2];
        if (lastNodeChild.is(firstNode) || $isElementNode(lastNodeChild) && lastNodeChild.isParentOf(firstNode)) {
          break;
        }
        if (lastNodeChild.isAttached()) {
          if (!selectedNodesSet.has(lastNodeChild) || lastNodeChild.is(lastElementChild)) {
            if (!firstAndLastElementsAreEqual) {
              insertionTarget.insertAfter(lastNodeChild, false);
            }
          } else {
            lastNodeChild.remove();
          }
        }
      }
      if (!firstAndLastElementsAreEqual) {
        let parent = lastElement;
        let lastRemovedParent = null;
        while (parent !== null) {
          const children = parent.getChildren();
          const childrenLength = children.length;
          if (childrenLength === 0 || children[childrenLength - 1].is(lastRemovedParent)) {
            markedNodeKeysForKeep.delete(parent.__key);
            lastRemovedParent = parent;
          }
          parent = parent.getParent();
        }
      }
      if (!$isTokenOrTab(firstNode)) {
        firstNode = firstNode.spliceText(startOffset, firstNodeTextLength - startOffset, text, true);
        if (firstNode.getTextContent() === "") {
          firstNode.remove();
        } else if (this.anchor.type === "text") {
          this.format = firstNode.getFormat();
          this.style = firstNode.getStyle();
          if (firstNode.isComposing()) {
            this.anchor.offset -= text.length;
          }
        }
      } else if (startOffset === firstNodeTextLength) {
        firstNode.select();
      } else {
        const textNode = $createTextNode(text);
        textNode.select();
        firstNode.replace(textNode);
      }
      for (let i2 = 1; i2 < selectedNodesLength; i2++) {
        const selectedNode = selectedNodes[i2];
        const key = selectedNode.__key;
        if (!markedNodeKeysForKeep.has(key)) {
          selectedNode.remove();
        }
      }
    }
  }
  /**
   * Removes the text in the Selection, adjusting the EditorState accordingly.
   */
  removeText() {
    const isCurrentSelection = $getSelection() === this;
    const newRange = $removeTextFromCaretRange($caretRangeFromSelection(this));
    $updateRangeSelectionFromCaretRange(this, newRange);
    if (isCurrentSelection && $getSelection() !== this) {
      $setSelection(this);
    }
  }
  // TO-DO: Migrate this method to the new utility function $forEachSelectedTextNode (share similar logic)
  /**
   * Applies the provided format to the TextNodes in the Selection, splitting or
   * merging nodes as necessary.
   *
   * @param formatType the format type to apply to the nodes in the Selection.
   * @param alignWithFormat a 32-bit integer representing formatting flags to align with.
   */
  formatText(formatType, alignWithFormat = null) {
    if (this.isCollapsed()) {
      this.toggleFormat(formatType);
      $setCompositionKey(null);
      return;
    }
    const selectedNodes = this.getNodes();
    const selectedTextNodes = [];
    for (const selectedNode of selectedNodes) {
      if ($isTextNode(selectedNode)) {
        selectedTextNodes.push(selectedNode);
      }
    }
    const applyFormatToElements = (alignWith) => {
      selectedNodes.forEach((node) => {
        if ($isElementNode(node)) {
          const newFormat = node.getFormatFlags(formatType, alignWith);
          node.setTextFormat(newFormat);
        }
      });
    };
    const selectedTextNodesLength = selectedTextNodes.length;
    if (selectedTextNodesLength === 0) {
      this.toggleFormat(formatType);
      $setCompositionKey(null);
      applyFormatToElements(alignWithFormat);
      return;
    }
    const anchor = this.anchor;
    const focus = this.focus;
    const isBackward = this.isBackward();
    const startPoint = isBackward ? focus : anchor;
    const endPoint = isBackward ? anchor : focus;
    let firstIndex = 0;
    let firstNode = selectedTextNodes[0];
    let startOffset = startPoint.type === "element" ? 0 : startPoint.offset;
    if (startPoint.type === "text" && startOffset === firstNode.getTextContentSize()) {
      firstIndex = 1;
      firstNode = selectedTextNodes[1];
      startOffset = 0;
    }
    if (firstNode == null) {
      return;
    }
    const firstNextFormat = firstNode.getFormatFlags(formatType, alignWithFormat);
    applyFormatToElements(firstNextFormat);
    const lastIndex = selectedTextNodesLength - 1;
    let lastNode = selectedTextNodes[lastIndex];
    const endOffset = endPoint.type === "text" ? endPoint.offset : lastNode.getTextContentSize();
    if (firstNode.is(lastNode)) {
      if (startOffset === endOffset) {
        return;
      }
      if ($isTokenOrSegmented(firstNode) || startOffset === 0 && endOffset === firstNode.getTextContentSize()) {
        firstNode.setFormat(firstNextFormat);
      } else {
        const splitNodes = firstNode.splitText(startOffset, endOffset);
        const replacement = startOffset === 0 ? splitNodes[0] : splitNodes[1];
        replacement.setFormat(firstNextFormat);
        if (startPoint.type === "text") {
          startPoint.set(replacement.__key, 0, "text");
        }
        if (endPoint.type === "text") {
          endPoint.set(replacement.__key, endOffset - startOffset, "text");
        }
      }
      this.format = firstNextFormat;
      return;
    }
    if (startOffset !== 0 && !$isTokenOrSegmented(firstNode)) {
      [, firstNode] = firstNode.splitText(startOffset);
      startOffset = 0;
    }
    firstNode.setFormat(firstNextFormat);
    const lastNextFormat = lastNode.getFormatFlags(formatType, firstNextFormat);
    if (endOffset > 0) {
      if (endOffset !== lastNode.getTextContentSize() && !$isTokenOrSegmented(lastNode)) {
        [lastNode] = lastNode.splitText(endOffset);
      }
      lastNode.setFormat(lastNextFormat);
    }
    for (let i2 = firstIndex + 1; i2 < lastIndex; i2++) {
      const textNode = selectedTextNodes[i2];
      const nextFormat = textNode.getFormatFlags(formatType, lastNextFormat);
      textNode.setFormat(nextFormat);
    }
    if (startPoint.type === "text") {
      startPoint.set(firstNode.__key, startOffset, "text");
    }
    if (endPoint.type === "text") {
      endPoint.set(lastNode.__key, endOffset, "text");
    }
    this.format = firstNextFormat | lastNextFormat;
  }
  /**
   * Attempts to "intelligently" insert an arbitrary list of Lexical nodes into the EditorState at the
   * current Selection according to a set of heuristics that determine how surrounding nodes
   * should be changed, replaced, or moved to accommodate the incoming ones.
   *
   * @param nodes - the nodes to insert
   */
  insertNodes(nodes) {
    if (nodes.length === 0) {
      return;
    }
    if (!this.isCollapsed()) {
      this.removeText();
    }
    if (this.anchor.key === "root") {
      this.insertParagraph();
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) {
        formatDevErrorMessage(`Expected RangeSelection after insertParagraph`);
      }
      return selection.insertNodes(nodes);
    }
    const firstPoint = this.isBackward() ? this.focus : this.anchor;
    const firstNode = firstPoint.getNode();
    const firstBlock = $findMatchingParent(firstNode, INTERNAL_$isBlock);
    const last = nodes[nodes.length - 1];
    if ($isElementNode(firstBlock) && "__language" in firstBlock) {
      if ("__language" in nodes[0]) {
        this.insertText(nodes[0].getTextContent());
      } else {
        const index = $removeTextAndSplitBlock(this);
        firstBlock.splice(index, 0, nodes);
        last.selectEnd();
      }
      return;
    }
    const notInline = (node) => ($isElementNode(node) || $isDecoratorNode(node)) && !node.isInline();
    if (!nodes.some(notInline)) {
      if (!$isElementNode(firstBlock)) {
        formatDevErrorMessage(`Expected node ${firstNode.constructor.name} of type ${firstNode.getType()} to have a block ElementNode ancestor`);
      }
      const index = $removeTextAndSplitBlock(this);
      firstBlock.splice(index, 0, nodes);
      last.selectEnd();
      return;
    }
    const blocksParent = $wrapInlineNodes(nodes);
    const nodeToSelect = blocksParent.getLastDescendant();
    const blocks = blocksParent.getChildren();
    const isMergeable = (node) => $isElementNode(node) && INTERNAL_$isBlock(node) && !node.isEmpty() && $isElementNode(firstBlock) && (!firstBlock.isEmpty() || firstBlock.canMergeWhenEmpty());
    const shouldInsert = !$isElementNode(firstBlock) || !firstBlock.isEmpty();
    const insertedParagraph = shouldInsert ? this.insertParagraph() : null;
    const lastToInsert = blocks[blocks.length - 1];
    let firstToInsert = blocks[0];
    if (isMergeable(firstToInsert)) {
      if (!$isElementNode(firstBlock)) {
        formatDevErrorMessage(`Expected node ${firstNode.constructor.name} of type ${firstNode.getType()} to have a block ElementNode ancestor`);
      }
      firstBlock.append(...firstToInsert.getChildren());
      firstToInsert = blocks[1];
    }
    if (firstToInsert) {
      if (!(firstBlock !== null)) {
        formatDevErrorMessage(`Expected node ${firstNode.constructor.name} of type ${firstNode.getType()} to have a block ancestor`);
      }
      insertRangeAfter(firstBlock, firstToInsert);
    }
    const lastInsertedBlock = $findMatchingParent(nodeToSelect, INTERNAL_$isBlock);
    if (insertedParagraph && $isElementNode(lastInsertedBlock) && (insertedParagraph.canMergeWhenEmpty() || INTERNAL_$isBlock(lastToInsert))) {
      lastInsertedBlock.append(...insertedParagraph.getChildren());
      insertedParagraph.remove();
    }
    if ($isElementNode(firstBlock) && firstBlock.isEmpty()) {
      firstBlock.remove();
    }
    nodeToSelect.selectEnd();
    const lastChild = $isElementNode(firstBlock) ? firstBlock.getLastChild() : null;
    if ($isLineBreakNode(lastChild) && lastInsertedBlock !== firstBlock) {
      lastChild.remove();
    }
  }
  /**
   * Inserts a new ParagraphNode into the EditorState at the current Selection
   *
   * @returns the newly inserted node.
   */
  insertParagraph() {
    if (this.anchor.key === "root") {
      const paragraph = $createParagraphNode();
      $getRoot().splice(this.anchor.offset, 0, [paragraph]);
      paragraph.select();
      return paragraph;
    }
    const index = $removeTextAndSplitBlock(this);
    const block = $findMatchingParent(this.anchor.getNode(), INTERNAL_$isBlock);
    if (!$isElementNode(block)) {
      formatDevErrorMessage(`Expected ancestor to be a block ElementNode`);
    }
    const firstToAppend = block.getChildAtIndex(index);
    const nodesToInsert = firstToAppend ? [firstToAppend, ...firstToAppend.getNextSiblings()] : [];
    const newBlock = block.insertNewAfter(this, false);
    if (newBlock) {
      newBlock.append(...nodesToInsert);
      newBlock.selectStart();
      return newBlock;
    }
    return null;
  }
  /**
   * Inserts a logical linebreak, which may be a new LineBreakNode or a new ParagraphNode, into the EditorState at the
   * current Selection.
   */
  insertLineBreak(selectStart) {
    const lineBreak = $createLineBreakNode();
    this.insertNodes([lineBreak]);
    if (selectStart) {
      const parent = lineBreak.getParentOrThrow();
      const index = lineBreak.getIndexWithinParent();
      parent.select(index, index);
    }
  }
  /**
   * Extracts the nodes in the Selection, splitting nodes where necessary
   * to get offset-level precision.
   *
   * @returns The nodes in the Selection
   */
  extract() {
    const selectedNodes = [...this.getNodes()];
    const selectedNodesLength = selectedNodes.length;
    let firstNode = selectedNodes[0];
    let lastNode = selectedNodes[selectedNodesLength - 1];
    const [anchorOffset, focusOffset] = $getCharacterOffsets(this);
    const isBackward = this.isBackward();
    const [startPoint, endPoint] = isBackward ? [this.focus, this.anchor] : [this.anchor, this.focus];
    const [startOffset, endOffset] = isBackward ? [focusOffset, anchorOffset] : [anchorOffset, focusOffset];
    if (selectedNodesLength === 0) {
      return [];
    } else if (selectedNodesLength === 1) {
      if ($isTextNode(firstNode) && !this.isCollapsed()) {
        const splitNodes = firstNode.splitText(startOffset, endOffset);
        const node = startOffset === 0 ? splitNodes[0] : splitNodes[1];
        if (node) {
          startPoint.set(node.getKey(), 0, "text");
          endPoint.set(node.getKey(), node.getTextContentSize(), "text");
          return [node];
        }
        return [];
      }
      return [firstNode];
    }
    if ($isTextNode(firstNode)) {
      if (startOffset === firstNode.getTextContentSize()) {
        selectedNodes.shift();
      } else if (startOffset !== 0) {
        [, firstNode] = firstNode.splitText(startOffset);
        selectedNodes[0] = firstNode;
        startPoint.set(firstNode.getKey(), 0, "text");
      }
    }
    if ($isTextNode(lastNode)) {
      const lastNodeText = lastNode.getTextContent();
      const lastNodeTextLength = lastNodeText.length;
      if (endOffset === 0) {
        selectedNodes.pop();
      } else if (endOffset !== lastNodeTextLength) {
        [lastNode] = lastNode.splitText(endOffset);
        selectedNodes[selectedNodes.length - 1] = lastNode;
        endPoint.set(lastNode.getKey(), lastNode.getTextContentSize(), "text");
      }
    }
    return selectedNodes;
  }
  /**
   * Modifies the Selection according to the parameters and a set of heuristics that account for
   * various node types. Can be used to safely move or extend selection by one logical "unit" without
   * dealing explicitly with all the possible node types.
   *
   * @param alter the type of modification to perform
   * @param isBackward whether or not selection is backwards
   * @param granularity the granularity at which to apply the modification
   */
  modify(alter, isBackward, granularity) {
    if ($modifySelectionAroundDecoratorsAndBlocks(this, alter, isBackward, granularity)) {
      return;
    }
    const collapse = alter === "move";
    const editor = getActiveEditor();
    const domSelection = getDOMSelection(getWindow(editor));
    if (!domSelection) {
      return;
    }
    const blockCursorElement = editor._blockCursorElement;
    const rootElement = editor._rootElement;
    const focusNode = this.focus.getNode();
    if (rootElement !== null && blockCursorElement !== null && $isElementNode(focusNode) && !focusNode.isInline() && !focusNode.canBeEmpty()) {
      removeDOMBlockCursorElement(blockCursorElement, editor, rootElement);
    }
    if (this.dirty) {
      let nextAnchorDOM = getElementByKeyOrThrow(editor, this.anchor.key);
      let nextFocusDOM = getElementByKeyOrThrow(editor, this.focus.key);
      if (this.anchor.type === "text") {
        nextAnchorDOM = getDOMTextNode(nextAnchorDOM);
      }
      if (this.focus.type === "text") {
        nextFocusDOM = getDOMTextNode(nextFocusDOM);
      }
      if (nextAnchorDOM && nextFocusDOM) {
        setDOMSelectionBaseAndExtent(domSelection, nextAnchorDOM, this.anchor.offset, nextFocusDOM, this.focus.offset);
      }
    }
    moveNativeSelection(domSelection, alter, isBackward ? "backward" : "forward", granularity);
    if (domSelection.rangeCount > 0) {
      const range = domSelection.getRangeAt(0);
      const anchorNode = this.anchor.getNode();
      const root = $isRootNode(anchorNode) ? anchorNode : $getNearestRootOrShadowRoot(anchorNode);
      this.applyDOMRange(range);
      this.dirty = true;
      if (!collapse) {
        const nodes = this.getNodes();
        const validNodes = [];
        let shrinkSelection = false;
        for (let i2 = 0; i2 < nodes.length; i2++) {
          const nextNode = nodes[i2];
          if ($hasAncestor(nextNode, root)) {
            validNodes.push(nextNode);
          } else {
            shrinkSelection = true;
          }
        }
        if (shrinkSelection && validNodes.length > 0) {
          if (isBackward) {
            const firstValidNode = validNodes[0];
            if ($isElementNode(firstValidNode)) {
              firstValidNode.selectStart();
            } else {
              firstValidNode.getParentOrThrow().selectStart();
            }
          } else {
            const lastValidNode = validNodes[validNodes.length - 1];
            if ($isElementNode(lastValidNode)) {
              lastValidNode.selectEnd();
            } else {
              lastValidNode.getParentOrThrow().selectEnd();
            }
          }
        }
        if (domSelection.anchorNode !== range.startContainer || domSelection.anchorOffset !== range.startOffset) {
          $swapPoints(this);
        }
      }
    }
    if (granularity === "lineboundary") {
      $modifySelectionAroundDecoratorsAndBlocks(this, alter, isBackward, granularity, "decorators");
    }
  }
  /**
   * Helper for handling forward character and word deletion that prevents element nodes
   * like a table, columns layout being destroyed
   *
   * @param anchor the anchor
   * @param anchorNode the anchor node in the selection
   * @param isBackward whether or not selection is backwards
   */
  forwardDeletion(anchor, anchorNode, isBackward) {
    if (!isBackward && // Delete forward handle case
    (anchor.type === "element" && $isElementNode(anchorNode) && anchor.offset === anchorNode.getChildrenSize() || anchor.type === "text" && anchor.offset === anchorNode.getTextContentSize())) {
      const parent = anchorNode.getParent();
      const nextSibling = anchorNode.getNextSibling() || (parent === null ? null : parent.getNextSibling());
      if ($isElementNode(nextSibling) && nextSibling.isShadowRoot()) {
        return true;
      }
    }
    return false;
  }
  /**
   * Performs one logical character deletion operation on the EditorState based on the current Selection.
   * Handles different node types.
   *
   * @param isBackward whether or not the selection is backwards.
   */
  deleteCharacter(isBackward) {
    const wasCollapsed = this.isCollapsed();
    if (this.isCollapsed()) {
      const anchor = this.anchor;
      let anchorNode = anchor.getNode();
      if (this.forwardDeletion(anchor, anchorNode, isBackward)) {
        return;
      }
      const direction = isBackward ? "previous" : "next";
      const initialCaret = $caretFromPoint(anchor, direction);
      const initialRange = $extendCaretToRange(initialCaret);
      if (initialRange.getTextSlices().every((slice) => slice === null || slice.distance === 0)) {
        let state = {
          type: "initial"
        };
        for (const caret of initialRange.iterNodeCarets("shadowRoot")) {
          if ($isChildCaret(caret)) {
            if (caret.origin.isInline()) ;
            else if (caret.origin.isShadowRoot()) {
              if (state.type === "merge-block") {
                break;
              }
              if ($isElementNode(initialRange.anchor.origin) && initialRange.anchor.origin.isEmpty()) {
                const normCaret = $normalizeCaret(caret);
                $updateRangeSelectionFromCaretRange(this, $getCaretRange(normCaret, normCaret));
                initialRange.anchor.origin.remove();
              }
              return;
            } else if (state.type === "merge-next-block" || state.type === "merge-block") {
              state = {
                block: state.block,
                caret,
                type: "merge-block"
              };
            }
          } else if (state.type === "merge-block") {
            break;
          } else if ($isSiblingCaret(caret)) {
            if ($isElementNode(caret.origin)) {
              if (!caret.origin.isInline()) {
                state = {
                  block: caret.origin,
                  type: "merge-next-block"
                };
              } else if (!caret.origin.isParentOf(initialRange.anchor.origin)) {
                break;
              }
              continue;
            } else if ($isDecoratorNode(caret.origin)) {
              if (caret.origin.isIsolated()) ;
              else if (state.type === "merge-next-block" && (caret.origin.isKeyboardSelectable() || !caret.origin.isInline()) && $isElementNode(initialRange.anchor.origin) && initialRange.anchor.origin.isEmpty()) {
                initialRange.anchor.origin.remove();
                const nodeSelection = $createNodeSelection();
                nodeSelection.add(caret.origin.getKey());
                $setSelection(nodeSelection);
              } else {
                caret.origin.remove();
              }
              return;
            }
            break;
          }
        }
        if (state.type === "merge-block") {
          const {
            caret,
            block
          } = state;
          $updateRangeSelectionFromCaretRange(this, $getCaretRange(!caret.origin.isEmpty() && block.isEmpty() ? $rewindSiblingCaret($getSiblingCaret(block, caret.direction)) : initialRange.anchor, caret));
          return this.removeText();
        }
      }
      const focus = this.focus;
      this.modify("extend", isBackward, "character");
      if (!this.isCollapsed()) {
        const focusNode = focus.type === "text" ? focus.getNode() : null;
        anchorNode = anchor.type === "text" ? anchor.getNode() : null;
        if (focusNode !== null && focusNode.isSegmented()) {
          const offset = focus.offset;
          const textContentSize = focusNode.getTextContentSize();
          if (focusNode.is(anchorNode) || isBackward && offset !== textContentSize || !isBackward && offset !== 0) {
            $removeSegment(focusNode, isBackward, offset);
            return;
          }
        } else if (anchorNode !== null && anchorNode.isSegmented()) {
          const offset = anchor.offset;
          const textContentSize = anchorNode.getTextContentSize();
          if (anchorNode.is(focusNode) || isBackward && offset !== 0 || !isBackward && offset !== textContentSize) {
            $removeSegment(anchorNode, isBackward, offset);
            return;
          }
        }
        $updateCaretSelectionForUnicodeCharacter(this, isBackward);
      } else if (isBackward && anchor.offset === 0) {
        if ($collapseAtStart(this, anchor.getNode())) {
          return;
        }
      }
    }
    this.removeText();
    if (isBackward && !wasCollapsed && this.isCollapsed() && this.anchor.type === "element" && this.anchor.offset === 0) {
      const anchorNode = this.anchor.getNode();
      if (anchorNode.isEmpty() && $isRootNode(anchorNode.getParent()) && anchorNode.getPreviousSibling() === null) {
        $collapseAtStart(this, anchorNode);
      }
    }
  }
  /**
   * Performs one logical line deletion operation on the EditorState based on the current Selection.
   * Handles different node types.
   *
   * @param isBackward whether or not the selection is backwards.
   */
  deleteLine(isBackward) {
    if (this.isCollapsed()) {
      this.modify("extend", isBackward, "lineboundary");
    }
    if (this.isCollapsed()) {
      this.deleteCharacter(isBackward);
    } else {
      this.removeText();
    }
  }
  /**
   * Performs one logical word deletion operation on the EditorState based on the current Selection.
   * Handles different node types.
   *
   * @param isBackward whether or not the selection is backwards.
   */
  deleteWord(isBackward) {
    if (this.isCollapsed()) {
      const anchor = this.anchor;
      const anchorNode = anchor.getNode();
      if (this.forwardDeletion(anchor, anchorNode, isBackward)) {
        return;
      }
      this.modify("extend", isBackward, "word");
    }
    this.removeText();
  }
  /**
   * Returns whether the Selection is "backwards", meaning the focus
   * logically precedes the anchor in the EditorState.
   * @returns true if the Selection is backwards, false otherwise.
   */
  isBackward() {
    return this.focus.isBefore(this.anchor);
  }
  getStartEndPoints() {
    return [this.anchor, this.focus];
  }
};
function $isNodeSelection(x) {
  return x instanceof NodeSelection;
}
function getCharacterOffset(point) {
  const offset = point.offset;
  if (point.type === "text") {
    return offset;
  }
  const parent = point.getNode();
  return offset === parent.getChildrenSize() ? parent.getTextContent().length : 0;
}
function $getCharacterOffsets(selection) {
  const anchorAndFocus = selection.getStartEndPoints();
  if (anchorAndFocus === null) {
    return [0, 0];
  }
  const [anchor, focus] = anchorAndFocus;
  if (anchor.type === "element" && focus.type === "element" && anchor.key === focus.key && anchor.offset === focus.offset) {
    return [0, 0];
  }
  return [getCharacterOffset(anchor), getCharacterOffset(focus)];
}
function $collapseAtStart(selection, startNode) {
  for (let node = startNode; node; node = node.getParent()) {
    if ($isElementNode(node)) {
      if (node.collapseAtStart(selection)) {
        return true;
      }
      if ($isRootOrShadowRoot(node)) {
        break;
      }
    }
    if (node.getPreviousSibling()) {
      break;
    }
  }
  return false;
}
function $swapPoints(selection) {
  const focus = selection.focus;
  const anchor = selection.anchor;
  const anchorKey = anchor.key;
  const anchorOffset = anchor.offset;
  const anchorType = anchor.type;
  anchor.set(focus.key, focus.offset, focus.type, true);
  focus.set(anchorKey, anchorOffset, anchorType, true);
}
function moveNativeSelection(domSelection, alter, direction, granularity) {
  domSelection.modify(alter, direction, granularity);
}
function $updateCaretSelectionForUnicodeCharacter(selection, isBackward) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = anchor.getNode();
  const focusNode = focus.getNode();
  if (anchorNode === focusNode && anchor.type === "text" && focus.type === "text") {
    const anchorOffset = anchor.offset;
    const focusOffset = focus.offset;
    const isBefore = anchorOffset < focusOffset;
    const startOffset = isBefore ? anchorOffset : focusOffset;
    const endOffset = isBefore ? focusOffset : anchorOffset;
    const characterOffset = endOffset - 1;
    if (startOffset !== characterOffset) {
      const text = anchorNode.getTextContent().slice(startOffset, endOffset);
      if (shouldDeleteExactlyOneCodeUnit(text)) {
        if (isBackward) {
          focus.set(focus.key, characterOffset, focus.type);
        } else {
          anchor.set(anchor.key, characterOffset, anchor.type);
        }
      }
    }
  }
}
function shouldDeleteExactlyOneCodeUnit(text) {
  {
    if (!(text.length > 1)) {
      formatDevErrorMessage(`shouldDeleteExactlyOneCodeUnit: expecting to be called only with sequences of two or more code units`);
    }
  }
  return !(doesContainSurrogatePair(text) || doesContainEmoji(text));
}
var doesContainEmoji = (() => {
  try {
    const re = new RegExp("\\p{Emoji}", "u");
    const test = re.test.bind(re);
    if (
      // Emoji in the BMP (heart) with variation selector
      test("\u2764\uFE0F") && // Emoji in the BMP (#) with variation selector
      test("#\uFE0F\u20E3") && // Emoji outside the BMP (thumbs up) that is encoded with a surrogate pair
      test("\u{1F44D}")
    ) {
      return test;
    }
  } catch (_e) {
  }
  return () => false;
})();
function $removeSegment(node, isBackward, offset) {
  const textNode = node;
  const textContent = textNode.getTextContent();
  const split = textContent.split(/(?=\s)/g);
  const splitLength = split.length;
  let segmentOffset = 0;
  let restoreOffset = 0;
  for (let i2 = 0; i2 < splitLength; i2++) {
    const text = split[i2];
    const isLast = i2 === splitLength - 1;
    restoreOffset = segmentOffset;
    segmentOffset += text.length;
    if (isBackward && segmentOffset === offset || segmentOffset > offset || isLast) {
      split.splice(i2, 1);
      if (isLast) {
        restoreOffset = void 0;
      }
      break;
    }
  }
  const nextTextContent = split.join("").trim();
  if (nextTextContent === "") {
    textNode.remove();
  } else {
    textNode.setTextContent(nextTextContent);
    textNode.select(restoreOffset, restoreOffset);
  }
}
function shouldResolveAncestor(resolvedElement, resolvedOffset, lastPoint) {
  const parent = resolvedElement.getParent();
  return lastPoint === null || parent === null || !parent.canBeEmpty() || parent !== lastPoint.getNode();
}
function $internalResolveSelectionPoint(dom, offset, lastPoint, editor) {
  let resolvedOffset = offset;
  let resolvedNode;
  if (isHTMLElement(dom)) {
    let moveSelectionToEnd = false;
    const childNodes = dom.childNodes;
    const childNodesLength = childNodes.length;
    const blockCursorElement = editor._blockCursorElement;
    if (resolvedOffset === childNodesLength) {
      moveSelectionToEnd = true;
      resolvedOffset = childNodesLength - 1;
    }
    let childDOM = childNodes[resolvedOffset];
    let hasBlockCursor = false;
    if (childDOM === blockCursorElement) {
      childDOM = childNodes[resolvedOffset + 1];
      hasBlockCursor = true;
    } else if (blockCursorElement !== null) {
      const blockCursorElementParent = blockCursorElement.parentNode;
      if (dom === blockCursorElementParent) {
        const blockCursorOffset = Array.prototype.indexOf.call(blockCursorElementParent.children, blockCursorElement);
        if (offset > blockCursorOffset) {
          resolvedOffset--;
        }
      }
    }
    resolvedNode = $getNodeFromDOM(childDOM);
    if ($isTextNode(resolvedNode)) {
      resolvedOffset = $getTextNodeOffset(resolvedNode, moveSelectionToEnd ? "next" : "previous");
    } else {
      let resolvedElement = $getNodeFromDOM(dom);
      if (resolvedElement === null) {
        return null;
      }
      if ($isElementNode(resolvedElement)) {
        const elementDOM = editor.getElementByKey(resolvedElement.getKey());
        if (!(elementDOM !== null)) {
          formatDevErrorMessage(`$internalResolveSelectionPoint: node in DOM but not keyToDOMMap`);
        }
        const slot = resolvedElement.getDOMSlot(elementDOM);
        [resolvedElement, resolvedOffset] = slot.resolveChildIndex(resolvedElement, elementDOM, dom, offset);
        if (!$isElementNode(resolvedElement)) {
          formatDevErrorMessage(`$internalResolveSelectionPoint: resolvedElement is not an ElementNode`);
        }
        if (moveSelectionToEnd && resolvedOffset >= resolvedElement.getChildrenSize()) {
          resolvedOffset = Math.max(0, resolvedElement.getChildrenSize() - 1);
        }
        let child = resolvedElement.getChildAtIndex(resolvedOffset);
        if ($isElementNode(child) && shouldResolveAncestor(child, resolvedOffset, lastPoint)) {
          const descendant = moveSelectionToEnd ? child.getLastDescendant() : child.getFirstDescendant();
          if (descendant === null) {
            resolvedElement = child;
          } else {
            child = descendant;
            resolvedElement = $isElementNode(child) ? child : child.getParentOrThrow();
          }
          resolvedOffset = 0;
        }
        if ($isTextNode(child)) {
          resolvedNode = child;
          resolvedElement = null;
          resolvedOffset = $getTextNodeOffset(child, moveSelectionToEnd ? "next" : "previous");
        } else if (child !== resolvedElement && moveSelectionToEnd && !hasBlockCursor) {
          if (!$isElementNode(resolvedElement)) {
            formatDevErrorMessage(`invariant`);
          }
          resolvedOffset = Math.min(resolvedElement.getChildrenSize(), resolvedOffset + 1);
        }
      } else {
        const index = resolvedElement.getIndexWithinParent();
        if (offset === 0 && $isDecoratorNode(resolvedElement) && $getNodeFromDOM(dom) === resolvedElement) {
          resolvedOffset = index;
        } else {
          resolvedOffset = index + 1;
        }
        resolvedElement = resolvedElement.getParentOrThrow();
      }
      if ($isElementNode(resolvedElement)) {
        return $createPoint(resolvedElement.__key, resolvedOffset, "element");
      }
    }
  } else {
    resolvedNode = $getNodeFromDOM(dom);
  }
  if (!$isTextNode(resolvedNode)) {
    return null;
  }
  return $createPoint(resolvedNode.__key, $getTextNodeOffset(resolvedNode, resolvedOffset, "clamp"), "text");
}
function resolveSelectionPointOnBoundary(point, isBackward, isCollapsed) {
  const offset = point.offset;
  const node = point.getNode();
  if (offset === 0) {
    const prevSibling = node.getPreviousSibling();
    const parent = node.getParent();
    if (!isBackward) {
      if ($isElementNode(prevSibling) && !isCollapsed && prevSibling.isInline()) {
        point.set(prevSibling.__key, prevSibling.getChildrenSize(), "element");
      } else if ($isTextNode(prevSibling)) {
        point.set(prevSibling.__key, prevSibling.getTextContent().length, "text");
      }
    } else if ((isCollapsed || !isBackward) && prevSibling === null && $isElementNode(parent) && parent.isInline()) {
      const parentSibling = parent.getPreviousSibling();
      if ($isTextNode(parentSibling)) {
        point.set(parentSibling.__key, parentSibling.getTextContent().length, "text");
      }
    }
  } else if (offset === node.getTextContent().length) {
    const nextSibling = node.getNextSibling();
    const parent = node.getParent();
    if (isBackward && $isElementNode(nextSibling) && nextSibling.isInline()) {
      point.set(nextSibling.__key, 0, "element");
    } else if ((isCollapsed || isBackward) && nextSibling === null && $isElementNode(parent) && parent.isInline() && !parent.canInsertTextAfter()) {
      const parentSibling = parent.getNextSibling();
      if ($isTextNode(parentSibling)) {
        point.set(parentSibling.__key, 0, "text");
      }
    }
  }
}
function $normalizeSelectionPointsForBoundaries(anchor, focus, lastSelection) {
  if (anchor.type === "text" && focus.type === "text") {
    const isBackward = anchor.isBefore(focus);
    const isCollapsed = anchor.is(focus);
    resolveSelectionPointOnBoundary(anchor, isBackward, isCollapsed);
    resolveSelectionPointOnBoundary(focus, !isBackward, isCollapsed);
    if (isCollapsed) {
      focus.set(anchor.key, anchor.offset, anchor.type);
    }
  }
}
function $internalResolveSelectionPoints(anchorDOM, anchorOffset, focusDOM, focusOffset, editor, lastSelection) {
  if (anchorDOM === null || focusDOM === null || !isSelectionWithinEditor(editor, anchorDOM, focusDOM)) {
    return null;
  }
  const resolvedAnchorPoint = $internalResolveSelectionPoint(anchorDOM, anchorOffset, $isRangeSelection(lastSelection) ? lastSelection.anchor : null, editor);
  if (resolvedAnchorPoint === null) {
    return null;
  }
  const resolvedFocusPoint = $internalResolveSelectionPoint(focusDOM, focusOffset, $isRangeSelection(lastSelection) ? lastSelection.focus : null, editor);
  if (resolvedFocusPoint === null) {
    return null;
  }
  {
    $validatePoint("anchor", resolvedAnchorPoint);
    $validatePoint("focus", resolvedFocusPoint);
  }
  if (resolvedAnchorPoint.type === "element" && resolvedFocusPoint.type === "element") {
    const anchorNode = $getNodeFromDOM(anchorDOM);
    const focusNode = $getNodeFromDOM(focusDOM);
    if ($isDecoratorNode(anchorNode) && $isDecoratorNode(focusNode)) {
      return null;
    }
  }
  $normalizeSelectionPointsForBoundaries(resolvedAnchorPoint, resolvedFocusPoint);
  return [resolvedAnchorPoint, resolvedFocusPoint];
}
function $isBlockElementNode(node) {
  return $isElementNode(node) && !node.isInline();
}
function $internalMakeRangeSelection(anchorKey, anchorOffset, focusKey, focusOffset, anchorType, focusType) {
  const editorState = getActiveEditorState();
  const selection = new RangeSelection($createPoint(anchorKey, anchorOffset, anchorType), $createPoint(focusKey, focusOffset, focusType), 0, "");
  selection.dirty = true;
  editorState._selection = selection;
  return selection;
}
function $createRangeSelection() {
  const anchor = $createPoint("root", 0, "element");
  const focus = $createPoint("root", 0, "element");
  return new RangeSelection(anchor, focus, 0, "");
}
function $createNodeSelection() {
  return new NodeSelection(/* @__PURE__ */ new Set());
}
function $internalCreateSelection(editor, event) {
  const currentEditorState = editor.getEditorState();
  const lastSelection = currentEditorState._selection;
  const domSelection = getDOMSelection(getWindow(editor));
  if ($isRangeSelection(lastSelection) || lastSelection == null) {
    return $internalCreateRangeSelection(lastSelection, domSelection, editor, event);
  }
  return lastSelection.clone();
}
function $createRangeSelectionFromDom(domSelection, editor) {
  return $internalCreateRangeSelection(null, domSelection, editor, null);
}
function $internalCreateRangeSelection(lastSelection, domSelection, editor, event) {
  const windowObj = editor._window;
  if (windowObj === null) {
    return null;
  }
  const windowEvent = event || windowObj.event;
  const eventType = windowEvent ? windowEvent.type : void 0;
  const isSelectionChange = eventType === "selectionchange";
  const useDOMSelection = !getIsProcessingMutations() && (isSelectionChange || eventType === "beforeinput" || eventType === "compositionstart" || eventType === "compositionend" || eventType === "click" && windowEvent && windowEvent.detail === 3 || eventType === "drop" || eventType === void 0);
  let anchorDOM, focusDOM, anchorOffset, focusOffset;
  if (!$isRangeSelection(lastSelection) || useDOMSelection) {
    if (domSelection === null) {
      return null;
    }
    anchorDOM = domSelection.anchorNode;
    focusDOM = domSelection.focusNode;
    anchorOffset = domSelection.anchorOffset;
    focusOffset = domSelection.focusOffset;
    if ((isSelectionChange || eventType === void 0) && $isRangeSelection(lastSelection) && !isSelectionWithinEditor(editor, anchorDOM, focusDOM)) {
      return lastSelection.clone();
    }
  } else {
    return lastSelection.clone();
  }
  const resolvedSelectionPoints = $internalResolveSelectionPoints(anchorDOM, anchorOffset, focusDOM, focusOffset, editor, lastSelection);
  if (resolvedSelectionPoints === null) {
    return null;
  }
  const [resolvedAnchorPoint, resolvedFocusPoint] = resolvedSelectionPoints;
  let format = 0;
  let style = "";
  if ($isRangeSelection(lastSelection)) {
    const lastAnchor = lastSelection.anchor;
    if (resolvedAnchorPoint.key === lastAnchor.key) {
      format = lastSelection.format;
      style = lastSelection.style;
    } else {
      const anchorNode = resolvedAnchorPoint.getNode();
      if ($isTextNode(anchorNode)) {
        format = anchorNode.getFormat();
        style = anchorNode.getStyle();
      } else if ($isElementNode(anchorNode)) {
        format = anchorNode.getTextFormat();
        style = anchorNode.getTextStyle();
      }
    }
  }
  return new RangeSelection(resolvedAnchorPoint, resolvedFocusPoint, format, style);
}
function $validatePoint(name, point) {
  const node = $getNodeByKey(point.key);
  if (!(node !== void 0)) {
    formatDevErrorMessage(`$validatePoint: ${name} key ${point.key} not found in current editorState`);
  }
  if (point.type === "text") {
    if (!$isTextNode(node)) {
      formatDevErrorMessage(`$validatePoint: ${name} key ${point.key} is not a TextNode`);
    }
    const size = node.getTextContentSize();
    if (!(point.offset <= size)) {
      formatDevErrorMessage(`$validatePoint: ${name} point.offset > node.getTextContentSize() (${String(point.offset)} > ${String(size)})`);
    }
  } else {
    if (!$isElementNode(node)) {
      formatDevErrorMessage(`$validatePoint: ${name} key ${point.key} is not an ElementNode`);
    }
    const size = node.getChildrenSize();
    if (!(point.offset <= size)) {
      formatDevErrorMessage(`$validatePoint: ${name} point.offset > node.getChildrenSize() (${String(point.offset)} > ${String(size)})`);
    }
  }
}
function $getSelection() {
  const editorState = getActiveEditorState();
  return editorState._selection;
}
function $getPreviousSelection() {
  const editor = getActiveEditor();
  return editor._editorState._selection;
}
function $updateElementSelectionOnCreateDeleteNode(selection, parentNode, nodeOffset, times = 1) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = anchor.getNode();
  const focusNode = focus.getNode();
  if (!parentNode.is(anchorNode) && !parentNode.is(focusNode)) {
    return;
  }
  const parentKey = parentNode.__key;
  if (selection.isCollapsed()) {
    const selectionOffset = anchor.offset;
    if (nodeOffset <= selectionOffset && times > 0 || nodeOffset < selectionOffset && times < 0) {
      const newSelectionOffset = Math.max(0, selectionOffset + times);
      anchor.set(parentKey, newSelectionOffset, "element");
      focus.set(parentKey, newSelectionOffset, "element");
      $updateSelectionResolveTextNodes(selection);
    }
  } else {
    const isBackward = selection.isBackward();
    const firstPoint = isBackward ? focus : anchor;
    const firstPointNode = firstPoint.getNode();
    const lastPoint = isBackward ? anchor : focus;
    const lastPointNode = lastPoint.getNode();
    if (parentNode.is(firstPointNode)) {
      const firstPointOffset = firstPoint.offset;
      if (nodeOffset <= firstPointOffset && times > 0 || nodeOffset < firstPointOffset && times < 0) {
        firstPoint.set(parentKey, Math.max(0, firstPointOffset + times), "element");
      }
    }
    if (parentNode.is(lastPointNode)) {
      const lastPointOffset = lastPoint.offset;
      if (nodeOffset <= lastPointOffset && times > 0 || nodeOffset < lastPointOffset && times < 0) {
        lastPoint.set(parentKey, Math.max(0, lastPointOffset + times), "element");
      }
    }
  }
  $updateSelectionResolveTextNodes(selection);
}
function $updateSelectionResolveTextNodes(selection) {
  const anchor = selection.anchor;
  const anchorOffset = anchor.offset;
  const focus = selection.focus;
  const focusOffset = focus.offset;
  const anchorNode = anchor.getNode();
  const focusNode = focus.getNode();
  if (selection.isCollapsed()) {
    if (!$isElementNode(anchorNode)) {
      return;
    }
    const childSize = anchorNode.getChildrenSize();
    const anchorOffsetAtEnd = anchorOffset >= childSize;
    const child = anchorOffsetAtEnd ? anchorNode.getChildAtIndex(childSize - 1) : anchorNode.getChildAtIndex(anchorOffset);
    if ($isTextNode(child)) {
      let newOffset = 0;
      if (anchorOffsetAtEnd) {
        newOffset = child.getTextContentSize();
      }
      anchor.set(child.__key, newOffset, "text");
      focus.set(child.__key, newOffset, "text");
    }
    return;
  }
  if ($isElementNode(anchorNode)) {
    const childSize = anchorNode.getChildrenSize();
    const anchorOffsetAtEnd = anchorOffset >= childSize;
    const child = anchorOffsetAtEnd ? anchorNode.getChildAtIndex(childSize - 1) : anchorNode.getChildAtIndex(anchorOffset);
    if ($isTextNode(child)) {
      let newOffset = 0;
      if (anchorOffsetAtEnd) {
        newOffset = child.getTextContentSize();
      }
      anchor.set(child.__key, newOffset, "text");
    }
  }
  if ($isElementNode(focusNode)) {
    const childSize = focusNode.getChildrenSize();
    const focusOffsetAtEnd = focusOffset >= childSize;
    const child = focusOffsetAtEnd ? focusNode.getChildAtIndex(childSize - 1) : focusNode.getChildAtIndex(focusOffset);
    if ($isTextNode(child)) {
      let newOffset = 0;
      if (focusOffsetAtEnd) {
        newOffset = child.getTextContentSize();
      }
      focus.set(child.__key, newOffset, "text");
    }
  }
}
function applySelectionTransforms(nextEditorState, editor) {
  const prevEditorState = editor.getEditorState();
  const prevSelection = prevEditorState._selection;
  const nextSelection = nextEditorState._selection;
  if ($isRangeSelection(nextSelection)) {
    const anchor = nextSelection.anchor;
    const focus = nextSelection.focus;
    let anchorNode;
    if (anchor.type === "text") {
      anchorNode = anchor.getNode();
      anchorNode.selectionTransform(prevSelection, nextSelection);
    }
    if (focus.type === "text") {
      const focusNode = focus.getNode();
      if (anchorNode !== focusNode) {
        focusNode.selectionTransform(prevSelection, nextSelection);
      }
    }
  }
}
function moveSelectionPointToSibling(point, node, parent, prevSibling, nextSibling) {
  let siblingKey = null;
  let offset = 0;
  let type = null;
  if (prevSibling !== null) {
    siblingKey = prevSibling.__key;
    if ($isTextNode(prevSibling)) {
      offset = prevSibling.getTextContentSize();
      type = "text";
    } else if ($isElementNode(prevSibling)) {
      offset = prevSibling.getChildrenSize();
      type = "element";
    }
  } else {
    if (nextSibling !== null) {
      siblingKey = nextSibling.__key;
      if ($isTextNode(nextSibling)) {
        type = "text";
      } else if ($isElementNode(nextSibling)) {
        type = "element";
      }
    }
  }
  if (siblingKey !== null && type !== null) {
    point.set(siblingKey, offset, type);
  } else {
    offset = node.getIndexWithinParent();
    if (offset === -1) {
      offset = parent.getChildrenSize();
    }
    point.set(parent.__key, offset, "element");
  }
}
function adjustPointOffsetForMergedSibling(point, isBefore, key, target, textLength) {
  if (point.type === "text") {
    point.set(key, point.offset + (isBefore ? 0 : textLength), "text");
  } else if (point.offset > target.getIndexWithinParent()) {
    point.set(point.key, point.offset - 1, "element");
  }
}
function setDOMSelectionBaseAndExtent(domSelection, nextAnchorDOM, nextAnchorOffset, nextFocusDOM, nextFocusOffset) {
  try {
    domSelection.setBaseAndExtent(nextAnchorDOM, nextAnchorOffset, nextFocusDOM, nextFocusOffset);
  } catch (error) {
    {
      console.warn(error);
    }
  }
}
function getElementAndOffsetForPoint(editor, node, offset) {
  const element = getElementByKeyOrThrow(editor, node.getKey());
  if ($isElementNode(node)) {
    const slot = node.getDOMSlot(element);
    return [slot.element, offset + slot.getFirstChildOffset()];
  }
  return [element, offset];
}
function updateDOMSelection(prevSelection, nextSelection, editor, domSelection, tags, rootElement, nodeCount) {
  const anchorDOMNode = domSelection.anchorNode;
  const focusDOMNode = domSelection.focusNode;
  const anchorOffset = domSelection.anchorOffset;
  const focusOffset = domSelection.focusOffset;
  const activeElement = document.activeElement;
  if (tags.has(COLLABORATION_TAG) && activeElement !== rootElement || activeElement !== null && isSelectionCapturedInDecoratorInput(activeElement)) {
    return;
  }
  if (!$isRangeSelection(nextSelection)) {
    if (prevSelection !== null && isSelectionWithinEditor(editor, anchorDOMNode, focusDOMNode)) {
      domSelection.removeAllRanges();
    }
    return;
  }
  const anchor = nextSelection.anchor;
  const focus = nextSelection.focus;
  const anchorNode = anchor.getNode();
  const focusNode = focus.getNode();
  const [anchorDOM, nextAnchorOffset] = getElementAndOffsetForPoint(editor, anchorNode, anchor.offset);
  const [focusDOM, nextFocusOffset] = getElementAndOffsetForPoint(editor, focusNode, focus.offset);
  const nextFormat = nextSelection.format;
  const nextStyle = nextSelection.style;
  const isCollapsed = nextSelection.isCollapsed();
  let nextAnchorNode = anchorDOM;
  let nextFocusNode = focusDOM;
  let anchorFormatOrStyleChanged = false;
  if (anchor.type === "text") {
    nextAnchorNode = getDOMTextNode(anchorDOM);
    anchorFormatOrStyleChanged = anchorNode.getFormat() !== nextFormat || anchorNode.getStyle() !== nextStyle;
  } else if ($isRangeSelection(prevSelection) && prevSelection.anchor.type === "text") {
    anchorFormatOrStyleChanged = true;
  }
  if (focus.type === "text") {
    nextFocusNode = getDOMTextNode(focusDOM);
  }
  if (nextAnchorNode === null || nextFocusNode === null) {
    return;
  }
  if (isCollapsed && (prevSelection === null || anchorFormatOrStyleChanged || $isRangeSelection(prevSelection) && (prevSelection.format !== nextFormat || prevSelection.style !== nextStyle))) {
    markCollapsedSelectionFormat(nextFormat, nextStyle, nextAnchorOffset, anchor.key, performance.now());
  }
  if (anchorOffset === nextAnchorOffset && focusOffset === nextFocusOffset && anchorDOMNode === nextAnchorNode && focusDOMNode === nextFocusNode && // Badly interpreted range selection when collapsed - #1482
  !(domSelection.type === "Range" && isCollapsed)) {
    if (activeElement === null || !rootElement.contains(activeElement)) {
      if (!tags.has(SKIP_SELECTION_FOCUS_TAG)) {
        rootElement.focus({
          preventScroll: true
        });
      }
    }
    if (anchor.type !== "element") {
      return;
    }
  }
  setDOMSelectionBaseAndExtent(domSelection, nextAnchorNode, nextAnchorOffset, nextFocusNode, nextFocusOffset);
  if (IS_FIREFOX && nextSelection.isCollapsed() && rootElement !== null && !tags.has(SKIP_SELECTION_FOCUS_TAG) && (document.activeElement === null || !rootElement.contains(document.activeElement))) {
    rootElement.focus({
      preventScroll: true
    });
  }
  if (!tags.has(SKIP_SCROLL_INTO_VIEW_TAG) && nextSelection.isCollapsed() && rootElement !== null && rootElement === document.activeElement) {
    const selectionTarget = $isRangeSelection(nextSelection) && nextSelection.anchor.type === "element" ? nextAnchorNode.childNodes[nextAnchorOffset] || null : domSelection.rangeCount > 0 ? domSelection.getRangeAt(0) : null;
    if (selectionTarget !== null) {
      let selectionRect;
      if (selectionTarget instanceof Text) {
        const range = document.createRange();
        range.selectNode(selectionTarget);
        selectionRect = range.getBoundingClientRect();
      } else {
        selectionRect = selectionTarget.getBoundingClientRect();
      }
      scrollIntoViewIfNeeded(editor, selectionRect, rootElement);
    }
  }
  markSelectionChangeFromDOMUpdate();
}
function $insertNodes(nodes) {
  let selection = $getSelection() || $getPreviousSelection();
  if (selection === null) {
    selection = $getRoot().selectEnd();
  }
  selection.insertNodes(nodes);
}
function $getTextContent() {
  const selection = $getSelection();
  if (selection === null) {
    return "";
  }
  return selection.getTextContent();
}
function $removeTextAndSplitBlock(selection) {
  let selection_ = selection;
  if (!selection.isCollapsed()) {
    selection_.removeText();
  }
  const newSelection = $getSelection();
  if ($isRangeSelection(newSelection)) {
    selection_ = newSelection;
  }
  if (!$isRangeSelection(selection_)) {
    formatDevErrorMessage(`Unexpected dirty selection to be null`);
  }
  const anchor = selection_.anchor;
  let node = anchor.getNode();
  let offset = anchor.offset;
  while (!INTERNAL_$isBlock(node)) {
    const prevNode = node;
    [node, offset] = $splitNodeAtPoint(node, offset);
    if (prevNode.is(node)) {
      break;
    }
  }
  return offset;
}
function $splitNodeAtPoint(node, offset) {
  const parent = node.getParent();
  if (!parent) {
    const paragraph = $createParagraphNode();
    $getRoot().append(paragraph);
    paragraph.select();
    return [$getRoot(), 0];
  }
  if ($isTextNode(node)) {
    const split = node.splitText(offset);
    if (split.length === 0) {
      return [parent, node.getIndexWithinParent()];
    }
    const x = offset === 0 ? 0 : 1;
    const index = split[0].getIndexWithinParent() + x;
    return [parent, index];
  }
  if (!$isElementNode(node) || offset === 0) {
    return [parent, node.getIndexWithinParent()];
  }
  const firstToAppend = node.getChildAtIndex(offset);
  if (firstToAppend) {
    const insertPoint = new RangeSelection($createPoint(node.__key, offset, "element"), $createPoint(node.__key, offset, "element"), 0, "");
    const newElement = node.insertNewAfter(insertPoint);
    if (newElement) {
      newElement.append(firstToAppend, ...firstToAppend.getNextSiblings());
    }
  }
  return [parent, node.getIndexWithinParent() + 1];
}
function $wrapInlineNodes(nodes) {
  const virtualRoot = $createParagraphNode();
  let currentBlock = null;
  for (let i2 = 0; i2 < nodes.length; i2++) {
    const node = nodes[i2];
    const isLineBreakNode = $isLineBreakNode(node);
    if (isLineBreakNode || $isDecoratorNode(node) && node.isInline() || $isElementNode(node) && node.isInline() || $isTextNode(node) || node.isParentRequired()) {
      if (currentBlock === null) {
        currentBlock = node.createParentElementNode();
        virtualRoot.append(currentBlock);
        if (isLineBreakNode) {
          continue;
        }
      }
      if (currentBlock !== null) {
        currentBlock.append(node);
      }
    } else {
      virtualRoot.append(node);
      currentBlock = null;
    }
  }
  return virtualRoot;
}
function $getNodesFromCaretRangeCompat(range) {
  const nodes = [];
  const [beforeSlice, afterSlice] = range.getTextSlices();
  if (beforeSlice) {
    nodes.push(beforeSlice.caret.origin);
  }
  const seenAncestors = /* @__PURE__ */ new Set();
  const seenElements = /* @__PURE__ */ new Set();
  for (const caret of range) {
    if ($isChildCaret(caret)) {
      const {
        origin
      } = caret;
      if (nodes.length === 0) {
        seenAncestors.add(origin);
      } else {
        seenElements.add(origin);
        nodes.push(origin);
      }
    } else {
      const {
        origin
      } = caret;
      if (!$isElementNode(origin) || !seenElements.has(origin)) {
        nodes.push(origin);
      }
    }
  }
  if (afterSlice) {
    nodes.push(afterSlice.caret.origin);
  }
  if ($isSiblingCaret(range.focus) && $isElementNode(range.focus.origin) && range.focus.getNodeAtCaret() === null) {
    for (let reverseCaret = $getChildCaret(range.focus.origin, "previous"); $isChildCaret(reverseCaret) && seenAncestors.has(reverseCaret.origin) && !reverseCaret.origin.isEmpty() && reverseCaret.origin.is(nodes[nodes.length - 1]); reverseCaret = $getAdjacentChildCaret(reverseCaret)) {
      seenAncestors.delete(reverseCaret.origin);
      nodes.pop();
    }
  }
  while (nodes.length > 1) {
    const lastIncludedNode = nodes[nodes.length - 1];
    if ($isElementNode(lastIncludedNode)) {
      if (seenElements.has(lastIncludedNode) || lastIncludedNode.isEmpty() || seenAncestors.has(lastIncludedNode)) ;
      else {
        nodes.pop();
        continue;
      }
    }
    break;
  }
  if (nodes.length === 0 && range.isCollapsed()) {
    const normCaret = $normalizeCaret(range.anchor);
    const flippedNormCaret = $normalizeCaret(range.anchor.getFlipped());
    const $getCandidate = (caret) => $isTextPointCaret(caret) ? caret.origin : caret.getNodeAtCaret();
    const node = $getCandidate(normCaret) || $getCandidate(flippedNormCaret) || (range.anchor.getNodeAtCaret() ? normCaret.origin : flippedNormCaret.origin);
    nodes.push(node);
  }
  return nodes;
}
function $modifySelectionAroundDecoratorsAndBlocks(selection, alter, isBackward, granularity, mode = "decorators-and-blocks") {
  if (alter === "move" && granularity === "character" && !selection.isCollapsed()) {
    const [src, dst] = isBackward === selection.isBackward() ? [selection.focus, selection.anchor] : [selection.anchor, selection.focus];
    dst.set(src.key, src.offset, src.type);
    return true;
  }
  const initialFocus = $caretFromPoint(selection.focus, isBackward ? "previous" : "next");
  const isLineBoundary = granularity === "lineboundary";
  const collapse = alter === "move";
  let focus = initialFocus;
  let checkForBlock = mode === "decorators-and-blocks";
  if (!$isExtendableTextPointCaret(focus)) {
    for (const siblingCaret of focus) {
      checkForBlock = false;
      const {
        origin
      } = siblingCaret;
      if ($isDecoratorNode(origin) && !origin.isIsolated()) {
        focus = siblingCaret;
        if (isLineBoundary && origin.isInline()) {
          continue;
        }
      }
      break;
    }
    if (checkForBlock) {
      for (const nextCaret of $extendCaretToRange(initialFocus).iterNodeCarets(alter === "extend" ? "shadowRoot" : "root")) {
        if ($isChildCaret(nextCaret)) {
          if (!nextCaret.origin.isInline()) {
            focus = nextCaret;
          }
        } else if ($isElementNode(nextCaret.origin)) {
          continue;
        } else if ($isDecoratorNode(nextCaret.origin) && !nextCaret.origin.isInline()) {
          focus = nextCaret;
        }
        break;
      }
    }
  }
  if (focus === initialFocus) {
    return false;
  }
  if (collapse && !isLineBoundary && $isDecoratorNode(focus.origin) && focus.origin.isKeyboardSelectable()) {
    const nodeSelection = $createNodeSelection();
    nodeSelection.add(focus.origin.getKey());
    $setSelection(nodeSelection);
    return true;
  }
  focus = $normalizeCaret(focus);
  if (collapse) {
    $setPointFromCaret(selection.anchor, focus);
  }
  $setPointFromCaret(selection.focus, focus);
  return checkForBlock || !isLineBoundary;
}
var activeEditorState = null;
var activeEditor = null;
var isReadOnlyMode = false;
var isAttemptingToRecoverFromReconcilerError = false;
var infiniteTransformCount = 0;
var observerOptions = {
  characterData: true,
  childList: true,
  subtree: true
};
function isCurrentlyReadOnlyMode() {
  return isReadOnlyMode || activeEditorState !== null && activeEditorState._readOnly;
}
function errorOnReadOnly() {
  if (isReadOnlyMode) {
    {
      formatDevErrorMessage(`Cannot use method in read-only mode.`);
    }
  }
}
function errorOnInfiniteTransforms() {
  if (infiniteTransformCount > 99) {
    {
      formatDevErrorMessage(`One or more transforms are endlessly triggering additional transforms. May have encountered infinite recursion caused by transforms that have their preconditions too lose and/or conflict with each other.`);
    }
  }
}
function getActiveEditorState() {
  if (activeEditorState === null) {
    {
      formatDevErrorMessage(`Unable to find an active editor state. State helpers or node methods can only be used synchronously during the callback of editor.update(), editor.read(), or editorState.read().${collectBuildInformation()}`);
    }
  }
  return activeEditorState;
}
function getActiveEditor() {
  if (activeEditor === null) {
    {
      formatDevErrorMessage(`Unable to find an active editor. This method can only be used synchronously during the callback of editor.update() or editor.read().${collectBuildInformation()}`);
    }
  }
  return activeEditor;
}
function collectBuildInformation() {
  let compatibleEditors = 0;
  const incompatibleEditors = /* @__PURE__ */ new Set();
  const thisVersion = LexicalEditor.version;
  if (typeof window !== "undefined") {
    for (const node of document.querySelectorAll("[contenteditable]")) {
      const editor = getEditorPropertyFromDOMNode(node);
      if (isLexicalEditor(editor)) {
        compatibleEditors++;
      } else if (editor) {
        let version = String(editor.constructor.version || "<0.17.1");
        if (version === thisVersion) {
          version += " (separately built, likely a bundler configuration issue)";
        }
        incompatibleEditors.add(version);
      }
    }
  }
  let output = ` Detected on the page: ${compatibleEditors} compatible editor(s) with version ${thisVersion}`;
  if (incompatibleEditors.size) {
    output += ` and incompatible editors with versions ${Array.from(incompatibleEditors).join(", ")}`;
  }
  return output;
}
function internalGetActiveEditor() {
  return activeEditor;
}
function internalGetActiveEditorState() {
  return activeEditorState;
}
function $applyTransforms(editor, node, transformsCache) {
  const type = node.__type;
  const registeredNode = getRegisteredNodeOrThrow(editor, type);
  let transformsArr = transformsCache.get(type);
  if (transformsArr === void 0) {
    transformsArr = Array.from(registeredNode.transforms);
    transformsCache.set(type, transformsArr);
  }
  const transformsArrLength = transformsArr.length;
  for (let i2 = 0; i2 < transformsArrLength; i2++) {
    transformsArr[i2](node);
    if (!node.isAttached()) {
      break;
    }
  }
}
function $isNodeValidForTransform(node, compositionKey) {
  return node !== void 0 && // We don't want to transform nodes being composed
  node.__key !== compositionKey && node.isAttached();
}
function $normalizeAllDirtyTextNodes(editorState, editor) {
  const dirtyLeaves = editor._dirtyLeaves;
  const nodeMap = editorState._nodeMap;
  for (const nodeKey of dirtyLeaves) {
    const node = nodeMap.get(nodeKey);
    if ($isTextNode(node) && node.isAttached() && node.isSimpleText() && !node.isUnmergeable()) {
      $normalizeTextNode(node);
    }
  }
}
function addTags(editor, tags) {
  if (!tags) {
    return;
  }
  const updateTags = editor._updateTags;
  let tags_ = tags;
  if (!Array.isArray(tags)) {
    tags_ = [tags];
  }
  for (const tag of tags_) {
    updateTags.add(tag);
  }
}
function $applyAllTransforms(editorState, editor) {
  const dirtyLeaves = editor._dirtyLeaves;
  const dirtyElements = editor._dirtyElements;
  const nodeMap = editorState._nodeMap;
  const compositionKey = $getCompositionKey();
  const transformsCache = /* @__PURE__ */ new Map();
  let untransformedDirtyLeaves = dirtyLeaves;
  let untransformedDirtyLeavesLength = untransformedDirtyLeaves.size;
  let untransformedDirtyElements = dirtyElements;
  let untransformedDirtyElementsLength = untransformedDirtyElements.size;
  while (untransformedDirtyLeavesLength > 0 || untransformedDirtyElementsLength > 0) {
    if (untransformedDirtyLeavesLength > 0) {
      editor._dirtyLeaves = /* @__PURE__ */ new Set();
      for (const nodeKey of untransformedDirtyLeaves) {
        const node = nodeMap.get(nodeKey);
        if ($isTextNode(node) && node.isAttached() && node.isSimpleText() && !node.isUnmergeable()) {
          $normalizeTextNode(node);
        }
        if (node !== void 0 && $isNodeValidForTransform(node, compositionKey)) {
          $applyTransforms(editor, node, transformsCache);
        }
        dirtyLeaves.add(nodeKey);
      }
      untransformedDirtyLeaves = editor._dirtyLeaves;
      untransformedDirtyLeavesLength = untransformedDirtyLeaves.size;
      if (untransformedDirtyLeavesLength > 0) {
        infiniteTransformCount++;
        continue;
      }
    }
    editor._dirtyLeaves = /* @__PURE__ */ new Set();
    editor._dirtyElements = /* @__PURE__ */ new Map();
    const rootDirty = untransformedDirtyElements.delete("root");
    if (rootDirty) {
      untransformedDirtyElements.set("root", true);
    }
    for (const currentUntransformedDirtyElement of untransformedDirtyElements) {
      const nodeKey = currentUntransformedDirtyElement[0];
      const intentionallyMarkedAsDirty = currentUntransformedDirtyElement[1];
      dirtyElements.set(nodeKey, intentionallyMarkedAsDirty);
      if (!intentionallyMarkedAsDirty) {
        continue;
      }
      const node = nodeMap.get(nodeKey);
      if (node !== void 0 && $isNodeValidForTransform(node, compositionKey)) {
        $applyTransforms(editor, node, transformsCache);
      }
    }
    untransformedDirtyLeaves = editor._dirtyLeaves;
    untransformedDirtyLeavesLength = untransformedDirtyLeaves.size;
    untransformedDirtyElements = editor._dirtyElements;
    untransformedDirtyElementsLength = untransformedDirtyElements.size;
    infiniteTransformCount++;
  }
  editor._dirtyLeaves = dirtyLeaves;
  editor._dirtyElements = dirtyElements;
}
function $parseSerializedNode(serializedNode) {
  const internalSerializedNode = serializedNode;
  return $parseSerializedNodeImpl(internalSerializedNode, getActiveEditor()._nodes);
}
function $parseSerializedNodeImpl(serializedNode, registeredNodes) {
  const type = serializedNode.type;
  const registeredNode = registeredNodes.get(type);
  if (registeredNode === void 0) {
    {
      formatDevErrorMessage(`parseEditorState: type "${type}" + not found`);
    }
  }
  const nodeClass = registeredNode.klass;
  if (serializedNode.type !== nodeClass.getType()) {
    {
      formatDevErrorMessage(`LexicalNode: Node ${nodeClass.name} does not implement .importJSON().`);
    }
  }
  const node = nodeClass.importJSON(serializedNode);
  const children = serializedNode.children;
  if ($isElementNode(node) && Array.isArray(children)) {
    for (let i2 = 0; i2 < children.length; i2++) {
      const serializedJSONChildNode = children[i2];
      const childNode = $parseSerializedNodeImpl(serializedJSONChildNode, registeredNodes);
      node.append(childNode);
    }
  }
  return node;
}
function parseEditorState(serializedEditorState, editor, updateFn) {
  const editorState = createEmptyEditorState();
  const previousActiveEditorState = activeEditorState;
  const previousReadOnlyMode = isReadOnlyMode;
  const previousActiveEditor = activeEditor;
  const previousDirtyElements = editor._dirtyElements;
  const previousDirtyLeaves = editor._dirtyLeaves;
  const previousCloneNotNeeded = editor._cloneNotNeeded;
  const previousDirtyType = editor._dirtyType;
  editor._dirtyElements = /* @__PURE__ */ new Map();
  editor._dirtyLeaves = /* @__PURE__ */ new Set();
  editor._cloneNotNeeded = /* @__PURE__ */ new Set();
  editor._dirtyType = 0;
  activeEditorState = editorState;
  isReadOnlyMode = false;
  activeEditor = editor;
  setPendingNodeToClone(null);
  try {
    const registeredNodes = editor._nodes;
    const serializedNode = serializedEditorState.root;
    $parseSerializedNodeImpl(serializedNode, registeredNodes);
    if (updateFn) {
      updateFn();
    }
    editorState._readOnly = true;
    {
      handleDEVOnlyPendingUpdateGuarantees(editorState);
    }
  } catch (error) {
    if (error instanceof Error) {
      editor._onError(error);
    }
  } finally {
    editor._dirtyElements = previousDirtyElements;
    editor._dirtyLeaves = previousDirtyLeaves;
    editor._cloneNotNeeded = previousCloneNotNeeded;
    editor._dirtyType = previousDirtyType;
    activeEditorState = previousActiveEditorState;
    isReadOnlyMode = previousReadOnlyMode;
    activeEditor = previousActiveEditor;
  }
  return editorState;
}
function readEditorState(editor, editorState, callbackFn) {
  const previousActiveEditorState = activeEditorState;
  const previousReadOnlyMode = isReadOnlyMode;
  const previousActiveEditor = activeEditor;
  activeEditorState = editorState;
  isReadOnlyMode = true;
  activeEditor = editor;
  try {
    return callbackFn();
  } finally {
    activeEditorState = previousActiveEditorState;
    isReadOnlyMode = previousReadOnlyMode;
    activeEditor = previousActiveEditor;
  }
}
function handleDEVOnlyPendingUpdateGuarantees(pendingEditorState) {
  const nodeMap = pendingEditorState._nodeMap;
  nodeMap.set = () => {
    throw new Error("Cannot call set() on a frozen Lexical node map");
  };
  nodeMap.clear = () => {
    throw new Error("Cannot call clear() on a frozen Lexical node map");
  };
  nodeMap.delete = () => {
    throw new Error("Cannot call delete() on a frozen Lexical node map");
  };
}
function $commitPendingUpdates(editor, recoveryEditorState) {
  const pendingEditorState = editor._pendingEditorState;
  const rootElement = editor._rootElement;
  const shouldSkipDOM = editor._headless || rootElement === null;
  if (pendingEditorState === null) {
    return;
  }
  const currentEditorState = editor._editorState;
  const currentSelection = currentEditorState._selection;
  const pendingSelection = pendingEditorState._selection;
  const needsUpdate = editor._dirtyType !== NO_DIRTY_NODES;
  const previousActiveEditorState = activeEditorState;
  const previousReadOnlyMode = isReadOnlyMode;
  const previousActiveEditor = activeEditor;
  const previouslyUpdating = editor._updating;
  const observer = editor._observer;
  let mutatedNodes2 = null;
  editor._pendingEditorState = null;
  editor._editorState = pendingEditorState;
  if (!shouldSkipDOM && needsUpdate && observer !== null) {
    activeEditor = editor;
    activeEditorState = pendingEditorState;
    isReadOnlyMode = false;
    editor._updating = true;
    try {
      const dirtyType = editor._dirtyType;
      const dirtyElements2 = editor._dirtyElements;
      const dirtyLeaves2 = editor._dirtyLeaves;
      observer.disconnect();
      mutatedNodes2 = $reconcileRoot(currentEditorState, pendingEditorState, editor, dirtyType, dirtyElements2, dirtyLeaves2);
    } catch (error) {
      if (error instanceof Error) {
        editor._onError(error);
      }
      if (!isAttemptingToRecoverFromReconcilerError) {
        resetEditor(editor, null, rootElement, pendingEditorState);
        initMutationObserver(editor);
        editor._dirtyType = FULL_RECONCILE;
        isAttemptingToRecoverFromReconcilerError = true;
        $commitPendingUpdates(editor, currentEditorState);
        isAttemptingToRecoverFromReconcilerError = false;
      } else {
        throw error;
      }
      return;
    } finally {
      observer.observe(rootElement, observerOptions);
      editor._updating = previouslyUpdating;
      activeEditorState = previousActiveEditorState;
      isReadOnlyMode = previousReadOnlyMode;
      activeEditor = previousActiveEditor;
    }
  }
  if (!pendingEditorState._readOnly) {
    pendingEditorState._readOnly = true;
    {
      handleDEVOnlyPendingUpdateGuarantees(pendingEditorState);
      if ($isRangeSelection(pendingSelection)) {
        Object.freeze(pendingSelection.anchor);
        Object.freeze(pendingSelection.focus);
      }
      Object.freeze(pendingSelection);
    }
  }
  const dirtyLeaves = editor._dirtyLeaves;
  const dirtyElements = editor._dirtyElements;
  const normalizedNodes = editor._normalizedNodes;
  const tags = editor._updateTags;
  const deferred = editor._deferred;
  if (needsUpdate) {
    editor._dirtyType = NO_DIRTY_NODES;
    editor._cloneNotNeeded.clear();
    editor._dirtyLeaves = /* @__PURE__ */ new Set();
    editor._dirtyElements = /* @__PURE__ */ new Map();
    editor._normalizedNodes = /* @__PURE__ */ new Set();
    editor._updateTags = /* @__PURE__ */ new Set();
  }
  $garbageCollectDetachedDecorators(editor, pendingEditorState);
  const domSelection = shouldSkipDOM ? null : getDOMSelection(getWindow(editor));
  if (editor._editable && // domSelection will be null in headless
  domSelection !== null && (needsUpdate || pendingSelection === null || pendingSelection.dirty || !pendingSelection.is(currentSelection)) && rootElement !== null && !tags.has(SKIP_DOM_SELECTION_TAG)) {
    activeEditor = editor;
    activeEditorState = pendingEditorState;
    try {
      if (observer !== null) {
        observer.disconnect();
      }
      if (needsUpdate || pendingSelection === null || pendingSelection.dirty) {
        const blockCursorElement = editor._blockCursorElement;
        if (blockCursorElement !== null) {
          removeDOMBlockCursorElement(blockCursorElement, editor, rootElement);
        }
        updateDOMSelection(currentSelection, pendingSelection, editor, domSelection, tags, rootElement);
      }
      updateDOMBlockCursorElement(editor, rootElement, pendingSelection);
    } finally {
      if (observer !== null) {
        observer.observe(rootElement, observerOptions);
      }
      activeEditor = previousActiveEditor;
      activeEditorState = previousActiveEditorState;
    }
  }
  if (mutatedNodes2 !== null) {
    triggerMutationListeners(editor, mutatedNodes2, tags, dirtyLeaves, currentEditorState);
  }
  if (!$isRangeSelection(pendingSelection) && pendingSelection !== null && (currentSelection === null || !currentSelection.is(pendingSelection))) {
    editor.dispatchCommand(SELECTION_CHANGE_COMMAND, void 0);
  }
  const pendingDecorators = editor._pendingDecorators;
  if (pendingDecorators !== null) {
    editor._decorators = pendingDecorators;
    editor._pendingDecorators = null;
    triggerListeners("decorator", editor, true, pendingDecorators);
  }
  triggerTextContentListeners(editor, recoveryEditorState || currentEditorState, pendingEditorState);
  triggerListeners("update", editor, true, {
    dirtyElements,
    dirtyLeaves,
    editorState: pendingEditorState,
    mutatedNodes: mutatedNodes2,
    normalizedNodes,
    prevEditorState: recoveryEditorState || currentEditorState,
    tags
  });
  triggerDeferredUpdateCallbacks(editor, deferred);
  $triggerEnqueuedUpdates(editor);
}
function triggerTextContentListeners(editor, currentEditorState, pendingEditorState) {
  const currentTextContent = getEditorStateTextContent(currentEditorState);
  const latestTextContent = getEditorStateTextContent(pendingEditorState);
  if (currentTextContent !== latestTextContent) {
    triggerListeners("textcontent", editor, true, latestTextContent);
  }
}
function triggerMutationListeners(editor, mutatedNodes2, updateTags, dirtyLeaves, prevEditorState) {
  const listeners = Array.from(editor._listeners.mutation);
  const listenersLength = listeners.length;
  for (let i2 = 0; i2 < listenersLength; i2++) {
    const [listener, klassSet] = listeners[i2];
    for (const klass of klassSet) {
      const mutatedNodesByType = mutatedNodes2.get(klass);
      if (mutatedNodesByType !== void 0) {
        listener(mutatedNodesByType, {
          dirtyLeaves,
          prevEditorState,
          updateTags
        });
      }
    }
  }
}
function triggerListeners(type, editor, isCurrentlyEnqueuingUpdates, ...payload) {
  const previouslyUpdating = editor._updating;
  editor._updating = isCurrentlyEnqueuingUpdates;
  try {
    const listeners = Array.from(editor._listeners[type]);
    for (let i2 = 0; i2 < listeners.length; i2++) {
      listeners[i2].apply(null, payload);
    }
  } finally {
    editor._updating = previouslyUpdating;
  }
}
function triggerCommandListeners(editor, type, payload) {
  const editors = getEditorsToPropagate(editor);
  for (let i2 = 4; i2 >= 0; i2--) {
    for (let e2 = 0; e2 < editors.length; e2++) {
      const currentEditor = editors[e2];
      const commandListeners = currentEditor._commands;
      const listenerInPriorityOrder = commandListeners.get(type);
      if (listenerInPriorityOrder !== void 0) {
        const listenersSet = listenerInPriorityOrder[i2];
        if (listenersSet !== void 0) {
          const listeners = Array.from(listenersSet);
          const listenersLength = listeners.length;
          let returnVal = false;
          updateEditorSync(currentEditor, () => {
            for (let j = 0; j < listenersLength; j++) {
              if (listeners[j](payload, editor)) {
                returnVal = true;
                return;
              }
            }
          });
          if (returnVal) {
            return returnVal;
          }
        }
      }
    }
  }
  return false;
}
function $triggerEnqueuedUpdates(editor) {
  const queuedUpdates = editor._updates;
  if (queuedUpdates.length !== 0) {
    const queuedUpdate = queuedUpdates.shift();
    if (queuedUpdate) {
      const [updateFn, options] = queuedUpdate;
      $beginUpdate(editor, updateFn, options);
    }
  }
}
function triggerDeferredUpdateCallbacks(editor, deferred) {
  editor._deferred = [];
  if (deferred.length !== 0) {
    const previouslyUpdating = editor._updating;
    editor._updating = true;
    try {
      for (let i2 = 0; i2 < deferred.length; i2++) {
        deferred[i2]();
      }
    } finally {
      editor._updating = previouslyUpdating;
    }
  }
}
function $processNestedUpdates(editor, initialSkipTransforms) {
  const queuedUpdates = editor._updates;
  let skipTransforms = initialSkipTransforms || false;
  while (queuedUpdates.length !== 0) {
    const queuedUpdate = queuedUpdates.shift();
    if (queuedUpdate) {
      const [nextUpdateFn, options] = queuedUpdate;
      const pendingEditorState = editor._pendingEditorState;
      let onUpdate;
      if (options !== void 0) {
        onUpdate = options.onUpdate;
        if (options.skipTransforms) {
          skipTransforms = true;
        }
        if (options.discrete) {
          if (!(pendingEditorState !== null)) {
            formatDevErrorMessage(`Unexpected empty pending editor state on discrete nested update`);
          }
          pendingEditorState._flushSync = true;
        }
        if (onUpdate) {
          editor._deferred.push(onUpdate);
        }
        addTags(editor, options.tag);
      }
      if (pendingEditorState == null) {
        $beginUpdate(editor, nextUpdateFn, options);
      } else {
        nextUpdateFn();
      }
    }
  }
  return skipTransforms;
}
function $beginUpdate(editor, updateFn, options) {
  const updateTags = editor._updateTags;
  let onUpdate;
  let skipTransforms = false;
  let discrete = false;
  if (options !== void 0) {
    onUpdate = options.onUpdate;
    addTags(editor, options.tag);
    skipTransforms = options.skipTransforms || false;
    discrete = options.discrete || false;
  }
  if (onUpdate) {
    editor._deferred.push(onUpdate);
  }
  const currentEditorState = editor._editorState;
  let pendingEditorState = editor._pendingEditorState;
  let editorStateWasCloned = false;
  if (pendingEditorState === null || pendingEditorState._readOnly) {
    pendingEditorState = editor._pendingEditorState = cloneEditorState(pendingEditorState || currentEditorState);
    editorStateWasCloned = true;
  }
  pendingEditorState._flushSync = discrete;
  const previousActiveEditorState = activeEditorState;
  const previousReadOnlyMode = isReadOnlyMode;
  const previousActiveEditor = activeEditor;
  const previouslyUpdating = editor._updating;
  activeEditorState = pendingEditorState;
  isReadOnlyMode = false;
  editor._updating = true;
  activeEditor = editor;
  const headless = editor._headless || editor.getRootElement() === null;
  setPendingNodeToClone(null);
  try {
    if (editorStateWasCloned) {
      if (headless) {
        if (currentEditorState._selection !== null) {
          pendingEditorState._selection = currentEditorState._selection.clone();
        }
      } else {
        pendingEditorState._selection = $internalCreateSelection(editor, options && options.event || null);
      }
    }
    const startingCompositionKey = editor._compositionKey;
    updateFn();
    skipTransforms = $processNestedUpdates(editor, skipTransforms);
    applySelectionTransforms(pendingEditorState, editor);
    if (editor._dirtyType !== NO_DIRTY_NODES) {
      if (skipTransforms) {
        $normalizeAllDirtyTextNodes(pendingEditorState, editor);
      } else {
        $applyAllTransforms(pendingEditorState, editor);
      }
      $processNestedUpdates(editor);
      $garbageCollectDetachedNodes(currentEditorState, pendingEditorState, editor._dirtyLeaves, editor._dirtyElements);
    }
    const endingCompositionKey = editor._compositionKey;
    if (startingCompositionKey !== endingCompositionKey) {
      pendingEditorState._flushSync = true;
    }
    const pendingSelection = pendingEditorState._selection;
    if ($isRangeSelection(pendingSelection)) {
      const pendingNodeMap = pendingEditorState._nodeMap;
      const anchorKey = pendingSelection.anchor.key;
      const focusKey = pendingSelection.focus.key;
      if (pendingNodeMap.get(anchorKey) === void 0 || pendingNodeMap.get(focusKey) === void 0) {
        {
          formatDevErrorMessage(`updateEditor: selection has been lost because the previously selected nodes have been removed and selection wasn't moved to another node. Ensure selection changes after removing/replacing a selected node.`);
        }
      }
    } else if ($isNodeSelection(pendingSelection)) {
      if (pendingSelection._nodes.size === 0) {
        pendingEditorState._selection = null;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      editor._onError(error);
    }
    editor._pendingEditorState = currentEditorState;
    editor._dirtyType = FULL_RECONCILE;
    editor._cloneNotNeeded.clear();
    editor._dirtyLeaves = /* @__PURE__ */ new Set();
    editor._dirtyElements.clear();
    $commitPendingUpdates(editor);
    return;
  } finally {
    activeEditorState = previousActiveEditorState;
    isReadOnlyMode = previousReadOnlyMode;
    activeEditor = previousActiveEditor;
    editor._updating = previouslyUpdating;
    infiniteTransformCount = 0;
  }
  const shouldUpdate = editor._dirtyType !== NO_DIRTY_NODES || editor._deferred.length > 0 || editorStateHasDirtySelection(pendingEditorState, editor);
  if (shouldUpdate) {
    if (pendingEditorState._flushSync) {
      pendingEditorState._flushSync = false;
      $commitPendingUpdates(editor);
    } else if (editorStateWasCloned) {
      scheduleMicroTask(() => {
        $commitPendingUpdates(editor);
      });
    }
  } else {
    pendingEditorState._flushSync = false;
    if (editorStateWasCloned) {
      updateTags.clear();
      editor._deferred = [];
      editor._pendingEditorState = null;
    }
  }
}
function updateEditorSync(editor, updateFn, options) {
  if (activeEditor === editor && options === void 0) {
    updateFn();
  } else {
    $beginUpdate(editor, updateFn, options);
  }
}
function updateEditor(editor, updateFn, options) {
  if (editor._updating) {
    editor._updates.push([updateFn, options]);
  } else {
    $beginUpdate(editor, updateFn, options);
  }
}
var ElementDOMSlot = class _ElementDOMSlot {
  element;
  before;
  after;
  constructor(element, before, after) {
    this.element = element;
    this.before = before || null;
    this.after = after || null;
  }
  /**
   * Return a new ElementDOMSlot where all managed children will be inserted before this node
   */
  withBefore(before) {
    return new _ElementDOMSlot(this.element, before, this.after);
  }
  /**
   * Return a new ElementDOMSlot where all managed children will be inserted after this node
   */
  withAfter(after) {
    return new _ElementDOMSlot(this.element, this.before, after);
  }
  /**
   * Return a new ElementDOMSlot with an updated root element
   */
  withElement(element) {
    if (this.element === element) {
      return this;
    }
    return new _ElementDOMSlot(element, this.before, this.after);
  }
  /**
   * Insert the given child before this.before and any reconciler managed line break node,
   * or append it if this.before is not defined
   */
  insertChild(dom) {
    const before = this.before || this.getManagedLineBreak();
    if (!(before === null || before.parentElement === this.element)) {
      formatDevErrorMessage(`ElementDOMSlot.insertChild: before is not in element`);
    }
    this.element.insertBefore(dom, before);
    return this;
  }
  /**
   * Remove the managed child from this container, will throw if it was not already there
   */
  removeChild(dom) {
    if (!(dom.parentElement === this.element)) {
      formatDevErrorMessage(`ElementDOMSlot.removeChild: dom is not in element`);
    }
    this.element.removeChild(dom);
    return this;
  }
  /**
   * Replace managed child prevDom with dom. Will throw if prevDom is not a child
   *
   * @param dom The new node to replace prevDom
   * @param prevDom the node that will be replaced
   */
  replaceChild(dom, prevDom) {
    if (!(prevDom.parentElement === this.element)) {
      formatDevErrorMessage(`ElementDOMSlot.replaceChild: prevDom is not in element`);
    }
    this.element.replaceChild(dom, prevDom);
    return this;
  }
  /**
   * Returns the first managed child of this node,
   * which will either be this.after.nextSibling or this.element.firstChild,
   * and will never be this.before if it is defined.
   */
  getFirstChild() {
    const firstChild = this.after ? this.after.nextSibling : this.element.firstChild;
    return firstChild === this.before || firstChild === this.getManagedLineBreak() ? null : firstChild;
  }
  /**
   * @internal
   */
  getManagedLineBreak() {
    const element = this.element;
    return element.__lexicalLineBreak || null;
  }
  /** @internal */
  setManagedLineBreak(lineBreakType) {
    if (lineBreakType === null) {
      this.removeManagedLineBreak();
    } else {
      const webkitHack = lineBreakType === "decorator" && (IS_APPLE_WEBKIT || IS_IOS || IS_SAFARI);
      this.insertManagedLineBreak(webkitHack);
    }
  }
  /** @internal */
  removeManagedLineBreak() {
    const br = this.getManagedLineBreak();
    if (br) {
      const element = this.element;
      const sibling = br.nodeName === "IMG" ? br.nextSibling : null;
      if (sibling) {
        element.removeChild(sibling);
      }
      element.removeChild(br);
      element.__lexicalLineBreak = void 0;
    }
  }
  /** @internal */
  insertManagedLineBreak(webkitHack) {
    const prevBreak = this.getManagedLineBreak();
    if (prevBreak) {
      if (webkitHack === (prevBreak.nodeName === "IMG")) {
        return;
      }
      this.removeManagedLineBreak();
    }
    const element = this.element;
    const before = this.before;
    const br = document.createElement("br");
    element.insertBefore(br, before);
    if (webkitHack) {
      const img = document.createElement("img");
      img.setAttribute("data-lexical-linebreak", "true");
      img.style.cssText = "display: inline !important; border: 0px !important; margin: 0px !important;";
      img.alt = "";
      element.insertBefore(img, br);
      element.__lexicalLineBreak = img;
    } else {
      element.__lexicalLineBreak = br;
    }
  }
  /**
   * @internal
   *
   * Returns the offset of the first child
   */
  getFirstChildOffset() {
    let i2 = 0;
    for (let node = this.after; node !== null; node = node.previousSibling) {
      i2++;
    }
    return i2;
  }
  /**
   * @internal
   */
  resolveChildIndex(element, elementDOM, initialDOM, initialOffset) {
    if (initialDOM === this.element) {
      const firstChildOffset = this.getFirstChildOffset();
      return [element, Math.min(firstChildOffset + element.getChildrenSize(), Math.max(firstChildOffset, initialOffset))];
    }
    const initialPath = indexPath(elementDOM, initialDOM);
    initialPath.push(initialOffset);
    const elementPath = indexPath(elementDOM, this.element);
    let offset = element.getIndexWithinParent();
    for (let i2 = 0; i2 < elementPath.length; i2++) {
      const target = initialPath[i2];
      const source = elementPath[i2];
      if (target === void 0 || target < source) {
        break;
      } else if (target > source) {
        offset += 1;
        break;
      }
    }
    return [element.getParentOrThrow(), offset];
  }
};
function indexPath(root, child) {
  const path = [];
  let node = child;
  for (; node !== root && node !== null; node = node.parentNode) {
    let i2 = 0;
    for (let sibling = node.previousSibling; sibling !== null; sibling = sibling.previousSibling) {
      i2++;
    }
    path.push(i2);
  }
  if (!(node === root)) {
    formatDevErrorMessage(`indexPath: root is not a parent of child`);
  }
  return path.reverse();
}
var ElementNode = class extends LexicalNode {
  /** @internal */
  /** @internal */
  __first;
  /** @internal */
  __last;
  /** @internal */
  __size;
  /** @internal */
  __format;
  /** @internal */
  __style;
  /** @internal */
  __indent;
  /** @internal */
  __dir;
  /** @internal */
  __textFormat;
  /** @internal */
  __textStyle;
  constructor(key) {
    super(key);
    this.__first = null;
    this.__last = null;
    this.__size = 0;
    this.__format = 0;
    this.__style = "";
    this.__indent = 0;
    this.__dir = null;
    this.__textFormat = 0;
    this.__textStyle = "";
  }
  afterCloneFrom(prevNode) {
    super.afterCloneFrom(prevNode);
    if (this.__key === prevNode.__key) {
      this.__first = prevNode.__first;
      this.__last = prevNode.__last;
      this.__size = prevNode.__size;
    }
    this.__indent = prevNode.__indent;
    this.__format = prevNode.__format;
    this.__style = prevNode.__style;
    this.__dir = prevNode.__dir;
    this.__textFormat = prevNode.__textFormat;
    this.__textStyle = prevNode.__textStyle;
  }
  getFormat() {
    const self = this.getLatest();
    return self.__format;
  }
  getFormatType() {
    const format = this.getFormat();
    return ELEMENT_FORMAT_TO_TYPE[format] || "";
  }
  getStyle() {
    const self = this.getLatest();
    return self.__style;
  }
  getIndent() {
    const self = this.getLatest();
    return self.__indent;
  }
  getChildren() {
    const children = [];
    let child = this.getFirstChild();
    while (child !== null) {
      children.push(child);
      child = child.getNextSibling();
    }
    return children;
  }
  getChildrenKeys() {
    const children = [];
    let child = this.getFirstChild();
    while (child !== null) {
      children.push(child.__key);
      child = child.getNextSibling();
    }
    return children;
  }
  getChildrenSize() {
    const self = this.getLatest();
    return self.__size;
  }
  isEmpty() {
    return this.getChildrenSize() === 0;
  }
  isDirty() {
    const editor = getActiveEditor();
    const dirtyElements = editor._dirtyElements;
    return dirtyElements !== null && dirtyElements.has(this.__key);
  }
  isLastChild() {
    const self = this.getLatest();
    const parentLastChild = this.getParentOrThrow().getLastChild();
    return parentLastChild !== null && parentLastChild.is(self);
  }
  getAllTextNodes() {
    const textNodes = [];
    let child = this.getFirstChild();
    while (child !== null) {
      if ($isTextNode(child)) {
        textNodes.push(child);
      }
      if ($isElementNode(child)) {
        const subChildrenNodes = child.getAllTextNodes();
        textNodes.push(...subChildrenNodes);
      }
      child = child.getNextSibling();
    }
    return textNodes;
  }
  getFirstDescendant() {
    let node = this.getFirstChild();
    while ($isElementNode(node)) {
      const child = node.getFirstChild();
      if (child === null) {
        break;
      }
      node = child;
    }
    return node;
  }
  getLastDescendant() {
    let node = this.getLastChild();
    while ($isElementNode(node)) {
      const child = node.getLastChild();
      if (child === null) {
        break;
      }
      node = child;
    }
    return node;
  }
  getDescendantByIndex(index) {
    const children = this.getChildren();
    const childrenLength = children.length;
    if (index >= childrenLength) {
      const resolvedNode2 = children[childrenLength - 1];
      return $isElementNode(resolvedNode2) && resolvedNode2.getLastDescendant() || resolvedNode2 || null;
    }
    const resolvedNode = children[index];
    return $isElementNode(resolvedNode) && resolvedNode.getFirstDescendant() || resolvedNode || null;
  }
  getFirstChild() {
    const self = this.getLatest();
    const firstKey = self.__first;
    return firstKey === null ? null : $getNodeByKey(firstKey);
  }
  getFirstChildOrThrow() {
    const firstChild = this.getFirstChild();
    if (firstChild === null) {
      {
        formatDevErrorMessage(`Expected node ${this.__key} to have a first child.`);
      }
    }
    return firstChild;
  }
  getLastChild() {
    const self = this.getLatest();
    const lastKey = self.__last;
    return lastKey === null ? null : $getNodeByKey(lastKey);
  }
  getLastChildOrThrow() {
    const lastChild = this.getLastChild();
    if (lastChild === null) {
      {
        formatDevErrorMessage(`Expected node ${this.__key} to have a last child.`);
      }
    }
    return lastChild;
  }
  getChildAtIndex(index) {
    const size = this.getChildrenSize();
    let node;
    let i2;
    if (index < size / 2) {
      node = this.getFirstChild();
      i2 = 0;
      while (node !== null && i2 <= index) {
        if (i2 === index) {
          return node;
        }
        node = node.getNextSibling();
        i2++;
      }
      return null;
    }
    node = this.getLastChild();
    i2 = size - 1;
    while (node !== null && i2 >= index) {
      if (i2 === index) {
        return node;
      }
      node = node.getPreviousSibling();
      i2--;
    }
    return null;
  }
  getTextContent() {
    let textContent = "";
    const children = this.getChildren();
    const childrenLength = children.length;
    for (let i2 = 0; i2 < childrenLength; i2++) {
      const child = children[i2];
      textContent += child.getTextContent();
      if (
        // this is an inline $textContentRequiresDoubleLinebreakAtEnd(child)
        $isElementNode(child) && i2 !== childrenLength - 1 && !child.isInline()
      ) {
        textContent += DOUBLE_LINE_BREAK;
      }
    }
    return textContent;
  }
  getTextContentSize() {
    let textContentSize = 0;
    const children = this.getChildren();
    const childrenLength = children.length;
    for (let i2 = 0; i2 < childrenLength; i2++) {
      const child = children[i2];
      textContentSize += child.getTextContentSize();
      if (
        // This is an inline $textContentRequiresDoubleLinebreakAtEnd(child)
        $isElementNode(child) && i2 !== childrenLength - 1 && !child.isInline()
      ) {
        textContentSize += DOUBLE_LINE_BREAK.length;
      }
    }
    return textContentSize;
  }
  getDirection() {
    const self = this.getLatest();
    return self.__dir;
  }
  getTextFormat() {
    const self = this.getLatest();
    return self.__textFormat;
  }
  hasFormat(type) {
    if (type !== "") {
      const formatFlag = ELEMENT_TYPE_TO_FORMAT[type];
      return (this.getFormat() & formatFlag) !== 0;
    }
    return false;
  }
  hasTextFormat(type) {
    const formatFlag = TEXT_TYPE_TO_FORMAT[type];
    return (this.getTextFormat() & formatFlag) !== 0;
  }
  /**
   * Returns the format flags applied to the node as a 32-bit integer.
   *
   * @returns a number representing the TextFormatTypes applied to the node.
   */
  getFormatFlags(type, alignWithFormat) {
    const self = this.getLatest();
    const format = self.__textFormat;
    return toggleTextFormatType(format, type, alignWithFormat);
  }
  getTextStyle() {
    const self = this.getLatest();
    return self.__textStyle;
  }
  // Mutators
  select(_anchorOffset, _focusOffset) {
    errorOnReadOnly();
    const selection = $getSelection();
    let anchorOffset = _anchorOffset;
    let focusOffset = _focusOffset;
    const childrenCount = this.getChildrenSize();
    if (!this.canBeEmpty()) {
      if (_anchorOffset === 0 && _focusOffset === 0) {
        const firstChild = this.getFirstChild();
        if ($isTextNode(firstChild) || $isElementNode(firstChild)) {
          return firstChild.select(0, 0);
        }
      } else if ((_anchorOffset === void 0 || _anchorOffset === childrenCount) && (_focusOffset === void 0 || _focusOffset === childrenCount)) {
        const lastChild = this.getLastChild();
        if ($isTextNode(lastChild) || $isElementNode(lastChild)) {
          return lastChild.select();
        }
      }
    }
    if (anchorOffset === void 0) {
      anchorOffset = childrenCount;
    }
    if (focusOffset === void 0) {
      focusOffset = childrenCount;
    }
    const key = this.__key;
    if (!$isRangeSelection(selection)) {
      return $internalMakeRangeSelection(key, anchorOffset, key, focusOffset, "element", "element");
    } else {
      selection.anchor.set(key, anchorOffset, "element");
      selection.focus.set(key, focusOffset, "element");
      selection.dirty = true;
    }
    return selection;
  }
  selectStart() {
    const firstNode = this.getFirstDescendant();
    return firstNode ? firstNode.selectStart() : this.select();
  }
  selectEnd() {
    const lastNode = this.getLastDescendant();
    return lastNode ? lastNode.selectEnd() : this.select();
  }
  clear() {
    const writableSelf = this.getWritable();
    const children = this.getChildren();
    children.forEach((child) => child.remove());
    return writableSelf;
  }
  append(...nodesToAppend) {
    return this.splice(this.getChildrenSize(), 0, nodesToAppend);
  }
  setDirection(direction) {
    const self = this.getWritable();
    self.__dir = direction;
    return self;
  }
  setFormat(type) {
    const self = this.getWritable();
    self.__format = type !== "" ? ELEMENT_TYPE_TO_FORMAT[type] : 0;
    return this;
  }
  setStyle(style) {
    const self = this.getWritable();
    self.__style = style || "";
    return this;
  }
  setTextFormat(type) {
    const self = this.getWritable();
    self.__textFormat = type;
    return self;
  }
  setTextStyle(style) {
    const self = this.getWritable();
    self.__textStyle = style;
    return self;
  }
  setIndent(indentLevel) {
    const self = this.getWritable();
    self.__indent = indentLevel;
    return this;
  }
  splice(start, deleteCount, nodesToInsert) {
    if (!!$isEphemeral(this)) {
      formatDevErrorMessage(`ElementNode.splice: Ephemeral nodes can not mutate their children (key ${this.__key} type ${this.__type})`);
    }
    const oldSize = this.getChildrenSize();
    const writableSelf = this.getWritable();
    if (!(start + deleteCount <= oldSize)) {
      formatDevErrorMessage(`ElementNode.splice: start + deleteCount > oldSize (${String(start)} + ${String(deleteCount)} > ${String(oldSize)})`);
    }
    const writableSelfKey = writableSelf.__key;
    const nodesToInsertKeys = [];
    const nodesToRemoveKeys = [];
    const nodeAfterRange = this.getChildAtIndex(start + deleteCount);
    let nodeBeforeRange = null;
    let newSize = oldSize - deleteCount + nodesToInsert.length;
    if (start !== 0) {
      if (start === oldSize) {
        nodeBeforeRange = this.getLastChild();
      } else {
        const node = this.getChildAtIndex(start);
        if (node !== null) {
          nodeBeforeRange = node.getPreviousSibling();
        }
      }
    }
    if (deleteCount > 0) {
      let nodeToDelete = nodeBeforeRange === null ? this.getFirstChild() : nodeBeforeRange.getNextSibling();
      for (let i2 = 0; i2 < deleteCount; i2++) {
        if (nodeToDelete === null) {
          {
            formatDevErrorMessage(`splice: sibling not found`);
          }
        }
        const nextSibling = nodeToDelete.getNextSibling();
        const nodeKeyToDelete = nodeToDelete.__key;
        const writableNodeToDelete = nodeToDelete.getWritable();
        removeFromParent(writableNodeToDelete);
        nodesToRemoveKeys.push(nodeKeyToDelete);
        nodeToDelete = nextSibling;
      }
    }
    let prevNode = nodeBeforeRange;
    for (const nodeToInsert of nodesToInsert) {
      if (prevNode !== null && nodeToInsert.is(prevNode)) {
        nodeBeforeRange = prevNode = prevNode.getPreviousSibling();
      }
      const writableNodeToInsert = nodeToInsert.getWritable();
      if (writableNodeToInsert.__parent === writableSelfKey) {
        newSize--;
      }
      removeFromParent(writableNodeToInsert);
      const nodeKeyToInsert = nodeToInsert.__key;
      if (prevNode === null) {
        writableSelf.__first = nodeKeyToInsert;
        writableNodeToInsert.__prev = null;
      } else {
        const writablePrevNode = prevNode.getWritable();
        writablePrevNode.__next = nodeKeyToInsert;
        writableNodeToInsert.__prev = writablePrevNode.__key;
      }
      if (nodeToInsert.__key === writableSelfKey) {
        {
          formatDevErrorMessage(`append: attempting to append self`);
        }
      }
      writableNodeToInsert.__parent = writableSelfKey;
      nodesToInsertKeys.push(nodeKeyToInsert);
      prevNode = nodeToInsert;
    }
    if (start + deleteCount === oldSize) {
      if (prevNode !== null) {
        const writablePrevNode = prevNode.getWritable();
        writablePrevNode.__next = null;
        writableSelf.__last = prevNode.__key;
      }
    } else if (nodeAfterRange !== null) {
      const writableNodeAfterRange = nodeAfterRange.getWritable();
      if (prevNode !== null) {
        const writablePrevNode = prevNode.getWritable();
        writableNodeAfterRange.__prev = prevNode.__key;
        writablePrevNode.__next = nodeAfterRange.__key;
      } else {
        writableNodeAfterRange.__prev = null;
      }
    }
    writableSelf.__size = newSize;
    if (nodesToRemoveKeys.length) {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodesToRemoveKeySet = new Set(nodesToRemoveKeys);
        const nodesToInsertKeySet = new Set(nodesToInsertKeys);
        const {
          anchor,
          focus
        } = selection;
        if (isPointRemoved(anchor, nodesToRemoveKeySet, nodesToInsertKeySet)) {
          moveSelectionPointToSibling(anchor, anchor.getNode(), this, nodeBeforeRange, nodeAfterRange);
        }
        if (isPointRemoved(focus, nodesToRemoveKeySet, nodesToInsertKeySet)) {
          moveSelectionPointToSibling(focus, focus.getNode(), this, nodeBeforeRange, nodeAfterRange);
        }
        if (newSize === 0 && !this.canBeEmpty() && !$isRootOrShadowRoot(this)) {
          this.remove();
        }
      }
    }
    return writableSelf;
  }
  /**
   * @internal
   *
   * An experimental API that an ElementNode can override to control where its
   * children are inserted into the DOM, this is useful to add a wrapping node
   * or accessory nodes before or after the children. The root of the node returned
   * by createDOM must still be exactly one HTMLElement.
   */
  getDOMSlot(element) {
    return new ElementDOMSlot(element);
  }
  exportDOM(editor) {
    const {
      element
    } = super.exportDOM(editor);
    if (isHTMLElement(element)) {
      const indent = this.getIndent();
      if (indent > 0) {
        element.style.paddingInlineStart = `${indent * 40}px`;
      }
      const direction = this.getDirection();
      if (direction) {
        element.dir = direction;
      }
    }
    return {
      element
    };
  }
  // JSON serialization
  exportJSON() {
    const json = {
      children: [],
      direction: this.getDirection(),
      format: this.getFormatType(),
      indent: this.getIndent(),
      // As an exception here we invoke super at the end for historical reasons.
      // Namely, to preserve the order of the properties and not to break the tests
      // that use the serialized string representation.
      ...super.exportJSON()
    };
    const textFormat = this.getTextFormat();
    const textStyle = this.getTextStyle();
    if ((textFormat !== 0 || textStyle !== "") && !$isRootOrShadowRoot(this) && !this.getChildren().some($isTextNode)) {
      if (textFormat !== 0) {
        json.textFormat = textFormat;
      }
      if (textStyle !== "") {
        json.textStyle = textStyle;
      }
    }
    return json;
  }
  updateFromJSON(serializedNode) {
    return super.updateFromJSON(serializedNode).setFormat(serializedNode.format).setIndent(serializedNode.indent).setDirection(serializedNode.direction).setTextFormat(serializedNode.textFormat || 0).setTextStyle(serializedNode.textStyle || "");
  }
  // These are intended to be extends for specific element heuristics.
  insertNewAfter(selection, restoreSelection) {
    return null;
  }
  canIndent() {
    return true;
  }
  /*
   * This method controls the behavior of the node during backwards
   * deletion (i.e., backspace) when selection is at the beginning of
   * the node (offset 0). You may use this to have the node replace
   * itself, change its state, or do nothing. When you do make such
   * a change, you should return true.
   *
   * When true is returned, the collapse phase will stop.
   * When false is returned, and isInline() is true, and getPreviousSibling() is null,
   * then this function will be called on its parent.
   */
  collapseAtStart(selection) {
    return false;
  }
  excludeFromCopy(destination) {
    return false;
  }
  /** @deprecated @internal */
  canReplaceWith(replacement) {
    return true;
  }
  /** @deprecated @internal */
  canInsertAfter(node) {
    return true;
  }
  canBeEmpty() {
    return true;
  }
  canInsertTextBefore() {
    return true;
  }
  canInsertTextAfter() {
    return true;
  }
  isInline() {
    return false;
  }
  // A shadow root is a Node that behaves like RootNode. The shadow root (and RootNode) mark the
  // end of the hierarchy, most implementations should treat it as there's nothing (upwards)
  // beyond this point. For example, node.getTopLevelElement(), when performed inside a TableCellNode
  // will return the immediate first child underneath TableCellNode instead of RootNode.
  isShadowRoot() {
    return false;
  }
  /** @deprecated @internal */
  canMergeWith(node) {
    return false;
  }
  extractWithChild(child, selection, destination) {
    return false;
  }
  /**
   * Determines whether this node, when empty, can merge with a first block
   * of nodes being inserted.
   *
   * This method is specifically called in {@link RangeSelection.insertNodes}
   * to determine merging behavior during nodes insertion.
   *
   * @example
   * // In a ListItemNode or QuoteNode implementation:
   * canMergeWhenEmpty(): true {
   *  return true;
   * }
   */
  canMergeWhenEmpty() {
    return false;
  }
  /** @internal */
  reconcileObservedMutation(dom, editor) {
    const slot = this.getDOMSlot(dom);
    let currentDOM = slot.getFirstChild();
    for (let currentNode = this.getFirstChild(); currentNode; currentNode = currentNode.getNextSibling()) {
      const correctDOM = editor.getElementByKey(currentNode.getKey());
      if (correctDOM === null) {
        continue;
      }
      if (currentDOM == null) {
        slot.insertChild(correctDOM);
        currentDOM = correctDOM;
      } else if (currentDOM !== correctDOM) {
        slot.replaceChild(correctDOM, currentDOM);
      }
      currentDOM = currentDOM.nextSibling;
    }
  }
};
function $isElementNode(node) {
  return node instanceof ElementNode;
}
function isPointRemoved(point, nodesToRemoveKeySet, nodesToInsertKeySet) {
  let node = point.getNode();
  while (node) {
    const nodeKey = node.__key;
    if (nodesToRemoveKeySet.has(nodeKey) && !nodesToInsertKeySet.has(nodeKey)) {
      return true;
    }
    node = node.getParent();
  }
  return false;
}
var DecoratorNode = class extends LexicalNode {
  /** @internal */
  /**
   * The returned value is added to the LexicalEditor._decorators
   */
  decorate(editor, config) {
    return null;
  }
  isIsolated() {
    return false;
  }
  isInline() {
    return true;
  }
  isKeyboardSelectable() {
    return true;
  }
};
function $isDecoratorNode(node) {
  return node instanceof DecoratorNode;
}
var RootNode = class _RootNode extends ElementNode {
  /** @internal */
  __cachedText;
  static getType() {
    return "root";
  }
  static clone() {
    return new _RootNode();
  }
  constructor() {
    super("root");
    this.__cachedText = null;
  }
  getTopLevelElementOrThrow() {
    {
      formatDevErrorMessage(`getTopLevelElementOrThrow: root nodes are not top level elements`);
    }
  }
  getTextContent() {
    const cachedText = this.__cachedText;
    if (isCurrentlyReadOnlyMode() || getActiveEditor()._dirtyType === NO_DIRTY_NODES) {
      if (cachedText !== null) {
        return cachedText;
      }
    }
    return super.getTextContent();
  }
  remove() {
    {
      formatDevErrorMessage(`remove: cannot be called on root nodes`);
    }
  }
  replace(node) {
    {
      formatDevErrorMessage(`replace: cannot be called on root nodes`);
    }
  }
  insertBefore(nodeToInsert) {
    {
      formatDevErrorMessage(`insertBefore: cannot be called on root nodes`);
    }
  }
  insertAfter(nodeToInsert) {
    {
      formatDevErrorMessage(`insertAfter: cannot be called on root nodes`);
    }
  }
  // View
  updateDOM(prevNode, dom) {
    return false;
  }
  // Mutate
  splice(start, deleteCount, nodesToInsert) {
    for (const node of nodesToInsert) {
      if (!($isElementNode(node) || $isDecoratorNode(node))) {
        formatDevErrorMessage(`rootNode.splice: Only element or decorator nodes can be inserted to the root node`);
      }
    }
    return super.splice(start, deleteCount, nodesToInsert);
  }
  static importJSON(serializedNode) {
    return $getRoot().updateFromJSON(serializedNode);
  }
  collapseAtStart() {
    return true;
  }
};
function $createRootNode() {
  return new RootNode();
}
function $isRootNode(node) {
  return node instanceof RootNode;
}
function editorStateHasDirtySelection(editorState, editor) {
  const currentSelection = editor.getEditorState()._selection;
  const pendingSelection = editorState._selection;
  if (pendingSelection !== null) {
    if (pendingSelection.dirty || !pendingSelection.is(currentSelection)) {
      return true;
    }
  } else if (currentSelection !== null) {
    return true;
  }
  return false;
}
function cloneEditorState(current) {
  return new EditorState(new Map(current._nodeMap));
}
function createEmptyEditorState() {
  return new EditorState(/* @__PURE__ */ new Map([["root", $createRootNode()]]));
}
function exportNodeToJSON(node) {
  const serializedNode = node.exportJSON();
  const nodeClass = node.constructor;
  if (serializedNode.type !== nodeClass.getType()) {
    {
      formatDevErrorMessage(`LexicalNode: Node ${nodeClass.name} does not match the serialized type. Check if .exportJSON() is implemented and it is returning the correct type.`);
    }
  }
  if ($isElementNode(node)) {
    const serializedChildren = serializedNode.children;
    if (!Array.isArray(serializedChildren)) {
      {
        formatDevErrorMessage(`LexicalNode: Node ${nodeClass.name} is an element but .exportJSON() does not have a children array.`);
      }
    }
    const children = node.getChildren();
    for (let i2 = 0; i2 < children.length; i2++) {
      const child = children[i2];
      const serializedChildNode = exportNodeToJSON(child);
      serializedChildren.push(serializedChildNode);
    }
  }
  return serializedNode;
}
function $isEditorState(x) {
  return x instanceof EditorState;
}
var EditorState = class _EditorState {
  _nodeMap;
  _selection;
  _flushSync;
  _readOnly;
  constructor(nodeMap, selection) {
    this._nodeMap = nodeMap;
    this._selection = selection || null;
    this._flushSync = false;
    this._readOnly = false;
  }
  isEmpty() {
    return this._nodeMap.size === 1 && this._selection === null;
  }
  read(callbackFn, options) {
    return readEditorState(options && options.editor || null, this, callbackFn);
  }
  clone(selection) {
    const editorState = new _EditorState(this._nodeMap, selection === void 0 ? this._selection : selection);
    editorState._readOnly = true;
    return editorState;
  }
  toJSON() {
    return readEditorState(null, this, () => ({
      root: exportNodeToJSON($getRoot())
    }));
  }
};
var ArtificialNode__DO_NOT_USE = class extends ElementNode {
  static getType() {
    return "artificial";
  }
  createDOM(config) {
    const dom = document.createElement("div");
    return dom;
  }
};
var ParagraphNode = class _ParagraphNode extends ElementNode {
  /** @internal */
  static getType() {
    return "paragraph";
  }
  static clone(node) {
    return new _ParagraphNode(node.__key);
  }
  // View
  createDOM(config) {
    const dom = document.createElement("p");
    const classNames = getCachedClassNameArray(config.theme, "paragraph");
    if (classNames !== void 0) {
      const domClassList = dom.classList;
      domClassList.add(...classNames);
    }
    return dom;
  }
  updateDOM(prevNode, dom, config) {
    return false;
  }
  static importDOM() {
    return {
      p: (node) => ({
        conversion: $convertParagraphElement,
        priority: 0
      })
    };
  }
  exportDOM(editor) {
    const {
      element
    } = super.exportDOM(editor);
    if (isHTMLElement(element)) {
      if (this.isEmpty()) {
        element.append(document.createElement("br"));
      }
      const formatType = this.getFormatType();
      if (formatType) {
        element.style.textAlign = formatType;
      }
    }
    return {
      element
    };
  }
  static importJSON(serializedNode) {
    return $createParagraphNode().updateFromJSON(serializedNode);
  }
  exportJSON() {
    const json = super.exportJSON();
    if (json.textFormat === void 0 || json.textStyle === void 0) {
      const firstTextNode = this.getChildren().find($isTextNode);
      if (firstTextNode) {
        json.textFormat = firstTextNode.getFormat();
        json.textStyle = firstTextNode.getStyle();
      } else {
        json.textFormat = this.getTextFormat();
        json.textStyle = this.getTextStyle();
      }
    }
    return json;
  }
  // Mutation
  insertNewAfter(rangeSelection, restoreSelection) {
    const newElement = $createParagraphNode();
    newElement.setTextFormat(rangeSelection.format);
    newElement.setTextStyle(rangeSelection.style);
    const direction = this.getDirection();
    newElement.setDirection(direction);
    newElement.setFormat(this.getFormatType());
    newElement.setStyle(this.getStyle());
    this.insertAfter(newElement, restoreSelection);
    return newElement;
  }
  collapseAtStart() {
    const children = this.getChildren();
    if (children.length === 0 || $isTextNode(children[0]) && children[0].getTextContent().trim() === "") {
      const nextSibling = this.getNextSibling();
      if (nextSibling !== null) {
        this.selectNext();
        this.remove();
        return true;
      }
      const prevSibling = this.getPreviousSibling();
      if (prevSibling !== null) {
        this.selectPrevious();
        this.remove();
        return true;
      }
    }
    return false;
  }
};
function $convertParagraphElement(element) {
  const node = $createParagraphNode();
  if (element.style) {
    node.setFormat(element.style.textAlign);
    setNodeIndentFromDOM(element, node);
  }
  if (node.getFormatType() === "") {
    const align = element.getAttribute("align");
    if (align) {
      if (align && align in ELEMENT_TYPE_TO_FORMAT) {
        node.setFormat(align);
      }
    }
  }
  return {
    node
  };
}
function $createParagraphNode() {
  return $applyNodeReplacement(new ParagraphNode());
}
function $isParagraphNode(node) {
  return node instanceof ParagraphNode;
}
var DEFAULT_SKIP_INITIALIZATION = false;
var COMMAND_PRIORITY_EDITOR = 0;
var COMMAND_PRIORITY_LOW = 1;
var COMMAND_PRIORITY_NORMAL = 2;
var COMMAND_PRIORITY_HIGH = 3;
var COMMAND_PRIORITY_CRITICAL = 4;
function resetEditor(editor, prevRootElement, nextRootElement, pendingEditorState) {
  const keyNodeMap = editor._keyToDOMMap;
  keyNodeMap.clear();
  editor._editorState = createEmptyEditorState();
  editor._pendingEditorState = pendingEditorState;
  editor._compositionKey = null;
  editor._dirtyType = NO_DIRTY_NODES;
  editor._cloneNotNeeded.clear();
  editor._dirtyLeaves = /* @__PURE__ */ new Set();
  editor._dirtyElements.clear();
  editor._normalizedNodes = /* @__PURE__ */ new Set();
  editor._updateTags = /* @__PURE__ */ new Set();
  editor._updates = [];
  editor._blockCursorElement = null;
  const observer = editor._observer;
  if (observer !== null) {
    observer.disconnect();
    editor._observer = null;
  }
  if (prevRootElement !== null) {
    prevRootElement.textContent = "";
  }
  if (nextRootElement !== null) {
    nextRootElement.textContent = "";
    keyNodeMap.set("root", nextRootElement);
  }
}
function initializeConversionCache(nodes, additionalConversions) {
  const conversionCache = /* @__PURE__ */ new Map();
  const handledConversions = /* @__PURE__ */ new Set();
  const addConversionsToCache = (map) => {
    Object.keys(map).forEach((key) => {
      let currentCache = conversionCache.get(key);
      if (currentCache === void 0) {
        currentCache = [];
        conversionCache.set(key, currentCache);
      }
      currentCache.push(map[key]);
    });
  };
  nodes.forEach((node) => {
    const importDOM = node.klass.importDOM;
    if (importDOM == null || handledConversions.has(importDOM)) {
      return;
    }
    handledConversions.add(importDOM);
    const map = importDOM.call(node.klass);
    if (map !== null) {
      addConversionsToCache(map);
    }
  });
  if (additionalConversions) {
    addConversionsToCache(additionalConversions);
  }
  return conversionCache;
}
function getTransformSetFromKlass(klass) {
  const transforms = /* @__PURE__ */ new Set();
  const staticTransforms = /* @__PURE__ */ new Set();
  let currentKlass = klass;
  while (currentKlass) {
    const {
      ownNodeConfig
    } = getStaticNodeConfig(currentKlass);
    const staticTransform = currentKlass.transform;
    if (!staticTransforms.has(staticTransform)) {
      staticTransforms.add(staticTransform);
      const transform = currentKlass.transform();
      if (transform) {
        transforms.add(transform);
      }
    }
    if (ownNodeConfig) {
      const $transform = ownNodeConfig.$transform;
      if ($transform) {
        transforms.add($transform);
      }
      currentKlass = ownNodeConfig.extends;
    } else {
      const parent = Object.getPrototypeOf(currentKlass);
      currentKlass = parent.prototype instanceof LexicalNode && parent !== LexicalNode ? parent : void 0;
    }
  }
  return transforms;
}
function createEditor(editorConfig) {
  const config = editorConfig || {};
  const activeEditor2 = internalGetActiveEditor();
  const theme = config.theme || {};
  const parentEditor = editorConfig === void 0 ? activeEditor2 : config.parentEditor || null;
  const disableEvents = config.disableEvents || false;
  const editorState = createEmptyEditorState();
  const namespace = config.namespace || (parentEditor !== null ? parentEditor._config.namespace : createUID());
  const initialEditorState = config.editorState;
  const nodes = [RootNode, TextNode, LineBreakNode, TabNode, ParagraphNode, ArtificialNode__DO_NOT_USE, ...config.nodes || []];
  const {
    onError,
    html
  } = config;
  const isEditable = config.editable !== void 0 ? config.editable : true;
  let registeredNodes;
  if (editorConfig === void 0 && activeEditor2 !== null) {
    registeredNodes = activeEditor2._nodes;
  } else {
    registeredNodes = /* @__PURE__ */ new Map();
    for (let i2 = 0; i2 < nodes.length; i2++) {
      let klass = nodes[i2];
      let replace = null;
      let replaceWithKlass = null;
      if (typeof klass !== "function") {
        const options = klass;
        klass = options.replace;
        replace = options.with;
        replaceWithKlass = options.withKlass || null;
      }
      void getStaticNodeConfig(klass);
      {
        const name = klass.name;
        const nodeType = hasOwnStaticMethod(klass, "getType") && klass.getType();
        if (replaceWithKlass) {
          if (!(replaceWithKlass.prototype instanceof klass)) {
            formatDevErrorMessage(`${replaceWithKlass.name} doesn't extend the ${name}`);
          }
        } else if (replace) {
          console.warn(`Override for ${name} specifies 'replace' without 'withKlass'. 'withKlass' will be required in a future version.`);
        }
        if (name !== "RootNode" && nodeType !== "root" && nodeType !== "artificial" && // This is mostly for the unit test suite which
        // uses LexicalNode in an otherwise incorrect way
        // by mocking its static getType
        klass !== LexicalNode) {
          ["getType", "clone"].forEach((method) => {
            if (!hasOwnStaticMethod(klass, method)) {
              console.warn(`${name} must implement static "${method}" method`);
            }
          });
          if (!hasOwnStaticMethod(klass, "importDOM") && hasOwnExportDOM(klass)) {
            console.warn(`${name} should implement "importDOM" if using a custom "exportDOM" method to ensure HTML serialization (important for copy & paste) works as expected`);
          }
          if (!hasOwnStaticMethod(klass, "importJSON")) {
            console.warn(`${name} should implement "importJSON" method to ensure JSON and default HTML serialization works as expected`);
          }
        }
      }
      const type = klass.getType();
      const transforms = getTransformSetFromKlass(klass);
      registeredNodes.set(type, {
        exportDOM: html && html.export ? html.export.get(klass) : void 0,
        klass,
        replace,
        replaceWithKlass,
        sharedNodeState: createSharedNodeState(nodes[i2]),
        transforms
      });
    }
  }
  const editor = new LexicalEditor(editorState, parentEditor, registeredNodes, {
    disableEvents,
    namespace,
    theme
  }, onError ? onError : console.error, initializeConversionCache(registeredNodes, html ? html.import : void 0), isEditable, editorConfig);
  if (initialEditorState !== void 0) {
    editor._pendingEditorState = initialEditorState;
    editor._dirtyType = FULL_RECONCILE;
  }
  registerDefaultCommandHandlers(editor);
  return editor;
}
var LexicalEditor = class {
  /** @internal */
  /** The version with build identifiers for this editor (since 0.17.1) */
  static version;
  /** @internal */
  _headless;
  /** @internal */
  _parentEditor;
  /** @internal */
  _rootElement;
  /** @internal */
  _editorState;
  /** @internal */
  _pendingEditorState;
  /** @internal */
  _compositionKey;
  /** @internal */
  _deferred;
  /** @internal */
  _keyToDOMMap;
  /** @internal */
  _updates;
  /** @internal */
  _updating;
  /** @internal */
  _listeners;
  /** @internal */
  _commands;
  /** @internal */
  _nodes;
  /** @internal */
  _decorators;
  /** @internal */
  _pendingDecorators;
  /** @internal */
  _config;
  /** @internal */
  _dirtyType;
  /** @internal */
  _cloneNotNeeded;
  /** @internal */
  _dirtyLeaves;
  /** @internal */
  _dirtyElements;
  /** @internal */
  _normalizedNodes;
  /** @internal */
  _updateTags;
  /** @internal */
  _observer;
  /** @internal */
  _key;
  /** @internal */
  _onError;
  /** @internal */
  _htmlConversions;
  /** @internal */
  _window;
  /** @internal */
  _editable;
  /** @internal */
  _blockCursorElement;
  /** @internal */
  _createEditorArgs;
  /** @internal */
  constructor(editorState, parentEditor, nodes, config, onError, htmlConversions, editable, createEditorArgs) {
    this._createEditorArgs = createEditorArgs;
    this._parentEditor = parentEditor;
    this._rootElement = null;
    this._editorState = editorState;
    this._pendingEditorState = null;
    this._compositionKey = null;
    this._deferred = [];
    this._keyToDOMMap = /* @__PURE__ */ new Map();
    this._updates = [];
    this._updating = false;
    this._listeners = {
      decorator: /* @__PURE__ */ new Set(),
      editable: /* @__PURE__ */ new Set(),
      mutation: /* @__PURE__ */ new Map(),
      root: /* @__PURE__ */ new Set(),
      textcontent: /* @__PURE__ */ new Set(),
      update: /* @__PURE__ */ new Set()
    };
    this._commands = /* @__PURE__ */ new Map();
    this._config = config;
    this._nodes = nodes;
    this._decorators = {};
    this._pendingDecorators = null;
    this._dirtyType = NO_DIRTY_NODES;
    this._cloneNotNeeded = /* @__PURE__ */ new Set();
    this._dirtyLeaves = /* @__PURE__ */ new Set();
    this._dirtyElements = /* @__PURE__ */ new Map();
    this._normalizedNodes = /* @__PURE__ */ new Set();
    this._updateTags = /* @__PURE__ */ new Set();
    this._observer = null;
    this._key = createUID();
    this._onError = onError;
    this._htmlConversions = htmlConversions;
    this._editable = editable;
    this._headless = parentEditor !== null && parentEditor._headless;
    this._window = null;
    this._blockCursorElement = null;
  }
  /**
   *
   * @returns true if the editor is currently in "composition" mode due to receiving input
   * through an IME, or 3P extension, for example. Returns false otherwise.
   */
  isComposing() {
    return this._compositionKey != null;
  }
  /**
   * Registers a listener for Editor update event. Will trigger the provided callback
   * each time the editor goes through an update (via {@link LexicalEditor.update}) until the
   * teardown function is called.
   *
   * @returns a teardown function that can be used to cleanup the listener.
   */
  registerUpdateListener(listener) {
    const listenerSetOrMap = this._listeners.update;
    listenerSetOrMap.add(listener);
    return () => {
      listenerSetOrMap.delete(listener);
    };
  }
  /**
   * Registers a listener for for when the editor changes between editable and non-editable states.
   * Will trigger the provided callback each time the editor transitions between these states until the
   * teardown function is called.
   *
   * @returns a teardown function that can be used to cleanup the listener.
   */
  registerEditableListener(listener) {
    const listenerSetOrMap = this._listeners.editable;
    listenerSetOrMap.add(listener);
    return () => {
      listenerSetOrMap.delete(listener);
    };
  }
  /**
   * Registers a listener for when the editor's decorator object changes. The decorator object contains
   * all DecoratorNode keys -> their decorated value. This is primarily used with external UI frameworks.
   *
   * Will trigger the provided callback each time the editor transitions between these states until the
   * teardown function is called.
   *
   * @returns a teardown function that can be used to cleanup the listener.
   */
  registerDecoratorListener(listener) {
    const listenerSetOrMap = this._listeners.decorator;
    listenerSetOrMap.add(listener);
    return () => {
      listenerSetOrMap.delete(listener);
    };
  }
  /**
   * Registers a listener for when Lexical commits an update to the DOM and the text content of
   * the editor changes from the previous state of the editor. If the text content is the
   * same between updates, no notifications to the listeners will happen.
   *
   * Will trigger the provided callback each time the editor transitions between these states until the
   * teardown function is called.
   *
   * @returns a teardown function that can be used to cleanup the listener.
   */
  registerTextContentListener(listener) {
    const listenerSetOrMap = this._listeners.textcontent;
    listenerSetOrMap.add(listener);
    return () => {
      listenerSetOrMap.delete(listener);
    };
  }
  /**
   * Registers a listener for when the editor's root DOM element (the content editable
   * Lexical attaches to) changes. This is primarily used to attach event listeners to the root
   *  element. The root listener function is executed directly upon registration and then on
   * any subsequent update.
   *
   * Will trigger the provided callback each time the editor transitions between these states until the
   * teardown function is called.
   *
   * @returns a teardown function that can be used to cleanup the listener.
   */
  registerRootListener(listener) {
    const listenerSetOrMap = this._listeners.root;
    listener(this._rootElement, null);
    listenerSetOrMap.add(listener);
    return () => {
      listener(null, this._rootElement);
      listenerSetOrMap.delete(listener);
    };
  }
  /**
   * Registers a listener that will trigger anytime the provided command
   * is dispatched with {@link LexicalEditor.dispatch}, subject to priority.
   * Listeners that run at a higher priority can "intercept" commands and
   * prevent them from propagating to other handlers by returning true.
   *
   * Listeners are always invoked in an {@link LexicalEditor.update} and can
   * call dollar functions.
   *
   * Listeners registered at the same priority level will run
   * deterministically in the order of registration.
   *
   * @param command - the command that will trigger the callback.
   * @param listener - the function that will execute when the command is dispatched.
   * @param priority - the relative priority of the listener. 0 | 1 | 2 | 3 | 4
   *   (or {@link COMMAND_PRIORITY_EDITOR} |
   *     {@link COMMAND_PRIORITY_LOW} |
   *     {@link COMMAND_PRIORITY_NORMAL} |
   *     {@link COMMAND_PRIORITY_HIGH} |
   *     {@link COMMAND_PRIORITY_CRITICAL})
   * @returns a teardown function that can be used to cleanup the listener.
   */
  registerCommand(command, listener, priority) {
    if (priority === void 0) {
      {
        formatDevErrorMessage(`Listener for type "command" requires a "priority".`);
      }
    }
    const commandsMap = this._commands;
    if (!commandsMap.has(command)) {
      commandsMap.set(command, [/* @__PURE__ */ new Set(), /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set()]);
    }
    const listenersInPriorityOrder = commandsMap.get(command);
    if (listenersInPriorityOrder === void 0) {
      {
        formatDevErrorMessage(`registerCommand: Command ${String(command)} not found in command map`);
      }
    }
    const listeners = listenersInPriorityOrder[priority];
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      if (listenersInPriorityOrder.every((listenersSet) => listenersSet.size === 0)) {
        commandsMap.delete(command);
      }
    };
  }
  /**
   * Registers a listener that will run when a Lexical node of the provided class is
   * mutated. The listener will receive a list of nodes along with the type of mutation
   * that was performed on each: created, destroyed, or updated.
   *
   * One common use case for this is to attach DOM event listeners to the underlying DOM nodes as Lexical nodes are created.
   * {@link LexicalEditor.getElementByKey} can be used for this.
   *
   * If any existing nodes are in the DOM, and skipInitialization is not true, the listener
   * will be called immediately with an updateTag of 'registerMutationListener' where all
   * nodes have the 'created' NodeMutation. This can be controlled with the skipInitialization option
   * (whose default was previously true for backwards compatibility with &lt;=0.16.1 but has been changed to false as of 0.21.0).
   *
   * @param klass - The class of the node that you want to listen to mutations on.
   * @param listener - The logic you want to run when the node is mutated.
   * @param options - see {@link MutationListenerOptions}
   * @returns a teardown function that can be used to cleanup the listener.
   */
  registerMutationListener(klass, listener, options) {
    const klassToMutate = this.resolveRegisteredNodeAfterReplacements(this.getRegisteredNode(klass)).klass;
    const mutations = this._listeners.mutation;
    let klassSet = mutations.get(listener);
    if (klassSet === void 0) {
      klassSet = /* @__PURE__ */ new Set();
      mutations.set(listener, klassSet);
    }
    klassSet.add(klassToMutate);
    const skipInitialization = options && options.skipInitialization;
    if (!(skipInitialization === void 0 ? DEFAULT_SKIP_INITIALIZATION : skipInitialization)) {
      this.initializeMutationListener(listener, klassToMutate);
    }
    return () => {
      klassSet.delete(klassToMutate);
      if (klassSet.size === 0) {
        mutations.delete(listener);
      }
    };
  }
  /** @internal */
  getRegisteredNode(klass) {
    const registeredNode = this._nodes.get(klass.getType());
    if (registeredNode === void 0) {
      {
        formatDevErrorMessage(`Node ${klass.name} has not been registered. Ensure node has been passed to createEditor.`);
      }
    }
    return registeredNode;
  }
  /** @internal */
  resolveRegisteredNodeAfterReplacements(registeredNode) {
    while (registeredNode.replaceWithKlass) {
      registeredNode = this.getRegisteredNode(registeredNode.replaceWithKlass);
    }
    return registeredNode;
  }
  /** @internal */
  initializeMutationListener(listener, klass) {
    const prevEditorState = this._editorState;
    const nodeMap = getCachedTypeToNodeMap(prevEditorState).get(klass.getType());
    if (!nodeMap) {
      return;
    }
    const nodeMutationMap = /* @__PURE__ */ new Map();
    for (const k of nodeMap.keys()) {
      nodeMutationMap.set(k, "created");
    }
    if (nodeMutationMap.size > 0) {
      listener(nodeMutationMap, {
        dirtyLeaves: /* @__PURE__ */ new Set(),
        prevEditorState,
        updateTags: /* @__PURE__ */ new Set(["registerMutationListener"])
      });
    }
  }
  /** @internal */
  registerNodeTransformToKlass(klass, listener) {
    const registeredNode = this.getRegisteredNode(klass);
    registeredNode.transforms.add(listener);
    return registeredNode;
  }
  /**
   * Registers a listener that will run when a Lexical node of the provided class is
   * marked dirty during an update. The listener will continue to run as long as the node
   * is marked dirty. There are no guarantees around the order of transform execution!
   *
   * Watch out for infinite loops. See [Node Transforms](https://lexical.dev/docs/concepts/transforms)
   * @param klass - The class of the node that you want to run transforms on.
   * @param listener - The logic you want to run when the node is updated.
   * @returns a teardown function that can be used to cleanup the listener.
   */
  registerNodeTransform(klass, listener) {
    const registeredNode = this.registerNodeTransformToKlass(klass, listener);
    const registeredNodes = [registeredNode];
    const replaceWithKlass = registeredNode.replaceWithKlass;
    if (replaceWithKlass != null) {
      const registeredReplaceWithNode = this.registerNodeTransformToKlass(replaceWithKlass, listener);
      registeredNodes.push(registeredReplaceWithNode);
    }
    markNodesWithTypesAsDirty(this, registeredNodes.map((node) => node.klass.getType()));
    return () => {
      registeredNodes.forEach((node) => node.transforms.delete(listener));
    };
  }
  /**
   * Used to assert that a certain node is registered, usually by plugins to ensure nodes that they
   * depend on have been registered.
   * @returns True if the editor has registered the provided node type, false otherwise.
   */
  hasNode(node) {
    return this._nodes.has(node.getType());
  }
  /**
   * Used to assert that certain nodes are registered, usually by plugins to ensure nodes that they
   * depend on have been registered.
   * @returns True if the editor has registered all of the provided node types, false otherwise.
   */
  hasNodes(nodes) {
    return nodes.every(this.hasNode.bind(this));
  }
  /**
   * Dispatches a command of the specified type with the specified payload.
   * This triggers all command listeners (set by {@link LexicalEditor.registerCommand})
   * for this type, passing them the provided payload. The command listeners
   * will be triggered in an implicit {@link LexicalEditor.update}, unless
   * this was invoked from inside an update in which case that update context
   * will be re-used (as if this was a dollar function itself).
   * @param type - the type of command listeners to trigger.
   * @param payload - the data to pass as an argument to the command listeners.
   */
  dispatchCommand(type, payload) {
    return dispatchCommand(this, type, payload);
  }
  /**
   * Gets a map of all decorators in the editor.
   * @returns A mapping of call decorator keys to their decorated content
   */
  getDecorators() {
    return this._decorators;
  }
  /**
   *
   * @returns the current root element of the editor. If you want to register
   * an event listener, do it via {@link LexicalEditor.registerRootListener}, since
   * this reference may not be stable.
   */
  getRootElement() {
    return this._rootElement;
  }
  /**
   * Gets the key of the editor
   * @returns The editor key
   */
  getKey() {
    return this._key;
  }
  /**
   * Imperatively set the root contenteditable element that Lexical listens
   * for events on.
   */
  setRootElement(nextRootElement) {
    const prevRootElement = this._rootElement;
    if (nextRootElement !== prevRootElement) {
      const classNames = getCachedClassNameArray(this._config.theme, "root");
      const pendingEditorState = this._pendingEditorState || this._editorState;
      this._rootElement = nextRootElement;
      resetEditor(this, prevRootElement, nextRootElement, pendingEditorState);
      if (prevRootElement !== null) {
        if (!this._config.disableEvents) {
          removeRootElementEvents(prevRootElement);
        }
        if (classNames != null) {
          prevRootElement.classList.remove(...classNames);
        }
      }
      if (nextRootElement !== null) {
        const windowObj = getDefaultView(nextRootElement);
        const style = nextRootElement.style;
        style.userSelect = "text";
        style.whiteSpace = "pre-wrap";
        style.wordBreak = "break-word";
        nextRootElement.setAttribute("data-lexical-editor", "true");
        this._window = windowObj;
        this._dirtyType = FULL_RECONCILE;
        initMutationObserver(this);
        this._updateTags.add(HISTORY_MERGE_TAG);
        $commitPendingUpdates(this);
        if (!this._config.disableEvents) {
          addRootElementEvents(nextRootElement, this);
        }
        if (classNames != null) {
          nextRootElement.classList.add(...classNames);
        }
        {
          const nextRootElementParent = nextRootElement.parentElement;
          if (nextRootElementParent != null && ["flex", "inline-flex"].includes(getComputedStyle(nextRootElementParent).display)) {
            console.warn(`When using "display: flex" or "display: inline-flex" on an element containing content editable, Chrome may have unwanted focusing behavior when clicking outside of it. Consider wrapping the content editable within a non-flex element.`);
          }
        }
      } else {
        this._window = null;
        this._updateTags.add(HISTORY_MERGE_TAG);
        $commitPendingUpdates(this);
      }
      triggerListeners("root", this, false, nextRootElement, prevRootElement);
    }
  }
  /**
   * Gets the underlying HTMLElement associated with the LexicalNode for the given key.
   * @returns the HTMLElement rendered by the LexicalNode associated with the key.
   * @param key - the key of the LexicalNode.
   */
  getElementByKey(key) {
    return this._keyToDOMMap.get(key) || null;
  }
  /**
   * Gets the active editor state.
   * @returns The editor state
   */
  getEditorState() {
    return this._editorState;
  }
  /**
   * Imperatively set the EditorState. Triggers reconciliation like an update.
   * @param editorState - the state to set the editor
   * @param options - options for the update.
   */
  setEditorState(editorState, options) {
    if (editorState.isEmpty()) {
      {
        formatDevErrorMessage(`setEditorState: the editor state is empty. Ensure the editor state's root node never becomes empty.`);
      }
    }
    let writableEditorState = editorState;
    if (writableEditorState._readOnly) {
      writableEditorState = cloneEditorState(editorState);
      writableEditorState._selection = editorState._selection ? editorState._selection.clone() : null;
    }
    flushRootMutations(this);
    const pendingEditorState = this._pendingEditorState;
    const tags = this._updateTags;
    const tag = options !== void 0 ? options.tag : null;
    if (pendingEditorState !== null && !pendingEditorState.isEmpty()) {
      if (tag != null) {
        tags.add(tag);
      }
      $commitPendingUpdates(this);
    }
    this._pendingEditorState = writableEditorState;
    this._dirtyType = FULL_RECONCILE;
    this._dirtyElements.set("root", false);
    this._compositionKey = null;
    if (tag != null) {
      tags.add(tag);
    }
    if (!this._updating) {
      $commitPendingUpdates(this);
    }
  }
  /**
   * Parses a SerializedEditorState (usually produced by {@link EditorState.toJSON}) and returns
   * and EditorState object that can be, for example, passed to {@link LexicalEditor.setEditorState}. Typically,
   * deserialization from JSON stored in a database uses this method.
   * @param maybeStringifiedEditorState
   * @param updateFn
   * @returns
   */
  parseEditorState(maybeStringifiedEditorState, updateFn) {
    const serializedEditorState = typeof maybeStringifiedEditorState === "string" ? JSON.parse(maybeStringifiedEditorState) : maybeStringifiedEditorState;
    return parseEditorState(serializedEditorState, this, updateFn);
  }
  /**
   * Executes a read of the editor's state, with the
   * editor context available (useful for exporting and read-only DOM
   * operations). Much like update, but prevents any mutation of the
   * editor's state. Any pending updates will be flushed immediately before
   * the read.
   * @param callbackFn - A function that has access to read-only editor state.
   */
  read(callbackFn) {
    $commitPendingUpdates(this);
    return this.getEditorState().read(callbackFn, {
      editor: this
    });
  }
  /**
   * Executes an update to the editor state. The updateFn callback is the ONLY place
   * where Lexical editor state can be safely mutated.
   * @param updateFn - A function that has access to writable editor state.
   * @param options - A bag of options to control the behavior of the update.
   */
  update(updateFn, options) {
    updateEditor(this, updateFn, options);
  }
  /**
   * Focuses the editor by marking the existing selection as dirty, or by
   * creating a new selection at `defaultSelection` if one does not already
   * exist. If you want to force a specific selection, you should call
   * `root.selectStart()` or `root.selectEnd()` in an update.
   *
   * @param callbackFn - A function to run after the editor is focused.
   * @param options - A bag of options
   */
  focus(callbackFn, options = {}) {
    const rootElement = this._rootElement;
    if (rootElement !== null) {
      rootElement.setAttribute("autocapitalize", "off");
      updateEditorSync(this, () => {
        const selection = $getSelection();
        const root = $getRoot();
        if (selection !== null) {
          if (!selection.dirty) {
            $setSelection(selection.clone());
          }
        } else if (root.getChildrenSize() !== 0) {
          if (options.defaultSelection === "rootStart") {
            root.selectStart();
          } else {
            root.selectEnd();
          }
        }
        $addUpdateTag(FOCUS_TAG);
        $onUpdate(() => {
          rootElement.removeAttribute("autocapitalize");
          if (callbackFn) {
            callbackFn();
          }
        });
      });
      if (this._pendingEditorState === null) {
        rootElement.removeAttribute("autocapitalize");
      }
    }
  }
  /**
   * Removes focus from the editor.
   */
  blur() {
    const rootElement = this._rootElement;
    if (rootElement !== null) {
      rootElement.blur();
    }
    const domSelection = getDOMSelection(this._window);
    if (domSelection !== null) {
      domSelection.removeAllRanges();
    }
  }
  /**
   * Returns true if the editor is editable, false otherwise.
   * @returns True if the editor is editable, false otherwise.
   */
  isEditable() {
    return this._editable;
  }
  /**
   * Sets the editable property of the editor. When false, the
   * editor will not listen for user events on the underling contenteditable.
   * @param editable - the value to set the editable mode to.
   */
  setEditable(editable) {
    if (this._editable !== editable) {
      this._editable = editable;
      triggerListeners("editable", this, true, editable);
    }
  }
  /**
   * Returns a JSON-serializable javascript object NOT a JSON string.
   * You still must call JSON.stringify (or something else) to turn the
   * state into a string you can transfer over the wire and store in a database.
   *
   * See {@link LexicalNode.exportJSON}
   *
   * @returns A JSON-serializable javascript object
   */
  toJSON() {
    return {
      editorState: this._editorState.toJSON()
    };
  }
};
LexicalEditor.version = "0.41.0+dev.esm";
var pendingNodeToClone = null;
function setPendingNodeToClone(pendingNode) {
  pendingNodeToClone = pendingNode;
}
function getPendingNodeToClone() {
  const node = pendingNodeToClone;
  pendingNodeToClone = null;
  return node;
}
var keyCounter = 1;
function resetRandomKey() {
  keyCounter = 1;
}
function generateRandomKey() {
  return "" + keyCounter++;
}
function getRegisteredNodeOrThrow(editor, nodeType) {
  const registeredNode = getRegisteredNode(editor, nodeType);
  if (registeredNode === void 0) {
    {
      formatDevErrorMessage(`registeredNode: Type ${nodeType} not found`);
    }
  }
  return registeredNode;
}
function getRegisteredNode(editor, nodeType) {
  return editor._nodes.get(nodeType);
}
var scheduleMicroTask = typeof queueMicrotask === "function" ? queueMicrotask : (fn) => {
  Promise.resolve().then(fn);
};
function $isSelectionCapturedInDecorator(node) {
  return $isDecoratorNode($getNearestNodeFromDOMNode(node));
}
function isSelectionCapturedInDecoratorInput(anchorDOM) {
  const activeElement = document.activeElement;
  if (!isHTMLElement(activeElement)) {
    return false;
  }
  const nodeName = activeElement.nodeName;
  return $isDecoratorNode($getNearestNodeFromDOMNode(anchorDOM)) && (nodeName === "INPUT" || nodeName === "TEXTAREA" || activeElement.contentEditable === "true" && getEditorPropertyFromDOMNode(activeElement) == null);
}
function isSelectionWithinEditor(editor, anchorDOM, focusDOM) {
  const rootElement = editor.getRootElement();
  try {
    return rootElement !== null && rootElement.contains(anchorDOM) && rootElement.contains(focusDOM) && // Ignore if selection is within nested editor
    anchorDOM !== null && !isSelectionCapturedInDecoratorInput(anchorDOM) && getNearestEditorFromDOMNode(anchorDOM) === editor;
  } catch (_error) {
    return false;
  }
}
function isLexicalEditor(editor) {
  return editor instanceof LexicalEditor;
}
function getNearestEditorFromDOMNode(node) {
  let currentNode = node;
  while (currentNode != null) {
    const editor = getEditorPropertyFromDOMNode(currentNode);
    if (isLexicalEditor(editor)) {
      return editor;
    }
    currentNode = getParentElement(currentNode);
  }
  return null;
}
function getEditorPropertyFromDOMNode(node) {
  return node ? node.__lexicalEditor : null;
}
function getTextDirection(text) {
  if (RTL_REGEX.test(text)) {
    return "rtl";
  }
  if (LTR_REGEX.test(text)) {
    return "ltr";
  }
  return null;
}
function $isTokenOrTab(node) {
  return $isTabNode(node) || node.isToken();
}
function $isTokenOrSegmented(node) {
  return $isTokenOrTab(node) || node.isSegmented();
}
function isDOMTextNode(node) {
  return isDOMNode(node) && node.nodeType === DOM_TEXT_TYPE;
}
function isDOMDocumentNode(node) {
  return isDOMNode(node) && node.nodeType === DOM_DOCUMENT_TYPE;
}
function getDOMTextNode(element) {
  let node = element;
  while (node != null) {
    if (isDOMTextNode(node)) {
      return node;
    }
    node = node.firstChild;
  }
  return null;
}
function toggleTextFormatType(format, type, alignWithFormat) {
  const activeFormat = TEXT_TYPE_TO_FORMAT[type];
  if (alignWithFormat !== null && (format & activeFormat) === (alignWithFormat & activeFormat)) {
    return format;
  }
  let newFormat = format ^ activeFormat;
  if (type === "subscript") {
    newFormat &= ~TEXT_TYPE_TO_FORMAT.superscript;
  } else if (type === "superscript") {
    newFormat &= ~TEXT_TYPE_TO_FORMAT.subscript;
  } else if (type === "lowercase") {
    newFormat &= ~TEXT_TYPE_TO_FORMAT.uppercase;
    newFormat &= ~TEXT_TYPE_TO_FORMAT.capitalize;
  } else if (type === "uppercase") {
    newFormat &= ~TEXT_TYPE_TO_FORMAT.lowercase;
    newFormat &= ~TEXT_TYPE_TO_FORMAT.capitalize;
  } else if (type === "capitalize") {
    newFormat &= ~TEXT_TYPE_TO_FORMAT.lowercase;
    newFormat &= ~TEXT_TYPE_TO_FORMAT.uppercase;
  }
  return newFormat;
}
function $isLeafNode(node) {
  return $isTextNode(node) || $isLineBreakNode(node) || $isDecoratorNode(node);
}
function $setNodeKey(node, existingKey) {
  const pendingNode = getPendingNodeToClone();
  existingKey = existingKey || pendingNode && pendingNode.__key;
  if (existingKey != null) {
    {
      errorOnNodeKeyConstructorMismatch(node, existingKey, pendingNode);
    }
    node.__key = existingKey;
    return;
  }
  errorOnReadOnly();
  errorOnInfiniteTransforms();
  const editor = getActiveEditor();
  const editorState = getActiveEditorState();
  const key = generateRandomKey();
  editorState._nodeMap.set(key, node);
  if ($isElementNode(node)) {
    editor._dirtyElements.set(key, true);
  } else {
    editor._dirtyLeaves.add(key);
  }
  editor._cloneNotNeeded.add(key);
  editor._dirtyType = HAS_DIRTY_NODES;
  node.__key = key;
}
function errorOnNodeKeyConstructorMismatch(node, existingKey, pendingNode) {
  const editorState = internalGetActiveEditorState();
  if (!editorState) {
    return;
  }
  const existingNode = editorState._nodeMap.get(existingKey);
  if (pendingNode) {
    if (!(existingKey === pendingNode.__key)) {
      formatDevErrorMessage(`Lexical node with constructor ${node.constructor.name} (type ${node.getType()}) has an incorrect clone implementation, got ${String(existingKey)} for nodeKey when expecting ${pendingNode.__key}`);
    }
  }
  if (existingNode && existingNode.constructor !== node.constructor) {
    if (node.constructor.name !== existingNode.constructor.name) {
      {
        formatDevErrorMessage(`Lexical node with constructor ${node.constructor.name} attempted to re-use key from node in active editor state with constructor ${existingNode.constructor.name}. Keys must not be re-used when the type is changed.`);
      }
    } else {
      {
        formatDevErrorMessage(`Lexical node with constructor ${node.constructor.name} attempted to re-use key from node in active editor state with different constructor with the same name (possibly due to invalid Hot Module Replacement). Keys must not be re-used when the type is changed.`);
      }
    }
  }
}
function internalMarkParentElementsAsDirty(parentKey, nodeMap, dirtyElements) {
  let nextParentKey = parentKey;
  while (nextParentKey !== null) {
    if (dirtyElements.has(nextParentKey)) {
      return;
    }
    const node = nodeMap.get(nextParentKey);
    if (node === void 0) {
      break;
    }
    dirtyElements.set(nextParentKey, false);
    nextParentKey = node.__parent;
  }
}
function removeFromParent(node) {
  const oldParent = node.getParent();
  if (oldParent !== null) {
    const writableNode = node.getWritable();
    const writableParent = oldParent.getWritable();
    const prevSibling = node.getPreviousSibling();
    const nextSibling = node.getNextSibling();
    const nextSiblingKey = nextSibling !== null ? nextSibling.__key : null;
    const prevSiblingKey = prevSibling !== null ? prevSibling.__key : null;
    const writablePrevSibling = prevSibling !== null ? prevSibling.getWritable() : null;
    const writableNextSibling = nextSibling !== null ? nextSibling.getWritable() : null;
    if (prevSibling === null) {
      writableParent.__first = nextSiblingKey;
    }
    if (nextSibling === null) {
      writableParent.__last = prevSiblingKey;
    }
    if (writablePrevSibling !== null) {
      writablePrevSibling.__next = nextSiblingKey;
    }
    if (writableNextSibling !== null) {
      writableNextSibling.__prev = prevSiblingKey;
    }
    writableNode.__prev = null;
    writableNode.__next = null;
    writableNode.__parent = null;
    writableParent.__size--;
  }
}
function internalMarkNodeAsDirty(node) {
  errorOnInfiniteTransforms();
  if (!!$isEphemeral(node)) {
    formatDevErrorMessage(`internalMarkNodeAsDirty: Ephemeral nodes must not be marked as dirty (key ${node.__key} type ${node.__type})`);
  }
  const latest = node.getLatest();
  const parent = latest.__parent;
  const editorState = getActiveEditorState();
  const editor = getActiveEditor();
  const nodeMap = editorState._nodeMap;
  const dirtyElements = editor._dirtyElements;
  if (parent !== null) {
    internalMarkParentElementsAsDirty(parent, nodeMap, dirtyElements);
  }
  const key = latest.__key;
  editor._dirtyType = HAS_DIRTY_NODES;
  if ($isElementNode(node)) {
    dirtyElements.set(key, true);
  } else {
    editor._dirtyLeaves.add(key);
  }
}
function internalMarkSiblingsAsDirty(node) {
  const previousNode = node.getPreviousSibling();
  const nextNode = node.getNextSibling();
  if (previousNode !== null) {
    internalMarkNodeAsDirty(previousNode);
  }
  if (nextNode !== null) {
    internalMarkNodeAsDirty(nextNode);
  }
}
function $setCompositionKey(compositionKey) {
  errorOnReadOnly();
  const editor = getActiveEditor();
  const previousCompositionKey = editor._compositionKey;
  if (compositionKey !== previousCompositionKey) {
    editor._compositionKey = compositionKey;
    if (previousCompositionKey !== null) {
      const node = $getNodeByKey(previousCompositionKey);
      if (node !== null) {
        node.getWritable();
      }
    }
    if (compositionKey !== null) {
      const node = $getNodeByKey(compositionKey);
      if (node !== null) {
        node.getWritable();
      }
    }
  }
}
function $getCompositionKey() {
  if (isCurrentlyReadOnlyMode()) {
    return null;
  }
  const editor = getActiveEditor();
  return editor._compositionKey;
}
function $getNodeByKey(key, _editorState) {
  const editorState = _editorState || getActiveEditorState();
  const node = editorState._nodeMap.get(key);
  if (node === void 0) {
    return null;
  }
  return node;
}
function $getNodeFromDOMNode(dom, editorState) {
  const editor = getActiveEditor();
  const key = getNodeKeyFromDOMNode(dom, editor);
  if (key !== void 0) {
    return $getNodeByKey(key, editorState);
  }
  return null;
}
function setNodeKeyOnDOMNode(dom, editor, key) {
  const prop = `__lexicalKey_${editor._key}`;
  dom[prop] = key;
}
function getNodeKeyFromDOMNode(dom, editor) {
  const prop = `__lexicalKey_${editor._key}`;
  return dom[prop];
}
function $getNearestNodeFromDOMNode(startingDOM, editorState) {
  let dom = startingDOM;
  while (dom != null) {
    const node = $getNodeFromDOMNode(dom, editorState);
    if (node !== null) {
      return node;
    }
    dom = getParentElement(dom);
  }
  return null;
}
function cloneDecorators(editor) {
  const currentDecorators = editor._decorators;
  const pendingDecorators = Object.assign({}, currentDecorators);
  editor._pendingDecorators = pendingDecorators;
  return pendingDecorators;
}
function getEditorStateTextContent(editorState) {
  return editorState.read(() => $getRoot().getTextContent());
}
function markNodesWithTypesAsDirty(editor, types) {
  const cachedMap = getCachedTypeToNodeMap(editor.getEditorState());
  const dirtyNodeMaps = [];
  for (const type of types) {
    const nodeMap = cachedMap.get(type);
    if (nodeMap) {
      dirtyNodeMaps.push(nodeMap);
    }
  }
  if (dirtyNodeMaps.length === 0) {
    return;
  }
  editor.update(() => {
    for (const nodeMap of dirtyNodeMaps) {
      for (const nodeKey of nodeMap.keys()) {
        const latest = $getNodeByKey(nodeKey);
        if (latest) {
          latest.markDirty();
        }
      }
    }
  }, editor._pendingEditorState === null ? {
    tag: HISTORY_MERGE_TAG
  } : void 0);
}
function $getRoot() {
  return internalGetRoot(getActiveEditorState());
}
function internalGetRoot(editorState) {
  return editorState._nodeMap.get("root");
}
function $setSelection(selection) {
  errorOnReadOnly();
  const editorState = getActiveEditorState();
  if (selection !== null) {
    {
      if (Object.isFrozen(selection)) {
        {
          formatDevErrorMessage(`$setSelection called on frozen selection object. Ensure selection is cloned before passing in.`);
        }
      }
    }
    selection.dirty = true;
    selection.setCachedNodes(null);
  }
  editorState._selection = selection;
}
function $flushMutations() {
  errorOnReadOnly();
  const editor = getActiveEditor();
  flushRootMutations(editor);
}
function $getNodeFromDOM(dom) {
  const editor = getActiveEditor();
  const nodeKey = getNodeKeyFromDOMTree(dom, editor);
  if (nodeKey === null) {
    const rootElement = editor.getRootElement();
    if (dom === rootElement) {
      return $getNodeByKey("root");
    }
    return null;
  }
  return $getNodeByKey(nodeKey);
}
function getNodeKeyFromDOMTree(dom, editor) {
  let node = dom;
  while (node != null) {
    const key = getNodeKeyFromDOMNode(node, editor);
    if (key !== void 0) {
      return key;
    }
    node = getParentElement(node);
  }
  return null;
}
function doesContainSurrogatePair(str) {
  return /[\uD800-\uDBFF][\uDC00-\uDFFF]/g.test(str);
}
function getEditorsToPropagate(editor) {
  const editorsToPropagate = [];
  let currentEditor = editor;
  while (currentEditor !== null) {
    editorsToPropagate.push(currentEditor);
    currentEditor = currentEditor._parentEditor;
  }
  return editorsToPropagate;
}
function createUID() {
  return Math.random().toString(36).replace(/[^a-z]+/g, "").substring(0, 5);
}
function getAnchorTextFromDOM(anchorNode) {
  return isDOMTextNode(anchorNode) ? anchorNode.nodeValue : null;
}
function $updateSelectedTextFromDOM(isCompositionEnd, editor, data) {
  const domSelection = getDOMSelection(getWindow(editor));
  if (domSelection === null) {
    return;
  }
  const anchorNode = domSelection.anchorNode;
  let {
    anchorOffset,
    focusOffset
  } = domSelection;
  if (anchorNode !== null) {
    let textContent = getAnchorTextFromDOM(anchorNode);
    const node = $getNearestNodeFromDOMNode(anchorNode);
    if (textContent !== null && $isTextNode(node)) {
      if ((textContent === COMPOSITION_SUFFIX || textContent === COMPOSITION_START_CHAR) && data) {
        const offset = data.length;
        textContent = data;
        anchorOffset = offset;
        focusOffset = offset;
      }
      if (textContent !== null) {
        $updateTextNodeFromDOMContent(node, textContent, anchorOffset, focusOffset, isCompositionEnd);
      }
    }
  }
}
function $updateTextNodeFromDOMContent(textNode, textContent, anchorOffset, focusOffset, compositionEnd) {
  let node = textNode;
  if (node.isAttached() && (compositionEnd || !node.isDirty())) {
    const isComposing = node.isComposing();
    let normalizedTextContent = textContent;
    if (isComposing || compositionEnd) {
      if (textContent.endsWith(COMPOSITION_SUFFIX)) {
        normalizedTextContent = textContent.slice(0, -COMPOSITION_SUFFIX.length);
      }
      if (compositionEnd) {
        const char = COMPOSITION_START_CHAR;
        let index;
        while ((index = normalizedTextContent.indexOf(char)) !== -1) {
          normalizedTextContent = normalizedTextContent.slice(0, index) + normalizedTextContent.slice(index + char.length);
          if (anchorOffset !== null && anchorOffset > index) {
            anchorOffset = Math.max(index, anchorOffset - char.length);
          }
          if (focusOffset !== null && focusOffset > index) {
            focusOffset = Math.max(index, focusOffset - char.length);
          }
        }
      }
    }
    const prevTextContent = node.getTextContent();
    if (compositionEnd || normalizedTextContent !== prevTextContent) {
      if (normalizedTextContent === "") {
        $setCompositionKey(null);
        if (!IS_SAFARI && !IS_IOS && !IS_APPLE_WEBKIT) {
          const editor = getActiveEditor();
          setTimeout(() => {
            editor.update(() => {
              if (node.isAttached()) {
                node.remove();
              }
            });
          }, 20);
        } else {
          node.remove();
        }
        return;
      }
      const parent = node.getParent();
      const prevSelection = $getPreviousSelection();
      const prevTextContentSize = node.getTextContentSize();
      const compositionKey = $getCompositionKey();
      const nodeKey = node.getKey();
      if (node.isToken() || compositionKey !== null && nodeKey === compositionKey && !isComposing || // Check if character was added at the start or boundaries when not insertable, and we need
      // to clear this input from occurring as that action wasn't permitted.
      $isRangeSelection(prevSelection) && (parent !== null && !parent.canInsertTextBefore() && prevSelection.anchor.offset === 0 || prevSelection.anchor.key === textNode.__key && prevSelection.anchor.offset === 0 && !node.canInsertTextBefore() && !isComposing || prevSelection.focus.key === textNode.__key && prevSelection.focus.offset === prevTextContentSize && !node.canInsertTextAfter() && !isComposing)) {
        node.markDirty();
        return;
      }
      const selection = $getSelection();
      if (!$isRangeSelection(selection) || anchorOffset === null || focusOffset === null) {
        $setTextContentWithSelection(node, normalizedTextContent, selection);
        return;
      }
      selection.setTextNodeRange(node, anchorOffset, node, focusOffset);
      if (node.isSegmented()) {
        const originalTextContent = node.getTextContent();
        const replacement = $createTextNode(originalTextContent);
        node.replace(replacement);
        node = replacement;
      }
      $setTextContentWithSelection(node, normalizedTextContent, selection);
    }
  }
}
function $setTextContentWithSelection(node, textContent, selection) {
  node.setTextContent(textContent);
  if ($isRangeSelection(selection)) {
    const key = node.getKey();
    for (const k of ["anchor", "focus"]) {
      const pt = selection[k];
      if (pt.type === "text" && pt.key === key) {
        pt.offset = $getTextNodeOffset(node, pt.offset, "clamp");
      }
    }
  }
}
function $previousSiblingDoesNotAcceptText(node) {
  const previousSibling = node.getPreviousSibling();
  return ($isTextNode(previousSibling) || $isElementNode(previousSibling) && previousSibling.isInline()) && !previousSibling.canInsertTextAfter();
}
function $shouldInsertTextAfterOrBeforeTextNode(selection, node) {
  if (node.isSegmented()) {
    return true;
  }
  if (!selection.isCollapsed()) {
    return false;
  }
  const offset = selection.anchor.offset;
  const parent = node.getParentOrThrow();
  const isToken = $isTokenOrTab(node);
  if (offset === 0) {
    return !node.canInsertTextBefore() || !parent.canInsertTextBefore() && !node.isComposing() || isToken || $previousSiblingDoesNotAcceptText(node);
  } else if (offset === node.getTextContentSize()) {
    return !node.canInsertTextAfter() || !parent.canInsertTextAfter() && !node.isComposing() || isToken;
  } else {
    return false;
  }
}
function matchModifier(event, mask, prop) {
  const expected = mask[prop] || false;
  return expected === "any" || expected === event[prop];
}
function isModifierMatch(event, mask) {
  return matchModifier(event, mask, "altKey") && matchModifier(event, mask, "ctrlKey") && matchModifier(event, mask, "shiftKey") && matchModifier(event, mask, "metaKey");
}
function isExactShortcutMatch(event, expectedKey, mask) {
  if (!isModifierMatch(event, mask)) {
    return false;
  }
  if (event.key.toLowerCase() === expectedKey.toLowerCase()) {
    return true;
  }
  if (expectedKey.length > 1) {
    return false;
  }
  if (event.key.length === 1 && event.key.charCodeAt(0) <= 127) {
    return false;
  }
  const expectedCode = "Key" + expectedKey.toUpperCase();
  return event.code === expectedCode;
}
var CONTROL_OR_META = {
  ctrlKey: !IS_APPLE,
  metaKey: IS_APPLE
};
var CONTROL_OR_ALT = {
  altKey: IS_APPLE,
  ctrlKey: !IS_APPLE
};
function isTab(event) {
  return isExactShortcutMatch(event, "Tab", {
    shiftKey: "any"
  });
}
function isBold(event) {
  return isExactShortcutMatch(event, "b", CONTROL_OR_META);
}
function isItalic(event) {
  return isExactShortcutMatch(event, "i", CONTROL_OR_META);
}
function isUnderline(event) {
  return isExactShortcutMatch(event, "u", CONTROL_OR_META);
}
function isParagraph(event) {
  return isExactShortcutMatch(event, "Enter", {
    altKey: "any",
    ctrlKey: "any",
    metaKey: "any"
  });
}
function isLineBreak(event) {
  return isExactShortcutMatch(event, "Enter", {
    altKey: "any",
    ctrlKey: "any",
    metaKey: "any",
    shiftKey: true
  });
}
function isOpenLineBreak(event) {
  return IS_APPLE && isExactShortcutMatch(event, "o", {
    ctrlKey: true
  });
}
function isDeleteWordBackward(event) {
  return isExactShortcutMatch(event, "Backspace", CONTROL_OR_ALT);
}
function isDeleteWordForward(event) {
  return isExactShortcutMatch(event, "Delete", CONTROL_OR_ALT);
}
function isDeleteLineBackward(event) {
  return IS_APPLE && isExactShortcutMatch(event, "Backspace", {
    metaKey: true
  });
}
function isDeleteLineForward(event) {
  return IS_APPLE && (isExactShortcutMatch(event, "Delete", {
    metaKey: true
  }) || isExactShortcutMatch(event, "k", {
    ctrlKey: true
  }));
}
function isDeleteBackward(event) {
  return isExactShortcutMatch(event, "Backspace", {
    shiftKey: "any"
  }) || IS_APPLE && isExactShortcutMatch(event, "h", {
    ctrlKey: true
  });
}
function isDeleteForward(event) {
  return isExactShortcutMatch(event, "Delete", {}) || IS_APPLE && isExactShortcutMatch(event, "d", {
    ctrlKey: true
  });
}
function isUndo(event) {
  return isExactShortcutMatch(event, "z", CONTROL_OR_META);
}
function isRedo(event) {
  if (IS_APPLE) {
    return isExactShortcutMatch(event, "z", {
      metaKey: true,
      shiftKey: true
    });
  }
  return isExactShortcutMatch(event, "y", {
    ctrlKey: true
  }) || isExactShortcutMatch(event, "z", {
    ctrlKey: true,
    shiftKey: true
  });
}
function isCopy(event) {
  return isExactShortcutMatch(event, "c", CONTROL_OR_META);
}
function isCut(event) {
  return isExactShortcutMatch(event, "x", CONTROL_OR_META);
}
function isMoveBackward(event) {
  return isExactShortcutMatch(event, "ArrowLeft", {
    shiftKey: "any"
  });
}
function isMoveToStart(event) {
  return isExactShortcutMatch(event, "ArrowLeft", CONTROL_OR_META);
}
function isMoveForward(event) {
  return isExactShortcutMatch(event, "ArrowRight", {
    shiftKey: "any"
  });
}
function isMoveToEnd(event) {
  return isExactShortcutMatch(event, "ArrowRight", CONTROL_OR_META);
}
function isMoveUp(event) {
  return isExactShortcutMatch(event, "ArrowUp", {
    altKey: "any",
    shiftKey: "any"
  });
}
function isMoveDown(event) {
  return isExactShortcutMatch(event, "ArrowDown", {
    altKey: "any",
    shiftKey: "any"
  });
}
function isModifier(event) {
  return event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
}
function isSpace(event) {
  return event.key === " ";
}
function isBackspace(event) {
  return event.key === "Backspace";
}
function isEscape(event) {
  return event.key === "Escape";
}
function isDelete(event) {
  return event.key === "Delete";
}
function isSelectAll(event) {
  return isExactShortcutMatch(event, "a", CONTROL_OR_META);
}
function $selectAll(selection) {
  const root = $getRoot();
  if ($isRangeSelection(selection)) {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = anchor.getNode();
    const topParent = anchorNode.getTopLevelElementOrThrow();
    const rootNode = topParent.getParentOrThrow();
    anchor.set(rootNode.getKey(), 0, "element");
    focus.set(rootNode.getKey(), rootNode.getChildrenSize(), "element");
    $normalizeSelection(selection);
    return selection;
  } else {
    const newSelection = root.select(0, root.getChildrenSize());
    $setSelection($normalizeSelection(newSelection));
    return newSelection;
  }
}
function getCachedClassNameArray(classNamesTheme, classNameThemeType) {
  if (classNamesTheme.__lexicalClassNameCache === void 0) {
    classNamesTheme.__lexicalClassNameCache = {};
  }
  const classNamesCache = classNamesTheme.__lexicalClassNameCache;
  const cachedClassNames = classNamesCache[classNameThemeType];
  if (cachedClassNames !== void 0) {
    return cachedClassNames;
  }
  const classNames = classNamesTheme[classNameThemeType];
  if (typeof classNames === "string") {
    const classNamesArr = normalizeClassNames(classNames);
    classNamesCache[classNameThemeType] = classNamesArr;
    return classNamesArr;
  }
  return classNames;
}
function setMutatedNode(mutatedNodes2, registeredNodes, mutationListeners, node, mutation) {
  if (mutationListeners.size === 0) {
    return;
  }
  const nodeType = node.__type;
  const nodeKey = node.__key;
  const registeredNode = registeredNodes.get(nodeType);
  if (registeredNode === void 0) {
    {
      formatDevErrorMessage(`Type ${nodeType} not in registeredNodes`);
    }
  }
  const klass = registeredNode.klass;
  let mutatedNodesByType = mutatedNodes2.get(klass);
  if (mutatedNodesByType === void 0) {
    mutatedNodesByType = /* @__PURE__ */ new Map();
    mutatedNodes2.set(klass, mutatedNodesByType);
  }
  const prevMutation = mutatedNodesByType.get(nodeKey);
  const isMove = prevMutation === "destroyed" && mutation === "created";
  if (prevMutation === void 0 || isMove) {
    mutatedNodesByType.set(nodeKey, isMove ? "updated" : mutation);
  }
}
function $nodesOfType(klass) {
  const klassType = klass.getType();
  const editorState = getActiveEditorState();
  if (editorState._readOnly) {
    const nodes2 = getCachedTypeToNodeMap(editorState).get(klassType);
    return nodes2 ? Array.from(nodes2.values()) : [];
  }
  const nodes = editorState._nodeMap;
  const nodesOfType = [];
  for (const [, node] of nodes) {
    if (node instanceof klass && node.__type === klassType && node.isAttached()) {
      nodesOfType.push(node);
    }
  }
  return nodesOfType;
}
function resolveElement(element, isBackward, focusOffset) {
  const parent = element.getParent();
  let offset = focusOffset;
  let block = element;
  if (parent !== null) {
    if (isBackward && focusOffset === 0) {
      offset = block.getIndexWithinParent();
      block = parent;
    } else if (!isBackward && focusOffset === block.getChildrenSize()) {
      offset = block.getIndexWithinParent() + 1;
      block = parent;
    }
  }
  return block.getChildAtIndex(isBackward ? offset - 1 : offset);
}
function $getAdjacentNode(focus, isBackward) {
  const focusOffset = focus.offset;
  if (focus.type === "element") {
    const block = focus.getNode();
    return resolveElement(block, isBackward, focusOffset);
  } else {
    const focusNode = focus.getNode();
    if (isBackward && focusOffset === 0 || !isBackward && focusOffset === focusNode.getTextContentSize()) {
      const possibleNode = isBackward ? focusNode.getPreviousSibling() : focusNode.getNextSibling();
      if (possibleNode === null) {
        return resolveElement(focusNode.getParentOrThrow(), isBackward, focusNode.getIndexWithinParent() + (isBackward ? 0 : 1));
      }
      return possibleNode;
    }
  }
  return null;
}
function isFirefoxClipboardEvents(editor) {
  const event = getWindow(editor).event;
  const inputType = event && event.inputType;
  return inputType === "insertFromPaste" || inputType === "insertFromPasteAsQuotation";
}
function dispatchCommand(editor, command, payload) {
  return triggerCommandListeners(editor, command, payload);
}
function getElementByKeyOrThrow(editor, key) {
  const element = editor._keyToDOMMap.get(key);
  if (element === void 0) {
    {
      formatDevErrorMessage(`Reconciliation: could not find DOM element for node key ${key}`);
    }
  }
  return element;
}
function getParentElement(node) {
  const parentElement = node.assignedSlot || node.parentElement;
  return isDocumentFragment(parentElement) ? parentElement.host : parentElement;
}
function getDOMOwnerDocument(target) {
  return isDOMDocumentNode(target) ? target : isHTMLElement(target) ? target.ownerDocument : null;
}
function scrollIntoViewIfNeeded(editor, selectionRect, rootElement) {
  const doc = getDOMOwnerDocument(rootElement);
  const defaultView = getDefaultView(doc);
  if (doc === null || defaultView === null) {
    return;
  }
  let {
    top: currentTop,
    bottom: currentBottom
  } = selectionRect;
  let targetTop = 0;
  let targetBottom = 0;
  let element = rootElement;
  while (element !== null) {
    const isBodyElement = element === doc.body;
    if (isBodyElement) {
      targetTop = 0;
      targetBottom = getWindow(editor).innerHeight;
    } else {
      const targetRect = element.getBoundingClientRect();
      targetTop = targetRect.top;
      targetBottom = targetRect.bottom;
    }
    let diff = 0;
    if (currentTop < targetTop) {
      diff = -(targetTop - currentTop);
    } else if (currentBottom > targetBottom) {
      diff = currentBottom - targetBottom;
    }
    if (diff !== 0) {
      if (isBodyElement) {
        defaultView.scrollBy(0, diff);
      } else {
        const scrollTop = element.scrollTop;
        element.scrollTop += diff;
        const yOffset = element.scrollTop - scrollTop;
        currentTop -= yOffset;
        currentBottom -= yOffset;
      }
    }
    if (isBodyElement) {
      break;
    }
    element = getParentElement(element);
  }
}
function $hasUpdateTag(tag) {
  const editor = getActiveEditor();
  return editor._updateTags.has(tag);
}
function $addUpdateTag(tag) {
  errorOnReadOnly();
  const editor = getActiveEditor();
  editor._updateTags.add(tag);
}
function $onUpdate(updateFn) {
  errorOnReadOnly();
  const editor = getActiveEditor();
  editor._deferred.push(updateFn);
}
function $maybeMoveChildrenSelectionToParent(parentNode) {
  const selection = $getSelection();
  if (!$isRangeSelection(selection) || !$isElementNode(parentNode)) {
    return selection;
  }
  const {
    anchor,
    focus
  } = selection;
  const anchorNode = anchor.getNode();
  const focusNode = focus.getNode();
  if ($hasAncestor(anchorNode, parentNode)) {
    anchor.set(parentNode.__key, 0, "element");
  }
  if ($hasAncestor(focusNode, parentNode)) {
    focus.set(parentNode.__key, 0, "element");
  }
  return selection;
}
function $hasAncestor(child, targetNode) {
  let parent = child.getParent();
  while (parent !== null) {
    if (parent.is(targetNode)) {
      return true;
    }
    parent = parent.getParent();
  }
  return false;
}
function getDefaultView(domElem) {
  const ownerDoc = getDOMOwnerDocument(domElem);
  return ownerDoc ? ownerDoc.defaultView : null;
}
function getWindow(editor) {
  const windowObj = editor._window;
  if (windowObj === null) {
    {
      formatDevErrorMessage(`window object not found`);
    }
  }
  return windowObj;
}
function $isInlineElementOrDecoratorNode(node) {
  return $isElementNode(node) && node.isInline() || $isDecoratorNode(node) && node.isInline();
}
function $getNearestRootOrShadowRoot(node) {
  let parent = node.getParentOrThrow();
  while (parent !== null) {
    if ($isRootOrShadowRoot(parent)) {
      return parent;
    }
    parent = parent.getParentOrThrow();
  }
  return parent;
}
function $isRootOrShadowRoot(node) {
  return $isRootNode(node) || $isElementNode(node) && node.isShadowRoot();
}
function $copyNode(node) {
  const copy = node.constructor.clone(node);
  $setNodeKey(copy, null);
  copy.afterCloneFrom(node);
  return copy;
}
function $applyNodeReplacement(node) {
  const editor = getActiveEditor();
  const nodeType = node.getType();
  const registeredNode = getRegisteredNode(editor, nodeType);
  if (!(registeredNode !== void 0)) {
    formatDevErrorMessage(`$applyNodeReplacement node ${node.constructor.name} with type ${nodeType} must be registered to the editor. You can do this by passing the node class via the "nodes" array in the editor config.`);
  }
  const {
    replace,
    replaceWithKlass
  } = registeredNode;
  if (replace !== null) {
    const replacementNode = replace(node);
    const replacementNodeKlass = replacementNode.constructor;
    if (replaceWithKlass !== null) {
      if (!(replacementNode instanceof replaceWithKlass)) {
        formatDevErrorMessage(`$applyNodeReplacement failed. Expected replacement node to be an instance of ${replaceWithKlass.name} with type ${replaceWithKlass.getType()} but returned ${replacementNodeKlass.name} with type ${replacementNodeKlass.getType()} from original node ${node.constructor.name} with type ${nodeType}`);
      }
    } else {
      if (!(replacementNode instanceof node.constructor && replacementNodeKlass !== node.constructor)) {
        formatDevErrorMessage(`$applyNodeReplacement failed. Ensure replacement node ${replacementNodeKlass.name} with type ${replacementNodeKlass.getType()} is a subclass of the original node ${node.constructor.name} with type ${nodeType}.`);
      }
    }
    if (!(replacementNode.__key !== node.__key)) {
      formatDevErrorMessage(`$applyNodeReplacement failed. Ensure that the key argument is *not* used in your replace function (from node ${node.constructor.name} with type ${nodeType} to node ${replacementNodeKlass.name} with type ${replacementNodeKlass.getType()}), Node keys must never be re-used except by the static clone method.`);
    }
    return replacementNode;
  }
  return node;
}
function errorOnInsertTextNodeOnRoot(node, insertNode) {
  const parentNode = node.getParent();
  if ($isRootNode(parentNode) && !$isElementNode(insertNode) && !$isDecoratorNode(insertNode)) {
    {
      formatDevErrorMessage(`Only element or decorator nodes can be inserted in to the root node`);
    }
  }
}
function $getNodeByKeyOrThrow(key) {
  const node = $getNodeByKey(key);
  if (node === null) {
    {
      formatDevErrorMessage(`Expected node with key ${key} to exist but it's not in the nodeMap.`);
    }
  }
  return node;
}
function createBlockCursorElement(editorConfig) {
  const theme = editorConfig.theme;
  const element = document.createElement("div");
  element.contentEditable = "false";
  element.setAttribute("data-lexical-cursor", "true");
  let blockCursorTheme = theme.blockCursor;
  if (blockCursorTheme !== void 0) {
    if (typeof blockCursorTheme === "string") {
      const classNamesArr = normalizeClassNames(blockCursorTheme);
      blockCursorTheme = theme.blockCursor = classNamesArr;
    }
    if (blockCursorTheme !== void 0) {
      element.classList.add(...blockCursorTheme);
    }
  }
  return element;
}
function needsBlockCursor(node) {
  return ($isDecoratorNode(node) || $isElementNode(node) && !node.canBeEmpty()) && !node.isInline();
}
function removeDOMBlockCursorElement(blockCursorElement, editor, rootElement) {
  rootElement.style.removeProperty("caret-color");
  editor._blockCursorElement = null;
  const parentElement = blockCursorElement.parentElement;
  if (parentElement !== null) {
    parentElement.removeChild(blockCursorElement);
  }
}
function updateDOMBlockCursorElement(editor, rootElement, nextSelection) {
  let blockCursorElement = editor._blockCursorElement;
  if ($isRangeSelection(nextSelection) && nextSelection.isCollapsed() && nextSelection.anchor.type === "element" && rootElement.contains(document.activeElement)) {
    const anchor = nextSelection.anchor;
    const elementNode = anchor.getNode();
    const offset = anchor.offset;
    const elementNodeSize = elementNode.getChildrenSize();
    let isBlockCursor = false;
    let insertBeforeElement = null;
    if (offset === elementNodeSize) {
      const child = elementNode.getChildAtIndex(offset - 1);
      if (needsBlockCursor(child)) {
        isBlockCursor = true;
      }
    } else {
      const child = elementNode.getChildAtIndex(offset);
      if (child !== null && needsBlockCursor(child)) {
        const sibling = child.getPreviousSibling();
        if (sibling === null || needsBlockCursor(sibling)) {
          isBlockCursor = true;
          insertBeforeElement = editor.getElementByKey(child.__key);
        }
      }
    }
    if (isBlockCursor) {
      const elementDOM = editor.getElementByKey(elementNode.__key);
      if (blockCursorElement === null) {
        editor._blockCursorElement = blockCursorElement = createBlockCursorElement(editor._config);
      }
      rootElement.style.caretColor = "transparent";
      if (insertBeforeElement === null) {
        elementDOM.appendChild(blockCursorElement);
      } else {
        elementDOM.insertBefore(blockCursorElement, insertBeforeElement);
      }
      return;
    }
  }
  if (blockCursorElement !== null) {
    removeDOMBlockCursorElement(blockCursorElement, editor, rootElement);
  }
}
function getDOMSelection(targetWindow) {
  return !CAN_USE_DOM ? null : (targetWindow || window).getSelection();
}
function getDOMSelectionFromTarget(eventTarget) {
  const defaultView = getDefaultView(eventTarget);
  return defaultView ? defaultView.getSelection() : null;
}
function $splitNode(node, offset) {
  let startNode = node.getChildAtIndex(offset);
  if (startNode == null) {
    startNode = node;
  }
  if (!!$isRootOrShadowRoot(node)) {
    formatDevErrorMessage(`Can not call $splitNode() on root element`);
  }
  const recurse = (currentNode) => {
    const parent = currentNode.getParentOrThrow();
    const isParentRoot = $isRootOrShadowRoot(parent);
    const nodeToMove = currentNode === startNode && !isParentRoot ? currentNode : $copyNode(currentNode);
    if (isParentRoot) {
      if (!($isElementNode(currentNode) && $isElementNode(nodeToMove))) {
        formatDevErrorMessage(`Children of a root must be ElementNode`);
      }
      currentNode.insertAfter(nodeToMove);
      return [currentNode, nodeToMove, nodeToMove];
    } else {
      const [leftTree2, rightTree2, newParent] = recurse(parent);
      const nextSiblings = currentNode.getNextSiblings();
      newParent.append(nodeToMove, ...nextSiblings);
      return [leftTree2, rightTree2, nodeToMove];
    }
  };
  const [leftTree, rightTree] = recurse(startNode);
  return [leftTree, rightTree];
}
function isHTMLAnchorElement(x) {
  return isHTMLElement(x) && x.tagName === "A";
}
function isHTMLElement(x) {
  return isDOMNode(x) && x.nodeType === DOM_ELEMENT_TYPE;
}
function isDOMNode(x) {
  return typeof x === "object" && x !== null && "nodeType" in x && typeof x.nodeType === "number";
}
function isDocumentFragment(x) {
  return isDOMNode(x) && x.nodeType === DOM_DOCUMENT_FRAGMENT_TYPE;
}
function isInlineDomNode(node) {
  const inlineNodes = new RegExp(/^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|mark|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var|#text)$/, "i");
  return node.nodeName.match(inlineNodes) !== null;
}
function isBlockDomNode(node) {
  const blockNodes = new RegExp(/^(address|article|aside|blockquote|canvas|dd|div|dl|dt|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hr|li|main|nav|noscript|ol|p|pre|section|table|td|tfoot|ul|video)$/, "i");
  return node.nodeName.match(blockNodes) !== null;
}
function INTERNAL_$isBlock(node) {
  if ($isDecoratorNode(node) && !node.isInline()) {
    return true;
  }
  if (!$isElementNode(node) || $isRootOrShadowRoot(node)) {
    return false;
  }
  const firstChild = node.getFirstChild();
  const isLeafElement = firstChild === null || $isLineBreakNode(firstChild) || $isTextNode(firstChild) || firstChild.isInline();
  return !node.isInline() && node.canBeEmpty() !== false && isLeafElement;
}
function $getEditor() {
  return getActiveEditor();
}
var cachedNodeMaps = /* @__PURE__ */ new WeakMap();
var EMPTY_TYPE_TO_NODE_MAP = /* @__PURE__ */ new Map();
function getCachedTypeToNodeMap(editorState) {
  if (!editorState._readOnly && editorState.isEmpty()) {
    return EMPTY_TYPE_TO_NODE_MAP;
  }
  if (!editorState._readOnly) {
    formatDevErrorMessage(`getCachedTypeToNodeMap called with a writable EditorState`);
  }
  let typeToNodeMap = cachedNodeMaps.get(editorState);
  if (!typeToNodeMap) {
    typeToNodeMap = computeTypeToNodeMap(editorState);
    cachedNodeMaps.set(editorState, typeToNodeMap);
  }
  return typeToNodeMap;
}
function computeTypeToNodeMap(editorState) {
  const typeToNodeMap = /* @__PURE__ */ new Map();
  for (const [nodeKey, node] of editorState._nodeMap) {
    const nodeType = node.__type;
    let nodeMap = typeToNodeMap.get(nodeType);
    if (!nodeMap) {
      nodeMap = /* @__PURE__ */ new Map();
      typeToNodeMap.set(nodeType, nodeMap);
    }
    nodeMap.set(nodeKey, node);
  }
  return typeToNodeMap;
}
function $cloneWithProperties(latestNode) {
  const constructor = latestNode.constructor;
  const mutableNode = constructor.clone(latestNode);
  mutableNode.afterCloneFrom(latestNode);
  {
    if (!(mutableNode.__key === latestNode.__key)) {
      formatDevErrorMessage(`$cloneWithProperties: ${constructor.name}.clone(node) (with type '${constructor.getType()}') did not return a node with the same key, make sure to specify node.__key as the last argument to the constructor`);
    }
    if (!(mutableNode.__parent === latestNode.__parent && mutableNode.__next === latestNode.__next && mutableNode.__prev === latestNode.__prev)) {
      formatDevErrorMessage(`$cloneWithProperties: ${constructor.name}.clone(node) (with type '${constructor.getType()}') overrode afterCloneFrom but did not call super.afterCloneFrom(prevNode)`);
    }
  }
  return mutableNode;
}
function $cloneWithPropertiesEphemeral(latestNode) {
  return $markEphemeral($cloneWithProperties(latestNode));
}
function setNodeIndentFromDOM(elementDom, elementNode) {
  const indentSize = parseInt(elementDom.style.paddingInlineStart, 10) || 0;
  const indent = Math.round(indentSize / 40);
  elementNode.setIndent(indent);
}
function setDOMUnmanaged(elementDom) {
  const el = elementDom;
  el.__lexicalUnmanaged = true;
}
function isDOMUnmanaged(elementDom) {
  const el = elementDom;
  return el.__lexicalUnmanaged === true;
}
function hasOwn(o2, k) {
  return Object.prototype.hasOwnProperty.call(o2, k);
}
function hasOwnStaticMethod(klass, k) {
  return hasOwn(klass, k) && klass[k] !== LexicalNode[k];
}
function hasOwnExportDOM(klass) {
  return hasOwn(klass.prototype, "exportDOM");
}
function isAbstractNodeClass(klass) {
  if (!(klass === LexicalNode || klass.prototype instanceof LexicalNode)) {
    let ownNodeType = "<unknown>";
    let version = "<unknown>";
    try {
      ownNodeType = klass.getType();
    } catch (_err) {
    }
    try {
      if (LexicalEditor.version) {
        version = JSON.parse(LexicalEditor.version);
      }
    } catch (_err) {
    }
    {
      formatDevErrorMessage(`${klass.name} (type ${ownNodeType}) does not subclass LexicalNode from the lexical package used by this editor (version ${version}). All lexical and @lexical/* packages used by an editor must have identical versions. If you suspect the version does match, then the problem may be caused by multiple copies of the same lexical module (e.g. both esm and cjs, or included directly in multiple entrypoints).`);
    }
  }
  return klass === DecoratorNode || klass === ElementNode || klass === LexicalNode;
}
function getStaticNodeConfig(klass) {
  const nodeConfigRecord = PROTOTYPE_CONFIG_METHOD in klass.prototype ? klass.prototype[PROTOTYPE_CONFIG_METHOD]() : void 0;
  const isAbstract = isAbstractNodeClass(klass);
  const nodeType = !isAbstract && hasOwnStaticMethod(klass, "getType") ? klass.getType() : void 0;
  let ownNodeConfig;
  let ownNodeType = nodeType;
  if (nodeConfigRecord) {
    if (nodeType) {
      ownNodeConfig = nodeConfigRecord[nodeType];
    } else {
      for (const [k, v2] of Object.entries(nodeConfigRecord)) {
        ownNodeType = k;
        ownNodeConfig = v2;
      }
    }
  }
  if (!isAbstract && ownNodeType) {
    if (!hasOwnStaticMethod(klass, "getType")) {
      klass.getType = () => ownNodeType;
    }
    if (!hasOwnStaticMethod(klass, "clone")) {
      if (TextNode.length === 0) {
        if (!(klass.length === 0)) {
          formatDevErrorMessage(`${klass.name} (type ${ownNodeType}) must implement a static clone method since its constructor has ${String(klass.length)} required arguments (expecting 0). Use an explicit default in the first argument of your constructor(prop: T=X, nodeKey?: NodeKey).`);
        }
      }
      klass.clone = (prevNode) => {
        setPendingNodeToClone(prevNode);
        return new klass();
      };
    }
    if (!hasOwnStaticMethod(klass, "importJSON")) {
      if (TextNode.length === 0) {
        if (!(klass.length === 0)) {
          formatDevErrorMessage(`${klass.name} (type ${ownNodeType}) must implement a static importJSON method since its constructor has ${String(klass.length)} required arguments (expecting 0). Use an explicit default in the first argument of your constructor(prop: T=X, nodeKey?: NodeKey).`);
        }
      }
      klass.importJSON = ownNodeConfig && ownNodeConfig.$importJSON || ((serializedNode) => new klass().updateFromJSON(serializedNode));
    }
    if (!hasOwnStaticMethod(klass, "importDOM") && ownNodeConfig) {
      const {
        importDOM
      } = ownNodeConfig;
      if (importDOM) {
        klass.importDOM = () => importDOM;
      }
    }
  }
  return {
    ownNodeConfig,
    ownNodeType
  };
}
function $create(klass) {
  const editor = $getEditor();
  errorOnReadOnly();
  const registeredNode = editor.resolveRegisteredNodeAfterReplacements(editor.getRegisteredNode(klass));
  return new registeredNode.klass();
}
var $findMatchingParent = (startingNode, findFn) => {
  let curr = startingNode;
  while (curr != null && !$isRootNode(curr)) {
    if (findFn(curr)) {
      return curr;
    }
    curr = curr.getParent();
  }
  return null;
};
var FLIP_DIRECTION = {
  next: "previous",
  previous: "next"
};
var AbstractCaret = class {
  origin;
  constructor(origin) {
    this.origin = origin;
  }
  [Symbol.iterator]() {
    return makeStepwiseIterator({
      hasNext: $isSiblingCaret,
      initial: this.getAdjacentCaret(),
      map: (caret) => caret,
      step: (caret) => caret.getAdjacentCaret()
    });
  }
  getAdjacentCaret() {
    return $getSiblingCaret(this.getNodeAtCaret(), this.direction);
  }
  getSiblingCaret() {
    return $getSiblingCaret(this.origin, this.direction);
  }
  remove() {
    const node = this.getNodeAtCaret();
    if (node) {
      node.remove();
    }
    return this;
  }
  replaceOrInsert(node, includeChildren) {
    const target = this.getNodeAtCaret();
    if (node.is(this.origin) || node.is(target)) ;
    else if (target === null) {
      this.insert(node);
    } else {
      target.replace(node, includeChildren);
    }
    return this;
  }
  splice(deleteCount, nodes, nodesDirection = "next") {
    const nodeIter = nodesDirection === this.direction ? nodes : Array.from(nodes).reverse();
    let caret = this;
    const parent = this.getParentAtCaret();
    const nodesToRemove = /* @__PURE__ */ new Map();
    for (let removeCaret = caret.getAdjacentCaret(); removeCaret !== null && nodesToRemove.size < deleteCount; removeCaret = removeCaret.getAdjacentCaret()) {
      const writableNode = removeCaret.origin.getWritable();
      nodesToRemove.set(writableNode.getKey(), writableNode);
    }
    for (const node of nodeIter) {
      if (nodesToRemove.size > 0) {
        const target = caret.getNodeAtCaret();
        if (target) {
          nodesToRemove.delete(target.getKey());
          nodesToRemove.delete(node.getKey());
          if (target.is(node) || caret.origin.is(node)) ;
          else {
            const nodeParent = node.getParent();
            if (nodeParent && nodeParent.is(parent)) {
              node.remove();
            }
            target.replace(node);
          }
        } else {
          if (!(target !== null)) {
            formatDevErrorMessage(`NodeCaret.splice: Underflow of expected nodesToRemove during splice (keys: ${Array.from(nodesToRemove).join(" ")})`);
          }
        }
      } else {
        caret.insert(node);
      }
      caret = $getSiblingCaret(node, this.direction);
    }
    for (const node of nodesToRemove.values()) {
      node.remove();
    }
    return this;
  }
};
var AbstractChildCaret = class _AbstractChildCaret extends AbstractCaret {
  type = "child";
  getLatest() {
    const origin = this.origin.getLatest();
    return origin === this.origin ? this : $getChildCaret(origin, this.direction);
  }
  /**
   * Get the SiblingCaret from this origin in the same direction.
   *
   * @param mode 'root' to return null at the root, 'shadowRoot' to return null at the root or any shadow root
   * @returns A SiblingCaret with this origin, or null if origin is a root according to mode.
   */
  getParentCaret(mode = "root") {
    return $getSiblingCaret($filterByMode(this.getParentAtCaret(), mode), this.direction);
  }
  getFlipped() {
    const dir = flipDirection(this.direction);
    return $getSiblingCaret(this.getNodeAtCaret(), dir) || $getChildCaret(this.origin, dir);
  }
  getParentAtCaret() {
    return this.origin;
  }
  getChildCaret() {
    return this;
  }
  isSameNodeCaret(other) {
    return other instanceof _AbstractChildCaret && this.direction === other.direction && this.origin.is(other.origin);
  }
  isSamePointCaret(other) {
    return this.isSameNodeCaret(other);
  }
};
var ChildCaretFirst = class extends AbstractChildCaret {
  direction = "next";
  getNodeAtCaret() {
    return this.origin.getFirstChild();
  }
  insert(node) {
    this.origin.splice(0, 0, [node]);
    return this;
  }
};
var ChildCaretLast = class extends AbstractChildCaret {
  direction = "previous";
  getNodeAtCaret() {
    return this.origin.getLastChild();
  }
  insert(node) {
    this.origin.splice(this.origin.getChildrenSize(), 0, [node]);
    return this;
  }
};
var MODE_PREDICATE = {
  root: $isRootNode,
  shadowRoot: $isRootOrShadowRoot
};
function flipDirection(direction) {
  return FLIP_DIRECTION[direction];
}
function $filterByMode(node, mode = "root") {
  return MODE_PREDICATE[mode](node) ? null : node;
}
var AbstractSiblingCaret = class _AbstractSiblingCaret extends AbstractCaret {
  type = "sibling";
  getLatest() {
    const origin = this.origin.getLatest();
    return origin === this.origin ? this : $getSiblingCaret(origin, this.direction);
  }
  getSiblingCaret() {
    return this;
  }
  getParentAtCaret() {
    return this.origin.getParent();
  }
  getChildCaret() {
    return $isElementNode(this.origin) ? $getChildCaret(this.origin, this.direction) : null;
  }
  getParentCaret(mode = "root") {
    return $getSiblingCaret($filterByMode(this.getParentAtCaret(), mode), this.direction);
  }
  getFlipped() {
    const dir = flipDirection(this.direction);
    return $getSiblingCaret(this.getNodeAtCaret(), dir) || $getChildCaret(this.origin.getParentOrThrow(), dir);
  }
  isSamePointCaret(other) {
    return other instanceof _AbstractSiblingCaret && this.direction === other.direction && this.origin.is(other.origin);
  }
  isSameNodeCaret(other) {
    return (other instanceof _AbstractSiblingCaret || other instanceof AbstractTextPointCaret) && this.direction === other.direction && this.origin.is(other.origin);
  }
};
var AbstractTextPointCaret = class _AbstractTextPointCaret extends AbstractCaret {
  type = "text";
  offset;
  constructor(origin, offset) {
    super(origin);
    this.offset = offset;
  }
  getLatest() {
    const origin = this.origin.getLatest();
    return origin === this.origin ? this : $getTextPointCaret(origin, this.direction, this.offset);
  }
  getParentAtCaret() {
    return this.origin.getParent();
  }
  getChildCaret() {
    return null;
  }
  getParentCaret(mode = "root") {
    return $getSiblingCaret($filterByMode(this.getParentAtCaret(), mode), this.direction);
  }
  getFlipped() {
    return $getTextPointCaret(this.origin, flipDirection(this.direction), this.offset);
  }
  isSamePointCaret(other) {
    return other instanceof _AbstractTextPointCaret && this.direction === other.direction && this.origin.is(other.origin) && this.offset === other.offset;
  }
  isSameNodeCaret(other) {
    return (other instanceof AbstractSiblingCaret || other instanceof _AbstractTextPointCaret) && this.direction === other.direction && this.origin.is(other.origin);
  }
  getSiblingCaret() {
    return $getSiblingCaret(this.origin, this.direction);
  }
};
function $isTextPointCaret(caret) {
  return caret instanceof AbstractTextPointCaret;
}
function $isNodeCaret(caret) {
  return caret instanceof AbstractCaret;
}
function $isSiblingCaret(caret) {
  return caret instanceof AbstractSiblingCaret;
}
function $isChildCaret(caret) {
  return caret instanceof AbstractChildCaret;
}
var SiblingCaretNext = class extends AbstractSiblingCaret {
  direction = "next";
  getNodeAtCaret() {
    return this.origin.getNextSibling();
  }
  insert(node) {
    this.origin.insertAfter(node);
    return this;
  }
};
var SiblingCaretPrevious = class extends AbstractSiblingCaret {
  direction = "previous";
  getNodeAtCaret() {
    return this.origin.getPreviousSibling();
  }
  insert(node) {
    this.origin.insertBefore(node);
    return this;
  }
};
var TextPointCaretNext = class extends AbstractTextPointCaret {
  direction = "next";
  getNodeAtCaret() {
    return this.origin.getNextSibling();
  }
  insert(node) {
    this.origin.insertAfter(node);
    return this;
  }
};
var TextPointCaretPrevious = class extends AbstractTextPointCaret {
  direction = "previous";
  getNodeAtCaret() {
    return this.origin.getPreviousSibling();
  }
  insert(node) {
    this.origin.insertBefore(node);
    return this;
  }
};
var TEXT_CTOR = {
  next: TextPointCaretNext,
  previous: TextPointCaretPrevious
};
var SIBLING_CTOR = {
  next: SiblingCaretNext,
  previous: SiblingCaretPrevious
};
var CHILD_CTOR = {
  next: ChildCaretFirst,
  previous: ChildCaretLast
};
function $getSiblingCaret(origin, direction) {
  return origin ? new SIBLING_CTOR[direction](origin) : null;
}
function $getTextPointCaret(origin, direction, offset) {
  return origin ? new TEXT_CTOR[direction](origin, $getTextNodeOffset(origin, offset)) : null;
}
function $getTextNodeOffset(origin, offset, mode = "error") {
  const size = origin.getTextContentSize();
  let numericOffset = offset === "next" ? size : offset === "previous" ? 0 : offset;
  if (numericOffset < 0 || numericOffset > size) {
    if (!(mode === "clamp")) {
      formatDevErrorMessage(`$getTextNodeOffset: invalid offset ${String(offset)} for size ${String(size)} at key ${origin.getKey()}`);
    }
    numericOffset = numericOffset < 0 ? 0 : size;
  }
  return numericOffset;
}
function $getTextPointCaretSlice(caret, distance) {
  return new TextPointCaretSliceImpl(caret, distance);
}
function $getChildCaret(origin, direction) {
  return $isElementNode(origin) ? new CHILD_CTOR[direction](origin) : null;
}
function $getChildCaretOrSelf(caret) {
  return caret && caret.getChildCaret() || caret;
}
function $getAdjacentChildCaret(caret) {
  return caret && $getChildCaretOrSelf(caret.getAdjacentCaret());
}
var CaretRangeImpl = class _CaretRangeImpl {
  type = "node-caret-range";
  direction;
  anchor;
  focus;
  constructor(anchor, focus, direction) {
    this.anchor = anchor;
    this.focus = focus;
    this.direction = direction;
  }
  getLatest() {
    const anchor = this.anchor.getLatest();
    const focus = this.focus.getLatest();
    return anchor === this.anchor && focus === this.focus ? this : new _CaretRangeImpl(anchor, focus, this.direction);
  }
  isCollapsed() {
    return this.anchor.isSamePointCaret(this.focus);
  }
  getTextSlices() {
    const getSlice = (k) => {
      const caret = this[k].getLatest();
      return $isTextPointCaret(caret) ? $getSliceFromTextPointCaret(caret, k) : null;
    };
    const anchorSlice = getSlice("anchor");
    const focusSlice = getSlice("focus");
    if (anchorSlice && focusSlice) {
      const {
        caret: anchorCaret
      } = anchorSlice;
      const {
        caret: focusCaret
      } = focusSlice;
      if (anchorCaret.isSameNodeCaret(focusCaret)) {
        return [$getTextPointCaretSlice(anchorCaret, focusCaret.offset - anchorCaret.offset), null];
      }
    }
    return [anchorSlice, focusSlice];
  }
  iterNodeCarets(rootMode = "root") {
    const anchor = $isTextPointCaret(this.anchor) ? this.anchor.getSiblingCaret() : this.anchor.getLatest();
    const focus = this.focus.getLatest();
    const isTextFocus = $isTextPointCaret(focus);
    const step = (state) => state.isSameNodeCaret(focus) ? null : $getAdjacentChildCaret(state) || state.getParentCaret(rootMode);
    return makeStepwiseIterator({
      hasNext: (state) => state !== null && !(isTextFocus && focus.isSameNodeCaret(state)),
      initial: anchor.isSameNodeCaret(focus) ? null : step(anchor),
      map: (state) => state,
      step
    });
  }
  [Symbol.iterator]() {
    return this.iterNodeCarets("root");
  }
};
var TextPointCaretSliceImpl = class {
  type = "slice";
  caret;
  distance;
  constructor(caret, distance) {
    this.caret = caret;
    this.distance = distance;
  }
  getSliceIndices() {
    const {
      distance,
      caret: {
        offset
      }
    } = this;
    const offsetB = offset + distance;
    return offsetB < offset ? [offsetB, offset] : [offset, offsetB];
  }
  getTextContent() {
    const [startIndex, endIndex] = this.getSliceIndices();
    return this.caret.origin.getTextContent().slice(startIndex, endIndex);
  }
  getTextContentSize() {
    return Math.abs(this.distance);
  }
  removeTextSlice() {
    const {
      caret: {
        origin,
        direction
      }
    } = this;
    const [indexStart, indexEnd] = this.getSliceIndices();
    const text = origin.getTextContent();
    return $getTextPointCaret(origin.setTextContent(text.slice(0, indexStart) + text.slice(indexEnd)), direction, indexStart);
  }
};
function $getSliceFromTextPointCaret(caret, anchorOrFocus) {
  const {
    direction,
    origin
  } = caret;
  const offsetB = $getTextNodeOffset(origin, anchorOrFocus === "focus" ? flipDirection(direction) : direction);
  return $getTextPointCaretSlice(caret, offsetB - caret.offset);
}
function $isTextPointCaretSlice(caretOrSlice) {
  return caretOrSlice instanceof TextPointCaretSliceImpl;
}
function $extendCaretToRange(anchor) {
  return $getCaretRange(anchor, $getSiblingCaret($getRoot(), anchor.direction));
}
function $getCollapsedCaretRange(anchor) {
  return $getCaretRange(anchor, anchor);
}
function $getCaretRange(anchor, focus) {
  if (!(anchor.direction === focus.direction)) {
    formatDevErrorMessage(`$getCaretRange: anchor and focus must be in the same direction`);
  }
  return new CaretRangeImpl(anchor, focus, anchor.direction);
}
function makeStepwiseIterator(config) {
  const {
    initial,
    hasNext,
    step,
    map
  } = config;
  let state = initial;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (!hasNext(state)) {
        return {
          done: true,
          value: void 0
        };
      }
      const rval = {
        done: false,
        value: map(state)
      };
      state = step(state);
      return rval;
    }
  };
}
function compareNumber(a2, b2) {
  return Math.sign(a2 - b2);
}
function $comparePointCaretNext(a2, b2) {
  const compare = $getCommonAncestor(a2.origin, b2.origin);
  if (!(compare !== null)) {
    formatDevErrorMessage(`$comparePointCaretNext: a (key ${a2.origin.getKey()}) and b (key ${b2.origin.getKey()}) do not have a common ancestor`);
  }
  switch (compare.type) {
    case "same": {
      const aIsText = a2.type === "text";
      const bIsText = b2.type === "text";
      return aIsText && bIsText ? compareNumber(a2.offset, b2.offset) : a2.type === b2.type ? 0 : aIsText ? -1 : bIsText ? 1 : a2.type === "child" ? -1 : 1;
    }
    case "ancestor": {
      return a2.type === "child" ? -1 : 1;
    }
    case "descendant": {
      return b2.type === "child" ? 1 : -1;
    }
    case "branch": {
      return $getCommonAncestorResultBranchOrder(compare);
    }
  }
}
function $getCommonAncestorResultBranchOrder(compare) {
  const {
    a: a2,
    b: b2
  } = compare;
  const aKey = a2.__key;
  const bKey = b2.__key;
  let na = a2;
  let nb = b2;
  for (; na && nb; na = na.getNextSibling(), nb = nb.getNextSibling()) {
    if (na.__key === bKey) {
      return -1;
    } else if (nb.__key === aKey) {
      return 1;
    }
  }
  return na === null ? 1 : -1;
}
function $isSameNode(reference, other) {
  return other.is(reference);
}
function $initialElementTuple(node) {
  return $isElementNode(node) ? [node.getLatest(), null] : [node.getParent(), node.getLatest()];
}
function $getCommonAncestor(a2, b2) {
  if (a2.is(b2)) {
    return {
      commonAncestor: a2,
      type: "same"
    };
  }
  const aMap = /* @__PURE__ */ new Map();
  for (let [parent, child] = $initialElementTuple(a2); parent; child = parent, parent = parent.getParent()) {
    aMap.set(parent, child);
  }
  for (let [parent, child] = $initialElementTuple(b2); parent; child = parent, parent = parent.getParent()) {
    const aChild = aMap.get(parent);
    if (aChild === void 0) ;
    else if (aChild === null) {
      if (!$isSameNode(a2, parent)) {
        formatDevErrorMessage(`$originComparison: ancestor logic error`);
      }
      return {
        commonAncestor: parent,
        type: "ancestor"
      };
    } else if (child === null) {
      if (!$isSameNode(b2, parent)) {
        formatDevErrorMessage(`$originComparison: descendant logic error`);
      }
      return {
        commonAncestor: parent,
        type: "descendant"
      };
    } else {
      if (!(($isElementNode(aChild) || $isSameNode(a2, aChild)) && ($isElementNode(child) || $isSameNode(b2, child)) && parent.is(aChild.getParent()) && parent.is(child.getParent()))) {
        formatDevErrorMessage(`$originComparison: branch logic error`);
      }
      return {
        a: aChild,
        b: child,
        commonAncestor: parent,
        type: "branch"
      };
    }
  }
  return null;
}
function $caretFromPoint(point, direction) {
  const {
    type,
    key,
    offset
  } = point;
  const node = $getNodeByKeyOrThrow(point.key);
  if (type === "text") {
    if (!$isTextNode(node)) {
      formatDevErrorMessage(`$caretFromPoint: Node with type ${node.getType()} and key ${key} that does not inherit from TextNode encountered for text point`);
    }
    return $getTextPointCaret(node, direction, offset);
  }
  if (!$isElementNode(node)) {
    formatDevErrorMessage(`$caretFromPoint: Node with type ${node.getType()} and key ${key} that does not inherit from ElementNode encountered for element point`);
  }
  return $getChildCaretAtIndex(node, point.offset, direction);
}
function $setPointFromCaret(point, caret) {
  const {
    origin,
    direction
  } = caret;
  const isNext = direction === "next";
  if ($isTextPointCaret(caret)) {
    point.set(origin.getKey(), caret.offset, "text");
  } else if ($isSiblingCaret(caret)) {
    if ($isTextNode(origin)) {
      point.set(origin.getKey(), $getTextNodeOffset(origin, direction), "text");
    } else {
      point.set(origin.getParentOrThrow().getKey(), origin.getIndexWithinParent() + (isNext ? 1 : 0), "element");
    }
  } else {
    if (!($isChildCaret(caret) && $isElementNode(origin))) {
      formatDevErrorMessage(`$setPointFromCaret: exhaustiveness check`);
    }
    point.set(origin.getKey(), isNext ? 0 : origin.getChildrenSize(), "element");
  }
}
function $setSelectionFromCaretRange(caretRange) {
  const currentSelection = $getSelection();
  const selection = $isRangeSelection(currentSelection) ? currentSelection : $createRangeSelection();
  $updateRangeSelectionFromCaretRange(selection, caretRange);
  $setSelection(selection);
  return selection;
}
function $updateRangeSelectionFromCaretRange(selection, caretRange) {
  $setPointFromCaret(selection.anchor, caretRange.anchor);
  $setPointFromCaret(selection.focus, caretRange.focus);
}
function $caretRangeFromSelection(selection) {
  const {
    anchor,
    focus
  } = selection;
  const anchorCaret = $caretFromPoint(anchor, "next");
  const focusCaret = $caretFromPoint(focus, "next");
  const direction = $comparePointCaretNext(anchorCaret, focusCaret) <= 0 ? "next" : "previous";
  return $getCaretRange($getCaretInDirection(anchorCaret, direction), $getCaretInDirection(focusCaret, direction));
}
function $rewindSiblingCaret(caret) {
  const {
    direction,
    origin
  } = caret;
  const rewindOrigin = $getSiblingCaret(origin, flipDirection(direction)).getNodeAtCaret();
  return rewindOrigin ? $getSiblingCaret(rewindOrigin, direction) : $getChildCaret(origin.getParentOrThrow(), direction);
}
function $getAnchorCandidates(anchor, rootMode = "root") {
  const carets = [anchor];
  for (let parent = $isChildCaret(anchor) ? anchor.getParentCaret(rootMode) : anchor.getSiblingCaret(); parent !== null; parent = parent.getParentCaret(rootMode)) {
    carets.push($rewindSiblingCaret(parent));
  }
  return carets;
}
function $isCaretAttached(caret) {
  return !!caret && caret.origin.isAttached();
}
function $removeTextFromCaretRange(initialRange, sliceMode = "removeEmptySlices") {
  if (initialRange.isCollapsed()) {
    return initialRange;
  }
  const rootMode = "root";
  const nextDirection = "next";
  let sliceState = sliceMode;
  const range = $getCaretRangeInDirection(initialRange, nextDirection);
  const anchorCandidates = $getAnchorCandidates(range.anchor, rootMode);
  const focusCandidates = $getAnchorCandidates(range.focus.getFlipped(), rootMode);
  const seenStart = /* @__PURE__ */ new Set();
  const removedNodes = [];
  for (const caret of range.iterNodeCarets(rootMode)) {
    if ($isChildCaret(caret)) {
      seenStart.add(caret.origin.getKey());
    } else if ($isSiblingCaret(caret)) {
      const {
        origin
      } = caret;
      if (!$isElementNode(origin) || seenStart.has(origin.getKey())) {
        removedNodes.push(origin);
      }
    }
  }
  for (const node of removedNodes) {
    node.remove();
  }
  for (const slice of range.getTextSlices()) {
    if (!slice) {
      continue;
    }
    const {
      origin
    } = slice.caret;
    const contentSize = origin.getTextContentSize();
    const caretBefore = $rewindSiblingCaret($getSiblingCaret(origin, nextDirection));
    const mode = origin.getMode();
    if (Math.abs(slice.distance) === contentSize && sliceState === "removeEmptySlices" || mode === "token" && slice.distance !== 0) {
      caretBefore.remove();
    } else if (slice.distance !== 0) {
      sliceState = "removeEmptySlices";
      let nextCaret = slice.removeTextSlice();
      const sliceOrigin = slice.caret.origin;
      if (mode === "segmented") {
        const src = nextCaret.origin;
        const plainTextNode = $createTextNode(src.getTextContent()).setStyle(src.getStyle()).setFormat(src.getFormat());
        caretBefore.replaceOrInsert(plainTextNode);
        nextCaret = $getTextPointCaret(plainTextNode, nextDirection, nextCaret.offset);
      }
      if (sliceOrigin.is(anchorCandidates[0].origin)) {
        anchorCandidates[0] = nextCaret;
      }
      if (sliceOrigin.is(focusCandidates[0].origin)) {
        focusCandidates[0] = nextCaret.getFlipped();
      }
    }
  }
  let anchorCandidate;
  let focusCandidate;
  for (const candidate of anchorCandidates) {
    if ($isCaretAttached(candidate)) {
      anchorCandidate = $normalizeCaret(candidate);
      break;
    }
  }
  for (const candidate of focusCandidates) {
    if ($isCaretAttached(candidate)) {
      focusCandidate = $normalizeCaret(candidate);
      break;
    }
  }
  const mergeTargets = $getBlockMergeTargets(anchorCandidate, focusCandidate, seenStart);
  if (mergeTargets) {
    const [anchorBlock, focusBlock] = mergeTargets;
    $getChildCaret(anchorBlock, "previous").splice(0, focusBlock.getChildren());
    let parent = focusBlock.getParent();
    focusBlock.remove(true);
    while (parent && parent.isEmpty()) {
      const element = parent;
      parent = parent.getParent();
      element.remove(true);
    }
  }
  const bestCandidate = [anchorCandidate, focusCandidate, ...anchorCandidates, ...focusCandidates].find($isCaretAttached);
  if (bestCandidate) {
    const anchor = $getCaretInDirection($normalizeCaret(bestCandidate), initialRange.direction);
    return $getCollapsedCaretRange(anchor);
  }
  {
    formatDevErrorMessage(`$removeTextFromCaretRange: selection was lost, could not find a new anchor given candidates with keys: ${JSON.stringify(anchorCandidates.map((n2) => n2.origin.__key))}`);
  }
}
function $getBlockMergeTargets(anchor, focus, seenStart) {
  if (!anchor || !focus) {
    return null;
  }
  const anchorParent = anchor.getParentAtCaret();
  const focusParent = focus.getParentAtCaret();
  if (!anchorParent || !focusParent) {
    return null;
  }
  const anchorElements = anchorParent.getParents().reverse();
  anchorElements.push(anchorParent);
  const focusElements = focusParent.getParents().reverse();
  focusElements.push(focusParent);
  const maxLen = Math.min(anchorElements.length, focusElements.length);
  let commonAncestorCount;
  for (commonAncestorCount = 0; commonAncestorCount < maxLen && anchorElements[commonAncestorCount] === focusElements[commonAncestorCount]; commonAncestorCount++) {
  }
  const $getBlock = (arr, predicate) => {
    let block;
    for (let i2 = commonAncestorCount; i2 < arr.length; i2++) {
      const ancestor = arr[i2];
      if ($isRootOrShadowRoot(ancestor)) {
        return;
      } else if (!block && predicate(ancestor)) {
        block = ancestor;
      }
    }
    return block;
  };
  const anchorBlock = $getBlock(anchorElements, INTERNAL_$isBlock);
  const focusBlock = anchorBlock && $getBlock(focusElements, (node) => seenStart.has(node.getKey()) && INTERNAL_$isBlock(node));
  return anchorBlock && focusBlock ? [anchorBlock, focusBlock] : null;
}
function $getDeepestChildOrSelf(initialCaret) {
  let caret = initialCaret;
  while ($isChildCaret(caret)) {
    const adjacent = $getAdjacentChildCaret(caret);
    if (!$isChildCaret(adjacent)) {
      break;
    }
    caret = adjacent;
  }
  return caret;
}
function $normalizeCaret(initialCaret) {
  const caret = $getDeepestChildOrSelf(initialCaret.getLatest());
  const {
    direction
  } = caret;
  if ($isTextNode(caret.origin)) {
    return $isTextPointCaret(caret) ? caret : $getTextPointCaret(caret.origin, direction, direction);
  }
  const adj = caret.getAdjacentCaret();
  return $isSiblingCaret(adj) && $isTextNode(adj.origin) ? $getTextPointCaret(adj.origin, direction, flipDirection(direction)) : caret;
}
function $isExtendableTextPointCaret(caret) {
  return $isTextPointCaret(caret) && caret.offset !== $getTextNodeOffset(caret.origin, caret.direction);
}
function $getCaretInDirection(caret, direction) {
  return caret.direction === direction ? caret : caret.getFlipped();
}
function $getCaretRangeInDirection(range, direction) {
  if (range.direction === direction) {
    return range;
  }
  return $getCaretRange(
    // focus and anchor get flipped here
    $getCaretInDirection(range.focus, direction),
    $getCaretInDirection(range.anchor, direction)
  );
}
function $getChildCaretAtIndex(parent, index, direction) {
  let caret = $getChildCaret(parent, "next");
  for (let i2 = 0; i2 < index; i2++) {
    const nextCaret = caret.getAdjacentCaret();
    if (nextCaret === null) {
      break;
    }
    caret = nextCaret;
  }
  return $getCaretInDirection(caret, direction);
}
function $getAdjacentSiblingOrParentSiblingCaret(startCaret, rootMode = "root") {
  let depthDiff = 0;
  let caret = startCaret;
  let nextCaret = $getAdjacentChildCaret(caret);
  while (nextCaret === null) {
    depthDiff--;
    nextCaret = caret.getParentCaret(rootMode);
    if (!nextCaret) {
      return null;
    }
    caret = nextCaret;
    nextCaret = $getAdjacentChildCaret(caret);
  }
  return nextCaret && [nextCaret, depthDiff];
}
function $getAdjacentNodes(initialCaret) {
  const siblings = [];
  for (let caret = initialCaret.getAdjacentCaret(); caret; caret = caret.getAdjacentCaret()) {
    siblings.push(caret.origin);
  }
  return siblings;
}
function $splitTextPointCaret(textPointCaret) {
  const {
    origin,
    offset,
    direction
  } = textPointCaret;
  if (offset === $getTextNodeOffset(origin, direction)) {
    return textPointCaret.getSiblingCaret();
  } else if (offset === $getTextNodeOffset(origin, flipDirection(direction))) {
    return $rewindSiblingCaret(textPointCaret.getSiblingCaret());
  }
  const [textNode] = origin.splitText(offset);
  if (!$isTextNode(textNode)) {
    formatDevErrorMessage(`$splitTextPointCaret: splitText must return at least one TextNode`);
  }
  return $getCaretInDirection($getSiblingCaret(textNode, "next"), direction);
}
function $alwaysSplit(_node, _edge) {
  return true;
}
function $splitAtPointCaretNext(pointCaret, {
  $copyElementNode = $copyNode,
  $splitTextPointCaretNext = $splitTextPointCaret,
  rootMode = "shadowRoot",
  $shouldSplit = $alwaysSplit
} = {}) {
  if ($isTextPointCaret(pointCaret)) {
    return $splitTextPointCaretNext(pointCaret);
  }
  const parentCaret = pointCaret.getParentCaret(rootMode);
  if (parentCaret) {
    const {
      origin
    } = parentCaret;
    if ($isChildCaret(pointCaret) && !(origin.canBeEmpty() && $shouldSplit(origin, "first"))) {
      return $rewindSiblingCaret(parentCaret);
    }
    const siblings = $getAdjacentNodes(pointCaret);
    if (siblings.length > 0 || origin.canBeEmpty() && $shouldSplit(origin, "last")) {
      parentCaret.insert($copyElementNode(origin).splice(0, 0, siblings));
    }
  }
  return parentCaret;
}
// @__NO_SIDE_EFFECTS__
function defineExtension(extension) {
  return extension;
}
// @__NO_SIDE_EFFECTS__
function configExtension(...args) {
  return args;
}
// @__NO_SIDE_EFFECTS__
function declarePeerDependency(name, config) {
  return [name, config];
}
// @__NO_SIDE_EFFECTS__
function safeCast(value) {
  return value;
}
function shallowMergeConfig(config, overrides) {
  if (!overrides || config === overrides) {
    return config;
  }
  for (const k in overrides) {
    if (config[k] !== overrides[k]) {
      return {
        ...config,
        ...overrides
      };
    }
  }
  return config;
}
function normalizeClassNames(...classNames) {
  const rval = [];
  for (const className of classNames) {
    if (className && typeof className === "string") {
      for (const [s2] of className.matchAll(/\S+/g)) {
        rval.push(s2);
      }
    }
  }
  return rval;
}
function addClassNamesToElement(element, ...classNames) {
  const classesToAdd = normalizeClassNames(...classNames);
  if (classesToAdd.length > 0) {
    element.classList.add(...classesToAdd);
  }
}
function removeClassNamesFromElement(element, ...classNames) {
  const classesToRemove = normalizeClassNames(...classNames);
  if (classesToRemove.length > 0) {
    element.classList.remove(...classesToRemove);
  }
}
function mergeRegister(...func) {
  return () => {
    for (let i2 = func.length - 1; i2 >= 0; i2--) {
      func[i2]();
    }
    func.length = 0;
  };
}

// node_modules/lexical/Lexical.mjs
var mod = true ? Lexical_dev_exports : Lexical_prod_exports;
var $addUpdateTag2 = mod.$addUpdateTag;
var $applyNodeReplacement2 = mod.$applyNodeReplacement;
var $caretFromPoint2 = mod.$caretFromPoint;
var $caretRangeFromSelection2 = mod.$caretRangeFromSelection;
var $cloneWithProperties2 = mod.$cloneWithProperties;
var $cloneWithPropertiesEphemeral2 = mod.$cloneWithPropertiesEphemeral;
var $comparePointCaretNext2 = mod.$comparePointCaretNext;
var $copyNode2 = mod.$copyNode;
var $create2 = mod.$create;
var $createLineBreakNode2 = mod.$createLineBreakNode;
var $createNodeSelection2 = mod.$createNodeSelection;
var $createParagraphNode2 = mod.$createParagraphNode;
var $createPoint2 = mod.$createPoint;
var $createRangeSelection2 = mod.$createRangeSelection;
var $createRangeSelectionFromDom2 = mod.$createRangeSelectionFromDom;
var $createTabNode2 = mod.$createTabNode;
var $createTextNode2 = mod.$createTextNode;
var $extendCaretToRange2 = mod.$extendCaretToRange;
var $findMatchingParent2 = mod.$findMatchingParent;
var $getAdjacentChildCaret2 = mod.$getAdjacentChildCaret;
var $getAdjacentNode2 = mod.$getAdjacentNode;
var $getAdjacentSiblingOrParentSiblingCaret2 = mod.$getAdjacentSiblingOrParentSiblingCaret;
var $getCaretInDirection2 = mod.$getCaretInDirection;
var $getCaretRange2 = mod.$getCaretRange;
var $getCaretRangeInDirection2 = mod.$getCaretRangeInDirection;
var $getCharacterOffsets2 = mod.$getCharacterOffsets;
var $getChildCaret2 = mod.$getChildCaret;
var $getChildCaretAtIndex2 = mod.$getChildCaretAtIndex;
var $getChildCaretOrSelf2 = mod.$getChildCaretOrSelf;
var $getCollapsedCaretRange2 = mod.$getCollapsedCaretRange;
var $getCommonAncestor2 = mod.$getCommonAncestor;
var $getCommonAncestorResultBranchOrder2 = mod.$getCommonAncestorResultBranchOrder;
var $getEditor2 = mod.$getEditor;
var $getNearestNodeFromDOMNode2 = mod.$getNearestNodeFromDOMNode;
var $getNearestRootOrShadowRoot2 = mod.$getNearestRootOrShadowRoot;
var $getNodeByKey2 = mod.$getNodeByKey;
var $getNodeByKeyOrThrow2 = mod.$getNodeByKeyOrThrow;
var $getNodeFromDOMNode2 = mod.$getNodeFromDOMNode;
var $getPreviousSelection2 = mod.$getPreviousSelection;
var $getRoot2 = mod.$getRoot;
var $getSelection2 = mod.$getSelection;
var $getSiblingCaret2 = mod.$getSiblingCaret;
var $getState2 = mod.$getState;
var $getStateChange2 = mod.$getStateChange;
var $getTextContent2 = mod.$getTextContent;
var $getTextNodeOffset2 = mod.$getTextNodeOffset;
var $getTextPointCaret2 = mod.$getTextPointCaret;
var $getTextPointCaretSlice2 = mod.$getTextPointCaretSlice;
var $getWritableNodeState2 = mod.$getWritableNodeState;
var $hasAncestor2 = mod.$hasAncestor;
var $hasUpdateTag2 = mod.$hasUpdateTag;
var $insertNodes2 = mod.$insertNodes;
var $isBlockElementNode2 = mod.$isBlockElementNode;
var $isChildCaret2 = mod.$isChildCaret;
var $isDecoratorNode2 = mod.$isDecoratorNode;
var $isEditorState2 = mod.$isEditorState;
var $isElementNode2 = mod.$isElementNode;
var $isExtendableTextPointCaret2 = mod.$isExtendableTextPointCaret;
var $isInlineElementOrDecoratorNode2 = mod.$isInlineElementOrDecoratorNode;
var $isLeafNode2 = mod.$isLeafNode;
var $isLineBreakNode2 = mod.$isLineBreakNode;
var $isNodeCaret2 = mod.$isNodeCaret;
var $isNodeSelection2 = mod.$isNodeSelection;
var $isParagraphNode2 = mod.$isParagraphNode;
var $isRangeSelection2 = mod.$isRangeSelection;
var $isRootNode2 = mod.$isRootNode;
var $isRootOrShadowRoot2 = mod.$isRootOrShadowRoot;
var $isSiblingCaret2 = mod.$isSiblingCaret;
var $isTabNode2 = mod.$isTabNode;
var $isTextNode2 = mod.$isTextNode;
var $isTextPointCaret2 = mod.$isTextPointCaret;
var $isTextPointCaretSlice2 = mod.$isTextPointCaretSlice;
var $isTokenOrSegmented2 = mod.$isTokenOrSegmented;
var $isTokenOrTab2 = mod.$isTokenOrTab;
var $nodesOfType2 = mod.$nodesOfType;
var $normalizeCaret2 = mod.$normalizeCaret;
var $normalizeSelection__EXPERIMENTAL = mod.$normalizeSelection__EXPERIMENTAL;
var $onUpdate2 = mod.$onUpdate;
var $parseSerializedNode2 = mod.$parseSerializedNode;
var $removeTextFromCaretRange2 = mod.$removeTextFromCaretRange;
var $rewindSiblingCaret2 = mod.$rewindSiblingCaret;
var $selectAll2 = mod.$selectAll;
var $setCompositionKey2 = mod.$setCompositionKey;
var $setPointFromCaret2 = mod.$setPointFromCaret;
var $setSelection2 = mod.$setSelection;
var $setSelectionFromCaretRange2 = mod.$setSelectionFromCaretRange;
var $setState2 = mod.$setState;
var $splitAtPointCaretNext2 = mod.$splitAtPointCaretNext;
var $splitNode2 = mod.$splitNode;
var $updateRangeSelectionFromCaretRange2 = mod.$updateRangeSelectionFromCaretRange;
var ArtificialNode__DO_NOT_USE2 = mod.ArtificialNode__DO_NOT_USE;
var BEFORE_INPUT_COMMAND2 = mod.BEFORE_INPUT_COMMAND;
var BLUR_COMMAND2 = mod.BLUR_COMMAND;
var CAN_REDO_COMMAND2 = mod.CAN_REDO_COMMAND;
var CAN_UNDO_COMMAND2 = mod.CAN_UNDO_COMMAND;
var CLEAR_EDITOR_COMMAND2 = mod.CLEAR_EDITOR_COMMAND;
var CLEAR_HISTORY_COMMAND2 = mod.CLEAR_HISTORY_COMMAND;
var CLICK_COMMAND2 = mod.CLICK_COMMAND;
var COLLABORATION_TAG2 = mod.COLLABORATION_TAG;
var COMMAND_PRIORITY_CRITICAL2 = mod.COMMAND_PRIORITY_CRITICAL;
var COMMAND_PRIORITY_EDITOR2 = mod.COMMAND_PRIORITY_EDITOR;
var COMMAND_PRIORITY_HIGH2 = mod.COMMAND_PRIORITY_HIGH;
var COMMAND_PRIORITY_LOW2 = mod.COMMAND_PRIORITY_LOW;
var COMMAND_PRIORITY_NORMAL2 = mod.COMMAND_PRIORITY_NORMAL;
var COMPOSITION_END_COMMAND2 = mod.COMPOSITION_END_COMMAND;
var COMPOSITION_END_TAG2 = mod.COMPOSITION_END_TAG;
var COMPOSITION_START_COMMAND2 = mod.COMPOSITION_START_COMMAND;
var COMPOSITION_START_TAG2 = mod.COMPOSITION_START_TAG;
var CONTROLLED_TEXT_INSERTION_COMMAND2 = mod.CONTROLLED_TEXT_INSERTION_COMMAND;
var COPY_COMMAND2 = mod.COPY_COMMAND;
var CUT_COMMAND2 = mod.CUT_COMMAND;
var DELETE_CHARACTER_COMMAND2 = mod.DELETE_CHARACTER_COMMAND;
var DELETE_LINE_COMMAND2 = mod.DELETE_LINE_COMMAND;
var DELETE_WORD_COMMAND2 = mod.DELETE_WORD_COMMAND;
var DRAGEND_COMMAND2 = mod.DRAGEND_COMMAND;
var DRAGOVER_COMMAND2 = mod.DRAGOVER_COMMAND;
var DRAGSTART_COMMAND2 = mod.DRAGSTART_COMMAND;
var DROP_COMMAND2 = mod.DROP_COMMAND;
var DecoratorNode2 = mod.DecoratorNode;
var ElementNode2 = mod.ElementNode;
var FOCUS_COMMAND2 = mod.FOCUS_COMMAND;
var FORMAT_ELEMENT_COMMAND2 = mod.FORMAT_ELEMENT_COMMAND;
var FORMAT_TEXT_COMMAND2 = mod.FORMAT_TEXT_COMMAND;
var HISTORIC_TAG2 = mod.HISTORIC_TAG;
var HISTORY_MERGE_TAG2 = mod.HISTORY_MERGE_TAG;
var HISTORY_PUSH_TAG2 = mod.HISTORY_PUSH_TAG;
var INDENT_CONTENT_COMMAND2 = mod.INDENT_CONTENT_COMMAND;
var INPUT_COMMAND2 = mod.INPUT_COMMAND;
var INSERT_LINE_BREAK_COMMAND2 = mod.INSERT_LINE_BREAK_COMMAND;
var INSERT_PARAGRAPH_COMMAND2 = mod.INSERT_PARAGRAPH_COMMAND;
var INSERT_TAB_COMMAND2 = mod.INSERT_TAB_COMMAND;
var INTERNAL_$isBlock2 = mod.INTERNAL_$isBlock;
var IS_ALL_FORMATTING2 = mod.IS_ALL_FORMATTING;
var IS_BOLD2 = mod.IS_BOLD;
var IS_CODE2 = mod.IS_CODE;
var IS_HIGHLIGHT2 = mod.IS_HIGHLIGHT;
var IS_ITALIC2 = mod.IS_ITALIC;
var IS_STRIKETHROUGH2 = mod.IS_STRIKETHROUGH;
var IS_SUBSCRIPT2 = mod.IS_SUBSCRIPT;
var IS_SUPERSCRIPT2 = mod.IS_SUPERSCRIPT;
var IS_UNDERLINE2 = mod.IS_UNDERLINE;
var KEY_ARROW_DOWN_COMMAND2 = mod.KEY_ARROW_DOWN_COMMAND;
var KEY_ARROW_LEFT_COMMAND2 = mod.KEY_ARROW_LEFT_COMMAND;
var KEY_ARROW_RIGHT_COMMAND2 = mod.KEY_ARROW_RIGHT_COMMAND;
var KEY_ARROW_UP_COMMAND2 = mod.KEY_ARROW_UP_COMMAND;
var KEY_BACKSPACE_COMMAND2 = mod.KEY_BACKSPACE_COMMAND;
var KEY_DELETE_COMMAND2 = mod.KEY_DELETE_COMMAND;
var KEY_DOWN_COMMAND2 = mod.KEY_DOWN_COMMAND;
var KEY_ENTER_COMMAND2 = mod.KEY_ENTER_COMMAND;
var KEY_ESCAPE_COMMAND2 = mod.KEY_ESCAPE_COMMAND;
var KEY_MODIFIER_COMMAND2 = mod.KEY_MODIFIER_COMMAND;
var KEY_SPACE_COMMAND2 = mod.KEY_SPACE_COMMAND;
var KEY_TAB_COMMAND2 = mod.KEY_TAB_COMMAND;
var LineBreakNode2 = mod.LineBreakNode;
var MOVE_TO_END2 = mod.MOVE_TO_END;
var MOVE_TO_START2 = mod.MOVE_TO_START;
var NODE_STATE_KEY2 = mod.NODE_STATE_KEY;
var OUTDENT_CONTENT_COMMAND2 = mod.OUTDENT_CONTENT_COMMAND;
var PASTE_COMMAND2 = mod.PASTE_COMMAND;
var PASTE_TAG2 = mod.PASTE_TAG;
var ParagraphNode2 = mod.ParagraphNode;
var REDO_COMMAND2 = mod.REDO_COMMAND;
var REMOVE_TEXT_COMMAND2 = mod.REMOVE_TEXT_COMMAND;
var RootNode2 = mod.RootNode;
var SELECTION_CHANGE_COMMAND2 = mod.SELECTION_CHANGE_COMMAND;
var SELECTION_INSERT_CLIPBOARD_NODES_COMMAND2 = mod.SELECTION_INSERT_CLIPBOARD_NODES_COMMAND;
var SELECT_ALL_COMMAND2 = mod.SELECT_ALL_COMMAND;
var SKIP_COLLAB_TAG2 = mod.SKIP_COLLAB_TAG;
var SKIP_DOM_SELECTION_TAG2 = mod.SKIP_DOM_SELECTION_TAG;
var SKIP_SCROLL_INTO_VIEW_TAG2 = mod.SKIP_SCROLL_INTO_VIEW_TAG;
var SKIP_SELECTION_FOCUS_TAG2 = mod.SKIP_SELECTION_FOCUS_TAG;
var TEXT_TYPE_TO_FORMAT2 = mod.TEXT_TYPE_TO_FORMAT;
var TabNode2 = mod.TabNode;
var TextNode2 = mod.TextNode;
var UNDO_COMMAND2 = mod.UNDO_COMMAND;
var addClassNamesToElement2 = mod.addClassNamesToElement;
var buildImportMap2 = mod.buildImportMap;
var configExtension2 = mod.configExtension;
var createCommand2 = mod.createCommand;
var createEditor2 = mod.createEditor;
var createSharedNodeState2 = mod.createSharedNodeState;
var createState2 = mod.createState;
var declarePeerDependency2 = mod.declarePeerDependency;
var defineExtension2 = mod.defineExtension;
var flipDirection2 = mod.flipDirection;
var getDOMOwnerDocument2 = mod.getDOMOwnerDocument;
var getDOMSelection2 = mod.getDOMSelection;
var getDOMSelectionFromTarget2 = mod.getDOMSelectionFromTarget;
var getDOMTextNode2 = mod.getDOMTextNode;
var getEditorPropertyFromDOMNode2 = mod.getEditorPropertyFromDOMNode;
var getNearestEditorFromDOMNode2 = mod.getNearestEditorFromDOMNode;
var getRegisteredNode2 = mod.getRegisteredNode;
var getRegisteredNodeOrThrow2 = mod.getRegisteredNodeOrThrow;
var getStaticNodeConfig2 = mod.getStaticNodeConfig;
var getTextDirection2 = mod.getTextDirection;
var getTransformSetFromKlass2 = mod.getTransformSetFromKlass;
var isBlockDomNode2 = mod.isBlockDomNode;
var isCurrentlyReadOnlyMode2 = mod.isCurrentlyReadOnlyMode;
var isDOMDocumentNode2 = mod.isDOMDocumentNode;
var isDOMNode2 = mod.isDOMNode;
var isDOMTextNode2 = mod.isDOMTextNode;
var isDOMUnmanaged2 = mod.isDOMUnmanaged;
var isDocumentFragment2 = mod.isDocumentFragment;
var isExactShortcutMatch2 = mod.isExactShortcutMatch;
var isHTMLAnchorElement2 = mod.isHTMLAnchorElement;
var isHTMLElement2 = mod.isHTMLElement;
var isInlineDomNode2 = mod.isInlineDomNode;
var isLexicalEditor2 = mod.isLexicalEditor;
var isModifierMatch2 = mod.isModifierMatch;
var isSelectionCapturedInDecoratorInput2 = mod.isSelectionCapturedInDecoratorInput;
var isSelectionWithinEditor2 = mod.isSelectionWithinEditor;
var makeStepwiseIterator2 = mod.makeStepwiseIterator;
var mergeRegister2 = mod.mergeRegister;
var normalizeClassNames2 = mod.normalizeClassNames;
var removeClassNamesFromElement2 = mod.removeClassNamesFromElement;
var removeFromParent2 = mod.removeFromParent;
var resetRandomKey2 = mod.resetRandomKey;
var safeCast2 = mod.safeCast;
var setDOMUnmanaged2 = mod.setDOMUnmanaged;
var setNodeIndentFromDOM2 = mod.setNodeIndentFromDOM;
var shallowMergeConfig2 = mod.shallowMergeConfig;
var toggleTextFormatType2 = mod.toggleTextFormatType;

// node_modules/@lexical/plain-text/LexicalPlainText.dev.mjs
var LexicalPlainText_dev_exports = {};
__export(LexicalPlainText_dev_exports, {
  PlainTextExtension: () => PlainTextExtension,
  registerPlainText: () => registerPlainText
});

// node_modules/@lexical/clipboard/LexicalClipboard.dev.mjs
var LexicalClipboard_dev_exports = {};
__export(LexicalClipboard_dev_exports, {
  $generateJSONFromSelectedNodes: () => $generateJSONFromSelectedNodes,
  $generateNodesFromSerializedNodes: () => $generateNodesFromSerializedNodes,
  $getClipboardDataFromSelection: () => $getClipboardDataFromSelection,
  $getHtmlContent: () => $getHtmlContent,
  $getLexicalContent: () => $getLexicalContent,
  $insertDataTransferForPlainText: () => $insertDataTransferForPlainText,
  $insertDataTransferForRichText: () => $insertDataTransferForRichText,
  $insertGeneratedNodes: () => $insertGeneratedNodes,
  copyToClipboard: () => copyToClipboard,
  setLexicalClipboardDataTransfer: () => setLexicalClipboardDataTransfer
});

// node_modules/@lexical/html/LexicalHtml.dev.mjs
var LexicalHtml_dev_exports = {};
__export(LexicalHtml_dev_exports, {
  $generateHtmlFromNodes: () => $generateHtmlFromNodes,
  $generateNodesFromDOM: () => $generateNodesFromDOM
});

// node_modules/@lexical/selection/LexicalSelection.dev.mjs
var LexicalSelection_dev_exports = {};
__export(LexicalSelection_dev_exports, {
  $addNodeStyle: () => $addNodeStyle,
  $cloneWithProperties: () => $cloneWithProperties2,
  $copyBlockFormatIndent: () => $copyBlockFormatIndent,
  $ensureForwardRangeSelection: () => $ensureForwardRangeSelection,
  $forEachSelectedTextNode: () => $forEachSelectedTextNode,
  $getComputedStyleForElement: () => $getComputedStyleForElement,
  $getComputedStyleForParent: () => $getComputedStyleForParent,
  $getSelectionStyleValueForProperty: () => $getSelectionStyleValueForProperty,
  $isAtNodeEnd: () => $isAtNodeEnd,
  $isParentElementRTL: () => $isParentElementRTL,
  $isParentRTL: () => $isParentRTL,
  $moveCaretSelection: () => $moveCaretSelection,
  $moveCharacter: () => $moveCharacter,
  $patchStyleText: () => $patchStyleText,
  $selectAll: () => $selectAll2,
  $setBlocksType: () => $setBlocksType,
  $shouldOverrideDefaultCharacterSelection: () => $shouldOverrideDefaultCharacterSelection,
  $sliceSelectedTextNodeContent: () => $sliceSelectedTextNodeContent,
  $trimTextContentFromAnchor: () => $trimTextContentFromAnchor,
  $wrapNodes: () => $wrapNodes,
  createDOMRange: () => createDOMRange,
  createRectsFromDOMRange: () => createRectsFromDOMRange,
  getCSSFromStyleObject: () => getCSSFromStyleObject,
  getStyleObjectFromCSS: () => getStyleObjectFromCSS,
  trimTextContentFromAnchor: () => trimTextContentFromAnchor
});
function formatDevErrorMessage2(message) {
  throw new Error(message);
}
var CSS_TO_STYLES = /* @__PURE__ */ new Map();
function getDOMTextNode3(element) {
  let node = element;
  while (node != null) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node;
    }
    node = node.firstChild;
  }
  return null;
}
function getDOMIndexWithinParent(node) {
  const parent = node.parentNode;
  if (parent == null) {
    throw new Error("Should never happen");
  }
  return [parent, Array.from(parent.childNodes).indexOf(node)];
}
function createDOMRange(editor, anchorNode, _anchorOffset, focusNode, _focusOffset) {
  const anchorKey = anchorNode.getKey();
  const focusKey = focusNode.getKey();
  const range = document.createRange();
  let anchorDOM = editor.getElementByKey(anchorKey);
  let focusDOM = editor.getElementByKey(focusKey);
  let anchorOffset = _anchorOffset;
  let focusOffset = _focusOffset;
  if ($isTextNode2(anchorNode)) {
    anchorDOM = getDOMTextNode3(anchorDOM);
  }
  if ($isTextNode2(focusNode)) {
    focusDOM = getDOMTextNode3(focusDOM);
  }
  if (anchorNode === void 0 || focusNode === void 0 || anchorDOM === null || focusDOM === null) {
    return null;
  }
  if (anchorDOM.nodeName === "BR") {
    [anchorDOM, anchorOffset] = getDOMIndexWithinParent(anchorDOM);
  }
  if (focusDOM.nodeName === "BR") {
    [focusDOM, focusOffset] = getDOMIndexWithinParent(focusDOM);
  }
  const firstChild = anchorDOM.firstChild;
  if (anchorDOM === focusDOM && firstChild != null && firstChild.nodeName === "BR" && anchorOffset === 0 && focusOffset === 0) {
    focusOffset = 1;
  }
  try {
    range.setStart(anchorDOM, anchorOffset);
    range.setEnd(focusDOM, focusOffset);
  } catch (_e) {
    return null;
  }
  if (range.collapsed && (anchorOffset !== focusOffset || anchorKey !== focusKey)) {
    range.setStart(focusDOM, focusOffset);
    range.setEnd(anchorDOM, anchorOffset);
  }
  return range;
}
function createRectsFromDOMRange(editor, range) {
  const rootElement = editor.getRootElement();
  if (rootElement === null) {
    return [];
  }
  const rootRect = rootElement.getBoundingClientRect();
  const computedStyle = getComputedStyle(rootElement);
  const rootPadding = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
  const selectionRects = Array.from(range.getClientRects());
  let selectionRectsLength = selectionRects.length;
  selectionRects.sort((a2, b2) => {
    const top = a2.top - b2.top;
    if (Math.abs(top) <= 3) {
      return a2.left - b2.left;
    }
    return top;
  });
  let prevRect;
  for (let i2 = 0; i2 < selectionRectsLength; i2++) {
    const selectionRect = selectionRects[i2];
    const isOverlappingRect = prevRect && prevRect.top <= selectionRect.top && prevRect.top + prevRect.height > selectionRect.top && prevRect.left + prevRect.width > selectionRect.left;
    const selectionSpansElement = selectionRect.width + rootPadding === rootRect.width;
    if (isOverlappingRect || selectionSpansElement) {
      selectionRects.splice(i2--, 1);
      selectionRectsLength--;
      continue;
    }
    prevRect = selectionRect;
  }
  return selectionRects;
}
function getStyleObjectFromRawCSS(css) {
  const styleObject = {};
  if (!css) {
    return styleObject;
  }
  const styles = css.split(";");
  for (const style of styles) {
    if (style !== "") {
      const [key, value] = style.split(/:([^]+)/);
      if (key && value) {
        styleObject[key.trim()] = value.trim();
      }
    }
  }
  return styleObject;
}
function getStyleObjectFromCSS(css) {
  let value = CSS_TO_STYLES.get(css);
  if (value === void 0) {
    value = getStyleObjectFromRawCSS(css);
    CSS_TO_STYLES.set(css, value);
  }
  {
    Object.freeze(value);
  }
  return value;
}
function getCSSFromStyleObject(styles) {
  let css = "";
  for (const style in styles) {
    if (style) {
      css += `${style}: ${styles[style]};`;
    }
  }
  return css;
}
function $getComputedStyleForElement(element) {
  const editor = $getEditor2();
  const domElement = editor.getElementByKey(element.getKey());
  if (domElement === null) {
    return null;
  }
  const view = domElement.ownerDocument.defaultView;
  if (view === null) {
    return null;
  }
  return view.getComputedStyle(domElement);
}
function $getComputedStyleForParent(node) {
  const parent = $isRootNode2(node) ? node : node.getParentOrThrow();
  return $getComputedStyleForElement(parent);
}
function $isParentRTL(node) {
  const styles = $getComputedStyleForParent(node);
  return styles !== null && styles.direction === "rtl";
}
function $sliceSelectedTextNodeContent(selection, textNode, mutates = "self") {
  const anchorAndFocus = selection.getStartEndPoints();
  if (textNode.isSelected(selection) && !$isTokenOrSegmented2(textNode) && anchorAndFocus !== null) {
    const [anchor, focus] = anchorAndFocus;
    const isBackward = selection.isBackward();
    const anchorNode = anchor.getNode();
    const focusNode = focus.getNode();
    const isAnchor = textNode.is(anchorNode);
    const isFocus = textNode.is(focusNode);
    if (isAnchor || isFocus) {
      const [anchorOffset, focusOffset] = $getCharacterOffsets2(selection);
      const isSame = anchorNode.is(focusNode);
      const isFirst = textNode.is(isBackward ? focusNode : anchorNode);
      const isLast = textNode.is(isBackward ? anchorNode : focusNode);
      let startOffset = 0;
      let endOffset = void 0;
      if (isSame) {
        startOffset = anchorOffset > focusOffset ? focusOffset : anchorOffset;
        endOffset = anchorOffset > focusOffset ? anchorOffset : focusOffset;
      } else if (isFirst) {
        const offset = isBackward ? focusOffset : anchorOffset;
        startOffset = offset;
        endOffset = void 0;
      } else if (isLast) {
        const offset = isBackward ? anchorOffset : focusOffset;
        startOffset = 0;
        endOffset = offset;
      }
      const text = textNode.__text.slice(startOffset, endOffset);
      if (text !== textNode.__text) {
        if (mutates === "clone") {
          textNode = $cloneWithPropertiesEphemeral2(textNode);
        }
        textNode.__text = text;
      }
    }
  }
  return textNode;
}
function $isAtNodeEnd(point) {
  if (point.type === "text") {
    return point.offset === point.getNode().getTextContentSize();
  }
  const node = point.getNode();
  if (!$isElementNode2(node)) {
    formatDevErrorMessage2(`isAtNodeEnd: node must be a TextNode or ElementNode`);
  }
  return point.offset === node.getChildrenSize();
}
function $trimTextContentFromAnchor(editor, anchor, delCount) {
  let currentNode = anchor.getNode();
  let remaining = delCount;
  if ($isElementNode2(currentNode)) {
    const descendantNode = currentNode.getDescendantByIndex(anchor.offset);
    if (descendantNode !== null) {
      currentNode = descendantNode;
    }
  }
  while (remaining > 0 && currentNode !== null) {
    if ($isElementNode2(currentNode)) {
      const lastDescendant = currentNode.getLastDescendant();
      if (lastDescendant !== null) {
        currentNode = lastDescendant;
      }
    }
    let nextNode = currentNode.getPreviousSibling();
    let additionalElementWhitespace = 0;
    if (nextNode === null) {
      let parent = currentNode.getParentOrThrow();
      let parentSibling = parent.getPreviousSibling();
      while (parentSibling === null) {
        parent = parent.getParent();
        if (parent === null) {
          nextNode = null;
          break;
        }
        parentSibling = parent.getPreviousSibling();
      }
      if (parent !== null) {
        additionalElementWhitespace = parent.isInline() ? 0 : 2;
        nextNode = parentSibling;
      }
    }
    let text = currentNode.getTextContent();
    if (text === "" && $isElementNode2(currentNode) && !currentNode.isInline()) {
      text = "\n\n";
    }
    const currentNodeSize = text.length;
    if (!$isTextNode2(currentNode) || remaining >= currentNodeSize) {
      const parent = currentNode.getParent();
      currentNode.remove();
      if (parent != null && parent.getChildrenSize() === 0 && !$isRootNode2(parent)) {
        parent.remove();
      }
      remaining -= currentNodeSize + additionalElementWhitespace;
      currentNode = nextNode;
    } else {
      const key = currentNode.getKey();
      const prevTextContent = editor.getEditorState().read(() => {
        const prevNode = $getNodeByKey2(key);
        if ($isTextNode2(prevNode) && prevNode.isSimpleText()) {
          return prevNode.getTextContent();
        }
        return null;
      });
      const offset = currentNodeSize - remaining;
      const slicedText = text.slice(0, offset);
      if (prevTextContent !== null && prevTextContent !== text) {
        const prevSelection = $getPreviousSelection2();
        let target = currentNode;
        if (!currentNode.isSimpleText()) {
          const textNode = $createTextNode2(prevTextContent);
          currentNode.replace(textNode);
          target = textNode;
        } else {
          currentNode.setTextContent(prevTextContent);
        }
        if ($isRangeSelection2(prevSelection) && prevSelection.isCollapsed()) {
          const prevOffset = prevSelection.anchor.offset;
          target.select(prevOffset, prevOffset);
        }
      } else if (currentNode.isSimpleText()) {
        const isSelected = anchor.key === key;
        let anchorOffset = anchor.offset;
        if (anchorOffset < remaining) {
          anchorOffset = currentNodeSize;
        }
        const splitStart = isSelected ? anchorOffset - remaining : 0;
        const splitEnd = isSelected ? anchorOffset : offset;
        if (isSelected && splitStart === 0) {
          const [excessNode] = currentNode.splitText(splitStart, splitEnd);
          excessNode.remove();
        } else {
          const [, excessNode] = currentNode.splitText(splitStart, splitEnd);
          excessNode.remove();
        }
      } else {
        const textNode = $createTextNode2(slicedText);
        currentNode.replace(textNode);
      }
      remaining = 0;
    }
  }
}
function $addNodeStyle(node) {
  const CSSText = node.getStyle();
  const styles = getStyleObjectFromRawCSS(CSSText);
  CSS_TO_STYLES.set(CSSText, styles);
}
function $patchStyle(target, patch) {
  if (!($isRangeSelection2(target) ? target.isCollapsed() : $isTextNode2(target) || $isElementNode2(target))) {
    formatDevErrorMessage2(`$patchStyle must only be called with a TextNode, ElementNode, or collapsed RangeSelection`);
  }
  const prevStyles = getStyleObjectFromCSS($isRangeSelection2(target) ? target.style : $isTextNode2(target) ? target.getStyle() : target.getTextStyle());
  const newStyles = Object.entries(patch).reduce((styles, [key, value]) => {
    if (typeof value === "function") {
      styles[key] = value(prevStyles[key], target);
    } else if (value === null) {
      delete styles[key];
    } else {
      styles[key] = value;
    }
    return styles;
  }, {
    ...prevStyles
  });
  const newCSSText = getCSSFromStyleObject(newStyles);
  if ($isRangeSelection2(target) || $isTextNode2(target)) {
    target.setStyle(newCSSText);
  } else {
    target.setTextStyle(newCSSText);
  }
  CSS_TO_STYLES.set(newCSSText, newStyles);
}
function $patchStyleText(selection, patch) {
  if ($isRangeSelection2(selection) && selection.isCollapsed()) {
    $patchStyle(selection, patch);
    const emptyNode = selection.anchor.getNode();
    if ($isElementNode2(emptyNode) && emptyNode.isEmpty()) {
      $patchStyle(emptyNode, patch);
    }
  }
  $forEachSelectedTextNode((textNode) => {
    $patchStyle(textNode, patch);
  });
  const nodes = selection.getNodes();
  if (nodes.length > 0) {
    const patchedElementKeys = /* @__PURE__ */ new Set();
    for (const node of nodes) {
      if (!$isElementNode2(node) || !node.canBeEmpty() || node.getChildrenSize() !== 0) {
        continue;
      }
      const key = node.getKey();
      if (patchedElementKeys.has(key)) {
        continue;
      }
      patchedElementKeys.add(key);
      $patchStyle(node, patch);
    }
  }
}
function $forEachSelectedTextNode(fn) {
  const selection = $getSelection2();
  if (!selection) {
    return;
  }
  const slicedTextNodes = /* @__PURE__ */ new Map();
  const getSliceIndices = (node) => slicedTextNodes.get(node.getKey()) || [0, node.getTextContentSize()];
  if ($isRangeSelection2(selection)) {
    for (const slice of $caretRangeFromSelection2(selection).getTextSlices()) {
      if (slice) {
        slicedTextNodes.set(slice.caret.origin.getKey(), slice.getSliceIndices());
      }
    }
  }
  const selectedNodes = selection.getNodes();
  for (const selectedNode of selectedNodes) {
    if (!($isTextNode2(selectedNode) && selectedNode.canHaveFormat())) {
      continue;
    }
    const [startOffset, endOffset] = getSliceIndices(selectedNode);
    if (endOffset === startOffset) {
      continue;
    }
    if ($isTokenOrSegmented2(selectedNode) || startOffset === 0 && endOffset === selectedNode.getTextContentSize()) {
      fn(selectedNode);
    } else {
      const splitNodes = selectedNode.splitText(startOffset, endOffset);
      const replacement = splitNodes[startOffset === 0 ? 0 : 1];
      fn(replacement);
    }
  }
  if ($isRangeSelection2(selection) && selection.anchor.type === "text" && selection.focus.type === "text" && selection.anchor.key === selection.focus.key) {
    $ensureForwardRangeSelection(selection);
  }
}
function $ensureForwardRangeSelection(selection) {
  if (selection.isBackward()) {
    const {
      anchor,
      focus
    } = selection;
    const {
      key,
      offset,
      type
    } = anchor;
    anchor.set(focus.key, focus.offset, focus.type);
    focus.set(key, offset, type);
  }
}
function $copyBlockFormatIndent(srcNode, destNode) {
  const format = srcNode.getFormatType();
  const indent = srcNode.getIndent();
  if (format !== destNode.getFormatType()) {
    destNode.setFormat(format);
  }
  if (indent !== destNode.getIndent()) {
    destNode.setIndent(indent);
  }
}
function $setBlocksType(selection, $createElement, $afterCreateElement = $copyBlockFormatIndent) {
  if (selection === null) {
    return;
  }
  const anchorAndFocus = selection.getStartEndPoints();
  const blockMap = /* @__PURE__ */ new Map();
  let newSelection = null;
  if (anchorAndFocus) {
    const [anchor, focus] = anchorAndFocus;
    newSelection = $createRangeSelection2();
    newSelection.anchor.set(anchor.key, anchor.offset, anchor.type);
    newSelection.focus.set(focus.key, focus.offset, focus.type);
    const anchorBlock = $findMatchingParent2(anchor.getNode(), INTERNAL_$isBlock2);
    const focusBlock = $findMatchingParent2(focus.getNode(), INTERNAL_$isBlock2);
    if ($isElementNode2(anchorBlock)) {
      blockMap.set(anchorBlock.getKey(), anchorBlock);
    }
    if ($isElementNode2(focusBlock)) {
      blockMap.set(focusBlock.getKey(), focusBlock);
    }
  }
  for (const node of selection.getNodes()) {
    if ($isElementNode2(node) && INTERNAL_$isBlock2(node)) {
      blockMap.set(node.getKey(), node);
    } else if (anchorAndFocus === null) {
      const ancestorBlock = $findMatchingParent2(node, INTERNAL_$isBlock2);
      if ($isElementNode2(ancestorBlock)) {
        blockMap.set(ancestorBlock.getKey(), ancestorBlock);
      }
    }
  }
  for (const [key, prevNode] of blockMap) {
    const element = $createElement();
    $afterCreateElement(prevNode, element);
    prevNode.replace(element, true);
    if (newSelection) {
      if (key === newSelection.anchor.key) {
        newSelection.anchor.set(element.getKey(), newSelection.anchor.offset, newSelection.anchor.type);
      }
      if (key === newSelection.focus.key) {
        newSelection.focus.set(element.getKey(), newSelection.focus.offset, newSelection.focus.type);
      }
    }
  }
  if (newSelection && selection.is($getSelection2())) {
    $setSelection2(newSelection);
  }
}
function isPointAttached(point) {
  return point.getNode().isAttached();
}
function $removeParentEmptyElements(startingNode) {
  let node = startingNode;
  while (node !== null && !$isRootOrShadowRoot2(node)) {
    const latest = node.getLatest();
    const parentNode = node.getParent();
    if (latest.getChildrenSize() === 0) {
      node.remove(true);
    }
    node = parentNode;
  }
}
function $wrapNodes(selection, createElement, wrappingElement = null) {
  const anchorAndFocus = selection.getStartEndPoints();
  const anchor = anchorAndFocus ? anchorAndFocus[0] : null;
  const nodes = selection.getNodes();
  const nodesLength = nodes.length;
  if (anchor !== null && (nodesLength === 0 || nodesLength === 1 && anchor.type === "element" && anchor.getNode().getChildrenSize() === 0)) {
    const target = anchor.type === "text" ? anchor.getNode().getParentOrThrow() : anchor.getNode();
    const children = target.getChildren();
    let element = createElement();
    element.setFormat(target.getFormatType());
    element.setIndent(target.getIndent());
    children.forEach((child) => element.append(child));
    if (wrappingElement) {
      element = wrappingElement.append(element);
    }
    target.replace(element);
    return;
  }
  let topLevelNode = null;
  let descendants = [];
  for (let i2 = 0; i2 < nodesLength; i2++) {
    const node = nodes[i2];
    if ($isRootOrShadowRoot2(node)) {
      $wrapNodesImpl(selection, descendants, descendants.length, createElement, wrappingElement);
      descendants = [];
      topLevelNode = node;
    } else if (topLevelNode === null || topLevelNode !== null && $hasAncestor2(node, topLevelNode)) {
      descendants.push(node);
    } else {
      $wrapNodesImpl(selection, descendants, descendants.length, createElement, wrappingElement);
      descendants = [node];
    }
  }
  $wrapNodesImpl(selection, descendants, descendants.length, createElement, wrappingElement);
}
function $wrapNodesImpl(selection, nodes, nodesLength, createElement, wrappingElement = null) {
  if (nodes.length === 0) {
    return;
  }
  const firstNode = nodes[0];
  const elementMapping = /* @__PURE__ */ new Map();
  const elements = [];
  let target = $isElementNode2(firstNode) ? firstNode : firstNode.getParentOrThrow();
  if (target.isInline()) {
    target = target.getParentOrThrow();
  }
  let targetIsPrevSibling = false;
  while (target !== null) {
    const prevSibling = target.getPreviousSibling();
    if (prevSibling !== null) {
      target = prevSibling;
      targetIsPrevSibling = true;
      break;
    }
    target = target.getParentOrThrow();
    if ($isRootOrShadowRoot2(target)) {
      break;
    }
  }
  const emptyElements = /* @__PURE__ */ new Set();
  for (let i2 = 0; i2 < nodesLength; i2++) {
    const node = nodes[i2];
    if ($isElementNode2(node) && node.getChildrenSize() === 0) {
      emptyElements.add(node.getKey());
    }
  }
  const movedNodes = /* @__PURE__ */ new Set();
  for (let i2 = 0; i2 < nodesLength; i2++) {
    const node = nodes[i2];
    let parent = node.getParent();
    if (parent !== null && parent.isInline()) {
      parent = parent.getParent();
    }
    if (parent !== null && $isLeafNode2(node) && !movedNodes.has(node.getKey())) {
      const parentKey = parent.getKey();
      if (elementMapping.get(parentKey) === void 0) {
        const targetElement = createElement();
        targetElement.setFormat(parent.getFormatType());
        targetElement.setIndent(parent.getIndent());
        elements.push(targetElement);
        elementMapping.set(parentKey, targetElement);
        parent.getChildren().forEach((child) => {
          targetElement.append(child);
          movedNodes.add(child.getKey());
          if ($isElementNode2(child)) {
            child.getChildrenKeys().forEach((key) => movedNodes.add(key));
          }
        });
        $removeParentEmptyElements(parent);
      }
    } else if (emptyElements.has(node.getKey())) {
      if (!$isElementNode2(node)) {
        formatDevErrorMessage2(`Expected node in emptyElements to be an ElementNode`);
      }
      const targetElement = createElement();
      targetElement.setFormat(node.getFormatType());
      targetElement.setIndent(node.getIndent());
      elements.push(targetElement);
      node.remove(true);
    }
  }
  if (wrappingElement !== null) {
    for (let i2 = 0; i2 < elements.length; i2++) {
      const element = elements[i2];
      wrappingElement.append(element);
    }
  }
  let lastElement = null;
  if ($isRootOrShadowRoot2(target)) {
    if (targetIsPrevSibling) {
      if (wrappingElement !== null) {
        target.insertAfter(wrappingElement);
      } else {
        for (let i2 = elements.length - 1; i2 >= 0; i2--) {
          const element = elements[i2];
          target.insertAfter(element);
        }
      }
    } else {
      const firstChild = target.getFirstChild();
      if ($isElementNode2(firstChild)) {
        target = firstChild;
      }
      if (firstChild === null) {
        if (wrappingElement) {
          target.append(wrappingElement);
        } else {
          for (let i2 = 0; i2 < elements.length; i2++) {
            const element = elements[i2];
            target.append(element);
            lastElement = element;
          }
        }
      } else {
        if (wrappingElement !== null) {
          firstChild.insertBefore(wrappingElement);
        } else {
          for (let i2 = 0; i2 < elements.length; i2++) {
            const element = elements[i2];
            firstChild.insertBefore(element);
            lastElement = element;
          }
        }
      }
    }
  } else {
    if (wrappingElement) {
      target.insertAfter(wrappingElement);
    } else {
      for (let i2 = elements.length - 1; i2 >= 0; i2--) {
        const element = elements[i2];
        target.insertAfter(element);
        lastElement = element;
      }
    }
  }
  const prevSelection = $getPreviousSelection2();
  if ($isRangeSelection2(prevSelection) && isPointAttached(prevSelection.anchor) && isPointAttached(prevSelection.focus)) {
    $setSelection2(prevSelection.clone());
  } else if (lastElement !== null) {
    lastElement.selectEnd();
  } else {
    selection.dirty = true;
  }
}
function $isEditorVerticalOrientation(selection) {
  const computedStyle = $getComputedStyle(selection);
  return computedStyle !== null && computedStyle.writingMode === "vertical-rl";
}
function $getComputedStyle(selection) {
  const anchorNode = selection.anchor.getNode();
  if ($isElementNode2(anchorNode)) {
    return $getComputedStyleForElement(anchorNode);
  }
  return $getComputedStyleForParent(anchorNode);
}
function $shouldOverrideDefaultCharacterSelection(selection, isBackward) {
  const isVertical = $isEditorVerticalOrientation(selection);
  let adjustedIsBackward = isVertical ? !isBackward : isBackward;
  if ($isParentElementRTL(selection)) {
    adjustedIsBackward = !adjustedIsBackward;
  }
  const focusCaret = $caretFromPoint2(selection.focus, adjustedIsBackward ? "previous" : "next");
  if ($isExtendableTextPointCaret2(focusCaret)) {
    return false;
  }
  for (const nextCaret of $extendCaretToRange2(focusCaret)) {
    if ($isChildCaret2(nextCaret)) {
      return !nextCaret.origin.isInline();
    } else if ($isElementNode2(nextCaret.origin)) {
      continue;
    } else if ($isDecoratorNode2(nextCaret.origin)) {
      return true;
    }
    break;
  }
  return false;
}
function $moveCaretSelection(selection, isHoldingShift, isBackward, granularity) {
  selection.modify(isHoldingShift ? "extend" : "move", isBackward, granularity);
}
function $isParentElementRTL(selection) {
  const computedStyle = $getComputedStyle(selection);
  return computedStyle !== null && computedStyle.direction === "rtl";
}
function $moveCharacter(selection, isHoldingShift, isBackward) {
  const isRTL = $isParentElementRTL(selection);
  const isVertical = $isEditorVerticalOrientation(selection);
  let adjustedIsBackward;
  if (isVertical) {
    adjustedIsBackward = !isBackward;
  } else if (isRTL) {
    adjustedIsBackward = !isBackward;
  } else {
    adjustedIsBackward = isBackward;
  }
  $moveCaretSelection(selection, isHoldingShift, adjustedIsBackward, "character");
}
function $getNodeStyleValueForProperty(node, styleProperty, defaultValue) {
  const css = node.getStyle();
  const styleObject = getStyleObjectFromCSS(css);
  if (styleObject !== null) {
    return styleObject[styleProperty] || defaultValue;
  }
  return defaultValue;
}
function $getSelectionStyleValueForProperty(selection, styleProperty, defaultValue = "") {
  let styleValue = null;
  const nodes = selection.getNodes();
  const anchor = selection.anchor;
  const focus = selection.focus;
  const isBackward = selection.isBackward();
  const endOffset = isBackward ? focus.offset : anchor.offset;
  const endNode = isBackward ? focus.getNode() : anchor.getNode();
  if ($isRangeSelection2(selection) && selection.isCollapsed() && selection.style !== "") {
    const css = selection.style;
    const styleObject = getStyleObjectFromCSS(css);
    if (styleObject !== null && styleProperty in styleObject) {
      return styleObject[styleProperty];
    }
  }
  for (let i2 = 0; i2 < nodes.length; i2++) {
    const node = nodes[i2];
    if (i2 !== 0 && endOffset === 0 && node.is(endNode)) {
      continue;
    }
    if ($isTextNode2(node)) {
      const nodeStyleValue = $getNodeStyleValueForProperty(node, styleProperty, defaultValue);
      if (styleValue === null) {
        styleValue = nodeStyleValue;
      } else if (styleValue !== nodeStyleValue) {
        styleValue = "";
        break;
      }
    }
  }
  return styleValue === null ? defaultValue : styleValue;
}
var trimTextContentFromAnchor = $trimTextContentFromAnchor;

// node_modules/@lexical/selection/LexicalSelection.mjs
var mod2 = true ? LexicalSelection_dev_exports : LexicalSelection_prod_exports;
var $addNodeStyle2 = mod2.$addNodeStyle;
var $cloneWithProperties3 = mod2.$cloneWithProperties;
var $copyBlockFormatIndent2 = mod2.$copyBlockFormatIndent;
var $ensureForwardRangeSelection2 = mod2.$ensureForwardRangeSelection;
var $forEachSelectedTextNode2 = mod2.$forEachSelectedTextNode;
var $getComputedStyleForElement2 = mod2.$getComputedStyleForElement;
var $getComputedStyleForParent2 = mod2.$getComputedStyleForParent;
var $getSelectionStyleValueForProperty2 = mod2.$getSelectionStyleValueForProperty;
var $isAtNodeEnd2 = mod2.$isAtNodeEnd;
var $isParentElementRTL2 = mod2.$isParentElementRTL;
var $isParentRTL2 = mod2.$isParentRTL;
var $moveCaretSelection2 = mod2.$moveCaretSelection;
var $moveCharacter2 = mod2.$moveCharacter;
var $patchStyleText2 = mod2.$patchStyleText;
var $selectAll3 = mod2.$selectAll;
var $setBlocksType2 = mod2.$setBlocksType;
var $shouldOverrideDefaultCharacterSelection2 = mod2.$shouldOverrideDefaultCharacterSelection;
var $sliceSelectedTextNodeContent2 = mod2.$sliceSelectedTextNodeContent;
var $trimTextContentFromAnchor2 = mod2.$trimTextContentFromAnchor;
var $wrapNodes2 = mod2.$wrapNodes;
var createDOMRange2 = mod2.createDOMRange;
var createRectsFromDOMRange2 = mod2.createRectsFromDOMRange;
var getCSSFromStyleObject2 = mod2.getCSSFromStyleObject;
var getStyleObjectFromCSS2 = mod2.getStyleObjectFromCSS;
var trimTextContentFromAnchor2 = mod2.trimTextContentFromAnchor;

// node_modules/@lexical/utils/LexicalUtils.dev.mjs
var LexicalUtils_dev_exports = {};
__export(LexicalUtils_dev_exports, {
  $descendantsMatching: () => $descendantsMatching,
  $dfs: () => $dfs,
  $dfsIterator: () => $dfsIterator,
  $filter: () => $filter,
  $findMatchingParent: () => $findMatchingParent2,
  $firstToLastIterator: () => $firstToLastIterator,
  $getAdjacentCaret: () => $getAdjacentCaret,
  $getAdjacentSiblingOrParentSiblingCaret: () => $getAdjacentSiblingOrParentSiblingCaret2,
  $getDepth: () => $getDepth,
  $getNearestBlockElementAncestorOrThrow: () => $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeOfType: () => $getNearestNodeOfType,
  $getNextRightPreorderNode: () => $getNextRightPreorderNode,
  $getNextSiblingOrParentSibling: () => $getNextSiblingOrParentSibling,
  $handleIndentAndOutdent: () => $handleIndentAndOutdent,
  $insertFirst: () => $insertFirst,
  $insertNodeToNearestRoot: () => $insertNodeToNearestRoot,
  $insertNodeToNearestRootAtCaret: () => $insertNodeToNearestRootAtCaret,
  $isEditorIsNestedEditor: () => $isEditorIsNestedEditor,
  $lastToFirstIterator: () => $lastToFirstIterator,
  $restoreEditorState: () => $restoreEditorState,
  $reverseDfs: () => $reverseDfs,
  $reverseDfsIterator: () => $reverseDfsIterator,
  $splitNode: () => $splitNode2,
  $unwrapAndFilterDescendants: () => $unwrapAndFilterDescendants,
  $unwrapNode: () => $unwrapNode,
  $wrapNodeInElement: () => $wrapNodeInElement,
  CAN_USE_BEFORE_INPUT: () => CAN_USE_BEFORE_INPUT2,
  CAN_USE_DOM: () => CAN_USE_DOM2,
  IS_ANDROID: () => IS_ANDROID2,
  IS_ANDROID_CHROME: () => IS_ANDROID_CHROME2,
  IS_APPLE: () => IS_APPLE2,
  IS_APPLE_WEBKIT: () => IS_APPLE_WEBKIT2,
  IS_CHROME: () => IS_CHROME2,
  IS_FIREFOX: () => IS_FIREFOX2,
  IS_IOS: () => IS_IOS2,
  IS_SAFARI: () => IS_SAFARI2,
  addClassNamesToElement: () => addClassNamesToElement2,
  calculateZoomLevel: () => calculateZoomLevel,
  isBlockDomNode: () => isBlockDomNode2,
  isHTMLAnchorElement: () => isHTMLAnchorElement2,
  isHTMLElement: () => isHTMLElement2,
  isInlineDomNode: () => isInlineDomNode2,
  isMimeType: () => isMimeType,
  makeStateWrapper: () => makeStateWrapper,
  markSelection: () => markSelection,
  mediaFileReader: () => mediaFileReader,
  mergeRegister: () => mergeRegister2,
  objectKlassEquals: () => objectKlassEquals,
  positionNodeOnRange: () => mlcPositionNodeOnRange,
  registerNestedElementResolver: () => registerNestedElementResolver,
  removeClassNamesFromElement: () => removeClassNamesFromElement2,
  selectionAlwaysOnDisplay: () => selectionAlwaysOnDisplay
});
function formatDevErrorMessage3(message) {
  throw new Error(message);
}
var CAN_USE_DOM$1 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var documentMode2 = CAN_USE_DOM$1 && "documentMode" in document ? document.documentMode : null;
var IS_APPLE$1 = CAN_USE_DOM$1 && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
var IS_FIREFOX$1 = CAN_USE_DOM$1 && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);
var CAN_USE_BEFORE_INPUT$1 = CAN_USE_DOM$1 && "InputEvent" in window && !documentMode2 ? "getTargetRanges" in new window.InputEvent("input") : false;
var IS_SAFARI$1 = CAN_USE_DOM$1 && /Version\/[\d.]+.*Safari/.test(navigator.userAgent);
var IS_IOS$1 = CAN_USE_DOM$1 && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var IS_ANDROID$1 = CAN_USE_DOM$1 && /Android/.test(navigator.userAgent);
var IS_CHROME$1 = CAN_USE_DOM$1 && /^(?=.*Chrome).*/i.test(navigator.userAgent);
var IS_ANDROID_CHROME$1 = CAN_USE_DOM$1 && IS_ANDROID$1 && IS_CHROME$1;
var IS_APPLE_WEBKIT$1 = CAN_USE_DOM$1 && /AppleWebKit\/[\d.]+/.test(navigator.userAgent) && IS_APPLE$1 && !IS_CHROME$1;
function px(value) {
  return `${value}px`;
}
var mutationObserverConfig = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
};
function prependDOMNode(parent, node) {
  parent.insertBefore(node, parent.firstChild);
}
function mlcPositionNodeOnRange(editor, range, onReposition) {
  let rootDOMNode = null;
  let parentDOMNode = null;
  let observer = null;
  let lastNodes = [];
  const wrapperNode = document.createElement("div");
  wrapperNode.style.position = "relative";
  function position() {
    if (!(rootDOMNode !== null)) {
      formatDevErrorMessage3(`Unexpected null rootDOMNode`);
    }
    if (!(parentDOMNode !== null)) {
      formatDevErrorMessage3(`Unexpected null parentDOMNode`);
    }
    const {
      left: parentLeft,
      top: parentTop
    } = parentDOMNode.getBoundingClientRect();
    const rects = createRectsFromDOMRange2(editor, range);
    if (!wrapperNode.isConnected) {
      prependDOMNode(parentDOMNode, wrapperNode);
    }
    let hasRepositioned = false;
    for (let i2 = 0; i2 < rects.length; i2++) {
      const rect = rects[i2];
      const rectNode = lastNodes[i2] || document.createElement("div");
      const rectNodeStyle = rectNode.style;
      if (rectNodeStyle.position !== "absolute") {
        rectNodeStyle.position = "absolute";
        hasRepositioned = true;
      }
      const left = px(rect.left - parentLeft);
      if (rectNodeStyle.left !== left) {
        rectNodeStyle.left = left;
        hasRepositioned = true;
      }
      const top = px(rect.top - parentTop);
      if (rectNodeStyle.top !== top) {
        rectNode.style.top = top;
        hasRepositioned = true;
      }
      const width = px(rect.width);
      if (rectNodeStyle.width !== width) {
        rectNode.style.width = width;
        hasRepositioned = true;
      }
      const height = px(rect.height);
      if (rectNodeStyle.height !== height) {
        rectNode.style.height = height;
        hasRepositioned = true;
      }
      if (rectNode.parentNode !== wrapperNode) {
        wrapperNode.append(rectNode);
        hasRepositioned = true;
      }
      lastNodes[i2] = rectNode;
    }
    while (lastNodes.length > rects.length) {
      lastNodes.pop();
    }
    if (hasRepositioned) {
      onReposition(lastNodes);
    }
  }
  function stop() {
    parentDOMNode = null;
    rootDOMNode = null;
    if (observer !== null) {
      observer.disconnect();
    }
    observer = null;
    wrapperNode.remove();
    for (const node of lastNodes) {
      node.remove();
    }
    lastNodes = [];
  }
  function restart() {
    const currentRootDOMNode = editor.getRootElement();
    if (currentRootDOMNode === null) {
      return stop();
    }
    const currentParentDOMNode = currentRootDOMNode.parentElement;
    if (!isHTMLElement2(currentParentDOMNode)) {
      return stop();
    }
    stop();
    rootDOMNode = currentRootDOMNode;
    parentDOMNode = currentParentDOMNode;
    observer = new MutationObserver((mutations) => {
      const nextRootDOMNode = editor.getRootElement();
      const nextParentDOMNode = nextRootDOMNode && nextRootDOMNode.parentElement;
      if (nextRootDOMNode !== rootDOMNode || nextParentDOMNode !== parentDOMNode) {
        return restart();
      }
      for (const mutation of mutations) {
        if (!wrapperNode.contains(mutation.target)) {
          return position();
        }
      }
    });
    observer.observe(currentParentDOMNode, mutationObserverConfig);
    position();
  }
  const removeRootListener = editor.registerRootListener(restart);
  return () => {
    removeRootListener();
    stop();
  };
}
function $getOrderedSelectionPoints(selection) {
  const points = selection.getStartEndPoints();
  return selection.isBackward() ? [points[1], points[0]] : points;
}
function rangeTargetFromPoint(point, node, dom) {
  if (point.type === "text" || !$isElementNode2(node)) {
    const textDOM = getDOMTextNode2(dom) || dom;
    return [textDOM, point.offset];
  } else {
    const slot = node.getDOMSlot(dom);
    return [slot.element, slot.getFirstChildOffset() + point.offset];
  }
}
function rangeFromPoints(editor, start, startNode, startDOM, end, endNode, endDOM) {
  const editorDocument = editor._window ? editor._window.document : document;
  const range = editorDocument.createRange();
  range.setStart(...rangeTargetFromPoint(start, startNode, startDOM));
  range.setEnd(...rangeTargetFromPoint(end, endNode, endDOM));
  return range;
}
function markSelection(editor, onReposition) {
  let previousAnchorNode = null;
  let previousAnchorNodeDOM = null;
  let previousAnchorOffset = null;
  let previousFocusNode = null;
  let previousFocusNodeDOM = null;
  let previousFocusOffset = null;
  let removeRangeListener = () => {
  };
  function compute(editorState) {
    editorState.read(() => {
      const selection = $getSelection2();
      if (!$isRangeSelection2(selection)) {
        previousAnchorNode = null;
        previousAnchorOffset = null;
        previousFocusNode = null;
        previousFocusOffset = null;
        removeRangeListener();
        removeRangeListener = () => {
        };
        return;
      }
      const [start, end] = $getOrderedSelectionPoints(selection);
      const currentStartNode = start.getNode();
      const currentStartNodeKey = currentStartNode.getKey();
      const currentStartOffset = start.offset;
      const currentEndNode = end.getNode();
      const currentEndNodeKey = currentEndNode.getKey();
      const currentEndOffset = end.offset;
      const currentStartNodeDOM = editor.getElementByKey(currentStartNodeKey);
      const currentEndNodeDOM = editor.getElementByKey(currentEndNodeKey);
      const differentStartDOM = previousAnchorNode === null || currentStartNodeDOM !== previousAnchorNodeDOM || currentStartOffset !== previousAnchorOffset || currentStartNodeKey !== previousAnchorNode.getKey();
      const differentEndDOM = previousFocusNode === null || currentEndNodeDOM !== previousFocusNodeDOM || currentEndOffset !== previousFocusOffset || currentEndNodeKey !== previousFocusNode.getKey();
      if ((differentStartDOM || differentEndDOM) && currentStartNodeDOM !== null && currentEndNodeDOM !== null) {
        const range = rangeFromPoints(editor, start, currentStartNode, currentStartNodeDOM, end, currentEndNode, currentEndNodeDOM);
        removeRangeListener();
        removeRangeListener = mlcPositionNodeOnRange(editor, range, (domNodes) => {
          if (onReposition === void 0) {
            for (const domNode of domNodes) {
              const domNodeStyle = domNode.style;
              if (domNodeStyle.background !== "Highlight") {
                domNodeStyle.background = "Highlight";
              }
              if (domNodeStyle.color !== "HighlightText") {
                domNodeStyle.color = "HighlightText";
              }
              if (domNodeStyle.marginTop !== px(-1.5)) {
                domNodeStyle.marginTop = px(-1.5);
              }
              if (domNodeStyle.paddingTop !== px(4)) {
                domNodeStyle.paddingTop = px(4);
              }
              if (domNodeStyle.paddingBottom !== px(0)) {
                domNodeStyle.paddingBottom = px(0);
              }
            }
          } else {
            onReposition(domNodes);
          }
        });
      }
      previousAnchorNode = currentStartNode;
      previousAnchorNodeDOM = currentStartNodeDOM;
      previousAnchorOffset = currentStartOffset;
      previousFocusNode = currentEndNode;
      previousFocusNodeDOM = currentEndNodeDOM;
      previousFocusOffset = currentEndOffset;
    });
  }
  compute(editor.getEditorState());
  return mergeRegister2(editor.registerUpdateListener(({
    editorState
  }) => compute(editorState)), () => {
    removeRangeListener();
  });
}
function selectionAlwaysOnDisplay(editor, onReposition) {
  let removeSelectionMark = null;
  const onSelectionChange2 = () => {
    const domSelection = getSelection();
    const domAnchorNode = domSelection && domSelection.anchorNode;
    const editorRootElement = editor.getRootElement();
    const isSelectionInsideEditor = domAnchorNode !== null && editorRootElement !== null && editorRootElement.contains(domAnchorNode);
    if (isSelectionInsideEditor) {
      if (removeSelectionMark !== null) {
        removeSelectionMark();
        removeSelectionMark = null;
      }
    } else {
      if (removeSelectionMark === null) {
        removeSelectionMark = markSelection(editor, onReposition);
      }
    }
  };
  document.addEventListener("selectionchange", onSelectionChange2);
  return () => {
    if (removeSelectionMark !== null) {
      removeSelectionMark();
    }
    document.removeEventListener("selectionchange", onSelectionChange2);
  };
}
var CAN_USE_BEFORE_INPUT2 = CAN_USE_BEFORE_INPUT$1;
var CAN_USE_DOM2 = CAN_USE_DOM$1;
var IS_ANDROID2 = IS_ANDROID$1;
var IS_ANDROID_CHROME2 = IS_ANDROID_CHROME$1;
var IS_APPLE2 = IS_APPLE$1;
var IS_APPLE_WEBKIT2 = IS_APPLE_WEBKIT$1;
var IS_CHROME2 = IS_CHROME$1;
var IS_FIREFOX2 = IS_FIREFOX$1;
var IS_IOS2 = IS_IOS$1;
var IS_SAFARI2 = IS_SAFARI$1;
function isMimeType(file, acceptableMimeTypes) {
  for (const acceptableType of acceptableMimeTypes) {
    if (file.type.startsWith(acceptableType)) {
      return true;
    }
  }
  return false;
}
function mediaFileReader(files, acceptableMimeTypes) {
  const filesIterator = files[Symbol.iterator]();
  return new Promise((resolve, reject) => {
    const processed = [];
    const handleNextFile = () => {
      const {
        done,
        value: file
      } = filesIterator.next();
      if (done) {
        return resolve(processed);
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("error", reject);
      fileReader.addEventListener("load", () => {
        const result = fileReader.result;
        if (typeof result === "string") {
          processed.push({
            file,
            result
          });
        }
        handleNextFile();
      });
      if (isMimeType(file, acceptableMimeTypes)) {
        fileReader.readAsDataURL(file);
      } else {
        handleNextFile();
      }
    };
    handleNextFile();
  });
}
function $dfs(startNode, endNode) {
  return Array.from($dfsIterator(startNode, endNode));
}
function $getAdjacentCaret(caret) {
  return caret ? caret.getAdjacentCaret() : null;
}
function $reverseDfs(startNode, endNode) {
  return Array.from($reverseDfsIterator(startNode, endNode));
}
function $dfsIterator(startNode, endNode) {
  return $dfsCaretIterator("next", startNode, endNode);
}
function $getEndCaret(startNode, direction) {
  const rval = $getAdjacentSiblingOrParentSiblingCaret2($getSiblingCaret2(startNode, direction));
  return rval && rval[0];
}
function $dfsCaretIterator(direction, startNode, endNode) {
  const root = $getRoot2();
  const start = startNode || root;
  const startCaret = $isElementNode2(start) ? $getChildCaret2(start, direction) : $getSiblingCaret2(start, direction);
  const startDepth = $getDepth(start);
  const endCaret = endNode ? $getAdjacentChildCaret2($getChildCaretOrSelf2($getSiblingCaret2(endNode, direction))) || $getEndCaret(endNode, direction) : $getEndCaret(start, direction);
  let depth = startDepth;
  return makeStepwiseIterator2({
    hasNext: (state) => state !== null,
    initial: startCaret,
    map: (state) => ({
      depth,
      node: state.origin
    }),
    step: (state) => {
      if (state.isSameNodeCaret(endCaret)) {
        return null;
      }
      if ($isChildCaret2(state)) {
        depth++;
      }
      const rval = $getAdjacentSiblingOrParentSiblingCaret2(state);
      if (!rval || rval[0].isSameNodeCaret(endCaret)) {
        return null;
      }
      depth += rval[1];
      return rval[0];
    }
  });
}
function $getNextSiblingOrParentSibling(node) {
  const rval = $getAdjacentSiblingOrParentSiblingCaret2($getSiblingCaret2(node, "next"));
  return rval && [rval[0].origin, rval[1]];
}
function $getDepth(node) {
  let depth = -1;
  for (let innerNode = node; innerNode !== null; innerNode = innerNode.getParent()) {
    depth++;
  }
  return depth;
}
function $getNextRightPreorderNode(startingNode) {
  const startCaret = $getChildCaretOrSelf2($getSiblingCaret2(startingNode, "previous"));
  const next = $getAdjacentSiblingOrParentSiblingCaret2(startCaret, "root");
  return next && next[0].origin;
}
function $reverseDfsIterator(startNode, endNode) {
  return $dfsCaretIterator("previous", startNode, endNode);
}
function $getNearestNodeOfType(node, klass) {
  let parent = node;
  while (parent != null) {
    if (parent instanceof klass) {
      return parent;
    }
    parent = parent.getParent();
  }
  return null;
}
function $getNearestBlockElementAncestorOrThrow(startNode) {
  const blockNode = $findMatchingParent2(startNode, (node) => $isElementNode2(node) && !node.isInline());
  if (!$isElementNode2(blockNode)) {
    {
      formatDevErrorMessage3(`Expected node ${startNode.__key} to have closest block element node.`);
    }
  }
  return blockNode;
}
function registerNestedElementResolver(editor, targetNode, cloneNode, handleOverlap) {
  const $isTargetNode = (node) => {
    return node instanceof targetNode;
  };
  const $findMatch = (node) => {
    const children = node.getChildren();
    for (let i2 = 0; i2 < children.length; i2++) {
      const child = children[i2];
      if ($isTargetNode(child)) {
        return null;
      }
    }
    let parentNode = node;
    let childNode = node;
    while (parentNode !== null) {
      childNode = parentNode;
      parentNode = parentNode.getParent();
      if ($isTargetNode(parentNode)) {
        return {
          child: childNode,
          parent: parentNode
        };
      }
    }
    return null;
  };
  const $elementNodeTransform = (node) => {
    const match = $findMatch(node);
    if (match !== null) {
      const {
        child,
        parent
      } = match;
      if (child.is(node)) {
        handleOverlap(parent, node);
        const nextSiblings = child.getNextSiblings();
        const nextSiblingsLength = nextSiblings.length;
        parent.insertAfter(child);
        if (nextSiblingsLength !== 0) {
          const newParent = cloneNode(parent);
          child.insertAfter(newParent);
          for (let i2 = 0; i2 < nextSiblingsLength; i2++) {
            newParent.append(nextSiblings[i2]);
          }
        }
        if (!parent.canBeEmpty() && parent.getChildrenSize() === 0) {
          parent.remove();
        }
      }
    }
  };
  return editor.registerNodeTransform(targetNode, $elementNodeTransform);
}
function $restoreEditorState(editor, editorState) {
  const FULL_RECONCILE2 = 2;
  const nodeMap = /* @__PURE__ */ new Map();
  const activeEditorState2 = editor._pendingEditorState;
  for (const [key, node] of editorState._nodeMap) {
    nodeMap.set(key, $cloneWithProperties2(node));
  }
  if (activeEditorState2) {
    activeEditorState2._nodeMap = nodeMap;
  }
  editor._dirtyType = FULL_RECONCILE2;
  const selection = editorState._selection;
  $setSelection2(selection === null ? null : selection.clone());
}
function $insertNodeToNearestRoot(node) {
  const selection = $getSelection2() || $getPreviousSelection2();
  let initialCaret;
  if ($isRangeSelection2(selection)) {
    initialCaret = $caretFromPoint2(selection.focus, "next");
  } else {
    if (selection != null) {
      const nodes = selection.getNodes();
      const lastNode = nodes[nodes.length - 1];
      if (lastNode) {
        initialCaret = $getSiblingCaret2(lastNode, "next");
      }
    }
    initialCaret = initialCaret || $getChildCaret2($getRoot2(), "previous").getFlipped().insert($createParagraphNode2());
  }
  const insertCaret = $insertNodeToNearestRootAtCaret(node, initialCaret);
  const adjacent = $getAdjacentChildCaret2(insertCaret);
  const selectionCaret = $isChildCaret2(adjacent) ? $normalizeCaret2(adjacent) : insertCaret;
  $setSelectionFromCaretRange2($getCollapsedCaretRange2(selectionCaret));
  return node.getLatest();
}
function $insertNodeToNearestRootAtCaret(node, caret, options) {
  let insertCaret = $getCaretInDirection2(caret, "next");
  for (let nextCaret = insertCaret; nextCaret; nextCaret = $splitAtPointCaretNext2(nextCaret, options)) {
    insertCaret = nextCaret;
  }
  if (!!$isTextPointCaret2(insertCaret)) {
    formatDevErrorMessage3(`$insertNodeToNearestRootAtCaret: An unattached TextNode can not be split`);
  }
  insertCaret.insert(node.isInline() ? $createParagraphNode2().append(node) : node);
  return $getCaretInDirection2($getSiblingCaret2(node.getLatest(), "next"), caret.direction);
}
function $wrapNodeInElement(node, createElementNode) {
  const elementNode = createElementNode();
  node.replace(elementNode);
  elementNode.append(node);
  return elementNode;
}
function objectKlassEquals(object, objectClass) {
  return object !== null ? Object.getPrototypeOf(object).constructor.name === objectClass.name : false;
}
function $filter(nodes, filterFn) {
  const result = [];
  for (let i2 = 0; i2 < nodes.length; i2++) {
    const node = filterFn(nodes[i2]);
    if (node !== null) {
      result.push(node);
    }
  }
  return result;
}
function $handleIndentAndOutdent(indentOrOutdent) {
  const selection = $getSelection2();
  if (!$isRangeSelection2(selection)) {
    return false;
  }
  const alreadyHandled = /* @__PURE__ */ new Set();
  const nodes = selection.getNodes();
  for (let i2 = 0; i2 < nodes.length; i2++) {
    const node = nodes[i2];
    const key = node.getKey();
    if (alreadyHandled.has(key)) {
      continue;
    }
    const parentBlock = $findMatchingParent2(node, (parentNode) => $isElementNode2(parentNode) && !parentNode.isInline());
    if (parentBlock === null) {
      continue;
    }
    const parentKey = parentBlock.getKey();
    if (parentBlock.canIndent() && !alreadyHandled.has(parentKey)) {
      alreadyHandled.add(parentKey);
      indentOrOutdent(parentBlock);
    }
  }
  return alreadyHandled.size > 0;
}
function $insertFirst(parent, node) {
  $getChildCaret2(parent, "next").insert(node);
}
var NEEDS_MANUAL_ZOOM = IS_FIREFOX2 || !CAN_USE_DOM2 ? false : void 0;
function needsManualZoom() {
  if (NEEDS_MANUAL_ZOOM === void 0) {
    const div = document.createElement("div");
    div.style.cssText = "position: absolute; opacity: 0; width: 100px; left: -1000px;";
    document.body.appendChild(div);
    const noZoom = div.getBoundingClientRect();
    div.style.setProperty("zoom", "2");
    NEEDS_MANUAL_ZOOM = div.getBoundingClientRect().width === noZoom.width;
    document.body.removeChild(div);
  }
  return NEEDS_MANUAL_ZOOM;
}
function calculateZoomLevel(element, useManualZoom = false) {
  let zoom = 1;
  if (needsManualZoom() || useManualZoom) {
    while (element) {
      zoom *= Number(window.getComputedStyle(element).getPropertyValue("zoom"));
      element = element.parentElement;
    }
  }
  return zoom;
}
function $isEditorIsNestedEditor(editor) {
  return editor._parentEditor !== null;
}
function $unwrapAndFilterDescendants(root, $predicate) {
  return $unwrapAndFilterDescendantsImpl(root, $predicate, null);
}
function $unwrapAndFilterDescendantsImpl(root, $predicate, $onSuccess) {
  let didMutate = false;
  for (const node of $lastToFirstIterator(root)) {
    if ($predicate(node)) {
      if ($onSuccess !== null) {
        $onSuccess(node);
      }
      continue;
    }
    didMutate = true;
    if ($isElementNode2(node)) {
      $unwrapAndFilterDescendantsImpl(node, $predicate, $onSuccess || ((child) => node.insertAfter(child)));
    }
    node.remove();
  }
  return didMutate;
}
function $descendantsMatching(children, $predicate) {
  const result = [];
  const stack = Array.from(children).reverse();
  for (let child = stack.pop(); child !== void 0; child = stack.pop()) {
    if ($predicate(child)) {
      result.push(child);
    } else if ($isElementNode2(child)) {
      for (const grandchild of $lastToFirstIterator(child)) {
        stack.push(grandchild);
      }
    }
  }
  return result;
}
function $firstToLastIterator(node) {
  return $childIterator($getChildCaret2(node, "next"));
}
function $lastToFirstIterator(node) {
  return $childIterator($getChildCaret2(node, "previous"));
}
function $childIterator(startCaret) {
  const seen = /* @__PURE__ */ new Set();
  return makeStepwiseIterator2({
    hasNext: $isSiblingCaret2,
    initial: startCaret.getAdjacentCaret(),
    map: (caret) => {
      const origin = caret.origin.getLatest();
      if (seen !== null) {
        const key = origin.getKey();
        if (!!seen.has(key)) {
          formatDevErrorMessage3(`$childIterator: Cycle detected, node with key ${String(key)} has already been traversed`);
        }
        seen.add(key);
      }
      return origin;
    },
    step: (caret) => caret.getAdjacentCaret()
  });
}
function $unwrapNode(node) {
  $rewindSiblingCaret2($getSiblingCaret2(node, "next")).splice(1, node.getChildren());
}
function makeStateWrapper(stateConfig) {
  const $get = (node) => $getState2(node, stateConfig);
  const $set = (node, valueOrUpdater) => $setState2(node, stateConfig, valueOrUpdater);
  return {
    $get,
    $set,
    accessors: [$get, $set],
    makeGetterMethod: () => function $getter() {
      return $get(this);
    },
    makeSetterMethod: () => function $setter(valueOrUpdater) {
      return $set(this, valueOrUpdater);
    },
    stateConfig
  };
}

// node_modules/@lexical/utils/LexicalUtils.mjs
var mod3 = true ? LexicalUtils_dev_exports : LexicalUtils_prod_exports;
var $descendantsMatching2 = mod3.$descendantsMatching;
var $dfs2 = mod3.$dfs;
var $dfsIterator2 = mod3.$dfsIterator;
var $filter2 = mod3.$filter;
var $findMatchingParent3 = mod3.$findMatchingParent;
var $firstToLastIterator2 = mod3.$firstToLastIterator;
var $getAdjacentCaret2 = mod3.$getAdjacentCaret;
var $getAdjacentSiblingOrParentSiblingCaret3 = mod3.$getAdjacentSiblingOrParentSiblingCaret;
var $getDepth2 = mod3.$getDepth;
var $getNearestBlockElementAncestorOrThrow2 = mod3.$getNearestBlockElementAncestorOrThrow;
var $getNearestNodeOfType2 = mod3.$getNearestNodeOfType;
var $getNextRightPreorderNode2 = mod3.$getNextRightPreorderNode;
var $getNextSiblingOrParentSibling2 = mod3.$getNextSiblingOrParentSibling;
var $handleIndentAndOutdent2 = mod3.$handleIndentAndOutdent;
var $insertFirst2 = mod3.$insertFirst;
var $insertNodeToNearestRoot2 = mod3.$insertNodeToNearestRoot;
var $insertNodeToNearestRootAtCaret2 = mod3.$insertNodeToNearestRootAtCaret;
var $isEditorIsNestedEditor2 = mod3.$isEditorIsNestedEditor;
var $lastToFirstIterator2 = mod3.$lastToFirstIterator;
var $restoreEditorState2 = mod3.$restoreEditorState;
var $reverseDfs2 = mod3.$reverseDfs;
var $reverseDfsIterator2 = mod3.$reverseDfsIterator;
var $splitNode3 = mod3.$splitNode;
var $unwrapAndFilterDescendants2 = mod3.$unwrapAndFilterDescendants;
var $unwrapNode2 = mod3.$unwrapNode;
var $wrapNodeInElement2 = mod3.$wrapNodeInElement;
var CAN_USE_BEFORE_INPUT3 = mod3.CAN_USE_BEFORE_INPUT;
var CAN_USE_DOM3 = mod3.CAN_USE_DOM;
var IS_ANDROID3 = mod3.IS_ANDROID;
var IS_ANDROID_CHROME3 = mod3.IS_ANDROID_CHROME;
var IS_APPLE3 = mod3.IS_APPLE;
var IS_APPLE_WEBKIT3 = mod3.IS_APPLE_WEBKIT;
var IS_CHROME3 = mod3.IS_CHROME;
var IS_FIREFOX3 = mod3.IS_FIREFOX;
var IS_IOS3 = mod3.IS_IOS;
var IS_SAFARI3 = mod3.IS_SAFARI;
var addClassNamesToElement3 = mod3.addClassNamesToElement;
var calculateZoomLevel2 = mod3.calculateZoomLevel;
var isBlockDomNode3 = mod3.isBlockDomNode;
var isHTMLAnchorElement3 = mod3.isHTMLAnchorElement;
var isHTMLElement3 = mod3.isHTMLElement;
var isInlineDomNode3 = mod3.isInlineDomNode;
var isMimeType2 = mod3.isMimeType;
var makeStateWrapper2 = mod3.makeStateWrapper;
var markSelection2 = mod3.markSelection;
var mediaFileReader2 = mod3.mediaFileReader;
var mergeRegister3 = mod3.mergeRegister;
var objectKlassEquals2 = mod3.objectKlassEquals;
var positionNodeOnRange = mod3.positionNodeOnRange;
var registerNestedElementResolver2 = mod3.registerNestedElementResolver;
var removeClassNamesFromElement3 = mod3.removeClassNamesFromElement;
var selectionAlwaysOnDisplay2 = mod3.selectionAlwaysOnDisplay;

// node_modules/@lexical/html/LexicalHtml.dev.mjs
function $generateNodesFromDOM(editor, dom) {
  const elements = isDOMDocumentNode2(dom) ? dom.body.childNodes : dom.childNodes;
  let lexicalNodes = [];
  const allArtificialNodes = [];
  for (const element of elements) {
    if (!IGNORE_TAGS.has(element.nodeName)) {
      const lexicalNode = $createNodesFromDOM(element, editor, allArtificialNodes, false);
      if (lexicalNode !== null) {
        lexicalNodes = lexicalNodes.concat(lexicalNode);
      }
    }
  }
  $unwrapArtificialNodes(allArtificialNodes);
  return lexicalNodes;
}
function $generateHtmlFromNodes(editor, selection) {
  if (typeof document === "undefined" || typeof window === "undefined" && typeof global.window === "undefined") {
    throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  }
  const container = document.createElement("div");
  const root = $getRoot2();
  const topLevelChildren = root.getChildren();
  for (let i2 = 0; i2 < topLevelChildren.length; i2++) {
    const topLevelNode = topLevelChildren[i2];
    $appendNodesToHTML(editor, topLevelNode, container, selection);
  }
  return container.innerHTML;
}
function $appendNodesToHTML(editor, currentNode, parentElement, selection = null) {
  let shouldInclude = selection !== null ? currentNode.isSelected(selection) : true;
  const shouldExclude = $isElementNode2(currentNode) && currentNode.excludeFromCopy("html");
  let target = currentNode;
  if (selection !== null && $isTextNode2(currentNode)) {
    target = $sliceSelectedTextNodeContent2(selection, currentNode, "clone");
  }
  const children = $isElementNode2(target) ? target.getChildren() : [];
  const registeredNode = getRegisteredNode2(editor, target.getType());
  let exportOutput;
  if (registeredNode && registeredNode.exportDOM !== void 0) {
    exportOutput = registeredNode.exportDOM(editor, target);
  } else {
    exportOutput = target.exportDOM(editor);
  }
  const {
    element,
    after
  } = exportOutput;
  if (!element) {
    return false;
  }
  const fragment = document.createDocumentFragment();
  for (let i2 = 0; i2 < children.length; i2++) {
    const childNode = children[i2];
    const shouldIncludeChild = $appendNodesToHTML(editor, childNode, fragment, selection);
    if (!shouldInclude && $isElementNode2(currentNode) && shouldIncludeChild && currentNode.extractWithChild(childNode, selection, "html")) {
      shouldInclude = true;
    }
  }
  if (shouldInclude && !shouldExclude) {
    if (isHTMLElement3(element) || isDocumentFragment2(element)) {
      element.append(fragment);
    }
    parentElement.append(element);
    if (after) {
      const newElement = after.call(target, element);
      if (newElement) {
        if (isDocumentFragment2(element)) {
          element.replaceChildren(newElement);
        } else {
          element.replaceWith(newElement);
        }
      }
    }
  } else {
    parentElement.append(fragment);
  }
  return shouldInclude;
}
function getConversionFunction(domNode, editor) {
  const {
    nodeName
  } = domNode;
  const cachedConversions = editor._htmlConversions.get(nodeName.toLowerCase());
  let currentConversion = null;
  if (cachedConversions !== void 0) {
    for (const cachedConversion of cachedConversions) {
      const domConversion = cachedConversion(domNode);
      if (domConversion !== null && (currentConversion === null || // Given equal priority, prefer the last registered importer
      // which is typically an application custom node or HTMLConfig['import']
      (currentConversion.priority || 0) <= (domConversion.priority || 0))) {
        currentConversion = domConversion;
      }
    }
  }
  return currentConversion !== null ? currentConversion.conversion : null;
}
var IGNORE_TAGS = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function $createNodesFromDOM(node, editor, allArtificialNodes, hasBlockAncestorLexicalNode, forChildMap = /* @__PURE__ */ new Map(), parentLexicalNode) {
  let lexicalNodes = [];
  if (IGNORE_TAGS.has(node.nodeName)) {
    return lexicalNodes;
  }
  let currentLexicalNode = null;
  const transformFunction = getConversionFunction(node, editor);
  const transformOutput = transformFunction ? transformFunction(node) : null;
  let postTransform = null;
  if (transformOutput !== null) {
    postTransform = transformOutput.after;
    const transformNodes = transformOutput.node;
    currentLexicalNode = Array.isArray(transformNodes) ? transformNodes[transformNodes.length - 1] : transformNodes;
    if (currentLexicalNode !== null) {
      for (const [, forChildFunction] of forChildMap) {
        currentLexicalNode = forChildFunction(currentLexicalNode, parentLexicalNode);
        if (!currentLexicalNode) {
          break;
        }
      }
      if (currentLexicalNode) {
        lexicalNodes.push(...Array.isArray(transformNodes) ? transformNodes : [currentLexicalNode]);
      }
    }
    if (transformOutput.forChild != null) {
      forChildMap.set(node.nodeName, transformOutput.forChild);
    }
  }
  const children = node.childNodes;
  let childLexicalNodes = [];
  const hasBlockAncestorLexicalNodeForChildren = currentLexicalNode != null && $isRootOrShadowRoot2(currentLexicalNode) ? false : currentLexicalNode != null && $isBlockElementNode2(currentLexicalNode) || hasBlockAncestorLexicalNode;
  for (let i2 = 0; i2 < children.length; i2++) {
    childLexicalNodes.push(...$createNodesFromDOM(children[i2], editor, allArtificialNodes, hasBlockAncestorLexicalNodeForChildren, new Map(forChildMap), currentLexicalNode));
  }
  if (postTransform != null) {
    childLexicalNodes = postTransform(childLexicalNodes);
  }
  if (isBlockDomNode3(node)) {
    if (!hasBlockAncestorLexicalNodeForChildren) {
      childLexicalNodes = wrapContinuousInlines(node, childLexicalNodes, $createParagraphNode2);
    } else {
      childLexicalNodes = wrapContinuousInlines(node, childLexicalNodes, () => {
        const artificialNode = new ArtificialNode__DO_NOT_USE2();
        allArtificialNodes.push(artificialNode);
        return artificialNode;
      });
    }
  }
  if (currentLexicalNode == null) {
    if (childLexicalNodes.length > 0) {
      lexicalNodes = lexicalNodes.concat(childLexicalNodes);
    } else {
      if (isBlockDomNode3(node) && isDomNodeBetweenTwoInlineNodes(node)) {
        lexicalNodes = lexicalNodes.concat($createLineBreakNode2());
      }
    }
  } else {
    if ($isElementNode2(currentLexicalNode)) {
      currentLexicalNode.append(...childLexicalNodes);
    }
  }
  return lexicalNodes;
}
function wrapContinuousInlines(domNode, nodes, createWrapperFn) {
  const textAlign = domNode.style.textAlign;
  const out = [];
  let continuousInlines = [];
  for (let i2 = 0; i2 < nodes.length; i2++) {
    const node = nodes[i2];
    if ($isBlockElementNode2(node)) {
      if (textAlign && !node.getFormat()) {
        node.setFormat(textAlign);
      }
      out.push(node);
    } else {
      continuousInlines.push(node);
      if (i2 === nodes.length - 1 || i2 < nodes.length - 1 && $isBlockElementNode2(nodes[i2 + 1])) {
        const wrapper = createWrapperFn();
        wrapper.setFormat(textAlign);
        wrapper.append(...continuousInlines);
        out.push(wrapper);
        continuousInlines = [];
      }
    }
  }
  return out;
}
function $unwrapArtificialNodes(allArtificialNodes) {
  for (const node of allArtificialNodes) {
    if (node.getNextSibling() instanceof ArtificialNode__DO_NOT_USE2) {
      node.insertAfter($createLineBreakNode2());
    }
  }
  for (const node of allArtificialNodes) {
    const children = node.getChildren();
    for (const child of children) {
      node.insertBefore(child);
    }
    node.remove();
  }
}
function isDomNodeBetweenTwoInlineNodes(node) {
  if (node.nextSibling == null || node.previousSibling == null) {
    return false;
  }
  return isInlineDomNode2(node.nextSibling) && isInlineDomNode2(node.previousSibling);
}

// node_modules/@lexical/html/LexicalHtml.mjs
var mod4 = true ? LexicalHtml_dev_exports : LexicalHtml_prod_exports;
var $generateHtmlFromNodes2 = mod4.$generateHtmlFromNodes;
var $generateNodesFromDOM2 = mod4.$generateNodesFromDOM;

// node_modules/@lexical/clipboard/LexicalClipboard.dev.mjs
function formatDevErrorMessage4(message) {
  throw new Error(message);
}
function $getHtmlContent(editor, selection = $getSelection2()) {
  if (selection == null) {
    {
      formatDevErrorMessage4(`Expected valid LexicalSelection`);
    }
  }
  if ($isRangeSelection2(selection) && selection.isCollapsed() || selection.getNodes().length === 0) {
    return "";
  }
  return $generateHtmlFromNodes2(editor, selection);
}
function $getLexicalContent(editor, selection = $getSelection2()) {
  if (selection == null) {
    {
      formatDevErrorMessage4(`Expected valid LexicalSelection`);
    }
  }
  if ($isRangeSelection2(selection) && selection.isCollapsed() || selection.getNodes().length === 0) {
    return null;
  }
  return JSON.stringify($generateJSONFromSelectedNodes(editor, selection));
}
function $insertDataTransferForPlainText(dataTransfer, selection) {
  const text = dataTransfer.getData("text/plain") || dataTransfer.getData("text/uri-list");
  if (text != null) {
    selection.insertRawText(text);
  }
}
function $insertDataTransferForRichText(dataTransfer, selection, editor) {
  const lexicalString = dataTransfer.getData("application/x-lexical-editor");
  if (lexicalString) {
    try {
      const payload = JSON.parse(lexicalString);
      if (payload.namespace === editor._config.namespace && Array.isArray(payload.nodes)) {
        const nodes = $generateNodesFromSerializedNodes(payload.nodes);
        return $insertGeneratedNodes(editor, nodes, selection);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const htmlString = dataTransfer.getData("text/html");
  const plainString = dataTransfer.getData("text/plain");
  if (htmlString && plainString !== htmlString) {
    try {
      const parser = new DOMParser();
      const dom = parser.parseFromString(trustHTML(htmlString), "text/html");
      const nodes = $generateNodesFromDOM2(editor, dom);
      return $insertGeneratedNodes(editor, nodes, selection);
    } catch (error) {
      console.error(error);
    }
  }
  const text = plainString || dataTransfer.getData("text/uri-list");
  if (text != null) {
    if ($isRangeSelection2(selection)) {
      const parts = text.split(/(\r?\n|\t)/);
      if (parts[parts.length - 1] === "") {
        parts.pop();
      }
      for (let i2 = 0; i2 < parts.length; i2++) {
        const currentSelection = $getSelection2();
        if ($isRangeSelection2(currentSelection)) {
          const part = parts[i2];
          if (part === "\n" || part === "\r\n") {
            currentSelection.insertParagraph();
          } else if (part === "	") {
            currentSelection.insertNodes([$createTabNode2()]);
          } else {
            currentSelection.insertText(part);
          }
        }
      }
    } else {
      selection.insertRawText(text);
    }
  }
}
function trustHTML(html) {
  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    const policy = window.trustedTypes.createPolicy("lexical", {
      createHTML: (input) => input
    });
    return policy.createHTML(html);
  }
  return html;
}
function $insertGeneratedNodes(editor, nodes, selection) {
  if (!editor.dispatchCommand(SELECTION_INSERT_CLIPBOARD_NODES_COMMAND2, {
    nodes,
    selection
  })) {
    selection.insertNodes(nodes);
    $updateSelectionOnInsert(selection);
  }
  return;
}
function $updateSelectionOnInsert(selection) {
  if ($isRangeSelection2(selection) && selection.isCollapsed()) {
    const anchor = selection.anchor;
    let nodeToInspect = null;
    const anchorCaret = $caretFromPoint2(anchor, "previous");
    if (anchorCaret) {
      if ($isTextPointCaret2(anchorCaret)) {
        nodeToInspect = anchorCaret.origin;
      } else {
        const range = $getCaretRange2(anchorCaret, $getChildCaret2($getRoot2(), "next").getFlipped());
        for (const caret of range) {
          if ($isTextNode2(caret.origin)) {
            nodeToInspect = caret.origin;
            break;
          } else if ($isElementNode2(caret.origin) && !caret.origin.isInline()) {
            break;
          }
        }
      }
    }
    if (nodeToInspect && $isTextNode2(nodeToInspect)) {
      const newFormat = nodeToInspect.getFormat();
      const newStyle = nodeToInspect.getStyle();
      if (selection.format !== newFormat || selection.style !== newStyle) {
        selection.format = newFormat;
        selection.style = newStyle;
        selection.dirty = true;
      }
    }
  }
}
function exportNodeToJSON2(node) {
  const serializedNode = node.exportJSON();
  const nodeClass = node.constructor;
  if (serializedNode.type !== nodeClass.getType()) {
    {
      formatDevErrorMessage4(`LexicalNode: Node ${nodeClass.name} does not implement .exportJSON().`);
    }
  }
  if ($isElementNode2(node)) {
    const serializedChildren = serializedNode.children;
    if (!Array.isArray(serializedChildren)) {
      {
        formatDevErrorMessage4(`LexicalNode: Node ${nodeClass.name} is an element but .exportJSON() does not have a children array.`);
      }
    }
  }
  return serializedNode;
}
function $appendNodesToJSON(editor, selection, currentNode, targetArray = []) {
  let shouldInclude = selection !== null ? currentNode.isSelected(selection) : true;
  const shouldExclude = $isElementNode2(currentNode) && currentNode.excludeFromCopy("html");
  let target = currentNode;
  if (selection !== null && $isTextNode2(target)) {
    target = $sliceSelectedTextNodeContent2(selection, target, "clone");
  }
  const children = $isElementNode2(target) ? target.getChildren() : [];
  const serializedNode = exportNodeToJSON2(target);
  if ($isTextNode2(target) && target.getTextContentSize() === 0) {
    shouldInclude = false;
  }
  for (let i2 = 0; i2 < children.length; i2++) {
    const childNode = children[i2];
    const shouldIncludeChild = $appendNodesToJSON(editor, selection, childNode, serializedNode.children);
    if (!shouldInclude && $isElementNode2(currentNode) && shouldIncludeChild && currentNode.extractWithChild(childNode, selection, "clone")) {
      shouldInclude = true;
    }
  }
  if (shouldInclude && !shouldExclude) {
    targetArray.push(serializedNode);
  } else if (Array.isArray(serializedNode.children)) {
    for (let i2 = 0; i2 < serializedNode.children.length; i2++) {
      const serializedChildNode = serializedNode.children[i2];
      targetArray.push(serializedChildNode);
    }
  }
  return shouldInclude;
}
function $generateJSONFromSelectedNodes(editor, selection) {
  const nodes = [];
  const root = $getRoot2();
  const topLevelChildren = root.getChildren();
  for (let i2 = 0; i2 < topLevelChildren.length; i2++) {
    const topLevelNode = topLevelChildren[i2];
    $appendNodesToJSON(editor, selection, topLevelNode, nodes);
  }
  return {
    namespace: editor._config.namespace,
    nodes
  };
}
function $generateNodesFromSerializedNodes(serializedNodes) {
  const nodes = [];
  for (let i2 = 0; i2 < serializedNodes.length; i2++) {
    const serializedNode = serializedNodes[i2];
    const node = $parseSerializedNode2(serializedNode);
    if ($isTextNode2(node)) {
      $addNodeStyle2(node);
    }
    nodes.push(node);
  }
  return nodes;
}
var EVENT_LATENCY = 50;
var clipboardEventTimeout = null;
async function copyToClipboard(editor, event, data) {
  if (clipboardEventTimeout !== null) {
    return false;
  }
  if (event !== null) {
    return new Promise((resolve, reject) => {
      editor.update(() => {
        resolve($copyToClipboardEvent(editor, event, data));
      });
    });
  }
  const rootElement = editor.getRootElement();
  const editorWindow = editor._window || window;
  const windowDocument = editorWindow.document;
  const domSelection = getDOMSelection2(editorWindow);
  if (rootElement === null || domSelection === null) {
    return false;
  }
  const element = windowDocument.createElement("span");
  element.style.cssText = "position: fixed; top: -1000px;";
  element.append(windowDocument.createTextNode("#"));
  rootElement.append(element);
  const range = new Range();
  range.setStart(element, 0);
  range.setEnd(element, 1);
  domSelection.removeAllRanges();
  domSelection.addRange(range);
  return new Promise((resolve, reject) => {
    const removeListener = editor.registerCommand(COPY_COMMAND2, (secondEvent) => {
      if (objectKlassEquals2(secondEvent, ClipboardEvent)) {
        removeListener();
        if (clipboardEventTimeout !== null) {
          editorWindow.clearTimeout(clipboardEventTimeout);
          clipboardEventTimeout = null;
        }
        resolve($copyToClipboardEvent(editor, secondEvent, data));
      }
      return true;
    }, COMMAND_PRIORITY_CRITICAL2);
    clipboardEventTimeout = editorWindow.setTimeout(() => {
      removeListener();
      clipboardEventTimeout = null;
      resolve(false);
    }, EVENT_LATENCY);
    windowDocument.execCommand("copy");
    element.remove();
  });
}
function $copyToClipboardEvent(editor, event, data) {
  if (data === void 0) {
    const domSelection = getDOMSelection2(editor._window);
    const selection = $getSelection2();
    if (!selection || selection.isCollapsed()) {
      return false;
    }
    if (!domSelection) {
      return false;
    }
    const anchorDOM = domSelection.anchorNode;
    const focusDOM = domSelection.focusNode;
    if (anchorDOM !== null && focusDOM !== null && !isSelectionWithinEditor2(editor, anchorDOM, focusDOM)) {
      return false;
    }
    data = $getClipboardDataFromSelection(selection);
  }
  event.preventDefault();
  const clipboardData = event.clipboardData;
  if (clipboardData === null) {
    return false;
  }
  setLexicalClipboardDataTransfer(clipboardData, data);
  return true;
}
var clipboardDataFunctions = [["text/html", $getHtmlContent], ["application/x-lexical-editor", $getLexicalContent]];
function $getClipboardDataFromSelection(selection = $getSelection2()) {
  const clipboardData = {
    "text/plain": selection ? selection.getTextContent() : ""
  };
  if (selection) {
    const editor = $getEditor2();
    for (const [mimeType, $editorFn] of clipboardDataFunctions) {
      const v2 = $editorFn(editor, selection);
      if (v2 !== null) {
        clipboardData[mimeType] = v2;
      }
    }
  }
  return clipboardData;
}
function setLexicalClipboardDataTransfer(clipboardData, data) {
  for (const [k] of clipboardDataFunctions) {
    if (data[k] === void 0) {
      clipboardData.setData(k, "");
    }
  }
  for (const k in data) {
    const v2 = data[k];
    if (v2 !== void 0) {
      clipboardData.setData(k, v2);
    }
  }
}

// node_modules/@lexical/clipboard/LexicalClipboard.mjs
var mod5 = true ? LexicalClipboard_dev_exports : LexicalClipboard_prod_exports;
var $generateJSONFromSelectedNodes2 = mod5.$generateJSONFromSelectedNodes;
var $generateNodesFromSerializedNodes2 = mod5.$generateNodesFromSerializedNodes;
var $getClipboardDataFromSelection2 = mod5.$getClipboardDataFromSelection;
var $getHtmlContent2 = mod5.$getHtmlContent;
var $getLexicalContent2 = mod5.$getLexicalContent;
var $insertDataTransferForPlainText2 = mod5.$insertDataTransferForPlainText;
var $insertDataTransferForRichText2 = mod5.$insertDataTransferForRichText;
var $insertGeneratedNodes2 = mod5.$insertGeneratedNodes;
var copyToClipboard2 = mod5.copyToClipboard;
var setLexicalClipboardDataTransfer2 = mod5.setLexicalClipboardDataTransfer;

// node_modules/@lexical/dragon/LexicalDragon.dev.mjs
var LexicalDragon_dev_exports = {};
__export(LexicalDragon_dev_exports, {
  DragonExtension: () => DragonExtension,
  registerDragonSupport: () => registerDragonSupport
});

// node_modules/@lexical/extension/LexicalExtension.dev.mjs
var LexicalExtension_dev_exports = {};
__export(LexicalExtension_dev_exports, {
  $createHorizontalRuleNode: () => $createHorizontalRuleNode,
  $isDecoratorTextNode: () => $isDecoratorTextNode,
  $isHorizontalRuleNode: () => $isHorizontalRuleNode,
  AutoFocusExtension: () => AutoFocusExtension,
  ClearEditorExtension: () => ClearEditorExtension,
  DecoratorTextExtension: () => DecoratorTextExtension,
  DecoratorTextNode: () => DecoratorTextNode,
  EditorStateExtension: () => EditorStateExtension,
  HorizontalRuleExtension: () => HorizontalRuleExtension,
  HorizontalRuleNode: () => HorizontalRuleNode,
  INSERT_HORIZONTAL_RULE_COMMAND: () => INSERT_HORIZONTAL_RULE_COMMAND,
  InitialStateExtension: () => InitialStateExtension,
  LexicalBuilder: () => LexicalBuilder,
  NodeSelectionExtension: () => NodeSelectionExtension,
  TabIndentationExtension: () => TabIndentationExtension,
  applyFormatFromStyle: () => applyFormatFromStyle,
  applyFormatToDom: () => applyFormatToDom,
  batch: () => o,
  buildEditorFromExtensions: () => buildEditorFromExtensions,
  computed: () => w,
  configExtension: () => configExtension2,
  declarePeerDependency: () => declarePeerDependency2,
  defineExtension: () => defineExtension2,
  effect: () => E,
  getExtensionDependencyFromEditor: () => getExtensionDependencyFromEditor,
  getKnownTypesAndNodes: () => getKnownTypesAndNodes,
  getPeerDependencyFromEditor: () => getPeerDependencyFromEditor,
  getPeerDependencyFromEditorOrThrow: () => getPeerDependencyFromEditorOrThrow,
  namedSignals: () => namedSignals,
  registerClearEditor: () => registerClearEditor,
  registerTabIndentation: () => registerTabIndentation,
  safeCast: () => safeCast2,
  shallowMergeConfig: () => shallowMergeConfig2,
  signal: () => d,
  untracked: () => h,
  watchedSignal: () => watchedSignal
});
var i = /* @__PURE__ */ Symbol.for("preact-signals");
function t() {
  if (r > 1) {
    r--;
    return;
  }
  let i2, t2 = false;
  while (void 0 !== s) {
    let o2 = s;
    s = void 0;
    f++;
    while (void 0 !== o2) {
      const n2 = o2.o;
      o2.o = void 0;
      o2.f &= -3;
      if (!(8 & o2.f) && v(o2)) try {
        o2.c();
      } catch (o3) {
        if (!t2) {
          i2 = o3;
          t2 = true;
        }
      }
      o2 = n2;
    }
  }
  f = 0;
  r--;
  if (t2) throw i2;
}
function o(i2) {
  if (r > 0) return i2();
  r++;
  try {
    return i2();
  } finally {
    t();
  }
}
var n;
var s;
function h(i2) {
  const t2 = n;
  n = void 0;
  try {
    return i2();
  } finally {
    n = t2;
  }
}
var r = 0;
var f = 0;
var e = 0;
function u(i2) {
  if (void 0 === n) return;
  let t2 = i2.n;
  if (void 0 === t2 || t2.t !== n) {
    t2 = { i: 0, S: i2, p: n.s, n: void 0, t: n, e: void 0, x: void 0, r: t2 };
    if (void 0 !== n.s) n.s.n = t2;
    n.s = t2;
    i2.n = t2;
    if (32 & n.f) i2.S(t2);
    return t2;
  } else if (-1 === t2.i) {
    t2.i = 0;
    if (void 0 !== t2.n) {
      t2.n.p = t2.p;
      if (void 0 !== t2.p) t2.p.n = t2.n;
      t2.p = n.s;
      t2.n = void 0;
      n.s.n = t2;
      n.s = t2;
    }
    return t2;
  }
}
function c(i2, t2) {
  this.v = i2;
  this.i = 0;
  this.n = void 0;
  this.t = void 0;
  this.W = null == t2 ? void 0 : t2.watched;
  this.Z = null == t2 ? void 0 : t2.unwatched;
  this.name = null == t2 ? void 0 : t2.name;
}
c.prototype.brand = i;
c.prototype.h = function() {
  return true;
};
c.prototype.S = function(i2) {
  const t2 = this.t;
  if (t2 !== i2 && void 0 === i2.e) {
    i2.x = t2;
    this.t = i2;
    if (void 0 !== t2) t2.e = i2;
    else h(() => {
      var i3;
      null == (i3 = this.W) || i3.call(this);
    });
  }
};
c.prototype.U = function(i2) {
  if (void 0 !== this.t) {
    const t2 = i2.e, o2 = i2.x;
    if (void 0 !== t2) {
      t2.x = o2;
      i2.e = void 0;
    }
    if (void 0 !== o2) {
      o2.e = t2;
      i2.x = void 0;
    }
    if (i2 === this.t) {
      this.t = o2;
      if (void 0 === o2) h(() => {
        var i3;
        null == (i3 = this.Z) || i3.call(this);
      });
    }
  }
};
c.prototype.subscribe = function(i2) {
  return E(() => {
    const t2 = this.value, o2 = n;
    n = void 0;
    try {
      i2(t2);
    } finally {
      n = o2;
    }
  }, { name: "sub" });
};
c.prototype.valueOf = function() {
  return this.value;
};
c.prototype.toString = function() {
  return this.value + "";
};
c.prototype.toJSON = function() {
  return this.value;
};
c.prototype.peek = function() {
  const i2 = n;
  n = void 0;
  try {
    return this.value;
  } finally {
    n = i2;
  }
};
Object.defineProperty(c.prototype, "value", { get() {
  const i2 = u(this);
  if (void 0 !== i2) i2.i = this.i;
  return this.v;
}, set(i2) {
  if (i2 !== this.v) {
    if (f > 100) throw new Error("Cycle detected");
    this.v = i2;
    this.i++;
    e++;
    r++;
    try {
      for (let i3 = this.t; void 0 !== i3; i3 = i3.x) i3.t.N();
    } finally {
      t();
    }
  }
} });
function d(i2, t2) {
  return new c(i2, t2);
}
function v(i2) {
  for (let t2 = i2.s; void 0 !== t2; t2 = t2.n) if (t2.S.i !== t2.i || !t2.S.h() || t2.S.i !== t2.i) return true;
  return false;
}
function l(i2) {
  for (let t2 = i2.s; void 0 !== t2; t2 = t2.n) {
    const o2 = t2.S.n;
    if (void 0 !== o2) t2.r = o2;
    t2.S.n = t2;
    t2.i = -1;
    if (void 0 === t2.n) {
      i2.s = t2;
      break;
    }
  }
}
function y(i2) {
  let t2, o2 = i2.s;
  while (void 0 !== o2) {
    const i3 = o2.p;
    if (-1 === o2.i) {
      o2.S.U(o2);
      if (void 0 !== i3) i3.n = o2.n;
      if (void 0 !== o2.n) o2.n.p = i3;
    } else t2 = o2;
    o2.S.n = o2.r;
    if (void 0 !== o2.r) o2.r = void 0;
    o2 = i3;
  }
  i2.s = t2;
}
function a(i2, t2) {
  c.call(this, void 0);
  this.x = i2;
  this.s = void 0;
  this.g = e - 1;
  this.f = 4;
  this.W = null == t2 ? void 0 : t2.watched;
  this.Z = null == t2 ? void 0 : t2.unwatched;
  this.name = null == t2 ? void 0 : t2.name;
}
a.prototype = new c();
a.prototype.h = function() {
  this.f &= -3;
  if (1 & this.f) return false;
  if (32 == (36 & this.f)) return true;
  this.f &= -5;
  if (this.g === e) return true;
  this.g = e;
  this.f |= 1;
  if (this.i > 0 && !v(this)) {
    this.f &= -2;
    return true;
  }
  const i2 = n;
  try {
    l(this);
    n = this;
    const i3 = this.x();
    if (16 & this.f || this.v !== i3 || 0 === this.i) {
      this.v = i3;
      this.f &= -17;
      this.i++;
    }
  } catch (i3) {
    this.v = i3;
    this.f |= 16;
    this.i++;
  }
  n = i2;
  y(this);
  this.f &= -2;
  return true;
};
a.prototype.S = function(i2) {
  if (void 0 === this.t) {
    this.f |= 36;
    for (let i3 = this.s; void 0 !== i3; i3 = i3.n) i3.S.S(i3);
  }
  c.prototype.S.call(this, i2);
};
a.prototype.U = function(i2) {
  if (void 0 !== this.t) {
    c.prototype.U.call(this, i2);
    if (void 0 === this.t) {
      this.f &= -33;
      for (let i3 = this.s; void 0 !== i3; i3 = i3.n) i3.S.U(i3);
    }
  }
};
a.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let i2 = this.t; void 0 !== i2; i2 = i2.x) i2.t.N();
  }
};
Object.defineProperty(a.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const i2 = u(this);
  this.h();
  if (void 0 !== i2) i2.i = this.i;
  if (16 & this.f) throw this.v;
  return this.v;
} });
function w(i2, t2) {
  return new a(i2, t2);
}
function _(i2) {
  const o2 = i2.u;
  i2.u = void 0;
  if ("function" == typeof o2) {
    r++;
    const s2 = n;
    n = void 0;
    try {
      o2();
    } catch (t2) {
      i2.f &= -2;
      i2.f |= 8;
      b(i2);
      throw t2;
    } finally {
      n = s2;
      t();
    }
  }
}
function b(i2) {
  for (let t2 = i2.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
  i2.x = void 0;
  i2.s = void 0;
  _(i2);
}
function g(i2) {
  if (n !== this) throw new Error("Out-of-order effect");
  y(this);
  n = i2;
  this.f &= -2;
  if (8 & this.f) b(this);
  t();
}
function p(i2, t2) {
  this.x = i2;
  this.u = void 0;
  this.s = void 0;
  this.o = void 0;
  this.f = 32;
  this.name = null == t2 ? void 0 : t2.name;
}
p.prototype.c = function() {
  const i2 = this.S();
  try {
    if (8 & this.f) return;
    if (void 0 === this.x) return;
    const t2 = this.x();
    if ("function" == typeof t2) this.u = t2;
  } finally {
    i2();
  }
};
p.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1;
  this.f &= -9;
  _(this);
  l(this);
  r++;
  const i2 = n;
  n = this;
  return g.bind(this, i2);
};
p.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 2;
    this.o = s;
    s = this;
  }
};
p.prototype.d = function() {
  this.f |= 8;
  if (!(1 & this.f)) b(this);
};
p.prototype.dispose = function() {
  this.d();
};
function E(i2, t2) {
  const o2 = new p(i2, t2);
  try {
    o2.c();
  } catch (i3) {
    o2.d();
    throw i3;
  }
  const n2 = o2.d.bind(o2);
  n2[Symbol.dispose] = n2;
  return n2;
}
function namedSignals(defaults, opts = {}) {
  const initial = {};
  for (const k in defaults) {
    const v2 = opts[k];
    const store = d(v2 === void 0 ? defaults[k] : v2);
    initial[k] = store;
  }
  return initial;
}
var AutoFocusExtension = defineExtension2({
  build: (editor, config, state) => {
    return namedSignals(config);
  },
  config: safeCast2({
    defaultSelection: "rootEnd",
    disabled: false
  }),
  name: "@lexical/extension/AutoFocus",
  register(editor, config, state) {
    const stores = state.getOutput();
    return E(() => stores.disabled.value ? void 0 : editor.registerRootListener((rootElement) => {
      editor.focus(() => {
        const activeElement = document.activeElement;
        if (rootElement !== null && (activeElement === null || !rootElement.contains(activeElement))) {
          rootElement.focus({
            preventScroll: true
          });
        }
      }, {
        defaultSelection: stores.defaultSelection.peek()
      });
    }));
  }
});
function $defaultOnClear() {
  const root = $getRoot2();
  const selection = $getSelection2();
  const paragraph = $createParagraphNode2();
  root.clear();
  root.append(paragraph);
  if (selection !== null) {
    paragraph.select();
  }
  if ($isRangeSelection2(selection)) {
    selection.format = 0;
  }
}
function registerClearEditor(editor, $onClear = $defaultOnClear) {
  return editor.registerCommand(CLEAR_EDITOR_COMMAND2, (payload) => {
    editor.update($onClear);
    return true;
  }, COMMAND_PRIORITY_EDITOR2);
}
var ClearEditorExtension = defineExtension2({
  build(editor, config, state) {
    return namedSignals(config);
  },
  config: safeCast2({
    $onClear: $defaultOnClear
  }),
  name: "@lexical/extension/ClearEditor",
  register(editor, config, state) {
    const {
      $onClear
    } = state.getOutput();
    return E(() => registerClearEditor(editor, $onClear.value));
  }
});
function getKnownTypesAndNodes(config) {
  const types = /* @__PURE__ */ new Set();
  const nodes = /* @__PURE__ */ new Set();
  for (const klassOrReplacement of getNodeConfig(config)) {
    const klass = typeof klassOrReplacement === "function" ? klassOrReplacement : klassOrReplacement.replace;
    types.add(klass.getType());
    nodes.add(klass);
  }
  return {
    nodes,
    types
  };
}
function getNodeConfig(config) {
  return (typeof config.nodes === "function" ? config.nodes() : config.nodes) || [];
}
var formatState = createState2("format", {
  parse: (value) => typeof value === "number" ? value : 0
});
var DecoratorTextNode = class extends DecoratorNode2 {
  $config() {
    return this.config("decorator-text", {
      extends: DecoratorNode2,
      stateConfigs: [{
        flat: true,
        stateConfig: formatState
      }]
    });
  }
  getFormat() {
    return $getState2(this, formatState);
  }
  getFormatFlags(type, alignWithFormat) {
    return toggleTextFormatType2(this.getFormat(), type, alignWithFormat);
  }
  hasFormat(type) {
    const formatFlag = TEXT_TYPE_TO_FORMAT2[type];
    return (this.getFormat() & formatFlag) !== 0;
  }
  setFormat(type) {
    return $setState2(this, formatState, type);
  }
  toggleFormat(type) {
    const format = this.getFormat();
    const newFormat = toggleTextFormatType2(format, type, null);
    return this.setFormat(newFormat);
  }
  isInline() {
    return true;
  }
  createDOM() {
    return document.createElement("span");
  }
  updateDOM() {
    return false;
  }
};
function $isDecoratorTextNode(node) {
  return node instanceof DecoratorTextNode;
}
function applyFormatFromStyle(lexicalNode, style, shouldApply) {
  const fontWeight = style.fontWeight;
  const textDecoration = style.textDecoration.split(" ");
  const hasBoldFontWeight = fontWeight === "700" || fontWeight === "bold";
  const hasLinethroughTextDecoration = textDecoration.includes("line-through");
  const hasItalicFontStyle = style.fontStyle === "italic";
  const hasUnderlineTextDecoration = textDecoration.includes("underline");
  const verticalAlign = style.verticalAlign;
  if (hasBoldFontWeight && !lexicalNode.hasFormat("bold")) {
    lexicalNode.toggleFormat("bold");
  }
  if (hasLinethroughTextDecoration && !lexicalNode.hasFormat("strikethrough")) {
    lexicalNode.toggleFormat("strikethrough");
  }
  if (hasItalicFontStyle && !lexicalNode.hasFormat("italic")) {
    lexicalNode.toggleFormat("italic");
  }
  if (hasUnderlineTextDecoration && !lexicalNode.hasFormat("underline")) {
    lexicalNode.toggleFormat("underline");
  }
  if (verticalAlign === "sub" && !lexicalNode.hasFormat("subscript")) {
    lexicalNode.toggleFormat("subscript");
  }
  if (verticalAlign === "super" && !lexicalNode.hasFormat("superscript")) {
    lexicalNode.toggleFormat("superscript");
  }
  if (shouldApply && !lexicalNode.hasFormat(shouldApply)) {
    lexicalNode.toggleFormat(shouldApply);
  }
  return lexicalNode;
}
function applyFormatToDom(lexicalNode, domNode, tagNameToFormat = DEFAULT_TAG_NAME_TO_FORMAT) {
  for (const [tag, format] of Object.entries(tagNameToFormat)) {
    if (lexicalNode.hasFormat(format)) {
      domNode = wrapElementWith2(domNode, tag);
    }
  }
  return domNode;
}
function wrapElementWith2(element, tag) {
  const el = document.createElement(tag);
  el.appendChild(element);
  return el;
}
var DEFAULT_TAG_NAME_TO_FORMAT = {
  b: "bold",
  code: "code",
  em: "italic",
  i: "italic",
  mark: "highlight",
  s: "strikethrough",
  strong: "bold",
  sub: "subscript",
  sup: "superscript",
  u: "underline"
};
var DecoratorTextExtension = defineExtension2({
  name: "@lexical/extension/DecoratorText",
  nodes: () => [DecoratorTextNode],
  register(editor, config, state) {
    return editor.registerCommand(FORMAT_TEXT_COMMAND2, (formatType) => {
      const selection = $getSelection2();
      if ($isNodeSelection2(selection) || $isRangeSelection2(selection)) {
        for (const node of selection.getNodes()) {
          if ($isDecoratorTextNode(node)) {
            node.toggleFormat(formatType);
          }
        }
      }
      return false;
    }, COMMAND_PRIORITY_LOW2);
  }
});
function watchedSignal(getSnapshot, register) {
  let dispose;
  return d(getSnapshot(), {
    unwatched() {
      if (dispose) {
        dispose();
        dispose = void 0;
      }
    },
    watched() {
      this.value = getSnapshot();
      dispose = register(this);
    }
  });
}
var EditorStateExtension = defineExtension2({
  build(editor) {
    return watchedSignal(() => editor.getEditorState(), (editorStateSignal) => editor.registerUpdateListener((payload) => {
      editorStateSignal.value = payload.editorState;
    }));
  },
  name: "@lexical/extension/EditorState"
});
function formatDevErrorMessage5(message) {
  throw new Error(message);
}
function deepThemeMergeInPlace(a2, b2) {
  if (a2 && b2 && !Array.isArray(b2) && typeof a2 === "object" && typeof b2 === "object") {
    const aObj = a2;
    const bObj = b2;
    for (const k in bObj) {
      aObj[k] = deepThemeMergeInPlace(aObj[k], bObj[k]);
    }
    return a2;
  }
  return b2;
}
var ExtensionRepStateIds = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  unmarked: 0,
  temporary: 1,
  permanent: 2,
  configured: 3,
  initialized: 4,
  built: 5,
  registered: 6,
  afterRegistration: 7
  /* eslint-enable sort-keys-fix/sort-keys-fix */
};
function isExactlyUnmarkedExtensionRepState(state) {
  return state.id === ExtensionRepStateIds.unmarked;
}
function isExactlyTemporaryExtensionRepState(state) {
  return state.id === ExtensionRepStateIds.temporary;
}
function isExactlyPermanentExtensionRepState(state) {
  return state.id === ExtensionRepStateIds.permanent;
}
function isConfiguredExtensionRepState(state) {
  return state.id >= ExtensionRepStateIds.configured;
}
function isInitializedExtensionRepState(state) {
  return state.id >= ExtensionRepStateIds.initialized;
}
function isBuiltExtensionRepState(state) {
  return state.id >= ExtensionRepStateIds.built;
}
function isAfterRegistrationState(state) {
  return state.id >= ExtensionRepStateIds.afterRegistration;
}
function applyTemporaryMark(state) {
  if (!isExactlyUnmarkedExtensionRepState(state)) {
    formatDevErrorMessage5(`LexicalBuilder: Can not apply a temporary mark from state id ${String(state.id)} (expected ${String(ExtensionRepStateIds.unmarked)} unmarked)`);
  }
  return Object.assign(state, {
    id: ExtensionRepStateIds.temporary
  });
}
function applyPermanentMark(state) {
  if (!isExactlyTemporaryExtensionRepState(state)) {
    formatDevErrorMessage5(`LexicalBuilder: Can not apply a permanent mark from state id ${String(state.id)} (expected ${String(ExtensionRepStateIds.temporary)} temporary)`);
  }
  return Object.assign(state, {
    id: ExtensionRepStateIds.permanent
  });
}
function applyConfiguredState(state, config, registerState) {
  return Object.assign(state, {
    config,
    id: ExtensionRepStateIds.configured,
    registerState
  });
}
function applyInitializedState(state, initResult, registerState) {
  return Object.assign(state, {
    id: ExtensionRepStateIds.initialized,
    initResult,
    registerState
  });
}
function applyBuiltState(state, output, registerState) {
  return Object.assign(state, {
    id: ExtensionRepStateIds.built,
    output,
    registerState
  });
}
function applyRegisteredState(state) {
  return Object.assign(state, {
    id: ExtensionRepStateIds.registered
  });
}
function applyAfterRegistrationState(state) {
  return Object.assign(state, {
    id: ExtensionRepStateIds.afterRegistration
  });
}
function rollbackToBuiltState(state) {
  return Object.assign(state, {
    id: ExtensionRepStateIds.built
  });
}
var emptySet = /* @__PURE__ */ new Set();
var ExtensionRep = class {
  builder;
  configs;
  _dependency;
  _peerNameSet;
  extension;
  state;
  _signal;
  constructor(builder, extension) {
    this.builder = builder;
    this.extension = extension;
    this.configs = /* @__PURE__ */ new Set();
    this.state = {
      id: ExtensionRepStateIds.unmarked
    };
  }
  mergeConfigs() {
    let config = this.extension.config || {};
    const mergeConfig = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : shallowMergeConfig2;
    for (const cfg of this.configs) {
      config = mergeConfig(config, cfg);
    }
    return config;
  }
  init(editorConfig) {
    const initialState = this.state;
    if (!isExactlyPermanentExtensionRepState(initialState)) {
      formatDevErrorMessage5(`ExtensionRep: Can not configure from state id ${String(initialState.id)}`);
    }
    const initState = {
      getDependency: this.getInitDependency.bind(this),
      getDirectDependentNames: this.getDirectDependentNames.bind(this),
      getPeer: this.getInitPeer.bind(this),
      getPeerNameSet: this.getPeerNameSet.bind(this)
    };
    const buildState = {
      ...initState,
      getDependency: this.getDependency.bind(this),
      getInitResult: this.getInitResult.bind(this),
      getPeer: this.getPeer.bind(this)
    };
    const state = applyConfiguredState(initialState, this.mergeConfigs(), initState);
    this.state = state;
    let initResult;
    if (this.extension.init) {
      initResult = this.extension.init(editorConfig, state.config, initState);
    }
    this.state = applyInitializedState(state, initResult, buildState);
  }
  build(editor) {
    const state = this.state;
    if (!(state.id === ExtensionRepStateIds.initialized)) {
      formatDevErrorMessage5(`ExtensionRep: register called in state id ${String(state.id)} (expected ${String(ExtensionRepStateIds.built)} initialized)`);
    }
    let output;
    if (this.extension.build) {
      output = this.extension.build(editor, state.config, state.registerState);
    }
    const registerState = {
      ...state.registerState,
      getOutput: () => output,
      getSignal: this.getSignal.bind(this)
    };
    this.state = applyBuiltState(state, output, registerState);
  }
  register(editor, signal2) {
    this._signal = signal2;
    const state = this.state;
    if (!(state.id === ExtensionRepStateIds.built)) {
      formatDevErrorMessage5(`ExtensionRep: register called in state id ${String(state.id)} (expected ${String(ExtensionRepStateIds.built)} built)`);
    }
    const cleanup = this.extension.register && this.extension.register(editor, state.config, state.registerState);
    this.state = applyRegisteredState(state);
    return () => {
      const afterRegistrationState = this.state;
      if (!(afterRegistrationState.id === ExtensionRepStateIds.afterRegistration)) {
        formatDevErrorMessage5(`ExtensionRep: rollbackToBuiltState called in state id ${String(state.id)} (expected ${String(ExtensionRepStateIds.afterRegistration)} afterRegistration)`);
      }
      this.state = rollbackToBuiltState(afterRegistrationState);
      if (cleanup) {
        cleanup();
      }
    };
  }
  afterRegistration(editor) {
    const state = this.state;
    if (!(state.id === ExtensionRepStateIds.registered)) {
      formatDevErrorMessage5(`ExtensionRep: afterRegistration called in state id ${String(state.id)} (expected ${String(ExtensionRepStateIds.registered)} registered)`);
    }
    let rval;
    if (this.extension.afterRegistration) {
      rval = this.extension.afterRegistration(editor, state.config, state.registerState);
    }
    this.state = applyAfterRegistrationState(state);
    return rval;
  }
  getSignal() {
    if (!(this._signal !== void 0)) {
      formatDevErrorMessage5(`ExtensionRep.getSignal() called before register`);
    }
    return this._signal;
  }
  getInitResult() {
    if (!(this.extension.init !== void 0)) {
      formatDevErrorMessage5(`ExtensionRep: getInitResult() called for Extension ${this.extension.name} that does not define init`);
    }
    const state = this.state;
    if (!isInitializedExtensionRepState(state)) {
      formatDevErrorMessage5(`ExtensionRep: getInitResult() called for ExtensionRep in state id ${String(state.id)} < ${String(ExtensionRepStateIds.initialized)} (initialized)`);
    }
    return state.initResult;
  }
  getInitPeer(name) {
    const rep = this.builder.extensionNameMap.get(name);
    return rep ? rep.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const state = this.state;
    if (!isConfiguredExtensionRepState(state)) {
      formatDevErrorMessage5(`ExtensionRep: getExtensionInitDependency called in state id ${String(state.id)} (expected >= ${String(ExtensionRepStateIds.configured)} configured)`);
    }
    return {
      config: state.config
    };
  }
  getPeer(name) {
    const rep = this.builder.extensionNameMap.get(name);
    return rep ? rep.getExtensionDependency() : void 0;
  }
  getInitDependency(dep) {
    const rep = this.builder.getExtensionRep(dep);
    if (!(rep !== void 0)) {
      formatDevErrorMessage5(`LexicalExtensionBuilder: Extension ${this.extension.name} missing dependency extension ${dep.name} to be in registry`);
    }
    return rep.getExtensionInitDependency();
  }
  getDependency(dep) {
    const rep = this.builder.getExtensionRep(dep);
    if (!(rep !== void 0)) {
      formatDevErrorMessage5(`LexicalExtensionBuilder: Extension ${this.extension.name} missing dependency extension ${dep.name} to be in registry`);
    }
    return rep.getExtensionDependency();
  }
  getState() {
    const state = this.state;
    if (!isAfterRegistrationState(state)) {
      formatDevErrorMessage5(`ExtensionRep getState called in state id ${String(state.id)} (expected ${String(ExtensionRepStateIds.afterRegistration)} afterRegistration)`);
    }
    return state;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || emptySet;
  }
  getPeerNameSet() {
    let s2 = this._peerNameSet;
    if (!s2) {
      s2 = new Set((this.extension.peerDependencies || []).map(([name]) => name));
      this._peerNameSet = s2;
    }
    return s2;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const state = this.state;
      if (!isBuiltExtensionRepState(state)) {
        formatDevErrorMessage5(`Extension ${this.extension.name} used as a dependency before build`);
      }
      this._dependency = {
        config: state.config,
        init: state.initResult,
        output: state.output
      };
    }
    return this._dependency;
  }
};
var HISTORY_MERGE_OPTIONS = {
  tag: HISTORY_MERGE_TAG2
};
function $defaultInitializer() {
  const root = $getRoot2();
  if (root.isEmpty()) {
    root.append($createParagraphNode2());
  }
}
var InitialStateExtension = defineExtension2({
  config: safeCast2({
    setOptions: HISTORY_MERGE_OPTIONS,
    updateOptions: HISTORY_MERGE_OPTIONS
  }),
  init({
    $initialEditorState = $defaultInitializer
  }) {
    return {
      $initialEditorState,
      initialized: false
    };
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix -- typescript inference is order dependent here for some reason
  afterRegistration(editor, {
    updateOptions,
    setOptions
  }, state) {
    const initResult = state.getInitResult();
    if (!initResult.initialized) {
      initResult.initialized = true;
      const {
        $initialEditorState
      } = initResult;
      if ($isEditorState2($initialEditorState)) {
        editor.setEditorState($initialEditorState, setOptions);
      } else if (typeof $initialEditorState === "function") {
        editor.update(() => {
          $initialEditorState(editor);
        }, updateOptions);
      } else if ($initialEditorState && (typeof $initialEditorState === "string" || typeof $initialEditorState === "object")) {
        const parsedEditorState = editor.parseEditorState($initialEditorState);
        editor.setEditorState(parsedEditorState, setOptions);
      }
    }
    return () => {
    };
  },
  name: "@lexical/extension/InitialState",
  // These are automatically added by createEditor, we add them here so they are
  // visible during extensionRep.init so extensions can see all known types before the
  // editor is created.
  // (excluding ArtificialNode__DO_NOT_USE because it isn't really public API
  // and shouldn't change anything)
  nodes: [RootNode2, TextNode2, LineBreakNode2, TabNode2, ParagraphNode2]
});
var builderSymbol = /* @__PURE__ */ Symbol.for("@lexical/extension/LexicalBuilder");
function buildEditorFromExtensions(...extensions) {
  return LexicalBuilder.fromExtensions(extensions).buildEditor();
}
function noop() {
}
function defaultOnError(err) {
  throw err;
}
function maybeWithBuilder(editor) {
  return editor;
}
function normalizeExtensionArgument(arg) {
  return Array.isArray(arg) ? arg : [arg];
}
var PACKAGE_VERSION = "0.41.0+dev.esm";
var LexicalBuilder = class _LexicalBuilder {
  roots;
  extensionNameMap;
  outgoingConfigEdges;
  incomingEdges;
  conflicts;
  _sortedExtensionReps;
  PACKAGE_VERSION;
  constructor(roots) {
    this.outgoingConfigEdges = /* @__PURE__ */ new Map();
    this.incomingEdges = /* @__PURE__ */ new Map();
    this.extensionNameMap = /* @__PURE__ */ new Map();
    this.conflicts = /* @__PURE__ */ new Map();
    this.PACKAGE_VERSION = PACKAGE_VERSION;
    this.roots = roots;
    for (const extension of roots) {
      this.addExtension(extension);
    }
  }
  static fromExtensions(extensions) {
    const roots = [normalizeExtensionArgument(InitialStateExtension)];
    for (const extension of extensions) {
      roots.push(normalizeExtensionArgument(extension));
    }
    return new _LexicalBuilder(roots);
  }
  static maybeFromEditor(editor) {
    const builder = maybeWithBuilder(editor)[builderSymbol];
    if (builder) {
      if (!(builder.PACKAGE_VERSION === PACKAGE_VERSION)) {
        formatDevErrorMessage5(`LexicalBuilder.fromEditor: The given editor was created with LexicalBuilder ${builder.PACKAGE_VERSION} but this version is ${PACKAGE_VERSION}. A project should have exactly one copy of LexicalBuilder`);
      }
      if (!(builder instanceof _LexicalBuilder)) {
        formatDevErrorMessage5(`LexicalBuilder.fromEditor: There are multiple copies of the same version of LexicalBuilder in your project, and this editor was created with another one. Your project, or one of its dependencies, has its package.json and/or bundler configured incorrectly.`);
      }
    }
    return builder;
  }
  /** Look up the editor that was created by this LexicalBuilder or throw */
  static fromEditor(editor) {
    const builder = _LexicalBuilder.maybeFromEditor(editor);
    if (!(builder !== void 0)) {
      formatDevErrorMessage5(`LexicalBuilder.fromEditor: The given editor was not created with LexicalBuilder`);
    }
    return builder;
  }
  constructEditor() {
    const {
      $initialEditorState: _$initialEditorState,
      onError,
      ...editorConfig
    } = this.buildCreateEditorArgs();
    const editor = Object.assign(createEditor2({
      ...editorConfig,
      ...onError ? {
        onError: (err) => {
          onError(err, editor);
        }
      } : {}
    }), {
      [builderSymbol]: this
    });
    for (const extensionRep of this.sortedExtensionReps()) {
      extensionRep.build(editor);
    }
    return editor;
  }
  buildEditor() {
    let disposeOnce = noop;
    function dispose() {
      try {
        disposeOnce();
      } finally {
        disposeOnce = noop;
      }
    }
    const editor = Object.assign(this.constructEditor(), {
      dispose,
      [Symbol.dispose]: dispose
    });
    disposeOnce = mergeRegister2(this.registerEditor(editor), () => editor.setRootElement(null));
    return editor;
  }
  hasExtensionByName(name) {
    return this.extensionNameMap.has(name);
  }
  getExtensionRep(extension) {
    const rep = this.extensionNameMap.get(extension.name);
    if (rep) {
      if (!(rep.extension === extension)) {
        formatDevErrorMessage5(`LexicalBuilder: A registered extension with name ${extension.name} exists but does not match the given extension`);
      }
      return rep;
    }
  }
  addEdge(fromExtensionName, toExtensionName, configs) {
    const outgoing = this.outgoingConfigEdges.get(fromExtensionName);
    if (outgoing) {
      outgoing.set(toExtensionName, configs);
    } else {
      this.outgoingConfigEdges.set(fromExtensionName, /* @__PURE__ */ new Map([[toExtensionName, configs]]));
    }
    const incoming = this.incomingEdges.get(toExtensionName);
    if (incoming) {
      incoming.add(fromExtensionName);
    } else {
      this.incomingEdges.set(toExtensionName, /* @__PURE__ */ new Set([fromExtensionName]));
    }
  }
  addExtension(arg) {
    if (!(this._sortedExtensionReps === void 0)) {
      formatDevErrorMessage5(`LexicalBuilder: addExtension called after finalization`);
    }
    const normalized = normalizeExtensionArgument(arg);
    const [extension] = normalized;
    if (!(typeof extension.name === "string")) {
      formatDevErrorMessage5(`LexicalBuilder: extension name must be string, not ${typeof extension.name}`);
    }
    let extensionRep = this.extensionNameMap.get(extension.name);
    if (!(extensionRep === void 0 || extensionRep.extension === extension)) {
      formatDevErrorMessage5(`LexicalBuilder: Multiple extensions registered with name ${extension.name}, names must be unique`);
    }
    if (!extensionRep) {
      extensionRep = new ExtensionRep(this, extension);
      this.extensionNameMap.set(extension.name, extensionRep);
      const hasConflict = this.conflicts.get(extension.name);
      if (typeof hasConflict === "string") {
        {
          formatDevErrorMessage5(`LexicalBuilder: extension ${extension.name} conflicts with ${hasConflict}`);
        }
      }
      for (const name of extension.conflictsWith || []) {
        if (!!this.extensionNameMap.has(name)) {
          formatDevErrorMessage5(`LexicalBuilder: extension ${extension.name} conflicts with ${name}`);
        }
        this.conflicts.set(name, extension.name);
      }
      for (const dep of extension.dependencies || []) {
        const normDep = normalizeExtensionArgument(dep);
        this.addEdge(extension.name, normDep[0].name, normDep.slice(1));
        this.addExtension(normDep);
      }
      for (const [depName, config] of extension.peerDependencies || []) {
        this.addEdge(extension.name, depName, config ? [config] : []);
      }
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) {
      return this._sortedExtensionReps;
    }
    const sortedExtensionReps = [];
    const visit = (rep, fromExtensionName) => {
      let mark = rep.state;
      if (isExactlyPermanentExtensionRepState(mark)) {
        return;
      }
      const extensionName = rep.extension.name;
      if (!isExactlyUnmarkedExtensionRepState(mark)) {
        formatDevErrorMessage5(`LexicalBuilder: Circular dependency detected for Extension ${extensionName} from ${fromExtensionName || "[unknown]"}`);
      }
      mark = applyTemporaryMark(mark);
      rep.state = mark;
      const outgoingConfigEdges = this.outgoingConfigEdges.get(extensionName);
      if (outgoingConfigEdges) {
        for (const toExtensionName of outgoingConfigEdges.keys()) {
          const toRep = this.extensionNameMap.get(toExtensionName);
          if (toRep) {
            visit(toRep, extensionName);
          }
        }
      }
      mark = applyPermanentMark(mark);
      rep.state = mark;
      sortedExtensionReps.push(rep);
    };
    for (const rep of this.extensionNameMap.values()) {
      if (isExactlyUnmarkedExtensionRepState(rep.state)) {
        visit(rep);
      }
    }
    for (const rep of sortedExtensionReps) {
      for (const [toExtensionName, configs] of this.outgoingConfigEdges.get(rep.extension.name) || []) {
        if (configs.length > 0) {
          const toRep = this.extensionNameMap.get(toExtensionName);
          if (toRep) {
            for (const config of configs) {
              toRep.configs.add(config);
            }
          }
        }
      }
    }
    for (const [extension, ...configs] of this.roots) {
      if (configs.length > 0) {
        const toRep = this.extensionNameMap.get(extension.name);
        if (!(toRep !== void 0)) {
          formatDevErrorMessage5(`LexicalBuilder: Expecting existing ExtensionRep for ${extension.name}`);
        }
        for (const config of configs) {
          toRep.configs.add(config);
        }
      }
    }
    this._sortedExtensionReps = sortedExtensionReps;
    return this._sortedExtensionReps;
  }
  registerEditor(editor) {
    const extensionReps = this.sortedExtensionReps();
    const controller = new AbortController();
    const cleanups = [() => controller.abort()];
    const signal2 = controller.signal;
    for (const extensionRep of extensionReps) {
      const cleanup = extensionRep.register(editor, signal2);
      if (cleanup) {
        cleanups.push(cleanup);
      }
    }
    for (const extensionRep of extensionReps) {
      const cleanup = extensionRep.afterRegistration(editor);
      if (cleanup) {
        cleanups.push(cleanup);
      }
    }
    return mergeRegister2(...cleanups);
  }
  buildCreateEditorArgs() {
    const config = {};
    const nodes = /* @__PURE__ */ new Set();
    const replacedNodes = /* @__PURE__ */ new Map();
    const htmlExport = /* @__PURE__ */ new Map();
    const htmlImport = {};
    const theme = {};
    const extensionReps = this.sortedExtensionReps();
    for (const extensionRep of extensionReps) {
      const {
        extension
      } = extensionRep;
      if (extension.onError !== void 0) {
        config.onError = extension.onError;
      }
      if (extension.disableEvents !== void 0) {
        config.disableEvents = extension.disableEvents;
      }
      if (extension.parentEditor !== void 0) {
        config.parentEditor = extension.parentEditor;
      }
      if (extension.editable !== void 0) {
        config.editable = extension.editable;
      }
      if (extension.namespace !== void 0) {
        config.namespace = extension.namespace;
      }
      if (extension.$initialEditorState !== void 0) {
        config.$initialEditorState = extension.$initialEditorState;
      }
      if (extension.nodes) {
        for (const node of getNodeConfig(extension)) {
          if (typeof node !== "function") {
            const conflictExtension = replacedNodes.get(node.replace);
            if (conflictExtension) {
              {
                formatDevErrorMessage5(`LexicalBuilder: Extension ${extension.name} can not register replacement for node ${node.replace.name} because ${conflictExtension.extension.name} already did`);
              }
            }
            replacedNodes.set(node.replace, extensionRep);
          }
          nodes.add(node);
        }
      }
      if (extension.html) {
        if (extension.html.export) {
          for (const [k, v2] of extension.html.export.entries()) {
            htmlExport.set(k, v2);
          }
        }
        if (extension.html.import) {
          Object.assign(htmlImport, extension.html.import);
        }
      }
      if (extension.theme) {
        deepThemeMergeInPlace(theme, extension.theme);
      }
    }
    if (Object.keys(theme).length > 0) {
      config.theme = theme;
    }
    if (nodes.size) {
      config.nodes = [...nodes];
    }
    const hasImport = Object.keys(htmlImport).length > 0;
    const hasExport = htmlExport.size > 0;
    if (hasImport || hasExport) {
      config.html = {};
      if (hasImport) {
        config.html.import = htmlImport;
      }
      if (hasExport) {
        config.html.export = htmlExport;
      }
    }
    for (const extensionRep of extensionReps) {
      extensionRep.init(config);
    }
    if (!config.onError) {
      config.onError = defaultOnError;
    }
    return config;
  }
};
function getExtensionDependencyFromEditor(editor, extension) {
  const builder = LexicalBuilder.fromEditor(editor);
  const rep = builder.getExtensionRep(extension);
  if (!(rep !== void 0)) {
    formatDevErrorMessage5(`getExtensionDependencyFromEditor: Extension ${extension.name} was not built when creating this editor`);
  }
  return rep.getExtensionDependency();
}
function getPeerDependencyFromEditor(editor, extensionName) {
  const builder = LexicalBuilder.fromEditor(editor);
  const peer = builder.extensionNameMap.get(extensionName);
  return peer ? peer.getExtensionDependency() : void 0;
}
function getPeerDependencyFromEditorOrThrow(editor, extensionName) {
  const dep = getPeerDependencyFromEditor(editor, extensionName);
  if (!(dep !== void 0)) {
    formatDevErrorMessage5(`getPeerDependencyFromEditorOrThrow: Editor was not built with Extension ${extensionName}`);
  }
  return dep;
}
var EMPTY_SET = /* @__PURE__ */ new Set();
var NodeSelectionExtension = defineExtension2({
  build(editor, config, state) {
    const editorStateStore = state.getDependency(EditorStateExtension).output;
    const watchedNodeStore = d({
      watchedNodeKeys: /* @__PURE__ */ new Map()
    });
    const selectedNodeKeys = watchedSignal(() => void 0, () => E(() => {
      const prevSelectedNodeKeys = selectedNodeKeys.peek();
      const {
        watchedNodeKeys
      } = watchedNodeStore.value;
      let nextSelectedNodeKeys;
      let didChange = false;
      editorStateStore.value.read(() => {
        const selection = $getSelection2();
        if (selection) {
          for (const [key, listeners] of watchedNodeKeys.entries()) {
            if (listeners.size === 0) {
              watchedNodeKeys.delete(key);
              continue;
            }
            const node = $getNodeByKey2(key);
            const isSelected = node && node.isSelected() || false;
            didChange = didChange || isSelected !== (prevSelectedNodeKeys ? prevSelectedNodeKeys.has(key) : false);
            if (isSelected) {
              nextSelectedNodeKeys = nextSelectedNodeKeys || /* @__PURE__ */ new Set();
              nextSelectedNodeKeys.add(key);
            }
          }
        }
      });
      if (!(!didChange && nextSelectedNodeKeys && prevSelectedNodeKeys && nextSelectedNodeKeys.size === prevSelectedNodeKeys.size)) {
        selectedNodeKeys.value = nextSelectedNodeKeys;
      }
    }));
    function watchNodeKey(key) {
      const watcher = w(() => (selectedNodeKeys.value || EMPTY_SET).has(key));
      const {
        watchedNodeKeys
      } = watchedNodeStore.peek();
      let listeners = watchedNodeKeys.get(key);
      const hadListener = listeners !== void 0;
      listeners = listeners || /* @__PURE__ */ new Set();
      listeners.add(watcher);
      if (!hadListener) {
        watchedNodeKeys.set(key, listeners);
        watchedNodeStore.value = {
          watchedNodeKeys
        };
      }
      return watcher;
    }
    return {
      watchNodeKey
    };
  },
  dependencies: [EditorStateExtension],
  name: "@lexical/extension/NodeSelection"
});
var INSERT_HORIZONTAL_RULE_COMMAND = createCommand2("INSERT_HORIZONTAL_RULE_COMMAND");
var HorizontalRuleNode = class _HorizontalRuleNode extends DecoratorNode2 {
  static getType() {
    return "horizontalrule";
  }
  static clone(node) {
    return new _HorizontalRuleNode(node.__key);
  }
  static importJSON(serializedNode) {
    return $createHorizontalRuleNode().updateFromJSON(serializedNode);
  }
  static importDOM() {
    return {
      hr: () => ({
        conversion: $convertHorizontalRuleElement,
        priority: 0
      })
    };
  }
  exportDOM() {
    return {
      element: document.createElement("hr")
    };
  }
  createDOM(config) {
    const element = document.createElement("hr");
    addClassNamesToElement2(element, config.theme.hr);
    return element;
  }
  getTextContent() {
    return "\n";
  }
  isInline() {
    return false;
  }
  updateDOM() {
    return false;
  }
};
function $convertHorizontalRuleElement() {
  return {
    node: $createHorizontalRuleNode()
  };
}
function $createHorizontalRuleNode() {
  return $create2(HorizontalRuleNode);
}
function $isHorizontalRuleNode(node) {
  return node instanceof HorizontalRuleNode;
}
function $toggleNodeSelection(node, shiftKey = false) {
  const selection = $getSelection2();
  const wasSelected = node.isSelected();
  const key = node.getKey();
  let nodeSelection;
  if (shiftKey && $isNodeSelection2(selection)) {
    nodeSelection = selection;
  } else {
    nodeSelection = $createNodeSelection2();
    $setSelection2(nodeSelection);
  }
  if (wasSelected) {
    nodeSelection.delete(key);
  } else {
    nodeSelection.add(key);
  }
}
var HorizontalRuleExtension = defineExtension2({
  dependencies: [EditorStateExtension, NodeSelectionExtension],
  name: "@lexical/extension/HorizontalRule",
  nodes: () => [HorizontalRuleNode],
  register(editor, config, state) {
    const {
      watchNodeKey
    } = state.getDependency(NodeSelectionExtension).output;
    const nodeSelectionStore = d({
      nodeSelections: /* @__PURE__ */ new Map()
    });
    const isSelectedClassName = editor._config.theme.hrSelected ?? "selected";
    return mergeRegister2(editor.registerCommand(CLICK_COMMAND2, (event) => {
      if (isDOMNode2(event.target)) {
        const node = $getNodeFromDOMNode2(event.target);
        if ($isHorizontalRuleNode(node)) {
          $toggleNodeSelection(node, event.shiftKey);
          return true;
        }
      }
      return false;
    }, COMMAND_PRIORITY_LOW2), editor.registerMutationListener(HorizontalRuleNode, (nodes, payload) => {
      o(() => {
        let didChange = false;
        const {
          nodeSelections
        } = nodeSelectionStore.peek();
        for (const [k, v2] of nodes.entries()) {
          if (v2 === "destroyed") {
            nodeSelections.delete(k);
            didChange = true;
          } else {
            const prev = nodeSelections.get(k);
            const dom = editor.getElementByKey(k);
            if (prev) {
              prev.domNode.value = dom;
            } else {
              didChange = true;
              nodeSelections.set(k, {
                domNode: d(dom),
                selectedSignal: watchNodeKey(k)
              });
            }
          }
        }
        if (didChange) {
          nodeSelectionStore.value = {
            nodeSelections
          };
        }
      });
    }), E(() => {
      const effects = [];
      for (const {
        domNode,
        selectedSignal
      } of nodeSelectionStore.value.nodeSelections.values()) {
        effects.push(E(() => {
          const dom = domNode.value;
          if (dom) {
            const isSelected = selectedSignal.value;
            if (isSelected) {
              addClassNamesToElement2(dom, isSelectedClassName);
            } else {
              removeClassNamesFromElement2(dom, isSelectedClassName);
            }
          }
        }));
      }
      return mergeRegister2(...effects);
    }));
  }
});
function $indentOverTab(selection) {
  const nodes = selection.getNodes();
  const canIndentBlockNodes = nodes.filter((node) => $isBlockElementNode2(node) && node.canIndent());
  if (canIndentBlockNodes.length > 0) {
    return true;
  }
  const anchor = selection.anchor;
  const focus = selection.focus;
  const first = focus.isBefore(anchor) ? focus : anchor;
  const firstNode = first.getNode();
  const firstBlock = $getNearestBlockElementAncestorOrThrow2(firstNode);
  if (firstBlock.canIndent()) {
    const firstBlockKey = firstBlock.getKey();
    let selectionAtStart = $createRangeSelection2();
    selectionAtStart.anchor.set(firstBlockKey, 0, "element");
    selectionAtStart.focus.set(firstBlockKey, 0, "element");
    selectionAtStart = $normalizeSelection__EXPERIMENTAL(selectionAtStart);
    if (selectionAtStart.anchor.is(first)) {
      return true;
    }
  }
  return false;
}
function $defaultCanIndent(node) {
  return node.canBeEmpty();
}
function registerTabIndentation(editor, maxIndent, $canIndent = $defaultCanIndent) {
  return mergeRegister2(editor.registerCommand(KEY_TAB_COMMAND2, (event) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    event.preventDefault();
    const command = $indentOverTab(selection) ? event.shiftKey ? OUTDENT_CONTENT_COMMAND2 : INDENT_CONTENT_COMMAND2 : INSERT_TAB_COMMAND2;
    return editor.dispatchCommand(command, void 0);
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(INDENT_CONTENT_COMMAND2, () => {
    const currentMaxIndent = typeof maxIndent === "number" ? maxIndent : maxIndent ? maxIndent.peek() : null;
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    const $currentCanIndent = typeof $canIndent === "function" ? $canIndent : $canIndent.peek();
    return $handleIndentAndOutdent2((block) => {
      if ($currentCanIndent(block)) {
        const newIndent = block.getIndent() + 1;
        if (!currentMaxIndent || newIndent < currentMaxIndent) {
          block.setIndent(newIndent);
        }
      }
    });
  }, COMMAND_PRIORITY_CRITICAL2));
}
var TabIndentationExtension = defineExtension2({
  build(editor, config, state) {
    return namedSignals(config);
  },
  config: safeCast2({
    $canIndent: $defaultCanIndent,
    disabled: false,
    maxIndent: null
  }),
  name: "@lexical/extension/TabIndentation",
  register(editor, config, state) {
    const {
      disabled,
      maxIndent,
      $canIndent
    } = state.getOutput();
    return E(() => {
      if (!disabled.value) {
        return registerTabIndentation(editor, maxIndent, $canIndent);
      }
    });
  }
});

// node_modules/@lexical/extension/LexicalExtension.mjs
var mod6 = true ? LexicalExtension_dev_exports : LexicalExtension_prod_exports;
var $createHorizontalRuleNode2 = mod6.$createHorizontalRuleNode;
var $isDecoratorTextNode2 = mod6.$isDecoratorTextNode;
var $isHorizontalRuleNode2 = mod6.$isHorizontalRuleNode;
var AutoFocusExtension2 = mod6.AutoFocusExtension;
var ClearEditorExtension2 = mod6.ClearEditorExtension;
var DecoratorTextExtension2 = mod6.DecoratorTextExtension;
var DecoratorTextNode2 = mod6.DecoratorTextNode;
var EditorStateExtension2 = mod6.EditorStateExtension;
var HorizontalRuleExtension2 = mod6.HorizontalRuleExtension;
var HorizontalRuleNode2 = mod6.HorizontalRuleNode;
var INSERT_HORIZONTAL_RULE_COMMAND2 = mod6.INSERT_HORIZONTAL_RULE_COMMAND;
var InitialStateExtension2 = mod6.InitialStateExtension;
var LexicalBuilder2 = mod6.LexicalBuilder;
var NodeSelectionExtension2 = mod6.NodeSelectionExtension;
var TabIndentationExtension2 = mod6.TabIndentationExtension;
var applyFormatFromStyle2 = mod6.applyFormatFromStyle;
var applyFormatToDom2 = mod6.applyFormatToDom;
var batch = mod6.batch;
var buildEditorFromExtensions2 = mod6.buildEditorFromExtensions;
var computed = mod6.computed;
var configExtension3 = mod6.configExtension;
var declarePeerDependency3 = mod6.declarePeerDependency;
var defineExtension3 = mod6.defineExtension;
var effect = mod6.effect;
var getExtensionDependencyFromEditor2 = mod6.getExtensionDependencyFromEditor;
var getKnownTypesAndNodes2 = mod6.getKnownTypesAndNodes;
var getPeerDependencyFromEditor2 = mod6.getPeerDependencyFromEditor;
var getPeerDependencyFromEditorOrThrow2 = mod6.getPeerDependencyFromEditorOrThrow;
var namedSignals2 = mod6.namedSignals;
var registerClearEditor2 = mod6.registerClearEditor;
var registerTabIndentation2 = mod6.registerTabIndentation;
var safeCast3 = mod6.safeCast;
var shallowMergeConfig3 = mod6.shallowMergeConfig;
var signal = mod6.signal;
var untracked = mod6.untracked;
var watchedSignal2 = mod6.watchedSignal;

// node_modules/@lexical/dragon/LexicalDragon.dev.mjs
function registerDragonSupport(editor) {
  const origin = window.location.origin;
  const handler = (event) => {
    if (event.origin !== origin) {
      return;
    }
    const rootElement = editor.getRootElement();
    if (document.activeElement !== rootElement) {
      return;
    }
    const data = event.data;
    if (typeof data === "string") {
      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch (_e) {
        return;
      }
      if (parsedData && parsedData.protocol === "nuanria_messaging" && parsedData.type === "request") {
        const payload = parsedData.payload;
        if (payload && payload.functionId === "makeChanges") {
          const args = payload.args;
          if (args) {
            const [elementStart, elementLength, text, selStart, selLength] = args;
            editor.update(() => {
              const selection = $getSelection2();
              if ($isRangeSelection2(selection)) {
                const anchor = selection.anchor;
                let anchorNode = anchor.getNode();
                let setSelStart = 0;
                let setSelEnd = 0;
                if ($isTextNode2(anchorNode)) {
                  if (elementStart >= 0 && elementLength >= 0) {
                    setSelStart = elementStart;
                    setSelEnd = elementStart + elementLength;
                    selection.setTextNodeRange(anchorNode, setSelStart, anchorNode, setSelEnd);
                  }
                }
                if (setSelStart !== setSelEnd || text !== "") {
                  selection.insertRawText(text);
                  anchorNode = anchor.getNode();
                }
                if ($isTextNode2(anchorNode)) {
                  setSelStart = selStart;
                  setSelEnd = selStart + selLength;
                  const anchorNodeTextLength = anchorNode.getTextContentSize();
                  setSelStart = setSelStart > anchorNodeTextLength ? anchorNodeTextLength : setSelStart;
                  setSelEnd = setSelEnd > anchorNodeTextLength ? anchorNodeTextLength : setSelEnd;
                  selection.setTextNodeRange(anchorNode, setSelStart, anchorNode, setSelEnd);
                }
                event.stopImmediatePropagation();
              }
            });
          }
        }
      }
    }
  };
  window.addEventListener("message", handler, true);
  return () => {
    window.removeEventListener("message", handler, true);
  };
}
var DragonExtension = defineExtension2({
  build: (editor, config, state) => namedSignals2(config),
  config: safeCast2({
    disabled: typeof window === "undefined"
  }),
  name: "@lexical/dragon",
  register: (editor, config, state) => effect(() => state.getOutput().disabled.value ? void 0 : registerDragonSupport(editor))
});

// node_modules/@lexical/dragon/LexicalDragon.mjs
var mod7 = true ? LexicalDragon_dev_exports : LexicalDragon_prod_exports;
var DragonExtension2 = mod7.DragonExtension;
var registerDragonSupport2 = mod7.registerDragonSupport;

// node_modules/@lexical/plain-text/LexicalPlainText.dev.mjs
var CAN_USE_DOM4 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var documentMode3 = CAN_USE_DOM4 && "documentMode" in document ? document.documentMode : null;
var IS_APPLE4 = CAN_USE_DOM4 && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
var CAN_USE_BEFORE_INPUT4 = CAN_USE_DOM4 && "InputEvent" in window && !documentMode3 ? "getTargetRanges" in new window.InputEvent("input") : false;
var IS_SAFARI4 = CAN_USE_DOM4 && /Version\/[\d.]+.*Safari/.test(navigator.userAgent);
var IS_IOS4 = CAN_USE_DOM4 && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var IS_CHROME4 = CAN_USE_DOM4 && /^(?=.*Chrome).*/i.test(navigator.userAgent);
var IS_APPLE_WEBKIT4 = CAN_USE_DOM4 && /AppleWebKit\/[\d.]+/.test(navigator.userAgent) && IS_APPLE4 && !IS_CHROME4;
function onCopyForPlainText(event, editor) {
  editor.update(() => {
    if (event !== null) {
      const clipboardData = objectKlassEquals2(event, KeyboardEvent) ? null : event.clipboardData;
      const selection = $getSelection2();
      if (selection !== null && !selection.isCollapsed() && clipboardData != null) {
        event.preventDefault();
        const htmlString = $getHtmlContent2(editor);
        if (htmlString !== null) {
          clipboardData.setData("text/html", htmlString);
        }
        clipboardData.setData("text/plain", selection.getTextContent());
      }
    }
  });
}
function onPasteForPlainText(event, editor) {
  event.preventDefault();
  editor.update(() => {
    const selection = $getSelection2();
    const clipboardData = objectKlassEquals2(event, ClipboardEvent) ? event.clipboardData : null;
    if (clipboardData != null && $isRangeSelection2(selection)) {
      $insertDataTransferForPlainText2(clipboardData, selection);
    }
  }, {
    tag: PASTE_TAG2
  });
}
function onCutForPlainText(event, editor) {
  onCopyForPlainText(event, editor);
  editor.update(() => {
    const selection = $getSelection2();
    if ($isRangeSelection2(selection)) {
      selection.removeText();
    }
  });
}
function registerPlainText(editor) {
  const removeListener = mergeRegister3(editor.registerCommand(DELETE_CHARACTER_COMMAND2, (isBackward) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    selection.deleteCharacter(isBackward);
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(DELETE_WORD_COMMAND2, (isBackward) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    selection.deleteWord(isBackward);
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(DELETE_LINE_COMMAND2, (isBackward) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    selection.deleteLine(isBackward);
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(CONTROLLED_TEXT_INSERTION_COMMAND2, (eventOrText) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    if (typeof eventOrText === "string") {
      selection.insertText(eventOrText);
    } else {
      const dataTransfer = eventOrText.dataTransfer;
      if (dataTransfer != null) {
        $insertDataTransferForPlainText2(dataTransfer, selection);
      } else {
        const data = eventOrText.data;
        if (data) {
          selection.insertText(data);
        }
      }
    }
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(REMOVE_TEXT_COMMAND2, () => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    selection.removeText();
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(INSERT_LINE_BREAK_COMMAND2, (selectStart) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    selection.insertLineBreak(selectStart);
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(INSERT_PARAGRAPH_COMMAND2, () => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    selection.insertLineBreak();
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(KEY_ARROW_LEFT_COMMAND2, (payload) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    const event = payload;
    const isHoldingShift = event.shiftKey;
    if ($shouldOverrideDefaultCharacterSelection2(selection, true)) {
      event.preventDefault();
      $moveCharacter2(selection, isHoldingShift, true);
      return true;
    }
    return false;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(KEY_ARROW_RIGHT_COMMAND2, (payload) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    const event = payload;
    const isHoldingShift = event.shiftKey;
    if ($shouldOverrideDefaultCharacterSelection2(selection, false)) {
      event.preventDefault();
      $moveCharacter2(selection, isHoldingShift, false);
      return true;
    }
    return false;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(KEY_BACKSPACE_COMMAND2, (event) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    if (IS_IOS4 && navigator.language === "ko-KR") {
      return false;
    }
    event.preventDefault();
    return editor.dispatchCommand(DELETE_CHARACTER_COMMAND2, true);
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(KEY_DELETE_COMMAND2, (event) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    event.preventDefault();
    return editor.dispatchCommand(DELETE_CHARACTER_COMMAND2, false);
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(KEY_ENTER_COMMAND2, (event) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    if (event !== null) {
      if ((IS_IOS4 || IS_SAFARI4 || IS_APPLE_WEBKIT4) && CAN_USE_BEFORE_INPUT4) {
        return false;
      }
      event.preventDefault();
    }
    return editor.dispatchCommand(INSERT_LINE_BREAK_COMMAND2, false);
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(SELECT_ALL_COMMAND2, () => {
    $selectAll2();
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(COPY_COMMAND2, (event) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    onCopyForPlainText(event, editor);
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(CUT_COMMAND2, (event) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    onCutForPlainText(event, editor);
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(PASTE_COMMAND2, (event) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    onPasteForPlainText(event, editor);
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(DROP_COMMAND2, (event) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    event.preventDefault();
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(DRAGSTART_COMMAND2, (event) => {
    const selection = $getSelection2();
    if (!$isRangeSelection2(selection)) {
      return false;
    }
    event.preventDefault();
    return true;
  }, COMMAND_PRIORITY_EDITOR2));
  return removeListener;
}
var PlainTextExtension = defineExtension2({
  conflictsWith: ["@lexical/rich-text"],
  dependencies: [DragonExtension2],
  name: "@lexical/plain-text",
  register: registerPlainText
});

// node_modules/@lexical/plain-text/LexicalPlainText.mjs
var mod8 = true ? LexicalPlainText_dev_exports : LexicalPlainText_prod_exports;
var PlainTextExtension2 = mod8.PlainTextExtension;
var registerPlainText2 = mod8.registerPlainText;

// node_modules/@lexical/history/LexicalHistory.dev.mjs
var LexicalHistory_dev_exports = {};
__export(LexicalHistory_dev_exports, {
  HistoryExtension: () => HistoryExtension,
  SharedHistoryExtension: () => SharedHistoryExtension,
  createEmptyHistoryState: () => createEmptyHistoryState,
  registerHistory: () => registerHistory
});
var HISTORY_MERGE = 0;
var HISTORY_PUSH = 1;
var DISCARD_HISTORY_CANDIDATE = 2;
var OTHER = 0;
var COMPOSING_CHARACTER = 1;
var INSERT_CHARACTER_AFTER_SELECTION = 2;
var DELETE_CHARACTER_BEFORE_SELECTION = 3;
var DELETE_CHARACTER_AFTER_SELECTION = 4;
function getDirtyNodes(editorState, dirtyLeaves, dirtyElements) {
  const nodeMap = editorState._nodeMap;
  const nodes = [];
  for (const dirtyLeafKey of dirtyLeaves) {
    const dirtyLeaf = nodeMap.get(dirtyLeafKey);
    if (dirtyLeaf !== void 0) {
      nodes.push(dirtyLeaf);
    }
  }
  for (const [dirtyElementKey, intentionallyMarkedAsDirty] of dirtyElements) {
    if (!intentionallyMarkedAsDirty) {
      continue;
    }
    const dirtyElement = nodeMap.get(dirtyElementKey);
    if (dirtyElement !== void 0 && !$isRootNode2(dirtyElement)) {
      nodes.push(dirtyElement);
    }
  }
  return nodes;
}
function getChangeType(prevEditorState, nextEditorState, dirtyLeavesSet, dirtyElementsSet, isComposing) {
  if (prevEditorState === null || dirtyLeavesSet.size === 0 && dirtyElementsSet.size === 0 && !isComposing) {
    return OTHER;
  }
  const nextSelection = nextEditorState._selection;
  const prevSelection = prevEditorState._selection;
  if (isComposing) {
    return COMPOSING_CHARACTER;
  }
  if (!$isRangeSelection2(nextSelection) || !$isRangeSelection2(prevSelection) || !prevSelection.isCollapsed() || !nextSelection.isCollapsed()) {
    return OTHER;
  }
  const dirtyNodes = getDirtyNodes(nextEditorState, dirtyLeavesSet, dirtyElementsSet);
  if (dirtyNodes.length === 0) {
    return OTHER;
  }
  if (dirtyNodes.length > 1) {
    const nextNodeMap = nextEditorState._nodeMap;
    const nextAnchorNode = nextNodeMap.get(nextSelection.anchor.key);
    const prevAnchorNode = nextNodeMap.get(prevSelection.anchor.key);
    if (nextAnchorNode && prevAnchorNode && !prevEditorState._nodeMap.has(nextAnchorNode.__key) && $isTextNode2(nextAnchorNode) && nextAnchorNode.__text.length === 1 && nextSelection.anchor.offset === 1) {
      return INSERT_CHARACTER_AFTER_SELECTION;
    }
    return OTHER;
  }
  const nextDirtyNode = dirtyNodes[0];
  const prevDirtyNode = prevEditorState._nodeMap.get(nextDirtyNode.__key);
  if (!$isTextNode2(prevDirtyNode) || !$isTextNode2(nextDirtyNode) || prevDirtyNode.__mode !== nextDirtyNode.__mode) {
    return OTHER;
  }
  const prevText = prevDirtyNode.__text;
  const nextText = nextDirtyNode.__text;
  if (prevText === nextText) {
    return OTHER;
  }
  const nextAnchor = nextSelection.anchor;
  const prevAnchor = prevSelection.anchor;
  if (nextAnchor.key !== prevAnchor.key || nextAnchor.type !== "text") {
    return OTHER;
  }
  const nextAnchorOffset = nextAnchor.offset;
  const prevAnchorOffset = prevAnchor.offset;
  const textDiff = nextText.length - prevText.length;
  if (textDiff === 1 && prevAnchorOffset === nextAnchorOffset - 1) {
    return INSERT_CHARACTER_AFTER_SELECTION;
  }
  if (textDiff === -1 && prevAnchorOffset === nextAnchorOffset + 1) {
    return DELETE_CHARACTER_BEFORE_SELECTION;
  }
  if (textDiff === -1 && prevAnchorOffset === nextAnchorOffset) {
    return DELETE_CHARACTER_AFTER_SELECTION;
  }
  return OTHER;
}
function isTextNodeUnchanged(key, prevEditorState, nextEditorState) {
  const prevNode = prevEditorState._nodeMap.get(key);
  const nextNode = nextEditorState._nodeMap.get(key);
  const prevSelection = prevEditorState._selection;
  const nextSelection = nextEditorState._selection;
  const isDeletingLine = $isRangeSelection2(prevSelection) && $isRangeSelection2(nextSelection) && prevSelection.anchor.type === "element" && prevSelection.focus.type === "element" && nextSelection.anchor.type === "text" && nextSelection.focus.type === "text";
  if (!isDeletingLine && $isTextNode2(prevNode) && $isTextNode2(nextNode) && prevNode.__parent === nextNode.__parent) {
    return JSON.stringify(prevEditorState.read(() => prevNode.exportJSON())) === JSON.stringify(nextEditorState.read(() => nextNode.exportJSON()));
  }
  return false;
}
function createMergeActionGetter(editor, delayOrStore) {
  let prevChangeTime = Date.now();
  let prevChangeType = OTHER;
  let compositionStartTime = Date.now();
  let compositionStartChangeType = OTHER;
  let compositionStartState = null;
  return (prevEditorState, nextEditorState, currentHistoryEntry, dirtyLeaves, dirtyElements, tags) => {
    const changeTime = Date.now();
    if (tags.has(COMPOSITION_START_TAG2)) {
      compositionStartTime = prevChangeTime;
      compositionStartChangeType = prevChangeType;
      compositionStartState = prevEditorState;
    }
    if (tags.has(HISTORIC_TAG2)) {
      prevChangeType = OTHER;
      prevChangeTime = changeTime;
      return DISCARD_HISTORY_CANDIDATE;
    }
    const isCompositionEnd = tags.has(COMPOSITION_END_TAG2);
    if (isCompositionEnd && compositionStartState) {
      prevChangeTime = compositionStartTime;
      prevChangeType = compositionStartChangeType;
      prevEditorState = compositionStartState;
    }
    const changeType = getChangeType(prevEditorState, nextEditorState, dirtyLeaves, dirtyElements, editor.isComposing());
    const mergeAction = (() => {
      const isSameEditor = currentHistoryEntry === null || currentHistoryEntry.editor === editor;
      const shouldPushHistory = tags.has(HISTORY_PUSH_TAG2);
      const shouldMergeHistory = !shouldPushHistory && isSameEditor && tags.has(HISTORY_MERGE_TAG2);
      if (shouldMergeHistory) {
        return HISTORY_MERGE;
      }
      if (changeType === COMPOSING_CHARACTER) {
        return DISCARD_HISTORY_CANDIDATE;
      }
      if (prevEditorState === null) {
        return HISTORY_PUSH;
      }
      const selection = nextEditorState._selection;
      const hasDirtyNodes = dirtyLeaves.size > 0 || dirtyElements.size > 0;
      if (!hasDirtyNodes) {
        if (selection !== null) {
          return HISTORY_MERGE;
        }
        return DISCARD_HISTORY_CANDIDATE;
      }
      const delay = typeof delayOrStore === "number" ? delayOrStore : delayOrStore.peek();
      if (shouldPushHistory === false && changeType !== OTHER && changeType === prevChangeType && changeTime < prevChangeTime + delay && isSameEditor) {
        return HISTORY_MERGE;
      }
      if (dirtyLeaves.size === 1) {
        const dirtyLeafKey = Array.from(dirtyLeaves)[0];
        if (isTextNodeUnchanged(dirtyLeafKey, prevEditorState, nextEditorState)) {
          return HISTORY_MERGE;
        }
      }
      return HISTORY_PUSH;
    })();
    prevChangeTime = changeTime;
    prevChangeType = changeType;
    return mergeAction;
  };
}
function redo(editor, historyState) {
  const redoStack = historyState.redoStack;
  const undoStack = historyState.undoStack;
  if (redoStack.length !== 0) {
    const current = historyState.current;
    if (current !== null) {
      undoStack.push(current);
      editor.dispatchCommand(CAN_UNDO_COMMAND2, true);
    }
    const historyStateEntry = redoStack.pop();
    if (redoStack.length === 0) {
      editor.dispatchCommand(CAN_REDO_COMMAND2, false);
    }
    historyState.current = historyStateEntry || null;
    if (historyStateEntry) {
      historyStateEntry.editor.setEditorState(historyStateEntry.editorState, {
        tag: HISTORIC_TAG2
      });
    }
  }
}
function undo(editor, historyState) {
  const redoStack = historyState.redoStack;
  const undoStack = historyState.undoStack;
  const undoStackLength = undoStack.length;
  if (undoStackLength !== 0) {
    const current = historyState.current;
    const historyStateEntry = undoStack.pop();
    if (current !== null) {
      redoStack.push(current);
      editor.dispatchCommand(CAN_REDO_COMMAND2, true);
    }
    if (undoStack.length === 0) {
      editor.dispatchCommand(CAN_UNDO_COMMAND2, false);
    }
    historyState.current = historyStateEntry || null;
    if (historyStateEntry) {
      historyStateEntry.editor.setEditorState(historyStateEntry.editorState, {
        tag: HISTORIC_TAG2
      });
    }
  }
}
function clearHistory(historyState) {
  historyState.undoStack = [];
  historyState.redoStack = [];
  historyState.current = null;
}
function registerHistory(editor, historyState, delay) {
  const getMergeAction = createMergeActionGetter(editor, delay);
  const applyChange = ({
    editorState,
    prevEditorState,
    dirtyLeaves,
    dirtyElements,
    tags
  }) => {
    const current = historyState.current;
    const redoStack = historyState.redoStack;
    const undoStack = historyState.undoStack;
    const currentEditorState = current === null ? null : current.editorState;
    if (current !== null && editorState === currentEditorState) {
      return;
    }
    const mergeAction = getMergeAction(prevEditorState, editorState, current, dirtyLeaves, dirtyElements, tags);
    if (mergeAction === HISTORY_PUSH) {
      if (redoStack.length !== 0) {
        historyState.redoStack = [];
        editor.dispatchCommand(CAN_REDO_COMMAND2, false);
      }
      if (current !== null) {
        undoStack.push({
          ...current
        });
        editor.dispatchCommand(CAN_UNDO_COMMAND2, true);
      }
    } else if (mergeAction === DISCARD_HISTORY_CANDIDATE) {
      return;
    }
    historyState.current = {
      editor,
      editorState
    };
  };
  const unregister = mergeRegister3(editor.registerCommand(UNDO_COMMAND2, () => {
    undo(editor, historyState);
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(REDO_COMMAND2, () => {
    redo(editor, historyState);
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(CLEAR_EDITOR_COMMAND2, () => {
    clearHistory(historyState);
    return false;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerCommand(CLEAR_HISTORY_COMMAND2, () => {
    clearHistory(historyState);
    editor.dispatchCommand(CAN_REDO_COMMAND2, false);
    editor.dispatchCommand(CAN_UNDO_COMMAND2, false);
    return true;
  }, COMMAND_PRIORITY_EDITOR2), editor.registerUpdateListener(applyChange));
  return unregister;
}
function createEmptyHistoryState() {
  return {
    current: null,
    redoStack: [],
    undoStack: []
  };
}
var HistoryExtension = defineExtension2({
  build: (editor, {
    delay,
    createInitialHistoryState,
    disabled
  }) => namedSignals2({
    delay,
    disabled,
    historyState: createInitialHistoryState(editor)
  }),
  config: safeCast2({
    createInitialHistoryState: createEmptyHistoryState,
    delay: 300,
    disabled: typeof window === "undefined"
  }),
  name: "@lexical/history/History",
  register: (editor, config, state) => {
    const stores = state.getOutput();
    return effect(() => stores.disabled.value ? void 0 : registerHistory(editor, stores.historyState.value, stores.delay));
  }
});
function getHistoryPeer(editor) {
  return editor ? getPeerDependencyFromEditor2(editor, HistoryExtension.name) : null;
}
var SharedHistoryExtension = defineExtension2({
  dependencies: [configExtension2(HistoryExtension, {
    createInitialHistoryState: () => {
      throw new Error("SharedHistory did not inherit parent history");
    },
    disabled: true
  })],
  name: "@lexical/history/SharedHistory",
  register(editor, _config, state) {
    const {
      output
    } = state.getDependency(HistoryExtension);
    const parentPeer = getHistoryPeer(editor._parentEditor);
    if (!parentPeer) {
      return () => {
      };
    }
    const parentOutput = parentPeer.output;
    return effect(() => batch(() => {
      output.delay.value = parentOutput.delay.value;
      output.historyState.value = parentOutput.historyState.value;
      output.disabled.value = parentOutput.disabled.value;
    }));
  }
});

// node_modules/@lexical/history/LexicalHistory.mjs
var mod9 = true ? LexicalHistory_dev_exports : LexicalHistory_prod_exports;
var HistoryExtension2 = mod9.HistoryExtension;
var SharedHistoryExtension2 = mod9.SharedHistoryExtension;
var createEmptyHistoryState2 = mod9.createEmptyHistoryState;
var registerHistory2 = mod9.registerHistory;
export {
  $addUpdateTag2 as $addUpdateTag,
  $applyNodeReplacement2 as $applyNodeReplacement,
  $caretFromPoint2 as $caretFromPoint,
  $caretRangeFromSelection2 as $caretRangeFromSelection,
  $cloneWithProperties2 as $cloneWithProperties,
  $cloneWithPropertiesEphemeral2 as $cloneWithPropertiesEphemeral,
  $comparePointCaretNext2 as $comparePointCaretNext,
  $copyNode2 as $copyNode,
  $create2 as $create,
  $createLineBreakNode2 as $createLineBreakNode,
  $createNodeSelection2 as $createNodeSelection,
  $createParagraphNode2 as $createParagraphNode,
  $createPoint2 as $createPoint,
  $createRangeSelection2 as $createRangeSelection,
  $createRangeSelectionFromDom2 as $createRangeSelectionFromDom,
  $createTabNode2 as $createTabNode,
  $createTextNode2 as $createTextNode,
  $descendantsMatching2 as $descendantsMatching,
  $dfs2 as $dfs,
  $dfsIterator2 as $dfsIterator,
  $extendCaretToRange2 as $extendCaretToRange,
  $filter2 as $filter,
  $findMatchingParent2 as $findMatchingParent,
  $firstToLastIterator2 as $firstToLastIterator,
  $getAdjacentCaret2 as $getAdjacentCaret,
  $getAdjacentChildCaret2 as $getAdjacentChildCaret,
  $getAdjacentNode2 as $getAdjacentNode,
  $getAdjacentSiblingOrParentSiblingCaret2 as $getAdjacentSiblingOrParentSiblingCaret,
  $getCaretInDirection2 as $getCaretInDirection,
  $getCaretRange2 as $getCaretRange,
  $getCaretRangeInDirection2 as $getCaretRangeInDirection,
  $getCharacterOffsets2 as $getCharacterOffsets,
  $getChildCaret2 as $getChildCaret,
  $getChildCaretAtIndex2 as $getChildCaretAtIndex,
  $getChildCaretOrSelf2 as $getChildCaretOrSelf,
  $getCollapsedCaretRange2 as $getCollapsedCaretRange,
  $getCommonAncestor2 as $getCommonAncestor,
  $getCommonAncestorResultBranchOrder2 as $getCommonAncestorResultBranchOrder,
  $getDepth2 as $getDepth,
  $getEditor2 as $getEditor,
  $getHtmlContent2 as $getHtmlContent,
  $getNearestBlockElementAncestorOrThrow2 as $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeFromDOMNode2 as $getNearestNodeFromDOMNode,
  $getNearestNodeOfType2 as $getNearestNodeOfType,
  $getNearestRootOrShadowRoot2 as $getNearestRootOrShadowRoot,
  $getNextRightPreorderNode2 as $getNextRightPreorderNode,
  $getNextSiblingOrParentSibling2 as $getNextSiblingOrParentSibling,
  $getNodeByKey2 as $getNodeByKey,
  $getNodeByKeyOrThrow2 as $getNodeByKeyOrThrow,
  $getNodeFromDOMNode2 as $getNodeFromDOMNode,
  $getPreviousSelection2 as $getPreviousSelection,
  $getRoot2 as $getRoot,
  $getSelection2 as $getSelection,
  $getSiblingCaret2 as $getSiblingCaret,
  $getState2 as $getState,
  $getStateChange2 as $getStateChange,
  $getTextContent2 as $getTextContent,
  $getTextNodeOffset2 as $getTextNodeOffset,
  $getTextPointCaret2 as $getTextPointCaret,
  $getTextPointCaretSlice2 as $getTextPointCaretSlice,
  $getWritableNodeState2 as $getWritableNodeState,
  $handleIndentAndOutdent2 as $handleIndentAndOutdent,
  $hasAncestor2 as $hasAncestor,
  $hasUpdateTag2 as $hasUpdateTag,
  $insertDataTransferForPlainText2 as $insertDataTransferForPlainText,
  $insertDataTransferForRichText2 as $insertDataTransferForRichText,
  $insertFirst2 as $insertFirst,
  $insertNodeToNearestRoot2 as $insertNodeToNearestRoot,
  $insertNodeToNearestRootAtCaret2 as $insertNodeToNearestRootAtCaret,
  $insertNodes2 as $insertNodes,
  $isBlockElementNode2 as $isBlockElementNode,
  $isChildCaret2 as $isChildCaret,
  $isDecoratorNode2 as $isDecoratorNode,
  $isEditorIsNestedEditor2 as $isEditorIsNestedEditor,
  $isEditorState2 as $isEditorState,
  $isElementNode2 as $isElementNode,
  $isExtendableTextPointCaret2 as $isExtendableTextPointCaret,
  $isInlineElementOrDecoratorNode2 as $isInlineElementOrDecoratorNode,
  $isLeafNode2 as $isLeafNode,
  $isLineBreakNode2 as $isLineBreakNode,
  $isNodeCaret2 as $isNodeCaret,
  $isNodeSelection2 as $isNodeSelection,
  $isParagraphNode2 as $isParagraphNode,
  $isRangeSelection2 as $isRangeSelection,
  $isRootNode2 as $isRootNode,
  $isRootOrShadowRoot2 as $isRootOrShadowRoot,
  $isSiblingCaret2 as $isSiblingCaret,
  $isTabNode2 as $isTabNode,
  $isTextNode2 as $isTextNode,
  $isTextPointCaret2 as $isTextPointCaret,
  $isTextPointCaretSlice2 as $isTextPointCaretSlice,
  $isTokenOrSegmented2 as $isTokenOrSegmented,
  $isTokenOrTab2 as $isTokenOrTab,
  $lastToFirstIterator2 as $lastToFirstIterator,
  $nodesOfType2 as $nodesOfType,
  $normalizeCaret2 as $normalizeCaret,
  $normalizeSelection__EXPERIMENTAL,
  $onUpdate2 as $onUpdate,
  $parseSerializedNode2 as $parseSerializedNode,
  $removeTextFromCaretRange2 as $removeTextFromCaretRange,
  $restoreEditorState2 as $restoreEditorState,
  $reverseDfs2 as $reverseDfs,
  $reverseDfsIterator2 as $reverseDfsIterator,
  $rewindSiblingCaret2 as $rewindSiblingCaret,
  $selectAll2 as $selectAll,
  $setCompositionKey2 as $setCompositionKey,
  $setPointFromCaret2 as $setPointFromCaret,
  $setSelection2 as $setSelection,
  $setSelectionFromCaretRange2 as $setSelectionFromCaretRange,
  $setState2 as $setState,
  $splitAtPointCaretNext2 as $splitAtPointCaretNext,
  $splitNode2 as $splitNode,
  $unwrapAndFilterDescendants2 as $unwrapAndFilterDescendants,
  $unwrapNode2 as $unwrapNode,
  $updateRangeSelectionFromCaretRange2 as $updateRangeSelectionFromCaretRange,
  $wrapNodeInElement2 as $wrapNodeInElement,
  ArtificialNode__DO_NOT_USE2 as ArtificialNode__DO_NOT_USE,
  BEFORE_INPUT_COMMAND2 as BEFORE_INPUT_COMMAND,
  BLUR_COMMAND2 as BLUR_COMMAND,
  CAN_REDO_COMMAND2 as CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND2 as CAN_UNDO_COMMAND,
  CAN_USE_BEFORE_INPUT3 as CAN_USE_BEFORE_INPUT,
  CAN_USE_DOM3 as CAN_USE_DOM,
  CLEAR_EDITOR_COMMAND2 as CLEAR_EDITOR_COMMAND,
  CLEAR_HISTORY_COMMAND2 as CLEAR_HISTORY_COMMAND,
  CLICK_COMMAND2 as CLICK_COMMAND,
  COLLABORATION_TAG2 as COLLABORATION_TAG,
  COMMAND_PRIORITY_CRITICAL2 as COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_EDITOR2 as COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH2 as COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW2 as COMMAND_PRIORITY_LOW,
  COMMAND_PRIORITY_NORMAL2 as COMMAND_PRIORITY_NORMAL,
  COMPOSITION_END_COMMAND2 as COMPOSITION_END_COMMAND,
  COMPOSITION_END_TAG2 as COMPOSITION_END_TAG,
  COMPOSITION_START_COMMAND2 as COMPOSITION_START_COMMAND,
  COMPOSITION_START_TAG2 as COMPOSITION_START_TAG,
  CONTROLLED_TEXT_INSERTION_COMMAND2 as CONTROLLED_TEXT_INSERTION_COMMAND,
  COPY_COMMAND2 as COPY_COMMAND,
  CUT_COMMAND2 as CUT_COMMAND,
  DELETE_CHARACTER_COMMAND2 as DELETE_CHARACTER_COMMAND,
  DELETE_LINE_COMMAND2 as DELETE_LINE_COMMAND,
  DELETE_WORD_COMMAND2 as DELETE_WORD_COMMAND,
  DRAGEND_COMMAND2 as DRAGEND_COMMAND,
  DRAGOVER_COMMAND2 as DRAGOVER_COMMAND,
  DRAGSTART_COMMAND2 as DRAGSTART_COMMAND,
  DROP_COMMAND2 as DROP_COMMAND,
  DecoratorNode2 as DecoratorNode,
  ElementNode2 as ElementNode,
  FOCUS_COMMAND2 as FOCUS_COMMAND,
  FORMAT_ELEMENT_COMMAND2 as FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND2 as FORMAT_TEXT_COMMAND,
  HISTORIC_TAG2 as HISTORIC_TAG,
  HISTORY_MERGE_TAG2 as HISTORY_MERGE_TAG,
  HISTORY_PUSH_TAG2 as HISTORY_PUSH_TAG,
  INDENT_CONTENT_COMMAND2 as INDENT_CONTENT_COMMAND,
  INPUT_COMMAND2 as INPUT_COMMAND,
  INSERT_LINE_BREAK_COMMAND2 as INSERT_LINE_BREAK_COMMAND,
  INSERT_PARAGRAPH_COMMAND2 as INSERT_PARAGRAPH_COMMAND,
  INSERT_TAB_COMMAND2 as INSERT_TAB_COMMAND,
  INTERNAL_$isBlock2 as INTERNAL_$isBlock,
  IS_ALL_FORMATTING2 as IS_ALL_FORMATTING,
  IS_ANDROID3 as IS_ANDROID,
  IS_ANDROID_CHROME3 as IS_ANDROID_CHROME,
  IS_APPLE3 as IS_APPLE,
  IS_APPLE_WEBKIT3 as IS_APPLE_WEBKIT,
  IS_BOLD2 as IS_BOLD,
  IS_CHROME3 as IS_CHROME,
  IS_CODE2 as IS_CODE,
  IS_FIREFOX3 as IS_FIREFOX,
  IS_HIGHLIGHT2 as IS_HIGHLIGHT,
  IS_IOS3 as IS_IOS,
  IS_ITALIC2 as IS_ITALIC,
  IS_SAFARI3 as IS_SAFARI,
  IS_STRIKETHROUGH2 as IS_STRIKETHROUGH,
  IS_SUBSCRIPT2 as IS_SUBSCRIPT,
  IS_SUPERSCRIPT2 as IS_SUPERSCRIPT,
  IS_UNDERLINE2 as IS_UNDERLINE,
  KEY_ARROW_DOWN_COMMAND2 as KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND2 as KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND2 as KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND2 as KEY_ARROW_UP_COMMAND,
  KEY_BACKSPACE_COMMAND2 as KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND2 as KEY_DELETE_COMMAND,
  KEY_DOWN_COMMAND2 as KEY_DOWN_COMMAND,
  KEY_ENTER_COMMAND2 as KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND2 as KEY_ESCAPE_COMMAND,
  KEY_MODIFIER_COMMAND2 as KEY_MODIFIER_COMMAND,
  KEY_SPACE_COMMAND2 as KEY_SPACE_COMMAND,
  KEY_TAB_COMMAND2 as KEY_TAB_COMMAND,
  LineBreakNode2 as LineBreakNode,
  MOVE_TO_END2 as MOVE_TO_END,
  MOVE_TO_START2 as MOVE_TO_START,
  NODE_STATE_KEY2 as NODE_STATE_KEY,
  OUTDENT_CONTENT_COMMAND2 as OUTDENT_CONTENT_COMMAND,
  PASTE_COMMAND2 as PASTE_COMMAND,
  PASTE_TAG2 as PASTE_TAG,
  ParagraphNode2 as ParagraphNode,
  REDO_COMMAND2 as REDO_COMMAND,
  REMOVE_TEXT_COMMAND2 as REMOVE_TEXT_COMMAND,
  RootNode2 as RootNode,
  SELECTION_CHANGE_COMMAND2 as SELECTION_CHANGE_COMMAND,
  SELECTION_INSERT_CLIPBOARD_NODES_COMMAND2 as SELECTION_INSERT_CLIPBOARD_NODES_COMMAND,
  SELECT_ALL_COMMAND2 as SELECT_ALL_COMMAND,
  SKIP_COLLAB_TAG2 as SKIP_COLLAB_TAG,
  SKIP_DOM_SELECTION_TAG2 as SKIP_DOM_SELECTION_TAG,
  SKIP_SCROLL_INTO_VIEW_TAG2 as SKIP_SCROLL_INTO_VIEW_TAG,
  SKIP_SELECTION_FOCUS_TAG2 as SKIP_SELECTION_FOCUS_TAG,
  TEXT_TYPE_TO_FORMAT2 as TEXT_TYPE_TO_FORMAT,
  TabNode2 as TabNode,
  TextNode2 as TextNode,
  UNDO_COMMAND2 as UNDO_COMMAND,
  addClassNamesToElement2 as addClassNamesToElement,
  buildImportMap2 as buildImportMap,
  calculateZoomLevel2 as calculateZoomLevel,
  configExtension2 as configExtension,
  createCommand2 as createCommand,
  createEditor2 as createEditor,
  createEmptyHistoryState2 as createEmptyHistoryState,
  createSharedNodeState2 as createSharedNodeState,
  createState2 as createState,
  declarePeerDependency2 as declarePeerDependency,
  defineExtension2 as defineExtension,
  flipDirection2 as flipDirection,
  getDOMOwnerDocument2 as getDOMOwnerDocument,
  getDOMSelection2 as getDOMSelection,
  getDOMSelectionFromTarget2 as getDOMSelectionFromTarget,
  getDOMTextNode2 as getDOMTextNode,
  getEditorPropertyFromDOMNode2 as getEditorPropertyFromDOMNode,
  getNearestEditorFromDOMNode2 as getNearestEditorFromDOMNode,
  getRegisteredNode2 as getRegisteredNode,
  getRegisteredNodeOrThrow2 as getRegisteredNodeOrThrow,
  getStaticNodeConfig2 as getStaticNodeConfig,
  getTextDirection2 as getTextDirection,
  getTransformSetFromKlass2 as getTransformSetFromKlass,
  isBlockDomNode2 as isBlockDomNode,
  isCurrentlyReadOnlyMode2 as isCurrentlyReadOnlyMode,
  isDOMDocumentNode2 as isDOMDocumentNode,
  isDOMNode2 as isDOMNode,
  isDOMTextNode2 as isDOMTextNode,
  isDOMUnmanaged2 as isDOMUnmanaged,
  isDocumentFragment2 as isDocumentFragment,
  isExactShortcutMatch2 as isExactShortcutMatch,
  isHTMLAnchorElement2 as isHTMLAnchorElement,
  isHTMLElement2 as isHTMLElement,
  isInlineDomNode2 as isInlineDomNode,
  isLexicalEditor2 as isLexicalEditor,
  isMimeType2 as isMimeType,
  isModifierMatch2 as isModifierMatch,
  isSelectionCapturedInDecoratorInput2 as isSelectionCapturedInDecoratorInput,
  isSelectionWithinEditor2 as isSelectionWithinEditor,
  makeStateWrapper2 as makeStateWrapper,
  makeStepwiseIterator2 as makeStepwiseIterator,
  markSelection2 as markSelection,
  mediaFileReader2 as mediaFileReader,
  mergeRegister2 as mergeRegister,
  normalizeClassNames2 as normalizeClassNames,
  objectKlassEquals2 as objectKlassEquals,
  positionNodeOnRange,
  registerHistory2 as registerHistory,
  registerNestedElementResolver2 as registerNestedElementResolver,
  registerPlainText2 as registerPlainText,
  removeClassNamesFromElement2 as removeClassNamesFromElement,
  removeFromParent2 as removeFromParent,
  resetRandomKey2 as resetRandomKey,
  safeCast2 as safeCast,
  selectionAlwaysOnDisplay2 as selectionAlwaysOnDisplay,
  setDOMUnmanaged2 as setDOMUnmanaged,
  setLexicalClipboardDataTransfer2 as setLexicalClipboardDataTransfer,
  setNodeIndentFromDOM2 as setNodeIndentFromDOM,
  shallowMergeConfig2 as shallowMergeConfig,
  toggleTextFormatType2 as toggleTextFormatType
};
