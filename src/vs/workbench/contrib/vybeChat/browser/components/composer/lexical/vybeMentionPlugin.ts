/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {
	type LexicalEditor,
	$getSelection,
	$isRangeSelection,
	$createTextNode,
	$nodesOfType,
	SELECTION_CHANGE_COMMAND,
	COMMAND_PRIORITY_LOW,
	mergeRegister,
} from '../../../../../../../base/common/lexical/lexical.js';
import { $createMentionNode, MentionNode } from './vybeMentionNode.js';
import type { ContextPillType, ContextPillData } from '../vybeChatContextPill.js';
import { showMentionDropdown, type IMentionDropdownController, type MentionDropdownCallbacks } from '../vybeChatMentionDropdown.js';
import { IThemeService } from '../../../../../../../platform/theme/common/themeService.js';
import { IModelService } from '../../../../../../../editor/common/services/model.js';
import { ILanguageService } from '../../../../../../../editor/common/languages/language.js';
import { URI } from '../../../../../../../base/common/uri.js';
import { FileKind } from '../../../../../../../platform/files/common/files.js';
import { getIconClasses } from '../../../../../../../editor/common/services/getIconClasses.js';
import { IDisposable } from '../../../../../../../base/common/lifecycle.js';

const VIEW_TO_PILL: Record<string, ContextPillType> = {
	terminals: 'terminal',
	pastChats: 'pastChat',
	docs: 'doc',
};

export interface MentionPluginConfig {
	themeService: IThemeService;
	modelService: IModelService;
	languageService: ILanguageService;
	getEditorElement: () => HTMLElement | null;
	onOpenDocsSettings?: () => void;
}

/**
 * Registers mention (@) trigger detection, dropdown management, and pill insertion.
 * Returns a dispose function to unregister.
 */
export function registerMentionPlugin(
	editor: LexicalEditor,
	config: MentionPluginConfig,
): IDisposable {
	let mentionDropdown: IMentionDropdownController | null = null;
	let currentAtOffset: number = -1;

	function checkMentionTrigger(): void {
		editor.getEditorState().read(() => {
			const selection = $getSelection();
			if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
				closeMentionDropdown();
				return;
			}

			const anchor = selection.anchor;
			if (anchor.type !== 'text') {
				closeMentionDropdown();
				return;
			}

			const anchorNode = anchor.getNode();
			const text = anchorNode.getTextContent().substring(0, anchor.offset);
			const atIndex = text.lastIndexOf('@');

			if (atIndex < 0) {
				closeMentionDropdown();
				return;
			}

			if (atIndex > 0) {
				const charBefore = text[atIndex - 1];
				if (charBefore !== ' ' && charBefore !== '\n' && charBefore !== '\t') {
					closeMentionDropdown();
					return;
				}
			}

			const query = text.substring(atIndex + 1);
			if (query.includes(' ')) {
				closeMentionDropdown();
				return;
			}

			currentAtOffset = atIndex;

			if (!mentionDropdown) {
				const editorEl = config.getEditorElement();
				if (!editorEl) { return; }
				const win = editorEl.ownerDocument.defaultView;
				if (!win) { return; }

				const domSelection = win.getSelection();
				if (!domSelection || domSelection.rangeCount === 0) { return; }
				const range = domSelection.getRangeAt(0);
				const domNode = range.startContainer;
				if (domNode.nodeType !== Node.TEXT_NODE) { return; }

				const doc = editorEl.ownerDocument;
				const atRange = doc.createRange();
				atRange.setStart(domNode, atIndex);
				atRange.setEnd(domNode, atIndex + 1);
				const rect = atRange.getBoundingClientRect();

				const callbacks: MentionDropdownCallbacks = {
					onSelectFile: (name: string, dir: string, isFolder: boolean) => {
						insertMentionPill(isFolder ? 'folder' : 'file', name, dir);
					},
					onSelectCategory: (id: string) => {
						insertMentionPill(id as ContextPillType, id);
					},
					onSelectItem: (type: string, name: string) => {
						insertMentionPill(VIEW_TO_PILL[type] || 'doc', name);
					},
					onAction: (_actionId: string) => {
						removeAtTriggerText();
						config.onOpenDocsSettings?.();
					},
					onClose: () => {
						mentionDropdown = null;
					},
				};

				mentionDropdown = showMentionDropdown(
					rect, win, true,
					config.themeService,
					config.modelService,
					config.languageService,
					callbacks,
				);
			}

			mentionDropdown!.updateQuery(query);
		});
	}

	function insertMentionPill(type: ContextPillType, name: string, path?: string): void {
		const savedAtOffset = currentAtOffset;
		closeMentionDropdown();

		editor.update(() => {
			const selection = $getSelection();
			if (!$isRangeSelection(selection)) { return; }

			const anchor = selection.anchor;
			if (anchor.type !== 'text') { return; }

			const anchorNode = anchor.getNode();
			const currentText = anchorNode.getTextContent();

			if (savedAtOffset < 0 || savedAtOffset > currentText.length) { return; }

			const before = currentText.substring(0, savedAtOffset);
			const after = currentText.substring(anchor.offset);

			const mentionNode = $createMentionNode(type, name, path);
			const spaceNode = $createTextNode(' ');

			if (before.length > 0) {
				anchorNode.setTextContent(before);
				anchorNode.insertAfter(mentionNode);
				mentionNode.insertAfter(spaceNode);
			} else {
				anchorNode.replace(mentionNode);
				mentionNode.insertAfter(spaceNode);
			}

			if (after.length > 0) {
				const afterNode = $createTextNode(after);
				spaceNode.insertAfter(afterNode);
			}

			spaceNode.select();

			applyFileIconClasses(editor, config.modelService, config.languageService);
		});
	}

	function removeAtTriggerText(): void {
		const savedAtOffset = currentAtOffset;
		closeMentionDropdown();

		editor.update(() => {
			const selection = $getSelection();
			if (!$isRangeSelection(selection)) { return; }
			const anchor = selection.anchor;
			if (anchor.type !== 'text') { return; }
			const anchorNode = anchor.getNode();
			const currentText = anchorNode.getTextContent();
			if (savedAtOffset < 0 || savedAtOffset > currentText.length) { return; }
			const before = currentText.substring(0, savedAtOffset);
			const after = currentText.substring(anchor.offset);
			anchorNode.setTextContent(before + after);
			anchorNode.select(before.length, before.length);
		});
	}

	function closeMentionDropdown(): void {
		if (mentionDropdown) {
			mentionDropdown.dispose();
			mentionDropdown = null;
		}
		currentAtOffset = -1;
	}

	const removeListeners = mergeRegister(
		editor.registerCommand(
			SELECTION_CHANGE_COMMAND,
			() => {
				checkMentionTrigger();
				return false;
			},
			COMMAND_PRIORITY_LOW,
		),
		editor.registerUpdateListener(({ editorState, prevEditorState }) => {
			if (editorState !== prevEditorState) {
				checkMentionTrigger();
			}
		}),
	);

	return {
		dispose: () => {
			closeMentionDropdown();
			removeListeners();
		},
	};
}

/**
 * Apply VS Code file icon classes to all MentionNodes with type 'file'.
 * Called after inserting a file mention so the theme icon renders.
 */
export function applyFileIconClasses(
	editor: LexicalEditor,
	modelService: IModelService,
	languageService: ILanguageService,
): void {
	const rootElement = editor.getRootElement();
	if (!rootElement) { return; }

	editor.getEditorState().read(() => {
		const mentionNodes = $nodesOfType(MentionNode);
		for (const node of mentionNodes) {
			if (node.__mentionType !== 'file') { continue; }
			const dom = editor.getElementByKey(node.getKey());
			if (!dom) { continue; }
			// eslint-disable-next-line no-restricted-syntax
			const iconEl = dom.querySelector('.vybe-pill-icon') as HTMLElement;
			if (!iconEl) { continue; }
			const name = node.__mentionName;
			const path = node.__mentionPath;
			const fileUri = URI.file(path ? `${path}/${name}` : `/placeholder/${name}`);
			const iconClasses = getIconClasses(modelService, languageService, fileUri, FileKind.FILE);
			iconEl.className = 'vybe-pill-icon file-icon ' + iconClasses.join(' ');
		}
	});
}

/**
 * Extract all MentionNode data from the current editor state.
 */
export function $extractMentions(editor: LexicalEditor): ContextPillData[] {
	const mentions: ContextPillData[] = [];
	editor.getEditorState().read(() => {
		const nodes = $nodesOfType(MentionNode);
		for (const node of nodes) {
			mentions.push(node.getMentionData());
		}
	});
	return mentions;
}

/**
 * Check if the editor has any MentionNodes.
 */
export function $hasMentions(editor: LexicalEditor): boolean {
	let has = false;
	editor.getEditorState().read(() => {
		has = $nodesOfType(MentionNode).length > 0;
	});
	return has;
}
