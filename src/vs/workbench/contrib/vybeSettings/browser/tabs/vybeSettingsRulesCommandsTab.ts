/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as DOM from '../../../../../base/browser/dom.js';
import { addDisposableListener, EventType } from '../../../../../base/browser/dom.js';
import { createSection, createSettingsListEmptyState, createFilterTabBar, createConfirmCloseButtonGroup, createSettingsListRowCell, createSettingsListRowIconButton, createRuleTypeDropdownTrigger } from '../vybeSettingsComponents.js';
import {
	SETTINGS_MINIMAL_INPUT_STYLE,
	SETTINGS_RULE_TEXTAREA_STYLE,
	SETTINGS_DOC_CELL_PADDING_V_PX,
	SETTINGS_DOC_CELL_PADDING_H_PX,
	SETTINGS_DOC_CELL_GAP_PX,
	SETTINGS_RIGHT_BUTTON_ROW_GAP_PX,
	SETTINGS_CELL_DIVIDER_STYLE,
	SETTINGS_COLOR_BUTTON_BG,
	SETTINGS_COLOR_BUTTON_FG,
	SETTINGS_COLOR_SWITCH_ON,
	SETTINGS_LABEL_FONT_SIZE_PX,
	SETTINGS_CONFIRM_BUTTON_RADIUS_LEFT_PX,
} from '../vybeSettingsDesignTokens.js';

const SUB_SECTION_LIST_STYLE = `
		display: flex;
		flex-direction: column;
		background-color: var(--vscode-activityBar-background);
		border-radius: 8px;
		gap: 0;
	`;

/** Section only visible when filter is "all". Hidden for user, workspace, repo. */
const SUBAGENTS_SECTION_DATA_ATTR = 'data-rules-filter-section';

const RULES_SECTION_ID = 'rules';

interface UserRule {
	name: string;
	content: string;
	enabled: boolean;
}

interface ProjectRule {
	name: string;
	content: string;
	ruleType: string;
	enabled: boolean;
}

/** Toggle switch for rule row (enable/disable). Same visual as createCell switch. Returns switch outer element; caller wires click and updates data-checked / bgFill / knob left. */
function createRuleRowToggle(parent: HTMLElement, checked: boolean): { switchOuter: HTMLElement; setChecked: (on: boolean) => void } {
	const switchOuter = DOM.append(parent, DOM.$('div.vybe-rule-row-toggle'));
	switchOuter.style.cssText = `
		width: 30px; height: 18px; border-radius: 18px; position: relative; display: flex; align-items: center; cursor: pointer;
		transition: all 300ms; overflow: hidden; flex-shrink: 0;
		background: ${checked ? SETTINGS_COLOR_SWITCH_ON : 'rgba(128, 128, 128, 0.3)'};
	`;
	switchOuter.setAttribute('data-checked', String(checked));
	const bgFill = DOM.append(switchOuter, DOM.$('div'));
	bgFill.style.cssText = `border-radius: 18px; position: absolute; top: 0; bottom: 0; height: 100%; left: 0; background: ${SETTINGS_COLOR_SWITCH_ON};
		opacity: ${checked ? '1' : '0'}; width: ${checked ? '100%' : '0%'}; transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);`;
	const knob = DOM.append(switchOuter, DOM.$('div'));
	knob.style.cssText = `width: 14px; height: 14px; border-radius: 50%; position: absolute; background: white;
		transition: 300ms cubic-bezier(0.34, 1.56, 0.64, 1); left: ${checked ? 'calc(100% - 16px)' : '2px'};`;
	function setChecked(on: boolean): void {
		switchOuter.setAttribute('data-checked', String(on));
		switchOuter.style.background = on ? SETTINGS_COLOR_SWITCH_ON : 'rgba(128, 128, 128, 0.3)';
		bgFill.style.opacity = on ? '1' : '0';
		bgFill.style.width = on ? '100%' : '0%';
		knob.style.left = on ? 'calc(100% - 16px)' : '2px';
	}
	return { switchOuter, setChecked };
}

/**
 * Finalized user rule row: name (left), right group = toggle + pencil + delete. Same layout as doc index Stage 4.
 */
function createFinalizedUserRuleRow(
	parent: HTMLElement,
	rule: UserRule,
	ruleIndex: number,
	options: {
		showDividerAbove: boolean;
		onEdit: () => void;
		onDelete: () => void;
		onToggle: (enabled: boolean) => void;
	}
): HTMLElement {
	const { cell, rightGroup } = createSettingsListRowCell(parent, {
		showDividerAbove: options.showDividerAbove,
		name: rule.name,
		cellClass: 'vybe-settings-user-rule-row'
	});
	cell.setAttribute('data-rule-index', String(ruleIndex));

	const { switchOuter, setChecked } = createRuleRowToggle(rightGroup, rule.enabled);
	addDisposableListener(switchOuter, EventType.CLICK, () => {
		const next = !rule.enabled;
		rule.enabled = next;
		setChecked(next);
		options.onToggle(next);
	});

	const rightButtonsRow = DOM.append(rightGroup, DOM.$('div.vybe-settings-list-row-right-buttons'));
	rightButtonsRow.style.cssText = `display: flex; gap: ${SETTINGS_RIGHT_BUTTON_ROW_GAP_PX}px; align-items: center; flex-shrink: 0;`;
	const editBtn = createSettingsListRowIconButton(rightButtonsRow, 'codicon-pencil', 'Edit');
	const deleteBtn = createSettingsListRowIconButton(rightButtonsRow, 'codicon-trash', 'Delete');
	addDisposableListener(editBtn, EventType.CLICK, options.onEdit);
	addDisposableListener(deleteBtn, EventType.CLICK, options.onDelete);

	return cell;
}

function addSectionWithEmptyState(
	parent: HTMLElement,
	title: string,
	description: string,
	trailingLabel: string,
	emptyTitle: string,
	sectionDataAttr?: string,
	sectionId?: string
): HTMLElement {
	const section = createSection(parent, title, {
		description,
		trailingButton: { label: trailingLabel }
	});
	if (sectionDataAttr) {
		section.setAttribute(SUBAGENTS_SECTION_DATA_ATTR, sectionDataAttr);
	}
	if (sectionId) {
		section.setAttribute('data-section-id', sectionId);
	}
	const sectionList = section.querySelector('.vybe-settings-section-list') as HTMLElement;
	sectionList.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';
	const subSection = DOM.append(sectionList, DOM.$('.vybe-settings-sub-section'));
	const subSectionList = DOM.append(subSection, DOM.$('.vybe-settings-sub-section-list'));
	subSectionList.style.cssText = SUB_SECTION_LIST_STYLE;
	createSettingsListEmptyState(subSectionList, emptyTitle);
	return section;
}

/**
 * New user rule cell: name (single input) + rule content (adjustable textarea) + footer Cancel / Done.
 * Matches RULES_CELL_SPEC: structure from Cursor outerHTML, styling from Vybe tokens.
 */
function createNewUserRuleCell(
	parent: HTMLElement,
	options: {
		onCancel: () => void;
		/** Called with name, content, and the cell to replace (caller replaces with finalized row or removes). */
		onDone: (name: string, content: string, cellToReplace: HTMLElement) => void;
		initialName?: string;
		initialContent?: string;
		/** When true, show divider at top (same as finalized rows after the first). */
		showDividerAbove?: boolean;
	}
): HTMLElement {
	const cell = DOM.append(parent, DOM.$('div.vybe-new-user-rule-cell'));
	cell.style.cssText = `
		display: flex;
		flex-direction: column;
		gap: ${SETTINGS_DOC_CELL_GAP_PX}px;
		padding: ${SETTINGS_DOC_CELL_PADDING_V_PX}px ${SETTINGS_DOC_CELL_PADDING_H_PX}px;
		box-sizing: border-box;
		position: relative;
		align-self: stretch;
	`;

	if (options.showDividerAbove) {
		const divider = DOM.append(cell, DOM.$('div.vybe-settings-cell-divider'));
		divider.style.cssText = SETTINGS_CELL_DIVIDER_STYLE;
	}

	const nameInput = DOM.append(cell, DOM.$('input.vybe-new-user-rule-input')) as HTMLInputElement;
	nameInput.type = 'text';
	nameInput.placeholder = 'Rule name';
	nameInput.setAttribute('aria-label', 'Rule name');
	nameInput.value = options.initialName ?? '';
	nameInput.style.cssText = SETTINGS_MINIMAL_INPUT_STYLE;

	const textarea = DOM.append(cell, DOM.$('textarea.vybe-new-user-rule-input')) as HTMLTextAreaElement;
	textarea.placeholder = 'Style request, response language, tone...';
	textarea.rows = 4;
	textarea.value = options.initialContent ?? '';
	textarea.setAttribute('aria-label', 'Rule content');
	textarea.style.cssText = SETTINGS_RULE_TEXTAREA_STYLE;
	// Lock min-height to initial 4-row height so user can grow but not shrink below it
	requestAnimationFrame(() => {
		const initialHeight = textarea.offsetHeight;
		const fallbackHeight = 4 * 15 + 6; // 4 rows * line-height 15px + padding 3px*2
		textarea.style.minHeight = `${initialHeight > 0 ? initialHeight : fallbackHeight}px`;
	});

	const footer = DOM.append(cell, DOM.$('div.vybe-user-rule-cell-footer'));
	footer.style.cssText = 'display: flex; align-items: center; justify-content: flex-end; flex-shrink: 0;';

	const { confirmBtn: doneBtn, closeBtn } = createConfirmCloseButtonGroup(footer, { confirmLabel: 'Done' });

	function updateDoneState(): void {
		const name = nameInput.value.trim();
		const content = textarea.value.trim();
		const valid = name.length > 0 && content.length > 0;
		doneBtn.style.opacity = valid ? '1' : '0.5';
		doneBtn.style.pointerEvents = valid ? 'auto' : 'none';
		doneBtn.setAttribute('data-disabled', valid ? 'false' : 'true');
	}
	updateDoneState();

	addDisposableListener(nameInput, EventType.INPUT, updateDoneState);
	addDisposableListener(textarea, EventType.INPUT, updateDoneState);

	addDisposableListener(closeBtn, EventType.CLICK, () => {
		cell.remove();
		options.onCancel();
	});

	addDisposableListener(doneBtn, EventType.CLICK, () => {
		if (nameInput.value.trim().length === 0 || textarea.value.trim().length === 0) {
			return;
		}
		options.onDone(nameInput.value.trim(), textarea.value.trim(), cell);
	});

	return cell;
}

const PROJECT_RULE_TYPE_OPTIONS = ['Always applied', 'Apply to Specific Files & Folders'] as const;
const PROJECT_RULE_TYPE_DEFAULT = PROJECT_RULE_TYPE_OPTIONS[0];

/**
 * New project rule cell: name + textarea + footer with left [type dropdown, Create with Agent] and right [Done, Close].
 * Dropdown trigger shows selected option text + chevron-down (composer style).
 */
function createNewProjectRuleCell(
	parent: HTMLElement,
	options: {
		onCancel: () => void;
		onDone: (name: string, content: string, ruleType: string, cellToReplace: HTMLElement) => void;
		onCreateWithAgent?: () => void;
		initialName?: string;
		initialContent?: string;
		initialRuleType?: string;
		showDividerAbove?: boolean;
	}
): HTMLElement {
	const cell = DOM.append(parent, DOM.$('div.vybe-new-project-rule-cell'));
	cell.style.cssText = `
		display: flex;
		flex-direction: column;
		gap: ${SETTINGS_DOC_CELL_GAP_PX}px;
		padding: ${SETTINGS_DOC_CELL_PADDING_V_PX}px ${SETTINGS_DOC_CELL_PADDING_H_PX}px;
		box-sizing: border-box;
		position: relative;
		align-self: stretch;
	`;

	if (options.showDividerAbove) {
		const divider = DOM.append(cell, DOM.$('div.vybe-settings-cell-divider'));
		divider.style.cssText = SETTINGS_CELL_DIVIDER_STYLE;
	}

	const nameInput = DOM.append(cell, DOM.$('input.vybe-new-project-rule-input')) as HTMLInputElement;
	nameInput.type = 'text';
	nameInput.placeholder = 'Rule name';
	nameInput.setAttribute('aria-label', 'Rule name');
	nameInput.value = options.initialName ?? '';
	nameInput.style.cssText = SETTINGS_MINIMAL_INPUT_STYLE;

	const textarea = DOM.append(cell, DOM.$('textarea.vybe-new-project-rule-input')) as HTMLTextAreaElement;
	textarea.placeholder = 'Style request, response language, tone...';
	textarea.rows = 4;
	textarea.value = options.initialContent ?? '';
	textarea.setAttribute('aria-label', 'Rule content');
	textarea.style.cssText = SETTINGS_RULE_TEXTAREA_STYLE;
	requestAnimationFrame(() => {
		const initialHeight = textarea.offsetHeight;
		const fallbackHeight = 4 * 15 + 6;
		textarea.style.minHeight = `${initialHeight > 0 ? initialHeight : fallbackHeight}px`;
	});

	const footer = DOM.append(cell, DOM.$('div.vybe-project-rule-cell-footer'));
	footer.style.cssText = 'display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; gap: 12px; position: relative;';

	const leftGroup = DOM.append(footer, DOM.$('div.vybe-project-rule-footer-left'));
	leftGroup.style.cssText = `display: flex; align-items: center; gap: ${SETTINGS_RIGHT_BUTTON_ROW_GAP_PX}px; flex-shrink: 0;`;

	let currentRuleType = options.initialRuleType ?? PROJECT_RULE_TYPE_DEFAULT;
	const { button: dropdownBtn, setLabel } = createRuleTypeDropdownTrigger(leftGroup, currentRuleType);

	let menuEl: HTMLElement | null = null;
	let ruleTypeMenuKeyHandler: ((e: KeyboardEvent) => void) | null = null;
	function closeMenu(): void {
		if (ruleTypeMenuKeyHandler) {
			document.removeEventListener('keydown', ruleTypeMenuKeyHandler);
			ruleTypeMenuKeyHandler = null;
		}
		if (menuEl && menuEl.parentElement) {
			menuEl.remove();
			menuEl = null;
		}
		document.removeEventListener('click', docCloseHandler);
	}
	function docCloseHandler(e: MouseEvent): void {
		const t = e.target as Node;
		if (menuEl && menuEl !== t && !menuEl.contains(t) && dropdownBtn !== t && !dropdownBtn.contains(t)) {
			closeMenu();
		}
	}
	const isDark = document.body.classList.contains('vs-dark') || document.body.classList.contains('hc-black');
	const menuBg = isDark ? '#212427' : '#eceff2';
	const menuBorder = isDark ? '#383838' : '#d9d9d9';
	const hoverBg = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
	const menuFg = isDark ? 'rgba(228, 228, 228, 0.92)' : 'rgba(51, 51, 51, 0.9)';
	addDisposableListener(dropdownBtn, EventType.CLICK, (e) => {
		e.stopPropagation();
		if (menuEl && menuEl.parentElement) {
			closeMenu();
			return;
		}
		menuEl = DOM.$('div.vybe-rule-type-dropdown-menu');
		menuEl.style.cssText = `
			position: absolute; left: 0; top: 100%; margin-top: 3px; z-index: 100;
			width: max-content; min-width: 0; box-sizing: border-box;
			border-radius: 6px; padding: 2px; gap: 2px;
			background-color: ${menuBg}; border: 1px solid ${menuBorder};
			box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.12);
			display: flex; flex-direction: column; font-size: 12px; font-family: -apple-system, "system-ui", sans-serif;
			color: ${menuFg};
		`;
		const itemEls: HTMLElement[] = [];
		let highlightedIndex = PROJECT_RULE_TYPE_OPTIONS.indexOf(currentRuleType as typeof PROJECT_RULE_TYPE_OPTIONS[number]);
		if (highlightedIndex < 0) { highlightedIndex = 0; }
		function setHighlight(idx: number): void {
			itemEls.forEach((el, i) => { el.style.backgroundColor = i === idx ? hoverBg : ''; });
			highlightedIndex = idx;
		}
		for (let i = 0; i < PROJECT_RULE_TYPE_OPTIONS.length; i++) {
			const option = PROJECT_RULE_TYPE_OPTIONS[i];
			const item = DOM.append(menuEl, DOM.$('div.vybe-rule-type-dropdown-item'));
			item.textContent = option;
			item.style.cssText = `
				padding: 2px 6px; min-height: 18px; line-height: 16px; font-size: 12px;
				cursor: pointer; white-space: nowrap; border-radius: 4px; color: ${menuFg};
			`;
			if (i === highlightedIndex) { item.style.backgroundColor = hoverBg; }
			itemEls.push(item);
			item.addEventListener('mouseenter', () => setHighlight(i));
			item.addEventListener('click', (ev) => {
				ev.stopPropagation();
				currentRuleType = option;
				setLabel(option);
				closeMenu();
			});
		}
		footer.appendChild(menuEl);
		ruleTypeMenuKeyHandler = (ev: KeyboardEvent) => {
			if (!menuEl?.parentElement) { return; }
			if (ev.key === 'Escape') { closeMenu(); ev.preventDefault(); return; }
			if (ev.key === 'Enter') {
				currentRuleType = PROJECT_RULE_TYPE_OPTIONS[highlightedIndex];
				setLabel(currentRuleType);
				closeMenu();
				ev.preventDefault();
				return;
			}
			if (ev.key === 'ArrowDown') {
				setHighlight(Math.min(highlightedIndex + 1, itemEls.length - 1));
				ev.preventDefault();
				return;
			}
			if (ev.key === 'ArrowUp') {
				setHighlight(Math.max(0, highlightedIndex - 1));
				ev.preventDefault();
				return;
			}
		};
		document.addEventListener('keydown', ruleTypeMenuKeyHandler);
		setTimeout(() => document.addEventListener('click', docCloseHandler), 0);
	});

	const createWithAgentBtn = DOM.append(leftGroup, DOM.$('button.vybe-project-rule-create-with-agent')) as HTMLButtonElement;
	createWithAgentBtn.type = 'button';
	createWithAgentBtn.textContent = 'Create with Agent';
	createWithAgentBtn.style.cssText = `
		display: flex; align-items: center; justify-content: center;
		border-radius: ${SETTINGS_CONFIRM_BUTTON_RADIUS_LEFT_PX}px; padding: 4px 8px;
		font-size: ${SETTINGS_LABEL_FONT_SIZE_PX}px; cursor: pointer; border: none; outline: none;
		background-color: ${SETTINGS_COLOR_BUTTON_BG}; color: ${SETTINGS_COLOR_BUTTON_FG};
	`;
	addDisposableListener(createWithAgentBtn, EventType.CLICK, () => {
		options.onCreateWithAgent?.();
	});

	const rightGroup = DOM.append(footer, DOM.$('div.vybe-project-rule-footer-right'));
	rightGroup.style.cssText = 'display: flex; align-items: center; flex-shrink: 0; margin-left: auto;';
	const { confirmBtn: doneBtn, closeBtn } = createConfirmCloseButtonGroup(rightGroup, { confirmLabel: 'Done' });

	function updateDoneState(): void {
		const name = nameInput.value.trim();
		const content = textarea.value.trim();
		const valid = name.length > 0 && content.length > 0;
		doneBtn.style.opacity = valid ? '1' : '0.5';
		doneBtn.style.pointerEvents = valid ? 'auto' : 'none';
		doneBtn.setAttribute('data-disabled', valid ? 'false' : 'true');
	}
	updateDoneState();
	addDisposableListener(nameInput, EventType.INPUT, updateDoneState);
	addDisposableListener(textarea, EventType.INPUT, updateDoneState);

	addDisposableListener(closeBtn, EventType.CLICK, () => {
		cell.remove();
		options.onCancel();
	});
	addDisposableListener(doneBtn, EventType.CLICK, () => {
		if (nameInput.value.trim().length === 0 || textarea.value.trim().length === 0) {
			return;
		}
		options.onDone(nameInput.value.trim(), textarea.value.trim(), currentRuleType, cell);
	});

	return cell;
}

export function renderRulesCommandsTab(parent: HTMLElement): void {
	// Filter tab bar: All, User, Workspace, Repo (workspace/repo will be dynamic later)
	const filterBar = createFilterTabBar(
		[
			{ id: 'all', label: 'All' },
			{ id: 'user', label: 'User' },
			{ id: 'workspace', label: 'Workspace' },
			{ id: 'repo', label: 'Repo' }
		],
		'all',
		(filterId: string) => {
			const subagentsSection = parent.querySelector(`[${SUBAGENTS_SECTION_DATA_ATTR}="subagents"]`) as HTMLElement | null;
			if (subagentsSection) {
				subagentsSection.style.display = filterId === 'all' ? 'flex' : 'none';
			}
			// Rules list shows user rules for All/User and project rules for Workspace/Repo
			renderRulesListForFilter(filterId);
		}
	);
	parent.insertBefore(filterBar, parent.firstChild);

	// Rules section (all tabs) – no help icon; button is + New (icon + "New")
	const rulesSection = addSectionWithEmptyState(
		parent,
		'Rules',
		'Use Rules to guide agent behavior, like enforcing best practices or coding standards. Rules can be applied always, by file path, or manually.',
		'New',
		'No rules yet',
		undefined,
		RULES_SECTION_ID
	);

	const rulesSubSectionList = rulesSection.querySelector('.vybe-settings-sub-section-list') as HTMLElement;
	const rulesEmptyStateWrapper = rulesSection.querySelector('.vybe-settings-list-empty-state') as HTMLElement;
	const rulesAddBtn = rulesSection.querySelector('.vybe-settings-section-header-add-button') as HTMLElement;

	const savedUserRules: UserRule[] = [];
	const savedProjectRules: ProjectRule[] = [];

	function showRulesEmptyState(): void {
		if (rulesEmptyStateWrapper) {
			rulesEmptyStateWrapper.style.display = 'flex';
		}
	}

	function hideRulesEmptyState(): void {
		if (rulesEmptyStateWrapper) {
			rulesEmptyStateWrapper.style.display = 'none';
		}
	}

	function addNewUserRuleCell(initialName?: string, initialContent?: string, fromAllTab?: boolean): void {
		hideRulesEmptyState();
		const editCell = createNewUserRuleCell(rulesSubSectionList, {
			initialName,
			initialContent,
			showDividerAbove: fromAllTab ? (savedUserRules.length + savedProjectRules.length > 0) : (savedUserRules.length > 0),
			onCancel: () => {
				editCell.remove();
				const total = savedUserRules.length + savedProjectRules.length;
				if (total === 0) {
					showRulesEmptyState();
				} else if (fromAllTab) {
					renderRulesListForFilter('all');
				}
			},
			onDone: (name, content, cellToReplace) => {
				const rule: UserRule = { name, content, enabled: true };
				savedUserRules.push(rule);
				if (fromAllTab) {
					cellToReplace.remove();
					renderRulesListForFilter('all');
				} else {
					const ruleIndex = savedUserRules.length - 1;
					const newRow = createFinalizedUserRuleRow(rulesSubSectionList, rule, ruleIndex, {
						showDividerAbove: ruleIndex > 0,
						onEdit: () => startEditRule(ruleIndex),
						onDelete: () => deleteRule(ruleIndex),
						onToggle: (enabled) => { rule.enabled = enabled; }
					});
					rulesSubSectionList.replaceChild(newRow, cellToReplace);
				}
			}
		});
		const firstInput = rulesSubSectionList.querySelector('.vybe-new-user-rule-input') as HTMLInputElement | null;
		if (firstInput) {
			setTimeout(() => firstInput.focus(), 0);
		}
	}

	function startEditRule(ruleIndex: number, fromAllTab?: boolean): void {
		const rule = savedUserRules[ruleIndex];
		if (!rule) { return; }
		const row = rulesSubSectionList.querySelector(`[data-rule-index="${ruleIndex}"]`) as HTMLElement | null;
		if (!row) { return; }
		const editCell = createNewUserRuleCell(rulesSubSectionList, {
			initialName: rule.name,
			initialContent: rule.content,
			showDividerAbove: ruleIndex > 0,
			onCancel: () => {
				const newRow = createFinalizedUserRuleRow(rulesSubSectionList, rule, ruleIndex, {
					showDividerAbove: ruleIndex > 0,
					onEdit: () => startEditRule(ruleIndex, fromAllTab),
					onDelete: () => deleteRule(ruleIndex, fromAllTab),
					onToggle: (enabled) => { rule.enabled = enabled; }
				});
				rulesSubSectionList.replaceChild(newRow, editCell);
			},
			onDone: (name, content, cellToReplace) => {
				rule.name = name;
				rule.content = content;
				const newRow = createFinalizedUserRuleRow(rulesSubSectionList, rule, ruleIndex, {
					showDividerAbove: ruleIndex > 0,
					onEdit: () => startEditRule(ruleIndex, fromAllTab),
					onDelete: () => deleteRule(ruleIndex, fromAllTab),
					onToggle: (enabled) => { rule.enabled = enabled; }
				});
				rulesSubSectionList.replaceChild(newRow, cellToReplace);
			}
		});
		rulesSubSectionList.replaceChild(editCell, row);
		const firstInput = editCell.querySelector('.vybe-new-user-rule-input') as HTMLInputElement | null;
		if (firstInput) {
			setTimeout(() => firstInput.focus(), 0);
		}
	}

	function deleteRule(ruleIndex: number, fromAllTab?: boolean): void {
		savedUserRules.splice(ruleIndex, 1);
		if (fromAllTab) {
			renderRulesListForFilter('all');
			if (savedUserRules.length === 0 && savedProjectRules.length === 0) {
				showRulesEmptyState();
			}
		} else {
			reRenderUserRuleRows();
			if (savedUserRules.length === 0) {
				showRulesEmptyState();
			}
		}
	}

	function reRenderUserRuleRows(): void {
		rulesSubSectionList.querySelectorAll('.vybe-settings-user-rule-row').forEach(el => el.remove());
		savedUserRules.forEach((rule, i) => {
			createFinalizedUserRuleRow(rulesSubSectionList, rule, i, {
				showDividerAbove: i > 0,
				onEdit: () => startEditRule(i),
				onDelete: () => deleteRule(i),
				onToggle: (enabled) => { rule.enabled = enabled; }
			});
		});
	}

	function addNewProjectRuleCell(initialName?: string, initialContent?: string, initialRuleType?: string, fromAllTab?: boolean): void {
		hideRulesEmptyState();
		const editCell = createNewProjectRuleCell(rulesSubSectionList, {
			initialName,
			initialContent,
			initialRuleType,
			showDividerAbove: fromAllTab ? (savedUserRules.length + savedProjectRules.length > 0) : (savedProjectRules.length > 0),
			onCancel: () => {
				editCell.remove();
				const total = savedUserRules.length + savedProjectRules.length;
				if (total === 0) {
					showRulesEmptyState();
				} else if (fromAllTab) {
					renderRulesListForFilter('all');
				}
			},
			onDone: (name, content, ruleType, cellToReplace) => {
				const rule: ProjectRule = { name, content, ruleType, enabled: true };
				savedProjectRules.push(rule);
				if (fromAllTab) {
					cellToReplace.remove();
					renderRulesListForFilter('all');
				} else {
					const ruleIndex = savedProjectRules.length - 1;
					const newRow = createFinalizedUserRuleRow(rulesSubSectionList, rule, ruleIndex, {
						showDividerAbove: ruleIndex > 0,
						onEdit: () => startEditProjectRule(ruleIndex),
						onDelete: () => deleteProjectRule(ruleIndex),
						onToggle: (enabled) => { rule.enabled = enabled; }
					});
					rulesSubSectionList.replaceChild(newRow, cellToReplace);
				}
			}
		});
		const firstInput = rulesSubSectionList.querySelector('.vybe-new-project-rule-input') as HTMLInputElement | null;
		if (firstInput) {
			setTimeout(() => firstInput.focus(), 0);
		}
	}

	function startEditProjectRule(ruleIndex: number, fromAllTab?: boolean): void {
		const rule = savedProjectRules[ruleIndex];
		if (!rule) { return; }
		const row = rulesSubSectionList.querySelector(`[data-rule-index="${ruleIndex}"]`) as HTMLElement | null;
		if (!row) { return; }
		const projectRuleShowDividerAbove = fromAllTab ? (savedUserRules.length + ruleIndex > 0) : (ruleIndex > 0);
		const editCell = createNewProjectRuleCell(rulesSubSectionList, {
			initialName: rule.name,
			initialContent: rule.content,
			initialRuleType: rule.ruleType,
			showDividerAbove: projectRuleShowDividerAbove,
			onCancel: () => {
				const newRow = createFinalizedUserRuleRow(rulesSubSectionList, rule, ruleIndex, {
					showDividerAbove: projectRuleShowDividerAbove,
					onEdit: () => startEditProjectRule(ruleIndex, fromAllTab),
					onDelete: () => deleteProjectRule(ruleIndex, fromAllTab),
					onToggle: (enabled) => { rule.enabled = enabled; }
				});
				rulesSubSectionList.replaceChild(newRow, editCell);
			},
			onDone: (name, content, ruleType, cellToReplace) => {
				rule.name = name;
				rule.content = content;
				rule.ruleType = ruleType;
				const newRow = createFinalizedUserRuleRow(rulesSubSectionList, rule, ruleIndex, {
					showDividerAbove: projectRuleShowDividerAbove,
					onEdit: () => startEditProjectRule(ruleIndex, fromAllTab),
					onDelete: () => deleteProjectRule(ruleIndex, fromAllTab),
					onToggle: (enabled) => { rule.enabled = enabled; }
				});
				rulesSubSectionList.replaceChild(newRow, cellToReplace);
			}
		});
		rulesSubSectionList.replaceChild(editCell, row);
		const firstInput = editCell.querySelector('.vybe-new-project-rule-input') as HTMLInputElement | null;
		if (firstInput) {
			setTimeout(() => firstInput.focus(), 0);
		}
	}

	function deleteProjectRule(ruleIndex: number, fromAllTab?: boolean): void {
		savedProjectRules.splice(ruleIndex, 1);
		if (fromAllTab) {
			renderRulesListForFilter('all');
			if (savedUserRules.length === 0 && savedProjectRules.length === 0) {
				showRulesEmptyState();
			}
		} else {
			reRenderProjectRuleRows();
			if (savedProjectRules.length === 0) {
				showRulesEmptyState();
			}
		}
	}

	function reRenderProjectRuleRows(): void {
		rulesSubSectionList.querySelectorAll('.vybe-settings-user-rule-row').forEach(el => el.remove());
		savedProjectRules.forEach((rule, i) => {
			createFinalizedUserRuleRow(rulesSubSectionList, rule, i, {
				showDividerAbove: i > 0,
				onEdit: () => startEditProjectRule(i),
				onDelete: () => deleteProjectRule(i),
				onToggle: (enabled) => { rule.enabled = enabled; }
			});
		});
	}

	/** Repopulate rules list for the given filter. All = user rules then project rules; User = user only; Workspace/Repo = project only. */
	function renderRulesListForFilter(filterId: string): void {
		rulesSubSectionList.querySelectorAll('.vybe-settings-user-rule-row, .vybe-new-user-rule-cell, .vybe-new-project-rule-cell').forEach(el => el.remove());
		const isAll = filterId === 'all';
		const isProject = filterId === 'workspace' || filterId === 'repo';
		const totalCount = isAll ? savedUserRules.length + savedProjectRules.length : (isProject ? savedProjectRules.length : savedUserRules.length);
		if (rulesEmptyStateWrapper) {
			rulesEmptyStateWrapper.style.display = totalCount === 0 ? 'flex' : 'none';
		}
		if (isAll) {
			let allRowIndex = 0;
			savedUserRules.forEach((rule, i) => {
				createFinalizedUserRuleRow(rulesSubSectionList, rule, i, {
					showDividerAbove: allRowIndex > 0,
					onEdit: () => startEditRule(i, true),
					onDelete: () => deleteRule(i, true),
					onToggle: (enabled) => { rule.enabled = enabled; }
				});
				allRowIndex++;
			});
			savedProjectRules.forEach((rule, j) => {
				createFinalizedUserRuleRow(rulesSubSectionList, rule, j, {
					showDividerAbove: allRowIndex > 0,
					onEdit: () => startEditProjectRule(j, true),
					onDelete: () => deleteProjectRule(j, true),
					onToggle: (enabled) => { rule.enabled = enabled; }
				});
				allRowIndex++;
			});
		} else {
			const rules = isProject ? savedProjectRules : savedUserRules;
			rules.forEach((rule, i) => {
				createFinalizedUserRuleRow(rulesSubSectionList, rule, i, {
					showDividerAbove: i > 0,
					onEdit: () => (isProject ? startEditProjectRule(i) : startEditRule(i)),
					onDelete: () => (isProject ? deleteProjectRule(i) : deleteRule(i)),
					onToggle: (enabled) => { (rule as UserRule & ProjectRule).enabled = enabled; }
				});
			});
		}
	}

	// New dropdown (All tab only): agent-style menu with "User rule" / "Project rule"
	let newDropdownMenu: HTMLElement | null = null;
	let newDropdownKeyHandler: ((e: KeyboardEvent) => void) | null = null;
	function closeNewDropdown(): void {
		if (newDropdownKeyHandler) {
			document.removeEventListener('keydown', newDropdownKeyHandler);
			newDropdownKeyHandler = null;
		}
		if (newDropdownMenu?.parentElement) {
			newDropdownMenu.remove();
			newDropdownMenu = null;
		}
		document.removeEventListener('click', newDropdownDocHandler);
	}
	function newDropdownDocHandler(e: MouseEvent): void {
		const t = e.target as Node;
		if (newDropdownMenu && newDropdownMenu !== t && !newDropdownMenu.contains(t) && rulesAddBtn !== t && !rulesAddBtn.contains(t)) {
			closeNewDropdown();
		}
	}
	function openNewDropdown(): void {
		if (newDropdownMenu?.parentElement) {
			closeNewDropdown();
			return;
		}
		const isDark = document.body.classList.contains('vs-dark') || document.body.classList.contains('hc-black');
		const menuBg = isDark ? '#212427' : '#eceff2';
		const menuBorder = isDark ? '#383838' : '#d9d9d9';
		const hoverBg = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
		const menuFg = isDark ? 'rgba(228, 228, 228, 0.92)' : 'rgba(51, 51, 51, 0.9)';
		newDropdownMenu = DOM.$('div.vybe-rules-new-dropdown-menu');
		newDropdownMenu.style.cssText = `
			position: fixed; top: 0; left: 0; z-index: 2548;
			width: max-content; min-width: 0; box-sizing: border-box;
			border-radius: 6px; padding: 2px; gap: 2px;
			background-color: ${menuBg}; border: 1px solid ${menuBorder};
			box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.12);
			display: flex; flex-direction: column; font-size: 12px; font-family: -apple-system, "system-ui", sans-serif;
			color: ${menuFg};
		`;
		const items = [{ id: 'user' as const, label: 'User rule' }, { id: 'project' as const, label: 'Project rule' }];
		const itemEls: HTMLElement[] = [];
		let highlightedIndex = 0;
		function setHighlight(idx: number): void {
			itemEls.forEach((el, i) => { el.style.backgroundColor = i === idx ? hoverBg : ''; });
			highlightedIndex = idx;
		}
		for (let i = 0; i < items.length; i++) {
			const { id, label } = items[i];
			const item = DOM.append(newDropdownMenu, DOM.$('div.vybe-rules-new-dropdown-item'));
			item.textContent = label;
			item.style.cssText = `
				padding: 2px 6px; min-height: 18px; line-height: 16px; font-size: 12px;
				cursor: pointer; white-space: nowrap; border-radius: 4px; color: ${menuFg};
			`;
			if (i === 0) { item.style.backgroundColor = hoverBg; }
			itemEls.push(item);
			item.addEventListener('mouseenter', () => setHighlight(i));
			item.addEventListener('click', (ev) => {
				ev.stopPropagation();
				closeNewDropdown();
				if (id === 'user') {
					addNewUserRuleCell(undefined, undefined, true);
				} else {
					addNewProjectRuleCell(undefined, undefined, undefined, true);
				}
			});
		}
		document.body.appendChild(newDropdownMenu);
		const rect = rulesAddBtn.getBoundingClientRect();
		newDropdownMenu.style.left = `${rect.right - newDropdownMenu.offsetWidth}px`;
		newDropdownMenu.style.top = `${rect.bottom + 3}px`;
		newDropdownKeyHandler = (ev: KeyboardEvent) => {
			if (!newDropdownMenu?.parentElement) { return; }
			if (ev.key === 'Escape') { closeNewDropdown(); ev.preventDefault(); return; }
			if (ev.key === 'Enter') {
				const { id } = items[highlightedIndex];
				closeNewDropdown();
				if (id === 'user') {
					addNewUserRuleCell(undefined, undefined, true);
				} else {
					addNewProjectRuleCell(undefined, undefined, undefined, true);
				}
				ev.preventDefault();
				return;
			}
			if (ev.key === 'ArrowDown') {
				setHighlight(Math.min(highlightedIndex + 1, itemEls.length - 1));
				ev.preventDefault();
				return;
			}
			if (ev.key === 'ArrowUp') {
				setHighlight(Math.max(0, highlightedIndex - 1));
				ev.preventDefault();
				return;
			}
		};
		document.addEventListener('keydown', newDropdownKeyHandler);
		setTimeout(() => document.addEventListener('click', newDropdownDocHandler), 0);
	}

	addDisposableListener(rulesAddBtn, EventType.CLICK, (e) => {
		e.stopPropagation();
		const selectedTab = parent.querySelector('.vybe-settings-filter-tab-selected') as HTMLElement | null;
		const filterId = selectedTab?.getAttribute('data-filter-tab-id') ?? 'all';
		if (filterId === 'all') {
			openNewDropdown();
		} else if (filterId === 'workspace' || filterId === 'repo') {
			addNewProjectRuleCell();
		} else {
			addNewUserRuleCell();
		}
	});

	// Skills section (all tabs)
	addSectionWithEmptyState(
		parent,
		'Skills',
		'Skills are specialized capabilities that help the agent accomplish specific tasks. Skills will be invoked by the agent when relevant or can be triggered manually with / in chat.',
		'New',
		'No Skills Yet'
	);

	// Subagents section (only in All tab; hidden for User, Workspace, Repo)
	addSectionWithEmptyState(
		parent,
		'Subagents',
		'Create specialized agents for complex tasks. Subagents can be invoked by the agent to handle focused work in parallel.',
		'New',
		'No Subagents Yet',
		'subagents'
	);

	// Commands section (all tabs)
	addSectionWithEmptyState(
		parent,
		'Commands',
		'Create reusable workflows triggered with / prefix in chat. Use commands to standardize processes and make common tasks more efficient.',
		'New',
		'No Commands Yet'
	);
}
