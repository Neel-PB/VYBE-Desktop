/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Design tokens for Vybe Resources UI (Messages, Changelog, Docs, Blog).
 * Reusable across the resources modal; can be extended for resources-specific UI.
 */

// ─── Typography ─────────────────────────────────────────────────────────────

export const RESOURCES_LABEL_FONT_SIZE_PX = 12;
export const RESOURCES_LABEL_LINE_HEIGHT_PX = 16;
export const RESOURCES_SECTION_TITLE_FONT_SIZE_PX = 12;
export const RESOURCES_SECTION_TITLE_LINE_HEIGHT_PX = 14;
export const RESOURCES_DESCRIPTION_FONT_SIZE_PX = 10;
export const RESOURCES_DESCRIPTION_LINE_HEIGHT_PX = 14;
export const RESOURCES_DESCRIPTION_OPACITY = 0.7;
export const RESOURCES_INPUT_FONT_SIZE_PX = 12;
export const RESOURCES_INPUT_LINE_HEIGHT_PX = 15;

// ─── Colors (CSS values) ─────────────────────────────────────────────────────

export const RESOURCES_COLOR_FOREGROUND = 'var(--vscode-foreground)';
export const RESOURCES_COLOR_DESCRIPTION = 'var(--vscode-descriptionForeground, rgba(128, 128, 128, 0.7))';
export const RESOURCES_COLOR_ACTIVITY_BAR_BG = 'var(--vscode-activityBar-background)';
export const RESOURCES_COLOR_PANEL_BORDER = 'var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.2)))';
export const RESOURCES_COLOR_CARD_BG = 'var(--vscode-activityBar-background)';
export const RESOURCES_COLOR_CARD_BORDER = 'var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.2)))';

// ─── Spacing & layout ───────────────────────────────────────────────────────

export const RESOURCES_CELL_PADDING_PX = 12;
export const RESOURCES_CELL_GAP_PX = 20;
export const RESOURCES_SECTION_LIST_GAP_PX = 12;
export const RESOURCES_TAB_CONTENT_GAP_PX = 16;
export const RESOURCES_SUBSECTION_BORDER_RADIUS_PX = 8;
export const RESOURCES_DIVIDER_INSET_PX = 12;

/** Sidebar nav cell (same pattern as settings). */
export const RESOURCES_SIDEBAR_PADDING_PX = 16;
export const RESOURCES_SIDEBAR_COLUMN_WIDTH_PX = 232;
export const RESOURCES_TAB_CONTENT_MAX_WIDTH_PX = 1041;
