/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Design tokens for VYBE Chat UI. Use these instead of hardcoded values so
 * typography, spacing, and colors stay consistent across chat components.
 *
 * Pattern follows vybeSettingsDesignTokens.ts.
 */

// --- Typography -------------------------------------------------------------

export const CHAT_LABEL_FONT_SIZE_PX = 12;
export const CHAT_LABEL_LINE_HEIGHT_PX = 16;
export const CHAT_INPUT_FONT_SIZE_PX = 13;
export const CHAT_INPUT_LINE_HEIGHT_PX = 18;
export const CHAT_MESSAGE_FONT_SIZE_PX = 13;
export const CHAT_MESSAGE_LINE_HEIGHT_PX = 20;
export const CHAT_PLACEHOLDER_FONT_SIZE_PX = 13;
export const CHAT_PLACEHOLDER_LINE_HEIGHT_PX = 18;
export const CHAT_TIMESTAMP_FONT_SIZE_PX = 11;

// --- Colors (CSS values - all use var() to VS Code theme tokens) ------------

export const CHAT_COLOR_FOREGROUND = 'var(--vscode-foreground)';
export const CHAT_COLOR_DESCRIPTION = 'var(--vscode-descriptionForeground)';
export const CHAT_COLOR_INPUT_BG = 'var(--vscode-input-background)';
export const CHAT_COLOR_INPUT_FG = 'var(--vscode-input-foreground)';
export const CHAT_COLOR_INPUT_BORDER = 'var(--vscode-input-border, transparent)';
export const CHAT_COLOR_INPUT_PLACEHOLDER = 'var(--vscode-input-placeholderForeground)';
export const CHAT_COLOR_BORDER = 'var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.2)))';
export const CHAT_COLOR_BACKGROUND = 'var(--vscode-editor-background)';
export const CHAT_COLOR_SIDEBAR_BG = 'var(--vscode-sideBar-background)';
export const CHAT_COLOR_BUTTON_BG = 'var(--vscode-button-background)';
export const CHAT_COLOR_BUTTON_FG = 'var(--vscode-button-foreground)';
export const CHAT_COLOR_BUTTON_HOVER_BG = 'var(--vscode-button-hoverBackground)';
export const CHAT_COLOR_LINK = 'var(--vscode-textLink-foreground)';
export const CHAT_COLOR_ICON_FOREGROUND = 'var(--vscode-icon-foreground)';

// --- Spacing & Layout -------------------------------------------------------

export const CHAT_BODY_PADDING_PX = 16;
export const CHAT_MESSAGE_PADDING_H_PX = 16;
export const CHAT_MESSAGE_PADDING_V_PX = 12;
export const CHAT_MESSAGE_GAP_PX = 8;
export const CHAT_COMPOSER_PADDING_H_PX = 12;
export const CHAT_COMPOSER_PADDING_V_PX = 8;

// --- Composer ---------------------------------------------------------------

export const CHAT_COMPOSER_MAX_WIDTH_PX = 840;
export const CHAT_COMPOSER_OUTER_PADDING_H_PX = 10;
export const CHAT_COMPOSER_BORDER_RADIUS_PX = 6;
export const CHAT_COMPOSER_TEXT_MIN_HEIGHT_PX = 100;
export const CHAT_COMPOSER_TEXT_MAX_HEIGHT_PX = 340;
export const CHAT_COMPOSER_INPUT_LINE_HEIGHT = 1.5;

// --- Composer Bottom Bar ----------------------------------------------------

export const CHAT_BOTTOM_BAR_HEIGHT_PX = 28;
export const CHAT_BOTTOM_BAR_MARGIN_TOP_PX = 9;
export const CHAT_PILL_FONT_SIZE_PX = 12;
export const CHAT_MODE_PILL_PADDING_H_PX = 8;
export const CHAT_MODE_PILL_PADDING_V_PX = 2;
export const CHAT_MODE_PILL_BORDER_RADIUS_PX = 24;
export const CHAT_MODEL_PILL_PADDING_H_PX = 6;
export const CHAT_MODEL_PILL_BORDER_RADIUS_PX = 8;
export const CHAT_ACTION_BUTTON_SIZE_PX = 20;
export const CHAT_SEND_BUTTON_DISABLED_OPACITY = 0.35;

// --- Past Chats -------------------------------------------------------------

export const CHAT_PAST_SECTION_PADDING_PX = 12.8;
export const CHAT_PAST_HEADER_OPACITY = 0.8;
export const CHAT_PAST_ITEM_PADDING_V_PX = 3.2;
export const CHAT_PAST_ITEM_PADDING_H_PX = 6.4;
export const CHAT_PAST_ITEM_BORDER_RADIUS_PX = 4;
export const CHAT_PAST_ITEM_GAP_PX = 2.4;
export const CHAT_PAST_TIMESTAMP_MARGIN_LEFT_PX = 9.6;
export const CHAT_PAST_MAX_ITEMS = 3;

// --- Composite style strings (for inline use) ------------------------------

export const CHAT_BODY_STYLE = `display: flex; flex-direction: column; height: 100%;`;
