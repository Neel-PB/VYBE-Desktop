/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/vybeChatContextPill.css';

import { $, append, addDisposableListener, getWindow } from '../../../../../../base/browser/dom.js';
import { Disposable, IDisposable } from '../../../../../../base/common/lifecycle.js';
import { Emitter, Event } from '../../../../../../base/common/event.js';
import { Codicon } from '../../../../../../base/common/codicons.js';
import { ThemeIcon } from '../../../../../../base/common/themables.js';
import { DomScrollableElement } from '../../../../../../base/browser/ui/scrollbar/scrollableElement.js';
import { ScrollbarVisibility } from '../../../../../../base/common/scrollable.js';
import { IThemeService } from '../../../../../../platform/theme/common/themeService.js';
import { showComposerDropdown, type ComposerDropdownItem } from './vybeChatComposerDropdowns.js';
import { showModelDropdown, type ModelDropdownResult } from './vybeChatModelDropdown.js';
import { VybeChatImageAttachments, type ImageAttachment } from './vybeChatImageAttachments.js';
import type { ContextPillData } from './vybeChatContextPill.js';
import { IModelService } from '../../../../../../editor/common/services/model.js';
import { ILanguageService } from '../../../../../../editor/common/languages/language.js';

import {
	createEditor,
	$getRoot,
	$createParagraphNode,
	$getNearestNodeFromDOMNode,
	type LexicalEditor,
	registerPlainText,
	registerHistory,
	createEmptyHistoryState,
} from '../../../../../../base/common/lexical/lexical.js';

import { MentionNode } from './lexical/vybeMentionNode.js';
import { registerMentionPlugin, $extractMentions, $hasMentions, applyFileIconClasses } from './lexical/vybeMentionPlugin.js';
import { registerComposerCommands } from './lexical/vybeComposerCommands.js';

export type AgentMode = 'agent' | 'plan' | 'ask';

export interface ComposerSendPayload {
	text: string;
	images: ImageAttachment[];
	mentions: ContextPillData[];
	editorStateJSON: unknown;
}

const MAX_INPUT_HEIGHT = 234;

const MODE_LABELS: Record<AgentMode, string> = {
	'agent': 'Agent',
	'plan': 'Plan',
	'ask': 'Ask',
};

const MODE_ICONS: Record<AgentMode, string> = {
	'agent': 'codicon-gear',
	'plan': 'codicon-tasklist',
	'ask': 'codicon-comment',
};

const MODE_PLACEHOLDERS: Record<AgentMode, string> = {
	'agent': 'Tell me what you want -- I\'ll take it from here.',
	'plan': 'Describe what you want planned...',
	'ask': 'Ask me anything...',
};

export class VybeChatComposer extends Disposable {

	private readonly _onSend = this._register(new Emitter<ComposerSendPayload>());
	readonly onSend: Event<ComposerSendPayload> = this._onSend.event;

	private readonly _onStop = this._register(new Emitter<void>());
	readonly onStop: Event<void> = this._onStop.event;

	private readonly _onModeChange = this._register(new Emitter<AgentMode>());
	readonly onModeChange: Event<AgentMode> = this._onModeChange.event;

	readonly domNode: HTMLElement;

	private inputBox!: HTMLElement;
	private editorContainer!: HTMLElement;
	private editorElement!: HTMLElement;
	private scrollContent!: HTMLElement;
	private scrollable!: DomScrollableElement;
	private sendButton!: HTMLElement;
	private sendIcon!: HTMLElement;
	private isRunning: boolean = false;

	private imageAttachments!: VybeChatImageAttachments;
	private fileInput!: HTMLInputElement;

	private lexicalEditor!: LexicalEditor;
	private mentionPluginDisposable: IDisposable | null = null;
	private commandsDisposable: IDisposable | null = null;

	private currentMode: AgentMode = 'agent';
	private modePill!: HTMLElement;
	private modePillIcon!: HTMLElement;
	private modePillLabel!: HTMLElement;
	private modeDropdownDisposable: IDisposable | null = null;

	private currentModelLabel: string = 'Auto';
	private isAutoEnabled: boolean = true;
	private isMaxModeEnabled: boolean = false;
	private selectedModelId: string = '';
	private selectedModelLabel: string = '';
	private modelPill!: HTMLElement;
	private modelPillLabel!: HTMLElement;
	private modelDropdownDisposable: IDisposable | null = null;

	private placeholder!: HTMLElement;

	constructor(
		parent: HTMLElement,
		private readonly themeService?: IThemeService,
		private readonly modelService?: IModelService,
		private readonly languageService?: ILanguageService,
		private readonly onOpenSettingsModelsTab?: () => void,
		private readonly onOpenSettingsDocsTab?: () => void,
	) {
		super();
		this.domNode = append(parent, $('.vybe-composer-wrapper'));
		this.build();
	}

	// --- Public API -----------------------------------------------------

	focus(): void {
		this.lexicalEditor.focus();
	}

	getText(): string {
		let text = '';
		this.lexicalEditor.getEditorState().read(() => {
			text = $getRoot().getTextContent();
		});
		return text.trim();
	}

	getMode(): AgentMode {
		return this.currentMode;
	}

	clearInput(): void {
		this.lexicalEditor.update(() => {
			const root = $getRoot();
			root.clear();
			root.append($createParagraphNode());
		});
		this.imageAttachments.clear();
		this.updatePlaceholderVisibility();
		this.updateSendButtonEnabled();
		this.updateScrollDimensions();
	}

	// --- Build ----------------------------------------------------------

	private build(): void {
		this.inputBox = append(this.domNode, $('.vybe-composer-input-box'));

		this.buildImageRow(this.inputBox);
		this.buildEditorArea(this.inputBox);
		this.buildBottomBar(this.inputBox);
		this.buildHiddenFileInput();
		this.initLexical();
	}

	// --- Image preview row ---------------------------------------------

	private buildImageRow(inputBox: HTMLElement): void {
		this.imageAttachments = this._register(new VybeChatImageAttachments());
		inputBox.appendChild(this.imageAttachments.domNode);

		this.imageAttachments.setOnChangeCallback(() => {
			this.updateSendButtonEnabled();
		});
	}

	private buildHiddenFileInput(): void {
		const win = getWindow(this.domNode);
		this.fileInput = win.document.createElement('input');
		this.fileInput.type = 'file';
		this.fileInput.accept = 'image/*';
		this.fileInput.multiple = true;
		this.fileInput.style.display = 'none';
		this.domNode.appendChild(this.fileInput);

		this._register(addDisposableListener(this.fileInput, 'change', () => {
			const files = this.fileInput.files;
			if (files) {
				for (let i = 0; i < files.length; i++) {
					const file = files[i];
					if (file.type.startsWith('image/')) {
						this.imageAttachments.addImage(file);
					}
				}
			}
			this.fileInput.value = '';
		}));
	}

	// --- Editor area (Lexical + DomScrollableElement) -------------------

	private buildEditorArea(inputBox: HTMLElement): void {
		this.editorContainer = append(inputBox, $('.vybe-composer-editor-container'));

		this.scrollContent = $('div.vybe-composer-scroll-content');

		this.editorElement = append(this.scrollContent, $('.vybe-composer-editor'));
		this.editorElement.setAttribute('contenteditable', 'true');
		this.editorElement.setAttribute('spellcheck', 'true');
		this.editorElement.setAttribute('role', 'textbox');
		this.editorElement.setAttribute('aria-label', 'Chat message input');
		this.editorElement.setAttribute('aria-multiline', 'true');
		this.editorElement.setAttribute('tabindex', '0');

		this.scrollable = this._register(new DomScrollableElement(this.scrollContent, {
			vertical: ScrollbarVisibility.Auto,
			horizontal: ScrollbarVisibility.Hidden,
			useShadows: false,
			verticalScrollbarSize: 8,
		}));

		const scrollDomNode = this.scrollable.getDomNode();
		scrollDomNode.style.position = 'relative';
		scrollDomNode.style.overflow = 'hidden';
		scrollDomNode.style.width = '100%';
		scrollDomNode.style.minHeight = '20px';
		scrollDomNode.style.maxHeight = `${MAX_INPUT_HEIGHT}px`;

		this.editorContainer.appendChild(scrollDomNode);

		this.placeholder = append(this.editorContainer, $('.vybe-composer-placeholder'));
		this.placeholder.textContent = MODE_PLACEHOLDERS[this.currentMode];

		this._register(addDisposableListener(this.editorContainer, 'click', () => {
			this.lexicalEditor?.focus();
		}));
	}

	// --- Lexical initialization -----------------------------------------

	private initLexical(): void {
		this.lexicalEditor = createEditor({
			namespace: 'VybeChat',
			nodes: [MentionNode],
			onError: (error: Error) => console.error('[VybeChat Lexical]', error),
			editable: true,
			theme: {
				paragraph: 'vybe-composer-paragraph',
			},
		});

		this.lexicalEditor.setRootElement(this.editorElement);

		this._register({ dispose: () => this.lexicalEditor.setRootElement(null) });

		registerPlainText(this.lexicalEditor);
		registerHistory(this.lexicalEditor, createEmptyHistoryState(), 300);

		if (this.themeService && this.modelService && this.languageService) {
			this.mentionPluginDisposable = registerMentionPlugin(this.lexicalEditor, {
				themeService: this.themeService,
				modelService: this.modelService,
				languageService: this.languageService,
				getEditorElement: () => this.editorElement,
				onOpenDocsSettings: this.onOpenSettingsDocsTab,
			});
			this._register(this.mentionPluginDisposable);
		}

		if (this.modelService && this.languageService) {
			this.commandsDisposable = registerComposerCommands(this.lexicalEditor, {
				onSubmit: () => this.submitMessage(),
				imageAttachments: this.imageAttachments,
				modelService: this.modelService,
				languageService: this.languageService,
			});
			this._register(this.commandsDisposable);
		}

		const removeUpdateListener = this.lexicalEditor.registerUpdateListener(() => {
			this.updatePlaceholderVisibility();
			this.updateSendButtonEnabled();
			this.updateScrollDimensions();

			if (this.modelService && this.languageService) {
				applyFileIconClasses(this.lexicalEditor, this.modelService, this.languageService);
			}
		});
		this._register({ dispose: removeUpdateListener });

		this.editorElement.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			const closeEl = target.closest('[data-mention-remove="true"]');
			if (closeEl) {
				e.preventDefault();
				e.stopPropagation();
				const mentionEl = closeEl.closest('.mention') as HTMLElement;
				if (mentionEl) {
					this.removeMentionByDom(mentionEl);
				}
			}
		});
	}

	private removeMentionByDom(mentionEl: HTMLElement): void {
		this.lexicalEditor.update(() => {
			const node = $getNearestNodeFromDOMNode(mentionEl);
			if (node) {
				node.remove();
			}
		});
	}

	// --- Input state ----------------------------------------------------

	private updatePlaceholderVisibility(): void {
		let rawText = '';
		this.lexicalEditor.getEditorState().read(() => {
			rawText = $getRoot().getTextContent();
		});
		const hasMentions = $hasMentions(this.lexicalEditor);
		const isEmpty = rawText.length === 0 && !hasMentions;
		this.placeholder.style.display = isEmpty ? 'block' : 'none';
		this.editorContainer.classList.toggle('has-content', !isEmpty);
	}

	private hasSubmittableContent(): boolean {
		const text = this.getText();
		return text.length > 0 || this.imageAttachments.getImages().length > 0 || $hasMentions(this.lexicalEditor);
	}

	private updateSendButtonEnabled(): void {
		if (this.isRunning) {
			this.sendButton.style.opacity = '1';
			this.sendButton.style.cursor = 'pointer';
		} else {
			const enabled = this.hasSubmittableContent();
			this.sendButton.style.opacity = enabled ? '1' : '0.35';
			this.sendButton.style.cursor = enabled ? 'pointer' : 'default';
		}
	}

	// --- Scroll dimension measurement -----------------------------------

	private updateScrollDimensions(): void {
		const scrollDomNode = this.scrollable.getDomNode();
		const viewportWidth = scrollDomNode.clientWidth;

		this.scrollContent.style.height = 'auto';
		void this.scrollContent.offsetHeight;
		const contentHeight = this.scrollContent.scrollHeight;

		const viewportHeight = Math.min(contentHeight, MAX_INPUT_HEIGHT);

		this.scrollContent.style.height = `${viewportHeight}px`;
		scrollDomNode.style.height = `${viewportHeight}px`;

		this.scrollable.setScrollDimensions({
			width: viewportWidth,
			scrollWidth: viewportWidth,
			height: viewportHeight,
			scrollHeight: contentHeight,
		});
	}

	// --- Submit ---------------------------------------------------------

	private submitMessage(): void {
		const text = this.getText();
		const images = this.imageAttachments.getImages();
		const mentions = $extractMentions(this.lexicalEditor);
		if (!text && images.length === 0 && mentions.length === 0) {
			return;
		}
		const editorStateJSON = this.lexicalEditor.getEditorState().toJSON();
		this._onSend.fire({ text, images, mentions, editorStateJSON });
		this.clearInput();
		this.setRunning(true);
	}

	setRunning(running: boolean): void {
		this.isRunning = running;
		this.updateSendIcon();
		this.updateSendButtonEnabled();
	}

	private updateSendIcon(): void {
		if (this.isRunning) {
			this.sendIcon.className = 'codicon codicon-debug-stop';
			this.sendIcon.style.fontSize = '16px';
			this.sendIcon.style.width = '16px';
			this.sendIcon.style.height = '16px';
			this.sendIcon.style.lineHeight = '16px';
			this.sendIcon.style.transform = 'none';
			this.sendButton.setAttribute('aria-label', 'Stop generation');
		} else {
			this.sendIcon.className = 'codicon codicon-arrow-up';
			this.sendIcon.style.fontSize = '16px';
			this.sendIcon.style.width = '16px';
			this.sendIcon.style.height = '16px';
			this.sendIcon.style.lineHeight = '16px';
			this.sendIcon.style.transform = 'translateX(-0.5px)';
			this.sendButton.setAttribute('aria-label', 'Send message');
		}
	}

	// --- Bottom Bar -----------------------------------------------------

	private buildBottomBar(inputBox: HTMLElement): void {
		const bar = append(inputBox, $('.vybe-composer-bottom-bar'));

		const selectors = append(bar, $('.vybe-composer-selectors'));
		this.buildModePill(selectors);
		this.buildModelPill(selectors);

		const actions = append(bar, $('.vybe-composer-actions'));
		this.buildUploadButton(actions);
		this.buildSendButton(actions);
	}

	// --- Mode Pill & Dropdown -------------------------------------------

	private buildModePill(container: HTMLElement): void {
		this.modePill = append(container, $('.vybe-composer-mode-pill'));

		this.modePillIcon = append(this.modePill, $('span.vybe-composer-pill-icon'));
		this.modePillIcon.classList.add(...ThemeIcon.asClassNameArray(Codicon.gear));

		this.modePillLabel = append(this.modePill, $('span.vybe-composer-pill-label'));
		this.modePillLabel.textContent = MODE_LABELS[this.currentMode];

		const chevron = append(this.modePill, $('span.vybe-composer-pill-chevron'));
		chevron.classList.add(...ThemeIcon.asClassNameArray(Codicon.chevronDown));

		this._register(addDisposableListener(this.modePill, 'click', (e) => {
			e.stopPropagation();
			this.showModeDropdown();
		}));
	}

	private showModeDropdown(): void {
		if (this.modeDropdownDisposable) {
			this.modeDropdownDisposable.dispose();
			this.modeDropdownDisposable = null;
			return;
		}

		if (!this.themeService) {
			return;
		}

		const items: ComposerDropdownItem[] = [
			{ id: 'agent', label: 'Agent', icon: 'codicon-gear', isSelected: this.currentMode === 'agent' },
			{ id: 'plan', label: 'Plan', icon: 'codicon-tasklist', isSelected: this.currentMode === 'plan' },
			{ id: 'ask', label: 'Ask', icon: 'codicon-comment', isSelected: this.currentMode === 'ask' },
		];

		this.modeDropdownDisposable = showComposerDropdown(this.modePill, this.themeService, {
			items,
			openDownward: true,
			onSelect: (id) => {
				const mode = id as AgentMode;
				if (mode !== this.currentMode) {
					this.currentMode = mode;
					this.updateModePill();
					this.updatePlaceholder();
					this._onModeChange.fire(mode);
				}
			},
			onClose: () => {
				this.modeDropdownDisposable = null;
			},
		});
	}

	private updateModePill(): void {
		this.modePillLabel.textContent = MODE_LABELS[this.currentMode];

		const oldClasses = Array.from(this.modePillIcon.classList).filter(c => c.startsWith('codicon-'));
		oldClasses.forEach(c => this.modePillIcon.classList.remove(c));
		this.modePillIcon.classList.add(MODE_ICONS[this.currentMode]);
	}

	private updatePlaceholder(): void {
		this.placeholder.textContent = MODE_PLACEHOLDERS[this.currentMode];
	}

	// --- Model Pill & Dropdown ------------------------------------------

	private buildModelPill(container: HTMLElement): void {
		this.modelPill = append(container, $('.vybe-composer-model-pill'));

		this.modelPillLabel = append(this.modelPill, $('span.vybe-composer-pill-label'));
		this.modelPillLabel.textContent = this.currentModelLabel;

		const chevron = append(this.modelPill, $('span.vybe-composer-pill-chevron'));
		chevron.classList.add(...ThemeIcon.asClassNameArray(Codicon.chevronDown));

		this._register(addDisposableListener(this.modelPill, 'click', (e) => {
			e.stopPropagation();
			this.showModelDropdown();
		}));
	}

	private showModelDropdown(): void {
		if (this.modelDropdownDisposable) {
			this.modelDropdownDisposable.dispose();
			this.modelDropdownDisposable = null;
			return;
		}

		if (!this.themeService) {
			return;
		}

		this.modelDropdownDisposable = showModelDropdown(
			this.modelPill,
			this.themeService,
			{
				isAutoEnabled: this.isAutoEnabled,
				isMaxModeEnabled: this.isMaxModeEnabled,
				selectedModelId: this.selectedModelId,
				selectedModelLabel: this.selectedModelLabel,
			},
			{
				openDownward: true,
				onStateChange: (state: ModelDropdownResult) => {
					this.isAutoEnabled = state.isAutoEnabled;
					this.isMaxModeEnabled = state.isMaxModeEnabled;
					this.selectedModelId = state.selectedModelId;
					this.selectedModelLabel = state.selectedModelLabel;
					this.updateModelPillLabel();
				},
				onClose: () => {
					this.modelDropdownDisposable = null;
				},
				onAddModels: this.onOpenSettingsModelsTab,
			},
		);
	}

	private updateModelPillLabel(): void {
		if (this.isAutoEnabled) {
			this.currentModelLabel = 'Auto';
		} else if (this.selectedModelLabel) {
			this.currentModelLabel = this.selectedModelLabel;
		} else {
			this.currentModelLabel = 'Auto';
		}
		this.modelPillLabel.textContent = this.currentModelLabel;
	}

	// --- Action Buttons -------------------------------------------------

	private buildUploadButton(container: HTMLElement): void {
		const btn = append(container, $('.vybe-composer-action-btn.vybe-composer-upload-btn'));
		btn.setAttribute('aria-label', 'Attach image');

		const icon = append(btn, $('span'));
		icon.classList.add(...ThemeIcon.asClassNameArray(Codicon.attach));

		this._register(addDisposableListener(btn, 'click', () => {
			this.fileInput.click();
		}));
	}

	private buildSendButton(container: HTMLElement): void {
		const sendContainer = append(container, $('.vybe-composer-send-container'));
		sendContainer.style.position = 'relative';
		sendContainer.style.display = 'inline-block';
		sendContainer.style.width = '24px';
		sendContainer.style.height = '20px';
		sendContainer.style.flexShrink = '0';
		sendContainer.style.flexGrow = '0';
		sendContainer.style.minWidth = '24px';
		sendContainer.style.maxWidth = '24px';

		this.sendButton = append(sendContainer, $('div'));
		this.sendButton.setAttribute('aria-label', 'Send message');
		this.sendButton.style.width = '20px';
		this.sendButton.style.height = '20px';
		this.sendButton.style.minWidth = '20px';
		this.sendButton.style.maxWidth = '20px';
		this.sendButton.style.minHeight = '20px';
		this.sendButton.style.maxHeight = '20px';
		this.sendButton.style.display = 'flex';
		this.sendButton.style.alignItems = 'center';
		this.sendButton.style.justifyContent = 'center';
		this.sendButton.style.cursor = 'pointer';
		this.sendButton.style.border = 'none';
		this.sendButton.style.borderRadius = '50%';
		this.sendButton.style.flexShrink = '0';
		this.sendButton.style.flexGrow = '0';
		this.sendButton.style.marginLeft = '4px';
		this.sendButton.style.position = 'relative';
		this.sendButton.style.opacity = '0.35';
		this.sendButton.style.backgroundColor = 'var(--vscode-button-background)';

		this.sendIcon = append(this.sendButton, $('span.codicon.codicon-arrow-up'));
		this.sendIcon.style.fontSize = '16px';
		this.sendIcon.style.width = '16px';
		this.sendIcon.style.height = '16px';
		this.sendIcon.style.lineHeight = '16px';
		this.sendIcon.style.color = 'var(--vscode-button-foreground, #ffffff)';
		this.sendIcon.style.display = 'block';
		this.sendIcon.style.textAlign = 'center';
		this.sendIcon.style.transform = 'translateX(-0.5px)';

		this._register(addDisposableListener(this.sendButton, 'click', () => {
			if (this.isRunning) {
				this._onStop.fire();
				this.setRunning(false);
			} else {
				this.submitMessage();
			}
		}));
	}

	getEditorStateJSON(): unknown {
		return this.lexicalEditor.getEditorState().toJSON();
	}

	restoreEditorState(stateJSON: unknown): void {
		// eslint-disable-next-line local/code-no-any-casts, @typescript-eslint/no-explicit-any
		const state = this.lexicalEditor.parseEditorState(stateJSON as any);
		this.lexicalEditor.setEditorState(state);
		this.updatePlaceholderVisibility();
		this.updateSendButtonEnabled();
		this.updateScrollDimensions();
		if (this.modelService && this.languageService) {
			applyFileIconClasses(this.lexicalEditor, this.modelService, this.languageService);
		}
	}

	override dispose(): void {
		this.mentionPluginDisposable?.dispose();
		this.commandsDisposable?.dispose();
		this.modeDropdownDisposable?.dispose();
		this.modelDropdownDisposable?.dispose();
		super.dispose();
	}
}
