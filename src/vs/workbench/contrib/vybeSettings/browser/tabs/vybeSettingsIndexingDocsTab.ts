/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as DOM from '../../../../../base/browser/dom.js';
import { addDisposableListener, EventType } from '../../../../../base/browser/dom.js';
import { IConfigurationService } from '../../../../../platform/configuration/common/configuration.js';
import { IWorkspaceContextService } from '../../../../../platform/workspace/common/workspace.js';
import { toWorkspaceIdentifier, isWorkspaceIdentifier, isSingleFolderWorkspaceIdentifier, IAnyWorkspaceIdentifier } from '../../../../../platform/workspace/common/workspace.js';
import { URI } from '../../../../../base/common/uri.js';
import { IIndexService, IndexState, IndexStatus } from '../stubs/indexServiceStub.js';
import { createSection, createCell, createSectionHeaderAddButton, createSettingsListEmptyState, createConfirmCloseButtonGroup } from '../vybeSettingsComponents.js';
import {
	SETTINGS_DOC_CELL_MIN_HEIGHT_PX,
	SETTINGS_DESCRIPTION_FONT_STYLE,
	SETTINGS_MINIMAL_INPUT_STYLE,
	SETTINGS_CELL_DIVIDER_STYLE,
	SETTINGS_DOC_ROW_LABEL_STYLE,
	SETTINGS_RIGHT_BUTTON_ROW_ICON_BUTTON_STYLE,
	SETTINGS_RIGHT_BUTTON_ROW_ICON_STYLE,
	SETTINGS_DOC_CELL_GAP_PX,
	SETTINGS_DOC_CELL_PADDING_V_PX,
	SETTINGS_DOC_CELL_PADDING_H_PX,
	SETTINGS_DOC_RIGHT_GROUP_GAP_PX,
	SETTINGS_RIGHT_BUTTON_ROW_GAP_PX,
	SETTINGS_STATUS_DOT_SIZE_PX,
	SETTINGS_DOC_NAME_WRAPPER_MIN_WIDTH_PX,
	SETTINGS_DOC_RENAME_INPUT_MIN_WIDTH_PX,
	SETTINGS_COLOR_DESCRIPTION,
	SETTINGS_COLOR_FOREGROUND,
	SETTINGS_COLOR_BUTTON_FG,
	SETTINGS_COLOR_ACTIVITY_BAR_BG,
	SETTINGS_CONFIRM_CLOSE_ICON_SIZE_PX,
	SETTINGS_SECTION_TITLE_STYLE,
	SETTINGS_SECTION_DESCRIPTION_STYLE,
	SETTINGS_SECTION_HEADER_GAP_PX,
	SETTINGS_LABEL_FONT_SIZE_PX,
	SETTINGS_LABEL_STYLE,
	SETTINGS_SUBSECTION_LIST_STYLE,
	SETTINGS_SECTION_LIST_GAP_PX,
	SETTINGS_SUBSECTION_BORDER_RADIUS_PX,
	SETTINGS_CELL_PADDING_PX,
	SETTINGS_CELL_GAP_PX,
	SETTINGS_PILL_PADDING_V_PX,
	SETTINGS_PILL_PADDING_H_PX,
	SETTINGS_PILL_BORDER_RADIUS_PX,
	SETTINGS_PILL_FONT_SIZE_PX,
	SETTINGS_PILL_LINE_HEIGHT_PX,
	SETTINGS_PILL_GAP_PX,
	SETTINGS_PILL_ICON_SIZE_PX,
	SETTINGS_COLOR_PANEL_BORDER_STRONG,
	SETTINGS_COLOR_INPUT_BG,
	SETTINGS_PROGRESS_MARGIN_TOP_PX,
	SETTINGS_PROGRESS_TRACK_HEIGHT_PX,
	SETTINGS_PROGRESS_TRACK_RADIUS_PX,
	SETTINGS_PROGRESS_FILL_RADIUS_PX,
	SETTINGS_COLOR_PROGRESS_FILL,
	SETTINGS_COLOR_SWITCH_ON
} from '../vybeSettingsDesignTokens.js';
import { DisposableStore } from '../../../../../base/common/lifecycle.js';
import { CancellationTokenSource } from '../../../../../base/common/cancellation.js';
import { ICommandService } from '../../../../../platform/commands/common/commands.js';
import { CONFIG_CLOUD_INDEXING_ENABLED } from '../stubs/indexingConfigurationStub.js';

// Local extension of IndexStatus used only by this UI.
// Backend may or may not provide these additional fields; they are all optional.
type ExtendedIndexStatus = IndexStatus & {
	// No additional fields for now; we keep this alias for clarity in the UI code.
};

/**
 * Add Doc cell Stage 1: "Add docs" label, URL input, Confirm+Close. On completion calls onStage1Complete(url, cell).
 * When showDividerAbove is true, draws the same divider at top as between Stage 4 cells.
 */
function createAddDocCell(
	parent: HTMLElement,
	disposables: DisposableStore,
	onStage1Complete: (url: string, cell: HTMLElement) => void,
	onClose: () => void,
	showDividerAbove?: boolean
): HTMLElement {
	const cell = DOM.append(parent, DOM.$('div.settings-indexing-docs-cell.settings-indexing-docs-add-cell'));
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

	if (showDividerAbove) {
		const divider = DOM.append(cell, DOM.$('div.vybe-settings-cell-divider'));
		divider.style.cssText = SETTINGS_CELL_DIVIDER_STYLE;
	}

	const label = DOM.append(cell, DOM.$('span'));
	label.textContent = 'Link';
	label.style.cssText = `${SETTINGS_DOC_ROW_LABEL_STYLE}`;

	const input = DOM.append(cell, DOM.$('input')) as HTMLInputElement;
	input.type = 'text';
	input.placeholder = 'https://example.com/docs';
	input.style.cssText = SETTINGS_MINIMAL_INPUT_STYLE;
	input.setAttribute('aria-label', 'Doc URL');

	const { confirmBtn, closeBtn, closeIconSlot } = createConfirmCloseButtonGroup(cell);
	disposables.add(addDisposableListener(confirmBtn, EventType.CLICK, () => {
		const url = input.value.trim() || input.placeholder;
		closeBtn.style.pointerEvents = 'none';
		closeIconSlot.textContent = '';
		const spinner = DOM.append(closeIconSlot, DOM.$('span.codicon.codicon-loading.codicon-modifier-spin'));
		spinner.style.cssText = `font-size: ${SETTINGS_CONFIRM_CLOSE_ICON_SIZE_PX}px; color: ${SETTINGS_COLOR_BUTTON_FG};`;
		setTimeout(() => onStage1Complete(url, cell), 1200);
	}));
	disposables.add(addDisposableListener(closeBtn, EventType.CLICK, onClose));

	return cell;
}

/**
 * Stage 2: replace cell content with Name, Prefix, Entrypoint inputs + Confirm+Close. Prefill from URL. On completion call onStage2Complete(doc).
 */
function renderStage2InCell(
	cell: HTMLElement,
	url: string,
	disposables: DisposableStore,
	onStage2Complete: (doc: { name: string; prefix: string; entrypoint: string }) => void,
	onClose: () => void
): void {
	// Divider only between two cells: show above this cell iff the previous sibling is a Stage 4 doc cell (not empty state).
	const prev = cell.previousElementSibling as HTMLElement | null;
	const showDividerAbove = !!(prev?.classList.contains('settings-indexing-docs-cell') && !prev.classList.contains('settings-indexing-docs-add-cell'));
	cell.textContent = '';
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

	if (showDividerAbove) {
		const divider = DOM.append(cell, DOM.$('div.vybe-settings-cell-divider'));
		divider.style.cssText = SETTINGS_CELL_DIVIDER_STYLE;
	}

	// Prefill name and entrypoint from URL
	let name = 'Doc';
	let entrypoint = url;
	try {
		const u = new URL(url);
		name = u.hostname.replace(/^www\./, '').replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Doc';
		entrypoint = url;
	} catch { /**/ }

	const nameLabel = DOM.append(cell, DOM.$('span'));
	nameLabel.textContent = 'Name';
	nameLabel.style.cssText = SETTINGS_DOC_ROW_LABEL_STYLE;
	const nameInput = DOM.append(cell, DOM.$('input')) as HTMLInputElement;
	nameInput.type = 'text';
	nameInput.placeholder = 'Name, e.g. Pytorch';
	nameInput.value = name;
	nameInput.style.cssText = SETTINGS_MINIMAL_INPUT_STYLE;
	nameInput.setAttribute('aria-label', 'Name');

	const entrypointLabel = DOM.append(cell, DOM.$('span'));
	entrypointLabel.textContent = 'Entrypoint';
	entrypointLabel.style.cssText = SETTINGS_DOC_ROW_LABEL_STYLE;
	const entrypointInput = DOM.append(cell, DOM.$('input')) as HTMLInputElement;
	entrypointInput.type = 'text';
	entrypointInput.placeholder = 'https://example.com/docs';
	entrypointInput.value = entrypoint;
	entrypointInput.style.cssText = SETTINGS_MINIMAL_INPUT_STYLE;
	entrypointInput.setAttribute('aria-label', 'Entrypoint');

	const { confirmBtn, closeBtn, closeIconSlot } = createConfirmCloseButtonGroup(cell);
	disposables.add(addDisposableListener(confirmBtn, EventType.CLICK, () => {
		closeBtn.style.pointerEvents = 'none';
		closeIconSlot.textContent = '';
		const spinner = DOM.append(closeIconSlot, DOM.$('span.codicon.codicon-loading.codicon-modifier-spin'));
		spinner.style.cssText = `font-size: ${SETTINGS_CONFIRM_CLOSE_ICON_SIZE_PX}px; color: ${SETTINGS_COLOR_BUTTON_FG};`;
		const entryVal = entrypointInput.value.trim() || entrypointInput.placeholder;
		setTimeout(() => {
			onStage2Complete({
				name: nameInput.value.trim() || nameInput.placeholder,
				prefix: entryVal.replace(/\/[^/]*$/, '/') || entryVal,
				entrypoint: entryVal
			});
		}, 1200);
	}));
	disposables.add(addDisposableListener(closeBtn, EventType.CLICK, onClose));
}

/** Divider style used between cells (same as Index folders / Ignore file on this settings page). */
/** Stage 4: indexed doc cell — one row: name (label style) | status dot | status/timestamp | Edit | Reindex | See pages | Delete. Reuses D20–D29 structure. Does not append to DOM; caller must insert (e.g. replaceChild). Set showDividerAbove: true for 2nd, 3rd, … cells so the divider appears only between cells. */
function createStage4DocCell(
	doc: { name: string; prefix: string; entrypoint: string },
	options?: {
		status?: 'pending' | 'indexing' | 'indexed' | 'error';
		statusMessage?: string;
		/** When true, show divider at top of this cell (between this and the cell above). Omit/false for the first cell. */
		showDividerAbove?: boolean;
	},
	disposables?: DisposableStore
): HTMLElement {
	const opts = options ?? {};
	const cell = DOM.$('div.settings-indexing-docs-cell');
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

	if (opts?.showDividerAbove) {
		const divider = DOM.append(cell, DOM.$('div.vybe-settings-cell-divider'));
		divider.style.cssText = SETTINGS_CELL_DIVIDER_STYLE;
	}

	const nameWrapper = DOM.append(cell, DOM.$('div.settings-indexing-docs-cell-name-wrapper'));
	nameWrapper.style.cssText = `flex-shrink: 0; min-width: ${SETTINGS_DOC_NAME_WRAPPER_MIN_WIDTH_PX}px;`;
	const nameLabel = DOM.append(nameWrapper, DOM.$('span.settings-indexing-docs-cell-leading-items-title'));
	nameLabel.textContent = doc.name;
	nameLabel.style.cssText = SETTINGS_DOC_ROW_LABEL_STYLE;

	let currentName = doc.name;
	let renameJustEnded = false;

	const status = opts?.status ?? 'indexed';
	const statusMsg = opts?.statusMessage ?? (status === 'indexed' ? 'Indexed' : status === 'indexing' ? 'Indexing…' : status === 'error' ? 'Error' : 'Pending');
	const dotColor = status === 'indexed' ? 'var(--vscode-testing-iconPassed)' : status === 'error' ? 'var(--vscode-testing-iconFailed)' : status === 'indexing' ? 'var(--vscode-testing-iconQueued)' : 'var(--vscode-descriptionForeground)';

	// Right group: status dot + description + action icons (one unit on the right)
	const rightGroup = DOM.append(cell, DOM.$('div.settings-indexing-docs-cell-right-group'));
	rightGroup.style.cssText = `display: flex; align-items: center; gap: ${SETTINGS_DOC_RIGHT_GROUP_GAP_PX}px; flex-shrink: 0; margin-left: auto;`;

	const badgeContainer = DOM.append(rightGroup, DOM.$('div.settings-indexing-docs-cell-badge-container'));
	badgeContainer.style.cssText = `display: flex; align-items: center; justify-content: center; width: ${SETTINGS_STATUS_DOT_SIZE_PX}px; height: ${SETTINGS_STATUS_DOT_SIZE_PX}px; flex-shrink: 0;`;
	const statusDot = DOM.append(badgeContainer, DOM.$('div'));
	statusDot.style.cssText = `width: ${SETTINGS_STATUS_DOT_SIZE_PX}px; height: ${SETTINGS_STATUS_DOT_SIZE_PX}px; border-radius: 50%; background-color: ${dotColor}; flex-shrink: 0;`;

	const desc = DOM.append(rightGroup, DOM.$('span.settings-indexing-docs-cell-leading-items-description'));
	desc.textContent = statusMsg;
	desc.style.cssText = `${SETTINGS_DESCRIPTION_FONT_STYLE} color: ${SETTINGS_COLOR_DESCRIPTION}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0;`;

	// Right buttons row (same design as codebase indexing right button row)
	const rightButtonsRow = DOM.append(rightGroup, DOM.$('div.right-buttons-row'));
	rightButtonsRow.style.cssText = `display: flex; gap: ${SETTINGS_RIGHT_BUTTON_ROW_GAP_PX}px; align-items: center; flex-shrink: 0;`;
	const editBtn = DOM.append(rightButtonsRow, DOM.$('div.docs-button'));
	editBtn.title = 'Edit';
	editBtn.style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_BUTTON_STYLE;
	const editIcon = DOM.append(editBtn, DOM.$('span.codicon.codicon-pencil'));
	editIcon.style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_STYLE;

	function endRename(save: boolean, inputEl: HTMLInputElement): void {
		if (save) {
			const trimmed = inputEl.value.trim();
			currentName = trimmed || inputEl.value || currentName;
			nameLabel.textContent = currentName;
		}
		nameWrapper.replaceChild(nameLabel, inputEl);
		nameWrapper.style.width = '';
		editIcon.className = 'codicon codicon-pencil';
		editBtn.title = 'Edit';
		renameJustEnded = true;
		setTimeout(() => { renameJustEnded = false; }, 150);
	}

	function startRename(): void {
		const fixedWidth = nameWrapper.offsetWidth;
		nameWrapper.style.width = `${fixedWidth}px`;
		const input = DOM.$('input') as HTMLInputElement;
		input.type = 'text';
		input.value = currentName;
		input.style.cssText = SETTINGS_MINIMAL_INPUT_STYLE + ` min-width: ${SETTINGS_DOC_RENAME_INPUT_MIN_WIDTH_PX}px; width: 100%;`;
		nameWrapper.replaceChild(input, nameLabel);
		input.focus();
		input.select();
		editIcon.className = 'codicon codicon-check';
		editBtn.title = 'Save';

		addDisposableListener(input, EventType.KEY_DOWN, (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				endRename(true, input);
			} else if (e.key === 'Escape') {
				e.preventDefault();
				endRename(false, input);
			}
		});
		addDisposableListener(input, EventType.BLUR, () => {
			if (nameWrapper.contains(input)) {
				endRename(true, input);
			}
		});
	}

	const editClick = () => {
		if (renameJustEnded) {
			return;
		}
		const input = nameWrapper.querySelector('input');
		if (input) {
			endRename(true, input as HTMLInputElement);
		} else {
			startRename();
		}
	};
	if (disposables) {
		disposables.add(addDisposableListener(editBtn, EventType.CLICK, editClick));
	} else {
		addDisposableListener(editBtn, EventType.CLICK, editClick);
	}

	const reindexBtn = DOM.append(rightButtonsRow, DOM.$('div.docs-button'));
	reindexBtn.title = 'Reindex';
	reindexBtn.style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_BUTTON_STYLE;
	DOM.append(reindexBtn, DOM.$('span.codicon.codicon-refresh')).style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_STYLE;
	const seePagesBtn = DOM.append(rightButtonsRow, DOM.$('div.docs-button.see-pages-button'));
	seePagesBtn.title = 'See pages';
	seePagesBtn.style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_BUTTON_STYLE;
	DOM.append(seePagesBtn, DOM.$('span.codicon.codicon-book')).style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_STYLE;
	const deleteBtn = DOM.append(rightButtonsRow, DOM.$('div.docs-button'));
	deleteBtn.title = 'Delete';
	deleteBtn.style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_BUTTON_STYLE;
	DOM.append(deleteBtn, DOM.$('span.codicon.codicon-trash')).style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_STYLE;

	return cell;
}

export function renderIndexingDocsTab(
	parent: HTMLElement,
	configurationService: IConfigurationService,
	workspaceContextService: IWorkspaceContextService,
	indexService: IIndexService,
	disposables: DisposableStore,
	commandService?: ICommandService
): void {
	// Get current workspace
	const workspace = workspaceContextService.getWorkspace();
	const workspaceIdentifier = toWorkspaceIdentifier(workspace);

	// Check if indexing is enabled (will be updated by toggle)
	let indexingEnabled = configurationService.getValue<boolean>(CONFIG_CLOUD_INDEXING_ENABLED) ?? false;

	// Use IAnyWorkspaceIdentifier - backend services handle both single-folder and workspace types
	// Don't convert single-folder to workspace format - this causes workspace key mismatches
	let indexingWorkspace: IAnyWorkspaceIdentifier | null = null;

	// Check if workspace has folders (either single folder or multi-root workspace)
	if (workspace.folders.length > 0) {
		if (isWorkspaceIdentifier(workspaceIdentifier) || isSingleFolderWorkspaceIdentifier(workspaceIdentifier)) {
			// Pass workspace as-is - backend services compute canonical workspace keys correctly
			indexingWorkspace = workspaceIdentifier;
		}
	}

	const hasValidWorkspace = indexingWorkspace !== null && workspace.folders.length > 0;

	// Codebase section
	const codebaseSection = createSection(parent, 'Codebase');
	codebaseSection.id = 'vybe-settings-codebase-indexing';

	const codebaseSectionList = codebaseSection.querySelector('.vybe-settings-section-list') as HTMLElement;

	// Helper to fetch status with timeout - defined early so it can be used in config change listener
	const fetchStatusWithTimeout = async (workspace: IAnyWorkspaceIdentifier, timeoutMs: number = 5000): Promise<ExtendedIndexStatus | null> => {
		try {
			const statusPromise = (indexService as any).getStatus(workspace);
			const timeoutPromise = new Promise<null>((resolve) => {
				setTimeout(() => resolve(null), timeoutMs);
			});
			const status = await Promise.race([statusPromise, timeoutPromise]);
			return status as ExtendedIndexStatus | null;
		} catch (error) {
			// Return null on error - UI will show default state
			return null;
		}
	};

	// Enable Cloud Indexing toggle (first sub-section)
	const enableToggleSubSection = DOM.append(codebaseSectionList, DOM.$('.vybe-settings-sub-section'));
	const enableToggleCell = createCell(enableToggleSubSection, {
		label: 'Enable Cloud Indexing',
		description: 'Enable cloud-based codebase indexing for semantic search and retrieval.',
		action: {
			type: 'switch',
			checked: indexingEnabled
		}
	});

	// Wire up the toggle
	const enableToggleSwitch = enableToggleCell.querySelector('.solid-switch') as HTMLElement;
	if (enableToggleSwitch) {
		const updateToggleVisual = (checked: boolean) => {
			const bgFill = enableToggleSwitch.querySelector('.solid-switch-bg-fill') as HTMLElement;
			const knob = enableToggleSwitch.querySelector('.solid-switch-knob') as HTMLElement;
			if (bgFill && knob) {
				enableToggleSwitch.style.background = checked ? SETTINGS_COLOR_SWITCH_ON : 'rgba(128, 128, 128, 0.3)';
				bgFill.style.opacity = checked ? '1' : '0';
				bgFill.style.width = checked ? '100%' : '0%';
				knob.style.left = checked ? 'calc(100% - 16px)' : '2px';
				enableToggleSwitch.setAttribute('data-checked', String(checked));
			}
		};

		disposables.add(addDisposableListener(enableToggleSwitch, EventType.CLICK, (e) => {
			e.stopPropagation();
			const current = configurationService.getValue<boolean>(CONFIG_CLOUD_INDEXING_ENABLED) ?? false;
			const newValue = !current;
			updateToggleVisual(newValue);
			configurationService.updateValue(CONFIG_CLOUD_INDEXING_ENABLED, newValue);
			// Refresh UI (will read updated value from config service)
			updateProgressUI(currentStatus);
		}));

		// Listen to config changes
		disposables.add(configurationService.onDidChangeConfiguration(e => {
			if (e.affectsConfiguration(CONFIG_CLOUD_INDEXING_ENABLED)) {
				const newValue = configurationService.getValue<boolean>(CONFIG_CLOUD_INDEXING_ENABLED) ?? false;
				updateToggleVisual(newValue);

				// If indexing was just enabled and we don't have a status yet, create a default one
				// This prevents the UI from getting stuck on "Loading..." while waiting for service creation
				if (newValue && hasValidWorkspace && indexingWorkspace && !currentStatus) {
					const defaultStatus: ExtendedIndexStatus = {
						workspace: indexingWorkspace as any,
						state: IndexState.Idle,
						totalFiles: 0,
						indexedFiles: 0,
						totalChunks: 0,
						embeddedChunks: 0,
						paused: false,
						modelDownloadState: 'ready',
					};
					currentStatus = defaultStatus;
					// Try to fetch real status in background
					setTimeout(async () => {
						const realStatus = await fetchStatusWithTimeout(indexingWorkspace!, 5000);
						if (realStatus) {
							currentStatus = realStatus;
							updateProgressUI(realStatus);
						}
					}, 200);
				}

				// Refresh UI (will read updated value from config service)
				updateProgressUI(currentStatus);
			}
		}));
	}

	// Second sub-section: Codebase Indexing with progress
	const indexingSubSection = DOM.append(codebaseSectionList, DOM.$('.vybe-settings-sub-section'));
	const indexingSubSectionList = DOM.append(indexingSubSection, DOM.$('.vybe-settings-sub-section-list'));
	indexingSubSectionList.style.cssText = SETTINGS_SUBSECTION_LIST_STYLE;

	// Codebase Indexing cell
	const indexingCell = DOM.append(indexingSubSectionList, DOM.$('.vybe-settings-cell.vybe-settings-cell-align-top'));
	indexingCell.style.cssText = `
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: ${SETTINGS_CELL_PADDING_PX}px;
		position: relative;
	`;

	const indexingCellContent = DOM.append(indexingCell, DOM.$('div'));
	indexingCellContent.style.cssText = `
		display: flex;
		align-items: flex-start;
		gap: ${SETTINGS_CELL_GAP_PX}px;
	`;

	const indexingLeading = DOM.append(indexingCellContent, DOM.$('.vybe-settings-cell-leading-items'));
	indexingLeading.style.cssText = 'display: flex; flex-direction: column; gap: 1px; flex: 1;';

	const indexingLabel = DOM.append(indexingLeading, DOM.$('p.vybe-settings-cell-label'));
	indexingLabel.style.cssText = `margin: 0; ${SETTINGS_LABEL_STYLE} display: flex; align-items: center;`;

	const indexingLabelText = DOM.append(indexingLabel, DOM.$('span'));
	indexingLabelText.textContent = 'Codebase Indexing';

	const indexingDesc = DOM.append(indexingLeading, DOM.$('div.vybe-settings-cell-description'));
	indexingDesc.style.cssText = `${SETTINGS_DESCRIPTION_FONT_STYLE} color: ${SETTINGS_COLOR_DESCRIPTION};`;

	const descText1 = document.createTextNode('Embed codebase for improved contextual understanding and knowledge. Embeddings and metadata are stored in the cloud, but all code is stored locally.');
	indexingDesc.appendChild(descText1);

	const indexingTrailing = DOM.append(indexingCellContent, DOM.$('.vybe-settings-cell-trailing-items'));
	indexingTrailing.style.cssText = 'flex-shrink: 0; display: flex; align-items: center; justify-content: flex-end;';

	// Status pill and vector indicator will be added to modelStatusContainer (left side) later
	const statusPill = DOM.$('div.indexing-status-pill');
	statusPill.style.cssText = `
		user-select: none;
		flex-shrink: 0;
		padding: ${SETTINGS_PILL_PADDING_V_PX}px ${SETTINGS_PILL_PADDING_H_PX}px;
		border-radius: ${SETTINGS_PILL_BORDER_RADIUS_PX}px;
		font-size: ${SETTINGS_PILL_FONT_SIZE_PX}px;
		font-weight: 500;
		line-height: ${SETTINGS_PILL_LINE_HEIGHT_PX}px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: ${SETTINGS_PILL_GAP_PX}px;
		border: 1px solid ${SETTINGS_COLOR_PANEL_BORDER_STRONG};
		color: ${SETTINGS_COLOR_FOREGROUND};
		background-color: ${SETTINGS_COLOR_INPUT_BG};
		transition: all 0.2s ease;
	`;

	const statusPillIcon = DOM.append(statusPill, DOM.$('span.codicon'));
	statusPillIcon.style.cssText = `font-size: ${SETTINGS_PILL_ICON_SIZE_PX}px; display: inline-flex; align-items: center;`;

	const statusPillText = DOM.append(statusPill, DOM.$('span'));
	statusPillText.textContent = 'Loading...';

	// Vector readiness indicator will be added to modelStatusContainer (left side) later
	const vectorIndicator = DOM.$('div.vector-indicator');
	vectorIndicator.style.cssText = `
		user-select: none;
		flex-shrink: 0;
		padding: ${SETTINGS_PILL_PADDING_V_PX}px ${SETTINGS_PILL_PADDING_H_PX}px;
		border-radius: ${SETTINGS_PILL_BORDER_RADIUS_PX}px;
		font-size: ${SETTINGS_PILL_FONT_SIZE_PX}px;
		font-weight: 500;
		line-height: ${SETTINGS_PILL_LINE_HEIGHT_PX}px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: ${SETTINGS_PILL_GAP_PX}px;
		border: 1px solid ${SETTINGS_COLOR_PANEL_BORDER_STRONG};
		color: ${SETTINGS_COLOR_FOREGROUND};
		background-color: var(--vscode-list-inactiveSelectionBackground, rgba(128, 128, 128, 0.05));
		transition: all 0.2s ease;
	`;
	const vectorIcon = DOM.append(vectorIndicator, DOM.$('span.codicon'));
	vectorIcon.style.cssText = `font-size: ${SETTINGS_PILL_ICON_SIZE_PX}px; display: inline-flex; align-items: center;`;
	const vectorText = DOM.append(vectorIndicator, DOM.$('span'));
	vectorText.textContent = 'Loading...';
	vectorIndicator.title = 'Vector: Loading...';

	// Progress container (inside the same cell) - single progress bar like Cursor
	const progressContainer = DOM.append(indexingCell, DOM.$('div.indexing-progress'));
	progressContainer.style.cssText = `display: flex; flex-direction: column; gap: 4px; margin-top: ${SETTINGS_PROGRESS_MARGIN_TOP_PX}px;`;

	// Single Indexing Progress Bar
	const progressBarContainer = DOM.append(progressContainer, DOM.$('div.indexing-progress-container'));
	progressBarContainer.setAttribute('role', 'progressbar');
	progressBarContainer.id = 'indexing-progress-container';
	progressBarContainer.style.cssText = 'display: flex; flex-direction: column; gap: 4px;';

	const progressBar = DOM.append(progressBarContainer, DOM.$('div.indexing-progress-bar'));
	progressBar.style.cssText = 'display: flex; flex-direction: column; gap: 4px;';

	const progressLabelContainer = DOM.append(progressBar, DOM.$('div.indexing-progress-label-container'));
	progressLabelContainer.style.cssText = 'display: flex; justify-content: space-between; align-items: center;';

	const progressValueLabel = DOM.append(progressLabelContainer, DOM.$('div.indexing-progress-value-label'));
	progressValueLabel.style.cssText = `${SETTINGS_DESCRIPTION_FONT_STYLE} color: ${SETTINGS_COLOR_DESCRIPTION};`;

	const progressTrack = DOM.append(progressBar, DOM.$('div.indexing-progress-track'));
	progressTrack.style.cssText = `
		width: 100%;
		height: ${SETTINGS_PROGRESS_TRACK_HEIGHT_PX}px;
		background-color: ${SETTINGS_COLOR_INPUT_BG};
		border-radius: ${SETTINGS_PROGRESS_TRACK_RADIUS_PX}px;
		overflow: hidden;
		position: relative;
	`;

	const progressFill = DOM.append(progressTrack, DOM.$('div.indexing-progress-fill'));
	progressFill.style.cssText = `
		width: 0%;
		height: 100%;
		background-color: ${SETTINGS_COLOR_PROGRESS_FILL};
		border-radius: ${SETTINGS_PROGRESS_FILL_RADIUS_PX}px;
		transition: width 0.3s ease, background-color 0.3s ease;
	`;

	const progressDetails = DOM.append(progressBarContainer, DOM.$('div.indexing-progress-details'));
	progressDetails.style.cssText = `${SETTINGS_DESCRIPTION_FONT_STYLE} color: ${SETTINGS_COLOR_DESCRIPTION};`;

	// Buttons footer - single row with all controls
	const progressFooter = DOM.append(progressContainer, DOM.$('div.indexing-progress-footer'));
	progressFooter.style.cssText = `display: flex; gap: ${SETTINGS_RIGHT_BUTTON_ROW_GAP_PX}px; justify-content: space-between; align-items: center;`;

	// Left side: Status pill and Vector indicator
	const leftStatusRow = DOM.append(progressFooter, DOM.$('div.left-status-row'));
	leftStatusRow.style.cssText = `display: flex; align-items: center; gap: ${SETTINGS_RIGHT_BUTTON_ROW_GAP_PX}px; flex-shrink: 1; min-width: 0;`;

	// Add status pill to left side
	DOM.append(leftStatusRow, statusPill);

	// Add vector indicator to left side
	DOM.append(leftStatusRow, vectorIndicator);

	// Right side: Toggle (Play/Pause), Sync, Delete buttons (icon-only, same design as docs indexing right button row)
	const rightButtonsRow = DOM.append(progressFooter, DOM.$('div.right-buttons-row'));
	rightButtonsRow.style.cssText = `display: flex; gap: ${SETTINGS_RIGHT_BUTTON_ROW_GAP_PX}px; flex-shrink: 0;`;

	const codebaseIconButtonStyle = SETTINGS_RIGHT_BUTTON_ROW_ICON_BUTTON_STYLE + ' user-select: none;';

	// Toggle button (Play/Pause combined)
	const toggleButton = DOM.append(rightButtonsRow, DOM.$('div'));
	toggleButton.style.cssText = codebaseIconButtonStyle;
	const toggleIcon = DOM.append(toggleButton, DOM.$('span.codicon.codicon-play'));
	toggleIcon.style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_STYLE;
	toggleButton.title = 'Start indexing';
	toggleButton.setAttribute('aria-label', 'Start indexing');
	toggleButton.setAttribute('tabindex', '0');
	toggleButton.setAttribute('role', 'button');

	// Sync button
	const syncButton = DOM.append(rightButtonsRow, DOM.$('div'));
	syncButton.style.cssText = codebaseIconButtonStyle;
	const syncIcon = DOM.append(syncButton, DOM.$('span.codicon.codicon-refresh'));
	syncIcon.style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_STYLE;
	syncButton.title = 'Sync index';
	syncButton.setAttribute('aria-label', 'Sync index');
	syncButton.setAttribute('tabindex', '0');
	syncButton.setAttribute('role', 'button');

	// Delete Index button
	const deleteButton = DOM.append(rightButtonsRow, DOM.$('div'));
	deleteButton.style.cssText = codebaseIconButtonStyle;
	const deleteIcon = DOM.append(deleteButton, DOM.$('span.codicon.codicon-trash'));
	deleteIcon.style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_STYLE;
	deleteButton.title = 'Delete index';
	deleteButton.setAttribute('aria-label', 'Delete index');
	deleteButton.setAttribute('tabindex', '0');
	deleteButton.setAttribute('role', 'button');


	// Store last formatted timestamp to avoid recalculation on every update
	let lastFormattedTimestamp: { time: number; formatted: string } | null = null;

	// Removed: File change feedback tracking and context preview UI elements

	// Function to update progress UI based on status
	const updateProgressUI = (status: ExtendedIndexStatus | null) => {
		// Get current indexing enabled state (may have changed via toggle)
		const currentIndexingEnabled = configurationService.getValue<boolean>(CONFIG_CLOUD_INDEXING_ENABLED) ?? false;

		// UI update (verbose logging removed)
		// Phase 12: Update status pill
		if (!hasValidWorkspace) {
			statusPillIcon.className = 'codicon codicon-folder';
			statusPillText.textContent = 'No Workspace';
			statusPill.style.backgroundColor = 'var(--vscode-list-inactiveSelectionBackground, rgba(128, 128, 128, 0.1))';
			statusPill.style.borderColor = 'var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.4)))';
			statusPill.style.color = 'var(--vscode-foreground)';
			statusPillIcon.style.color = 'var(--vscode-foreground)';
		} else if (!currentIndexingEnabled) {
			statusPillIcon.className = 'codicon codicon-circle-outline';
			statusPillText.textContent = 'Disabled';
			statusPill.style.backgroundColor = 'var(--vscode-list-inactiveSelectionBackground, rgba(128, 128, 128, 0.1))';
			statusPill.style.borderColor = 'var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.4)))';
			statusPill.style.color = 'var(--vscode-foreground)';
			statusPillIcon.style.color = 'var(--vscode-foreground)';
		} else if (!status) {
			statusPillIcon.className = 'codicon codicon-loading codicon-modifier-spin';
			statusPillText.textContent = 'Loading...';
			statusPill.style.backgroundColor = 'var(--vscode-list-inactiveSelectionBackground, rgba(128, 128, 128, 0.1))';
			statusPill.style.borderColor = 'var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.4)))';
			statusPill.style.color = 'var(--vscode-foreground)';
			statusPillIcon.style.color = 'var(--vscode-foreground)';
		} else {
			const state = status.state;
			if (status.paused) {
				statusPillIcon.className = 'codicon codicon-debug-pause';
				statusPillText.textContent = 'Paused';
				statusPill.style.backgroundColor = 'rgba(255, 200, 0, 0.25)';
				statusPill.style.borderColor = 'rgba(255, 200, 0, 0.4)';
				statusPill.style.color = 'var(--vscode-foreground)';
				statusPillIcon.style.color = 'var(--vscode-foreground)';
			} else if (status.rebuilding) {
				statusPillIcon.className = 'codicon codicon-loading codicon-modifier-spin';
				statusPillText.textContent = 'Rebuilding';
				statusPill.style.backgroundColor = 'rgba(0, 100, 255, 0.25)';
				statusPill.style.borderColor = 'rgba(0, 100, 255, 0.4)';
				statusPill.style.color = 'var(--vscode-foreground)';
				statusPillIcon.style.color = 'var(--vscode-foreground)';
			} else if (state === IndexState.Building || state === IndexState.Indexing) {
				statusPillIcon.className = 'codicon codicon-sync codicon-modifier-spin';
				statusPillText.textContent = 'Building';
				statusPill.style.backgroundColor = 'rgba(0, 100, 255, 0.25)';
				statusPill.style.borderColor = 'rgba(0, 100, 255, 0.4)';
				statusPill.style.color = 'var(--vscode-foreground)';
				statusPillIcon.style.color = 'var(--vscode-foreground)';
			} else if (state === IndexState.Ready) {
				statusPillIcon.className = 'codicon codicon-verified-filled';
				statusPillText.textContent = 'Ready';
				statusPill.style.backgroundColor = 'rgba(0, 200, 0, 0.2)';
				statusPill.style.borderColor = 'rgba(0, 200, 0, 0.4)';
				statusPill.style.color = 'rgb(0, 150, 0)';
				statusPillIcon.style.color = 'rgb(0, 150, 0)';
				statusPill.title = 'Index is ready and up to date';
			} else if (state === IndexState.Degraded || state === IndexState.Error) {
				statusPillIcon.className = 'codicon codicon-warning';
				statusPillText.textContent = state === IndexState.Degraded ? 'Degraded' : 'Error';
				statusPill.style.backgroundColor = 'rgba(255, 0, 0, 0.25)';
				statusPill.style.borderColor = 'rgba(255, 0, 0, 0.4)';
				statusPill.style.color = 'var(--vscode-foreground)';
				statusPillIcon.style.color = 'var(--vscode-foreground)';
			} else if (state === IndexState.Idle || state === IndexState.Uninitialized) {
				statusPillIcon.className = 'codicon codicon-circle-outline';
				statusPillText.textContent = 'Idle';
				statusPill.style.backgroundColor = 'var(--vscode-list-inactiveSelectionBackground, rgba(128, 128, 128, 0.1))';
				statusPill.style.borderColor = 'var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.4)))';
				statusPill.style.color = 'var(--vscode-foreground)';
				statusPillIcon.style.color = 'var(--vscode-foreground)';
			} else {
				statusPillIcon.className = 'codicon codicon-loading codicon-modifier-spin';
				statusPillText.textContent = 'Loading...';
				statusPill.style.backgroundColor = 'var(--vscode-list-inactiveSelectionBackground, rgba(128, 128, 128, 0.1))';
				statusPill.style.borderColor = 'var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.4)))';
				statusPill.style.color = 'var(--vscode-foreground)';
				statusPillIcon.style.color = 'var(--vscode-foreground)';
			}
		}

		// Phase 12: Update vector readiness indicator (cloud indexing uses Pinecone)
		if (hasValidWorkspace && currentIndexingEnabled) {
			if (status && status.state === IndexState.Ready) {
				vectorIcon.className = 'codicon codicon-cloud';
				vectorText.textContent = 'Pinecone';
				vectorIndicator.style.backgroundColor = 'rgba(85, 165, 255, 0.15)';
				vectorIndicator.style.borderColor = 'rgba(85, 165, 255, 0.4)';
				vectorIndicator.style.color = 'rgb(50, 130, 220)';
				vectorIcon.style.color = 'rgb(50, 130, 220)';
				vectorIndicator.title = 'Vector: Pinecone (Cloud)';
			} else if (status) {
				vectorIcon.className = 'codicon codicon-cloud';
				vectorText.textContent = 'Pinecone';
				vectorIndicator.style.backgroundColor = 'rgba(150, 150, 150, 0.15)';
				vectorIndicator.style.borderColor = 'rgba(150, 150, 150, 0.3)';
				vectorIndicator.style.color = 'rgb(120, 120, 120)';
				vectorIcon.style.color = 'rgb(120, 120, 120)';
				vectorIndicator.title = 'Vector: Pinecone (Indexing...)';
			} else {
				vectorIcon.className = 'codicon codicon-loading codicon-modifier-spin';
				vectorText.textContent = 'Loading...';
				vectorIndicator.style.backgroundColor = 'var(--vscode-list-inactiveSelectionBackground, rgba(128, 128, 128, 0.1))';
				vectorIndicator.style.borderColor = 'var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.4)))';
				vectorIndicator.style.color = 'var(--vscode-foreground)';
				vectorIcon.style.color = 'var(--vscode-foreground)';
				vectorIndicator.title = 'Vector: Loading...';
			}
		} else {
			vectorIcon.className = 'codicon codicon-cloud';
			vectorText.textContent = 'N/A';
			vectorIndicator.style.backgroundColor = 'var(--vscode-list-inactiveSelectionBackground, rgba(128, 128, 128, 0.1))';
			vectorIndicator.style.borderColor = 'var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.4)))';
			vectorIndicator.style.color = 'var(--vscode-foreground)';
			vectorIcon.style.color = 'var(--vscode-foreground)';
			vectorIndicator.title = 'Vector: Not available';
		}

		// Update toggle button (combined Play/Pause)
		if (status) {
			const isIndexing = status.state === IndexState.Building || status.state === IndexState.Indexing;
			const isPaused = status.paused;
			const isRebuilding = status.rebuilding;

			// Toggle button: shows pause icon when indexing, play icon when paused/idle
			if (isPaused) {
				toggleIcon.className = 'codicon codicon-play';
				toggleButton.title = 'Resume indexing';
				toggleButton.setAttribute('aria-label', 'Resume indexing');
				toggleButton.style.opacity = '1';
				toggleButton.style.pointerEvents = 'auto';
			} else if (isIndexing && !isRebuilding) {
				toggleIcon.className = 'codicon codicon-debug-pause';
				toggleButton.title = 'Pause indexing';
				toggleButton.setAttribute('aria-label', 'Pause indexing');
				toggleButton.style.opacity = '1';
				toggleButton.style.pointerEvents = 'auto';
			} else {
				// Idle or rebuilding - show play to start/resume
				toggleIcon.className = 'codicon codicon-play';
				toggleButton.title = 'Start indexing';
				toggleButton.setAttribute('aria-label', 'Start indexing');
				toggleButton.style.opacity = isRebuilding ? '0.5' : '1';
				toggleButton.style.pointerEvents = isRebuilding ? 'none' : 'auto';
			}
		} else {
			toggleIcon.className = 'codicon codicon-play';
			toggleButton.title = 'Start indexing';
			toggleButton.setAttribute('aria-label', 'Start indexing');
			toggleButton.style.opacity = '0.5';
			toggleButton.style.pointerEvents = 'none';
		}

		// Model status UI removed - cloud indexing doesn't need model download status

		if (!hasValidWorkspace || !currentIndexingEnabled) {
			// No workspace or indexing disabled
			progressValueLabel.textContent = 'Not indexed';
			progressFill.style.width = '0%';
			if (!hasValidWorkspace) {
				progressDetails.textContent = 'Open a workspace folder to start indexing.';
			} else {
				progressDetails.textContent = 'Enable cloud indexing to start indexing your codebase.';
			}
			progressBarContainer.setAttribute('aria-valuenow', '0');
			progressBarContainer.setAttribute('aria-valuetext', 'Not indexed');

			syncButton.style.opacity = '0.5';
			syncButton.style.pointerEvents = 'none';
			deleteButton.style.opacity = '0.5';
			deleteButton.style.pointerEvents = 'none';
			lastFormattedTimestamp = null;
			return;
		}

		// Indexing is enabled and workspace is valid
		if (!status) {
			// Status is null but indexing is enabled - show loading state
			progressValueLabel.textContent = 'Loading...';
			progressFill.style.width = '0%';
			progressDetails.textContent = 'Loading index status...';
			progressBarContainer.setAttribute('aria-valuenow', '0');
			progressBarContainer.setAttribute('aria-valuetext', 'Loading');

			syncButton.style.opacity = '0.5';
			syncButton.style.pointerEvents = 'none';
			deleteButton.style.opacity = '0.5';
			deleteButton.style.pointerEvents = 'none';
			lastFormattedTimestamp = null;
			return;
		}

		// Update model status (now that we know status exists)
		// Remove the duplicate check we added earlier since we handle it above

		const indexedFiles = status.indexedFiles ?? status.indexedFileCount ?? 0;
		// CRITICAL FIX: Handle case where totalFiles is 0 but indexedFiles > 0 (Windows-specific issue)
		// If totalFiles is undefined or 0, but we have indexed files, use indexedFiles as the total
		// This prevents showing 0% when we actually have files indexed (e.g., 81 files indexed but 0% shown)
		let totalFiles = status.totalFiles ?? 0;

		// Windows-specific fix: If totalFiles is 0 but we have indexed files, use indexedFiles as total
		// This handles the case where the database query returns 0 for totalFiles but files are actually indexed
		// This is a known issue on Windows where totalFiles might not be tracked correctly
		// Guard: only apply this fix when we are truly in a completed/ready state, otherwise it can
		// incorrectly show 100% for partial cloud indexes (e.g., after restart).
		if (totalFiles === 0 && indexedFiles > 0 && status.state === IndexState.Ready && !!status.lastFullScanTime) {
			// If totalFiles is 0 but we have indexed files, use indexedFiles as the total
			// This ensures percentage calculation works: 81/81 = 100% instead of 81/0 = undefined
			totalFiles = indexedFiles;
		}

		// Calculate indexing percentage (single progress bar like Cursor)
		// Shows decimals for smooth progress (0.1%, 1.2%, 99.9%, 100%)
		let percentage = 0;

		if (indexedFiles > 0) {
			if (totalFiles > 0) {
				const rawPercentage = (indexedFiles / totalFiles) * 100;
				// Round to 1 decimal place, allow up to 100% during any state
				percentage = Math.min(100, Math.max(0.1, Math.round(rawPercentage * 10) / 10));
			} else {
				// totalFiles is 0 but we have indexed files - show 100% (tracking issue)
				percentage = 100;
			}
		} else if (indexedFiles === 0 && totalFiles > 0) {
			// No files indexed yet, but we know the total - show 0%
			percentage = 0;
		} else {
			// No files indexed and no total - show 0%
			percentage = 0;
		}

		// Update progress bar
		progressFill.style.width = `${percentage}%`;
		progressBarContainer.setAttribute('aria-valuenow', String(percentage));
		progressBarContainer.setAttribute('aria-valuetext', `${percentage}%`);

		// Update structural indexing status
		switch (status.state) {
			case IndexState.Uninitialized:
			case IndexState.Idle:
				// CRITICAL FIX: Use calculated percentage if we have indexed files, don't hardcode 0%
				// This fixes Windows issue where state is Idle but files are indexed
				progressValueLabel.textContent = `${percentage}%`;
				progressFill.style.width = `${percentage}%`;
				// Reset to normal green when not paused
				progressFill.style.backgroundColor = SETTINGS_COLOR_PROGRESS_FILL;
				// After rebuild, show 0 files indexed (not stale totalFiles count)
				if (indexedFiles === 0 && totalFiles === 0) {
					progressDetails.textContent = 'Not indexed • Click Sync to start indexing.';
				} else if (indexedFiles === 0 && totalFiles > 0) {
					progressDetails.textContent = `0 files indexed of ${totalFiles.toLocaleString()} discovered • Click Sync to start indexing.`;
				} else {
					// Show actual counts if they exist (Windows fix: shows "81 files indexed" with correct percentage)
					progressDetails.textContent = `${indexedFiles.toLocaleString()} files indexed`;
				}
				syncButton.style.opacity = '1';
				syncButton.style.pointerEvents = 'auto';
				break;
			case IndexState.Building:
			case IndexState.Indexing: {
				progressValueLabel.textContent = `${percentage}%`;
				const totalChunksIndexing = status.totalChunks ?? 0;

				// Check if paused - show different message and yellow progress bar
				if (status.paused) {
					let pausedText = `Indexing paused - ${indexedFiles.toLocaleString()} of ${totalFiles.toLocaleString()} files`;
					if (totalChunksIndexing > 0) {
						pausedText += ` (${totalChunksIndexing.toLocaleString()} chunks)`;
					}
					progressDetails.textContent = pausedText;
					// Make progress bar yellow when paused
					progressFill.style.backgroundColor = 'rgb(255, 200, 0)'; // Yellow
				} else if (status.state === IndexState.Building) {
					// Building phase (file discovery / warm-up)
					progressDetails.textContent = 'Starting indexing...';
					progressFill.style.backgroundColor = SETTINGS_COLOR_PROGRESS_FILL;
				} else {
					// Not paused - normal indexing state
					// If we're structurally complete (100% or indexedFiles >= totalFiles),
					// keep showing the "X files indexed" message instead of "Indexing X/Y"
					// to avoid the confusing "Indexing 17/17 files" state after completion.
					if (indexedFiles < totalFiles && percentage < 100) {
						let indexingText = `Indexing... ${indexedFiles.toLocaleString()} of ${totalFiles.toLocaleString()} files`;
						if (totalChunksIndexing > 0) {
							indexingText += ` (${totalChunksIndexing.toLocaleString()} chunks)`;
						}
						progressDetails.textContent = indexingText;
					} else {
						let completedText = `${indexedFiles.toLocaleString()} files indexed`;
						if (totalChunksIndexing > 0) {
							completedText += ` (${totalChunksIndexing.toLocaleString()} chunks)`;
						}
						progressDetails.textContent = completedText;
					}
					// Normal green progress bar
					progressFill.style.backgroundColor = SETTINGS_COLOR_PROGRESS_FILL;
				}
syncButton.style.opacity = '0.5';
			syncButton.style.pointerEvents = 'none';
				break;
			}
			case IndexState.Degraded: {
				progressValueLabel.textContent = `${percentage}%`;
				progressFill.style.backgroundColor = 'rgb(255, 140, 0)'; // Orange
				const reason = status.degradedReason || status.lastErrorMessage || status.errorMessage || 'Indexing incomplete';
				if (totalFiles > 0) {
					progressDetails.textContent = `${reason} • ${indexedFiles.toLocaleString()} of ${totalFiles.toLocaleString()} files indexed`;
				} else {
					progressDetails.textContent = reason;
				}
				syncButton.style.opacity = '1';
				syncButton.style.pointerEvents = 'auto';
				break;
			}
			case IndexState.Ready:
			case IndexState.Stale: {
				progressValueLabel.textContent = `${percentage}%`;
				progressFill.style.backgroundColor = SETTINGS_COLOR_PROGRESS_FILL;
				// Task C: Show files indexed, and optionally chunks (vectors) for completeness
				const totalChunks = status.totalChunks ?? 0;
				let detailsText = `${indexedFiles.toLocaleString()} files indexed`;
				if (totalChunks > 0) {
					detailsText += ` (${totalChunks.toLocaleString()} chunks)`;
				}
				progressDetails.textContent = detailsText;
				// Only show "Last synced" when indexing is truly complete (100% and Ready state)
				if (status.lastIndexedTime && status.state === IndexState.Ready && percentage === 100 && indexedFiles >= totalFiles) {
					// Only recalculate timestamp if lastIndexedTime actually changed
					const lastIndexed = new Date(status.lastIndexedTime);
					if (!lastFormattedTimestamp || lastFormattedTimestamp.time !== status.lastIndexedTime) {
						lastFormattedTimestamp = {
							time: status.lastIndexedTime,
							formatted: formatTimeAgo(lastIndexed)
						};
					}
					progressDetails.textContent += ` • Last synced ${lastFormattedTimestamp.formatted}`;
				}
				syncButton.style.opacity = '1';
				syncButton.style.pointerEvents = 'auto';
				break;
			}
			case IndexState.Error:
				progressValueLabel.textContent = 'Error';
				progressDetails.textContent = status.errorMessage || 'An error occurred during indexing.';
				progressFill.style.width = '0%';
				syncButton.style.opacity = '1';
				syncButton.style.pointerEvents = 'auto';
				break;
		}

		// Model download status removed - cloud indexing uses Voyage AI API (no local model)

		deleteButton.style.opacity = indexedFiles > 0 ? '1' : '0.5';
		deleteButton.style.pointerEvents = indexedFiles > 0 ? 'auto' : 'none';
	};

	// Helper function to format time ago
	const formatTimeAgo = (date: Date): string => {
		const now = Date.now();
		const diff = now - date.getTime();
		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(diff / 3600000);
		const days = Math.floor(diff / 86400000);

		if (minutes < 1) return 'just now';
		if (minutes < 60) return `${minutes}m ago`;
		if (hours < 24) return `${hours}h ago`;
		return `${days}d ago`;
	};

	// Load initial status - show loading state while fetching
	let currentStatus: ExtendedIndexStatus | null = null;
	if (hasValidWorkspace && indexingEnabled && indexingWorkspace) {
		// Show loading state immediately
		progressValueLabel.textContent = 'Loading...';
		progressDetails.textContent = 'Loading index status...';

		// Wait a brief moment for auto-index check to run, then get status
		// This prevents showing stale data (e.g., "1 file" from file watcher) before full scan completes
		setTimeout(async () => {
			const status = await fetchStatusWithTimeout(indexingWorkspace, 5000);
			if (status) {
				currentStatus = status;
				updateProgressUI(status);
			} else {
				// Timeout or error - show default idle state instead of stuck "Loading..."
				const defaultStatus: ExtendedIndexStatus = {
					workspace: indexingWorkspace as any,
					state: IndexState.Idle,
					totalFiles: 0,
					indexedFiles: 0,
					totalChunks: 0,
					embeddedChunks: 0,
					paused: false,
					modelDownloadState: 'ready',
				};
				currentStatus = defaultStatus;
				updateProgressUI(defaultStatus);
			}
		}, 150); // Wait 150ms for auto-index check to potentially start (it runs after 100ms)
	} else {
		updateProgressUI(null);
	}

	// Listen to status changes
	if (hasValidWorkspace && indexingEnabled && indexingWorkspace) {
		disposables.add(indexService.onDidChangeStatus((status: IndexStatus) => {
			// Status event received (detailed counts logged in ext host)
			// Compare workspace using canonical keys to handle different representations
			// Both single-folder and workspace formats should match if they represent the same workspace
			let statusWorkspaceKey: string;
			if (isSingleFolderWorkspaceIdentifier(status.workspace)) {
				statusWorkspaceKey = status.workspace.uri.fsPath.replace(/[/\\]+$/, '').replace(/\\/g, '/');
			} else if (isWorkspaceIdentifier(status.workspace) && status.workspace.configPath) {
				const configPath = URI.isUri(status.workspace.configPath) ? status.workspace.configPath.fsPath : status.workspace.configPath;
				statusWorkspaceKey = configPath.replace(/[/\\]+$/, '').replace(/\\/g, '/');
			} else {
				statusWorkspaceKey = status.workspace.id;
			}

			let currentWorkspaceKey: string;
			if (isSingleFolderWorkspaceIdentifier(indexingWorkspace)) {
				currentWorkspaceKey = indexingWorkspace.uri.fsPath.replace(/[/\\]+$/, '').replace(/\\/g, '/');
			} else if (isWorkspaceIdentifier(indexingWorkspace) && indexingWorkspace.configPath) {
				const configPath = URI.isUri(indexingWorkspace.configPath) ? indexingWorkspace.configPath.fsPath : indexingWorkspace.configPath;
				currentWorkspaceKey = configPath.replace(/[/\\]+$/, '').replace(/\\/g, '/');
			} else {
				currentWorkspaceKey = indexingWorkspace.id;
			}

			// Update if workspace keys match (canonical comparison)
			if (statusWorkspaceKey === currentWorkspaceKey || (indexingWorkspace && status.workspace.id === indexingWorkspace.id)) {
				currentStatus = status;
				updateProgressUI(status);
			}
		}));

		// Poll for status updates (configurable, default 5s) - with timeout protection
		const pollIntervalMs = configurationService.getValue<number>('vybe.localIndexing.statusPollInterval') ?? 5000;
		const pollInterval = setInterval(async () => {
			const status = await fetchStatusWithTimeout(indexingWorkspace!, 3000); // Shorter timeout for polling
			if (status) {
				// Only update if values actually changed to prevent flickering
				// Compare all relevant fields to detect real changes
				// Use strict equality checks and ignore timestamp-only changes
				const hasChanged = !currentStatus ||
					currentStatus.embeddedChunks !== status.embeddedChunks ||
					currentStatus.totalChunks !== status.totalChunks ||
					currentStatus.embeddingPending !== status.embeddingPending ||
					currentStatus.embeddingInProgress !== status.embeddingInProgress ||
					currentStatus.embeddingActiveBatches !== status.embeddingActiveBatches ||
					currentStatus.state !== status.state ||
					currentStatus.indexedFiles !== status.indexedFiles ||
					currentStatus.totalFiles !== status.totalFiles ||
					currentStatus.modelDownloadState !== status.modelDownloadState ||
					currentStatus.modelDownloadProgress !== status.modelDownloadProgress ||
					currentStatus.modelDownloadMessage !== status.modelDownloadMessage;

				// Only update if values actually changed - don't update on timestamp-only changes
				// This prevents flickering when status is polled but nothing actually changed
				if (hasChanged) {
					currentStatus = status;
					updateProgressUI(status);
				}
			}
			// If status fetch fails/times out, keep current status (don't reset to loading)
		}, pollIntervalMs);

		disposables.add({ dispose: () => clearInterval(pollInterval) });
	}

	// Removed: Recent Indexing Activity section
	// Removed: Context Preview section (dev-only)

	// Wire up toggle button (combined Play/Pause) - calls service methods directly for instant action
	addDisposableListener(toggleButton, EventType.CLICK, async () => {
		if (!indexingWorkspace || !hasValidWorkspace || !indexingEnabled) {
			return;
		}

		try {
			// Check current state to determine action
			if (currentStatus?.paused) {
				// Currently paused - resume (no dialog for quick toggle)
				await indexService.resume(indexingWorkspace);
			} else if (currentStatus?.state === IndexState.Building || currentStatus?.state === IndexState.Indexing) {
				// Currently indexing - pause (no dialog for quick toggle)
				await indexService.pause(indexingWorkspace, 'User toggled pause');
			} else {
				// Idle/Ready - start indexing
				const tokenSource = new CancellationTokenSource();
				disposables.add(tokenSource);
				const anyIndexService = indexService as any;
				if (typeof anyIndexService.buildFullIndex === 'function') {
					await anyIndexService.buildFullIndex(indexingWorkspace, tokenSource.token);
				}
			}
		} catch (error) {
			// Ignore errors - status will be updated via events
		}
	});

	// Removed: Context preview event handler

	// Wire up Sync button
	let syncInProgress = false;
	const syncIconEl = syncButton.querySelector('.codicon') as HTMLElement;
	addDisposableListener(syncButton, EventType.CLICK, async () => {
		if (!hasValidWorkspace || !indexingEnabled || !indexingWorkspace || syncInProgress) {
			return;
		}

		syncInProgress = true;
syncButton.style.opacity = '0.5';
			syncButton.style.pointerEvents = 'none';
		if (syncIconEl) {
			// Remove refresh icon and add loading spinner with spin modifier
			syncIconEl.classList.remove('codicon-refresh');
			syncIconEl.classList.add('codicon-loading', 'codicon-modifier-spin');
		}

		try {
			const tokenSource = new CancellationTokenSource();
			disposables.add(tokenSource);
			// Use incremental sync instead of full reindex
			// This will only index changed/new files, not all files
			// Add timeout to prevent hanging forever (5 minutes max)
			const anyIndexService = indexService as any;
			let syncPromise: Promise<any>;
			if (typeof anyIndexService.refreshIndex === 'function') {
				syncPromise = anyIndexService.refreshIndex(indexingWorkspace, tokenSource.token);
			} else if (typeof anyIndexService.buildFullIndex === 'function') {
				syncPromise = anyIndexService.buildFullIndex(indexingWorkspace, tokenSource.token);
			} else if (typeof anyIndexService.refreshPaths === 'function') {
				// Best-effort fallback for older IndexService versions
				syncPromise = anyIndexService.refreshPaths(indexingWorkspace, [], tokenSource.token);
			} else {
				syncPromise = Promise.resolve();
			}
			const timeoutPromise = new Promise<IndexStatus>((_, reject) => {
				setTimeout(() => {
					tokenSource.cancel();
					reject(new Error('Sync operation timed out after 5 minutes'));
				}, 5 * 60 * 1000); // 5 minutes
			});
			await Promise.race([syncPromise, timeoutPromise]);
		} catch (error) {
			// Refresh status to get current state
			try {
				const latestStatus = await (indexService as any).getStatus(indexingWorkspace!);
				updateProgressUI(latestStatus as ExtendedIndexStatus);
			} catch {
				updateProgressUI({
					workspace: indexingWorkspace as any,
					state: IndexState.Error,
					errorMessage: error instanceof Error ? error.message : 'Unknown error'
				} as ExtendedIndexStatus);
			}
		} finally {
			syncInProgress = false;
			if (syncIconEl) {
				// Remove loading spinner and restore refresh icon
				syncIconEl.classList.remove('codicon-loading', 'codicon-modifier-spin');
				syncIconEl.classList.add('codicon-refresh');
			}
			syncButton.style.opacity = '1';
			syncButton.style.pointerEvents = 'auto';
		}
	});

	// Wire up Delete Index button
	addDisposableListener(deleteButton, EventType.CLICK, async () => {
		if (!hasValidWorkspace || !indexingEnabled || !indexingWorkspace || !currentStatus || (currentStatus.indexedFiles ?? 0) === 0) {
			return;
		}

		// Show confirmation (for now, just proceed - can add dialog later)
		const confirmed = confirm('Are you sure you want to delete the index? This will remove all indexed data for this workspace.');
		if (!confirmed) {
			return;
		}

		deleteButton.style.opacity = '0.5';
		deleteButton.style.pointerEvents = 'none';

		try {
			const anyIndexService = indexService as any;
			if (typeof anyIndexService.deleteIndex === 'function') {
				// Delete all index data for this workspace when supported
				await anyIndexService.deleteIndex(indexingWorkspace);
				// Status will be updated via the onDidChangeStatus event
			} else {
				// Older backends may not support deleteIndex; treat as no-op
			}
		} catch (error) {
			updateProgressUI({
				workspace: indexingWorkspace as any,
				state: IndexState.Error,
				errorMessage: error instanceof Error ? error.message : 'Failed to delete index'
			} as ExtendedIndexStatus);
		} finally {
			deleteButton.style.opacity = '1';
			deleteButton.style.pointerEvents = 'auto';
		}
	});


	// Second sub-section: Index New Folders and Ignore Files
	const settingsSubSection = DOM.append(codebaseSectionList, DOM.$('.vybe-settings-sub-section'));
	const settingsSubSectionList = DOM.append(settingsSubSection, DOM.$('.vybe-settings-sub-section-list'));
	settingsSubSectionList.style.cssText = `
		display: flex;
		flex-direction: column;
		background-color: var(--vscode-activityBar-background);
		border-radius: 8px;
		gap: 0;
	`;

	createCell(settingsSubSectionList, {
		label: 'Index New Folders',
		description: 'Automatically index any new folders with fewer than 50,000 files',
		action: { type: 'switch', checked: true }
	});

	// Ignore Files cell with pencil icon button (same design as doc indexing right button row)
	const ignoreCell = createCell(settingsSubSectionList, {
		label: 'Ignore Files in .vybeignore',
		description: 'Files to exclude from indexing in addition to .gitignore.',
		action: null,
		hasDivider: true
	});

	const ignoreTrailing = ignoreCell.querySelector('.vybe-settings-cell-trailing-items') as HTMLElement;
	if (ignoreTrailing) {
		DOM.clearNode(ignoreTrailing);
		ignoreTrailing.style.cssText = 'flex-shrink: 0; display: flex; align-items: center; justify-content: flex-end;';
		const editBtn = DOM.append(ignoreTrailing, DOM.$('div.docs-button'));
		editBtn.title = 'Edit';
		editBtn.style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_BUTTON_STYLE;
		const editIcon = DOM.append(editBtn, DOM.$('span.codicon.codicon-pencil'));
		editIcon.style.cssText = SETTINGS_RIGHT_BUTTON_ROW_ICON_STYLE;
	}

	// Docs section — Cursor order: header then section-list (use existing list from createSection)
	const docsSection = createSection(parent, null);
	docsSection.id = 'vybe-settings-docs';

	const docsSectionList = docsSection.querySelector('.vybe-settings-section-list') as HTMLElement;

	// Build header and insert before section list so DOM order matches Cursor
	const docsHeader = DOM.$('.vybe-settings-section-header');
	docsHeader.style.cssText = `display: flex; align-items: flex-end; gap: ${SETTINGS_SECTION_HEADER_GAP_PX}px; padding: 0;`;

	const docsLeading = DOM.append(docsHeader, DOM.$('.vybe-settings-section-header-leading-items'));
	docsLeading.style.cssText = 'display: flex; flex-direction: column; gap: 2px; flex: 1;';

	const docsTitleRow = DOM.append(docsLeading, DOM.$('.vybe-settings-section-header-title-row'));
	docsTitleRow.style.cssText = 'display: flex; align-items: center; gap: 4px;';

	const docsTitle = DOM.append(docsTitleRow, DOM.$('.vybe-settings-section-header-title'));
	docsTitle.textContent = 'Docs';
	docsTitle.style.cssText = SETTINGS_SECTION_TITLE_STYLE;

	const docsDesc = DOM.append(docsLeading, DOM.$('.vybe-settings-section-header-description'));
	docsDesc.textContent = 'Crawl and index custom resources and developer docs';
	docsDesc.style.cssText = SETTINGS_SECTION_DESCRIPTION_STYLE;

	const docsTrailing = DOM.append(docsHeader, DOM.$('.vybe-settings-section-header-trailing-items'));
	docsTrailing.style.cssText = 'flex-shrink: 0; display: flex; align-items: center;';

	const addDocBtn = createSectionHeaderAddButton(docsTrailing, 'Add Doc', { showIcon: true });

	docsSection.insertBefore(docsHeader, docsSectionList);

	// Section list (already exists; style it)
	docsSectionList.style.cssText = `
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		align-self: stretch;
		column-gap: ${SETTINGS_SECTION_LIST_GAP_PX}px;
		row-gap: ${SETTINGS_SECTION_LIST_GAP_PX}px;
		color: ${SETTINGS_COLOR_FOREGROUND};
		font-size: ${SETTINGS_LABEL_FONT_SIZE_PX}px;
		line-height: 18.2px;
		user-select: none;
	`;

	// Sub-section
	const docsSubSection = DOM.append(docsSectionList, DOM.$('.vybe-settings-sub-section'));
	docsSubSection.style.cssText = `
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		align-self: stretch;
		column-gap: ${SETTINGS_RIGHT_BUTTON_ROW_GAP_PX}px;
		row-gap: ${SETTINGS_RIGHT_BUTTON_ROW_GAP_PX}px;
		color: ${SETTINGS_COLOR_FOREGROUND};
		font-size: ${SETTINGS_LABEL_FONT_SIZE_PX}px;
		line-height: 18.2px;
		user-select: none;
	`;

	// Sub-section list (empty state + doc cells go here)
	const docsSubSectionList = DOM.append(docsSubSection, DOM.$('.vybe-settings-sub-section-list'));
	docsSubSectionList.style.cssText = `
		align-self: stretch;
		display: flex;
		flex-direction: column;
		column-gap: 0;
		row-gap: 0;
		background-color: ${SETTINGS_COLOR_ACTIVITY_BAR_BG};
		border-radius: ${SETTINGS_SUBSECTION_BORDER_RADIUS_PX}px;
		color: ${SETTINGS_COLOR_FOREGROUND};
		font-size: ${SETTINGS_LABEL_FONT_SIZE_PX}px;
		line-height: 18.2px;
		user-select: none;
	`;

	// D14–D19 – Docs empty state. Hidden when we show the add-doc cell or when we have doc cells.
	const docsEmptyStateWrapper = createSettingsListEmptyState(docsSubSectionList, 'No Docs Added', { addSpacer: true });

	function hasDocCells(): boolean {
		return docsSubSectionList.querySelectorAll('.settings-indexing-docs-cell:not(.settings-indexing-docs-add-cell)').length > 0;
	}

	function showEmptyStateIfNoDocs(): void {
		if (!hasDocCells()) {
			docsEmptyStateWrapper.style.display = 'flex';
		}
	}

	function showAddDocCell(): void {
		docsEmptyStateWrapper.style.display = 'none';
		const addCell = createAddDocCell(docsSubSectionList, disposables, (url, cell) => {
			renderStage2InCell(cell, url, disposables, (doc) => {
				const finalCell = createStage4DocCell(doc, { showDividerAbove: hasDocCells() }, disposables);
				docsSubSectionList.replaceChild(finalCell, cell);
			}, () => {
				addCell.remove();
				showEmptyStateIfNoDocs();
			});
			const firstInput = cell.querySelector('input') as HTMLInputElement;
			if (firstInput) {
				setTimeout(() => firstInput.focus(), 0);
			}
		}, () => {
			addCell.remove();
			showEmptyStateIfNoDocs();
		}, hasDocCells());
		const input = addCell.querySelector('input') as HTMLInputElement;
		if (input) {
			setTimeout(() => input.focus(), 0);
		}
	}

	addDisposableListener(addDocBtn, EventType.CLICK, () => showAddDocCell());

	// Local Indexing and Advanced Settings sections removed - using cloud indexing instead
}
