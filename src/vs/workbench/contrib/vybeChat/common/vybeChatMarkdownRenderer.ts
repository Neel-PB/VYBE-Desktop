/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * VYBE Chat Markdown Renderer Service — Interface & Helpers
 *
 * Renders markdown to Cursor-parity DOM for chat and other streaming markdown UIs.
 * Uses marked Lexer for tokenization and VS Code's fillInIncompleteTokens for streaming.
 */

import { IDisposable } from '../../../../base/common/lifecycle.js';
import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';

// ---------------------------------------------------------------------------
// Service interface
// ---------------------------------------------------------------------------

export interface IVybeChatMarkdownRenderOptions {
	/** When true, applies fillInIncompleteTokens and incremental section diffing. */
	readonly isStreaming?: boolean;
	/**
	 * Callback to produce DOM for a fenced code block.
	 * Renderer calls this with (languageId, code, raw); the returned node replaces
	 * the default <pre><code> fallback.  Return null to use the fallback.
	 */
	readonly codeBlockSlot?: (languageId: string, code: string, raw?: string) => HTMLElement | null;
}

export interface IVybeChatMarkdownRenderResult extends IDisposable {
	readonly element: HTMLElement;
}

export const IVybeChatMarkdownRendererService = createDecorator<IVybeChatMarkdownRendererService>('vybeChatMarkdownRendererService');

export interface IVybeChatMarkdownRendererService {
	readonly _serviceBrand: undefined;

	/**
	 * Full render: produces a new root element from scratch.
	 * Caller appends result.element and must dispose when done.
	 */
	render(markdown: string, options?: IVybeChatMarkdownRenderOptions): IVybeChatMarkdownRenderResult;

	/**
	 * Incremental render: diffs against an existing root and applies
	 * minimal DOM mutations (section add/update/remove).
	 * Returns the same root element, mutated in place.
	 */
	renderIncremental(existingRoot: HTMLElement, markdown: string, options?: IVybeChatMarkdownRenderOptions): void;
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/**
 * Decode HTML entities that AI backends often emit (&amp;quot; &amp;apos; &#39; etc.)
 * so markdown parses correctly (** and ` render as bold and code).
 */
export function decodeHtmlEntitiesInMarkdown(s: string): string {
	if (!s || typeof s !== 'string') {
		return s;
	}
	let out = s;
	while (out.includes('&amp;')) {
		out = out.replace(/&amp;/g, '&');
	}
	out = out.replace(/&lt;/g, '<');
	out = out.replace(/&gt;/g, '>');
	const apostrophe = String.fromCharCode(39);
	out = out.replace(/&quot;/g, '"');
	out = out.replace(/&apos;/g, apostrophe);
	out = out.replace(/&#39;/g, apostrophe);
	out = out.replace(/&#x27;/g, apostrophe);
	out = out.replace(/&39;/g, apostrophe);
	out = out.replace(/&#39(?!;|\d)/g, apostrophe);
	out = out.replace(/&#x27(?!;|[0-9a-fA-F])/g, apostrophe);
	out = out.replace(/&#\s*39\s*;/g, apostrophe);
	out = out.replace(/&#x\s*27\s*;/gi, apostrophe);
	out = out.replace(/&#96;/g, '`');
	out = out.replace(/&#42;/g, '*');
	out = out.replace(/&#(\d+);/g, (_, d) => String.fromCharCode(parseInt(d, 10)));
	out = out.replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
	return out;
}

/**
 * Convert literal &lt;pre&gt; blocks (from stored/restored content) to markdown fenced code
 * so the renderer produces proper code blocks instead of raw HTML spans.
 */
export function normalizePreTagsToMarkdownCode(content: string): string {
	if (!content || typeof content !== 'string') {
		return content;
	}
	return content.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_match, inner) => {
		const text = inner.replace(/<code[^>]*>|<\/code>/gi, '').replace(/^[\r\n]+|[\r\n]+$/g, '').trim();
		return '```\n' + text + '\n```';
	});
}
