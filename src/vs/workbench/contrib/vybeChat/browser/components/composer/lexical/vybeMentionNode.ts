/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {
	DecoratorNode,
	type EditorConfig,
	type LexicalEditor,
	type LexicalNode,
	type NodeKey,
	type SerializedLexicalNode,
	type Spread,
	$applyNodeReplacement,
} from '../../../../../../../base/common/lexical/lexical.js';

import type { ContextPillType } from '../vybeChatContextPill.js';

export type SerializedMentionNode = Spread<{
	mentionType: ContextPillType;
	mentionName: string;
	mentionPath: string | undefined;
	mentionKey: string;
}, SerializedLexicalNode>;

const PILL_BG = 'color-mix(in srgb, var(--vscode-charts-blue) 20%, transparent)';

const CODICON_MAP: Partial<Record<ContextPillType, string>> = {
	folder: 'codicon-folder',
	terminal: 'codicon-terminal',
	doc: 'codicon-book',
	pastChat: 'codicon-comment',
	url: 'codicon-globe',
};

export class MentionNode extends DecoratorNode<null> {

	__mentionType: ContextPillType;
	__mentionName: string;
	__mentionPath: string | undefined;
	__mentionKey: string;

	static override getType(): string {
		return 'mention';
	}

	static override clone(node: MentionNode): MentionNode {
		return new MentionNode(
			node.__mentionType,
			node.__mentionName,
			node.__mentionPath,
			node.__mentionKey,
			node.__key,
		);
	}

	constructor(
		mentionType: ContextPillType,
		mentionName: string,
		mentionPath: string | undefined,
		mentionKey: string,
		key?: NodeKey,
	) {
		super(key);
		this.__mentionType = mentionType;
		this.__mentionName = mentionName;
		this.__mentionPath = mentionPath;
		this.__mentionKey = mentionKey;
	}

	override createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
		const doc = document;
		const mention = doc.createElement('span');
		mention.className = this.__mentionType === 'file' ? 'mention mention-clickable' : 'mention';
		mention.setAttribute('contenteditable', 'false');
		mention.setAttribute('data-mention-name', this.__mentionName);
		mention.setAttribute('data-mention-key', this.__mentionKey);
		mention.setAttribute('data-typeahead-type', this.__mentionType);
		mention.setAttribute('data-lexical-text', 'true');
		if (this.__mentionPath) {
			mention.setAttribute('data-mention-path', this.__mentionPath);
		}
		mention.style.backgroundColor = PILL_BG;
		if (this.__mentionType === 'file') {
			mention.style.cursor = 'pointer';
		}

		if (this.__mentionType === 'file') {
			this._buildFilePillContent(doc, mention);
		} else {
			this._buildCodiconPillContent(doc, mention);
		}

		return mention;
	}

	override updateDOM(): false {
		return false;
	}

	override decorate(): null {
		return null;
	}

	override isInline(): boolean {
		return true;
	}

	override isIsolated(): boolean {
		return true;
	}

	override isKeyboardSelectable(): boolean {
		return true;
	}

	override getTextContent(): string {
		return '';
	}

	getMentionData(): { type: ContextPillType; name: string; path?: string; key: string } {
		return {
			type: this.__mentionType,
			name: this.__mentionName,
			path: this.__mentionPath,
			key: this.__mentionKey,
		};
	}

	override exportJSON(): SerializedMentionNode {
		return {
			type: 'mention',
			version: 1,
			mentionType: this.__mentionType,
			mentionName: this.__mentionName,
			mentionPath: this.__mentionPath,
			mentionKey: this.__mentionKey,
		};
	}

	static override importJSON(serialized: SerializedMentionNode): MentionNode {
		return $createMentionNode(
			serialized.mentionType,
			serialized.mentionName,
			serialized.mentionPath,
			serialized.mentionKey,
		);
	}

	// --- Pill DOM builders -----------------------------------------

	private _buildFilePillContent(doc: Document, mention: HTMLElement): void {
		const showFileIcons = doc.createElement('span');
		showFileIcons.className = 'show-file-icons';
		mention.appendChild(showFileIcons);

		const fileWrapper = doc.createElement('span');
		fileWrapper.className = 'mention-file-wrapper';
		showFileIcons.appendChild(fileWrapper);

		const iconContainer = doc.createElement('span');
		iconContainer.className = 'mention-file-icon-container';
		fileWrapper.appendChild(iconContainer);

		// File icon classes are applied externally via applyFileIconClasses()
		const iconEl = doc.createElement('span');
		iconEl.className = 'vybe-pill-icon file-icon';
		iconContainer.appendChild(iconEl);

		const nameSpan = doc.createElement('span');
		nameSpan.textContent = this.__mentionName;
		fileWrapper.appendChild(nameSpan);

		const closeIcon = doc.createElement('i');
		closeIcon.className = 'codicon codicon-close';
		closeIcon.setAttribute('data-mention-remove', 'true');
		fileWrapper.appendChild(closeIcon);
	}

	private _buildCodiconPillContent(doc: Document, mention: HTMLElement): void {
		const wrapper = doc.createElement('span');
		wrapper.className = 'mention-codicon-wrapper';
		mention.appendChild(wrapper);

		const iconClass = CODICON_MAP[this.__mentionType] || 'codicon-file';
		const icon = doc.createElement('i');
		icon.className = `codicon ${iconClass}`;
		wrapper.appendChild(icon);

		const nameSpan = doc.createElement('span');
		nameSpan.textContent = this.__mentionName;
		wrapper.appendChild(nameSpan);

		const closeIcon = doc.createElement('i');
		closeIcon.className = 'codicon codicon-close';
		closeIcon.setAttribute('data-mention-remove', 'true');
		wrapper.appendChild(closeIcon);
	}
}

export function $createMentionNode(
	type: ContextPillType,
	name: string,
	path?: string,
	key?: string,
): MentionNode {
	const mentionKey = key || `pill-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
	const node = new MentionNode(type, name, path, mentionKey);
	return $applyNodeReplacement(node);
}

export function $isMentionNode(node: LexicalNode | null | undefined): node is MentionNode {
	return node instanceof MentionNode;
}
