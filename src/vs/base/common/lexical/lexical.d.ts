/**
 * Vendored Lexical type declarations.
 * Re-exports types from npm packages (resolved at compile time).
 * DO NOT EDIT - matches the vendored lexical.js bundle.
 */

export * from 'lexical';
export { registerPlainText } from '@lexical/plain-text';
export { registerHistory, createEmptyHistoryState } from '@lexical/history';
export type { HistoryState, HistoryStateEntry } from '@lexical/history';
export { $getHtmlContent, $getClipboardDataFromSelection, $insertDataTransferForPlainText, $insertDataTransferForRichText, setLexicalClipboardDataTransfer } from '@lexical/clipboard';
export type { LexicalClipboardData } from '@lexical/clipboard';
export { mergeRegister } from '@lexical/utils';
