/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as DOM from '../../../../base/browser/dom.js';
import {
	SETTINGS_SECTION_TITLE_STYLE,
	SETTINGS_SECTION_HEADER_GAP_PX,
	SETTINGS_SECTION_LIST_GAP_PX,
	SETTINGS_SECTION_DESCRIPTION_STYLE,
	SETTINGS_SUBSECTION_LIST_STYLE,
	SETTINGS_CELL_PADDING_PX,
	SETTINGS_CELL_GAP_PX,
	SETTINGS_CELL_DIVIDER_STYLE,
	SETTINGS_LABEL_STYLE,
	SETTINGS_DESCRIPTION_STYLE,
	SETTINGS_COLOR_FOREGROUND,
	SETTINGS_COLOR_DESCRIPTION,
	SETTINGS_LABEL_FONT_SIZE_PX,
	SETTINGS_SECONDARY_BUTTON_FONT_SIZE_PX,
	SETTINGS_SECONDARY_BUTTON_LINE_HEIGHT_PX,
	SETTINGS_SECONDARY_BUTTON_PADDING_V_PX,
	SETTINGS_SECONDARY_BUTTON_PADDING_H_PX,
	SETTINGS_SECONDARY_BUTTON_GAP_PX,
	SETTINGS_SECONDARY_BUTTON_BORDER_RADIUS_PX,
	SETTINGS_ADD_BUTTON_ICON_SIZE_PX,
	SETTINGS_COLOR_ACTIVITY_BAR_BG,
	SETTINGS_DOC_CELL_MIN_HEIGHT_PX,
	SETTINGS_DOC_CELL_PADDING_V_PX,
	SETTINGS_DOC_CELL_PADDING_H_PX,
	SETTINGS_DOC_CELL_GAP_PX,
	SETTINGS_DOC_ROW_LABEL_STYLE,
	SETTINGS_DOC_NAME_WRAPPER_MIN_WIDTH_PX,
	SETTINGS_DOC_RIGHT_GROUP_GAP_PX,
	SETTINGS_RIGHT_BUTTON_ROW_ICON_BUTTON_STYLE,
	SETTINGS_RIGHT_BUTTON_ROW_ICON_STYLE,
	SETTINGS_LABEL_LINE_HEIGHT_PX,
	SETTINGS_CONFIRM_CLOSE_BUTTON_SIZE_PX,
	SETTINGS_CONFIRM_CLOSE_ICON_SIZE_PX,
	SETTINGS_CONFIRM_CLOSE_ICON_SLOT_SIZE_PX,
	SETTINGS_CONFIRM_BUTTON_RADIUS_LEFT_PX,
	SETTINGS_RULE_TYPE_CHEVRON_SIZE_PX,
	SETTINGS_CLOSE_BUTTON_RADIUS_RIGHT_PX,
	SETTINGS_COLOR_BUTTON_BG,
	SETTINGS_COLOR_BUTTON_FG,
	SETTINGS_COLOR_SWITCH_ON,
	SETTINGS_FILTER_TAB_BAR_GAP_PX,
	SETTINGS_FILTER_TAB_PADDING_V_PX,
	SETTINGS_FILTER_TAB_PADDING_H_PX,
	SETTINGS_FILTER_TAB_FONT_SIZE_PX,
	SETTINGS_COLOR_CARD_BG,
	SETTINGS_COLOR_CARD_BORDER,
	SETTINGS_COLOR_PROGRESS_FILL,
	SETTINGS_COLOR_PROGRESS_TRACK,
	SETTINGS_PLAN_CARD_MIN_WIDTH_PX,
	SETTINGS_PLAN_CARD_PADDING_PX,
	SETTINGS_PLAN_CARD_BORDER_RADIUS_PX,
	SETTINGS_PLAN_LABEL_FONT_SIZE_PX,
	SETTINGS_PLAN_LABEL_LETTER_SPACING,
	SETTINGS_PLAN_TITLE_FONT_SIZE_PX,
	SETTINGS_PLAN_PRICE_FONT_SIZE_PX,
	SETTINGS_PLAN_RESET_FONT_SIZE_PX,
	SETTINGS_PROGRESS_TRACK_HEIGHT_PX,
	SETTINGS_PROGRESS_TRACK_RADIUS_PX,
	SETTINGS_PROGRESS_FILL_RADIUS_PX,
} from './vybeSettingsDesignTokens.js';

export interface CellConfig {
	label: string;
	labelIcon?: string;
	description: string;
	action: { type: 'button' | 'switch' | 'dropdown'; label?: string; icon?: string; variant?: 'primary' | 'tertiary'; checked?: boolean } | null;
	hasDivider?: boolean;
}

export interface NumberInputCellConfig {
	label: string;
	description: string;
	numberValue: number;
	dropdownLabel: string;
	hasDivider?: boolean;
}

export interface TagEditorCellConfig {
	label: string;
	description: string;
	placeholder: string;
	initialTags: string[];
	hasDivider?: boolean;
}

export interface SectionOptions {
	description?: string;
	helpHref?: string;
	/** Trailing "Add X" button in section header (Add Doc, Add Rule, Add Command). Same design everywhere; only label and optional dropdown/icon vary. */
	trailingButton?: { label: string; hasDropdown?: boolean; showIcon?: boolean };
}

export interface FilterTabBarTab {
	id: string;
	label: string;
}

/**
 * Reusable filter tab bar for use inside a settings tab when multiple sub-views are needed (e.g. Rules: All / User).
 * Returns the bar element; caller should insert it as first child of tab content, e.g. parent.insertBefore(bar, parent.firstChild).
 */
export function createFilterTabBar(
	tabs: FilterTabBarTab[],
	selectedId: string,
	onSelect: (id: string) => void
): HTMLElement {
	const bar = DOM.$('div.vybe-settings-filter-tab-bar');
	bar.style.cssText = `
		display: flex;
		flex-direction: row;
		gap: ${SETTINGS_FILTER_TAB_BAR_GAP_PX}px;
		flex-shrink: 0;
	`;

	const selectedBg = SETTINGS_COLOR_ACTIVITY_BAR_BG;
	for (const tab of tabs) {
		const btn = DOM.append(bar, DOM.$('button.vybe-settings-filter-tab'));
		btn.setAttribute('type', 'button');
		btn.textContent = tab.label;
		btn.setAttribute('data-filter-tab-id', tab.id);
		const isSelected = tab.id === selectedId;
		btn.style.cssText = `
			padding: ${SETTINGS_FILTER_TAB_PADDING_V_PX}px ${SETTINGS_FILTER_TAB_PADDING_H_PX}px;
			font-size: ${SETTINGS_FILTER_TAB_FONT_SIZE_PX}px;
			line-height: 1.2;
			color: ${SETTINGS_COLOR_FOREGROUND};
			background: ${isSelected ? selectedBg : 'transparent'};
			border: none;
			border-radius: 4px;
			cursor: pointer;
			opacity: ${isSelected ? '1' : '0.8'};
		`;
		if (isSelected) {
			btn.classList.add('vybe-settings-filter-tab-selected');
		}
		btn.addEventListener('click', () => {
			bar.querySelectorAll('.vybe-settings-filter-tab').forEach((b) => {
				b.classList.remove('vybe-settings-filter-tab-selected');
				const el = b as HTMLElement;
				el.style.background = 'transparent';
				el.style.opacity = '0.8';
			});
			btn.classList.add('vybe-settings-filter-tab-selected');
			btn.style.background = selectedBg;
			btn.style.opacity = '1';
			onSelect(tab.id);
		});
	}

	return bar;
}

export function createHelpIcon(parent: HTMLElement, href: string): HTMLElement {
	const helpLink = DOM.append(parent, DOM.$('a.vybe-settings-help-icon'));
	helpLink.setAttribute('target', '_blank');
	helpLink.setAttribute('href', href);
	helpLink.style.cssText = `
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--vscode-descriptionForeground);
		text-decoration: none;
	`;
	const helpIcon = DOM.append(helpLink, DOM.$('span.codicon.codicon-question'));
	helpIcon.style.cssText = 'font-size: 14px;';
	return helpLink;
}

/**
 * Reusable "Add X" button for section headers (Add Doc, Add Rule, Add Command).
 * Same design everywhere; only label and optional dropdown/icon vary.
 * Uses design tokens and inline styles only (no Tailwind) so it works in workbench.
 */
export function createSectionHeaderAddButton(
	parent: HTMLElement,
	label: string,
	options: { hasDropdown?: boolean; showIcon?: boolean } = {}
): HTMLElement {
	const { hasDropdown = false, showIcon = true } = options;
	const button = DOM.append(parent, DOM.$('div.vybe-settings-section-header-add-button'));
	button.setAttribute('data-click-ready', 'true');
	button.setAttribute('role', 'button');
	button.setAttribute('tabindex', '0');
	button.setAttribute('aria-label', label);
	button.title = label;
	if (hasDropdown) {
		button.id = 'solid-dropdown-button-8abbbg55erc';
		button.classList.add('add-rule-dropdown');
	}
	button.style.cssText = `
		user-select: none;
		flex-shrink: 0;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		gap: ${SETTINGS_SECONDARY_BUTTON_GAP_PX}px;
		padding: ${SETTINGS_SECONDARY_BUTTON_PADDING_V_PX}px ${SETTINGS_SECONDARY_BUTTON_PADDING_H_PX}px;
		border-radius: ${SETTINGS_SECONDARY_BUTTON_BORDER_RADIUS_PX}px;
		border: none;
		cursor: pointer;
		font-size: ${SETTINGS_SECONDARY_BUTTON_FONT_SIZE_PX}px;
		line-height: ${SETTINGS_SECONDARY_BUTTON_LINE_HEIGHT_PX}px;
		color: ${SETTINGS_COLOR_FOREGROUND};
		background-color: ${SETTINGS_COLOR_ACTIVITY_BAR_BG};
		box-sizing: border-box;
		white-space: nowrap;
	`;
	if (showIcon) {
		const iconContainer = DOM.append(button, DOM.$('div'));
		iconContainer.style.cssText = 'display: flex; align-items: center; justify-content: center; flex-shrink: 0;';
		const plusIcon = DOM.append(iconContainer, DOM.$('span.codicon.codicon-plus'));
		plusIcon.style.cssText = `font-size: ${SETTINGS_ADD_BUTTON_ICON_SIZE_PX}px; opacity: 0.7; overflow: visible;`;
	}
	const labelSpan = DOM.append(button, DOM.$('span'));
	labelSpan.textContent = label;
	labelSpan.style.cssText = 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;';
	return button;
}

/** @deprecated Use createSectionHeaderAddButton for section headers. Kept for callers that pass (parent, label, hasDropdown). */
export function createSecondaryButton(parent: HTMLElement, label: string, hasDropdown: boolean = false): HTMLElement {
	return createSectionHeaderAddButton(parent, label, { hasDropdown, showIcon: true });
}

/**
 * Reusable Confirm + Close (codicon clear) button group. Same design as doc cell Stage 1/2.
 * Left: confirm button (e.g. "Confirm" or "Done"); right: close icon. Caller wires click handlers.
 */
export function createConfirmCloseButtonGroup(
	parent: HTMLElement,
	options?: { confirmLabel?: string }
): { confirmBtn: HTMLButtonElement; closeBtn: HTMLButtonElement; closeIconSlot: HTMLElement } {
	const wrap = DOM.append(parent, DOM.$('div'));
	wrap.style.cssText = 'display: flex; flex-shrink: 0; margin-left: auto; gap: 0; align-items: stretch;';

	const confirmBtn = DOM.append(wrap, DOM.$('button')) as HTMLButtonElement;
	confirmBtn.textContent = options?.confirmLabel ?? 'Confirm';
	confirmBtn.type = 'button';
	confirmBtn.style.cssText = `
		display: flex; align-items: center; justify-content: center; gap: 4px;
		border-radius: ${SETTINGS_CONFIRM_BUTTON_RADIUS_LEFT_PX}px 0 0 ${SETTINGS_CONFIRM_BUTTON_RADIUS_LEFT_PX}px; padding: 4px; font-size: ${SETTINGS_LABEL_FONT_SIZE_PX}px; cursor: pointer;
		border: none; border-right: 1px solid ${SETTINGS_COLOR_ACTIVITY_BAR_BG}; outline: none;
		background-color: ${SETTINGS_COLOR_BUTTON_BG};
		color: ${SETTINGS_COLOR_BUTTON_FG};
	`;

	const closeBtn = DOM.append(wrap, DOM.$('button')) as HTMLButtonElement;
	closeBtn.type = 'button';
	closeBtn.setAttribute('aria-label', 'Close');
	closeBtn.style.cssText = `
		display: flex; align-items: center; justify-content: center;
		border-radius: 0 ${SETTINGS_CLOSE_BUTTON_RADIUS_RIGHT_PX}px ${SETTINGS_CLOSE_BUTTON_RADIUS_RIGHT_PX}px 0; padding: 4px; cursor: pointer;
		border: none; outline: none;
		background-color: ${SETTINGS_COLOR_BUTTON_BG};
		color: ${SETTINGS_COLOR_BUTTON_FG};
		width: ${SETTINGS_CONFIRM_CLOSE_BUTTON_SIZE_PX}px; min-width: ${SETTINGS_CONFIRM_CLOSE_BUTTON_SIZE_PX}px; height: ${SETTINGS_CONFIRM_CLOSE_BUTTON_SIZE_PX}px; min-height: ${SETTINGS_CONFIRM_CLOSE_BUTTON_SIZE_PX}px;
		box-sizing: border-box;
	`;
	const closeIconSlot = DOM.append(closeBtn, DOM.$('span'));
	closeIconSlot.style.cssText = `display: flex; align-items: center; justify-content: center; width: ${SETTINGS_CONFIRM_CLOSE_ICON_SLOT_SIZE_PX}px; height: ${SETTINGS_CONFIRM_CLOSE_ICON_SLOT_SIZE_PX}px;`;
	const closeIcon = DOM.append(closeIconSlot, DOM.$('span.codicon.codicon-close'));
	closeIcon.style.cssText = `font-size: ${SETTINGS_CONFIRM_CLOSE_ICON_SIZE_PX}px; color: ${SETTINGS_COLOR_BUTTON_FG};`;

	return { confirmBtn, closeBtn, closeIconSlot };
}

/** Shared list row cell layout: same as doc index Stage 4. Optional divider; name on left; right group for badge/description/buttons. If parent is null, cell is not appended (caller inserts it). */
export function createSettingsListRowCell(
	parent: HTMLElement | null,
	options: { showDividerAbove?: boolean; name: string; cellClass?: string }
): { cell: HTMLElement; nameWrapper: HTMLElement; nameLabel: HTMLElement; rightGroup: HTMLElement } {
	const cell = parent
		? DOM.append(parent, DOM.$(`div.vybe-settings-list-row-cell${options.cellClass ? '.' + options.cellClass : ''}`))
		: DOM.$(`div.vybe-settings-list-row-cell${options.cellClass ? '.' + options.cellClass : ''}`) as HTMLElement;
	cell.style.cssText = `
		display: flex;
		align-items: center;
		gap: ${SETTINGS_DOC_CELL_GAP_PX}px;
		padding: ${SETTINGS_DOC_CELL_PADDING_V_PX}px ${SETTINGS_DOC_CELL_PADDING_H_PX}px;
		min-height: ${SETTINGS_DOC_CELL_MIN_HEIGHT_PX}px;
		box-sizing: border-box;
		position: relative;
		align-self: stretch;
	`;
	if (options.showDividerAbove) {
		const divider = DOM.append(cell, DOM.$('div.vybe-settings-cell-divider'));
		divider.style.cssText = SETTINGS_CELL_DIVIDER_STYLE;
	}
	const nameWrapper = DOM.append(cell, DOM.$('div.vybe-settings-list-row-cell-name-wrapper'));
	nameWrapper.style.cssText = `flex-shrink: 0; min-width: ${SETTINGS_DOC_NAME_WRAPPER_MIN_WIDTH_PX}px;`;
	const nameLabel = DOM.append(nameWrapper, DOM.$('span.vybe-settings-list-row-cell-name'));
	nameLabel.textContent = options.name;
	nameLabel.style.cssText = SETTINGS_DOC_ROW_LABEL_STYLE;
	const rightGroup = DOM.append(cell, DOM.$('div.vybe-settings-list-row-cell-right-group'));
	rightGroup.style.cssText = `display: flex; align-items: center; gap: ${SETTINGS_DOC_RIGHT_GROUP_GAP_PX}px; flex-shrink: 0; margin-left: auto;`;
	return { cell, nameWrapper, nameLabel, rightGroup };
}

/** Icon button for the right button row (Edit, Delete, etc.). */
export function createSettingsListRowIconButton(parent: HTMLElement, iconCodicon: string, title: string): HTMLElement {
	const btn = DOM.append(parent, DOM.$('div.vybe-settings-list-row-icon-btn'));
	btn.title = title;
	btn.style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_BUTTON_STYLE;
	const icon = DOM.append(btn, DOM.$(`span.codicon.${iconCodicon}`));
	icon.style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_STYLE;
	return btn;
}

/**
 * Dropdown trigger button: selected option text + chevron-down (composer model-dropdown style).
 * Returns the button and setLabel so caller can update the displayed option.
 */
export function createRuleTypeDropdownTrigger(
	parent: HTMLElement,
	selectedLabel: string
): { button: HTMLElement; labelEl: HTMLElement; setLabel: (label: string) => void } {
	const button = DOM.append(parent, DOM.$('div.vybe-settings-rule-type-dropdown'));
	button.setAttribute('role', 'button');
	button.setAttribute('tabindex', '0');
	button.setAttribute('data-click-ready', 'true');
	// Normal button font size and 13px chevron for consistency with Done/Confirm
	button.style.cssText = `
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: ${SETTINGS_SECONDARY_BUTTON_FONT_SIZE_PX}px;
		line-height: ${SETTINGS_SECONDARY_BUTTON_LINE_HEIGHT_PX}px;
		color: ${SETTINGS_COLOR_FOREGROUND};
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0 ${SETTINGS_SECONDARY_BUTTON_PADDING_H_PX}px;
		min-height: 20px;
		box-sizing: border-box;
		white-space: nowrap;
		flex-shrink: 0;
	`;
	const labelEl = DOM.append(button, DOM.$('span.vybe-settings-rule-type-dropdown-label'));
	labelEl.textContent = selectedLabel;
	labelEl.style.cssText = 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0;';
	const chevron = DOM.append(button, DOM.$('span.codicon.codicon-chevron-down'));
	chevron.style.cssText = `font-size: ${SETTINGS_RULE_TYPE_CHEVRON_SIZE_PX}px; opacity: 0.7; flex-shrink: 0; overflow: visible;`;
	function setLabel(label: string): void {
		labelEl.textContent = label;
	}
	return { button, labelEl, setLabel };
}

/**
 * Section header structure (Cursor-style): title-row, then content-row (description + trailing buttons).
 * Works the same whether trailing button is present or not; content-row always exists when title is set.
 */
export function createSection(parent: HTMLElement, title: string | null, options?: SectionOptions): HTMLElement {
	const section = DOM.append(parent, DOM.$('.vybe-settings-section'));
	section.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

	if (title) {
		const sectionHeader = DOM.append(section, DOM.$('.vybe-settings-section-header'));
		sectionHeader.style.cssText = 'display: flex; flex-direction: column; gap: 2px; padding: 0;';

		// Row 1: title + optional help icon
		const titleRow = DOM.append(sectionHeader, DOM.$('.vybe-settings-section-header-title-row'));
		titleRow.style.cssText = 'display: flex; align-items: center; gap: 4px;';

		const sectionTitle = DOM.append(titleRow, DOM.$('.vybe-settings-section-header-title'));
		sectionTitle.textContent = title;
		sectionTitle.style.cssText = SETTINGS_SECTION_TITLE_STYLE;

		if (options?.helpHref) {
			createHelpIcon(titleRow, options.helpHref);
		}

		// Row 2: description (flex: 1) + optional trailing buttons – same row; both aligned top so buttons stay up when description wraps
		const contentRow = DOM.append(sectionHeader, DOM.$('.vybe-settings-section-header-content-row'));
		contentRow.style.cssText = `display: flex; align-items: flex-start; align-self: flex-start; gap: ${SETTINGS_SECTION_HEADER_GAP_PX}px; padding: 0; width: 100%;`;

		const descriptionWrap = DOM.append(contentRow, DOM.$('div'));
		descriptionWrap.style.cssText = 'flex: 1; min-width: 0; align-self: flex-start;';
		if (options?.description) {
			const sectionDesc = DOM.append(descriptionWrap, DOM.$('.vybe-settings-section-header-description'));
			sectionDesc.textContent = options.description;
			sectionDesc.style.cssText = SETTINGS_SECTION_DESCRIPTION_STYLE;
		}

		const trailingItems = DOM.append(contentRow, DOM.$('.vybe-settings-section-header-trailing-items'));
		trailingItems.style.cssText = 'flex-shrink: 0; display: flex; gap: 8px; align-self: flex-start;';
		if (options?.trailingButton) {
			createSectionHeaderAddButton(trailingItems, options.trailingButton.label, {
				hasDropdown: options.trailingButton.hasDropdown ?? false,
				showIcon: options.trailingButton.showIcon !== false
			});
		}
	}

	const sectionList = DOM.append(section, DOM.$('.vybe-settings-section-list'));
	sectionList.style.cssText = `display: flex; flex-direction: column; gap: ${SETTINGS_SECTION_LIST_GAP_PX}px;`;

	return section;
}

export function createCell(parent: HTMLElement, config: CellConfig): HTMLElement {
	let subSectionList = parent.querySelector('.vybe-settings-sub-section-list') as HTMLElement | null;
	if (!subSectionList) {
		subSectionList = DOM.append(parent, DOM.$('.vybe-settings-sub-section-list'));
		subSectionList.style.cssText = SETTINGS_SUBSECTION_LIST_STYLE;
	}

	const cell = DOM.append(subSectionList, DOM.$('.vybe-settings-cell.vybe-settings-cell-align-top'));
	cell.style.cssText = `
		display: flex;
		align-items: center;
		gap: ${SETTINGS_CELL_GAP_PX}px;
		padding: ${SETTINGS_CELL_PADDING_PX}px;
		position: relative;
	`;

	if (config.hasDivider) {
		const divider = DOM.append(cell, DOM.$('.vybe-settings-cell-divider'));
		divider.style.cssText = SETTINGS_CELL_DIVIDER_STYLE;
	}

	const leadingItems = DOM.append(cell, DOM.$('.vybe-settings-cell-leading-items'));
	leadingItems.style.cssText = 'display: flex; flex-direction: column; gap: 1px; flex: 1;';

	const labelContainer = DOM.append(leadingItems, DOM.$('p.vybe-settings-cell-label'));
	labelContainer.style.cssText = `margin: 0; ${SETTINGS_LABEL_STYLE} display: flex; align-items: center; gap: 4px;`;

	if (config.labelIcon) {
		const labelIcon = DOM.append(labelContainer, DOM.$(`span.codicon.${config.labelIcon}`));
		labelIcon.style.cssText = 'font-size: 16px;';
	}

	const labelText = document.createTextNode(config.label);
	labelContainer.appendChild(labelText);

	const description = DOM.append(leadingItems, DOM.$('div.vybe-settings-cell-description'));
	description.textContent = config.description;
	description.style.cssText = SETTINGS_DESCRIPTION_STYLE;

	const trailingItems = DOM.append(cell, DOM.$('.vybe-settings-cell-trailing-items'));
	trailingItems.style.cssText = 'flex-shrink: 0; display: flex; align-items: center; justify-content: flex-end;';

	if (config.action) {
		if (config.action.type === 'button') {
			const button = createButton(config.action.label || '', config.action.variant || 'tertiary', config.action.icon);
			trailingItems.appendChild(button);
		} else if (config.action.type === 'switch') {
			const switchContainer = DOM.append(trailingItems, DOM.$('.vybe-settings-cell-switch-container'));
			switchContainer.style.cssText = 'display: flex; align-items: center; justify-content: flex-end; flex-shrink: 0; cursor: pointer;';

			const switchOuter = DOM.append(switchContainer, DOM.$('.solid-switch'));
			const isChecked = config.action.checked ?? false;
			switchOuter.style.cssText = `
				width: 30px;
				height: 18px;
				border-radius: 18px;
				position: relative;
				display: flex;
				align-items: center;
				cursor: pointer;
				transition: all 300ms;
				overflow: hidden;
				background: ${isChecked ? SETTINGS_COLOR_SWITCH_ON : 'rgba(128, 128, 128, 0.3)'};
			`;
			switchOuter.setAttribute('data-checked', String(isChecked));

			// Background fill (animated)
			const bgFill = DOM.append(switchOuter, DOM.$('div'));
			bgFill.className = 'solid-switch-bg-fill';
			bgFill.style.cssText = `
				border-radius: 18px;
				position: absolute;
				top: 0;
				bottom: 0;
				height: 100%;
				left: 0;
				background: ${SETTINGS_COLOR_SWITCH_ON};
				opacity: ${isChecked ? '1' : '0'};
				width: ${isChecked ? '100%' : '0%'};
				transition: ${isChecked ? '300ms' : '150ms'} cubic-bezier(0.4, 0, 0.2, 1);
			`;

			// Knob (thumb)
			const knob = DOM.append(switchOuter, DOM.$('div'));
			knob.className = 'solid-switch-knob';
			knob.style.cssText = `
				width: 14px;
				height: 14px;
				border-radius: 50%;
				position: absolute;
				background: white;
				transition: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
				left: ${isChecked ? 'calc(100% - 16px)' : '2px'};
			`;
		} else if (config.action.type === 'dropdown') {
			const dropdown = DOM.append(trailingItems, DOM.$('.solid-dropdown'));
			dropdown.style.cssText = 'position: relative;';

			const toggle = DOM.append(dropdown, DOM.$('button.solid-dropdown-toggle'));
			toggle.style.cssText = `
				display: flex;
				align-items: center;
				gap: 10px;
				padding: 3px 6px;
				border: 1px solid var(--vscode-input-border, rgba(128, 128, 128, 0.3));
				border-radius: 6px;
				background: transparent;
				cursor: pointer;
				font-size: 12px;
				color: var(--vscode-foreground);
			`;

			const toggleLabel = DOM.append(toggle, DOM.$('div.solid-dropdown-toggle-label'));
			toggleLabel.textContent = config.action.label || '';
			toggleLabel.style.cssText = 'flex: 1; text-align: left;';

			const chevron = DOM.append(toggle, DOM.$('span.codicon.codicon-chevron-down'));
			chevron.style.cssText = 'font-size: 16px;';
		}
	}

	return cell;
}

export function createButton(label: string, variant: 'primary' | 'tertiary' = 'tertiary', icon?: string): HTMLElement {
	const button = DOM.$(`div.vybe-button.vybe-button-${variant}.vybe-button-${variant}-clickable.vybe-button-small`);
	button.style.cssText = `
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		padding: 3px 6px;
		border-radius: 5px;
		cursor: pointer;
		font-size: ${SETTINGS_SECONDARY_BUTTON_FONT_SIZE_PX}px;
		line-height: ${SETTINGS_SECONDARY_BUTTON_LINE_HEIGHT_PX}px;
		${variant === 'primary'
			? 'background-color: var(--vscode-button-background, rgb(60, 124, 171)); color: var(--vscode-button-foreground, rgb(252, 252, 252));'
			: `border: 1px solid var(--vscode-input-border, rgba(128, 128, 128, 0.3)); color: ${SETTINGS_COLOR_FOREGROUND}; background: transparent;`
		}
	`;

	if (icon) {
		const iconEl = DOM.append(button, DOM.$(`span.codicon.${icon}`));
		iconEl.style.cssText = `font-size: ${SETTINGS_LABEL_FONT_SIZE_PX}px;`;
	}

	button.appendChild(document.createTextNode(label));

	return button;
}

export function createEmptyState(parent: HTMLElement, title: string, description: string, buttonLabel: string): HTMLElement {
	const emptyWrapper = DOM.append(parent, DOM.$('div.empty-state-wrapper'));
	emptyWrapper.style.cssText = 'display: flex; align-items: center; justify-content: center; padding: 24px;';

	const emptyContainer = DOM.append(emptyWrapper, DOM.$('div.empty-state-container'));
	emptyContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center;';

	const emptyContent = DOM.append(emptyContainer, DOM.$('div.empty-state-content'));
	emptyContent.style.cssText = 'display: flex; flex-direction: column; gap: 4px; align-items: center;';

	const emptyTitle = DOM.append(emptyContent, DOM.$('p.empty-state-title'));
	emptyTitle.textContent = title;
	emptyTitle.style.cssText = `
		font-size: 14px;
		font-weight: 500;
		color: var(--vscode-foreground);
		margin: 0;
	`;

	const emptyDesc = DOM.append(emptyContent, DOM.$('p.empty-state-description'));
	emptyDesc.textContent = description;
	emptyDesc.style.cssText = `
		font-size: 12px;
		color: ${SETTINGS_COLOR_DESCRIPTION};
		margin: 0;
	`;

	const emptyButton = createButton(buttonLabel, 'tertiary');
	emptyButton.style.cssText += 'user-select: none; flex-shrink: 0; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;';
	DOM.append(emptyContainer, emptyButton);

	return emptyWrapper;
}

/**
 * Reusable list empty state (same design as doc indexing: one row, title only, no button/description).
 * Use for User Rules, Project Rules, Project Commands, User Commands, Docs, etc.
 * addSpacer: when true, adds an invisible spacer so the row aligns with rows that have trailing buttons (e.g. Docs).
 */
export function createSettingsListEmptyState(
	parent: HTMLElement,
	title: string,
	options?: { addSpacer?: boolean }
): HTMLElement {
	const emptyStateWrapper = DOM.append(parent, DOM.$('div.vybe-settings-list-empty-state'));
	emptyStateWrapper.style.cssText = `
		display: flex;
		align-items: center;
		gap: ${SETTINGS_DOC_CELL_GAP_PX}px;
		padding: ${SETTINGS_DOC_CELL_PADDING_V_PX}px ${SETTINGS_DOC_CELL_PADDING_H_PX}px;
		min-height: ${SETTINGS_DOC_CELL_MIN_HEIGHT_PX}px;
		box-sizing: border-box;
		position: relative;
		align-self: stretch;
	`;

	const emptyStateTitle = DOM.append(emptyStateWrapper, DOM.$('span.vybe-settings-list-empty-state-title'));
	emptyStateTitle.textContent = title;
	emptyStateTitle.style.cssText = `
		font-size: ${SETTINGS_LABEL_FONT_SIZE_PX}px;
		line-height: ${SETTINGS_LABEL_LINE_HEIGHT_PX}px;
		color: ${SETTINGS_COLOR_FOREGROUND};
		user-select: none;
		flex-shrink: 0;
	`;

	if (options?.addSpacer) {
		const spacer = DOM.append(emptyStateWrapper, DOM.$('div'));
		spacer.style.cssText = `flex-shrink: 0; margin-left: auto; width: 0; height: ${SETTINGS_CONFIRM_CLOSE_BUTTON_SIZE_PX}px; visibility: hidden;`;
	}

	return emptyStateWrapper;
}

export function createCellWithNumberInput(parent: HTMLElement, config: NumberInputCellConfig): HTMLElement {
	let subSectionList = parent.querySelector('.vybe-settings-sub-section-list') as HTMLElement | null;
	if (!subSectionList) {
		subSectionList = DOM.append(parent, DOM.$('.vybe-settings-sub-section-list'));
		subSectionList.style.cssText = SETTINGS_SUBSECTION_LIST_STYLE;
	}

	const cell = DOM.append(subSectionList, DOM.$('.vybe-settings-cell.vybe-settings-cell-align-top'));
	cell.style.cssText = `
		display: flex;
		align-items: center;
		gap: ${SETTINGS_CELL_GAP_PX}px;
		padding: ${SETTINGS_CELL_PADDING_PX}px;
		position: relative;
	`;

	if (config.hasDivider) {
		const divider = DOM.append(cell, DOM.$('.vybe-settings-cell-divider'));
		divider.style.cssText = SETTINGS_CELL_DIVIDER_STYLE;
	}

	const leadingItems = DOM.append(cell, DOM.$('.vybe-settings-cell-leading-items'));
	leadingItems.style.cssText = 'display: flex; flex-direction: column; gap: 1px; flex: 1;';

	const labelContainer = DOM.append(leadingItems, DOM.$('p.vybe-settings-cell-label'));
	labelContainer.textContent = config.label;
	labelContainer.style.cssText = `margin: 0; ${SETTINGS_LABEL_STYLE}`;

	const description = DOM.append(leadingItems, DOM.$('div.vybe-settings-cell-description'));
	description.textContent = config.description;
	description.style.cssText = SETTINGS_DESCRIPTION_STYLE;

	const trailingItems = DOM.append(cell, DOM.$('.vybe-settings-cell-trailing-items'));
	trailingItems.style.cssText = 'flex-shrink: 0; display: flex; align-items: center; justify-content: flex-end; gap: 8px;';

	// Number input
	const numberInput = DOM.append(trailingItems, DOM.$('input'));
	(numberInput as HTMLInputElement).type = 'number';
	(numberInput as HTMLInputElement).min = '1';
	(numberInput as HTMLInputElement).value = config.numberValue.toString();
	numberInput.style.cssText = `
		width: 68px;
		padding: 4px 6px;
		box-sizing: border-box;
		font-size: 12px;
		border: 1px solid var(--vscode-input-border);
		background: var(--vscode-input-background);
		color: var(--vscode-input-foreground);
		border-radius: 6px;
		outline: none;
	`;

	// Dropdown
	const dropdown = DOM.append(trailingItems, DOM.$('.solid-dropdown'));
	dropdown.style.cssText = 'position: relative;';

	const toggle = DOM.append(dropdown, DOM.$('button.solid-dropdown-toggle'));
	toggle.style.cssText = `
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 3px 6px;
		border: 1px solid var(--vscode-input-border, rgba(128, 128, 128, 0.3));
		border-radius: 6px;
		background: transparent;
		cursor: pointer;
		font-size: 12px;
		color: var(--vscode-foreground);
	`;

	const toggleLabel = DOM.append(toggle, DOM.$('div.solid-dropdown-toggle-label'));
	toggleLabel.textContent = config.dropdownLabel;
	toggleLabel.style.cssText = 'flex: 1; text-align: left;';

	const chevron = DOM.append(toggle, DOM.$('span.codicon.codicon-chevron-down'));
	chevron.style.cssText = 'font-size: 16px;';

	return cell;
}

export function createCellWithTagEditor(parent: HTMLElement, config: TagEditorCellConfig): HTMLElement {
	let subSectionList = parent.querySelector('.vybe-settings-sub-section-list') as HTMLElement | null;
	if (!subSectionList) {
		subSectionList = DOM.append(parent, DOM.$('.vybe-settings-sub-section-list'));
		subSectionList.style.cssText = SETTINGS_SUBSECTION_LIST_STYLE;
	}

	const cell = DOM.append(subSectionList, DOM.$('.vybe-settings-cell.vybe-settings-cell-align-top'));
	cell.style.cssText = `
		display: flex;
		align-items: center;
		gap: ${SETTINGS_CELL_GAP_PX}px;
		padding: ${SETTINGS_CELL_PADDING_PX}px;
		position: relative;
	`;

	if (config.hasDivider) {
		const divider = DOM.append(cell, DOM.$('.vybe-settings-cell-divider'));
		divider.style.cssText = SETTINGS_CELL_DIVIDER_STYLE;
	}

	const leadingItems = DOM.append(cell, DOM.$('.vybe-settings-cell-leading-items'));
	leadingItems.style.cssText = 'display: flex; flex-direction: column; gap: 1px; flex: 1;';

	const labelContainer = DOM.append(leadingItems, DOM.$('p.vybe-settings-cell-label'));
	labelContainer.textContent = config.label;
	labelContainer.style.cssText = `margin: 0; ${SETTINGS_LABEL_STYLE}`;

	const description = DOM.append(leadingItems, DOM.$('div.vybe-settings-cell-description'));
	description.textContent = config.description;
	description.style.cssText = SETTINGS_DESCRIPTION_STYLE;

	const trailingItems = DOM.append(cell, DOM.$('.vybe-settings-cell-trailing-items'));
	trailingItems.style.cssText = 'flex-shrink: 0; display: flex; align-items: center; justify-content: flex-end;';

	// Tag editor
	const tagEditor = DOM.append(trailingItems, DOM.$('.tag-editor'));
	tagEditor.style.cssText = 'display: flex;';

	const elementList = DOM.append(tagEditor, DOM.$('.element-list'));
	elementList.style.cssText = 'display: flex; gap: 4px; align-items: center; flex-wrap: wrap;';

	// Add initial tags
	for (const tag of config.initialTags) {
		const element = DOM.append(elementList, DOM.$('.element'));
		element.style.cssText = `
			display: flex;
			gap: 4px;
			align-items: center;
			max-width: 240px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		`;

		const tagSpan = DOM.append(element, DOM.$('span'));
		tagSpan.textContent = tag;
		tagSpan.style.cssText = 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;';

		const removeButton = DOM.append(element, DOM.$('button.tag-editor-remove-button.codicon.codicon-x'));
		removeButton.style.cssText = 'cursor: pointer; background: transparent; border: none; padding: 0;';
	}

	// Input
	const input = DOM.append(elementList, DOM.$('input'));
	(input as HTMLInputElement).placeholder = config.placeholder;
	input.style.cssText = `
		width: ${config.placeholder ? '100%' : 'auto'};
		background-color: transparent;
		border-radius: 2px;
		border: none;
		outline: none;
		padding: 2px 6px;
		font-size: 12px;
		color: var(--vscode-input-foreground);
		line-height: 1.4;
		box-sizing: border-box;
		height: 20px;
		min-width: ${config.placeholder ? '60px' : '30px'};
		flex: ${config.placeholder ? '1 1 120px' : '1 0 30px'};
	`;

	return cell;
}

// ─── Plan & Usage ───────────────────────────────────────────────────────────

export interface PlanCardConfig {
	planLabel: string;
	planName: string;
	price: string;
	resetText: string;
	buttonLabel: string;
}

/** Plan & Usage: single plan card (Current Plan). */
export function createPlanCard(parent: HTMLElement, config: PlanCardConfig): HTMLElement {
	const card = DOM.append(parent, DOM.$('.vybe-settings-plan-card'));
	card.style.cssText = `
		flex: 1;
		min-width: ${SETTINGS_PLAN_CARD_MIN_WIDTH_PX}px;
		padding: ${SETTINGS_PLAN_CARD_PADDING_PX}px;
		border-radius: ${SETTINGS_PLAN_CARD_BORDER_RADIUS_PX}px;
		background-color: ${SETTINGS_COLOR_CARD_BG};
		border: 1px solid ${SETTINGS_COLOR_CARD_BORDER};
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	`;

	const label = DOM.append(card, DOM.$('.vybe-settings-plan-card-label'));
	label.textContent = config.planLabel;
	label.style.cssText = `
		font-size: ${SETTINGS_PLAN_LABEL_FONT_SIZE_PX}px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: ${SETTINGS_PLAN_LABEL_LETTER_SPACING};
		color: ${SETTINGS_COLOR_DESCRIPTION};
		margin-bottom: 8px;
	`;

	const nameRow = DOM.append(card, DOM.$('.vybe-settings-plan-card-name-row'));
	nameRow.style.cssText = `display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px;`;

	const name = DOM.append(nameRow, DOM.$('.vybe-settings-plan-card-name'));
	name.textContent = config.planName;
	name.style.cssText = `font-size: ${SETTINGS_PLAN_TITLE_FONT_SIZE_PX}px; font-weight: 600; color: ${SETTINGS_COLOR_FOREGROUND};`;

	const price = DOM.append(nameRow, DOM.$('.vybe-settings-plan-card-price'));
	price.textContent = config.price;
	price.style.cssText = `font-size: ${SETTINGS_PLAN_PRICE_FONT_SIZE_PX}px; color: ${SETTINGS_COLOR_DESCRIPTION};`;

	const reset = DOM.append(card, DOM.$('.vybe-settings-plan-card-reset'));
	reset.textContent = config.resetText;
	reset.style.cssText = `
		font-size: ${SETTINGS_PLAN_RESET_FONT_SIZE_PX}px;
		color: ${SETTINGS_COLOR_DESCRIPTION};
		margin-top: 4px;
		flex-grow: 1;
	`;

	const btnRow = DOM.append(card, DOM.$('.vybe-settings-plan-card-actions'));
	btnRow.style.cssText = 'margin-top: 12px; display: flex;';

	const btn = createButton(config.buttonLabel, 'tertiary');
	btn.style.cssText += 'user-select: none; flex-shrink: 0; padding: 2px 8px;';
	btnRow.appendChild(btn);

	return card;
}

export interface UsageProgressCellConfig {
	label: string;
	percentage: number;
	progressPct: number;
	detailText: string;
	/** When set, detail row is clickable and expands to show these breakdowns. */
	autoComposerPct?: number;
	autoComposerDescription?: string;
	apiPct?: number;
	apiDescription?: string;
}

/** Plan & Usage: usage cell with label + percentage, progress bar, and detail row. */
export function createUsageProgressCell(parent: HTMLElement, config: UsageProgressCellConfig): HTMLElement {
	const subSectionList = parent.querySelector('.vybe-settings-sub-section-list') as HTMLElement | null;
	const list = subSectionList ?? DOM.append(parent, DOM.$('.vybe-settings-sub-section-list'));
	if (!subSectionList) {
		list.style.cssText = SETTINGS_SUBSECTION_LIST_STYLE;
	}

	const cell = DOM.append(list, DOM.$('.vybe-settings-cell.vybe-settings-cell-align-top'));
	cell.setAttribute('tabindex', '-1');
	cell.style.cssText = `
		display: flex;
		align-items: flex-start;
		gap: ${SETTINGS_CELL_GAP_PX}px;
		padding: ${SETTINGS_CELL_PADDING_PX}px;
		position: relative;
		outline: none;
	`;

	const leading = DOM.append(cell, DOM.$('.vybe-settings-cell-leading-items'));
	leading.style.cssText = 'display: flex; flex-direction: column; gap: 1px; flex: 1; min-width: 0;';

	const labelRow = DOM.append(leading, DOM.$('p.vybe-settings-cell-label'));
	labelRow.style.cssText = `margin: 0; ${SETTINGS_LABEL_STYLE} display: flex; align-items: center; gap: 4px;`;

	const labelSpan = document.createTextNode(config.label);
	labelRow.appendChild(labelSpan);

	const pctSpan = DOM.append(labelRow, DOM.$('span.vybe-settings-usage-pct'));
	pctSpan.textContent = `${Math.round(config.percentage)}%`;
	pctSpan.style.cssText = `font-size: ${SETTINGS_LABEL_FONT_SIZE_PX}px; font-weight: 500; color: ${SETTINGS_COLOR_FOREGROUND}; margin-left: auto;`;

	const desc = DOM.append(leading, DOM.$('div.vybe-settings-cell-description'));
	desc.style.cssText = `display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: 8px;`;

	const track = DOM.append(desc, DOM.$('.vybe-settings-usage-progress-track'));
	track.style.cssText = `
		width: 100%;
		height: ${SETTINGS_PROGRESS_TRACK_HEIGHT_PX}px;
		background-color: ${SETTINGS_COLOR_PROGRESS_TRACK};
		border-radius: ${SETTINGS_PROGRESS_TRACK_RADIUS_PX}px;
		overflow: hidden;
	`;

	const fill = DOM.append(track, DOM.$('.vybe-settings-usage-progress-fill'));
	fill.style.cssText = `
		height: 100%;
		width: ${config.progressPct}%;
		min-width: 2px;
		background-color: ${SETTINGS_COLOR_PROGRESS_FILL};
		border-radius: ${SETTINGS_PROGRESS_FILL_RADIUS_PX}px;
		transition: width 0.3s ease-out;
	`;

	const detailRow = DOM.append(desc, DOM.$('.vybe-settings-usage-detail-row'));
	detailRow.style.cssText = `
		display: flex;
		align-items: center;
		cursor: pointer;
		padding: 4px 0;
		border-radius: 4px;
		transition: background-color 0.15s;
		font-size: 11px;
		color: ${SETTINGS_COLOR_DESCRIPTION};
		margin-top: 4px;
	`;

	const detailText = DOM.append(detailRow, DOM.$('span'));
	detailText.textContent = config.detailText;
	const chevron = DOM.append(detailRow, DOM.$('span.codicon.codicon-chevron-down'));
	chevron.style.cssText = `font-size: 12px; color: ${SETTINGS_COLOR_DESCRIPTION}; margin-left: 8px; opacity: 0.7;`;

	const hasExpandable = config.autoComposerPct !== undefined || config.apiPct !== undefined;
	let expanded = false;

	if (hasExpandable && (config.autoComposerPct !== undefined || config.apiPct !== undefined)) {
		const expandPanel = DOM.append(desc, DOM.$('.vybe-settings-usage-expand-panel'));
		expandPanel.style.cssText = `
			display: none;
			flex-direction: column;
			gap: 12px;
			padding: 12px;
			margin-top: 4px;
			background-color: ${SETTINGS_COLOR_CARD_BG};
			border-radius: 6px;
			border: 1px solid ${SETTINGS_COLOR_CARD_BORDER};
			box-sizing: border-box;
		`;

		function addBreakdownRow(
			parent: HTMLElement,
			label: string,
			pct: number,
			description: string
		): void {
			const row = DOM.append(parent, DOM.$('.vybe-settings-usage-breakdown-row'));
			row.style.cssText = `display: flex; flex-direction: column; gap: 4px;`;

			const labelRow = DOM.append(row, DOM.$('div'));
			labelRow.style.cssText = `
				display: flex;
				justify-content: space-between;
				font-size: 11px;
				color: ${SETTINGS_COLOR_DESCRIPTION};
			`;
			const labelSpan = DOM.append(labelRow, DOM.$('span'));
			labelSpan.textContent = label;
			const pctSpan = DOM.append(labelRow, DOM.$('span'));
			pctSpan.textContent = `${Math.round(pct)}%`;
			pctSpan.style.cssText = `font-weight: 500; color: ${SETTINGS_COLOR_FOREGROUND};`;

			const track = DOM.append(row, DOM.$('div'));
			track.style.cssText = `
				width: 100%;
				height: ${SETTINGS_PROGRESS_TRACK_HEIGHT_PX}px;
				background-color: ${SETTINGS_COLOR_PROGRESS_TRACK};
				border-radius: ${SETTINGS_PROGRESS_TRACK_RADIUS_PX}px;
				overflow: hidden;
			`;
			const fill = DOM.append(track, DOM.$('div'));
			fill.style.cssText = `
				height: 100%;
				width: ${pct}%;
				min-width: 2px;
				background-color: ${SETTINGS_COLOR_PROGRESS_FILL};
				border-radius: ${SETTINGS_PROGRESS_FILL_RADIUS_PX}px;
				transition: width 0.3s ease-out;
			`;

			const descEl = DOM.append(row, DOM.$('div'));
			descEl.textContent = description;
			descEl.style.cssText = `
				font-size: 11px;
				color: ${SETTINGS_COLOR_DESCRIPTION};
				opacity: 0.8;
				line-height: 1.4;
				margin-top: 4px;
			`;
		}

		if (config.autoComposerPct !== undefined) {
			addBreakdownRow(
				expandPanel,
				'Auto + Composer',
				config.autoComposerPct,
				config.autoComposerDescription ?? 'Consumed by Auto and Composer models. Additional usage consumes API quota.'
			);
		}
		if (config.apiPct !== undefined) {
			addBreakdownRow(
				expandPanel,
				'API',
				config.apiPct,
				config.apiDescription ?? 'Consumed by other models. Your plan includes at least $400 of API usage.'
			);
		}

		function toggle(): void {
			expanded = !expanded;
			expandPanel.style.display = expanded ? 'flex' : 'none';
			chevron.classList.remove(expanded ? 'codicon-chevron-down' : 'codicon-chevron-up');
			chevron.classList.add(expanded ? 'codicon-chevron-up' : 'codicon-chevron-down');
		}

		detailRow.addEventListener('click', toggle);
	}

	return cell;
}
