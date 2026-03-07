/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * VYBE Chat Content Part — Reusable DOM Components
 *
 * Shared UI building blocks for tool, thinking, phase indicator, and other
 * content parts.  All sizing and colors come from design tokens.
 */

import * as dom from '../../../../base/browser/dom.js';
import { DomScrollableElement } from '../../../../base/browser/ui/scrollbar/scrollableElement.js';
import { ScrollbarVisibility } from '../../../../base/common/scrollable.js';
import {
	ATTEMPTED_MESSAGE_FONT_SIZE_PX,
	ATTEMPTED_MESSAGE_OPACITY,
	COLOR_FOREGROUND,
	COLOR_DESCRIPTION,
	COLOR_LINK,
	COLOR_EDITOR_FG,
	COLOR_EDITOR_BG,
	COLOR_BADGE_BG,
	COLOR_BADGE_FG,
	CHILDREN_MARGIN_TOP_PX,
	CHILDREN_MARGIN_BOTTOM_PX,
	CHILDREN_PADDING_LEFT_PX,
	CHEVRON_SIZE_PX,
	CHEVRON_LINE_HEIGHT_PX,
	CHEVRON_FONT_SIZE_PX,
	CHEVRON_CONTAINER_SIZE_PX,
	CHEVRON_CONTAINER_MARGIN_LEFT_PX,
	HEADER_FONT_SIZE_PX,
	HEADER_PADDING_V_PX,
	HEADER_ROW_LINE_HEIGHT_PX,
	HEADER_TARGET_MARGIN_LEFT_PX,
	HEADER_TRANSITION_OPACITY,
	VERB_OPACITY,
	TARGET_OPACITY,
	LINE_RANGE_OPACITY,
	LINE_RANGE_MARGIN_LEFT_PX,
	LIST_ITEM_TITLE_FONT_SIZE_PX,
	LIST_ITEM_SUBTITLE_FONT_SIZE_PX,
	LIST_ITEM_TITLE_MAX_WIDTH_PCT,
	LIST_ITEM_CONTENT_GAP_PX,
	LIST_ITEM_BORDER_RADIUS_PX,
	LIST_SUBTITLE_OPACITY,
	LIST_ITEM_DISABLED_OPACITY,
	CONTEXT_LIST_ITEM_PADDING_TOP_PX,
	CONTEXT_LIST_ITEM_PADDING_RIGHT_PX,
	CONTEXT_LIST_ITEM_PADDING_BOTTOM_PX,
	CONTEXT_LIST_ITEM_PADDING_LEFT_PX,
	BADGE_PADDING_V_PX,
	BADGE_PADDING_H_PX,
	BADGE_MARGIN_RIGHT_PX,
	BADGE_BORDER_RADIUS_PX,
	BADGE_FONT_SIZE_PX,
	BADGE_SUBTLE_OPACITY,
	BADGE_SMALL_FONT_SIZE_PX,
	BADGE_SMALL_PADDING_V_PX,
	BADGE_SMALL_PADDING_H_PX,
	LIST_ITEM_ROW_HEIGHT_PX,
	LIST_MAX_VISIBLE_ITEMS,
	EXPANDED_MAX_HEIGHT_PX,
	EXPANDED_LABEL_FONT_SIZE_PX,
	WEB_CARD_PADDING_H_PX,
	WEB_CARD_GAP_PX,
	WEB_CARD_BORDER_RADIUS_PX,
	WEB_QUERY_LABEL_MARGIN_BOTTOM_PX,
	WEB_BODY_OPACITY,
	WEB_LINKS_LIST_INDENT_PX,
	WEB_LINKS_LABEL_MARGIN_BOTTOM_PX,
	SCROLL_VERTICAL_SCROLLBAR_SIZE_PX,
	SCROLL_HORIZONTAL_SCROLLBAR_SIZE_PX,
	FILE_HEADER_HEIGHT_PX,
	FILE_HEADER_PADDING_H_PX,
	FILE_HEADER_GAP_PX,
	FILE_HEADER_ICON_SIZE_PX,
	FILE_HEADER_ICON_WRAPPER_HEIGHT_PX,
	FILE_HEADER_FILENAME_FONT_SIZE_PX,
	FILE_HEADER_FILENAME_LINE_HEIGHT_PX,
	FILE_HEADER_LINE_RANGE_FONT_SIZE_PX,
	FILE_HEADER_LINE_RANGE_LINE_HEIGHT_PX,
	FILE_HEADER_LINE_RANGE_MARGIN_LEFT_PX,
	FILE_HEADER_LINE_RANGE_OPACITY,
} from './vybeChatContentPartTokens.js';

const $ = dom.$;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeAttemptedMessage(message: string): string {
	return message.replace(/^Error:\s*/i, '').trim();
}

// ---------------------------------------------------------------------------
// Attempted expansion (single-line error / no-results message)
// ---------------------------------------------------------------------------

export function createAttemptedExpansion(message: string, isExpanded: boolean): HTMLElement {
	const displayMessage = normalizeAttemptedMessage(message);
	const wrapper = $('div', {
		class: 'collapsible-clean-children',
		style: `overflow-anchor: none; margin-top: ${CHILDREN_MARGIN_TOP_PX}px; margin-bottom: ${CHILDREN_MARGIN_BOTTOM_PX}px; display: ${isExpanded ? 'block' : 'none'};`,
	});
	const messageDiv = $('div', {
		style: `padding-left: ${CHILDREN_PADDING_LEFT_PX}px; font-size: ${ATTEMPTED_MESSAGE_FONT_SIZE_PX}px; color: ${COLOR_FOREGROUND}; opacity: ${ATTEMPTED_MESSAGE_OPACITY}; white-space: pre-wrap; word-break: break-word;`,
	});
	messageDiv.textContent = displayMessage;
	wrapper.appendChild(messageDiv);
	return wrapper;
}

// ---------------------------------------------------------------------------
// Chevron
// ---------------------------------------------------------------------------

export function createChevron(): HTMLElement {
	const container = $('div.chevron-container', {
		style: `
			width: ${CHEVRON_CONTAINER_SIZE_PX}px;
			height: ${CHEVRON_CONTAINER_SIZE_PX}px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			margin-left: ${CHEVRON_CONTAINER_MARGIN_LEFT_PX}px;
			cursor: pointer;
		`,
	});
	const icon = $('div', {
		class: 'codicon codicon-chevron-right chevron-right',
		style: `
			color: ${COLOR_DESCRIPTION};
			line-height: ${CHEVRON_LINE_HEIGHT_PX}px;
			height: ${CHEVRON_SIZE_PX}px;
			width: ${CHEVRON_SIZE_PX}px;
			display: flex;
			justify-content: center;
			align-items: center;
			transform-origin: center center;
			font-size: ${CHEVRON_FONT_SIZE_PX}px;
		`,
	});
	container.appendChild(icon);
	return container;
}

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------

export function createBadge(text: string, small?: boolean): HTMLElement {
	const el = $('span', {
		class: small ? 'cursor-badge cursor-badge-subtle cursor-badge-small' : 'cursor-badge',
		style: `
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: ${small ? BADGE_SMALL_PADDING_V_PX : BADGE_PADDING_V_PX}px ${small ? BADGE_SMALL_PADDING_H_PX : BADGE_PADDING_H_PX}px;
			margin-right: ${BADGE_MARGIN_RIGHT_PX}px;
			border-radius: ${BADGE_BORDER_RADIUS_PX}px;
			font-size: ${small ? BADGE_SMALL_FONT_SIZE_PX : BADGE_FONT_SIZE_PX}px;
			font-weight: 500;
			line-height: 1.2;
			background-color: ${COLOR_BADGE_BG};
			color: ${COLOR_BADGE_FG};
			opacity: ${small ? BADGE_SUBTLE_OPACITY : 1};
		`,
	});
	el.textContent = text;
	return el;
}

// ---------------------------------------------------------------------------
// List item
// ---------------------------------------------------------------------------

export interface ICreateListItemOptions {
	title: string;
	subtitle?: string;
	lineRange?: string;
	badge?: string;
	iconClass?: string;
	disabled?: boolean;
	onClick?: (e: MouseEvent) => void;
}

export function createListItem(options: ICreateListItemOptions): HTMLElement {
	const { title, subtitle, lineRange, badge, iconClass, disabled, onClick } = options;
	const item = $('div', {
		class: `context-list-item${disabled ? ' context-list-item--disabled' : ''}`,
		role: 'listitem',
		tabindex: disabled ? '-1' : '0',
		style: `
			display: flex;
			align-items: center;
			border-radius: ${LIST_ITEM_BORDER_RADIUS_PX}px;
			padding: ${CONTEXT_LIST_ITEM_PADDING_TOP_PX}px ${CONTEXT_LIST_ITEM_PADDING_RIGHT_PX}px ${CONTEXT_LIST_ITEM_PADDING_BOTTOM_PX}px ${CONTEXT_LIST_ITEM_PADDING_LEFT_PX}px;
			cursor: ${disabled ? 'default' : 'pointer'};
			overflow: hidden;
		`,
	});
	const content = $('div', {
		class: 'context-list-item-content',
		style: `display: flex; align-items: baseline; flex-grow: 1; gap: ${LIST_ITEM_CONTENT_GAP_PX}px; overflow: hidden;`,
	});
	if (iconClass) {
		const isCodicon = iconClass.startsWith('codicon');
		if (isCodicon) {
			const icon = $('span', {
				class: iconClass,
				style: `display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 16px; height: 16px; margin-right: 4px; font-size: 14px; color: ${COLOR_DESCRIPTION};`,
			});
			item.appendChild(icon);
		} else {
			const iconWrap = $('div', {
				class: 'show-file-icons',
				style: `flex-shrink: 0; width: 16px; height: 16px; margin-right: 4px; overflow: hidden;`,
			});
			const icon = $('div', {
				class: `monaco-icon-label ${iconClass}`,
				style: `height: 16px; line-height: 16px; margin-left: -2px;`,
			});
			iconWrap.appendChild(icon);
			item.appendChild(iconWrap);
		}
	}
	const titleEl = $('span', {
		class: 'context-list-item-title',
		style: `font-size: ${LIST_ITEM_TITLE_FONT_SIZE_PX}px; max-width: ${LIST_ITEM_TITLE_MAX_WIDTH_PCT}%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: ${COLOR_FOREGROUND};`,
	});
	titleEl.textContent = title;
	content.appendChild(titleEl);
	if (subtitle) {
		const sub = $('span', {
			class: 'context-list-item-subtitle',
			style: `font-size: ${LIST_ITEM_SUBTITLE_FONT_SIZE_PX}px; display: block; direction: rtl; text-align: right; opacity: ${LIST_SUBTITLE_OPACITY}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: ${COLOR_FOREGROUND};`,
		});
		sub.textContent = subtitle;
		content.appendChild(sub);
	}
	if (lineRange) {
		const lines = $('span', {
			class: 'context-list-item-lines',
			style: `margin-left: ${LINE_RANGE_MARGIN_LEFT_PX}px; color: ${COLOR_FOREGROUND}; opacity: ${LIST_SUBTITLE_OPACITY};`,
		});
		lines.textContent = lineRange;
		content.appendChild(lines);
	}
	item.appendChild(content);
	if (badge !== undefined) {
		item.appendChild(createBadge(badge, true));
	}
	if (onClick && !disabled) {
		dom.addDisposableListener(item, 'click', onClick);
	}
	return item;
}

// ---------------------------------------------------------------------------
// Disabled list item
// ---------------------------------------------------------------------------

export function createListItemDisabled(message: string): HTMLElement {
	const item = $('div', {
		class: 'context-list-item context-list-item--disabled',
		role: 'listitem',
		tabindex: '-1',
		style: `cursor: default; display: flex; align-items: center; opacity: ${LIST_ITEM_DISABLED_OPACITY}; font-style: italic; padding: ${CONTEXT_LIST_ITEM_PADDING_TOP_PX}px ${CONTEXT_LIST_ITEM_PADDING_RIGHT_PX}px ${CONTEXT_LIST_ITEM_PADDING_BOTTOM_PX}px ${CONTEXT_LIST_ITEM_PADDING_LEFT_PX}px;`,
	});
	const title = $('span', {
		class: 'context-list-item-title',
		style: `color: ${COLOR_FOREGROUND};`,
	});
	title.textContent = message;
	item.appendChild(title);
	return item;
}

// ---------------------------------------------------------------------------
// Scrollable shell
// ---------------------------------------------------------------------------

export interface ICreateScrollableShellResult {
	container: HTMLElement;
	scrollable: DomScrollableElement;
}

export function createScrollableShell(content: HTMLElement, options?: { maxHeight?: number; itemCount?: number }): ICreateScrollableShellResult {
	const maxHeight = options?.maxHeight ?? EXPANDED_MAX_HEIGHT_PX;
	const itemCount = options?.itemCount ?? 0;

	const cappedItems = Math.min(itemCount, LIST_MAX_VISIBLE_ITEMS);
	const fittedHeight = itemCount > 0 ? cappedItems * LIST_ITEM_ROW_HEIGHT_PX : maxHeight;
	const effectiveHeight = Math.min(fittedHeight, maxHeight);
	const needsScroll = itemCount > LIST_MAX_VISIBLE_ITEMS;

	const heightContainer = $('div', { style: `height: ${effectiveHeight}px;` });
	const overflowContainer = $('div', { style: `height: ${effectiveHeight}px; overflow: hidden;` });
	const scrollableContainer = $('div', { class: 'scrollable-div-container', style: 'height: 100%;' });
	const scrollable = new DomScrollableElement(scrollableContainer, {
		vertical: needsScroll ? ScrollbarVisibility.Auto : ScrollbarVisibility.Hidden,
		horizontal: ScrollbarVisibility.Hidden,
		verticalScrollbarSize: SCROLL_VERTICAL_SCROLLBAR_SIZE_PX,
		horizontalScrollbarSize: SCROLL_HORIZONTAL_SCROLLBAR_SIZE_PX,
	});
	scrollableContainer.appendChild(content);
	scrollable.getDomNode().style.height = '100%';
	scrollable.getDomNode().style.overflowX = 'hidden';
	scrollable.getDomNode().style.overflowY = 'auto';
	overflowContainer.appendChild(scrollable.getDomNode());
	heightContainer.appendChild(overflowContainer);
	return { container: heightContainer, scrollable };
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

export interface ICreateHeaderOptions {
	verbText: string;
	targetText?: string;
	lineRange?: string;
	hasChevron: boolean;
	isStreaming: boolean;
	targetClickable?: boolean;
	onTargetClick?: () => void;
}

export interface ICreateHeaderResult {
	headerElement: HTMLElement;
	verbElement: HTMLElement;
	targetElement: HTMLElement | undefined;
	lineRangeElement: HTMLElement | undefined;
	chevronElement: HTMLElement | undefined;
}

export function createHeader(options: ICreateHeaderOptions): ICreateHeaderResult {
	const { verbText, targetText, lineRange, hasChevron, isStreaming, targetClickable, onTargetClick } = options;

	const headerElement = $('div', {
		class: 'composer-tool-former-header',
		style: `display: flex; align-items: center; padding: ${HEADER_PADDING_V_PX}px 0; gap: 0; line-height: ${HEADER_ROW_LINE_HEIGHT_PX}px; transition: opacity ${HEADER_TRANSITION_OPACITY};`,
	});

	const verbElement = $('span', {
		class: `edit-header-verb${isStreaming ? ' make-shine' : ''}`,
		style: `font-size: ${HEADER_FONT_SIZE_PX}px; line-height: ${HEADER_ROW_LINE_HEIGHT_PX}px; color: ${COLOR_FOREGROUND}; opacity: ${VERB_OPACITY}; white-space: nowrap; flex-shrink: 0;`,
	});
	verbElement.textContent = verbText;
	headerElement.appendChild(verbElement);

	let targetElement: HTMLElement | undefined;
	if (targetText !== undefined && targetText !== '') {
		targetElement = $('span', {
			class: 'edit-header-target',
			style: `font-size: ${HEADER_FONT_SIZE_PX}px; flex: 0 1 auto; margin-left: ${HEADER_TARGET_MARGIN_LEFT_PX}px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; color: ${COLOR_DESCRIPTION}; opacity: ${TARGET_OPACITY}; line-height: ${HEADER_ROW_LINE_HEIGHT_PX}px;`,
		});
		targetElement.textContent = targetText;
		if (targetClickable && onTargetClick) {
			dom.addDisposableListener(targetElement, 'click', (e) => {
				e.stopPropagation();
				onTargetClick();
			});
		}
		headerElement.appendChild(targetElement);
	}

	let lineRangeElement: HTMLElement | undefined;
	if (lineRange) {
		lineRangeElement = $('span', {
			class: 'edit-header-line-range',
			style: `color: ${COLOR_FOREGROUND}; opacity: ${LINE_RANGE_OPACITY}; margin-left: ${LINE_RANGE_MARGIN_LEFT_PX}px; white-space: nowrap; line-height: ${HEADER_ROW_LINE_HEIGHT_PX}px;`,
		});
		lineRangeElement.textContent = lineRange;
		headerElement.appendChild(lineRangeElement);
	}

	let chevronElement: HTMLElement | undefined;
	if (hasChevron) {
		chevronElement = createChevron();
		headerElement.appendChild(chevronElement);
	}

	return { headerElement, verbElement, targetElement, lineRangeElement, chevronElement };
}

// ---------------------------------------------------------------------------
// Web card wrapper
// ---------------------------------------------------------------------------

export interface ICreateWebCardOptions {
	queryLabel?: string;
	links?: Array<{ title: string; url: string }>;
	bodyContent: HTMLElement;
	maxHeight?: number;
	isExpanded: boolean;
	onLinkClick?: (url: string) => void;
}

export interface ICreateWebCardResult {
	root: HTMLElement;
	scrollable: DomScrollableElement;
}

export function createWebCardWrapper(options: ICreateWebCardOptions): ICreateWebCardResult {
	const { queryLabel, links = [], bodyContent, maxHeight = EXPANDED_MAX_HEIGHT_PX, isExpanded, onLinkClick } = options;

	const wrapper = $('div', {
		class: 'collapsible-clean-children',
		style: `padding-left: 0; overflow-anchor: none; margin-top: ${CHILDREN_MARGIN_TOP_PX}px; margin-bottom: ${CHILDREN_MARGIN_BOTTOM_PX}px; display: ${isExpanded ? 'block' : 'none'};`,
	});
	const column = $('div', {
		style: `display: flex; flex-direction: column; gap: ${WEB_CARD_GAP_PX}px; padding-left: ${WEB_CARD_PADDING_H_PX}px; padding-right: ${WEB_CARD_PADDING_H_PX}px;`,
	});
	const card = $('div', {
		style: `background-color: ${COLOR_EDITOR_BG}; border-radius: ${WEB_CARD_BORDER_RADIUS_PX}px;`,
	});

	if (queryLabel) {
		const label = $('div', {
			style: `font-size: ${EXPANDED_LABEL_FONT_SIZE_PX}px; font-weight: 500; margin-bottom: ${WEB_QUERY_LABEL_MARGIN_BOTTOM_PX}px; user-select: text; color: ${COLOR_EDITOR_FG};`,
		});
		label.textContent = queryLabel;
		card.appendChild(label);
	}

	const bodyWrapper = $('span', {
		style: `font-size: ${EXPANDED_LABEL_FONT_SIZE_PX}px; opacity: ${WEB_BODY_OPACITY}; user-select: text; display: block; color: ${COLOR_FOREGROUND};`,
	});

	const heightContainer = $('div', { style: `height: ${maxHeight}px;` });
	const overflowContainer = $('div', { style: `height: ${maxHeight}px; overflow: hidden;` });
	const scrollableContainer = $('div', { class: 'scrollable-div-container', style: 'height: 100%;' });
	const scrollable = new DomScrollableElement(scrollableContainer, {
		vertical: ScrollbarVisibility.Auto,
		horizontal: ScrollbarVisibility.Hidden,
		verticalScrollbarSize: SCROLL_VERTICAL_SCROLLBAR_SIZE_PX,
		horizontalScrollbarSize: SCROLL_HORIZONTAL_SCROLLBAR_SIZE_PX,
	});

	if (links.length > 0) {
		const section = $('section', { class: 'markdown-section', style: 'margin: 0;' });
		const linksLabel = $('span', { style: `display: block; margin-bottom: ${WEB_LINKS_LABEL_MARGIN_BOTTOM_PX}px;` });
		linksLabel.textContent = 'Links:';
		section.appendChild(linksLabel);
		const ol = $('ol', { style: `margin: 0 0 0 ${WEB_LINKS_LIST_INDENT_PX}px; padding: 0;` });
		for (const link of links) {
			const li = $('li', { style: 'margin-left: 0; padding-top: 2px; padding-bottom: 2px; list-style-type: decimal;' });
			const span = $('span', {
				class: 'markdown-link',
				'data-link': link.url,
				style: `color: ${COLOR_LINK}; cursor: pointer; text-decoration: none;`,
			});
			span.textContent = link.title;
			if (onLinkClick) {
				dom.addDisposableListener(span, 'click', () => onLinkClick(link.url));
			}
			li.appendChild(span);
			ol.appendChild(li);
		}
		section.appendChild(ol);
		scrollableContainer.appendChild(section);
	}

	scrollableContainer.appendChild(bodyContent);
	scrollable.getDomNode().style.height = '100%';
	scrollable.getDomNode().style.overflow = 'auto';
	overflowContainer.appendChild(scrollable.getDomNode());
	heightContainer.appendChild(overflowContainer);
	bodyWrapper.appendChild(heightContainer);
	card.appendChild(bodyWrapper);
	column.appendChild(card);
	wrapper.appendChild(column);

	return { root: wrapper, scrollable };
}

// ---------------------------------------------------------------------------
// File header (code block reference, text edit, terminal)
// ---------------------------------------------------------------------------

export interface ICreateFileHeaderOptions {
	/** File icon CSS classes (from getIconClasses) — or codicon class for non-file content */
	iconClasses: string[];
	/** Display filename */
	filename: string;
	/** Optional line range string, e.g. "L1-L100" or "Lines 1-100" */
	lineRange?: string;
	/** Click on the filename / line range area (e.g. open file in editor) */
	onFilenameClick?: () => void;
	/**
	 * Collapse callback.  When provided the icon area becomes a toggle:
	 * - Shows the file/codicon icon normally
	 * - On header hover, swaps to a chevron-down (expanded) or chevron-right (collapsed)
	 * - Clicking the icon area toggles collapsed state and calls this callback
	 */
	onCollapseToggle?: (collapsed: boolean) => void;
}

export interface ICreateFileHeaderResult {
	headerElement: HTMLElement;
	filenameElement: HTMLElement;
	lineRangeElement: HTMLElement | undefined;
	/**
	 * Programmatically set collapsed state from outside
	 * (e.g. streaming completion auto-collapse).
	 */
	setCollapsed: (collapsed: boolean) => void;
}

/**
 * Reusable file header bar: [icon ↔ chevron] [filename] [line range]
 *
 * The icon area doubles as a collapse toggle:
 *  - Normal state: shows the file type icon (or codicon)
 *  - Header hover: icon swaps to chevron-down (if expanded) or chevron-right (if collapsed)
 *  - Click on icon: toggles body visibility
 *
 * Used by:
 *  - Code block reference / citation
 *  - Text edit content part
 *  - Terminal content part
 *
 * Styled via `.vybe-file-header` in vybeChatShared.css.
 */
export function createFileHeader(options: ICreateFileHeaderOptions): ICreateFileHeaderResult {
	const { iconClasses, filename, lineRange, onFilenameClick, onCollapseToggle } = options;
	let isCollapsed = false;

	const headerElement = $('div.vybe-file-header', {
		style: `
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 ${FILE_HEADER_PADDING_H_PX}px;
			height: ${FILE_HEADER_HEIGHT_PX}px;
			box-sizing: border-box;
			user-select: none;
			gap: ${FILE_HEADER_GAP_PX}px;
		`,
	});

	const fileInfo = $('div.vybe-file-header-info', {
		style: `
			display: flex;
			align-items: center;
			gap: ${FILE_HEADER_GAP_PX}px;
			flex: 1 1 0%;
			min-width: 0;
			overflow: hidden;
			height: ${FILE_HEADER_ICON_SIZE_PX}px;
		`,
	});

	// Icon area — contains file icon AND a hidden chevron; CSS swaps on hover
	const iconArea = $('span.vybe-file-header-icon-area', {
		style: `
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: ${FILE_HEADER_ICON_SIZE_PX}px;
			height: ${FILE_HEADER_ICON_SIZE_PX}px;
			margin-left: -2px;
			position: relative;
			cursor: ${onCollapseToggle ? 'pointer' : 'default'};
		`,
	});

	// File/codicon icon (visible by default, hidden on header hover)
	const iconWrapper = $('div.vybe-file-header-icon.show-file-icons', {
		style: `display: block; height: ${FILE_HEADER_ICON_WRAPPER_HEIGHT_PX}px; width: ${FILE_HEADER_ICON_SIZE_PX}px;`,
	});
	const iconEl = $('div.monaco-icon-label.file-icon');
	iconEl.className = `monaco-icon-label file-icon ${iconClasses.join(' ')}`;
	iconEl.style.height = '100%';
	iconWrapper.appendChild(iconEl);

	// Chevron (hidden by default, shown on header hover)
	const chevronEl = $('div.vybe-file-header-chevron.codicon.codicon-chevron-down', {
		style: `
			position: absolute;
			top: 0; left: 0;
			width: ${FILE_HEADER_ICON_SIZE_PX}px;
			height: ${FILE_HEADER_ICON_SIZE_PX}px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: ${CHEVRON_FONT_SIZE_PX}px;
			color: ${COLOR_DESCRIPTION};
			transition: transform 0.15s ease-in-out;
		`,
	});

	iconArea.appendChild(iconWrapper);
	iconArea.appendChild(chevronEl);

	// Toggle collapse on icon area click
	if (onCollapseToggle) {
		dom.addDisposableListener(iconArea, 'click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			isCollapsed = !isCollapsed;
			applyCollapsedState();
			onCollapseToggle(isCollapsed);
		});
	}

	function applyCollapsedState(): void {
		headerElement.classList.toggle('is-collapsed', isCollapsed);
		if (isCollapsed) {
			chevronEl.classList.replace('codicon-chevron-down', 'codicon-chevron-right');
		} else {
			chevronEl.classList.replace('codicon-chevron-right', 'codicon-chevron-down');
		}
	}

	const filenameElement = $('span.vybe-file-header-filename', {
		style: `
			direction: rtl;
			display: flex;
			align-items: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			color: ${COLOR_FOREGROUND};
			height: ${FILE_HEADER_ICON_SIZE_PX}px;
			cursor: ${onFilenameClick ? 'pointer' : 'default'};
		`,
	});
	const fnInner = $('span', {
		style: `direction: ltr; unicode-bidi: embed; display: inline; font-size: ${FILE_HEADER_FILENAME_FONT_SIZE_PX}px; line-height: ${FILE_HEADER_FILENAME_LINE_HEIGHT_PX}px;`,
	});
	fnInner.textContent = filename;
	filenameElement.appendChild(fnInner);

	if (onFilenameClick) {
		dom.addDisposableListener(filenameElement, 'click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			onFilenameClick();
		});
	}

	fileInfo.appendChild(iconArea);
	fileInfo.appendChild(filenameElement);

	let lineRangeElement: HTMLElement | undefined;
	if (lineRange) {
		lineRangeElement = $('span.vybe-file-header-line-range', {
			style: `
				white-space: nowrap;
				font-size: ${FILE_HEADER_LINE_RANGE_FONT_SIZE_PX}px;
				line-height: ${FILE_HEADER_LINE_RANGE_LINE_HEIGHT_PX}px;
				margin-left: ${FILE_HEADER_LINE_RANGE_MARGIN_LEFT_PX}px;
				opacity: ${FILE_HEADER_LINE_RANGE_OPACITY};
				color: ${COLOR_DESCRIPTION};
			`,
		});
		lineRangeElement.textContent = lineRange;
		fileInfo.appendChild(lineRangeElement);

		if (onFilenameClick) {
			dom.addDisposableListener(lineRangeElement, 'click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				onFilenameClick();
			});
		}
	}

	headerElement.appendChild(fileInfo);

	const setCollapsed = (collapsed: boolean) => {
		isCollapsed = collapsed;
		applyCollapsedState();
	};

	return { headerElement, filenameElement, lineRangeElement, setCollapsed };
}
