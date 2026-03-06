/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Model dropdown for the composer pill.
 *
 * Naming: Mode uses the shared compact list in vybeChatComposerDropdowns.ts
 * ("composer dropdown"). This file is the full model picker (search, toggles,
 * scroll) so it lives separately as the "model dropdown".
 *
 * Visual states:
 * - No search query + Auto ON:  toggles only (Auto with description).
 * - No search query + Auto OFF: toggles + divider + scrollable model list
 *   (with divider + Add Models at the bottom).
 * - Searching: toggles hidden, only filtered models + Add Models shown.
 *
 * Uses VYBE dropdown tokens and theme. Scrollbar follows the
 * VSCODE_SCROLLBAR_IMPLEMENTATION_GUIDE (DomScrollableElement, sharp edges).
 */

import { $, append, addDisposableListener, clearNode, getWindow, getActiveWindow, EventType } from '../../../../../../base/browser/dom.js';
import { StandardKeyboardEvent } from '../../../../../../base/browser/keyboardEvent.js';
import { KeyCode } from '../../../../../../base/common/keyCodes.js';
import { DisposableStore, IDisposable } from '../../../../../../base/common/lifecycle.js';
import { DomScrollableElement } from '../../../../../../base/browser/ui/scrollbar/scrollableElement.js';
import { ScrollbarVisibility } from '../../../../../../base/common/scrollable.js';
import { IThemeService } from '../../../../../../platform/theme/common/themeService.js';
import { getVybeDropdownThemeColors, IVybeDropdownThemeColors } from '../../../../vybeDropdown/browser/vybeDropdownTheme.js';
import { VybeDropdownTokens } from '../../../../vybeDropdown/browser/vybeDropdownTokens.js';

// --- Tokens ------------------------------------------------------------------

const T = {
	panelWidth: 183,
	panelBorderRadius: VybeDropdownTokens.panelBorderRadius,
	contentGap: 2,
	itemPaddingH: 6,
	itemPaddingV: 2,
	itemBorderRadius: VybeDropdownTokens.rowBorderRadius,
	itemContentHeight: 16,
	labelFontSize: 12,
	labelLineHeight: 17,
	checkSize: 10,
	chevronSize: 8,
	chevronOpacity: 0.3,
	iconLabelGap: 6,
	anchorGap: 3,
	searchMargin: 2,
	searchPaddingH: 6,
	searchFontSize: 12,
	searchLineHeight: 15,
	searchPaddingV: 3,
	dividerOpacity: 0.8,
	descFontSize: 12,
	descLineHeight: 14,
	descOpacity: 0.6,
	toggleWidth: 24,
	toggleHeight: 14,
	knobSize: 10,
	maxModelListHeight: 200,
} as const;

// --- Placeholder models -----------------------------------------------------

interface PlaceholderModel {
	id: string;
	label: string;
}

const PLACEHOLDER_MODELS: PlaceholderModel[] = [
	{ id: 'claude-4.6-sonnet', label: 'Sonnet 4.6' },
	{ id: 'claude-4.6-opus', label: 'Opus 4.6' },
	{ id: 'claude-4.5-opus', label: 'Opus 4.5' },
	{ id: 'claude-4.5-sonnet', label: 'Sonnet 4.5' },
	{ id: 'gpt-5.3-codex', label: 'GPT-5.3 Codex' },
	{ id: 'gpt-5.2-low', label: 'GPT-5.2 Low' },
	{ id: 'gpt-5.2-high', label: 'GPT-5.2 High' },
	{ id: 'gpt-5.2-xhigh', label: 'GPT-5.2 Extra High' },
	{ id: 'gpt-5.2', label: 'GPT-5.2' },
	{ id: 'gpt-5.1-codex-max', label: 'GPT-5.1 Codex Max High' },
	{ id: 'gpt-5.1-codex', label: 'GPT-5.1 Codex' },
	{ id: 'gemini-3.1-pro', label: 'Gemini 3.1 Pro' },
	{ id: 'gemini-3-pro', label: 'Gemini 3 Pro' },
	{ id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
	{ id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
	{ id: 'claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
	{ id: 'claude-3-opus', label: 'Claude 3 Opus' },
	{ id: 'llama-4-scout', label: 'Llama 4 Scout' },
	{ id: 'llama-4-commander', label: 'Llama 4 Commander' },
];

// --- State -------------------------------------------------------------------

export interface ModelDropdownResult {
	isAutoEnabled: boolean;
	isMaxModeEnabled: boolean;
	selectedModelId: string;
	selectedModelLabel: string;
}

// --- Public API --------------------------------------------------------------

export function showModelDropdown(
	anchor: HTMLElement,
	themeService: IThemeService,
	currentState: ModelDropdownResult,
	options: {
		openDownward?: boolean;
		onStateChange: (state: ModelDropdownResult) => void;
		onClose?: () => void;
		onAddModels?: () => void;
	},
): IDisposable {
	const { openDownward = false, onStateChange, onClose, onAddModels } = options;
	let colors = getVybeDropdownThemeColors(themeService);
	const win = getWindow(anchor);
	const body = win.document.body;
	if (!body) { return { dispose: () => { } }; }

	const store = new DisposableStore();
	let closed = false;
	const state: ModelDropdownResult = { ...currentState };
	let searchQuery = '';

	// Keyboard-navigable rows collected per render
	let focusables: HTMLElement[] = [];
	let focusedIndex = -1;

	// -- Backdrop ------------------------------------------------------
	const backdrop = append(body, $('div.vybe-model-dropdown-backdrop'));
	backdrop.style.cssText = `
		position: fixed; top: 0; left: 0; right: 0; bottom: 0;
		background-color: transparent;
		z-index: ${VybeDropdownTokens.zIndexBackdrop};
		pointer-events: all;
	`;

	// -- Wrapper ------------------------------------------------------
	const wrapper = append(body, $('div.vybe-model-dropdown-wrapper'));
	const rect = anchor.getBoundingClientRect();
	if (openDownward) {
		wrapper.style.cssText = `
			position: fixed; z-index: ${VybeDropdownTokens.zIndexPanel};
			top: ${rect.bottom + T.anchorGap}px; left: ${rect.left}px;
			transform-origin: left top; width: initial;
		`;
	} else {
		wrapper.style.cssText = `
			position: fixed; z-index: ${VybeDropdownTokens.zIndexPanel};
			top: ${rect.top - T.anchorGap}px; left: ${rect.left}px;
			transform: translateY(-100%); transform-origin: left bottom; width: initial;
		`;
	}

	// -- Panel --------------------------------------------------------
	const panel = append(wrapper, $('div.vybe-model-dropdown-panel'));
	panel.tabIndex = -1;

	function applyPanelTheme(c: IVybeDropdownThemeColors): void {
		panel.style.cssText = `
			box-sizing: border-box; display: flex; flex-direction: column;
			width: ${T.panelWidth}px;
			background-color: ${c.panelBg};
			border: 1px solid ${c.separator};
			border-radius: ${T.panelBorderRadius}px;
			box-shadow: ${c.shadow};
			color: ${c.panelFg};
			font-family: -apple-system, "system-ui", sans-serif;
			font-size: ${T.labelFontSize}px;
			line-height: ${T.labelLineHeight}px;
			user-select: none; outline: none;
			contain: paint; pointer-events: auto;
			gap: 0; padding: 0;
			overflow: hidden;
		`;
	}
	applyPanelTheme(colors);

	// -- Search input -------------------------------------------------
	const searchContainer = append(panel, $('div'));
	searchContainer.style.cssText = `
		display: flex; gap: 4px; align-items: center;
		padding: 0 ${T.searchPaddingH}px;
		border: none; box-sizing: border-box; outline: none;
		margin: ${T.searchMargin}px;
	`;
	const searchInput = win.document.createElement('input') as HTMLInputElement;
	searchInput.placeholder = 'Search models';
	searchInput.style.cssText = `
		font-size: ${T.searchFontSize}px; line-height: ${T.searchLineHeight}px;
		border-radius: 3px; background: transparent;
		color: ${colors.panelFg};
		padding: ${T.searchPaddingV}px 0; flex: 1; min-width: 0;
		border: none; outline: none; box-sizing: border-box;
		font-family: -apple-system, "system-ui", sans-serif;
	`;
	searchContainer.appendChild(searchInput);

	// Placeholder color matching composer input
	const placeholderStyle = win.document.createElement('style');
	placeholderStyle.textContent = `.vybe-model-dropdown-panel input::placeholder { color: var(--vscode-input-placeholderForeground); opacity: 0.5; }`;
	panel.appendChild(placeholderStyle);

	// -- Content area -------------------------------------------------
	const contentArea = append(panel, $('div'));
	contentArea.style.cssText = `display: flex; flex-direction: column; overflow: hidden; min-height: 0;`;

	let scrollContent: HTMLElement | null = null;
	let scrollable: DomScrollableElement | null = null;

	// -- Highlight management -----------------------------------------

	function updateHighlight(): void {
		focusables.forEach((el, i) => {
			el.style.backgroundColor = i === focusedIndex ? colors.hoverBg : 'transparent';
		});
	}

	// -- Render --------------------------------------------------------

	function renderContent(): void {
		clearNode(contentArea);
		scrollContent = null;
		if (scrollable) { scrollable.dispose(); scrollable = null; }
		focusables = [];
		focusedIndex = -1;

		const isSearching = searchQuery.length > 0;

		// -- Toggle section (hidden during search) --------------------
		if (!isSearching) {
			const toggleSection = append(contentArea, $('div'));
			toggleSection.style.cssText = `display: flex; flex-direction: column; gap: ${T.contentGap}px; padding: ${T.contentGap}px;`;

			const autoRow = buildToggleRow(toggleSection, 'Auto',
				state.isAutoEnabled,
				state.isAutoEnabled ? 'Balanced quality and speed, recommended for most tasks' : null,
				(on) => {
					state.isAutoEnabled = on;
					if (on) { state.isMaxModeEnabled = false; }
					onStateChange({ ...state });
					renderContent();
				},
			);
			focusables.push(autoRow);

			if (!state.isAutoEnabled) {
				const maxRow = buildToggleRow(toggleSection, 'MAX Mode', state.isMaxModeEnabled, null, (on) => {
					state.isMaxModeEnabled = on;
					onStateChange({ ...state });
				});
				focusables.push(maxRow);
			}

			// If auto ON and no search, just show toggles with initial focus on Auto
			if (state.isAutoEnabled) {
				focusedIndex = 0;
				updateHighlight();
				return;
			}

			// -- Divider ----------------------------------------------
			appendDivider(contentArea);
		}

		// -- Scrollable model list ------------------------------------
		const filtered = filterModels(searchQuery);

		scrollContent = $('div.vybe-model-scroll-content');
		scrollContent.style.cssText = `display: flex; flex-direction: column; gap: ${T.contentGap}px; padding: ${T.contentGap}px; position: relative;`;

		if (filtered.length === 0) {
			const empty = append(scrollContent, $('div'));
			empty.textContent = 'No models found';
			empty.style.cssText = menuItemStyles + `
				color: ${colors.mutedFg};
				justify-content: center;
			`;
		} else {
			filtered.forEach(m => {
				const row = buildModelRow(scrollContent!, m, searchQuery);
				focusables.push(row);
			});
		}

		// Divider before Add Models
		appendDivider(scrollContent);

		const addRow = buildAddModelsRow(scrollContent);
		focusables.push(addRow);

		// Bottom spacer so Add Models isn't flush against the panel edge
		const spacer = append(scrollContent, $('div'));
		spacer.style.cssText = `height: ${T.contentGap}px; flex-shrink: 0;`;

		scrollable = new DomScrollableElement(scrollContent, {
			vertical: ScrollbarVisibility.Auto,
			horizontal: ScrollbarVisibility.Hidden,
			useShadows: false,
			verticalScrollbarSize: 6,
		});
		store.add(scrollable);

		const scrollDom = scrollable.getDomNode();
		scrollDom.style.position = 'relative';
		scrollDom.style.overflow = 'hidden';
		scrollDom.style.width = '100%';
		scrollDom.style.maxHeight = `${T.maxModelListHeight}px`;
		contentArea.appendChild(scrollDom);

		getActiveWindow().requestAnimationFrame(() => {
			getActiveWindow().requestAnimationFrame(() => updateScrollDimensions());
		});

		// Set initial focus: first toggle row (Auto) if not searching, else first model row
		if (!isSearching) {
			focusedIndex = 0;
		} else if (filtered.length > 0) {
			focusedIndex = 0;
		}
		updateHighlight();
	}

	function updateScrollDimensions(): void {
		if (!scrollContent || !scrollable) { return; }
		const scrollDom = scrollable.getDomNode();
		const viewportWidth = scrollDom.clientWidth;

		// Temporarily unconstrain to measure natural content height
		scrollContent.style.height = 'auto';
		void scrollContent.offsetHeight;
		const fullHeight = scrollContent.scrollHeight;
		const viewportHeight = Math.min(fullHeight, T.maxModelListHeight);

		// Re-constrain: DomScrollableElement scrolls via scrollTop on the
		// content element, which only works when content height < full height.
		scrollContent.style.height = `${viewportHeight}px`;
		scrollDom.style.height = `${viewportHeight}px`;

		scrollable.setScrollDimensions({
			width: viewportWidth, scrollWidth: viewportWidth,
			height: viewportHeight, scrollHeight: fullHeight,
		});
	}

	function filterModels(query: string): PlaceholderModel[] {
		if (!query) { return PLACEHOLDER_MODELS; }
		const q = query.toLowerCase();
		return PLACEHOLDER_MODELS.filter(m => m.label.toLowerCase().includes(q));
	}

	// -- Helpers ------------------------------------------------------

	function appendDivider(container: HTMLElement): void {
		const d = append(container, $('div'));
		d.style.cssText = `
			height: 1px; width: 100%; flex-shrink: 0;
			background-color: ${colors.separator};
			opacity: ${T.dividerOpacity};
			margin: ${T.contentGap}px 0;
		`;
	}

	function buildToggleRow(
		container: HTMLElement, label: string,
		isOn: boolean, description: string | null,
		onToggle: (on: boolean) => void,
	): HTMLElement {
		const row = append(container, $('div'));
		row.style.cssText = `
			display: flex; flex-direction: column;
			padding: ${T.itemPaddingV}px ${T.itemPaddingH}px;
			border-radius: ${T.itemBorderRadius}px;
			cursor: pointer; min-width: 0;
		`;

		const mainRow = append(row, $('div'));
		mainRow.style.cssText = `
			display: flex; justify-content: space-between; align-items: center;
			min-width: 0; width: 100%; height: ${T.itemContentHeight}px; gap: ${T.iconLabelGap}px;
		`;

		const lbl = append(mainRow, $('span'));
		lbl.textContent = label;
		lbl.style.cssText = `
			font-size: ${T.labelFontSize}px; padding: 4px 0;
			color: ${colors.panelFg};
		`;

		const { switchContainer, switchOuter, bgFill, knob } = createToggle(isOn);
		mainRow.appendChild(switchContainer);

		if (description) {
			const desc = append(row, $('div'));
			desc.textContent = description;
			desc.style.cssText = `
				opacity: ${T.descOpacity}; line-height: ${T.descLineHeight}px;
				white-space: normal; padding-bottom: 2px;
				color: ${colors.panelFg}; font-size: ${T.descFontSize}px;
			`;
		}

		let toggleState = isOn;
		store.add(addDisposableListener(row, 'click', (e) => {
			e.stopPropagation();
			toggleState = !toggleState;
			updateToggle(switchOuter, bgFill, knob, toggleState);
			onToggle(toggleState);
		}));

		return row;
	}

	function createToggle(isOn: boolean): { switchContainer: HTMLElement; switchOuter: HTMLElement; bgFill: HTMLElement; knob: HTMLElement } {
		const switchContainer = $('span');
		switchContainer.style.cssText = 'flex-shrink: 0; margin-left: 4px; cursor: pointer;';

		const switchOuter = append(switchContainer, $('div'));
		switchOuter.style.cssText = `
			width: ${T.toggleWidth}px; height: ${T.toggleHeight}px;
			border-radius: ${T.toggleHeight}px;
			position: relative; display: flex; align-items: center;
			cursor: pointer; transition: all 300ms; overflow: hidden;
			background: ${isOn ? colors.switchOn : colors.switchOff}; opacity: 1;
		`;

		const bgFill = append(switchOuter, $('div'));
		bgFill.style.cssText = `
			border-radius: ${T.toggleHeight}px;
			position: absolute; top: 0; bottom: 0; height: 100%; left: 0;
			background: ${colors.switchOn};
			opacity: ${isOn ? '1' : '0'};
			width: ${isOn ? '100%' : '0%'};
			transition: ${isOn ? '300ms' : '150ms'} cubic-bezier(0.4, 0, 0.2, 1);
		`;

		const knob = append(switchOuter, $('div'));
		knob.style.cssText = `
			width: ${T.knobSize}px; height: ${T.knobSize}px;
			border-radius: 50%; position: absolute;
			background: ${colors.switchKnob};
			transition: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
			left: ${isOn ? `calc(100% - ${T.knobSize + 2}px)` : '2px'};
		`;

		return { switchContainer, switchOuter, bgFill, knob };
	}

	function updateToggle(switchOuter: HTMLElement, bgFill: HTMLElement, knob: HTMLElement, isOn: boolean): void {
		switchOuter.style.background = isOn ? colors.switchOn : colors.switchOff;
		bgFill.style.opacity = isOn ? '1' : '0';
		bgFill.style.width = isOn ? '100%' : '0%';
		bgFill.style.transition = isOn ? '300ms cubic-bezier(0.4, 0, 0.2, 1)' : '150ms cubic-bezier(0.4, 0, 0.2, 1)';
		knob.style.left = isOn ? `calc(100% - ${T.knobSize + 2}px)` : '2px';
	}

	const menuItemStyles = `
		display: flex; align-items: center; justify-content: space-between;
		padding: ${T.itemPaddingV}px ${T.itemPaddingH}px;
		border-radius: ${T.itemBorderRadius}px;
		cursor: pointer; min-width: 0;
		height: ${T.itemContentHeight + T.itemPaddingV * 2}px;
		box-sizing: border-box; gap: ${T.iconLabelGap}px;
	`;

	function buildModelRow(container: HTMLElement, model: PlaceholderModel, query: string): HTMLElement {
		const isSelected = model.id === state.selectedModelId;

		const row = append(container, $('div.vybe-model-menu-item'));
		row.style.cssText = menuItemStyles;

		const lbl = append(row, $('span'));
		lbl.style.cssText = `
			font-size: ${T.labelFontSize}px; line-height: ${T.labelLineHeight}px;
			white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
			color: ${colors.panelFg}; flex: 1; min-width: 0;
		`;

		// Search highlight (same approach as historyDropdown)
		if (query) {
			const lowerLabel = model.label.toLowerCase();
			const lowerQuery = query.toLowerCase();
			const idx = lowerLabel.indexOf(lowerQuery);
			if (idx !== -1) {
				const before = model.label.substring(0, idx);
				const match = model.label.substring(idx, idx + query.length);
				const after = model.label.substring(idx + query.length);
				if (before) { append(lbl, $('span')).textContent = before; }
				const matchSpan = append(lbl, $('span'));
				matchSpan.textContent = match;
				matchSpan.style.color = colors.switchOn;
				if (after) { append(lbl, $('span')).textContent = after; }
			} else {
				lbl.textContent = model.label;
			}
		} else {
			lbl.textContent = model.label;
		}

		if (isSelected) {
			const check = append(row, $('span.codicon.codicon-check'));
			check.style.cssText = `
				font-size: ${T.checkSize}px; flex-shrink: 0;
				color: ${colors.panelFg};
			`;
		}

		store.add(addDisposableListener(row, 'click', (e) => {
			e.stopPropagation();
			state.isAutoEnabled = false;
			state.selectedModelId = model.id;
			state.selectedModelLabel = model.label;
			onStateChange({ ...state });
			close();
		}));

		return row;
	}

	function buildAddModelsRow(container: HTMLElement): HTMLElement {
		const row = append(container, $('div.vybe-model-menu-item'));
		row.style.cssText = menuItemStyles;

		const lbl = append(row, $('span'));
		lbl.textContent = 'Add Models';
		lbl.style.cssText = `
			font-size: ${T.labelFontSize}px; line-height: ${T.labelLineHeight}px;
			white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
			color: ${colors.panelFg}; flex: 1; min-width: 0;
		`;

		const chevron = append(row, $('span.codicon.codicon-chevron-right'));
		chevron.style.cssText = `
			font-size: ${T.chevronSize}px; opacity: ${T.chevronOpacity};
			color: ${colors.panelFg}; flex-shrink: 0;
			display: flex; align-items: center;
		`;

		store.add(addDisposableListener(row, 'click', (e) => {
			e.stopPropagation();
			close();
			onAddModels?.();
		}));

		return row;
	}

	// -- Mouse hover moves highlight ----------------------------------

	store.add(addDisposableListener(contentArea, EventType.MOUSE_OVER, (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		for (let i = 0; i < focusables.length; i++) {
			if (focusables[i] === target || focusables[i].contains(target)) {
				focusedIndex = i;
				updateHighlight();
				break;
			}
		}
	}));

	store.add(addDisposableListener(contentArea, EventType.MOUSE_OUT, (e: MouseEvent) => {
		const related = e.relatedTarget as Node | null;
		if (!related || !contentArea.contains(related)) {
			// mouse left the entire content area -- keep highlight on last item
		}
	}));

	// -- Search input listener ----------------------------------------
	store.add(addDisposableListener(searchInput, 'input', () => {
		searchQuery = searchInput.value;
		renderContent();
	}));

	// -- Initial render -----------------------------------------------
	renderContent();

	// -- Theme update -------------------------------------------------
	store.add(themeService.onDidColorThemeChange(() => {
		if (closed) { return; }
		colors = getVybeDropdownThemeColors(themeService);
		applyPanelTheme(colors);
		searchInput.style.color = colors.panelFg;
		renderContent();
	}));

	// -- Keyboard navigation ------------------------------------------

	store.add(addDisposableListener(win.document, EventType.KEY_DOWN, (e: KeyboardEvent) => {
		if (closed) { return; }
		const event = new StandardKeyboardEvent(e);

		if (event.equals(KeyCode.Escape)) {
			event.preventDefault();
			event.stopPropagation();
			close();
			return;
		}

		if (event.equals(KeyCode.DownArrow)) {
			event.preventDefault();
			event.stopPropagation();
			if (focusables.length === 0) { return; }
			focusedIndex = focusedIndex < 0 ? 0 : (focusedIndex + 1) % focusables.length;
			updateHighlight();
			scrollToFocused();
			return;
		}

		if (event.equals(KeyCode.UpArrow)) {
			event.preventDefault();
			event.stopPropagation();
			if (focusables.length === 0) { return; }
			focusedIndex = focusedIndex < 0 ? focusables.length - 1 : (focusedIndex - 1 + focusables.length) % focusables.length;
			updateHighlight();
			scrollToFocused();
			return;
		}

		if (event.equals(KeyCode.Enter)) {
			event.preventDefault();
			event.stopPropagation();
			if (focusedIndex >= 0 && focusedIndex < focusables.length) {
				focusables[focusedIndex].click();
			}
			return;
		}
	}, true));

	function scrollToFocused(): void {
		if (focusedIndex < 0 || !focusables[focusedIndex] || !scrollable || !scrollContent) { return; }
		const el = focusables[focusedIndex];
		if (!scrollContent.contains(el)) { return; }

		// Use getBoundingClientRect for reliable positions regardless of
		// how DomScrollableElement repositions the content internally.
		const scrollDom = scrollable.getDomNode();
		const viewportRect = scrollDom.getBoundingClientRect();
		const elRect = el.getBoundingClientRect();
		const currentScroll = scrollable.getScrollPosition().scrollTop;

		const buffer = T.contentGap + T.itemPaddingV;
		if (elRect.bottom + buffer > viewportRect.bottom) {
			const overshoot = elRect.bottom + buffer - viewportRect.bottom;
			scrollable.setScrollPosition({ scrollTop: currentScroll + overshoot });
		} else if (elRect.top - buffer < viewportRect.top) {
			const undershoot = viewportRect.top - elRect.top + buffer;
			scrollable.setScrollPosition({ scrollTop: currentScroll - undershoot });
		}
	}

	// -- Outside click ------------------------------------------------
	backdrop.addEventListener('mousedown', (e) => { e.preventDefault(); close(); });

	const outsideHandler = (e: MouseEvent) => {
		if (closed) { return; }
		const target = e.target as Node;
		if (!wrapper.contains(target) && !anchor.contains(target)) { close(); }
	};
	win.document.addEventListener('mousedown', outsideHandler);

	function close(): void {
		if (closed) { return; }
		closed = true;
		if (scrollable) { scrollable.dispose(); }
		store.dispose();
		win.document.removeEventListener('mousedown', outsideHandler);
		backdrop.remove();
		wrapper.remove();
		onClose?.();
	}

	setTimeout(() => searchInput.focus(), 0);

	return { dispose: () => close() };
}
