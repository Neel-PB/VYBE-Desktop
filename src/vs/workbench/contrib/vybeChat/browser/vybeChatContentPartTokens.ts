/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * VYBE Chat Content Part Design Tokens
 *
 * Single source of truth for typography, colors, spacing, scroll, and animation
 * used by all content parts (tool, thinking, code block, phase indicator, etc.).
 */

// allow-any-unicode-next-line
// ─── Typography ─────────────────────────────────────────────────────────────

export const HEADER_FONT_SIZE_PX = 12;
export const HEADER_LINE_HEIGHT_PX = 14;
export const HEADER_ROW_LINE_HEIGHT_PX = 18.2;
export const LIST_ITEM_TITLE_FONT_SIZE_PX = 12;
export const LIST_ITEM_SUBTITLE_FONT_SIZE_PX = 10;
export const ATTEMPTED_MESSAGE_FONT_SIZE_PX = 12;
export const EXPANDED_LABEL_FONT_SIZE_PX = 12;
export const BADGE_FONT_SIZE_PX = 11;
export const BADGE_SMALL_FONT_SIZE_PX = 10;
export const LINT_LOCATION_FONT_SIZE_PX = 10;
export const CHEVRON_FONT_SIZE_PX = 12;
export const LIST_ITEM_CONTENT_GAP_PX = 4;

// allow-any-unicode-next-line
// ─── Colors (CSS variable references) ───────────────────────────────────────

export const COLOR_FOREGROUND = "var(--vscode-foreground)";
export const COLOR_DESCRIPTION = "var(--vscode-descriptionForeground)";
export const COLOR_LINK = "var(--vscode-textLink-foreground)";
export const COLOR_EDITOR_FG = "var(--vscode-editor-foreground)";
export const COLOR_EDITOR_BG = "var(--vscode-editor-background)";
export const COLOR_BADGE_BG = "var(--vscode-badge-background)";
export const COLOR_BADGE_FG = "var(--vscode-badge-foreground)";
export const COLOR_ERROR_FG = "var(--vscode-errorForeground)";
export const COLOR_WARNING_FG = "var(--vscode-editorWarning-foreground)";
export const COLOR_INFO_FG = "var(--vscode-editorInfo-foreground)";
export const COLOR_TARGET_HOVER = "var(--vscode-textLink-foreground)";
export const COLOR_LIST_ITEM_HOVER_BG =
	"var(--vscode-titleBar-activeBackground)";
export const EDITOR_FONT_FAMILY = "var(--vscode-editor-font-family)";

// allow-any-unicode-next-line
// ─── Opacities ──────────────────────────────────────────────────────────────

export const VERB_OPACITY = 0.7;
export const TARGET_OPACITY = 0.36;
export const LINE_RANGE_OPACITY = 0.4;
export const LIST_SUBTITLE_OPACITY = 0.8;
export const ATTEMPTED_MESSAGE_OPACITY = 0.7;
export const CHEVRON_OPACITY_VISIBLE = 0.36;
export const LIST_ITEM_DISABLED_OPACITY = 0.6;
export const WEB_BODY_OPACITY = 0.8;
export const BADGE_SUBTLE_OPACITY = 0.8;

// allow-any-unicode-next-line
// ─── Spacing: header ────────────────────────────────────────────────────────

export const HEADER_PADDING_V_PX = 2;
export const HEADER_GAP_PX = 4;
export const HEADER_TARGET_MARGIN_LEFT_PX = 4;
export const LINE_RANGE_MARGIN_LEFT_PX = 4;
export const COLLAPSIBLE_GAP_PX = 2;

// allow-any-unicode-next-line
// ─── Spacing: expansion ─────────────────────────────────────────────────────

export const EXPANDED_MAX_HEIGHT_PX = 126;
export const THINKING_EXPANDED_MAX_HEIGHT_PX = 126;
export const CHILDREN_MARGIN_TOP_PX = 4;
export const CHILDREN_MARGIN_BOTTOM_PX = 4;
export const CHILDREN_PADDING_LEFT_PX = 6;

// allow-any-unicode-next-line
// ─── Spacing: web card ──────────────────────────────────────────────────────

export const WEB_CARD_PADDING_H_PX = 16;
export const WEB_CARD_GAP_PX = 8;
export const WEB_CARD_BORDER_RADIUS_PX = 4;
export const WEB_QUERY_LABEL_MARGIN_BOTTOM_PX = 4;
export const WEB_LINKS_LIST_INDENT_PX = 16;
export const WEB_LINKS_LABEL_MARGIN_BOTTOM_PX = 2;
export const WEB_BODY_MARGIN_TOP_PX = 6;

// allow-any-unicode-next-line
// ─── Spacing: list items ────────────────────────────────────────────────────

export const LIST_ITEM_PADDING_TOP_PX = 3;
export const LIST_ITEM_PADDING_RIGHT_PX = 6;
export const LIST_ITEM_PADDING_BOTTOM_PX = 3;
export const LIST_ITEM_PADDING_LEFT_PX = 16;
export const LIST_ITEM_BORDER_RADIUS_PX = 6;
export const LIST_ITEM_TITLE_MAX_WIDTH_PCT = 85;
export const BADGE_PADDING_V_PX = 2;
export const BADGE_PADDING_H_PX = 4;
export const BADGE_MARGIN_RIGHT_PX = 4;
export const BADGE_BORDER_RADIUS_PX = 4;
export const BADGE_SMALL_PADDING_V_PX = 1;
export const BADGE_SMALL_PADDING_H_PX = 4;
export const CONTEXT_LIST_ITEM_PADDING_TOP_PX = 3;
export const CONTEXT_LIST_ITEM_PADDING_RIGHT_PX = 6;
export const CONTEXT_LIST_ITEM_PADDING_BOTTOM_PX = 3;
export const CONTEXT_LIST_ITEM_PADDING_LEFT_PX = 6;
export const LIST_ITEM_ROW_HEIGHT_PX = 25;
export const LIST_MAX_VISIBLE_ITEMS = 5;

// allow-any-unicode-next-line
// ─── Spacing: lint items ────────────────────────────────────────────────────

export const LINT_PATH_ROW_PADDING_TOP_PX = 2;
export const LINT_PATH_ROW_PADDING_RIGHT_PX = 6;
export const LINT_PATH_ROW_PADDING_BOTTOM_PX = 2;
export const LINT_PATH_ROW_PADDING_LEFT_PX = 0;
export const LINT_DIAG_ROW_PADDING_TOP_PX = 2;
export const LINT_DIAG_ROW_PADDING_RIGHT_PX = 6;
export const LINT_DIAG_ROW_PADDING_BOTTOM_PX = 2;
export const LINT_DIAG_ROW_PADDING_LEFT_PX = 16;
export const LINT_ICON_SIZE_PX = 14;
export const LINT_ICON_MARGIN_RIGHT_PX = 4;
export const LINT_ICON_CELL_MIN_WIDTH_PX = 20;

// allow-any-unicode-next-line
// ─── Scroll & shell ─────────────────────────────────────────────────────────

export const SCROLL_VERTICAL_SCROLLBAR_SIZE_PX = 6;
export const SCROLL_HORIZONTAL_SCROLLBAR_SIZE_PX = 0;

// allow-any-unicode-next-line
// ─── Icons / chevron ────────────────────────────────────────────────────────

export const CHEVRON_SIZE_PX = 12;
export const CHEVRON_LINE_HEIGHT_PX = 12;
export const CHEVRON_CONTAINER_SIZE_PX = 16;
export const CHEVRON_CONTAINER_MARGIN_LEFT_PX = 2;
export const LIST_ICON_SIZE_PX = 16;
export const LIST_ICON_HEIGHT_PX = 14;
export const LIST_ICON_FONT_SIZE_PX = 18;
export const LIST_ICON_LINE_HEIGHT_PX = 18.2;

// allow-any-unicode-next-line
// ─── File header (code block reference, text edit, terminal) ────────────────

export const FILE_HEADER_HEIGHT_PX = 28;
export const FILE_HEADER_PADDING_H_PX = 8;
export const FILE_HEADER_GAP_PX = 6;
export const FILE_HEADER_ICON_SIZE_PX = 16;
export const FILE_HEADER_ICON_WRAPPER_HEIGHT_PX = 18;
export const FILE_HEADER_FILENAME_FONT_SIZE_PX = 12;
export const FILE_HEADER_FILENAME_LINE_HEIGHT_PX = 14.4;
export const FILE_HEADER_LINE_RANGE_FONT_SIZE_PX = 13;
export const FILE_HEADER_LINE_RANGE_LINE_HEIGHT_PX = 19.5;
export const FILE_HEADER_LINE_RANGE_MARGIN_LEFT_PX = 8;
export const FILE_HEADER_LINE_RANGE_OPACITY = 0.5;

// allow-any-unicode-next-line
// ─── Code block ─────────────────────────────────────────────────────────────

export const CODEBLOCK_MARGIN_V_PX = 4;
export const CODEBLOCK_BORDER_RADIUS_PX = 8;
export const CODEBLOCK_CONTENT_PADDING_H_PX = 6;
export const CODEBLOCK_EDITOR_LINE_HEIGHT_PX = 18;
export const CODEBLOCK_EDITOR_FONT_SIZE_PX = 12;
export const CODEBLOCK_EDITOR_PADDING_V_PX = 6;
export const CODEBLOCK_COPY_BUTTON_SIZE_PX = 20;
export const CODEBLOCK_COPY_ICON_SIZE_PX = 12;
export const CODEBLOCK_COPY_OFFSET_PX = 6;

// allow-any-unicode-next-line
// ─── Transitions & animation ────────────────────────────────────────────────

export const HEADER_TRANSITION_OPACITY = "0.1s ease-in";
export const TARGET_HOVER_TRANSITION = "0.2s ease";
export const CHEVRON_TRANSITION =
	"transform 0.15s ease-in-out, opacity 0.2s ease-in-out, width 0.2s ease-in-out";
export const LINT_CHEVRON_OPACITY_TRANSITION = "opacity 0.15s ease";
export const VERB_SHINE_ANIMATION_DURATION_MS = 2000;
export const VERB_SHINE_CSS_VAR_BRIGHT = "var(--vybe-shine-bright)";

// allow-any-unicode-next-line
// ─── Tool Verb Definitions ──────────────────────────────────────────────────

/**
 * Three-state verb system for tool headers.
 * - loading: present participle with shimmer animation ("Reading", "Grepping")
 * - completed: past tense, static ("Read", "Grepped")
 * - attempted: noun form for failed tools ("Read attempted", "Grep attempted")
 */
export interface IToolVerbs {
	loading: string;
	completed: string;
	attempted: string;
}

export const TOOL_VERBS: Record<string, IToolVerbs> = {
	read: { loading: "Reading", completed: "Read", attempted: "Read" },
	grep: { loading: "Grepping", completed: "Grepped", attempted: "Grep" },
	list: { loading: "Listing", completed: "Listed", attempted: "List" },
	glob_search: { loading: "Listing", completed: "Listed", attempted: "List" },
	search: {
		loading: "Searching file",
		completed: "Searched file",
		attempted: "Search file",
	},
	search_codebase: {
		loading: "Searching codebase",
		completed: "Searched codebase",
		attempted: "Searching codebase",
	},
	search_web: {
		loading: "Searching web",
		completed: "Searched web",
		attempted: "Search web",
	},
	fetch_url: {
		loading: "Fetching URL",
		completed: "Fetched URL",
		attempted: "Fetch URL",
	},
	edit: { loading: "Editing", completed: "Edited", attempted: "Edit file" },
	read_lints: {
		loading: "Reading lints",
		completed: "Found",
		attempted: "Read lints",
	},
	todos: {
		loading: "Updating to-do",
		completed: "Updated to-do",
		attempted: "Update to-do",
	},
	check_todos: {
		loading: "Checking to-do",
		completed: "Checked to-do",
		attempted: "Check to-do",
	},
	start_todo: {
		loading: "Starting to-do",
		completed: "Started to-do",
		attempted: "Start to-do",
	},
	complete_todo: {
		loading: "Completing to-do",
		completed: "Completed to-do",
		attempted: "Complete to-do",
	},
	cancelled_todo: {
		loading: "Cancelling to-do",
		completed: "Cancelled to-do",
		attempted: "Cancel to-do",
	},
	diagram: {
		loading: "Loading diagram",
		completed: "Loaded diagram",
		attempted: "Load diagram",
	},
	thinking: { loading: "Thinking", completed: "Thought", attempted: "Thought" },
};

/**
 * Tools that have NO expanded area and NO chevron when completed successfully.
 * They are header-only (verb + target, clickable target opens file).
 */
export const HEADER_ONLY_TOOLS = new Set<string>(["read"]);

/**
 * Get the verb text for a tool given its state.
 */
export function getToolVerb(
	toolType: string,
	state: "loading" | "completed" | "attempted",
): string {
	const verbs = TOOL_VERBS[toolType];
	if (!verbs) {
		const fallback = toolType.charAt(0).toUpperCase() + toolType.slice(1);
		return state === "loading"
			? fallback + "ing"
			: state === "completed"
				? fallback + "ed"
				: fallback;
	}
	return verbs[state];
}
