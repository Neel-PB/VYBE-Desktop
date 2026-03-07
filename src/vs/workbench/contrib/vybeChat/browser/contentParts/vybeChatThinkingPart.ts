/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { VybeChatContentPart, IVybeChatThinkingContent } from './vybeChatContentPart.js';
import * as dom from '../../../../../base/browser/dom.js';
import { IVybeChatMarkdownRendererService, IVybeChatMarkdownRenderResult, decodeHtmlEntitiesInMarkdown } from '../../common/vybeChatMarkdownRenderer.js';
import { createHeader } from '../vybeChatContentPartComponents.js';
import { COLLAPSIBLE_GAP_PX, THINKING_EXPANDED_MAX_HEIGHT_PX, VERB_OPACITY, COLOR_FOREGROUND } from '../vybeChatContentPartTokens.js';

import './media/vybeChatShared.css';
import './media/vybeChatThinking.css';

const $ = dom.$;

/**
 * Collapsible thinking block.
 *
 * Header:  "Thinking" (shimmer) → "Thought for Xs" (static) + chevron
 * Body:    Scrollable markdown content (max 126px, hidden scrollbar)
 *
 * - Expanded while streaming; auto-collapses when complete.
 * - Chevron visible on hover when collapsed, always visible when expanded.
 * - Toggle on click (disabled while streaming).
 */
export class VybeChatThinkingPart extends VybeChatContentPart {
	private _collapsible: HTMLElement | undefined;
	private _childrenWrapper: HTMLElement | undefined;
	private _markdownRoot: HTMLElement | undefined;
	private _verbEl: HTMLElement | undefined;
	private _durationEl: HTMLElement | undefined;

	private _isExpanded = false;
	private _isStreaming: boolean;
	private _currentText: string;
	private _duration: number;
	private _renderResult: IVybeChatMarkdownRenderResult | undefined;
	private _debounceTimer: ReturnType<typeof setTimeout> | undefined;

	constructor(
		content: IVybeChatThinkingContent,
		private readonly _markdownService: IVybeChatMarkdownRendererService,
	) {
		super('thinking');
		const raw = Array.isArray(content.value) ? content.value.join('\n\n') : content.value;
		this._currentText = decodeHtmlEntitiesInMarkdown(raw ?? '');
		this._duration = content.duration || 0;
		this._isStreaming = content.isStreaming ?? false;
	}

	// allow-any-unicode-next-line
	// ── DOM creation ──────────────────────────────────────────────────────

	protected createDomNode(): HTMLElement {
		const outer = $('div.vybe-chat-thinking-part');

		this._collapsible = $('div.collapsible-clean.collapsible-thought', {
			style: `display: flex; flex-direction: column; gap: ${COLLAPSIBLE_GAP_PX}px; overflow-anchor: none;`,
		});
		if (this._isStreaming) {
			this._collapsible.classList.add('is-expanded');
			this._isExpanded = true;
		}

		const durationText = this._duration > 0 ? `for ${Math.max(1, Math.round(this._duration / 1000))}s` : '';
		const headerResult = createHeader({
			verbText: this._isStreaming ? 'Thinking' : 'Thought',
			targetText: durationText || ' ',
			hasChevron: true,
			isStreaming: this._isStreaming,
		});

		this._verbEl = headerResult.verbElement;
		this._durationEl = headerResult.targetElement;
		if (this._durationEl && !durationText) {
			this._durationEl.style.display = 'none';
		}

		headerResult.headerElement.style.cursor = 'pointer';
		this._register(dom.addDisposableListener(headerResult.headerElement, 'click', () => this._toggle()));
		this._collapsible.appendChild(headerResult.headerElement);

		this._childrenWrapper = $('div.collapsible-clean-children', {
			style: `display: ${this._isStreaming ? 'block' : 'none'};`,
		});

		const scrollContainer = $('div.think-content-scrollable', {
			style: `
				height: auto;
				max-height: ${THINKING_EXPANDED_MAX_HEIGHT_PX}px;
				overflow-y: auto;
				overflow-x: hidden;
				opacity: 0.6;
				font-size: 12px;
				color: ${COLOR_FOREGROUND};
				line-height: 1.4;
				padding: 4px;
				scrollbar-width: none;
			`,
		});

		this._markdownRoot = $('div.vybe-markdown-container-root', { style: 'user-select: text;' });
		this._renderMarkdown();

		scrollContainer.appendChild(this._markdownRoot);
		this._childrenWrapper.appendChild(scrollContainer);
		this._collapsible.appendChild(this._childrenWrapper);
		outer.appendChild(this._collapsible);

		return outer;
	}

	// allow-any-unicode-next-line
	// ── Markdown rendering ────────────────────────────────────────────────

	private _renderMarkdown(): void {
		if (!this._markdownRoot) {
			return;
		}

		if (this._renderResult) {
			this._markdownService.renderIncremental(this._markdownRoot, this._currentText, { isStreaming: this._isStreaming });
		} else {
			this._renderResult = this._markdownService.render(this._currentText, { isStreaming: this._isStreaming });
			this._markdownRoot.appendChild(this._renderResult.element);
			this._register(this._renderResult);
		}

		if (this._isStreaming) {
			const scrollEl = this._markdownRoot.parentElement;
			if (scrollEl && scrollEl.scrollHeight > scrollEl.clientHeight) {
				scrollEl.scrollTop = scrollEl.scrollHeight;
			}
		}
	}

	// allow-any-unicode-next-line
	// ── Expand / collapse ─────────────────────────────────────────────────

	private _toggle(): void {
		if (this._isStreaming) {
			return;
		}
		this._isExpanded = !this._isExpanded;
		this._collapsible?.classList.toggle('is-expanded', this._isExpanded);
		if (this._childrenWrapper) {
			this._childrenWrapper.style.display = this._isExpanded ? 'block' : 'none';
		}
	}

	// allow-any-unicode-next-line
	// ── Streaming update ──────────────────────────────────────────────────

	updateContent(content: IVybeChatThinkingContent): void {
		const raw = Array.isArray(content.value) ? content.value.join('\n\n') : content.value;
		const newText = decodeHtmlEntitiesInMarkdown(raw ?? '');
		const wasStreaming = this._isStreaming;
		this._isStreaming = content.isStreaming ?? false;
		this._duration = content.duration || this._duration;

		const contentChanged = this._currentText !== newText;
		this._currentText = newText;

		if (this._verbEl) {
			this._verbEl.textContent = this._isStreaming ? 'Thinking' : 'Thought';
			this._verbEl.classList.toggle('make-shine', this._isStreaming);
			this._verbEl.style.opacity = String(VERB_OPACITY);
		}

		if (this._durationEl && this._duration > 0) {
			this._durationEl.textContent = `for ${Math.max(1, Math.round(this._duration / 1000))}s`;
			this._durationEl.style.display = '';
		}

		if (contentChanged || this._isStreaming) {
			if (this._debounceTimer !== undefined) {
				clearTimeout(this._debounceTimer);
			}
			this._debounceTimer = setTimeout(() => {
				this._renderMarkdown();
				this._debounceTimer = undefined;
			}, 30);
		}

		if (wasStreaming && !this._isStreaming) {
			this._isExpanded = false;
			this._collapsible?.classList.remove('is-expanded');
			if (this._childrenWrapper) {
				this._childrenWrapper.style.display = 'none';
			}
		}
	}

	// allow-any-unicode-next-line
	// ── Lifecycle ─────────────────────────────────────────────────────────

	override hasSameContent(other: VybeChatContentPart): boolean {
		return other.kind === 'thinking' && (other as VybeChatThinkingPart)._currentText === this._currentText;
	}

	override dispose(): void {
		if (this._debounceTimer !== undefined) {
			clearTimeout(this._debounceTimer);
		}
		super.dispose();
		this._collapsible = undefined;
		this._childrenWrapper = undefined;
		this._markdownRoot = undefined;
		this._verbEl = undefined;
		this._durationEl = undefined;
		this._renderResult = undefined;
	}
}
