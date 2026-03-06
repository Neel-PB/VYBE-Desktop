/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { $, append, addDisposableListener, clearNode, getWindow } from '../../../../../../base/browser/dom.js';
import { Disposable } from '../../../../../../base/common/lifecycle.js';
import { DomScrollableElement } from '../../../../../../base/browser/ui/scrollbar/scrollableElement.js';
import { ScrollbarVisibility } from '../../../../../../base/common/scrollable.js';
import { VYBE_CHAT_NEW_CHAT_LABEL } from '../../../common/vybeChatConstants.js';
import { IThemeService } from '../../../../../../platform/theme/common/themeService.js';
import { VybeChatDropdownTokens, VYBE_DROPDOWN_FONT_FAMILY } from '../../vybeChatDropdownTokens.js';
import { getVybeChatDropdownThemeColors, type IVybeChatDropdownThemeColors } from '../../vybeChatDropdownTheme.js';
import { getDropdownDividerStyle } from '../../../../vybeDropdown/browser/vybeDropdownStyles.js';
import { VybeDropdownTokens } from '../../../../vybeDropdown/browser/vybeDropdownTokens.js';

export interface ChatHistoryItem {
	id: string;
	title: string;
	timestamp: Date;
	isCurrent: boolean;
}

interface TimeSection {
	label: string;
	items: ChatHistoryItem[];
}

export interface RenameEvent {
	id: string;
	newTitle: string;
}

/** Callbacks passed into show() -- no Emitter subscriptions needed on the caller side. */
export interface IHistoryDropdownCallbacks {
	onSelect(sessionId: string): void;
	onRename(event: RenameEvent): void;
	onDelete(sessionId: string): void;
}

const T = VybeChatDropdownTokens;

export class HistoryDropdown extends Disposable {
	private callbacks: IHistoryDropdownCallbacks | null = null;

	private dropdownContainer: HTMLElement | null = null;
	private searchInput: HTMLInputElement | null = null;
	private listContainer: HTMLElement | null = null;
	private scrollableElement: DomScrollableElement | null = null;
	private scrollWrapper: HTMLElement | null = null;
	private allItems: ChatHistoryItem[] = [];
	private currentHoveredItem: HTMLElement | null = null;
	private currentlyEditingItem: {
		itemId: string;
		titleElement: HTMLElement;
		editButton: HTMLElement;
		originalTitle: string;
		originalColor: string;
		saveFn: () => void;
		cancelFn: () => void;
	} | null = null;
	private isPencilClickInProgress = false;
	private isRenamingInProgress = false;

	private focusedIndex = -1;
	private renderedItemElements: HTMLElement[] = [];

	private colors!: IVybeChatDropdownThemeColors;

	get isVisible(): boolean {
		return this.dropdownContainer !== null;
	}

	constructor(
		private anchorElement: HTMLElement,
		@IThemeService private readonly themeService: IThemeService
	) {
		super();
	}

	updateAnchorElement(newAnchor: HTMLElement): void {
		if (newAnchor && newAnchor.isConnected) {
			const anchorChanged = this.anchorElement !== newAnchor;
			this.anchorElement = newAnchor;
			if (anchorChanged && this.dropdownContainer) {
				this.repositionDropdown();
			}
		}
	}

	private repositionDropdown(): void {
		if (!this.dropdownContainer || !this.anchorElement || !this.anchorElement.isConnected) {
			return;
		}

		const targetWindow = getWindow(this.anchorElement);
		targetWindow.requestAnimationFrame(() => {
			if (!this.dropdownContainer || !this.anchorElement || !this.anchorElement.isConnected) {
				return;
			}

			const buttonRect = this.anchorElement.getBoundingClientRect();
			this.dropdownContainer.style.top = `${buttonRect.bottom + T.anchorOffset}px`;
			this.dropdownContainer.style.left = `${buttonRect.right}px`;
			this.dropdownContainer.style.right = 'auto';
			this.dropdownContainer.style.transform = 'translateX(-100%)';

			const dropdownLeftEdge = buttonRect.right - T.panelWidth;
			if (dropdownLeftEdge < T.edgeMargin) {
				this.dropdownContainer.style.left = `${T.edgeMargin}px`;
				this.dropdownContainer.style.transform = 'none';
			}
		});
	}

	show(items: ChatHistoryItem[], callbacks: IHistoryDropdownCallbacks): void {
		if (this._store.isDisposed) {
			return;
		}
		if (!this.anchorElement || !this.anchorElement.isConnected) {
			return;
		}

		this.callbacks = callbacks;
		this.colors = getVybeChatDropdownThemeColors(this.themeService);
		this.allItems = items;
		if (!this.dropdownContainer) {
			this.createDropdown();
		}

		if (this.dropdownContainer && !this._store.isDisposed) {
			this.renderItems(items);
		}
	}

	hide(): void {
		if (this.isRenamingInProgress && this.dropdownContainer && this.dropdownContainer.isConnected) {
			return;
		}

		if (this.anchorElement && !this.anchorElement.isConnected) {
			if (this.dropdownContainer) {
				this.dropdownContainer.remove();
				this.dropdownContainer = null;
			}
			this.callbacks = null;
			return;
		}

		if (this.dropdownContainer) {
			this.dropdownContainer.remove();
			this.dropdownContainer = null;
			this.scrollableElement = null;
			this.scrollWrapper = null;
		}
		this.callbacks = null;
	}

	private createDropdown(): void {
		if (this.dropdownContainer) {
			return;
		}

		const c = this.colors;
		const targetWindow = getWindow(this.anchorElement);

		this.dropdownContainer = append(targetWindow.document.body, $('.history-dropdown'));
		this.dropdownContainer.style.cssText = `
			box-sizing: border-box; padding: 0; border-radius: ${T.borderRadius}px;
			background-color: ${c.panelBg}; border: none; align-items: stretch;
			font-family: ${VYBE_DROPDOWN_FONT_FAMILY};
			font-size: ${T.searchFontSize}px; color: ${c.panelFg};
			display: flex; flex-direction: column; gap: ${T.innerGap}px;
			position: fixed; visibility: visible; width: ${T.panelWidth}px;
			box-shadow: ${c.shadow};
			z-index: ${T.zIndex}; transform-origin: right top;
		`;

		this.repositionDropdown();

		const innerWrapper = append(this.dropdownContainer, $('.inner-wrapper'));
		innerWrapper.style.cssText = 'flex: 1 1 0%; overflow: hidden; display: flex; height: 100%; flex-direction: column;';

		const contentContainer = append(innerWrapper, $('.content-container'));
		contentContainer.setAttribute('tabindex', '0');
		contentContainer.style.cssText = `
			box-sizing: border-box; border-radius: ${T.borderRadius}px;
			background-color: ${c.panelBg}; border: 1px solid ${c.separator};
			align-items: stretch; font-size: ${T.searchFontSize}px;
			display: flex; flex-direction: column; gap: ${T.contentGap}px;
			padding: 0; outline: none; pointer-events: auto;
		`;

		// Search input
		const searchContainer = append(contentContainer, $('.search-container'));
		searchContainer.style.cssText = `
			display: flex; gap: ${T.searchContainerGap}px; align-items: center;
			padding: 0 ${T.searchPaddingH}px; border: none;
			box-sizing: border-box; outline: none; margin: ${T.searchContainerMargin}px;
		`;

		this.searchInput = append(searchContainer, $('input.search-input')) as HTMLInputElement;
		this.searchInput.type = 'text';
		this.searchInput.placeholder = 'Search...';
		this.searchInput.style.cssText = `
			font-family: ${VYBE_DROPDOWN_FONT_FAMILY};
			font-size: ${T.searchFontSize}px; line-height: ${T.searchLineHeight}px;
			border-radius: ${T.searchBorderRadius}px; background-color: transparent;
			color: ${c.panelFg}; padding: ${T.searchInputPaddingV}px 0;
			flex: 1; min-width: 0; border: none; outline: none; box-sizing: border-box;
		`;

		// Placeholder color matching composer input
		const placeholderStyle = document.createElement('style');
		placeholderStyle.textContent = `.history-dropdown input.search-input::placeholder { color: var(--vscode-input-placeholderForeground); opacity: 0.5; }`;
		contentContainer.appendChild(placeholderStyle);

		this._register(addDisposableListener(this.searchInput, 'input', () => {
			this.filterItems();
		}));

		this._register(addDisposableListener(contentContainer, 'keydown', (e) => {
			this.handleKeyboard(e);
		}));

		// Scrollable list
		this.scrollWrapper = append(contentContainer, $('.scroll-wrapper'));
		this.scrollWrapper.style.cssText = `max-height: ${T.maxListHeight}px; width: 100%;`;

		this.listContainer = $('.list-container');
		this.listContainer.style.cssText = `
			display: flex; flex-direction: column; gap: ${T.sectionGap}px;
			padding: ${T.listContainerPadding}px; width: 100%; box-sizing: border-box;
		`;

		this.scrollableElement = this._register(new DomScrollableElement(this.listContainer, {
			vertical: ScrollbarVisibility.Auto,
			horizontal: ScrollbarVisibility.Hidden,
			useShadows: false,
			verticalScrollbarSize: T.scrollbarSize,
			horizontalScrollbarSize: T.scrollbarSize,
		}));

		const scrollableDomNode = this.scrollableElement.getDomNode();
		scrollableDomNode.style.cssText = `max-height: ${T.maxListHeight}px; width: 100%;`;
		this.scrollWrapper.appendChild(scrollableDomNode);

		// Click outside to close
		this._register(addDisposableListener(targetWindow.document, 'mousedown', (e) => {
			if (this.currentlyEditingItem || this.isRenamingInProgress) {
				return;
			}
			if (this.dropdownContainer && !this.dropdownContainer.contains(e.target as Node) && !this.anchorElement.contains(e.target as Node)) {
				this.hide();
			}
		}));
	}

	// --- Keyboard Navigation --------------------------------------------

	private handleKeyboard(e: KeyboardEvent): void {
		const items = this.renderedItemElements;
		if (items.length === 0) {
			return;
		}

		switch (e.key) {
			case 'ArrowDown': {
				e.preventDefault();
				e.stopPropagation();
				this.moveFocus(1);
				break;
			}
			case 'ArrowUp': {
				e.preventDefault();
				e.stopPropagation();
				this.moveFocus(-1);
				break;
			}
			case 'Enter': {
				e.preventDefault();
				e.stopPropagation();
				if (this.focusedIndex >= 0 && this.focusedIndex < items.length) {
					items[this.focusedIndex].click();
				}
				break;
			}
			case 'Escape': {
				e.preventDefault();
				e.stopPropagation();
				this.hide();
				break;
			}
		}
	}

	private moveFocus(direction: number): void {
		const items = this.renderedItemElements;
		if (items.length === 0) {
			return;
		}

		// Clear previous focus visual
		if (this.focusedIndex >= 0 && this.focusedIndex < items.length) {
			items[this.focusedIndex].style.backgroundColor = 'transparent';
		}

		this.focusedIndex += direction;
		if (this.focusedIndex < 0) {
			this.focusedIndex = items.length - 1;
		} else if (this.focusedIndex >= items.length) {
			this.focusedIndex = 0;
		}

		items[this.focusedIndex].style.backgroundColor = this.colors.hoverBg;
		this.currentHoveredItem = items[this.focusedIndex];

		items[this.focusedIndex].scrollIntoView({ block: 'nearest' });
	}

	// --- Rendering ------------------------------------------------------

	private renderItems(items: ChatHistoryItem[], searchQuery: string = ''): void {
		if (!this.listContainer || this._store.isDisposed) {
			return;
		}

		clearNode(this.listContainer);
		this.renderedItemElements = [];
		this.focusedIndex = -1;

		if (items.length === 0) {
			this.renderEmptyState(searchQuery);
			return;
		}

		const sections = this.groupByTime(items);
		const c = this.colors;

		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];

			const sectionWrapper = append(this.listContainer, $('.section-wrapper'));
			sectionWrapper.style.cssText = `display: flex; flex-direction: column; gap: ${T.sectionGap}px;`;

			const sectionHeader = append(sectionWrapper, $('.section-header'));
			sectionHeader.textContent = section.label;
			sectionHeader.style.cssText = `
				color: ${c.sectionHeaderFg};
				font-family: ${VYBE_DROPDOWN_FONT_FAMILY};
				font-size: ${T.sectionHeaderFontSize}px;
				opacity: ${T.sectionHeaderOpacity};
				padding: 0 ${T.itemPaddingH}px;
				line-height: ${T.sectionHeaderLineHeight}px;
			`;

			const sectionItems = append(sectionWrapper, $('.section-items'));
			sectionItems.style.cssText = `display: flex; flex-direction: column; gap: ${T.sectionGap}px;`;

			for (const item of section.items) {
				this.renderItem(sectionItems, item, section.label === 'Today', searchQuery);
			}

			// Divider between sections (uses shared getDropdownDividerStyle)
			if (i < sections.length - 1) {
				const divider = append(this.listContainer, $('.history-divider'));
				divider.style.cssText = getDropdownDividerStyle(VybeDropdownTokens);
				divider.style.backgroundColor = c.sectionBorder;
				divider.style.opacity = `${T.dividerOpacity}`;
			}
		}

		this.updateScrollableHeight();
	}

	private renderItem(container: HTMLElement, item: ChatHistoryItem, isToday: boolean, searchQuery: string): void {
		const c = this.colors;

		const itemContainer = append(container, $('.history-item'));
		itemContainer.style.cssText = `
			border-radius: ${T.itemBorderRadius}px; display: flex; flex-direction: column;
			padding: 0 ${T.itemPaddingH}px ${T.itemPaddingBottom}px ${T.itemPaddingH}px;
			min-width: 0; cursor: pointer; color: ${c.panelFg};
			font-family: ${VYBE_DROPDOWN_FONT_FAMILY};
			background-color: ${item.isCurrent ? c.hoverBg : 'transparent'};
		`;

		if (item.isCurrent) {
			this.currentHoveredItem = itemContainer;
		}

		this.renderedItemElements.push(itemContainer);

		const itemContent = append(itemContainer, $('.item-content'));
		itemContent.style.cssText = `
			display: flex; justify-content: space-between; align-items: center;
			min-width: 0; width: 100%; height: ${T.itemContentHeight}px; gap: ${T.itemContentGap}px;
		`;

		// Left side
		const leftSide = append(itemContent, $('.left-side'));
		leftSide.style.cssText = `
			display: flex; align-items: center; gap: ${T.itemContentGap}px;
			min-width: 0; height: ${T.itemContentHeight}px; width: 100%;
		`;

		const iconWrapper = append(leftSide, $('.icon-wrapper'));
		iconWrapper.style.cssText = `
			flex-shrink: 0; display: flex; align-items: center; justify-content: center;
			width: ${T.iconSize}px; height: ${T.iconSize}px;
		`;

		const icon = append(iconWrapper, $('.codicon.codicon-comment'));
		icon.style.cssText = `font-size: ${T.iconSize}px; color: ${c.mutedFg};`;

		const titleWrapper = append(leftSide, $('.title-wrapper'));
		titleWrapper.style.cssText = `
			display: flex; width: 100%; align-items: center; min-width: 0;
			gap: ${T.itemContentGap}px; height: ${T.titleLineHeight}px;
		`;

		const title = append(titleWrapper, $('.title'));
		title.style.cssText = `
			color: ${item.title === VYBE_CHAT_NEW_CHAT_LABEL ? c.textTertiary : c.panelFg};
			font-family: ${VYBE_DROPDOWN_FONT_FAMILY};
			font-size: ${T.titleFontSize}px; line-height: ${T.titleLineHeight}px;
			white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
			display: block; width: 100%; flex: 1; min-width: 0;
		`;

		// Search highlight
		if (searchQuery && item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
			const lowerTitle = item.title.toLowerCase();
			const lowerQuery = searchQuery.toLowerCase();
			const startIndex = lowerTitle.indexOf(lowerQuery);

			if (startIndex !== -1) {
				const before = item.title.substring(0, startIndex);
				const match = item.title.substring(startIndex, startIndex + searchQuery.length);
				const after = item.title.substring(startIndex + searchQuery.length);

				if (before) {
					append(title, $('span')).textContent = before;
				}
				const matchSpan = append(title, $('span'));
				matchSpan.textContent = match;
				matchSpan.style.color = c.accent;
				if (after) {
					append(title, $('span')).textContent = after;
				}
			} else {
				title.textContent = item.title;
			}
		} else {
			title.textContent = item.title;
		}

		// Timestamp (Today section only)
		if (isToday) {
			const timestamp = append(titleWrapper, $('.timestamp'));
			timestamp.style.cssText = `
				direction: rtl; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
				color: ${c.mutedFg};
				font-family: ${VYBE_DROPDOWN_FONT_FAMILY};
				flex-shrink: ${item.isCurrent ? '0' : '1'};
				opacity: ${item.isCurrent ? T.textSecondaryOpacity : T.textTertiaryOpacity};
				font-size: ${T.timestampFontSize}px; line-height: ${T.timestampLineHeight}px;
			`;
			timestamp.textContent = item.isCurrent ? 'Current' : this.formatTimestamp(item.timestamp);
		}

		// Right side (edit/delete, visible on hover)
		const rightSide = append(itemContent, $('.right-side'));
		rightSide.style.cssText = `
			display: none; align-items: center; gap: ${T.itemContentGap}px;
			height: ${T.titleLineHeight}px; flex-shrink: 0;
		`;

		const buttonWrapper = append(rightSide, $('.button-wrapper'));
		buttonWrapper.style.cssText = `display: flex; gap: ${T.editDeleteGap}px; flex-shrink: 0;`;

		// Edit button
		const editButton = append(buttonWrapper, $('.codicon.codicon-edit'));
		editButton.style.cssText = `
			font-size: ${T.actionButtonFontSize}px; color: ${c.panelFg};
			padding: ${T.actionButtonPadding}px; cursor: pointer;
			display: flex; align-items: center; justify-content: center;
		`;

		if (!this._store.isDisposed) {
			this._register(addDisposableListener(editButton, 'mousedown', (e) => {
				e.stopPropagation();
				e.preventDefault();
				this.isPencilClickInProgress = true;
			}));
		}

		if (!this._store.isDisposed) {
			this._register(addDisposableListener(editButton, 'click', (e) => {
				e.stopPropagation();
				e.preventDefault();

				const isEditing = editButton.classList.contains('codicon-check') ||
					title.contentEditable === 'true' ||
					(this.currentlyEditingItem && this.currentlyEditingItem.itemId === item.id);

				if (isEditing) {
					if (this.currentlyEditingItem && this.currentlyEditingItem.itemId === item.id) {
						this.currentlyEditingItem.saveFn();
					} else {
						title.blur();
					}
				} else {
					this.startRename(item, title, editButton);
				}

				setTimeout(() => { this.isPencilClickInProgress = false; }, T.pencilClickDelay);
			}));
		}

		// Delete button
		const deleteButton = append(buttonWrapper, $('.codicon.codicon-trash'));
		deleteButton.style.cssText = `
			font-size: ${T.actionButtonFontSize}px; color: ${c.panelFg};
			padding: ${T.actionButtonPadding}px; cursor: pointer;
			display: flex; align-items: center; justify-content: center;
		`;

		if (!this._store.isDisposed) {
			this._register(addDisposableListener(deleteButton, 'click', (e) => {
				e.stopPropagation();
				this.confirmDelete(item);
			}));
		}

		// Item click -> select chat
		if (!this._store.isDisposed) {
			this._register(addDisposableListener(itemContainer, 'click', (e) => {
				if (this.currentlyEditingItem) {
					e.stopPropagation();
					e.preventDefault();
					return;
				}

				const target = e.target as HTMLElement;
				if ((target === title || target.closest('.title') === title) && title.contentEditable === 'true') {
					e.stopPropagation();
					e.preventDefault();
					return;
				}
				if (target.closest('.button-wrapper') || target.closest('.right-side')) {
					e.stopPropagation();
					e.preventDefault();
					return;
				}

				if (!item.isCurrent) {
					this.callbacks?.onSelect(item.id);
				}
			}));
		}

		// Hover: show edit/delete, highlight row
		if (!this._store.isDisposed) {
			this._register(addDisposableListener(itemContainer, 'mouseenter', () => {
				if (this.currentHoveredItem && this.currentHoveredItem !== itemContainer) {
					this.currentHoveredItem.style.backgroundColor = 'transparent';
					// eslint-disable-next-line no-restricted-syntax
					const prevRightSide = this.currentHoveredItem.querySelector('.right-side') as HTMLElement;
					if (prevRightSide) {
						prevRightSide.style.display = 'none';
					}
				}
				itemContainer.style.backgroundColor = c.hoverBg;
				rightSide.style.display = 'flex';
				this.currentHoveredItem = itemContainer;

				const idx = this.renderedItemElements.indexOf(itemContainer);
				if (idx >= 0) {
					this.focusedIndex = idx;
				}
			}));
		}
	}

	// --- Time grouping --------------------------------------------------

	private groupByTime(items: ChatHistoryItem[]): TimeSection[] {
		const now = new Date();
		const sections = new Map<string, ChatHistoryItem[]>();

		for (const item of items) {
			const diffMs = now.getTime() - item.timestamp.getTime();
			const diffHours = diffMs / (1000 * 60 * 60);
			const diffDays = diffMs / (1000 * 60 * 60 * 24);
			const diffWeeks = diffDays / 7;
			const diffMonths = diffDays / 30;
			const diffYears = diffDays / 365;

			let label: string;
			if (diffHours < 24) { label = 'Today'; }
			else if (diffHours < 48) { label = 'Yesterday'; }
			else if (diffDays < 7) { label = `${Math.floor(diffDays)}d ago`; }
			else if (diffWeeks < 4) { label = `${Math.floor(diffWeeks)}w ago`; }
			else if (diffMonths < 12) { label = `${Math.floor(diffMonths)}mo ago`; }
			else { label = `${Math.floor(diffYears)}yr ago`; }

			if (!sections.has(label)) {
				sections.set(label, []);
			}
			sections.get(label)!.push(item);
		}

		const result: TimeSection[] = [];
		for (const [label, sectionItems] of sections) {
			result.push({ label, items: sectionItems });
		}
		return result;
	}

	private formatTimestamp(date: Date): string {
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / (1000 * 60));
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

		if (diffMins < 60) {
			return `${diffMins}m`;
		} else if (diffHours < 24) {
			return `${diffHours}h`;
		}
		return '';
	}

	// --- Search / Filter ------------------------------------------------

	private filterItems(): void {
		if (!this.searchInput || !this.listContainer) {
			return;
		}

		const query = this.searchInput.value.toLowerCase().trim();
		if (query === '') {
			this.renderItems(this.allItems);
		} else {
			const filtered = this.allItems.filter(item =>
				item.title.toLowerCase().includes(query)
			);
			if (filtered.length === 0) {
				this.renderEmptyState(query);
			} else {
				this.renderItems(filtered, query);
			}
		}
	}

	private renderEmptyState(searchQuery: string): void {
		if (!this.listContainer) {
			return;
		}

		clearNode(this.listContainer);
		this.renderedItemElements = [];
		this.focusedIndex = -1;

		const c = this.colors;

		const emptyState = append(this.listContainer, $('.empty-state'));
		emptyState.style.cssText = `
			display: flex; flex-direction: column; align-items: center; justify-content: center;
			padding: ${T.emptyStatePadding}px; color: ${c.panelFg};
			opacity: ${T.textSecondaryOpacity};
			font-family: ${VYBE_DROPDOWN_FONT_FAMILY};
			font-size: ${T.emptyStateFontSize}px; text-align: center;
		`;

		const message = append(emptyState, $('.empty-message'));
		message.textContent = searchQuery.trim()
			? `No chats found matching: ${searchQuery}`
			: 'No chats yet. Send a message to start a chat.';

		this.updateScrollableHeight();
	}

	// --- Scrollable height ----------------------------------------------

	private updateScrollableHeight(): void {
		if (!this.scrollableElement || !this.listContainer || !this.scrollWrapper) {
			return;
		}

		setTimeout(() => {
			if (!this.scrollableElement || !this.listContainer || !this.scrollWrapper) {
				return;
			}

			this.listContainer.style.height = 'auto';
			this.listContainer.style.maxHeight = 'none';
			void this.listContainer.offsetHeight;

			const contentHeight = this.listContainer.scrollHeight;
			const actualHeight = Math.min(contentHeight, T.maxListHeight);

			this.listContainer.style.height = `${actualHeight}px`;
			this.listContainer.style.maxHeight = `${actualHeight}px`;

			const scrollableDomNode = this.scrollableElement.getDomNode();
			scrollableDomNode.style.height = `${actualHeight}px`;
			scrollableDomNode.style.maxHeight = `${actualHeight}px`;
			this.scrollWrapper.style.height = `${actualHeight}px`;

			this.scrollableElement.scanDomNode();
		}, 0);
	}

	// --- Inline Rename --------------------------------------------------

	private startRename(item: ChatHistoryItem, titleElement: HTMLElement, editButton: HTMLElement): void {
		if (this.currentlyEditingItem && this.currentlyEditingItem.titleElement !== titleElement) {
			this.currentlyEditingItem.cancelFn();
		}

		const originalTitle = item.title;
		const originalEditButtonColor = editButton.style.color;

		titleElement.contentEditable = 'true';
		titleElement.style.outline = 'none';
		titleElement.style.cursor = 'text';

		if (item.title === VYBE_CHAT_NEW_CHAT_LABEL) {
			titleElement.textContent = '';
		}

		titleElement.focus();
		const targetWindow = getWindow(titleElement);
		const range = targetWindow.document.createRange();
		range.selectNodeContents(titleElement);
		const selection = targetWindow.getSelection();
		if (selection) {
			selection.removeAllRanges();
			selection.addRange(range);
		}

		editButton.className = 'codicon codicon-check';
		editButton.style.color = this.colors.accent;

		this.currentlyEditingItem = {
			itemId: item.id,
			titleElement,
			editButton,
			originalTitle,
			originalColor: originalEditButtonColor,
			cancelFn: () => { },
			saveFn: () => { },
		};

		let isEditing = true;

		const cleanup = () => {
			if (!isEditing) { return; }
			isEditing = false;
			titleElement.removeEventListener('keydown', keydownHandler);
			titleElement.removeEventListener('blur', blurHandler);
			titleElement.removeEventListener('click', titleClickHandler);
		};

		const save = () => {
			if (!isEditing) { return; }

			let text = titleElement.innerText || titleElement.textContent || '';

			if (!text.trim()) {
				const textNodes: string[] = [];
				const walker = getWindow(titleElement).document.createTreeWalker(titleElement, NodeFilter.SHOW_TEXT, null);
				let node;
				while (node = walker.nextNode()) {
					if (node.textContent) { textNodes.push(node.textContent); }
				}
				text = textNodes.join('');
			}

			let newTitle = text.trim();
			const wasNewChat = originalTitle === VYBE_CHAT_NEW_CHAT_LABEL;

			if (!newTitle) {
				newTitle = originalTitle;
			}

			cleanup();
			titleElement.contentEditable = 'false';
			titleElement.style.cursor = 'pointer';
			editButton.className = 'codicon codicon-edit';
			editButton.style.color = originalEditButtonColor;

			if (this.currentlyEditingItem && this.currentlyEditingItem.titleElement === titleElement) {
				this.currentlyEditingItem = null;
			}

			const shouldRename = (newTitle !== originalTitle && newTitle !== '') ||
				(wasNewChat && newTitle !== '' && newTitle !== originalTitle);

			if (shouldRename) {
				this.isRenamingInProgress = true;
				this.callbacks?.onRename({ id: item.id, newTitle });
				item.title = newTitle;
				titleElement.textContent = newTitle;
				setTimeout(() => { this.isRenamingInProgress = false; }, T.renameSaveDelay);
			} else {
				titleElement.textContent = originalTitle;
			}
		};

		const cancel = () => {
			if (!isEditing) { return; }
			cleanup();
			titleElement.contentEditable = 'false';
			titleElement.style.cursor = 'pointer';
			titleElement.textContent = originalTitle;
			editButton.className = 'codicon codicon-edit';
			editButton.style.color = originalEditButtonColor;
			if (this.currentlyEditingItem && this.currentlyEditingItem.titleElement === titleElement) {
				this.currentlyEditingItem = null;
			}
		};

		if (this.currentlyEditingItem && this.currentlyEditingItem.itemId === item.id) {
			this.currentlyEditingItem.saveFn = save;
			this.currentlyEditingItem.cancelFn = cancel;
		}

		const keydownHandler = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
				save();
			} else if (e.key === 'Escape') {
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
				cancel();
			}
		};

		titleElement.addEventListener('keydown', keydownHandler);

		const blurHandler = () => {
			if (this.isPencilClickInProgress) { return; }
			setTimeout(() => {
				if (this.isPencilClickInProgress) { return; }
				if (isEditing) { save(); }
			}, T.blurSaveDelay);
		};

		titleElement.addEventListener('blur', blurHandler);

		const titleClickHandler = (e: MouseEvent) => { e.stopPropagation(); };
		titleElement.addEventListener('click', titleClickHandler);
	}

	// --- Delete ---------------------------------------------------------

	private confirmDelete(item: ChatHistoryItem): void {
		const message = item.isCurrent
			? `Delete current chat "${item.title}"? This cannot be undone.`
			: `Delete "${item.title}"? This cannot be undone.`;

		if (confirm(message)) {
			this.callbacks?.onDelete(item.id);

			const index = this.allItems.findIndex(i => i.id === item.id);
			if (index !== -1) {
				this.allItems.splice(index, 1);
				if (this.searchInput && this.searchInput.value.trim()) {
					this.filterItems();
				} else {
					this.renderItems(this.allItems);
				}
			}
		}
	}
}
