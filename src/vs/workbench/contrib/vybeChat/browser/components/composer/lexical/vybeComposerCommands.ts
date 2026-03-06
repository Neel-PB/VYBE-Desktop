/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {
	type LexicalEditor,
	KEY_ENTER_COMMAND,
	KEY_BACKSPACE_COMMAND,
	INSERT_LINE_BREAK_COMMAND,
	COPY_COMMAND,
	CUT_COMMAND,
	PASTE_COMMAND,
	COMMAND_PRIORITY_HIGH,
	$getSelection,
	$isRangeSelection,
	$isTextNode,
	$createTextNode,
	mergeRegister,
	$getClipboardDataFromSelection,
	$insertDataTransferForRichText,
	setLexicalClipboardDataTransfer,
} from '../../../../../../../base/common/lexical/lexical.js';
import { $createMentionNode, $isMentionNode } from './vybeMentionNode.js';
import { applyFileIconClasses } from './vybeMentionPlugin.js';
import type { VybeChatImageAttachments } from '../vybeChatImageAttachments.js';
import { IModelService } from '../../../../../../../editor/common/services/model.js';
import { ILanguageService } from '../../../../../../../editor/common/languages/language.js';
import { IDisposable } from '../../../../../../../base/common/lifecycle.js';

const URL_PATTERN = /^https?:\/\/\S+$/;

export interface ComposerCommandsConfig {
	onSubmit: () => void;
	imageAttachments: VybeChatImageAttachments;
	modelService: IModelService;
	languageService: ILanguageService;
}

/**
 * Registers keyboard commands and paste handling for the composer.
 * - Enter -> submit (unless Shift/Meta/Ctrl/Alt held)
 * - Shift+Enter -> new paragraph
 * - Backspace -> deletes trailing space + pill in one keystroke
 * - Copy/Cut -> serializes pills to clipboard (application/x-lexical-editor)
 * - Paste -> restores pills from clipboard, images to attachments, URLs to pills
 */
export function registerComposerCommands(
	editor: LexicalEditor,
	config: ComposerCommandsConfig,
): IDisposable {
	const removeListeners = mergeRegister(
		editor.registerCommand(
			KEY_ENTER_COMMAND,
			(event: KeyboardEvent | null) => {
				if (!event) { return false; }
				if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
					return false;
				}
				event.preventDefault();
				config.onSubmit();
				return true;
			},
			COMMAND_PRIORITY_HIGH,
		),

		// Shift+Enter: create new <p> instead of <br>
		editor.registerCommand(
			INSERT_LINE_BREAK_COMMAND,
			() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					selection.insertParagraph();
				}
				return true;
			},
			COMMAND_PRIORITY_HIGH,
		),

		// Backspace: delete trailing space + mention pill together
		editor.registerCommand(
			KEY_BACKSPACE_COMMAND,
			(event: KeyboardEvent | null) => {
				const selection = $getSelection();
				if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
					return false;
				}

				const anchor = selection.anchor;
				const node = anchor.getNode();

				if ($isTextNode(node)) {
					const offset = anchor.offset;
					const text = node.getTextContent();

					if (offset === 1 && text[0] === ' ') {
						const prev = node.getPreviousSibling();
						if (prev && $isMentionNode(prev)) {
							event?.preventDefault();
							node.spliceText(0, 1, '');
							prev.remove();
							return true;
						}
					}

					if (offset === 0) {
						const prev = node.getPreviousSibling();
						if (prev && $isMentionNode(prev)) {
							event?.preventDefault();
							prev.remove();
							return true;
						}
					}
				}

				return false;
			},
			COMMAND_PRIORITY_HIGH,
		),

		// Copy: serialize pills + text to clipboard as Lexical JSON + HTML
		editor.registerCommand(
			COPY_COMMAND,
			(event: ClipboardEvent) => {
				const selection = $getSelection();
				if (!selection) { return false; }
				const clipboardData = event.clipboardData;
				if (!clipboardData) { return false; }
				event.preventDefault();
				setLexicalClipboardDataTransfer(clipboardData, $getClipboardDataFromSelection(selection));
				return true;
			},
			COMMAND_PRIORITY_HIGH,
		),

		// Cut: copy then delete selection
		editor.registerCommand(
			CUT_COMMAND,
			(event: ClipboardEvent) => {
				const selection = $getSelection();
				if (!selection) { return false; }
				const clipboardData = event.clipboardData;
				if (!clipboardData) { return false; }
				event.preventDefault();
				setLexicalClipboardDataTransfer(clipboardData, $getClipboardDataFromSelection(selection));
				editor.update(() => {
					const sel = $getSelection();
					if ($isRangeSelection(sel)) {
						sel.removeText();
					}
				});
				return true;
			},
			COMMAND_PRIORITY_HIGH,
		),

		// Paste: restore pills from Lexical JSON, handle images and URLs
		editor.registerCommand(
			PASTE_COMMAND,
			(event: ClipboardEvent) => {
				const clipboardData = event.clipboardData;
				if (!clipboardData) { return false; }

				const items = clipboardData.items;
				let hasImage = false;
				for (let i = 0; i < items.length; i++) {
					if (items[i].type.startsWith('image/')) {
						const file = items[i].getAsFile();
						if (file) {
							config.imageAttachments.addImage(file);
							hasImage = true;
						}
					}
				}
				if (hasImage) {
					event.preventDefault();
					return true;
				}

				// Check for Lexical-serialized data (preserves pills)
				const lexicalData = clipboardData.getData('application/x-lexical-editor');
				if (lexicalData) {
					event.preventDefault();
					editor.update(() => {
						const selection = $getSelection();
						if ($isRangeSelection(selection)) {
							$insertDataTransferForRichText(clipboardData, selection, editor);
						}
					});
					setTimeout(() => applyFileIconClasses(editor, config.modelService, config.languageService), 0);
					return true;
				}

				const plainText = clipboardData.getData('text/plain') || '';
				const trimmed = plainText.trim();

				if (URL_PATTERN.test(trimmed)) {
					event.preventDefault();
					editor.update(() => {
						const selection = $getSelection();
						if ($isRangeSelection(selection)) {
							const mentionNode = $createMentionNode('url', trimmed, trimmed);
							const spaceNode = $createTextNode(' ');
							selection.insertNodes([mentionNode, spaceNode]);
							spaceNode.select();
						}
					});
					setTimeout(() => applyFileIconClasses(editor, config.modelService, config.languageService), 0);
					return true;
				}

				return false;
			},
			COMMAND_PRIORITY_HIGH,
		),
	);

	return { dispose: removeListeners };
}
