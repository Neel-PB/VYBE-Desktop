/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * VYBE Chat Tool Part — Unified tool content part.
 *
 * Every tool invocation in the AI response renders through this single class.
 * Three verb states drive the entire UX:
 *
 *  loading    → shimmer on verb ("Reading", "Grepping"), no chevron
 *  completed  → static verb ("Read", "Grepped"), chevron on hover, expandable
 *  attempted  → static verb + " attempted" suffix, chevron visible, expandable with error
 *
 * Tools fall into two structural categories:
 *
 *  Header-only  → no expanded area, no chevron  (e.g. successful read)
 *  Expandable   → header + collapsible children  (grep, list, search, web, fetch, etc.)
 *
 * Attempted state always forces the expandable layout so the error message is visible.
 */

import { VybeChatContentPart, IVybeChatToolContent, IToolResultItem } from './vybeChatContentPart.js';
import * as dom from '../../../../../base/browser/dom.js';
import { DomScrollableElement } from '../../../../../base/browser/ui/scrollbar/scrollableElement.js';
import {
	createHeader,
	createAttemptedExpansion,
	createListItem,
	createListItemDisabled,
	createScrollableShell,
	createWebCardWrapper,
	type ICreateHeaderResult,
} from '../vybeChatContentPartComponents.js';
import {
	COLLAPSIBLE_GAP_PX,
	CHILDREN_MARGIN_TOP_PX,
	CHILDREN_MARGIN_BOTTOM_PX,
	HEADER_ONLY_TOOLS,
	getToolVerb,
} from '../vybeChatContentPartTokens.js';

import './media/vybeChatShared.css';
import './media/vybeChatToolPart.css';

const $ = dom.$;

/**
 * Normalize read_file error messages to user-friendly text.
 */
function normalizeReadError(msg: string): string {
	const raw = msg.replace(/^Error:\s*/i, '').toLowerCase();
	if (raw.includes('not found') || raw.includes('enoent') || raw.includes('nonexistent') || raw.includes('unable to resolve')) {
		return 'File not found';
	}
	const beyondMatch = msg.match(/(\d+)\s*lines?/i);
	if (beyondMatch) {
		return `Line range beyond file (${beyondMatch[1]} lines)`;
	}
	return 'Could not read file';
}

function normalizeListError(msg: string): string {
	const raw = msg.replace(/^Error:\s*/i, '').toLowerCase();
	if (raw.includes('not found') || raw.includes('enoent') || raw.includes('nonexistent') || raw.includes('does not exist')) {
		return 'Non-existent path';
	}
	return 'Could not list directory';
}

function normalizeGrepError(_msg: string): string {
	return 'Search failed';
}

function normalizeSearchError(_msg: string): string {
	return 'Search failed';
}

function normalizeErrorMessage(toolType: string, msg: string): string {
	switch (toolType) {
		case 'read': return normalizeReadError(msg);
		case 'list': case 'glob_search': return normalizeListError(msg);
		case 'grep': return normalizeGrepError(msg);
		case 'search': case 'search_codebase': return normalizeSearchError(msg);
		default: return msg.replace(/^Error:\s*/i, '').trim() || 'Operation failed';
	}
}

export class VybeChatToolPart extends VybeChatContentPart {
	private _container: HTMLElement | undefined;
	private _collapsible: HTMLElement | undefined;
	private _childrenWrapper: HTMLElement | undefined;
	private _headerResult: ICreateHeaderResult | undefined;
	private _scrollable: DomScrollableElement | undefined;

	private _toolType: string;
	private _state: 'loading' | 'completed' | 'attempted';
	private _target: string;
	private _lineRange: string;
	private _errorMessage: string;
	private _resultItems: IToolResultItem[];
	private _resultCount: number | undefined;
	private _webLinks: Array<{ title: string; url: string }>;
	private _webBody: string;
	private _isExpanded = false;

	private _onItemClick?: (item: IToolResultItem) => void;

	constructor(
		content: IVybeChatToolContent,
		onItemClick?: (item: IToolResultItem) => void,
	) {
		super('tool');
		this._toolType = content.toolType;
		this._state = content.state;
		this._target = content.target ?? '';
		this._lineRange = content.lineRange ?? '';
		this._errorMessage = content.errorMessage ?? '';
		this._resultItems = content.resultItems ?? [];
		this._resultCount = content.resultCount;
		this._webLinks = content.webLinks ?? [];
		this._webBody = content.webBody ?? '';
		this._onItemClick = onItemClick;
	}

	// allow-any-unicode-next-line
	// ── Public accessors (serialization / restore) ──────────────────────

	get toolType(): string { return this._toolType; }
	get state(): 'loading' | 'completed' | 'attempted' { return this._state; }
	get target(): string { return this._target; }
	get resultCount(): number | undefined { return this._resultCount; }

	// allow-any-unicode-next-line
	// ── Derived state ─────────────────────────────────────────────────────

	private get _isHeaderOnly(): boolean {
		return this._state === 'completed' && HEADER_ONLY_TOOLS.has(this._toolType);
	}

	private get _isExpandable(): boolean {
		if (this._state === 'attempted') {
			return true;
		}
		if (this._isHeaderOnly) {
			return false;
		}
		return this._state === 'completed';
	}

	private get _hasChevron(): boolean {
		return this._isExpandable;
	}

	private get _verbText(): string {
		return getToolVerb(this._toolType, this._state);
	}

	private get _targetText(): string {
		if (this._state === 'attempted') {
			return 'attempted';
		}
		return this._target;
	}

	// allow-any-unicode-next-line
	// ── DOM creation ──────────────────────────────────────────────────────

	protected createDomNode(): HTMLElement {
		this._container = $('div.vybe-chat-tool-part');

		this._collapsible = $('div.collapsible-clean', {
			style: `display: flex; flex-direction: column; gap: ${COLLAPSIBLE_GAP_PX}px; overflow-anchor: none;`,
		});

		this._buildHeader();
		this._buildExpansion();

		this._container.appendChild(this._collapsible);
		return this._container;
	}

	private _buildHeader(): void {
		if (!this._collapsible) {
			return;
		}

		this._headerResult = createHeader({
			verbText: this._verbText,
			targetText: this._targetText,
			lineRange: this._state === 'attempted' ? '' : this._lineRange,
			hasChevron: this._hasChevron,
			isStreaming: this._state === 'loading',
			targetClickable: this._state === 'completed' && this._toolType === 'read',
			onTargetClick: () => this._handleTargetClick(),
		});

		if (this._isExpandable) {
			this._headerResult.headerElement.style.cursor = 'pointer';
			this._register(dom.addDisposableListener(this._headerResult.headerElement, 'click', () => this._toggle()));
		}

		this._collapsible.appendChild(this._headerResult.headerElement);
	}

	private _buildExpansion(): void {
		if (!this._collapsible || !this._isExpandable) {
			return;
		}

		this._childrenWrapper = $('div.collapsible-clean-children', {
			style: `overflow-anchor: none; margin-top: ${CHILDREN_MARGIN_TOP_PX}px; margin-bottom: ${CHILDREN_MARGIN_BOTTOM_PX}px; display: ${this._isExpanded ? 'block' : 'none'};`,
		});

		if (this._state === 'attempted') {
			const displayMsg = normalizeErrorMessage(this._toolType, this._errorMessage);
			const expansion = createAttemptedExpansion(displayMsg, true);
			while (expansion.firstChild) {
				this._childrenWrapper.appendChild(expansion.firstChild);
			}
		} else if (this._isWebTool()) {
			this._buildWebExpansion();
		} else if (this._resultItems.length > 0) {
			this._buildListExpansion();
		} else {
			const empty = createListItemDisabled('No results');
			this._childrenWrapper.appendChild(empty);
		}

		this._collapsible.appendChild(this._childrenWrapper);
	}

	private _isWebTool(): boolean {
		return this._toolType === 'search_web' || this._toolType === 'fetch_url';
	}

	private _buildListExpansion(): void {
		if (!this._childrenWrapper) {
			return;
		}

		const listContent = $('div', { role: 'list' });

		for (const item of this._resultItems) {
			const row = createListItem({
				title: item.title,
				subtitle: item.subtitle,
				lineRange: item.lineRange,
				badge: item.badge,
				iconClass: item.iconClass,
				disabled: item.disabled,
				onClick: !item.disabled ? () => this._onItemClick?.(item) : undefined,
			});
			listContent.appendChild(row);
		}

		const shell = createScrollableShell(listContent, { itemCount: this._resultItems.length });
		this._scrollable = shell.scrollable;
		this._register(shell.scrollable);
		this._childrenWrapper.appendChild(shell.container);
	}

	private _buildWebExpansion(): void {
		if (!this._childrenWrapper) {
			return;
		}

		const bodyContent = $('div');
		if (this._webBody) {
			bodyContent.textContent = this._webBody;
		}

		const card = createWebCardWrapper({
			links: this._webLinks,
			bodyContent,
			isExpanded: true,
		});

		this._scrollable = card.scrollable;
		this._register(card.scrollable);
		this._childrenWrapper.appendChild(card.root);
	}

	// allow-any-unicode-next-line
	// ── Toggle ────────────────────────────────────────────────────────────

	private _toggle(): void {
		if (!this._isExpandable) {
			return;
		}
		this._isExpanded = !this._isExpanded;
		this._collapsible?.classList.toggle('is-expanded', this._isExpanded);
		if (this._childrenWrapper) {
			this._childrenWrapper.style.display = this._isExpanded ? 'block' : 'none';
		}
		if (this._scrollable) {
			this._scrollable.scanDomNode();
		}
	}

	// allow-any-unicode-next-line
	// ── Target click (open file) ──────────────────────────────────────────

	private _handleTargetClick(): void {
		// Will be wired to IEditorService in MessagePage / orchestrator
	}

	// allow-any-unicode-next-line
	// ── Streaming update ──────────────────────────────────────────────────

	updateContent(content: IVybeChatToolContent): void {
		const stateChanged = this._state !== content.state;
		const targetChanged = this._target !== (content.target ?? '');

		this._toolType = content.toolType;
		this._state = content.state;
		this._target = content.target ?? '';
		this._lineRange = content.lineRange ?? '';
		this._errorMessage = content.errorMessage ?? '';
		this._resultItems = content.resultItems ?? [];
		this._resultCount = content.resultCount;
		this._webLinks = content.webLinks ?? [];
		this._webBody = content.webBody ?? '';

		if (!stateChanged && !targetChanged) {
			return;
		}

		this._rebuild();
	}

	/**
	 * Full rebuild — tear down collapsible children and header, reconstruct.
	 * This is the simplest approach for state transitions (loading → completed / attempted).
	 */
	private _rebuild(): void {
		if (!this._collapsible) {
			return;
		}

		this._scrollable = undefined;
		this._isExpanded = false;

		while (this._collapsible.firstChild) {
			this._collapsible.removeChild(this._collapsible.firstChild);
		}
		this._collapsible.classList.remove('is-expanded');

		this._buildHeader();
		this._buildExpansion();
	}

	// allow-any-unicode-next-line
	// ── Lifecycle ─────────────────────────────────────────────────────────

	override hasSameContent(other: VybeChatContentPart): boolean {
		if (other.kind !== 'tool') {
			return false;
		}
		const o = other as VybeChatToolPart;
		return o._toolType === this._toolType && o._target === this._target && o._state === this._state;
	}

	override dispose(): void {
		super.dispose();
		this._container = undefined;
		this._collapsible = undefined;
		this._childrenWrapper = undefined;
		this._headerResult = undefined;
		this._scrollable = undefined;
	}
}
