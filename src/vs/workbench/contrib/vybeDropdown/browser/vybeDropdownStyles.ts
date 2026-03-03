/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { addDisposableListener } from '../../../../base/browser/dom.js';
import { IDisposable } from '../../../../base/common/lifecycle.js';
import { VybeDropdownTokens } from './vybeDropdownTokens.js';

/**
 * Base CSS for a clickable dropdown row (height, padding, margin, border-radius, width, font).
 * Use with attachDropdownRowHover for hover. Append color/background as needed.
 */
export function getDropdownRowBaseStyle(tokens: typeof VybeDropdownTokens, opts?: { justifyContent?: 'flex-start' | 'space-between'; minWidth?: boolean }): string {
	const j = opts?.justifyContent ?? 'flex-start';
	const minWidth = opts?.minWidth ? ' min-width: 0;' : '';
	return `box-sizing: border-box; display: flex; align-items: center; justify-content: ${j};
height: ${tokens.rowHeight}px; padding: ${tokens.rowPaddingV}px ${tokens.rowPaddingH}px;
margin: 0 ${tokens.rowMarginH}px; border-radius: ${tokens.rowBorderRadius}px;
width: calc(100% - ${tokens.rowMarginH * 2}px);${minWidth}
font-size: ${tokens.fontSizeSmall}px; line-height: ${tokens.lineHeightRow}px; cursor: pointer;`;
}

/**
 * Divider line style (height, margin). Background color must be set separately.
 */
export function getDropdownDividerStyle(tokens: typeof VybeDropdownTokens): string {
	return `box-sizing: border-box; display: block; height: ${tokens.dividerHeight}px; width: 100%; margin: ${tokens.dividerMarginV}px 0;`;
}

/**
 * Attach hover background to a dropdown row. Returns a disposable to remove listeners.
 */
export function attachDropdownRowHover(row: HTMLElement, hoverBg: string): IDisposable {
	const a = addDisposableListener(row, 'mouseenter', () => { row.style.backgroundColor = hoverBg; });
	const b = addDisposableListener(row, 'mouseleave', () => { row.style.backgroundColor = 'transparent'; });
	return {
		dispose: () => {
			a.dispose();
			b.dispose();
		},
	};
}
