/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * VYBE Chat Content Parts — Base class and type definitions
 *
 * Each content part renders one piece of an AI response (markdown, thinking,
 * code block, tool output, etc.) and manages its own lifecycle.
 * Parts are composed by MessagePage into a full response.
 */

import { Disposable } from '../../../../../base/common/lifecycle.js';

// ---------------------------------------------------------------------------
// Content part kinds (all phases declared; implementations added per-phase)
// ---------------------------------------------------------------------------

export type VybeChatContentPartKind =
	| 'markdown'
	| 'thinking'
	| 'progress'
	| 'error'
	| 'codeBlock'
	| 'mermaidDiagram'
	| 'textEdit'
	| 'textEditV2'
	| 'diff'
	| 'terminal'
	| 'webFetch'
	| 'reference'
	| 'command'
	| 'readingFiles'
	| 'searched'
	| 'grepped'
	| 'listed'
	| 'directory'
	| 'explored'
	| 'planDocument'
	| 'todo'
	| 'todoItem'
	| 'phaseIndicator'
	| 'loadingDiagram'
	| 'tool'
	| 'questionnaireAnswers'
	| 'questionnaireAsking';

// ---------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------

export interface IVybeChatContentPart extends Disposable {
	readonly domNode: HTMLElement;
	readonly kind: VybeChatContentPartKind;
	hasSameContent(other: IVybeChatContentPart): boolean;
	updateContent?(data: unknown): void;
	onStreamingUpdate?: () => void;
}

// ---------------------------------------------------------------------------
// Content data types (Phase 1 — more added per-phase)
// ---------------------------------------------------------------------------

export interface IVybeChatMarkdownContent {
	kind: 'markdown';
	id?: string;
	content: string;
	isStreaming?: boolean;
}

export interface IVybeChatThinkingContent {
	kind: 'thinking';
	id?: string;
	value: string | string[];
	duration?: number;
	isStreaming?: boolean;
	title?: string;
}

export interface IVybeChatCodeBlockContent {
	kind: 'codeBlock';
	code: string;
	language: string;
	isStreaming?: boolean;
	filename?: string;
	filePath?: string;
	lineRange?: { start: number; end: number };
}

export interface IVybeChatProgressContent {
	kind: 'progress';
	message: string;
}

export interface IVybeChatErrorContent {
	kind: 'error';
	message: string;
	level: 'info' | 'warning' | 'error';
}

export interface IVybeChatReferenceContent {
	kind: 'reference';
	filePath: string;
	lineRange: { start: number; end: number };
	code: string;
	language?: string;
	isStreaming?: boolean;
}

/**
 * Generic tool content — covers read, grep, list, search, search_web,
 * fetch_url, read_lints, edit, and any future tool.
 */
export interface IVybeChatToolContent {
	kind: 'tool';
	toolType: string;
	/** 'loading' = shimmer verb, 'completed' = static verb, 'attempted' = failed */
	state: 'loading' | 'completed' | 'attempted';
	/** Primary display text (filename, pattern, query, URL, etc.) */
	target?: string;
	/** Line range for read tools ("L200-L300") */
	lineRange?: string;
	/** Error or "no results" message shown when expanded in attempted/empty state */
	errorMessage?: string;
	/** List of result items for expanded area (grep matches, list entries, search results, etc.) */
	resultItems?: IToolResultItem[];
	/** Match/result count badge */
	resultCount?: number;
	/** Web search specific fields */
	webLinks?: Array<{ title: string; url: string }>;
	webBody?: string;
	/** Duration in ms (thinking uses this) */
	duration?: number;
}

export interface IToolResultItem {
	title: string;
	subtitle?: string;
	lineRange?: string;
	badge?: string;
	iconClass?: string;
	disabled?: boolean;
	filePath?: string;
}

/** Union of all content data types. Grows as phases are implemented. */
export type IVybeChatContentData =
	| IVybeChatMarkdownContent
	| IVybeChatThinkingContent
	| IVybeChatCodeBlockContent
	| IVybeChatProgressContent
	| IVybeChatErrorContent
	| IVybeChatReferenceContent
	| IVybeChatToolContent;

// ---------------------------------------------------------------------------
// Base class
// ---------------------------------------------------------------------------

export abstract class VybeChatContentPart extends Disposable implements IVybeChatContentPart {
	private _domNode: HTMLElement | undefined;

	constructor(
		public readonly kind: VybeChatContentPartKind,
	) {
		super();
	}

	get domNode(): HTMLElement {
		if (!this._domNode) {
			this._domNode = this.createDomNode();
		}
		return this._domNode;
	}

	protected abstract createDomNode(): HTMLElement;

	hasSameContent(other: IVybeChatContentPart): boolean {
		return this.kind === other.kind;
	}

	override dispose(): void {
		super.dispose();
		this._domNode?.remove();
		this._domNode = undefined;
	}
}
