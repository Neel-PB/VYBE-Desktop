/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// VYBE: Inline composer widget — compact Lexical-based composer rendered in an editor
// view zone. Styled as a floating box matching Cursor's inline prompt bar.

import './media/vybeInlineComposer.css';

import { $, addDisposableListener, append, getWindow } from '../../../../../base/browser/dom.js';
import { Disposable, IDisposable } from '../../../../../base/common/lifecycle.js';
import { Emitter, Event } from '../../../../../base/common/event.js';
import { Codicon } from '../../../../../base/common/codicons.js';
import { ThemeIcon } from '../../../../../base/common/themables.js';
import { ICodeEditor, IViewZoneChangeAccessor } from '../../../../../editor/browser/editorBrowser.js';
import { IModelService } from '../../../../../editor/common/services/model.js';
import { ILanguageService } from '../../../../../editor/common/languages/language.js';
import { IThemeService } from '../../../../../platform/theme/common/themeService.js';

import {
	createEditor,
	$getRoot,
	$createParagraphNode,
	type LexicalEditor,
	registerPlainText,
	registerHistory,
	createEmptyHistoryState,
} from '../../../../../base/common/lexical/lexical.js';

import { MentionNode } from '../../../vybeChat/browser/components/composer/lexical/vybeMentionNode.js';
import { registerMentionPlugin, applyFileIconClasses } from '../../../vybeChat/browser/components/composer/lexical/vybeMentionPlugin.js';
import { showComposerDropdown, type ComposerDropdownItem } from '../../../vybeChat/browser/components/composer/vybeChatComposerDropdowns.js';
import { showInlineModelDropdown, type InlineModelDropdownState } from './vybeInlineModelDropdown.js';

const VIEW_ZONE_HEIGHT_PX = 66;
const VIEW_ZONE_PADDING_PX = 12;

type InlineMode = 'edit' | 'ask' | 'chat';
type ComposerState = 'idle' | 'generating' | 'completed';

const MODE_LABELS: Record<InlineMode, string> = {
	'edit': 'Edit Selection',
	'ask': 'Quick Question',
	'chat': 'Send to Chat',
};

const MODE_PLACEHOLDERS: Record<InlineMode, string> = {
	'edit': 'Edit selected code',
	'ask': 'Ask a quick question',
	'chat': 'Send to chat',
};


export class VybeInlineComposerWidget extends Disposable {

	private readonly _onClose = this._register(new Emitter<void>());
	readonly onClose: Event<void> = this._onClose.event;

	private readonly _onSend = this._register(new Emitter<string>());
	readonly onSend: Event<string> = this._onSend.event;

	private readonly _onStop = this._register(new Emitter<void>());
	readonly onStop: Event<void> = this._onStop.event;

	private readonly _onAccept = this._register(new Emitter<void>());
	readonly onAccept: Event<void> = this._onAccept.event;

	private readonly _onReject = this._register(new Emitter<void>());
	readonly onReject: Event<void> = this._onReject.event;

	readonly domNode: HTMLElement;
	private readonly composerBox: HTMLElement;
	private readonly editorElement: HTMLElement;
	private readonly placeholder: HTMLElement;
	private readonly sendButton: HTMLElement;
	private readonly sendIcon: HTMLElement;

	private lexicalEditor!: LexicalEditor;
	private viewZoneId: string | null = null;
	private currentLineNumber: number = 1;

	private currentMode: InlineMode = 'edit';
	private currentState: ComposerState = 'idle';

	private modelDropdownState: InlineModelDropdownState = {
		isAutoEnabled: true,
		selectedModelId: 'claude-sonnet',
		selectedModelLabel: 'Claude 3.5 Sonnet',
	};

	private modelPillLabel!: HTMLElement;
	private modePillLabel!: HTMLElement;
	private modelPill!: HTMLElement;
	private modelChevron!: HTMLElement;

	private loadingIndicator!: HTMLElement;
	private completionArea!: HTMLElement;
	private editCompletionArea!: HTMLElement;
	private editPromptDisplay!: HTMLElement;
	private completionDivider!: HTMLElement;
	private promptDisplay!: HTMLElement;
	private responseDisplay!: HTMLElement;
	private inputRow!: HTMLElement;
	private bottomBar!: HTMLElement;
	private completionModeAtSend: InlineMode = 'ask';

	private loadingDotsElement!: HTMLElement;
	private loadingAnimationInterval: number | null = null;
	private resizeObserver: ResizeObserver | null = null;
	private resizeDebounceTimeout: ReturnType<typeof setTimeout> | null = null;
	private lastViewZoneHeight: number = VIEW_ZONE_HEIGHT_PX;

	private modelDropdownDisposable: IDisposable | null = null;
	private modeDropdownDisposable: IDisposable | null = null;

	constructor(
		private readonly editor: ICodeEditor,
		@IThemeService private readonly themeService: IThemeService,
		@IModelService private readonly modelService: IModelService,
		@ILanguageService private readonly languageService: ILanguageService,
	) {
		super();

		this.domNode = $('div.vybe-inline-composer-zone');

		const row = append(this.domNode, $('div.vybe-inline-composer-row'));
		append(row, $('div.vybe-inline-composer-gutter'));

		this.composerBox = append(row, $('div.vybe-inline-composer-box'));

		this._register(addDisposableListener(this.composerBox, 'mousedown', (e) => {
			e.stopPropagation();
		}));
		this._register(addDisposableListener(this.composerBox, 'mouseup', (e) => {
			e.stopPropagation();
		}));

		this.completionArea = append(this.composerBox, $('div.vybe-inline-composer-completion'));
		this.completionArea.style.display = 'none';

		this.promptDisplay = append(this.completionArea, $('div.vybe-inline-composer-prompt-display'));
		this.responseDisplay = append(this.completionArea, $('div.vybe-inline-composer-response-display'));

		this.editCompletionArea = append(this.composerBox, $('div.vybe-inline-composer-edit-completion'));
		this.editCompletionArea.style.display = 'none';

		const editCompletionRow = append(this.editCompletionArea, $('div.vybe-inline-composer-edit-completion-row'));

		const editPromptContainer = append(editCompletionRow, $('div.vybe-inline-composer-edit-prompt-container'));
		this.editPromptDisplay = append(editPromptContainer, $('div.vybe-inline-composer-edit-prompt'));

		const editButtonsContainer = append(editPromptContainer, $('div.vybe-inline-composer-edit-buttons'));

		const rejectBtn = append(editButtonsContainer, $('button.vybe-inline-composer-reject-btn'));
		rejectBtn.textContent = 'Reject';
		this._register(addDisposableListener(rejectBtn, 'mousedown', (e) => {
			e.preventDefault();
			e.stopPropagation();
			this._onReject.fire();
		}));

		const acceptBtn = append(editButtonsContainer, $('button.vybe-inline-composer-accept-btn'));
		acceptBtn.textContent = 'Accept ⌘⏎';
		this._register(addDisposableListener(acceptBtn, 'mousedown', (e) => {
			e.preventDefault();
			e.stopPropagation();
			this._onAccept.fire();
		}));

		this.completionDivider = append(this.composerBox, $('div.vybe-inline-composer-divider'));
		this.completionDivider.style.display = 'none';

		this.inputRow = append(this.composerBox, $('div.vybe-inline-composer-input-row'));
		const inputFlex = append(this.inputRow, $('div.vybe-inline-composer-input-flex'));

		this.editorElement = append(inputFlex, $('div.vybe-inline-composer-editor'));
		this.editorElement.setAttribute('contenteditable', 'true');
		this.editorElement.setAttribute('spellcheck', 'false');
		this.editorElement.setAttribute('role', 'textbox');
		this.editorElement.setAttribute('tabindex', '0');

		this.placeholder = append(inputFlex, $('div.vybe-inline-composer-placeholder'));

		const closeBtn = append(this.inputRow, $('button.vybe-inline-composer-close'));
		closeBtn.title = 'Close';
		const closeIcon = append(closeBtn, $('span'));
		closeIcon.classList.add(...ThemeIcon.asClassNameArray(Codicon.close));

		this._register(addDisposableListener(closeBtn, 'mousedown', (e) => {
			e.preventDefault();
			e.stopPropagation();
			this._onClose.fire();
		}));

		this._register(addDisposableListener(inputFlex, 'mousedown', (e) => {
			e.stopPropagation();
			getWindow(this.domNode).requestAnimationFrame(() => this.lexicalEditor?.focus());
		}));

		this.bottomBar = append(this.composerBox, $('div.vybe-inline-composer-bottom-bar'));

		this.modelPill = append(this.bottomBar, $('div.vybe-inline-composer-model-pill'));
		this.modelPillLabel = append(this.modelPill, $('span'));
		this.modelPillLabel.textContent = 'Auto';
		this.modelChevron = append(this.modelPill, $('span'));
		this.modelChevron.classList.add(...ThemeIcon.asClassNameArray(Codicon.chevronDown));

		this._register(addDisposableListener(this.modelPill, 'mousedown', (e) => {
			e.preventDefault();
			e.stopPropagation();
			this._showModelDropdown(this.modelPill);
		}));

		this.loadingIndicator = append(this.bottomBar, $('div.vybe-inline-composer-loading'));
		this.loadingIndicator.style.display = 'none';
		const loadingText = append(this.loadingIndicator, $('span.vybe-inline-composer-loading-text'));
		loadingText.textContent = 'Generating';
		this.loadingDotsElement = append(this.loadingIndicator, $('span.vybe-inline-composer-loading-dots'));
		this.loadingDotsElement.textContent = '';

		append(this.bottomBar, $('div.vybe-inline-composer-spacer'));

		const modePill = append(this.bottomBar, $('div.vybe-inline-composer-mode-pill'));
		this.modePillLabel = append(modePill, $('span'));
		const modeChevron = append(modePill, $('span'));
		modeChevron.classList.add(...ThemeIcon.asClassNameArray(Codicon.chevronDown));

		this._register(addDisposableListener(modePill, 'mousedown', (e) => {
			e.preventDefault();
			e.stopPropagation();
			this._showModeDropdown(modePill);
		}));

		this.sendButton = append(this.bottomBar, $('div.vybe-inline-composer-send'));
		this.sendIcon = append(this.sendButton, $('span'));
		this.sendIcon.classList.add(...ThemeIcon.asClassNameArray(Codicon.arrowUp));
		this.sendIcon.style.color = 'var(--vscode-button-foreground, #ffffff)';
		this.sendButton.style.opacity = '0.35';
		this.sendButton.style.cursor = 'default';

		this._register(addDisposableListener(this.sendButton, 'mousedown', (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (this.currentState === 'generating') {
				this._stopGeneration();
			} else {
				this._submit();
			}
		}));

		const selection = this.editor.getSelection();
		this.currentMode = selection && !selection.isEmpty() ? 'edit' : 'ask';
		this._applyMode();

		this._initLexical();

		this._register(addDisposableListener(this.domNode, 'keydown', (e) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				e.stopPropagation();
				this._onClose.fire();
				return;
			}

			if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
				if (this.currentState === 'completed' && this.completionModeAtSend === 'edit') {
					e.preventDefault();
					e.stopPropagation();
					this._onAccept.fire();
				}
			}
		}));
	}

	private _applyMode(): void {
		this.modePillLabel.textContent = MODE_LABELS[this.currentMode];
		this.placeholder.textContent = MODE_PLACEHOLDERS[this.currentMode];
	}

	private _setState(state: ComposerState): void {
		this.currentState = state;

		switch (state) {
			case 'idle':
				this._stopLoadingAnimation();
				this._stopResizeObserver();
				this.modelPill.style.display = 'flex';
				this.loadingIndicator.style.display = 'none';
				this.completionArea.style.display = 'none';
				this.editCompletionArea.style.display = 'none';
				this.completionDivider.style.display = 'none';
				this.inputRow.style.display = 'flex';
				this.placeholder.textContent = MODE_PLACEHOLDERS[this.currentMode];
				this._setSendButtonIcon('send');
				this._updateSendEnabled();
				this._updateViewZoneHeight(VIEW_ZONE_HEIGHT_PX);
				break;

			case 'generating':
				this.modelPill.style.display = 'none';
				this.loadingIndicator.style.display = 'flex';
				this._startLoadingAnimation();
				this._setSendButtonIcon('stop');
				this.sendButton.style.opacity = '1';
				this.sendButton.style.cursor = 'pointer';
				break;

			case 'completed':
				this._stopLoadingAnimation();
				this.modelPill.style.display = 'flex';
				this.loadingIndicator.style.display = 'none';

				if (this.completionModeAtSend === 'edit') {
					this.completionArea.style.display = 'none';
					this.editCompletionArea.style.display = 'flex';
				} else {
					this.completionArea.style.display = 'flex';
					this.editCompletionArea.style.display = 'none';
				}

				this.completionDivider.style.display = 'block';
				this.inputRow.style.display = 'flex';
				this.placeholder.textContent = 'Add a follow-up';
				this._setSendButtonIcon('send');
				this._updateSendEnabled();
				this._startResizeObserver();
				getWindow(this.domNode).requestAnimationFrame(() => this._updateViewZoneToFitContent());
				break;
		}
	}

	private _setSendButtonIcon(type: 'send' | 'stop'): void {
		this.sendIcon.classList.remove(
			...ThemeIcon.asClassNameArray(Codicon.arrowUp),
			...ThemeIcon.asClassNameArray(Codicon.debugStop)
		);

		if (type === 'stop') {
			this.sendIcon.classList.add(...ThemeIcon.asClassNameArray(Codicon.debugStop));
		} else {
			this.sendIcon.classList.add(...ThemeIcon.asClassNameArray(Codicon.arrowUp));
		}
	}

	private _startLoadingAnimation(): void {
		const dotsEl = this.loadingDotsElement;
		if (!dotsEl) { return; }

		const win = getWindow(this.domNode);
		let dotCount = 0;
		this.loadingAnimationInterval = win.setInterval(() => {
			dotCount = (dotCount % 3) + 1;
			dotsEl.textContent = '.'.repeat(dotCount);
		}, 400);
	}

	private _stopLoadingAnimation(): void {
		if (this.loadingAnimationInterval) {
			const win = getWindow(this.domNode);
			win.clearInterval(this.loadingAnimationInterval);
			this.loadingAnimationInterval = null;
		}
		this.loadingDotsElement.textContent = '';
	}

	private _stopGeneration(): void {
		this._onStop.fire();
		this._setState('idle');
	}

	private _showCompletion(prompt: string, response: string): void {
		if (this.completionModeAtSend === 'edit') {
			this.editPromptDisplay.textContent = prompt;
		} else {
			this.promptDisplay.textContent = prompt;

			while (this.responseDisplay.firstChild) {
				this.responseDisplay.removeChild(this.responseDisplay.firstChild);
			}

			const markdownRoot = document.createElement('div');
			markdownRoot.className = 'markdown-root';
			markdownRoot.setAttribute('data-size', 'md');

			const contentDiv = document.createElement('div');
			contentDiv.className = 'space-y-4 whitespace-normal';

			const paragraph = document.createElement('p');
			paragraph.textContent = response;
			contentDiv.appendChild(paragraph);
			markdownRoot.appendChild(contentDiv);
			this.responseDisplay.appendChild(markdownRoot);
		}

		this._setState('completed');
	}

	private _updateViewZoneHeight(heightPx: number): void {
		if (this.viewZoneId !== null) {
			this.editor.changeViewZones((accessor: IViewZoneChangeAccessor) => {
				if (this.viewZoneId !== null) {
					accessor.removeZone(this.viewZoneId);
					this.viewZoneId = accessor.addZone({
						afterLineNumber: this.currentLineNumber - 1,
						heightInPx: heightPx,
						domNode: this.domNode,
						suppressMouseDown: false,
					});
				}
			});
		}
	}

	private _updateViewZoneToFitContent(): void {
		const boxHeight = this.composerBox.getBoundingClientRect().height;
		const requiredHeight = Math.ceil(boxHeight + VIEW_ZONE_PADDING_PX);
		this.lastViewZoneHeight = requiredHeight;
		this._updateViewZoneHeight(requiredHeight);
	}

	private _startResizeObserver(): void {
		if (this.resizeObserver) { return; }

		this.resizeObserver = new ResizeObserver(() => {
			if (this.currentState === 'completed') {
				if (this.resizeDebounceTimeout) {
					clearTimeout(this.resizeDebounceTimeout);
				}
				this.resizeDebounceTimeout = setTimeout(() => {
					this._updateViewZoneToFitContentIfNeeded();
				}, 16);
			}
		});
		this.resizeObserver.observe(this.composerBox);
	}

	private _stopResizeObserver(): void {
		if (this.resizeDebounceTimeout) {
			clearTimeout(this.resizeDebounceTimeout);
			this.resizeDebounceTimeout = null;
		}
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
			this.resizeObserver = null;
		}
	}

	private _updateViewZoneToFitContentIfNeeded(): void {
		const boxHeight = this.composerBox.getBoundingClientRect().height;
		const requiredHeight = Math.max(VIEW_ZONE_HEIGHT_PX, Math.ceil(boxHeight + VIEW_ZONE_PADDING_PX));

		if (Math.abs(requiredHeight - this.lastViewZoneHeight) > 2) {
			this.lastViewZoneHeight = requiredHeight;
			this._updateViewZoneHeight(requiredHeight);
		}
	}

	private _initLexical(): void {
		this.lexicalEditor = createEditor({
			namespace: 'VybeInlineComposer',
			nodes: [MentionNode],
			onError: (error: Error) => console.error('[VybeInlineComposer Lexical]', error),
			editable: true,
			theme: { paragraph: 'vybe-inline-composer-paragraph' },
		});

		this.lexicalEditor.setRootElement(this.editorElement);
		this._register({ dispose: () => this.lexicalEditor.setRootElement(null) });

		registerPlainText(this.lexicalEditor);
		registerHistory(this.lexicalEditor, createEmptyHistoryState(), 300);

		this._register(
			registerMentionPlugin(this.lexicalEditor, {
				themeService: this.themeService,
				modelService: this.modelService,
				languageService: this.languageService,
				getEditorElement: () => this.editorElement,
			})
		);

		const removeUpdateListener = this.lexicalEditor.registerUpdateListener(() => {
			this._updatePlaceholder();
			this._updateSendEnabled();
			applyFileIconClasses(this.lexicalEditor, this.modelService, this.languageService);
			getWindow(this.domNode).requestAnimationFrame(() => this._updateViewZoneToFitContentIfNeeded());
		});
		this._register({ dispose: removeUpdateListener });

		this._register(addDisposableListener(this.editorElement, 'keydown', (e) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault();
				this._submit();
			}
		}));
	}

	private _getText(): string {
		let text = '';
		this.lexicalEditor.getEditorState().read(() => {
			text = $getRoot().getTextContent();
		});
		return text.trim();
	}

	private _updatePlaceholder(): void {
		let rawText = '';
		this.lexicalEditor.getEditorState().read(() => {
			rawText = $getRoot().getTextContent();
		});
		this.placeholder.style.display = rawText.length === 0 ? 'block' : 'none';
	}

	private _updateSendEnabled(): void {
		const hasText = this._getText().length > 0;
		this.sendButton.style.opacity = hasText ? '1' : '0.35';
		this.sendButton.style.cursor = hasText ? 'pointer' : 'default';
	}

	private _submit(): void {
		const text = this._getText();
		if (!text) { return; }

		const submittedPrompt = text;
		this.completionModeAtSend = this.currentMode;

		this.lexicalEditor.update(() => {
			const root = $getRoot();
			root.clear();
			root.append($createParagraphNode());
		});
		this._updatePlaceholder();
		this._updateSendEnabled();

		if (this.currentMode === 'edit' || this.currentMode === 'ask') {
			this._setState('generating');
			this._onSend.fire(submittedPrompt);
		} else {
			this._onSend.fire(submittedPrompt);
			this._onClose.fire();
		}
	}

	showCompletion(prompt: string, response: string): void {
		this._showCompletion(prompt, response);
	}

	resetToIdle(): void {
		this._setState('idle');
	}

	private _showModelDropdown(anchor: HTMLElement): void {
		if (this.modelDropdownDisposable) {
			this.modelDropdownDisposable.dispose();
			this.modelDropdownDisposable = null;
			return;
		}

		this.modelDropdownDisposable = showInlineModelDropdown(anchor, this.themeService, this.modelDropdownState, {
			openDownward: true,
			onStateChange: (newState: InlineModelDropdownState) => {
				this.modelDropdownState = newState;
				this._updateModelPillLabel();
			},
			onClose: () => {
				this.modelDropdownDisposable = null;
			},
		});
	}

	private _updateModelPillLabel(): void {
		if (this.modelDropdownState.isAutoEnabled) {
			this.modelPillLabel.textContent = 'Auto';
		} else {
			this.modelPillLabel.textContent = this.modelDropdownState.selectedModelLabel;
		}
	}

	private _showModeDropdown(anchor: HTMLElement): void {
		if (this.modeDropdownDisposable) {
			this.modeDropdownDisposable.dispose();
			this.modeDropdownDisposable = null;
			return;
		}

		const items: ComposerDropdownItem[] = [
			{ id: 'edit', label: 'Edit Selection', isSelected: this.currentMode === 'edit' },
			{ id: 'ask', label: 'Quick Question', isSelected: this.currentMode === 'ask' },
			{ id: 'chat', label: 'Send to Chat', isSelected: this.currentMode === 'chat', dividerBefore: true },
		];

		this.modeDropdownDisposable = showComposerDropdown(anchor, this.themeService, {
			items,
			openDownward: true,
			onSelect: (id) => {
				this.currentMode = id as InlineMode;
				this._applyMode();
			},
			onClose: () => {
				this.modeDropdownDisposable = null;
			},
		});
	}

	showAtLine(lineNumber: number): void {
		this.currentLineNumber = lineNumber;
		this.lastViewZoneHeight = VIEW_ZONE_HEIGHT_PX;
		this.editor.changeViewZones((accessor: IViewZoneChangeAccessor) => {
			this.viewZoneId = accessor.addZone({
				afterLineNumber: lineNumber - 1,
				heightInPx: VIEW_ZONE_HEIGHT_PX,
				domNode: this.domNode,
				suppressMouseDown: false,
			});
		});

		getWindow(this.domNode).requestAnimationFrame(() => {
			this.focus();
		});
	}

	focus(): void {
		this.editorElement.focus();
		this.lexicalEditor.focus();
	}

	override dispose(): void {
		this._stopLoadingAnimation();
		this._stopResizeObserver();
		if (this.resizeDebounceTimeout) {
			clearTimeout(this.resizeDebounceTimeout);
		}
		this.modelDropdownDisposable?.dispose();
		this.modeDropdownDisposable?.dispose();

		if (this.viewZoneId !== null) {
			this.editor.changeViewZones((accessor: IViewZoneChangeAccessor) => {
				if (this.viewZoneId !== null) {
					accessor.removeZone(this.viewZoneId);
					this.viewZoneId = null;
				}
			});
		}
		super.dispose();
	}
}
