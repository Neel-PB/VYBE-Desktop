/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// VYBE: Terminal prompt bar — persistent hint bar at terminal bottom that expands
// into a full composer on ⌘I. Supports Quick Question and Generate Command modes.
// Two visual states:
// 1. Hint mode (default): A single centered text line "⌘I to generate command"
// 2. Composer mode (on ⌘I): Full input + actions row with Lexical editor

import './media/vybeTerminalPromptBar.css';

import { $, addDisposableListener, append, getWindow } from '../../../../../base/browser/dom.js';
import { Disposable, IDisposable } from '../../../../../base/common/lifecycle.js';
import { Emitter, Event } from '../../../../../base/common/event.js';
import { Codicon } from '../../../../../base/common/codicons.js';
import { ThemeIcon } from '../../../../../base/common/themables.js';
import { IThemeService } from '../../../../../platform/theme/common/themeService.js';

import {
	createEditor,
	$getRoot,
	$createParagraphNode,
	type LexicalEditor,
	registerPlainText,
	registerHistory,
	createEmptyHistoryState,
	KEY_ENTER_COMMAND,
	COMMAND_PRIORITY_CRITICAL,
} from '../../../../../base/common/lexical/lexical.js';

import { showComposerDropdown, type ComposerDropdownItem } from '../../../vybeChat/browser/components/composer/vybeChatComposerDropdowns.js';

type TerminalComposerMode = 'question' | 'command';
type TerminalComposerState = 'idle' | 'generating' | 'completed';

const MODE_LABELS: Record<TerminalComposerMode, string> = {
	'question': 'Quick Question',
	'command': 'Generate Command',
};

const MODE_PLACEHOLDERS: Record<TerminalComposerMode, string> = {
	'question': 'Ask a quick question',
	'command': 'Generate command',
};

export class VybeTerminalPromptBar extends Disposable {

	private readonly _onClose = this._register(new Emitter<void>());
	readonly onClose: Event<void> = this._onClose.event;

	private readonly _onSend = this._register(new Emitter<{ text: string; mode: TerminalComposerMode }>());
	readonly onSend: Event<{ text: string; mode: TerminalComposerMode }> = this._onSend.event;

	private readonly _onStop = this._register(new Emitter<void>());
	readonly onStop: Event<void> = this._onStop.event;

	private readonly _onExpand = this._register(new Emitter<void>());
	readonly onExpand: Event<void> = this._onExpand.event;

	readonly domNode: HTMLElement;

	// Hint bar elements
	private readonly hintBar: HTMLElement;

	// Composer elements
	private readonly composerContainer: HTMLElement;
	private readonly editorElement: HTMLElement;
	private readonly placeholder: HTMLElement;
	private readonly sendButton: HTMLElement;
	private readonly sendIcon: HTMLElement;
	private readonly closeBtn: HTMLElement;
	private readonly modePill: HTMLElement;
	private readonly modePillLabel: HTMLElement;
	private readonly modeChevron: HTMLElement;
	private readonly responseRow: HTMLElement;
	private readonly loadingIndicator: HTMLElement;
	private readonly loadingDotsElement: HTMLElement;
	private readonly responseDisplay: HTMLElement;

	private lexicalEditor!: LexicalEditor;
	private currentMode: TerminalComposerMode = 'command';
	private currentState: TerminalComposerState = 'idle';
	private isExpanded: boolean = false;

	private loadingAnimationInterval: ReturnType<typeof setInterval> | null = null;
	private modeDropdownDisposable: IDisposable | null = null;

	constructor(
		@IThemeService private readonly themeService: IThemeService,
	) {
		super();

		this.domNode = $('div.vybe-terminal-prompt-bar');

		// ============================================================
		// Hint bar — simple centered text, visible by default
		// ============================================================
		this.hintBar = append(this.domNode, $('div.vybe-terminal-prompt-bar-hint'));
		this.hintBar.textContent = '⌘I to generate command';

		this._register(addDisposableListener(this.hintBar, 'mousedown', (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.expand();
		}));

		// ============================================================
		// Composer — hidden by default, shown on expand
		// ============================================================
		this.composerContainer = append(this.domNode, $('div.vybe-terminal-prompt-bar-composer'));
		this.composerContainer.style.display = 'none';

		const inner = append(this.composerContainer, $('div.vybe-terminal-prompt-bar-inner'));

		// --- Input row ---
		const inputRow = append(inner, $('div.vybe-terminal-prompt-bar-input-row'));
		const inputArea = append(inputRow, $('div.vybe-terminal-prompt-bar-input'));

		this.editorElement = append(inputArea, $('div.vybe-terminal-prompt-bar-editor'));
		this.editorElement.setAttribute('contenteditable', 'true');
		this.editorElement.setAttribute('spellcheck', 'false');
		this.editorElement.setAttribute('role', 'textbox');
		this.editorElement.setAttribute('tabindex', '0');

		this.placeholder = append(inputArea, $('div.vybe-terminal-prompt-bar-placeholder'));
		this.placeholder.textContent = MODE_PLACEHOLDERS[this.currentMode];

		this.closeBtn = append(inputRow, $('button.vybe-terminal-prompt-bar-close'));
		this.closeBtn.title = 'Close';
		const closeIcon = append(this.closeBtn, $('span'));
		closeIcon.classList.add(...ThemeIcon.asClassNameArray(Codicon.close));

		this._register(addDisposableListener(this.closeBtn, 'mousedown', (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.collapse();
		}));

		this._register(addDisposableListener(inputArea, 'mousedown', (e) => {
			e.stopPropagation();
			getWindow(this.domNode).requestAnimationFrame(() => this.lexicalEditor?.focus());
		}));

		// --- Response row (between input and actions, hidden initially) ---
		this.responseRow = append(inner, $('div.vybe-terminal-prompt-bar-response-row'));
		this.responseRow.style.display = 'none';

		this.responseDisplay = append(this.responseRow, $('div.vybe-terminal-prompt-bar-response'));

		// --- Actions row ---
		const actionsRow = append(inner, $('div.vybe-terminal-prompt-bar-actions-row'));
		append(actionsRow, $('div.vybe-terminal-prompt-bar-actions-spacer'));

		// Loading indicator (in actions row, replaces mode pill while generating)
		this.loadingIndicator = append(actionsRow, $('div.vybe-terminal-prompt-bar-loading'));
		this.loadingIndicator.style.display = 'none';
		const loadingText = append(this.loadingIndicator, $('span.vybe-terminal-prompt-bar-loading-text'));
		loadingText.textContent = 'Generating';
		this.loadingDotsElement = append(this.loadingIndicator, $('span.vybe-terminal-prompt-bar-loading-dots'));
		this.loadingDotsElement.textContent = '';

		// Mode pill
		this.modePill = append(actionsRow, $('div.vybe-terminal-prompt-bar-mode-pill'));
		this.modePillLabel = append(this.modePill, $('span'));
		this.modePillLabel.textContent = MODE_LABELS[this.currentMode];
		this.modeChevron = append(this.modePill, $('span'));
		this.modeChevron.classList.add(...ThemeIcon.asClassNameArray(Codicon.chevronDown));

		this._register(addDisposableListener(this.modePill, 'mousedown', (e) => {
			if (!this.isExpanded) { return; }
			e.preventDefault();
			e.stopPropagation();
			this._showModeDropdown(this.modePill);
		}));

		// Send button
		this.sendButton = append(actionsRow, $('div.vybe-terminal-prompt-bar-send'));
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

		// --- Init Lexical ---
		this._initLexical();

		// --- Keyboard ---
		this._register(addDisposableListener(this.domNode, 'keydown', (e) => {
			e.stopPropagation();

			if (e.key === 'Escape') {
				e.preventDefault();
				if (this.isExpanded) {
					this.collapse();
				}
				return;
			}
		}));
	}

	// --- Public API ---

	expand(): void {
		if (this.isExpanded) {
			this.focus();
			return;
		}
		this.isExpanded = true;
		this.domNode.classList.add('expanded');
		this.hintBar.style.display = 'none';
		this.composerContainer.style.display = 'flex';
		this._resetToIdle();
		this.focus();
		this._onExpand.fire();
	}

	collapse(): void {
		if (!this.isExpanded) { return; }
		this.isExpanded = false;
		this.domNode.classList.remove('expanded');
		this.composerContainer.style.display = 'none';
		this.hintBar.style.display = 'block';
		this._resetToIdle();
		this._onClose.fire();
	}

	get expanded(): boolean {
		return this.isExpanded;
	}

	focus(): void {
		this.editorElement.focus();
		this.lexicalEditor.focus();
	}

	showGenerating(): void {
		this._setState('generating');
	}

	showResponse(text: string): void {
		while (this.responseDisplay.firstChild) {
			this.responseDisplay.removeChild(this.responseDisplay.firstChild);
		}
		const p = document.createElement('p');
		p.textContent = text;
		p.style.margin = '0';
		this.responseDisplay.appendChild(p);

		this.lexicalEditor.update(() => {
			const root = $getRoot();
			root.clear();
			root.append($createParagraphNode());
		});
		this._updatePlaceholder();

		this._setState('completed');
	}

	resetToIdle(): void {
		this._resetToIdle();
	}

	// --- State management ---

	private _resetToIdle(): void {
		this.currentState = 'idle';
		this._stopLoadingAnimation();
		this.responseRow.style.display = 'none';
		this.loadingIndicator.style.display = 'none';
		this.modePill.style.display = 'flex';
		this._setSendButtonIcon('send');
		this._updateSendEnabled();
		this.placeholder.textContent = MODE_PLACEHOLDERS[this.currentMode];

		this.lexicalEditor.update(() => {
			const root = $getRoot();
			root.clear();
			root.append($createParagraphNode());
		});
		this._updatePlaceholder();
	}

	private _setState(state: TerminalComposerState): void {
		this.currentState = state;

		switch (state) {
			case 'idle':
				this._resetToIdle();
				break;

			case 'generating':
				this.responseRow.style.display = 'none';
				this.loadingIndicator.style.display = 'flex';
				this.modePill.style.display = 'none';
				this._startLoadingAnimation();
				this._setSendButtonIcon('stop');
				this.sendButton.style.opacity = '1';
				this.sendButton.style.cursor = 'pointer';
				break;

			case 'completed':
				this._stopLoadingAnimation();
				this.loadingIndicator.style.display = 'none';
				this.responseRow.style.display = 'block';
				this.modePill.style.display = 'flex';
				this._setSendButtonIcon('send');
				this._updateSendEnabled();
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
		let dotCount = 0;
		const win = getWindow(this.domNode);
		this.loadingAnimationInterval = win.setInterval(() => {
			dotCount = (dotCount % 3) + 1;
			this.loadingDotsElement.textContent = '.'.repeat(dotCount);
		}, 400);
	}

	private _stopLoadingAnimation(): void {
		if (this.loadingAnimationInterval) {
			getWindow(this.domNode).clearInterval(this.loadingAnimationInterval);
			this.loadingAnimationInterval = null;
		}
		this.loadingDotsElement.textContent = '';
	}

	private _stopGeneration(): void {
		this._onStop.fire();
		this._setState('idle');
	}

	// --- Lexical ---

	private _initLexical(): void {
		this.lexicalEditor = createEditor({
			namespace: 'VybeTerminalPromptBar',
			nodes: [],
			onError: (error: Error) => console.error('[VybeTerminalPromptBar Lexical]', error),
			editable: true,
			theme: { paragraph: 'vybe-terminal-prompt-bar-paragraph' },
		});

		this.lexicalEditor.setRootElement(this.editorElement);
		this._register({ dispose: () => this.lexicalEditor.setRootElement(null) });

		registerPlainText(this.lexicalEditor);
		registerHistory(this.lexicalEditor, createEmptyHistoryState(), 300);

		const removeUpdateListener = this.lexicalEditor.registerUpdateListener(() => {
			this._updatePlaceholder();
			this._updateSendEnabled();
		});
		this._register({ dispose: removeUpdateListener });

		const removeEnterHandler = this.lexicalEditor.registerCommand(
			KEY_ENTER_COMMAND,
			(event: KeyboardEvent | null) => {
				if (event && event.shiftKey) {
					return false;
				}
				event?.preventDefault();
				this._submit();
				return true;
			},
			COMMAND_PRIORITY_CRITICAL,
		);
		this._register({ dispose: removeEnterHandler });
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

		const mode = this.currentMode;
		this._onSend.fire({ text, mode });
	}

	// --- Mode dropdown ---

	private _showModeDropdown(anchor: HTMLElement): void {
		if (this.modeDropdownDisposable) {
			this.modeDropdownDisposable.dispose();
			this.modeDropdownDisposable = null;
			return;
		}

		const items: ComposerDropdownItem[] = [
			{ id: 'command', label: 'Generate Command', isSelected: this.currentMode === 'command' },
			{ id: 'question', label: 'Quick Question', isSelected: this.currentMode === 'question' },
		];

		this.modeDropdownDisposable = showComposerDropdown(anchor, this.themeService, {
			items,
			openDownward: false,
			onSelect: (id) => {
				this.currentMode = id as TerminalComposerMode;
				this._applyMode();
			},
			onClose: () => {
				this.modeDropdownDisposable = null;
			},
		});
	}

	private _applyMode(): void {
		this.modePillLabel.textContent = MODE_LABELS[this.currentMode];
		this.placeholder.textContent = MODE_PLACEHOLDERS[this.currentMode];
	}

	// --- Dispose ---

	override dispose(): void {
		this._stopLoadingAnimation();
		this.modeDropdownDisposable?.dispose();
		super.dispose();
	}
}
