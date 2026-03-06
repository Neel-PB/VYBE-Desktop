/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Chat-specific dropdown tokens that extend the shared VybeDropdownTokens.
 *
 * Shared values (borderRadius, dividerHeight, fontSizeSmall, rowBorderRadius, etc.)
 * are referenced from VybeDropdownTokens so all Vybe dropdowns stay consistent.
 * This file only adds constants unique to the chat history dropdown.
 */

import { VybeDropdownTokens } from '../../vybeDropdown/browser/vybeDropdownTokens.js';

export const VYBE_DROPDOWN_FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

export const VybeChatDropdownTokens = {
	// --- Inherited from shared VybeDropdownTokens -----------------------
	borderRadius: VybeDropdownTokens.panelBorderRadius,
	itemBorderRadius: VybeDropdownTokens.rowBorderRadius,
	dividerHeight: VybeDropdownTokens.dividerHeight,
	dividerMarginV: VybeDropdownTokens.dividerMarginV,

	// --- Panel ----------------------------------------------------------
	panelWidth: 340,
	anchorOffset: 6,
	edgeMargin: 8,
	zIndex: 2548,

	// --- Content container ----------------------------------------------
	contentGap: 2,
	innerGap: 0,

	// --- Search ---------------------------------------------------------
	searchFontSize: VybeDropdownTokens.fontSizeSmall,
	searchLineHeight: 15,
	searchPaddingH: 6,
	searchInputPaddingV: 3,
	searchBorderRadius: 3,
	searchContainerGap: 4,
	searchContainerMargin: 2,

	// --- List / scroll --------------------------------------------------
	maxListHeight: 320,
	scrollbarSize: 6,
	listContainerPadding: 2,
	sectionGap: 2,

	// --- Section headers ------------------------------------------------
	sectionHeaderFontSize: 11,
	sectionHeaderLineHeight: 15,
	sectionHeaderOpacity: 0.4,

	// --- Divider --------------------------------------------------------
	dividerOpacity: 0.8,

	// --- Item row -------------------------------------------------------
	itemPaddingH: 6,
	itemPaddingBottom: 2,
	itemContentHeight: 16,
	itemContentGap: 6,

	// --- Icon -----------------------------------------------------------
	iconSize: 14,

	// --- Title ----------------------------------------------------------
	titleFontSize: VybeDropdownTokens.fontSizeSmall,
	titleLineHeight: 17,

	// --- Timestamp ------------------------------------------------------
	timestampFontSize: 11,
	timestampLineHeight: 16,

	// --- Action buttons (edit/delete) -----------------------------------
	editDeleteGap: VybeDropdownTokens.inlineGap,
	actionButtonFontSize: VybeDropdownTokens.fontSizeSmall,
	actionButtonPadding: 2,

	// --- Empty state ----------------------------------------------------
	emptyStatePadding: 20,
	emptyStateFontSize: VybeDropdownTokens.fontSizeSmall,

	// --- Text opacity levels --------------------------------------------
	textSecondaryOpacity: 0.6,
	textTertiaryOpacity: 0.4,

	// --- Timing (ms) ----------------------------------------------------
	pencilClickDelay: 150,
	renameSaveDelay: 300,
	blurSaveDelay: 50,

} as const;
