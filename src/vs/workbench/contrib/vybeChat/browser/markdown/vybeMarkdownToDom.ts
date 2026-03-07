/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * VYBE Markdown → DOM Builder
 *
 * Tokenizes markdown with marked Lexer, applies fillInIncompleteTokens for
 * streaming robustness, then builds a Cursor-parity DOM tree of sections.
 *
 * The public API is two functions:
 *   buildVybeMarkdownDom()  — full render, returns a new root element
 *   diffSections()          — incremental update, patches an existing root
 */

import { Lexer, type Token, type Tokens, type TokensList } from '../../../../../base/common/marked/marked.js';
import { fillInIncompleteTokens } from '../../../../../base/browser/markdownRenderer.js';
import { decodeHtmlEntitiesInMarkdown } from '../../common/vybeChatMarkdownRenderer.js';

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

export interface VybeMarkdownToDomOptions {
	sectionIdPrefix?: string;
	codeBlockSlot?: (languageId: string, code: string, raw?: string) => HTMLElement | null;
	isStreaming?: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

function createRoot(): HTMLElement {
	const root = document.createElement('span');
	root.className = 'vybe-markdown-container-root';
	root.style.userSelect = 'text';
	root.style.fontSize = '1em';
	root.style.lineHeight = '1.5';
	root.style.minHeight = '22.2px';
	return root;
}

function createSection(sectionIndex: number, raw: string, sectionIdPrefix?: string): HTMLElement {
	const section = document.createElement('section');
	section.className = 'markdown-section';
	section.setAttribute('data-section-index', String(sectionIndex));
	section.setAttribute('data-markdown-raw', raw ?? '');
	if (sectionIdPrefix !== undefined) {
		section.id = `markdown-section-${sectionIdPrefix}-${sectionIndex}`;
	}
	return section;
}

function isHexColor(text: string): boolean {
	return HEX_COLOR_REGEX.test(text.trim());
}

function isFilePath(text: string): boolean {
	const t = text.trim();
	if (!t || t.length > 2048) {
		return false;
	}
	if (t.startsWith('/') || /^[A-Za-z]:[/\\]/.test(t)) {
		return true;
	}
	if (/[/\\]/.test(t)) {
		return true;
	}
	return /\.(ts|js|tsx|jsx|json|css|html|md|py|rs|go|java|c|cpp|h|m|yml|yaml|sh|bash)$/i.test(t);
}

function isAbsolutePath(p: string): boolean {
	const s = p.trim();
	return s.startsWith('/') || /^[A-Za-z]:[/\\]/.test(s);
}

function pathToFileUrl(p: string): string {
	const s = p.trim().replace(/\\/g, '/');
	if (s.startsWith('/')) {
		return 'file://' + s;
	}
	return 'file:///' + s;
}

function parseHexToRgb(hex: string): { r: number; g: number; b: number } | null {
	const m = hex.trim().match(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/);
	if (!m) {
		return null;
	}
	let s = m[1];
	if (s.length === 3) {
		s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
	}
	const n = parseInt(s, 16);
	return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function isSetextHeading(raw: string): boolean {
	if (/^\s*#+ /.test(raw.trimStart())) {
		return false;
	}
	const lines = raw.trim().split('\n');
	if (lines.length < 2) {
		return false;
	}
	const lastLine = lines[lines.length - 1]?.trim() ?? '';
	return /^=+\s*$/.test(lastLine) || /^-+\s*$/.test(lastLine);
}

// ---------------------------------------------------------------------------
// Inline token rendering
// ---------------------------------------------------------------------------

function appendInlineToken(parent: HTMLElement, token: Token): void {
	switch (token.type) {
		case 'text': {
			const textToken = token as Tokens.Text;
			if (textToken.tokens?.length) {
				for (const t of textToken.tokens) {
					appendInlineToken(parent, t);
				}
			} else {
				const span = document.createElement('span');
				span.textContent = decodeHtmlEntitiesInMarkdown(textToken.text ?? '');
				parent.appendChild(span);
			}
			break;
		}
		case 'strong': {
			const strong = document.createElement('span');
			strong.className = 'markdown-bold-text';
			strong.style.fontWeight = '600';
			const tokens = (token as Tokens.Strong).tokens;
			if (tokens?.length) {
				for (const t of tokens) {
					appendInlineToken(strong, t);
				}
			} else {
				strong.textContent = decodeHtmlEntitiesInMarkdown((token as Tokens.Strong).text ?? '');
			}
			parent.appendChild(strong);
			break;
		}
		case 'em': {
			const em = document.createElement('span');
			em.className = 'markdown-italics-text';
			em.style.fontStyle = 'italic';
			const tokens = (token as Tokens.Em).tokens;
			if (tokens?.length) {
				for (const t of tokens) {
					appendInlineToken(em, t);
				}
			} else {
				em.textContent = decodeHtmlEntitiesInMarkdown((token as Tokens.Em).text ?? '');
			}
			parent.appendChild(em);
			break;
		}
		case 'codespan': {
			const codeToken = token as Tokens.Codespan;
			const text = decodeHtmlEntitiesInMarkdown(codeToken.text ?? '');
			const outer = document.createElement('span');
			outer.className = 'markdown-inline-code';
			outer.style.wordBreak = 'break-all';
			outer.style.fontFamily = 'Menlo, Monaco, "Courier New", monospace';
			outer.style.cursor = 'default';
			outer.style.color = 'inherit';

			if (isHexColor(text)) {
				const colorWrapper = document.createElement('span');
				colorWrapper.className = 'markdown-color-token';
				const rgb = parseHexToRgb(text);
				if (rgb) {
					const swatch = document.createElement('span');
					swatch.className = 'markdown-color-token-swatch';
					swatch.style.background = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
					colorWrapper.appendChild(swatch);
				}
				const textSpan = document.createElement('span');
				textSpan.textContent = text;
				colorWrapper.appendChild(textSpan);
				outer.appendChild(colorWrapper);
			} else if (isFilePath(text)) {
				outer.style.cursor = 'pointer';
				outer.style.color = 'var(--vscode-textLink-foreground)';
				if (isAbsolutePath(text)) {
					outer.classList.add('markdown-link');
					outer.setAttribute('data-link', pathToFileUrl(text));
				}
				const span = document.createElement('span');
				span.textContent = text;
				outer.appendChild(span);
			} else {
				const span = document.createElement('span');
				span.textContent = text;
				outer.appendChild(span);
			}
			parent.appendChild(outer);
			break;
		}
		case 'link': {
			const linkToken = token as Tokens.Link;
			const a = document.createElement('span');
			a.className = 'markdown-link';
			a.setAttribute('data-link', linkToken.href ?? '');
			a.style.display = 'inline';
			a.style.color = 'var(--vscode-textLink-foreground)';
			a.style.cursor = 'pointer';
			if (linkToken.tokens?.length) {
				for (const t of linkToken.tokens) {
					appendInlineToken(a, t);
				}
			} else {
				a.textContent = decodeHtmlEntitiesInMarkdown(linkToken.text ?? '');
			}
			parent.appendChild(a);
			break;
		}
		case 'br': {
			parent.appendChild(document.createElement('br'));
			break;
		}
		case 'escape': {
			const span = document.createElement('span');
			span.textContent = decodeHtmlEntitiesInMarkdown((token as Tokens.Escape).text ?? '');
			parent.appendChild(span);
			break;
		}
		default: {
			const span = document.createElement('span');
			span.textContent = decodeHtmlEntitiesInMarkdown((token as Tokens.Generic).raw ?? '');
			parent.appendChild(span);
			break;
		}
	}
}

function appendInlineTokens(parent: HTMLElement, tokens: Token[] | undefined): void {
	if (!tokens?.length) {
		return;
	}
	for (const token of tokens) {
		appendInlineToken(parent, token);
	}
}

// ---------------------------------------------------------------------------
// List rendering (recursive for nesting)
// ---------------------------------------------------------------------------

function renderList(listToken: Tokens.List): HTMLElement {
	const list = document.createElement(listToken.ordered ? 'ol' : 'ul');
	if (listToken.ordered && listToken.start !== undefined) {
		(list as HTMLOListElement).start = typeof listToken.start === 'number' ? listToken.start : 1;
	}
	for (const item of listToken.items) {
		const li = document.createElement('li');
		const itemTokens = item.tokens ?? [];
		for (const blockToken of itemTokens) {
			if (blockToken.type === 'paragraph') {
				appendInlineTokens(li, (blockToken as Tokens.Paragraph).tokens);
			} else if (blockToken.type === 'list') {
				const nestedList = renderList(blockToken as Tokens.List);
				nestedList.classList.add('nested');
				li.appendChild(nestedList);
			} else {
				appendInlineTokens(li, [blockToken]);
			}
		}
		if (li.childNodes.length === 0 && item.text) {
			const blockTokens = Lexer.lex(item.text);
			const firstParagraph = blockTokens.find((t): t is Tokens.Paragraph => t.type === 'paragraph');
			if (firstParagraph?.tokens?.length) {
				appendInlineTokens(li, firstParagraph.tokens);
			} else {
				li.textContent = decodeHtmlEntitiesInMarkdown(item.text);
			}
		}
		list.appendChild(li);
	}
	return list;
}

// ---------------------------------------------------------------------------
// Table rendering
// ---------------------------------------------------------------------------

function renderTable(tableToken: Tokens.Table): HTMLElement {
	const container = document.createElement('div');
	container.className = 'markdown-table-container';
	const wrapper = document.createElement('div');
	wrapper.className = 'markdown-table-wrapper';
	const table = document.createElement('table');
	table.className = 'markdown-table';

	const thead = document.createElement('thead');
	const headerRow = document.createElement('tr');
	for (const cell of tableToken.header) {
		const th = document.createElement('th');
		appendInlineTokens(th, cell.tokens);
		headerRow.appendChild(th);
	}
	thead.appendChild(headerRow);
	table.appendChild(thead);

	const tbody = document.createElement('tbody');
	for (const row of tableToken.rows) {
		const tr = document.createElement('tr');
		for (const cell of row) {
			const td = document.createElement('td');
			appendInlineTokens(td, cell.tokens);
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);

	wrapper.appendChild(table);
	container.appendChild(wrapper);
	return container;
}

// ---------------------------------------------------------------------------
// Block-level token → section
// ---------------------------------------------------------------------------

function buildSectionsFromTokens(
	tokens: Token[],
	options: VybeMarkdownToDomOptions,
	startIndex: number,
): { sections: HTMLElement[]; nextIndex: number } {
	const { sectionIdPrefix, codeBlockSlot, isStreaming } = options;
	const noFade = isStreaming === true;
	const sections: HTMLElement[] = [];
	let sectionIndex = startIndex;

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		const raw = (token as Tokens.Generic).raw ?? '';

		switch (token.type) {
			case 'space':
				break;

			case 'paragraph': {
				const section = createSection(sectionIndex++, raw, sectionIdPrefix);
				const paraRaw = (token as Tokens.Paragraph).raw ?? raw;
				const atxMatch = noFade && paraRaw.match(/^(#{1,6})\s+([^\n]*)\n?$/);
				if (atxMatch) {
					const depth = Math.min(6, Math.max(1, atxMatch[1].length));
					const h = document.createElement(`h${depth}` as 'h1');
					h.textContent = decodeHtmlEntitiesInMarkdown(atxMatch[2]?.trim() ?? '');
					section.appendChild(h);
				} else {
					appendInlineTokens(section, (token as Tokens.Paragraph).tokens);
				}
				sections.push(section);
				break;
			}

			case 'heading': {
				const headingToken = token as Tokens.Heading;
				if (isSetextHeading(raw)) {
					const lines = raw.trim().split('\n');
					const titleLine = lines[0] ?? '';
					const underlineLine = lines[1] ?? '';
					const isH2 = /^[-]+\s*$/.test(underlineLine.trim());

					const section1 = createSection(sectionIndex++, '\n' + titleLine, sectionIdPrefix);
					appendInlineTokens(section1, headingToken.tokens);
					sections.push(section1);

					const section2 = createSection(sectionIndex++, '\n' + underlineLine, sectionIdPrefix);
					if (isH2) {
						section2.appendChild(document.createElement('hr'));
					} else {
						const span = document.createElement('span');
						span.textContent = decodeHtmlEntitiesInMarkdown(underlineLine);
						section2.appendChild(span);
					}
					sections.push(section2);
				} else {
					const section = createSection(sectionIndex++, raw, sectionIdPrefix);
					const depth = Math.min(6, Math.max(1, headingToken.depth));
					const h = document.createElement(`h${depth}` as 'h1');
					appendInlineTokens(h, headingToken.tokens);
					section.appendChild(h);
					sections.push(section);
				}
				break;
			}

			case 'list': {
				const section = createSection(sectionIndex++, raw, sectionIdPrefix);
				section.appendChild(renderList(token as Tokens.List));
				sections.push(section);
				break;
			}

			case 'hr': {
				const section = createSection(sectionIndex++, raw, sectionIdPrefix);
				section.appendChild(document.createElement('hr'));
				sections.push(section);
				break;
			}

			case 'table': {
				const section = createSection(sectionIndex++, raw, sectionIdPrefix);
				section.appendChild(renderTable(token as Tokens.Table));
				sections.push(section);
				break;
			}

			case 'code': {
				const codeToken = token as Tokens.Code;
				const section = createSection(sectionIndex++, raw, sectionIdPrefix);
				const lang = (codeToken.lang ?? 'plaintext').trim();
				const code = codeToken.text ?? '';

				const slotNode = codeBlockSlot?.(lang, code, raw);
				if (slotNode) {
					section.appendChild(slotNode);
				}
				sections.push(section);
				break;
			}

			case 'blockquote': {
				const section = createSection(sectionIndex++, raw, sectionIdPrefix);
				const bq = document.createElement('blockquote');
				const bqToken = token as Tokens.Blockquote;
				if (bqToken.tokens?.length) {
					appendInlineTokens(bq, bqToken.tokens);
				} else {
					bq.textContent = decodeHtmlEntitiesInMarkdown(bqToken.text ?? raw);
				}
				section.appendChild(bq);
				sections.push(section);
				break;
			}

			case 'html': {
				const section = createSection(sectionIndex++, raw, sectionIdPrefix);
				const span = document.createElement('span');
				span.textContent = decodeHtmlEntitiesInMarkdown((token as Tokens.HTML).text ?? raw);
				section.appendChild(span);
				sections.push(section);
				break;
			}

			default: {
				const section = createSection(sectionIndex++, raw, sectionIdPrefix);
				const span = document.createElement('span');
				span.textContent = decodeHtmlEntitiesInMarkdown((token as Tokens.Generic).raw ?? '');
				section.appendChild(span);
				sections.push(section);
				break;
			}
		}
	}

	return { sections, nextIndex: sectionIndex };
}

// ---------------------------------------------------------------------------
// Tokenize (with streaming fix)
// ---------------------------------------------------------------------------

function tokenize(markdown: string, isStreaming: boolean): Token[] {
	let tokens: TokensList;
	try {
		tokens = Lexer.lex(markdown ?? '');
	} catch {
		return [];
	}
	if (!Array.isArray(tokens)) {
		return [];
	}
	if (isStreaming) {
		return fillInIncompleteTokens(tokens);
	}
	return tokens;
}

// ---------------------------------------------------------------------------
// Public API: Full render
// ---------------------------------------------------------------------------

/**
 * Build a complete DOM tree from a markdown string.
 * Returns { root } where root is a <span.vybe-markdown-container-root> containing <section>s.
 */
export function buildVybeMarkdownDom(
	markdown: string,
	options: VybeMarkdownToDomOptions = {},
): { root: HTMLElement } {
	const root = createRoot();
	const tokens = tokenize(markdown, options.isStreaming === true);
	const { sections } = buildSectionsFromTokens(tokens, options, 0);
	for (const section of sections) {
		root.appendChild(section);
	}
	return { root };
}

// ---------------------------------------------------------------------------
// Public API: Incremental section diff
// ---------------------------------------------------------------------------

/**
 * Patch an existing root element with new markdown content.
 * Compares sections by data-markdown-raw attribute to minimise DOM mutations:
 *   - Matching sections: skip (no change)
 *   - Changed sections: replace children in place
 *   - New sections: append
 *   - Excess old sections: remove
 */
export function diffSections(
	existingRoot: HTMLElement,
	markdown: string,
	options: VybeMarkdownToDomOptions = {},
): void {
	const tokens = tokenize(markdown, options.isStreaming === true);
	const { sections: newSections } = buildSectionsFromTokens(tokens, options, 0);

	const currentSections = Array.from(existingRoot.children) as HTMLElement[];
	const len = Math.min(currentSections.length, newSections.length);

	for (let i = 0; i < len; i++) {
		const curSec = currentSections[i];
		const newSec = newSections[i];
		const curRaw = curSec.getAttribute('data-markdown-raw') ?? '';
		const newRaw = newSec.getAttribute('data-markdown-raw') ?? '';
		if (curRaw !== newRaw) {
			curSec.replaceChildren(...Array.from(newSec.childNodes));
			curSec.setAttribute('data-markdown-raw', newRaw);
			curSec.setAttribute('data-section-index', newSec.getAttribute('data-section-index') ?? String(i));
		}
	}

	for (let i = currentSections.length; i < newSections.length; i++) {
		existingRoot.appendChild(newSections[i]);
	}

	while (existingRoot.children.length > newSections.length) {
		existingRoot.removeChild(existingRoot.lastChild!);
	}
}
