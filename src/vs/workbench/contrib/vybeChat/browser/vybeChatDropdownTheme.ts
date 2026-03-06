/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Chat-specific theme color resolver. Extends the shared IVybeDropdownThemeColors
 * with additional color slots needed by the history dropdown (tertiary text,
 * section border, section header color).
 *
 * All base colors come from getVybeDropdownThemeColors (menu/list/button tokens),
 * so every Vybe dropdown follows the same theme-aware palette. Chat-specific
 * additions are resolved from the same VS Code color registry.
 */

import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { getVybeDropdownThemeColors, type IVybeDropdownThemeColors } from '../../vybeDropdown/browser/vybeDropdownTheme.js';
import { pickerGroupBorder } from '../../../../platform/theme/common/colorRegistry.js';
import { VybeChatDropdownTokens } from './vybeChatDropdownTokens.js';
import { ColorScheme } from '../../../../platform/theme/common/theme.js';

export interface IVybeChatDropdownThemeColors extends IVybeDropdownThemeColors {
	/** Tertiary/dimmed text (e.g. "New Chat" label). */
	textTertiary: string;
	/** Section divider color. */
	sectionBorder: string;
	/** Section header text color. */
	sectionHeaderFg: string;
	/** Theme-aware accent color (search highlights, active icons). Resolved from buttonBackground. */
	accent: string;
}

const chatFallback = {
	textTertiary: 'rgba(204, 204, 204, 0.4)',
	sectionBorder: '#262626',
	sectionHeaderFg: '#999999',
};

export function getVybeChatDropdownThemeColors(themeService: IThemeService): IVybeChatDropdownThemeColors {
	const base = getVybeDropdownThemeColors(themeService);
	const theme = themeService.getColorTheme();
	const isDark = theme.type === ColorScheme.DARK || theme.type === ColorScheme.HIGH_CONTRAST_DARK;

	const secondaryOpacity = VybeChatDropdownTokens.textSecondaryOpacity;
	const tertiaryOpacity = VybeChatDropdownTokens.textTertiaryOpacity;

	const fgBase = isDark ? '204, 204, 204' : '51, 51, 51';

	return {
		...base,
		mutedFg: base.mutedFg || `rgba(${fgBase}, ${secondaryOpacity})`,
		textTertiary: `rgba(${fgBase}, ${tertiaryOpacity})`,
		sectionBorder: theme.getColor(pickerGroupBorder)?.toString() ?? (isDark ? chatFallback.sectionBorder : 'rgba(20, 20, 20, 0.07)'),
		sectionHeaderFg: isDark ? chatFallback.sectionHeaderFg : (base.mutedFg || '#8B949E'),
		accent: base.switchOn,
	};
}
