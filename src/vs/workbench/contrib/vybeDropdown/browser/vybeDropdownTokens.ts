/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Layout and sizing tokens for Vybe dropdowns (title bar settings, vybeChat, etc.).
 * Use these so all Vybe dropdowns are consistent. Colors come from theme (vybeDropdownTheme).
 */

export const VybeDropdownTokens = {
	panelWidth: 180,
	/** Wider panel for Account dropdown (avatar + labels). */
	panelWidthAccount: 220,
	/** Content/section width (e.g. rows, dividers). Must equal panelWidth minus 2*panelPaddingH. */
	contentWidth: 176,
	panelPaddingV: 2,
	panelPaddingH: 2,
	panelBorderRadius: 6,
	anchorOffset: 3,
	rowHeight: 24,
	rowPaddingV: 3,
	rowPaddingH: 8,
	/** Horizontal margin for rows/categories (0 = hover touches panel borders). Dividers use full width. */
	rowMarginH: 0,
	rowBorderRadius: 4,
	fontSize: 13,
	lineHeight: 18.2,
	fontSizeSmall: 12,
	lineHeightRow: 18,
	iconSize: 16,
	iconLabelGap: 8,
	/** Divider line and spacing. */
	dividerHeight: 1,
	dividerMarginV: 2,
	/** Header block (e.g. Account avatar row): top, sides, bottom padding. */
	headerPaddingTop: 4,
	headerPaddingH: 4,
	headerPaddingBottom: 6,
	/** Gap between header elements (avatar ↔ content, content lines). */
	headerGap: 8,
	headerContentGap: 2,
	/** Avatar size in Account dropdown. */
	avatarSize: 40,
	/** Badge (e.g. message count) size and font. */
	badgeSize: 12,
	badgeFontSize: 9,
	/** Inline spacing (e.g. column-gap in value wrappers). */
	inlineGap: 4,
	/** Category label (non-clickable) extra bottom padding. */
	categoryLabelPaddingBottom: 2,
	/** Submenu option check icon size. */
	submenuCheckSize: 13,
	zIndexBackdrop: 2550,
	zIndexPanel: 2551,
} as const;
