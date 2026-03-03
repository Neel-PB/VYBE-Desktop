/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { $, append, getWindow } from '../../../../base/browser/dom.js';
import { IDisposable } from '../../../../base/common/lifecycle.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { getVybeDropdownThemeColors, IVybeDropdownThemeColors } from './vybeDropdownTheme.js';
import { VybeDropdownTokens } from './vybeDropdownTokens.js';

/** Result of buildContent: optional cleanup and optional theme refresh so all content (labels, avatar, rows, etc.) updates when theme changes. */
export interface IVybeDropdownContentResult extends IDisposable {
	updateTheme?(colors: IVybeDropdownThemeColors): void;
}

export interface IVybeDropdownPanelOptions {
	/** Build the dropdown content into this container. Called once when panel is shown. May return a disposable and/or updateTheme to refresh colors when theme changes. */
	buildContent: (container: HTMLElement) => void | IDisposable | IVybeDropdownContentResult;
	/** Panel width in px. Defaults to VybeDropdownTokens.panelWidth. */
	width?: number;
	/** Called when the panel closes itself (outside click / backdrop). Lets the owner clear its reference. */
	onClose?: () => void;
}

/**
 * Reusable Vybe dropdown panel: backdrop + positioned container with theme colors and tokens.
 * Use from VybeSettingsDropdown, vybeChat, etc. Content is built via buildContent(container).
 */
export function showVybeDropdownPanel(
	anchor: HTMLElement,
	themeService: IThemeService,
	options: IVybeDropdownPanelOptions
): IDisposable {
	const { buildContent, width = VybeDropdownTokens.panelWidth, onClose } = options;
	const colors: IVybeDropdownThemeColors = getVybeDropdownThemeColors(themeService);
	const win = getWindow(anchor);
	const body = win.document.body;
	if (!body) {
		return { dispose: () => { } };
	}

	const backdrop = append(body, $('div.vybe-dropdown-backdrop'));
	backdrop.style.cssText = `
		position: fixed; top: 0; left: 0; right: 0; bottom: 0;
		background-color: transparent;
		z-index: ${VybeDropdownTokens.zIndexBackdrop};
		pointer-events: all;
	`;

	const wrapper = append(body, $('div.vybe-dropdown-wrapper'));
	const rect = anchor.getBoundingClientRect();
	wrapper.style.cssText = `
		position: fixed;
		z-index: ${VybeDropdownTokens.zIndexPanel};
		top: ${rect.bottom + VybeDropdownTokens.anchorOffset}px;
		left: ${rect.right - width}px;
		width: initial;
	`;

	const container = append(wrapper, $('div.vybe-dropdown-panel'));
	container.className = 'vybe-dropdown-panel';

	function applyPanelStyles(c: IVybeDropdownThemeColors): void {
		container.style.cssText = `
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: ${width}px;
		background-color: ${c.panelBg};
		border: 1px solid ${c.separator};
		border-radius: ${VybeDropdownTokens.panelBorderRadius}px;
		padding: ${VybeDropdownTokens.panelPaddingV}px ${VybeDropdownTokens.panelPaddingH}px;
		box-shadow: none;
		color: ${c.panelFg};
		font-family: -apple-system, "system-ui", sans-serif;
		font-size: ${VybeDropdownTokens.fontSize}px;
		line-height: ${VybeDropdownTokens.lineHeight}px;
		user-select: none;
		position: relative;
		outline: none;
	`;
	}
	applyPanelStyles(colors);

	const themeListener = themeService.onDidColorThemeChange(() => {
		if (closed) return;
		const newColors = getVybeDropdownThemeColors(themeService);
		applyPanelStyles(newColors);
		const content = contentDisposable as IVybeDropdownContentResult | undefined;
		if (content?.updateTheme) {
			content.updateTheme(newColors);
		}
	});

	const contentDisposable = buildContent(container) ?? undefined;

	let closed = false;
	const outsideHandler = (e: MouseEvent) => {
		if (closed) return;
		const target = e.target as Node;
		if (!wrapper.contains(target) && !anchor.contains(target)) {
			close();
		}
	};

	function close(): void {
		if (closed) return;
		closed = true;
		themeListener.dispose();
		contentDisposable?.dispose();
		win.document.removeEventListener('mousedown', outsideHandler);
		backdrop.remove();
		wrapper.remove();
		onClose?.();
	}

	backdrop.addEventListener('mousedown', (e) => {
		e.preventDefault();
		close();
	});

	// mousedown: we're called from the action's click handler, so the opening mousedown already fired.
	// Add listener synchronously so every subsequent mousedown is handled (no missed first click).
	win.document.addEventListener('mousedown', outsideHandler);

	return { dispose: () => close() };
}
