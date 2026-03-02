/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { ColorScheme } from '../../../../platform/theme/common/theme.js';
import { getWindow } from '../../../../base/browser/dom.js';

/**
 * Check if the current theme is dark. Stub for vybeSettings when vybeChat is not present.
 */
export function isDarkTheme(themeService?: IThemeService, element?: HTMLElement): boolean {
	if (themeService) {
		const theme = themeService.getColorTheme();
		return theme.type === ColorScheme.DARK || theme.type === ColorScheme.HIGH_CONTRAST_DARK;
	}

	// Fallback: check DOM
	const window = element ? getWindow(element) : getWindow(document.body);
	const workbench = window.document.querySelector('.monaco-workbench');
	return workbench
		? workbench.classList.contains('vs-dark') || workbench.classList.contains('hc-black')
		: true;
}
