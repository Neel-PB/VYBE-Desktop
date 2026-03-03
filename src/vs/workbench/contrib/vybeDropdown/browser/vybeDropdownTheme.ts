/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { menuBackground, menuForeground, menuBorder, menuSeparatorBackground } from '../../../../platform/theme/common/colors/menuColors.js';
import { listHoverBackground, listDeemphasizedForeground, listInactiveSelectionBackground } from '../../../../platform/theme/common/colors/listColors.js';
import { buttonBackground, buttonForeground } from '../../../../platform/theme/common/colors/inputColors.js';

/**
 * Resolved theme colors for Vybe dropdowns. Uses VS Code's menu/list/button color tokens
 * so dropdowns follow the active theme (including custom themes). Matches Vybe Settings toggles.
 */
export interface IVybeDropdownThemeColors {
	/** Panel background. */
	panelBg: string;
	/** Panel foreground (primary text). */
	panelFg: string;
	/** Panel border. */
	panelBorder: string;
	/** Separator/divider lines. */
	separator: string;
	/** Row hover background. */
	hoverBg: string;
	/** Muted/secondary text (e.g. current value, icon). */
	mutedFg: string;
	/** Toggle switch "on" fill – same as Vybe Settings (button background). */
	switchOn: string;
	/** Toggle switch "off" track. */
	switchOff: string;
	/** Toggle switch knob (contrasts with switchOn). */
	switchKnob: string;
}

const fallback = {
	panelBg: '#252526',
	panelFg: 'rgba(204, 204, 204, 0.9)',
	panelBorder: '#454545',
	separator: '#606060',
	hoverBg: '#2A2D2E',
	mutedFg: 'rgba(204, 204, 204, 0.6)',
	switchOn: '#3ecf8e',
	switchOff: 'rgba(128, 128, 128, 0.3)',
	switchKnob: '#ffffff',
};

/**
 * Resolve dropdown colors from the current theme (menu + list tokens).
 * Use this in VybeSettingsDropdown, vybeChat dropdowns, etc.
 */
export function getVybeDropdownThemeColors(themeService: IThemeService): IVybeDropdownThemeColors {
	const theme = themeService.getColorTheme();
	return {
		panelBg: theme.getColor(menuBackground)?.toString() ?? fallback.panelBg,
		panelFg: theme.getColor(menuForeground)?.toString() ?? fallback.panelFg,
		panelBorder: theme.getColor(menuBorder)?.toString() ?? fallback.panelBorder,
		separator: theme.getColor(menuSeparatorBackground)?.toString() ?? fallback.separator,
		hoverBg: theme.getColor(listHoverBackground)?.toString() ?? fallback.hoverBg,
		mutedFg: theme.getColor(listDeemphasizedForeground)?.toString() ?? fallback.mutedFg,
		switchOn: theme.getColor(buttonBackground)?.toString() ?? fallback.switchOn,
		switchOff: theme.getColor(listInactiveSelectionBackground)?.toString() ?? fallback.switchOff,
		switchKnob: theme.getColor(buttonForeground)?.toString() ?? fallback.switchKnob,
	};
}
