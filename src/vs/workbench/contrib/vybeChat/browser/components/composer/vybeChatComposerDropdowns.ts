/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Composer dropdowns -- compact panels used by the mode pill and model pill.
 *
 * Built on VYBE dropdown tokens and theme (same as settings/account dropdowns)
 * with support for both downward (empty-state composer at top) and upward
 * (active-chat composer at bottom) positioning.
 *
 * Design reference: Cursor's mode selector dropdown (170px min-width, compact
 * 20px items, icon + label + optional keybinding + checkmark).
 *
 * Highlight behaviour: the selected (checked) item starts with the hover
 * background. When the user hovers another item the background moves there
 * and stays -- it never returns automatically.
 */

import { $, append, addDisposableListener, getWindow, EventType } from '../../../../../../base/browser/dom.js';
import { StandardKeyboardEvent } from '../../../../../../base/browser/keyboardEvent.js';
import { KeyCode } from '../../../../../../base/common/keyCodes.js';
import { DisposableStore, IDisposable } from '../../../../../../base/common/lifecycle.js';
import { IThemeService } from '../../../../../../platform/theme/common/themeService.js';
import { getVybeDropdownThemeColors, IVybeDropdownThemeColors } from '../../../../vybeDropdown/browser/vybeDropdownTheme.js';
import { VybeDropdownTokens } from '../../../../vybeDropdown/browser/vybeDropdownTokens.js';

// --- Compact tokens (Cursor reference: 170px, 20px items, 14px icons) -------

const CDT = {
	panelMinWidth: 170,
	panelBorderRadius: VybeDropdownTokens.panelBorderRadius,
	contentPadding: 2,
	itemGap: 2,
	itemPaddingH: 6,
	itemPaddingV: 2,
	itemBorderRadius: VybeDropdownTokens.rowBorderRadius,
	itemContentHeight: 16,
	iconSize: 14,
	labelFontSize: 12,
	labelLineHeight: 17,
	keybindingFontSize: 11,
	keybindingOpacity: 0.4,
	checkSize: 10,
	iconLabelGap: 6,
	anchorGap: 3,
} as const;

// --- Types -------------------------------------------------------------------

export interface ComposerDropdownItem {
	id: string;
	label: string;
	icon?: string;
	keybinding?: string;
	isSelected: boolean;
	dividerBefore?: boolean;
}

export interface ComposerDropdownOptions {
	items: ComposerDropdownItem[];
	width?: number;
	/** true = open below anchor (empty-state, composer at top).
	 *  false/undefined = open above anchor (active-chat, composer at bottom). */
	openDownward?: boolean;
	onSelect: (id: string) => void;
	onClose?: () => void;
}

// --- Public API --------------------------------------------------------------

/**
 * Show a compact dropdown near the anchor element.
 * Opens downward (below anchor) or upward (above anchor) depending on
 * `options.openDownward`.  Uses VYBE dropdown tokens and theme colors.
 * Returns a disposable that closes the panel.
 */
export function showComposerDropdown(
	anchor: HTMLElement,
	themeService: IThemeService,
	options: ComposerDropdownOptions,
): IDisposable {
	const { items, width = CDT.panelMinWidth, openDownward = false, onSelect, onClose } = options;
	const colors = getVybeDropdownThemeColors(themeService);
	const win = getWindow(anchor);
	const body = win.document.body;
	if (!body) {
		return { dispose: () => { } };
	}

	const store = new DisposableStore();
	let closed = false;

	// -- Backdrop ------------------------------------------------------
	const backdrop = append(body, $('div.vybe-composer-dropdown-backdrop'));
	backdrop.style.cssText = `
		position: fixed; top: 0; left: 0; right: 0; bottom: 0;
		background-color: transparent;
		z-index: ${VybeDropdownTokens.zIndexBackdrop};
		pointer-events: all;
	`;

	// -- Wrapper (positioned relative to anchor) ----------------------
	const wrapper = append(body, $('div.vybe-composer-dropdown-wrapper'));
	const rect = anchor.getBoundingClientRect();

	if (openDownward) {
		wrapper.style.cssText = `
			position: fixed;
			z-index: ${VybeDropdownTokens.zIndexPanel};
			top: ${rect.bottom + CDT.anchorGap}px;
			left: ${rect.left}px;
			transform-origin: left top;
			width: initial;
		`;
	} else {
		wrapper.style.cssText = `
			position: fixed;
			z-index: ${VybeDropdownTokens.zIndexPanel};
			top: ${rect.top - CDT.anchorGap}px;
			left: ${rect.left}px;
			transform: translateY(-100%);
			transform-origin: left bottom;
			width: initial;
		`;
	}

	// -- Panel container ----------------------------------------------
	const panel = append(wrapper, $('div.vybe-composer-dropdown-panel'));
	applyPanelStyles(panel, colors, width);

	// -- Content ------------------------------------------------------
	const content = append(panel, $('div'));
	content.style.cssText = `
		display: flex; flex-direction: column;
		gap: ${CDT.itemGap}px;
		padding: ${CDT.contentPadding}px;
	`;

	const focusables: HTMLElement[] = [];
	let focusedIndex = -1;

	// Find which item is currently selected so we can give it the
	// initial highlight background.
	const selectedIndex = items.findIndex(i => i.isSelected);

	items.forEach((item) => {
		const row = buildItem(content, item, colors, store, (id) => {
			close();
			onSelect(id);
		});
		focusables.push(row);
	});

	// -- Highlight management -----------------------------------------
	// Selected item starts with hover background. When the user hovers
	// another item the background moves there and stays -- it never
	// returns automatically (matches agentModeDropdown behaviour).

	focusedIndex = selectedIndex >= 0 ? selectedIndex : -1;

	const updateHighlight = () => {
		focusables.forEach((el, i) => {
			el.style.backgroundColor = i === focusedIndex ? colors.hoverBg : 'transparent';
		});
	};

	// Apply initial highlight on selected item
	updateHighlight();

	// -- Keyboard navigation ------------------------------------------
	panel.tabIndex = -1;

	store.add(addDisposableListener(win.document, EventType.KEY_DOWN, (e: KeyboardEvent) => {
		if (closed) { return; }
		if (panel.contains(e.target as Node)) { return; }
		const event = new StandardKeyboardEvent(e);
		if (!event.equals(KeyCode.DownArrow) && !event.equals(KeyCode.UpArrow) &&
			!event.equals(KeyCode.Enter) && !event.equals(KeyCode.Escape)) {
			return;
		}
		panel.tabIndex = 0;
		panel.focus();
		if (event.equals(KeyCode.DownArrow)) {
			focusedIndex = focusedIndex < 0 ? 0 : (focusedIndex + 1) % focusables.length;
		} else if (event.equals(KeyCode.UpArrow)) {
			focusedIndex = focusedIndex < 0 ? focusables.length - 1 : (focusedIndex - 1 + focusables.length) % focusables.length;
		} else if (event.equals(KeyCode.Enter)) {
			if (focusedIndex >= 0) { focusables[focusedIndex].click(); }
		} else if (event.equals(KeyCode.Escape)) {
			close();
		}
		updateHighlight();
		event.preventDefault();
		event.stopPropagation();
	}, true));

	store.add(addDisposableListener(panel, EventType.KEY_DOWN, (e: KeyboardEvent) => {
		const event = new StandardKeyboardEvent(e);
		if (event.equals(KeyCode.DownArrow)) {
			focusedIndex = focusedIndex < 0 ? 0 : (focusedIndex + 1) % focusables.length;
			updateHighlight();
			event.preventDefault();
			event.stopPropagation();
		} else if (event.equals(KeyCode.UpArrow)) {
			focusedIndex = focusedIndex < 0 ? focusables.length - 1 : (focusedIndex - 1 + focusables.length) % focusables.length;
			updateHighlight();
			event.preventDefault();
			event.stopPropagation();
		} else if (event.equals(KeyCode.Enter)) {
			if (focusedIndex >= 0) { focusables[focusedIndex].click(); }
			event.preventDefault();
			event.stopPropagation();
		} else if (event.equals(KeyCode.Escape)) {
			close();
			event.preventDefault();
			event.stopPropagation();
		}
	}));

	// Mouse hover moves the highlight and keeps it (no mouseleave reset)
	store.add(addDisposableListener(content, EventType.MOUSE_OVER, (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		for (let i = 0; i < focusables.length; i++) {
			if (focusables[i] === target || focusables[i].contains(target)) {
				focusedIndex = i;
				updateHighlight();
				break;
			}
		}
	}));

	// -- Theme update -------------------------------------------------
	store.add(themeService.onDidColorThemeChange(() => {
		if (closed) { return; }
		const c = getVybeDropdownThemeColors(themeService);
		applyPanelStyles(panel, c, width);
	}));

	// -- Outside click / backdrop -------------------------------------
	backdrop.addEventListener('mousedown', (e) => {
		e.preventDefault();
		close();
	});

	const outsideHandler = (e: MouseEvent) => {
		if (closed) { return; }
		const target = e.target as Node;
		if (!wrapper.contains(target) && !anchor.contains(target)) {
			close();
		}
	};
	win.document.addEventListener('mousedown', outsideHandler);

	function close(): void {
		if (closed) { return; }
		closed = true;
		store.dispose();
		win.document.removeEventListener('mousedown', outsideHandler);
		backdrop.remove();
		wrapper.remove();
		onClose?.();
	}

	return { dispose: () => close() };
}

// --- Helpers -----------------------------------------------------------------

function applyPanelStyles(panel: HTMLElement, c: IVybeDropdownThemeColors, width: number): void {
	panel.style.cssText = `
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		min-width: ${width}px;
		background-color: ${c.panelBg};
		border: 1px solid ${c.separator};
		border-radius: ${CDT.panelBorderRadius}px;
		box-shadow: ${c.shadow};
		color: ${c.panelFg};
		font-family: -apple-system, "system-ui", sans-serif;
		font-size: ${CDT.labelFontSize}px;
		line-height: ${CDT.labelLineHeight}px;
		user-select: none;
		outline: none;
		contain: paint;
		pointer-events: auto;
	`;
}

function buildItem(
	container: HTMLElement,
	item: ComposerDropdownItem,
	colors: IVybeDropdownThemeColors,
	store: DisposableStore,
	onSelect: (id: string) => void,
): HTMLElement {
	if (item.dividerBefore) {
		const divider = append(container, $('div.vybe-composer-dropdown-divider'));
		divider.style.cssText = `
			height: 1px;
			margin: 2px 0;
			background-color: ${colors.separator};
		`;
	}

	const row = append(container, $('div.vybe-composer-dropdown-item'));
	row.style.cssText = `
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: ${CDT.itemPaddingV}px ${CDT.itemPaddingH}px;
		border-radius: ${CDT.itemBorderRadius}px;
		cursor: pointer;
		min-width: 0;
		height: ${CDT.itemContentHeight + CDT.itemPaddingV * 2}px;
		box-sizing: border-box;
		gap: ${CDT.iconLabelGap}px;
	`;

	// Left side: icon + label + keybinding
	const left = append(row, $('div'));
	left.style.cssText = `
		display: flex; align-items: center;
		gap: ${CDT.iconLabelGap}px; min-width: 0;
		height: ${CDT.itemContentHeight}px; flex: 1;
	`;

	if (item.icon) {
		const icon = append(left, $(`span.codicon.${item.icon}`));
		icon.style.cssText = `
			flex-shrink: 0;
			font-size: ${CDT.iconSize}px;
			line-height: ${CDT.itemContentHeight}px;
			width: ${CDT.iconSize}px; height: ${CDT.iconSize}px;
			display: flex; align-items: center; justify-content: center;
			color: ${colors.panelFg};
		`;
	}

	const labelArea = append(left, $('div'));
	labelArea.style.cssText = `
		display: flex; align-items: center;
		gap: ${CDT.iconLabelGap}px; min-width: 0; flex: 1;
		height: ${CDT.labelLineHeight}px;
	`;

	const label = append(labelArea, $('span'));
	label.textContent = item.label;
	label.style.cssText = `
		font-size: ${CDT.labelFontSize}px;
		line-height: ${CDT.labelLineHeight}px;
		white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
		color: ${colors.panelFg};
	`;

	if (item.keybinding) {
		const kb = append(labelArea, $('span'));
		kb.textContent = item.keybinding;
		kb.style.cssText = `
			flex-shrink: 0; padding-right: 4px;
			font-size: ${CDT.keybindingFontSize}px;
			line-height: ${CDT.itemContentHeight}px;
			opacity: ${CDT.keybindingOpacity};
			color: ${colors.mutedFg};
			white-space: nowrap;
		`;
	}

	// Right side: checkmark
	const right = append(row, $('div'));
	right.style.cssText = `
		display: flex; align-items: center; justify-content: center;
		height: ${CDT.itemContentHeight}px; flex-shrink: 0;
	`;

	const check = append(right, $('span.codicon.codicon-check'));
	check.style.cssText = `
		font-size: ${CDT.checkSize}px;
		line-height: ${CDT.checkSize}px;
		width: ${CDT.checkSize}px; height: ${CDT.checkSize}px;
		display: flex; align-items: center; justify-content: center;
		color: ${colors.panelFg};
		opacity: ${item.isSelected ? '1' : '0'};
	`;

	// Click (hover is managed by the parent content MOUSE_OVER listener)
	store.add(addDisposableListener(row, 'click', (e) => {
		e.stopPropagation();
		onSelect(item.id);
	}));

	return row;
}
