/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Design tokens for VYBE Settings UI. Use these instead of hardcoded values so
 * typography, spacing, and colors stay consistent across sections and tabs.
 */

// ─── Typography ─────────────────────────────────────────────────────────────

/** Cell/section label (e.g. "Codebase Indexing", "Link", "Name"). */
export const SETTINGS_LABEL_FONT_SIZE_PX = 12;
export const SETTINGS_LABEL_LINE_HEIGHT_PX = 16;
/** Section header title (e.g. "Codebase", "Docs"). */
export const SETTINGS_SECTION_TITLE_FONT_SIZE_PX = 12;
export const SETTINGS_SECTION_TITLE_LINE_HEIGHT_PX = 14;
/** Cell description, section header description, progress value/details, doc status text. */
export const SETTINGS_DESCRIPTION_FONT_SIZE_PX = 10;
export const SETTINGS_DESCRIPTION_LINE_HEIGHT_PX = 14;
export const SETTINGS_DESCRIPTION_OPACITY = 0.7;
/** Inline input text (Stage 1 URL, Stage 2 name/entrypoint, rename input). */
export const SETTINGS_INPUT_FONT_SIZE_PX = 12;
export const SETTINGS_INPUT_LINE_HEIGHT_PX = 15;
/** Secondary button label (Add Doc, Add Rule). */
export const SETTINGS_SECONDARY_BUTTON_FONT_SIZE_PX = 12;
export const SETTINGS_SECONDARY_BUTTON_LINE_HEIGHT_PX = 16;
/** Icon-only right button row (Edit, Reindex, Sync, etc.). */
export const SETTINGS_RIGHT_BUTTON_ROW_ICON_SIZE_PX = 14;
/** Status pill / vector indicator text. */
export const SETTINGS_PILL_FONT_SIZE_PX = 12;
export const SETTINGS_PILL_LINE_HEIGHT_PX = 16;
export const SETTINGS_PILL_ICON_SIZE_PX = 13;
/** Confirm/close button group icon and spinner. */
export const SETTINGS_CONFIRM_CLOSE_ICON_SIZE_PX = 14;
/** Rule-type dropdown trigger chevron (match normal button scale). */
export const SETTINGS_RULE_TYPE_CHEVRON_SIZE_PX = 13;
/** Add Doc plus icon. */
export const SETTINGS_ADD_BUTTON_ICON_SIZE_PX = 10;

// ─── Colors (CSS values) ─────────────────────────────────────────────────────

export const SETTINGS_COLOR_FOREGROUND = 'var(--vscode-foreground)';
export const SETTINGS_COLOR_DESCRIPTION = 'var(--vscode-descriptionForeground, rgba(128, 128, 128, 0.7))';
export const SETTINGS_COLOR_ACTIVITY_BAR_BG = 'var(--vscode-activityBar-background)';
export const SETTINGS_COLOR_PANEL_BORDER = 'var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.2)))';
export const SETTINGS_COLOR_PANEL_BORDER_STRONG = 'var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.4)))';
export const SETTINGS_COLOR_INPUT_BG = 'var(--vscode-list-inactiveSelectionBackground, rgba(128, 128, 128, 0.1))';
export const SETTINGS_COLOR_BUTTON_BG = 'var(--vscode-button-background)';
export const SETTINGS_COLOR_BUTTON_FG = 'var(--vscode-button-foreground)';
/** Switch "on" state and progress bar fill – use theme button background. */
export const SETTINGS_COLOR_SWITCH_ON = 'var(--vscode-button-background)';
export const SETTINGS_COLOR_PROGRESS_FILL = 'var(--vscode-button-background)';
/** Plan & Usage: same as subsection list so card and section backgrounds match. */
export const SETTINGS_COLOR_CARD_BG = 'var(--vscode-activityBar-background)';
export const SETTINGS_COLOR_CARD_BORDER = 'var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.2)))';
/** Progress bar track (background). */
export const SETTINGS_COLOR_PROGRESS_TRACK = 'var(--vscode-editor-inactiveSelectionBackground, rgba(128, 128, 128, 0.15))';

// ─── Spacing & layout ───────────────────────────────────────────────────────

/** Doc cell and empty state row min height. */
export const SETTINGS_DOC_CELL_MIN_HEIGHT_PX = 42;
/** Horizontal padding for doc cells and empty state. */
export const SETTINGS_DOC_CELL_PADDING_H_PX = 12;
/** Vertical padding for doc cells and empty state. */
export const SETTINGS_DOC_CELL_PADDING_V_PX = 10;
/** Gap between items in a doc cell row. */
export const SETTINGS_DOC_CELL_GAP_PX = 12;
/** Standard settings cell padding (createCell). */
export const SETTINGS_CELL_PADDING_PX = 12;
/** Gap between leading/trailing in standard cell. */
export const SETTINGS_CELL_GAP_PX = 20;
/** Section header gap between title and trailing. */
export const SETTINGS_SECTION_HEADER_GAP_PX = 20;
/** Gap between section list items. */
export const SETTINGS_SECTION_LIST_GAP_PX = 12;
/** Gap between top-level sections inside a settings tab (e.g. Import Settings, User Rules). */
export const SETTINGS_TAB_CONTENT_GAP_PX = 16;
/** Filter tab bar: gap between tab buttons, padding, font size. */
export const SETTINGS_FILTER_TAB_BAR_GAP_PX = 4;
export const SETTINGS_FILTER_TAB_PADDING_V_PX = 4;
export const SETTINGS_FILTER_TAB_PADDING_H_PX = 10;
export const SETTINGS_FILTER_TAB_FONT_SIZE_PX = 12;
/** Sub-section list border radius. */
export const SETTINGS_SUBSECTION_BORDER_RADIUS_PX = 8;
/** Right button row gap (icons). */
export const SETTINGS_RIGHT_BUTTON_ROW_GAP_PX = 8;
/** Doc cell right group (status dot + description + icons) gap. */
export const SETTINGS_DOC_RIGHT_GROUP_GAP_PX = 8;
/** Divider horizontal inset (left/right from cell edge). */
export const SETTINGS_DIVIDER_INSET_PX = 12;
/** Progress container margin-top below codebase cell content. */
export const SETTINGS_PROGRESS_MARGIN_TOP_PX = 8;
/** Progress bar track height. */
export const SETTINGS_PROGRESS_TRACK_HEIGHT_PX = 6;
/** Progress bar track/fill border radius. */
export const SETTINGS_PROGRESS_TRACK_RADIUS_PX = 3;
export const SETTINGS_PROGRESS_FILL_RADIUS_PX = 4;
/** Pill (status pill, vector indicator) padding and border radius. */
export const SETTINGS_PILL_PADDING_V_PX = 4;
export const SETTINGS_PILL_PADDING_H_PX = 8;
export const SETTINGS_PILL_BORDER_RADIUS_PX = 6;
export const SETTINGS_PILL_GAP_PX = 5;
/** Confirm/close button group: close button fixed size. */
export const SETTINGS_CONFIRM_CLOSE_BUTTON_SIZE_PX = 22;
export const SETTINGS_CONFIRM_CLOSE_ICON_SLOT_SIZE_PX = 14;
/** Secondary (Add Doc) button padding. */
export const SETTINGS_SECONDARY_BUTTON_PADDING_V_PX = 2;
export const SETTINGS_SECONDARY_BUTTON_PADDING_H_PX = 6;
export const SETTINGS_SECONDARY_BUTTON_GAP_PX = 4;
export const SETTINGS_SECONDARY_BUTTON_BORDER_RADIUS_PX = 5;
/** Status dot (doc cell) size. */
export const SETTINGS_STATUS_DOT_SIZE_PX = 4;
/** Input border radius (minimal input, etc.). */
export const SETTINGS_INPUT_BORDER_RADIUS_PX = 3;
/** Confirm button border radius (left side of group). */
export const SETTINGS_CONFIRM_BUTTON_RADIUS_LEFT_PX = 4;
/** Close button border radius (right side of group). */
export const SETTINGS_CLOSE_BUTTON_RADIUS_RIGHT_PX = 4;
/** Name wrapper min width in doc Stage 4 cell. */
export const SETTINGS_DOC_NAME_WRAPPER_MIN_WIDTH_PX = 60;
/** Rename input min width. */
export const SETTINGS_DOC_RENAME_INPUT_MIN_WIDTH_PX = 80;

// ─── Plan & Usage ───────────────────────────────────────────────────────────

export const SETTINGS_PLAN_CARD_MIN_WIDTH_PX = 200;
export const SETTINGS_PLAN_CARD_PADDING_PX = 16;
export const SETTINGS_PLAN_CARD_BORDER_RADIUS_PX = 8;
export const SETTINGS_PLAN_CARD_GAP_PX = 16;
export const SETTINGS_PLAN_LABEL_FONT_SIZE_PX = 11;
export const SETTINGS_PLAN_LABEL_LETTER_SPACING = '0.5px';
export const SETTINGS_PLAN_TITLE_FONT_SIZE_PX = 18;
export const SETTINGS_PLAN_PRICE_FONT_SIZE_PX = 14;
export const SETTINGS_PLAN_RESET_FONT_SIZE_PX = 12;

// ─── Composite style strings (for inline use) ────────────────────────────────

/** Cell/section label: font-size, line-height, color. */
export const SETTINGS_LABEL_STYLE = `font-size: ${SETTINGS_LABEL_FONT_SIZE_PX}px; line-height: ${SETTINGS_LABEL_LINE_HEIGHT_PX}px; color: ${SETTINGS_COLOR_FOREGROUND};`;
/** Description text (cell, section header, progress, doc status): font-size, line-height, opacity. */
export const SETTINGS_DESCRIPTION_FONT_STYLE = `font-size: ${SETTINGS_DESCRIPTION_FONT_SIZE_PX}px; line-height: ${SETTINGS_DESCRIPTION_LINE_HEIGHT_PX}px; opacity: ${SETTINGS_DESCRIPTION_OPACITY};`;
/** Description style + color (full style for description elements). */
export const SETTINGS_DESCRIPTION_STYLE = `${SETTINGS_DESCRIPTION_FONT_STYLE} color: ${SETTINGS_COLOR_DESCRIPTION};`;
/** Section title (header) style. */
export const SETTINGS_SECTION_TITLE_STYLE = `font-size: ${SETTINGS_SECTION_TITLE_FONT_SIZE_PX}px; font-weight: 400; color: ${SETTINGS_COLOR_DESCRIPTION}; letter-spacing: 0.07px; line-height: ${SETTINGS_SECTION_TITLE_LINE_HEIGHT_PX}px;`;
/** Section description (subtitle under section title): same color as title at 0.7 opacity. */
export const SETTINGS_SECTION_DESCRIPTION_STYLE = `font-size: ${SETTINGS_DESCRIPTION_FONT_SIZE_PX}px; line-height: ${SETTINGS_DESCRIPTION_LINE_HEIGHT_PX}px; color: ${SETTINGS_COLOR_DESCRIPTION}; opacity: 0.7;`;
/** Inline label in doc row (Link, Name, Entrypoint, or doc name). */
export const SETTINGS_DOC_ROW_LABEL_STYLE = `font-size: ${SETTINGS_LABEL_FONT_SIZE_PX}px; line-height: ${SETTINGS_INPUT_LINE_HEIGHT_PX}px; color: ${SETTINGS_COLOR_FOREGROUND}; flex-shrink: 0;`;
/** Minimal input (URL, name, entrypoint, rename). */
export const SETTINGS_MINIMAL_INPUT_STYLE = `
	font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
	font-size: ${SETTINGS_INPUT_FONT_SIZE_PX}px;
	line-height: ${SETTINGS_INPUT_LINE_HEIGHT_PX}px;
	border-radius: ${SETTINGS_INPUT_BORDER_RADIUS_PX}px;
	background-color: transparent;
	color: ${SETTINGS_COLOR_FOREGROUND};
	padding: 3px 0;
	flex: 1;
	min-width: 0;
	border: none;
	outline: none;
	box-sizing: border-box;
`;
/** Rule cell textarea (adjustable): seamless like doc cell input, no border/background; only resize handle visible. */
export const SETTINGS_RULE_TEXTAREA_STYLE = `
	font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
	font-size: ${SETTINGS_INPUT_FONT_SIZE_PX}px;
	line-height: ${SETTINGS_INPUT_LINE_HEIGHT_PX}px;
	border-radius: ${SETTINGS_INPUT_BORDER_RADIUS_PX}px;
	background-color: transparent;
	color: ${SETTINGS_COLOR_FOREGROUND};
	padding: 3px 0;
	width: 100%;
	min-width: 0;
	box-sizing: border-box;
	border: none;
	outline: none;
	resize: vertical;
`;
/** Divider between cells (doc list, settings sub-section). */
export const SETTINGS_CELL_DIVIDER_STYLE = `position: absolute; top: 0; left: ${SETTINGS_DIVIDER_INSET_PX}px; right: ${SETTINGS_DIVIDER_INSET_PX}px; height: 1px; background-color: ${SETTINGS_COLOR_PANEL_BORDER}; pointer-events: none;`;
/** Icon-only button (right button row): base style. */
export const SETTINGS_RIGHT_BUTTON_ROW_ICON_BUTTON_STYLE = `cursor: pointer; display: flex; justify-content: center; align-items: center; color: ${SETTINGS_COLOR_FOREGROUND}; border: none; background: transparent;`;
/** Icon-only button: icon span style. */
export const SETTINGS_RIGHT_BUTTON_ROW_ICON_STYLE = `font-size: ${SETTINGS_RIGHT_BUTTON_ROW_ICON_SIZE_PX}px; color: ${SETTINGS_COLOR_FOREGROUND};`;
/** Sub-section list (activity bar background, rounded). */
export const SETTINGS_SUBSECTION_LIST_STYLE = `
	display: flex;
	flex-direction: column;
	background-color: ${SETTINGS_COLOR_ACTIVITY_BAR_BG};
	border-radius: ${SETTINGS_SUBSECTION_BORDER_RADIUS_PX}px;
	gap: 0;
`;
