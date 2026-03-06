/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// VYBE: Simple model dropdown for inline composer — Auto toggle + 2 models, no search,
// no max mode, no add models.

import { $, append, addDisposableListener, clearNode, getWindow, EventType } from '../../../../../base/browser/dom.js';
import { StandardKeyboardEvent } from '../../../../../base/browser/keyboardEvent.js';
import { KeyCode } from '../../../../../base/common/keyCodes.js';
import { DisposableStore, IDisposable } from '../../../../../base/common/lifecycle.js';
import { IThemeService } from '../../../../../platform/theme/common/themeService.js';
import { getVybeDropdownThemeColors, IVybeDropdownThemeColors } from '../../../vybeDropdown/browser/vybeDropdownTheme.js';
import { VybeDropdownTokens } from '../../../vybeDropdown/browser/vybeDropdownTokens.js';

const T = {
	panelWidth: 160,
	panelBorderRadius: VybeDropdownTokens.panelBorderRadius,
	contentGap: 2,
	itemPaddingH: 6,
	itemPaddingV: 2,
	itemBorderRadius: VybeDropdownTokens.rowBorderRadius,
	itemContentHeight: 16,
	labelFontSize: 12,
	labelLineHeight: 17,
	checkSize: 10,
	iconLabelGap: 6,
	anchorGap: 3,
	descFontSize: 12,
	descLineHeight: 14,
	descOpacity: 0.6,
	toggleWidth: 24,
	toggleHeight: 14,
	knobSize: 10,
} as const;

interface InlineModel {
	id: string;
	label: string;
}

const INLINE_MODELS: InlineModel[] = [
	{ id: 'claude-sonnet', label: 'Claude 3.5 Sonnet' },
	{ id: 'gpt-4o', label: 'GPT-4o' },
];

export interface InlineModelDropdownState {
	isAutoEnabled: boolean;
	selectedModelId: string;
	selectedModelLabel: string;
}

export function showInlineModelDropdown(
	anchor: HTMLElement,
	themeService: IThemeService,
	currentState: InlineModelDropdownState,
	options: {
		openDownward?: boolean;
		onStateChange: (state: InlineModelDropdownState) => void;
		onClose?: () => void;
	},
): IDisposable {
	const { openDownward = false, onStateChange, onClose } = options;
	let colors = getVybeDropdownThemeColors(themeService);
	const win = getWindow(anchor);
	const body = win.document.body;
	if (!body) { return { dispose: () => { } }; }

	const store = new DisposableStore();
	let closed = false;
	const state: InlineModelDropdownState = { ...currentState };

	let focusables: HTMLElement[] = [];
	let focusedIndex = -1;

	const backdrop = append(body, $('div.vybe-inline-model-dropdown-backdrop'));
	backdrop.style.cssText = `
		position: fixed; top: 0; left: 0; right: 0; bottom: 0;
		background-color: transparent;
		z-index: ${VybeDropdownTokens.zIndexBackdrop};
		pointer-events: all;
	`;

	const wrapper = append(body, $('div.vybe-inline-model-dropdown-wrapper'));
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

	const panel = append(wrapper, $('div.vybe-inline-model-dropdown-panel'));
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
			gap: 0; padding: ${T.contentGap}px;
			overflow: hidden;
		`;
	}
	applyPanelTheme(colors);

	function updateHighlight(): void {
		focusables.forEach((el, i) => {
			el.style.backgroundColor = i === focusedIndex ? colors.hoverBg : 'transparent';
		});
	}

	function renderContent(): void {
		clearNode(panel);
		applyPanelTheme(colors);
		focusables = [];
		focusedIndex = -1;

		const autoRow = buildToggleRow(panel, 'Auto', state.isAutoEnabled,
			state.isAutoEnabled ? 'Balanced quality and speed' : null,
			(on) => {
				state.isAutoEnabled = on;
				onStateChange({ ...state });
				renderContent();
			},
		);
		focusables.push(autoRow);

		if (state.isAutoEnabled) {
			focusedIndex = 0;
			updateHighlight();
			return;
		}

		appendDivider(panel);

		INLINE_MODELS.forEach(m => {
			const row = buildModelRow(panel, m);
			focusables.push(row);
		});

		focusedIndex = 0;
		updateHighlight();
	}

	function appendDivider(container: HTMLElement): void {
		const d = append(container, $('div'));
		d.style.cssText = `
			height: 1px; width: 100%; flex-shrink: 0;
			background-color: ${colors.separator};
			opacity: 0.8;
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
		lbl.style.cssText = `font-size: ${T.labelFontSize}px; padding: 4px 0; color: ${colors.panelFg};`;

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

	function buildModelRow(container: HTMLElement, model: InlineModel): HTMLElement {
		const isSelected = model.id === state.selectedModelId;

		const row = append(container, $('div'));
		row.style.cssText = menuItemStyles;

		const lbl = append(row, $('span'));
		lbl.textContent = model.label;
		lbl.style.cssText = `
			font-size: ${T.labelFontSize}px; line-height: ${T.labelLineHeight}px;
			white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
			color: ${colors.panelFg}; flex: 1; min-width: 0;
		`;

		if (isSelected) {
			const check = append(row, $('span.codicon.codicon-check'));
			check.style.cssText = `font-size: ${T.checkSize}px; flex-shrink: 0; color: ${colors.panelFg};`;
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

	store.add(addDisposableListener(panel, EventType.MOUSE_OVER, (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		for (let i = 0; i < focusables.length; i++) {
			if (focusables[i] === target || focusables[i].contains(target)) {
				focusedIndex = i;
				updateHighlight();
				break;
			}
		}
	}));

	renderContent();

	store.add(themeService.onDidColorThemeChange(() => {
		if (closed) { return; }
		colors = getVybeDropdownThemeColors(themeService);
		renderContent();
	}));

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
			return;
		}

		if (event.equals(KeyCode.UpArrow)) {
			event.preventDefault();
			event.stopPropagation();
			if (focusables.length === 0) { return; }
			focusedIndex = focusedIndex < 0 ? focusables.length - 1 : (focusedIndex - 1 + focusables.length) % focusables.length;
			updateHighlight();
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
		store.dispose();
		win.document.removeEventListener('mousedown', outsideHandler);
		backdrop.remove();
		wrapper.remove();
		onClose?.();
	}

	setTimeout(() => panel.focus(), 0);

	return { dispose: () => close() };
}
